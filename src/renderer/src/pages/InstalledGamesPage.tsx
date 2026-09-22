import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { configFor } from '../lib/mediaConfig'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { fmtDurationSec, useGameSession } from '../lib/useGameSession'
import { toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import { Field } from '../components/Field'
import type { InstalledGame } from '@shared/types'

type SortMode = 'recent' | 'title' | 'time'

function fmtLastPlayed(utc: string | null): string {
  if (!utc) return 'Never played'
  const d = new Date(utc.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return utc
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function detailPath(game: InstalledGame): string {
  return `${configFor(game.mediaType).basePath}/${game.mediaId}`
}

interface PlayProps {
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

function ArtworkCard({ game, recent = false, ...playProps }: PlayProps & { recent?: boolean }) {
  return (
    <li className="group min-w-0">
      <div className={`relative overflow-hidden rounded-lg bg-base-700 ${recent ? 'aspect-[3/4]' : 'aspect-[2/3]'}`}>
        <CoverImage
          path={game.coverPath}
          alt={game.title}
          className="absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105"
          rounded="rounded-none"
          thumbWidth={recent ? 600 : 360}
        />
        <div className={recent
          ? 'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent'
          : 'pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35 group-focus-within:bg-black/35'} />
        <Link to={detailPath(game)} className="absolute inset-0" aria-label={`View ${game.title} details`} />
        {recent && (
          <span className="pointer-events-none absolute bottom-3 left-3 right-3 truncate text-xs font-semibold text-white">
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

function FeaturedGame({ game, heroPath, ...playProps }: PlayProps & { heroPath: string | null }) {
  const lastPlayed = game.lastPlayedAt !== null
  const achievements = game.achievements
  const pct = achievements?.total
    ? Math.round((achievements.unlocked / achievements.total) * 100)
    : null

  return (
    <div className="grid overflow-hidden rounded-lg border border-base-600 bg-base-800 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.65fr)]">
      <div className="group relative min-h-[300px] overflow-hidden bg-base-700 sm:min-h-[350px]">
        <CoverImage
          path={heroPath ?? game.coverPath}
          alt={game.title}
          className={`absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105 ${heroPath ? '' : 'scale-110 blur-md opacity-60'}`}
          rounded="rounded-none"
          thumbWidth={1200}
        />
        {!heroPath && game.coverPath && (
          <CoverImage
            path={game.coverPath}
            alt=""
            className="absolute right-[8%] top-1/2 h-[78%] w-auto -translate-y-1/2 shadow-2xl"
            rounded="rounded-md"
            thumbWidth={600}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <span className="pointer-events-none absolute left-5 top-5 rounded border border-white/20 bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-200">
          {playProps.runningHere ? 'Playing now' : lastPlayed ? 'Continue playing' : 'Ready to play'}
        </span>
        <Link to={detailPath(game)} className="absolute inset-0" aria-label={`View ${game.title} details`} />
        <div className="pointer-events-none absolute inset-x-5 bottom-5">
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

// Games and visual novels with linked executables. The recent shelf is a quick
// launch path; the complete collection remains searchable below it.
export default function InstalledGamesPage() {
  const session = useGameSession()
  const [search, setSearch] = usePersistedState('installed.search', '')
  const [sort, setSort] = usePersistedState<SortMode>('installed.sort', 'recent')
  const [launchingId, setLaunchingId] = useState<number | null>(null)
  const debouncedSearch = useDebouncedValue(search)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: qk.games.installed,
    queryFn: () => api.games.installed()
  })

  const games = data ?? []
  const activeGame = games.find((game) => session.running && game.mediaId === session.status?.mediaId)
  const featured = activeGame ?? games[0]
  const { data: featuredDetail } = useQuery({
    queryKey: qk.media.detail(featured?.mediaId ?? 0),
    queryFn: () => api.media.get(featured!.mediaId),
    enabled: featured !== undefined
  })
  const recent = games.filter((game) => game.lastPlayedAt && game.mediaId !== featured?.mediaId).slice(0, 3)
  const visible = useMemo(() => {
    const needle = debouncedSearch.trim().toLocaleLowerCase()
    const matched = games.filter((game) => game.title.toLocaleLowerCase().includes(needle))
    if (sort === 'title') matched.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'time') {
      matched.sort((a, b) => b.totalSeconds - a.totalSeconds || a.title.localeCompare(b.title))
    }
    // The backend already orders the default view by most recent session.
    return matched
  }, [games, debouncedSearch, sort])

  async function play(game: InstalledGame): Promise<void> {
    if (session.running || launchingId !== null) return
    setLaunchingId(game.mediaId)
    try {
      await api.games.launch(game.mediaId)
      await session.kick()
    } catch (err) {
      toastError(err)
    } finally {
      setLaunchingId(null)
    }
  }

  if (isError) {
    return (
      <div className="p-6">
        <PageHeader title="Installed" />
        <div role="alert" className="text-sm text-gray-400">
          Could not load installed games.
          <button type="button" className="btn ml-3" onClick={() => void refetch()}>Try again</button>
        </div>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="p-6">
        <PageHeader title="Installed" />
        <p className="text-sm text-gray-500" role="status">Loading installed games…</p>
      </div>
    )
  }

  if (!featured) {
    return (
      <div className="p-6">
        <PageHeader title="Installed" />
        <EmptyState
          title="Nothing linked yet"
          body={<>Open a game, go to its Playtime tab and link the executable. It shows up here, and playing it from the app tracks your time and achievements.</>}
          action={<Link className="btn-primary" to="/games">Browse games</Link>}
        />
      </div>
    )
  }

  const playProps = { running: session.running, launchingId, onPlay: play }

  return (
    <div className="mx-auto max-w-[1500px] p-4 sm:p-6">
      <PageHeader
        title="Installed"
        eyebrow={<span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Game archive / launcher</span>}
        subtitle="Your games, ready to launch from one place."
        actions={<span className="text-xs text-gray-400">{games.length} linked games and visual novels</span>}
      />

      <Section
        title={activeGame ? 'Playing now' : featured.lastPlayedAt ? 'Continue playing' : 'Ready to play'}
        subtitle={activeGame
          ? fmtDurationSec(session.status?.elapsedSec ?? 0)
          : featured.lastPlayedAt ? `Last played ${fmtLastPlayed(featured.lastPlayedAt)}` : undefined}
        className="mb-7"
      >
        <FeaturedGame
          game={featured}
          heroPath={featuredDetail?.heroPath ?? null}
          runningHere={session.running && session.status?.mediaId === featured.mediaId}
          {...playProps}
        />
      </Section>

      {recent.length > 0 && (
        <Section title="Recently played" subtitle="Hover or focus artwork to play" className="mb-8">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {recent.map((game) => (
              <ArtworkCard
                key={game.mediaId}
                game={game}
                recent
                runningHere={session.running && session.status?.mediaId === game.mediaId}
                {...playProps}
              />
            ))}
          </ul>
        </Section>
      )}

      <Section
        title="All linked games"
        subtitle={`${visible.length} ${visible.length === 1 ? 'title' : 'titles'}`}
        className="pb-10"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Field label="Search linked games" hiddenLabel className="contents">
            <input
              type="search"
              className="input max-w-md min-w-48 flex-1"
              placeholder="Search linked games..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Field>
          <Field label="Sort linked games" hiddenLabel className="contents">
            <select
              className="input w-48"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
            >
              <option value="recent">Recently played</option>
              <option value="title">Title</option>
              <option value="time">Most played</option>
            </select>
          </Field>
        </div>
        {visible.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:gap-5">
            {visible.map((game) => (
              <ArtworkCard
                key={game.mediaId}
                game={game}
                runningHere={session.running && session.status?.mediaId === game.mediaId}
                {...playProps}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-sm text-gray-400">No linked games match that search.</p>
        )}
      </Section>
    </div>
  )
}
