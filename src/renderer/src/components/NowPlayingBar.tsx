import { usePlayer } from '../lib/player'

function fmt(t: number): string {
  if (!isFinite(t) || t < 0) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

// Persistent now-playing bar at the bottom of the content area. Hidden until a
// theme song is playing; survives navigation because the player lives at the
// app root.
export default function NowPlayingBar(): React.JSX.Element | null {
  const { track, isPlaying, currentTime, duration, volume, toggle, seek, setVolume, stop } =
    usePlayer()
  if (!track) return null

  const sub = [track.context, track.subtitle].filter(Boolean).join(' · ')

  return (
    <div className="shrink-0 border-t border-base-700 bg-base-800 px-4 py-2.5 flex items-center gap-4">
      <button
        onClick={toggle}
        className="shrink-0 w-9 h-9 rounded-full bg-accent/20 text-accent hover:bg-accent/30 flex items-center justify-center text-sm"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>

      <div className="min-w-0 w-40 sm:w-52 shrink-0">
        <p className="text-sm font-medium truncate leading-tight">{track.title}</p>
        {sub && <p className="text-xs text-gray-500 truncate leading-tight">{sub}</p>}
      </div>

      <span className="text-xs text-gray-500 tabular-nums shrink-0 w-9 text-right">
        {fmt(currentTime)}
      </span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step="any"
        value={Math.min(currentTime, duration || 0)}
        onChange={(e) => seek(Number(e.target.value))}
        className="flex-1 accent-accent cursor-pointer"
        aria-label="Seek"
      />
      <span className="text-xs text-gray-500 tabular-nums shrink-0 w-9">{fmt(duration)}</span>

      <div className="hidden sm:flex items-center gap-1.5 w-28 shrink-0">
        <span className="text-gray-500 text-xs">🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-accent cursor-pointer"
          aria-label="Volume"
        />
      </div>

      <button
        onClick={stop}
        className="shrink-0 text-gray-500 hover:text-white text-lg leading-none"
        title="Close player"
      >
        ×
      </button>
    </div>
  )
}
