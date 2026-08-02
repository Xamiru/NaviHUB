import { memo, useEffect, useRef, useState } from 'react'
import {
  cueMatches,
  cuesAt,
  filterDialogue,
  formatTime,
  type CueTrack,
  type SubCue
} from '@shared/subtitles'
import { useDebouncedValue, useIncrementalList } from '../../lib/hooks'
import { usePersistedState } from '../../lib/navState'

// The whole script as a scrollable, searchable list: click a line to jump to
// it, mine a line without waiting for it to come round again. Matches
// MiningPanel's shell dimensions so having both open reads as one system.

const Row = memo(function Row({
  cue,
  active,
  translation,
  onSeek,
  onMine
}: {
  cue: SubCue
  active: boolean
  translation: string | null
  onSeek: (cue: SubCue) => void
  onMine: (cue: SubCue) => void
}) {
  return (
    <div
      className={`group flex gap-2 border-b border-base-800 px-3 py-1.5 text-sm ${
        active
          ? 'bg-accent/10 text-accent shadow-[inset_2px_0_0_0_rgb(var(--accent))]'
          : 'text-gray-300'
      }`}
    >
      <button
        className="shrink-0 pt-0.5 text-xs tabular-nums text-gray-500 hover:text-accent"
        title="Jump to this line"
        onClick={() => onSeek(cue)}
      >
        {formatTime(cue.start)}
      </button>
      <button className="min-w-0 flex-1 text-left" onClick={() => onSeek(cue)}>
        <span className="whitespace-pre-wrap">{cue.text}</span>
        {translation && <span className="mt-0.5 block text-xs text-gray-500">{translation}</span>}
      </button>
      <button
        className="shrink-0 self-start rounded px-1 text-xs text-gray-600 opacity-0 hover:text-accent group-hover:opacity-100"
        title="Mine this line"
        aria-label="Mine this line"
        onClick={() => onMine(cue)}
      >
        +
      </button>
    </div>
  )
})

export default function TranscriptPanel({
  track,
  secondary,
  showSecondary,
  dialogueOnly,
  activeCueId,
  onSeek,
  onMineCue,
  onClose
}: {
  track: CueTrack | null
  secondary: CueTrack | null
  showSecondary: boolean
  dialogueOnly: boolean
  activeCueId: number | null
  onSeek: (cue: SubCue) => void
  onMineCue: (cue: SubCue) => void
  onClose: () => void
}): JSX.Element {
  const [query, setQuery] = usePersistedState('transcriptSearch', '')
  const dq = useDebouncedValue(query, 200)
  const scrollRef = useRef<HTMLDivElement>(null)
  // Auto-scroll must get out of the way while the user is reading ahead, or
  // the panel yanks itself back on every cue change (the manga reader's
  // suppressObserverRef trick).
  const [manualUntil, setManualUntil] = useState(0)

  const all = track?.cues ?? []
  const base = dialogueOnly ? filterDialogue(all) : all
  const filtered = dq.trim() ? base.filter((c) => cueMatches(c, dq)) : base
  const { visible, sentinelRef } = useIncrementalList(filtered)

  useEffect(() => {
    if (activeCueId == null || Date.now() < manualUntil) return
    const el = scrollRef.current?.querySelector(`[data-cue="${activeCueId}"]`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [activeCueId, manualUntil])

  return (
    <div className="flex h-full w-[340px] shrink-0 flex-col border-l border-base-700 bg-base-900">
      <div className="flex items-center gap-2 border-b border-base-700 px-3 py-2">
        <span className="label mb-0 flex-1">
          Transcript
          <span className="ml-2 normal-case text-gray-500">
            {dq.trim() ? `${filtered.length} of ${base.length}` : `${base.length} lines`}
          </span>
        </span>
        <span className="kbd">T</span>
        <button
          className="text-gray-500 hover:text-white"
          title="Close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="border-b border-base-700 p-2">
        <input
          className="input w-full"
          placeholder="Search the script…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
      </div>
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto"
        onWheel={() => setManualUntil(Date.now() + 4000)}
      >
        {track == null ? (
          <p className="p-3 text-sm text-gray-500">Pick a subtitle track to see the script.</p>
        ) : filtered.length === 0 ? (
          <p className="p-3 text-sm text-gray-500">No lines match.</p>
        ) : (
          <>
            {visible.map((c) => (
              <div key={c.id} data-cue={c.id}>
                <Row
                  cue={c}
                  active={c.id === activeCueId}
                  translation={
                    showSecondary && secondary
                      ? (cuesAt(secondary, c.start + 0.05)[0]?.text.replace(/\n/g, ' ') ?? null)
                      : null
                  }
                  onSeek={onSeek}
                  onMine={onMineCue}
                />
              </div>
            ))}
            <div ref={sentinelRef} />
          </>
        )}
      </div>
    </div>
  )
}
