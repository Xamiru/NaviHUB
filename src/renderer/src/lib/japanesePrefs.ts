import { TUTOR_BUDGETS, type TutorBudget } from '@shared/japanese/tutor'

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

// The session length picked on Today. Remembered per machine so the next day
// opens on the same choice; a convenience, never study data.
const SESSION_BUDGET_KEY = 'japanese.sessionBudget'
export const DEFAULT_JP_SESSION_BUDGET: TutorBudget = 20

export function loadJpSessionBudget(): TutorBudget {
  try {
    const saved = Number(localStorage.getItem(SESSION_BUDGET_KEY))
    return (TUTOR_BUDGETS as number[]).includes(saved) ? (saved as TutorBudget) : DEFAULT_JP_SESSION_BUDGET
  } catch {
    return DEFAULT_JP_SESSION_BUDGET
  }
}

export function saveJpSessionBudget(budget: TutorBudget): void {
  try {
    localStorage.setItem(SESSION_BUDGET_KEY, String(budget))
  } catch {
    // Storage is optional here.
  }
}

// "I can read kana" lives in the settings table so the plan, the Today page
// and the path all agree on it.
export const KANA_KNOWN_SETTING = 'japanese.kanaKnown'

// Furigana over example sentences and graded reading, shared by the lesson
// page and the reading page. A per-machine display choice, like the two above.
const FURIGANA_KEY = 'japanese.furigana'

export function loadJpFurigana(): boolean {
  try {
    return localStorage.getItem(FURIGANA_KEY) !== '0'
  } catch {
    return true
  }
}

export function saveJpFurigana(show: boolean): void {
  try {
    localStorage.setItem(FURIGANA_KEY, show ? '1' : '0')
  } catch {
    // Storage is optional here.
  }
}
