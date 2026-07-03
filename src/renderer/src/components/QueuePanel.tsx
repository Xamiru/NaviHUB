import { useEffect, useRef } from 'react'
import { usePlayer } from '../lib/player'
import CoverImage from './CoverImage'

// Spotify-style "queue" popover anchored above the now-playing bar: the current
// song plus everything still to come. Clicking a row jumps straight to it.
export default function QueuePanel({ onClose }: { onClose: () => void }) {
  const { queue, index, isPlaying, playAt, toggle } = usePlayer()
  const listRef = useRef<HTMLDivElement>(null)

  // A jump (or auto-advance) reshapes "Next up"; snap back to the top so the
  // now-playing row stays in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 })
  }, [index])

  const current = queue[index]
  const upNext = queue.slice(index + 1)

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
              <QueueRow track={current} active playing={isPlaying} onClick={toggle} />
            </>
          )}
          {upNext.length > 0 && (
            <>
              <p className="px-2 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Next up
              </p>
              {upNext.map((t, i) => (
                <QueueRow
                  key={`${index + 1 + i}-${t.id}`}
                  track={t}
                  onClick={() => playAt(index + 1 + i)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

function QueueRow({
  track,
  active = false,
  playing = false,
  onClick
}: {
  track: { title: string; subtitle?: string | null; context?: string | null; coverPath?: string | null }
  active?: boolean
  playing?: boolean
  onClick: () => void
}) {
  const sub = [track.context, track.subtitle].filter(Boolean).join(' · ')
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-base-700 ${
        active ? 'bg-base-700/60' : ''
      }`}
    >
      <CoverImage
        path={track.coverPath}
        alt={track.context ?? track.title}
        className="h-11 w-8 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className={`text-sm truncate leading-tight ${active ? 'text-accent' : ''}`}>
          {track.title}
        </p>
        {sub && <p className="text-xs text-gray-500 truncate leading-tight mt-0.5">{sub}</p>}
      </div>
      {active && (
        <span className="shrink-0 text-accent text-xs" aria-hidden>
          {playing ? '▮▮▮' : '❚❚'}
        </span>
      )}
    </button>
  )
}
