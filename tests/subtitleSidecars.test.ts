import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, describe, expect, it, vi } from 'vitest'

// Only the sidecar scan is under test; the ffmpeg and cache modules pull in electron.
vi.mock('../src/main/video/ffmpeg', () => ({ runFfmpegOnce: async () => null, hasFfmpeg: () => false }))
vi.mock('../src/main/video/cache', () => ({}))

import { listTracks } from '../src/main/video/subtitles'

let dir = ''
afterEach(() => rmSync(dir, { recursive: true, force: true }))

function folder(files: string[]): void {
  dir = mkdtempSync(join(tmpdir(), 'navihub-subs-'))
  for (const f of files) writeFileSync(join(dir, f), '')
}

describe('sidecar discovery', () => {
  it('finds a lone PGS file beside a lone video, whatever it is named', () => {
    folder(['Movie.mkv', 'English.sup'])
    const tracks = listTracks(join(dir, 'Movie.mkv'), 'video/Movie/Movie.mkv', null)
    expect(tracks.map((t) => [t.format, t.url !== null])).toEqual([['pgs', true]])
  })

  it('still finds a lone text subtitle beside a lone video', () => {
    folder(['Movie.mkv', 'English.srt'])
    expect(listTracks(join(dir, 'Movie.mkv'), 'video/Movie/Movie.mkv', null)).toHaveLength(1)
  })

  it('does not guess when the folder holds two videos', () => {
    folder(['A.mkv', 'B.mkv', 'English.sup'])
    expect(listTracks(join(dir, 'A.mkv'), 'video/A.mkv', null)).toEqual([])
  })
})
