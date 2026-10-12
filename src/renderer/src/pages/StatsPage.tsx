import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import CalendarHeatmap from '../components/CalendarHeatmap'
import ThemedFailure from '../components/theme/ThemedFailure'
import { Group, Pill } from '../components/PillGroup'
import {
  CreditTimeSection,
  DecadesSection,
  ScoresSection
} from '../components/stats/LibraryInsightsSections'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import { configFor, fmtMinutesAsHours, pathForMedia } from '../lib/mediaConfig'
import { MEDIA_TYPE_COLORS } from '../lib/mediaColors'
import { approx, fmtStatHours } from '../lib/statsFormat'
import type { LibraryTimeStats, TimeStatsByType, TimeStatsItem } from '@shared/types'

// "Days watched" across the whole library — total time consumed, normalized to
// minutes by mediaRepo.timeStats (rules in @shared/timeStats), split by type and
// ranked into leaderboards, plus the activity grid and the library insights.
// Every estimated figure wears a leading ≈ taken from its own `estimated` flag.

const MINUTES_PER_DAY = 1440

// Headline magnitude: past two full days show days (one decimal), past 90
// minutes hours, else minutes.
function headlineTime(minutes: number): { value: string; unit: string } {
  if (minutes >= 48 * 60) return { value: (minutes / MINUTES_PER_DAY).toFixed(1), unit: 'days' }
  if (minutes >= 90) return { value: String(Math.round(minutes / 60)), unit: 'hours' }
  return { value: String(Math.round(minutes)), unit: 'minutes' }
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
    case 'book': {
      const p = it.progress > 0 ? it.progress : (it.totalUnits ?? 0)
      return `${p} p${times('read')}`
    }
    default:
      return ''
  }
}

// Plain anchors would rewrite the HashRouter route; scroll imperatively instead.
function scrollToType(mediaType: string): void {
  document.getElementById(`type-${mediaType}`)?.scrollIntoView({ behavior: 'smooth' })
}

// The activity source and measure outlive the visit: a localStorage pref, read
// once to seed the history-entry state.
const SOURCE_PREF = 'stats.activitySource'
const MEASURE_PREF = 'stats.activityMeasure'

function readPref(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writePref(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage unavailable: the choice lasts for this visit only */
  }
}

// One grid over every dated log the app keeps. A review, a played track and a
// logged episode are not the same unit, so the grid opens on one source (the
// last one picked); the combined count is still there as its own pill.
function ActivitySection() {
  const [initialSource] = useState(() => readPref(SOURCE_PREF) ?? '')
  const [initialMeasure] = useState(() => readPref(MEASURE_PREF) ?? 'count')
  const [picked, setPicked] = usePersistedState<string>('statsActivitySource', initialSource)
  const [measure, setMeasure] = usePersistedState<string>('statsActivityMeasure', initialMeasure)
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: qk.media.activityHeatmap,
    queryFn: () => api.media.activityHeatmap()
  })
  if (isPending) return null
  if (isError) {
    return (
      <Section title="Activity" subtitle="last 12 months" className="mb-8">
        <ThemedFailure
          message="The activity history could not be read."
          onRetry={() => void refetch()}
          retryLabel="Retry activity"
        />
      </Section>
    )
  }
  // Sources with nothing in the window would be dead pills.
  const shown = data.sources.filter((s) => s.days.length > 0)
  if (shown.length === 0) return null
  const source =
    picked === 'all' || shown.some((s) => s.key === picked) ? picked : shown[0].key
  const active = shown.find((s) => s.key === source)
  const minutes = !!active?.hasMinutes && measure === 'minutes'
  const days = active
    ? active.days.map((d) => ({ day: d.day, count: minutes ? (d.minutes ?? 0) : d.count }))
    : data.combined
  const pick = (key: string) => {
    setPicked(key)
    writePref(SOURCE_PREF, key)
  }
  const pickMeasure = (key: string) => {
    setMeasure(key)
    writePref(MEASURE_PREF, key)
  }
  return (
    <Section title="Activity" subtitle="last 12 months" className="mb-8">
      <div className="mb-3 flex flex-wrap items-end gap-x-6 gap-y-3">
        <Group label="Show">
          {shown.map((s) => (
            <Pill key={s.key} label={s.label} active={source === s.key} onClick={() => pick(s.key)} />
          ))}
          <Pill label="All sources (count)" active={source === 'all'} onClick={() => pick('all')} />
        </Group>
        {active?.hasMinutes && (
          <Group label="Measure">
            <Pill label="Count" active={!minutes} onClick={() => pickMeasure('count')} />
            <Pill label="Minutes" active={minutes} onClick={() => pickMeasure('minutes')} />
          </Group>
        )}
      </div>
      <CalendarHeatmap
        days={days}
        unit={minutes ? 'minutes' : active ? active.label.toLowerCase() : 'things done'}
      />
    </Section>
  )
}

export default function StatsPage() {
  const {
    data: stats,
    isPending,
    isError,
    refetch
  } = useQuery({
    queryKey: qk.media.timeStats,
    queryFn: () => api.media.timeStats(),
    staleTime: 0
  })

  return (
    <div className="mx-auto max-w-[1400px] p-6">
      <PageHeader
        title="Stats"
        actions={
          <>
            <Link to="/music/stats" className="btn-ghost">
              Music stats
            </Link>
            <Link to="/japanese/stats" className="btn-ghost">
              Japanese stats
            </Link>
          </>
        }
      />
      {isPending ? (
        <PageStatus>Loading…</PageStatus>
      ) : isError ? (
        <ThemedFailure
          message="Your time stats could not be read."
          onRetry={() => void refetch()}
          retryLabel="Retry stats"
        />
      ) : stats.consumedCount === 0 ? (
        <EmptyState
          title="Nothing logged yet"
          body="Set progress, watch counts, or a completed status on your titles and this page fills in."
        />
      ) : (
        <StatsContent stats={stats} />
      )}
    </div>
  )
}

function Highlight({
  label,
  item,
  sub
}: {
  label: string
  item: TimeStatsItem
  sub: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg bg-base-900/50 p-3">
      <Link to={pathForMedia(item)} className="shrink-0" tabIndex={-1} aria-hidden="true">
        <CoverImage
          path={item.coverPath}
          alt={item.title}
          thumbWidth={96}
          className="h-16 w-11 rounded object-cover"
        />
      </Link>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
          {label}
        </p>
        <Link
          to={pathForMedia(item)}
          className="mt-0.5 line-clamp-2 text-sm font-semibold hover:text-accent"
        >
          {item.title}
        </Link>
        <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
      </div>
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
  const yearShare = ((stats.totalMinutes / (365 * MINUTES_PER_DAY)) * 100).toFixed(1)

  return (
    <>
      {/* Hero: the total, with the two standout titles beside it */}
      <div className="card-glow relative mb-8 overflow-hidden p-6">
        <div className="relative grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center">
          <div>
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
              {approx(anyEstimated)}
              {fmtStatHours(stats.totalMinutes)} across {stats.consumedCount} of{' '}
              {stats.libraryCount} titles
            </div>
            <div className="mt-3">
              <span className="chip">{yearShare}% of a year</span>
            </div>
          </div>
          {(stats.longest || stats.mostRevisited) && (
            <div className="grid gap-2">
              {stats.longest && (
                <Highlight
                  label="Biggest time sink"
                  item={stats.longest}
                  sub={`${approx(stats.longest.estimated)}${fmtStatHours(stats.longest.minutes)}`}
                />
              )}
              {stats.mostRevisited && (
                <Highlight
                  label="Most revisited"
                  item={stats.mostRevisited}
                  sub={`${stats.mostRevisited.times}× consumed`}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <ActivitySection />

      {/* Split bar */}
      <Section title="Where the time went">
        <div className="flex h-5 w-full gap-[2px] overflow-hidden rounded-full bg-base-800">
          {nonzero.map((t) => {
            const pct = (t.minutes / stats.totalMinutes) * 100
            const cfg = configFor(t.mediaType)
            return (
              <button
                key={t.mediaType}
                type="button"
                onClick={() => scrollToType(t.mediaType)}
                className="h-full transition-opacity hover:opacity-80"
                style={{ width: `${pct}%`, background: MEDIA_TYPE_COLORS[t.mediaType] }}
                title={`${cfg.plural} · ${approx(t.estimated)}${fmtStatHours(t.minutes)} · ${pct.toFixed(0)}%`}
                aria-label={`Jump to ${cfg.plural}`}
              />
            )
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {nonzero.map((t) => {
            const pct = (t.minutes / stats.totalMinutes) * 100
            const cfg = configFor(t.mediaType)
            return (
              <button
                key={t.mediaType}
                type="button"
                onClick={() => scrollToType(t.mediaType)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: MEDIA_TYPE_COLORS[t.mediaType] }}
                />
                <span>{cfg.plural}</span>
                <span className="text-gray-400">
                  {approx(t.estimated)}
                  {fmtStatHours(t.minutes)} · {pct.toFixed(0)}%
                </span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* Per-type leaderboards */}
      <Section title="Top titles by type">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {nonzero.map((t) => (
            <TypeLeaderboard key={t.mediaType} t={t} />
          ))}
        </div>
      </Section>

      <ScoresSection />
      <DecadesSection />
      <CreditTimeSection />

      {/* Footnote */}
      <p className="text-xs text-gray-400">
        ≈ marks estimates. Anime, TV, manga and books are counted as episodes, chapters or pages ×
        per-unit minutes (real per-title runtimes from AniList/TMDB when available, otherwise the
        defaults you set in{' '}
        <Link to="/settings" className="text-accent hover:underline">
          Settings
        </Link>
        ), times every pass. Games and visual novels use your logged playtime (replays already
        included); a finished one with no playtime logged counts its listed length instead. Movies
        count runtime × times watched.
      </p>
    </>
  )
}

function TypeLeaderboard({ t }: { t: TimeStatsByType }) {
  const cfg = configFor(t.mediaType)
  const color = MEDIA_TYPE_COLORS[t.mediaType]
  const [expanded, setExpanded] = usePersistedState<boolean>(`statsShowAll-${t.mediaType}`, false)
  const all = useQuery({
    queryKey: qk.media.timeStatsType(t.mediaType),
    queryFn: () => api.media.timeStatsType(t.mediaType),
    enabled: expanded
  })
  const items = expanded && all.data ? all.data : t.topItems
  const { visible, sentinelRef, hasMore } = useIncrementalList(items)
  const topMinutes = items[0]?.minutes || 1
  const canExpand = t.itemCount > t.topItems.length
  return (
    <div id={`type-${t.mediaType}`} className="card p-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: color }} />
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
            {approx(t.estimated)}
            {fmtStatHours(t.minutes)} · {t.itemCount} {t.itemCount === 1 ? 'title' : 'titles'}
          </div>
        </div>
      </div>
      <ol className="space-y-2">
        {visible.map((it, i) => (
          <li key={it.id} className="flex items-center gap-3">
            <span className="w-6 shrink-0 text-right text-sm tabular-nums text-gray-400">
              {i + 1}
            </span>
            <Link to={pathForMedia(it)} className="shrink-0" tabIndex={-1} aria-hidden="true">
              <CoverImage
                path={it.coverPath}
                alt={it.title}
                thumbWidth={96}
                className="h-14 w-10 rounded object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <Link to={pathForMedia(it)} className="truncate text-sm hover:text-white">
                  {it.title}
                </Link>
                <span className="shrink-0 text-sm text-gray-300">
                  {approx(it.estimated)}
                  {fmtStatHours(it.minutes)}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-gray-400">{detailLine(it)}</div>
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
      {hasMore && <div ref={sentinelRef} className="h-px" />}
      {expanded && all.isError && (
        <p className="mt-3 text-xs text-gray-400" role="status">
          The full list could not be read.{' '}
          <button
            type="button"
            className="text-accent hover:underline"
            onClick={() => void all.refetch()}
          >
            Retry
          </button>
        </p>
      )}
      {canExpand && (
        <button
          type="button"
          className="btn-ghost mt-3 w-full justify-center text-sm"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          disabled={expanded && all.isPending}
        >
          {expanded ? (all.isPending ? 'Loading…' : 'Show less') : `Show all ${t.itemCount}`}
        </button>
      )}
    </div>
  )
}
