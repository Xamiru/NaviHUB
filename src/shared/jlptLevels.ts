// The JLPT ladder the Japanese section climbs.
//
// Courses carry a free-text level LABEL ("N5", "N5+", "N4–N3", "N3–N2"), which
// is what the seeds have always written and what the course pages display. This
// module turns those labels into a canonical tier so progress can be summed per
// level — no schema change, and it works on every course already seeded.
//
// Nothing here gates anything. The user's decision (2026-08-16) was levels as
// PROGRESS, not as a lock: every card stays available whatever your level, and
// this section is their only Japanese source, so it must never refuse to teach.

export const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const
export type JlptLevel = (typeof JLPT_LEVELS)[number]

// A card counts toward its level once it has left the learning steps and earned
// a real interval — the closest thing this SRS has to WaniKani's "Guru", which
// is where the 90% rule comes from. Anki calls 21 days "mature"; a week is the
// point where a card has survived several correct answers, which is what the
// level bar is trying to say.
export const PASSED_INTERVAL_DAYS = 7

// Share of a level's cards that must be passed for the level itself to count as
// passed. Deliberately not 100%: a level with one stubborn card would otherwise
// stall forever, which is the failure the user picked this number to avoid.
export const LEVEL_PASS_RATIO = 0.9

// "N4–N3" → N4; "N5+" → N5; "Mixed" → null. The FIRST tier mentioned is the
// level the course is pitched at, and the range's upper end is stretch material.
// Higher-numbered N is easier, so "first mentioned" is also "lowest".
export function parseJlptLevel(label: string | null | undefined): JlptLevel | null {
  if (!label) return null
  const m = /N([1-5])/i.exec(label)
  if (!m) return null
  return `N${m[1]}` as JlptLevel
}

export interface JlptLevelProgress {
  level: JlptLevel
  cards: number
  passed: number // cards at or past PASSED_INTERVAL_DAYS
  inProgress: number // seen at least once, not yet passed
  untouched: number // never reviewed
  pct: number // 0-100, share of the level's cards passed
  complete: boolean // pct >= 90 — the level counts as cleared
}

export function levelComplete(passed: number, cards: number): boolean {
  return cards > 0 && passed / cards >= LEVEL_PASS_RATIO
}

// The level the user is on: the easiest one not yet cleared. Levels with no
// cards at all are skipped — an empty level is not an achievement, and stopping
// on one would peg the display at N5 forever on a library that starts at N3.
// Everything cleared → the hardest level with cards (you are living there now).
export function currentLevel(levels: JlptLevelProgress[]): JlptLevel | null {
  const withCards = levels.filter((l) => l.cards > 0)
  if (withCards.length === 0) return null
  return (withCards.find((l) => !l.complete) ?? withCards[withCards.length - 1]).level
}

// Cards passed across every level, for the "you are here" line.
export function ladderTotals(levels: JlptLevelProgress[]): { passed: number; cards: number } {
  return levels.reduce(
    (acc, l) => ({ passed: acc.passed + l.passed, cards: acc.cards + l.cards }),
    { passed: 0, cards: 0 }
  )
}
