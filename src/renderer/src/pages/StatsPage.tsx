import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import CoverImage from '../components/CoverImage'
import { configFor, fmtMinutesAsHours, pathForMedia } from '../lib/mediaConfig'
import type { LibraryTimeStats, TimeStatsByType, TimeStatsItem, MediaType } from '@shared/types'

// "Days watched" across the whole library — total time consumed, normalized to
// minutes by mediaRepo.timeStats, split by type and ranked into leaderboards.
// Fixed per-type hues (color follows the entity, never rank); validated for
// contrast + CVD on the base-800 card surface. Estimated types (anime/tv/manga)
// are labeled with a leading ≈ throughout.
const TYPE_COLORS: Record<MediaType, string> = {
  anime: '#7c5cff', // the app accent
  tv: '#3987e5',
  movie: '#e66767',
  game: '#199e70',
  manga: '#c98500',
  visual_novel: '#d55181'
}

const MINUTES_PER_DAY = 1440

// Headline magnitude: past two full days show days (one decimal), else hours.
function headlineTime(minutes: number): { value: string; unit: string } {
  if (minutes >= 48 * 60) return { value: (minutes / MINUTES_PER_DAY).toFixed(1), unit: 'days' }
  return { value: String(Math.round(minutes / 60)), unit: minutes < 90 ? 'minutes' : 'hours' }
}

// Compact per-item / per-type duration ("42 min", "9.5 h", "312 h").
function fmtHours(minutes: number): string {
  if (minutes <= 0) return '0'
  if (minutes < 60) return `${Math.round(minutes)} min`
  const h = minutes / 60
  return `${h >= 10 ? Math.round(h).toLocaleString() : h.toFixed(1)} h`
}

// Secondary context line for a leaderboard row, formatted from the raw tracking
// fields per type (episodes/chapters/hours + how many passes).
function detailLine(it: TimeStatsItem): string {
  const passes = it.rewatchCount
  const times = (verb: string) => (passes >= 2 ? ` · ${passes}× ${verb}` : '')
  switch (it.mediaType) {
    case 'anime':
    case 'tv': {
      const ep = it.progress > 0 ? it.progress : (it.totalUnits ?? 0)
      return `${ep} ep${times('watched')}`
    }
    case 'manga': {
      const ch = it.progress > 0 ? it.progress : (it.totalUnits ?? 0)
      return `${ch} ch${times('read')}`
    }
    case 'game':
      return it.progress > 0 ? `${it.progress} h played` : `~${it.totalUnits ?? 0} h`
    case 'visual_novel':
      return fmtMinutesAsHours(it.progress > 0 ? it.progress : (it.totalUnits ?? 0))
    case 'movie':
      return `${it.totalUnits ?? 0} min${times('watched')}`
    default:
      return ''
  }
}

export default function StatsPage() {
  const { data: stats } = useQuery({
    queryKey: qk.media.timeStats,
    queryFn: () => api.media.timeStats(),
    staleTime: 0
  })

  if (!stats) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="mx-auto max-w-4xl p-6">
      <BackButton />
      <h1 className="mb-6 text-2xl font-bold">Time spent</h1>
      {stats.consumedCount === 0 ? (
        <div className="card p-8 text-center text-gray-400">
          Nothing logged yet. Set progress, watch counts, or a completed status on your titles and
          this page fills in.
        </div>
      ) : (
        <StatsContent stats={stats} />
      )}
    </div>
  )
}

function StatsContent({ stats }: { stats: LibraryTimeStats }) {
  const nonzero = useMemo(
    () => stats.byType.filter((t) => t.minutes > 0).sort((a, b) => b.minutes - a.minutes),
    [stats.byType]
  )
  const head = headlineTime(stats.totalMinutes)
  const anyEstimated = nonzero.some((t) => t.estimated)

  // Fun equivalences straight off the total (client-side, no repo support).
  const equivalences = [
    `${(stats.totalMinutes / MINUTES_PER_DAY).toFixed(1)} days non-stop`,
    `${((stats.totalMinutes / (365 * MINUTES_PER_DAY)) * 100).toFixed(1)}% of a year`,
    `${Math.round(stats.totalMinutes / (40 * 60)).toLocaleString()} work-weeks`
  ]

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-lg border border-base-700 bg-gradient-to-br from-accent/25 via-base-800 to-base-800 p-6">
        <span className="pointer-events-none absolute -right-4 -top-8 select-none text-[10rem] leading-none text-white opacity-10">
          ⧗
        </span>
        <div className="relative">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">
            Time spent
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-5xl font-bold">
              {anyEstimated ? '≈' : ''}
              {head.value}
            </span>
            <span className="text-2xl font-semibold text-gray-300">{head.unit}</span>
          </div>
          <div className="mt-1 text-sm text-gray-400">
            {fmtHours(stats.totalMinutes)} across {stats.consumedCount} of {stats.libraryCount}{' '}
            titles
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {equivalences.map((e) => (
              <span key={e} className="chip">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Split bar */}
      <Section title="Where the time went" className="mt-8">
        <div className="flex h-5 w-full gap-[2px] overflow-hidden rounded-full bg-base-800">
          {nonzero.map((t) => {
            const pct = (t.minutes / stats.totalMinutes) * 100
            const cfg = configFor(t.mediaType)
            return (
              <a
                key={t.mediaType}
                href={`#type-${t.mediaType}`}
                className="h-full transition-opacity hover:opacity-80"
                style={{ width: `${pct}%`, background: TYPE_COLORS[t.mediaType] }}
                title={`${cfg.plural} · ${t.estimated ? '≈ ' : ''}${fmtHours(t.minutes)} · ${pct.toFixed(0)}%`}
              />
            )
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {nonzero.map((t) => {
            const pct = (t.minutes / stats.totalMinutes) * 100
            const cfg = configFor(t.mediaType)
            return (
              <a
                key={t.mediaType}
                href={`#type-${t.mediaType}`}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: TYPE_COLORS[t.mediaType] }}
                />
                <span className="opacity-80">{cfg.icon}</span>
                <span>{cfg.plural}</span>
                <span className="text-gray-500">
                  {t.estimated ? '≈ ' : ''}
                  {fmtHours(t.minutes)} · {pct.toFixed(0)}%
                </span>
              </a>
            )
          })}
        </div>
      </Section>

      {/* Headline tiles */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total time" value={fmtHours(stats.totalMinutes)} accent sub="normalized" />
        <StatTile
          label="Titles consumed"
          value={stats.consumedCount}
          sub={`of ${stats.libraryCount}`}
        />
        {stats.longest && (
          <StatTile
            label="Biggest time sink"
            value={stats.longest.title}
            sub={`${stats.longest.mediaType === 'game' || stats.longest.mediaType === 'visual_novel' || stats.longest.mediaType === 'movie' ? '' : '≈ '}${fmtHours(stats.longest.minutes)}`}
          />
        )}
        {stats.mostRevisited && (
          <StatTile
            label="Most revisited"
            value={stats.mostRevisited.title}
            sub={`${stats.mostRevisited.times}× consumed`}
          />
        )}
      </div>

      {/* Per-type leaderboards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {nonzero.map((t) => (
          <TypeLeaderboard key={t.mediaType} t={t} />
        ))}
      </div>

      {/* Footnote */}
      <p className="mt-8 text-xs text-gray-400">
        ≈ Anime, TV and manga are estimates — episodes/chapters × per-unit minutes (real per-title
        runtimes from AniList/TMDB when available, otherwise the defaults you set in{' '}
        <Link to="/settings" className="text-accent hover:underline">
          Settings
        </Link>
        ). Games and visual novels use your logged playtime directly (replays already included).
        Movies count runtime × times watched.
      </p>
    </>
  )
}

function TypeLeaderboard({ t }: { t: TimeStatsByType }) {
  const cfg = configFor(t.mediaType)
  const color = TYPE_COLORS[t.mediaType]
  const topMinutes = t.topItems[0]?.minutes || 1
  return (
    <div id={`type-${t.mediaType}`} className="card p-4">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-md text-lg"
          style={{ background: `${color}22`, color }}
        >
          {cfg.icon}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{cfg.plural}</h3>
            {t.estimated && (
              <span className="rounded bg-base-700 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-400">
                estimate
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            {t.estimated ? '≈ ' : ''}
            {fmtHours(t.minutes)} · {t.itemCount} {t.itemCount === 1 ? 'title' : 'titles'}
          </div>
        </div>
      </div>
      <ol className="space-y-2">
        {t.topItems.map((it, i) => (
          <li key={it.id} className="flex items-center gap-3">
            <span className="w-4 shrink-0 text-right text-sm text-gray-500">{i + 1}</span>
            <Link to={pathForMedia(it)} className="shrink-0">
              <CoverImage
                path={it.coverPath}
                alt={it.title}
                className="h-14 w-10 rounded object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <Link to={pathForMedia(it)} className="truncate text-sm hover:text-white">
                  {it.title}
                </Link>
                <span className="shrink-0 text-sm text-gray-300">
                  {t.estimated ? '≈ ' : ''}
                  {fmtHours(it.minutes)}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-gray-500">{detailLine(it)}</div>
              <div className="mt-1 h-1 rounded-full bg-base-700">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(it.minutes / topMinutes) * 100}%`,
                    background: color,
                    opacity: 0.7
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
