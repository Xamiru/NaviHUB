import { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useStatuses, useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { configFor, type MediaConfig } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import ImportDialog from '../components/ImportDialog'
import type { MediaItem, MediaListFilter } from '@shared/types'

type Sort = NonNullable<MediaListFilter['sort']>

export default function MediaListPage({ cfg }: { cfg: MediaConfig }) {
  const navigate = useNavigate()
  const statuses = useStatuses(cfg)

  const [status, setStatus] = usePersistedState<string | null>('status', null)
  const [search, setSearch] = usePersistedState('search', '')
  const [sort, setSort] = usePersistedState<Sort>('sort', 'updated')
  const [sortDir, setSortDir] = usePersistedState<'asc' | 'desc'>('sortDir', 'desc')
  const [tagId, setTagId] = usePersistedState<number | null>('tagId', null)
  const [favOnly, setFavOnly] = usePersistedState('favOnly', false)
  const [showImport, setShowImport] = useState(false)

  // Debounce the search box so each keystroke doesn't refire the media query;
  // the <input> stays bound to `search` for instant visual feedback.
  const debouncedSearch = useDebouncedValue(search, 250)

  const { data: tags = [] } = useQuery({ queryKey: qk.tags.all, queryFn: () => api.tags.list() })

  const filter: MediaListFilter = {
    mediaType: cfg.key,
    status,
    search: debouncedSearch.trim() || null,
    sort,
    sortDir,
    tagId,
    favorite: favOnly || null
  }

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

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {cfg.listTabs && (
        <div className="flex gap-1 mb-5 border-b border-base-700">
          {cfg.listTabs.map((t) => {
            const active = t.key === cfg.key
            return (
              <Link
                key={t.key}
                to={configFor(t.key).basePath}
                className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
                  active
                    ? 'border-accent text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {t.label}
              </Link>
            )
          })}
        </div>
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

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <FilterPill active={status === null} onClick={() => setStatus(null)} label="All" count={total} />
        {statuses.map((s) => (
          <FilterPill
            key={s}
            active={status === s}
            onClick={() => setStatus(s)}
            label={s}
            count={counts[s] ?? 0}
          />
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          className="input max-w-xs"
          placeholder="Search titles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input w-auto py-1.5"
          value={tagId ?? ''}
          onChange={(e) => setTagId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
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
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value="updated">Last updated</option>
            <option value="title">Title</option>
            <option value="score">Score</option>
            <option value="release">Release date</option>
          </select>
          <button
            className="btn-ghost py-1.5"
            onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            title="Toggle direction"
          >
            {sortDir === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <EmptyState cfg={cfg} onAdd={() => navigate(`${cfg.basePath}/new`)} />
      ) : (
        <>
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
      className={`rounded-full px-3 py-1 text-sm transition-colors ${
        active ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'
      }`}
    >
      {label}
      <span className={`ml-1.5 text-xs ${active ? 'text-white/70' : 'text-gray-500'}`}>
        {count}
      </span>
    </button>
  )
}

export const MediaCard = memo(function MediaCard({
  cfg,
  item
}: {
  cfg: MediaConfig
  item: MediaItem
}) {
  const sub = cfg.formatCardSub(item)
  return (
    <Link to={`${cfg.basePath}/${item.id}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <CoverImage
          path={item.coverPath}
          alt={item.title}
          rounded="rounded-lg"
          className="h-full w-full transition-transform group-hover:scale-105"
        />
        {item.score != null && (
          <span className="absolute top-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-yellow-300">
            ★ {item.score}
          </span>
        )}
        {item.status && (
          <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-200">
            {item.status}
          </span>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium line-clamp-2 group-hover:text-accent">{item.title}</p>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>
    </Link>
  )
})

function EmptyState({ cfg, onAdd }: { cfg: MediaConfig; onAdd: () => void }) {
  return (
    <div className="card p-12 text-center">
      <p className="text-lg font-medium mb-1">No {cfg.plural.toLowerCase()} here yet</p>
      <p className="text-sm text-gray-500 mb-5">
        Start logging the titles you&apos;re watching, completed, or planning.
      </p>
      <button className="btn-primary mx-auto" onClick={onAdd}>
        + Add your first {cfg.singular.toLowerCase()}
      </button>
    </div>
  )
}
