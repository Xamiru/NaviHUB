import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Offline IGDB import against the real schema: Twitch-auth plumbing mocked at
// the http layer, field mapping, developer/publisher role split from the
// involved_companies booleans, genres → tags, igdbRating into metadata, the
// HLTB-authoritative length with IGDB's time-to-beat as fallback, and
// re-import preserving personal tracking. The rawgImport recipe throughout.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, null])),
  downloadImage: async () => null
}))

// URL-routed fixtures: Twitch token, IGDB games/time-to-beat, HLTB init/search
// (HLTB inert by default — no token — which pins the fallback path).
let gameRows: unknown[]
let ttbRows: unknown[]
let hltbInit: Record<string, unknown>
let hltbSearch: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (url: string) => ({
    ok: true,
    status: 200,
    json: async () => {
      if (url.includes('id.twitch.tv')) return { access_token: 'tok', expires_in: 5000 }
      if (url.includes('/v4/games')) return gameRows
      if (url.includes('/v4/game_time_to_beats')) return ttbRows
      if (url.includes('/api/bleed/init')) return hltbInit
      if (url.includes('/api/bleed')) return hltbSearch
      throw new Error(`Unrouted URL in test: ${url}`)
    }
  })
}))

vi.mock('../src/main/repos/settingsRepo', () => ({
  get: (key: string) =>
    key === 'igdb.client_id' ? 'cid' : key === 'igdb.client_secret' ? 'csecret' : null
}))

import { importGame, search } from '../src/main/igdb'

function gameFixture(overrides: Record<string, unknown> = {}) {
  return {
    id: 1121,
    name: 'Persona 5',
    summary: 'A stylish JRPG.',
    first_release_date: 1473897600, // 2016-09-15
    cover: { image_id: 'co1r76' },
    total_rating: 92.4,
    total_rating_count: 900,
    involved_companies: [
      { developer: true, publisher: false, company: { id: 8, name: 'Atlus' } },
      { developer: false, publisher: true, company: { id: 112, name: 'SEGA' } }
    ],
    genres: [{ id: 12, name: 'Role-playing (RPG)' }],
    ...overrides
  }
}

beforeEach(() => {
  db = createTestDb()
  gameRows = [gameFixture()]
  ttbRows = [{ normally: 356_400 }] // 99 h
  hltbInit = {}
  hltbSearch = { data: [] }
})

describe('importGame', () => {
  it('imports metadata, splits company roles, maps genres and rating', async () => {
    const summary = await importGame(1121)
    expect(summary).toMatchObject({ created: true, studios: 2, cast: 0, staff: 0 })

    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='igdb' AND external_id='1121'`)
      .get() as Record<string, unknown>
    expect(media.media_type).toBe('game')
    expect(media.title).toBe('Persona 5')
    expect(media.release_date).toBe('2016-09-15')
    // HLTB inert → IGDB time-to-beat fallback (356400 s ≈ 99 h).
    expect(media.total_units).toBe(99)
    expect(JSON.parse(media.metadata as string)).toEqual({ igdbRating: 92 })

    const companies = db
      .prepare(
        `SELECT c.name, mc.role FROM media_company mc
         JOIN company c ON c.id = mc.company_id ORDER BY c.name`
      )
      .all()
    expect(companies).toEqual([
      { name: 'Atlus', role: 'developer' },
      { name: 'SEGA', role: 'publisher' }
    ])
    expect(db.prepare('SELECT name, category FROM tag').all()).toEqual([
      { name: 'Role-playing (RPG)', category: 'genre' }
    ])
  })

  it('a company that develops AND publishes gets both roles', async () => {
    gameRows = [
      gameFixture({
        involved_companies: [{ developer: true, publisher: true, company: { id: 8, name: 'Atlus' } }]
      })
    ]
    const summary = await importGame(1121)
    expect(summary.studios).toBe(2)
    const roles = db
      .prepare('SELECT role FROM media_company ORDER BY role')
      .all()
      .map((r) => (r as { role: string }).role)
    expect(roles).toEqual(['developer', 'publisher'])
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 1 })
  })

  it('HLTB Main Story beats the IGDB time-to-beat fallback', async () => {
    hltbInit = { token: 't', hpKey: 'k', hpVal: 'v' }
    hltbSearch = {
      data: [
        { game_id: 1, game_name: 'Persona 5', release_world: 2016, comp_main: 90_000, comp_main_count: 800 }
      ]
    }
    await importGame(1121)
    const media = db.prepare(`SELECT * FROM media_item WHERE external_id='1121'`).get() as Record<
      string,
      unknown
    >
    expect(media.total_units).toBe(25) // HLTB 1500 min, not TTB's 99 h
    const meta = JSON.parse(media.metadata as string)
    expect(meta.hltb.main).toBe(1500)
    expect(meta.igdbRating).toBe(92)
  })

  it('no time-to-beat poll and no HLTB → null length, never 0', async () => {
    ttbRows = []
    await importGame(1121)
    const media = db.prepare(`SELECT * FROM media_item WHERE external_id='1121'`).get() as Record<
      string,
      unknown
    >
    expect(media.total_units).toBeNull()
  })

  it('re-import keeps personal tracking and hand-added cast', async () => {
    const { mediaId } = await importGame(1121)
    db.prepare(`UPDATE media_item SET status='Playing', score=9, progress=40 WHERE id=?`).run(
      mediaId
    )
    const seiyuu = Number(
      db
        .prepare(`INSERT INTO person (name, external_source, external_id) VALUES ('Fukuyama Jun', 'anilist', '95012')`)
        .run().lastInsertRowid
    )
    const joker = Number(
      db.prepare(`INSERT INTO character (name) VALUES ('Joker')`).run().lastInsertRowid
    )
    db.prepare('INSERT INTO media_character (media_id, character_id) VALUES (?, ?)').run(
      mediaId,
      joker
    )
    db.prepare(
      `INSERT INTO credit (media_id, person_id, character_id, role, language) VALUES (?, ?, ?, 'voice_actor', 'Japanese')`
    ).run(mediaId, seiyuu, joker)

    gameRows = [gameFixture({ total_rating: 94.2 })]
    const summary = await importGame(1121)
    expect(summary.created).toBe(false)
    expect(summary.mediaId).toBe(mediaId)

    const media = db.prepare('SELECT * FROM media_item WHERE id=?').get(mediaId) as Record<
      string,
      unknown
    >
    expect(media.status).toBe('Playing')
    expect(media.score).toBe(9)
    expect(media.progress).toBe(40)
    expect(JSON.parse(media.metadata as string)).toEqual({ igdbRating: 94 })

    expect(db.prepare('SELECT COUNT(*) AS n FROM character').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM credit').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_character').get()).toEqual({ n: 1 })
  })

  it('rolls back the whole import if a write fails mid-transaction (atomicity)', async () => {
    gameRows = [
      gameFixture({
        involved_companies: [{ developer: true, publisher: false, company: { id: 8, name: {} } }]
      })
    ]
    await expect(importGame(1121)).rejects.toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 0 })
  })
})

describe('search', () => {
  it('maps results with the cover URL built from image_id', async () => {
    const results = await search('persona')
    expect(results).toEqual([
      {
        id: 1121,
        title: 'Persona 5',
        native: null,
        year: 2016,
        format: 'Game',
        episodes: null,
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.jpg'
      }
    ])
  })

  it('strips quotes from the query (APIcalypse injection guard) and empty query short-circuits', async () => {
    expect(await search('   ')).toEqual([])
    // A quoted query must not throw — it reaches the mock as a routed /v4/games call.
    await expect(search('per"sona')).resolves.toBeDefined()
  })
})
