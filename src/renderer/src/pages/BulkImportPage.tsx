import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useIncrementalList } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { useBulkRun } from '../lib/useBulkRun'
import { useRefreshRun } from '../lib/useRefreshRun'
import { toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import Tabs, { TabPanel } from '../components/Tabs'
import RefreshTab from '../components/RefreshTab'
import { Group, Pill } from '../components/PillGroup'
import { BULK_SOURCES, bulkSourceCfg, type BulkSourceKey } from '@shared/bulkImport'
import type { BulkListParams, BulkPreviewItem } from '@shared/types'
import type { RefreshRequest } from '@shared/refresh'
import QuietWorkspace from '../components/QuietWorkspace'
import EmptyState from '../components/EmptyState'
import OperationFlow, { type OperationFlowStep } from '../components/OperationFlow'

const SEASONS = ['winter', 'spring', 'summer', 'fall'] as const

// Scores arrive on each source's native scale (TMDB 0-10 with long decimals,
// AniList/Metacritic 0-100, RAWG 0-5) — just trim, don't rescale.
function fmtScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(1)
}

// Bulk import: top-N lists per media type, previewed before anything runs.
// Preview is a plain await in the button handler (NOT useQuery — an enabled
// query refetches on remount, and 20 AniList pages per visit is exactly the
// auto-run traffic the Torrents page's comment warns about). The run itself
// lives in main (bulkImport.ts singleton) and is followed via useBulkRun.
export default function BulkImportPage(): React.JSX.Element {
  const qc = useQueryClient()
  const [sourceKey, setSourceKey] = usePersistedState<BulkSourceKey>('bulk.source', 'anime')
  const [sortByType, setSortByType] = usePersistedState<Record<string, string>>('bulk.sort', {})
  const [count, setCount] = usePersistedState('bulk.count', '100')
  const [yearFrom, setYearFrom] = usePersistedState('bulk.yearFrom', '')
  const [yearTo, setYearTo] = usePersistedState('bulk.yearTo', '')
  // Keyed by source (the sortByType shape): 'Horror' picked for Movies must not
  // silently ride into Anime just because both genre lists contain the name.
  const [genreByType, setGenreByType] = usePersistedState<Record<string, string>>('bulk.genre', {})
  // Import fills the shelf; Refresh updates what is already on it.
  const [tab, setTab] = usePersistedState<'import' | 'refresh'>('bulk.tab', 'import')
  const [season, setSeason] = usePersistedState('bulk.season', '')
  const [seasonYear, setSeasonYear] = usePersistedState('bulk.seasonYear', '')

  const cfg = bulkSourceCfg(sourceKey)
  const sort = cfg.sorts.some((s) => s.key === sortByType[sourceKey])
    ? sortByType[sourceKey]
    : cfg.sorts[0].key
  const genreOptions = cfg.genres ?? (cfg.genreIds ? Object.keys(cfg.genreIds) : [])
  const genre = genreByType[sourceKey] ?? ''
  const activeGenre = cfg.hasGenre && genreOptions.includes(genre) ? genre : null

  // The offline games catalog must be installed before its lists exist.
  const { data: catalogStatus } = useQuery({
    queryKey: qk.gamesCatalog.status,
    queryFn: () => api.rawgCatalog.status(),
    enabled: !!cfg.offline
  })
  const catalogMissing = !!cfg.offline && catalogStatus != null && !catalogStatus.installed
  const [installing, setInstalling] = useState(false)

  const [previewing, setPreviewing] = useState(false)
  // Persisted (the filters convention): a preview can cost ~80s of throttled
  // AniList paging, so Back into a detail page must not throw it away — nor
  // the per-row selection clicks made on it.
  const [preview, setPreview] = usePersistedState<{
    params: BulkListParams
    items: BulkPreviewItem[]
  } | null>('bulk.preview', null)
  const [deselected, setDeselected] = usePersistedState<Set<number>>('bulk.deselected', new Set())

  const run = useBulkRun()
  const runStatus = run.status

  function switchSource(key: BulkSourceKey): void {
    setSourceKey(key)
    setPreview(null)
  }

  function buildParams(): BulkListParams {
    const params: BulkListParams = {
      source: sourceKey,
      sort,
      count: Math.max(1, Math.min(cfg.maxCount, Math.floor(Number(count) || 0) || 100))
    }
    if (Number(yearFrom)) params.yearFrom = Number(yearFrom)
    if (Number(yearTo)) params.yearTo = Number(yearTo)
    if (activeGenre) params.genre = activeGenre
    if (cfg.hasSeason && season && Number(seasonYear)) {
      params.season = season
      params.seasonYear = Number(seasonYear)
    }
    return params
  }

  async function runPreview(): Promise<void> {
    setPreviewing(true)
    try {
      const params = buildParams()
      const items = await api.bulk.preview(params)
      setPreview({ params, items })
      // The preview contains only NEW titles (main excludes the library and
      // tops the list up) — everything starts selected.
      setDeselected(new Set())
    } finally {
      setPreviewing(false)
    }
  }

  async function startImport(): Promise<void> {
    if (!preview) return
    const items = preview.items
      .filter((it) => !deselected.has(it.sourceId))
      .map((it) => ({ sourceId: it.sourceId, title: it.title }))
    await api.bulk.start({ source: preview.params.source, items })
    setPreview(null)
    await run.kick()
  }

  async function stopRun(): Promise<void> {
    await api.bulk.cancel()
    await run.kick()
  }

  async function installCatalog(): Promise<void> {
    setInstalling(true)
    try {
      await api.rawgCatalog.install()
      await qc.invalidateQueries({ queryKey: qk.gamesCatalog.status })
    } finally {
      setInstalling(false)
    }
  }

  const selectedCount = preview ? preview.items.length - deselected.size : 0

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <PageHeader
        title="Bulk Import"
        subtitle={
          tab === 'import'
            ? 'Fill a shelf in one run — preview a top list, then import the whole selection.'
            : 'Care for what you already own — refresh source metadata or maintain local files.'
        }
      />

      <Tabs
        id="bulk-import-mode"
        label="Bulk import mode"
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'import', label: 'Import' },
          { key: 'refresh', label: 'Refresh' }
        ]}
      />

      <TabPanel tabsId="bulk-import-mode" value={tab}>
        {tab === 'refresh' ? (
          <RefreshTab />
        ) : (
          <>
          <MissingAnimeThemesTool bulkRunning={!!runStatus && runStatus.state === 'running'} />
          <ImportFlow
            previewReady={!!preview}
            running={!!runStatus && runStatus.state === 'running'}
            finished={!!runStatus && runStatus.state === 'done'}
          />
          <QuietWorkspace
            title="Configure list"
            description="Choose the source and limits before NaviHUB fetches any preview rows."
          >
            <div className="space-y-4">
        <Group label="Type">
          {BULK_SOURCES.map((s) => (
            <Pill key={s.key} active={s.key === sourceKey} onClick={() => switchSource(s.key)} label={s.label} />
          ))}
        </Group>

        <Group label="List">
          {cfg.sorts.map((s) => (
            <Pill
              key={s.key}
              active={s.key === sort}
              onClick={() => setSortByType({ ...sortByType, [sourceKey]: s.key })}
              label={s.label}
            />
          ))}
        </Group>

        {catalogMissing ? (
          <div className="rounded-md bg-base-700/60 p-4">
            <p className="text-sm text-gray-300">
              The offline games catalog is a one-time ~55 MB download (RAWG&apos;s final dataset, ~120k
              games incl. consoles). Lists are instant and local afterwards.
            </p>
            <button className="btn-primary mt-3" onClick={installCatalog} disabled={installing}>
              {installing ? 'Downloading…' : 'Install catalog'}
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-4">
              <label className="block">
                <span className="label">Top</span>
                <input
                  type="number"
                  className="input w-24"
                  min={1}
                  max={cfg.maxCount}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="label">Year from</span>
                <input
                  type="number"
                  className="input w-24"
                  placeholder="any"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="label">Year to</span>
                <input
                  type="number"
                  className="input w-24"
                  placeholder="any"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                />
              </label>
              {cfg.hasGenre && (
                <label className="block">
                  <span className="label">Genre</span>
                  <select
                    className="input w-auto"
                    value={activeGenre ?? ''}
                    onChange={(e) => setGenreByType({ ...genreByType, [sourceKey]: e.target.value })}
                  >
                    <option value="">Any</option>
                    {genreOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            {(sourceKey === 'movie' || sourceKey === 'tv') && (
              <p className="text-xs text-gray-500">
                Indian releases are excluded from these lists
                {sourceKey === 'tv' ? ', along with anime, talk, news and soap shows' : ''} (your
                standing rules — importing one individually still works).
              </p>
            )}

            {cfg.hasSeason && (
              <div className="flex flex-wrap items-end gap-4">
                <Group label="Season (optional)">
                  <Pill active={season === ''} onClick={() => setSeason('')} label="Any" />
                  {SEASONS.map((s) => (
                    <Pill
                      key={s}
                      active={season === s}
                      onClick={() => setSeason(s)}
                      label={s[0].toUpperCase() + s.slice(1)}
                    />
                  ))}
                </Group>
                {season && (
                  <label className="block">
                    <span className="label">Season year</span>
                    <input
                      type="number"
                      className="input w-24"
                      placeholder="2024"
                      value={seasonYear}
                      onChange={(e) => setSeasonYear(e.target.value)}
                    />
                  </label>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              {!preview && (
                <button className="btn-primary" onClick={runPreview} disabled={previewing || run.running}>
                  {previewing ? 'Fetching list…' : 'Preview'}
                </button>
              )}
              {preview && (
                <>
                  <button className="btn-primary" onClick={startImport} disabled={selectedCount === 0 || run.running}>
                    Import {selectedCount} title{selectedCount === 1 ? '' : 's'}
                  </button>
                  <button className="btn-ghost" onClick={runPreview} disabled={previewing || run.running}>
                    {previewing ? 'Fetching list…' : 'Refresh preview'}
                  </button>
                  <button className="btn-ghost" onClick={() => setPreview(null)}>
                    Clear
                  </button>
                </>
              )}
              {preview && (
                <span className="text-xs text-gray-500">
                  Titles you already have were skipped and the list topped up — everything shown is
                  new.
                </span>
              )}
            </div>
          </>
        )}
            </div>
          </QuietWorkspace>

      {runStatus && runStatus.state !== 'idle' && <RunCard status={runStatus} onStop={stopRun} />}

      {preview && (
        <PreviewList
          items={preview.items}
          deselected={deselected}
          onToggle={(id) => {
            const next = new Set(deselected)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            setDeselected(next)
          }}
          onAll={() => setDeselected(new Set())}
          onNone={() => setDeselected(new Set(preview.items.map((it) => it.sourceId)))}
        />
      )}
          </>
        )}
      </TabPanel>
    </div>
  )
}

// A library-wide backfill kept beside the importer: it targets only AniList
// anime with no local theme rows and shares the refresh task/cancel machinery.
function MissingAnimeThemesTool({ bulkRunning }: { bulkRunning: boolean }): React.JSX.Element {
  const [count, setCount] = useState<number | null>(null)
  const [checking, setChecking] = useState(false)
  const themeReq: RefreshRequest = { types: ['anime'], aspects: ['themes'], onlyMissing: true }
  const run = useRefreshRun()

  async function check(): Promise<void> {
    setChecking(true)
    try {
      const preview = await api.refresh.preview(themeReq)
      setCount(preview.total)
    } catch (error) {
      toastError(error)
    } finally {
      setChecking(false)
    }
  }

  async function start(): Promise<void> {
    if (!count) return
    try {
      await api.refresh.start(themeReq)
      setCount(null)
      await run.kick()
    } catch (error) {
      toastError(error)
    }
  }

  async function stop(): Promise<void> {
    await api.refresh.cancel()
    await run.kick()
  }

  const refreshRunning = run.status?.state === 'running'
  const ownRefresh = refreshRunning && run.status?.label.includes('themes')
  return (
    <QuietWorkspace
      title="Fetch missing anime theme songs"
      description="Find AniList anime with no imported OP/ED songs, then fetch them from AnimeThemes with local audio."
      className="mb-6"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn-primary" disabled={checking || bulkRunning || refreshRunning} onClick={() => void check()}>
          {checking ? 'Checking…' : 'Check for missing themes'}
        </button>
        {count != null && (
          <button className="btn-primary" disabled={count === 0 || bulkRunning || refreshRunning} onClick={() => void start()}>
            Fetch {count} anime theme{count === 1 ? '' : 's'}
          </button>
        )}
        {ownRefresh && (
          <button className="btn-ghost" onClick={() => void stop()}>Stop theme fetch</button>
        )}
        <span className="text-sm text-gray-400" aria-live="polite">
          {count == null ? 'Nothing changes until you check.' : count === 0 ? 'Every AniList anime already has themes.' : `${count} anime ready to fetch.`}
        </span>
      </div>
      {ownRefresh && run.status && (
        <div className="mt-3 text-xs text-gray-400" aria-live="polite">
          Fetching {run.status.done} of {run.status.total}{run.status.message ? ` · ${run.status.message}` : ''}
        </div>
      )}
    </QuietWorkspace>
  )
}

function ImportFlow({
  previewReady,
  running,
  finished
}: {
  previewReady: boolean
  running: boolean
  finished: boolean
}) {
  const steps: OperationFlowStep[] = [
    {
      label: 'Configure',
      state: previewReady || running || finished ? 'complete' : 'active'
    },
    {
      label: 'Preview',
      state: running || finished ? 'complete' : previewReady ? 'active' : 'pending'
    },
    { label: 'Run', state: finished ? 'complete' : running ? 'active' : 'pending' }
  ]
  return <OperationFlow label="Bulk import stages" steps={steps} />
}

function RunCard({
  status,
  onStop
}: {
  status: NonNullable<ReturnType<typeof useBulkRun>['status']>
  onStop: () => Promise<void>
}) {
  const pct = status.total > 0 ? Math.round((status.done / status.total) * 100) : 0
  const running = status.state === 'running'
  const headline = running
    ? `Importing ${status.label.toLowerCase()} — ${status.done}/${status.total}`
    : status.state === 'done'
      ? 'Bulk import finished'
      : status.state === 'cancelled'
        ? 'Bulk import stopped'
        : 'Bulk import failed'
  return (
    <div className="card p-4 mb-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium">{headline}</p>
          <p className="text-xs text-gray-400 truncate">
            {running && status.message ? (
              status.message
            ) : (
              <>
                {status.imported} imported · {status.skipped} skipped · {status.failed} failed
              </>
            )}
          </p>
        </div>
        {running && (
          <button className="btn-ghost shrink-0" onClick={onStop}>
            Stop
          </button>
        )}
      </div>
      {running && (
        <div className="h-1.5 overflow-hidden rounded bg-base-600">
          <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
      )}
      {status.state === 'error' && status.message && (
        <p className="mt-2 text-xs text-red-400">{status.message}</p>
      )}
    </div>
  )
}

function PreviewList({
  items,
  deselected,
  onToggle,
  onAll,
  onNone
}: {
  items: BulkPreviewItem[]
  deselected: Set<number>
  onToggle: (id: number) => void
  onAll: () => void
  onNone: () => void
}) {
  const { visible, sentinelRef, hasMore } = useIncrementalList(items)
  return (
    <QuietWorkspace
      title="Preview selection"
      description={`${items.length} title${items.length === 1 ? '' : 's'} · ${items.length - deselected.size} selected`}
      actions={
        <>
          <button className="btn-ghost" onClick={onAll}>Select all</button>
          <button className="btn-ghost" onClick={onNone}>Select none</button>
        </>
      }
    >
      {items.length === 0 ? (
        <EmptyState
          title="No new titles"
          body="Every result from this list is already in the library. Change the source or filters and preview again."
          className="py-10 text-center"
        />
      ) : (
        <div className="card overflow-hidden p-0">
          {visible.map((it, i) => {
            const off = deselected.has(it.sourceId)
            return (
              <button
                key={it.sourceId}
                className={`flex w-full items-center gap-3 border-b border-base-700/60 p-2.5 text-left last:border-b-0 hover:bg-base-700/35 ${
                  off ? 'opacity-50' : ''
                }`}
                onClick={() => onToggle(it.sourceId)}
              >
                <span className="w-8 shrink-0 text-right text-xs tabular-nums text-gray-500">{i + 1}</span>
                {it.coverUrl ? (
                  <img src={it.coverUrl} alt="" loading="lazy" className="h-14 w-10 shrink-0 rounded object-cover" />
                ) : (
                  <div className="h-14 w-10 shrink-0 rounded bg-base-600" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{it.title}</span>
                  <span className="block text-xs text-gray-500">
                    {[it.year, it.score != null ? `★ ${fmtScore(it.score)}` : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-gray-500">{off ? '○' : '✓'}</span>
              </button>
            )
          })}
        </div>
      )}
      {hasMore && <div ref={sentinelRef} className="h-8" />}
    </QuietWorkspace>
  )
}
