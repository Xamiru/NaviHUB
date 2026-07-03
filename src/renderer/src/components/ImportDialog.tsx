import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import type { MediaConfig } from '../lib/mediaConfig'
import type { ImportSearchResult } from '@shared/types'

interface Props {
  cfg: MediaConfig
  onClose: () => void
  onImported: (mediaId: number) => void
}

// Search an external source (AniList for anime, TMDB for movies) and import a
// title — cover, companies, cast, crew — in one click. The source comes from
// the media type's config, so this dialog is type-agnostic.
export default function ImportDialog({ cfg, onClose, onImported }: Props) {
  const qc = useQueryClient()
  const source = cfg.importSource!
  const client = api[source.key]

  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [importingId, setImportingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  const { data: results = [], isFetching } = useQuery({
    queryKey: qk.importSearch(source.key, submitted),
    queryFn: () => client.search(submitted),
    enabled: submitted.trim().length > 0
  })

  async function doImport(r: ImportSearchResult) {
    setError(null)
    setDone(null)
    setImportingId(r.id)
    try {
      const summary = await client.import(r.id)
      await qc.invalidateQueries({ queryKey: qk.media.all })
      await qc.invalidateQueries({ queryKey: qk.mediaCounts.all })
      setDone(
        `Imported “${summary.title}” — ${summary.studios} ${cfg.companyTitle.toLowerCase()}, ${summary.cast} ${cfg.castSectionTitle.toLowerCase()}, ${summary.staff} ${cfg.crewTitle.toLowerCase()}.`
      )
      setTimeout(() => onImported(summary.mediaId), 700)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed')
    } finally {
      setImportingId(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-8 overflow-y-auto"
      onMouseDown={onClose}
    >
      <div className="card w-full max-w-2xl p-5 mt-8" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Import from {source.label}</h2>
          <button className="text-gray-500 hover:text-white text-xl leading-none" onClick={onClose}>
            ×
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(query)
          }}
          className="flex gap-2 mb-4"
        >
          <input
            className="input"
            placeholder={source.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="btn-primary" type="submit">
            Search
          </button>
        </form>

        {error && <p className="text-sm text-red-400 mb-3">⚠ {error}</p>}
        {done && <p className="text-sm text-green-400 mb-3">✓ {done}</p>}
        {isFetching && <p className="text-sm text-gray-500">Searching {source.label}…</p>}

        {!isFetching && submitted && results.length === 0 && (
          <p className="text-sm text-gray-600">No results.</p>
        )}

        <div className="space-y-2">
          {results.map((r) => (
            <div key={r.id} className="flex items-center gap-3 bg-base-700 rounded-md p-2">
              {r.coverUrl ? (
                <img src={r.coverUrl} alt={r.title} className="w-12 h-16 object-cover rounded shrink-0" />
              ) : (
                <div className="w-12 h-16 rounded bg-base-600 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{r.title}</p>
                {r.native && <p className="text-xs text-gray-500 truncate">{r.native}</p>}
                <p className="text-xs text-gray-500">
                  {[r.format, r.year, r.episodes ? `${r.episodes} ep` : null]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <button
                className="btn-primary shrink-0"
                disabled={importingId !== null}
                onClick={() => doImport(r)}
              >
                {importingId === r.id ? 'Importing…' : 'Import'}
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Re-importing a title refreshes its details and keeps your status, score, and progress.
        </p>
      </div>
    </div>
  )
}
