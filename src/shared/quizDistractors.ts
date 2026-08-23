// Distractor selection for library MCQs (song quiz, character/synopsis quizzes).
// Pure: candidates carry only the affinity fields (mediaId, year, genres), so
// tests need no DB and callers feed any pool shape that satisfies them.
//
// A wrong answer is only fun when it is PLAUSIBLE — an OP from a show two
// decades away and three genres apart is a free question. Candidates are
// scored against the answer (shared decade, shared genres), grouped into
// tiers, and consumed best-first with each tier shuffled so rounds still vary.

import { shuffle } from './shuffle'

export interface DistractorCandidate {
  mediaId: number
  year: number | null
  genres: string[]
}

export interface VoiceRoleCandidate {
  personId: number
  characterId: number
}

// A voice actor may play several characters in the filtered pool. In the
// person -> character direction every one of those roles is a correct answer,
// so none may be offered as a distractor for another.
export function characterIdsForPerson<T extends VoiceRoleCandidate>(
  pool: T[],
  personId: number
): number[] {
  return [...new Set(pool.filter((v) => v.personId === personId).map((v) => v.characterId))]
}

const DECADE_BONUS = 2
const GENRE_BONUS_CAP = 3

export function distractorScore(answer: DistractorCandidate, candidate: DistractorCandidate): number {
  let score = 0
  if (
    answer.year != null &&
    candidate.year != null &&
    Math.floor(answer.year / 10) === Math.floor(candidate.year / 10)
  ) {
    score += DECADE_BONUS
  }
  const genres = new Set(answer.genres.map((g) => g.toLowerCase()))
  let shared = 0
  for (const g of candidate.genres) if (genres.has(g.toLowerCase())) shared++
  return score + Math.min(shared, GENRE_BONUS_CAP)
}

// Picks up to `count` distractors for `answer`: distinct-media pool entries
// other than the answer itself, strongest affinity first (ties shuffled).
// Returns fewer than `count` only when the pool has nothing else to offer.
export function pickDistractors<T extends DistractorCandidate>(
  pool: T[],
  answer: DistractorCandidate,
  count: number
): T[] {
  const seen = new Set<number>([answer.mediaId])
  const tiers = new Map<number, T[]>()
  for (const c of pool) {
    if (seen.has(c.mediaId)) continue
    seen.add(c.mediaId)
    const s = distractorScore(answer, c)
    const tier = tiers.get(s)
    if (tier) tier.push(c)
    else tiers.set(s, [c])
  }
  const out: T[] = []
  for (const s of [...tiers.keys()].sort((a, b) => b - a)) {
    out.push(...shuffle(tiers.get(s)!))
    if (out.length >= count) break
  }
  return out.slice(0, count)
}
