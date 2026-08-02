import { targetLevels, type CompareResult, type NormalizedContour } from '@shared/pitchTrack'

// SVG overlay for the Speak drill (the StrokeCanvas idiom — SVG in a sized
// div, never 2D canvas): the idealized H/L step contour of the target accent,
// the user's normalized semitone contour, dashed mora boundaries with kana
// labels, and per-mora verdict marks (✓/✕/○ — functional state glyphs).

const W = 480
const H = 160
const PAD_X = 12
const PAD_TOP = 16
const PAD_BOTTOM = 30

export default function PitchContourChart({
  morae,
  position,
  contour,
  result
}: {
  morae: string[]
  position: number
  contour: NormalizedContour | null
  result: CompareResult | null
}) {
  const n = morae.length
  if (n === 0) return null
  const plotW = W - 2 * PAD_X
  const plotH = H - PAD_TOP - PAD_BOTTOM
  const sliceW = plotW / n
  const xOf = (i: number): number => PAD_X + i * sliceW

  // Semitone scale: at least ±3 st around 0, expanded to the user's range.
  let stMax = 3
  if (contour) {
    for (const f of contour.frames) {
      if (f.st !== null) stMax = Math.max(stMax, Math.abs(f.st))
    }
  }
  const yOfSt = (st: number): number =>
    PAD_TOP + plotH / 2 - (st / stMax) * (plotH / 2) * 0.9

  // Target step polyline: H band at -? Use fixed bands: high = 25% height,
  // low = 75% height inside the plot.
  const levels = targetLevels(position, n)
  const yHigh = PAD_TOP + plotH * 0.22
  const yLow = PAD_TOP + plotH * 0.78
  const targetPoints: string[] = []
  for (let i = 0; i < n; i++) {
    const y = levels[i] ? yHigh : yLow
    targetPoints.push(`${xOf(i) + sliceW * 0.15},${y}`)
    targetPoints.push(`${xOf(i) + sliceW * 0.85},${y}`)
  }

  // User contour mapped over the trimmed time range.
  let userPoints = ''
  if (contour && contour.frames.length > 1) {
    const t0 = contour.frames[0].t
    const t1 = contour.frames[contour.frames.length - 1].t
    const span = Math.max(0.001, t1 - t0)
    userPoints = contour.frames
      .filter((f) => f.st !== null)
      .map((f) => `${PAD_X + ((f.t - t0) / span) * plotW},${yOfSt(f.st!)}`)
      .join(' ')
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[520px]"
        role="img"
        aria-label="Pitch contour comparison"
      >
        {/* mora boundaries + labels + verdicts */}
        {morae.map((mora, i) => (
          <g key={i}>
            {i > 0 && (
              <line
                x1={xOf(i)}
                y1={PAD_TOP}
                x2={xOf(i)}
                y2={H - PAD_BOTTOM}
                stroke="rgb(var(--base-700))"
                strokeDasharray="3 3"
              />
            )}
            <text
              x={xOf(i) + sliceW / 2}
              y={H - 12}
              textAnchor="middle"
              fontSize="13"
              fill="rgb(var(--gray-300, 209 213 219))"
              className="fill-gray-300"
            >
              {mora}
            </text>
            {result && result.moraVerdicts[i] && (
              <text
                x={xOf(i) + sliceW / 2}
                y={H - 26}
                textAnchor="middle"
                fontSize="11"
                className={
                  result.moraVerdicts[i] === 'ok'
                    ? 'fill-green-400'
                    : result.moraVerdicts[i] === 'miss'
                      ? 'fill-red-400'
                      : 'fill-gray-500'
                }
              >
                {result.moraVerdicts[i] === 'ok' ? '✓' : result.moraVerdicts[i] === 'miss' ? '✕' : '○'}
              </text>
            )}
          </g>
        ))}
        {/* target steps */}
        <polyline
          points={targetPoints.join(' ')}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
          opacity="0.45"
        />
        {/* user contour */}
        {userPoints && (
          <polyline
            points={userPoints}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="2"
          />
        )}
      </svg>
      <p className="mt-1 text-xs text-gray-500">
        faint line = target pattern · bright line = your pitch (shape only, normalized)
      </p>
    </div>
  )
}
