import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { useDebouncedValue } from '../lib/hooks'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import MusicTrackRow from '../components/MusicTrackRow'

export default function MusicPlaylistPage() {
  const { id } = useParams()
  const playlistId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const player = usePlayer()

  const { data: playlist, isLoading } = useQuery({
    queryKey: qk.music.playlist(playlistId),
    queryFn: () => api.music.playlist(playlistId)
  })

  const invalidate = (): void => {
    qc.invalidateQueries({ queryKey: qk.music.playlists })
    qc.invalidateQueries({ queryKey: qk.music.playlist(playlistId) })
  }

  // Optimistic drag-reorder over the server's item list (shared with lists).
  const { items, setItems, sensors, onDragEnd } = useOptimisticReorder(
    playlist?.items,
    (next) =>
      api.music.reorderPlaylist(
        playlistId,
        next.map((i) => i.itemId)
      ),
    invalidate
  )

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!playlist) return <PageStatus>Playlist not found.</PageStatus>

  function playFrom(i: number, shuffle = false): void {
    const tracks = items.map((it) => musicTrackToPlayerTrack(it.track))
    if (tracks.length === 0) return
    player.playQueue(tracks, i, { shuffle })
  }

  async function removeItem(itemId: number): Promise<void> {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId))
    await api.music.removePlaylistTrack(itemId)
    invalidate()
  }

  async function saveTitle(): Promise<void> {
    const t = title.trim()
    setEditing(false)
    if (!t || t === playlist?.title) return
    await api.music.updatePlaylist(playlistId, { title: t })
    invalidate()
  }

  async function del(): Promise<void> {
    if (!confirm(`Delete the playlist “${playlist?.title}”? This can’t be undone.`)) return
    await api.music.removePlaylist(playlistId)
    qc.invalidateQueries({ queryKey: qk.music.playlists })
    navigate('/music')
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <BackButton />

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
            <h1
              className="cursor-text text-2xl font-bold hover:text-accent"
              title="Rename"
              onClick={() => {
                setTitle(playlist.title)
                setEditing(true)
              }}
            >
              {playlist.title}
            </h1>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Playlist · {items.length} {items.length === 1 ? 'track' : 'tracks'}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className="btn-primary" onClick={() => playFrom(0)} disabled={!items.length}>
            ▶ Play
          </button>
          <button
            className="btn-ghost"
            disabled={!items.length}
            onClick={() =>
              playTracks(
                player,
                items.map((i) => i.track),
                { shuffle: true }
              )
            }
          >
            ⇄ Shuffle
          </button>
          <button className="btn-danger" onClick={del}>
            Delete
          </button>
        </div>
      </div>

      <AddTracksPicker
        playlistId={playlistId}
        excludeIds={items.map((i) => i.track.id)}
        onAdded={invalidate}
      />

      {items.length === 0 ? (
        <p className="text-sm text-gray-400">No tracks yet — search above to add some.</p>
      ) : (
        <SortableList ids={items.map((i) => i.itemId)} sensors={sensors} onDragEnd={onDragEnd}>
          {items.map((item, index) => (
            <SortableRow key={item.itemId} id={item.itemId}>
              {(handle) => (
                <MusicTrackRow
                  track={item.track}
                  showAlbum
                  onPlay={() => playFrom(index)}
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
  const { data } = useQuery({
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
      {query && results.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-base-500 bg-base-800 p-1 shadow-lg">
          {results.map((t) => (
            <button
              key={t.id}
              className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-base-700"
              onClick={() => add(t.id)}
            >
              <span className="text-gray-500">＋</span>
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
