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
  // Music-library tracks only: link targets for the bar/now-playing view, plus
  // the tag duration as a display fallback while <audio> metadata is unknown.
  albumId?: number | null
  artistId?: number | null
  duration?: number | null
}

export type RepeatMode = 'off' | 'all' | 'one'

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
  repeat: RepeatMode
  // Plays a track; if it's already the current one, toggles play/pause instead.
  play: (track: Track) => void
  playQueue: (tracks: Track[], startIndex: number, opts?: { shuffle?: boolean }) => void
  // Adds tracks to the queue without interrupting playback: right after the
  // current track ({next: true}) or at the end. Starts playing when idle.
  enqueue: (tracks: Track[], opts?: { next?: boolean }) => void
  playAt: (i: number) => void
  next: () => void
  previous: () => void
  toggleShuffle: () => void
  cycleRepeat: () => void // off → all → one → off
  // Queue editing (the panel only exposes these for "Next up" rows, so the
  // playing track never moves).
  removeFromQueue: (i: number) => void
  moveInQueue: (from: number, to: number) => void
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

// Persisted playback preferences (volume/repeat/shuffle), ReaderPrefs-style.
// The queue itself is deliberately not persisted — the stored `shuffle` only
// keeps the bar's flag stable across a reload; the next playQueue() overwrites it.
const PLAYER_PREFS_KEY = 'player.prefs'
interface PlayerPrefs {
  volume: number
  repeat: RepeatMode
  shuffle: boolean
}
const PLAYER_DEFAULTS: PlayerPrefs = { volume: 0.8, repeat: 'off', shuffle: false }

function loadPlayerPrefs(): PlayerPrefs {
  try {
    const p = { ...PLAYER_DEFAULTS, ...JSON.parse(localStorage.getItem(PLAYER_PREFS_KEY) ?? '{}') }
    p.volume = Number.isFinite(p.volume) ? Math.min(Math.max(p.volume, 0), 1) : 0.8
    if (!['off', 'all', 'one'].includes(p.repeat)) p.repeat = 'off'
    return p
  } catch {
    return PLAYER_DEFAULTS
  }
}

function savePlayerPrefs(patch: Partial<PlayerPrefs>): void {
  try {
    localStorage.setItem(PLAYER_PREFS_KEY, JSON.stringify({ ...loadPlayerPrefs(), ...patch }))
  } catch {
    // storage full/unavailable: playback still works, prefs just don't stick
  }
}

export function AudioPlayerProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(() => loadPlayerPrefs().volume)
  const [queue, setQueue] = useState<Track[]>([])
  const [index, setIndex] = useState(0)
  const [shuffled, setShuffled] = useState(() => loadPlayerPrefs().shuffle)
  const [repeat, setRepeatState] = useState<RepeatMode>(() => loadPlayerPrefs().repeat)

  // Refs are the source of truth for playback logic: onEnded/onError and rapid
  // next/prev must never act on a stale render's state.
  const queueRef = useRef<Track[]>([])
  const indexRef = useRef(0)
  const originalOrderRef = useRef<Track[] | null>(null) // non-null ⇔ shuffled
  const repeatRef = useRef<RepeatMode>(repeat)
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
        savePlayerPrefs({ shuffle: true })
      } else {
        originalOrderRef.current = null
        setShuffled(false)
        // Single-track plays (theme rows, quiz) say nothing about preference.
        if (tracks.length > 1) savePlayerPrefs({ shuffle: false })
      }
      queueRef.current = list
      setQueue(list)
      errorSkipsRef.current = 0
      void startAt(start)
    },
    [startAt]
  )

  const enqueue = useCallback(
    (tracks: Track[], opts?: { next?: boolean }) => {
      if (tracks.length === 0) return
      if (queueRef.current.length === 0) {
        playQueue(tracks, 0)
        return
      }
      const q = [...queueRef.current]
      // Both insertion points are strictly after the current index, so the
      // playing track (and indexRef) never shifts.
      q.splice(opts?.next ? indexRef.current + 1 : q.length, 0, ...tracks)
      queueRef.current = q
      setQueue(q)
      // Keep the pre-shuffle order in sync so un-shuffling doesn't drop them.
      if (originalOrderRef.current) {
        originalOrderRef.current = [...originalOrderRef.current, ...tracks]
      }
    },
    [playQueue]
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
    // Repeat-all wraps, but never for a single-track queue — the quiz masks
    // its answer by keeping nexttrack dead there.
    else if (repeatRef.current === 'all' && queueRef.current.length > 1) void startAt(0)
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
      savePlayerPrefs({ shuffle: false })
    } else {
      originalOrderRef.current = q
      const rest = shuffleArray(q.filter((_, i) => i !== indexRef.current))
      const list = current ? [current, ...rest] : rest
      queueRef.current = list
      setQueue(list)
      indexRef.current = 0
      setIndex(0)
      setShuffled(true)
      savePlayerPrefs({ shuffle: true })
    }
  }, [])

  const cycleRepeat = useCallback(() => {
    setRepeatState((r) => {
      const nextMode: RepeatMode = r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'
      repeatRef.current = nextMode
      savePlayerPrefs({ repeat: nextMode })
      return nextMode
    })
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
    savePlayerPrefs({ volume: v })
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
    // Queue teardown, not a preference change — the stored shuffle pref stays.
    setShuffled(false)
    if ('mediaSession' in navigator) navigator.mediaSession.metadata = null
  }, [])

  // Queue editing. The panel only offers it on rows AFTER the current one, so
  // the playing track (and indexRef) can't shift out from under playback; the
  // bookkeeping below still handles arbitrary positions defensively.
  const removeFromQueue = useCallback(
    (i: number) => {
      const q = [...queueRef.current]
      if (i < 0 || i >= q.length) return
      const wasCurrent = i === indexRef.current
      const [removed] = q.splice(i, 1)
      // The same Track object lives in both arrays (playQueue/enqueue share
      // references), so prune the pre-shuffle order by identity — ids can
      // legitimately repeat in a queue (same album enqueued twice).
      const orig = originalOrderRef.current
      if (orig) {
        const oi = orig.indexOf(removed)
        if (oi >= 0) originalOrderRef.current = [...orig.slice(0, oi), ...orig.slice(oi + 1)]
      }
      if (i < indexRef.current) {
        indexRef.current -= 1
        setIndex(indexRef.current)
      }
      queueRef.current = q
      setQueue(q)
      if (wasCurrent) {
        // Unreachable from the panel; kept for safety.
        if (q.length === 0) stop()
        else void startAt(Math.min(i, q.length - 1))
      }
    },
    [startAt, stop]
  )

  const moveInQueue = useCallback((from: number, to: number) => {
    const q = [...queueRef.current]
    const lo = indexRef.current + 1
    if (from < lo || from >= q.length) return
    const clamped = Math.min(Math.max(to, lo), q.length - 1)
    if (clamped === from) return
    const [moved] = q.splice(from, 1)
    q.splice(clamped, 0, moved)
    queueRef.current = q
    setQueue(q)
    // originalOrderRef is left alone on purpose: un-shuffling discards manual
    // reorders and restores the pre-shuffle order (Spotify semantics).
  }, [])

  // Apply the volume to the element (also covers the initial mount).
  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = volume
  }, [volume])

  const hasNext = index + 1 < queue.length || (repeat === 'all' && queue.length > 1)
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

  // Feeds the scrubber/progress bar of the OS media widget (GNOME top-bar
  // extensions, KDE, hardware overlays). Reporting duration + playbackRate lets
  // the shell extrapolate the position smoothly between our updates.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    const ms = navigator.mediaSession
    if (typeof ms.setPositionState !== 'function') return
    if (!track || !Number.isFinite(duration) || duration <= 0) return
    try {
      ms.setPositionState({
        duration,
        playbackRate: 1,
        position: Math.min(Math.max(currentTime, 0), duration)
      })
    } catch {
      // Some Chromium builds throw if position momentarily exceeds duration
      // (e.g. a streamed track whose duration is still settling) — ignore.
    }
  }, [track, duration, currentTime, isPlaying])

  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    const ms = navigator.mediaSession
    ms.setActionHandler('play', () => toggle())
    ms.setActionHandler('pause', () => toggle())
    ms.setActionHandler('previoustrack', () => previous())
    // Nulled when there's nothing next, so an OS "skip" key can't jump a
    // single-track queue (e.g. the song quiz masking its answer).
    ms.setActionHandler('nexttrack', hasNext ? () => next() : null)
    // Scrub + stop from the widget itself.
    ms.setActionHandler('seekto', (d) => {
      if (d.seekTime != null && Number.isFinite(d.seekTime)) seek(d.seekTime)
    })
    ms.setActionHandler('stop', () => stop())
    return () => {
      ms.setActionHandler('play', null)
      ms.setActionHandler('pause', null)
      ms.setActionHandler('previoustrack', null)
      ms.setActionHandler('nexttrack', null)
      ms.setActionHandler('seekto', null)
      ms.setActionHandler('stop', null)
    }
  }, [toggle, previous, next, hasNext, seek, stop])

  const onEnded = useCallback(() => {
    const a = audioRef.current
    if (repeatRef.current === 'one' && a) {
      // Same src — replay in place, no re-resolution. A dead track never fires
      // `ended`, so this can't loop a broken song.
      a.currentTime = 0
      void a.play().catch(() => {})
      return
    }
    if (indexRef.current + 1 < queueRef.current.length) void startAt(indexRef.current + 1)
    else if (repeatRef.current === 'all' && queueRef.current.length > 0) void startAt(0)
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
        repeat,
        play,
        playQueue,
        enqueue,
        playAt,
        next,
        previous,
        toggleShuffle,
        cycleRepeat,
        removeFromQueue,
        moveInQueue,
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
