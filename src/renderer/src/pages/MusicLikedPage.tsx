import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { playTracks } from '../lib/musicTracks'
import BackButton from '../components/BackButton'
import { TrackList } from './MusicLibraryPage'

// The automatic "Liked Songs" collection — every hearted track, newest first.
export default function MusicLikedPage() {
  const player = usePlayer()
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: qk.music.tracks({ likedOnly: true }),
    queryFn: () => api.music.tracks({ likedOnly: true })
  })

  return (
    <div className="mx-auto max-w-3xl p-6">
      <BackButton />
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">♥ Liked Songs</h1>
          <p className="mt-1 text-xs text-gray-500">
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-primary"
            disabled={!tracks.length}
            onClick={() => playTracks(player, tracks)}
          >
            ▶ Play
          </button>
          <button
            className="btn-ghost"
            disabled={!tracks.length}
            onClick={() => playTracks(player, tracks, { shuffle: true })}
          >
            Shuffle
          </button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : tracks.length === 0 ? (
        <p className="text-sm text-gray-400">
          Nothing liked yet — tap the ♡ on any track to collect it here.
        </p>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </div>
  )
}
