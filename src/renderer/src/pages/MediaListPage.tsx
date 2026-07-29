import { memo, useState } from 'react'
import Tabs from '../components/Tabs'
import EmptyState from '../components/EmptyState'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useStatuses, useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { configFor, type MediaConfig } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import MediaCard from '../components/MediaCard'
import ImportDialog from '../components/ImportDialog'
import MediaFilterPanel, {
  EMPTY_FILTERS,
  activeCount,
  toListFilter,
  type MediaFilters
} from '../components/MediaFilterPanel'
import { seasonLabel } from '@shared/season'
import type { MediaItem, MediaListFilter, MediaSort } from '@shared/types'

// Sort menu. `random` is a seeded shuffle — it has no direction, so the page
// swaps the direction toggle for a Shuffle button that re-seeds it.
const SORTS: { value: MediaSort; label: string }[] = [
  { value: 'updated', label: 'Last updated' },
  { value: 'added', label: 'Recently added' },
  { value: 'title', label: 'Title' },
  { value: 'score', label: 'Your score' },
  { value: 'communityScore', label: 'Community score' },
  { value: 'release', label: 'Release date' },
  { value: 'progress', label: 'Progress' },
  { value: 'units', label: 'Length' },
  { value: 'timesConsumed', label: 'Times consumed' },
  { value: 'random', label: 'Random' }
]

const newSeed = (): number => Math.floor(Math.random() * 1_000_000)

export default function MediaListPage({ cfg }: { cfg: MediaConfig }) {
  const navigate = useNavigate()
  const statuses = useStatuses(cfg)

  // Empty = every status; the pills toggle rather than switch, so "Action games
  // I'm either playing or planning" is one click away.
  const [selStatuses, setSelStatuses] = usePersistedState<string[]>('statuses', [])
  const [search, setSearch] = usePersistedState('search', '')
  const [sort, setSort] = usePersistedState<MediaSort>('sort', 'updated')
  // Shuffle seed: part of the query key, so bumping it deals a new hand while
  // an unchanged seed keeps the order stable across refetches.
  const [seed, setSeed] = usePersistedState('seed', 1)
  const [sortDir, setSortDir] = usePersistedState<'asc' | 'desc'>('sortDir', 'desc')
  const [favOnly, setFavOnly] = usePersistedState('favOnly', false)
  const [filters, setFilters] = usePersistedState<MediaFilters>('filters', EMPTY_FILTERS)
  const [showFilters, setShowFilters] = usePersistedState('showFilters', false)
  const [showImport, setShowImport] = useState(false)

  // Debounce the search box so each keystroke doesn't refire the media query;
  // the <input> stays bound to `search` for instant visual feedback.
  const debouncedSearch = useDebouncedValue(search, 250)

  const { data: tags = [] } = useQuery({ queryKey: qk.tags.all, queryFn: () => api.tags.list() })

  // Slider bounds come from the library itself (min/max year, longest title).
  const { data: facets } = useQuery({
    queryKey: qk.mediaCounts.facets(cfg.key),
    queryFn: () => api.media.facets(cfg.key)
  })

  const filter: MediaListFilter = {
    mediaType: cfg.key,
    statuses: selStatuses.length ? selStatuses : null,
    search: debouncedSearch.trim() || null,
    sort,
    sortDir,
    favorite: favOnly || null,
    seed: sort === 'random' ? seed : null,
    ...toListFilter(filters)
  }
  const nFilters = activeCount(filters) + (favOnly ? 1 : 0) + (selStatuses.length ? 1 : 0)

  const { data: items = [], isLoading } = useQuery({
    queryKey: qk.media.list(filter),
    queryFn: () => api.media.list(filter)
  })
  // Big libraries render in scroll-fed batches, same as the entity grids.
  const { visible, sentinelRef, hasMore } = useIncrementalList(items)

  const { data: counts = {} } = useQuery({
    queryKey: qk.mediaCounts.byType(cfg.key),
    queryFn: () => api.media.statusCounts(cfg.key)
  })

  // facets counts every row of the type; statusCounts drops NULL statuses, so
  // summing it undercounts a library with untracked entries.
  const total = facets?.total ?? Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {cfg.listTabs && (
        <Tabs
          className="mb-5"
          value={cfg.key}
          tabs={cfg.listTabs.map((t) => ({
            key: t.key,
            label: t.label,
            to: configFor(t.key).basePath
          }))}
        />
      )}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">{cfg.plural}</h1>
          <p className="text-sm text-gray-500">{total} titles in your library</p>
        </div>
        <div className="flex gap-2">
          {cfg.hasSeasonal && (
            <Link to={`${cfg.basePath}/seasonal`} className="btn-ghost">
              ❆ Seasonal
            </Link>
          )}
          {cfg.importSource && (
            <button className="btn-ghost" onClick={() => setShowImport(true)}>
              ⬇ Import from {cfg.importSource.label}
            </button>
          )}
          <Link to={`${cfg.basePath}/new`} className="btn-primary">
            + Add {cfg.singular}
          </Link>
        </div>
      </div>

      {showImport && cfg.importSource && (
        <ImportDialog
          cfg={cfg}
          onClose={() => setShowImport(false)}
          onImported={(mediaId) => {
            setShowImport(false)
            navigate(`${cfg.basePath}/${mediaId}`)
          }}
        />
      )}

      {/* Status filter pills — multi-select, "All" clears */}
      <div className="flex flex-wrap gap-2 mb-4">
        <FilterPill
          active={selStatuses.length === 0}
          onClick={() => setSelStatuses([])}
          label="All"
          count={total}
        />
        {statuses.map((s) => (
          <FilterPill
            key={s}
            active={selStatuses.includes(s)}
            onClick={() =>
              setSelStatuses((cur) =>
                cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
              )
            }
            label={s}
            count={counts[s] ?? 0}
          />
        ))}
      </div>

      {/* Search + filters + sort */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          className="input max-w-xs"
          placeholder="Search titles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`btn py-1.5 ${showFilters || nFilters ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'}`}
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
        >
          Filters{nFilters ? ` (${nFilters})` : ''}
        </button>
        <button
          className={`btn py-1.5 ${favOnly ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'}`}
          onClick={() => setFavOnly((v) => !v)}
          title="Show favorites only"
        >
          ★ Favorites
        </button>
        <div className="flex items-center gap-2 ml-auto text-sm">
          <span className="text-gray-500">Sort</span>
          <select
            className="input w-auto py-1.5"
            value={sort}
            onChange={(e) => {
              const next = e.target.value as MediaSort
              if (next === 'random') setSeed(newSeed())
              setSort(next)
            }}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {sort === 'random' ? (
            <button className="btn-ghost py-1.5" onClick={() => setSeed(newSeed())}>
              Shuffle
            </button>
          ) : (
            <button
              className="btn-ghost py-1.5"
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              title="Toggle direction"
              aria-label="Toggle sort direction"
            >
              {sortDir === 'asc' ? '↑' : '↓'}
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <MediaFilterPanel cfg={cfg} facets={facets} value={filters} onChange={setFilters} />
      )}

      {/* What's currently narrowing the grid, each chip removable */}
      {nFilters > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {selStatuses.map((s) => (
            <ActiveChip key={`st-${s}`} label={s} onClear={() =>
              setSelStatuses((cur) => cur.filter((x) => x !== s))
            } />
          ))}
          {favOnly && <ActiveChip label="Favorites" onClear={() => setFavOnly(false)} />}
          {filters.tagIds.map((id) => (
            <ActiveChip
              key={`tag-${id}`}
              label={tags.find((t) => t.id === id)?.name ?? `Tag ${id}`}
              onClear={() =>
                setFilters((f) => ({ ...f, tagIds: f.tagIds.filter((x) => x !== id) }))
              }
            />
          ))}
          {filters.seasons.map((s) => (
            <ActiveChip
              key={`se-${s}`}
              label={seasonLabel(s)}
              onClear={() =>
                setFilters((f) => ({ ...f, seasons: f.seasons.filter((x) => x !== s) }))
              }
            />
          ))}
          {filters.year && (
            <ActiveChip
              label={`Year ${filters.year[0]}–${filters.year[1]}`}
              onClear={() => setFilters((f) => ({ ...f, year: null }))}
            />
          )}
          {filters.score && (
            <ActiveChip
              label={`Score ${filters.score[0]}–${filters.score[1]}`}
              onClear={() => setFilters((f) => ({ ...f, score: null }))}
            />
          )}
          {filters.unrated && (
            <ActiveChip
              label="Unrated"
              onClear={() => setFilters((f) => ({ ...f, unrated: false }))}
            />
          )}
          {filters.community && (
            <ActiveChip
              label={`Community ${filters.community[0]}–${filters.community[1]}`}
              onClear={() => setFilters((f) => ({ ...f, community: null }))}
            />
          )}
          {filters.units && (
            <ActiveChip
              label={`${cfg.totalFieldLabel} ${filters.units[0]}–${filters.units[1]}`}
              onClear={() => setFilters((f) => ({ ...f, units: null }))}
            />
          )}
          <button
            className="text-xs text-gray-400 underline-offset-2 hover:text-accent hover:underline"
            onClick={() => {
              setFilters(EMPTY_FILTERS)
              setSelStatuses([])
              setFavOnly(false)
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        nFilters > 0 || debouncedSearch.trim() ? (
          <EmptyState
            title="Nothing matches these filters"
            body="Loosen a range or clear a chip to widen the search."
          />
        ) : (
          <EmptyState
            title={`No ${cfg.plural.toLowerCase()} here yet`}
            body="Start logging the titles you're watching, completed, or planning."
            action={
              <button className="btn-primary" onClick={() => navigate(`${cfg.basePath}/new`)}>
                Add your first {cfg.singular.toLowerCase()}
              </button>
            }
          />
        )
      ) : (
        <>
          {(nFilters > 0 || debouncedSearch.trim()) && (
            <p className="mb-3 text-xs text-gray-400">
              {items.length} of {total} {cfg.plural.toLowerCase()} match
            </p>
          )}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {visible.map((m) => (
              <MediaCard key={m.id} cfg={cfg} item={m} />
            ))}
          </div>
          <div ref={sentinelRef} />
          {hasMore && (
            <p className="mt-4 text-center text-xs text-gray-400">
              Showing {visible.length} of {items.length} — scroll for more
            </p>
          )}
        </>
      )}
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  label,
  count
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={active ? 'pill pill-active' : 'pill'}
    >
      {label}
      <span className={`ml-1.5 text-xs ${active ? 'opacity-70' : 'text-gray-500'}`}>
        {count}
      </span>
    </button>
  )
}

// One active narrowing, removable. Mirrors the .chip idiom with a clear button.
function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="chip">
      {label}
      <button
        onClick={onClear}
        className="text-gray-500 hover:text-accent"
        aria-label={`Remove filter ${label}`}
        title={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  )
}

// MediaCard moved to components/MediaCard.tsx; re-exported for old importers.
export { default as MediaCard } from '../components/MediaCard'


