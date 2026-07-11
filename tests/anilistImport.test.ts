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

vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, null])),
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

function charEdge(role: string, id: number, name: string, vaId: number, vaName: string) {
  return {
    role,
    node: { id, name: { full: name, native: null }, image: { large: `https://img/c${id}.png` } },
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
        `SELECT ch.name AS character, p.name AS person, cr.importance
         FROM credit cr JOIN character ch ON ch.id = cr.character_id
         JOIN person p ON p.id = cr.person_id
         WHERE cr.role = 'voice_actor' ORDER BY cr.importance`
      )
      .all()
    expect(credits).toEqual([
      { character: 'Alice', person: 'Seiyuu A', importance: 0 },
      { character: 'Bob', person: 'Seiyuu B', importance: 1 }
    ])
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
