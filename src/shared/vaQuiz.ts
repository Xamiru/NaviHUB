import type { QuizVaItem } from './types'
import { quizSeed, seededRng } from './quizCore'
import { shuffle } from './shuffle'

export interface VaQuizQuestionSeed {
  key: string
  source: QuizVaItem
  answer: QuizVaItem
  sharedPersonIds: number[]
  sharedPersonNames: string[]
  validKeys: string[]
  options: QuizVaItem[]
}

export function vaAppearanceKey(item: Pick<QuizVaItem, 'mediaId' | 'characterId'>): string {
  return `character-${item.mediaId}-${item.characterId}`
}

function normalizedTitle(title: string): string {
  return title.trim().toLocaleLowerCase()
}

// Distractor scans compare every candidate's title against the pair's, so
// normalise each pool item once instead of on every comparison.
const itemTitles = new WeakMap<QuizVaItem, string>()

function titleOf(item: QuizVaItem): string {
  let title = itemTitles.get(item)
  if (title === undefined) {
    title = normalizedTitle(item.mediaTitle)
    itemTitles.set(item, title)
  }
  return title
}

function normalizedGender(gender: string | null): string | null {
  const value = gender?.trim().toLocaleLowerCase().replace(/[^a-z]+/g, '') ?? ''
  return value || null
}

function voiceMap(item: QuizVaItem): Map<number, string> {
  return new Map(item.personIds.map((id, index) => [id, item.personNames[index] ?? 'Unknown']))
}

function normalizePool(pool: readonly QuizVaItem[]): QuizVaItem[] {
  const byAppearance = new Map<string, QuizVaItem>()
  for (const item of pool) {
    if (!item.characterImagePath || item.personIds.length === 0) continue
    const key = vaAppearanceKey(item)
    const found = byAppearance.get(key)
    if (!found) {
      const voices = voiceMap(item)
      const ids = [...voices.keys()].sort((a, b) => a - b)
      byAppearance.set(key, {
        ...item,
        gender: normalizedGender(item.gender),
        personIds: ids,
        personNames: ids.map((id) => voices.get(id) ?? 'Unknown')
      })
      continue
    }
    const voices = new Map([...voiceMap(found), ...voiceMap(item)])
    const ids = [...voices.keys()].sort((a, b) => a - b)
    found.personIds = ids
    found.personNames = ids.map((id) => voices.get(id) ?? 'Unknown')
    if (found.importance == null || (item.importance != null && item.importance < found.importance)) {
      found.importance = item.importance
    }
  }
  return [...byAppearance.values()]
}

function sharedVoiceIds(a: QuizVaItem, b: QuizVaItem): number[] {
  const bIds = new Set(b.personIds)
  return a.personIds.filter((id) => bIds.has(id))
}

function isDifferentTitle(a: QuizVaItem, b: QuizVaItem): boolean {
  return a.mediaId !== b.mediaId && titleOf(a) !== titleOf(b)
}

function distractorScore(answer: QuizVaItem, candidate: QuizVaItem): number {
  let score = 0
  if (answer.importance != null && candidate.importance != null) {
    const gap = Math.abs(answer.importance - candidate.importance)
    score += gap === 0 ? 40 : gap === 1 ? 20 : 0
  }
  if (answer.year != null && candidate.year != null) {
    const gap = Math.abs(answer.year - candidate.year)
    score += gap <= 2 ? 30 : gap <= 5 ? 20 : gap <= 10 ? 10 : 0
  }
  return score
}

function isEligibleDistractor(
  candidate: QuizVaItem,
  source: QuizVaItem,
  answer: QuizVaItem,
  sourceVoices: ReadonlySet<number>,
  answerGender: string | null
): boolean {
  if (!isDifferentTitle(source, candidate)) return false
  if (candidate.characterId === source.characterId || candidate.characterId === answer.characterId)
    return false
  if (candidate.mediaId === answer.mediaId) return false
  if (titleOf(candidate) === titleOf(answer)) return false
  if (candidate.personIds.some((id) => sourceVoices.has(id))) return false
  return answerGender == null || candidate.gender === answerGender
}

function hasEnoughDistractors(
  pool: readonly QuizVaItem[],
  source: QuizVaItem,
  answer: QuizVaItem
): boolean {
  const sourceVoices = new Set(source.personIds)
  const answerGender = normalizedGender(answer.gender)
  const seenCharacters = new Set<number>([source.characterId, answer.characterId])
  const seenTitles = new Set<string>([titleOf(source), titleOf(answer)])
  let found = 0
  for (const candidate of pool) {
    // A seen title or character never counts, so the cheap check runs first;
    // the pool is grouped by title, which makes most candidates repeats.
    const title = titleOf(candidate)
    if (seenCharacters.has(candidate.characterId) || seenTitles.has(title)) continue
    if (!isEligibleDistractor(candidate, source, answer, sourceVoices, answerGender)) continue
    seenCharacters.add(candidate.characterId)
    seenTitles.add(title)
    found++
    if (found === 3) return true
  }
  return false
}

function pickDistractors(
  pool: readonly QuizVaItem[],
  source: QuizVaItem,
  answer: QuizVaItem,
  rng: () => number
): QuizVaItem[] {
  const sourceVoices = new Set(source.personIds)
  const answerGender = normalizedGender(answer.gender)
  // Best affinity first, ties in seeded random order. Scores are a few
  // discrete steps, so one pass buckets the eligible pool and each bucket is
  // drawn from lazily instead of shuffling and sorting the pool per question.
  const byScore = new Map<number, QuizVaItem[]>()
  for (const candidate of pool) {
    if (!isEligibleDistractor(candidate, source, answer, sourceVoices, answerGender)) continue
    const score = distractorScore(answer, candidate)
    const bucket = byScore.get(score)
    if (bucket) bucket.push(candidate)
    else byScore.set(score, [candidate])
  }

  const seenCharacters = new Set<number>([source.characterId, answer.characterId])
  const seenTitles = new Set<string>([titleOf(source), titleOf(answer)])
  const out: QuizVaItem[] = []
  for (const score of [...byScore.keys()].sort((a, b) => b - a)) {
    const bucket = byScore.get(score)!
    for (let i = bucket.length - 1; i >= 0 && out.length < 3; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[bucket[i], bucket[j]] = [bucket[j], bucket[i]]
      const candidate = bucket[i]
      const title = titleOf(candidate)
      if (seenCharacters.has(candidate.characterId) || seenTitles.has(title)) continue
      seenCharacters.add(candidate.characterId)
      seenTitles.add(title)
      out.push(candidate)
    }
    if (out.length === 3) break
  }
  return out
}

interface Pair {
  source: QuizVaItem
  answer: QuizVaItem
  sharedIds: number[]
}

function rolesByPerson(pool: readonly QuizVaItem[]): Map<number, QuizVaItem[]> {
  const byPerson = new Map<number, QuizVaItem[]>()
  for (const item of pool) {
    for (const personId of item.personIds) {
      const roles = byPerson.get(personId)
      if (roles) roles.push(item)
      else byPerson.set(personId, [item])
    }
  }
  return byPerson
}

function isViableAnswer(pool: readonly QuizVaItem[], source: QuizVaItem, answer: QuizVaItem): boolean {
  return (
    source.characterId !== answer.characterId &&
    isDifferentTitle(source, answer) &&
    hasEnoughDistractors(pool, source, answer)
  )
}

function sourcePairs(
  pool: readonly QuizVaItem[],
  byPerson: ReadonlyMap<number, QuizVaItem[]>,
  source: QuizVaItem,
  rng: () => number,
  perSource = 8
): Pair[] {
  const targets = new Map<string, QuizVaItem>()
  for (const personId of source.personIds) {
    for (const role of byPerson.get(personId) ?? []) targets.set(vaAppearanceKey(role), role)
  }
  const out: Pair[] = []
  for (const answer of shuffle([...targets.values()], rng)) {
    if (!isViableAnswer(pool, source, answer)) continue
    out.push({ source, answer, sharedIds: sharedVoiceIds(source, answer) })
    // A handful of alternatives is enough for the balancing pass and keeps
    // prolific VAs from turning the builder into a source×role×pool scan.
    if (out.length === perSource) break
  }
  return out
}

export function countBuildableVaSources(rawPool: readonly QuizVaItem[]): number {
  const pool = normalizePool(rawPool)
  const byPerson = rolesByPerson(pool)
  // A source counts once it has any viable answer, so the scan stops at the
  // first one instead of collecting and shuffling every shared-VA role.
  return pool.filter((source) =>
    source.personIds.some((personId) =>
      (byPerson.get(personId) ?? []).some((answer) => isViableAnswer(pool, source, answer))
    )
  ).length
}

// Sources sampled per requested question. A round needs one source per
// question, so balancing over a seeded sample of this size keeps voice actors,
// titles and characters spread without pairing every role in the library.
const SOURCES_PER_QUESTION = 12

export function buildVaQuizQuestions(
  rawPool: readonly QuizVaItem[],
  count: number,
  seed: string | number
): VaQuizQuestionSeed[] {
  const rng = seededRng(quizSeed(seed))
  const pool = normalizePool(rawPool)
  const byPerson = rolesByPerson(pool)
  const sampled: Pair[] = []
  let sources = 0
  for (const source of shuffle(pool, rng)) {
    const found = sourcePairs(pool, byPerson, source, rng)
    if (found.length === 0) continue
    sampled.push(...found)
    if (++sources >= count * SOURCES_PER_QUESTION) break
  }
  const pairs = shuffle(sampled, rng)
  const usedSources = new Set<string>()
  const personUse = new Map<number, number>()
  const mediaUse = new Map<number, number>()
  const characterUse = new Map<number, number>()
  const out: VaQuizQuestionSeed[] = []

  while (out.length < count) {
    let best: Pair | null = null
    let bestScore = Number.POSITIVE_INFINITY
    for (const pair of pairs) {
      if (usedSources.has(vaAppearanceKey(pair.source))) continue
      const score =
        pair.sharedIds.reduce((sum, id) => sum + (personUse.get(id) ?? 0) * 100, 0) +
        (mediaUse.get(pair.source.mediaId) ?? 0) * 20 +
        (mediaUse.get(pair.answer.mediaId) ?? 0) * 20 +
        (characterUse.get(pair.source.characterId) ?? 0) * 10 +
        (characterUse.get(pair.answer.characterId) ?? 0) * 10
      if (score < bestScore) {
        best = pair
        bestScore = score
      }
    }
    if (!best) break

    usedSources.add(vaAppearanceKey(best.source))
    for (const id of best.sharedIds) personUse.set(id, (personUse.get(id) ?? 0) + 1)
    for (const id of [best.source.mediaId, best.answer.mediaId]) {
      mediaUse.set(id, (mediaUse.get(id) ?? 0) + 1)
    }
    for (const id of [best.source.characterId, best.answer.characterId]) {
      characterUse.set(id, (characterUse.get(id) ?? 0) + 1)
    }

    const sourceVoices = voiceMap(best.source)
    const distractors = pickDistractors(pool, best.source, best.answer, rng)
    out.push({
      key: `va-${vaAppearanceKey(best.source)}-${vaAppearanceKey(best.answer)}-${out.length}`,
      source: best.source,
      answer: best.answer,
      sharedPersonIds: best.sharedIds,
      sharedPersonNames: best.sharedIds.map((id) => sourceVoices.get(id) ?? 'Unknown'),
      validKeys: [vaAppearanceKey(best.answer)],
      options: shuffle([best.answer, ...distractors], rng)
    })
  }
  return out
}
