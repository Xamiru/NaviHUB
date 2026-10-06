import type { QuizCastItem } from './types'
import { pickDistractors } from './quizDistractors'
import { seededRng } from './quizCore'
import { shuffle } from './shuffle'

export interface CastQuizQuestionSeed {
  key: string
  actor: QuizCastItem
  options: QuizCastItem[]
  validKeys: string[]
}

// A seed needs three pool titles outside every title its actor appears in.
// Counted against the pool's distinct titles once; re-scanning the pool per
// item was quadratic and froze the page for seconds on a large library.
function canBuildCastQuestion(item: QuizCastItem, poolMedia: ReadonlySet<number>): boolean {
  let forbidden = 0
  for (const id of new Set(item.validMediaIds)) if (poolMedia.has(id)) forbidden++
  return poolMedia.size - forbidden >= 3
}

// Greedy two-axis deal: at each slot prefer an actor/title pair whose actor and
// title have both appeared least often. The candidate list is seeded-shuffled
// first, so ties remain deterministic without privileging database row order.
export function balancedCastDeal(
  pool: readonly QuizCastItem[],
  length: number,
  rng: () => number
): QuizCastItem[] {
  const poolMedia = new Set(pool.map((item) => item.mediaId))
  const remaining = shuffle(pool.filter((item) => canBuildCastQuestion(item, poolMedia)), rng)
  const people = new Map<number, number>()
  const media = new Map<number, number>()
  const out: QuizCastItem[] = []

  while (out.length < length && remaining.length > 0) {
    let bestIndex = 0
    let bestScore: [number, number] | null = null
    for (let i = 0; i < remaining.length; i++) {
      const item = remaining[i]
      const personCount = people.get(item.personId) ?? 0
      const mediaCount = media.get(item.mediaId) ?? 0
      const score: [number, number] = [Math.max(personCount, mediaCount), personCount + mediaCount]
      if (
        bestScore == null ||
        score[0] < bestScore[0] ||
        (score[0] === bestScore[0] && score[1] < bestScore[1])
      ) {
        bestIndex = i
        bestScore = score
      }
    }
    const [picked] = remaining.splice(bestIndex, 1)
    out.push(picked)
    people.set(picked.personId, (people.get(picked.personId) ?? 0) + 1)
    media.set(picked.mediaId, (media.get(picked.mediaId) ?? 0) + 1)
  }
  return out
}

export function buildCastQuizQuestions(
  pool: readonly QuizCastItem[],
  length: number,
  seed: number
): CastQuizQuestionSeed[] {
  const rng = seededRng(seed)
  return balancedCastDeal(pool, length, rng).map((actor, index) => {
    const distractors = pickDistractors(
      shuffle(pool, rng),
      actor,
      3,
      actor.validMediaIds,
      rng
    )
    return {
      key: `cast-${actor.personId}-${actor.mediaId}-${index}`,
      actor,
      options: shuffle([actor, ...distractors], rng),
      validKeys: actor.validMediaIds.map((id) => `media-${id}`)
    }
  })
}
