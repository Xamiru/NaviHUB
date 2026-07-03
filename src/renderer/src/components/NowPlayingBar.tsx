import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../lib/player'
import CoverImage from './CoverImage'
import QueuePanel from './QueuePanel'

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
  const {
    track,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    hasNext,
    shuffled,
    toggle,
    next,
    previous,
    toggleShuffle,
    seek,
    setVolume,
    stop
  } = usePlayer()
  const [queueOpen, setQueueOpen] = useState(false)
  if (!track) return null

  const sub = [track.context, track.subtitle].filter(Boolean).join(' · ')
  // Theme songs are anime-only, so a track that knows its media links there.
  // Quiz tracks carry no mediaId/cover on purpose (the answer stays masked).
  const animeLink = track.mediaId != null ? `/anime/${track.mediaId}` : null
  const cover = (
    <CoverImage path={track.coverPath} alt={track.context ?? track.title} className="h-14 w-10" />
  )

  return (
    <div className="relative shrink-0 border-t border-base-700 bg-base-800 px-4 py-2 flex items-center gap-3">
      {track.coverPath &&
        (animeLink ? (
          <Link to={animeLink} className="shrink-0 hover:opacity-80" title={track.context ?? ''}>
            {cover}
          </Link>
        ) : (
          <div className="shrink-0">{cover}</div>
        ))}

      <div className="min-w-0 w-40 sm:w-52 shrink-0">
        <p className="text-sm font-medium truncate leading-tight">{track.title}</p>
        {sub &&
          (animeLink ? (
            <Link
              to={animeLink}
              className="block text-xs text-gray-500 truncate leading-tight hover:text-accent"
            >
              {sub}
            </Link>
          ) : (
            <p className="text-xs text-gray-500 truncate leading-tight">{sub}</p>
          ))}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={previous}
          className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-base-700 flex items-center justify-center text-sm"
          title="Previous"
        >
          ⏮
        </button>
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full bg-accent/20 text-accent hover:bg-accent/30 flex items-center justify-center text-sm"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          onClick={next}
          disabled={!hasNext}
          className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-base-700 flex items-center justify-center text-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          title="Next"
        >
          ⏭
        </button>
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

      {queue.length > 1 && (
        <button
          onClick={toggleShuffle}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            shuffled ? 'text-accent bg-accent/15' : 'text-gray-400 hover:text-white hover:bg-base-700'
          }`}
          title={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
        >
          🔀
        </button>
      )}
      <button
        onClick={() => setQueueOpen((v) => !v)}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          queueOpen ? 'text-accent bg-accent/15' : 'text-gray-400 hover:text-white hover:bg-base-700'
        }`}
        title="Queue"
      >
        ☰
      </button>

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

      {queueOpen && <QueuePanel onClose={() => setQueueOpen(false)} />}
    </div>
  )
}
