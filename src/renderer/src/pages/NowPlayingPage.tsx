import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../lib/player'
import { useIncrementalList } from '../lib/hooks'
import CoverImage from '../components/CoverImage'
import BackButton from '../components/BackButton'
import Section from '../components/Section'
import { formatTime, NowPlayingTrackActions } from '../components/NowPlayingBar'
import {
  QueueRow,
  EditButton,
  useLikedTrackIds
} from '../components/QueuePanel'
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  ShuffleIcon,
  RepeatIcon
} from '../components/PlayerIcons'

// Art-led full-page view of the current track: big artwork, transport
// controls and the live queue side by side. Pure view over usePlayer() — no
// queries, no own state — so it stays in sync with the bar for free.
export default function NowPlayingPage() {
  const {
    track,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    index,
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
    playAt,
    removeFromQueue,
    moveInQueue
  } = usePlayer()

  // Memoized (identity only changes on real queue changes, not timeupdate
  // ticks) and revealed in scroll batches — queues can hold thousands of
  // tracks. Hooks run before the early return below to keep their order stable.
  const upNext = useMemo(() => queue.slice(index + 1), [queue, index])
  const likedIds = useLikedTrackIds()
  const { visible, sentinelRef, hasMore } = useIncrementalList(upNext)

  if (!track) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <BackButton />
        <p className="mt-8 text-center text-gray-500">
          Nothing is playing. Start something from the{' '}
          <Link to="/music" className="text-accent hover:underline">
            Music
          </Link>{' '}
          section.
        </p>
      </div>
    )
  }

  // Same link/duration rules as NowPlayingBar: themes link to their anime,
  // library tracks to album/artist, and the tag duration fills in while
  // <audio> metadata is unknown.
  const animeLink = track.mediaId != null ? `/anime/${track.mediaId}` : null
  const albumLink = track.albumId != null ? `/music/albums/${track.albumId}` : null
  const artistLink = track.artistId != null ? `/music/artists/${track.artistId}` : null
  const dur = (Number.isFinite(duration) && duration > 0 ? duration : track.duration) || 0
  const titleLink = albumLink ?? animeLink

  return (
    // The art-led now-playing screen. The ambient wash is the app's OWN accent,
    // not a palette extracted from the cover: the Lain theme is one hue on
    // purpose, and a per-album tint would make this the only screen that
    // isn't. It still lifts the artwork off a flat background, which was the
    // point of the treatment.
    <div className="relative p-6 max-w-5xl mx-auto">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(70% 55% at 30% 0%, rgb(var(--accent) / 0.10) 0%, transparent 70%)'
        }}
      />
      <BackButton />
      <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left: artwork + transport */}
        <div className="flex flex-col items-center">
          <CoverImage
            path={track.coverPath}
            alt={track.context ?? track.title}
            rounded="rounded-xl"
            className="aspect-square w-full max-w-md shadow-xl shadow-black/40"
            fallback="music"
          />

          <div className="mt-6 w-full max-w-md text-center">
            {titleLink ? (
              <Link to={titleLink} className="text-2xl font-bold hover:text-accent">
                {track.title}
              </Link>
            ) : (
              <p className="text-2xl font-bold">{track.title}</p>
            )}
            <p className="mt-1 text-sm text-gray-400">
              {artistLink && track.subtitle ? (
                <Link to={artistLink} className="hover:text-accent">
                  {track.subtitle}
                </Link>
              ) : (
                track.subtitle
              )}
              {track.context && (
                <>
                  {track.subtitle && ' · '}
                  {albumLink ? (
                    <Link to={albumLink} className="hover:text-accent">
                      {track.context}
                    </Link>
                  ) : animeLink ? (
                    <Link to={animeLink} className="hover:text-accent">
                      {track.context}
                    </Link>
                  ) : (
                    track.context
                  )}
                </>
              )}
            </p>
          </div>

          <div className="mt-5 flex w-full max-w-md items-center gap-2">
            <span className="w-10 shrink-0 text-right text-xs tabular-nums text-gray-500">
              {formatTime(currentTime)}
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
            <span className="w-10 shrink-0 text-xs tabular-nums text-gray-500">
              {formatTime(dur)}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-1.5">
            {queue.length > 1 && (
              <button
                onClick={toggleShuffle}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  shuffled
                    ? 'bg-accent/10 text-accent hover:bg-accent/20'
                    : 'text-gray-500 hover:bg-base-700/70 hover:text-gray-200'
                }`}
                title={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
                aria-label={shuffled ? 'Disable shuffle' : 'Shuffle queue'}
              >
                <ShuffleIcon className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={previous}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-base-700/70 hover:text-white"
              title="Previous"
              aria-label="Previous"
            >
              <PrevIcon className="h-4 w-4" />
            </button>
            <button
              onClick={toggle}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/35 bg-accent/15 text-accent transition-colors hover:bg-accent/25"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={next}
              disabled={!hasNext}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-base-700/70 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              title="Next"
              aria-label="Next"
            >
              <NextIcon className="h-4 w-4" />
            </button>
            <button
              onClick={cycleRepeat}
              className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                repeat !== 'off'
                  ? 'bg-accent/10 text-accent hover:bg-accent/20'
                  : 'text-gray-500 hover:bg-base-700/70 hover:text-gray-200'
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
                <span className="absolute bottom-0.5 right-0.5 text-[8px] font-semibold">1</span>
              )}
            </button>
          </div>

          <div className="mt-5">
            <NowPlayingTrackActions track={track} prominent />
          </div>

          <div className="mt-4 flex w-40 items-center gap-1.5">
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
        </div>

        {/* Right: the live queue (same rows/rules as the bar's popover) */}
        <div className="min-w-0">
          <Section
            title="Queue"
            subtitle={upNext.length === 0 ? 'Nothing up next' : `${upNext.length} up next`}
            className=""
          >
            <QueueRow track={track} active playing={isPlaying} onClick={toggle} likedIds={likedIds} />
            {upNext.length > 0 && (
              <>
                <p className="px-2 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  Next up
                </p>
                {visible.map((t, i) => {
                  const abs = index + 1 + i // absolute queue position, always > index
                  return (
                    <QueueRow
                    likedIds={likedIds}
                      key={`${abs}-${t.id}`}
                      track={t}
                      onClick={() => playAt(abs)}
                      actions={
                        <>
                          <EditButton
                            label="Move up in queue"
                            disabled={i === 0}
                            onClick={() => moveInQueue(abs, abs - 1)}
                          >
                            ▲
                          </EditButton>
                          <EditButton
                            label="Move down in queue"
                            disabled={i === upNext.length - 1}
                            onClick={() => moveInQueue(abs, abs + 1)}
                          >
                            ▼
                          </EditButton>
                          <EditButton label="Remove from queue" onClick={() => removeFromQueue(abs)}>
                            ×
                          </EditButton>
                        </>
                      }
                    />
                  )
                })}
                <div ref={sentinelRef} />
                {hasMore && (
                  <p className="py-1 text-center text-[10px] text-gray-500">
                    {visible.length} of {upNext.length} — scroll for more
                  </p>
                )}
              </>
            )}
          </Section>
        </div>
      </div>
    </div>
  )
}
