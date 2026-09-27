import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { importMovie, importTv } from '../src/main/tmdb'
import { getState, setManual } from '../src/main/repos/imageOverrideRepo'

// End-to-end TMDB import against the real schema, network mocked. Movies and TV
// share one persistTitle(), so this covers both shapes of the same invariants:
// dedup by external id, personal tracking surviving a re-import, and the wide
// backdrop never being downloaded.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => 'test-key' }))

// Only URLs the test says landed on disk get a path; everything else is null.
const images = vi.hoisted(() => ({
  resolve: null as ((url: string) => string | null) | null,
  requested: [] as string[]
}))
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) => {
    images.requested.push(...(urls.filter(Boolean) as string[]))
    return new Map(
      urls
        .filter(Boolean)
        .map((u) => [u as string, images.resolve ? images.resolve(u as string) : null])
    )
  },
  downloadImage: async () => null
}))

// Endpoint → fixture, keyed by the path portion of the request.
let routes: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  sleep: async () => {},
  fetchWithRetry: async (url: string) => {
    const path = new URL(url).pathname.replace('/3', '')
    const body = routes[path]
    if (!body) throw new Error(`unmocked TMDB path: ${path}`)
    return { ok: true, status: 200, json: async () => body }
  }
}))

const movieFixture = (over: Record<string, unknown> = {}) => ({
  id: 550,
  title: 'Perfect Blue',
  original_title: 'パーフェクトブルー',
  overview: 'A retired idol loses her grip on which life is hers.',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  runtime: 81,
  release_date: '1998-02-28',
  imdb_id: null,
  production_companies: [{ id: 7, name: 'Madhouse' }],
  genres: [{ name: 'Animation' }],
  credits: { cast: [], crew: [] },
  ...over
})

const tvFixture = (over: Record<string, unknown> = {}) => ({
  id: 1920,
  name: 'Twin Peaks',
  original_name: 'Twin Peaks',
  overview: 'A federal agent arrives in a town that will not explain itself.',
  poster_path: '/tp.jpg',
  backdrop_path: '/tp-backdrop.jpg',
  number_of_episodes: 30,
  first_air_date: '1990-04-08',
  episode_run_time: [47],
  networks: [{ id: 2, name: 'ABC' }],
  production_companies: [],
  genres: [{ name: 'Mystery' }],
  aggregate_credits: { cast: [] },
  external_ids: { imdb_id: null },
  // Specials (season 0) are listed by TMDB and must be skipped.
  seasons: [
    { season_number: 0, episode_count: 2 },
    { season_number: 1, episode_count: 2 },
    { season_number: 2, episode_count: 2 }
  ],
  ...over
})

const seasonFixture = (season: number, count: number, over: Record<string, unknown> = {}) => ({
  season_number: season,
  episodes: Array.from({ length: count }, (_, i) => ({
    episode_number: i + 1,
    name: `S${season}E${i + 1}`,
    overview: 'Something happens.',
    air_date: '1990-04-08',
    runtime: 47
  })),
  ...over
})

beforeEach(() => {
  db = createTestDb()
  images.resolve = null
  routes = {
    '/movie/550': movieFixture(),
    '/tv/1920': tvFixture(),
    '/tv/1920/season/1': seasonFixture(1, 2),
    '/tv/1920/season/2': seasonFixture(2, 2)
  }
})

describe('tmdb movie import', () => {
  it('writes the title, runtime and production company', async () => {
    await importMovie(550, { skipOmdb: true })
    const row = db.prepare('SELECT * FROM media_item').get() as Record<string, unknown>
    expect(row.media_type).toBe('movie')
    expect(row.title).toBe('Perfect Blue')
    expect(row.title_original).toBe('パーフェクトブルー')
    expect(row.total_units).toBe(81)
    expect(row.external_source).toBe('tmdb')
    expect(db.prepare('SELECT name FROM company').get()).toEqual({ name: 'Madhouse' })
  })

  it('dedups on re-import and preserves personal tracking', async () => {
    await importMovie(550, { skipOmdb: true })
    const id = (db.prepare('SELECT id FROM media_item').get() as { id: number }).id
    db.prepare('UPDATE media_item SET status=?, score=?, rewatch_count=? WHERE id=?').run(
      'Watched',
      9,
      3,
      id
    )

    routes['/movie/550'] = movieFixture({ runtime: 82 })
    await importMovie(550, { skipOmdb: true })

    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 1 })
    const row = db.prepare('SELECT * FROM media_item').get() as Record<string, unknown>
    expect(row.total_units).toBe(82) // canonical fields refresh
    expect(row.status).toBe('Watched') // personal tracking does not
    expect(row.score).toBe(9)
    expect(row.rewatch_count).toBe(3)
  })

  // The detail-page hero was retired for the Art-tab background; its wide art
  // was an extra multi-hundred-KB download per title.
  it('never downloads the backdrop', async () => {
    images.requested = []
    await importMovie(550, { skipOmdb: true })
    await importTv(1920, { skipOmdb: true })
    expect(images.requested.some((u) => u.includes('backdrop'))).toBe(false)
    expect(images.requested.some((u) => u.includes('poster') || u.includes('tp.jpg'))).toBe(true)
  })
})

describe('tmdb tv import', () => {
  it('writes episode count, network and per-episode runtime metadata', async () => {
    await importTv(1920, { skipOmdb: true })
    const row = db.prepare('SELECT * FROM media_item').get() as Record<string, unknown>
    expect(row.media_type).toBe('tv')
    expect(row.total_units).toBe(30)
    expect(JSON.parse(String(row.metadata)).epDuration).toBe(47)
    expect(db.prepare('SELECT name FROM company').get()).toEqual({ name: 'ABC' })
  })
})

describe('tv episode catalogue', () => {
  const episodes = () =>
    db
      .prepare('SELECT season, number, absolute, title, runtime FROM tv_episode ORDER BY season, number')
      .all() as { season: number; number: number; absolute: number; title: string }[]

  it('stores every episode and numbers `absolute` across the whole show', async () => {
    await importTv(1920, { skipOmdb: true })
    expect(episodes()).toEqual([
      { season: 1, number: 1, absolute: 1, title: 'S1E1', runtime: 47 },
      { season: 1, number: 2, absolute: 2, title: 'S1E2', runtime: 47 },
      { season: 2, number: 1, absolute: 3, title: 'S2E1', runtime: 47 },
      { season: 2, number: 2, absolute: 4, title: 'S2E2', runtime: 47 }
    ])
  })

  it('skips specials, so absolute agrees with number_of_episodes', async () => {
    await importTv(1920, { skipOmdb: true })
    // season 0 was listed by TMDB and never requested, so no unmocked-path throw
    // and no season-0 rows.
    expect(db.prepare('SELECT COUNT(*) AS n FROM tv_episode WHERE season = 0').get()).toEqual({
      n: 0
    })
  })

  it('survives a season that fails to fetch, keeping the rest', async () => {
    delete routes['/tv/1920/season/2']
    await importTv(1920, { skipOmdb: true })
    expect(episodes().map((e) => `${e.season}x${e.number}`)).toEqual(['1x1', '1x2'])
  })

  it('re-import refreshes titles, prunes dropped episodes and keeps watched marks', async () => {
    await importTv(1920, { skipOmdb: true })
    const id = (
      db.prepare('SELECT id FROM tv_episode WHERE season=1 AND number=1').get() as { id: number }
    ).id
    db.prepare(`UPDATE tv_episode SET watched_at = '2026-08-01' WHERE id = ?`).run(id)

    // Season 2 loses an episode and season 1 gets a real title.
    routes['/tv/1920/season/1'] = {
      season_number: 1,
      episodes: [
        { episode_number: 1, name: 'Northwest Passage', overview: '', air_date: '1990-04-08', runtime: 94 },
        { episode_number: 2, name: 'Traces to Nowhere', overview: '', air_date: '1990-04-12', runtime: 47 }
      ]
    }
    routes['/tv/1920/season/2'] = seasonFixture(2, 1)
    await importTv(1920, { skipOmdb: true })

    const rows = episodes()
    expect(rows.map((e) => `${e.season}x${e.number}`)).toEqual(['1x1', '1x2', '2x1'])
    expect(rows[0].title).toBe('Northwest Passage')
    expect(
      db.prepare('SELECT watched_at FROM tv_episode WHERE id = ?').get(id)
    ).toEqual({ watched_at: '2026-08-01' })
  })

  it('writes no episodes for a movie', async () => {
    await importMovie(550, { skipOmdb: true })
    expect(db.prepare('SELECT COUNT(*) AS n FROM tv_episode').get()).toEqual({ n: 0 })
  })
})

describe('tmdb collections', () => {
  const relations = () =>
    db
      .prepare(
        `SELECT relation_type, related_external_id, related_title FROM media_relation
         ORDER BY sort_order`
      )
      .all()

  it('links the other films of its collection as prequels and sequels in release order', async () => {
    routes['/movie/550'] = movieFixture({ belongs_to_collection: { id: 10 } })
    routes['/collection/10'] = {
      parts: [
        { id: 553, title: 'Announced', release_date: '' },
        { id: 551, title: 'Later', release_date: '2005-01-01' },
        { id: 550, title: 'Perfect Blue', release_date: '1998-02-28' },
        { id: 549, title: 'Earlier', release_date: '1990-01-01' }
      ]
    }
    await importMovie(550, { skipOmdb: true })
    expect(relations()).toEqual([
      { relation_type: 'PREQUEL', related_external_id: '549', related_title: 'Earlier' },
      { relation_type: 'SEQUEL', related_external_id: '551', related_title: 'Later' },
      { relation_type: 'SEQUEL', related_external_id: '553', related_title: 'Announced' }
    ])
  })

  it('keeps the stored collection when the collection request fails', async () => {
    routes['/movie/550'] = movieFixture({ belongs_to_collection: { id: 10 } })
    routes['/collection/10'] = { parts: [{ id: 551, title: 'Later', release_date: '2005-01-01' }] }
    await importMovie(550, { skipOmdb: true })
    delete routes['/collection/10']
    await importMovie(550, { skipOmdb: true })
    expect(relations()).toHaveLength(1)

    // Leaving the collection at the source is a real removal.
    routes['/movie/550'] = movieFixture({ belongs_to_collection: null })
    await importMovie(550, { skipOmdb: true })
    expect(relations()).toHaveLength(0)
  })
})

describe('partial refresh (Library Refresh)', () => {
  // Same invariant as the AniList side: `only` writes media_item columns (and
  // tv_episode when asked) and prunes nothing. TMDB's character prune is inlined
  // in persistTitle and sweeps orphans source-globally.
  const counts = () => ({
    characters: (db.prepare('SELECT COUNT(*) AS n FROM character').get() as { n: number }).n,
    credits: (db.prepare('SELECT COUNT(*) AS n FROM credit').get() as { n: number }).n,
    companies: (db.prepare('SELECT COUNT(*) AS n FROM media_company').get() as { n: number }).n,
    tags: (db.prepare('SELECT COUNT(*) AS n FROM media_tag').get() as { n: number }).n,
    relations: (db.prepare('SELECT COUNT(*) AS n FROM media_relation').get() as { n: number }).n
  })

  const withCast = () =>
    movieFixture({
      credits: {
        cast: [
          { credit_id: 'c1', id: 1, name: 'Junko Iwao', character: 'Mima', order: 0, profile_path: '/a.jpg' },
          { credit_id: 'c2', id: 2, name: 'Rica Matsumoto', character: 'Rumi', order: 1, profile_path: '/b.jpg' }
        ],
        crew: [{ id: 9, name: 'Satoshi Kon', job: 'Director', profile_path: null }]
      }
    })

  it('leaves cast, crew, companies and genres intact on a cover refresh', async () => {
    routes['/movie/550'] = { ...withCast(), belongs_to_collection: { id: 10 } }
    routes['/collection/10'] = {
      parts: [
        { id: 550, title: 'Perfect Blue', release_date: '1998-02-28' },
        { id: 551, title: 'Sequel', release_date: '2001-01-01' }
      ]
    }
    await importMovie(550, { skipOmdb: true })
    const before = counts()
    expect(before.relations).toBeGreaterThan(0)
    expect(before.characters).toBeGreaterThan(0)
    expect(before.credits).toBeGreaterThan(0)
    expect(before.companies).toBeGreaterThan(0)
    expect(before.tags).toBeGreaterThan(0)

    images.resolve = (url) => (url.includes('poster') ? 'media/dl-new-poster' : null)
    await importMovie(550, { only: ['cover'] })

    expect(counts()).toEqual(before)
    expect(db.prepare('SELECT cover_path FROM media_item').get()).toEqual({
      cover_path: 'media/dl-new-poster'
    })
  })

  it('keeps hand-picked covers and photos through a re-import', async () => {
    routes['/movie/550'] = withCast()
    images.resolve = (url) => `media/dl-old-${url.split('/').pop()}`
    await importMovie(550, { skipOmdb: true })
    const mediaId = (db.prepare('SELECT id FROM media_item').get() as { id: number }).id
    const personId = (
      db.prepare("SELECT id FROM person WHERE name = 'Junko Iwao'").get() as { id: number }
    ).id
    setManual('media', mediaId, 'media/my-cover.jpg')
    setManual('person', personId, 'media/my-photo.jpg')

    images.resolve = (url) => `media/dl-new-${url.split('/').pop()}`
    await importMovie(550, { skipOmdb: true })
    await importMovie(550, { only: ['cover'] })

    expect(db.prepare('SELECT cover_path FROM media_item').get()).toEqual({
      cover_path: 'media/my-cover.jpg'
    })
    expect(db.prepare('SELECT photo_path FROM person WHERE id = ?').get(personId)).toEqual({
      photo_path: 'media/my-photo.jpg'
    })
    expect(getState('media', mediaId).providerPath).toBe('media/dl-new-poster.jpg')
    expect(getState('person', personId).providerPath).toBe('media/dl-old-a.jpg')
  })

  it('an episodes refresh fills the catalogue and leaves everything else', async () => {
    await importTv(1920, { skipOmdb: true })
    db.prepare("UPDATE media_item SET title='Hand edited'").run()
    db.prepare('DELETE FROM tv_episode').run()

    await importTv(1920, { only: ['episodes'] })

    expect(db.prepare('SELECT COUNT(*) AS n FROM tv_episode').get()).toEqual({ n: 4 })
    expect(db.prepare('SELECT title FROM media_item').get()).toEqual({ title: 'Hand edited' })
  })

  it('a refresh that did not ask for episodes never requests a season', async () => {
    await importTv(1920, { skipOmdb: true })
    // The http mock throws on any unmocked path, so removing the season routes
    // turns "fetched a season anyway" into a failure — one request per season is
    // the only network cost aspect selection actually saves.
    delete routes['/tv/1920/season/1']
    delete routes['/tv/1920/season/2']
    await expect(importTv(1920, { only: ['cover'] })).resolves.toBeTruthy()
  })

  it('never touches personal tracking', async () => {
    await importMovie(550, { skipOmdb: true })
    db.prepare('UPDATE media_item SET status=?, score=?, rewatch_count=?').run('Watched', 10, 4)
    await importMovie(550, { only: ['cover', 'text'] })
    expect(db.prepare('SELECT status, score, rewatch_count FROM media_item').get()).toEqual({
      status: 'Watched',
      score: 10,
      rewatch_count: 4
    })
  })

  it('refuses a title that is not in the library', async () => {
    await expect(importMovie(550, { only: ['cover'] })).rejects.toThrow(/not in the library/)
  })
})
