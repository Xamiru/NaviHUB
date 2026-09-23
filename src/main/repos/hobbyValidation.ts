// Runtime guards for local personal-data mutations across the IPC boundary.
export function textValue(value: unknown, label: string, max = 10000, required = false): string {
  if (typeof value !== 'string' || value.length > max) throw new Error(`Invalid ${label}`)
  const clean = value.trim()
  if (required && !clean) throw new Error(`${label} is required`)
  return clean
}
export function choice<T extends string>(value: T, choices: readonly T[], label: string): T {
  if (!choices.includes(value)) throw new Error(`Invalid ${label}`)
  return value
}
export function dateValue(value: string | null, required = false): string | null {
  if (value == null && !required) return null
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString().slice(0, 10) !== value
  ) {
    throw new Error('Use a valid date (YYYY-MM-DD)')
  }
  return value
}
export function assertOrder(ids: number[], actual: number[]): void {
  if (
    !Array.isArray(ids) ||
    ids.length !== actual.length ||
    new Set(ids).size !== ids.length ||
    ids.some((id) => !actual.includes(id))
  )
    throw new Error('The order changed. Reload and try again.')
}
