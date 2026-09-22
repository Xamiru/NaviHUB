import { beforeEach, describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'
import { createTestDb } from './helpers'
// @ts-expect-error — plain CJS maintenance script, no type declarations
import { CATALOG_DDL as SCRIPT_DDL } from '../scripts/build-games-catalog.cjs'

// The offline games catalog: FTS search over a local pack, import into
// media_item under external_source 'rawg' (dedup with API-era rows), the HLTB
// length with the dump's playtime as fallback, and the DDL drift guard
// between the build script and the app-side reader.

let db: Database.Database // main navihub db
let catalog: Database.Database | null // the pack

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
vi.mock('../src/main/gamesCatalogDb', () => ({
  getCatalogDb: () => catalog,
  closeCatalogDb: () => {},
  catalogPath: () => ':memory:'
}))
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, 'media/dl-cover.jpg'])),
  downloadImage: async () => null
}))
// HLTB inert by default (no token) — pins the playtime-fallback path.
// httpCalls records every URL so the bulk test can assert HLTB is never hit.
let hltbInit: Record<string, unknown>
let hltbSearch: Record<string, unknown>
let httpCalls: string[] = []
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: async (url: string) => {
    httpCalls.push(url)
    return {
      ok: true,
      status: 200,
      json: async () => (url.includes('/api/bleed/init') ? hltbInit : hltbSearch)
    }
  }
}))
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: () => null
}))

import { CATALOG_DDL } from '../src/main/gamesCatalogSchema'
import { buildCatalogQuery, ftsQueryFor, importGame, listTop, search, status } from '../src/main/gamesCatalog'
import type { BulkListParams } from '../src/shared/types'

function catalogRow(overrides: Record<string, unknown> = {}) {
  return {
    id: 3498,
    name: 'Grand Theft Auto V',
    name_original: 'Grand Theft Auto V',
    released: '2013-09-17',
    image_url: 'https://media.rawg.io/media/games/20a/gtav.jpg',
    rating: 4.47,
    ratings_count: 7409,
    added: 22635,
    metacritic: 92,
    playtime: 74,
    platforms: JSON.stringify(['pc', 'playstation-5', 'xbox-one']),
    developers: JSON.stringify([{ id: 3524, name: 'Rockstar North' }]),
    publishers: JSON.stringify([{ id: 2155, name: 'Rockstar Games' }]),
    genres: JSON.stringify(['Action']),
    description: 'Open world crime epic.',
    alt: 'GTA 5 GTA V GTAV',
    ...overrides
  }
}

function seedCatalog(rows: ReturnType<typeof catalogRow>[]): void {
  catalog = new Database(':memory:')
  catalog.exec(CATALOG_DDL)
  const ins = catalog.prepare(`INSERT INTO catalog_game
    (id, name, name_original, released, image_url, rating, ratings_count, added,
     metacritic, playtime, platforms, developers, publishers, genres, description)
    VALUES (@id, @name, @name_original, @released, @image_url, @rating, @ratings_count,
     @added, @metacritic, @playtime, @platforms, @developers, @publishers, @genres, @description)`)
  const fts = catalog.prepare('INSERT INTO catalog_fts (rowid, name, alt) VALUES (?, ?, ?)')
  for (const r of rows) {
    ins.run(r)
    fts.run(r.id, r.name, r.alt)
  }
  catalog.prepare(`INSERT INTO catalog_meta (key, value) VALUES ('snapshot', '2026-06-27')`).run()
}

beforeEach(() => {
  db = createTestDb()
  catalog = null
  hltbInit = {}
  hltbSearch = { data: [] }
  httpCalls = []
})

describe('DDL drift guard', () => {
  it('build script and app reader share the exact schema', () => {
    expect(SCRIPT_DDL.trim()).toBe(CATALOG_DDL.trim())
  })
})

describe('ftsQueryFor', () => {
  it('quotes and prefixes tokens, neutralizing FTS operators', () => {
    expect(ftsQueryFor('gta 5')).toBe('"gta"* "5"*')
    expect(ftsQueryFor('  zelda  ')).toBe('"zelda"*')
    expect(ftsQueryFor('a "NEAR" b')).toBe('"a"* "NEAR"* "b"*')
    expect(ftsQueryFor('   ')).toBeNull()
  })
})

describe('search', () => {
  it('finds by alternative name and ranks by popularity', () => {
    seedCatalog([
      catalogRow(),
      catalogRow({ id: 999, name: 'GTA Clone', alt: '', added: 3, platforms: '["pc"]' })
    ])
    const results = search('gta')
    expect(results.map((r) => r.id)).toEqual([3498, 999]) // added DESC
    expect(results[0].title).toBe('Grand Theft Auto V')
    expect(results[0].format).toContain('playstation-5')
    expect(results[0].year).toBe(2013)
  })

  it('throws a friendly error when the pack is not installed', () => {
    catalog = null
    expect(() => search('zelda')).toThrow(/not installed/)
    expect(status()).toEqual({ installed: false, gameCount: 0, snapshot: null })
  })
})

describe('importGame', () => {
  it('imports the row: media fields, rawg-source companies, tags, metacritic + playtime fallback', async () => {
    seedCatalog([catalogRow()])
    const summary = await importGame(3498)
    expect(summary).toMatchObject({ created: true, studios: 2, cast: 0, staff: 0 })

    const media = db
      .prepare(`SELECT * FROM media_item WHERE external_source='rawg' AND external_id='3498'`)
      .get() as Record<string, unknown>
    expect(media.media_type).toBe('game')
    expect(media.title).toBe('Grand Theft Auto V')
    expect(media.title_original).toBeNull() // same as name → not repeated
    expect(media.release_date).toBe('2013-09-17')
    expect(media.cover_path).toBe('media/dl-cover.jpg')
    expect(media.total_units).toBe(74) // HLTB inert → dump's playtime hours
    expect(JSON.parse(media.metadata as string)).toEqual({ metacritic: 92 })

    const companies = db
      .prepare(
        `SELECT c.name, c.external_source, mc.role FROM media_company mc
         JOIN company c ON c.id = mc.company_id ORDER BY c.name`
      )
      .all()
    expect(companies).toEqual([
      { name: 'Rockstar Games', external_source: 'rawg', role: 'publisher' },
      { name: 'Rockstar North', external_source: 'rawg', role: 'developer' }
    ])
    expect(db.prepare('SELECT name FROM tag').all()).toEqual([{ name: 'Action' }])
  })

  it('HLTB beats the dump playtime when it matches', async () => {
    seedCatalog([catalogRow()])
    hltbInit = { token: 't', hpKey: 'k', hpVal: 'v' }
    hltbSearch = {
      data: [
        { game_id: 1, game_name: 'Grand Theft Auto V', release_world: 2013, comp_main: 113_400 }
      ]
    }
    await importGame(3498)
    const media = db.prepare('SELECT total_units FROM media_item').get() as Record<string, unknown>
    expect(media.total_units).toBe(32) // 1890 min → 31.5 h → 32
  })

  it('updates an API-era rawg row instead of duplicating (same dedup key)', async () => {
    // A row imported back when RAWG's API was alive.
    const oldId = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, status, score, progress, external_source, external_id)
           VALUES ('game', 'GTA 5 (old title)', 'Playing', 9, 40, 'rawg', '3498')`
        )
        .run().lastInsertRowid
    )
    seedCatalog([catalogRow()])
    const summary = await importGame(3498)
    expect(summary.created).toBe(false)
    expect(summary.mediaId).toBe(oldId)
    const media = db.prepare('SELECT * FROM media_item WHERE id=?').get(oldId) as Record<
      string,
      unknown
    >
    expect(media.title).toBe('Grand Theft Auto V') // canonical refreshed
    expect(media.status).toBe('Playing') // personal preserved
    expect(media.progress).toBe(40)
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 1 })
  })

  it('re-import replaces old catalog studios and genres while keeping other tags', async () => {
    seedCatalog([catalogRow()])
    const { mediaId } = await importGame(3498)
    const personalTag = Number(
      db.prepare(`INSERT INTO tag (name, category) VALUES ('Replay later', 'custom')`).run()
        .lastInsertRowid
    )
    db.prepare('INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(mediaId, personalTag)
    catalog!.prepare(
      `UPDATE catalog_game SET developers=?, publishers=?, genres=? WHERE id=3498`
    ).run(
      JSON.stringify([{ id: 99, name: 'New Studio' }]),
      '[]',
      JSON.stringify(['Adventure'])
    )

    await importGame(3498)

    expect(
      db.prepare(
        `SELECT c.name, mc.role FROM media_company mc JOIN company c ON c.id=mc.company_id
         WHERE mc.media_id=? ORDER BY c.name`
      ).all(mediaId)
    ).toEqual([{ name: 'New Studio', role: 'developer' }])
    expect(
      db.prepare(
        `SELECT t.name FROM media_tag mt JOIN tag t ON t.id=mt.tag_id
         WHERE mt.media_id=? ORDER BY t.name`
      ).all(mediaId)
    ).toEqual([{ name: 'Adventure' }, { name: 'Replay later' }])
  })

  it('keeps child links when a catalog row lacks those fields', async () => {
    seedCatalog([catalogRow()])
    const { mediaId } = await importGame(3498)
    catalog!.prepare(
      'UPDATE catalog_game SET developers=NULL, publishers=NULL, genres=NULL WHERE id=3498'
    ).run()
    await importGame(3498)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM media_company WHERE media_id=?').get(mediaId)
    ).toEqual({ n: 2 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_tag WHERE media_id=?').get(mediaId)).toEqual({ n: 1 })
  })

  it('a hand-entered length survives when both HLTB and playtime miss', async () => {
    seedCatalog([catalogRow({ playtime: 0 })])
    await importGame(3498)
    db.prepare('UPDATE media_item SET total_units=52').run()
    await importGame(3498)
    expect(
      (db.prepare('SELECT total_units FROM media_item').get() as Record<string, unknown>)
        .total_units
    ).toBe(52)
  })

  it('rolls back everything if a write fails mid-transaction', async () => {
    seedCatalog([catalogRow({ genres: JSON.stringify([{ bad: 'shape' }]) })])
    await expect(importGame(3498)).rejects.toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM company').get()).toEqual({ n: 0 })
  })
})

describe('listTop (the /bulk page)', () => {
  const params = (over: Partial<BulkListParams> = {}): BulkListParams => ({
    source: 'game',
    sort: 'popular',
    count: 10,
    ...over
  })

  function seedVariety(): void {
    seedCatalog([
      catalogRow(), // added 22635, MC 92, rating 4.47/7409, 2013, Action
      catalogRow({
        id: 2,
        name: 'Hidden Gem',
        added: 300,
        metacritic: 95,
        rating: 4.9,
        ratings_count: 60,
        released: '2021-03-01',
        genres: JSON.stringify(['RPG']),
        alt: ''
      }),
      catalogRow({
        id: 3,
        name: 'Unscored Indie',
        added: 5000,
        metacritic: null,
        rating: 4.8,
        ratings_count: 20, // below the rating floor
        released: '2024-06-01',
        genres: JSON.stringify(['Indie', 'Card']),
        alt: ''
      }),
      catalogRow({
        id: 4,
        name: 'New Shovelware',
        added: 2, // below the newest floor
        metacritic: null,
        rating: null,
        ratings_count: 0,
        released: '2026-05-01',
        genres: JSON.stringify(['Board Games']),
        alt: ''
      })
    ])
  }

  it('popular = added DESC; metacritic excludes unscored; rating needs votes; newest needs traction', () => {
    seedVariety()
    expect(listTop(params()).map((r) => r.sourceId)).toEqual([3498, 3, 2, 4])
    expect(listTop(params({ sort: 'metacritic' })).map((r) => r.sourceId)).toEqual([2, 3498])
    // id 3 has the best rating but only 20 votes; id 4 has none at all.
    expect(listTop(params({ sort: 'rating' })).map((r) => r.sourceId)).toEqual([2, 3498])
    // Newest: id 4 (2026) is freshest but added=2 < 5 → floored out.
    expect(listTop(params({ sort: 'newest' })).map((r) => r.sourceId)).toEqual([3, 2, 3498])
  })

  it('scores follow the sort (metacritic vs rating vs best-available)', () => {
    seedVariety()
    expect(listTop(params({ sort: 'metacritic' }))[0].score).toBe(95)
    expect(listTop(params({ sort: 'rating' }))[0].score).toBe(4.9)
    // popular: metacritic if present, else rating (id 3 has no MC).
    const popular = listTop(params())
    expect(popular.find((r) => r.sourceId === 3498)?.score).toBe(92)
    expect(popular.find((r) => r.sourceId === 3)?.score).toBe(4.8)
  })

  it('year and genre filters narrow; genre matches whole quoted names only', () => {
    seedVariety()
    expect(listTop(params({ yearFrom: 2020 })).map((r) => r.sourceId)).toEqual([3, 2, 4])
    expect(listTop(params({ yearTo: 2015 })).map((r) => r.sourceId)).toEqual([3498])
    expect(listTop(params({ genre: 'RPG' })).map((r) => r.sourceId)).toEqual([2])
    // 'Card' must not substring-match 'Board Games'… and vice versa.
    expect(listTop(params({ genre: 'Card' })).map((r) => r.sourceId)).toEqual([3])
    expect(listTop(params({ genre: 'Board Games' })).map((r) => r.sourceId)).toEqual([4])
  })

  it('count caps the list and unknown sorts throw', () => {
    seedVariety()
    expect(listTop(params({ count: 2 })).map((r) => r.sourceId)).toEqual([3498, 3])
    expect(() => buildCatalogQuery(params({ sort: 'bogus' }))).toThrow(/Unknown catalog sort/)
  })

  it('throws before any work when the pack is not installed', () => {
    catalog = null
    expect(() => listTop(params())).toThrow(/not installed/)
  })
})
