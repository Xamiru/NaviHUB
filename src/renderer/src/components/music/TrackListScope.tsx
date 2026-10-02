import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePlayerControls } from '../../lib/player'
import { musicTrackId, musicTrackToPlayerTrack } from '../../lib/musicTracks'
import { usePopover } from '../../lib/hooks'
import { useLeaveDeleted } from '../../lib/navState'
import { confirmDialog } from '../../lib/confirm'
import { toast, toastError } from '../../lib/toast'
import ActionMenu from '../ActionMenu'
import type { MusicDeleteResult, MusicTrack } from '@shared/types'

// One visible track list: the rows' multi-selection, the selection bar that
// acts on it, and "Jump to playing". Rows read the scope through
// useTrackSelection(); a row outside any scope simply has no checkbox.
interface TrackSelection {
  selecting: boolean
  isSelected: (id: number) => boolean
  toggle: (id: number) => void
  selectRange: (id: number) => void
}

const SelectionContext = createContext<TrackSelection | null>(null)

export function useTrackSelection(): TrackSelection | null {
  return useContext(SelectionContext)
}

// Long enough that finding the playing row by scrolling is a chore.
const JUMP_MIN_TRACKS = 30

export default function TrackListScope({
  tracks,
  reveal,
  onRemove,
  children
}: {
  tracks: MusicTrack[] // the visible list, in display order
  reveal?: (index: number) => void // renders an incremental list far enough to hold a row
  onRemove?: (trackIds: number[]) => Promise<void> // playlist pages: remove from this playlist
  children: ReactNode
}) {
  const player = usePlayerControls()
  const [selected, setSelected] = useState<ReadonlySet<number>>(() => new Set())
  const anchorRef = useRef<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [jumpTo, setJumpTo] = useState<number | null>(null)

  // A filter or a deletion can hide selected rows; the bar acts only on what is listed.
  useEffect(() => {
    setSelected((prev) => {
      if (prev.size === 0) return prev
      const ids = new Set(tracks.map((t) => t.id))
      const next = new Set([...prev].filter((id) => ids.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [tracks])

  const clear = useCallback(() => {
    setSelected(new Set())
    anchorRef.current = null
  }, [])

  const selection = useMemo<TrackSelection>(
    () => ({
      selecting: selected.size > 0,
      isSelected: (id) => selected.has(id),
      toggle: (id) => {
        anchorRef.current = id
        setSelected((prev) => {
          const next = new Set(prev)
          if (!next.delete(id)) next.add(id)
          return next
        })
      },
      selectRange: (id) => {
        const from = tracks.findIndex((t) => t.id === anchorRef.current)
        const to = tracks.findIndex((t) => t.id === id)
        anchorRef.current = id
        if (from < 0 || to < 0) {
          setSelected((prev) => new Set(prev).add(id))
          return
        }
        const [lo, hi] = from < to ? [from, to] : [to, from]
        setSelected((prev) => {
          const next = new Set(prev)
          for (let i = lo; i <= hi; i++) next.add(tracks[i].id)
          return next
        })
      }
    }),
    [selected, tracks]
  )

  // Escape clears a selection unless a dialog or popover owns the keyboard.
  useEffect(() => {
    if (selected.size === 0) return
    function onKey(e: KeyboardEvent): void {
      if (e.key !== 'Escape' || e.defaultPrevented) return
      if (document.querySelector('[role="dialog"], [data-player-shortcuts="suspend"]')) return
      clear()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected.size, clear])

  const currentIndex = player.track
    ? tracks.findIndex((t) => musicTrackId(t) === player.track?.id)
    : -1

  // Runs after the reveal has rendered the row; a row that is still absent is dropped, never deferred.
  useEffect(() => {
    if (jumpTo == null) return
    const row = listRef.current?.querySelector<HTMLElement>(`[data-music-track="${jumpTo}"]`)
    setJumpTo(null)
    if (!row) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    row.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' })
    row.querySelector<HTMLElement>('[data-track-play]')?.focus({ preventScroll: true })
  })

  const picked = tracks.filter((t) => selected.has(t.id))
  const showJump = currentIndex >= 0 && tracks.length >= JUMP_MIN_TRACKS

  return (
    <SelectionContext.Provider value={selection}>
      <div ref={listRef}>{children}</div>
      {(picked.length > 0 || showJump) && (
        <div className="pointer-events-none sticky bottom-2 z-20 mt-3 flex justify-end">
          {picked.length > 0 ? (
            <SelectionBar tracks={picked} onRemove={onRemove} onClear={clear} />
          ) : (
            <button
              className="btn-ghost pointer-events-auto bg-base-800 py-1 text-xs shadow-lg"
              onClick={() => {
                reveal?.(currentIndex)
                setJumpTo(tracks[currentIndex].id)
              }}
            >
              Jump to playing
            </button>
          )}
        </div>
      )}
    </SelectionContext.Provider>
  )
}

function SelectionBar({
  tracks,
  onRemove,
  onClear
}: {
  tracks: MusicTrack[]
  onRemove?: (trackIds: number[]) => Promise<void>
  onClear: () => void
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const leaveEmptied = useLeaveEmptiedPage()
  const ids = tracks.map((t) => t.id)
  const count = `${tracks.length} ${tracks.length === 1 ? 'song' : 'songs'}`

  async function remove(): Promise<void> {
    if (!onRemove) return
    try {
      await onRemove(ids)
      onClear()
    } catch (e) {
      toastError(e)
    }
  }

  async function deleteFromDisk(): Promise<void> {
    const ok = await confirmDialog(
      `Delete ${count} from your computer?\n\nThis permanently removes the files from disk — it cannot be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (!ok) return
    try {
      const removed = await api.music.deleteTracks(ids)
      if (tracks.some((t) => musicTrackId(t) === player.track?.id)) player.stop()
      toast(`Deleted ${count}`, 'success')
      onClear()
      qc.invalidateQueries({ queryKey: qk.music.all })
      leaveEmptied(removed)
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div
      role="region"
      aria-label="Selected songs"
      className="pointer-events-auto flex w-full flex-wrap items-center gap-2 rounded-md border border-base-500 bg-base-800 px-3 py-2 shadow-lg"
    >
      <span className="mr-1 text-sm font-medium">{tracks.length} selected</span>
      <button
        className="btn-primary py-1 text-sm"
        onClick={() => {
          player.playQueue(tracks.map(musicTrackToPlayerTrack), 0)
          onClear()
        }}
      >
        Play
      </button>
      <QueueButtons tracks={tracks} onDone={onClear} />
      <AddToPlaylistMenu trackIds={ids} onDone={onClear} />
      {onRemove && (
        <button className="btn-ghost py-1 text-sm" onClick={() => void remove()}>
          Remove from playlist
        </button>
      )}
      <button className="btn-ghost py-1 text-sm text-red-400" onClick={() => void deleteFromDisk()}>
        Delete…
      </button>
      <button className="btn-ghost ml-auto py-1 text-sm" onClick={onClear} title="Clear selection (Escape)">
        Clear
      </button>
    </div>
  )
}

// After deleting songs: when that emptied the album or artist this page shows,
// leave it the way a page deleted from its own header does.
export function useLeaveEmptiedPage(): (removed: MusicDeleteResult) => void {
  const { pathname } = useLocation()
  const leaveDeleted = useLeaveDeleted()
  return useCallback(
    (removed: MusicDeleteResult) => {
      const gone = new Set([
        ...removed.albumIds.map((id) => `/music/albums/${id}`),
        ...removed.artistIds.map((id) => `/music/artists/${id}`)
      ])
      if (gone.has(pathname)) leaveDeleted((path) => gone.has(path), '/music')
    },
    [pathname, leaveDeleted]
  )
}

// "Play next" / "Add to queue" for several songs at once, reporting where they went.
export function useEnqueueTracks(): (tracks: MusicTrack[], next: boolean) => void {
  const player = usePlayerControls()
  return useCallback(
    (tracks: MusicTrack[], next: boolean) => {
      if (tracks.length === 0) return
      const idle = player.queue.length === 0
      player.enqueue(tracks.map(musicTrackToPlayerTrack), { next })
      // An idle player starts playing them, which says enough on its own.
      if (idle) return
      const n = `${tracks.length} ${tracks.length === 1 ? 'song' : 'songs'}`
      toast(next ? `${n} will play next` : `Added ${n} to the queue`, 'success')
    },
    [player]
  )
}

function QueueButtons({ tracks, onDone }: { tracks: MusicTrack[]; onDone: () => void }) {
  const enqueue = useEnqueueTracks()
  return (
    <>
      <button
        className="btn-ghost py-1 text-sm"
        onClick={() => {
          enqueue(tracks, true)
          onDone()
        }}
      >
        Play next
      </button>
      <button
        className="btn-ghost py-1 text-sm"
        onClick={() => {
          enqueue(tracks, false)
          onDone()
        }}
      >
        Add to queue
      </button>
    </>
  )
}

function AddToPlaylistMenu({ trackIds, onDone }: { trackIds: number[]; onDone: () => void }) {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [pending, setPending] = useState(false)
  const panelId = useId()
  const headingId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), { initialFocus: 'first' })
  const { data: playlists = [], isLoading } = useQuery({
    queryKey: qk.music.playlists,
    queryFn: () => api.music.playlists(),
    enabled: open
  })

  async function addTo(playlistId: number | null, title: string): Promise<void> {
    if (pending) return
    setPending(true)
    try {
      const id = playlistId ?? (await api.music.createPlaylist({ title }))
      await api.music.addPlaylistTracks(id, trackIds)
      await qc.invalidateQueries({ queryKey: qk.music.all })
      toast(`Added to ${title}`, 'success')
      setOpen(false)
      onDone()
    } catch (e) {
      toastError(e)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        className={`btn-ghost py-1 text-sm ${open ? 'text-accent' : ''}`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        Add to playlist
      </button>
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-labelledby={headingId}
          data-player-shortcuts="suspend"
          className="absolute bottom-full left-0 z-40 mb-2 w-64 rounded-md border border-base-500 bg-base-800 p-2 shadow-lg"
        >
          <p id={headingId} className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Add {trackIds.length} to
          </p>
          <div className="max-h-48 overflow-y-auto">
            {isLoading && <p className="px-1 py-2 text-xs text-gray-400">Loading playlists…</p>}
            {!isLoading && playlists.length === 0 && (
              <p className="px-1 py-2 text-xs text-gray-400">No playlists yet. Create one below.</p>
            )}
            {playlists.map((p) => (
              <button
                key={p.id}
                className="block w-full truncate rounded px-1 py-1.5 text-left text-sm hover:bg-base-700 disabled:opacity-50"
                disabled={pending}
                onClick={() => void addTo(p.id, p.title)}
              >
                {p.title}
              </button>
            ))}
          </div>
          <div className="mt-1 flex gap-1 border-t border-base-700 pt-2">
            <input
              className="input min-w-0 flex-1 py-1 text-sm"
              placeholder="New playlist…"
              aria-label="New playlist name"
              value={newTitle}
              maxLength={200}
              disabled={pending}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTitle.trim()) {
                  e.preventDefault()
                  void addTo(null, newTitle.trim())
                }
              }}
            />
            <button
              className="btn-primary px-2 py-1 text-sm"
              disabled={!newTitle.trim() || pending}
              onClick={() => void addTo(null, newTitle.trim())}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Header "Add to queue" menu for a whole album, artist, playlist or collection.
export function QueueMenu({ tracks }: { tracks: MusicTrack[] }) {
  const enqueue = useEnqueueTracks()
  return (
    <ActionMenu
      label="Add to queue"
      items={[
        { label: 'Play next', disabled: !tracks.length, onSelect: () => enqueue(tracks, true) },
        { label: 'Add to end', disabled: !tracks.length, onSelect: () => enqueue(tracks, false) }
      ]}
    />
  )
}
