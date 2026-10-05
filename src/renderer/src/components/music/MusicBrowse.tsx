import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePlayerControls } from '../../lib/player'
import { musicTrackToPlayerTrack } from '../../lib/musicTracks'
import { useIncrementalList } from '../../lib/hooks'
import CoverImage from '../CoverImage'
import MusicTrackRow from '../MusicTrackRow'
import { Field } from '../Field'
import TrackListScope from './TrackListScope'
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
        fallback="monogram"
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
// A selectable list gets multi-select and "Jump to playing" (TrackListScope).
export function TrackList({
  tracks,
  showAlbum = true,
  renderTrailing,
  batch = 96,
  selectable = true
}: {
  tracks: MusicTrack[]
  showAlbum?: boolean
  renderTrailing?: (t: MusicTrack) => ReactNode
  batch?: number
  selectable?: boolean
}) {
  const player = usePlayerControls()
  const { visible, sentinelRef, reveal } = useIncrementalList(tracks, batch)
  const rows = (
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
  )
  return (
    <>
      {selectable ? (
        <TrackListScope tracks={tracks} reveal={reveal}>
          {rows}
        </TrackListScope>
      ) : (
        rows
      )}
      <div ref={sentinelRef} />
    </>
  )
}

// In-page search over a loaded track list (liked songs, playlists, albums, artists).
export function TrackSearch({
  value,
  onChange,
  label
}: {
  value: string
  onChange: (value: string) => void
  label: string
}) {
  return (
    <Field label={label} hiddenLabel className="min-w-56 flex-1">
      <input
        className="input"
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  )
}
