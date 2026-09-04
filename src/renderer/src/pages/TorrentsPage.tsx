import { Link } from 'react-router-dom'
import { useSecretStorage, useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { useTorrentSearch } from '../lib/useTorrentSearch'
import { TORRENT_CATEGORY_OPTIONS } from '@shared/torrents'
import TorrentResultsPanel from '../components/TorrentResultsPanel'
import StartJackettButton from '../components/StartJackettButton'
import PageHeader from '../components/PageHeader'
import QuietWorkspace from '../components/QuietWorkspace'
import EmptyState from '../components/EmptyState'
import { Field } from '../components/Field'

// Free-form Jackett search for anything not tied to a library item (music,
// software, one-offs). Results stream in per indexer via useTorrentSearch.
export default function TorrentsPage(): React.JSX.Element {
  const { data: settings } = useSettings()
  const { data: secretStorage } = useSecretStorage()
  const configured =
    !!settings?.['jackett.url']?.trim() && !!secretStorage?.configured['jackett.api_key']

  const [query, setQuery] = usePersistedState('torrents.query', '')
  const [catIdx, setCatIdx] = usePersistedState('torrents.cat', 0)
  const cats = TORRENT_CATEGORY_OPTIONS[catIdx]?.cats ?? []
  const search = useTorrentSearch()
  // No auto-run here (unlike the prefilled dialog): the query survives
  // navigation via usePersistedState, but firing a 59-indexer fan-out every
  // time you land on the page would be a lot of tracker traffic for nothing.

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        title="Torrents"
        subtitle="Search your Jackett indexers and send results to qBittorrent."
        actions={<StartJackettButton />}
      />
      {!configured ? (
        <EmptyState
          title="Jackett is not configured"
          body="Set its URL and API key before starting an indexer search."
          action={
            <Link className="btn-primary" to="/settings?tab=integrations">
              Open integration settings
            </Link>
          }
        />
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
              className="flex flex-wrap gap-2"
            >
              <Field label="Torrent search" hiddenLabel className="contents">
                <input
                  className="input min-w-64 flex-1"
                  placeholder="Search torrents…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </Field>
              <Field label="Torrent category" hiddenLabel className="contents">
                <select
                  className="input w-auto"
                  value={catIdx}
                  onChange={(e) => setCatIdx(Number(e.target.value))}
                >
                  {TORRENT_CATEGORY_OPTIONS.map((o, i) => (
                    <option key={o.label} value={i}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <button className="btn-primary" type="submit" disabled={!query.trim()}>
                Search
              </button>
            </form>
          </QuietWorkspace>

          <QuietWorkspace
            title="Indexer stream"
            description={
              search.started
                ? 'Narrow the results already received without querying Jackett again.'
                : 'Start a search above. Results will appear as each configured indexer answers.'
            }
          >
            {search.started ? (
              <TorrentResultsPanel search={search} />
            ) : (
              <EmptyState
                title="Ready to search"
                body="Enter a title or release name, choose a category, and start the fan-out."
                className="py-10 text-center"
              />
            )}
          </QuietWorkspace>
        </>
      )}
    </div>
  )
}
