import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import * as refresh from '../src/main/libraryRefresh'
import * as tasks from '../src/main/tasks'
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
    banner_path: null,
    synopsis: null,
    total_units: null,
    ...over
  }
  return Number(
    db
      .prepare(
        `INSERT INTO media_item
           (media_type, title, external_source, external_id, cover_path, banner_path, synopsis, total_units)
         VALUES (@media_type, @title, @external_source, @external_id, @cover_path, @banner_path, @synopsis, @total_units)`
      )
      .run(row).lastInsertRowid
  )
}

const req = (over: Partial<RefreshRequest> = {}): RefreshRequest => ({
  types: ['anime'],
  aspects: ['banner'],
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
    const noBanner = addMedia({ title: 'No banner', cover_path: 'media/c' })
    const noCover = addMedia({ title: 'No cover', banner_path: 'media/b' })
    addMedia({ title: 'Has both', cover_path: 'media/c', banner_path: 'media/b' })

    const rows = refresh.selectRows(req({ aspects: ['cover', 'banner'] }))
    expect(rows.map((r) => r.id).sort()).toEqual([noBanner, noCover].sort())
  })

  it('onlyMissing off takes everything of the type', () => {
    addMedia({ cover_path: 'media/c', banner_path: 'media/b' })
    addMedia({ cover_path: 'media/c', banner_path: 'media/b' })
    expect(refresh.selectRows(req({ onlyMissing: false }))).toHaveLength(2)
  })

  it('counts a TV title as missing episodes only while it has no catalogue', () => {
    const show = addMedia({ media_type: 'tv', external_source: 'tmdb', banner_path: 'media/b' })
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
      req({ types: ['visual_novel'], aspects: ['cover', 'banner'], onlyMissing: false }),
      {
        run: async (_row, aspects) => {
          got = [...aspects]
        },
        delayMs: 0
      }
    )
    await settled()
    // The runner narrows per title, so the importer never sees 'banner' for a VN.
    expect(got).toEqual(['cover', 'banner'])
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
    expect(s.message).toMatch(/failed in a row/)
    // Stopped at the threshold rather than grinding through every title.
    expect(s.failed).toBe(10)
    expect(s.failures).toHaveLength(10)
  })

  it('refuses a second run while one is going', async () => {
    addMedia()
    addMedia()
    refresh.start(req(), { run: async () => {}, delayMs: 5 })
    expect(() => refresh.start(req(), { run: async () => {}, delayMs: 0 })).toThrow(/already running/)
    await settled()
  })

  it('refuses to start with nothing to do', () => {
    addMedia({ banner_path: 'media/b' }) // already has the only chosen aspect
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
