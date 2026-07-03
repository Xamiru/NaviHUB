import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as mediaRepo from '../src/main/repos/mediaRepo'
import * as tagRepo from '../src/main/repos/tagRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addAnime(title: string, extra: Partial<Parameters<typeof mediaRepo.create>[0]> = {}) {
  return mediaRepo.create({ mediaType: 'anime', title, ...extra })
}

describe('mediaRepo.list', () => {
  it('filters by media type', () => {
    addAnime('Frieren')
    mediaRepo.create({ mediaType: 'movie', title: 'Inception' })
    const anime = mediaRepo.list({ mediaType: 'anime' })
    expect(anime.map((m) => m.title)).toEqual(['Frieren'])
  })

  it('filters by status, search and favorite together', () => {
    addAnime('Frieren', { status: 'Watching', favorite: true })
    addAnime('Frieren S2', { status: 'Plan to Watch' })
    addAnime('Monster', { status: 'Watching' })

    expect(
      mediaRepo.list({ mediaType: 'anime', status: 'Watching' }).map((m) => m.title)
    ).toEqual(expect.arrayContaining(['Frieren', 'Monster']))
    expect(mediaRepo.list({ mediaType: 'anime', search: 'frie' })).toHaveLength(2)
    expect(mediaRepo.list({ mediaType: 'anime', favorite: true }).map((m) => m.title)).toEqual([
      'Frieren'
    ])
  })

  it('matches the original title in search', () => {
    addAnime('Frieren', { titleOriginal: '葬送のフリーレン' })
    expect(mediaRepo.list({ mediaType: 'anime', search: 'フリーレン' })).toHaveLength(1)
  })

  it('sorts by score with NULLs last regardless of direction', () => {
    addAnime('Unscored')
    addAnime('Good', { score: 8 })
    addAnime('Great', { score: 9.5 })
    const desc = mediaRepo.list({ mediaType: 'anime', sort: 'score' })
    expect(desc.map((m) => m.title)).toEqual(['Great', 'Good', 'Unscored'])
    const asc = mediaRepo.list({ mediaType: 'anime', sort: 'score', sortDir: 'asc' })
    expect(asc.map((m) => m.title)).toEqual(['Good', 'Great', 'Unscored'])
  })

  it('filters by tag', () => {
    const tagId = tagRepo.upsert({ name: 'Fantasy' })
    addAnime('Frieren', { tagIds: [tagId] })
    addAnime('Monster')
    expect(mediaRepo.list({ mediaType: 'anime', tagId }).map((m) => m.title)).toEqual(['Frieren'])
  })
})

describe('mediaRepo create/get/update', () => {
  it('round-trips a full item with tags and metadata', () => {
    const tagId = tagRepo.upsert({ name: 'Fantasy' })
    const id = addAnime('Frieren', {
      status: 'Watching',
      score: 9,
      progress: 12,
      totalUnits: 28,
      favorite: true,
      metadata: { averageScore: 91 },
      tagIds: [tagId]
    })
    const got = mediaRepo.get(id)
    expect(got).not.toBeNull()
    expect(got!.title).toBe('Frieren')
    expect(got!.favorite).toBe(true)
    expect(got!.metadata).toEqual({ averageScore: 91 })
    expect(got!.tags.map((t) => t.name)).toEqual(['Fantasy'])

    mediaRepo.update(id, { score: 10, tagIds: [] })
    const after = mediaRepo.get(id)
    expect(after!.score).toBe(10)
    expect(after!.tags).toEqual([])
  })

  it('statusCounts groups by status and skips NULL', () => {
    addAnime('A', { status: 'Watching' })
    addAnime('B', { status: 'Watching' })
    addAnime('C', { status: 'Completed' })
    addAnime('D')
    expect(mediaRepo.statusCounts('anime')).toEqual({ Watching: 2, Completed: 1 })
  })

  it('remove also drops the item from media lists', () => {
    const id = addAnime('Frieren')
    db.prepare(`INSERT INTO list (title, entity_kind) VALUES ('Faves', 'media')`).run()
    db.prepare(`INSERT INTO list_item (list_id, entity_id, sort_order) VALUES (1, ?, 0)`).run(id)
    mediaRepo.remove(id)
    expect(db.prepare('SELECT COUNT(*) AS n FROM list_item').get()).toEqual({ n: 0 })
  })
})
