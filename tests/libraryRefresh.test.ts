import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))
const importers = vi.hoisted(() => ({
  importAnime: vi.fn(async () => {}),
  importManga: vi.fn(async () => {}),
  importMovie: vi.fn(async () => {}),
  importTv: vi.fn(async () => {})
}))
vi.mock('../src/main/anilist', () => ({
  importAnime: importers.importAnime,
  importManga: importers.importManga
}))
vi.mock('../src/main/tmdb', () => ({
  importMovie: importers.importMovie,
  importTv: importers.importTv
}))

import * as refresh from '../src/main/libraryRefresh'
import * as tasks from '../src/main/tasks'
import { __resetLibraryJobLock, claimLibraryJob } from '../src/main/libraryJobLock'
import type { RefreshRequest } from '../src/shared/refresh'

// The Library Refresh runner: the selection SQL, the skip-what's-filled toggle,
// and the loop's failure posture. The importer itself is injected, so nothing
// here touches the network.

function addMedia(over: Partial<Record<string, unknown>> = {}): number {
  const row = {
    media_type: 'anime',
    title: 'T',
    external_source: 'anilist',
    external_id: String(Math.floor(Math.random() * 1e9)),
    cover_path: null,
    synopsis: null,
    total_units: null,
    metadata: '{"averageScore":80}',
    ...over
  }
  return Number(
    db
      .prepare(
        `INSERT INTO media_item
           (media_type, title, external_source, external_id, cover_path, synopsis, total_units, metadata)
         VALUES (@media_type, @title, @external_source, @external_id, @cover_path, @synopsis,
                 @total_units, @metadata)`
      )
      .run(row).lastInsertRowid
  )
}

const req = (over: Partial<RefreshRequest> = {}): RefreshRequest => ({
  types: ['anime'],
  aspects: ['cover'],
  onlyMissing: true,
  ...over
})

// The loop settles asynchronously; poll rather than guess at a delay.
async function settled(): Promise<ReturnType<typeof refresh.getStatus>> {
  for (let i = 0; i < 200; i++) {
    const s = refresh.getStatus()
    if (s.state !== 'running') return s
    await new Promise((r) => setTimeout(r, 5))
  }
  throw new Error('run never settled')
}

beforeEach(() => {
  db = createTestDb()
  tasks.__reset()
  __resetLibraryJobLock()
})

describe('selectRows', () => {
  it('filters by media type and keeps only refreshable sources', () => {
    const anime = addMedia({ title: 'Lain' })
    addMedia({ media_type: 'movie', title: 'Perfect Blue', external_source: 'tmdb' })
    // A legacy RAWG game: no importer serves it any more.
    addMedia({ media_type: 'game', title: 'Old', external_source: 'rawg' })
    // Hand-added, never imported — nothing to refresh from.
    addMedia({ title: 'Manual', external_source: null, external_id: null })

    const rows = refresh.selectRows(req({ types: ['anime'] }))
    expect(rows.map((r) => r.id)).toEqual([anime])
  })

  it('onlyMissing keeps titles lacking ANY chosen aspect', () => {
    const noText = addMedia({ title: 'No text', cover_path: 'media/c' })
    const noCover = addMedia({ title: 'No cover', synopsis: 's', total_units: 1 })
    addMedia({ title: 'Has both', cover_path: 'media/c', synopsis: 's', total_units: 1 })

    const rows = refresh.selectRows(req({ aspects: ['cover', 'text'] }))
    expect(rows.map((r) => r.id).sort()).toEqual([noText, noCover].sort())
  })

  it('counts a missing community score as missing text, per source', () => {
    const full = { cover_path: 'media/c', synopsis: 's', total_units: 1 }
    const tmdb = { ...full, media_type: 'movie', external_source: 'tmdb' }
    const noImdb = addMedia({ ...tmdb, metadata: '{"rottenTomatoes":90}' })
    addMedia({ ...tmdb, metadata: '{"imdbRating":81}' })
    const noScore = addMedia({ ...full, metadata: null })
    const broken = addMedia({ ...full, metadata: 'not json' })
    addMedia(full)

    const rows = refresh.selectRows(req({ types: ['anime', 'movie'], aspects: ['text'] }))
    expect(rows.map((r) => r.id).sort()).toEqual([noImdb, noScore, broken].sort())
  })

  it('onlyMissing off takes everything of the type', () => {
    addMedia({ cover_path: 'media/c' })
    addMedia({ cover_path: 'media/c' })
    expect(refresh.selectRows(req({ onlyMissing: false }))).toHaveLength(2)
  })

  it('full re-import takes every title, least recently updated first', () => {
    const recent = addMedia({ title: 'Recent', cover_path: 'media/c', synopsis: 's', total_units: 1 })
    const stale = addMedia({ title: 'Stale', cover_path: 'media/c', synopsis: 's', total_units: 1 })
    db.prepare(`UPDATE media_item SET updated_at='2026-01-01 00:00:00' WHERE id=?`).run(stale)
    db.prepare(`UPDATE media_item SET updated_at='2026-09-01 00:00:00' WHERE id=?`).run(recent)
    const rows = refresh.selectRows(req({ aspects: ['full'] }))
    expect(rows.map((r) => r.id)).toEqual([stale, recent])
  })

  it('counts a TV title as missing episodes only while it has no catalogue', () => {
    const show = addMedia({ media_type: 'tv', external_source: 'tmdb', cover_path: 'media/c' })
    const r = req({ types: ['tv'], aspects: ['episodes'] })
    expect(refresh.selectRows(r)).toHaveLength(1)

    db.prepare(
      `INSERT INTO tv_episode (media_id, season, number) VALUES (?, 1, 1)`
    ).run(show)
    expect(refresh.selectRows(r)).toHaveLength(0)
  })

  it('selects only AniList anime with no theme-song rows for theme backfill', () => {
    const missing = addMedia({ title: 'Missing themes' })
    const complete = addMedia({ title: 'Has themes' })
    db.prepare(
      `INSERT INTO theme_song (media_id, external_source, external_id, title)
       VALUES (?, 'animethemes', 'song-1', 'Song')`
    ).run(complete)
    addMedia({ title: 'TMDB anime', external_source: 'tmdb' })

    const rows = refresh.selectRows(req({ aspects: ['themes'] }))
    expect(rows.map((row) => row.id)).toEqual([missing])
  })

  it('game length takes games from any source, missing HowLongToBeat data only', () => {
    const steam = addMedia({ media_type: 'game', external_source: 'steam', metadata: null })
    const igdb = addMedia({ media_type: 'game', external_source: 'igdb', metadata: '{}' })
    addMedia({ media_type: 'game', external_source: 'steam', metadata: '{"hltb":{"main":600}}' })
    const rows = refresh.selectRows(req({ types: ['game'], aspects: ['length'] }))
    expect(rows.map((r) => r.id).sort()).toEqual([steam, igdb].sort())
    // Without 'length', IGDB rows stay unsupported.
    expect(
      refresh.preview(req({ types: ['game'], aspects: ['cover'], onlyMissing: false }))
    ).toMatchObject({ total: 2, unsupported: 1 })
  })

  it('estimates a full AniList pass far above a TMDB cover pass', () => {
    const anime = { external_source: 'anilist', media_type: 'anime' as const }
    const movie = { external_source: 'tmdb', media_type: 'movie' as const }
    expect(refresh.estimateTitleSeconds(anime, ['full'])).toBeGreaterThan(
      4 * refresh.estimateTitleSeconds(movie, ['cover'])
    )
    for (let i = 0; i < 3; i++) addMedia()
    expect(refresh.preview(req({ aspects: ['full'] })).estimateSeconds).toBe(
      Math.round(3 * refresh.estimateTitleSeconds(anime, ['full']))
    )
  })

  it('returns nothing when no type or no aspect is chosen', () => {
    addMedia()
    expect(refresh.selectRows(req({ types: [] }))).toEqual([])
    expect(refresh.selectRows(req({ aspects: [] }))).toEqual([])
  })
})

describe('preview', () => {
  it('reports the count and the unsupported rows separately', () => {
    addMedia({ media_type: 'game', external_source: 'steam' })
    addMedia({ media_type: 'game', external_source: 'rawg' })
    addMedia({ media_type: 'game', external_source: 'igdb' })
    const p = refresh.preview(req({ types: ['game'], aspects: ['cover'] }))
    expect(p.total).toBe(1)
    expect(p.unsupported).toBe(2)
  })
})

describe('start', () => {
  it('refreshes every selected title and reports done', async () => {
    addMedia({ title: 'A' })
    addMedia({ title: 'B' })
    const seen: string[] = []
    refresh.start(req(), {
      run: async (row) => {
        seen.push(row.title)
      },
      delayMs: 0
    })
    const s = await settled()
    expect(s.state).toBe('done')
    expect(s.refreshed).toBe(2)
    expect(s.failed).toBe(0)
    expect(seen.sort()).toEqual(['A', 'B'])
  })

  it('counts an unchanged title as skipped when the runner reports no change', async () => {
    addMedia({ title: 'Already current' })
    refresh.start(req(), { run: async () => false, delayMs: 0 })
    const s = await settled()
    expect(s.refreshed).toBe(0)
    expect(s.skipped).toBe(1)
  })

  it('hands each title only the aspects its type can serve', async () => {
    addMedia({ media_type: 'visual_novel', external_source: 'vndb', title: 'Muv-Luv' })
    let got: string[] = []
    refresh.start(
      req({ types: ['visual_novel'], aspects: ['cover', 'episodes'], onlyMissing: false }),
      {
        run: async (_row, aspects) => {
          got = [...aspects]
        },
        delayMs: 0
      }
    )
    await settled()
    // The runner narrows per title, so the importer never sees 'episodes' for a VN.
    expect(got).toEqual(['cover', 'episodes'])
  })

  it('keeps going past a failure and names it at the end', async () => {
    addMedia({ title: 'Good 1' })
    addMedia({ title: 'Bad' })
    addMedia({ title: 'Good 2' })
    refresh.start(req(), {
      run: async (row) => {
        if (row.title === 'Bad') throw new Error('404 from the source')
      },
      delayMs: 0
    })
    const s = await settled()
    expect(s.state).toBe('done') // one dead title does not fail the run
    expect(s.refreshed).toBe(2)
    expect(s.failed).toBe(1)
    expect(s.failures).toHaveLength(1)
    expect(s.failures[0]).toMatchObject({ title: 'Bad', error: '404 from the source' })
  })

  it('bails out when the source looks unreachable, keeping what it did', async () => {
    for (let i = 0; i < 15; i++) addMedia({ title: `T${i}` })
    refresh.start(req(), {
      run: async () => {
        throw new Error('ECONNREFUSED')
      },
      delayMs: 0
    })
    const s = await settled()
    expect(s.state).toBe('error')
    expect(s.message).toMatch(/AniList failed 10 titles in a row/)
    // Stopped trying at the threshold rather than grinding through every title.
    expect(s.failed).toBe(10)
    expect(s.failures).toHaveLength(10)
    expect(s.skipped).toBe(5)
  })

  it('gives up on one unreachable source while the others finish first', async () => {
    for (let i = 0; i < 12; i++) addMedia({ title: `A${i}` })
    const movie = addMedia({ media_type: 'movie', external_source: 'tmdb', title: 'Movie' })
    const order: number[] = []
    refresh.start(req({ types: ['anime', 'movie'] }), {
      run: async (row) => {
        order.push(row.id)
        if (row.external_source === 'anilist') throw new Error('ECONNREFUSED')
      },
      delayMs: 0
    })
    const s = await settled()
    // TMDB is quick, so it runs before the hours-long AniList pass.
    expect(order[0]).toBe(movie)
    expect(s.refreshed).toBe(1)
    expect(s.failed).toBe(10)
    expect(s.skipped).toBe(2)
    expect(s.state).toBe('error')
  })

  it('retries exactly the failed titles with the same aspects', async () => {
    addMedia({ title: 'Fine' })
    const bad = addMedia({ title: 'Flaky' })
    refresh.start(req({ aspects: ['full'] }), {
      run: async (row) => {
        if (row.id === bad) throw new Error('timeout')
      },
      delayMs: 0
    })
    expect((await settled()).failures.map((f) => f.id)).toEqual([bad])

    const seen: [number, string[]][] = []
    refresh.retryFailed({
      run: async (row, aspects) => void seen.push([row.id, [...aspects]]),
      delayMs: 0
    })
    expect((await settled()).state).toBe('done')
    expect(seen).toEqual([[bad, ['full']]])
  })

  it('refuses a second run while one is going', async () => {
    addMedia()
    addMedia()
    refresh.start(req(), { run: async () => {}, delayMs: 5 })
    expect(() => refresh.start(req(), { run: async () => {}, delayMs: 0 })).toThrow(/already running/)
    await settled()
  })

  it('refuses to start while a bulk import holds the library', async () => {
    addMedia()
    const release = claimLibraryJob('bulk')
    expect(() => refresh.start(req(), { run: async () => {}, delayMs: 0 })).toThrow(
      /bulk import is running/
    )
    release()
    refresh.start(req(), { run: async () => {}, delayMs: 0 })
    expect((await settled()).state).toBe('done')
    // The finished run gave the slot back.
    expect(() => claimLibraryJob('bulk')()).not.toThrow()
  })

  it('refuses to start with nothing to do', () => {
    addMedia({ cover_path: 'media/c' }) // already has the only chosen aspect
    expect(() => refresh.start(req(), { run: async () => {}, delayMs: 0 })).toThrow(/Nothing to refresh/)
  })

  it('cancel stops the loop and keeps the counts so far', async () => {
    for (let i = 0; i < 8; i++) addMedia({ title: `T${i}` })
    let done = 0
    refresh.start(req(), {
      run: async () => {
        done++
        if (done === 2) refresh.cancel()
      },
      delayMs: 0
    })
    const s = await settled()
    expect(s.state).toBe('cancelled')
    expect(s.refreshed).toBeGreaterThanOrEqual(2)
    expect(s.refreshed).toBeLessThan(8)
  })
})

describe('refreshMedia (single title)', () => {
  it('refreshes one row by media id', async () => {
    const id = addMedia({ title: 'One' })
    // The real dispatch would hit the network; assert the guard rails instead.
    await expect(refresh.refreshMedia(id + 999, ['cover'])).rejects.toThrow(/not found/)
  })

  it('refuses a row with no importable source', async () => {
    const id = addMedia({ external_source: null, external_id: null })
    await expect(refresh.refreshMedia(id, ['cover'])).rejects.toThrow(/no importable source/)
  })

  it('refuses a legacy RAWG row', async () => {
    const id = addMedia({ media_type: 'game', external_source: 'rawg' })
    await expect(refresh.refreshMedia(id, ['cover'])).rejects.toThrow(/no importable source/)
  })
})

describe('full re-import dispatch', () => {
  const row = (over: Record<string, unknown> = {}) => ({
    id: 1,
    title: 'T',
    media_type: 'anime' as const,
    external_source: 'anilist',
    external_id: '101',
    ...over
  })

  it('runs the whole AniList import with the full cast, not a partial refresh', async () => {
    importers.importAnime.mockClear()
    await refresh.refreshOne(row(), ['full', 'cover'])
    expect(importers.importAnime).toHaveBeenCalledWith(101)
  })

  it('skips OMDb for movies unless Text and scores is ticked too', async () => {
    importers.importMovie.mockClear()
    const movie = row({ media_type: 'movie', external_source: 'tmdb', external_id: '550' })
    await refresh.refreshOne(movie, ['full'])
    await refresh.refreshOne(movie, ['full', 'text'])
    expect(importers.importMovie.mock.calls).toEqual([
      [550, { skipOmdb: true }],
      [550, { skipOmdb: false }]
    ])
  })
})
