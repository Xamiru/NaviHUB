import { describe, expect, it } from 'vitest'
import {
  assertSafeArgPath,
  buildAttachmentDumpArgs,
  buildClipArgs,
  buildProbeArgs,
  buildSubtitleExtractArgs,
  CLIP_MAX_SECONDS,
  decideDecodable,
  ffInputArg,
  safeFontFileName
} from '../src/main/video/playability'
import {
  fontAttachments,
  isPgsSubtitle,
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
    expect(isPgsSubtitle('hdmv_pgs_subtitle')).toBe(true)
    expect(isPgsSubtitle('dvd_subtitle')).toBe(false)
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

  it('copies a PGS track into a .sup container', () => {
    const args = buildSubtitleExtractArgs({
      input: '/a/in.mkv',
      output: '/b/out.sup',
      typeIndex: 0,
      format: 'pgs'
    })
    expect(args[args.indexOf('-c:s') + 1]).toBe('copy')
    expect(args[args.indexOf('-f') + 1]).toBe('sup')
    expect(args.at(-1)).toBe('file:/b/out.sup')
  })
})

describe('decideDecodable', () => {
  const at = (
    platform: NodeJS.Platform,
    videoCodec: string | null,
    audioCodec: string | null,
    ext = '.mkv'
  ): string => decideDecodable({ ext, videoCodec, audioCodec, platform }).verdict

  it('plays what Chromium decodes on every platform, Hi10P and FLAC included', () => {
    for (const platform of ['linux', 'win32', 'darwin'] as const) {
      expect(at(platform, 'h264', 'aac')).toBe('ok')
      expect(at(platform, 'h264', 'flac')).toBe('ok')
      expect(at(platform, 'vp9', 'opus')).toBe('ok')
      expect(at(platform, 'av1', 'pcm_s16le', '.mp4')).toBe('ok')
      expect(at(platform, 'h264', null, '.webm')).toBe('ok')
    }
  })

  it('refuses HEVC on Linux and defers to the OS decoder elsewhere', () => {
    expect(at('linux', 'hevc', 'aac')).toBe('unsupported')
    expect(at('win32', 'hevc', 'aac')).toBe('uncertain')
    expect(at('darwin', 'hevc', 'aac')).toBe('uncertain')
  })

  it('never lets a silent-audio codec through as ok', () => {
    expect(at('linux', 'h264', 'ac3')).toBe('unsupported')
    expect(at('linux', 'h264', 'eac3')).toBe('unsupported')
    expect(at('win32', 'h264', 'ac3')).toBe('uncertain')
    for (const platform of ['linux', 'win32'] as const) {
      expect(at(platform, 'h264', 'dts')).toBe('unsupported')
      expect(at(platform, 'h264', 'truehd')).toBe('unsupported')
    }
  })

  it('keeps the worst finding and names it', () => {
    expect(decideDecodable({ ext: '.mkv', videoCodec: 'hevc', audioCodec: 'dts', platform: 'win32' })).toEqual({
      verdict: 'unsupported',
      reason: 'DTS audio cannot be decoded inside NaviHUB.'
    })
  })

  it('refuses containers Chromium cannot demux and old video codecs', () => {
    expect(at('linux', 'h264', 'aac', '.avi')).toBe('unsupported')
    expect(at('linux', 'h264', 'aac', '.ts')).toBe('unsupported')
    expect(at('linux', 'mpeg4', 'mp3')).toBe('unsupported')
  })

  it('is uncertain without probe data, so the renderer watchdog decides', () => {
    expect(at('linux', null, null, '.mp4')).toBe('uncertain')
  })
})

describe('buildClipArgs', () => {
  it('cuts a padded, bounded audio-only clip with file: paths', () => {
    const args = buildClipArgs({ input: '/v/ep.mkv', output: '/a/out.m4a', startSec: 10, endSec: 12, audioStream: 2 })
    expect(args).toContain('file:/v/ep.mkv')
    expect(args[args.length - 1]).toBe('file:/a/out.m4a')
    expect(args[args.indexOf('-ss') + 1]).toBe('9.850')
    expect(args[args.indexOf('-map') + 1]).toBe('0:2')
    expect(args).toContain('-vn')
    const long = buildClipArgs({ input: '/v/ep.mkv', output: '/a/o.m4a', startSec: 0, endSec: 600 })
    expect(Number(long[long.indexOf('-t') + 1])).toBe(CLIP_MAX_SECONDS)
    expect(long[long.indexOf('-map') + 1]).toBe('0:a:0')
  })

  it('refuses option-like or relative paths', () => {
    expect(() => buildClipArgs({ input: '-i', output: '/a/o.m4a', startSec: 0, endSec: 1 })).toThrow()
    expect(() => buildClipArgs({ input: '/v/a.mkv', output: 'o.m4a', startSec: 0, endSec: 1 })).toThrow()
  })
})

describe('font attachments', () => {
  const probeWith = (streams: Record<string, unknown>[]): string =>
    JSON.stringify({ format: {}, streams })

  it('lists attached fonts by absolute index and ignores other attachments', () => {
    const probe = parseProbeJson(
      probeWith([
        { index: 0, codec_type: 'video', codec_name: 'h264' },
        { index: 1, codec_type: 'subtitle', codec_name: 'ass' },
        { index: 2, codec_type: 'attachment', tags: { filename: 'A-OTF Shin Go.otf', mimetype: 'application/vnd.ms-opentype' } },
        { index: 3, codec_type: 'attachment', tags: { filename: 'cover.jpg', mimetype: 'image/jpeg' } },
        { index: 4, codec_type: 'attachment', tags: { filename: 'font', mimetype: 'application/x-truetype-font' } },
        { index: 5, codec_type: 'attachment', tags: {} }
      ])
    )!
    expect(probe.attachments?.map((a) => a.index)).toEqual([2, 3, 4])
    expect(fontAttachments(probe).map((a) => a.index)).toEqual([2, 4])
    // Attachments stay 'other' streams, which no stream picker or extractor maps.
    expect(probe.streams.filter((s) => s.type !== 'other').map((s) => s.type)).toEqual([
      'video',
      'subtitle'
    ])
  })

  it('keeps cache names inside the folder, unique and font-typed', () => {
    expect(safeFontFileName('A-OTF Shin Go.otf', 2)).toBe('2-A-OTF Shin Go.otf')
    expect(safeFontFileName('../../evil/..ttf', 3)).toBe('3-font.ttf')
    expect(safeFontFileName('C:\\fonts\\メイリオ.TTC', 4)).toBe('4-____.ttc')
    expect(safeFontFileName('-rf', 5)).toBe('5-rf.ttf')
    expect(safeFontFileName('x'.repeat(300) + '.woff2', 6)).toMatch(/^6-x{80}\.woff2$/)
  })

  it('dumps each attachment to an absolute file: path before the input', () => {
    const args = buildAttachmentDumpArgs({
      input: '/v/ep.mkv',
      attachments: [
        { index: 2, output: '/c/fonts/2-a.otf' },
        { index: 4, output: '/c/fonts/4-b.ttf' }
      ]
    })
    expect(args).toEqual([
      '-nostdin', '-hide_banner', '-loglevel', 'error', '-y',
      '-dump_attachment:2', 'file:/c/fonts/2-a.otf',
      '-dump_attachment:4', 'file:/c/fonts/4-b.ttf',
      '-i', 'file:/v/ep.mkv'
    ])
    expect(() =>
      buildAttachmentDumpArgs({ input: '/v/ep.mkv', attachments: [{ index: 2, output: 'rel.ttf' }] })
    ).toThrow()
    expect(() =>
      buildAttachmentDumpArgs({ input: '/v/ep.mkv', attachments: [{ index: -1, output: '/c/a.ttf' }] })
    ).toThrow()
  })
})
