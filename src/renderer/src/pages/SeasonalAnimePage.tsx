import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useStatuses } from '../lib/hooks'
import { ANIME } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import MediaCard from '../components/MediaCard'
import {
  SEASONS,
  currentSeason,
  seasonForItem,
  seasonLabel,
  seasonMonthsLabel,
  type Season
} from '@shared/season'
import type { MediaSummary } from '@shared/types'

type SeasonBuckets = Record<Season, MediaSummary[]>

const emptyBuckets = (): SeasonBuckets => ({ winter: [], spring: [], summer: [], fall: [] })

// Chronological within a season (premiere order); titles without a date last.
function byReleaseThenTitle(a: MediaSummary, b: MediaSummary): number {
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
  const completedStatus = useStatuses(ANIME)[1] ?? null

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: qk.media.seasonalAnime(year, showUnknown),
    queryFn: () => api.media.seasonalAnime(year, showUnknown)
  })
  const items = data?.items ?? []
  const unknown = data?.unknown ?? []

  const buckets = useMemo(() => {
    const seasons = emptyBuckets()
    for (const m of items) {
      const bucket = seasonForItem(m)
      if (!bucket || bucket.year !== year) continue
      seasons[bucket.season].push(m)
    }
    for (const s of SEASONS) seasons[s].sort(byReleaseThenTitle)
    return seasons
  }, [items, year])

  // The select lists years that actually have anime; the arrows can step to
  // any other year, so inject the selected one to keep the select valid.
  const years = data?.years.map((entry) => entry.year) ?? []
  const yearOptions = years.includes(year) ? years : [...years, year].sort((a, b) => b - a)
  const countForYear = (value: number): number =>
    data?.years.find((entry) => entry.year === value)?.count ?? 0
  const isCompleted = (item: MediaSummary): boolean => item.status === completedStatus

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        back="history"
        title="Seasonal broadcast archive"
        subtitle="Your anime library in premiere order, quarter by quarter."
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
                  {y} / {countForYear(y)}
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

      {!isLoading && !isError && items.length > 0 && (
        <section className={`mb-7 p-5 sm:p-6 ${year === now.year ? 'card-glow' : 'card'}`}>
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <h2 className="text-2xl font-semibold text-white">{year} broadcast year</h2>
              <p className="mt-2 text-sm text-gray-400">
                {seasonCount(buckets)} tracked / {completedCount(buckets, isCompleted)} completed
              </p>
            </div>
            {year === now.year && <span className="chip">Current year</span>}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SEASONS.map((season) => (
              <button
                key={season}
                className={`border-l px-4 text-left ${
                  year === now.year && season === now.season ? 'border-accent' : 'border-base-600'
                }`}
                onClick={() => scrollToSeason(season)}
              >
                <p className={year === now.year && season === now.season ? 'text-accent' : 'text-white'}>
                  {buckets[season].length} titles
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {seasonLabel(season)} / {buckets[season].filter(isCompleted).length} complete
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Quick-nav to a season's shelf. Imperative scroll on purpose —
          href="#…" anchors don't survive HashRouter. */}
      {!isError && (
        <div className="mb-6 flex flex-wrap gap-2">
          {SEASONS.map((s) => (
            <button
              key={s}
              className={`pill ${year === now.year && s === now.season ? 'pill-active' : ''}`}
              onClick={() => scrollToSeason(s)}
            >
              {seasonLabel(s)}
              <span className="ml-1.5 text-xs text-gray-500">{buckets[s].length}</span>
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : isError ? (
        <div className="card p-6" role="alert">
          <p className="text-sm text-red-300">
            Could not load the seasonal archive{error instanceof Error ? ` — ${error.message}` : '.'}
          </p>
          <button className="btn-ghost mt-3" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={`Nothing tracked for ${year}`}
          body="Choose another year, or add anime to your library."
          action={
            <Link to="/anime" className="btn-primary">
              Go to Anime
            </Link>
          }
        />
      ) : (
        SEASONS.map((s) => {
          const list = buckets[s]
          const completed = list.filter(isCompleted).length
          const airingNow = year === now.year && s === now.season
          return (
            <div
              key={s}
              id={`season-${s}`}
              className={airingNow ? '-mx-3 mb-8 rounded-lg border border-accent/25 bg-accent/5 px-3 pt-5 sm:-mx-5 sm:px-5' : ''}
            >
              <Section
                title={`${seasonLabel(s)} ${year}`}
                subtitle={
                  <>
                    {seasonMonthsLabel(s)} / {list.length} {list.length === 1 ? 'title' : 'titles'}
                    {completed > 0 && <> / {completed} completed</>}
                    {airingNow && <span className="text-accent"> / Airing now</span>}
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
      {!isLoading && !isError && (data?.unknownCount ?? 0) > 0 && (
        <div className="mt-2 border-t border-base-700 pt-4">
          <button
            className="text-sm text-gray-400 hover:text-gray-200"
            onClick={() => setShowUnknown((v) => !v)}
            aria-expanded={showUnknown}
            aria-controls="seasonal-unknown"
          >
            {showUnknown ? '▾' : '▸'} {data?.unknownCount ?? 0} anime without a usable season
          </button>
          {showUnknown && (
            <div
              id="seasonal-unknown"
              className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4"
            >
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

function completedCount(buckets: SeasonBuckets, isCompleted: (item: MediaSummary) => boolean): number {
  return SEASONS.reduce((sum, season) => sum + buckets[season].filter(isCompleted).length, 0)
}

function scrollToSeason(s: Season): void {
  document.getElementById(`season-${s}`)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  })
}
