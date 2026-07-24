import { useMemo, useState } from 'react'
import {
  applyTorrentFilters,
  EMPTY_TORRENT_FILTER,
  relevanceFilter,
  type SizeUnit
} from '@shared/torrents'
import type { TorrentFilter } from '@shared/types'
import type { TorrentSearchState } from '../lib/useTorrentSearch'
import TorrentFilterBar from './TorrentFilterBar'
import TorrentResultsTable from './TorrentResultsTable'
import StartJackettButton from './StartJackettButton'

// Everything below the search box, shared by the Torrents page and the
// per-media dialog: live progress while indexers report in, client-side
// filters over what's arrived, and the results table.
export default function TorrentResultsPanel({
  search
}: {
  search: TorrentSearchState
}): React.JSX.Element {
  const [filter, setFilter] = useState<TorrentFilter>(EMPTY_TORRENT_FILTER)
  const [relevantOnly, setRelevantOnly] = useState(true)
  const [sizeText, setSizeText] = useState<{ min: string; max: string; unit: SizeUnit }>({
    min: '',
    max: '',
    unit: 'GiB'
  })

  // Raw results -> word-boundary relevance (default on, kills "akagi"->"Wakagimi"
  // substring bleed) -> the manual filter bar -> the table.
  const relevant = useMemo(
    () => (relevantOnly && search.query ? relevanceFilter(search.results, search.query) : search.results),
    [search.results, search.query, relevantOnly]
  )
  const hiddenByRelevance = search.results.length - relevant.length
  const trackers = useMemo(() => [...new Set(relevant.map((r) => r.tracker))].sort(), [relevant])
  const filtered = useMemo(() => applyTorrentFilters(relevant, filter), [relevant, filter])

  if (search.error)
    return (
      <div className="flex items-center gap-3">
        <p className="text-sm text-red-400">{search.error}</p>
        <StartJackettButton className="btn-ghost px-2.5 py-1 text-xs" />
      </div>
    )

  if (!search.started) return <></>

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-400 tabular-nums">
          {search.running
            ? `Searching… ${search.indexerDone}/${search.indexerTotal} indexers`
            : `${search.indexerDone}/${search.indexerTotal} indexers searched`}
          {' · '}
          {filtered.length === search.results.length
            ? `${search.results.length} results`
            : `${filtered.length} of ${search.results.length} results`}
        </span>
        <button
          className={`chip text-xs ${relevantOnly ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setRelevantOnly((v) => !v)}
          title="Only show results whose title contains every word you searched, as whole words"
        >
          Relevant only{relevantOnly && hiddenByRelevance > 0 ? ` · ${hiddenByRelevance} hidden` : ''}
        </button>
        {search.running && (
          <button className="btn-ghost px-2.5 py-1 text-xs" onClick={search.cancel}>
            Stop
          </button>
        )}
      </div>

      {relevant.length > 0 && (
        <TorrentFilterBar
          filter={filter}
          onChange={setFilter}
          trackers={trackers}
          sizeText={sizeText}
          onSizeText={setSizeText}
        />
      )}

      {filtered.length > 0 ? (
        <TorrentResultsTable results={filtered} indexerErrors={search.indexerErrors} />
      ) : (
        <p className="text-sm text-gray-400">
          {search.running
            ? 'Waiting for the first results…'
            : search.results.length === 0
              ? 'No results.'
              : relevant.length === 0
                ? 'No exact matches — turn off "Relevant only" to see all results.'
                : 'No results match these filters.'}
        </p>
      )}
    </div>
  )
}
