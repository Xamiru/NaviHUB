import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react'

// A single shared audio element drives all playback, so starting one song
// automatically stops whatever was playing before, and the now-playing bar can
// follow you across the app while a theme keeps playing.
export interface Track {
  id: string // stable per song, e.g. "theme-42"
  src: string // resolved navimg:// or https:// url
  title: string
  subtitle?: string | null // artist(s)
  context?: string | null // e.g. the anime title
}

interface PlayerContextValue {
  track: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  // Plays a track; if it's already the current one, toggles play/pause instead.
  play: (track: Track) => void
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

export function AudioPlayerProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)

  const play = useCallback(
    (t: Track) => {
      const a = audioRef.current
      if (!a) return
      if (track && t.id === track.id) {
        if (a.paused) void a.play().catch(() => {})
        else a.pause()
        return
      }
      setTrack(t)
      a.src = t.src
      a.currentTime = 0
      void a.play().catch(() => {})
    },
    [track]
  )

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a || !track) return
    if (a.paused) void a.play().catch(() => {})
    else a.pause()
  }, [track])

  const seek = useCallback((time: number) => {
    const a = audioRef.current
    if (a) a.currentTime = time
  }, [])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    const a = audioRef.current
    if (a) a.volume = v
  }, [])

  const stop = useCallback(() => {
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
  }, [])

  // Apply the volume to the element (also covers the initial mount).
  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = volume
  }, [volume])

  return (
    <PlayerContext.Provider
      value={{ track, isPlaying, currentTime, duration, volume, play, toggle, seek, setVolume, stop }}
    >
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />
      {children}
    </PlayerContext.Provider>
  )
}
