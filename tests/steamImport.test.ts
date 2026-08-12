import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Offline Steam import against the real schema: appdetails field mapping,
// the localized release-date parse, name-matched company dedup (Steam has no
// company ids), Metacritic into metadata, HLTB as the ONLY length source,
// the capsule-then-header cover fallback, non-game type rejection, and
// re-import preserving personal tracking. The igdbImport/rawgImport recipe.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

// Cover downloads: the capsule URL "exists" only when the test says so, which
// drives the header_image fallback branch.
let capsuleExists = true
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) => {
    const map = new Map<string, string | null>()
    for (const u of urls) {
      if (!u) continue
      map.set(u, u.includes('library_600x900') ? (capsuleExists ? 'media/dl-capsule.jpg' : null) : 'media/dl-header.jpg')
    }
    return map
  },
  downloadImage: async () => null
}))

let searchPayload: Record<string, unknown>
let detailsPayload: Record<string, unknown>
let hltbInit: Record<string, unknown>
let hltbSearch: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (url: string) => ({
    ok: true,
    status: 200,
    json: async () => {
      if (url.includes('/storesearch/')) return searchPayload
      if (url.includes('/appdetails')) return detailsPayload
      if (url.includes('/api/bleed/init')) return hltbInit
      if (url.includes('/api/bleed')) return hltbSearch
      throw new Error(`Unrouted URL in test: ${url}`)
    }
  })
}))

import { importGame, parseSteamDate, search } from '../src/main/steam'

function detailsFixture(overrides: Record<string, unknown> = {}) {
  return {
    '1687950': {
      success: true,
      data: {
        type: 'game',
        name: 'Persona 5 Royal',
        steam_appid: 1687950,
        short_description: 'A stylish JRPG.',
        header_image: 'https://cdn.steam/header.jpg',
        release_date: { coming_soon: false, date: 'Oct 21, 2022' },
        developers: ['ATLUS'],
        publishers: ['SEGA'],
        genres: [{ id: '3', description: 'RPG' }],
        metacritic: { score: 94, url: 'https://mc' },
        ...overrides
      }
    }
  }
}

beforeEach(() => {
  db = createTestDb()
  capsuleExists = true
  detailsPayload = detailsFixture()
  searchPayload = {
    total: 2,
    items: [
      { type: 'app', id: 1687950, name: 'Persona 5 Royal', tiny_image: 'https://cdn.steam/tiny.jpg' },
      { type: 'bundle', id: 99, name: 'P5 Bundle', tiny_image: null }
    ]
  }
  hltbInit = {}
  hltbSearch = { data: [] }
})

describe('parseSteamDate', () => {
  it('parses the localized formats and rejects TBA', () => {
    expect(parseSteamDate('Oct 21, 2022')).toBe('2022-10-21')
    expect(parseSteamDate('21 Oct, 2022')).toBe('2022-10-21')
    expect(parseSteamDate('')).toBeNull()
    expect(parseSteamDate('To be announced')).toBeNull()
    expect(parseSteamDate(null)).toBeNull()
  })
})

describe('importGame', () => {
  it('imports metadata, companies by name, genres, Metacritic and the capsule cover', async () => {
    const summary = await importGame(1687950)
    expect(summary).toMatchObject({ created: true, studios: 2, cast: 0, staff: 0 })

    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='steam' AND external_id='1687950'`)
      .get() as Record<string, unknown>
    expect(media.media_type).toBe('game')
    expect(media.title).toBe('Persona 5 Royal')
    expect(media.release_date).toBe('2022-10-21')
    expect(media.cover_path).toBe('media/dl-capsule.jpg')
    expect(media.total_units).toBeNull() // no HLTB, and Steam has no length
    expect(JSON.parse(media.metadata as string)).toEqual({ metacritic: 94 })

    const companies = db
      .prepare(
        `SELECT c.name, mc.role FROM media_company mc
         JOIN company c ON c.id = mc.company_id ORDER BY c.name`
      )
      .all()
    expect(companies).toEqual([
      { name: 'ATLUS', role: 'developer' },
      { name: 'SEGA', role: 'publisher' }
    ])
    expect(db.prepare('SELECT name, category FROM tag').all()).toEqual([
      { name: 'RPG', category: 'genre' }
    ])
  })

  it('falls back to header_image when the portrait capsule is missing', async () => {
    capsuleExists = false
    await importGame(1687950)
    const media = db.prepare(`SELECT cover_path FROM media_item`).get() as Record<string, unknown>
    expect(media.cover_path).toBe('media/dl-header.jpg')
  })

  it('reuses an existing company row by name (Steam has no company ids)', async () => {
    db.prepare(
      `INSERT INTO company (name, type, external_source, external_id) VALUES ('Atlus', 'developer', 'rawg', '8')`
    ).run()
    await importGame(1687950)
    // 'ATLUS' matched the existing 'Atlus' case-insensitively — no duplicate.
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 2 }) // Atlus + SEGA
  })

  it('HLTB fills the length when it matches', async () => {
    hltbInit = { token: 't', hpKey: 'k', hpVal: 'v' }
    hltbSearch = {
      data: [
        {
          game_id: 1,
          game_name: 'Persona 5 Royal',
          release_world: 2022,
          comp_main: 90_000,
          comp_main_count: 500
        }
      ]
    }
    await importGame(1687950)
    const media = db.prepare(`SELECT * FROM media_item`).get() as Record<string, unknown>
    expect(media.total_units).toBe(25)
    expect(JSON.parse(media.metadata as string).hltb.main).toBe(1500)
  })

  it('rejects DLC/soundtrack/demo types', async () => {
    detailsPayload = detailsFixture({ type: 'dlc' })
    await expect(importGame(1687950)).rejects.toThrow(/not a full game/)
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 0 })
  })

  it('re-import keeps personal tracking, a hand-set length and hand-added cast', async () => {
    const { mediaId } = await importGame(1687950)
    db.prepare(
      `UPDATE media_item SET status='Playing', score=9, progress=40, total_units=52 WHERE id=?`
    ).run(mediaId)
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

    detailsPayload = detailsFixture({ metacritic: { score: 95 } })
    const summary = await importGame(1687950)
    expect(summary.created).toBe(false)
    expect(summary.mediaId).toBe(mediaId)

    const media = db.prepare('SELECT * FROM media_item WHERE id=?').get(mediaId) as Record<
      string,
      unknown
    >
    expect(media.status).toBe('Playing')
    expect(media.progress).toBe(40)
    // HLTB missed on re-import too → COALESCE keeps the hand-entered 52.
    expect(media.total_units).toBe(52)
    expect(JSON.parse(media.metadata as string)).toEqual({ metacritic: 95 })

    expect(db.prepare('SELECT COUNT(*) AS n FROM character').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM credit').get()).toEqual({ n: 1 })
  })

  it('rolls back the whole import if a write fails mid-transaction (atomicity)', async () => {
    detailsPayload = detailsFixture({ genres: [{ id: '3', description: {} }] })
    await expect(importGame(1687950)).rejects.toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 0 })
  })
})

describe('search', () => {
  it('maps app results and drops bundles', async () => {
    const results = await search('persona')
    expect(results).toEqual([
      {
        id: 1687950,
        title: 'Persona 5 Royal',
        native: null,
        year: null,
        format: 'Game',
        episodes: null,
        coverUrl: 'https://cdn.steam/tiny.jpg'
      }
    ])
  })

  it('empty query short-circuits without a request', async () => {
    expect(await search('   ')).toEqual([])
  })
})
