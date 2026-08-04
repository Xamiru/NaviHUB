import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { search, importBook } from '../src/main/openlibrary'

// Offline import of an Open Library work against the real schema: string work
// ids, editions-median page count, authors as writer credits, capped subject
// tags, ratings into metadata, and re-import preserving personal tracking.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, `media/dl-${u}.jpg`])),
  downloadImage: async () => null
}))

// URL-keyed fixtures: the importer fans out to work/authors/editions/ratings.
let fixtures: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (url: string) => {
    const path = new URL(url).pathname
    const fixture = fixtures[path]
    if (fixture === undefined) return { ok: false, status: 404, json: async () => ({}) }
    return { ok: true, status: 200, json: async () => fixture }
  }
}))

function workFixtures(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    '/works/OL45883W.json': {
      key: '/works/OL45883W',
      title: 'The Hobbit',
      description: { type: '/type/text', value: 'A hole in the ground.' },
      covers: [1234],
      subjects: ['Fantasy', 'Dragons', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'],
      authors: [{ author: { key: '/authors/OL23919A' } }],
      first_publish_date: '1937',
      ...overrides
    },
    '/authors/OL23919A.json': {
      name: 'J.R.R. Tolkien',
      photos: [6788]
    },
    '/works/OL45883W/editions.json': {
      entries: [
        { number_of_pages: 300 },
        { number_of_pages: 310 },
        { title: 'no pages stated' },
        { number_of_pages: 290 }
      ]
    },
    '/works/OL45883W/ratings.json': {
      summary: { average: 4.25, count: 1000 }
    }
  }
}

beforeEach(() => {
  db = createTestDb()
  fixtures = workFixtures()
})

describe('search', () => {
  it('maps work docs to string-id results with pages and cover', async () => {
    fixtures['/search.json'] = {
      docs: [
        {
          key: '/works/OL45883W',
          title: 'The Hobbit',
          author_name: ['J.R.R. Tolkien'],
          first_publish_year: 1937,
          cover_i: 1234,
          number_of_pages_median: 310
        },
        // Non-work keys (editions, authors) never leak into results.
        { key: '/books/OL1M', title: 'An edition' }
      ]
    }
    const results = await search('the hobbit')
    expect(results).toEqual([
      {
        id: 'OL45883W',
        title: 'The Hobbit',
        native: 'J.R.R. Tolkien',
        year: 1937,
        format: 'Book',
        episodes: 310,
        coverUrl: 'https://covers.openlibrary.org/b/id/1234-M.jpg'
      }
    ])
  })
})

describe('importBook', () => {
  it('imports a book with median pages, author credit, capped tags and rating', async () => {
    const summary = await importBook('OL45883W')
    expect(summary).toMatchObject({ created: true, studios: 0, cast: 0, staff: 1 })

    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='openlibrary' AND external_id='OL45883W'`)
      .get() as Record<string, unknown>
    expect(media.media_type).toBe('book')
    expect(media.title).toBe('The Hobbit')
    // {value}-form description unwrapped.
    expect(media.synopsis).toBe('A hole in the ground.')
    // Median of [290, 300, 310] = 300.
    expect(media.total_units).toBe(300)
    expect(media.release_date).toBe('1937-01-01')
    expect(media.cover_path).toBeTruthy()
    // 4.25 stars × 20 → 85 on the shared 0-100 community scale.
    expect(JSON.parse(media.metadata as string)).toEqual({ olRating: 85 })

    const credits = db
      .prepare(
        `SELECT p.name, p.photo_path, c.role FROM credit c JOIN person p ON p.id = c.person_id`
      )
      .all() as Record<string, unknown>[]
    expect(credits).toHaveLength(1)
    expect(credits[0].name).toBe('J.R.R. Tolkien')
    expect(credits[0].role).toBe('writer')
    expect(credits[0].photo_path).toBeTruthy()

    // 12 subjects in the fixture, capped at 10.
    expect(db.prepare('SELECT COUNT(*) AS n FROM tag').get()).toEqual({ n: 10 })
  })

  it('rejects a malformed work id', async () => {
    await expect(importBook('../etc/passwd')).rejects.toThrow('Invalid Open Library work id')
  })

  it('re-import preserves personal tracking, dedups, and never wipes a manual page count', async () => {
    const { mediaId } = await importBook('OL45883W')
    db.prepare(
      `UPDATE media_item SET status='Reading', score=8, progress=120, total_units=305 WHERE id=?`
    ).run(mediaId)

    // Second import: editions now state no pages at all — the COALESCE must
    // keep the hand-entered 305 instead of nulling it.
    fixtures = workFixtures()
    fixtures['/works/OL45883W/editions.json'] = { entries: [{ title: 'no pages' }] }
    const summary = await importBook('OL45883W')
    expect(summary.created).toBe(false)
    expect(summary.mediaId).toBe(mediaId)

    const media = db.prepare('SELECT * FROM media_item WHERE id=?').get(mediaId) as Record<
      string,
      unknown
    >
    expect(media.status).toBe('Reading')
    expect(media.score).toBe(8)
    expect(media.progress).toBe(120)
    expect(media.total_units).toBe(305)

    // Author credit not duplicated.
    expect(db.prepare('SELECT COUNT(*) AS n FROM credit').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM person').get()).toEqual({ n: 1 })
  })

  it('imports without authors/editions/ratings endpoints (best-effort)', async () => {
    fixtures = {
      '/works/OL45883W.json': {
        key: '/works/OL45883W',
        title: 'Obscure Work',
        description: 'Plain string description.'
      }
    }
    const summary = await importBook('OL45883W')
    expect(summary).toMatchObject({ created: true, staff: 0 })
    const media = db.prepare('SELECT * FROM media_item').get() as Record<string, unknown>
    expect(media.synopsis).toBe('Plain string description.')
    expect(media.total_units).toBeNull()
    expect(media.metadata).toBeNull()
  })
})
