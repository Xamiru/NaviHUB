import { useEffect, useRef, useState } from 'react'
import type { Point } from '@shared/strokes'
import { KANJIVG_SIZE } from '@shared/types'

// Draw-a-kanji surface. Committed strokes stay on screen in accent; the stroke
// in progress follows the pointer; an optional hint path (the reference stroke
// the learner just missed) is drawn underneath.
export default function StrokeCanvas({
  size = 260,
  committed,
  hintPath,
  onStroke
}: {
  size?: number
  committed: Point[][] // canvas-space polylines, already accepted
  hintPath: string | null // KanjiVG `d` in 109-space, shown as a nudge
  onStroke: (points: Point[]) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<Point[]>([])
  const drawing = useRef(false)
  // The in-progress stroke, mirrored outside React state: `onStroke` judges the
  // stroke and advances the drill, so it must run exactly once per lifted pen.
  // Calling it from inside a setState updater would fire it twice under
  // StrictMode (and whenever React rebases the update).
  const pointsRef = useRef<Point[]>([])

  // A pointer released outside the canvas must still finish the stroke.
  useEffect(() => {
    function stop() {
      if (!drawing.current) return
      drawing.current = false
      const pts = pointsRef.current
      pointsRef.current = []
      setCurrent([])
      if (pts.length >= 2) onStroke(pts)
    }
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    return () => {
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
    }
  }, [onStroke])

  function pointAt(e: React.PointerEvent): Point {
    const rect = ref.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const toPath = (pts: Point[]): string =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const scale = size / KANJIVG_SIZE

  return (
    <div
      ref={ref}
      className="relative touch-none select-none rounded-md border border-base-700 bg-base-800"
      style={{ width: size, height: size }}
      onPointerDown={(e) => {
        e.preventDefault()
        drawing.current = true
        const start = [pointAt(e)]
        pointsRef.current = start
        setCurrent(start)
      }}
      onPointerMove={(e) => {
        if (!drawing.current) return
        const p = pointAt(e)
        const pts = pointsRef.current
        const last = pts[pts.length - 1]
        // Skip sub-pixel jitter: fewer points, same shape.
        if (last && Math.hypot(p.x - last.x, p.y - last.y) < 2) return
        pointsRef.current = [...pts, p]
        setCurrent(pointsRef.current)
      }}
    >
      <svg width={size} height={size} className="pointer-events-none absolute inset-0">
        {/* centre guides */}
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} className="stroke-base-700" strokeDasharray="4 6" />
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} className="stroke-base-700" strokeDasharray="4 6" />

        {hintPath && (
          <g transform={`scale(${scale})`}>
            <path
              d={hintPath}
              fill="none"
              stroke="rgb(var(--accent))"
              strokeOpacity={0.45}
              strokeWidth={4 / scale}
              strokeLinecap="round"
            />
          </g>
        )}

        <g fill="none" stroke="rgb(var(--accent))" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
          {committed.map((pts, i) => (
            <path key={i} d={toPath(pts)} />
          ))}
          {current.length > 1 && <path d={toPath(current)} strokeOpacity={0.8} />}
        </g>
      </svg>
    </div>
  )
}
