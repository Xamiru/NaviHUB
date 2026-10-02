import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useIncrementalList } from '../lib/hooks'
import { usePlayerControls } from '../lib/player'
import {
  TRACK_SEARCH_MIN,
  filterTracks,
  musicTrackToPlayerTrack,
  playTracks,
  totalDuration
} from '../lib/musicTracks'
import { useLeaveDeleted, usePersistedState } from '../lib/navState'
import { toast, toastError } from '../lib/toast'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import MusicEntityHeader from '../components/MusicEntityHeader'
import MusicTrackRow, { formatLongDuration } from '../components/MusicTrackRow'
import { confirmDialog } from '../lib/confirm'
import SpotifyEntityDownloadDialog from '../components/SpotifyEntityDownloadDialog'
import { TrackSearch } from '../components/music/MusicBrowse'
import TrackListScope from '../components/music/TrackListScope'

export default function MusicAlbumPage() {
  const { id } = useParams()
  const albumId = Number(id)
  const qc = useQueryClient()
  const leaveDeleted = useLeaveDeleted()
  const player = usePlayerControls()
  const [searchParams, setSearchParams] = useSearchParams()
  const [spotifyOpen, setSpotifyOpen] = useState(false)
  const [search, setSearch] = usePersistedState('musicAlbumSearch', '')

  useEffect(() => {
    if (searchParams.get('spotify') === 'download') setSpotifyOpen(true)
  }, [searchParams])

  function closeSpotify(): void {
    setSpotifyOpen(false)
    if (searchParams.get('spotify') !== 'download') return
    const next = new URLSearchParams(searchParams)
    next.delete('spotify')
    setSearchParams(next, { replace: true })
  }

  const { data: album, isLoading, isError, refetch } = useQuery({
    queryKey: qk.music.album(albumId),
    queryFn: () => api.music.album(albumId)
  })

  const standouts = useQuery({ queryKey: qk.music.personalAlbum(albumId), queryFn: () => api.musicJournal.standouts(albumId) })

  const standoutIds = useMemo(() => new Set(standouts.data ?? []), [standouts.data])

  // A folder dumped as one "album" can hold thousands of tracks; mounting a
  // row per track froze the page, so reveal in batches as the user scrolls
  // (EntityListView-style). `visible` is a prefix of `tracks`, so row indexes
  // still line up with the full queue. Called before the early returns so the
  // hook order stays stable.
  const tracks = useMemo(() => album?.tracks ?? [], [album?.tracks])
  const shown = useMemo(() => filterTracks(tracks, search), [tracks, search])
  const { visible, sentinelRef, hasMore, reveal } = useIncrementalList(shown)

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (isError) return <PageStatus>Could not load album. <button className="btn" onClick={() => void refetch()}>Retry album</button></PageStatus>
  if (!album) return <PageStatus>Album not found.</PageStatus>
  const totalSeconds = totalDuration(tracks)
  const multiDisc = new Set(tracks.map((t) => t.discNo ?? 1)).size > 1

  function playFrom(i: number): void {
    player.playQueue(shown.map(musicTrackToPlayerTrack), i)
  }

  async function findCover(): Promise<void> {
    try {
      const res = await api.music.artFetchAlbum(albumId)
      if (!res.updated) {
        toast(
          res.reason === 'download_failed'
            ? 'Album cover lookup failed. Check your connection and try again.'
            : 'No confident cover match found online'
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (e) {
      toastError(e)
    }
  }

  async function clearCover(): Promise<void> {
    await api.music.artClearAlbum(albumId)
    qc.invalidateQueries({ queryKey: qk.music.all })
  }

  async function deleteAlbum(): Promise<void> {
    if (!album) return
    const ok = await confirmDialog(
      `Delete "${album.title}" by ${album.artistName} from your computer?\n\nThis permanently removes all ${tracks.length} track file(s) from disk — it cannot be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (!ok) return
    const artistId = album.artistId
    try {
      const removed = await api.music.deleteAlbum(albumId)
      toast(`Deleted "${album.title}"`, 'success')
      qc.invalidateQueries({ queryKey: qk.music.all })
      const artistGone = removed.artistIds.includes(artistId)
      leaveDeleted(
        (path) => path === `/music/albums/${albumId}` || (artistGone && path === `/music/artists/${artistId}`),
        artistGone ? '/music' : `/music/artists/${artistId}`
      )
    } catch (e) {
      toastError(e)
    }
  }

  let lastDisc: number | null = null
  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-6">
      <BackButton fallback="/music" />

      <MusicEntityHeader
        coverPath={album.coverPath}
        title={album.title}
        meta={
          <>
            <Link to={`/music/artists/${album.artistId}`} className="hover:text-accent">
              {album.artistName}
            </Link>
            {album.year != null && <> · {album.year}</>} · {tracks.length}{' '}
            {tracks.length === 1 ? 'track' : 'tracks'}
            {totalSeconds > 0 && <> · {formatLongDuration(totalSeconds)}</>}
          </>
        }
        onPlay={() => playFrom(0)}
        onShuffle={() => playTracks(player, shown, { shuffle: true })}
        queueTracks={shown}
        artNoun="cover"
        art={{ kind: 'music_album', id: albumId }}
        onFindArt={findCover}
        onClearArt={clearCover}
        onDelete={deleteAlbum}
        deleteLabel="Delete album"
        addMusicItems={[
          {
            label: 'Complete from Spotify…',
            onSelect: () => setSpotifyOpen(true)
          }
        ]}
      />

      <div className="max-w-5xl">
        {(tracks.length >= TRACK_SEARCH_MIN || search) && (
          <div className="mb-4 flex">
            <TrackSearch value={search} onChange={setSearch} label="Search this album" />
          </div>
        )}
        {shown.length === 0 && search.trim() && (
          <p className="text-sm text-gray-400">No tracks match “{search.trim()}”.</p>
        )}
        <TrackListScope tracks={shown} reveal={reveal}>
          {visible.map((t, i) => {
            const disc = t.discNo ?? 1
            const discHeader = multiDisc && disc !== lastDisc
            lastDisc = disc
            return (
              <Fragment key={t.id}>
                {discHeader && (
                  <p className="mb-1 mt-3 px-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Disc {disc}
                  </p>
                )}
                <MusicTrackRow
                  track={t}
                  index={t.trackNo ?? i + 1}
                  showCover={false}
                  trailing={standoutIds.has(t.id) ? <span className="chip text-xs">Standout</span> : undefined}
                  onPlay={() => playFrom(i)}
                />
              </Fragment>
            )
          })}
        </TrackListScope>
        <div ref={sentinelRef} />
        {hasMore && (
          <p className="mt-4 text-center text-xs text-gray-400">
            Showing {visible.length} of {shown.length} — scroll for more
          </p>
        )}
      </div>
      {spotifyOpen && (
        <SpotifyEntityDownloadDialog
          kind="album"
          entityId={albumId}
          savedUrl={album.spotifyUrl}
          onClose={closeSpotify}
        />
      )}
    </div>
  )
}
