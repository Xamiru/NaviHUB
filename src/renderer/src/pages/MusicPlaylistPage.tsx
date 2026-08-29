import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
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

export default function MusicPlaylistPage() {
  const { id } = useParams()
  const playlistId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const player = usePlayer()
  const downloadStatus = useDownloadStatus()
  const [search, setSearch] = usePersistedState('spotifyPlaylistSearch', '')
  const [availability, setAvailability] = usePersistedState<'all' | 'playable' | 'missing'>(
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
  const ordinarySeed = playlist?.items.filter(
    (item): item is MusicPlaylistEntry => item.kind === 'local'
  )
  const { items: sortableItems, setItems, sensors, onDragEnd } = useOptimisticReorder(
    ordinarySeed,
    (next) =>
      api.music.reorderPlaylist(
        playlistId,
        next.map((i) => i.itemId)
      ),
    invalidate
  )

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')

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
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const filteredItems = allItems.filter((item) => {
    if (availability === 'playable' && item.kind === 'spotify' && !item.matchedTrack) return false
    if (availability === 'missing' && (item.kind === 'local' || item.matchedTrack)) return false
    if (!normalizedSearch) return true
    const text =
      item.kind === 'local'
        ? `${item.track.title} ${item.track.artistName} ${item.track.albumTitle}`
        : `${item.title} ${item.artists.join(' ')} ${item.albumTitle}`
    return text.toLocaleLowerCase().includes(normalizedSearch)
  })
  const incremental = useIncrementalList(filteredItems, 96)
  const busy =
    (downloadStatus?.source === 'spotify' || downloadStatus?.source === 'spotifyQueue') &&
    downloadStatus.playlistId === playlistId &&
    ['starting', 'downloading', 'processing'].includes(downloadStatus.status)

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

  async function queueDownload(
    itemsToDownload: MusicSpotifyPlaylistEntry[],
    startNow = false
  ): Promise<void> {
    if (itemsToDownload.length === 0 || busy) return
    const bytes = Math.ceil(
      itemsToDownload.reduce(
        (total, item) => total + (item.duration == null ? 10 * 1024 * 1024 : item.duration * 40_000),
        0
      ) * 1.05
    )
    if (startNow && (itemsToDownload.length > 100 || bytes > 2 * 1024 ** 3)) {
      const size =
        bytes >= 1024 ** 3
          ? `${(bytes / 1024 ** 3).toFixed(1)} GB`
          : `${Math.ceil(bytes / 1024 ** 2)} MB`
      const ok = await confirmDialog(
        `Download ${itemsToDownload.length} missing songs as 320 kbps MP3 files? Estimated size: ${size}. Completed chunks are kept if you cancel.`,
        { confirmLabel: 'Download' }
      )
      if (!ok) return
    }
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
        await api.music.spotifyQueueStart({ jobId: result.jobId, prioritize: true })
        toast(`Starting ${itemsToDownload.length} song${itemsToDownload.length === 1 ? '' : 's'}`, 'success')
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
  const allMissingQueued = missingSpotify.length > 0 &&
    missingSpotify.every((item) => queuedItemIds.has(item.itemId))

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
            onClick={() => {
              if (missingSpotify.length > 0) {
                if (allMissingQueued) navigate('/music/downloads')
                else void queueDownload(missingSpotify)
              }
              else if (playable[0]) playItem(playable[0].item)
            }}
            disabled={missingSpotify.length > 0 ? busy : !playable.length}
          >
            {playlist.missingCount > 0 && isSpotify
              ? allMissingQueued ? 'View downloads' : `Add missing to queue (${playlist.missingCount})`
              : 'Play'}
          </button>
          {missingSpotify.length > 0 && (
            <button
              className="btn-ghost"
              disabled={busy}
              onClick={() => void queueDownload(missingSpotify, true)}
            >
              Download now
            </button>
          )}
          {missingSpotify.length > 0 && (
            <button
              className="btn-ghost"
              disabled={!playable.length}
              onClick={() => playable[0] && playItem(playable[0].item)}
            >
              Play
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
              ...(playlist.source
                ? [
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
        {isSpotify && ` · ${playlist.missingCount} missing`}
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
            <button
              className="btn-ghost shrink-0"
              onClick={async () => {
                await api.music.downloadCancel(downloadStatus.id)
                qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
              }}
            >
              Cancel download
            </button>
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
          <input
            className="input min-w-56 flex-1"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search this playlist"
          />
          {(['all', 'playable', 'missing'] as const).map((value) => (
            <button
              key={value}
              className={availability === value ? 'pill-active' : 'pill'}
              onClick={() => setAvailability(value)}
            >
              {value === 'all' ? 'All' : value === 'playable' ? 'Playable' : 'Missing'}
            </button>
          ))}
        </div>
      )}

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
    </div>
  )
}

function SpotifyMissingRow({
  item,
  busy,
  queued,
  onQueue,
  onRemove
}: {
  item: MusicSpotifyPlaylistEntry
  busy: boolean
  queued: boolean
  onQueue: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-1.5 text-gray-400 hover:bg-base-700">
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
          {item.artists.join(', ')} · {item.albumTitle} · Missing locally
        </p>
      </div>
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-gray-500">
        {formatDuration(item.duration)}
      </span>
      <button className="btn-ghost px-2 py-1 text-xs" disabled={busy} onClick={onQueue}>
        {queued ? 'View queue' : 'Add to queue'}
      </button>
      <button className="btn-ghost px-2 py-1 text-xs" onClick={onRemove}>
        Remove
      </button>
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
    onAdded()
  }

  return (
    <div className="relative mb-5">
      <input
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
