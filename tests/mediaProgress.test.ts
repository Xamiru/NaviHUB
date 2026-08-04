import { describe, expect, it } from 'vitest'
import {
  advanceProgress,
  isUnitProgress,
  parseStatuses,
  STATUS_FALLBACKS
} from '../src/shared/mediaProgress'

const ANIME = STATUS_FALLBACKS.anime // Watching / Completed / … / Plan to Watch
const MOVIE = STATUS_FALLBACKS.movie // Watching / Watched / … / Want to Watch

const state = (over: Partial<Parameters<typeof advanceProgress>[0]> = {}) => ({
  progress: 0,
  status: null as string | null,
  totalUnits: null as number | null,
  rewatchCount: 0,
  ...over
})

describe('advanceProgress — first pass', () => {
  it('promotes a planned title to in progress', () => {
    const r = advanceProgress(state({ status: 'Plan to Watch', totalUnits: 12 }), ANIME, true)
    expect(r).toMatchObject({ progress: 1, status: 'Watching', startedRewatch: false })
  })

  it('promotes an untracked title too', () => {
    expect(advanceProgress(state({ totalUnits: 12 }), ANIME, true).status).toBe('Watching')
  })

  it('counts up mid-run without touching the status', () => {
    const r = advanceProgress(
      state({ status: 'Watching', progress: 5, totalUnits: 12 }),
      ANIME,
      true
    )
    expect(r).toMatchObject({ progress: 6, status: 'Watching' })
  })

  it('completes on the last unit', () => {
    const r = advanceProgress(
      state({ status: 'Watching', progress: 11, totalUnits: 12 }),
      ANIME,
      true
    )
    expect(r).toMatchObject({ progress: 12, status: 'Completed', startedRewatch: false })
  })

  it('keeps counting when the total is unknown', () => {
    const r = advanceProgress(state({ status: 'Watching', progress: 40 }), ANIME, true)
    expect(r).toMatchObject({ progress: 41, status: 'Watching', startedRewatch: false })
  })

  it('marks a non-unit work watched instead of counting', () => {
    // Movie total_units is runtime minutes — it must never be treated as units.
    const r = advanceProgress(state({ totalUnits: 117 }), MOVIE, false)
    expect(r).toMatchObject({ progress: 0, status: 'Watched', startedRewatch: false })
  })
})

describe('advanceProgress — later passes', () => {
  it('wraps a completed series back to episode 1 and counts the pass', () => {
    const r = advanceProgress(
      state({ status: 'Completed', progress: 12, totalUnits: 12, rewatchCount: 0 }),
      ANIME,
      true
    )
    // rewatch_count is "times consumed": 0 already means once, so this is #2.
    expect(r).toMatchObject({
      progress: 1,
      status: 'Watching',
      rewatchCount: 2,
      startedRewatch: true
    })
  })

  it('treats a recorded single pass the same as an unrecorded one', () => {
    const from = (n: number): number =>
      advanceProgress(
        state({ status: 'Completed', progress: 12, totalUnits: 12, rewatchCount: n }),
        ANIME,
        true
      ).rewatchCount
    expect(from(0)).toBe(2)
    expect(from(1)).toBe(2)
    expect(from(2)).toBe(3)
  })

  it('wraps on progress alone when the status was never set', () => {
    const r = advanceProgress(state({ progress: 12, totalUnits: 12 }), ANIME, true)
    expect(r).toMatchObject({ progress: 1, startedRewatch: true })
  })

  it('keeps a one-episode title completed', () => {
    const r = advanceProgress(
      state({ status: 'Completed', progress: 1, totalUnits: 1 }),
      ANIME,
      true
    )
    expect(r).toMatchObject({ progress: 1, status: 'Completed', rewatchCount: 2 })
  })

  it('re-watches a film without disturbing its status or runtime', () => {
    const r = advanceProgress(
      state({ status: 'Watched', progress: 0, totalUnits: 117, rewatchCount: 3 }),
      MOVIE,
      false
    )
    expect(r).toMatchObject({
      status: 'Watched',
      progress: 0,
      totalUnits: 117,
      rewatchCount: 4,
      startedRewatch: true
    })
  })
})

describe('status resolution', () => {
  it('reads the configured list', () => {
    expect(parseStatuses('["Viewing","Seen","Parked"]', 'movie')[1]).toBe('Seen')
  })

  it('falls back on a missing or malformed setting', () => {
    expect(parseStatuses(null, 'manga')[0]).toBe('Reading')
    expect(parseStatuses('not json', 'anime')[1]).toBe('Completed')
    expect(parseStatuses('[]', 'anime')).toEqual(STATUS_FALLBACKS.anime)
    expect(parseStatuses('[1,2]', 'anime')).toEqual(STATUS_FALLBACKS.anime)
  })

  it('honours renamed statuses when advancing', () => {
    const custom = ['Ongoing', 'Finished', 'Someday']
    const r = advanceProgress(state({ status: 'Someday', totalUnits: 2 }), custom, true)
    expect(r.status).toBe('Ongoing')
    expect(advanceProgress({ ...r, progress: 1 }, custom, true).status).toBe('Finished')
  })

  it('survives a status list too short to have a completed entry', () => {
    const r = advanceProgress(state({ progress: 3, totalUnits: 4 }), ['Doing'], true)
    expect(r).toMatchObject({ progress: 4, status: 'Doing' })
  })
})

describe('unit types', () => {
  it('counts units for anime, manga and TV only', () => {
    expect(['anime', 'manga', 'tv'].every(isUnitProgress)).toBe(true)
    // Books track pages, not sittings — deliberately NOT unit-progress.
    expect(['movie', 'game', 'visual_novel', 'book'].some(isUnitProgress)).toBe(false)
  })

  it('covers every media type with a fallback status list', () => {
    for (const type of ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book'] as const) {
      expect(STATUS_FALLBACKS[type].length).toBeGreaterThan(2)
    }
  })
})
