import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb, createDictTestDb } from './helpers'
// @ts-expect-error maintenance JS
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'
let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb }))
const token = vi.hoisted(() =>
  vi.fn(async (text: string) =>
    text.split(' ').map((s) => ({ surface: s, base: s, wordLike: true }))
  )
)
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({
  mangaRootDir: () => '/manga',
  videoRootDir: () => '/video',
  absoluteMediaPath: (p: string) => p
}))
vi.mock('../src/main/manga', () => ({ listChapterPages: async () => [] }))
vi.mock('../src/main/mokuro', () => ({ getChapterOcr: () => null }))
vi.mock('../src/main/epub', () => ({ isEpubFile: () => false, listEpubPages: async () => [] }))
vi.mock('../src/main/archive', () => ({ readArchiveEntry: async () => null }))
vi.mock('../src/main/tokenizer', () => ({ tokenize: token }))
vi.mock('../src/main/video/ffmpeg', () => ({ probeFile: async () => null }))
vi.mock('../src/main/video/subtitles', () => ({ listTracks: () => [], extractAll: async () => [] }))
import * as repo from '../src/main/repos/vnCaptureRepo'
import { buildPrepDeck, getPrepDeckStatus } from '../src/main/prepDeck'
import { setImmediate as yieldToLoop } from 'timers/promises'
import { countSeriesWords, seriesCorpus } from '../src/main/seriesText'
const input = { title: 'Session', body: '猫 犬 猫', nodeId: null, capturedOn: '2026-09-23' }
beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
  token.mockClear()
  db.exec(
    "INSERT INTO media_item(id,media_type,title) VALUES(1,'visual_novel','VN'),(2,'visual_novel','Other'),(3,'anime','Anime')"
  )
})
afterEach(() => {
  db.close()
  dictDb.close()
})
describe('VN text capture corpus', () => {
  it('feeds saved text into the shared frequency pipeline and refuses duplicate/foreign captures', async () => {
    const id = repo.save(1, null, input)
    expect(seriesCorpus(1)).toEqual([{ kind: 'vn', path: String(id), label: 'Session' }])
    const counts = await countSeriesWords(1)
    expect(counts.counts.get('猫')).toBe(2)
    expect(counts.tokenCount).toBe(3)
    expect(() => repo.save(1, null, { ...input, body: '  猫 犬 猫  ' })).toThrow(/already/)
    expect(() => repo.get(2, id)).toThrow(/not found/)
    expect(() => repo.save(3, null, input)).toThrow(/not found/)
  })
  it('invalidates old coverage on edit/delete and rejects a scan changed while tokenizing', async () => {
    const id = repo.save(1, null, input)
    db.exec(
      "INSERT INTO jp_coverage VALUES(1,'2026-09-23',1,3,2); INSERT INTO jp_coverage_word VALUES(1,'猫',2)"
    )
    repo.save(1, id, { ...input, body: '猫' })
    expect(db.prepare('SELECT * FROM jp_coverage').all()).toEqual([])
    expect(db.prepare('SELECT * FROM jp_coverage_word').all()).toEqual([])
    token.mockImplementationOnce(async () => {
      repo.remove(1, id)
      return []
    })
    await expect(countSeriesWords(1)).rejects.toThrow(/changed during/)
  })
  it('does not recreate stale coverage or save a deck if a capture is removed during glossing', async () => {
    const words = Array.from({ length: 70 }, (_, i) => `猫${i}`)
    dictDb.exec("INSERT INTO dict(id,title) VALUES(1,'Test')")
    for (const word of words)
      dictDb
        .prepare('INSERT INTO term(dict_id,expression,glossary) VALUES(1,?,?)')
        .run(word, '["cat"]')
    const id = repo.save(1, null, { ...input, body: words.join(' ') })
    const building = buildPrepDeck(1)
    for (let i = 0; i < 10 && getPrepDeckStatus().phase !== 'glossing'; i++) await yieldToLoop()
    expect(getPrepDeckStatus().phase).toBe('glossing')
    repo.remove(1, id)
    await expect(building).rejects.toThrow(/changed during deck/)
    expect(db.prepare('SELECT * FROM jp_coverage').all()).toEqual([])
    expect(db.prepare('SELECT * FROM jp_course').all()).toEqual([])
  })
  it('bounds input and strips saved logs from exports', () => {
    expect(() => repo.save(1, null, { ...input, body: 'a'.repeat(200001) })).toThrow()
    repo.save(1, null, input)
    sanitizeDb(db)
    expect(repo.list(1)).toEqual([])
  })
})
