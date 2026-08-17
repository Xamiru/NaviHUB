import type { ProgAttempt } from '../types'

// Folds the append-only prog_attempt history into per-lesson best/latest — a
// pure helper so the course page, the lesson page and the home tiles all agree
// on what "best" means (highest RATIO; ties → the attempt with more questions,
// then the most recent).
//
// Ratio, not raw score: the history is append-only but lesson content is not
// frozen, so one lesson key accumulates attempts with different totals. Ranked
// by raw score, an old 11/12 outranks a later 10/10 — which also hides the
// perfect run from passedChecks(), so an aced lesson reads as never passed.

export interface LessonAttemptSummary {
  lessonKey: string
  best: ProgAttempt
  latest: ProgAttempt
  attempts: number
}

// > 0 when `a` beat `b`, 0 when they tie. Cross-multiplied so the comparison
// is exact integer arithmetic (1/3 vs 2/6 never disagree by a float epsilon).
// A total of 0 is a lesson with no questions — ratio 0, never the better run.
function compareRatio(a: ProgAttempt, b: ProgAttempt): number {
  if (a.total <= 0) return b.total <= 0 ? 0 : -1
  if (b.total <= 0) return 1
  return a.score * b.total - b.score * a.total
}

export function bestAttempts(rows: ProgAttempt[]): Map<string, LessonAttemptSummary> {
  const out = new Map<string, LessonAttemptSummary>()
  // rows arrive oldest → newest (the repo orders by at, id)
  for (const a of rows) {
    const cur = out.get(a.lessonKey)
    if (!cur) {
      out.set(a.lessonKey, { lessonKey: a.lessonKey, best: a, latest: a, attempts: 1 })
      continue
    }
    cur.attempts += 1
    cur.latest = a
    const better = compareRatio(a, cur.best)
    // Equal ratio → the longer check is the stronger result; equal again →
    // the later attempt, since rows arrive oldest-first.
    if (better > 0 || (better === 0 && a.total >= cur.best.total)) {
      cur.best = a
    }
  }
  return out
}

// A lesson "passed" its check when some attempt got every question right.
export function passedChecks(rows: ProgAttempt[]): number {
  let n = 0
  for (const s of bestAttempts(rows).values()) if (s.best.total > 0 && s.best.score === s.best.total) n++
  return n
}
