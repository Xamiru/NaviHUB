import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog, useSettings } from '../lib/hooks'
import { torznabCategoriesFor } from '@shared/torrents'
import type { MediaType } from '@shared/types'
import TorrentResultsTable from './TorrentResultsTable'

interface Props {
  title: string
  mediaType: MediaType
  onClose: () => void
}

// "Find torrents" dialog on media detail pages: query prefilled + auto-run
// from the title, categories preselected from the media type. Searches run in
// the main process against Jackett (renderer CSP blocks remote fetch); Add
// hands the row to qBittorrent (TorrentResultsTable).
export default function TorrentSearchDialog({ title, mediaType, onClose }: Props): React.JSX.Element {
  const panelRef = useDialog(onClose)
  const { data: settings } = useSettings()
  const configured = !!settings?.['jackett.url']?.trim() && !!settings?.['jackett.api_key']?.trim()

  const mappedCats = torznabCategoriesFor(mediaType)
  const [allCats, setAllCats] = useState(false)
  const cats = allCats ? [] : mappedCats

  // Prefilled + auto-submitted with the title, so results appear on open.
  const [query, setQuery] = useState(title)
  const [submitted, setSubmitted] = useState(title)

  const search = useQuery({
    queryKey: qk.torrents.search(submitted, cats),
    queryFn: () => api.torrents.search(submitted, cats),
    enabled: configured && submitted.trim().length > 0,
    // Main already retried; a Jackett-down error must not triple the wait.
    retry: false
  })

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-8 overflow-y-auto"
      onMouseDown={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Find torrents — ${title}`}
        tabIndex={-1}
        className="card w-full max-w-5xl p-5 mt-4"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Find torrents — {title}</h2>
          <button
            className="text-gray-500 hover:text-white text-xl leading-none"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {!configured ? (
          <p className="text-sm text-gray-400">
            Jackett isn't configured. Set its URL and API key in{' '}
            <Link className="text-accent hover:underline" to="/settings" onClick={onClose}>
              Settings → Tools
            </Link>
            .
          </p>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(query)
              }}
              className="flex gap-2 mb-3"
            >
              <input
                className="input"
                placeholder="Search your Jackett indexers…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button className="btn-primary" type="submit">
                Search
              </button>
            </form>

            <div className="flex gap-2 mb-4 text-sm">
              <button
                className={`chip ${!allCats ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setAllCats(false)}
              >
                Mapped ({mappedCats.join(', ')})
              </button>
              <button
                className={`chip ${allCats ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setAllCats(true)}
              >
                All categories
              </button>
            </div>

            {search.isFetching && <p className="text-sm text-gray-500 mb-3">Searching Jackett…</p>}
            {search.isError && (
              <p className="text-sm text-red-400 mb-3">
                {search.error instanceof Error ? search.error.message : 'Search failed'}
              </p>
            )}
            {!search.isFetching && !search.isError && (search.data?.results.length ?? 0) === 0 && (
              <p className="text-sm text-gray-400 mb-3">No results.</p>
            )}
            {search.data && search.data.results.length > 0 && (
              <TorrentResultsTable
                results={search.data.results}
                indexerErrors={search.data.indexerErrors}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
