import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { filterTracks, playTracks, totalDuration } from '../lib/musicTracks'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import { Field } from '../components/Field'
import { formatLongDuration } from '../components/MusicTrackRow'
import { TrackList, TrackSearch } from '../components/music/MusicBrowse'
import { QueueMenu } from '../components/music/TrackListScope'
import type { MusicTrack } from '@shared/types'

type LikedSort = 'liked' | 'title' | 'artist' | 'album' | 'most'

const byText = (pick: (t: MusicTrack) => string) => (a: MusicTrack, b: MusicTrack) =>
  pick(a).localeCompare(pick(b), undefined, { sensitivity: 'base', numeric: true })

const SORTS: Record<Exclude<LikedSort, 'liked'>, (a: MusicTrack, b: MusicTrack) => number> = {
  title: byText((t) => t.title),
  artist: byText((t) => `${t.artistName}\u0000${t.albumTitle}\u0000${String(t.trackNo ?? 0).padStart(4, '0')}`),
  album: byText((t) => `${t.albumTitle}\u0000${String(t.trackNo ?? 0).padStart(4, '0')}`),
  most: (a, b) => b.playCount - a.playCount
}

// The automatic "Liked Songs" collection — every hearted track, newest first.
export default function MusicLikedPage() {
  const player = usePlayerControls()
  const [search, setSearch] = usePersistedState('musicLikedSearch', '')
  const [sort, setSort] = usePersistedState<LikedSort>('musicLikedSort', 'liked')
  const { data: tracks = [], isLoading, isLoadingError, refetch } = useQuery({
    queryKey: qk.music.tracks({ likedOnly: true }),
    queryFn: () => api.music.tracks({ likedOnly: true })
  })
  // What is listed is also what Play, Shuffle and Queue act on.
  const shown = useMemo(() => {
    const found = filterTracks(tracks, search)
    return sort === 'liked' ? found : [...found].sort(SORTS[sort])
  }, [tracks, search, sort])
  const seconds = totalDuration(tracks)

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <PageHeader
        back="history"
        title="Liked songs"
        subtitle={`${tracks.length} ${tracks.length === 1 ? 'track' : 'tracks'}${seconds > 0 ? ` · ${formatLongDuration(seconds)}` : ''} in this automatic collection`}
        actions={
          <>
            <button
              className="btn-primary"
              disabled={!shown.length}
              onClick={() => playTracks(player, shown)}
            >
              Play
            </button>
            <button
              className="btn-ghost"
              disabled={!shown.length}
              onClick={() => playTracks(player, shown, { shuffle: true })}
            >
              Shuffle
            </button>
            <QueueMenu tracks={shown} />
          </>
        }
      />
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : isLoadingError ? (
        <p role="alert" className="text-sm">
          Could not load liked songs.{' '}
          <button className="btn" onClick={() => void refetch()}>
            Retry liked songs
          </button>
        </p>
      ) : tracks.length === 0 ? (
        <p className="text-sm text-gray-400">
          Nothing liked yet — use the heart on any track.
        </p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <TrackSearch value={search} onChange={setSearch} label="Search liked songs" />
            <Field label="Sort liked songs" hiddenLabel>
              <select
                className="input w-auto py-1.5"
                value={sort}
                onChange={(e) => setSort(e.target.value as LikedSort)}
              >
                <option value="liked">Recently liked</option>
                <option value="title">Track title</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="most">Most played</option>
              </select>
            </Field>
          </div>
          {shown.length === 0 ? (
            <p className="text-sm text-gray-400">No liked songs match “{search.trim()}”.</p>
          ) : (
            <TrackList tracks={shown} />
          )}
        </>
      )}
    </div>
  )
}
