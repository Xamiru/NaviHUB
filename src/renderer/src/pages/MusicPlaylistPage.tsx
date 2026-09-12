import SpotifyTrackRecoveryDialog from '../components/SpotifyTrackRecoveryDialog'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { useDebouncedValue, useDialog, useIncrementalList } from '../lib/hooks'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import ActionMenu from '../components/ActionMenu'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import MusicTrackRow from '../components/MusicTrackRow'
import { confirmDialog } from '../lib/confirm'
import { RelationshipTrail } from '../components/EditorialDetailFrame'
import CoverImage from '../components/CoverImage'
import { formatDuration } from '../components/MusicTrackRow'
import { usePersistedState } from '../lib/navState'
import { useDownloadStatus } from '../components/MusicDownloadDialog'
import { toast, toastError } from '../lib/toast'
import type {
  MusicPlaylistEntry,
  MusicPlaylistItem,
  MusicSpotifyPlaylistEntry,
  MusicTrack
} from '@shared/types'

const TWO_GB = 2 * 1024 ** 3
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
  return bytes >= 1024 ** 3
    ? `${(bytes / 1024 ** 3).toFixed(1)} GB`
    : `${Math.ceil(bytes / 1024 ** 2)} MB`
}

export default function MusicPlaylistPage() {
  const { id } = useParams()
  const playlistId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const player = usePlayerControls()
  const downloadStatus = useDownloadStatus()
  const [search, setSearch] = usePersistedState('spotifyPlaylistSearch', '')
  const [availability, setAvailability] = usePersistedState<'all' | 'playable' | 'missing' | 'attention' | 'skipped'>(
    'spotifyPlaylistAvailability',
    'all'
  )

  const { data: playlist, isLoading } = useQuery({
    queryKey: qk.music.playlist(playlistId),
    queryFn: () => api.music.playlist(playlistId)
  })
  const { data: downloadQueue } = useQuery({
    queryKey: qk.music.spotifyQueue,
    queryFn: () => api.music.spotifyDownloadQueue()
  })

  const invalidate = (): void => {
    qc.invalidateQueries({ queryKey: qk.music.playlists })
    qc.invalidateQueries({ queryKey: qk.music.playlist(playlistId) })
  }

  // Optimistic drag-reorder over the server's item list (shared with lists).
  const ordinarySeed = useMemo(() => playlist?.items.filter(
    (item): item is MusicPlaylistEntry => item.kind === 'local'
  ), [playlist?.items])
  const { items: sortableItems, setItems, sensors, onDragEnd } = useOptimisticReorder(
    ordinarySeed,
    (next) =>
      api.music.reorderPlaylist(
        playlistId,
        next.map((i) => i.itemId)
      ),
    invalidate
  )

  const [recoveryItem, setRecoveryItem] = useState<MusicSpotifyPlaylistEntry | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [refreshing, setRefreshing] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [localMatchItem, setLocalMatchItem] = useState<MusicSpotifyPlaylistEntry | null>(null)

  const isSpotify = playlist?.source != null
  const allItems = isSpotify ? (playlist?.items ?? []) : sortableItems
  const playable: { item: MusicPlaylistItem; track: MusicTrack }[] = []
  for (const item of allItems) {
    if (item.kind === 'local') playable.push({ item, track: item.track })
    else if (item.matchedTrack) playable.push({ item, track: item.matchedTrack })
  }
  const missingSpotify = allItems.filter(
    (item): item is MusicSpotifyPlaylistEntry => item.kind === 'spotify' && !item.matchedTrack
  )
  const downloadableMissing = missingSpotify.filter((item) => !item.downloadCandidate && !item.downloadSkipped)
  const normalizedSearch = search.trim().toLocaleLowerCase()
  // Incremental loading resets on a new array; keep it stable between renders.
  const filteredItems = useMemo(() => allItems.filter((item) => {
    if (availability === 'attention' && (item.kind !== 'spotify' || (!item.downloadError && !item.downloadCandidate))) return false
    if (availability === 'skipped' && (item.kind !== 'spotify' || !item.downloadSkipped)) return false
    if (availability === 'playable' && item.kind === 'spotify' && !item.matchedTrack) return false
    if (availability === 'missing' && (item.kind === 'local' || item.matchedTrack)) return false
    if (!normalizedSearch) return true
    const text =
      item.kind === 'local'
        ? `${item.track.title} ${item.track.artistName} ${item.track.albumTitle}`
        : `${item.title} ${item.artists.join(' ')} ${item.albumTitle}`
    return text.toLocaleLowerCase().includes(normalizedSearch)
  }), [allItems, availability, normalizedSearch])
  const incremental = useIncrementalList(filteredItems, 96)
  const busy =
    (downloadStatus?.source === 'spotify' || downloadStatus?.source === 'spotifyQueue') &&
    downloadStatus.playlistId === playlistId &&
    ACTIVE_DOWNLOAD.has(downloadStatus.status)

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!playlist) return <PageStatus>Playlist not found.</PageStatus>

  function playItem(item: MusicPlaylistItem, shuffle = false): void {
    const playableIndex = playable.findIndex((entry) => entry.item === item)
    const tracks = playable.map((entry) => musicTrackToPlayerTrack(entry.track))
    if (tracks.length === 0) return
    player.playQueue(tracks, Math.max(0, playableIndex), { shuffle })
  }

  async function removeItem(itemId: number): Promise<void> {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId))
    await api.music.removePlaylistTrack(itemId)
    invalidate()
  }

  async function removeSpotifyItem(itemId: number): Promise<void> {
    await api.music.spotifyRemoveItem(itemId)
    invalidate()
    qc.invalidateQueries({ queryKey: qk.music.spotifyQueue })
  }

  async function useLocalVersion(itemId: number, trackId: number): Promise<void> {
    await api.music.spotifyMatchPlaylistItem({ itemId, trackId })
    setLocalMatchItem(null)
    invalidate()
    qc.invalidateQueries({ queryKey: qk.music.spotifyQueue })
    toast('Playlist song linked to the local recording', 'success')
  }

  async function rejectDownloaded(itemId: number): Promise<void> {
    await api.music.spotifyRejectDownloadCandidate({ sourceKind: 'playlistItem', trackId: itemId })
    invalidate()
    qc.invalidateQueries({ queryKey: qk.music.spotifyQueue })
    toast('Candidate rejected; the song is ready to retry', 'success')
  }

  async function queueDownload(
    itemsToDownload: MusicSpotifyPlaylistEntry[],
    startNow = false
  ): Promise<void> {
    if (itemsToDownload.length === 0 || busy) return
    try {
      const result = await api.music.spotifyQueueAddPlaylist({
        playlistId,
        itemIds: itemsToDownload.map((item) => item.itemId)
      })
      await qc.invalidateQueries({ queryKey: qk.music.spotifyQueue })
      if (result.jobId == null) {
        toast('Every selected song is already in the local library', 'success')
        return
      }
      if (startNow) {
        const freshQueue = await api.music.spotifyDownloadQueue()
        const mergedCard = freshQueue.pending.find((card) => card.id === result.jobId)
        const missingCount = mergedCard?.missingCount ?? result.missingCount
        const estimatedBytes = mergedCard?.missingEstimatedBytes ?? Math.ceil(
          itemsToDownload.reduce(
            (total, item) => total + (item.duration == null ? 4 * 1024 * 1024 : item.duration * 16_000),
            0
          ) * 1.05
        )
        if (missingCount > 100 || estimatedBytes > TWO_GB) {
          const ok = await confirmDialog(
            `Download ${missingCount} missing song${missingCount === 1 ? '' : 's'} as source-preserved Opus files? The current queue estimate is ${formatBytes(estimatedBytes)}. Finished files are kept if you pause or cancel.`,
            { confirmLabel: 'Download' }
          )
          if (!ok) {
            toast('Saved to Music Downloads without starting', 'success', {
              label: 'View downloads',
              route: '/music/downloads'
            })
            return
          }
        }
        const queueWasActive = downloadStatus?.source === 'spotifyQueue' &&
          ACTIVE_DOWNLOAD.has(downloadStatus.status)
        await api.music.spotifyQueueStart({ jobId: result.jobId, prioritize: true })
        toast(
          queueWasActive
            ? downloadStatus.status === 'paused'
              ? 'Saved to run after the paused download resumes'
              : 'Saved first; this playlist will run next'
            : `Starting ${missingCount} song${missingCount === 1 ? '' : 's'}`,
          'success',
          { label: 'View downloads', route: '/music/downloads' }
        )
      } else {
        toast(
          result.addedSelections > 0
            ? `Added ${result.addedSelections} song${result.addedSelections === 1 ? '' : 's'} to Music Downloads`
            : 'Those songs are already in Music Downloads',
          'success',
          { label: 'View downloads', route: '/music/downloads' }
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
    } catch (error) {
      toastError(error)
    }
  }

  const playlistQueueCard = [...(downloadQueue?.pending ?? []), ...(downloadQueue?.completed ?? [])]
    .find((card) => card.sourceKind === 'playlist' && card.playlistId === playlistId)
  const queuedItemIds = new Set(
    playlistQueueCard?.selections
      .filter((selection) => selection.kind === 'playlistItem')
      .map((selection) => selection.sourceId) ?? []
  )
  const allMissingQueued = downloadableMissing.length > 0 &&
    downloadableMissing.every((item) => queuedItemIds.has(item.itemId))

  async function saveTitle(): Promise<void> {
    const t = title.trim()
    setEditing(false)
    if (!t || t === playlist?.title) return
    await api.music.updatePlaylist(playlistId, { title: t })
    invalidate()
  }

  async function del(): Promise<void> {
    const ok = await confirmDialog(
      `Delete the playlist “${playlist?.title}”? This can’t be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (!ok) return
    await api.music.removePlaylist(playlistId)
    qc.invalidateQueries({ queryKey: qk.music.playlists })
    navigate('/music', { replace: true })
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <BackButton />
      <RelationshipTrail>
        <Link to="/music" className="hover:text-accent">Sonic archive</Link>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>Playlists</span>
        <span className="ml-auto tabular-nums text-gray-500">{allItems.length} tracks</span>
      </RelationshipTrail>

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {editing ? (
            <input
              aria-label="Playlist name"
              className="input text-xl font-bold"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void saveTitle()
                if (e.key === 'Escape') setEditing(false)
              }}
            />
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{playlist.title}</h1>
              <button
                className="btn-ghost px-2 py-1 text-xs"
                onClick={() => {
                  setTitle(playlist.title)
                  setEditing(true)
                }}
              >
                Rename
              </button>
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Playlist · {allItems.length} {allItems.length === 1 ? 'track' : 'tracks'}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-2">
          <button
            className="btn-primary"
            onClick={() => playable[0] && playItem(playable[0].item)}
            disabled={!playable.length}
          >
            Play
          </button>
          {downloadableMissing.length > 0 && (
            <button
              className="btn-ghost"
              disabled={busy && !allMissingQueued}
              onClick={() => {
                if (allMissingQueued) navigate('/music/downloads')
                else void queueDownload(downloadableMissing)
              }}
            >
              {allMissingQueued ? 'View downloads' : `Add missing (${downloadableMissing.length})`}
            </button>
          )}
          <button
            className="btn-ghost"
            disabled={!playable.length}
            onClick={() =>
              playTracks(
                player,
                playable.map((item) => item.track),
                { shuffle: true }
              )
            }
          >
            Shuffle
          </button>
          <ActionMenu
            items={[
              ...(downloadableMissing.length > 0
                ? [{
                    label: downloadStatus?.source === 'spotifyQueue' && ACTIVE_DOWNLOAD.has(downloadStatus.status)
                      ? downloadStatus.status === 'paused' ? 'Run missing after paused' : 'Run missing next'
                      : 'Download missing now',
                    disabled: busy,
                    onSelect: () => queueDownload(downloadableMissing, true)
                  }]
                : []),
              ...(playlist.source
                ? [
                    {
                      label: 'Refresh from Spotify',
                      disabled: refreshing || Boolean(busy),
                      onSelect: async () => {
                        setRefreshing(true)
                        try {
                          await api.music.spotifyRefreshPlaylist(playlistId)
                          await qc.invalidateQueries({ queryKey: qk.music.all })
                          toast('Playlist refreshed; local files and your choices were kept', 'success')
                        } finally { setRefreshing(false) }
                      }
                    },
                    {
                      label: 'Open source in Spotify',
                      onSelect: () => api.app.openExternal(playlist.source!.sourceUrl)
                    }
                  ]
                : []),
              { label: 'Delete playlist…', danger: true, onSelect: del }
            ]}
          />
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-400">
        {allItems.length} total · {playlist.playableCount} playable
        {isSpotify && ` · ${playlist.missingCount} missing${playlist.verificationCount ? ` · ${playlist.verificationCount} to verify` : ''}`}
      </p>

      {busy && downloadStatus && (
        <div className="mb-5 rounded-md bg-base-700/60 p-3" role="status">
          <div className="flex items-center justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="line-clamp-1 text-gray-300">
                {downloadStatus.status === 'processing'
                  ? (downloadStatus.message ?? 'Updating library')
                  : (downloadStatus.title ?? 'Starting spotDL')}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {downloadStatus.itemIndex ?? 0}/{downloadStatus.itemCount ?? 0} completed
                {downloadStatus.resolvedCount != null &&
                  ` · ${downloadStatus.resolvedCount} resolved · ${downloadStatus.failedCount ?? 0} remaining`}
              </p>
            </div>
            {downloadStatus.source === 'spotifyQueue' ? (
              <Link className="btn-ghost shrink-0" to="/music/downloads">View downloads</Link>
            ) : (
              <button
                className="btn-ghost shrink-0"
                onClick={async () => {
                  await api.music.downloadCancel(downloadStatus.id)
                  qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
                }}
              >
                Cancel download
              </button>
            )}
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded bg-base-600"
            role="progressbar"
            aria-label="Missing-track download progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(downloadStatus.percent ?? 0)}
          >
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${Math.min(100, downloadStatus.percent ?? 0)}%` }}
            />
          </div>
        </div>
      )}

      {isSpotify && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="spotify-playlist-search">Search this playlist</label>
          <input
            id="spotify-playlist-search"
            className="input min-w-56 flex-1"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search this playlist"
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Track availability">
            {(['all', 'playable', 'missing', 'attention', 'skipped'] as const).map((value) => (
              <button
                key={value}
                className={availability === value ? 'pill-active' : 'pill'}
                aria-pressed={availability === value}
                onClick={() => setAvailability(value)}
              >
                {value === 'all' ? 'All' : value === 'playable' ? 'Playable' : value === 'attention' ? 'Needs attention' : value === 'skipped' ? 'Skipped' : 'Missing'}
              </button>
            ))}
          </div>
        </div>
      )}

      {isSpotify && <div className="mb-4 flex flex-wrap items-center gap-2">
        <button className="btn-ghost" onClick={() => setSelected(new Set(filteredItems.filter((item) => item.kind === 'spotify' && !item.matchedTrack && !item.downloadCandidate && !item.downloadSkipped).map((item) => item.itemId)))}>Select matching missing songs</button>
        <button className="btn-ghost" onClick={() => setSelected(new Set())}>Clear selection</button>
        <button className="btn-primary" disabled={Boolean(busy) || !downloadableMissing.some((item) => selected.has(item.itemId))}
          onClick={async () => {
            const itemIds = downloadableMissing.filter((item) => selected.has(item.itemId)).map((item) => item.itemId)
            const seconds = downloadableMissing.filter((item) => selected.has(item.itemId))
              .reduce((sum, item) => sum + (item.duration ?? 240), 0)
            const estimatedBytes = Math.ceil(seconds * 160000 / 8)
            if ((itemIds.length > 100 || estimatedBytes > TWO_GB) && !await confirmDialog(
              `Download ${itemIds.length} selected songs? Estimated size: ${formatBytes(estimatedBytes)}. Finished files are kept if cancelled.`,
              { confirmLabel: 'Download' }
            )) return
            await api.music.spotifyDownloadPlaylist({ playlistId, itemIds })
            await qc.invalidateQueries({ queryKey: qk.music.all })
          }}>Download selected ({downloadableMissing.filter((item) => selected.has(item.itemId)).length})</button>
        {refreshing && <p role="status" className="text-sm text-gray-400">Refreshing playlist metadata…</p>}
      </div>}

      <AddTracksPicker
        playlistId={playlistId}
        excludeIds={playable.map((i) => i.track.id)}
        onAdded={invalidate}
      />

      {allItems.length === 0 ? (
        <p className="text-sm text-gray-400">No tracks yet — search above to add some.</p>
      ) : isSpotify ? (
        <>
          <div className="space-y-0.5">
            {incremental.visible.map((item) =>
              item.kind === 'local' ? (
                <MusicTrackRow
                  key={`local-${item.itemId}`}
                  track={item.track}
                  showAlbum
                  onPlay={() => playItem(item)}
                  onRemove={() => removeItem(item.itemId)}
                />
              ) : item.matchedTrack ? (
                <MusicTrackRow
                  key={`spotify-${item.itemId}`}
                  track={item.matchedTrack}
                  showAlbum
                  onPlay={() => playItem(item)}
                  onRemove={() => removeSpotifyItem(item.itemId)}
                  trailing={item.localAlternatives.length > 0 ? (
                    <button
                      className="btn-ghost px-2 py-1 text-xs"
                      onClick={() => setLocalMatchItem(item)}
                    >
                      Change local version
                    </button>
                  ) : undefined}
                />
              ) : (
                <SpotifyMissingRow
                  key={`spotify-${item.itemId}`}
                  item={item}
                  busy={busy}
                  queued={queuedItemIds.has(item.itemId)}
                  onQueue={() => {
                    if (queuedItemIds.has(item.itemId)) navigate('/music/downloads')
                    else void queueDownload([item])
                  }}
                  onUseLocal={() => setLocalMatchItem(item)}
                  onConfirmDownloaded={() => setRecoveryItem(item)}
                  onRejectDownloaded={() => void rejectDownloaded(item.itemId)}
                  selected={selected.has(item.itemId)}
                  onSelect={() => setSelected((old) => { const next = new Set(old); if (next.has(item.itemId)) next.delete(item.itemId); else next.add(item.itemId); return next })}
                  onResolve={() => setRecoveryItem(item)}
                  onRetry={async () => {
                    await api.music.spotifyDownloadPlaylist({ playlistId, itemIds: [item.itemId] })
                    await qc.invalidateQueries({ queryKey: qk.music.all })
                  }}
                  onSkip={async () => {
                    await api.music.spotifySkipItem(item.itemId, !item.downloadSkipped)
                    await qc.invalidateQueries({ queryKey: qk.music.all })
                  }}
                  onRemove={() => removeSpotifyItem(item.itemId)}
                />
              )
            )}
          </div>
          <div ref={incremental.sentinelRef} />
        </>
      ) : (
        <SortableList ids={sortableItems.map((i) => i.itemId)} sensors={sensors} onDragEnd={onDragEnd}>
          {sortableItems.map((item) => (
            <SortableRow key={item.itemId} id={item.itemId}>
              {(handle) => (
                <MusicTrackRow
                  track={item.track}
                  showAlbum
                  onPlay={() => playItem(item)}
                  onRemove={() => removeItem(item.itemId)}
                  leading={handle}
                />
              )}
            </SortableRow>
          ))}
        </SortableList>
      )}
      {recoveryItem && <SpotifyTrackRecoveryDialog sourceKind="playlistItem" trackId={recoveryItem.itemId}
        title={recoveryItem.title} artist={recoveryItem.artists.join(', ')} duration={recoveryItem.duration}
        candidate={recoveryItem.downloadCandidate} initialUrl={recoveryItem.audioSourceUrl ?? ''}
        onClose={() => setRecoveryItem(null)} />}
      {localMatchItem && (
        <UseLocalVersionDialog
          item={localMatchItem}
          onClose={() => setLocalMatchItem(null)}
          onChoose={(trackId) => useLocalVersion(localMatchItem.itemId, trackId)}
        />
      )}
    </div>
  )
}

function SpotifyMissingRow({
  item,
  busy,
  queued,
  onQueue,
  onUseLocal,
  onConfirmDownloaded,
  onRejectDownloaded,
  selected, onSelect, onResolve, onRetry, onSkip,
  onRemove
}: {
  item: MusicSpotifyPlaylistEntry
  busy: boolean
  queued: boolean
  onQueue: () => void
  onUseLocal: () => void
  onConfirmDownloaded: () => void
  onRejectDownloaded: () => void
  selected: boolean
  onSelect: () => void
  onResolve: () => void
  onRetry: () => void
  onSkip: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md px-2 py-1.5 text-gray-400 hover:bg-base-700 sm:flex-nowrap">
      <label className="shrink-0"><span className="sr-only">Select {item.title}</span>
        <input type="checkbox" checked={selected} disabled={Boolean(item.downloadSkipped || item.downloadCandidate)} onChange={onSelect} />
      </label>
      <CoverImage
        path={item.coverPath}
        alt={item.title}
        className="h-10 w-10 shrink-0 opacity-85"
        fallback="music"
        thumbWidth={80}
      />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-medium text-gray-300">{item.title}</p>
        <p className="line-clamp-1 text-xs text-gray-500">
          {item.artists.join(', ')} · {item.albumTitle} · {item.downloadCandidate ? 'Downloaded locally; needs verification' : 'Missing locally'}
        </p>
        {item.downloadSkipped && <p className="text-xs text-gray-400">Skipped for now</p>}
        {item.downloadError && <p className="line-clamp-2 text-xs text-red-300">{item.downloadError}</p>}
        {item.downloadCandidate && <p className="line-clamp-2 text-xs text-amber-300">Downloaded; verify the local version before playing.</p>}
        {item.audioSourceUrl && <p className="text-xs text-green-400">Manual YouTube source saved</p>}
        {item.allowUnverified && !item.audioSourceUrl && <p className="text-xs text-amber-300">Broader matching enabled</p>}
      </div>
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-gray-500">
        {formatDuration(item.duration)}
      </span>
      {item.localAlternatives.length > 0 && (
        <button className="btn-ghost px-2 py-1 text-xs" onClick={onUseLocal}>
          Use local version
        </button>
      )}
      {item.downloadCandidate && (
        <>
          <button className="btn-ghost px-2 py-1 text-xs" onClick={onConfirmDownloaded}>Review downloaded</button>
          <button className="btn-ghost px-2 py-1 text-xs" onClick={onRejectDownloaded}>Reject and retry</button>
        </>
      )}
      <ActionMenu items={[
        { label: 'Find audio or choose local recording', onSelect: onResolve },
        { label: 'Retry this song', disabled: busy || Boolean(item.downloadSkipped || item.downloadCandidate), onSelect: onRetry },
        { label: item.downloadSkipped ? 'Include in downloads again' : 'Skip for now', disabled: busy, onSelect: onSkip }
      ]} />
      <button className="btn-ghost px-2 py-1 text-xs" disabled={Boolean(item.downloadSkipped) || Boolean(item.downloadCandidate) || (busy && !queued)} onClick={onQueue}>
        {queued ? 'View queue' : item.downloadCandidate ? 'Verify first' : 'Add to queue'}
      </button>
      <button className="btn-ghost px-2 py-1 text-xs" aria-label={`Remove ${item.title} from playlist`} onClick={onRemove}>
        Remove
      </button>
    </div>
  )
}

function UseLocalVersionDialog({
  item,
  onClose,
  onChoose
}: {
  item: MusicSpotifyPlaylistEntry
  onClose: () => void
  onChoose: (trackId: number) => Promise<void>
}) {
  const dialogRef = useDialog(onClose)
  const [savingId, setSavingId] = useState<number | null>(null)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="local-version-title"
        tabIndex={-1}
        className="card max-h-[80vh] w-full max-w-xl overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="local-version-title" className="text-lg font-semibold">Use a local version</h2>
            <p className="mt-1 text-sm text-gray-400">
              Choose the same recording from another album. Live, remix, acoustic and other
              distinct versions are excluded.
            </p>
          </div>
          <button className="btn-ghost px-2" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <p className="mb-3 text-sm text-gray-300">
          {item.title} · {item.artists.join(', ')} · {item.albumTitle}
        </p>
        <div className="space-y-2">
          {item.localAlternatives.map((track) => (
            <div key={track.id} className="flex items-center gap-3 rounded-md bg-base-700/60 p-3">
              <CoverImage
                path={track.coverPath}
                alt=""
                className="h-10 w-10 shrink-0"
                fallback="music"
                thumbWidth={80}
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium text-gray-200">{track.title}</p>
                <p className="line-clamp-1 text-xs text-gray-400">
                  {track.artistName} · {track.albumTitle} · {formatDuration(track.duration)}
                </p>
              </div>
              <button
                className="btn-ghost shrink-0 px-3 py-1.5 text-xs"
                disabled={savingId != null}
                onClick={async () => {
                  setSavingId(track.id)
                  try { await onChoose(track.id) } finally { setSavingId(null) }
                }}
              >
                {savingId === track.id ? 'Linking…' : 'Use this'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Debounced track search with one-click add — the playlist page's equivalent
// of the lists' UniversalPicker, but music-only.
function AddTracksPicker({
  playlistId,
  excludeIds,
  onAdded
}: {
  playlistId: number
  excludeIds: number[]
  onAdded: () => void
}) {
  const [search, setSearch] = useState('')
  const query = useDebouncedValue(search.trim())
  const { data, isLoading } = useQuery({
    queryKey: qk.music.search(query),
    queryFn: () => api.music.search(query),
    enabled: query.length > 0
  })
  const excluded = new Set(excludeIds)
  const results = (data?.tracks ?? []).filter((t) => !excluded.has(t.id)).slice(0, 12)

  async function add(trackId: number): Promise<void> {
    await api.music.addPlaylistTracks(playlistId, [trackId])
    setSearch('')
    onAdded()
  }

  return (
    <div className="relative mb-5">
      <label className="sr-only" htmlFor={`playlist-${playlistId}-add-track`}>Add a track to this playlist</label>
      <input
        id={`playlist-${playlistId}-add-track`}
        className="input"
        placeholder="Add tracks — search by title…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {query && (
        <div className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-base-500 bg-base-800 p-1 shadow-lg">
          {isLoading && <p className="px-2 py-2 text-sm text-gray-400">Searching tracks…</p>}
          {!isLoading && results.length === 0 && (
            <p className="px-2 py-2 text-sm text-gray-400">
              No available tracks match “{query}”.
            </p>
          )}
          {results.map((t) => (
            <button
              key={t.id}
              className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-base-700"
              onClick={() => add(t.id)}
            >
              <span className="text-accent">Add</span>
              <span className="min-w-0">
                <span className="line-clamp-1">{t.title}</span>
                <span className="line-clamp-1 text-xs text-gray-500">
                  {t.artistName} · {t.albumTitle}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
