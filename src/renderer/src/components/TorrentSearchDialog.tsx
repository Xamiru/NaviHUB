import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDialog, useSecretStorage, useSettings } from '../lib/hooks'
import { useTorrentSearch } from '../lib/useTorrentSearch'
import TorrentResultsPanel from './TorrentResultsPanel'
import { Field } from './Field'

interface Props {
  heading: string // dialog title line, e.g. the media/artist name
  query: string // prefilled + auto-run search text
  categories: number[] // suggested Torznab categories ([] = search everything)
  onClose: () => void
}

// "Find torrents" dialog: query prefilled + auto-run, categories suggested by
// the caller (media type, or Audio for a music artist's discography). The
// search fans out per indexer in the main process and results stream in.
export default function TorrentSearchDialog({
  heading,
  query: initialQuery,
  categories,
  onClose
}: Props): React.JSX.Element {
  const panelRef = useDialog(onClose)
  const { data: settings } = useSettings()
  const { data: secretStorage } = useSecretStorage()
  const configured =
    !!settings?.['jackett.url']?.trim() && !!secretStorage?.configured['jackett.api_key']

  const [allCats, setAllCats] = useState(false)
  const cats = allCats || categories.length === 0 ? [] : categories
  const [query, setQuery] = useState(initialQuery)
  const search = useTorrentSearch()

  // Auto-run on open so results appear without a second click.
  const ranOnce = useRef(false)
  useEffect(() => {
    if (!ranOnce.current && configured && initialQuery.trim()) {
      ranOnce.current = true
      void search.start(initialQuery.trim(), cats)
    }
  }, [configured, initialQuery, cats, search])

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
        aria-label={`Find torrents — ${heading}`}
        tabIndex={-1}
        className="card w-full max-w-5xl p-5 mt-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Find torrents — {heading}</h2>
          <button
            className="text-gray-500 hover:text-white text-xl leading-none"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {!configured ? (
          <p className="text-sm text-gray-400">
            Jackett isn&apos;t configured. Set its URL and API key in{' '}
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
                if (query.trim()) void search.start(query.trim(), cats)
              }}
              className="flex gap-2 mb-3"
            >
              <Field label="Torrent search" hiddenLabel className="contents">
                <input
                  className="input"
                  placeholder="Search your Jackett indexers…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </Field>
              <button className="btn-primary" type="submit" disabled={!query.trim()}>
                Search
              </button>
            </form>

            {categories.length > 0 && (
              <div className="flex gap-2 mb-4 text-sm">
                <button
                  className={`chip ${!allCats ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setAllCats(false)}
                >
                  Suggested ({categories.join(', ')})
                </button>
                <button
                  className={`chip ${allCats ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setAllCats(true)}
                >
                  All categories
                </button>
              </div>
            )}

            <TorrentResultsPanel search={search} />
          </>
        )}
      </div>
    </div>
  )
}
