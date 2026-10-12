// Stacked bar chart as pure divs, the multi-series sibling of BarChart: one
// column per bar, one segment per series in a fixed order (color follows the
// series, never its rank), a 2px surface gap between segments, the total on
// the tallest bar only, a legend, native title tooltips, and the exact values
// as a screen-reader table.

export interface StackSeries {
  key: string
  label: string
  color: string
}

export interface StackBar {
  key: string
  label: string // x label (every bar; keep the bar count small)
  values: Record<string, number> // series key → value
}

export default function StackedBarChart({
  series,
  bars,
  height = 140,
  label,
  unit
}: {
  series: StackSeries[] // stacking order, bottom to top
  bars: StackBar[]
  height?: number
  label: string
  unit: string // "titles"
}) {
  const totals = bars.map((b) => series.reduce((n, s) => n + (b.values[s.key] ?? 0), 0))
  const max = Math.max(...totals, 1)
  const maxIdx = totals.indexOf(max)
  const present = series.filter((s) => bars.some((b) => (b.values[s.key] ?? 0) > 0))
  return (
    <div>
      <div aria-hidden="true" className="flex items-end gap-1 pt-4" style={{ height: height + 16 }}>
        {bars.map((b, i) => {
          const total = totals[i]
          const parts = present.filter((s) => (b.values[s.key] ?? 0) > 0)
          return (
            <div key={b.key} className="relative flex h-full flex-1 items-end justify-center">
              {i === maxIdx && total > 0 && (
                <span className="absolute -top-4 text-[10px] tabular-nums text-gray-400">
                  {total}
                </span>
              )}
              <div
                className="flex w-full max-w-10 flex-col-reverse gap-[2px]"
                style={{ height: `${Math.max((total / max) * 100, total > 0 ? 3 : 0)}%` }}
              >
                {parts.map((s, j) => {
                  const v = b.values[s.key] ?? 0
                  return (
                    <div
                      key={s.key}
                      title={`${b.label} · ${s.label}: ${v} ${unit}`}
                      className={`min-h-[2px] transition-opacity hover:opacity-80 ${
                        j === parts.length - 1 ? 'rounded-t' : ''
                      }`}
                      style={{ flexGrow: v, flexBasis: 0, background: s.color }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div aria-hidden="true" className="border-t border-base-700" />
      <div aria-hidden="true" className="mt-1 flex gap-1">
        {bars.map((b) => (
          <div key={b.key} className="flex-1 text-center text-[10px] text-gray-500">
            {b.label}
          </div>
        ))}
      </div>
      <ul aria-hidden="true" className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {present.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Bar</th>
            {present.map((s) => (
              <th key={s.key} scope="col">
                {s.label}
              </th>
            ))}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((b, i) => (
            <tr key={b.key}>
              <th scope="row">{b.label}</th>
              {present.map((s) => (
                <td key={s.key}>{b.values[s.key] ?? 0}</td>
              ))}
              <td>{totals[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
