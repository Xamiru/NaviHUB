import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { TORRENT_CATEGORY_OPTIONS } from '@shared/torrents'
import TorrentResultsTable from '../components/TorrentResultsTable'

// Free-form Jackett search for anything not tied to a library item (music,
// software, one-offs). Same query cache + results table as the per-media
// TorrentSearchDialog; state survives Back via usePersistedState.
export default function TorrentsPage(): React.JSX.Element {
  const { data: settings } = useSettings()
  const configured = !!settings?.['jackett.url']?.trim() && !!settings?.['jackett.api_key']?.trim()

  const [query, setQuery] = usePersistedState('torrents.query', '')
  const [submitted, setSubmitted] = usePersistedState('torrents.submitted', '')
  const [catIdx, setCatIdx] = usePersistedState('torrents.cat', 0)
  const cats = TORRENT_CATEGORY_OPTIONS[catIdx]?.cats ?? []

  const search = useQuery({
    queryKey: qk.torrents.search(submitted, cats),
    queryFn: () => api.torrents.search(submitted, cats),
    enabled: configured && submitted.trim().length > 0,
    // Main already retried; a Jackett-down error must not triple the wait.
    retry: false
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Torrents</h1>
      <p className="text-sm text-gray-400 mb-5">
        Search your Jackett indexers and send results to qBittorrent.
      </p>

      {!configured ? (
        <div className="card p-5 text-sm text-gray-400">
          Jackett isn't configured. Set its URL and API key in{' '}
          <Link className="text-accent hover:underline" to="/settings">
            Settings → Tools
          </Link>
          .
        </div>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(query)
            }}
            className="flex gap-2 mb-5"
          >
            <input
              className="input"
              placeholder="Search torrents…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <select
              className="input w-auto"
              aria-label="Category"
              value={catIdx}
              onChange={(e) => setCatIdx(Number(e.target.value))}
            >
              {TORRENT_CATEGORY_OPTIONS.map((o, i) => (
                <option key={o.label} value={i}>
                  {o.label}
                </option>
              ))}
            </select>
            <button className="btn-primary" type="submit">
              Search
            </button>
          </form>

          {search.isFetching && <p className="text-sm text-gray-500 mb-3">Searching Jackett…</p>}
          {search.isError && (
            <p className="text-sm text-red-400 mb-3">
              {search.error instanceof Error ? search.error.message : 'Search failed'}
            </p>
          )}
          {!search.isFetching &&
            !search.isError &&
            submitted.trim().length > 0 &&
            (search.data?.results.length ?? 0) === 0 && (
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
  )
}
