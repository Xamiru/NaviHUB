import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { toast, toastError } from '../lib/toast'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import MusicEntityHeader from '../components/MusicEntityHeader'
import MusicTrackRow, { formatDuration } from '../components/MusicTrackRow'

export default function MusicAlbumPage() {
  const { id } = useParams()
  const albumId = Number(id)
  const qc = useQueryClient()
  const player = usePlayer()

  const { data: album, isLoading } = useQuery({
    queryKey: qk.music.album(albumId),
    queryFn: () => api.music.album(albumId)
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!album) return <PageStatus>Album not found.</PageStatus>

  const tracks = album.tracks
  const totalSeconds = tracks.reduce((sum, t) => sum + (t.duration ?? 0), 0)
  const multiDisc = new Set(tracks.map((t) => t.discNo ?? 1)).size > 1

  function playFrom(i: number): void {
    player.playQueue(tracks.map(musicTrackToPlayerTrack), i)
  }

  async function findCover(): Promise<void> {
    try {
      const res = await api.music.artFetchAlbum(albumId)
      if (!res.updated) toast('No confident cover match found online')
      qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (e) {
      toastError(e)
    }
  }

  async function clearCover(): Promise<void> {
    await api.music.artClearAlbum(albumId)
    qc.invalidateQueries({ queryKey: qk.music.all })
  }

  let lastDisc: number | null = null
  return (
    <div className="mx-auto max-w-4xl p-6">
      <BackButton />

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
            {totalSeconds > 0 && <> · {formatDuration(totalSeconds)}</>}
          </>
        }
        onPlay={() => playFrom(0)}
        onShuffle={() => playTracks(player, tracks, { shuffle: true })}
        artNoun="cover"
        onFindArt={findCover}
        onClearArt={clearCover}
      />

      <div className="max-w-3xl">
        {tracks.map((t, i) => {
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
                onPlay={() => playFrom(i)}
              />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
