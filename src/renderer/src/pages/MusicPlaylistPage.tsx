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

  const { data: playlist, isLoading, isLoadingError, refetch } = useQuery({
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
  const [refreshing, setRefreshing] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [localMatchItem, setLocalMatchItem] = useState<MusicSpotifyPlaylistEntry | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)

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
  const downloadableMissing = missingSpotify.filter((item) =>
    !item.downloadCandidate && !item.downloadSkipped && item.localAlternatives.length === 0
  )
  const counts = {
    all: allItems.length,
    playable: playable.length,
    missing: missingSpotify.filter((item) => !item.downloadSkipped).length,
    attention: missingSpotify.filter(needsAttention).length,
    skipped: missingSpotify.filter((item) => item.downloadSkipped).length
  }
  // A remembered filter whose pill is hidden (nothing left in it) falls back to All.
  const filter = (availability === 'attention' || availability === 'skipped') && counts[availability] === 0
    ? 'all'
    : availability
  const normalizedSearch = search.trim().toLocaleLowerCase()
  // Incremental loading resets on a new array; keep it stable between renders.
  const filteredItems = useMemo(() => allItems.filter((item) => {
    const missing = item.kind === 'spotify' && !item.matchedTrack
    if (filter === 'attention' && !(missing && needsAttention(item))) return false
    if (filter === 'skipped' && !(missing && item.downloadSkipped)) return false
    if (filter === 'playable' && missing) return false
    if (filter === 'missing' && (!missing || item.downloadSkipped)) return false
    if (!normalizedSearch) return true
    const text =
      item.kind === 'local'
        ? `${item.track.title} ${item.track.artistName} ${item.track.albumTitle}`
        : `${item.title} ${item.artists.join(' ')} ${item.albumTitle}`
    return text.toLocaleLowerCase().includes(normalizedSearch)
  }), [allItems, filter, normalizedSearch])
  const incremental = useIncrementalList(filteredItems, 96, playlistId)
  const playlistCardId = [...(downloadQueue?.pending ?? []), ...(downloadQueue?.completed ?? [])]
    .find((card) => card.sourceKind === 'playlist' && card.playlistId === playlistId)?.id
  // Queue runs report their card rather than a playlist id.
  const busy = downloadStatus != null && ACTIVE_DOWNLOAD.has(downloadStatus.status) && (
    (downloadStatus.source === 'spotify' && downloadStatus.playlistId === playlistId) ||
    (downloadStatus.source === 'spotifyQueue' && downloadStatus.queueCardId != null && downloadStatus.queueCardId === playlistCardId)
  )
  const queueRunning = downloadStatus?.source === 'spotifyQueue' && ACTIVE_DOWNLOAD.has(downloadStatus.status)

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (isLoadingError) return <PageStatus>Could not load playlist. <button className="btn" onClick={() => void refetch()}>Retry playlist</button></PageStatus>
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
    toast('Now playing your library copy', 'success')
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
    if (itemsToDownload.length === 0) return
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
            toast('Saved to Downloads without starting', 'success', {
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
            ? `Added ${result.addedSelections} song${result.addedSelections === 1 ? '' : 's'} to Downloads`
            : 'Those songs are already in Downloads',
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

  const pills: { key: typeof filter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'playable', label: 'In library', count: counts.playable },
    { key: 'missing', label: 'Missing', count: counts.missing },
    ...(counts.attention ? [{ key: 'attention' as const, label: 'Needs attention', count: counts.attention }] : []),
    ...(counts.skipped ? [{ key: 'skipped' as const, label: 'Skipped', count: counts.skipped }] : [])
  ]

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <BackButton />
      <RelationshipTrail>
        <Link to="/music" className="hover:text-accent">Music</Link>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>Playlists</span>
      </RelationshipTrail>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
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
          <p className="mt-1 text-sm text-gray-400">
            {isSpotify
              ? `From Spotify · ${counts.all} ${counts.all === 1 ? 'song' : 'songs'} · ${counts.playable} in your library${counts.missing ? ` · ${counts.missing} missing` : ''}`
              : `Playlist · ${counts.all} ${counts.all === 1 ? 'track' : 'tracks'}`}
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
          {busy ? (
            <Link className="btn-ghost" to="/music/downloads">View downloads</Link>
          ) : downloadableMissing.length > 0 && (
            <button className="btn-ghost" onClick={() => void queueDownload(downloadableMissing, true)}>
              Download missing ({downloadableMissing.length})
            </button>
          )}
          <ActionMenu
            items={[
              ...(downloadableMissing.length > 0 && !allMissingQueued
                ? [{ label: 'Add missing to Downloads without starting', onSelect: () => queueDownload(downloadableMissing) }]
                : []),
              ...(playlist.source
                ? [
                    {
                      label: refreshing ? 'Refreshing from Spotify…' : 'Refresh from Spotify',
                      disabled: refreshing || Boolean(busy),
                      onSelect: async () => {
                        setRefreshing(true)
                        try {
                          await api.music.spotifyRefreshPlaylist(playlistId)
                          await qc.invalidateQueries({ queryKey: qk.music.all })
                          toast('Playlist refreshed; your files and choices were kept', 'success')
                        } catch (error) {
                          toastError(error)
                        } finally { setRefreshing(false) }
                      }
                    },
                    { label: 'Add songs from your library', onSelect: () => setPickerOpen(true) },
                    { label: 'Open in Spotify', onSelect: () => api.app.openExternal(playlist.source!.sourceUrl) }
                  ]
                : []),
              { label: 'Delete playlist…', danger: true, onSelect: del }
            ]}
          />
        </div>
      </div>

      {busy && downloadStatus && (
        <div className="mb-5 rounded-md bg-base-700/60 p-3" role="status">
          <div className="flex items-center justify-between gap-3 text-sm">
            <p className="line-clamp-1 min-w-0 text-gray-300">
              {downloadStatus.status === 'processing'
                ? (downloadStatus.message ?? 'Adding songs to your library')
                : downloadStatus.title ? `Downloading ${downloadStatus.title}` : (downloadStatus.message ?? 'Starting downloads…')}
            </p>
            <p className="shrink-0 text-xs tabular-nums text-gray-400">
              {downloadStatus.itemIndex ?? 0} of {downloadStatus.itemCount ?? 0}
            </p>
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
            {pills.map((pill) => (
              <button
                key={pill.key}
                className={filter === pill.key ? 'pill-active' : 'pill'}
                aria-pressed={filter === pill.key}
                onClick={() => setAvailability(pill.key)}
              >
                {pill.label} <span className="tabular-nums opacity-70">{pill.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(!isSpotify || pickerOpen) && (
        <AddTracksPicker
          playlistId={playlistId}
          excludeIds={playable.map((i) => i.track.id)}
          onAdded={invalidate}
        />
      )}

      {allItems.length === 0 ? (
        <p className="text-sm text-gray-400">No tracks yet — search above to add some.</p>
      ) : isSpotify ? (
        <>
          {filteredItems.length === 0 && <p className="text-sm text-gray-400">No songs match this view.</p>}
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
                  menuItems={item.localAlternatives.length > 0
                    ? [{ label: 'Change library copy…', onSelect: () => setLocalMatchItem(item) }]
                    : undefined}
                />
              ) : (
                <SpotifyMissingRow
                  key={`spotify-${item.itemId}`}
                  item={item}
                  queued={queuedItemIds.has(item.itemId) && queueRunning}
                  onDownload={() => void queueDownload([item], true)}
                  onFix={() => setRecoveryItem(item)}
                  onUseLocal={() => setLocalMatchItem(item)}
                  onReject={() => void rejectDownloaded(item.itemId)}
                  onSkip={async () => {
                    try {
                      await api.music.spotifySkipItem(item.itemId, !item.downloadSkipped)
                      await qc.invalidateQueries({ queryKey: qk.music.all })
                    } catch (error) { toastError(error) }
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
        candidate={recoveryItem.downloadCandidate} problem={recoveryItem.downloadError}
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

/** A song that still needs a decision: a failed or unconfirmed download, or a library copy to link. */
function needsAttention(item: MusicSpotifyPlaylistEntry): boolean {
  return Boolean(item.downloadError || item.downloadCandidate || item.localAlternatives.length)
}

function missingStatus(item: MusicSpotifyPlaylistEntry, queued: boolean): { text: string; tone: string } {
  if (item.downloadCandidate) return { text: 'Downloaded but not confirmed — listen and check it', tone: 'text-amber-300' }
  if (item.localAlternatives.length) return { text: 'A matching recording is already in your library', tone: 'text-amber-300' }
  if (item.downloadSkipped) return { text: 'Skipped', tone: 'text-gray-500' }
  if (item.downloadError) {
    const review = /^Needs review:\s*/i.test(item.downloadError)
    return {
      text: review ? `Needs a source: ${item.downloadError.replace(/^Needs review:\s*/i, '')}` : item.downloadError,
      tone: review ? 'text-amber-300' : 'text-red-300'
    }
  }
  if (queued) return { text: 'Downloading soon', tone: 'text-gray-400' }
  return { text: item.audioSourceUrl ? 'Not downloaded yet · your chosen source' : 'Not in your library', tone: 'text-gray-500' }
}

function SpotifyMissingRow({
  item,
  queued,
  onDownload,
  onFix,
  onUseLocal,
  onReject,
  onSkip,
  onRemove
}: {
  item: MusicSpotifyPlaylistEntry
  queued: boolean
  onDownload: () => void
  onFix: () => void
  onUseLocal: () => void
  onReject: () => void
  onSkip: () => void
  onRemove: () => void
}) {
  const status = missingStatus(item, queued)
  // One obvious next step per state; everything else lives in the menu.
  const primary = item.downloadCandidate
    ? { label: 'Check', onClick: onFix }
    : item.localAlternatives.length
      ? { label: 'Use library copy', onClick: onUseLocal }
      : item.downloadSkipped
        ? { label: 'Include', onClick: onSkip }
        : item.downloadError
          ? { label: 'Choose audio', onClick: onFix }
          : queued ? null : { label: 'Download', onClick: onDownload }
  return (
    <div className="group flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-base-700">
      <CoverImage
        path={item.coverPath}
        alt=""
        className="h-10 w-10 shrink-0 opacity-60"
        fallback="music"
        thumbWidth={80}
      />
      <button className="min-w-0 flex-1 text-left" onClick={onFix} title="Choose audio">
        <p className="line-clamp-1 text-sm font-medium text-gray-400 group-hover:text-white">{item.title}</p>
        <p className="line-clamp-1 text-xs text-gray-500">{item.artists.join(', ')} · {item.albumTitle}</p>
        <p className={`line-clamp-2 text-xs ${status.tone}`}>{status.text}</p>
      </button>
      {primary && (
        <button className="btn-ghost shrink-0 px-2 py-1 text-xs" onClick={primary.onClick}>{primary.label}</button>
      )}
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-gray-500">
        {formatDuration(item.duration)}
      </span>
      <ActionMenu
        label="⋯"
        ariaLabel={`More actions for ${item.title}`}
        buttonClassName="px-1 text-gray-500 hover:text-white"
        items={[
          ...(primary?.onClick !== onFix ? [{ label: 'Choose audio or a library file…', onSelect: onFix }] : []),
          ...(item.downloadError && !item.localAlternatives.length && !item.downloadCandidate && !item.downloadSkipped
            ? [{ label: 'Try automatic download again', onSelect: onDownload }]
            : []),
          ...(item.downloadCandidate ? [{ label: 'Reject downloaded version', onSelect: onReject }] : []),
          ...(!item.downloadSkipped ? [{ label: 'Skip this song', onSelect: onSkip }] : []),
          { label: 'Remove from playlist', danger: true, onSelect: onRemove }
        ]}
      />
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
            <h2 id="local-version-title" className="text-lg font-semibold">Use a copy from your library</h2>
            <p className="mt-1 text-sm text-gray-400">
              The same recording from another release. Live, remix, acoustic and other
              distinct versions are not offered.
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
