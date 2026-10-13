import { isAbsolute } from 'path'

// ffmpeg and ffprobe have no `--` option terminator. Paths must be absolute to
// prevent option injection, and `file:` disambiguates filenames containing a
// colon (including every Windows drive path) from ffmpeg protocols.
export function assertSafeArgPath(path: string): void {
  if (!path) throw new Error('Empty path')
  if (path.startsWith('-')) throw new Error(`Refusing an option-like path: ${path}`)
  if (!isAbsolute(path)) throw new Error(`ffmpeg path must be absolute: ${path}`)
  if (path.includes('\u0000')) throw new Error('Path contains a NUL byte')
}

export function ffInputArg(absPath: string): string {
  assertSafeArgPath(absPath)
  return `file:${absPath}`
}

export function buildProbeArgs(absPath: string): string[] {
  return [
    '-v',
    'error',
    '-hide_banner',
    '-print_format',
    'json',
    '-show_format',
    '-show_streams',
    '-i',
    ffInputArg(absPath)
  ]
}

// Pulls one textual subtitle stream out for the offline Japanese corpus.
// typeIndex (not the absolute stream index) is what -map 0:s:N expects.
export function buildSubtitleExtractArgs(input: {
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
    ffInputArg(input.input),
    '-map',
    `0:s:${input.typeIndex}`,
    '-c:s',
    input.format === 'vtt' ? 'webvtt' : 'copy',
    '-f',
    input.format === 'vtt' ? 'webvtt' : input.format,
    ffInputArg(input.output)
  ]
}

// ---- In-app playback decode gate ----
// The player plays files straight off navimg:// with no remux or transcode.
// Chromium in Electron 44 decodes Matroska, H.264 at every profile (Hi10P in
// software), VP8/VP9/AV1, and AAC/MP3/Opus/Vorbis/FLAC/PCM. Two failures are
// silent, which is why this gate exists: HEVC on Linux plays audio with no
// picture, and AC3/E-AC3/DTS plays a picture with zero decoded audio bytes and
// no error event. HEVC and AC3 depend on the OS decoder elsewhere, so they are
// `uncertain` there and the renderer's watchdog has the final word.

export type DecodeVerdict = 'ok' | 'uncertain' | 'unsupported'

export interface DecodeDecision {
  verdict: DecodeVerdict
  reason: string | null
}

const OK_CONTAINERS = new Set(['.mkv', '.webm', '.mp4', '.m4v', '.mov'])
const OK_VIDEO = new Set(['h264', 'vp8', 'vp9', 'av1'])
const OS_VIDEO = new Set(['hevc', 'h265'])
const OK_AUDIO = new Set(['aac', 'mp3', 'opus', 'vorbis', 'flac'])
const OS_AUDIO = new Set(['ac3', 'eac3'])

export function decideDecodable(input: {
  ext: string
  videoCodec: string | null
  audioCodec: string | null
  platform: NodeJS.Platform
}): DecodeDecision {
  const ext = input.ext.toLowerCase()
  if (!OK_CONTAINERS.has(ext)) {
    return {
      verdict: 'unsupported',
      reason: `The ${ext.replace(/^\./, '').toUpperCase() || 'unknown'} container cannot be played inside NaviHUB.`
    }
  }
  const osDecoder = input.platform === 'win32' || input.platform === 'darwin'
  let verdict: DecodeVerdict = 'ok'
  let reason: string | null = null
  const worse = (v: DecodeVerdict, why: string): void => {
    const rank = { ok: 0, uncertain: 1, unsupported: 2 }
    if (rank[v] > rank[verdict]) {
      verdict = v
      reason = why
    }
  }

  const v = input.videoCodec?.toLowerCase() ?? null
  if (v == null) worse('uncertain', 'The video codec is unknown until ffprobe has read the file.')
  else if (OS_VIDEO.has(v)) {
    if (osDecoder) worse('uncertain', 'HEVC video depends on the system decoder.')
    else worse('unsupported', 'HEVC video cannot be decoded inside NaviHUB on Linux.')
  } else if (!OK_VIDEO.has(v)) {
    worse('unsupported', `${v.toUpperCase()} video cannot be decoded inside NaviHUB.`)
  }

  const a = input.audioCodec?.toLowerCase() ?? null
  if (a != null && !OK_AUDIO.has(a) && !a.startsWith('pcm_')) {
    if (OS_AUDIO.has(a) && osDecoder) {
      worse('uncertain', `${a.toUpperCase()} audio depends on the system decoder.`)
    } else {
      worse('unsupported', `${a.toUpperCase()} audio cannot be decoded inside NaviHUB.`)
    }
  }
  return { verdict, reason }
}

// ---- Sentence audio for a mined card ----
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

// ---- Fonts attached to the container (styled ASS subtitles) ----

// A cache file name for an attachment: its own base name with anything outside
// a conservative set replaced, and always a font extension, so a hostile tag
// can never escape the cache folder or produce an option-like name.
export function safeFontFileName(filename: string, index: number): string {
  const base = filename.split(/[\\/]/).pop() ?? ''
  const ext = /\.(ttf|otf|ttc|woff2?)$/i.exec(base)?.[1]?.toLowerCase() ?? 'ttf'
  const stem = base
    .replace(/\.[^.]*$/, '')
    .replace(/[^A-Za-z0-9 _.()+-]/g, '_')
    .replace(/^[.\-\s]+/, '')
    .slice(0, 80)
  return `${index}-${stem || 'font'}.${ext}`
}

// Dumps the given attachment streams, each to its own absolute path. ffmpeg
// insists on an output file and exits non-zero without one, so callers judge
// success by the files existing, not by the exit status.
export function buildAttachmentDumpArgs(o: {
  input: string
  attachments: { index: number; output: string }[]
}): string[] {
  const args = ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y']
  for (const a of o.attachments) {
    if (!Number.isInteger(a.index) || a.index < 0) throw new Error(`Bad attachment index: ${a.index}`)
    args.push(`-dump_attachment:${a.index}`, ffInputArg(a.output))
  }
  args.push('-i', ffInputArg(o.input))
  return args
}
