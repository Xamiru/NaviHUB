import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog } from '../lib/hooks'
import { toastError } from '../lib/toast'
import type { ImageKind, MediaDetail, WallpaperSearchResult } from '@shared/types'

interface Props {
  m: MediaDetail
  kind: ImageKind
  onClose: () => void
}

// Browse online wallpaper sources and save picks straight into the library.
// Wallhaven works for every media type (search prefilled with the title);
// movies/TV imported from TMDB additionally get the official backdrops tab.
// Searches run in the main process (renderer CSP blocks remote fetch); the
// thumbnails themselves are plain remote <img>, which img-src allows.
export default function ImageBrowseDialog({ m, kind, onClose }: Props): React.JSX.Element {
  const qc = useQueryClient()
  const panelRef = useDialog(onClose)

  const hasTmdb =
    (m.mediaType === 'movie' || m.mediaType === 'tv') &&
    m.externalSource === 'tmdb' &&
    !!m.externalId
  const [source, setSource] = useState<'wallhaven' | 'tmdb'>('wallhaven')

  // Prefilled + auto-submitted with the title, so results appear on open.
  const [query, setQuery] = useState(m.title)
  const [submitted, setSubmitted] = useState(m.title)
  const [page, setPage] = useState(1)

  // fullUrl -> transient tile state; settled "added" comes from the list query.
  const [pending, setPending] = useState<Record<string, 'busy' | 'added'>>({})

  const wallhaven = useQuery({
    queryKey: qk.pictures.wallhaven(submitted, page),
    queryFn: () => api.pictures.searchWallhaven(submitted, page),
    enabled: source === 'wallhaven' && submitted.trim().length > 0
  })
  const tmdb = useQuery({
    queryKey: qk.pictures.tmdb(m.id),
    queryFn: () => api.pictures.searchTmdb(m.id),
    enabled: source === 'tmdb'
  })
  // Shares the section's cache entry — used to mark already-saved results.
  const { data: existing = [] } = useQuery({
    queryKey: qk.pictures.list(m.id, kind),
    queryFn: () => api.pictures.list(m.id, kind)
  })

  const active = source === 'wallhaven' ? wallhaven : tmdb
  const results = active.data?.results ?? []
  const lastPage = source === 'wallhaven' ? (wallhaven.data?.lastPage ?? 1) : 1

  function statusOf(r: WallpaperSearchResult): 'busy' | 'added' | undefined {
    return pending[r.fullUrl] ?? (existing.some((i) => i.sourceUrl === r.fullUrl) ? 'added' : undefined)
  }

  async function pick(r: WallpaperSearchResult): Promise<void> {
    if (statusOf(r)) return
    setPending((p) => ({ ...p, [r.fullUrl]: 'busy' }))
    try {
      await api.pictures.addFromSearch(m.id, kind, r)
      setPending((p) => ({ ...p, [r.fullUrl]: 'added' }))
      qc.invalidateQueries({ queryKey: qk.pictures.list(m.id, kind) })
    } catch (e) {
      setPending((p) => {
        const next = { ...p }
        delete next[r.fullUrl]
        return next
      })
      toastError(e)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-8 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Browse ${kind === 'wallpaper' ? 'wallpapers' : 'fan art'}`}
        tabIndex={-1}
        className="card w-full max-w-4xl p-5 mt-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            Browse {kind === 'wallpaper' ? 'wallpapers' : 'fan art'} — {m.title}
          </h2>
          <button
            className="text-gray-500 hover:text-white text-xl leading-none"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {hasTmdb && (
          <div className="flex gap-2 mb-4">
            {(
              [
                ['wallhaven', 'Wallhaven'],
                ['tmdb', 'TMDB backdrops']
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                className={`px-3 py-1 rounded-md text-sm ${
                  source === key ? 'bg-base-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSource(key)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {source === 'wallhaven' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(query)
              setPage(1)
            }}
            className="flex gap-2 mb-4"
          >
            <input
              className="input"
              placeholder="Search Wallhaven…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button className="btn-primary" type="submit">
              Search
            </button>
          </form>
        )}

        {active.isFetching && (
          <p className="text-sm text-gray-500 mb-3">
            {source === 'wallhaven' ? 'Searching Wallhaven…' : 'Loading TMDB backdrops…'}
          </p>
        )}
        {active.isError && (
          <p className="text-sm text-red-400 mb-3">
            ⚠ {active.error instanceof Error ? active.error.message : 'Search failed'}
          </p>
        )}
        {!active.isFetching && !active.isError && results.length === 0 && (
          <p className="text-sm text-gray-400 mb-3">No results.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {results.map((r) => {
            const status = statusOf(r)
            return (
              <button
                key={r.fullUrl}
                className="group relative aspect-video overflow-hidden rounded-md bg-base-700 text-left"
                onClick={() => void pick(r)}
                disabled={status === 'added'}
                title={status === 'added' ? 'Already saved' : 'Save to library'}
              >
                <img
                  src={r.thumbUrl}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform group-hover:scale-105 ${
                    status === 'added' ? 'opacity-40' : ''
                  }`}
                />
                {r.width && r.height && (
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-300">
                    {r.width}×{r.height}
                  </span>
                )}
                {status && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium">
                    {status === 'busy' ? 'Saving…' : '✓ Added'}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {source === 'wallhaven' && lastPage > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <button
              className="btn-ghost"
              disabled={page <= 1 || active.isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="text-gray-400 tabular-nums">
              {page} / {lastPage}
            </span>
            <button
              className="btn-ghost"
              disabled={page >= lastPage || active.isFetching}
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            >
              Next
            </button>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Click an image to download it into your pictures folder. Results are safe-for-work only.
        </p>
      </div>
    </div>
  )
}
