import { useRef, useState } from 'react'
import type { FlickDir, FlickKeySpec } from '@shared/kanaKeyboard'
import { flickResult } from '@shared/kanaKeyboard'

// One 12-key flick key: tap = center kana, drag past the threshold = the
// petal in the dominant direction (the smartphone gesture). The petal preview
// renders DURING the drag — showing the map on every gesture is how the
// layout gets learned.

const THRESHOLD_PX = 20

const DIRS: { dir: Exclude<FlickDir, 'tap'>; pos: string }[] = [
  { dir: 'left', pos: 'right-full top-1/2 -translate-y-1/2 mr-1' },
  { dir: 'up', pos: 'bottom-full left-1/2 -translate-x-1/2 mb-1' },
  { dir: 'right', pos: 'left-full top-1/2 -translate-y-1/2 ml-1' },
  { dir: 'down', pos: 'top-full left-1/2 -translate-x-1/2 mt-1' }
]

export default function FlickKey({
  spec,
  hint,
  onInput
}: {
  spec: FlickKeySpec
  hint: string | null
  onInput: (kana: string) => void
}) {
  const [drag, setDrag] = useState<FlickDir | null>(null)
  const origin = useRef<{ x: number; y: number } | null>(null)

  const resolveDir = (e: React.PointerEvent): FlickDir => {
    const o = origin.current
    if (!o) return 'tap'
    const dx = e.clientX - o.x
    const dy = e.clientY - o.y
    if (Math.hypot(dx, dy) < THRESHOLD_PX) return 'tap'
    if (Math.abs(dx) >= Math.abs(dy)) return dx < 0 ? 'left' : 'right'
    return dy < 0 ? 'up' : 'down'
  }

  return (
    <div className="relative">
      <button
        type="button"
        className={`chip-toggle relative flex h-12 w-full flex-col items-center justify-center leading-none ${
          drag === 'tap' ? 'chip-toggle-active' : ''
        }`}
        onPointerDown={(e) => {
          // preventDefault keeps focus in the host input — the whole ballgame.
          e.preventDefault()
          e.currentTarget.setPointerCapture(e.pointerId)
          origin.current = { x: e.clientX, y: e.clientY }
          setDrag('tap')
        }}
        onPointerMove={(e) => {
          if (origin.current) setDrag(resolveDir(e))
        }}
        onPointerUp={(e) => {
          if (!origin.current) return
          const out = flickResult(spec, resolveDir(e))
          origin.current = null
          setDrag(null)
          if (out !== null) onInput(out)
        }}
        onPointerCancel={() => {
          origin.current = null
          setDrag(null)
        }}
      >
        <span className="text-base">{spec.center}</span>
        {hint && <span className="mt-0.5 text-[9px] text-gray-500">{hint}</span>}
      </button>
      {drag !== null && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {DIRS.map(({ dir, pos }) => {
            const kana = spec.petals[dir]
            if (!kana) return null
            return (
              <span
                key={dir}
                className={`absolute ${pos} flex h-10 w-10 items-center justify-center rounded-md border text-base shadow-lg shadow-black/40 ${
                  drag === dir
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-base-700 bg-base-900/95'
                }`}
              >
                {kana}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
