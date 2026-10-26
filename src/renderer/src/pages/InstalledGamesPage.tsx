import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { fmtDurationSec } from '../lib/useGameSession'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { ArtworkCard, FeaturedGame, fmtLastPlayed, useGameLauncher } from '../components/games/LaunchCards'
import Section from '../components/Section'
import { Field } from '../components/Field'
import { PLATFORM_KEYS, PLATFORMS } from '@shared/emulation/platforms'
import type { InstalledGame } from '@shared/types'

// Remembered across visits: whether the collection is shelved by console.
const GROUP_PREF = 'installed.groupByConsole'

function readGroupPref(): boolean {
  try {
    return localStorage.getItem(GROUP_PREF) === '1'
  } catch {
    return false
  }
}

function writeGroupPref(on: boolean): void {
  try {
    localStorage.setItem(GROUP_PREF, on ? '1' : '0')
  } catch {
    // A blocked storage only loses the preference.
  }
}

// Console shelves in platform order, PC games (no game file) last.
function shelves(games: InstalledGame[]): { key: string; label: string; games: InstalledGame[] }[] {
  const out: { key: string; label: string; games: InstalledGame[] }[] = PLATFORM_KEYS.map((p) => ({
    key: p as string,
    label: PLATFORMS[p].label,
    games: games.filter((g) => g.platform === p)
  }))
  out.push({ key: 'pc', label: 'PC', games: games.filter((g) => g.platform == null) })
  return out.filter((s) => s.games.length > 0)
}

type SortMode = 'recent' | 'title' | 'time'

// Games and visual novels with linked executables. The recent shelf is a quick
// launch path; the complete collection remains searchable below it.
export default function InstalledGamesPage() {
  const { session, runningHere, playProps } = useGameLauncher()
  const [search, setSearch] = usePersistedState('installed.search', '')
  const [sort, setSort] = usePersistedState<SortMode>('installed.sort', 'recent')
  const [grouped, setGrouped] = useState(readGroupPref)
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
          body={<>Open a game, go to its Playtime tab and link its executable or a game file for an emulator. It shows up here, and playing it from the app tracks your time and achievements.</>}
          action={<Link className="btn-primary" to="/games">Browse games</Link>}
        />
      </div>
    )
  }


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
          backgroundPath={featuredDetail?.backgroundPath ?? null}
          runningHere={runningHere(featured)}
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
                runningHere={runningHere(game)}
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
          <button
            type="button"
            className={grouped ? 'pill pill-active' : 'pill'}
            aria-pressed={grouped}
            onClick={() => {
              setGrouped(!grouped)
              writeGroupPref(!grouped)
            }}
          >
            Group by console
          </button>
        </div>
        {visible.length > 0 && grouped ? (
          <div className="space-y-8">
            {shelves(visible).map((shelf) => (
              <section key={shelf.key} aria-labelledby={`shelf-${shelf.key}`}>
                <h3 id={`shelf-${shelf.key}`} className="mb-3 flex items-baseline gap-3 text-sm font-semibold">
                  {shelf.label}
                  <span className="text-xs font-normal text-gray-400">
                    {shelf.games.length} {shelf.games.length === 1 ? 'title' : 'titles'}
                  </span>
                </h3>
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:gap-5">
                  {shelf.games.map((game) => (
                    <ArtworkCard
                      key={game.mediaId}
                      game={game}
                      runningHere={runningHere(game)}
                      {...playProps}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : visible.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:gap-5">
            {visible.map((game) => (
              <ArtworkCard
                key={game.mediaId}
                game={game}
                runningHere={runningHere(game)}
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
