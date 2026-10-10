import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// End-to-end Hardcover import against the real schema, network mocked: the
// book, its tags, publisher, contributors, characters, series relations and
// Wikidata adaptations; authoritative re-import that keeps personal tracking
// and hand-made rows; a partial refresh that touches no child row; the chosen
// edition's page total; bulk lists; and the read-side SOURCE edge on the
// adapted movie.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

let token: string | null = 'tok'
vi.mock('../src/main/repos/settingsRepo', () => ({ get: (key: string) => (key === 'hardcover.token' ? token : null) }))

vi.mock('../src/main/files', () => ({
  downloadScaledImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, `media/dl-${(u as string).split('/').pop()}`]))
}))

// Wikidata is its own test file; here it is a switch.
let adaptations: { qid: string; list: { kind: 'movie' | 'tv' | 'anime'; externalId: string; title: string }[] } | 'none' | 'fail' = 'none'
vi.mock('../src/main/bookAdaptations', () => ({
  findBookItem: async () => {
    if (adaptations === 'fail') throw new Error('wikidata down')
    return adaptations === 'none' ? null : { qid: adaptations.qid, method: 'xref' }
  },
  adaptationsOf: async () => (adaptations !== 'none' && adaptations !== 'fail' ? adaptations.list : [])
}))

// GraphQL fixtures keyed by operation name.
let ops: Record<string, (vars: Record<string, unknown>) => unknown>
let status = 200
const seen: { op: string; auth: string | null }[] = []
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 1,
  fetchWithRetry: async (_url: string, init: { body: string; headers: Record<string, string> }) => {
    const { query, variables } = JSON.parse(init.body)
    const op = /query (\w+)/.exec(query)![1]
    seen.push({ op, auth: init.headers.Authorization ?? null })
    if (status !== 200) return { ok: false, status, json: async () => ({ error: 'invalid_token' }) }
    const handler = ops[op]
    if (!handler) return { ok: true, status: 200, json: async () => ({ errors: [{ message: `no fixture for ${op}` }] }) }
    return { ok: true, status: 200, json: async () => ({ data: handler(variables) }) }
  }
}))

import { hardcoverThrottle, importBook, search, topList } from '../src/main/hardcover'
import * as bookEditions from '../src/main/bookEditions'
import * as mediaRepo from '../src/main/repos/mediaRepo'

function book(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 312460,
    title: 'Dune',
    description: 'Arrakis.',
    slug: 'dune',
    release_date: '1965-08-01',
    release_year: 1965,
    pages: 617,
    rating: 4.25,
    ratings_count: 5000,
    users_count: 40000,
    book_category_id: 1,
    literary_type_id: 1,
    image: { url: 'https://assets.hardcover.app/dune.jpg' },
    cached_tags: {
      Genre: [{ tag: 'Science fiction' }, { tag: 'Classics' }],
      Mood: [{ tag: 'adventurous' }],
      'Content Warning': [{ tag: 'Violence' }]
    },
    links: [],
    default_physical_edition: { pages: 617, publisher: { id: 7, name: 'Chilton Books' } },
    contributions: [
      { contribution: null, author: { id: 1, name: 'Frank Herbert', image: { url: 'https://assets.hardcover.app/fh.jpg' } } },
      { contribution: 'Illustrator', author: { id: 2, name: 'John Schoenherr' } }
    ],
    book_series: [{ position: 1, details: '1', featured: true, series: { id: 10, name: 'Dune', books_count: 6 } }],
    ...overrides
  }
}

function defaultOps(): typeof ops {
  return {
    Book: () => ({ books_by_pk: book() }),
    SeriesBooks: () => ({
      series: [
        {
          id: 10,
          name: 'Dune',
          book_series: [
            { position: 1, details: '1', book: { id: 312460, title: 'Dune', release_year: 1965 } },
            { position: 2, details: '2', book: { id: 2, title: 'Dune Messiah', release_year: 1969 } }
          ]
        }
      ]
    }),
    BookCharacters: () => ({
      book_characters: [
        { character: { id: 50, name: 'Paul Atreides', biography: 'Duke.' } },
        { character: { id: 51, name: 'Chani' } }
      ]
    }),
    Editions: () => ({
      editions: [{ id: 900, title: 'Dune', edition_format: 'Paperback', pages: 896, reading_format_id: 1, publisher: { name: 'Ace' } }]
    })
  }
}

const count = (sql: string, ...args: unknown[]): number => (db.prepare(sql).get(...args) as { n: number }).n

beforeEach(() => {
  db = createTestDb()
  hardcoverThrottle.intervalMs = 0
  token = 'tok'
  status = 200
  adaptations = 'none'
  ops = defaultOps()
  seen.length = 0
})

describe('importBook', () => {
  it('imports the book with every child block', async () => {
    adaptations = { qid: 'Q190192', list: [{ kind: 'movie', externalId: '841', title: 'Dune (1984 film)' }] }
    const summary = await importBook(312460)
    expect(summary).toMatchObject({ title: 'Dune', created: true, studios: 1, cast: 2, staff: 2 })
    expect(seen.every((s) => s.auth === 'Bearer tok')).toBe(true)

    const row = db.prepare('SELECT * FROM media_item WHERE id = ?').get(summary.mediaId) as Record<string, unknown>
    expect(row).toMatchObject({
      media_type: 'book',
      external_source: 'hardcover',
      external_id: '312460',
      total_units: 617,
      release_date: '1965-08-01',
      cover_path: 'media/dl-dune.jpg'
    })
    expect(JSON.parse(row.metadata as string)).toMatchObject({
      hcRating: 85,
      hcReaders: 40000,
      bookCategory: 'Book',
      literaryType: 'Fiction',
      series: { name: 'Dune', position: 1, count: 6 }
    })

    const tags = db
      .prepare('SELECT t.name, t.category FROM media_tag mt JOIN tag t ON t.id = mt.tag_id WHERE mt.media_id = ? ORDER BY t.name')
      .all(summary.mediaId)
    expect(tags).toEqual([
      { name: 'Classics', category: 'genre' },
      { name: 'Science fiction', category: 'genre' },
      { name: 'Violence', category: 'content warning' },
      { name: 'adventurous', category: 'mood' }
    ])

    const credits = db
      .prepare(
        'SELECT p.name, c.role, c.role_note, c.origin FROM credit c JOIN person p ON p.id = c.person_id WHERE c.media_id = ? ORDER BY c.importance'
      )
      .all(summary.mediaId)
    expect(credits).toEqual([
      { name: 'Frank Herbert', role: 'writer', role_note: null, origin: 'hardcover' },
      { name: 'John Schoenherr', role: 'artist', role_note: 'Illustrator', origin: 'hardcover' }
    ])

    const relations = db
      .prepare('SELECT relation_type, related_source, related_external_id, related_type FROM media_relation WHERE media_id = ? ORDER BY sort_order')
      .all(summary.mediaId)
    expect(relations).toEqual([
      { relation_type: 'SEQUEL', related_source: 'hardcover', related_external_id: '2', related_type: 'book' },
      { relation_type: 'ADAPTATION', related_source: 'tmdb', related_external_id: '841', related_type: 'movie' }
    ])
    expect(db.prepare("SELECT external_id, method FROM media_external_link WHERE media_id = ? AND source = 'wikidata'").get(summary.mediaId)).toEqual({
      external_id: 'Q190192',
      method: 'xref'
    })
  })

  it('re-import is authoritative but keeps tracking and hand-made rows', async () => {
    adaptations = { qid: 'Q190192', list: [{ kind: 'movie', externalId: '841', title: 'Dune (1984 film)' }] }
    const { mediaId } = await importBook(312460)
    db.prepare("UPDATE media_item SET status = 'Reading', score = 9, progress = 120 WHERE id = ?").run(mediaId)
    const handPerson = Number(db.prepare("INSERT INTO person (name) VALUES ('My Editor')").run().lastInsertRowid)
    db.prepare("INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'staff')").run(mediaId, handPerson)
    const myTag = Number(db.prepare("INSERT INTO tag (name) VALUES ('owned')").run().lastInsertRowid)
    db.prepare('INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(mediaId, myTag)

    ops.Book = () => ({
      books_by_pk: book({
        cached_tags: { Genre: [{ tag: 'Science fiction' }] },
        contributions: [{ contribution: null, author: { id: 1, name: 'Frank Herbert' } }]
      })
    })
    ops.BookCharacters = () => ({ book_characters: [{ character: { id: 50, name: 'Paul Atreides' } }] })
    adaptations = 'fail'
    const again = await importBook(312460)
    expect(again).toMatchObject({ mediaId, created: false })

    expect(db.prepare('SELECT status, score, progress FROM media_item WHERE id = ?').get(mediaId)).toEqual({
      status: 'Reading',
      score: 9,
      progress: 120
    })
    expect(count('SELECT COUNT(*) n FROM credit WHERE media_id = ?', mediaId)).toBe(2) // Herbert + the hand-made editor
    expect(count('SELECT COUNT(*) n FROM credit WHERE media_id = ? AND person_id = ?', mediaId, handPerson)).toBe(1)
    const names = (db.prepare('SELECT t.name FROM media_tag mt JOIN tag t ON t.id = mt.tag_id WHERE mt.media_id = ? ORDER BY t.name').all(mediaId) as { name: string }[]).map((r) => r.name)
    expect(names).toEqual(['Science fiction', 'owned'])
    // Chani was dropped by the book and linked nowhere else: gone.
    expect(count("SELECT COUNT(*) n FROM character WHERE external_source = 'hardcover'")).toBe(1)
    // A failed Wikidata lookup keeps the edges the book already had.
    expect(count("SELECT COUNT(*) n FROM media_relation WHERE media_id = ? AND relation_type = 'ADAPTATION'", mediaId)).toBe(1)

    expect(count("SELECT COUNT(*) n FROM media_external_link WHERE media_id = ? AND source = 'wikidata'", mediaId)).toBe(1)

    adaptations = 'none'
    await importBook(312460)
    expect(count("SELECT COUNT(*) n FROM media_relation WHERE media_id = ? AND relation_type = 'ADAPTATION'", mediaId)).toBe(0)
    // The automatic item it no longer matches is dropped with its edges.
    expect(count("SELECT COUNT(*) n FROM media_external_link WHERE media_id = ? AND source = 'wikidata'", mediaId)).toBe(0)
  })

  it('a manual Wikidata unlink survives a re-import', async () => {
    const { mediaId } = await importBook(312460)
    db.prepare(
      "INSERT INTO media_external_link (media_id, source, external_id, method) VALUES (?, 'wikidata', '', 'manual') ON CONFLICT(media_id, source) DO UPDATE SET external_id = '', method = 'manual'"
    ).run(mediaId)
    await importBook(312460)
    expect(db.prepare("SELECT external_id, method FROM media_external_link WHERE media_id = ? AND source = 'wikidata'").get(mediaId)).toEqual({ external_id: '', method: 'manual' })
  })

  it('never links a book to a tag another category already owns', async () => {
    db.prepare("INSERT INTO tag (name) VALUES ('adventurous')").run()
    const { mediaId } = await importBook(312460)
    const names = (db.prepare('SELECT t.name FROM media_tag mt JOIN tag t ON t.id = mt.tag_id WHERE mt.media_id = ?').all(mediaId) as { name: string }[]).map((r) => r.name)
    expect(names).not.toContain('adventurous')
    expect(names).toContain('Science fiction')
  })

  it('a partial refresh writes no child row and makes no extra request', async () => {
    const { mediaId } = await importBook(312460)
    const before = {
      credits: count('SELECT COUNT(*) n FROM credit WHERE media_id = ?', mediaId),
      tags: count('SELECT COUNT(*) n FROM media_tag WHERE media_id = ?', mediaId),
      chars: count('SELECT COUNT(*) n FROM media_character WHERE media_id = ?', mediaId),
      rels: count('SELECT COUNT(*) n FROM media_relation WHERE media_id = ?', mediaId),
      companies: count('SELECT COUNT(*) n FROM media_company WHERE media_id = ?', mediaId)
    }
    ops.Book = () => ({ books_by_pk: book({ cached_tags: {}, contributions: [], book_series: [], image: { url: 'https://assets.hardcover.app/new.jpg' } }) })
    seen.length = 0
    await importBook(312460, { only: ['cover'] })
    expect(seen.map((s) => s.op)).toEqual(['Book'])
    expect(db.prepare('SELECT cover_path FROM media_item WHERE id = ?').get(mediaId)).toEqual({ cover_path: 'media/dl-new.jpg' })
    expect({
      credits: count('SELECT COUNT(*) n FROM credit WHERE media_id = ?', mediaId),
      tags: count('SELECT COUNT(*) n FROM media_tag WHERE media_id = ?', mediaId),
      chars: count('SELECT COUNT(*) n FROM media_character WHERE media_id = ?', mediaId),
      rels: count('SELECT COUNT(*) n FROM media_relation WHERE media_id = ?', mediaId),
      companies: count('SELECT COUNT(*) n FROM media_company WHERE media_id = ?', mediaId)
    }).toEqual(before)
    ops.Book = (vars) => ({ books_by_pk: book({ id: vars.id }) })
    await expect(importBook(999, { only: ['cover'] })).rejects.toThrow(/import it first/)
  })

  it('keeps the chosen edition as the page total across re-imports', async () => {
    const { mediaId } = await importBook(312460)
    const chosen = await bookEditions.choose(mediaId, 900)
    expect(chosen.edition).toMatchObject({ id: 900, pages: 896, publisher: 'Ace' })
    expect(db.prepare('SELECT total_units FROM media_item WHERE id = ?').get(mediaId)).toEqual({ total_units: 896 })
    await importBook(312460)
    expect(db.prepare('SELECT total_units FROM media_item WHERE id = ?').get(mediaId)).toEqual({ total_units: 896 })
    await expect(bookEditions.choose(mediaId, 12345)).rejects.toThrow(/no longer listed/)
    bookEditions.clear(mediaId)
    expect(bookEditions.get(mediaId)).toBeNull()
    await importBook(312460)
    expect(db.prepare('SELECT total_units FROM media_item WHERE id = ?').get(mediaId)).toEqual({ total_units: 617 })
  })

  it('reports a missing or rejected token plainly', async () => {
    token = null
    await expect(importBook(312460)).rejects.toThrow(/Add a Hardcover API token/)
    token = 'tok'
    status = 401
    await expect(search('dune')).rejects.toThrow(/rejected the API token \(invalid_token\)/)
  })
})

describe('adaptation edges on the screen side', () => {
  it('a movie lists the book it adapts as SOURCE, and a TV id never matches a movie edge', async () => {
    adaptations = { qid: 'Q190192', list: [{ kind: 'movie', externalId: '841', title: 'Dune (1984 film)' }] }
    const { mediaId: bookId } = await importBook(312460)
    const movie = Number(
      db.prepare("INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('movie', 'Dune', 'tmdb', '841')").run()
        .lastInsertRowid
    )
    const show = Number(
      db.prepare("INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('tv', 'Unrelated', 'tmdb', '841')").run()
        .lastInsertRowid
    )
    const onBook = mediaRepo.get(bookId)!.relations.find((r) => r.relationType === 'ADAPTATION')!
    expect(onBook.media?.id).toBe(movie)
    expect(mediaRepo.get(movie)!.relations).toEqual([
      expect.objectContaining({ relationType: 'SOURCE', mediaType: 'book', media: expect.objectContaining({ id: bookId }) })
    ])
    expect(mediaRepo.get(show)!.relations).toEqual([])
  })
})

describe('search and bulk', () => {
  it('maps search hits for the dialog', async () => {
    ops.Search = () => ({
      search: {
        results: JSON.stringify({ hits: [{ document: { id: '312460', title: 'Dune', author_names: ['Frank Herbert'], release_year: 1965, pages: 617 } }] })
      }
    })
    expect(await search('dune')).toEqual([
      { id: 312460, title: 'Dune', native: 'Frank Herbert', year: 1965, format: 'Book', episodes: 617, coverUrl: null }
    ])
  })

  it('pages the top list, skipping rows the keep predicate rejects', async () => {
    const pages: Record<number, unknown[]> = {
      0: Array.from({ length: 50 }, (_, i) => ({ id: i + 1, title: `Book ${i + 1}`, rating: 4 })),
      50: [{ id: 51, title: 'Book 51' }]
    }
    ops.Top = (vars) => ({ books: pages[vars.offset as number] ?? [] })
    const items = await topList({ source: 'book', sort: 'popular', count: 3 }, (it) => it.sourceId % 2 === 0)
    expect(items.map((i) => i.sourceId)).toEqual([2, 4, 6])
    const all = await topList({ source: 'book', sort: 'popular', count: 100 })
    expect(all).toHaveLength(51)
  })
})
