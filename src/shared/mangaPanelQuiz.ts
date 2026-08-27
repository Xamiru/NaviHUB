import type { QuizMangaPanelItem } from './types'
import { seededRng } from './quizCore'
import { pickDistractors } from './quizDistractors'
import { shuffle } from './shuffle'

export interface MangaPanelQuestionSeed {
  key: string
  answer: QuizMangaPanelItem
  options: QuizMangaPanelItem[]
  validKeys: string[]
}

export function buildMangaPanelQuestions(
  pool: readonly QuizMangaPanelItem[],
  seed: number
): MangaPanelQuestionSeed[] {
  const rng = seededRng(seed)
  return pool.flatMap((answer, index) => {
    const distractors = pickDistractors([...pool], answer, 3, [], rng)
    if (distractors.length < 3) return []
    return [{
      key: `panel-${answer.mediaId}-${index}`,
      answer,
      options: shuffle([answer, ...distractors], rng),
      validKeys: [`media-${answer.mediaId}`]
    }]
  })
}
