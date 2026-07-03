import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react'
import { api } from './api'
import { mediaUrl } from '@shared/mediaUrl'
import type { QuizSong } from '@shared/types'

// A single shared audio element drives all playback, so starting one song
// automatically stops whatever was playing before, and the now-playing bar can
// follow you across the app while a theme keeps playing.
//
// Tracks queued from the library carry raw audioPath/audioUrl and the provider
// resolves the playable src lazily when the track actually starts — building a
// 500-song shuffled queue must not fire 500 existence-check IPC calls up front.
export interface Track {
  id: string // stable per song, e.g. "theme-42"
  src?: string // pre-resolved navimg:// or https:// url (optional if paths given)
  audioPath?: string | null // local copy, resolved (existence-checked) at play time
  audioUrl?: string | null // remote stream fallback
  title: string
  subtitle?: string | null // artist(s)
  context?: string | null // e.g. the anime title
  coverPath?: string | null // anime cover, for the bar / queue panel / MediaSession
  mediaId?: number | null // links the bar back to the anime detail page
}

interface PlayerContextValue {
  track: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  queue: Track[]
  index: number
  hasNext: boolean
  hasPrev: boolean
  shuffled: boolean
  // Plays a track; if it's already the current one, toggles play/pause instead.
  play: (track: Track) => void
  playQueue: (tracks: Track[], startIndex: number, opts?: { shuffle?: boolean }) => void
  playAt: (i: number) => void
  next: () => void
  previous: () => void
  toggleShuffle: () => void
  toggle: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
  stop: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within an AudioPlayerProvider')
  return ctx
}

export function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Maps a library-wide song-pool entry to a queue track. Uses the same
// `theme-<id>` id space as the detail page's rows, so a song queued from
// "Shuffle Music" still highlights (and toggles) on its anime page.
export function quizSongToTrack(s: QuizSong): Track {
  return {
    id: `theme-${s.themeId}`,
    audioPath: s.audioPath,
    audioUrl: s.audioUrl,
    title: s.slug ? `${s.slug} · ${s.title ?? 'Untitled'}` : (s.title ?? 'Untitled'),
    subtitle: s.artists.join(', ') || null,
    context: s.animeTitle,
    coverPath: s.coverPath,
    mediaId: s.mediaId
  }
}

export function AudioPlayerProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [queue, setQueue] = useState<Track[]>([])
  const [index, setIndex] = useState(0)
  const [shuffled, setShuffled] = useState(false)

  // Refs are the source of truth for playback logic: onEnded/onError and rapid
  // next/prev must never act on a stale render's state.
  const queueRef = useRef<Track[]>([])
  const indexRef = useRef(0)
  const originalOrderRef = useRef<Track[] | null>(null) // non-null ⇔ shuffled
  // Epoch token: each start bumps it; an async src resolution that finishes
  // after a newer start (or stop) sees a stale token and bails instead of
  // clobbering whatever is playing now.
  const loadSeqRef = useRef(0)
  const srcCacheRef = useRef(new Map<string, string>())
  const errorSkipsRef = useRef(0) // consecutive dead tracks, caps auto-skip

  const startAt = useCallback(async (i: number) => {
    const a = audioRef.current
    const t = queueRef.current[i]
    if (!a || !t) return
    indexRef.current = i
    setIndex(i)
    setTrack(t)
    // Reset immediately so nothing (e.g. the quiz's random-offset seek) acts on
    // the previous song's duration before this one's metadata arrives.
    setCurrentTime(0)
    setDuration(0)
    const seq = ++loadSeqRef.current
    let src = t.src ?? srcCacheRef.current.get(t.id) ?? null
    if (!src && t.audioPath) src = await api.files.resolveUrl(t.audioPath)
    if (!src) src = t.audioUrl ?? null
    if (seq !== loadSeqRef.current) return // superseded by a newer start/stop
    if (!src) {
      // Dead track (no local file, no remote): skip forward, but never loop
      // endlessly through a fully-dead queue.
      if (errorSkipsRef.current < queueRef.current.length && i + 1 < queueRef.current.length) {
        errorSkipsRef.current++
        void startAt(i + 1)
      }
      return
    }
    srcCacheRef.current.set(t.id, src)
    errorSkipsRef.current = 0
    a.src = src
    a.currentTime = 0
    void a.play().catch(() => {})
  }, [])

  const playQueue = useCallback(
    (tracks: Track[], startIndex: number, opts?: { shuffle?: boolean }) => {
      if (tracks.length === 0) return
      let list = tracks
      let start = Math.min(Math.max(startIndex, 0), tracks.length - 1)
      if (opts?.shuffle && tracks.length > 1) {
        originalOrderRef.current = tracks
        const first = tracks[start]
        list = [first, ...shuffleArray(tracks.filter((_, i) => i !== start))]
        start = 0
        setShuffled(true)
      } else {
        originalOrderRef.current = null
        setShuffled(false)
      }
      queueRef.current = list
      setQueue(list)
      errorSkipsRef.current = 0
      void startAt(start)
    },
    [startAt]
  )

  const play = useCallback(
    (t: Track) => {
      const a = audioRef.current
      if (!a) return
      if (track && t.id === track.id) {
        if (a.paused) void a.play().catch(() => {})
        else a.pause()
        return
      }
      playQueue([t], 0)
    },
    [track, playQueue]
  )

  const playAt = useCallback(
    (i: number) => {
      if (i < 0 || i >= queueRef.current.length) return
      void startAt(i)
    },
    [startAt]
  )

  const next = useCallback(() => {
    if (indexRef.current + 1 < queueRef.current.length) void startAt(indexRef.current + 1)
  }, [startAt])

  const previous = useCallback(() => {
    const a = audioRef.current
    // Spotify behavior: restart the current song unless we're near its start
    // (and there is a previous one to go back to).
    if (indexRef.current === 0 || (a && a.currentTime > 3)) {
      if (a && Number.isFinite(a.duration)) a.currentTime = 0
      else void startAt(indexRef.current)
      return
    }
    void startAt(indexRef.current - 1)
  }, [startAt])

  const toggleShuffle = useCallback(() => {
    const q = queueRef.current
    if (q.length <= 1) return
    const current = q[indexRef.current]
    if (originalOrderRef.current) {
      // Un-shuffle: restore the original order, keep playing the same track.
      const orig = originalOrderRef.current
      originalOrderRef.current = null
      queueRef.current = orig
      setQueue(orig)
      const i = current ? orig.findIndex((t) => t.id === current.id) : 0
      indexRef.current = Math.max(i, 0)
      setIndex(Math.max(i, 0))
      setShuffled(false)
    } else {
      originalOrderRef.current = q
      const rest = shuffleArray(q.filter((_, i) => i !== indexRef.current))
      const list = current ? [current, ...rest] : rest
      queueRef.current = list
      setQueue(list)
      indexRef.current = 0
      setIndex(0)
      setShuffled(true)
    }
  }, [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a || !track) return
    if (a.paused) void a.play().catch(() => {})
    else a.pause()
  }, [track])

  const seek = useCallback((time: number) => {
    const a = audioRef.current
    // Guard non-finite values: a streamed song can report duration === Infinity,
    // and assigning currentTime = Infinity/NaN throws (which would blank the app).
    if (a && Number.isFinite(time)) a.currentTime = time
  }, [])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    const a = audioRef.current
    if (a) a.volume = v
  }, [])

  const stop = useCallback(() => {
    loadSeqRef.current++ // an in-flight resolution must not resurrect playback
    queueRef.current = [] // cleared before touching <audio>: no event can skip into the old queue
    indexRef.current = 0
    originalOrderRef.current = null
    const a = audioRef.current
    if (a) {
      a.pause()
      a.removeAttribute('src')
      a.load()
    }
    setTrack(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setQueue([])
    setIndex(0)
    setShuffled(false)
    if ('mediaSession' in navigator) navigator.mediaSession.metadata = null
  }, [])

  // Apply the volume to the element (also covers the initial mount).
  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = volume
  }, [volume])

  const hasNext = index + 1 < queue.length
  const hasPrev = queue.length > 0 // previous() always at least restarts

  // OS media integration: metadata for the system overlay + hardware media keys.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    if (!track) return
    const cover = mediaUrl(track.coverPath)
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.subtitle ?? '',
      album: track.context ?? '',
      artwork: cover ? [{ src: cover, sizes: '512x512', type: 'image/jpeg' }] : []
    })
  }, [track])

  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.playbackState = track ? (isPlaying ? 'playing' : 'paused') : 'none'
  }, [track, isPlaying])

  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    const ms = navigator.mediaSession
    ms.setActionHandler('play', () => toggle())
    ms.setActionHandler('pause', () => toggle())
    ms.setActionHandler('previoustrack', () => previous())
    // Nulled when there's nothing next, so an OS "skip" key can't jump a
    // single-track queue (e.g. the song quiz masking its answer).
    ms.setActionHandler('nexttrack', hasNext ? () => next() : null)
    return () => {
      ms.setActionHandler('play', null)
      ms.setActionHandler('pause', null)
      ms.setActionHandler('previoustrack', null)
      ms.setActionHandler('nexttrack', null)
    }
  }, [toggle, previous, next, hasNext])

  const onEnded = useCallback(() => {
    if (indexRef.current + 1 < queueRef.current.length) void startAt(indexRef.current + 1)
    else setIsPlaying(false) // end of queue: keep the track loaded, like before
  }, [startAt])

  const onError = useCallback(() => {
    // A dead src mid-queue (stale cache entry, dead remote) shouldn't halt
    // playback silently — skip forward with the same cap as resolution failures.
    if (!track) return
    srcCacheRef.current.delete(track.id)
    if (
      errorSkipsRef.current < queueRef.current.length &&
      indexRef.current + 1 < queueRef.current.length
    ) {
      errorSkipsRef.current++
      void startAt(indexRef.current + 1)
    } else {
      setIsPlaying(false)
    }
  }, [track, startAt])

  return (
    <PlayerContext.Provider
      value={{
        track,
        isPlaying,
        currentTime,
        duration,
        volume,
        queue,
        index,
        hasNext,
        hasPrev,
        shuffled,
        play,
        playQueue,
        playAt,
        next,
        previous,
        toggleShuffle,
        toggle,
        seek,
        setVolume,
        stop
      }}
    >
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={onEnded}
        onError={onError}
      />
      {children}
    </PlayerContext.Provider>
  )
}
