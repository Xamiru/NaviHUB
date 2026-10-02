import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { TRACK_SEARCH_MIN, filterTracks, playTracks, totalDuration } from '../lib/musicTracks'
import { useLeaveDeleted, usePersistedState } from '../lib/navState'
import { formatLongDuration } from '../components/MusicTrackRow'
import { toast, toastError } from '../lib/toast'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import MusicEntityHeader from '../components/MusicEntityHeader'
import Section from '../components/Section'
import TorrentSearchDialog from '../components/TorrentSearchDialog'
import SpotifyEntityDownloadDialog from '../components/SpotifyEntityDownloadDialog'
import { AUDIO_CATEGORIES, discographyQuery } from '@shared/torrents'
import { AlbumCard, TrackList, TrackSearch } from '../components/music/MusicBrowse'
import { confirmDialog } from '../lib/confirm'

export default function MusicArtistPage() {
  const { id } = useParams()
  const artistId = Number(id)
  const qc = useQueryClient()
  const leaveDeleted = useLeaveDeleted()
  const player = usePlayerControls()
  const [searchParams, setSearchParams] = useSearchParams()
  const [torrentsOpen, setTorrentsOpen] = useState(false)
  const [spotifyOpen, setSpotifyOpen] = useState(false)
  const [search, setSearch] = usePersistedState('musicArtistTrackSearch', '')

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

  const { data: artist, isLoading, isLoadingError, refetch } = useQuery({
    queryKey: qk.music.artist(artistId),
    queryFn: () => api.music.artist(artistId)
  })
  const {
    data: tracks = [],
    isLoading: tracksLoading,
    isLoadingError: tracksFailed,
    refetch: refetchTracks
  } = useQuery({
    queryKey: qk.music.artistTracks(artistId),
    queryFn: () => api.music.artistTracks(artistId)
  })

  const shown = useMemo(() => filterTracks(tracks, search), [tracks, search])
  const seconds = totalDuration(tracks)

  async function playAll(shuffle: boolean): Promise<void> {
    playTracks(player, tracks, { shuffle })
  }

  async function findPhoto(): Promise<void> {
    try {
      const res = await api.music.artFetchArtist(artistId)
      if (!res.updated) {
        toast(
          res.reason === 'download_failed'
            ? 'Artist photo lookup failed. Check your connection and try again.'
            : 'No confident photo match found online'
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (e) {
      toastError(e)
    }
  }

  async function clearPhoto(): Promise<void> {
    await api.music.artClearArtist(artistId)
    qc.invalidateQueries({ queryKey: qk.music.all })
  }

  async function deleteArtist(): Promise<void> {
    if (!artist) return
    const ok = await confirmDialog(
      `Delete ${artist.name} from your computer?\n\nThis permanently removes the artist folder and all ${artist.trackCount} track(s) from disk — it cannot be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (!ok) return
    try {
      const removed = await api.music.deleteArtist(artistId)
      // A now-dead track still in the queue is skipped by the player's onError
      // when it's next reached, so no queue surgery is needed here.
      toast(`Deleted ${artist.name}`, 'success')
      qc.invalidateQueries({ queryKey: qk.music.all })
      const gone = new Set([
        `/music/artists/${artistId}`,
        ...removed.albumIds.map((id) => `/music/albums/${id}`)
      ])
      leaveDeleted((path) => gone.has(path), '/music')
    } catch (e) {
      toastError(e)
    }
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (isLoadingError) return <PageStatus>Could not load artist. <button className="btn" onClick={() => void refetch()}>Retry artist</button></PageStatus>
  if (!artist) return <PageStatus>Artist not found.</PageStatus>

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <BackButton fallback="/music" />

      <MusicEntityHeader
        coverPath={artist.coverPath}
        title={artist.name}
        round
        meta={
          <>
            {artist.albums.length} {artist.albums.length === 1 ? 'album' : 'albums'} ·{' '}
            {artist.trackCount} tracks
            {seconds > 0 && <> · {formatLongDuration(seconds)}</>}
          </>
        }
        onPlay={() => playAll(false)}
        onShuffle={() => playAll(true)}
        queueTracks={tracks}
        artNoun="photo"
        art={{ kind: 'music_artist', id: artistId }}
        onFindArt={findPhoto}
        onClearArt={clearPhoto}
        onDelete={deleteArtist}
        deleteLabel="Delete artist"
        addMusicItems={[
          {
            label: 'Complete from Spotify…',
            onSelect: () => setSpotifyOpen(true)
          },
          {
            label: 'Search torrents…',
            title: "Search Jackett for this artist's discography",
            onSelect: () => setTorrentsOpen(true)
          }
        ]}
      />

      {artist.topTracks.length > 0 && (
        <Section
          title="Most played"
          className="mb-6"
          actions={
            <>
              <button className="btn-ghost py-1 text-xs" onClick={() => playTracks(player, artist.topTracks)}>
                Play top tracks
              </button>
              <button
                className="btn-ghost py-1 text-xs"
                onClick={() => playTracks(player, artist.topTracks, { shuffle: true })}
              >
                Shuffle
              </button>
            </>
          }
        >
          <div className="max-w-5xl">
            <TrackList tracks={artist.topTracks} selectable={false} />
          </div>
        </Section>
      )}

      <Section title="Albums" className="mb-6">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-5">
          {artist.albums.map((a) => (
            <AlbumCard key={a.id} album={a} />
          ))}
        </div>
      </Section>

      <Section
        title="All tracks"
        subtitle={tracksLoading ? 'Loading the complete catalog…' : tracksFailed ? undefined : `${tracks.length} tracks in release order`}
        className="mb-6"
      >
        <div className="max-w-5xl">
          {tracksLoading ? (
            <p className="text-sm text-gray-400">Loading tracks…</p>
          ) : tracksFailed ? (
            <p role="alert" className="text-sm">
              Could not load tracks.{' '}
              <button className="btn" onClick={() => void refetchTracks()}>
                Retry tracks
              </button>
            </p>
          ) : (
            <>
              {(tracks.length >= TRACK_SEARCH_MIN || search) && (
                <div className="mb-4 flex">
                  <TrackSearch value={search} onChange={setSearch} label={`Search ${artist.name}'s tracks`} />
                </div>
              )}
              {shown.length === 0 && search.trim() ? (
                <p className="text-sm text-gray-400">No tracks match “{search.trim()}”.</p>
              ) : (
                <TrackList tracks={shown} />
              )}
            </>
          )}
        </div>
      </Section>

      {torrentsOpen && (
        <TorrentSearchDialog
          heading={artist.name}
          query={discographyQuery(artist.name)}
          categories={AUDIO_CATEGORIES}
          onClose={() => setTorrentsOpen(false)}
        />
      )}
      {spotifyOpen && (
        <SpotifyEntityDownloadDialog
          kind="artist"
          entityId={artistId}
          savedUrl={artist.spotifyUrl}
          onClose={closeSpotify}
        />
      )}
    </div>
  )
}
