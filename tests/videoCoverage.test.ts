import { describe, expect, it, vi, beforeEach } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({
  mangaRootDir: () => '/manga',
  videoRootDir: () => '/video',
  absoluteMediaPath: (p: string) => `/abs/${p}`
}))
// seriesText pulls these in transitively; none are exercised by the corpus
// selection itself, and stubbing them keeps this test binary- and electron-free.
vi.mock('../src/main/manga', () => ({ listChapterPages: async () => [] }))
vi.mock('../src/main/mokuro', () => ({ getChapterOcr: () => null }))
vi.mock('../src/main/epub', () => ({ isEpubFile: () => false, listEpubPages: async () => [] }))
vi.mock('../src/main/archive', () => ({ readArchiveEntry: async () => null }))
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))
vi.mock('../src/main/video/ffmpeg', () => ({ probeFile: async () => null }))
vi.mock('../src/main/video/subtitles', () => ({
  listTracks: () => [],
  extractAll: async () => []
}))

import { pickCorpusTrack, seriesCorpus } from '../src/main/seriesText'
import type { VideoSubtitleTrack } from '../src/shared/types'

beforeEach(() => {
  db = createTestDb()
})

const makeMedia = (title = 'Frieren'): number =>
  Number(
    db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', ?)`).run(title)
      .lastInsertRowid
  )

const addChapter = (mediaId: number, dirPath: string, sort: number): void => {
  db.prepare(
    `INSERT INTO manga_chapter (media_id, dir_path, title, sort_order) VALUES (?, ?, ?, ?)`
  ).run(mediaId, dirPath, dirPath, sort)
}

const addVideo = (mediaId: number, filePath: string, sort: number): void => {
  db.prepare(
    `INSERT INTO video_file (media_id, file_path, title, sort_order) VALUES (?, ?, ?, ?)`
  ).run(mediaId, filePath, filePath, sort)
}

describe('seriesCorpus', () => {
  it('returns video files in scan order when only a video folder is attached', () => {
    const id = makeMedia()
    addVideo(id, 'Frieren/02.mkv', 1)
    addVideo(id, 'Frieren/01.mkv', 0)
    expect(seriesCorpus(id)).toEqual([
      { kind: 'video', path: 'Frieren/01.mkv', label: 'Frieren/01.mkv' },
      { kind: 'video', path: 'Frieren/02.mkv', label: 'Frieren/02.mkv' }
    ])
  })

  it('prefers manga chapters when a title has BOTH', () => {
    // A series with scanned chapters is being read; OCR text is the richer
    // corpus, and mixing the two would double-count shared vocabulary.
    const id = makeMedia()
    addChapter(id, 'Frieren/Ch 001', 0)
    addVideo(id, 'Frieren/01.mkv', 0)
    expect(seriesCorpus(id).map((u) => u.kind)).toEqual(['chapter'])
  })

  it('returns nothing for a title with neither', () => {
    expect(seriesCorpus(makeMedia())).toEqual([])
  })
})

describe('pickCorpusTrack', () => {
  const track = (bits: Partial<VideoSubtitleTrack>): VideoSubtitleTrack => ({
    id: bits.id ?? 't',
    label: 'x',
    lang: 'other',
    format: 'ass',
    url: 'navimg://video/x.ass',
    signs: false,
    forced: false,
    textual: true,
    ...bits
  })

  it('prefers a Japanese dialogue track', () => {
    const ja = track({ id: 'ja', lang: 'ja' })
    expect(pickCorpusTrack([track({ id: 'en', lang: 'en' }), ja])).toBe(ja)
  })

  it('never picks a signs track over real dialogue', () => {
    // A "Signs & Songs" track is ~30 lines of sign translations; scoring it as
    // the corpus would report absurd comprehension.
    const dialogue = track({ id: 'd', lang: 'ja' })
    const signs = track({ id: 's', lang: 'ja', signs: true })
    expect(pickCorpusTrack([signs, dialogue])).toBe(dialogue)
  })

  it('deprioritises forced tracks and skips bitmap ones entirely', () => {
    const forced = track({ id: 'f', lang: 'ja', forced: true })
    const plain = track({ id: 'p', lang: 'ja' })
    expect(pickCorpusTrack([forced, plain])).toBe(plain)
    expect(pickCorpusTrack([track({ id: 'pgs', lang: 'ja', textual: false })])).toBeNull()
    expect(pickCorpusTrack([])).toBeNull()
  })

  it('falls back to an unknown-language track rather than giving up', () => {
    const other = track({ id: 'o', lang: 'other' })
    expect(pickCorpusTrack([other])).toBe(other)
  })
})
