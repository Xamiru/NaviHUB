import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../lib/api'
import { usePlayer } from '../lib/player'
import { playerShortcutsEnabled } from '../lib/playerShortcuts'
import CoverImage from './CoverImage'
import QueuePanel from './QueuePanel'
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  ShuffleIcon,
  RepeatIcon,
  QueueIcon,
  ExpandIcon,
  PopOutIcon
} from './PlayerIcons'

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
  // The study/quiz sections bind these keys themselves, so only promise them
  // where PlayerShortcuts is actually listening.
  const { pathname } = useLocation()
  const keys = playerShortcutsEnabled(pathname)
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

  // Three zones (2026-08-16): what is playing on the left, the transport with
  // its scrubber stacked under it in the middle, the modes and volume on the
  // right. The old flat row put the seek bar between the transport and the
  // volume, so the control you drag most sat wherever the layout left room.
  return (
    <div className="relative shrink-0 border-t border-base-700 bg-base-800 px-4 py-2 flex items-center gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
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

        <div className="min-w-0 flex-1">
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
      </div>

      <div className="flex flex-[2] flex-col items-center gap-1">
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={previous}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-base-700 flex items-center justify-center text-sm"
            title={keys ? 'Previous (PageUp)' : 'Previous'}
            aria-label="Previous"
          >
            <PrevIcon />
          </button>
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full bg-accent/20 text-accent hover:bg-accent/30 flex items-center justify-center text-base"
            title={`${isPlaying ? 'Pause' : 'Play'}${keys ? ' (Space)' : ''}`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={next}
            disabled={!hasNext}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-base-700 flex items-center justify-center text-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            title={keys ? 'Next (PageDown)' : 'Next'}
            aria-label="Next"
          >
            <NextIcon />
          </button>
        </div>

        <div className="flex w-full items-center gap-2">
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
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-1">
        {queue.length > 1 && (
          <button
            onClick={toggleShuffle}
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              shuffled
                ? 'text-accent bg-accent/15'
                : 'text-gray-400 hover:text-white hover:bg-base-700'
            }`}
            title={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
            aria-label={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
          >
            <ShuffleIcon className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={cycleRepeat}
          className={`relative shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
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
          <RepeatIcon className="h-4 w-4" />
          {repeat === 'one' && (
            <span className="absolute bottom-1 right-1 text-[8px] font-bold leading-none">1</span>
          )}
        </button>
        <button
          onClick={() => setQueueOpen((v) => !v)}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            queueOpen
              ? 'text-accent bg-accent/15'
              : 'text-gray-400 hover:text-white hover:bg-base-700'
          }`}
          title="Queue"
          aria-label="Queue"
        >
          <QueueIcon className="h-4 w-4" />
        </button>
        <Link
          to="/now-playing"
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm text-gray-400 hover:text-white hover:bg-base-700"
          title="Now playing view"
          aria-label="Now playing view"
        >
          <ExpandIcon className="h-4 w-4" />
        </Link>
        <button
          onClick={() => void api.player.openWidget()}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm text-gray-400 hover:text-white hover:bg-base-700"
          title="Pop out player"
          aria-label="Pop out player"
        >
          <PopOutIcon className="h-4 w-4" />
        </button>

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
      </div>

      {queueOpen && <QueuePanel onClose={() => setQueueOpen(false)} />}
    </div>
  )
}
