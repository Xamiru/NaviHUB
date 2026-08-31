import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { usePlayerControls } from '../lib/player'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'

// Headless observer that turns playback into play counts. Lives directly
// inside AudioPlayerProvider (main.tsx) so it survives the chromeless manga
// reader; the player itself stays music-agnostic — this component just watches
// the generic track state for the `music-` id namespace.
//
// A play is logged when the same music track has been the current one, and
// playing, for 10 uninterrupted seconds — skipping through a queue doesn't
// inflate counts.
const LOG_AFTER_MS = 10_000

export default function MusicPlayLogger(): null {
  const { track, isPlaying } = usePlayerControls()
  const queryClient = useQueryClient()
  const playingRef = useRef(isPlaying)
  playingRef.current = isPlaying

  useEffect(() => {
    if (!track?.id.startsWith('music-')) return
    const trackId = Number(track.id.slice('music-'.length))
    if (!Number.isFinite(trackId)) return
    const timer = setTimeout(() => {
      if (!playingRef.current) return // paused at the 10s mark: not a play
      void api.music
        .logPlay(trackId)
        .then(() => {
          // Broad on purpose: play counts are denormalized into every
          // track-returning query (artist/album/liked/stats), and invalidation
          // only refetches mounted queries anyway.
          void queryClient.invalidateQueries({ queryKey: qk.music.all })
        })
        .catch(() => {})
    }, LOG_AFTER_MS)
    return () => clearTimeout(timer)
    // Re-arm only when the current track changes, not on pause/resume — brief
    // pauses shouldn't reset the 10s window (checked once via the ref instead).
  }, [track?.id, queryClient]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
