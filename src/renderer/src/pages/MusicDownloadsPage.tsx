import SpotifyTrackRecoveryDialog from '../components/SpotifyTrackRecoveryDialog'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { SpotifyDownloadQueueCard, SpotifyDownloadQueueTrack } from '@shared/types'
import ActionMenu from '../components/ActionMenu'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import { useDownloadStatus } from '../components/MusicDownloadDialog'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useIncrementalList } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'

const TWO_GB = 2 * 1024 * 1024 * 1024
const ACTIVE = new Set(['starting', 'resolving', 'downloading', 'processing', 'pausing', 'paused', 'cancelling'])
const POLLING = new Set(['starting', 'resolving', 'downloading', 'processing', 'pausing', 'cancelling'])

type SortableCard = SpotifyDownloadQueueCard & { itemId: number }

function formatBytes(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`
  return `${Math.ceil(bytes / 1024 ** 2)} MB`
}

export default function MusicDownloadsPage() {
  const qc = useQueryClient()
  const downloadStatus = useDownloadStatus()
  const [completedOpen, setCompletedOpen] = useState(false)
  const { data: queue, isLoading, isError, error } = useQuery({
    queryKey: qk.music.spotifyQueue,
    queryFn: () => api.music.spotifyDownloadQueue(),
    refetchInterval: downloadStatus?.source === 'spotifyQueue' && POLLING.has(downloadStatus.status)
      ? 700
      : false
  })
  const active = downloadStatus?.source === 'spotifyQueue' && ACTIVE.has(downloadStatus.status)
    ? downloadStatus
    : null
  const sortableSource: SortableCard[] | undefined = queue?.pending
    .filter((card) => card.id !== active?.queueCardId)
    .map((card) => ({ ...card, itemId: card.id }))
  const { items, setItems, sensors, onDragEnd } = useOptimisticReorder(
    sortableSource,
    (next) => api.music.spotifyQueueReorder(next.map((card) => card.id)),
    () => void qc.invalidateQueries({ queryKey: qk.music.all })
  )
  const completed = useIncrementalList(queue?.completed ?? [], 96)

  useEffect(() => {
    if (!downloadStatus || downloadStatus.source !== 'spotifyQueue') return
    if (!['done', 'error', 'cancelled'].includes(downloadStatus.status)) return
    void qc.invalidateQueries({ queryKey: qk.music.all })
    void qc.invalidateQueries({ queryKey: qk.music.all })
  }, [downloadStatus, qc])

  async function confirmLarge(card?: SpotifyDownloadQueueCard): Promise<boolean> {
    const count = card?.missingCount ?? queue?.pendingTracks ?? 0
    const bytes = card?.missingEstimatedBytes ?? queue?.pendingEstimatedBytes ?? 0
    if (count <= 100 && bytes <= TWO_GB) return true
    return confirmDialog(
      `Download ${count} missing track${count === 1 ? '' : 's'}? The current estimate is ${formatBytes(bytes)}.`,
      { confirmLabel: 'Download' }
    )
  }

  async function start(card?: SpotifyDownloadQueueCard, resume = false): Promise<void> {
    if (!(await confirmLarge(card))) return
    try {
      const result = await api.music.spotifyQueueStart({
        jobId: card?.id,
        resume
      })
      if (!result.id) toast('There is no pending Spotify work', 'success')
      await qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
      await qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (error) {
      toastError(error)
    }
  }

  async function prioritize(card: SpotifyDownloadQueueCard): Promise<void> {
    try {
      await api.music.spotifyQueueStart({ jobId: card.id, prioritize: true })
      toast(
        active?.status === 'paused'
          ? `“${card.title}” will run after the paused download resumes`
          : `“${card.title}” will run next`,
        'success'
      )
      await qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (error) {
      toastError(error)
    }
  }

  async function control(action: 'pause' | 'resume' | 'cancel'): Promise<void> {
    if (!active) return
    try {
      if (action === 'cancel') await api.music.downloadCancel(active.id)
      else if (active.taskId) await api.tasks[action](active.taskId)
      await qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
      await qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (error) {
      toastError(error)
    }
  }

  async function removeCard(card: SpotifyDownloadQueueCard): Promise<void> {
    const ok = await confirmDialog(
      `Remove “${card.title}” from Music Downloads? Local audio and the saved Spotify catalogue will be kept.`,
      { confirmLabel: 'Remove' }
    )
    if (!ok) return
    await api.music.spotifyQueueRemoveCard(card.id)
    await qc.invalidateQueries({ queryKey: qk.music.all })
  }

  async function removeSelection(id: number): Promise<void> {
    await api.music.spotifyQueueRemoveSelection(id)
    await qc.invalidateQueries({ queryKey: qk.music.all })
  }

  async function moveCard(cardId: number, direction: -1 | 1): Promise<void> {
    const index = items.findIndex((card) => card.id === cardId)
    const target = index + direction
    if (index < 0 || target < 0 || target >= items.length) return
    const next = [...items]
    const [card] = next.splice(index, 1)
    next.splice(target, 0, card)
    setItems(next)
    try {
      await api.music.spotifyQueueReorder(next.map((item) => item.id))
      await qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (error) {
      setItems(items)
      toastError(error)
    }
  }

  async function clearCompleted(): Promise<void> {
    const ok = await confirmDialog(
      `Clear ${queue?.completed.length ?? 0} completed download card${queue?.completed.length === 1 ? '' : 's'}? Downloaded music will be kept.`,
      { confirmLabel: 'Clear completed' }
    )
    if (!ok) return
    await api.music.spotifyQueueClearCompleted()
    await qc.invalidateQueries({ queryKey: qk.music.all })
  }

  const paused = queue?.pending.find((card) => card.state === 'paused')
  const runningCard = queue?.pending.find((card) => card.id === active?.queueCardId)
  const settled = downloadStatus?.source === 'spotifyQueue' &&
    ['done', 'error', 'cancelled'].includes(downloadStatus.status)
    ? downloadStatus
    : null

  if (isLoading) return <PageStatus>Loading saved Spotify downloads…</PageStatus>
  if (isError) {
    return <PageStatus>Could not load Music Downloads: {error instanceof Error ? error.message : String(error)}</PageStatus>
  }

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <PageHeader
        title="Spotify download queue"
        subtitle={queue && queue.pendingSources > 0
          ? `${queue.pendingSources} source${queue.pendingSources === 1 ? '' : 's'} · ${queue.pendingTracks} missing track${queue.pendingTracks === 1 ? '' : 's'} · about ${formatBytes(queue.pendingEstimatedBytes)}`
          : 'Save Spotify releases and imported-playlist tracks here, then download when you are ready.'}
        actions={active ? (
          <>
            {active.status === 'paused' ? (
              <button className="btn-primary" disabled={!active.taskId} onClick={() => void control('resume')}>
                Resume
              </button>
            ) : (
              <button
                className="btn-primary"
                disabled={!active.taskId || active.status === 'pausing' || active.status === 'cancelling'}
                onClick={() => void control('pause')}
              >
                {active.status === 'pausing' ? 'Pausing…' : 'Pause'}
              </button>
            )}
            <button className="btn-ghost" disabled={active.status === 'cancelling'} onClick={() => void control('cancel')}>
              {active.status === 'cancelling' ? 'Cancelling…' : 'Cancel run'}
            </button>
          </>
        ) : paused ? (
          <button className="btn-primary" onClick={() => void start(paused, true)}>Resume</button>
        ) : (
          <button
            className="btn-primary"
            disabled={!queue?.pending.length}
            onClick={() => void start()}
          >
            Start all
          </button>
        )}
      />

      {active && runningCard && (
        <div className="mb-7 border-y border-base-700 bg-base-800/60 px-4 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <Link to={runningCard.route} className="font-medium text-white hover:text-accent">
                {runningCard.title}
              </Link>
              <p className="mt-1 truncate text-sm text-gray-300" role="status" aria-live="polite">
                {active.releaseTitle ?? active.title ?? active.message ?? 'Preparing download'}
              </p>
            </div>
            <p className="text-sm tabular-nums text-gray-400">
              {active.itemCount != null && `${active.itemIndex ?? 0}/${active.itemCount} tracks`}
              {(active.failedCount ?? 0) > 0 && ` · ${active.failedCount} failed`}
            </p>
          </div>
          {active.percent != null && (
            <div className="mt-3 h-1.5 overflow-hidden rounded bg-base-600" role="progressbar" aria-label={`Download progress for ${runningCard.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={active.percent}>
              <div className="h-full bg-accent transition-[width]" style={{ width: `${active.percent}%` }} />
            </div>
          )}
          <p className="mt-3 text-xs text-gray-400">
            Finished files are kept. Pausing or cancelling scans them before this run settles.
          </p>
        </div>
      )}

      {settled && !active && (
        <div className={`mb-7 border-y px-4 py-3 text-sm ${
          settled.status === 'error'
            ? 'border-red-800/70 bg-red-950/30 text-red-200'
            : (settled.failedCount ?? 0) > 0
              ? 'border-amber-800/70 bg-amber-950/30 text-amber-100'
              : 'border-base-700 bg-base-800/50 text-gray-300'
        }`} role="status">
          <p className="font-medium">
            {settled.status === 'cancelled'
              ? 'Download run cancelled'
              : settled.status === 'error'
                ? 'Download run failed'
                : (settled.failedCount ?? 0) > 0
                  ? 'Download run finished with unresolved tracks'
                  : 'Download run complete'}
          </p>
          <p className="mt-1">
            {settled.message ?? `${settled.resolvedCount ?? 0} resolved · ${settled.failedCount ?? 0} failed`}
          </p>
        </div>
      )}

      <Section title="Queued" subtitle={items.length ? `${items.length}` : undefined}>
        {!items.length ? (
          <EmptyState
            title={active ? 'No later downloads queued' : 'No Spotify downloads saved'}
            body={active
              ? 'This run will stop after the active card unless more music is added.'
              : 'Open a local artist, album, or imported Spotify playlist and add the missing music you want to download later.'}
            action={<Link className="btn-primary" to="/music">Open music library</Link>}
          />
        ) : (
          <SortableList
            ids={items.map((card) => card.id)}
            sensors={sensors}
            onDragEnd={onDragEnd}
            className="card overflow-hidden p-0"
          >
            {items.map((card, index) => (
              <SortableRow key={card.id} id={card.id} className="border-b border-base-700 last:border-0">
                {(handle) => (
                  <QueueCardRow
                    card={card}
                    handle={handle}
                    active={false}
                    queueRunning={Boolean(active)}
                    canMoveUp={index > 0}
                    canMoveDown={index < items.length - 1}
                    onMoveUp={() => void moveCard(card.id, -1)}
                    onMoveDown={() => void moveCard(card.id, 1)}
                    onStart={() => active
                      ? void prioritize(card)
                      : void start(card, card.state === 'paused')}
                    onRemove={() => void removeCard(card)}
                    onRemoveSelection={(id) => void removeSelection(id)}
                  />
                )}
              </SortableRow>
            ))}
          </SortableList>
        )}
      </Section>

      {queue?.completed.length ? (
        <Section title="Completed" subtitle={`${queue.completed.length}`}>
          <div className="mb-3 flex justify-end gap-2">
            <button className="btn-ghost" aria-expanded={completedOpen} aria-controls="completed-download-cards" onClick={() => setCompletedOpen((open) => !open)}>
              {completedOpen ? 'Hide' : 'Show'} completed
            </button>
            <button className="btn-ghost" onClick={() => void clearCompleted()}>Clear completed</button>
          </div>
          {completedOpen && (
            <div id="completed-download-cards" className="card overflow-hidden p-0">
              {completed.visible.map((card) => (
                <QueueCardRow
                  key={card.id}
                  card={card}
                  active={false}
                  queueRunning={false}
                  onStart={() => undefined}
                  onRemove={() => void removeCard(card)}
                  onRemoveSelection={(id) => void removeSelection(id)}
                />
              ))}
              {completed.hasMore && <div ref={completed.sentinelRef} className="h-8" />}
            </div>
          )}
        </Section>
      ) : null}
    </div>
  )
}

function QueueCardRow({
  card,
  handle,
  active,
  queueRunning,
  canMoveUp = false,
  canMoveDown = false,
  onMoveUp,
  onMoveDown,
  onStart,
  onRemove,
  onRemoveSelection
}: {
  card: SpotifyDownloadQueueCard
  handle?: ReactNode
  active: boolean
  queueRunning: boolean
  canMoveUp?: boolean
  canMoveDown?: boolean
  onMoveUp?: () => void
  onMoveDown?: () => void
  onStart: () => void
  onRemove: () => void
  onRemoveSelection: (id: number) => void
}) {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [reviewTrack, setReviewTrack] = useState<SpotifyDownloadQueueTrack | null>(null)

  async function configureTrack(
    track: SpotifyDownloadQueueTrack,
    patch: { audioSourceUrl?: string | null; allowUnverified?: boolean }
  ): Promise<void> {
    try {
      await api.music.spotifySetTrackDownloadOptions({
        sourceKind: track.sourceKind,
        trackId: track.id,
        ...patch
      })
      await qc.invalidateQueries({ queryKey: qk.music.all })
      toast('Download choice saved; the track is ready to retry', 'success')
    } catch (error) {
      toastError(error)
    }
  }
  const broaderCandidates = card.selections.flatMap((selection) =>
    selection.tracks.filter((track) =>
      track.missing && !track.allowUnverified && !track.audioSourceUrl
    )
  )
  async function configureAllBroader(): Promise<void> {
    try {
      await Promise.all(broaderCandidates.map((track) =>
        api.music.spotifySetTrackDownloadOptions({
          sourceKind: track.sourceKind,
          trackId: track.id,
          allowUnverified: true
        })
      ))
      await qc.invalidateQueries({ queryKey: qk.music.all })
      toast(
        `Broader matching enabled for ${broaderCandidates.length} track${broaderCandidates.length === 1 ? '' : 's'}`,
        'success'
      )
    } catch (error) {
      toastError(error)
    }
  }
  async function rejectCandidate(track: SpotifyDownloadQueueTrack): Promise<void> {
    if (!track.candidate) return
    try {
      await api.music.spotifyRejectDownloadCandidate({
        sourceKind: track.sourceKind,
        trackId: track.id
      })
      await qc.invalidateQueries({ queryKey: qk.music.all })
      toast('Candidate rejected; the track is ready to retry', 'success')
    } catch (error) {
      toastError(error)
    }
  }
  const stateLabel = card.state === 'failed'
    ? 'Needs retry'
    : card.state === 'paused' ? 'Paused' : card.state === 'completed' ? 'Completed' : 'Queued'
  const addRoute = card.entityKind === 'artist' && card.entityId != null
    ? `/music/artists/${card.entityId}?spotify=download`
    : card.route
  return (
    <article className="px-4 py-4">
      <div className="flex items-start gap-3">
        {handle && <div className="mt-0.5 shrink-0">{handle}</div>}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={card.route} className="truncate font-medium text-white hover:text-accent">
              {card.title}
            </Link>
            <span className={card.state === 'failed' ? 'chip text-xs text-red-300' : 'chip text-xs'}>
              {stateLabel}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            {[card.subtitle, `${card.missingCount} missing`, `about ${formatBytes(card.missingEstimatedBytes)}`].filter(Boolean).join(' · ')}
          </p>
          {card.error && <p className="mt-2 text-sm text-red-300">{card.error}</p>}
          {card.error && /spotdl|ffmpeg/i.test(card.error) && (
            <Link className="mt-2 inline-block text-xs text-accent hover:underline" to="/settings">
              Check downloader settings
            </Link>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-2">
          {card.state !== 'completed' && !active && (
            <button className="btn-ghost px-2 py-1 text-xs" onClick={onStart}>
              {queueRunning
                ? 'Run next'
                : card.state === 'failed' ? 'Retry' : card.state === 'paused' ? 'Resume' : 'Start this'}
            </button>
          )}
          <button
            className="btn-ghost px-2 py-1 text-xs"
            aria-expanded={open}
            aria-controls={`download-card-${card.id}-selections`}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Hide details' : card.sourceKind === 'playlist' ? 'Show tracks' : 'Show releases'}
          </button>
          <ActionMenu
            items={[
              ...(card.sourceKind === 'entity'
                ? [{ label: 'Add releases', onSelect: () => { window.location.hash = `#${addRoute}` } }]
                : []),
              ...(card.sourceUrl ? [{ label: 'Open in Spotify', onSelect: () => api.app.openExternal(card.sourceUrl!) }] : []),
              { label: 'Remove from downloads', onSelect: onRemove, danger: true },
              ...(onMoveUp ? [{ label: 'Move up', onSelect: onMoveUp, disabled: !canMoveUp }] : []),
              ...(onMoveDown ? [{ label: 'Move down', onSelect: onMoveDown, disabled: !canMoveDown }] : [])
            ]}
          />
        </div>
      </div>
      {open && (
        <div id={`download-card-${card.id}-selections`} className="ml-8 mt-4 divide-y divide-base-700 border-t border-base-700">
          {card.state === 'failed' && broaderCandidates.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 py-3">
              <p className="text-xs text-gray-400">
                Normal filtered YouTube matching failed for these tracks.
              </p>
              <button
                className="btn-ghost px-2 py-1 text-xs"
                disabled={active}
                onClick={() => void configureAllBroader()}
              >
                Try broader matching for all failed ({broaderCandidates.length})
              </button>
            </div>
          )}
          {card.selections.map((selection) => (
            <div key={selection.id} className="flex items-center gap-3 py-3 text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate text-gray-200">{selection.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {selection.subtitle}
                  {selection.trackCount > 1 && ` · ${selection.trackCount} tracks`}
                  {` · ${selection.missingCount} missing`}
                </p>
                {selection.error && <p className="mt-1 text-xs text-red-300">{selection.error}</p>}
                {selection.tracks.filter((track) => track.missing || track.candidate).map((track) => (
                  <div key={`${track.sourceKind}-${track.id}`} className="mt-3 rounded border border-base-700 bg-base-900/40 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs text-gray-200">{track.title}</p>
                        <p className="mt-0.5 truncate text-xs text-gray-500">{track.artist}</p>
                        {track.candidate && <p className="mt-1 text-xs text-amber-300">Downloaded locally; needs verification</p>}
                        {track.error && <p className="mt-1 text-xs text-red-300">{track.error}</p>}
                        {track.audioSourceUrl && <p className="mt-1 text-xs text-green-400">Manual YouTube source saved</p>}
                        {track.allowUnverified && !track.audioSourceUrl && <p className="mt-1 text-xs text-amber-300">Broader matching enabled</p>}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {track.candidate ? (
                          <>
                            <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setReviewTrack(track)}>
                              Review downloaded
                            </button>
                            <button className="btn-ghost px-2 py-1 text-xs" onClick={() => void rejectCandidate(track)}>
                              Reject and retry
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-ghost px-2 py-1 text-xs"
                              onClick={() => void configureTrack(track, { allowUnverified: !track.allowUnverified })}
                            >
                              {track.allowUnverified ? 'Use normal matching' : 'Try broader match'}
                            </button>
                            <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setReviewTrack(track)}>
                              Find or replace source
                            </button>
                            {track.audioSourceUrl && (
                              <button
                                className="btn-ghost px-2 py-1 text-xs"
                                onClick={() => void configureTrack(track, { audioSourceUrl: null })}
                              >
                                Clear source
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn-ghost px-2 py-1 text-xs"
                aria-label={`Remove ${selection.title} from downloads`}
                disabled={active}
                onClick={() => onRemoveSelection(selection.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {reviewTrack && <SpotifyTrackRecoveryDialog sourceKind={reviewTrack.sourceKind} trackId={reviewTrack.id}
        title={reviewTrack.title} artist={reviewTrack.artist} duration={reviewTrack.duration ?? null}
        candidate={reviewTrack.candidate} initialUrl={reviewTrack.audioSourceUrl ?? ''} onClose={() => setReviewTrack(null)} />}
    </article>
  )
}
