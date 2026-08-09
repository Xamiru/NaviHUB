import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePlayer } from '../lib/player'
import { useIncrementalList } from '../lib/hooks'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import CoverImage from './CoverImage'
import { PlayIcon, PauseIcon } from './PlayerIcons'

// Spotify-style "queue" popover anchored above the now-playing bar: the current
// song plus everything still to come. Clicking a row jumps straight to it;
// "Next up" rows can be reordered (▲▼) or removed (×) — the playing track
// itself is never editable, which keeps the player's index bookkeeping trivial.
export default function QueuePanel({ onClose }: { onClose: () => void }) {
  const { queue, index, isPlaying, playAt, toggle, removeFromQueue, moveInQueue } = usePlayer()
  const likedIds = useLikedTrackIds()
  const listRef = useRef<HTMLDivElement>(null)

  // A jump (or auto-advance) reshapes "Next up"; snap back to the top so the
  // now-playing row stays in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 })
  }, [index])

  // Popover convention: Escape closes (dialogs get this from useDialog).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const current = queue[index]
  // Memoized so the slice's identity only changes when the queue really does —
  // usePlayer() re-renders on every timeupdate tick, and a fresh array each
  // tick would reset the incremental list below back to its first batch.
  const upNext = useMemo(() => queue.slice(index + 1), [queue, index])
  // A queue can hold thousands of tracks (a whole huge album); mounting a row
  // for each froze the popover, so reveal in scroll batches.
  const { visible, sentinelRef, hasMore } = useIncrementalList(upNext)

  return (
    <>
      {/* click-away backdrop */}
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute bottom-full right-2 mb-2 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-base-700 bg-base-800 shadow-xl shadow-black/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-base-700">
          <span className="text-sm font-semibold">Queue</span>
          <span className="text-xs text-gray-500">
            {upNext.length === 0 ? 'Nothing up next' : `${upNext.length} up next`}
          </span>
        </div>
        <div ref={listRef} className="max-h-96 overflow-y-auto p-2">
          {current && (
            <>
              <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Now playing
              </p>
              <QueueRow track={current} active playing={isPlaying} onClick={toggle} likedIds={likedIds} />
            </>
          )}
          {upNext.length > 0 && (
            <>
              <p className="px-2 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Next up
              </p>
              {visible.map((t, i) => {
                const abs = index + 1 + i // absolute queue position, always > index
                return (
                  <QueueRow
                    key={`${abs}-${t.id}`}
                    track={t}
                    likedIds={likedIds}
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
        </div>
      </div>
    </>
  )
}

// Exported for the full-page now-playing view, which renders the same rows.
export function EditButton({
  label,
  disabled = false,
  onClick,
  children
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className="w-5 text-center text-xs text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation() // the row itself jumps playback
        onClick()
      }}
    >
      {children}
    </button>
  )
}

// The heart, on a queue row. Only library tracks have one: the queue also
// carries `theme-` / `quiz-` / `tourney-` / `file-` ids, none of which have a
// music_track row to like. Returns the numeric id, or null for those.
function musicIdOf(trackId: string): number | null {
  // Anchored digits, not Number(): Number('') is 0 and passes isFinite, so a
  // bare `music-` id would have rendered a heart writing against track 0.
  const m = /^music-(\d+)$/.exec(trackId)
  return m ? Number(m[1]) : null
}

// One Set for every row. Each row used to run its own useQuery and an O(liked)
// `.some()`; the panel re-renders on every playback tick (see the memo note
// above), so with 96 visible rows and a few thousand liked tracks that was
// hundreds of thousands of comparisons a second. The query is still the shared
// cache entry MusicLikedPage populates, and setLiked's broad invalidation
// refreshes it.
export function useLikedTrackIds(): Set<number> {
  const { data } = useQuery({
    queryKey: qk.music.tracks(LIKED_ONLY),
    queryFn: () => api.music.tracks(LIKED_ONLY)
  })
  return useMemo(() => new Set((data ?? []).map((t) => t.id)), [data])
}

function QueueLikeButton({ trackId, likedIds }: { trackId: number; likedIds: Set<number> }) {
  const qc = useQueryClient()
  const source = likedIds.has(trackId)
  const [liked, setLiked] = useState(source)
  useEffect(() => setLiked(source), [source])

  async function toggle(e: React.MouseEvent): Promise<void> {
    e.stopPropagation() // the row itself jumps playback
    const next = !liked
    setLiked(next)
    try {
      await api.music.setLiked(trackId, next)
      // Deliberately the broad prefix, matching MusicTrackRow: likedAt is
      // denormalized into every track-returning query.
      await qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (err) {
      setLiked(!next)
      toastError(err)
    }
  }

  const label = liked ? 'Remove from Liked Songs' : 'Add to Liked Songs'
  return (
    <button
      className={`px-1 text-sm ${
        liked ? 'text-accent' : 'text-gray-600 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
      } hover:text-accent`}
      title={label}
      aria-label={label}
      aria-pressed={liked}
      onClick={(e) => void toggle(e)}
    >
      {liked ? '♥' : '♡'}
    </button>
  )
}

const LIKED_ONLY = { likedOnly: true }

export function QueueRow({
  track,
  active = false,
  playing = false,
  onClick,
  actions,
  likedIds
}: {
  track: {
    id: string
    title: string
    subtitle?: string | null
    context?: string | null
    coverPath?: string | null
  }
  active?: boolean
  playing?: boolean
  onClick: () => void
  actions?: React.ReactNode
  likedIds: Set<number>
}) {
  const musicId = musicIdOf(track.id)
  const sub = [track.context, track.subtitle].filter(Boolean).join(' · ')
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={`group w-full flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-base-700 ${
        active ? 'bg-base-700/60' : ''
      }`}
    >
      <CoverImage
        path={track.coverPath}
        alt={track.context ?? track.title}
        className="h-11 w-8 shrink-0"
        fallback="music"
      />
      <div className="min-w-0 flex-1">
        <p className={`text-sm truncate leading-tight ${active ? 'text-accent' : ''}`}>
          {track.title}
        </p>
        {sub && <p className="text-xs text-gray-500 truncate leading-tight mt-0.5">{sub}</p>}
      </div>
      {musicId != null && <QueueLikeButton trackId={musicId} likedIds={likedIds} />}
      {actions && (
        <div className="hidden shrink-0 items-center group-hover:flex group-focus-within:flex">
          {actions}
        </div>
      )}
      {active && (
        <span className="shrink-0 text-accent text-xs" aria-hidden>
          {playing ? <PlayIcon /> : <PauseIcon />}
        </span>
      )}
    </div>
  )
}
