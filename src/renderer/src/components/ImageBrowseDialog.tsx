import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog } from '../lib/hooks'
import { toastError } from '../lib/toast'
import type {
  ImageKind,
  MediaDetail,
  WallpaperSearchResult,
  WallpaperSource,
  WallpaperSourceInfo
} from '@shared/types'
import { Field } from './Field'
import Tabs, { TabPanel } from './Tabs'

interface Props {
  m: MediaDetail
  kind: ImageKind
  onClose: () => void
}

// Browse online art sources and save picks straight into the library. The
// backend decides which sources a title gets (pictures.listSources) and in what
// order; searchable ones open prefilled with the title. Nothing is fetched
// until the user presses Search (or Load for a source with no query box).
// Searches run in the
// main process (renderer CSP blocks remote fetch); the thumbnails themselves
// are plain remote <img>, which img-src allows.
export default function ImageBrowseDialog({ m, kind, onClose }: Props): React.JSX.Element {
  const panelRef = useDialog(onClose)
  const label = kind === 'wallpaper' ? 'wallpapers' : 'fan art'

  const sources = useQuery({
    queryKey: qk.pictures.sources(m.id, kind),
    queryFn: () => api.pictures.sources(m.id, kind)
  })
  const list = sources.data ?? []
  const [picked, setPicked] = useState<WallpaperSource | null>(null)
  const current = list.find((s) => s.source === picked) ?? list[0]
  const tabsId = `browse-${m.id}-${kind}`

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
        aria-label={`Browse ${label}`}
        tabIndex={-1}
        className="card w-full max-w-4xl p-5 mt-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            Browse {label} — {m.title}
          </h2>
          <button
            className="text-gray-500 hover:text-white text-xl leading-none"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {sources.isError && <p className="text-sm text-red-400 mb-3">Could not load sources.</p>}
        {current && list.length > 1 && (
          <Tabs
            id={tabsId}
            label="Image source"
            tabs={list.map((s) => ({ key: s.source, label: s.label }))}
            value={current.source}
            onChange={setPicked}
            className="mb-4"
          />
        )}
        {current && (
          <TabPanel tabsId={tabsId} value={current.source}>
            {/* Keyed so each source keeps no stale query/page from another. */}
            <SourcePanel key={current.source} m={m} kind={kind} info={current} />
          </TabPanel>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Click an image to download it into your pictures folder. Results are safe-for-work only.
        </p>
      </div>
    </div>
  )
}

function SourcePanel({
  m,
  kind,
  info
}: {
  m: MediaDetail
  kind: ImageKind
  info: WallpaperSourceInfo
}): React.JSX.Element {
  const qc = useQueryClient()
  const [query, setQuery] = useState(info.query ?? '')
  // null until the user starts a search; a source with no query box submits ''.
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  // fullUrl -> transient tile state; settled "added" comes from the list query.
  const [pending, setPending] = useState<Record<string, 'busy' | 'added'>>({})

  const searchable = info.query !== null
  const search = useQuery({
    queryKey: qk.pictures.search(m.id, info.source, submitted ?? '', page),
    queryFn: () => api.pictures.search(m.id, info.source, submitted ?? '', page),
    enabled:
      !info.needsKey && submitted !== null && (!searchable || submitted.trim().length > 0),
    // Keep the grid and pager up while the next page loads.
    placeholderData: (previous) => previous
  })
  // Shares the section's cache entry — used to mark already-saved results.
  const { data: existing = [] } = useQuery({
    queryKey: qk.pictures.list(m.id, kind),
    queryFn: () => api.pictures.list(m.id, kind)
  })

  const results = search.data?.results ?? []
  const lastPage = search.data?.lastPage ?? 1
  // Danbooru searches by character tag far better than by title.
  const characters = info.source === 'danbooru' ? m.characters.slice(0, 8) : []

  function run(text: string): void {
    setQuery(text)
    setSubmitted(text)
    setPage(1)
  }

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

  if (info.needsKey) {
    return (
      <p className="text-sm text-gray-400">
        Add your {info.needsKey} API key in Settings → Keys to browse this source.
      </p>
    )
  }

  return (
    <>
      {searchable && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(query)
          }}
          className="flex gap-2 mb-3"
        >
          <Field label={`Search ${info.label}`} hiddenLabel className="contents">
            <input
              className="input"
              placeholder={`Search ${info.label}…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </Field>
          <button className="btn-primary" type="submit">
            Search
          </button>
        </form>
      )}

      {!searchable && submitted === null && (
        <button className="btn-primary mb-3" type="button" onClick={() => run('')}>
          Load {info.label}
        </button>
      )}

      {characters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-gray-400">Characters</span>
          {characters.map(({ character }) => (
            <button
              key={character.id}
              type="button"
              className={submitted === character.name ? 'pill pill-active' : 'pill'}
              onClick={() => run(character.name)}
            >
              {character.name}
            </button>
          ))}
        </div>
      )}

      {search.data?.resolved && search.data.resolved !== submitted && (
        <p className="text-xs text-gray-400 mb-3">Showing tag {search.data.resolved}</p>
      )}
      {search.isFetching && <p className="text-sm text-gray-500 mb-3">Loading {info.label}…</p>}
      {search.isError && (
        <p className="text-sm text-red-400 mb-3">
          {search.error instanceof Error ? search.error.message : 'Search failed'}
        </p>
      )}
      {search.isSuccess && !search.isFetching && results.length === 0 && (
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
                <span className="media-contrast absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-300">
                  {r.width}×{r.height}
                </span>
              )}
              {status && (
                <span className="media-contrast absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium">
                  {status === 'busy' ? 'Saving…' : '✓ Added'}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {lastPage > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 text-sm">
          <button
            className="btn-ghost"
            disabled={page <= 1 || search.isFetching}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span className="text-gray-400 tabular-nums">Page {page}</span>
          <button
            className="btn-ghost"
            disabled={page >= lastPage || search.isFetching}
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}
