import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useStatuses } from '../lib/hooks'
import { GAME } from '../lib/mediaConfig'
import { FRANCHISES, matchLibrary, type FranchiseCfg } from '@shared/franchises'
import type { MediaItem } from '@shared/types'
import PageHeader from '../components/PageHeader'

// The franchise index: one card per curated franchise with the user's
// completion state. Everything derives from the bundled canon + the games
// list — no queries beyond the one HomePage already holds.
export default function FranchisesPage() {
  const { data: games = [] } = useQuery({
    // Same key + filter as HomePage's per-type list — one shared cache entry.
    queryKey: qk.media.home('game'),
    queryFn: () => api.media.list({ mediaType: 'game' })
  })
  const statuses = useStatuses(GAME)
  const completedStatus = statuses[1]
  const isFinished = (m: MediaItem): boolean =>
    (m.status != null && m.status === completedStatus) ||
    (!!m.totalUnits && m.progress >= m.totalUnits)

  return (
    <div className="p-6">
      <PageHeader
        title="Franchises"
        subtitle="Curated series pages — your library mapped onto each canon."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FRANCHISES.map((f) => (
          <FranchiseCard key={f.id} cfg={f} games={games} isFinished={isFinished} />
        ))}
      </div>
    </div>
  )
}

function FranchiseCard({
  cfg,
  games,
  isFinished
}: {
  cfg: FranchiseCfg
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
      {/* Accent-gradient hero, the GachaHomePage no-image idiom. */}
      <div
        className="relative h-28"
        style={{ background: `linear-gradient(135deg, ${cfg.color}2e, transparent 75%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-base-800 via-base-800/20 to-transparent" />
        <div className="absolute bottom-2 left-4 right-4">
          <p className="truncate text-lg font-semibold" style={{ color: cfg.color }}>
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
