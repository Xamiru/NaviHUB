import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../lib/player'
import CoverImage from './CoverImage'
import QueuePanel from './QueuePanel'

// Elapsed/total clock ("3:07"); shared with the full-page now-playing view.
export function formatTime(t: number): string {
  if (!isFinite(t) || t < 0) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
const fmt = formatTime

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
    repeat,
    toggle,
    next,
    previous,
    toggleShuffle,
    cycleRepeat,
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
  // Library tracks link their title to the album and their cover to the
  // full-page now-playing view.
  const isMusic = track.albumId != null
  const albumLink = isMusic ? `/music/albums/${track.albumId}` : null
  // Some files never report a duration to <audio> (or haven't yet) — fall back
  // to the scanned tag duration so the bar doesn't sit at 0:00.
  const dur = (Number.isFinite(duration) && duration > 0 ? duration : track.duration) || 0
  const cover = (
    <CoverImage
      path={track.coverPath}
      alt={track.context ?? track.title}
      className="h-14 w-10"
      fallback="music"
    />
  )

  return (
    <div className="relative shrink-0 border-t border-base-700 bg-base-800 px-4 py-2 flex items-center gap-3">
      {(track.coverPath || isMusic) &&
        (animeLink || isMusic ? (
          <Link
            to={animeLink ?? '/now-playing'}
            className="shrink-0 hover:opacity-80"
            title={animeLink ? (track.context ?? '') : 'Now playing'}
          >
            {cover}
          </Link>
        ) : (
          <div className="shrink-0">{cover}</div>
        ))}

      <div className="min-w-0 w-40 sm:w-52 shrink-0">
        {albumLink ? (
          <Link
            to={albumLink}
            className="block text-sm font-medium truncate leading-tight hover:text-accent"
            title={track.context ?? 'Go to album'}
          >
            {track.title}
          </Link>
        ) : (
          <p className="text-sm font-medium truncate leading-tight">{track.title}</p>
        )}
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
          aria-label="Previous"
        >
          ⏮
        </button>
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full bg-accent/20 text-accent hover:bg-accent/30 flex items-center justify-center text-sm"
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          onClick={next}
          disabled={!hasNext}
          className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-base-700 flex items-center justify-center text-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          title="Next"
          aria-label="Next"
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
        max={dur}
        step="any"
        value={Math.min(currentTime, dur)}
        onChange={(e) => seek(Number(e.target.value))}
        className="flex-1 accent-accent cursor-pointer"
        aria-label="Seek"
      />
      <span className="text-xs text-gray-500 tabular-nums shrink-0 w-9">{fmt(dur)}</span>

      {queue.length > 1 && (
        <button
          onClick={toggleShuffle}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            shuffled ? 'text-accent bg-accent/15' : 'text-gray-400 hover:text-white hover:bg-base-700'
          }`}
          title={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
          aria-label={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
        >
          ⇄
        </button>
      )}
      <button
        onClick={cycleRepeat}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          repeat !== 'off'
            ? 'text-accent bg-accent/15'
            : 'text-gray-400 hover:text-white hover:bg-base-700'
        }`}
        title={
          repeat === 'off'
            ? 'Repeat off — click for repeat all'
            : repeat === 'all'
              ? 'Repeat all — click for repeat one'
              : 'Repeat one — click to turn off'
        }
        aria-label={`Repeat: ${repeat}`}
      >
        {repeat === 'one' ? '⟳¹' : '⟳'}
      </button>
      <button
        onClick={() => setQueueOpen((v) => !v)}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          queueOpen ? 'text-accent bg-accent/15' : 'text-gray-400 hover:text-white hover:bg-base-700'
        }`}
        title="Queue"
        aria-label="Queue"
      >
        ☰
      </button>
      <Link
        to="/now-playing"
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm text-gray-400 hover:text-white hover:bg-base-700"
        title="Now playing view"
        aria-label="Now playing view"
      >
        ⤢
      </Link>

      <div className="hidden sm:flex items-center gap-1.5 w-28 shrink-0">
        <span className="text-gray-500 text-[10px] uppercase tracking-wide" aria-hidden="true">
          Vol
        </span>
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
        aria-label="Close player"
      >
        ×
      </button>

      {queueOpen && <QueuePanel onClose={() => setQueueOpen(false)} />}
    </div>
  )
}
