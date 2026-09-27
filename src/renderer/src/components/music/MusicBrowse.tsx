import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePlayerControls } from '../../lib/player'
import { musicTrackToPlayerTrack } from '../../lib/musicTracks'
import { useIncrementalList } from '../../lib/hooks'
import CoverImage from '../CoverImage'
import MusicTrackRow from '../MusicTrackRow'
import type { MusicAlbumSummary, MusicArtist, MusicTrack } from '@shared/types'

export const GRID = 'grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4'

export function ArtistCard({ artist }: { artist: MusicArtist }) {
  return (
    <Link to={`/music/artists/${artist.id}`} className="group text-center">
      <CoverImage
        path={artist.coverPath}
        alt={artist.name}
        thumbWidth={320}
        rounded="rounded-full"
        className="mx-auto aspect-square w-full"
        fallback="music"
      />
      <p className="mt-2 line-clamp-1 text-sm font-medium group-hover:text-accent">
        {artist.name}
      </p>
      <p className="text-xs text-gray-500">
        {artist.albumCount} {artist.albumCount === 1 ? 'album' : 'albums'}
      </p>
    </Link>
  )
}

export function AlbumCard({ album }: { album: MusicAlbumSummary }) {
  return (
    <Link to={`/music/albums/${album.id}`} className="group">
      <CoverImage
        path={album.coverPath}
        alt={album.title}
        thumbWidth={320}
        className="aspect-square w-full"
        fallback="music"
      />
      <p className="mt-2 line-clamp-1 text-sm font-medium group-hover:text-accent">
        {album.title}
      </p>
      <p className="line-clamp-1 text-xs text-gray-500">
        {album.artistName}
        {album.year != null && ` · ${album.year}`}
      </p>
    </Link>
  )
}

// Shared by the Tracks tab, search results and the liked/stats pages:
// clicking a row queues this whole list starting at that row. renderTrailing
// lets a page append per-row extras (e.g. the stats page's play-count chip).
export function TrackList({
  tracks,
  showAlbum = true,
  renderTrailing,
  batch = 96
}: {
  tracks: MusicTrack[]
  showAlbum?: boolean
  renderTrailing?: (t: MusicTrack) => ReactNode
  batch?: number
}) {
  const player = usePlayerControls()
  const { visible, sentinelRef } = useIncrementalList(tracks, batch)
  return (
    <>
      <div>
        {visible.map((t, i) => (
          <MusicTrackRow
            key={t.id}
            track={t}
            showAlbum={showAlbum}
            trailing={renderTrailing?.(t)}
            onPlay={() => player.playQueue(tracks.map(musicTrackToPlayerTrack), i)}
          />
        ))}
      </div>
      <div ref={sentinelRef} />
    </>
  )
}
