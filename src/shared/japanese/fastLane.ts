import { DEFAULT_RETENTION, intervalForStability, nextMemory } from '../srs'

// The fast lane for material a returning learner already knows: a lesson's
// "Test out" (the lesson check over every card) and the "I know this" control.
// A card marked known skips the learning steps but still comes back for a real
// check in two to four weeks, unlike the mining inbox's "Already known"
// (36,500 days), which never returns.

// The share of the test-out questions a learner must get right to mark the
// whole lesson known.
export const TEST_OUT_PASS_RATIO = 0.9

export function passesTestOut(correct: number, total: number): boolean {
  return total > 0 && correct / total >= TEST_OUT_PASS_RATIO
}

export const KNOWN_MIN_DAYS = 14
export const KNOWN_MAX_DAYS = 28

// A deterministic 14-28 day interval per card id, so a tested-out lesson's
// cards spread over two weeks instead of all coming due on one day.
export function knownIntervalDays(cardId: number): number {
  const spread = KNOWN_MAX_DAYS - KNOWN_MIN_DAYS + 1
  return KNOWN_MIN_DAYS + ((Math.imul(cardId, 2654435761) >>> 0) % spread)
}

// The FSRS memory a known card starts from: a stability whose interval at the
// default retention is the card's spread interval, and the difficulty a first
// answer of Easy would give.
export function knownCardMemory(
  cardId: number,
  retention: number = DEFAULT_RETENTION
): {
  intervalDays: number
  stability: number
  difficulty: number
} {
  const intervalDays = knownIntervalDays(cardId)
  // Smallest whole stability that schedules this interval at the learner's
  // desired retention, so the memory state and the due date agree (FSRS-5
  // makes the two equal at 90%; a stricter target needs a higher stability).
  let stability = 1
  while (stability < 3650 && intervalForStability(stability, retention) < intervalDays) stability++
  const { difficulty } = nextMemory({ stability: null, difficulty: null }, 'easy', 0)
  return { intervalDays, stability, difficulty }
}
