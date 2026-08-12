import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog } from '../lib/hooks'
import { useActivity, activityText } from './ActivityIndicator'
import type { MediaConfig } from '../lib/mediaConfig'
import type { ImportSearchResult, ImportSummary } from '@shared/types'

interface Props {
  cfg: MediaConfig
  onClose: () => void
  onImported: (mediaId: number) => void
  // Prefills and auto-runs the search — used when the caller already knows what
  // the user is after (a greyed relation on a detail page).
  initialQuery?: string
}

// Search an external source (AniList for anime, TMDB for movies) and import a
// title — cover, companies, cast, crew — in one click. The source comes from
// the media type's config, so this dialog is type-agnostic. A type with
// several sources (games: Steam + the offline catalog) gets a pill switcher;
// the search cache is already per-source (qk.importSearch keys on source.key).
export default function ImportDialog({ cfg, onClose, onImported, initialQuery }: Props) {
  const qc = useQueryClient()
  const sources = cfg.importSources ?? [cfg.importSource!]
  const [source, setSource] = useState(sources[0])
  // The union of importer groups intersects import's parameter to never (ids
  // are number for most sources, string for Open Library) — flatten it once.
  const client = api[source.key] as {
    search(query: string): Promise<ImportSearchResult[]>
    import(id: number | string): Promise<ImportSummary>
  }

  // The offline catalog is a one-time download — until it's installed, its
  // pill shows an install panel instead of a search that can only error.
  const isCatalog = source.key === 'rawgCatalog'
  const { data: catalogStatus } = useQuery({
    queryKey: qk.gamesCatalog.status,
    queryFn: () => api.rawgCatalog.status(),
    enabled: isCatalog
  })
  const [installing, setInstalling] = useState(false)
  const catalogMissing = isCatalog && catalogStatus != null && !catalogStatus.installed

  async function installCatalog() {
    setInstalling(true)
    setError(null)
    try {
      await api.rawgCatalog.install()
      await qc.invalidateQueries({ queryKey: qk.gamesCatalog.status })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Catalog install failed')
    } finally {
      setInstalling(false)
    }
  }

  // Bulk "top games" shelf — a long run (covers download per title), safely
  // re-runnable: already-imported titles are skipped, so an interrupted run
  // resumes by pressing the button again.
  const [bulkCount, setBulkCount] = useState('2000')
  const [bulkBusy, setBulkBusy] = useState(false)

  async function runBulk() {
    setBulkBusy(true)
    setError(null)
    setDone(null)
    try {
      const res = await api.rawgCatalog.bulkImport(Number(bulkCount) || 0)
      await qc.invalidateQueries({ queryKey: qk.media.all })
      await qc.invalidateQueries({ queryKey: qk.mediaCounts.all })
      setDone(
        `Bulk import finished — ${res.imported} imported, ${res.skipped} already in the library${res.failed ? `, ${res.failed} failed` : ''}.`
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bulk import failed')
    } finally {
      setBulkBusy(false)
    }
  }

  const [query, setQuery] = useState(initialQuery ?? '')
  // Auto-run when the caller supplied the query: the user already chose what
  // to import, so making them press Search again is pure ceremony.
  const [submitted, setSubmitted] = useState(initialQuery ?? '')
  const [importingId, setImportingId] = useState<number | string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)
  const panelRef = useDialog(onClose)

  const { data: results = [], isFetching } = useQuery({
    queryKey: qk.importSearch(source.key, submitted),
    queryFn: () => client.search(submitted),
    enabled: submitted.trim().length > 0 && !catalogMissing
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
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Import from ${source.label}`}
        tabIndex={-1}
        className="card w-full max-w-2xl p-5 mt-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Import from {source.label}</h2>
          <button
            className="text-gray-500 hover:text-white text-xl leading-none"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {sources.length > 1 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {sources.map((s) => (
              <button
                key={s.key}
                className={s.key === source.key ? 'pill pill-active' : 'pill'}
                onClick={() => {
                  setSource(s)
                  setError(null)
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {catalogMissing && (
          <div className="mb-4 rounded-md bg-base-700/60 p-4">
            <p className="text-sm text-gray-300">
              The offline catalog is a one-time ~55 MB download (RAWG&apos;s final dataset,
              ~120k games incl. consoles). Search is instant and local afterwards.
            </p>
            <button
              className="btn-primary mt-3"
              onClick={installCatalog}
              disabled={installing}
            >
              {installing ? 'Downloading…' : 'Install catalog'}
            </button>
            {installing && <ImportProgress />}
          </div>
        )}

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

        {isCatalog && catalogStatus?.installed && (
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500">Bulk: import the top</span>
            <input
              type="number"
              className="input w-24"
              min={1}
              max={10000}
              value={bulkCount}
              onChange={(e) => setBulkCount(e.target.value)}
              disabled={bulkBusy}
              aria-label="Bulk import count"
            />
            <span className="text-gray-500">most popular games</span>
            <button className="btn-ghost" onClick={runBulk} disabled={bulkBusy || importingId !== null}>
              {bulkBusy ? 'Importing…' : 'Run'}
            </button>
            <span className="text-xs text-gray-500">
              Skips titles you already have — safe to re-run if interrupted.
            </span>
          </div>
        )}

        {error && <p className="text-sm text-red-400 mb-3">⚠ {error}</p>}
        {done && <p className="text-sm text-green-400 mb-3">✓ {done}</p>}
        {(importingId !== null || bulkBusy) && <ImportProgress />}
        {isFetching && <p className="text-sm text-gray-500">Searching {source.label}…</p>}

        {!isFetching && submitted && results.length === 0 && (
          <p className="text-sm text-gray-400">No results.</p>
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
                  {[r.format, r.year, r.episodes ? `${r.episodes} ${source.unitNoun ?? 'ep'}` : null]
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

        <p className="text-xs text-gray-400 mt-4">
          Re-importing a title refreshes its details and keeps your status, score, and progress.
        </p>
      </div>
    </div>
  )
}

// Live phase + progress of the running import (polled from the main process's
// activity slot). Image download is the long phase, so it gets a real bar;
// fetch/write phases show an indeterminate pulse.
function ImportProgress() {
  const s = useActivity(true)
  if (!s?.active) return <p className="text-sm text-gray-500 mb-3">Starting import…</p>
  const pct =
    (s.phase === 'images' || s.phase === 'audio') && s.total > 0
      ? Math.round((s.done / s.total) * 100)
      : null
  return (
    <div className="mb-3 rounded-md bg-base-700/60 p-3">
      <div className="mb-1 flex justify-between text-xs text-gray-400">
        <span>{activityText(s)}</span>
        {pct != null && <span className="tabular-nums">{pct}%</span>}
      </div>
      <div className="h-1.5 overflow-hidden rounded bg-base-600">
        <div
          className={`h-full bg-accent transition-all ${pct == null ? 'w-full animate-pulse' : ''}`}
          style={pct != null ? { width: `${pct}%` } : undefined}
        />
      </div>
    </div>
  )
}
