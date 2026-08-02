import { isAbsolute } from 'path'
import {
  pickAudioStream,
  pickVideoStream,
  type MediaProbe,
  type ProbeStream
} from './probeParse'
import type { VideoPlanAction } from '@shared/types'

// What Chromium can do with a file, and the exact ffmpeg argv to fix it when it
// can't. Pure — no electron, no child_process, no fs — which is what lets the
// whole decision matrix be tested against captured ffprobe JSON with no binary
// installed (the updaterCore.ts / coachTools.ts split).

// ---------------------------------------------------------------------------
// The Chromium 126 matrix
// ---------------------------------------------------------------------------

// CONTAINER IS DECIDED BY EXTENSION, NEVER format_name. ffprobe reports
// "matroska,webm" for BOTH .mkv and .webm; Chromium plays one and refuses the
// other. Trusting format_name here is the single most tempting bug in the file.
export const MP4_EXTS = new Set(['.mp4', '.m4v', '.mov'])
export const WEBM_EXTS = new Set(['.webm'])

// Decodable by Chromium 126 / Electron 31 (proprietary codecs on).
const VIDEO_DECODABLE = new Set(['h264', 'vp8', 'vp9', 'av1'])
const AUDIO_DECODABLE = new Set(['aac', 'mp3', 'opus', 'vorbis', 'flac', 'pcm_s16le'])

// Decodability is not the same as container legality: a .webm holding H.264 is
// a real file that Chromium's WebM demuxer refuses.
const MP4_VIDEO = new Set(['h264', 'av1', 'vp9'])
const MP4_AUDIO = new Set(['aac', 'mp3', 'opus', 'flac'])
const WEBM_VIDEO = new Set(['vp8', 'vp9', 'av1'])
const WEBM_AUDIO = new Set(['opus', 'vorbis'])

export interface PlaybackPlan {
  action: VideoPlanAction
  container: 'mp4' | 'webm' | null
  videoStream: number | null // ABSOLUTE ffprobe index, for -map 0:<i>
  audioStream: number | null
  videoCodec: 'copy' | 'h264' | null
  audioCodec: 'copy' | 'aac' | null
  needsAdtsToAsc: boolean
  startTimeOffset: number
  reason: string
  warnings: string[]
}

function codecLabel(s: ProbeStream | null): string {
  return s ? s.codec.toUpperCase() : 'no stream'
}

export function decidePlayback(input: {
  ext: string
  probe: MediaProbe | null
  preferAudioLang?: string | null
  audioStreamOverride?: number | null
  maxHeight?: number | null
}): PlaybackPlan {
  const ext = input.ext.toLowerCase()
  const empty: PlaybackPlan = {
    action: 'unsupported',
    container: null,
    videoStream: null,
    audioStream: null,
    videoCodec: null,
    audioCodec: null,
    needsAdtsToAsc: false,
    startTimeOffset: 0,
    reason: '',
    warnings: []
  }

  // No probe at all — ffprobe isn't installed, timed out, or the file is
  // unreadable. Extension is all we have. This is the entire no-ffmpeg
  // degradation story: .mp4/.webm still play, nothing else is attempted, and
  // no process is ever spawned.
  if (!input.probe) {
    if (MP4_EXTS.has(ext) || WEBM_EXTS.has(ext)) {
      return {
        ...empty,
        action: 'direct',
        reason: 'Playing directly (ffprobe not installed, so codecs are unverified).'
      }
    }
    return {
      ...empty,
      reason: `Install ffmpeg and set its path in Settings to play ${ext || 'this format'} files.`
    }
  }

  const probe = input.probe
  const video = pickVideoStream(probe)
  const audio = pickAudioStream(probe, {
    preferLang: input.preferAudioLang,
    override: input.audioStreamOverride
  })
  const warnings: string[] = []

  if (!video) {
    return { ...empty, reason: 'No video stream in this file.' }
  }

  const audioStreams = probe.streams.filter((s) => s.type === 'audio')
  const vCodec = video.codec
  const aCodec = audio?.codec ?? null

  const containerOk =
    (MP4_EXTS.has(ext) &&
      MP4_VIDEO.has(vCodec) &&
      (aCodec === null || MP4_AUDIO.has(aCodec))) ||
    (WEBM_EXTS.has(ext) &&
      WEBM_VIDEO.has(vCodec) &&
      (aCodec === null || WEBM_AUDIO.has(aCodec)))

  // A dual-audio file that Chromium COULD play directly still gets converted
  // when the user wants a non-default track: Chromium doesn't implement
  // HTMLMediaElement.audioTracks, so a remux picking that stream is the only
  // way to hear it.
  const audioReachable = audioStreams.length <= 1 || audio == null || audio.isDefault
  if (containerOk && audioReachable) {
    return {
      ...empty,
      action: 'direct',
      videoStream: video.index,
      audioStream: audio?.index ?? null,
      startTimeOffset: probe.startTimeSec,
      reason: 'Plays directly.'
    }
  }

  // Target container: webm only when BOTH streams can be copied into it,
  // otherwise mp4 (which accepts H.264 + AAC, the transcode targets).
  const container: 'mp4' | 'webm' =
    WEBM_VIDEO.has(vCodec) && (aCodec === null || WEBM_AUDIO.has(aCodec)) ? 'webm' : 'mp4'
  const allowedVideo = container === 'mp4' ? MP4_VIDEO : WEBM_VIDEO
  const allowedAudio = container === 'mp4' ? MP4_AUDIO : WEBM_AUDIO

  const tooTall = input.maxHeight != null && (video.height ?? 0) > input.maxHeight
  const videoCodec: 'copy' | 'h264' =
    !tooTall && VIDEO_DECODABLE.has(vCodec) && allowedVideo.has(vCodec) ? 'copy' : 'h264'
  const audioCodec: 'copy' | 'aac' | null =
    aCodec === null
      ? null
      : AUDIO_DECODABLE.has(aCodec) && allowedAudio.has(aCodec)
        ? 'copy'
        : 'aac'

  // "remux" only when nothing is re-encoded — that's the fast, lossless,
  // start-it-automatically case. Anything else re-encodes and must be confirmed.
  const action: VideoPlanAction =
    videoCodec === 'copy' && audioCodec !== 'aac' ? 'remux' : 'transcode'

  if (videoCodec === 'h264' && /^(hevc|h265)$/.test(vCodec)) {
    warnings.push('10-bit/HDR video is flattened to SDR 8-bit — colours may look washed out.')
  }
  if (tooTall) warnings.push(`Downscaling to ${input.maxHeight}p.`)

  const reason = buildReason(ext, video, audio, videoCodec, audioCodec, action, containerOk)

  return {
    action,
    container,
    videoStream: video.index,
    audioStream: audio?.index ?? null,
    videoCodec,
    audioCodec,
    // MPEG-TS carries raw ADTS AAC, which MP4 can't hold without the bitstream
    // filter; without it a copied audio track is silent.
    needsAdtsToAsc: container === 'mp4' && audioCodec === 'copy' && aCodec === 'aac',
    startTimeOffset: probe.startTimeSec,
    reason,
    warnings
  }
}

function buildReason(
  ext: string,
  video: ProbeStream,
  audio: ProbeStream | null,
  videoCodec: 'copy' | 'h264',
  audioCodec: 'copy' | 'aac' | null,
  action: VideoPlanAction,
  containerOk: boolean
): string {
  if (action === 'remux') {
    if (containerOk) {
      return `Selecting the ${audio?.language ?? 'chosen'} audio track needs a converted copy (fast — nothing is re-encoded).`
    }
    return `${ext.replace('.', '').toUpperCase()} container — copying the streams into MP4 (fast, no quality loss).`
  }
  const parts: string[] = []
  if (videoCodec === 'h264') parts.push(`${codecLabel(video)} video`)
  if (audioCodec === 'aac') parts.push(`${codecLabel(audio)} audio`)
  return `${parts.join(' and ')} can't be played by this app — converting to H.264/AAC. This re-encodes the whole file and takes a while.`
}

// ---------------------------------------------------------------------------
// argv
// ---------------------------------------------------------------------------

// ffmpeg and ffprobe have NO `--` option terminator (unlike yt-dlp), and two
// separate things can go wrong with a user-supplied path:
//
//  1. Option injection — a file literally named "-vf" parses as a flag. Every
//     path we pass comes from absoluteMediaPath() or a native file dialog, so
//     "absolute and not starting with -" is a real invariant we can assert.
//  2. Protocol injection, which `--` would NOT have fixed: ffmpeg reads
//     "foo:bar" as PROTOCOL foo. A file named "re:zero 01.mkv" — or any Windows
//     C:\ path — is ambiguous. Prefixing with "file:" makes the remainder a
//     filename unconditionally, which is why ffInputArg exists at all.
export function assertSafeArgPath(p: string): void {
  if (!p) throw new Error('Empty path')
  // Option-like first: such a path is also non-absolute, and "refusing an
  // option-like path" is the message that actually explains what happened.
  if (p.startsWith('-')) throw new Error(`Refusing an option-like path: ${p}`)
  if (!isAbsolute(p)) throw new Error(`ffmpeg path must be absolute: ${p}`)
  if (p.includes('\u0000')) throw new Error('Path contains a NUL byte')
}

export function ffInputArg(abs: string): string {
  assertSafeArgPath(abs)
  return `file:${abs}`
}

export function buildProbeArgs(abs: string): string[] {
  return [
    '-v',
    'error',
    '-hide_banner',
    '-print_format',
    'json',
    '-show_format',
    '-show_streams',
    '-i',
    ffInputArg(abs)
  ]
}

export function buildConvertArgs(o: {
  input: string
  output: string
  plan: PlaybackPlan
  maxHeight?: number | null
  encoder?: string
}): string[] {
  const args = [
    // A spawned ffmpeg inherits stdin and will happily consume it.
    '-nostdin',
    '-hide_banner',
    '-loglevel',
    'error',
    '-nostats',
    '-progress',
    'pipe:1',
    '-y',
    '-i',
    ffInputArg(o.input)
  ]

  // -map with the ABSOLUTE index, because the plan already resolved the exact
  // streams (including skipping MKV cover art, which is a video stream).
  if (o.plan.videoStream != null) args.push('-map', `0:${o.plan.videoStream}`)
  if (o.plan.audioStream != null) args.push('-map', `0:${o.plan.audioStream}`)
  // Subtitles and data streams are never muxed: ASS→mov_text is lossy and
  // Chromium can't render an embedded track anyway. They come out through the
  // separate extraction path instead.
  args.push('-sn', '-dn')

  if (o.plan.videoCodec === 'copy') {
    args.push('-c:v', 'copy')
  } else {
    args.push('-c:v', o.encoder ?? 'libx264', '-preset', 'veryfast', '-crf', '20')
    // 10-bit HEVC decodes to yuv420p10le, which no browser can play.
    args.push('-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1')
    if (o.maxHeight != null) args.push('-vf', `scale=-2:'min(${o.maxHeight},ih)'`)
  }

  if (o.plan.audioCodec === 'copy') {
    args.push('-c:a', 'copy')
    if (o.plan.needsAdtsToAsc) args.push('-bsf:a', 'aac_adtstoasc')
  } else if (o.plan.audioCodec === 'aac') {
    args.push('-c:a', 'aac', '-b:a', '192k', '-ac', '2')
  }

  if (o.plan.container === 'mp4') {
    // Without +faststart the moov atom lands at the END of the file, so
    // Chromium must range-fetch the tail before it can show a single frame.
    // The cost: ffmpeg rewrites the whole output once encoding finishes, which
    // is why the status object needs a distinct 'finalizing' state — otherwise
    // a 20GB file sits at 100% looking hung.
    args.push('-movflags', '+faststart')
  }
  args.push('-map_metadata', '0', '-map_chapters', '0')
  // .ts sources routinely start at start_time=10.0; without this the remux is
  // time-shifted and every sidecar subtitle is seconds out.
  args.push('-avoid_negative_ts', 'make_zero', '-max_muxing_queue_size', '4096')
  args.push('-f', o.plan.container === 'webm' ? 'webm' : 'mp4')
  args.push(ffInputArg(o.output))
  return args
}

// Pulls one subtitle track out of a container. typeIndex (not the absolute
// index) is what -map 0:s:N takes.
export function buildSubtitleExtractArgs(o: {
  input: string
  output: string
  typeIndex: number
  format: 'ass' | 'srt' | 'vtt'
}): string[] {
  return [
    '-nostdin',
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    ffInputArg(o.input),
    '-map',
    `0:s:${o.typeIndex}`,
    '-c:s',
    o.format === 'vtt' ? 'webvtt' : 'copy',
    '-f',
    o.format === 'vtt' ? 'webvtt' : o.format,
    ffInputArg(o.output)
  ]
}

// A sentence-audio clip for a mined card.
//
// -ss goes BEFORE -i (fast input seek): as an output option ffmpeg decodes from
// zero and a 45-minute episode costs seconds per clip. And it ALWAYS re-encodes
// — a copied AAC clip starting mid-frame pops, and copying AC3/DTS/FLAC gives
// you something Chromium can't play at ten times the size.
export const CLIP_LEAD_IN = 0.15
export const CLIP_TAIL = 0.25
export const CLIP_MAX_SECONDS = 30

export function buildClipArgs(o: {
  input: string
  output: string
  startSec: number
  endSec: number
  audioStream?: number | null
}): string[] {
  const start = Math.max(0, o.startSec - CLIP_LEAD_IN)
  const length = Math.min(CLIP_MAX_SECONDS, Math.max(0.2, o.endSec + CLIP_TAIL - start))
  const args = [
    '-nostdin',
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-ss',
    start.toFixed(3),
    '-i',
    ffInputArg(o.input),
    '-t',
    length.toFixed(3)
  ]
  if (o.audioStream != null) args.push('-map', `0:${o.audioStream}`)
  else args.push('-map', '0:a:0')
  args.push('-vn', '-sn', '-dn', '-c:a', 'aac', '-b:a', '128k', '-ac', '2')
  args.push(ffInputArg(o.output))
  return args
}

// Single-frame grab — the fallback for when the renderer's canvas is tainted.
export function buildFrameArgs(o: {
  input: string
  output: string
  atSec: number
  videoStream?: number | null
}): string[] {
  const args = [
    '-nostdin',
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-ss',
    Math.max(0, o.atSec).toFixed(3),
    '-i',
    ffInputArg(o.input),
    '-frames:v',
    '1'
  ]
  if (o.videoStream != null) args.push('-map', `0:${o.videoStream}`)
  args.push('-q:v', '2', '-an', '-sn', ffInputArg(o.output))
  return args
}

// Identifies a plan for cache-key purposes. The audio stream is part of it, so
// switching to the Japanese track produces a DIFFERENT cache entry rather than
// silently serving the English one back.
export function planTag(plan: PlaybackPlan): string {
  return [
    plan.container ?? 'none',
    plan.videoCodec ?? 'none',
    plan.audioCodec ?? 'none',
    `a${plan.audioStream ?? -1}`
  ].join('-')
}
