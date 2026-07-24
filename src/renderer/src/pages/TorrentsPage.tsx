import { Link } from 'react-router-dom'
import { useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { useTorrentSearch } from '../lib/useTorrentSearch'
import { TORRENT_CATEGORY_OPTIONS } from '@shared/torrents'
import TorrentResultsPanel from '../components/TorrentResultsPanel'
import StartJackettButton from '../components/StartJackettButton'

// Free-form Jackett search for anything not tied to a library item (music,
// software, one-offs). Results stream in per indexer via useTorrentSearch.
export default function TorrentsPage(): React.JSX.Element {
  const { data: settings } = useSettings()
  const configured = !!settings?.['jackett.url']?.trim() && !!settings?.['jackett.api_key']?.trim()

  const [query, setQuery] = usePersistedState('torrents.query', '')
  const [catIdx, setCatIdx] = usePersistedState('torrents.cat', 0)
  const cats = TORRENT_CATEGORY_OPTIONS[catIdx]?.cats ?? []
  const search = useTorrentSearch()
  // No auto-run here (unlike the prefilled dialog): the query survives
  // navigation via usePersistedState, but firing a 59-indexer fan-out every
  // time you land on the page would be a lot of tracker traffic for nothing.

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Torrents</h1>
          <p className="text-sm text-gray-400">
            Search your Jackett indexers and send results to qBittorrent.
          </p>
        </div>
        <StartJackettButton />
      </div>

      {!configured ? (
        <div className="card p-5 text-sm text-gray-400">
          Jackett isn&apos;t configured. Set its URL and API key in{' '}
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
              if (query.trim()) void search.start(query.trim(), cats)
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
            <button className="btn-primary" type="submit" disabled={!query.trim()}>
              Search
            </button>
          </form>

          <TorrentResultsPanel search={search} />
        </>
      )}
    </div>
  )
}
