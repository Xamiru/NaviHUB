import { useEffect, useRef, useState } from 'react'
import { usePlayerControls } from './player'

/**
 * Follows a quiz clip by reading the live audio position every frame, never a
 * wall-clock timer, so buffering cannot eat into a clip.
 *
 * - `seconds` pauses playback that far past `startOffset` (null: no cutoff).
 * - `onHeard` fires once per play, when sound has actually advanced past the
 *   start; answer timers wait for it.
 *
 * Returns the seconds played past `startOffset`, tracked only while a cutoff
 * is set. Mount it in a small component: it re-renders every frame.
 */
export function useQuizClip(
  trackId: string | null,
  startOffset: number,
  seconds: number | null,
  onHeard?: () => void
): number {
  const { isPlaying, track, getCurrentTime, toggle } = usePlayerControls()
  const [elapsed, setElapsed] = useState(0)
  // Set once this clip has been paused at its mark; cleared when a replay
  // seeks back, so a re-run effect can never toggle the audio back on.
  const cutRef = useRef(false)
  const onHeardRef = useRef(onHeard)
  onHeardRef.current = onHeard
  const playing = trackId != null && isPlaying && track?.id === trackId

  useEffect(() => {
    if (!playing) return
    let frame = 0
    let heard = false
    // A stream that refused the start-time seek plays from where it is.
    const now = getCurrentTime()
    const base = now < startOffset - 0.25 ? now : startOffset
    const tick = (): void => {
      const position = getCurrentTime() - base
      if (!heard && position > 0.05) {
        heard = true
        onHeardRef.current?.()
      }
      if (seconds == null) {
        if (!heard) frame = requestAnimationFrame(tick)
        return
      }
      if (position >= seconds) {
        setElapsed(seconds)
        if (!cutRef.current) {
          cutRef.current = true
          toggle()
        }
        return
      }
      cutRef.current = false
      setElapsed(Math.max(0, position))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, seconds, startOffset, getCurrentTime, toggle])

  return elapsed
}
