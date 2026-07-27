import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { pathStart } from '@shared/strokes'
import { KANJIVG_VIEWBOX } from '@shared/types'

// Animated stroke-order diagram for one kanji, drawn from the KanjiVG pack.
// Renders nothing at all when the pack isn't installed or the character isn't
// covered — every caller can mount it unconditionally.
//
// The animation uses pathLength={1} so each stroke's dash offset is a plain 0-1
// number: no getTotalLength measurement, no layout read. Under reduced motion
// the strokes are simply drawn with numbered badges (see styles.css).

export default function StrokeOrderDiagram({
  char,
  size = 96,
  showNumbers = true
}: {
  char: string
  size?: number
  showNumbers?: boolean
}) {
  // Key bump re-mounts the SVG, which restarts the CSS animation.
  const [replay, setReplay] = useState(0)
  const { data } = useQuery({
    queryKey: qk.dict.strokes(char),
    queryFn: () => api.dict.strokes(char),
    enabled: !!char
  })
  if (!data || data.strokes.length === 0) return null

  const strokes = data.strokes
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <svg
        key={replay}
        viewBox={KANJIVG_VIEWBOX}
        width={size}
        height={size}
        className="rounded border border-base-700 bg-base-800"
        role="img"
        aria-label={`Stroke order for ${data.character}`}
      >
        {/* Faint whole character underneath, so the animated strokes read as
            filling it in rather than appearing from nowhere. */}
        <g fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          {strokes.map((d, i) => (
            <path key={`bg-${i}`} d={d} className="text-base-700" stroke="currentColor" />
          ))}
        </g>
        <g
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {strokes.map((d, i) => (
            <path
              key={d + i}
              d={d}
              pathLength={1}
              className="stroke-draw"
              style={{ animationDelay: `${i * 0.42}s` }}
            />
          ))}
        </g>
        {showNumbers &&
          strokes.map((d, i) => {
            const p = pathStart(d)
            if (!p) return null
            return (
              <text
                key={`n-${i}`}
                x={p.x}
                y={p.y}
                dx={-2.5}
                dy={-2.5}
                fontSize={7}
                className="fill-gray-500 stroke-number"
              >
                {i + 1}
              </text>
            )
          })}
      </svg>
      <button
        className="btn-ghost py-0.5 px-2 text-[11px] text-gray-500"
        onClick={() => setReplay((r) => r + 1)}
      >
        Replay
      </button>
    </div>
  )
}
