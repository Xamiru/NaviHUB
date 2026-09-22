import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useStatuses } from '../lib/hooks'
import { GAME } from '../lib/mediaConfig'
import { mediaUrl } from '@shared/mediaUrl'
import { FRANCHISES, matchLibrary, type FranchiseCfg } from '@shared/franchises'
import type { MediaItem } from '@shared/types'
import PageHeader from '../components/PageHeader'

// The franchise index: one hero card per curated franchise with the user's
// completion state. Everything derives from the bundled canon + the games
// list — no queries beyond the one HomePage already holds, plus the hero
// art cache map (remote URL until cached).
export default function FranchisesPage() {
  const { data: games = [], isLoading, isError, error, refetch: refetchGames } = useQuery({
    // Same key + filter as HomePage's per-type list — one shared cache entry.
    queryKey: qk.media.home('game'),
    queryFn: () => api.media.list({ mediaType: 'game' })
  })
  const statuses = useStatuses(GAME)
  const completedStatus = statuses[1]
  const isFinished = (m: MediaItem): boolean =>
    (m.status != null && m.status === completedStatus) ||
    (!!m.totalUnits && m.progress >= m.totalUnits)

  const { data: heroMap = {}, refetch } = useQuery({
    queryKey: qk.franchise.heroMap,
    queryFn: () => api.franchise.heroMap()
  })
  // Fire the (tiny) hero download once per mount; re-read the map when the
  // batch settles. Five files — polling artStatus would be more machinery
  // than the wait is worth, so a short delayed refetch does.
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    api.franchise.ensureHeroes().then((r) => {
      if (r.started) window.setTimeout(() => refetch(), 4000)
    })
  }, [refetch])

  if (isLoading || isError) {
    return (
      <div className="p-6">
        <PageHeader title="Franchises" subtitle="Curated series pages — your library mapped onto each canon." />
        {isLoading ? (
          <p className="text-sm text-gray-400" role="status">Loading games…</p>
        ) : (
          <div className="card p-6" role="alert">
            <p className="text-sm text-red-300">
              Could not load games{error instanceof Error ? ` — ${error.message}` : '.'}
            </p>
            <button className="btn-ghost mt-3" onClick={() => void refetchGames()}>Try again</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Franchises"
        subtitle="Curated series pages — your library mapped onto each canon."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FRANCHISES.map((f) => (
          <FranchiseCard
            key={f.id}
            cfg={f}
            heroSrc={(heroMap[f.id] && mediaUrl(heroMap[f.id]!)) || f.heroUrl}
            games={games}
            isFinished={isFinished}
          />
        ))}
      </div>
    </div>
  )
}

function FranchiseCard({
  cfg,
  heroSrc,
  games,
  isFinished
}: {
  cfg: FranchiseCfg
  heroSrc: string
  games: MediaItem[]
  isFinished: (m: MediaItem) => boolean
}) {
  const { owned, finished } = useMemo(() => {
    const matched = matchLibrary(cfg.entries, games)
    const ownedItems = [...matched.values()]
    return { owned: ownedItems.length, finished: ownedItems.filter(isFinished).length }
  }, [cfg, games, isFinished])
  const total = cfg.entries.length
  const pct = total ? Math.round((finished / total) * 100) : 0
  return (
    <Link
      to={`/games/franchises/${cfg.id}`}
      className="card group block overflow-hidden transition-colors hover:border-accent/60"
    >
      {/* Hero art — the GachaHomePage GameCard treatment. */}
      <div className="relative h-40">
        <img
          src={heroSrc}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-800 via-base-800/30 to-transparent" />
        <div className="absolute bottom-2 left-4 right-4">
          <p className="truncate text-xl font-semibold drop-shadow" style={{ color: cfg.color }}>
            {cfg.name}
          </p>
        </div>
      </div>
      <div className="p-4 pt-3">
        <p className="mb-2 truncate text-xs text-gray-500">{cfg.tagline}</p>
        <p className="mb-2 text-sm text-gray-300">
          Owned {owned} of {total} · Finished {finished}
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-base-700">
          <div
            className="h-full rounded-full transition-[width]"
            style={{ width: `${pct}%`, background: cfg.color }}
          />
        </div>
      </div>
    </Link>
  )
}
