import type { QuizVaItem } from './types'
import { drawUntil, quizSeed, seededRng } from './quizCore'
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

function photoMap(item: QuizVaItem): Map<number, string | null> {
  return new Map(item.personIds.map((id, index) => [id, item.personPhotos?.[index] ?? null]))
}

/** A show's top ten characters in AniList's order (main first, then by popularity). */
export const VA_WELL_KNOWN_RANK = 10

/**
 * Only well-known characters are shown, answered or offered (2026-10-14):
 * AniList's "supporting" covers every named side character and background
 * extras. Rows imported before cast ranks fall back to main characters.
 */
export function isWellKnownVaRole(item: Pick<QuizVaItem, 'castRank' | 'importance'>): boolean {
  return item.castRank != null ? item.castRank < VA_WELL_KNOWN_RANK : item.importance === 0
}

function normalizePool(pool: readonly QuizVaItem[]): QuizVaItem[] {
  const byAppearance = new Map<string, QuizVaItem>()
  for (const item of pool) {
    if (!item.characterImagePath || item.personIds.length === 0) continue
    if (!isWellKnownVaRole(item)) continue
    const key = vaAppearanceKey(item)
    const found = byAppearance.get(key)
    if (!found) {
      const voices = voiceMap(item)
      const photos = photoMap(item)
      const ids = [...voices.keys()].sort((a, b) => a - b)
      byAppearance.set(key, {
        ...item,
        gender: normalizedGender(item.gender),
        personIds: ids,
        personNames: ids.map((id) => voices.get(id) ?? 'Unknown'),
        personPhotos: ids.map((id) => photos.get(id) ?? null)
      })
      continue
    }
    const voices = new Map([...voiceMap(found), ...voiceMap(item)])
    const photos = new Map([...photoMap(found), ...photoMap(item)])
    const ids = [...voices.keys()].sort((a, b) => a - b)
    found.personIds = ids
    found.personNames = ids.map((id) => voices.get(id) ?? 'Unknown')
    found.personPhotos = ids.map((id) => photos.get(id) ?? null)
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

// ---- Name the voice actor (2026-10-14) ----
// A well-known character is shown and the player picks their Japanese voice
// actor from four photos. Built to teach seiyuu: answers favour voice actors
// with two or more well-known roles in the library, and the reveal lists the
// voice actor's other characters.

export interface VaNamePerson {
  personId: number
  name: string
  photoPath: string
}

export interface VaNameQuestionSeed {
  key: string
  source: QuizVaItem
  answer: VaNamePerson
  // The answer's other well-known characters in the library, for the reveal.
  otherRoles: Array<{ characterName: string; mediaTitle: string }>
  options: VaNamePerson[]
  validKeys: string[]
}

export function vaPersonKey(personId: number): string {
  return `person-${personId}`
}

interface PersonProfile extends VaNamePerson {
  roles: QuizVaItem[]
  gender: string | null
}

function personProfiles(pool: readonly QuizVaItem[]): Map<number, PersonProfile> {
  const profiles = new Map<number, PersonProfile & { genders: Map<string, number> }>()
  for (const item of pool) {
    item.personIds.forEach((personId, index) => {
      const photoPath = item.personPhotos?.[index] ?? null
      let profile = profiles.get(personId)
      if (!profile) {
        if (!photoPath) return
        profile = {
          personId,
          name: item.personNames[index] ?? 'Unknown',
          photoPath,
          roles: [],
          gender: null,
          genders: new Map()
        }
        profiles.set(personId, profile)
      }
      profile.roles.push(item)
      if (item.gender) profile.genders.set(item.gender, (profile.genders.get(item.gender) ?? 0) + 1)
    })
  }
  // A voice actor's voice gender is the gender most of their characters share.
  for (const profile of profiles.values()) {
    profile.gender = [...profile.genders.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
  }
  return profiles
}

export function buildVaNameQuestions(
  rawPool: readonly QuizVaItem[],
  count: number,
  seed: string | number
): VaNameQuestionSeed[] {
  const rng = seededRng(quizSeed(`${seed}:name`))
  const pool = normalizePool(rawPool)
  const profiles = personProfiles(pool)
  const titles = (person: PersonProfile) => new Set(person.roles.map(titleOf)).size
  // Prefer voice actors heard in two or more of the library's shows; fall back
  // to anyone with a photo when the library is small.
  const familiar = [...profiles.values()].filter((person) => titles(person) >= 2)
  const people = familiar.length >= count + 3 ? familiar : [...profiles.values()]
  const peopleIds = new Set(people.map((person) => person.personId))
  // Reusable draw orders (drawUntil reorders them in place): the whole set and
  // each voice gender, so a question costs a few draws, not a pool scan.
  const everyone = [...people]
  const byGender = new Map<string, PersonProfile[]>()
  for (const person of people) {
    if (person.gender == null) continue
    const bucket = byGender.get(person.gender)
    if (bucket) bucket.push(person)
    else byGender.set(person.gender, [person])
  }

  // One question per voice actor first (round-robin by person), each asking
  // about one of their well-known characters.
  const candidates = shuffle(pool, rng).flatMap((source) => {
    const answers = source.personIds
      .map((id) => profiles.get(id))
      .filter((person): person is PersonProfile => person != null && peopleIds.has(person.personId))
    if (answers.length === 0) return []
    const answer = answers.sort((a, b) => titles(b) - titles(a))[0]
    return [{ source, answer }]
  })
  const out: VaNameQuestionSeed[] = []
  const usedPeople = new Set<number>()
  const usedTitles = new Set<string>()
  for (const pass of [0, 1]) {
    for (const { source, answer } of candidates) {
      if (out.length >= count) break
      if (pass === 0 && (usedPeople.has(answer.personId) || usedTitles.has(titleOf(source)))) continue
      if (out.some((question) => question.source === source)) continue
      const voices = new Set(source.personIds)
      const gender = normalizedGender(source.gender)
      const eligible = (person: PersonProfile) => !voices.has(person.personId) && person.personId !== answer.personId
      const sameGender = drawUntil(gender == null ? everyone : (byGender.get(gender) ?? []), rng, eligible, 3)
      const picked = new Set(sameGender)
      const wrong = [
        ...sameGender,
        ...drawUntil(everyone, rng, (person) => eligible(person) && !picked.has(person), 3 - sameGender.length)
      ]
      if (wrong.length < 3) continue
      usedPeople.add(answer.personId)
      usedTitles.add(titleOf(source))
      const strip = ({ personId, name, photoPath }: PersonProfile): VaNamePerson => ({ personId, name, photoPath })
      out.push({
        key: `va-name-${vaAppearanceKey(source)}-${answer.personId}-${out.length}`,
        source,
        answer: strip(answer),
        otherRoles: answer.roles
          .filter((role) => role.characterId !== source.characterId && titleOf(role) !== titleOf(source))
          .slice(0, 4)
          .map((role) => ({ characterName: role.characterName, mediaTitle: role.mediaTitle })),
        options: shuffle([answer, ...wrong].map(strip), rng),
        validKeys: source.personIds.filter((id) => profiles.has(id)).map(vaPersonKey)
      })
    }
  }
  return out
}
