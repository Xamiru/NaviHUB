import { describe, expect, it, vi } from 'vitest'

// Only the pure helpers are under test; everything reachable from the module's
// imports that would touch electron/the DB/the scanner is stubbed out.
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => null }))
vi.mock('../src/main/files', () => ({ musicRootDir: () => '/music' }))
vi.mock('../src/main/music', () => ({ startScan: vi.fn() }))

import {
  sanitizePathSegment,
  resolveAlbumDir,
  buildYtDlpArgs,
  parseYtDlpLine
} from '../src/main/musicDownload'

describe('sanitizePathSegment', () => {
  it('keeps unicode names', () => {
    expect(sanitizePathSegment('宇多田ヒカル')).toBe('宇多田ヒカル')
  })
  it('strips path separators and Windows-illegal characters', () => {
    expect(sanitizePathSegment('AC/DC')).toBe('AC DC')
    expect(sanitizePathSegment('What?: The <Best> "Of|*')).toBe('What The Best Of')
  })
  it('trims leading/trailing dots and whitespace', () => {
    expect(sanitizePathSegment('  ..Best Of.  ')).toBe('Best Of')
  })
  it('caps overlong names', () => {
    expect(sanitizePathSegment('x'.repeat(300)).length).toBeLessThanOrEqual(120)
  })
  it.each(['', '.', '..', '///', ' . '])('rejects unusable input %j', (bad) => {
    expect(() => sanitizePathSegment(bad)).toThrow()
  })
})

describe('resolveAlbumDir', () => {
  it('joins root/artist/album', () => {
    expect(resolveAlbumDir('/music', 'Radiohead', 'OK Computer')).toBe(
      '/music/Radiohead/OK Computer'
    )
  })
  it('cannot escape the music root, even with crafted names', () => {
    // separators/dots are sanitized away, so the result stays inside the root
    expect(resolveAlbumDir('/music', '../../etc', 'a')).toBe('/music/etc/a')
    expect(() => resolveAlbumDir('/music', '..', 'a')).toThrow()
  })
})

describe('buildYtDlpArgs', () => {
  const args = buildYtDlpArgs({
    url: 'https://youtu.be/x',
    albumDir: '/music/Radiohead/OK Computer',
    artist: 'Radiohead',
    album: 'OK Computer',
    format: 'opus'
  })
  it('extracts audio in the chosen format', () => {
    expect(args).toContain('-x')
    expect(args.join(' ')).toContain('--audio-format opus')
  })
  it('writes into the album dir with a playlist-index prefix template', () => {
    const o = args[args.indexOf('-o') + 1]
    expect(o).toBe('/music/Radiohead/OK Computer/%(playlist_index&{} - |)s%(title)s.%(ext)s')
  })
  it('forces artist/album tags to the chosen destination', () => {
    const joined = args.join('\n')
    expect(joined).toContain('Radiohead:(?P<meta_artist>.+)')
    expect(joined).toContain('Radiohead:(?P<meta_album_artist>.+)')
    expect(joined).toContain('OK Computer:(?P<meta_album>.+)')
  })
  it('puts the url last, after an option terminator', () => {
    expect(args[args.length - 1]).toBe('https://youtu.be/x')
    // '--' must directly precede the url so a '-'-prefixed paste can never be
    // parsed as a yt-dlp option (e.g. --exec).
    expect(args[args.length - 2]).toBe('--')
  })
})

describe('parseYtDlpLine', () => {
  it.each([
    ['[download]  42.7% of 4.32MiB at 1.2MiB/s', { kind: 'percent', percent: 42.7 }],
    ['[download] 100% of 4.32MiB in 00:03', { kind: 'percent', percent: 100 }],
    ['[download] Downloading item 3 of 12', { kind: 'item', index: 3, count: 12 }],
    [
      '[download] Destination: /music/Radiohead/OK Computer/01 - Airbag.webm',
      { kind: 'title', title: '01 - Airbag' }
    ],
    [
      '[download] Destination: C:\\Music\\Radiohead\\OK Computer\\01 - Airbag.webm',
      { kind: 'title', title: '01 - Airbag' }
    ],
    ['[ExtractAudio] Destination: /music/x/y.opus', { kind: 'processing' }],
    ['ERROR: Unable to extract player response', { kind: 'error', message: 'Unable to extract player response' }],
    ['[youtube] x: Downloading webpage', null]
  ])('%s', (line, expected) => {
    expect(parseYtDlpLine(line)).toEqual(expected)
  })
})
