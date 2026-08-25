import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { configFor } from '../lib/mediaConfig'
import { fmtDurationSec, useGameSession } from '../lib/useGameSession'
import { toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import type { InstalledGame } from '@shared/types'

// Everything playable from the app right now — the games and VNs with an
// executable linked. A launcher view rather than another filtered library list:
// it exists to be the shortest path from opening NaviHUB to being in a game.

function fmtLastPlayed(utc: string | null): string {
  if (!utc) return 'never played'
  const d = new Date(utc.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return utc
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function InstalledGamesPage() {
  const session = useGameSession()
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.games.installed,
    queryFn: () => api.games.installed()
  })

  // Before !data: a failed query leaves data undefined with isLoading false,
  // so `isLoading || !data` alone sticks on "Loading…" permanently.
  if (isError) {
    return (
      <div className="p-6">
        <PageHeader title="Installed" />
        <p className="text-sm text-gray-500">Could not load installed games — try again in a moment.</p>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="p-6">
        <PageHeader title="Installed" />
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="p-6">
        <PageHeader title="Installed" />
        <EmptyState
          title="Nothing linked yet"
          body={
            <>
              Open a game, go to its Playtime tab and link the executable. It shows up here, and
              playing it from the app tracks your time and achievements.
            </>
          }
          action={
            <Link className="btn-primary" to="/games">
              Browse games
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        title="Installed games"
        subtitle={`${data.length} playable from the app, ordered as a launch-ready collection`}
      />
      <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
        {data.map((g) => (
          <InstalledCard
            key={g.mediaId}
            g={g}
            running={session.running}
            runningHere={session.running && session.status?.mediaId === g.mediaId}
            onLaunched={session.kick}
          />
        ))}
      </ul>
    </div>
  )
}

function InstalledCard({
  g,
  running,
  runningHere,
  onLaunched
}: {
  g: InstalledGame
  running: boolean
  runningHere: boolean
  onLaunched: () => Promise<void>
}) {
  const cfg = configFor(g.mediaType)
  const pct = g.achievements?.total
    ? Math.round((g.achievements.unlocked / g.achievements.total) * 100)
    : null

  async function play(): Promise<void> {
    try {
      await api.games.launch(g.mediaId)
      await onLaunched()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <li className="card p-3 flex gap-3">
      <Link to={`${cfg.basePath}/${g.mediaId}`} className="shrink-0">
        <CoverImage
          path={g.coverPath}
          alt={g.title}
          className="h-28 w-20 object-cover"
          thumbWidth={320}
        />
      </Link>
      <div className="min-w-0 flex-1 flex flex-col">
        <Link to={`${cfg.basePath}/${g.mediaId}`} className="truncate font-medium hover:text-accent">
          {g.title}
        </Link>
        <p className="mt-0.5 text-xs text-gray-500">
          {g.totalSeconds > 0 ? `${fmtDurationSec(g.totalSeconds)} played` : 'no tracked time'} ·{' '}
          {fmtLastPlayed(g.lastPlayedAt)}
        </p>

        {g.achievements && (
          <Link
            to={`${cfg.basePath}/${g.mediaId}?tab=achievements`}
            className="mt-2 block group"
            title="Achievements"
          >
            <div className="flex items-center justify-between text-xs text-gray-500 group-hover:text-gray-400">
              <span>Achievements</span>
              <span className="tabular-nums">
                {g.achievements.unlocked}/{g.achievements.total}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded bg-base-700 overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${pct ?? 0}%` }} />
            </div>
          </Link>
        )}

        <div className="mt-auto pt-3">
          {runningHere ? (
            <span className="chip">Playing — closes when the game exits</span>
          ) : (
            <button className="btn w-full" onClick={play} disabled={running}>
              {running ? 'Another game is running' : 'Play'}
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
