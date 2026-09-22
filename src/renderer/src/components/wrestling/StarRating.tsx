import { useRef } from 'react'

// Meltzer-style 0-5 star rating in half steps. One full-size slider target
// replaces the old ten tiny half-star buttons. Pointer position chooses the
// half step; arrows adjust it; Home/Delete clear and End sets five.

export default function StarRating({
  value,
  onChange,
  readOnly = false
}: {
  value: number | null
  onChange?: (stars: number | null) => void
  readOnly?: boolean
}): JSX.Element {
  const starRailRef = useRef<HTMLSpanElement>(null)

  if (readOnly) {
    return (
      <span className="text-sm text-accent" title={value != null ? `${value} of 5` : undefined}>
        {value == null ? '' : `★ ${value}`}
      </span>
    )
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Match rating"
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={value ?? 0}
      aria-valuetext={value == null ? 'Not rated' : `${value} of 5 stars`}
      title="Click to rate; use arrow keys for half stars; Delete clears"
      className="inline-flex min-h-8 w-28 cursor-pointer items-center gap-1.5 rounded px-1.5 hover:bg-base-700"
      onClick={(event) => {
        const rect = starRailRef.current?.getBoundingClientRect()
        if (!rect || rect.width <= 0) return
        const next = Math.max(
          0.5,
          Math.min(5, Math.ceil(((event.clientX - rect.left) / rect.width) * 10) / 2)
        )
        onChange?.(value === next ? null : next)
      }}
      onKeyDown={(event) => {
        let next: number | null | undefined
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          next = Math.min(5, (value ?? 0) + 0.5)
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          next = value == null || value <= 0.5 ? null : value - 0.5
        } else if (event.key === 'Home' || event.key === 'Delete' || event.key === 'Backspace') {
          next = null
        } else if (event.key === 'End') {
          next = 5
        }
        if (next === undefined) return
        event.preventDefault()
        onChange?.(next)
      }}
    >
      <span ref={starRailRef} className="relative inline-block leading-none" aria-hidden="true">
        <span className="text-gray-600">★★★★★</span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-accent"
          style={{ width: `${((value ?? 0) / 5) * 100}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span className="w-5 text-right text-[10px] tabular-nums text-gray-400">
        {value ?? '—'}
      </span>
    </div>
  )
}
