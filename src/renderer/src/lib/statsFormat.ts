// Duration formatting shared by the /stats page and its sections.

// Compact per-item / per-type duration ("42 min", "9.5 h", "312 h").
export function fmtStatHours(minutes: number): string {
  if (minutes <= 0) return '0'
  if (minutes < 60) return `${Math.round(minutes)} min`
  const h = minutes / 60
  return `${h >= 10 ? Math.round(h).toLocaleString() : h.toFixed(1)} h`
}

// The leading ≈ every estimated figure wears.
export function approx(estimated: boolean): string {
  return estimated ? '≈ ' : ''
}
