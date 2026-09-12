import { Field } from './Field'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import type {
  SpotifyEntityCandidate,
  SpotifyEntityInspection,
  SpotifyEntityKind,
  SpotifyReleasePreview
} from '@shared/types'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useDialog } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { formatDuration } from './MusicTrackRow'
import { useDownloadStatus } from './MusicDownloadDialog'
import ActionMenu from './ActionMenu'

const TWO_GB = 2 * 1024 * 1024 * 1024
const ACTIVE_DOWNLOAD = new Set([
  'starting',
  'resolving',
  'downloading',
  'processing',
  'pausing',
  'paused',
  'cancelling'
])

function formatBytes(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`
  return `${Math.ceil(bytes / 1024 ** 2)} MB`
}

function formatElapsed(ms: number): string {
  const seconds = Math.max(0, Math.floor(ms / 1000))
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

export default function SpotifyEntityDownloadDialog({
  kind,
  entityId,
  savedUrl,
  onClose
}: {
  kind: SpotifyEntityKind
  entityId: number
  savedUrl: string | null
  onClose: () => void
}) {
  const qc = useQueryClient()
  const panelRef = useDialog(onClose)
  const downloadStatus = useDownloadStatus()
  const bootstrapped = useRef(false)
  const settledDownload = useRef<string | null>(null)
  const [inspection, setInspection] = useState<SpotifyEntityInspection | null>(null)
  const [candidates, setCandidates] = useState<SpotifyEntityCandidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)
  const [advanced, setAdvanced] = useState(false)
  const [url, setUrl] = useState(savedUrl ?? '')
  const [allowMismatch, setAllowMismatch] = useState(false)
  const [missingOnly, setMissingOnly] = useState(false)
  const [country, setCountry] = useState('US')
  const [loadingRelease, setLoadingRelease] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const ref = useMemo(() => ({ kind, entityId }), [kind, entityId])
  const { data: readiness } = useQuery({
    queryKey: qk.music.spotifyDetect,
    queryFn: () => api.music.spotifyDetect()
  })
  const { data: entityState, refetch: refetchEntityState } = useQuery({
    queryKey: qk.music.spotifyEntityState(kind, entityId),
    queryFn: () => api.music.spotifyEntityState(ref),
    refetchInterval: (query) => query.state.data?.state === 'building' ? 700 : false
  })
  const { data: inspectionProgress } = useQuery({
    queryKey: qk.music.spotifyInspectionStatus,
    queryFn: () => api.music.spotifyInspectionStatus(),
    enabled: entityState?.state === 'building' || loading,
    refetchInterval: entityState?.state === 'building' || loading ? 700 : false
  })
  const { data: downloadQueue } = useQuery({
    queryKey: qk.music.spotifyQueue,
    queryFn: () => api.music.spotifyDownloadQueue()
  })

  function applyInspection(next: SpotifyEntityInspection, preserveSelection = false): void {
    setInspection(next)
    setCountry(next.catalogueCountry ?? 'US')
    setSelected((old) => new Set(next.releases
      .filter((release) => preserveSelection ? old.has(release.releaseId) : release.preselected)
      .map((release) => release.releaseId)))
    setCandidates([])
    setSelectedCandidate(null)
    setAllowMismatch(false)
    setAdvanced(false)
    setError(null)
  }

  async function startInspection(input: {
    candidateKey?: string
    url?: string
    refresh?: boolean
  } = {}): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const result = await api.music.spotifyStartEntityInspection({ kind, entityId, ...input })
      applyInspection(result)
      await qc.invalidateQueries({ queryKey: qk.music.spotifyEntityState(kind, entityId) })
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : String(caught)
      setError(message)
      if (!/cancelled/i.test(message)) toastError(caught)
    } finally {
      setLoading(false)
      void refetchEntityState()
    }
  }

  async function discoverCandidates(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const found = await api.music.spotifyFindEntityCandidates(ref)
      const exact = found.filter((candidate) => candidate.exact)
      if (exact.length === 1) {
        await startInspection({ candidateKey: exact[0].candidateKey })
        return
      }
      if (found.length === 0) {
        await startInspection()
        return
      }
      setCandidates(found)
      setSelectedCandidate((exact[0] ?? found[0]).candidateKey)
    } catch {
      // Candidate search is only the fast path. The spotDL fallback owns its
      // own useful error and remains the best automatic recovery.
      await startInspection()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!entityState || bootstrapped.current) return
    if (entityState.state === 'ready') {
      bootstrapped.current = true
      applyInspection(entityState.inspection)
    } else if (entityState.state === 'building') {
      setLoading(true)
    } else if (entityState.state === 'error') {
      bootstrapped.current = true
      setLoading(false)
      setError(entityState.error)
    } else {
      bootstrapped.current = true
      void discoverCandidates()
    }
    // This is a one-time bootstrap. Subsequent state refreshes are applied by
    // the building-to-ready effect below without starting another inspection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityState?.state])

  useEffect(() => {
    if (entityState?.state !== 'ready') return
    applyInspection(entityState.inspection, inspection != null)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityState?.state === 'ready' ? entityState.inspection.snapshotId : null])

  useEffect(() => {
    if (!downloadStatus || downloadStatus.source !== 'spotifyEntity' ||
        downloadStatus.entityKind !== kind || downloadStatus.entityId !== entityId ||
        !['done', 'cancelled', 'error'].includes(downloadStatus.status)) return
    const key = `${downloadStatus.id}:${downloadStatus.status}`
    if (settledDownload.current === key) return
    settledDownload.current = key
    // Downloads finish with a local scan. Re-read the persisted snapshot only;
    // never launch another catalogue inspection here.
    void qc.invalidateQueries({ queryKey: qk.music.spotifyEntityState(kind, entityId) })
    void qc.invalidateQueries({ queryKey: qk.music.all })
  }, [downloadStatus, entityId, kind, qc])

  const totals = useMemo(() => inspection?.releases
    .filter((release) => selected.has(release.releaseId))
    .reduce((sum, release) => ({
      missing: sum.missing + release.missingCount,
      bytes: sum.bytes + release.missingEstimatedBytes
    }), { missing: 0, bytes: 0 }) ?? { missing: 0, bytes: 0 }, [inspection, selected])

  async function addToQueue(startNow: boolean): Promise<void> {
    if (!inspection || loading) return
    setLoading(true)
    try {
      const result = await api.music.spotifyQueueAddEntity({
        snapshotId: inspection.snapshotId,
        releaseIds: [...selected],
        allowMismatch
      })
      await qc.invalidateQueries({ queryKey: qk.music.spotifyQueue })
      if (result.jobId == null) {
        toast('Every selected track is already in the local library', 'success')
        return
      }
      if (startNow) {
        const freshQueue = await api.music.spotifyDownloadQueue()
        const mergedCard = freshQueue.pending.find((card) => card.id === result.jobId)
        const missingCount = mergedCard?.missingCount ?? result.missingCount
        const estimatedBytes = mergedCard?.missingEstimatedBytes ?? totals.bytes
        if (missingCount > 100 || estimatedBytes > TWO_GB) {
          const ok = await confirmDialog(
            `Download ${missingCount} missing track${missingCount === 1 ? '' : 's'}? The current queue estimate is ${formatBytes(estimatedBytes)}. Finished files are kept if you pause or cancel.`,
            { confirmLabel: 'Download' }
          )
          if (!ok) {
            toast('Saved to Music Downloads without starting', 'success', {
              label: 'View downloads',
              route: '/music/downloads'
            })
            onClose()
            return
          }
        }
        const queueWasActive = downloadStatus?.source === 'spotifyQueue' &&
          ACTIVE_DOWNLOAD.has(downloadStatus.status)
        await api.music.spotifyQueueStart({ jobId: result.jobId, prioritize: true })
        await qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
        toast(
          queueWasActive
            ? downloadStatus.status === 'paused'
              ? `${inspection.sourceName} will run after the paused download resumes`
              : `${inspection.sourceName} will run next`
            : `Starting ${inspection.sourceName}`,
          'success',
          { label: 'View downloads', route: '/music/downloads' }
        )
      } else {
        toast(
          result.addedSelections > 0
            ? `Added ${result.addedSelections} release${result.addedSelections === 1 ? '' : 's'} to Music Downloads`
            : 'Those releases are already in Music Downloads',
          'success',
          { label: 'View downloads', route: '/music/downloads' }
        )
      }
      onClose()
    } catch (caught) {
      toastError(caught)
    } finally { setLoading(false) }
  }

  async function forget(): Promise<void> {
    try {
      const queued = queueCard
      if (queued) {
        if (queued.state === 'running') {
          toast('Pause or cancel this download before forgetting its source')
          return
        }
        const ok = await confirmDialog(
          `Forget this Spotify source and remove its ${queued.state === 'completed' ? 'completed' : 'saved'} download queue card? Local audio will not be deleted.`,
          { confirmLabel: 'Forget', danger: true }
        )
        if (!ok) return
      }
      await api.music.spotifyForgetEntitySource(ref)
      await qc.invalidateQueries({ queryKey: qk.music.all })
      await qc.invalidateQueries({ queryKey: qk.music.spotifyQueue })
      await qc.invalidateQueries({ queryKey: qk.music.spotifyEntityState(kind, entityId) })
      setInspection(null)
      setCandidates([])
      setUrl('')
      setAdvanced(false)
      setError(null)
      void discoverCandidates()
    } catch (caught) {
      toastError(caught)
    }
  }

  async function control(action: 'pause' | 'resume' | 'cancel'): Promise<void> {
    if (!downloadStatus) return
    if (action === 'cancel') await api.music.downloadCancel(downloadStatus.id)
    else if (downloadStatus.taskId) await api.tasks[action](downloadStatus.taskId)
    await qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
  }

  const queueCard = [...(downloadQueue?.pending ?? []), ...(downloadQueue?.completed ?? [])]
    .find((card) => card.sourceKind === 'entity' && card.entityKind === kind && card.entityId === entityId)
  const directRunning = downloadStatus?.source === 'spotifyEntity' &&
    downloadStatus.entityKind === kind && downloadStatus.entityId === entityId &&
    ACTIVE_DOWNLOAD.has(downloadStatus.status)
  const runningHere = directRunning || queueCard?.state === 'running'
  const queueActive = downloadStatus?.source === 'spotifyQueue' && ACTIVE_DOWNLOAD.has(downloadStatus.status)
  const releases = inspection?.releases.filter((release) =>
    !missingOnly || release.tracksLoaded === false || release.missingCount > 0) ?? []

  function releaseRows(rows: SpotifyReleasePreview[]): React.JSX.Element[] {
    return rows.map((release) => (
      <div
        key={release.releaseId}
        className="flex gap-3 border-b border-base-700 px-1 py-3 last:border-0"
      >
        {kind === 'artist' && (
          <input
            type="checkbox"
            aria-label={`Select ${release.title}`}
            checked={selected.has(release.releaseId)}
            onChange={(event) => setSelected((old) => {
              const next = new Set(old)
              if (event.target.checked) next.add(release.releaseId)
              else next.delete(release.releaseId)
              return next
            })}
          />
        )}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="truncate font-medium text-white">{release.title}</span>
            {release.metadataState === 'resolved' && <span className="chip text-xs">Spotify verified</span>}
            {release.metadataState === 'indexed' && <span className="chip text-xs">Catalogue estimate</span>}
            {release.metadataState === 'error' && <span className="text-xs text-red-300">Retry available</span>}
          </span>
          <span className="mt-1 block text-xs text-gray-400">
            {[release.year, release.albumType].filter(Boolean).join(' · ') || 'Release'}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500">
            {release.tracksLoaded === false ? `${release.trackCount} advertised tracks; local matches and size not checked yet` : `${release.trackCount} tracks · ${release.localCount} local · ${release.missingCount} missing · ${formatDuration(release.duration)}`}
            {release.tracksLoaded !== false && release.missingCount > 0 && ` · about ${formatBytes(release.missingEstimatedBytes)}`}
          </span>
          {release.tracksLoaded === false && <button className="btn-ghost mt-2 text-xs" disabled={loadingRelease != null} onClick={async () => {
            if (!inspection) return
            setLoadingRelease(release.releaseId)
            try { applyInspection(await api.music.spotifyLoadRelease(inspection.snapshotId, release.releaseId), true) }
            catch (error) { toastError(error) }
            finally { setLoadingRelease(null) }
          }}>{loadingRelease === release.releaseId ? 'Checking tracklist…' : 'Load tracklist and check local files'}</button>}
          {release.resolutionError && <span className="mt-1 block text-xs text-red-300">{release.resolutionError}</span>}
        </span>
      </div>
    ))
  }

  const building = entityState?.state === 'building' || loading
  const fallback = inspectionProgress?.phase === 'spotifyFallback'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-label={`Download ${kind} releases`}
        className="card max-h-[88vh] w-full max-w-3xl overflow-y-auto p-5"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {kind === 'artist' ? 'Complete artist from Spotify' : 'Complete album from Spotify'}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              NaviHUB finds the catalogue for you, remembers it, and downloads only missing tracks.
            </p>
          </div>
          <button className="px-2 text-gray-400 hover:text-white" aria-label="Close" onClick={onClose}>✕</button>
        </div>

        {readiness && !readiness.ok && (
          <p className="mb-4 rounded bg-amber-950/40 p-3 text-sm text-amber-100">
            Catalogue previews can still work, but downloading requires spotDL. {readiness.error}{' '}
            <Link className="font-medium text-accent hover:underline" to="/settings" onClick={onClose}>
              Check downloader settings
            </Link>
          </p>
        )}

        {building && (
          <div className="space-y-3" aria-live="polite">
            <div className="rounded border border-base-700 bg-base-900/40 p-4">
              <p className="font-medium text-white">
                {fallback ? 'Using the full spotDL fallback' : 'Building the release catalogue'}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {inspectionProgress?.message ?? 'Searching for the closest catalogue match'}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {formatElapsed(inspectionProgress?.elapsedMs ?? 0)} elapsed
                {inspectionProgress?.foundCount != null && ` · ${inspectionProgress.foundCount} tracks found`}
              </p>
              {fallback && (
                <p className="mt-2 text-xs text-gray-400">
                  The fast catalogue was unavailable. spotDL is enumerating the artist and may take several minutes.
                </p>
              )}
            </div>
            <button
              className="btn-ghost"
              onClick={() => void api.music.spotifyCancelInspection(entityState?.state === 'building' ? entityState.jobId : undefined)}
            >
              Cancel inspection
            </button>
          </div>
        )}

        {!building && candidates.length > 0 && !inspection && !advanced && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white">Choose the matching catalogue entry</h3>
              <p className="mt-1 text-sm text-gray-400">More than one close match was found. This choice is saved until you refresh or forget it.</p>
            </div>
            <div className="space-y-2">
              {candidates.map((candidate) => (
                <label key={candidate.candidateKey} className="flex cursor-pointer gap-3 rounded border border-base-700 p-3 hover:bg-base-700/40">
                  <input
                    type="radio"
                    name="spotify-candidate"
                    checked={selectedCandidate === candidate.candidateKey}
                    onChange={() => setSelectedCandidate(candidate.candidateKey)}
                  />
                  <span>
                    <span className="block font-medium text-white">{candidate.name}</span>
                    <span className="text-sm text-gray-400">
                      {[candidate.secondary, candidate.year].filter(Boolean).join(' · ') || 'Catalogue result'}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" disabled={!selectedCandidate || loading} onClick={() => void startInspection({ candidateKey: selectedCandidate ?? undefined })}>Use selected source</button>
              <button className="btn-ghost" onClick={() => setAdvanced(true)}>Advanced source replacement</button>
            </div>
          </div>
        )}

        {!building && advanced && (
          <div className="space-y-3">
            <Field label="Catalogue country (two-letter code)"><input className="input" value={country} maxLength={2} onChange={(e) => setCountry(e.target.value.toUpperCase())} /></Field>
            <button className="btn-ghost" disabled={!/^[A-Z]{2}$/.test(country) || loading} onClick={async () => {
              await api.settings.set('spotdl.catalogueCountry', country)
              await startInspection({ refresh: true })
              setAdvanced(false)
            }}>Reload catalogue for this country</button>
            <label className="label" htmlFor="spotify-entity-url">Public Spotify {kind} link</label>
            <input
              id="spotify-entity-url"
              className="input w-full"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder={`https://open.spotify.com/${kind}/…`}
              autoFocus
            />
            <p className="text-sm text-gray-400">Manual links are only needed when automatic matching selected the wrong source.</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" disabled={!url.trim() || loading || readiness?.ok === false} onClick={() => void startInspection({ url: url.trim(), refresh: true })}>Inspect source</button>
              <button className="btn-ghost" disabled={loading} onClick={() => setAdvanced(false)}>Back</button>
            </div>
          </div>
        )}

        {!building && error && !inspection && candidates.length === 0 && !advanced && (
          <div className="space-y-3" aria-live="polite">
            <p className="rounded bg-red-950/40 p-3 text-sm text-red-200">{error}</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" onClick={() => void discoverCandidates()}>Try again</button>
              <button className="btn-ghost" onClick={() => setAdvanced(true)}>Advanced source replacement</button>
            </div>
          </div>
        )}

        {inspection && !advanced && (
          <div>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">{inspection.sourceName}</span> · {inspection.provider === 'itunes' ? `Apple catalogue (${inspection.catalogueCountry ?? 'US'})` : 'spotDL catalogue'}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Saved {new Intl.DateTimeFormat().format(new Date(inspection.refreshedAt))} · reopening is instant
                </p>
              </div>
              <ActionMenu
                label="Source"
                items={[
                  ...(inspection.sourceUrl
                    ? [{ label: 'Open in Spotify', onSelect: () => api.app.openExternal(inspection.sourceUrl!) }]
                    : []),
                  { label: 'Refresh catalogue', disabled: runningHere, onSelect: () => startInspection({ refresh: true }) },
                  { label: 'Replace source', disabled: runningHere, onSelect: () => setAdvanced(true) },
                  { label: 'Forget source', disabled: runningHere, danger: true, onSelect: forget }
                ]}
              />
            </div>

            {inspection.provider === 'itunes' && <p className="mb-3 text-sm text-gray-400">Regional catalogue, up to 200 releases. This is not a complete Spotify discography. Tracklists and local matches load when you select downloads or open a release. Change country under Replace source.</p>}
            {inspection.mismatchMessage && (
              <div className="mb-4 rounded bg-amber-950/40 p-3 text-sm text-amber-100">
                <p>{inspection.mismatchMessage} This one-time download will not replace the saved source.</p>
                <label className="mt-3 flex items-center gap-2">
                  <input type="checkbox" checked={allowMismatch} onChange={(event) => setAllowMismatch(event.target.checked)} />
                  Use this source once
                </label>
              </div>
            )}

            {kind === 'artist' && (
              <div className="mb-3 flex flex-wrap items-center gap-2 border-y border-base-700 py-3">
                <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setSelected(new Set(inspection.releases.filter((release) => release.preselected).map((release) => release.releaseId)))}>Select albums and singles</button>
                <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setSelected(new Set())}>Clear selection</button>
                <button className={missingOnly ? 'pill-active' : 'pill'} aria-pressed={missingOnly} onClick={() => setMissingOnly((value) => !value)}>Missing releases only</button>
                <span className="text-xs text-gray-400">{selected.size} selected</span>
              </div>
            )}

            <section>
              <h3 className="mb-1 font-semibold text-white">
                {kind === 'artist' ? 'Albums and singles' : 'Album release'}
              </h3>
              {releases.length ? releaseRows(releases) : (
                <p className="text-sm text-gray-400">{missingOnly ? 'No releases are missing.' : 'No albums or singles were found.'}</p>
              )}
            </section>

            <div className="sticky bottom-0 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-base-700 bg-base-800 pt-4">
              <div className="min-w-0 text-sm text-gray-400">
                <p>{inspection.releases.some((release) => selected.has(release.releaseId) && release.tracksLoaded === false) ? 'Selected tracklists will be checked before the download estimate' : `${totals.missing} missing selected · about ${formatBytes(totals.bytes)}`}</p>
                {directRunning && (
                  <p className="mt-1 truncate text-gray-300">
                    {downloadStatus.releaseTitle ?? downloadStatus.title ?? downloadStatus.message ?? 'Preparing release'}
                    {downloadStatus.releaseCount != null && ` · release ${downloadStatus.releaseIndex ?? 0}/${downloadStatus.releaseCount}`}
                    {downloadStatus.itemCount != null && ` · track ${downloadStatus.itemIndex ?? 0}/${downloadStatus.itemCount}`}
                    {(downloadStatus.failedCount ?? 0) > 0 && ` · ${downloadStatus.failedCount} failed`}
                  </p>
                )}
              </div>
              {queueCard?.state === 'running' ? (
                <button
                  className="btn-primary"
                  onClick={() => { window.location.hash = '#/music/downloads' }}
                >
                  View active download
                </button>
              ) : directRunning ? (
                <div className="flex flex-wrap gap-2">
                  {downloadStatus.status === 'paused' ? (
                    <button className="btn-primary" disabled={!downloadStatus.taskId} onClick={() => void control('resume')}>Resume</button>
                  ) : (
                    <button className="btn-ghost" disabled={!downloadStatus.taskId || downloadStatus.status === 'pausing' || downloadStatus.status === 'cancelling'} onClick={() => void control('pause')}>Pause</button>
                  )}
                  <button className="btn-ghost" disabled={downloadStatus.status === 'cancelling'} onClick={() => void control('cancel')}>{downloadStatus.status === 'cancelling' ? 'Cancelling…' : 'Cancel'}</button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="btn-ghost"
                    disabled={!selected.size || (!!inspection.mismatchMessage && !allowMismatch)}
                    onClick={() => void addToQueue(true)}
                  >
                    {queueActive
                      ? downloadStatus.status === 'paused' ? 'Run after paused' : 'Run next'
                      : 'Download now'}
                  </button>
                  <button
                    className="btn-primary"
                    disabled={!selected.size || (!!inspection.mismatchMessage && !allowMismatch)}
                    onClick={() => void addToQueue(false)}
                  >
                    {totals.missing ? `Add to queue (${totals.missing})` : 'Check selected releases'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
