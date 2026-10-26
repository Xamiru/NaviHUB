import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicPlaylistMembership } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import {
  forgetPlaylist,
  loadRecentPlaylists,
  rememberPlaylist,
  syncRecentPlaylists
} from '../../lib/recentPlaylists'

const songs = (n: number): string => `${n} ${n === 1 ? 'song' : 'songs'}`

export function addedMessage(title: string, added: number, skipped: number): string {
  if (added === 0) return `${skipped === 1 ? 'Already' : 'All already'} in ${title}`
  return skipped > 0
    ? `Added ${songs(added)} to ${title}, ${skipped} already there`
    : `Added ${songs(added)} to ${title}`
}

// Rows in a fixed order for as long as the picker is open: the Recent group
// as it stood when the picker opened, then every other playlist A to Z. The
// membership query refetches after each change, but neither part reorders,
// so a ticked playlist never moves under the pointer.
export function pickerRows(
  playlists: MusicPlaylistMembership[],
  recentIds: number[],
  search: string
): { recent: MusicPlaylistMembership[]; rest: MusicPlaylistMembership[] } {
  const q = search.trim().toLocaleLowerCase()
  if (q) return { recent: [], rest: playlists.filter((p) => p.title.toLocaleLowerCase().includes(q)) }
  const byId = new Map(playlists.map((p) => [p.id, p]))
  const recent = recentIds.map((id) => byId.get(id)).filter((p): p is MusicPlaylistMembership => !!p)
  const shown = new Set(recent.map((p) => p.id))
  return { recent, rest: playlists.filter((p) => !shown.has(p.id)) }
}

// The one Add-to-playlist picker body, used by the song row, the now-playing
// bar and a multi-song selection. One song: each playlist toggles and the
// picker stays open. Several: a playlist adds the songs it is missing, reports
// how many were already there, and calls onDone.
export default function PlaylistPicker({
  trackIds,
  onDone
}: {
  trackIds: number[]
  onDone?: () => void
}) {
  const qc = useQueryClient()
  const headingId = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState(false)
  // Snapshotted at open on purpose: adding moves a playlist to the front of
  // the stored list, which shows up the next time the picker opens.
  const [recentIds] = useState(() => loadRecentPlaylists().map((p) => p.id))
  const single = trackIds.length === 1
  const query = useQuery({
    queryKey: qk.music.playlistsForTracks(trackIds),
    queryFn: () => api.music.playlistsForTracks(trackIds)
  })
  const playlists = useMemo(() => query.data ?? [], [query.data])

  useEffect(() => {
    if (query.data) syncRecentPlaylists(query.data)
  }, [query.data])

  const { recent, rest } = pickerRows(playlists, recentIds, search)
  const name = search.trim()
  const exact = playlists.find((p) => p.title.toLocaleLowerCase() === name.toLocaleLowerCase())

  // Refreshes even after a failure: a playlist created before a failed add
  // must show up, or Enter would create its name a second time.
  async function run(work: () => Promise<void>): Promise<void> {
    if (pending) return
    setPending(true)
    try {
      await work()
    } catch (e) {
      toastError(e)
    } finally {
      await qc.invalidateQueries({ queryKey: qk.music.all })
      setPending(false)
    }
  }

  function choose(p: MusicPlaylistMembership): Promise<void> {
    return run(async () => {
      if (single && p.contains > 0) {
        await api.music.removePlaylistTrackByTrack(p.id, trackIds[0])
        return
      }
      const result = await api.music.addPlaylistTracks(p.id, trackIds)
      rememberPlaylist({ id: p.id, title: p.title })
      if (!single) {
        toast(addedMessage(p.title, result.added, result.skipped), 'success')
        onDone?.()
      }
    })
  }

  function create(): Promise<void> {
    if (!name) return Promise.resolve()
    return run(async () => {
      const id = await api.music.createPlaylist({ title: name })
      const result = await api.music.addPlaylistTracks(id, trackIds)
      rememberPlaylist({ id, title: name })
      setSearch('')
      if (!single) {
        toast(addedMessage(name, result.added, result.skipped), 'success')
        onDone?.()
      }
    })
  }

  // Arrow keys walk the search box and the rows; the panel never traps Tab.
  function onKeyDown(e: React.KeyboardEvent): void {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const targets = [
      searchRef.current,
      ...(listRef.current?.querySelectorAll<HTMLElement>('[data-picker-row]:not(:disabled)') ?? [])
    ].filter((el): el is HTMLElement => !!el)
    const at = targets.indexOf(document.activeElement as HTMLElement)
    if (at < 0) return
    e.preventDefault()
    const next = e.key === 'ArrowDown' ? Math.min(at + 1, targets.length - 1) : Math.max(at - 1, 0)
    targets[next].focus()
  }

  function row(p: MusicPlaylistMembership) {
    const all = p.contains >= trackIds.length
    const some = p.contains > 0 && !all
    const state = single
      ? undefined
      : all
        ? `all ${songs(trackIds.length)} already in`
        : some
          ? `${p.contains} of ${trackIds.length} already in`
          : undefined
    return (
      <button
        key={p.id}
        type="button"
        data-picker-row
        className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-left text-sm hover:bg-base-700 disabled:opacity-50"
        aria-pressed={single ? p.contains > 0 : undefined}
        aria-label={state ? `${p.title}, ${state}` : undefined}
        disabled={pending || (!single && all)}
        onClick={() => void choose(p)}
      >
        <span
          className={`w-4 shrink-0 text-center ${p.contains > 0 ? 'text-accent' : 'text-gray-600'}`}
          aria-hidden="true"
        >
          {all ? '✓' : some ? '–' : '○'}
        </span>
        <span className="min-w-0 flex-1 truncate">{p.title}</span>
        {some && (
          <span className="shrink-0 text-xs tabular-nums text-gray-400" aria-hidden="true">
            {p.contains}/{trackIds.length}
          </span>
        )}
      </button>
    )
  }

  return (
    <div role="region" aria-labelledby={headingId} onKeyDown={onKeyDown}>
      <p
        id={headingId}
        className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500"
      >
        {single ? 'Add to playlist' : `Add ${songs(trackIds.length)} to`}
      </p>
      <input
        ref={searchRef}
        // The row menu swaps its actions for the picker without reopening,
        // so the popover's own first-focus never runs for it.
        autoFocus
        className="input mb-1 w-full py-1 text-sm"
        type="search"
        placeholder="Find or create a playlist…"
        aria-label="Find or create a playlist"
        value={search}
        maxLength={200}
        disabled={pending}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || !name) return
          e.preventDefault()
          // Until the list loads, no exact match is known to be missing.
          if (!query.isSuccess) return
          // Enter adds to the playlist with exactly this name, or creates it, as
          // the Create row offers. It only ever adds, so a habitual Enter can
          // never remove a song from a playlist that already holds it.
          if (!exact) void create()
          else if (!(single ? exact.contains > 0 : exact.contains >= trackIds.length)) void choose(exact)
          else toast(addedMessage(exact.title, 0, trackIds.length), 'success')
        }}
      />
      <div ref={listRef} className="max-h-72 overflow-y-auto">
        {query.isLoading && <p className="px-1 py-2 text-xs text-gray-400">Loading playlists…</p>}
        {query.isError && (
          <p role="alert" className="px-1 py-2 text-xs text-red-400">
            Could not load your playlists.
          </p>
        )}
        {query.isSuccess && playlists.length === 0 && !name && (
          <p className="px-1 py-2 text-xs text-gray-400">No playlists yet. Type a name to create one.</p>
        )}
        {recent.length > 0 && (
          <>
            <p className="px-1 pt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Recent
            </p>
            {recent.map(row)}
            {rest.length > 0 && (
              <p className="mt-1 border-t border-base-700 px-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                All playlists
              </p>
            )}
          </>
        )}
        {rest.map(row)}
        {query.isSuccess && name && rest.length === 0 && (
          <p className="px-1 py-1 text-xs text-gray-400">No playlist matches “{name}”.</p>
        )}
      </div>
      {name && !exact && query.isSuccess && (
        <button
          type="button"
          data-picker-row
          className="mt-1 w-full truncate rounded border-t border-base-700 px-1 pb-1 pt-2 text-left text-sm text-accent hover:bg-base-700 disabled:opacity-50"
          disabled={pending}
          onClick={() => void create()}
        >
          Create playlist “{name}”
        </button>
      )}
    </div>
  )
}

// The row menu's one-click "Add to <last playlist>". A playlist deleted since
// it was used drops out of the recent list and reports why.
// `active` is whether the menu is open, so closed rows never read storage.
export function useQuickAddToPlaylist(active: boolean): {
  last: { id: number; title: string } | null
  add: (trackIds: number[]) => Promise<void>
} {
  const qc = useQueryClient()
  const last = useMemo(() => (active ? loadRecentPlaylists()[0] ?? null : null), [active])
  async function add(trackIds: number[]): Promise<void> {
    if (!last) return
    try {
      const result = await api.music.addPlaylistTracks(last.id, trackIds)
      rememberPlaylist(last)
      toast(addedMessage(last.title, result.added, result.skipped), 'success')
      await qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (e) {
      if (e instanceof Error && e.message.includes('Playlist not found')) forgetPlaylist(last.id)
      toastError(e)
    }
  }
  return { last, add }
}
