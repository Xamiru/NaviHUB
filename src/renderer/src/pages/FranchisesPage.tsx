import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { configFor } from '../lib/mediaConfig'
import { useFranchiseLibrary } from '../lib/useFranchiseLibrary'
import { mediaUrl } from '@shared/mediaUrl'
import {
  FRANCHISES,
  FRANCHISE_MEDIA_TYPES,
  franchiseMediaTypes,
  matchLibrary,
  type FranchiseCfg
} from '@shared/franchises'
import type { MediaType } from '@shared/types'
import PageHeader from '../components/PageHeader'

const SUBTITLE = 'Curated series pages across games, novels, anime, film and TV, mapped onto your library.'

// The franchise index: one hero card per curated franchise with the user's
// completion state. Everything derives from the bundled canon + the per-type
// library lists HomePage-style pages already share, plus the hero art cache
// map (remote URL until cached).
export default function FranchisesPage() {
  const { items, isLoading, error, refetch: refetchLibrary, isFinished } =
    useFranchiseLibrary(FRANCHISE_MEDIA_TYPES)
  const [typeFilter, setTypeFilter] = usePersistedState<MediaType | 'all'>('franchises.type', 'all')
  const activeType =
    typeFilter !== 'all' && FRANCHISE_MEDIA_TYPES.includes(typeFilter) ? typeFilter : 'all'
  const shown =
    activeType === 'all'
      ? FRANCHISES
      : FRANCHISES.filter((f) => franchiseMediaTypes(f).includes(activeType))
  // One pass over the library for every card, not one per card render.
  const progress = useMemo(() => {
    const out = new Map<string, { owned: number; finished: number }>()
    for (const f of FRANCHISES) {
      const owned = [...matchLibrary(f.entries, items).values()]
      out.set(f.id, { owned: owned.length, finished: owned.filter(isFinished).length })
    }
    return out
  }, [items, isFinished])

  const { data: heroMap = {}, refetch } = useQuery({
    queryKey: qk.franchise.heroMap,
    queryFn: () => api.franchise.heroMap()
  })
  // Fire the (tiny) hero download once per mount; re-read the map when the
  // batch settles. Cards show the remote URL until a cached path lands, so a
  // short delayed refetch is enough — polling artStatus would be more
  // machinery than the swap is worth.
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    api.franchise.ensureHeroes().then((r) => {
      if (r.started) window.setTimeout(() => refetch(), 4000)
    })
  }, [refetch])

  if (isLoading || error) {
    return (
      <div className="p-6">
        <PageHeader title="Franchises" subtitle={SUBTITLE} />
        {isLoading ? (
          <p className="text-sm text-gray-400" role="status">Loading your library…</p>
        ) : (
          <div className="card p-6" role="alert">
            <p className="text-sm text-red-300">
              Could not load your library{error instanceof Error ? ` — ${error.message}` : '.'}
            </p>
            <button className="btn-ghost mt-3" onClick={refetchLibrary}>Try again</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6">
      <PageHeader title="Franchises" subtitle={SUBTITLE} />
      <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
        {(['all', ...FRANCHISE_MEDIA_TYPES] as const).map((t) => (
          <button
            key={t}
            className={`pill ${activeType === t ? 'pill-active' : ''}`}
            aria-pressed={activeType === t}
            onClick={() => setTypeFilter(t)}
          >
            {t === 'all' ? 'All' : configFor(t).plural}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((f) => (
          <FranchiseCard
            key={f.id}
            cfg={f}
            heroSrc={(heroMap[f.id] && mediaUrl(heroMap[f.id]!)) || f.heroUrl}
            owned={progress.get(f.id)?.owned ?? 0}
            finished={progress.get(f.id)?.finished ?? 0}
          />
        ))}
      </div>
    </div>
  )
}

function FranchiseCard({
  cfg,
  heroSrc,
  owned,
  finished
}: {
  cfg: FranchiseCfg
  heroSrc: string
  owned: number
  finished: number
}) {
  // A remote hero can fail before the cache lands; the card then shows its
  // tinted panel instead of a broken image, and retries when the cached path
  // replaces the URL.
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const total = cfg.entries.length
  const pct = total ? Math.round((finished / total) * 100) : 0
  return (
    <Link
      to={`/franchises/${cfg.id}`}
      className="card group block overflow-hidden transition-colors hover:border-accent/60"
    >
      <div className="relative h-40 bg-base-700">
        {failedSrc !== heroSrc && (
          <img
            src={heroSrc}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailedSrc(heroSrc)}
          />
        )}
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
        <p className="mb-2 truncate text-xs text-gray-500">
          {franchiseMediaTypes(cfg).map((t) => configFor(t).plural).join(' · ')}
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
