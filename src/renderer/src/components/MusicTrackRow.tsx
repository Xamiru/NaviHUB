import MusicTrackPersonalDialog from './MusicTrackPersonalDialog'
import { useCallback, useEffect, useId, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
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
import ContextMenu, { type ContextMenuItem } from './ContextMenu'
import { contextMenuPoint } from '../lib/contextMenuPoint'
import { useLeaveEmptiedPage, useTrackSelection } from './music/TrackListScope'
import ArtistCredit from './music/ArtistCredit'
import PlaylistPicker, { useQuickAddToPlaylist } from './music/PlaylistPicker'
import LinkToTitleDialog from './music/LinkToTitleDialog'

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
// carries the queue actions and opens the shared playlist picker.
export default function MusicTrackRow({
  track,
  index,
  showCover = true,
  showAlbum = false,
  hideArtist,
  leading,
  trailing,
  onPlay,
  onRemove,
  menuItems = []
}: {
  track: MusicTrack
  index?: number // visible number (album pages pass the track #)
  showCover?: boolean
  showAlbum?: boolean
  // The album page's artist: a track by that same artist skips the line.
  hideArtist?: string
  leading?: ReactNode // e.g. a drag handle on playlist rows
  trailing?: ReactNode // e.g. a play-count chip on the stats page
  onPlay: () => void
  onRemove?: () => void
  /** Context actions shown first in the row's menu (e.g. a playlist's source choices). */
  menuItems?: { label: string; onSelect: () => void }[]
}) {
  const qc = useQueryClient()
  const { pathname } = useLocation()
  const player = usePlayerControls()
  const selection = useTrackSelection()
  const selected = selection?.isSelected(track.id) ?? false
  const isCurrent = player.track?.id === musicTrackId(track)
  const [menuOpen, setMenuOpen] = useState<TrackMenuView | null>(null)
  const [tagsOpen, setTagsOpen] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const [contextAt, setContextAt] = useState<{ x: number; y: number } | null>(null)
  const closeContext = useCallback(() => setContextAt(null), [])
  const quickAdd = useQuickAddToPlaylist(contextAt != null)
  const deleteFromDisk = useDeleteFromDisk(track)
  const artist = track.tagArtist ?? track.artistName
  const showArtist = artist !== hideArtist

  // Optimistic heart: flip locally, persist, then let the invalidation settle.
  const [liked, setLiked] = useState(!!track.likedAt)
  useEffect(() => setLiked(!!track.likedAt), [track.likedAt])
  async function toggleLike(): Promise<void> {
    const next = !liked
    setLiked(next)
    try {
      await api.music.setLiked(track.id, next)
    } catch (e) {
      setLiked(!next)
      toastError(e)
      return
    }
    // Deliberately the broad prefix: likedAt is denormalized into every
    // track-returning query (album/artist/playlist/search/recent/stats), and
    // invalidation only refetches *mounted* queries — the rest just go stale.
    qc.invalidateQueries({ queryKey: qk.music.all })
  }

  // Inside a selectable list: Ctrl+click toggles, Shift+click extends, and
  // while anything is selected a plain click toggles too instead of playing.
  function onTitleClick(e: React.MouseEvent): void {
    if (selection && e.shiftKey) selection.selectRange(track.id)
    else if (selection && (e.ctrlKey || e.metaKey || selection.selecting)) selection.toggle(track.id)
    else onPlay()
  }

  // Hidden on the page it would open, which would only stack a duplicate history entry.
  const goTo = (label: string, to: string): ContextMenuItem[] =>
    pathname === to ? [] : [{ label, to }]

  const contextItems: ContextMenuItem[] = [
    { label: 'Play', onSelect: onPlay },
    { label: 'Play next', onSelect: () => player.enqueue([musicTrackToPlayerTrack(track)], { next: true }) },
    { label: 'Add to queue', onSelect: () => player.enqueue([musicTrackToPlayerTrack(track)]) },
    { label: 'Add to playlist…', onSelect: () => setMenuOpen('playlists') },
    ...(quickAdd.last
      ? [{ label: `Add to “${quickAdd.last.title}”`, onSelect: () => void quickAdd.add([track.id]) }]
      : []),
    ...menuItems,
    ...(selection
      ? [{ label: selected ? 'Deselect' : 'Select', onSelect: () => selection.toggle(track.id) }]
      : []),
    { label: 'Link to title…', onSelect: () => setLinkOpen(true) },
    ...goTo('Go to artist', `/music/artists/${track.artistId}`),
    ...goTo('Go to album', `/music/albums/${track.albumId}`),
    { label: 'Tags and standout track…', onSelect: () => setTagsOpen(true) },
    ...(onRemove ? [{ label: 'Remove from this playlist', onSelect: onRemove }] : []),
    { label: 'Delete from computer…', danger: true, onSelect: deleteFromDisk }
  ]

  return (
    <div
      data-music-track={track.id}
      className={`group flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-base-700 ${
        selected ? 'bg-accent/15 ring-1 ring-inset ring-accent/40' : isCurrent ? 'bg-accent/10' : ''
      }`}
      onContextMenu={(e) => {
        // A right-click in this row's dialogs or text fields keeps the native
        // menu. React bubbles events out of portals, and the unportaled
        // dialogs and the playlist search sit in the row.
        const target = e.target as Element
        if (!e.currentTarget.contains(target)) return
        if (target.closest('input, textarea, select, [contenteditable="true"]')) return
        const dialog = target.closest('[role="dialog"]')
        if (dialog && e.currentTarget.contains(dialog)) return
        e.preventDefault()
        setContextAt(contextMenuPoint(e))
      }}
    >
      {selection && (
        <input
          type="checkbox"
          checked={selected}
          aria-label={`Select ${track.title}`}
          className={`h-4 w-4 shrink-0 cursor-pointer accent-accent ${
            selection.selecting ? '' : 'opacity-0 focus-visible:opacity-100 group-hover:opacity-100'
          }`}
          // React derives a checkbox's change from its click, so Shift is readable here.
          onChange={(e) => {
            if ((e.nativeEvent as MouseEvent).shiftKey) selection.selectRange(track.id)
            else selection.toggle(track.id)
          }}
        />
      )}
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
      <div className="min-w-0 flex-1 select-none">
        <button
          data-track-play
          className="block w-full text-left"
          onClick={onTitleClick}
          title={selection?.selecting ? 'Select' : selection ? 'Play (Ctrl+click to select)' : 'Play'}
        >
          <span
            className={`line-clamp-1 text-sm font-medium ${
              isCurrent ? 'text-accent' : 'group-hover:text-white'
            }`}
          >
            {track.title}
          </span>
        </button>
        {(showArtist || showAlbum) && (
          // Each artist in the credit links on its own; the rest of the line
          // still plays (or selects) like the title for mouse users.
          <p
            className="line-clamp-1 cursor-default text-xs text-gray-500"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('a')) onTitleClick(e)
            }}
          >
            {showArtist && (
              <ArtistCredit credit={artist} artistId={track.artistId} className="hover:text-accent hover:underline" />
            )}
            {showArtist && showAlbum && ' · '}
            {showAlbum && track.albumTitle}
          </p>
        )}
      </div>
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
      <TrackMenu
        track={track}
        open={menuOpen}
        setOpen={setMenuOpen}
        onTags={() => setTagsOpen(true)}
        onLink={() => setLinkOpen(true)}
        onDelete={deleteFromDisk}
        onRemove={onRemove}
        menuItems={menuItems}
      />
      {tagsOpen && <MusicTrackPersonalDialog track={track} onClose={() => setTagsOpen(false)} />}
      {linkOpen && (
        <LinkToTitleDialog
          subject={{ kind: 'tracks', trackIds: [track.id], title: track.title }}
          onClose={() => setLinkOpen(false)}
        />
      )}
      {contextAt && (
        <ContextMenu x={contextAt.x} y={contextAt.y} items={contextItems} onClose={closeContext} />
      )}
    </div>
  )
}

function useDeleteFromDisk(track: MusicTrack): () => Promise<void> {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const leaveEmptied = useLeaveEmptiedPage()
  return async () => {
    const ok = await confirmDialog(
      `Delete "${track.title}" from your computer?\n\nThis permanently removes the file from disk — it cannot be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (!ok) return
    try {
      const removed = await api.music.deleteTracks([track.id])
      // The file is gone; stop playback if this was the current track so the
      // player doesn't sit on a dead <audio> src.
      if (player.track?.id === musicTrackId(track)) player.stop()
      toast(`Deleted "${track.title}"`, 'success')
      qc.invalidateQueries({ queryKey: qk.music.all })
      leaveEmptied(removed)
    } catch (e) {
      toastError(e)
    }
  }
}

type TrackMenuView = 'actions' | 'playlists'

function TrackMenu({
  track,
  open,
  setOpen,
  onTags,
  onLink,
  onDelete,
  onRemove,
  menuItems
}: {
  track: MusicTrack
  open: TrackMenuView | null
  setOpen: (open: TrackMenuView | null | ((v: TrackMenuView | null) => TrackMenuView | null)) => void
  onTags: () => void
  onLink: () => void
  onDelete: () => Promise<void>
  onRemove?: () => void
  menuItems: { label: string; onSelect: () => void }[]
}) {
  const player = usePlayerControls()
  const { pathname } = useLocation()
  const triggerId = useId()
  const panelId = useId()
  const { panelRef, triggerRef } = usePopover(open != null, () => setOpen(null), {
    initialFocus: 'first'
  })
  // A menu opened on a low row would otherwise hang below the window. The
  // playlist view grows once its list loads, so it is kept in view as it does.
  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return
    panel.scrollIntoView({ block: 'nearest' })
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => panel.scrollIntoView({ block: 'nearest' }))
    observer.observe(panel)
    return () => observer.disconnect()
  }, [open, panelRef])

  const item = 'block w-full rounded px-1 py-1.5 text-left text-sm hover:bg-base-700'
  const act = (fn: () => void) => () => {
    setOpen(null)
    fn()
  }

  return (
    <div className="relative">
      <button
        id={triggerId}
        ref={triggerRef}
        className={`px-1 text-gray-500 transition-opacity hover:text-white ${open ? '' : 'opacity-60 group-hover:opacity-100 focus-visible:opacity-100'}`}
        title="More"
        aria-label={`More actions for ${track.title}`}
        aria-expanded={open != null}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => (v ? null : 'actions'))}
      >
        ⋯
      </button>
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          className={`absolute right-0 z-30 mt-1 rounded-md border border-base-500 bg-base-800 p-2 shadow-lg ${
            open === 'playlists' ? 'w-72' : 'w-60'
          }`}
          role="region"
          aria-labelledby={triggerId}
        >
          {open === 'playlists' ? (
            <PlaylistPicker trackIds={[track.id]} />
          ) : (
            <>
              {menuItems.map((m) => (
                <button key={m.label} className={item} onClick={act(m.onSelect)}>
                  {m.label}
                </button>
              ))}
              {menuItems.length > 0 && <div className="my-1 border-t border-base-600" />}
              <button
                className={item}
                onClick={act(() => player.enqueue([musicTrackToPlayerTrack(track)], { next: true }))}
              >
                <NextIcon className="mr-1 inline align-[-0.1em]" /> Play next
              </button>
              <button className={item} onClick={act(() => player.enqueue([musicTrackToPlayerTrack(track)]))}>
                Add to queue
              </button>
              <button className={item} onClick={() => setOpen('playlists')}>
                Add to playlist…
              </button>
              <button className={item} onClick={act(onLink)}>
                Link to title…
              </button>
              {pathname !== `/music/artists/${track.artistId}` && (
                <Link
                  className="block rounded px-1 py-1.5 text-sm hover:bg-base-700"
                  to={`/music/artists/${track.artistId}`}
                  onClick={() => setOpen(null)}
                >
                  Go to artist
                </Link>
              )}
              {pathname !== `/music/albums/${track.albumId}` && (
                <Link
                  className="block rounded px-1 py-1.5 text-sm hover:bg-base-700"
                  to={`/music/albums/${track.albumId}`}
                  onClick={() => setOpen(null)}
                >
                  Go to album
                </Link>
              )}
              <button className={item} onClick={act(onTags)}>
                Tags and standout track
              </button>
              {onRemove && (
                <button className={item} onClick={act(onRemove)}>
                  Remove from this playlist
                </button>
              )}
              <div className="my-1 border-t border-base-600" />
              <button
                className={`${item} text-red-400`}
                onClick={act(() => void onDelete())}
              >
                Delete from computer
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
