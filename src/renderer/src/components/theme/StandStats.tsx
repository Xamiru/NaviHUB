import type { StandParameter } from '../../lib/standStats'

// The six-sided Stand parameter chart from the JoJo eyecatch cards. Decorative:
// callers always pair it with the same grades as text.
export function StandRadar({ params, fill, ink, size = 140 }: { params: StandParameter[]; fill: string; ink: string; size?: number }) {
  const c = 70
  const r = 54
  const pt = (i: number, radius: number): [number, number] => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3
    return [c + radius * Math.cos(a), c + radius * Math.sin(a)]
  }
  const hex = (radius: number): string => [0, 1, 2, 3, 4, 5].map((i) => pt(i, radius).join(',')).join(' ')
  return (
    <svg className="jj-radar" viewBox="0 0 140 140" width={size} height={size} aria-hidden="true">
      <circle cx={c} cy={c} r={66} fill="none" style={{ stroke: ink }} strokeOpacity={0.7} strokeWidth={1.5} />
      {[18, 36, 54].map((radius) => (
        <polygon key={radius} points={hex(radius)} fill="none" style={{ stroke: ink }} strokeOpacity={0.45} />
      ))}
      {params.map((_, i) => {
        const [x, y] = pt(i, r)
        return <line key={i} x1={c} y1={c} x2={x} y2={y} style={{ stroke: ink }} strokeOpacity={0.35} />
      })}
      <polygon
        points={params.map((p, i) => pt(i, 8 + p.value * (r - 8)).join(',')).join(' ')}
        style={{ fill, stroke: ink }}
        fillOpacity={0.8}
      />
      {params.map((p, i) => {
        const [x, y] = pt(i, r + 11)
        return (
          <text key={p.label} x={x} y={y + 4} textAnchor="middle" fontSize={13} fontFamily="Anton, sans-serif" style={{ fill: ink }}>
            {p.grade}
          </text>
        )
      })}
    </svg>
  )
}

// A title's Stand parameters on its detail page, with every value spelled out.
export default function StandStats({ params }: { params: StandParameter[] }) {
  return (
    <section className="jj-stand-stats mb-5" aria-label="Stand parameters">
      <StandRadar params={params} fill="rgb(var(--accent))" ink="rgb(var(--ink-primary))" size={160} />
      <dl>
        {params.map((p) => (
          <div key={p.label} className="contents">
            <dt>{p.label}</dt>
            <dd>{p.detail}</dd>
            <dd className="jj-grade">{p.grade}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
