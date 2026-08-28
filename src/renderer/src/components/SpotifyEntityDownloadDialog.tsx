import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { SpotifyEntityInspection, SpotifyEntityKind } from '@shared/types'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useDialog } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { formatDuration } from './MusicTrackRow'
import { useDownloadStatus } from './MusicDownloadDialog'

const TWO_GB = 2 * 1024 * 1024 * 1024

function formatBytes(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`
  return `${Math.ceil(bytes / 1024 ** 2)} MB`
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
  const status = useDownloadStatus()
  const [url, setUrl] = useState(savedUrl ?? '')
  const [inspection, setInspection] = useState<SpotifyEntityInspection | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [replacing, setReplacing] = useState(false)
  const [allowMismatch, setAllowMismatch] = useState(false)
  const [missingOnly, setMissingOnly] = useState(false)
  const [inspectError, setInspectError] = useState<string | null>(null)
  const refreshedStatus = useRef<string | null>(null)

  const { data: readiness } = useQuery({
    queryKey: qk.music.spotifyDetect,
    queryFn: () => api.music.spotifyDetect()
  })
  const { data: inspectionProgress } = useQuery({
    queryKey: qk.music.spotifyInspectionStatus,
    queryFn: () => api.music.spotifyInspectionStatus(),
    enabled: loading,
    refetchInterval: loading ? 700 : false
  })

  async function inspect(sourceUrl?: string, preserveSelection = false): Promise<void> {
    setLoading(true)
    setInspectError(null)
    try {
      const result = await api.music.spotifyInspectEntity({ kind, entityId, url: sourceUrl })
      setInspection(result)
      setSelected((old) => new Set(result.releases
        .filter((release) => preserveSelection ? old.has(release.spotifyAlbumId) : release.preselected)
        .map((release) => release.spotifyAlbumId)))
      setAllowMismatch(false)
      setReplacing(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setInspectError(message)
      if (!/cancelled/i.test(message)) toastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void inspect()
    // A remembered source is reused; otherwise NaviHUB discovers one from a local track.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!inspection || status?.source !== 'spotifyEntity' || status.entityKind !== kind ||
        status.entityId !== entityId || !['done', 'cancelled', 'error'].includes(status.status) ||
        refreshedStatus.current === `${status.id}:${status.status}`) return
    refreshedStatus.current = `${status.id}:${status.status}`
    void inspect(inspection.sourceUrl, true)
    // Refresh exactly once when this page's download settles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status?.id, status?.status])

  const totals = useMemo(() => inspection?.releases
    .filter((release) => selected.has(release.spotifyAlbumId))
    .reduce((sum, release) => ({
      tracks: sum.tracks + release.missingCount,
      missing: sum.missing + release.missingCount,
      bytes: sum.bytes + release.missingEstimatedBytes
    }), { tracks: 0, missing: 0, bytes: 0 }) ?? { tracks: 0, missing: 0, bytes: 0 }, [inspection, selected])

  async function download(): Promise<void> {
    if (!inspection) return
    if (totals.tracks > 100 || totals.bytes > TWO_GB) {
      const ok = await confirmDialog(
        `Download ${totals.missing} missing track(s)? The estimated size is ${formatBytes(totals.bytes)}.`,
        { confirmLabel: 'Download' }
      )
      if (!ok) return
    }
    try {
      const result = await api.music.spotifyDownloadEntity({
        inspectionId: inspection.inspectionId,
        albumIds: [...selected],
        allowMismatch
      })
      await qc.invalidateQueries({ queryKey: qk.music.all })
      if (result.id) {
        await qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
      } else {
        toast(
          inspection.matchesCurrentEntity
            ? 'Spotify source saved; every selected track is already local'
            : 'Every selected track is already local; the mismatched source was not saved',
          'success'
        )
        await inspect(inspection.sourceUrl, true)
      }
    } catch (error) {
      toastError(error)
    }
  }

  async function forget(): Promise<void> {
    try {
      await api.music.spotifyForgetEntitySource({ kind, entityId })
      await qc.invalidateQueries({ queryKey: qk.music.all })
      setInspection(null)
      setReplacing(false)
      setUrl('')
      setInspectError(null)
      void inspect()
    } catch (error) {
      toastError(error)
    }
  }

  const runningHere = status?.source === 'spotifyEntity' && status.entityKind === kind &&
    status.entityId === entityId && ['starting', 'downloading', 'processing'].includes(status.status)
  const primary = inspection?.releases.filter((release) => release.preselected) ?? []
  const appearances = inspection?.releases.filter((release) => !release.preselected) ?? []
  const visiblePrimary = missingOnly
    ? primary.filter((release) => release.missingCount > 0)
    : primary
  const visibleAppearances = missingOnly
    ? appearances.filter((release) => release.missingCount > 0)
    : appearances
  const visibleReleases = [...visiblePrimary, ...visibleAppearances]

  function releaseRows(releases: typeof primary) {
    return releases.map((release) => (
      <label key={release.spotifyAlbumId} className="flex gap-3 border-b border-base-700 px-1 py-3 last:border-0">
        {kind === 'artist' && (
          <input
            type="checkbox"
            checked={selected.has(release.spotifyAlbumId)}
            onChange={(event) => setSelected((old) => {
              const next = new Set(old)
              if (event.target.checked) next.add(release.spotifyAlbumId)
              else next.delete(release.spotifyAlbumId)
              return next
            })}
          />
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-white">{release.title}</span>
          <span className="mt-1 block text-xs text-gray-400">
            {[release.year, release.albumType].filter(Boolean).join(' · ')} · {release.trackCount} tracks · {release.localCount} local · {release.missingCount} missing · {formatDuration(release.duration)}
            {release.missingCount > 0 && ` · about ${formatBytes(release.missingEstimatedBytes)} to add`}
          </span>
        </span>
      </label>
    ))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={panelRef} role="dialog" aria-modal="true" tabIndex={-1} aria-label={`Complete ${kind} from Spotify`} className="card max-h-[88vh] w-full max-w-3xl overflow-y-auto p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Complete {kind} from Spotify</h2>
            <p className="mt-1 text-sm text-gray-400">Compare a public Spotify source with this local {kind}, then save only the tracks that are missing.</p>
          </div>
          <button className="px-2 text-gray-400 hover:text-white" aria-label="Close" onClick={onClose}>✕</button>
        </div>

        {readiness && !readiness.ok && <p className="mb-4 rounded bg-red-950/40 p-3 text-sm text-red-200">{readiness.error}</p>}

        {!inspection && !replacing && (
          <div className="space-y-3" aria-live="polite">
            <div className="rounded border border-base-700 bg-base-900/40 p-4">
              <p className="font-medium text-white">
                {loading
                  ? (inspectionProgress?.phase === 'catalogue' || inspectionProgress?.phase === 'matching'
                      ? 'Building the release preview'
                      : 'Finding the Spotify source')
                  : 'Spotify inspection stopped'}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {loading
                  ? inspectionProgress?.message ?? (savedUrl ? 'Reading the remembered Spotify source' : 'Matching a local track to Spotify')
                  : inspectError ?? 'The source is ready to inspect again.'}
              </p>
              {loading && inspectionProgress?.foundCount != null && (
                <p className="mt-2 text-xs text-gray-400">{inspectionProgress.foundCount} tracks found</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {loading ? (
                <button className="btn-ghost" onClick={() => void api.music.spotifyCancelInspection()}>Cancel inspection</button>
              ) : (
                <button className="btn-primary" disabled={readiness?.ok === false} onClick={() => void inspect()}>Try again</button>
              )}
              <button className="btn-ghost" disabled={loading} onClick={() => setReplacing(true)}>Choose a source manually</button>
              {savedUrl && <button className="btn-ghost" disabled={loading} onClick={() => void forget()}>Forget source</button>}
            </div>
          </div>
        )}

        {replacing && (
          <div className="space-y-3">
            <label className="label" htmlFor="spotify-entity-url">Public Spotify {kind} link</label>
            <input id="spotify-entity-url" className="input w-full" value={url} onChange={(event) => setUrl(event.target.value)} placeholder={`https://open.spotify.com/${kind}/…`} autoFocus />
            <p className="text-sm text-gray-400">Use this only when automatic matching picked the wrong source. Spotify login is not used.</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" disabled={loading || !url.trim() || readiness?.ok === false} onClick={() => void inspect(url)}>{loading ? 'Inspecting…' : 'Inspect source'}</button>
              <button className="btn-ghost" disabled={loading} onClick={() => setReplacing(false)}>Back</button>
            </div>
          </div>
        )}

        {inspection && !replacing && (
          <div>
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-300">
                Spotify source: <span className="font-medium text-white">{inspection.sourceName}</span>
                {(inspection.duplicateCount > 0 || inspection.skippedCount > 0) &&
                  ` · ${inspection.duplicateCount} duplicate · ${inspection.skippedCount} skipped`}
              </p>
              <div className="flex flex-wrap items-center gap-2">
              <button className="btn-ghost" onClick={() => void api.app.openExternal(inspection.sourceUrl)}>Open in Spotify</button>
              <button className="btn-ghost" onClick={() => setReplacing(true)}>Replace source</button>
              {savedUrl && <button className="btn-ghost" onClick={() => void forget()}>Forget source</button>}
              </div>
            </div>
            {inspection.mismatchMessage && (
              <div className="mb-4 rounded bg-amber-950/40 p-3 text-sm text-amber-100">
                <p>{inspection.mismatchMessage} You can download it elsewhere, but NaviHUB will not remember it for this page.</p>
                <label className="mt-3 flex items-center gap-2"><input type="checkbox" checked={allowMismatch} onChange={(event) => setAllowMismatch(event.target.checked)} />Use this source once</label>
              </div>
            )}
            {kind === 'artist' ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 border-y border-base-700 py-3">
                  <button
                    className="btn-ghost px-2 py-1 text-xs"
                    onClick={() => setSelected(new Set(primary.map((release) => release.spotifyAlbumId)))}
                  >
                    Select primary
                  </button>
                  <button
                    className="btn-ghost px-2 py-1 text-xs"
                    onClick={() => setSelected(new Set(visibleReleases.map((release) => release.spotifyAlbumId)))}
                  >
                    Select all visible
                  </button>
                  <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setSelected(new Set())}>
                    Clear selection
                  </button>
                  <button
                    className={missingOnly ? 'pill-active' : 'pill'}
                    onClick={() => setMissingOnly((value) => !value)}
                  >
                    Missing releases only
                  </button>
                  <span className="text-xs text-gray-500">{selected.size} selected</span>
                </div>
                <section><h3 className="mb-1 font-semibold text-white">Albums and singles</h3>{visiblePrimary.length ? releaseRows(visiblePrimary) : <p className="text-sm text-gray-400">{missingOnly ? 'No missing primary releases.' : 'No primary releases found.'}</p>}</section>
                <section><h3 className="mb-1 font-semibold text-white">Features, compilations, and other appearances</h3>{visibleAppearances.length ? releaseRows(visibleAppearances) : <p className="text-sm text-gray-400">{missingOnly ? 'No missing appearances.' : 'No other appearances found.'}</p>}</section>
              </div>
            ) : releaseRows(inspection.releases)}

            <div className="sticky bottom-0 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-base-700 bg-base-800 pt-4" aria-live="polite">
              <div className="min-w-0 text-sm text-gray-400">
                <p>{totals.missing} missing selected · about {formatBytes(totals.bytes)}</p>
                {runningHere && (
                  <p className="mt-1 truncate text-gray-300">
                    {status.title ?? status.message ?? 'Preparing download'} · {status.itemIndex ?? 0}/{status.itemCount ?? totals.missing}
                    {(status.resolvedCount ?? 0) > 0 && ` · ${status.resolvedCount} resolved`}
                    {(status.failedCount ?? 0) > 0 && ` · ${status.failedCount} failed`}
                  </p>
                )}
              </div>
              {runningHere ? (
                <button className="btn-ghost" onClick={() => status && api.music.downloadCancel(status.id)}>Cancel {status.percent ?? 0}%</button>
              ) : (
                <button className="btn-primary" disabled={!selected.size || (!!inspection.mismatchMessage && !allowMismatch)} onClick={() => void download()}>{totals.missing ? `Download missing (${totals.missing})` : 'Save source'}</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
