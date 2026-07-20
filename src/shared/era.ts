// Decade bucketing for the song quiz's "era" filter — guess the anime from a
// chosen slice of history (90s OPs vs 2020s OPs play very differently). Pure
// and shared: the quiz repo builds SQL year-range clauses from these bounds,
// the setup UI renders a pill per era, and tests exercise eraForYear directly.
//
// An anime's year is its canonical AniList seasonYear (persisted into the
// metadata JSON on import) when present, else the release-date year — the same
// precedence season.ts uses. Order here is chronological (render + match order).

export interface Era {
  key: string // FROZEN — stored in quiz_session settings snapshots
  label: string
  minYear: number | null // inclusive; null = open (earliest)
  maxYear: number | null // inclusive; null = open (latest)
}

export const ERAS: Era[] = [
  { key: 'retro', label: '80s & Earlier', minYear: null, maxYear: 1989 },
  { key: '90s', label: '90s', minYear: 1990, maxYear: 1999 },
  { key: '2000s', label: '2000s', minYear: 2000, maxYear: 2009 },
  { key: '2010s', label: '2010s', minYear: 2010, maxYear: 2019 },
  { key: '2020s', label: '2020s', minYear: 2020, maxYear: null }
]

// The era a year falls into, or null for an unknown/invalid year (excluded when
// an era filter is active, mirroring the Seasonal page's Unknown bucket).
export function eraForYear(year: number | null | undefined): Era | null {
  if (year == null || !Number.isInteger(year)) return null
  return (
    ERAS.find(
      (e) => (e.minYear == null || year >= e.minYear) && (e.maxYear == null || year <= e.maxYear)
    ) ?? null
  )
}
