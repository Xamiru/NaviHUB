import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { playTracks } from '../lib/musicTracks'
import { toast, toastError } from '../lib/toast'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import MusicEntityHeader from '../components/MusicEntityHeader'
import Section from '../components/Section'
import TorrentSearchDialog from '../components/TorrentSearchDialog'
import SpotifyEntityDownloadDialog from '../components/SpotifyEntityDownloadDialog'
import { AUDIO_CATEGORIES, discographyQuery } from '@shared/torrents'
import { AlbumCard, TrackList } from './MusicLibraryPage'
import { confirmDialog } from '../lib/confirm'

export default function MusicArtistPage() {
  const { id } = useParams()
  const artistId = Number(id)
  const qc = useQueryClient()
  const navigate = useNavigate()
  const player = usePlayer()
  const [torrentsOpen, setTorrentsOpen] = useState(false)
  const [spotifyOpen, setSpotifyOpen] = useState(false)

  const { data: artist, isLoading } = useQuery({
    queryKey: qk.music.artist(artistId),
    queryFn: () => api.music.artist(artistId)
  })
  const { data: tracks = [], isLoading: tracksLoading } = useQuery({
    queryKey: qk.music.artistTracks(artistId),
    queryFn: () => api.music.artistTracks(artistId)
  })

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
      await api.music.deleteArtist(artistId)
      // A now-dead track still in the queue is skipped by the player's onError
      // when it's next reached, so no queue surgery is needed here.
      toast(`Deleted ${artist.name}`)
      qc.invalidateQueries({ queryKey: qk.music.all })
      navigate('/music', { replace: true })
    } catch (e) {
      toastError(e)
    }
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!artist) return <PageStatus>Artist not found.</PageStatus>

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <BackButton />

      <MusicEntityHeader
        coverPath={artist.coverPath}
        title={artist.name}
        round
        meta={
          <>
            {artist.albums.length} {artist.albums.length === 1 ? 'album' : 'albums'} ·{' '}
            {artist.trackCount} tracks
          </>
        }
        onPlay={() => playAll(false)}
        onShuffle={() => playAll(true)}
        artNoun="photo"
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
        <Section title="Most played" className="mb-6">
          <div className="max-w-5xl">
            <TrackList tracks={artist.topTracks} />
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
        subtitle={tracksLoading ? 'Loading the complete catalog…' : `${tracks.length} tracks in release order`}
        className="mb-6"
      >
        <div className="max-w-5xl">
          {tracksLoading ? (
            <p className="text-sm text-gray-400">Loading tracks…</p>
          ) : (
            <TrackList tracks={tracks} />
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
          onClose={() => setSpotifyOpen(false)}
        />
      )}
    </div>
  )
}
