import type { QuizSynopsisItem } from './types'
import { balancedDeal, seededRng } from './quizCore'
import { pickDistractors } from './quizDistractors'
import { synopsisExcerpt } from './quizText'
import { shuffle } from './shuffle'

export interface SynopsisQuizQuestionSeed {
  key: string
  answer: QuizSynopsisItem
  excerpt: string
  options: QuizSynopsisItem[]
  validKeys: string[]
}

const GENERIC_BASES = new Set(['season', 'part', 'chapter', 'volume', 'book', 'movie', 'film'])
const SEQUEL_PATTERNS = [
  /\b(?:season|series|part|cour|chapter|volume|book)\s*(?:2nd|3rd|[2-9]|1\d|20)\b/i,
  /\b(?:second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)\s+season\b/i,
  /\b(?:2nd|3rd|4th|5th|6th|7th|8th|9th|10th)\s+season\b/i,
  /(?:^|[\s:–—-])R[2-9]\s*$/i,
  /(?:^|[\s:–—-])(?:II|III|IV|V|VI|VII|VIII|IX|X)\s*$/i,
  /(?:^|[\s:–—-])(?:2|3|4|5|6|7|8|9|1\d|20)\s*$/
]

export function isLikelyFirstEntry(item: Pick<QuizSynopsisItem, 'title' | 'titleOriginal' | 'hasEarlierRelation'>): boolean {
  if (item.hasEarlierRelation) return false
  return ![item.title, item.titleOriginal].filter(Boolean).some((title) =>
    SEQUEL_PATTERNS.some((pattern) => pattern.test(title!))
  )
}

function cleanDerivedAlias(value: string): string | null {
  const clean = value.trim().replace(/[\s:–—-]+$/, '').trim()
  if (clean.length < 2 || GENERIC_BASES.has(clean.toLowerCase())) return null
  return clean
}

export function titleAliasVariants(values: readonly (string | null | undefined)[]): string[] {
  const aliases = new Set<string>()
  for (const raw of values) {
    const value = raw?.trim()
    if (!value) continue
    aliases.add(value)
    const beforeSubtitle = value.split(/\s*[:–—]\s+|\s+-\s+/, 1)[0]
    const base = value
      .replace(/\s+(?:season|series|part|cour|chapter|volume|book)\s*(?:2nd|3rd|[2-9]|1\d|20).*$/i, '')
      .replace(/\s+(?:II|III|IV|V|VI|VII|VIII|IX|X|R[2-9]|[2-9]|1\d|20)\s*$/i, '')
    for (const candidate of [beforeSubtitle, base]) {
      const clean = cleanDerivedAlias(candidate)
      if (clean) aliases.add(clean)
    }
  }
  return [...aliases].sort((a, b) => b.length - a.length)
}

export function countBuildableSynopsisSources(pool: readonly QuizSynopsisItem[]): number {
  const counts = new Map<string, number>()
  for (const item of pool) counts.set(item.mediaType, (counts.get(item.mediaType) ?? 0) + 1)
  return pool.filter((item) => (counts.get(item.mediaType) ?? 0) >= 4).length
}

export function buildSynopsisQuizQuestions(
  pool: readonly QuizSynopsisItem[],
  length: number,
  seed: number
): SynopsisQuizQuestionSeed[] {
  const rng = seededRng(seed)
  const groups = new Map<string, QuizSynopsisItem[]>()
  for (const item of pool) {
    const group = groups.get(item.mediaType)
    if (group) group.push(item)
    else groups.set(item.mediaType, [item])
  }
  const usable = pool.filter((item) => (groups.get(item.mediaType)?.length ?? 0) >= 4)
  const answers = balancedDeal(usable, length, (item) => item.mediaType, rng)
  return answers.map((answer, index) => {
    const sameType = groups.get(answer.mediaType) ?? []
    const distractors = pickDistractors([...sameType], answer, 3, [], rng)
    const aliases = titleAliasVariants([
      answer.title,
      answer.titleOriginal,
      ...answer.relationAliases
    ])
    return {
      key: `synopsis-${answer.mediaId}-${index}`,
      answer,
      excerpt: synopsisExcerpt(answer.synopsis, aliases, 360, answer.characterNames),
      options: shuffle([answer, ...distractors], rng),
      validKeys: [`media-${answer.mediaId}`]
    }
  })
}
