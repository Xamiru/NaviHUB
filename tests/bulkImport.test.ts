import { beforeEach, describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { BulkListParams, BulkStartPayload } from '../src/shared/types'

// The /bulk section: the pure per-source request builders (AniList GraphQL
// variables, TMDB discover params, VNDB query body — the catalog SQL builder
// lives in gamesCatalog.test.ts) and the job singleton's loop (skip-existing,
// failure tolerance, the consecutive-failure bail, cancel keeping counts).

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, null])),
  downloadImage: async () => null
}))
// Overridable per test (default: any network call is a bug in the test).
let httpHandler: (url: string, init?: RequestInit) => Promise<unknown> = async (url) => {
  throw new Error(`Unexpected network call in test: ${url}`)
}
vi.mock('../src/main/http', () => ({
  sleep: async () => {},
  fetchWithRetry: (url: string, init?: RequestInit) => httpHandler(url, init)
}))
let catalog: Database.Database | null = null
vi.mock('../src/main/gamesCatalogDb', () => ({
  getCatalogDb: () => catalog,
  closeCatalogDb: () => {},
  catalogPath: () => ':memory:'
}))
vi.mock('../src/main/repos/settingsRepo', () => ({
  // tmdb's discoverTop needs a key to run at all; everything else reads null.
  get: (key: string) => (key === 'tmdb.api_key' ? 'test-key' : null)
}))

import { buildTopVariables, topList } from '../src/main/anilist'
import { buildDiscoverParams, discoverTop } from '../src/main/tmdb'
import { buildVndbTopBody } from '../src/main/vndb'
import { CATALOG_DDL } from '../src/main/gamesCatalogSchema'
import * as bulk from '../src/main/bulkImport'
import type { BulkSourceKey } from '../src/shared/bulkImport'

const params = (over: Partial<BulkListParams> = {}): BulkListParams => ({
  source: 'anime',
  sort: 'popular',
  count: 100,
  ...over
})

describe('buildTopVariables (AniList)', () => {
  it('maps sorts and omits every unset filter (GraphQL skips absent variables)', () => {
    expect(buildTopVariables(params(), 1, 50)).toEqual({
      type: 'ANIME',
      sort: ['POPULARITY_DESC'],
      page: 1,
      perPage: 50
    })
    expect(buildTopVariables(params({ sort: 'rated' }), 2, 50).sort).toEqual(['SCORE_DESC'])
    expect(buildTopVariables(params({ sort: 'trending' }), 1, 50).sort).toEqual(['TRENDING_DESC'])
    expect(buildTopVariables(params({ source: 'manga' }), 1, 50).type).toBe('MANGA')
    expect(() => buildTopVariables(params({ sort: 'bogus' }), 1, 50)).toThrow(/Unknown AniList sort/)
  })

  it('year bounds become FuzzyDateInt yyyy0000 (upper bound exclusive at yearTo+1)', () => {
    const vars = buildTopVariables(params({ yearFrom: 2019, yearTo: 2021 }), 1, 50)
    expect(vars.startFrom).toBe(20_190_000) // > 20190000 admits 2019-01-01
    expect(vars.startTo).toBe(20_220_000) // < 20220000 keeps 2021-12-31
  })

  it('season needs BOTH season and year, and only applies to anime', () => {
    const on = buildTopVariables(params({ season: 'winter', seasonYear: 2024 }), 1, 50)
    expect(on.season).toBe('WINTER')
    expect(on.seasonYear).toBe(2024)
    expect(buildTopVariables(params({ season: 'winter' }), 1, 50).season).toBeUndefined()
    expect(
      buildTopVariables(params({ source: 'manga', season: 'winter', seasonYear: 2024 }), 1, 50)
        .season
    ).toBeUndefined()
  })

  it('genre becomes genre_in', () => {
    expect(buildTopVariables(params({ genre: 'Romance' }), 1, 50).genres).toEqual(['Romance'])
  })
})

describe('buildDiscoverParams (TMDB)', () => {
  it('maps sorts; the vote floor exists only on rated and differs movie vs tv', () => {
    expect(buildDiscoverParams('movie', params({ source: 'movie' }), 3)).toEqual({
      sort_by: 'popularity.desc',
      include_adult: 'false',
      page: '3'
    })
    expect(buildDiscoverParams('movie', params({ source: 'movie', sort: 'rated' }), 1)['vote_count.gte']).toBe('300')
    expect(buildDiscoverParams('tv', params({ source: 'tv', sort: 'rated' }), 1)['vote_count.gte']).toBe('150')
    expect(() => buildDiscoverParams('movie', params({ sort: 'bogus' }), 1)).toThrow(/Unknown TMDB sort/)
  })

  it('year bounds use the kind-specific date field', () => {
    const movie = buildDiscoverParams('movie', params({ source: 'movie', yearFrom: 1990, yearTo: 1999 }), 1)
    expect(movie['primary_release_date.gte']).toBe('1990-01-01')
    expect(movie['primary_release_date.lte']).toBe('1999-12-31')
    const tv = buildDiscoverParams('tv', params({ source: 'tv', yearFrom: 2010 }), 1)
    expect(tv['first_air_date.gte']).toBe('2010-01-01')
    expect(tv['first_air_date.lte']).toBeUndefined()
  })

  it('genres resolve through the per-kind id maps (they differ)', () => {
    expect(buildDiscoverParams('movie', params({ source: 'movie', genre: 'Horror' }), 1).with_genres).toBe('27')
    expect(
      buildDiscoverParams('tv', params({ source: 'tv', genre: 'Sci-Fi & Fantasy' }), 1).with_genres
    ).toBe('10765')
    // Horror is a movie-only genre on TMDB.
    expect(() => buildDiscoverParams('tv', params({ source: 'tv', genre: 'Horror' }), 1)).toThrow(
      /Unknown TMDB genre/
    )
  })
})

describe('buildVndbTopBody (VNDB)', () => {
  it('rated sorts by rating desc with a votecount floor; voted has no floor', () => {
    const rated = buildVndbTopBody(params({ source: 'visual_novel', sort: 'rated' }), 2)
    expect(rated).toMatchObject({ sort: 'rating', reverse: true, results: 100, page: 2 })
    expect(rated.filters).toEqual(['votecount', '>=', 100])
    const voted = buildVndbTopBody(params({ source: 'visual_novel', sort: 'voted' }), 1)
    expect(voted.sort).toBe('votecount')
    expect(voted.filters).toBeUndefined()
    expect(() => buildVndbTopBody(params({ sort: 'bogus' }), 1)).toThrow(/Unknown VNDB sort/)
  })

  it('multiple filters combine under and; a single one stays bare', () => {
    const both = buildVndbTopBody(
      params({ source: 'visual_novel', sort: 'rated', yearFrom: 2000, yearTo: 2010 }),
      1
    )
    expect(both.filters).toEqual([
      'and',
      ['votecount', '>=', 100],
      ['released', '>=', '2000-01-01'],
      ['released', '<=', '2010-12-31']
    ])
    const single = buildVndbTopBody(params({ source: 'visual_novel', sort: 'voted', yearFrom: 2015 }), 1)
    expect(single.filters).toEqual(['released', '>=', '2015-01-01'])
  })
})

describe('topList partial tolerance (AniList)', () => {
  it('a page failure mid-crawl returns what was fetched instead of throwing it away', async () => {
    httpHandler = async (_url, init) => {
      const body = JSON.parse(String(init?.body ?? '{}'))
      if (body.variables.page > 1) throw new Error('429 exhausted')
      return {
        ok: true,
        status: 200,
        json: async () => ({
          data: {
            Page: {
              pageInfo: { hasNextPage: true },
              media: Array.from({ length: 50 }, (_, i) => ({
                id: i + 1,
                title: { romaji: `Anime ${i + 1}` },
                startDate: { year: 2020 },
                averageScore: 80,
                coverImage: { large: 'https://img/c.png' }
              }))
            }
          }
        })
      }
    }
    const items = await topList(params({ count: 100 }), 0)
    expect(items).toHaveLength(50) // page 1 kept, page 2's failure tolerated
    // …but a FIRST-page failure still throws (an empty preview must error).
    httpHandler = async () => {
      throw new Error('down')
    }
    await expect(topList(params({ count: 100 }), 0)).rejects.toThrow('down')
  })
})

describe('discoverTop language exclusion (TMDB)', () => {
  it('drops Indian-original-language rows and keeps crawling to fill the count', async () => {
    // Page 1 is half excluded; page 2 tops the list up. The standing rule:
    // no Indian releases on a bulk shelf (originally --exclude-langs).
    const row = (id: number, lang: string) => ({
      id,
      title: `Movie ${id}`,
      original_language: lang,
      release_date: '2024-01-01',
      poster_path: null,
      vote_average: 7
    })
    httpHandler = async (url) => {
      const page = new URL(url).searchParams.get('page')
      return {
        ok: true,
        status: 200,
        json: async () =>
          page === '1'
            ? { total_pages: 2, results: [row(1, 'en'), row(2, 'hi'), row(3, 'ta'), row(4, 'ja')] }
            : { total_pages: 2, results: [row(5, 'te'), row(6, 'fr')] }
      }
    }
    const items = await discoverTop('movie', params({ source: 'movie', count: 3 }), 0)
    expect(items.map((it) => it.sourceId)).toEqual([1, 4, 6])
  })
})

describe('preview', () => {
  it('deduplicates repeats from pagination drift, keeping the first occurrence', async () => {
    expect(
      bulk
        .dedupeBySourceId([
          { sourceId: 1, title: 'A', year: null, coverUrl: null, score: 9, inLibrary: false },
          { sourceId: 2, title: 'B', year: null, coverUrl: null, score: 8, inLibrary: false },
          { sourceId: 1, title: 'A again', year: null, coverUrl: null, score: 7, inLibrary: false }
        ])
        .map((it) => [it.sourceId, it.title])
    ).toEqual([
      [1, 'A'],
      [2, 'B']
    ])
  })

  it('marks in-library rows via (external_source, media_type)', async () => {
    catalog = new Database(':memory:')
    catalog.exec(CATALOG_DDL)
    const ins = catalog.prepare(
      `INSERT INTO catalog_game (id, name, added) VALUES (?, ?, ?)`
    )
    ins.run(1, 'Owned Game', 100)
    ins.run(2, 'New Game', 50)
    db.prepare(
      `INSERT INTO media_item (media_type, title, external_source, external_id)
       VALUES ('game', 'Owned Game', 'rawg', '1')`
    ).run()
    // Same external id under a DIFFERENT media_type must not mark it.
    db.prepare(
      `INSERT INTO media_item (media_type, title, external_source, external_id)
       VALUES ('anime', 'Same Id Anime', 'anilist', '2')`
    ).run()

    const items = await bulk.preview(params({ source: 'game', count: 10 }))
    expect(items.map((it) => [it.sourceId, it.inLibrary])).toEqual([
      [1, true],
      [2, false]
    ])
  })

  it('marks a Steam-owned game in-library by normalized title (disjoint id spaces)', async () => {
    catalog = new Database(':memory:')
    catalog.exec(CATALOG_DDL)
    const ins = catalog.prepare(`INSERT INTO catalog_game (id, name, added) VALUES (?, ?, ?)`)
    ins.run(11, 'Persona 5 Royal', 100)
    ins.run(12, 'Bloodborne', 90)
    // Imported via Steam: external_source 'steam', appid — nothing matches the
    // catalog's rawg id space, only the name can.
    db.prepare(
      `INSERT INTO media_item (media_type, title, external_source, external_id)
       VALUES ('game', 'PERSONA 5: Royal', 'steam', '1687950')`
    ).run()
    const items = await bulk.preview(params({ source: 'game', count: 10 }))
    expect(items.map((it) => [it.title, it.inLibrary])).toEqual([
      ['Persona 5 Royal', true],
      ['Bloodborne', false]
    ])
  })
})

describe('start (the run loop)', () => {
  const payload = (n: number, source: BulkSourceKey = 'anime'): BulkStartPayload => ({
    source,
    items: Array.from({ length: n }, (_, i) => ({ sourceId: i + 1, title: `Title ${i + 1}` }))
  })

  async function settled(): Promise<ReturnType<typeof bulk.getStatus>> {
    for (let i = 0; i < 200; i++) {
      const s = bulk.getStatus()
      if (s.state !== 'running') return s
      await new Promise((r) => setTimeout(r, 5))
    }
    throw new Error('run never settled')
  }

  it('imports the selection, skips rows already in the library, tolerates one failure', async () => {
    db.prepare(
      `INSERT INTO media_item (media_type, title, external_source, external_id)
       VALUES ('anime', 'Already Here', 'anilist', '2')`
    ).run()
    const imported: number[] = []
    bulk.start(payload(4), {
      delayMs: 0,
      importOne: async (_s, id) => {
        if (id === 3) throw new Error('cover download failed')
        imported.push(id)
      }
    })
    const s = await settled()
    expect(s).toMatchObject({ state: 'done', done: 4, total: 4, imported: 2, skipped: 1, failed: 1 })
    expect(imported).toEqual([1, 4])
  })

  it('skips a Steam-owned game by title in the run loop, not just in preview', async () => {
    db.prepare(
      `INSERT INTO media_item (media_type, title, external_source, external_id)
       VALUES ('game', 'Title 2', 'steam', '999')`
    ).run()
    const imported: number[] = []
    bulk.start(payload(3, 'game'), {
      delayMs: 0,
      importOne: async (_s, id) => {
        imported.push(id)
      }
    })
    const s = await settled()
    expect(s).toMatchObject({ state: 'done', imported: 2, skipped: 1 })
    expect(imported).toEqual([1, 3])
  })

  it('bails with a resume hint after 10 consecutive failures, keeping earlier work', async () => {
    bulk.start(payload(20), {
      delayMs: 0,
      importOne: async (_s, id) => {
        if (id > 2) throw new Error('source down')
      }
    })
    const s = await settled()
    expect(s.state).toBe('error')
    expect(s.imported).toBe(2)
    expect(s.failed).toBe(10)
    expect(s.done).toBe(12) // stopped at the bail, not the end
    expect(s.message).toMatch(/resume/i)
  })

  it('cancel stops between titles and keeps the counts', async () => {
    bulk.start(payload(5), { delayMs: 0, importOne: async () => {} })
    bulk.cancel()
    const s = await settled()
    expect(s.state).toBe('cancelled')
    expect(s.imported).toBe(1) // the title in flight when cancel hit still landed
    expect(s.done).toBe(1)
  })

  it('rejects an empty selection and a second start while running', async () => {
    expect(() => bulk.start({ source: 'anime', items: [] })).toThrow(/Nothing selected/)
    let release: () => void = () => {}
    bulk.start(payload(1), {
      delayMs: 0,
      importOne: () => new Promise((r) => (release = r as () => void))
    })
    expect(() => bulk.start(payload(1), { delayMs: 0, importOne: async () => {} })).toThrow(
      /already running/
    )
    release()
    await settled()
  })

  it('run ids increment so a settled status is attributable', async () => {
    bulk.start(payload(1), { delayMs: 0, importOne: async () => {} })
    const first = (await settled()).id
    bulk.start(payload(1), { delayMs: 0, importOne: async () => {} })
    const second = (await settled()).id
    expect(second).toBe(first + 1)
  })
})

beforeEach(() => {
  db = createTestDb()
  catalog = null
  httpHandler = async (url) => {
    throw new Error(`Unexpected network call in test: ${url}`)
  }
})
