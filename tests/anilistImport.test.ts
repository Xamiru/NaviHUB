import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { importAnime } from '../src/main/anilist'

// End-to-end import against the real schema with the network mocked out: the
// GraphQL layer returns fixtures and image downloads resolve to null paths.
// This covers the trickiest invariants in the app — dedup by external id,
// personal tracking surviving re-import, and the authoritative character prune.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

// Downloads resolve to null paths by default (the schema does not care what a
// cover path holds). `imageFor` lets one test say "this URL landed on disk" so
// the banner column can be checked without pretending every image downloaded.
const images = vi.hoisted(() => ({ resolve: null as ((url: string) => string | null) | null }))
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(
      urls.filter(Boolean).map((u) => [u as string, images.resolve ? images.resolve(u as string) : null])
    ),
  downloadImage: async () => null
}))

// The current fixture served by the mocked fetch; tests swap it per scenario.
let fixture: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (_url: string, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? '{}'))
    // Page 2+ character requests would carry variables.page — the fixtures used
    // here keep hasNextPage=false, so only the detail query is ever issued.
    expect(body.variables.page).toBeUndefined()
    return { ok: true, status: 200, json: async () => ({ data: fixture }) }
  }
}))

function charEdge(
  role: string,
  id: number,
  name: string,
  vaId: number,
  vaName: string,
  gender = 'Female'
) {
  return {
    role,
    node: {
      id,
      name: { full: name, native: null },
      gender,
      image: { large: `https://img/c${id}.png` }
    },
    voiceActors: [
      { id: vaId, name: { full: vaName, native: null }, image: { large: `https://img/p${vaId}.png` } }
    ]
  }
}

function animeFixture(overrides: Record<string, unknown> = {}) {
  return {
    Media: {
      id: 101,
      title: { romaji: 'Test Anime', english: null, native: 'テスト' },
      description: 'Line one.<br><b>Line two.</b>',
      episodes: 12,
      duration: 24,
      averageScore: 85,
      season: 'SPRING',
      seasonYear: 2020,
      startDate: { year: 2020, month: 4, day: 1 },
      coverImage: { large: 'https://img/cover.png', extraLarge: 'https://img/cover-xl.png' },
      genres: ['Action', 'Drama'],
      studios: {
        edges: [
          { isMain: true, node: { id: 11, name: 'Studio Main' } },
          { isMain: false, node: { id: 12, name: 'Producer Co' } }
        ]
      },
      relations: {
        edges: [
          {
            relationType: 'SEQUEL',
            node: { id: 102, type: 'ANIME', title: { romaji: 'Test Anime 2' } }
          },
          // Not in RELATION_TYPES — must be skipped.
          { relationType: 'CHARACTER', node: { id: 999, type: 'ANIME', title: { romaji: 'X' } } }
        ]
      },
      characters: {
        pageInfo: { hasNextPage: false },
        edges: [
          charEdge('MAIN', 201, 'Alice', 301, 'Seiyuu A'),
          charEdge('SUPPORTING', 202, 'Bob', 302, 'Seiyuu B')
        ]
      },
      staff: {
        edges: [
          {
            role: 'Director',
            node: { id: 401, name: { full: 'Director D', native: null }, image: {} }
          }
        ]
      },
      ...overrides
    }
  }
}

beforeEach(() => {
  db = createTestDb()
  fixture = animeFixture()
  images.resolve = null
})

describe('importAnime', () => {
  it('imports media, studio, genres, characters with VAs, staff and relations', async () => {
    const summary = await importAnime(101)
    expect(summary).toMatchObject({ created: true, studios: 1, cast: 2, staff: 1 })
    expect(summary.title).toBe('Test Anime')

    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='anilist' AND external_id='101'`)
      .get() as Record<string, unknown>
    expect(media.title).toBe('Test Anime')
    expect(media.total_units).toBe(12)
    expect(media.release_date).toBe('2020-04-01')
    expect(media.synopsis).toBe('Line one.\nLine two.')
    expect(JSON.parse(media.metadata as string)).toEqual({
      averageScore: 85,
      epDuration: 24,
      season: 'SPRING',
      seasonYear: 2020
    })

    // Only the main studio; genres become tags; skipped relation types stay out.
    expect(db.prepare('SELECT name FROM company').all()).toEqual([{ name: 'Studio Main' }])
    expect(db.prepare('SELECT COUNT(*) AS n FROM tag').get()).toEqual({ n: 2 })
    expect(db.prepare('SELECT relation_type FROM media_relation').all()).toEqual([
      { relation_type: 'SEQUEL' }
    ])

    // MAIN role ranks above SUPPORTING via credit.importance.
    const credits = db
      .prepare(
        `SELECT ch.name AS character, ch.gender, p.name AS person, cr.importance
         FROM credit cr JOIN character ch ON ch.id = cr.character_id
         JOIN person p ON p.id = cr.person_id
         WHERE cr.role = 'voice_actor' ORDER BY cr.importance`
      )
      .all()
    expect(credits).toEqual([
      { character: 'Alice', gender: 'female', person: 'Seiyuu A', importance: 0 },
      { character: 'Bob', gender: 'female', person: 'Seiyuu B', importance: 1 }
    ])
  })

  it('refreshes canonical character gender on re-import', async () => {
    await importAnime(101)
    expect(db.prepare(`SELECT gender FROM character WHERE name='Alice'`).get()).toEqual({
      gender: 'female'
    })

    fixture = animeFixture({
      characters: {
        pageInfo: { hasNextPage: false },
        edges: [charEdge('MAIN', 201, 'Alice', 301, 'Seiyuu A', 'Non-binary')]
      }
    })
    await importAnime(101)
    expect(db.prepare(`SELECT gender FROM character WHERE name='Alice'`).get()).toEqual({
      gender: 'nonbinary'
    })
  })

  it('liteCharacters (the bulk path) never paginates even when more pages exist', async () => {
    // hasNextPage=true would normally trigger a CHARS_QUERY page-2 request —
    // which the http mock rejects (it asserts variables.page is undefined).
    fixture = animeFixture({
      characters: {
        pageInfo: { hasNextPage: true },
        edges: [charEdge('MAIN', 201, 'Alice', 301, 'Seiyuu A')]
      }
    })
    const summary = await importAnime(101, { liteCharacters: true })
    expect(summary.cast).toBe(1) // the first page's characters still import
  })

  it('re-import updates canonical fields but preserves personal tracking', async () => {
    const { mediaId } = await importAnime(101)
    db.prepare(
      `UPDATE media_item SET status='Watching', score=8, progress=5, favorite=1 WHERE id=?`
    ).run(mediaId)

    fixture = animeFixture({
      title: { romaji: 'Test Anime (updated)', english: null, native: 'テスト' },
      episodes: 13
    })
    const summary = await importAnime(101)
    expect(summary.created).toBe(false)
    expect(summary.mediaId).toBe(mediaId)

    const media = db.prepare('SELECT * FROM media_item WHERE id=?').get(mediaId) as Record<
      string,
      unknown
    >
    expect(media.title).toBe('Test Anime (updated)')
    expect(media.total_units).toBe(13)
    expect(media.status).toBe('Watching')
    expect(media.score).toBe(8)
    expect(media.progress).toBe(5)
    expect(media.favorite).toBe(1)

    // No duplicate rows anywhere after a re-import.
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM character').get()).toEqual({ n: 2 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM credit WHERE role='voice_actor'`).get()).toEqual({
      n: 2
    })
  })

  it('writes no season metadata keys when AniList has no season', async () => {
    fixture = animeFixture({ season: null, seasonYear: null })
    await importAnime(101)
    const media = db
      .prepare(`SELECT metadata FROM media_item WHERE external_source='anilist' AND external_id='101'`)
      .get() as { metadata: string }
    expect(JSON.parse(media.metadata)).toEqual({ averageScore: 85, epDuration: 24 })
  })

  it('re-import refreshes the season and keeps sibling metadata keys', async () => {
    const { mediaId } = await importAnime(101)

    fixture = animeFixture({ season: 'WINTER', seasonYear: 2021 })
    await importAnime(101)

    const media = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId) as {
      metadata: string
    }
    expect(JSON.parse(media.metadata)).toEqual({
      averageScore: 85,
      epDuration: 24,
      season: 'WINTER',
      seasonYear: 2021
    })
  })

  it('authoritative prune drops characters no longer in the source, including their list items', async () => {
    const { mediaId } = await importAnime(101)
    const bob = db.prepare(`SELECT id FROM character WHERE name='Bob'`).get() as { id: number }
    const alice = db.prepare(`SELECT id FROM character WHERE name='Alice'`).get() as { id: number }

    // Bob sits on a user list — the prune must clean this up too.
    db.prepare(`INSERT INTO list (title, entity_kind) VALUES ('Best boys', 'character')`).run()
    db.prepare(`INSERT INTO list_item (list_id, entity_id, sort_order) VALUES (1, ?, 0)`).run(
      bob.id
    )

    // Bob is replaced by Carol in the source.
    fixture = animeFixture({
      characters: {
        pageInfo: { hasNextPage: false },
        edges: [
          charEdge('MAIN', 201, 'Alice', 301, 'Seiyuu A'),
          charEdge('SUPPORTING', 203, 'Carol', 303, 'Seiyuu C')
        ]
      }
    })
    await importAnime(101)

    const names = db.prepare('SELECT name FROM character ORDER BY name').all()
    expect(names).toEqual([{ name: 'Alice' }, { name: 'Carol' }])
    // Alice kept her row (same id) — she wasn't recreated.
    expect((db.prepare(`SELECT id FROM character WHERE name='Alice'`).get() as { id: number }).id).toBe(
      alice.id
    )
    // Bob's credit, link and list entry are gone.
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM credit WHERE character_id=?').get(bob.id)
    ).toEqual({ n: 0 })
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM media_character WHERE media_id=?').get(mediaId)
    ).toEqual({ n: 2 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM list_item').get()).toEqual({ n: 0 })
  })

  it('rolls back everything if the import fails mid-write (atomicity)', async () => {
    // A staff edge with a null node makes upsertPerson throw inside the
    // transaction, after media/studios/characters were already written.
    fixture = animeFixture({ staff: { edges: [{ role: 'Director', node: null }] } })
    await expect(importAnime(101)).rejects.toThrow()

    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM character').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 0 })
  })
})

describe('hero banner art', () => {
  it('stores the downloaded bannerImage and keeps it when a re-import has none', async () => {
    images.resolve = (url) => (url.includes('banner') ? 'media/dl-banner' : null)
    fixture = animeFixture({ bannerImage: 'https://img/banner.png' })
    await importAnime(101)
    expect(db.prepare('SELECT banner_path FROM media_item').get()).toEqual({
      banner_path: 'media/dl-banner'
    })

    // AniList drops bannerImage on plenty of titles; a re-import that comes back
    // without one must not blank the hero (COALESCE, like cover_path).
    images.resolve = null
    fixture = animeFixture({ bannerImage: null })
    await importAnime(101)
    expect(db.prepare('SELECT banner_path FROM media_item').get()).toEqual({
      banner_path: 'media/dl-banner'
    })
  })

  it('leaves banner_path null when the title has no banner at all', async () => {
    fixture = animeFixture({ bannerImage: null })
    await importAnime(101)
    expect(db.prepare('SELECT banner_path FROM media_item').get()).toEqual({ banner_path: null })
  })
})

describe('partial refresh (Library Refresh)', () => {
  // The invariant the whole feature turns on: `only` writes media_item columns
  // and NOTHING else. pruneCharacters' last two statements sweep orphans for the
  // whole SOURCE, not this media id, so a thin payload run through the normal
  // path would delete cast across the library.
  const counts = () => ({
    characters: (db.prepare('SELECT COUNT(*) AS n FROM character').get() as { n: number }).n,
    mediaCharacters: (db.prepare('SELECT COUNT(*) AS n FROM media_character').get() as { n: number })
      .n,
    credits: (db.prepare('SELECT COUNT(*) AS n FROM credit').get() as { n: number }).n,
    companies: (db.prepare('SELECT COUNT(*) AS n FROM media_company').get() as { n: number }).n,
    tags: (db.prepare('SELECT COUNT(*) AS n FROM media_tag').get() as { n: number }).n,
    relations: (db.prepare('SELECT COUNT(*) AS n FROM media_relation').get() as { n: number }).n
  })

  it('leaves every child row intact — cast, studios, genres and relations', async () => {
    await importAnime(101)
    const before = counts()
    // A full import must actually have written children, or this proves nothing.
    expect(before.characters).toBeGreaterThan(0)
    expect(before.credits).toBeGreaterThan(0)
    expect(before.companies).toBeGreaterThan(0)
    expect(before.tags).toBeGreaterThan(0)

    images.resolve = (url) => (url.includes('cover') ? 'media/dl-new-cover' : null)
    await importAnime(101, { only: ['cover'] })

    expect(counts()).toEqual(before)
    expect(db.prepare('SELECT cover_path FROM media_item').get()).toEqual({
      cover_path: 'media/dl-new-cover'
    })
  })

  it('writes only the chosen columns, leaving the others alone', async () => {
    await importAnime(101)
    db.prepare("UPDATE media_item SET title='Hand edited', banner_path='media/old-banner'").run()

    images.resolve = (url) => (url.includes('cover') ? 'media/dl-c2' : null)
    await importAnime(101, { only: ['cover'] })

    const row = db.prepare('SELECT title, cover_path, banner_path FROM media_item').get() as {
      title: string
      cover_path: string
      banner_path: string
    }
    expect(row.cover_path).toBe('media/dl-c2') // asked for
    expect(row.title).toBe('Hand edited') // not asked for
    expect(row.banner_path).toBe('media/old-banner')
  })

  it('a text refresh restores canonical fields and merges scores', async () => {
    await importAnime(101)
    db.prepare("UPDATE media_item SET title='Wrong', synopsis=NULL, total_units=NULL").run()
    await importAnime(101, { only: ['text'] })
    const row = db.prepare('SELECT title, synopsis, total_units, metadata FROM media_item').get() as {
      title: string
      synopsis: string
      total_units: number
      metadata: string
    }
    expect(row.title).toBe('Test Anime')
    expect(row.synopsis).toContain('Line one.')
    expect(row.total_units).toBe(12)
    expect(JSON.parse(row.metadata).averageScore).toBe(85)
  })

  it('never touches personal tracking', async () => {
    await importAnime(101)
    db.prepare('UPDATE media_item SET status=?, score=?, progress=?, rewatch_count=?').run(
      'Watching',
      9,
      7,
      2
    )
    await importAnime(101, { only: ['cover', 'text'] })
    expect(
      db.prepare('SELECT status, score, progress, rewatch_count FROM media_item').get()
    ).toEqual({ status: 'Watching', score: 9, progress: 7, rewatch_count: 2 })
  })

  it('refuses a title that is not in the library', async () => {
    await expect(importAnime(101, { only: ['cover'] })).rejects.toThrow(/not in the library/)
  })
})
