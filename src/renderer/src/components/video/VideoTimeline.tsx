import { useRef, useState } from 'react'
import { formatTime, type SubCue } from '@shared/subtitles'

// The scrubber, built the way RangeSlider is: plain divs draw the track, the
// buffered ranges and the played fill, and one transparent native
// <input type="range"> on top provides dragging and keyboard focus for free.
//
// The cue ticks are the one addition — an at-a-glance map of where the dialogue
// actually is, which is genuinely useful when skipping a cold open. Capped,
// because a karaoke-heavy ASS can carry 20k cues and 20k absolutely positioned
// divs would cost more than the whole rest of the page.
const MAX_TICKS = 400

export default function VideoTimeline({
  time,
  duration,
  buffered,
  cues,
  onSeek
}: {
  time: number
  duration: number
  buffered: { start: number; end: number }[]
  cues: SubCue[]
  onSeek: (t: number) => void
}): JSX.Element {
  const barRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<{ x: number; t: number } | null>(null)
  const span = duration > 0 ? duration : 0
  const pct = (v: number): number => (span <= 0 ? 0 : Math.min(100, Math.max(0, (v / span) * 100)))
  const ticks = span > 0 && cues.length > 0 && cues.length <= MAX_TICKS ? cues : []

  return (
    <div className="relative min-w-0 flex-1">
      {hover && (
        <div
          className="pointer-events-none absolute -top-7 z-10 -translate-x-1/2 rounded bg-base-900/95 px-1.5 py-0.5 text-xs tabular-nums text-gray-200"
          style={{ left: `${hover.x}%` }}
        >
          {formatTime(hover.t)}
        </div>
      )}
      <div
        ref={barRef}
        className="relative h-5"
        onMouseMove={(e) => {
          const box = barRef.current?.getBoundingClientRect()
          if (!box || box.width === 0 || span <= 0) return
          const ratio = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width))
          setHover({ x: ratio * 100, t: ratio * span })
        }}
        onMouseLeave={() => setHover(null)}
      >
        <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-base-600" />
        {buffered.map((b, i) => (
          <div
            key={i}
            className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-base-500"
            style={{ left: `${pct(b.start)}%`, right: `${100 - pct(b.end)}%` }}
          />
        ))}
        {ticks.map((c) => (
          <div
            key={c.id}
            className="absolute top-1/2 h-[9px] w-px -translate-y-1/2 bg-accent/30"
            style={{ left: `${pct(c.start)}%` }}
          />
        ))}
        <div
          className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 bg-accent"
          style={{ right: `${100 - pct(time)}%` }}
        />
        <input
          type="range"
          className="range-thumb"
          aria-label="Position"
          min={0}
          max={span || 1}
          step={0.1}
          value={Math.min(time, span || 1)}
          disabled={span <= 0}
          style={{ zIndex: 3 }}
          onChange={(e) => onSeek(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
