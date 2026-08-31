import { describe, expect, it } from 'vitest'
import {
  assertSafeArgPath,
  buildProbeArgs,
  buildSubtitleExtractArgs,
  ffInputArg
} from '../src/main/video/playability'
import {
  isTextualSubtitle,
  parseProbeJson,
  pickAudioStream,
  pickVideoStream,
  subtitleStreams
} from '../src/main/video/probeParse'

const stream = (bits: Record<string, unknown>): Record<string, unknown> => ({
  index: 0,
  codec_type: 'video',
  codec_name: 'h264',
  ...bits
})

const probeJson = (streams: Record<string, unknown>[], format?: Record<string, unknown>): string =>
  JSON.stringify({
    streams,
    format: {
      duration: '1440.5',
      start_time: '0.000000',
      format_name: 'matroska,webm',
      size: '1234',
      ...format
    }
  })

const parse = (json: string): NonNullable<ReturnType<typeof parseProbeJson>> => {
  const probe = parseProbeJson(json)
  if (!probe) throw new Error('fixture failed to parse')
  return probe
}

describe('parseProbeJson', () => {
  it('numbers subtitle indices per type for ffmpeg mapping', () => {
    const probe = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video' }),
        stream({ index: 1, codec_type: 'audio', codec_name: 'aac' }),
        stream({ index: 2, codec_type: 'subtitle', codec_name: 'ass' }),
        stream({ index: 3, codec_type: 'subtitle', codec_name: 'subrip' })
      ])
    )
    expect(subtitleStreams(probe).map((item) => [item.index, item.typeIndex])).toEqual([
      [2, 0],
      [3, 1]
    ])
  })

  it('reads metadata and survives malformed output', () => {
    const probe = parse(
      probeJson(
        [
          stream({
            tags: { language: 'jpn', title: 'Main' },
            disposition: { default: 1, forced: 1 }
          })
        ],
        { duration: '90.25', start_time: '1.4' }
      )
    )
    expect(probe.streams[0]).toMatchObject({
      language: 'jpn',
      title: 'Main',
      isDefault: true,
      isForced: true
    })
    expect(probe.durationSec).toBe(90.25)
    expect(probe.startTimeSec).toBe(1.4)
    expect(parseProbeJson('not json')).toBeNull()
  })

  it('distinguishes textual and bitmap subtitle codecs', () => {
    expect(isTextualSubtitle('ass')).toBe(true)
    expect(isTextualSubtitle('subrip')).toBe(true)
    expect(isTextualSubtitle('mov_text')).toBe(true)
    expect(isTextualSubtitle('hdmv_pgs_subtitle')).toBe(false)
  })
})

describe('stream picking', () => {
  it('skips attached cover art and can prefer Japanese audio', () => {
    const probe = parse(
      probeJson([
        stream({ index: 0, codec_type: 'video', codec_name: 'mjpeg', disposition: { attached_pic: 1 } }),
        stream({ index: 1, codec_type: 'video', codec_name: 'h264' }),
        stream({
          index: 2,
          codec_type: 'audio',
          codec_name: 'aac',
          tags: { language: 'eng' },
          disposition: { default: 1 }
        }),
        stream({ index: 3, codec_type: 'audio', codec_name: 'aac', tags: { language: 'jpn' } })
      ])
    )
    expect(pickVideoStream(probe)?.index).toBe(1)
    expect(pickAudioStream(probe, { preferLang: 'ja' })?.index).toBe(3)
  })
})

describe('ffmpeg argv safety', () => {
  it('rejects unsafe paths and prefixes paths with file:', () => {
    expect(() => assertSafeArgPath('-vf')).toThrow(/option-like/)
    expect(() => assertSafeArgPath('relative/video.mkv')).toThrow(/absolute/)
    expect(() => assertSafeArgPath('/a/b\u0000c.mkv')).toThrow(/NUL/)
    expect(ffInputArg('/lib/re:zero 01.mkv')).toBe('file:/lib/re:zero 01.mkv')
  })

  it('builds safe probe and subtitle extraction arguments', () => {
    const probe = buildProbeArgs('/a/in.mkv')
    const subtitle = buildSubtitleExtractArgs({
      input: '/a/in.mkv',
      output: '/b/out.ass',
      typeIndex: 2,
      format: 'ass'
    })
    expect(probe[probe.indexOf('-i') + 1]).toBe('file:/a/in.mkv')
    expect(subtitle[subtitle.indexOf('-i') + 1]).toBe('file:/a/in.mkv')
    expect(subtitle).toContain('0:s:2')
    expect(subtitle.at(-1)).toBe('file:/b/out.ass')
  })
})
