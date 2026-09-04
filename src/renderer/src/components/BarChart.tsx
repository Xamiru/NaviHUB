// Single-series bar chart as pure divs (dataviz conventions shared by the
// music and Japanese stats pages): one accent hue, value label on the max bar
// only, sparse x labels, hairline baseline, native title tooltips.

export interface Bar {
  key: string
  label?: string // sparse x label (most bars pass none)
  value: number
  title: string // native tooltip
}

export default function BarChart({
  bars,
  height = 96,
  label = 'Chart values'
}: {
  bars: Bar[]
  height?: number
  label?: string
}) {
  const max = Math.max(...bars.map((b) => b.value), 1)
  const maxIdx = bars.findIndex((b) => b.value === max)
  return (
    <div>
      <div aria-hidden="true" className="flex items-end gap-[2px] pt-4" style={{ height: height + 16 }}>
        {bars.map((b, i) => (
          <div
            key={b.key}
            className="group relative flex h-full flex-1 items-end justify-center"
            title={b.title}
          >
            {i === maxIdx && b.value > 0 && (
              <span className="absolute -top-4 text-[10px] tabular-nums text-gray-400">
                {b.value}
              </span>
            )}
            <div
              className={`w-full max-w-6 ${
                b.value > 0 ? 'rounded-t bg-accent/70 group-hover:bg-accent' : 'bg-base-700'
              }`}
              style={{ height: b.value > 0 ? `${Math.max((b.value / max) * 100, 3)}%` : '2px' }}
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="border-t border-base-700" />
      <div aria-hidden="true" className="mt-1 flex gap-[2px]">
        {bars.map((b) => (
          <div key={b.key} className="flex-1 text-center text-[10px] text-gray-500">
            {b.label ?? ''}
          </div>
        ))}
      </div>
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Period</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.key}>
              <th scope="row">{bar.title}</th>
              <td>{bar.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
