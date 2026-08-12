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
import { bulkImport, ftsQueryFor, importGame, search, status } from '../src/main/gamesCatalog'

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

describe('bulkImport', () => {
  it('imports top-N by popularity, skips existing, survives one failure, never hits HLTB', async () => {
    seedCatalog([
      catalogRow(), // added 22635 — already in the library below → skipped
      catalogRow({ id: 2, name: 'The Witcher 3', added: 20000, alt: '' }),
      // A poison row: object genre breaks its import, but only its own.
      catalogRow({ id: 3, name: 'Broken Row', added: 15000, alt: '', genres: JSON.stringify([{ bad: 1 }]) }),
      catalogRow({ id: 4, name: 'Portal 2', added: 14000, alt: '' }),
      catalogRow({ id: 5, name: 'Below The Cut', added: 10, alt: '' })
    ])
    db.prepare(
      `INSERT INTO media_item (media_type, title, status, external_source, external_id)
       VALUES ('game', 'GTA V (mine)', 'Playing', 'rawg', '3498')`
    ).run()

    const res = await bulkImport(4) // top 4 by added — 'Below The Cut' excluded
    expect(res).toEqual({ imported: 2, skipped: 1, failed: 1 })

    const titles = db
      .prepare(`SELECT title FROM media_item ORDER BY title`)
      .all()
      .map((r) => (r as { title: string }).title)
    // The pre-existing row was NOT overwritten (bulk skips, never re-imports).
    expect(titles).toEqual(['GTA V (mine)', 'Portal 2', 'The Witcher 3'])

    // Lengths came from the dump's playtime — HLTB must never be called in bulk.
    expect(httpCalls.filter((u) => u.includes('/api/bleed'))).toEqual([])
    expect(
      (db.prepare(`SELECT total_units FROM media_item WHERE title='Portal 2'`).get() as {
        total_units: number
      }).total_units
    ).toBe(74)
  })

  it('throws before any work when the pack is not installed', async () => {
    catalog = null
    await expect(bulkImport(100)).rejects.toThrow(/not installed/)
  })
})
