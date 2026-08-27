import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { PlaylistAddIcon } from './PlayerIcons'

export default function MusicPlaylistButton({
  trackId,
  prominent = false
}: {
  trackId: number
  prominent?: boolean
}): React.JSX.Element {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [pending, setPending] = useState<number | 'new' | null>(null)

  const { data: playlists = [], isLoading } = useQuery({
    queryKey: qk.music.playlistsForTrack(trackId),
    queryFn: () => api.music.playlistsForTrack(trackId),
    enabled: open
  })

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  async function refresh(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.music.all })
  }

  async function togglePlaylist(playlistId: number, contains: boolean): Promise<void> {
    if (pending != null) return
    setPending(playlistId)
    try {
      if (contains) await api.music.removePlaylistTrackByTrack(playlistId, trackId)
      else await api.music.addPlaylistTracks(playlistId, [trackId])
      await refresh()
    } catch (error) {
      toastError(error)
    } finally {
      setPending(null)
    }
  }

  async function createAndAdd(): Promise<void> {
    const title = newTitle.trim()
    if (!title || pending != null) return
    setPending('new')
    try {
      const playlistId = await api.music.createPlaylist({ title })
      await api.music.addPlaylistTracks(playlistId, [trackId])
      setNewTitle('')
      await refresh()
    } catch (error) {
      toastError(error)
    } finally {
      setPending(null)
    }
  }

  return (
    <div className="relative shrink-0">
      <button
        className={`flex items-center justify-center rounded-full ${prominent ? 'pill gap-2' : 'h-8 w-8'} ${
          open
            ? 'bg-accent/15 text-accent'
            : 'text-gray-400 hover:bg-base-700 hover:text-white'
        }`}
        title="Add to playlist"
        aria-label="Add to playlist"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <PlaylistAddIcon className="h-4 w-4" />
        {prominent && <span>Add to playlist</span>}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30 cursor-default"
            aria-hidden="true"
            onMouseDown={() => setOpen(false)}
          />
          <div
            className="absolute bottom-full left-0 z-40 mb-2 w-64 rounded-md border border-base-500 bg-base-800 p-2 shadow-lg"
            role="dialog"
            aria-label="Add current song to playlist"
          >
            <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Playlists
            </p>
            <div className="max-h-48 overflow-y-auto">
              {isLoading && <p className="px-1 py-2 text-xs text-gray-400">Loading playlists…</p>}
              {!isLoading && playlists.length === 0 && (
                <p className="px-1 py-2 text-xs text-gray-400">No playlists yet. Create one below.</p>
              )}
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-left text-sm hover:bg-base-700 disabled:opacity-50"
                  aria-pressed={playlist.contains}
                  disabled={pending != null}
                  onClick={() => void togglePlaylist(playlist.id, playlist.contains)}
                >
                  <span
                    className={`w-4 text-center ${
                      playlist.contains ? 'text-accent' : 'text-gray-600'
                    }`}
                    aria-hidden="true"
                  >
                    {playlist.contains ? '✓' : '○'}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{playlist.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-1 flex gap-1 border-t border-base-700 pt-2">
              <input
                className="input min-w-0 flex-1 py-1 text-sm"
                placeholder="New playlist…"
                value={newTitle}
                maxLength={200}
                disabled={pending != null}
                onChange={(event) => setNewTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    void createAndAdd()
                  }
                }}
              />
              <button
                className="btn-primary px-2 py-1 text-sm"
                disabled={!newTitle.trim() || pending != null}
                onClick={() => void createAndAdd()}
              >
                {pending === 'new' ? 'Adding…' : 'Add'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
