import { memo, useState } from 'react'
import Tabs from '../components/Tabs'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
import { loadListSort, saveListSort } from '../lib/listSortPrefs'
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

const SORT_VALUES = SORTS.map((s) => s.value)

const newSeed = (): number => Math.floor(Math.random() * 1_000_000)

export default function MediaListPage({ cfg }: { cfg: MediaConfig }) {
  const navigate = useNavigate()
  const statuses = useStatuses(cfg)

  // The sort the user last left THIS library on (localStorage, per media type),
  // read once per mount — the shell remounts the page on every pathname change,
  // so this re-reads when you switch libraries. Seeded here rather than in a
  // useEffect so the first render already issues the right query.
  const [savedSort] = useState(() => {
    const s = loadListSort(cfg.key, SORT_VALUES)
    return { ...s, seed: s.sort === 'random' ? newSeed() : 1 }
  })

  // Empty = every status; the pills toggle rather than switch, so "Action games
  // I'm either playing or planning" is one click away.
  const [selStatuses, setSelStatuses] = usePersistedState<string[]>('statuses', [])
  const [search, setSearch] = usePersistedState('search', '')
  const [sort, setSort] = usePersistedState<MediaSort>('sort', savedSort.sort)
  // Shuffle seed: part of the query key, so bumping it deals a new hand while
  // an unchanged seed keeps the order stable across refetches. A library whose
  // remembered sort IS random gets a fresh hand per visit rather than the same
  // "random" order forever.
  const [seed, setSeed] = usePersistedState('seed', savedSort.seed)
  const [sortDir, setSortDir] = usePersistedState<'asc' | 'desc'>('sortDir', savedSort.dir)
  const [favOnly, setFavOnly] = usePersistedState('favOnly', false)
  const [filters, setFilters] = usePersistedState<MediaFilters>('filters', EMPTY_FILTERS)
  const [showFilters, setShowFilters] = usePersistedState('showFilters', false)
  const [contextId, setContextId] = useState<number | null>(null)
  // `?import=1` opens the dialog on arrival (the one-shot `?tab=` idiom), so
  // Home's Import chip lands on the importer instead of just this list.
  const [params] = useSearchParams()
  const [showImport, setShowImport] = useState(params.get('import') === '1')

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
  // The search box counts: without it, searching for a typo renders an empty
  // state that says "clear a chip" while "Clear all" is gated off screen.
  const nFilters =
    activeCount(filters) +
    (favOnly ? 1 : 0) +
    (selStatuses.length ? 1 : 0) +
    (debouncedSearch.trim() ? 1 : 0)

  const { data: items = [], isLoading } = useQuery({
    queryKey: qk.media.list(filter),
    queryFn: () => api.media.list(filter)
  })
  const contextItem = items.find((item) => item.id === contextId) ?? items[0]
  // Big libraries render in scroll-fed batches, same as the entity grids.
  const { visible, sentinelRef, hasMore } = useIncrementalList(items)

  // One map for the whole grid rather than a query per card — only a handful of
  // games are ever tracked, and untracked ones simply aren't in it.
  const { data: achievementSummaries } = useQuery({
    queryKey: qk.achievements.cardSummaries,
    queryFn: () => api.achievements.cardSummaries(),
    enabled: !!cfg.hasAchievements
  })

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
      <PageHeader
        title={cfg.plural}
        subtitle={`${total} titles in your library`}
        actions={
          <>
            {cfg.hasSeasonal && (
              <Link to={`${cfg.basePath}/seasonal`} className="btn-ghost">
                Seasonal
              </Link>
            )}
            {cfg.importSource && (
              <button className="btn-ghost" onClick={() => setShowImport(true)}>
                Import from {cfg.importSource.label}
              </button>
            )}
            {/* Hidden while the empty state below carries the same filled action */}
            {total > 0 && (
              <Link to={`${cfg.basePath}/new`} className="btn-primary">
                + Add {cfg.singular}
              </Link>
            )}
          </>
        }
      />

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
          Favorites
        </button>
        {/* Both controls write the choice back to listSortPrefs: this library
            reopens on whatever you picked last, here and after a restart. */}
        <div className="flex items-center gap-2 ml-auto text-sm">
          <span className="text-gray-500">Sort</span>
          <select
            className="input w-auto py-1.5"
            value={sort}
            title="Your last choice becomes this library's default"
            onChange={(e) => {
              const next = e.target.value as MediaSort
              if (next === 'random') setSeed(newSeed())
              setSort(next)
              saveListSort(cfg.key, { sort: next })
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
              onClick={() => {
                const next = sortDir === 'asc' ? 'desc' : 'asc'
                setSortDir(next)
                saveListSort(cfg.key, { dir: next })
              }}
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
              setSearch('')
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
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
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-4">
              {visible.map((m) => (
                <div
                  key={m.id}
                  onMouseEnter={() => setContextId(m.id)}
                  onFocusCapture={() => setContextId(m.id)}
                  className={contextItem?.id === m.id ? 'rounded-lg ring-1 ring-accent/60' : ''}
                >
                  <MediaCard
                    cfg={cfg}
                    item={m}
                    showFavorite
                    achievements={achievementSummaries?.[m.id]}
                  />
                </div>
              ))}
            </div>
            <ContextLens item={contextItem} cfg={cfg} />
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

function ContextLens({ item, cfg }: { item: MediaItem; cfg: MediaConfig }) {
  const year = item.releaseDate?.slice(0, 4)
  return (
    <aside className="card sticky top-5 hidden overflow-hidden lg:block">
      <div className="relative h-48 overflow-hidden bg-base-700">
        <CoverImage
          path={item.coverPath}
          alt=""
          rounded=""
          className="h-full w-full scale-110 opacity-45 blur-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-800 via-base-800/30 to-transparent" />
        <CoverImage
          path={item.coverPath}
          alt={item.title}
          rounded="rounded-md"
          className="absolute bottom-4 left-5 h-32 w-[86px] shadow-xl"
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          Context lens
        </p>
        <h2 className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight text-white">
          {item.title}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.status && <span className="chip">{item.status}</span>}
          {item.score != null && <span className="chip">Score {item.score}</span>}
          {year && <span className="chip">{year}</span>}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-base-700 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Progress</p>
            <p className="mt-1 text-sm text-gray-200">{cfg.formatProgressStat(item)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Archive</p>
            <p className="mt-1 text-sm text-gray-200">{cfg.singular}</p>
          </div>
        </div>
        {item.synopsis && (
          <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-400">{item.synopsis}</p>
        )}
        <Link to={`${cfg.basePath}/${item.id}`} className="btn-ghost mt-5 w-full">
          Open detail
        </Link>
        {cfg.children.length > 0 && (
          <div className="mt-5 border-t border-base-700 pt-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Connected locally</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cfg.children.slice(0, 3).map((child) => (
                <Link key={child.to} to={child.to} className="pill">
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
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
