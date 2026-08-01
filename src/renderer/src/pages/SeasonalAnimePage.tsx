import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { ANIME, isCompletedStatus } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { MediaCard } from './MediaListPage'
import {
  SEASONS,
  currentSeason,
  seasonForItem,
  seasonLabel,
  seasonMonthsLabel,
  type Season
} from '@shared/season'
import type { MediaItem } from '@shared/types'

type SeasonBuckets = Record<Season, MediaItem[]>

const emptyBuckets = (): SeasonBuckets => ({ winter: [], spring: [], summer: [], fall: [] })

// Chronological within a season (premiere order); titles without a date last.
function byReleaseThenTitle(a: MediaItem, b: MediaItem): number {
  if (a.releaseDate !== b.releaseDate) {
    if (a.releaseDate == null) return 1
    if (b.releaseDate == null) return -1
    return a.releaseDate < b.releaseDate ? -1 : 1
  }
  return a.title.localeCompare(b.title)
}

// The library by airing season: pick a year, see its Winter → Fall shelves.
// Seasons come from seasonForItem (canonical AniList metadata, date fallback).
export default function SeasonalAnimePage() {
  const now = currentSeason(new Date())
  const [year, setYear] = usePersistedState<number>('seasonalYear', now.year)
  const [showUnknown, setShowUnknown] = usePersistedState('seasonalShowUnknown', false)

  // Same key + filter as HomePage's per-type list so the two pages share one
  // cache entry — keep the filter shape identical to HomePage's.
  const { data: items = [], isLoading } = useQuery({
    queryKey: qk.media.home('anime'),
    queryFn: () => api.media.list({ mediaType: 'anime' })
  })

  const { byYear, years, unknown } = useMemo(() => {
    const byYear = new Map<number, SeasonBuckets>()
    const unknown: MediaItem[] = []
    for (const m of items) {
      const bucket = seasonForItem(m)
      if (!bucket) {
        unknown.push(m)
        continue
      }
      let seasons = byYear.get(bucket.year)
      if (!seasons) byYear.set(bucket.year, (seasons = emptyBuckets()))
      seasons[bucket.season].push(m)
    }
    for (const seasons of byYear.values()) {
      for (const s of SEASONS) seasons[s].sort(byReleaseThenTitle)
    }
    unknown.sort((a, b) => a.title.localeCompare(b.title))
    const years = [...byYear.keys()].sort((a, b) => b - a)
    return { byYear, years, unknown }
  }, [items])

  const buckets = byYear.get(year) ?? emptyBuckets()
  // The select lists years that actually have anime; the arrows can step to
  // any other year, so inject the selected one to keep the select valid.
  const yearOptions = years.includes(year) ? years : [...years, year].sort((a, b) => b - a)

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        back="history"
        title="Seasonal anime"
        subtitle="Your library by airing season"
        actions={
          <>
            <button
              className="btn-ghost py-1.5"
              onClick={() => {
                setYear(now.year)
                // Let the year switch render before scrolling to the season.
                requestAnimationFrame(() => scrollToSeason(now.season))
              }}
            >
              Now: {seasonLabel(now.season)} {now.year}
            </button>
            <button
              className="btn-ghost py-1.5"
              onClick={() => setYear(year - 1)}
              aria-label="Previous year"
            >
              Prev
            </button>
            <select
              className="input w-auto py-1.5"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label="Year"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y} · {seasonCount(byYear.get(y))}
                </option>
              ))}
            </select>
            <button
              className="btn-ghost py-1.5"
              onClick={() => setYear(year + 1)}
              aria-label="Next year"
            >
              Next
            </button>
          </>
        }
      />

      {/* Quick-nav to a season's shelf. Imperative scroll on purpose —
          href="#…" anchors don't survive HashRouter. */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SEASONS.map((s) => (
          <button
            key={s}
            className="pill"
            onClick={() => scrollToSeason(s)}
          >
            {seasonLabel(s)}
            <span className="ml-1.5 text-xs text-gray-500">{buckets[s].length}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <EmptyState
          title="No anime in your library yet"
          body="Add or import some anime and they'll fall into their airing seasons here."
          action={
            <Link to="/anime" className="btn-primary">
              Go to Anime
            </Link>
          }
        />
      ) : (
        SEASONS.map((s) => {
          const list = buckets[s]
          const completed = list.filter((m) => isCompletedStatus(m.status)).length
          const airingNow = year === now.year && s === now.season
          return (
            <div key={s} id={`season-${s}`}>
              <Section
                title={`${seasonLabel(s)} ${year}`}
                subtitle={
                  <>
                    {seasonMonthsLabel(s)} · {list.length} {list.length === 1 ? 'title' : 'titles'}
                    {completed > 0 && <> · {completed} completed</>}
                    {airingNow && <span className="text-accent"> · Airing now</span>}
                  </>
                }
              >
                {list.length === 0 ? (
                  <div className="card p-6 text-center text-sm text-gray-500">
                    Nothing from this season in your library.
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                    {list.map((m) => (
                      <MediaCard key={m.id} cfg={ANIME} item={m} />
                    ))}
                  </div>
                )}
              </Section>
            </div>
          )
        })
      )}

      {/* Titles no season can be resolved for (no/unusable release date and no
          canonical season) sit outside every year — a re-import usually fixes
          AniList titles. */}
      {!isLoading && unknown.length > 0 && (
        <div className="mt-2 border-t border-base-700 pt-4">
          <button
            className="text-sm text-gray-400 hover:text-gray-200"
            onClick={() => setShowUnknown((v) => !v)}
          >
            {showUnknown ? '▾' : '▸'} {unknown.length} anime without a release date
          </button>
          {showUnknown && (
            <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              {unknown.map((m) => (
                <MediaCard key={m.id} cfg={ANIME} item={m} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function seasonCount(buckets: SeasonBuckets | undefined): number {
  if (!buckets) return 0
  return SEASONS.reduce((sum, s) => sum + buckets[s].length, 0)
}

function scrollToSeason(s: Season): void {
  document.getElementById(`season-${s}`)?.scrollIntoView({ behavior: 'smooth' })
}
