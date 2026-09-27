import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { usePlayer } from '../lib/player'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { musicIdOf } from '../lib/playerTrackIds'
import { advanceListen, type ListenProgress } from '../lib/musicTracks'

// Headless observer that turns playback into play counts. Lives directly
// inside AudioPlayerProvider (main.tsx) so it survives the chromeless manga
// reader; the player itself stays music-agnostic — this component just watches
// the generic track state for the `music-` id namespace.
//
// A play counts once half the track (at most four minutes) has actually been
// heard; see advanceListen. Skips, seeks and paused time never count.
export default function MusicPlayLogger(): null {
  const { track, isPlaying, currentTime, duration } = usePlayer()
  const queryClient = useQueryClient()
  const listen = useRef<{ id: string | null } & ListenProgress>({ id: null, listened: 0, last: 0, logged: false })

  useEffect(() => {
    const trackId = track ? musicIdOf(track.id) : null
    const state = listen.current
    if (!track || trackId == null) {
      state.id = null
      return
    }
    if (state.id !== track.id) {
      Object.assign(state, { id: track.id, listened: 0, last: currentTime, logged: false })
      return
    }
    const known = Number.isFinite(duration) && duration > 0 ? duration : track.duration
    const { progress, count } = advanceListen(state, currentTime, isPlaying, known)
    Object.assign(state, progress)
    if (!count) return
    void api.music
      .logPlay(trackId)
      .then(() => {
        // Broad on purpose: play counts are denormalized into every
        // track-returning query (artist/album/liked/stats), and invalidation
        // only refetches mounted queries anyway.
        void queryClient.invalidateQueries({ queryKey: qk.music.all })
      })
      .catch(() => {})
  }, [track, currentTime, isPlaying, duration, queryClient])
  return null
}
