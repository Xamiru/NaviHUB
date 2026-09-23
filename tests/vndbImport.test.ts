import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
let db: Database.Database
const post = vi.hoisted(() => vi.fn())
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/http', () => ({
  fetchWithRetry: post,
  MAX_API_RESPONSE_BYTES: 1000000,
  sleep: async () => {}
}))
vi.mock('../src/main/files', () => ({ downloadImages: async () => new Map() }))
vi.mock('../src/main/progress', () => ({ updateActivity: () => {} }))
import { importVisualNovel } from '../src/main/vndb'
import { discoverBody, edition, refreshReleases, saveEdition } from '../src/main/vndbExplore'
import * as reading from '../src/main/repos/vnReadingRepo'
// @ts-expect-error maintenance JS
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'
let vn: Record<string, unknown>
let releases: Record<string, unknown>[]
beforeEach(() => {
  db = createTestDb()
  vn = {
    id: 'v17',
    title: 'Ever17',
    languages: ['ja', 'en'],
    platforms: ['win'],
    tags: [{ id: 'g1', name: 'Mystery', spoiler: 2 }],
    relations: [{ id: 'v18', title: 'Related', relation: 'seq' }]
  }
  releases = [
    {
      id: 'r1',
      title: 'Edition',
      released: '2025-09',
      languages: [{ lang: 'en', mtl: false }],
      platforms: ['win'],
      producers: [{ name: 'Publisher', publisher: true }],
      official: false,
      patch: true,
      vns: [{ id: 'v17', rtype: 'partial' }]
    }
  ]
  post.mockImplementation(async (url: string) => ({
    ok: true,
    json: async () => ({
      more: false,
      results: url.endsWith('/vn') ? [vn] : url.endsWith('/release') ? releases : []
    })
  }))
})
afterEach(() => db.close())
describe('VNDB discovery and personal preservation', () => {
  it('includes all spoiler levels and uses the supported length filter', () => {
    const body = discoverBody({
      query: '',
      language: 'en',
      platform: 'win',
      length: 3,
      minRating: 80,
      tags: ['g1'],
      page: 2
    })
    expect(body.filters).toEqual([
      'and',
      ['lang', '=', 'en'],
      ['platform', '=', 'win'],
      ['length', '=', 3],
      ['rating', '>=', 80],
      ['tag', '=', ['g1', 2, 0]]
    ])
    expect(() =>
      discoverBody({
        query: '',
        language: '',
        platform: '',
        length: null,
        minRating: null,
        tags: [],
        page: 0
      })
    ).toThrow()
  })
  it('refreshes canonical tags/relations while preserving reading and edition state, including cover-only refresh', async () => {
    const { mediaId } = await importVisualNovel(17)
    db.prepare("UPDATE media_item SET status='Playing',progress=120,score=9 WHERE id=?").run(
      mediaId
    )
    reading.saveResume(mediaId, { nodeId: null, saveSlot: '12', recap: 'Private recap' })
    await refreshReleases(mediaId)
    saveEdition(mediaId, 'r1', 'My translation patch')
    expect(edition(mediaId).selected).toMatchObject({
      released: '2025-09',
      patch: true,
      completeness: 'partial'
    })
    vn.tags = []
    vn.relations = []
    await importVisualNovel(17, { only: ['cover'] })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_tag').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_relation').get()).toEqual({ n: 1 })
    await importVisualNovel(17)
    expect(db.prepare('SELECT * FROM media_tag').all()).toEqual([])
    expect(db.prepare('SELECT * FROM media_relation').all()).toEqual([])
    expect(reading.overview(mediaId).resume.recap).toBe('Private recap')
    expect(
      db.prepare('SELECT progress,score,status FROM media_item WHERE id=?').get(mediaId)
    ).toEqual({ progress: 120, score: 9, status: 'Playing' })
    releases = []
    await refreshReleases(mediaId)
    expect(edition(mediaId)).toMatchObject({
      releases: [],
      selected: { id: 'r1' },
      notes: 'My translation patch'
    })
    saveEdition(mediaId, 'r1', 'Keep removed source snapshot')
    expect(() => saveEdition(mediaId, 'r999', 'Bad')).toThrow(/cached release/)
    sanitizeDb(db)
    expect(edition(mediaId)).toMatchObject({ selected: null, notes: '' })
  })
  it('retains the last complete cache when a refresh fails', async () => {
    const { mediaId } = await importVisualNovel(17)
    await refreshReleases(mediaId)
    post.mockRejectedValueOnce(new Error('Offline'))
    await expect(refreshReleases(mediaId)).rejects.toThrow('Offline')
    expect(edition(mediaId).releases).toHaveLength(1)
  })
})
