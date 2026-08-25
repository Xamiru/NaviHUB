const DAILY_TARGET_KEY = 'japanese.dailyNewTarget'
export const DEFAULT_JP_DAILY_TARGET = 10

export function loadJpDailyTarget(): number {
  try {
    const raw = localStorage.getItem(DAILY_TARGET_KEY)
    if (raw == null) return DEFAULT_JP_DAILY_TARGET
    const saved = Number(raw)
    return [0, 5, 10, 20].includes(saved) ? saved : DEFAULT_JP_DAILY_TARGET
  } catch {
    return DEFAULT_JP_DAILY_TARGET
  }
}

export function saveJpDailyTarget(target: number): void {
  try {
    localStorage.setItem(DAILY_TARGET_KEY, String(target))
  } catch {
    // A full or disabled localStorage must never block a review session.
  }
}
