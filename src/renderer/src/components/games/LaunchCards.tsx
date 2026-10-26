import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { confirmAchievementLaunch } from '../../lib/achievementLaunch'
import { configFor } from '../../lib/mediaConfig'
import { fmtDurationSec, useGameSession } from '../../lib/useGameSession'
import { toastError } from '../../lib/toast'
import CoverImage from '../CoverImage'
import type { InstalledGame } from '@shared/types'

// The launcher artwork shared by Installed and the Emulators hub: the featured
// "continue playing" card, artwork cards with Play on hover, and the launch flow
// they call (one game at a time, the Steam-emulator achievement check first).

export function useGameLauncher() {
  const session = useGameSession()
  const [launchingId, setLaunchingId] = useState<number | null>(null)

  async function play(game: InstalledGame): Promise<void> {
    if (session.running || launchingId !== null) return
    setLaunchingId(game.mediaId)
    try {
      if (!(await confirmAchievementLaunch(game.mediaId))) return
      await api.games.launch(game.mediaId)
      await session.kick()
    } catch (err) {
      toastError(err)
    } finally {
      setLaunchingId(null)
    }
  }

  const runningHere = (game: InstalledGame): boolean =>
    session.running && session.status?.mediaId === game.mediaId
  return {
    session,
    runningHere,
    playProps: { running: session.running, launchingId, onPlay: play }
  }
}

export function fmtLastPlayed(utc: string | null): string {
  if (!utc) return 'Never played'
  const d = new Date(utc.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return utc
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function detailPath(game: InstalledGame): string {
  return `${configFor(game.mediaType).basePath}/${game.mediaId}`
}

export interface PlayProps {
  game: InstalledGame
  running: boolean
  runningHere: boolean
  launchingId: number | null
  onPlay: (game: InstalledGame) => Promise<void>
}

function PlayControl({ game, running, runningHere, launchingId, onPlay, primary = false }: PlayProps & { primary?: boolean }) {
  if (runningHere) {
    return <span className="chip border-accent/60 bg-base-900/90 text-accent">Playing now</span>
  }
  return (
    <button
      type="button"
      className={primary
        ? 'btn-primary pointer-events-auto whitespace-nowrap shadow-xl'
        : 'btn pointer-events-auto whitespace-nowrap border-accent/70 bg-base-900/95 text-white shadow-xl'}
      disabled={running || launchingId !== null}
      title={running ? 'Another game is running' : undefined}
      aria-label={running ? `Cannot play ${game.title} while another game is running` : `Play ${game.title}`}
      onClick={() => void onPlay(game)}
    >
      {launchingId === game.mediaId ? 'Launching…' : 'Play'}
    </button>
  )
}

function ArtworkActions(props: PlayProps & { primary?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 max-lg:opacity-100">
      <PlayControl {...props} />
    </div>
  )
}

export function ArtworkCard({ game, recent = false, ...playProps }: PlayProps & { recent?: boolean }) {
  return (
    <li className="group min-w-0">
      <div className={`relative overflow-hidden rounded-lg bg-base-700 ${recent ? 'aspect-[3/4]' : 'aspect-[2/3]'}`}>
        <CoverImage
          path={game.coverPath}
          alt={game.title}
          className="absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105"
          rounded="rounded-none"
          thumbWidth={recent ? 480 : 320}
        />
        <div className={recent
          ? 'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent'
          : 'pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35 group-focus-within:bg-black/35'} />
        <Link to={detailPath(game)} className="absolute inset-0" aria-label={`View ${game.title} details`} />
        {recent && (
          <span className="media-contrast pointer-events-none absolute bottom-3 left-3 right-3 truncate text-xs font-semibold text-white">
            {game.title}
          </span>
        )}
        <ArtworkActions game={game} {...playProps} />
      </div>
      {recent ? (
        <p className="mt-2 text-xs text-gray-400">
          {fmtLastPlayed(game.lastPlayedAt)} / {fmtDurationSec(game.totalSeconds)} played
        </p>
      ) : (
        <>
          <Link to={detailPath(game)} className="mt-2 block truncate text-sm font-medium hover:text-accent">
            {game.title}
          </Link>
          <p className="text-xs text-gray-500">
            {game.totalSeconds > 0 ? `${fmtDurationSec(game.totalSeconds)} played` : 'No tracked time'}
          </p>
        </>
      )}
    </li>
  )
}

export function FeaturedGame({ game, backgroundPath, ...playProps }: PlayProps & { backgroundPath: string | null }) {
  const lastPlayed = game.lastPlayedAt !== null
  const achievements = game.achievements
  const pct = achievements?.total
    ? Math.round((achievements.unlocked / achievements.total) * 100)
    : null

  return (
    <div className="grid overflow-hidden rounded-lg border border-base-600 bg-base-800 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.65fr)]">
      <div className="group relative min-h-[300px] overflow-hidden bg-base-700 sm:min-h-[350px]">
        <CoverImage
          path={backgroundPath ?? game.coverPath}
          alt={game.title}
          className={`absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105 ${backgroundPath ? '' : 'scale-110 blur-md opacity-60'}`}
          rounded="rounded-none"
          thumbWidth={backgroundPath ? undefined : 480}
        />
        {!backgroundPath && game.coverPath && (
          <CoverImage
            path={game.coverPath}
            alt=""
            className="absolute right-[8%] top-1/2 h-[78%] w-auto -translate-y-1/2 shadow-2xl"
            rounded="rounded-md"
            thumbWidth={480}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <span className="media-contrast pointer-events-none absolute left-5 top-5 rounded border border-white/20 bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-200">
          {playProps.runningHere ? 'Playing now' : lastPlayed ? 'Continue playing' : 'Ready to play'}
        </span>
        <Link to={detailPath(game)} className="absolute inset-0" aria-label={`View ${game.title} details`} />
        <div className="media-contrast pointer-events-none absolute inset-x-5 bottom-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">
            {game.lastSessionSeconds != null
              ? `Last session / ${fmtDurationSec(game.lastSessionSeconds)}`
              : configFor(game.mediaType).singular}
          </p>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{game.title}</h3>
        </div>
        <ArtworkActions game={game} primary {...playProps} />
      </div>
      <div className="flex flex-col justify-between gap-6 border-t border-base-700 p-5 lg:border-l lg:border-t-0 lg:p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {playProps.runningHere ? 'Active session' : lastPlayed ? 'Resume point' : 'Launch ready'}
          </p>
          <p className="mt-3 text-2xl font-semibold text-white">{game.title}</p>
          <p className="mt-1 text-xs text-gray-400">
            {configFor(game.mediaType).singular} / {fmtLastPlayed(game.lastPlayedAt)}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 border-y border-base-700 py-4">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.15em] text-gray-500">Playtime</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-white">
              {game.totalSeconds > 0 ? fmtDurationSec(game.totalSeconds) : 'None yet'}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.15em] text-gray-500">Achievements</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-white">
              {achievements ? `${achievements.unlocked} / ${achievements.total}` : 'Not tracked'}
            </dd>
          </div>
        </dl>
        <div>
          {pct !== null && achievements && (
            <div
              className="h-1.5 overflow-hidden rounded bg-base-700"
              role="progressbar"
              aria-label={`${game.title} achievements`}
              aria-valuenow={achievements.unlocked}
              aria-valuemin={0}
              aria-valuemax={achievements.total}
            >
              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          )}
          <Link to={detailPath(game)} className="mt-4 inline-block text-sm text-gray-300 hover:text-accent">
            View game details
          </Link>
        </div>
      </div>
    </div>
  )
}
