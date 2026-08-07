import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { importGame } from '../src/main/rawg'

// Offline import of a RAWG game against the real schema: metadata mapping,
// developer/publisher companies, genre tags, Metacritic into metadata, and
// re-import preserving personal tracking + hand-added cast (RAWG has no cast
// data, so the importer must never touch characters/credits).

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, null])),
  downloadImage: async () => null
}))

// URL-routed: RAWG calls get the game fixture; HLTB's init/search get their
// own stage. The defaults keep HLTB inert (no token → no creds → no lookup),
// which is what pins the RAWG-playtime fallback in the older tests below.
let fixture: Record<string, unknown>
let hltbInit: Record<string, unknown>
let hltbSearch: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (url: string) => ({
    ok: true,
    status: 200,
    json: async () =>
      url.includes('/api/bleed/init') ? hltbInit : url.includes('/api/bleed') ? hltbSearch : fixture
  })
}))

// settingsRepo would hit the (mocked) db for the API key; give it one directly.
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: (key: string) => (key === 'rawg.api_key' ? 'test-key' : null)
}))

function gameFixture(overrides: Record<string, unknown> = {}) {
  return {
    id: 3328,
    name: 'Persona 5',
    name_original: 'ペルソナ5',
    description_raw: 'A stylish JRPG.',
    released: '2016-09-15',
    background_image: 'https://img/p5.jpg',
    playtime: 97,
    metacritic: 93,
    developers: [{ id: 1, name: 'Atlus' }],
    publishers: [{ id: 2, name: 'SEGA' }],
    genres: [{ id: 5, name: 'RPG' }],
    ...overrides
  }
}

beforeEach(() => {
  db = createTestDb()
  fixture = gameFixture()
  hltbInit = {}
  hltbSearch = { data: [] }
})

describe('importGame', () => {
  it('imports metadata, companies by role, genres and Metacritic', async () => {
    const summary = await importGame(3328)
    expect(summary).toMatchObject({ created: true, studios: 2, cast: 0, staff: 0 })

    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='rawg' AND external_id='3328'`)
      .get() as Record<string, unknown>
    expect(media.media_type).toBe('game')
    expect(media.title).toBe('Persona 5')
    expect(media.title_original).toBe('ペルソナ5')
    expect(media.total_units).toBe(97)
    expect(media.release_date).toBe('2016-09-15')
    expect(JSON.parse(media.metadata as string)).toEqual({ metacritic: 93 })

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
    expect(db.prepare('SELECT name FROM tag').all()).toEqual([{ name: 'RPG' }])
  })

  it('re-import keeps personal tracking and hand-added cast', async () => {
    const { mediaId } = await importGame(3328)
    db.prepare(`UPDATE media_item SET status='Playing', score=9, progress=40 WHERE id=?`).run(
      mediaId
    )

    // Hand-add a character voiced by an existing "anime" seiyuu — the shared
    // VA pool the games section relies on.
    const seiyuu = Number(
      db
        .prepare(
          `INSERT INTO person (name, external_source, external_id) VALUES ('Fukuyama Jun', 'anilist', '95012')`
        )
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

    fixture = gameFixture({ metacritic: 94, playtime: 100 })
    const summary = await importGame(3328)
    expect(summary.created).toBe(false)
    expect(summary.mediaId).toBe(mediaId)

    const media = db.prepare('SELECT * FROM media_item WHERE id=?').get(mediaId) as Record<
      string,
      unknown
    >
    expect(media.status).toBe('Playing')
    expect(media.score).toBe(9)
    expect(media.progress).toBe(40)
    expect(media.total_units).toBe(100)
    expect(JSON.parse(media.metadata as string)).toEqual({ metacritic: 94 })

    // The hand-curated cast survived untouched.
    expect(db.prepare('SELECT COUNT(*) AS n FROM character').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM credit').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_character').get()).toEqual({ n: 1 })
  })

  it('HLTB Main Story beats RAWG playtime as the length (hours)', async () => {
    hltbInit = { token: 't', hpKey: 'k', hpVal: 'v' }
    hltbSearch = {
      data: [
        {
          game_id: 1,
          game_name: 'Persona 5',
          release_world: 2016,
          comp_main: 90_000, // seconds → 25 h; RAWG's playtime says 97
          comp_all: 120_000,
          comp_main_count: 800
        }
      ]
    }
    await importGame(3328)
    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='rawg' AND external_id='3328'`)
      .get() as Record<string, unknown>
    expect(media.total_units).toBe(25)
    const meta = JSON.parse(media.metadata as string)
    expect(meta.metacritic).toBe(93)
    expect(meta.hltb.main).toBe(1500)
  })

  it('rolls back the whole import if a write fails mid-transaction (atomicity)', async () => {
    // The publisher's name is an object better-sqlite3 can't bind, so the
    // failure hits AFTER the media row and the developer company were written —
    // the rollback must erase those too.
    fixture = gameFixture({ publishers: [{ id: 2, name: {} }] })
    await expect(importGame(3328)).rejects.toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 0 })
  })
})
