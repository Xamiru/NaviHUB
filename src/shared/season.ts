import type { MediaItem } from './types'

// Airing-season bucketing for the anime Seasonal page. AniList's canonical
// season/seasonYear (persisted into the metadata JSON on import) wins when
// present — AniList assigns late-December premieres to WINTER of the NEXT
// year, which date math can't know — otherwise the season derives from the
// release date's month using AniList's quarter boundaries.

export type Season = 'winter' | 'spring' | 'summer' | 'fall'

// Render/chronological order within a year.
export const SEASONS: Season[] = ['winter', 'spring', 'summer', 'fall']

export interface SeasonBucket {
  year: number
  season: Season
}

const LABELS: Record<Season, string> = {
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall'
}

const MONTHS: Record<Season, string> = {
  winter: 'Jan – Mar',
  spring: 'Apr – Jun',
  summer: 'Jul – Sep',
  fall: 'Oct – Dec'
}

export function seasonLabel(s: Season): string {
  return LABELS[s]
}

export function seasonMonthsLabel(s: Season): string {
  return MONTHS[s]
}

function seasonForMonth(month: number): Season | null {
  if (!Number.isInteger(month) || month < 1 || month > 12) return null
  if (month <= 3) return 'winter'
  if (month <= 6) return 'spring'
  if (month <= 9) return 'summer'
  return 'fall'
}

export function currentSeason(now: Date): SeasonBucket {
  return { year: now.getFullYear(), season: seasonForMonth(now.getMonth() + 1) as Season }
}

// Resolves an item's airing season: canonical metadata first, date-derived
// fallback second, null when neither is usable (the page's Unknown bucket).
// Metadata is a free-form JSON blob (manual entries can hold anything), so
// every field is validated before it's trusted.
export function seasonForItem(
  item: Pick<MediaItem, 'releaseDate' | 'metadata'>
): SeasonBucket | null {
  const dateMatch = item.releaseDate?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? null
  const dateYear = dateMatch ? Number(dateMatch[1]) : null

  const rawSeason = item.metadata?.season
  if (typeof rawSeason === 'string') {
    const lower = rawSeason.toLowerCase()
    const season = SEASONS.find((s) => s === lower)
    if (season) {
      const rawYear = item.metadata?.seasonYear
      const year =
        typeof rawYear === 'number' && Number.isInteger(rawYear) && rawYear > 0
          ? rawYear
          : dateYear
      if (year != null) return { year, season }
    }
  }

  if (dateYear != null) {
    const season = seasonForMonth(Number(dateMatch![2]))
    if (season) return { year: dateYear, season }
  }
  return null
}
