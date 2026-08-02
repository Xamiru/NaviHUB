import { describe, expect, it } from 'vitest'
import {
  assertSafeArgPath,
  buildClipArgs,
  buildConvertArgs,
  buildProbeArgs,
  buildSubtitleExtractArgs,
  decidePlayback,
  ffInputArg,
  planTag
} from '../src/main/video/playability'
import {
  isTextualSubtitle,
  parseProbeJson,
  pickAudioStream,
  pickVideoStream,
  subtitleStreams
} from '../src/main/video/probeParse'

// Probe fixtures shaped exactly like real ffprobe output (trimmed to the fields
// the parser reads).
const stream = (bits: Record<string, unknown>): Record<string, unknown> => ({
  index: 0,
  codec_type: 'video',
  codec_name: 'h264',
  ...bits
})

const probeJson = (
  streams: Record<string, unknown>[],
  format?: Record<string, unknown>
): string =>
  JSON.stringify({
    streams,
    format: { duration: '1440.5', start_time: '0.000000', format_name: 'matroska,webm', size: '1234', ...format }
  })

const parse = (json: string): NonNullable<ReturnType<typeof parseProbeJson>> => {
  const p = parseProbeJson(json)
  if (!p) throw new Error('fixture failed to parse')
  return p
}

const H264_AAC = probeJson([
  stream({ index: 0, codec_type: 'video', codec_name: 'h264', width: 1920, height: 1080 }),
  stream({ index: 1, codec_type: 'audio', codec_name: 'aac', channels: 2, disposition: { default: 1 } })
])

const VP9_OPUS = probeJson([
  stream({ index: 0, codec_type: 'video', codec_name: 'vp9', width: 1920, height: 1080 }),
  stream({ index: 1, codec_type: 'audio', codec_name: 'opus', disposition: { default: 1 } })
])

const HEVC_AC3 = probeJson([
  stream({ index: 0, codec_type: 'video', codec_name: 'hevc', width: 3840, height: 2160 }),
  stream({ index: 1, codec_type: 'audio', codec_name: 'ac3', channels: 6, disposition: { default: 1 } })
])

describe('parseProbeJson', () => {
  it('numbers typeIndex PER TYPE — that is what -map 0:s:N takes', () => {
    const p = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video' }),
        stream({ index: 1, codec_type: 'audio', codec_name: 'aac' }),
        stream({ index: 2, codec_type: 'audio', codec_name: 'ac3' }),
        stream({ index: 3, codec_type: 'subtitle', codec_name: 'ass', tags: { language: 'jpn' } }),
        stream({ index: 4, codec_type: 'subtitle', codec_name: 'subrip', tags: { language: 'eng' } })
      ])
    )
    const subs = subtitleStreams(p)
    expect(subs.map((s) => [s.index, s.typeIndex])).toEqual([
      [3, 0],
      [4, 1]
    ])
    expect(p.streams.filter((s) => s.type === 'audio').map((s) => s.typeIndex)).toEqual([0, 1])
  })

  it('reads tags, dispositions and format fields, and survives garbage', () => {
    const p = parse(
      probeJson(
        [stream({ index: 0, tags: { language: 'jpn', title: 'Main' }, disposition: { default: 1, forced: 1 } })],
        { duration: '90.25', start_time: '1.4' }
      )
    )
    expect(p.streams[0]).toMatchObject({ language: 'jpn', title: 'Main', isDefault: true, isForced: true })
    expect(p.durationSec).toBe(90.25)
    expect(p.startTimeSec).toBe(1.4)
    expect(parseProbeJson('not json')).toBeNull()
    expect(parse(probeJson([], { duration: 'N/A' })).durationSec).toBeNull()
  })

  it('classifies textual vs bitmap subtitles', () => {
    expect(isTextualSubtitle('ass')).toBe(true)
    expect(isTextualSubtitle('subrip')).toBe(true)
    expect(isTextualSubtitle('mov_text')).toBe(true)
    expect(isTextualSubtitle('hdmv_pgs_subtitle')).toBe(false)
    expect(isTextualSubtitle('dvd_subtitle')).toBe(false)
  })
})

describe('stream picking', () => {
  it('SKIPS MKV cover art, which is a video stream', () => {
    // -map 0:v:0 would grab the poster JPEG here and make a one-frame file —
    // a silent, baffling failure.
    const p = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video', codec_name: 'mjpeg', disposition: { attached_pic: 1 } }),
        stream({ index: 1, codec_type: 'video', codec_name: 'h264', width: 1920, height: 1080 }),
        stream({ index: 2, codec_type: 'audio', codec_name: 'aac' })
      ])
    )
    expect(pickVideoStream(p)?.index).toBe(1)
  })

  it('prefers the Japanese audio track over the default English one', () => {
    const p = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video' }),
        stream({ index: 1, codec_type: 'audio', codec_name: 'ac3', tags: { language: 'eng' }, disposition: { default: 1 } }),
        stream({ index: 2, codec_type: 'audio', codec_name: 'aac', tags: { language: 'jpn' } })
      ])
    )
    expect(pickAudioStream(p, { preferLang: 'ja' })?.index).toBe(2)
    expect(pickAudioStream(p, { preferLang: 'en' })?.index).toBe(1)
    expect(pickAudioStream(p, { preferLang: 'ja', override: 1 })?.index).toBe(1)
  })

  it('falls back to default then first, and handles no audio at all', () => {
    const p = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video' }),
        stream({ index: 1, codec_type: 'audio', codec_name: 'aac', tags: { language: 'fre' } }),
        stream({ index: 2, codec_type: 'audio', codec_name: 'aac', tags: { language: 'ger' }, disposition: { default: 1 } })
      ])
    )
    expect(pickAudioStream(p, { preferLang: 'ja' })?.index).toBe(2)
    expect(pickAudioStream(parse(probeJson([stream({ index: 0 })])))).toBeNull()
  })
})

describe('decidePlayback — container is decided by EXTENSION', () => {
  it('gives OPPOSITE answers for .mkv and .webm with the IDENTICAL format_name', () => {
    // Both fixtures say format_name: "matroska,webm". This is the whole reason
    // the decision keys off the extension.
    const mkv = decidePlayback({ ext: '.mkv', probe: parse(VP9_OPUS) })
    const webm = decidePlayback({ ext: '.webm', probe: parse(VP9_OPUS) })
    expect(webm.action).toBe('direct')
    expect(mkv.action).toBe('remux')
    expect(mkv.container).toBe('webm') // both streams copy cleanly into webm
    expect(mkv.videoCodec).toBe('copy')
    expect(mkv.audioCodec).toBe('copy')
  })

  it('remuxes an h264+aac mkv into mp4 with nothing re-encoded', () => {
    const plan = decidePlayback({ ext: '.mkv', probe: parse(H264_AAC) })
    expect(plan).toMatchObject({
      action: 'remux',
      container: 'mp4',
      videoCodec: 'copy',
      audioCodec: 'copy',
      videoStream: 0,
      audioStream: 1
    })
    expect(plan.reason).toMatch(/no quality loss/)
  })

  it('plays an mp4 with the same codecs directly', () => {
    expect(decidePlayback({ ext: '.mp4', probe: parse(H264_AAC) }).action).toBe('direct')
  })

  it('refuses a container that cannot legally hold the codec', () => {
    // A .webm holding H.264 is a real file Chromium's WebM demuxer rejects.
    const plan = decidePlayback({ ext: '.webm', probe: parse(H264_AAC) })
    expect(plan.action).toBe('remux')
    expect(plan.container).toBe('mp4')
  })
})

describe('decidePlayback — transcode cases', () => {
  it('re-encodes HEVC video and AC3 audio, and warns about HDR flattening', () => {
    const plan = decidePlayback({ ext: '.mkv', probe: parse(HEVC_AC3) })
    expect(plan).toMatchObject({ action: 'transcode', videoCodec: 'h264', audioCodec: 'aac' })
    expect(plan.reason).toMatch(/takes a while/)
    expect(plan.warnings.join(' ')).toMatch(/SDR/)
  })

  it('copies playable video while re-encoding only the audio', () => {
    const plan = decidePlayback({
      ext: '.mkv',
      probe: parse(
        probeJson([
          stream({ index: 0, codec_type: 'video', codec_name: 'h264' }),
          stream({ index: 1, codec_type: 'audio', codec_name: 'dts', disposition: { default: 1 } })
        ])
      )
    })
    expect(plan).toMatchObject({ action: 'transcode', videoCodec: 'copy', audioCodec: 'aac' })
  })

  it('forces a re-encode when a height cap applies', () => {
    const plan = decidePlayback({ ext: '.mkv', probe: parse(H264_AAC), maxHeight: 720 })
    expect(plan.videoCodec).toBe('h264')
    expect(plan.warnings.join(' ')).toMatch(/720p/)
  })

  it('sets the ADTS bitstream filter for MPEG-TS AAC copied into MP4', () => {
    const plan = decidePlayback({
      ext: '.ts',
      probe: parse(H264_AAC, )
    })
    expect(plan.needsAdtsToAsc).toBe(true)
    expect(buildConvertArgs({ input: '/a/in.ts', output: '/b/out.mp4', plan })).toContain('aac_adtstoasc')
  })

  it('records a non-zero start_time so sidecar subtitles can be shifted', () => {
    const plan = decidePlayback({
      ext: '.ts',
      probe: parse(H264_AAC.replace('"start_time":"0.000000"', '"start_time":"10.5"'))
    })
    expect(plan.startTimeOffset).toBe(10.5)
  })

  it('routes a directly-playable file to remux when the wanted audio is unreachable', () => {
    // Chromium has no audioTracks API, so a non-default track can ONLY be heard
    // via a converted copy — even though the file itself plays fine.
    const dual = probeJson(
      [
        stream({ index: 0, codec_type: 'video', codec_name: 'h264' }),
        stream({ index: 1, codec_type: 'audio', codec_name: 'aac', tags: { language: 'eng' }, disposition: { default: 1 } }),
        stream({ index: 2, codec_type: 'audio', codec_name: 'aac', tags: { language: 'jpn' } })
      ],
      { format_name: 'mov,mp4,m4a,3gp,3g2,mj2' }
    )
    expect(decidePlayback({ ext: '.mp4', probe: parse(dual), preferAudioLang: 'ja' })).toMatchObject({
      action: 'remux',
      audioStream: 2
    })
    expect(decidePlayback({ ext: '.mp4', probe: parse(dual), preferAudioLang: 'en' }).action).toBe('direct')
  })

  it('reports no video stream as unsupported', () => {
    const plan = decidePlayback({
      ext: '.mkv',
      probe: parse(probeJson([stream({ index: 0, codec_type: 'audio', codec_name: 'aac' })]))
    })
    expect(plan.action).toBe('unsupported')
    expect(plan.reason).toMatch(/No video stream/)
  })
})

describe('decidePlayback — no ffprobe at all', () => {
  it('still plays native containers and refuses the rest with an install hint', () => {
    for (const ext of ['.mp4', '.m4v', '.mov', '.webm']) {
      expect(decidePlayback({ ext, probe: null }).action).toBe('direct')
    }
    const plan = decidePlayback({ ext: '.mkv', probe: null })
    expect(plan.action).toBe('unsupported')
    expect(plan.reason).toMatch(/Install ffmpeg/)
  })
})

describe('argv safety', () => {
  it('rejects option-like, relative and NUL-bearing paths', () => {
    expect(() => assertSafeArgPath('-vf')).toThrow(/option-like/)
    expect(() => assertSafeArgPath('-y')).toThrow(/option-like/)
    expect(() => assertSafeArgPath('relative/x.mkv')).toThrow(/absolute/)
    expect(() => assertSafeArgPath('/a/b\u0000c.mkv')).toThrow(/NUL/)
    expect(() => assertSafeArgPath('')).toThrow()
  })

  it('prefixes every path with file:, which is what a "--" could NOT have fixed', () => {
    // ffmpeg parses "foo:bar" as protocol foo, so "re:zero 01.mkv" (and every
    // Windows C:\ path) is ambiguous without the prefix.
    expect(ffInputArg('/lib/re:zero 01.mkv')).toBe('file:/lib/re:zero 01.mkv')
  })

  it('always passes the input through an explicit -i, never as a positional', () => {
    const plan = decidePlayback({ ext: '.mkv', probe: parse(H264_AAC) })
    for (const args of [
      buildProbeArgs('/a/in.mkv'),
      buildConvertArgs({ input: '/a/in.mkv', output: '/b/out.mp4', plan }),
      buildSubtitleExtractArgs({ input: '/a/in.mkv', output: '/b/s.ass', typeIndex: 0, format: 'ass' }),
      buildClipArgs({ input: '/a/in.mkv', output: '/b/c.m4a', startSec: 10, endSec: 12 })
    ]) {
      const i = args.indexOf('-i')
      expect(i).toBeGreaterThan(-1)
      expect(args[i + 1]).toMatch(/^file:\//)
      // Every remaining bare path is a file: URL too.
      expect(args.filter((a) => a.startsWith('/'))).toEqual([])
    }
  })
})

describe('buildConvertArgs', () => {
  const plan = decidePlayback({ ext: '.mkv', probe: parse(H264_AAC) })
  const hevcPlan = decidePlayback({ ext: '.mkv', probe: parse(HEVC_AC3) })

  it('maps the resolved ABSOLUTE stream indices and never muxes subs or data', () => {
    const args = buildConvertArgs({ input: '/a/in.mkv', output: '/b/out.mp4', plan })
    expect(args).toContain('-sn')
    expect(args).toContain('-dn')
    expect(args.join(' ')).toContain('-map 0:0 -map 0:1')
  })

  it('adds +faststart for mp4 and avoid_negative_ts always', () => {
    const args = buildConvertArgs({ input: '/a/in.mkv', output: '/b/out.mp4', plan })
    expect(args.join(' ')).toContain('-movflags +faststart')
    expect(args.join(' ')).toContain('-avoid_negative_ts make_zero')
    expect(args.join(' ')).toContain('-progress pipe:1')
    expect(args).toContain('-nostdin')
  })

  it('pins an 8-bit pixel format on every transcode', () => {
    // 10-bit HEVC decodes to yuv420p10le, which no browser can play.
    const args = buildConvertArgs({ input: '/a/in.mkv', output: '/b/out.mp4', plan: hevcPlan })
    expect(args.join(' ')).toContain('-pix_fmt yuv420p')
    expect(args.join(' ')).toContain('-c:v libx264')
    expect(args.join(' ')).toContain('-c:a aac')
  })

  it('accepts a hardware encoder without any other change', () => {
    const args = buildConvertArgs({
      input: '/a/in.mkv',
      output: '/b/out.mp4',
      plan: hevcPlan,
      encoder: 'h264_vaapi'
    })
    expect(args.join(' ')).toContain('-c:v h264_vaapi')
  })

  it('writes webm when the plan targets it', () => {
    const webmPlan = decidePlayback({ ext: '.mkv', probe: parse(VP9_OPUS) })
    const args = buildConvertArgs({ input: '/a/in.mkv', output: '/b/out.webm', plan: webmPlan })
    expect(args.join(' ')).toContain('-f webm')
    expect(args.join(' ')).not.toContain('faststart')
  })
})

describe('buildClipArgs', () => {
  it('seeks BEFORE -i and always re-encodes', () => {
    const args = buildClipArgs({ input: '/a/in.mkv', output: '/b/c.m4a', startSec: 100, endSec: 103 })
    // -ss must come before -i: as an output option ffmpeg decodes from zero and
    // a 45-minute episode costs seconds per clip.
    expect(args.indexOf('-ss')).toBeLessThan(args.indexOf('-i'))
    // Never -c:a copy: a clip starting mid-frame pops, and copying AC3/DTS
    // gives you something Chromium can't play.
    expect(args.join(' ')).toContain('-c:a aac')
    expect(args).toContain('-vn')
  })

  it('pads the cue and caps the length', () => {
    const args = buildClipArgs({ input: '/a/in.mkv', output: '/b/c.m4a', startSec: 10, endSec: 13 })
    expect(Number(args[args.indexOf('-ss') + 1])).toBeCloseTo(9.85)
    expect(Number(args[args.indexOf('-t') + 1])).toBeCloseTo(3.4)
    const long = buildClipArgs({ input: '/a/in.mkv', output: '/b/c.m4a', startSec: 0, endSec: 500 })
    expect(Number(long[long.indexOf('-t') + 1])).toBe(30)
  })
})

describe('planTag', () => {
  it('changes with the chosen audio stream, so a track switch cannot reuse a cache entry', () => {
    const p = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video', codec_name: 'h264' }),
        stream({ index: 1, codec_type: 'audio', codec_name: 'aac', tags: { language: 'eng' }, disposition: { default: 1 } }),
        stream({ index: 2, codec_type: 'audio', codec_name: 'aac', tags: { language: 'jpn' } })
      ])
    )
    const en = planTag(decidePlayback({ ext: '.mkv', probe: p, preferAudioLang: 'en' }))
    const ja = planTag(decidePlayback({ ext: '.mkv', probe: p, preferAudioLang: 'ja' }))
    expect(en).not.toBe(ja)
  })
})
