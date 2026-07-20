// Dual-thumb numeric range, built from two overlaid native <input type="range">
// elements (no dependency). The track and the fill are plain divs; the inputs
// are transparent and only their thumbs take pointer events, so both handles
// stay draggable and keyboard-focusable.
//
// Convention shared with the media filter panel: value === [min, max] means
// "unconstrained", so callers can treat a full-width range as no filter.

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (v: number) => String(v),
  label
}: {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (v: [number, number]) => void
  format?: (v: number) => string
  label: string
}): JSX.Element {
  const [lo, hi] = value
  const span = max - min
  const pct = (v: number): number => (span <= 0 ? 0 : ((v - min) / span) * 100)
  const disabled = span <= 0

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="label mb-0">{label}</span>
        <span className="text-xs tabular-nums text-gray-300">
          {format(lo)} – {format(hi)}
        </span>
      </div>
      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-base-600" />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-accent"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          className="range-thumb"
          aria-label={`${label} minimum`}
          min={min}
          max={max}
          step={step}
          value={lo}
          disabled={disabled}
          // The low thumb sits on top once the two meet, otherwise it would be
          // buried at the right edge and impossible to drag back.
          style={{ zIndex: lo >= hi ? 4 : 3 }}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
        />
        <input
          type="range"
          className="range-thumb"
          aria-label={`${label} maximum`}
          min={min}
          max={max}
          step={step}
          value={hi}
          disabled={disabled}
          style={{ zIndex: 3 }}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
        />
      </div>
    </div>
  )
}
