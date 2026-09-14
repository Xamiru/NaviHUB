import { useEffect, useId, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { musicTrackId, musicTrackToPlayerTrack } from '../lib/musicTracks'
import { toast, toastError } from '../lib/toast'
import CoverImage from './CoverImage'
import FavoriteButton from './FavoriteButton'
import { NextIcon } from './PlayerIcons'
import type { MusicTrack } from '@shared/types'
import { confirmDialog } from '../lib/confirm'
import { usePopover } from '../lib/hooks'

export function formatDuration(seconds: number | null): string {
  if (seconds == null || !Number.isFinite(seconds)) return '–:––'
  const s = Math.round(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// Long-form "3h 24m" for totals (library header, stats tiles).
export function formatLongDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

// One track row, used by every music list (album, liked, history, search,
// playlists). The page owns the queue context: onPlay should start playback
// with the page's full track list at this row's position. The overflow menu
// carries the queue actions and the add-to-playlist toggles.
export default function MusicTrackRow({
  track,
  index,
  showCover = true,
  showAlbum = false,
  leading,
  trailing,
  onPlay,
  onRemove
}: {
  track: MusicTrack
  index?: number // visible number (album pages pass the track #)
  showCover?: boolean
  showAlbum?: boolean
  leading?: ReactNode // e.g. a drag handle on playlist rows
  trailing?: ReactNode // e.g. a play-count chip on the stats page
  onPlay: () => void
  onRemove?: () => void
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const isCurrent = player.track?.id === musicTrackId(track)

  // Optimistic heart: flip locally, persist, then let the invalidation settle.
  const [liked, setLiked] = useState(!!track.likedAt)
  useEffect(() => setLiked(!!track.likedAt), [track.likedAt])
  async function toggleLike(): Promise<void> {
    const next = !liked
    setLiked(next)
    await api.music.setLiked(track.id, next)
    // Deliberately the broad prefix: likedAt is denormalized into every
    // track-returning query (album/artist/playlist/search/recent/stats), and
    // invalidation only refetches *mounted* queries — the rest just go stale.
    qc.invalidateQueries({ queryKey: qk.music.all })
  }

  return (
    <div
      className={`group flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-base-700 ${
        isCurrent ? 'bg-accent/10' : ''
      }`}
    >
      {leading}
      {index != null && (
        <span className="w-6 shrink-0 text-center text-sm tabular-nums text-gray-500">
          {index}
        </span>
      )}
      {showCover && (
        <CoverImage
          path={track.coverPath}
          alt={track.title}
          className="h-10 w-10 shrink-0"
          fallback="music"
        />
      )}
      <button className="min-w-0 flex-1 text-left" onClick={onPlay} title="Play">
        <p
          className={`line-clamp-1 text-sm font-medium ${
            isCurrent ? 'text-accent' : 'group-hover:text-white'
          }`}
        >
          {track.title}
        </p>
        <p className="line-clamp-1 text-xs text-gray-500">
          {track.tagArtist ?? track.artistName}
          {showAlbum && <> · {track.albumTitle}</>}
        </p>
      </button>
      {trailing}
      <FavoriteButton
        active={liked}
        variant="compact"
        activeLabel="Remove from Liked Songs"
        inactiveLabel="Add to Liked Songs"
        onClick={() => void toggleLike()}
      />
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-gray-500">
        {formatDuration(track.duration)}
      </span>
      <TrackMenu track={track} onRemove={onRemove} />
    </div>
  )
}

function TrackMenu({ track, onRemove }: { track: MusicTrack; onRemove?: () => void }) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const triggerId = useId()
  const panelId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first'
  })

  const { data: playlists = [] } = useQuery({
    queryKey: qk.music.playlistsForTrack(track.id),
    queryFn: () => api.music.playlistsForTrack(track.id),
    enabled: open
  })

  function refreshPlaylists(): void {
    qc.invalidateQueries({ queryKey: qk.music.all })
  }

  async function togglePlaylist(playlistId: number, contains: boolean): Promise<void> {
    if (contains) await api.music.removePlaylistTrackByTrack(playlistId, track.id)
    else await api.music.addPlaylistTracks(playlistId, [track.id])
    refreshPlaylists()
  }

  async function createAndAdd(): Promise<void> {
    const title = newTitle.trim()
    if (!title) return
    const playlistId = await api.music.createPlaylist({ title })
    await api.music.addPlaylistTracks(playlistId, [track.id])
    setNewTitle('')
    refreshPlaylists()
  }

  async function deleteFromDisk(): Promise<void> {
    const ok = await confirmDialog(
      `Delete "${track.title}" from your computer?\n\nThis permanently removes the file from disk — it cannot be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (!ok) return
    try {
      await api.music.deleteTracks([track.id])
      // The file is gone; stop playback if this was the current track so the
      // player doesn't sit on a dead <audio> src.
      if (player.track?.id === musicTrackId(track)) player.stop()
      toast(`Deleted "${track.title}"`)
      qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div className="relative">
      <button
        id={triggerId}
        ref={triggerRef}
        className={`px-1 text-gray-500 transition-opacity hover:text-white ${open ? '' : 'opacity-60 group-hover:opacity-100 focus-visible:opacity-100'}`}
        title="More"
        aria-label={`More actions for ${track.title}`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        ⋯
      </button>
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          className="absolute right-0 z-30 mt-1 w-60 rounded-md border border-base-500 bg-base-800 p-2 shadow-lg"
          role="region"
          aria-labelledby={triggerId}
        >
          <button
            className="block w-full rounded px-1 py-1.5 text-left text-sm hover:bg-base-700"
            onClick={() => {
              player.enqueue([musicTrackToPlayerTrack(track)], { next: true })
              setOpen(false)
            }}
          >
            <NextIcon className="mr-1 inline align-[-0.1em]" /> Play next
          </button>
          <button
            className="block w-full rounded px-1 py-1.5 text-left text-sm hover:bg-base-700"
            onClick={() => {
              player.enqueue([musicTrackToPlayerTrack(track)])
              setOpen(false)
            }}
          >
            Add to queue
          </button>
          <Link
            className="block rounded px-1 py-1.5 text-sm hover:bg-base-700"
            to={`/music/artists/${track.artistId}`}
            onClick={() => setOpen(false)}
          >
            Go to artist
          </Link>
          <Link
            className="block rounded px-1 py-1.5 text-sm hover:bg-base-700"
            to={`/music/albums/${track.albumId}`}
            onClick={() => setOpen(false)}
          >
            Go to album
          </Link>
          {onRemove && (
            <button
              className="block w-full rounded px-1 py-1.5 text-left text-sm text-red-400 hover:bg-base-700"
              onClick={() => {
                onRemove()
                setOpen(false)
              }}
            >
              Remove from this playlist
            </button>
          )}
          <button
            className="block w-full rounded px-1 py-1.5 text-left text-sm text-red-400 hover:bg-base-700"
            onClick={() => {
              setOpen(false)
              void deleteFromDisk()
            }}
          >
            Delete from computer
          </button>
          <div className="mt-1 border-t border-base-700 pt-1">
            <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Playlists
            </div>
            <div className="max-h-40 overflow-y-auto">
              {playlists.length === 0 && (
                <p className="px-1 py-1 text-xs text-gray-500">No playlists yet.</p>
              )}
              {playlists.map((p) => (
                <button
                  key={p.id}
                  className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-left text-sm hover:bg-base-700"
                  onClick={() => togglePlaylist(p.id, p.contains)}
                >
                  <span
                    className={`w-4 text-center ${p.contains ? 'text-accent' : 'text-gray-600'}`}
                  >
                    {p.contains ? '✓' : '○'}
                  </span>
                  <span className="truncate">{p.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-1 flex gap-1 border-t border-base-700 pt-2">
              <input
                className="input py-1 text-sm"
                placeholder="New playlist…"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    void createAndAdd()
                  }
                }}
              />
              <button
                className="btn-primary px-2 py-1 text-sm"
                disabled={!newTitle.trim()}
                onClick={createAndAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
