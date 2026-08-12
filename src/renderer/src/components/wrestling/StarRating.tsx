// Meltzer-style 0-5 star rating in half steps. ★/☆ are allowed glyphs — the
// app's no-decoration rule exempts score/rarity data badges.
//
// Each star is two half-width buttons, so the left half sets x.5 and the right
// half sets x.0; clicking the value it already holds clears it, which is the
// only way to un-rate without a separate control.
const STARS = [1, 2, 3, 4, 5]

export default function StarRating({
  value,
  onChange,
  readOnly = false
}: {
  value: number | null
  onChange?: (stars: number | null) => void
  readOnly?: boolean
}): JSX.Element {
  const set = (v: number): void => onChange?.(value === v ? null : v)

  if (readOnly) {
    return (
      <span className="text-sm text-accent" title={value != null ? `${value} of 5` : undefined}>
        {value == null ? '' : `★ ${value}`}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-0.5" role="group" aria-label="Rating">
      {STARS.map((n) => {
        const filled = (value ?? 0) >= n
        const half = !filled && (value ?? 0) >= n - 0.5
        return (
          <span key={n} className="relative inline-block leading-none">
            <span className={filled || half ? 'text-accent' : 'text-gray-600'}>
              {filled ? '★' : half ? '⯪' : '☆'}
            </span>
            <button
              className="absolute inset-y-0 left-0 w-1/2"
              aria-label={`Rate ${n - 0.5} of 5`}
              title={`${n - 0.5}`}
              onClick={() => set(n - 0.5)}
            />
            <button
              className="absolute inset-y-0 right-0 w-1/2"
              aria-label={`Rate ${n} of 5`}
              title={`${n}`}
              onClick={() => set(n)}
            />
          </span>
        )
      })}
      {value != null && (
        <button
          className="ml-1 text-xs text-gray-500 hover:text-gray-300"
          onClick={() => onChange?.(null)}
          aria-label="Clear rating"
          title="Clear rating"
        >
          ✕
        </button>
      )}
    </span>
  )
}
