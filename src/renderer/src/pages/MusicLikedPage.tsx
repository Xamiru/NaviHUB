import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { playTracks } from '../lib/musicTracks'
import PageHeader from '../components/PageHeader'
import { TrackList } from './MusicLibraryPage'

// The automatic "Liked Songs" collection — every hearted track, newest first.
export default function MusicLikedPage() {
  const player = usePlayerControls()
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: qk.music.tracks({ likedOnly: true }),
    queryFn: () => api.music.tracks({ likedOnly: true })
  })

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <PageHeader
        back="history"
        title="Liked songs"
        subtitle={`${tracks.length} ${tracks.length === 1 ? 'track' : 'tracks'} in this automatic collection`}
        actions={
          <>
            <button
              className="btn-primary"
              disabled={!tracks.length}
              onClick={() => playTracks(player, tracks)}
            >
              Play
            </button>
            <button
              className="btn-ghost"
              disabled={!tracks.length}
              onClick={() => playTracks(player, tracks, { shuffle: true })}
            >
              Shuffle
            </button>
          </>
        }
      />
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : tracks.length === 0 ? (
        <p className="text-sm text-gray-400">
          Nothing liked yet — use the heart on any track.
        </p>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </div>
  )
}
