import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// HowLongToBeat as the authoritative game length: hltbLengthHours rounding and
// fetchForMedia writing metadata.hltb for everyone but total_units only for
// games (VNs keep VNDB's community minutes; a miss keeps the previous value).

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

// URL-routed HLTB fixtures (the rawgImport mocked-http recipe): init hands out
// creds, the bleed search returns whatever the test staged.
let hltbInit: Record<string, unknown>
let hltbSearch: Record<string, unknown>
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (url: string) => ({
    ok: true,
    status: 200,
    json: async () => (url.includes('/api/bleed/init') ? hltbInit : hltbSearch)
  })
}))

import { fetchForMedia, fetchPlaytimes, hltbLengthHours } from '../src/main/hltb'
import type { HltbTimes } from '../src/shared/types'

function hltbEntry(overrides: Record<string, unknown> = {}) {
  return {
    game_id: 1,
    game_name: 'Persona 5',
    game_alias: '',
    release_world: 2016,
    comp_main: 90_000, // seconds → 1500 min → 25 h
    comp_plus: 150_000,
    comp_100 : 300_000,
    comp_all: 120_000,
    comp_main_count: 800,
    comp_plus_count: 500,
    comp_100_count: 200,
    comp_all_count: 1500,
    ...overrides
  }
}

function addMedia(
  mediaType: string,
  title: string,
  extra: { totalUnits?: number | null; metadata?: string | null } = {}
): number {
  return Number(
    db
      .prepare('INSERT INTO media_item (media_type, title, total_units, metadata) VALUES (?,?,?,?)')
      .run(mediaType, title, extra.totalUnits ?? null, extra.metadata ?? null).lastInsertRowid
  )
}

const mediaRow = (id: number) =>
  db.prepare('SELECT * FROM media_item WHERE id = ?').get(id) as Record<string, unknown>

beforeEach(() => {
  db = createTestDb()
  hltbInit = { token: 't', hpKey: 'k', hpVal: 'v' }
  hltbSearch = { data: [hltbEntry()] }
})

describe('hltbLengthHours', () => {
  const times = (main: number | null, allStyles: number | null): HltbTimes => ({
    id: 1,
    name: 'X',
    main,
    mainExtra: null,
    completionist: null,
    allStyles
  })

  it('prefers Main Story, rounded to hours', () => {
    expect(hltbLengthHours(times(1500, 6000))).toBe(25)
    expect(hltbLengthHours(times(1530, null))).toBe(26) // 25.5 rounds up
  })

  it('falls back to All Styles when there is no per-style split', () => {
    expect(hltbLengthHours(times(null, 720))).toBe(12)
  })

  it('never rounds a short game down to zero hours', () => {
    expect(hltbLengthHours(times(29, null))).toBe(1)
  })

  it('null when HLTB has neither figure', () => {
    expect(hltbLengthHours(times(null, null))).toBeNull()
  })
})

describe('fetchForMedia', () => {
  it('writes metadata.hltb AND the game length in hours', async () => {
    const id = addMedia('game', 'Persona 5', { totalUnits: 97, metadata: '{"metacritic":93}' })
    const times = await fetchForMedia(id)
    expect(times?.main).toBe(1500)

    const row = mediaRow(id)
    expect(row.total_units).toBe(25) // HLTB main, not RAWG's 97
    const meta = JSON.parse(row.metadata as string)
    expect(meta.metacritic).toBe(93) // merged, not clobbered
    expect(meta.hltb.main).toBe(1500)
  })

  it('leaves a VN length alone (VNDB minutes are a different unit)', async () => {
    const id = addMedia('visual_novel', 'Persona 5', { totalUnits: 3000 })
    await fetchForMedia(id)
    const row = mediaRow(id)
    expect(row.total_units).toBe(3000)
    expect(JSON.parse(row.metadata as string).hltb.main).toBe(1500)
  })

  it('a miss writes nothing — the previous length and metadata survive', async () => {
    hltbSearch = { data: [] }
    const id = addMedia('game', 'Some Obscure Game', {
      totalUnits: 40,
      metadata: '{"metacritic":80}'
    })
    expect(await fetchForMedia(id)).toBeNull()
    const row = mediaRow(id)
    expect(row.total_units).toBe(40)
    expect(JSON.parse(row.metadata as string)).toEqual({ metacritic: 80 })
  })

  it('an HLTB entry with no main uses All Styles for the length', async () => {
    hltbSearch = { data: [hltbEntry({ comp_main: 0, comp_all: 43_200 })] } // 12 h
    const id = addMedia('game', 'Persona 5')
    await fetchForMedia(id)
    expect(mediaRow(id).total_units).toBe(12)
  })
})

describe('fetchPlaytimes matching', () => {
  it('prefers an exact title match over popularity order', async () => {
    hltbSearch = {
      data: [
        hltbEntry({ game_id: 9, game_name: 'Persona 5 Royal', comp_main: 180_000 }),
        hltbEntry({ game_id: 1, game_name: 'Persona 5', comp_main: 90_000 })
      ]
    }
    const t = await fetchPlaytimes('Persona 5', 2016)
    expect(t?.id).toBe(1)
    expect(t?.main).toBe(1500)
  })
})
