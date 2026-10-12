import type { ChecklistPeriodState, ChecklistTaskStatus } from '@shared/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Formatting only: main sends local 'YYYY-MM-DD' strings, so the parts are read
// back through UTC accessors. Nothing here derives what day it is.
function parts(date: string): { y: number; m: number; d: number; weekday: number } {
  const [y, m, d] = date.split('-').map(Number)
  return { y, m, d, weekday: new Date(Date.UTC(y, m - 1, d)).getUTCDay() }
}

export function fmtDay(date: string): string {
  const { m, d, weekday } = parts(date)
  return `${WEEKDAYS[weekday]} ${d} ${MONTHS[m - 1]}`
}

export function fmtWeekday(date: string): string {
  return WEEKDAYS[parts(date).weekday]
}

export function fmtDayOfMonth(date: string): number {
  return parts(date).d
}

export const STATE_LABEL: Record<ChecklistPeriodState, string> = {
  done: 'done',
  missed: 'missed',
  skipped: 'skipped',
  off: 'not scheduled',
  pending: 'open',
  future: 'upcoming'
}

// The small square every strip and dot uses. Skipped is an outline so it never
// reads as done, and missed uses the anomaly signal.
export const STATE_DOT: Record<ChecklistPeriodState, string> = {
  done: 'bg-accent',
  missed: 'bg-signal-anomaly/70',
  skipped: 'border border-ink-muted bg-transparent',
  off: 'bg-base-800',
  pending: 'border border-accent bg-accent/10',
  future: 'bg-base-800/40'
}

export function progressText(task: ChecklistTaskStatus): string {
  return `${task.progress} / ${task.target}${task.unit ? ` ${task.unit}` : ''}`
}

export function periodWord(task: Pick<ChecklistTaskStatus, 'cadence'>): 'day' | 'week' {
  return task.cadence === 'weekly' ? 'week' : 'day'
}

// What a log entry chip says.
export function entryLabel(
  task: ChecklistTaskStatus,
  entry: ChecklistTaskStatus['entries'][number]
): string {
  if (entry.title) return entry.title
  if (entry.amount > 1 || task.unit) return `+${entry.amount}${task.unit ? ` ${task.unit}` : ''}`
  return task.kind === 'detected' ? 'Counted by hand' : 'Done'
}

// Counters get an amount box; a plain once-a-period tick does not.
export function takesAmount(task: ChecklistTaskStatus): boolean {
  return task.unit != null || task.target >= 5
}

export function isCheckbox(task: ChecklistTaskStatus): boolean {
  return task.kind === 'manual' && task.target === 1
}
