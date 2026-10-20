import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import type { AchievementUnlockEvent, MediaType } from '@shared/types'
import { MAX_RECENT_UNLOCKS } from '@shared/achievements'
import { mediaUrl } from '@shared/mediaUrl'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { configFor } from '../lib/mediaConfig'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import {
  archiveStats,
  rarityText,
  sortGameSets,
  type GameSetSort
} from '../lib/achievementDisplay'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import {
  RARITY_CLASS,
  TrophyProgress,
  formatAchievementDate,
  providerLabel
} from '../components/TrophyDisplay'
import { toast, toastError } from '../lib/toast'

function detailPath(mediaType: MediaType, mediaId: number): string {
  return `${configFor(mediaType).basePath}/${mediaId}?tab=achievements`
}

async function testPopup(): Promise<void> {
  try {
    await api.achievements.testPopup()
    toast('Test card sent. Check the bottom-right of your screen.', 'success')
  } catch (e) {
    toastError(e)
  }
}

// Exclusive fullscreen bypasses desktop overlays; this sits in the header
// subtitle so the actions slot stays one button tall.
const OVERLAY_HINT = 'In-game popups show over windowed and borderless games, not exclusive fullscreen.'

function PopupTestAction() {
  return (
    <button
      className="btn-ghost"
      onClick={() => void testPopup()}
      title="Raise the in-game overlay with a test unlock"
    >
      Test popup and sound
    </button>
  )
}

function CompletionRing({ value }: { value: number }) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)
  return (
    <div className="relative h-40 w-40 shrink-0" role="img" aria-label={`${value}% average completion`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgb(var(--base-700))" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold text-white">{value}%</span>
        <span className="mt-1 text-xs text-gray-400">average</span>
      </div>
    </div>
  )
}

export default function AchievementsPage() {
  const [gameSort, setGameSort] = usePersistedState<GameSetSort>('achievementGameSort', 'completion')
  const [historyOpen, setHistoryOpen] = usePersistedState('achievementHistoryOpen', false)
  const query = useQuery({
    queryKey: qk.achievements.overview,
    queryFn: () => api.achievements.overview()
  })

  if (query.isError) {
    return (
      <div className="p-4 sm:p-6">
        <PageHeader title="Achievement archive" />
        <div className="card max-w-xl border-red-500/30 p-5">
          <p className="font-medium">The achievement archive could not be loaded</p>
          <p className="mt-2 text-sm text-gray-400">Your stored unlocks are unchanged.</p>
          <button className="btn-ghost mt-4" onClick={() => void query.refetch()}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (query.isLoading || !query.data) return <PageStatus>Loading achievement archive...</PageStatus>
  const data = query.data

  if (!data.games.length) {
    return (
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Achievement archive"
          subtitle={OVERLAY_HINT}
          actions={<PopupTestAction />}
        />
        <EmptyState
          title="Nothing tracked yet"
          body="Open an installed game, choose a provider from its Achievements tab, and NaviHUB will build its local trophy set."
          action={<Link className="btn-primary" to="/games/installed">See installed games</Link>}
        />
      </div>
    )
  }

  const stats = archiveStats(data.games)
  const games = sortGameSets(data.games, gameSort)
  const earlierRecent = data.recent.slice(1, 9)

  return (
    <div className="relative mx-auto max-w-[1600px] p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-r from-signal-affirmative/15 via-base-800/20 to-transparent" />
      <div className="relative">
        <PageHeader
          title="Achievement archive"
          subtitle={`Your Steam and RetroAchievements sets. ${OVERLAY_HINT}`}
          actions={<PopupTestAction />}
        />

        <section className="mb-10 grid items-center gap-8 border-b border-base-700 pb-8 lg:grid-cols-[180px_minmax(0,1fr)_320px]">
          <CompletionRing value={stats.averagePct} />
          <div>
            <h2 className="text-2xl font-semibold text-white">Your tracked collection</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
              {data.totals.unlocked} of {data.totals.total} achievements earned across{' '}
              {data.totals.games} {data.totals.games === 1 ? 'game' : 'games'}. The ring averages
              each game’s completion, so one huge set does not outweigh the rest.
            </p>
            <div className="mt-6 grid max-w-2xl grid-cols-3 gap-4 sm:gap-6">
              <ArchiveFact label="Earned" value={data.totals.unlocked} accent />
              <ArchiveFact label="Perfect games" value={stats.perfect} />
              <ArchiveFact label="Game sets" value={data.totals.games} />
            </div>
          </div>
          {data.recent[0] && <LatestUnlock event={data.recent[0]} />}
        </section>

        {earlierRecent.length > 0 && (
          <Section
            title="Recent unlocks"
            subtitle={`${earlierRecent.length} before the latest`}
            actions={
              <button
                className="btn-ghost"
                aria-expanded={historyOpen}
                aria-controls="achievement-history"
                onClick={() => setHistoryOpen(!historyOpen)}
              >
                {historyOpen ? 'Hide full history' : 'Show full history'}
              </button>
            }
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {earlierRecent.map((event) => (
                <UnlockCard key={`${event.achievementId}-${event.unlockedAt}`} event={event} />
              ))}
            </div>
            {historyOpen && <UnlockHistory />}
          </Section>
        )}

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Section
            title="Game trophy sets"
            className="mb-8"
            actions={
              <label className="flex items-center gap-2 text-xs text-gray-400">
                Sort
                <select
                  className="input h-9 w-44"
                  value={gameSort}
                  onChange={(event) => setGameSort(event.target.value as GameSetSort)}
                >
                  <option value="completion">Completion</option>
                  <option value="recent">Last unlock</option>
                  <option value="title">Title</option>
                </select>
              </label>
            }
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {games.map((game) => (
                <Link
                  key={game.mediaId}
                  to={detailPath(game.mediaType, game.mediaId)}
                  className="card grid grid-cols-[86px_minmax(0,1fr)] gap-4 p-4 transition-colors hover:border-accent/50"
                >
                  <CoverImage path={game.coverPath} alt={game.title} className="aspect-[2/3] h-[129px] w-[86px] rounded object-cover" thumbWidth={180} />
                  <div className="min-w-0 self-center">
                    <h3 className="truncate font-semibold text-white">{game.title}</h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {providerLabel(game.provider)} /{' '}
                      {game.lastUnlockedAt
                        ? `last unlock ${formatAchievementDate(game.lastUnlockedAt)}`
                        : 'nothing earned yet'}
                    </p>
                    <div className="mt-5"><TrophyProgress earned={game.unlocked} total={game.total} compact /></div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          {data.rarest.length > 0 && (
            <Section title="Rarest unlocks" subtitle="By share of players" className="mb-8">
              <div className="card overflow-hidden p-0">
                {data.rarest.map((event, index) => (
                  <Link
                    key={`rare-${event.achievementId}`}
                    to={detailPath(event.mediaType, event.mediaId)}
                    className={`flex items-center gap-3 p-4 transition-colors hover:bg-base-700/40 ${index ? 'border-t border-base-700' : ''}`}
                  >
                    <AchievementIcon event={event} className="h-12 w-12" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{event.name}</p>
                      <p className="mt-1 truncate text-xs text-gray-400">{event.mediaTitle}</p>
                      <p className={`mt-2 text-xs ${event.rarity ? RARITY_CLASS[event.rarity] : 'text-gray-400'}`}>
                        {rarityText(event.globalPct, event.rarity) ?? 'Rarity unavailable'}
                        {event.points != null ? ` / ${event.points} points` : ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

// Every unlock, newest first, rendered in batches as the list scrolls.
function UnlockHistory() {
  const query = useQuery({
    queryKey: qk.achievements.recent(MAX_RECENT_UNLOCKS),
    queryFn: () => api.achievements.recent(MAX_RECENT_UNLOCKS)
  })
  const { visible, sentinelRef } = useIncrementalList(query.data ?? [])

  if (query.isError) {
    return (
      <div id="achievement-history" className="mt-6">
        <p className="text-sm text-gray-400">The unlock history could not be loaded.</p>
        <button className="btn-ghost mt-2" onClick={() => void query.refetch()}>
          Try again
        </button>
      </div>
    )
  }
  if (!query.data) {
    return (
      <p id="achievement-history" className="mt-6 text-sm text-gray-400">
        Loading unlock history...
      </p>
    )
  }
  return (
    <div id="achievement-history" className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Full history{' '}
        <span className="font-normal text-gray-400">
          {query.data.length >= MAX_RECENT_UNLOCKS
            ? `latest ${MAX_RECENT_UNLOCKS} unlocks`
            : `${query.data.length} unlocks`}
        </span>
      </h3>
      <ul className="card overflow-hidden p-0">
        {visible.map((event, index) => (
          <li key={`${event.achievementId}-${event.unlockedAt}`} className={index ? 'border-t border-base-700' : ''}>
            <Link
              to={detailPath(event.mediaType, event.mediaId)}
              className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-base-700/40"
            >
              <AchievementIcon event={event} className="h-10 w-10" />
              <span className="min-w-0">
                <span className="block truncate text-sm text-white">{event.name}</span>
                <span className="block truncate text-xs text-gray-400">{event.mediaTitle}</span>
              </span>
              <span className="shrink-0 text-xs text-gray-400">{formatAchievementDate(event.unlockedAt)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} />
    </div>
  )
}

function ArchiveFact({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`border-l pl-4 ${accent ? 'border-accent' : 'border-base-600'}`}>
      <p className={`text-2xl font-semibold ${accent ? 'text-accent' : 'text-white'}`}>{value}</p>
      <p className="mt-1 text-xs text-gray-400">{label}</p>
    </div>
  )
}

function AchievementIcon({ event, className }: { event: AchievementUnlockEvent; className: string }) {
  return event.iconPath ? (
    <img src={mediaUrl(event.iconPath) ?? undefined} alt="" className={`${className} shrink-0 rounded-lg object-cover`} />
  ) : (
    <span className={`${className} shrink-0 rounded-lg bg-base-700`} />
  )
}

function LatestUnlock({ event }: { event: AchievementUnlockEvent }) {
  return (
    <Link to={detailPath(event.mediaType, event.mediaId)} className="card bg-base-800/80 p-5 transition-colors hover:border-accent/50">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Latest unlock</p>
      <div className="mt-4 flex gap-4">
        <AchievementIcon event={event} className="h-16 w-16" />
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-white">{event.name}</h2>
          <p className="mt-1 truncate text-xs text-gray-400">{event.mediaTitle}</p>
          <p className="mt-2 text-xs text-accent">{formatAchievementDate(event.unlockedAt)}</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-gray-300">Open game set</p>
    </Link>
  )
}

function UnlockCard({ event }: { event: AchievementUnlockEvent }) {
  return (
    <Link to={detailPath(event.mediaType, event.mediaId)} className="card flex min-w-0 gap-3 p-4 transition-colors hover:border-accent/50">
      <AchievementIcon event={event} className="h-14 w-14" />
      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium text-white">{event.name}</h3>
        <p className="mt-1 truncate text-xs text-gray-400">{event.mediaTitle}</p>
        <p className="mt-2 text-xs text-gray-500">{formatAchievementDate(event.unlockedAt)}</p>
      </div>
    </Link>
  )
}
