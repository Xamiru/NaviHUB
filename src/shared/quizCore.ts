import type { QuizKind, QuizPlayMode, QuizScorePolicy, QuizSession } from './types'
import { shuffle } from './shuffle'

export function quizSeed(value: string | number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value >>> 0
  let hash = 2166136261
  for (const ch of String(value)) {
    hash ^= ch.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function seededRng(seed: string | number): () => number {
  let state = quizSeed(seed)
  return () => {
    state += 0x6d2b79f5
    let n = state
    n = Math.imul(n ^ (n >>> 15), n | 1)
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61)
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296
  }
}

export function balancedDeal<T>(
  values: readonly T[],
  count: number,
  identity: (value: T) => string | number,
  rng: () => number = Math.random
): T[] {
  const buckets = new Map<string | number, T[]>()
  for (const value of shuffle(values, rng)) {
    const key = identity(value)
    const bucket = buckets.get(key)
    if (bucket) bucket.push(value)
    else buckets.set(key, [value])
  }
  const ordered = shuffle([...buckets.values()], rng)
  const out: T[] = []
  while (out.length < count) {
    let added = false
    for (const bucket of ordered) {
      const value = bucket.pop()
      if (value == null) continue
      out.push(value)
      added = true
      if (out.length >= count) break
    }
    if (!added) break
  }
  return out
}

export function shuffledDeckAvoiding<T>(
  values: readonly T[],
  previous: T | null,
  same: (a: T, b: T) => boolean,
  rng: () => number = Math.random
): T[] {
  const deck = shuffle(values, rng)
  if (previous != null && deck.length > 1 && same(deck[deck.length - 1], previous)) {
    const swap = deck.findIndex((value) => !same(value, previous))
    ;[deck[swap], deck[deck.length - 1]] = [deck[deck.length - 1], deck[swap]]
  }
  return deck
}

export function answerIsCorrect(validKeys: readonly string[], picked: string | null): boolean {
  return picked != null && validKeys.includes(picked)
}

export const QUIZ_SCORE_POLICIES: Readonly<Partial<Record<QuizKind, QuizScorePolicy>>> = {
  songArcade: 'points',
  kanaRace: 'points',
  readingRace: 'points',
  conjRace: 'points',
  shiritori: 'points',
  imageReveal: 'points',
  higherLower: 'points',
  tournament: 'tournament',
  songRelay: 'party'
}

export function quizScorePolicy(kind: QuizKind): QuizScorePolicy {
  return QUIZ_SCORE_POLICIES[kind] ?? 'accuracy'
}

export function quizSessionPlayMode(session: Pick<QuizSession, 'settings'>): QuizPlayMode {
  return session.settings?.playMode === 'party' ? 'party' : 'solo'
}

export function quizSessionCorrect(session: Pick<QuizSession, 'score' | 'settings'>): number {
  const value = session.settings?.correct
  return typeof value === 'number' && Number.isFinite(value) ? value : session.score
}

export function compareQuizResults(
  a: Pick<QuizSession, 'score' | 'total' | 'settings' | 'id'>,
  b: Pick<QuizSession, 'score' | 'total' | 'settings' | 'id'>,
  policy: QuizScorePolicy
): number {
  if (policy === 'party' || policy === 'tournament') return a.id - b.id
  const aCorrect = quizSessionCorrect(a)
  const bCorrect = quizSessionCorrect(b)
  const aAccuracy = a.total > 0 ? aCorrect / a.total : 0
  const bAccuracy = b.total > 0 ? bCorrect / b.total : 0
  if (policy === 'points' && a.score !== b.score) return a.score - b.score
  if (aAccuracy !== bAccuracy) return aAccuracy - bAccuracy
  if (policy === 'accuracy' && a.total !== b.total) return a.total - b.total
  return a.id - b.id
}

export function isNewQuizBest(
  candidate: Pick<QuizSession, 'score' | 'total' | 'settings'>,
  previous: QuizSession | null,
  policy: QuizScorePolicy
): boolean {
  if (candidate.total < 5 || policy === 'party' || policy === 'tournament') return false
  if (!previous) return true
  return compareQuizResults({ ...candidate, id: previous.id + 1 }, previous, policy) > 0
}
