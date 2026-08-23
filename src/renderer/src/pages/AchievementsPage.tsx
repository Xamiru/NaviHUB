import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { mediaUrl } from '@shared/mediaUrl'
import { configFor } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import { toast, toastError } from '../lib/toast'
import type { AchievementUnlockEvent, MediaType } from '@shared/types'

// Everything earned across the library: the recent feed, per-game completion,
// and the rarest things unlocked. Fed by one invoke — the tracked set is small
// enough that splitting it into three queries would only add round trips.

function fmtDate(utc: string): string {
  const d = new Date(utc.replace(' ', 'T') + (utc.endsWith('Z') ? '' : 'Z'))
  if (Number.isNaN(d.getTime())) return utc
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function detailPath(mediaType: MediaType, mediaId: number): string {
  return `${configFor(mediaType).basePath}/${mediaId}?tab=achievements`
}

// Raises the in-game overlay with a fake unlock card + the real chime. Works
// with no session running — this is how visibility over a fullscreen game gets
// verified without earning an achievement first.
async function testPopup(): Promise<void> {
  try {
    await api.achievements.testPopup()
    toast('Test card sent — check the bottom-right of your screen.', 'success')
  } catch (e) {
    toastError(e)
  }
}

export default function AchievementsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.achievements.overview,
    queryFn: () => api.achievements.overview()
  })

  // isError checked BEFORE !data: on a failed query TanStack leaves data
  // undefined with isLoading false, so a bare `isLoading || !data` renders
  // "Loading…" forever.
  if (isError) {
    return (
      <div className="p-6">
        <PageHeader title="Achievements" />
        <p className="text-sm text-gray-500">Could not load achievements — try again in a moment.</p>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="p-6">
        <PageHeader title="Achievements" />
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    )
  }

  if (!data.games.length) {
    return (
      <div className="p-6">
        <PageHeader
          title="Achievements"
          actions={
            <button className="btn-ghost" onClick={() => void testPopup()}>
              Test popup &amp; sound
            </button>
          }
        />
        <EmptyState
          title="Nothing tracked yet"
          body={
            <>
              Open a game you have linked an executable for, go to its Achievements tab, and pick a
              provider. Unlocks then pop up as you earn them. Use "Test popup & sound" to check the
              overlay renders over your games.
            </>
          }
          action={
            <Link className="btn-primary" to="/games/installed">
              See installed games
            </Link>
          }
        />
      </div>
    )
  }

  const pct = data.totals.total
    ? Math.round((data.totals.unlocked / data.totals.total) * 100)
    : 0

  return (
    <div className="p-6">
      <PageHeader
        title="Achievements"
        subtitle={`${data.totals.games} games tracked`}
        actions={
          <button
            className="btn-ghost"
            onClick={() => void testPopup()}
            title="Raises the in-game overlay with a fake unlock, so you can verify it shows over fullscreen games"
          >
            Test popup &amp; sound
          </button>
        }
      />

      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Unlocked" value={String(data.totals.unlocked)} accent />
        <StatTile label="Tracked" value={String(data.totals.total)} sub="achievements" />
        <StatTile label="Completion" value={`${pct}%`} />
        <StatTile label="Games" value={String(data.totals.games)} />
      </div>

      {data.recent.length > 0 && (
        <Section title="Recent unlocks">
          <ul className="space-y-1">
            {data.recent.slice(0, 20).map((e) => (
              <UnlockRow key={`${e.achievementId}-${e.unlockedAt}`} e={e} />
            ))}
          </ul>
        </Section>
      )}

      {data.rarest.length > 0 && (
        <Section title="Rarest unlocks" subtitle="least earned across all players">
          <ul className="space-y-1">
            {data.rarest.map((e) => (
              <UnlockRow key={`rare-${e.achievementId}`} e={e} showRarity />
            ))}
          </ul>
        </Section>
      )}

      <Section title="By game">
        <ul className="space-y-1">
          {data.games.map((g) => {
            const gamePct = g.total ? Math.round((g.unlocked / g.total) * 100) : 0
            return (
              <li key={g.mediaId}>
                <Link
                  to={detailPath(g.mediaType, g.mediaId)}
                  className="flex items-center gap-3 rounded border border-base-700/40 px-3 py-2 hover:bg-base-700/40"
                >
                  <CoverImage
                    path={g.coverPath}
                    alt={g.title}
                    className="h-14 w-10 object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{g.title}</p>
                    <div className="mt-1 h-1.5 rounded bg-base-700 overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${gamePct}%` }} />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm text-gray-400 tabular-nums">
                    {g.unlocked}/{g.total}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>
    </div>
  )
}

function UnlockRow({ e, showRarity }: { e: AchievementUnlockEvent; showRarity?: boolean }) {
  return (
    <li>
      <Link
        to={detailPath(e.mediaType, e.mediaId)}
        className="flex items-center gap-3 rounded border border-base-700/40 px-3 py-2 hover:bg-base-700/40"
      >
        {e.iconPath ? (
          <img
            src={mediaUrl(e.iconPath) ?? undefined}
            alt=""
            className="h-10 w-10 rounded object-cover shrink-0"
          />
        ) : (
          <span className="h-10 w-10 rounded bg-base-700 shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate">{e.name}</p>
          <p className="truncate text-xs text-gray-500">{e.mediaTitle}</p>
        </div>
        <span className="shrink-0 text-xs text-gray-500">
          {showRarity && e.rarity
            ? `★ ${e.rarity.replace('-', ' ')}${e.points != null ? ` · ${e.points} pts` : ''}`
            : fmtDate(e.unlockedAt)}
        </span>
      </Link>
    </li>
  )
}
