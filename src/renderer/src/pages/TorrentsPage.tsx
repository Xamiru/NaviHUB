import { Link } from 'react-router-dom'
import { useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { useTorrentSearch } from '../lib/useTorrentSearch'
import { TORRENT_CATEGORY_OPTIONS } from '@shared/torrents'
import TorrentResultsPanel from '../components/TorrentResultsPanel'
import StartJackettButton from '../components/StartJackettButton'
import PageHeader from '../components/PageHeader'
import TasksTabs from '../components/TasksTabs'
import QuietWorkspace from '../components/QuietWorkspace'

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
      <PageHeader
        title="Torrents"
        subtitle="Search your Jackett indexers and send results to qBittorrent."
        actions={<StartJackettButton />}
      />
      <TasksTabs value="torrents" />

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
          <QuietWorkspace
            title="Indexer search"
            description="Results stream in as each configured indexer answers."
          >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (query.trim()) void search.start(query.trim(), cats)
            }}
            className="mb-5 flex flex-wrap gap-2"
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
          </QuietWorkspace>
        </>
      )}
    </div>
  )
}
