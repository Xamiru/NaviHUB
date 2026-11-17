import { useEffect, useRef } from 'react'
import type { VideoQueue } from '../../lib/videoQueue'

// The shuffle queue inside the player: what is playing and what comes next.
// Matches TranscriptPanel's shell so the side panels read as one system.
export default function UpNextPanel({
  queue,
  onJump,
  onRemove,
  onReshuffle,
  onStop,
  onClose
}: {
  queue: VideoQueue
  onJump: (index: number) => void
  onRemove: (index: number) => void
  onReshuffle: () => void
  onStop: () => void
  onClose: () => void
}): JSX.Element {
  const currentRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    currentRef.current?.scrollIntoView?.({ block: 'nearest' })
  }, [queue.index])
  const mix = queue.shows.length > 1
  const shown = queue.items.slice(queue.index)

  return (
    <aside
      aria-label="Up next"
      className="panel-in fixed inset-y-0 right-0 z-40 flex h-full w-[min(400px,92vw)] shrink-0 flex-col border-l border-base-700 bg-base-800 shadow-2xl shadow-black/60 xl:static xl:z-auto xl:max-w-[40vw] xl:shadow-none"
    >
      <div className="flex items-center gap-3 border-b border-base-700 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Shuffle
          </p>
          <h2 className="mt-1 truncate text-xl font-semibold text-white">
            {mix ? `Mix of ${queue.shows.length} shows` : queue.shows[0]?.title}
          </h2>
        </div>
        <span className="kbd">U</span>
        <button
          type="button"
          className="text-gray-500 hover:text-white"
          title="Close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="flex gap-2 border-b border-base-700 px-5 py-3">
        <button type="button" className="btn-ghost px-3 py-1 text-sm" onClick={onReshuffle}>
          Reshuffle
        </button>
        <button type="button" className="btn-ghost px-3 py-1 text-sm" onClick={onStop}>
          Stop shuffle
        </button>
      </div>
      <ol aria-label="Queue" className="min-h-0 flex-1 overflow-y-auto">
        {shown.map((item, offset) => {
          const index = queue.index + offset
          const playing = offset === 0
          return (
            <li
              key={`${index}-${item.fileId}`}
              ref={playing ? currentRef : undefined}
              className={`group flex items-center gap-2 border-b border-base-700/70 px-5 py-2.5 text-sm ${
                playing
                  ? 'bg-accent/10 text-accent shadow-[inset_2px_0_0_0_rgb(var(--accent))]'
                  : 'text-gray-300'
              }`}
            >
              {playing ? (
                <span className="min-w-0 flex-1" aria-current="true">
                  <span className="block truncate">{item.title}</span>
                  {mix && <span className="block truncate text-xs text-gray-400">{item.show}</span>}
                  <span className="sr-only">(playing)</span>
                </span>
              ) : (
                <>
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left hover:text-accent"
                    title="Play this now"
                    onClick={() => onJump(index)}
                  >
                    <span className="block truncate">{item.title}</span>
                    {mix && <span className="block truncate text-xs text-gray-400">{item.show}</span>}
                  </button>
                  <button
                    type="button"
                    className="shrink-0 rounded px-1 text-xs text-gray-500 opacity-0 hover:text-white group-hover:opacity-100 group-focus-within:opacity-100"
                    title={`Remove ${item.title} from the queue`}
                    aria-label={`Remove ${item.title} from the queue`}
                    onClick={() => onRemove(index)}
                  >
                    ✕
                  </button>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
