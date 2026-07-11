import { describe, expect, it } from 'vitest'
import {
  SEASONS,
  currentSeason,
  seasonForItem,
  seasonLabel,
  seasonMonthsLabel
} from '../src/shared/season'

// Airing-season resolution for the Seasonal page: canonical AniList metadata
// first, release-date quarter derivation second, null (Unknown bucket) last.

const item = (
  releaseDate: string | null,
  metadata: Record<string, unknown> | null = null
) => ({ releaseDate, metadata })

describe('seasonForItem', () => {
  it('derives the season from the release-date month (AniList quarters)', () => {
    expect(seasonForItem(item('2020-01-15'))).toEqual({ year: 2020, season: 'winter' })
    expect(seasonForItem(item('2020-03-31'))).toEqual({ year: 2020, season: 'winter' })
    expect(seasonForItem(item('2020-04-01'))).toEqual({ year: 2020, season: 'spring' })
    expect(seasonForItem(item('2020-06-30'))).toEqual({ year: 2020, season: 'spring' })
    expect(seasonForItem(item('2020-07-10'))).toEqual({ year: 2020, season: 'summer' })
    expect(seasonForItem(item('2020-09-01'))).toEqual({ year: 2020, season: 'summer' })
    expect(seasonForItem(item('2020-10-05'))).toEqual({ year: 2020, season: 'fall' })
    expect(seasonForItem(item('2020-12-31'))).toEqual({ year: 2020, season: 'fall' })
  })

  it('buckets year-only padded dates as Winter (fmtDate pads missing month/day to 01)', () => {
    // Known limitation the canonical metadata path fixes on re-import.
    expect(seasonForItem(item('1998-01-01'))).toEqual({ year: 1998, season: 'winter' })
  })

  it('prefers canonical AniList metadata over the date-derived season', () => {
    // Late-December premiere: AniList assigns WINTER of the NEXT year.
    expect(seasonForItem(item('2020-12-28', { season: 'WINTER', seasonYear: 2021 }))).toEqual({
      year: 2021,
      season: 'winter'
    })
  })

  it('takes the year from the release date when metadata lacks a usable seasonYear', () => {
    expect(seasonForItem(item('2020-12-28', { season: 'WINTER' }))).toEqual({
      year: 2020,
      season: 'winter'
    })
    expect(seasonForItem(item('2020-05-01', { season: 'WINTER', seasonYear: 'x' }))).toEqual({
      year: 2020,
      season: 'winter'
    })
    expect(seasonForItem(item('2020-05-01', { season: 'WINTER', seasonYear: -5 }))).toEqual({
      year: 2020,
      season: 'winter'
    })
  })

  it('accepts any casing for the metadata season', () => {
    expect(seasonForItem(item(null, { season: 'fall', seasonYear: 2019 }))).toEqual({
      year: 2019,
      season: 'fall'
    })
    expect(seasonForItem(item(null, { season: 'Fall', seasonYear: 2019 }))).toEqual({
      year: 2019,
      season: 'fall'
    })
  })

  it('falls back to date derivation on garbage metadata (manual entries hold anything)', () => {
    expect(seasonForItem(item('2020-05-01', { season: 'BANANA' }))).toEqual({
      year: 2020,
      season: 'spring'
    })
    expect(seasonForItem(item('2020-05-01', { season: 42 }))).toEqual({
      year: 2020,
      season: 'spring'
    })
  })

  it('returns null when nothing usable exists', () => {
    expect(seasonForItem(item(null))).toBeNull()
    expect(seasonForItem(item('2020'))).toBeNull()
    expect(seasonForItem(item('2020-13-01'))).toBeNull()
    // Valid metadata season but no year anywhere to hang it on.
    expect(seasonForItem(item(null, { season: 'WINTER' }))).toBeNull()
  })
})

describe('currentSeason', () => {
  it('maps quarter boundaries', () => {
    expect(currentSeason(new Date(2026, 0, 1))).toEqual({ year: 2026, season: 'winter' })
    expect(currentSeason(new Date(2026, 2, 31))).toEqual({ year: 2026, season: 'winter' })
    expect(currentSeason(new Date(2026, 3, 1))).toEqual({ year: 2026, season: 'spring' })
    expect(currentSeason(new Date(2026, 6, 10))).toEqual({ year: 2026, season: 'summer' })
    expect(currentSeason(new Date(2026, 11, 31))).toEqual({ year: 2026, season: 'fall' })
  })
})

describe('labels', () => {
  it('keeps render order and human labels aligned', () => {
    expect(SEASONS).toEqual(['winter', 'spring', 'summer', 'fall'])
    expect(SEASONS.map(seasonLabel)).toEqual(['Winter', 'Spring', 'Summer', 'Fall'])
    expect(seasonMonthsLabel('winter')).toBe('Jan – Mar')
    expect(seasonMonthsLabel('fall')).toBe('Oct – Dec')
  })
})
