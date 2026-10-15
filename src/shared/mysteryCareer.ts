import type {
  QuizCareerCredit,
  QuizCareerPerson,
  QuizMysteryCareerQuestion,
  QuizScreenMediaMode,
  QuizScreenTitle
} from './types'
import { seededRng } from './quizCore'
import { screenMediaMatches } from './libraryGrid'
import { shuffle } from './shuffle'

export interface MysteryCareerCandidate extends QuizScreenTitle {
  // The 0-100 community score, when known: higher-rated titles count as better known.
  rating?: number | null
  people: Array<{
    id: number
    name: string
    role: string
    characterName?: string | null
    billingOrder?: number | null
    photoPath?: string | null
  }>
}

export interface IndexedCredit extends QuizCareerCredit {
  prominence: number
}

interface IndexedPerson extends QuizCareerPerson {
  credits: Map<string, IndexedCredit>
}

/**
 * How recognisable one credit is: a lead role (billing 0) scores 10, the tenth
 * billed 1, directing 8, plus up to 2 for a highly rated title. Clues reveal
 * from least to most prominent, so the first clue is never the role that
 * solves the game on sight.
 */
export function careerCreditProminence(
  role: 'actor' | 'director',
  billingOrder: number | null | undefined,
  rating: number | null | undefined
): number {
  const base = role === 'director' ? 8 : 10 - Math.min(9, Math.max(0, billingOrder ?? 9))
  return base + (rating != null ? Math.max(0, Math.min(100, rating)) / 50 : 1)
}

export const MYSTERY_CAREER_CLUES = 6

function normalizeSearch(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function searchCareerPeople(
  people: readonly QuizCareerPerson[],
  query: string,
  excludedKeys: readonly string[] = [],
  limit = 8
): QuizCareerPerson[] {
  const needle = normalizeSearch(query)
  if (!needle) return []
  const excluded = new Set(excludedKeys)
  return people
    .filter((person) => !excluded.has(person.key))
    .map((person) => {
      const label = normalizeSearch(person.label)
      const score = label === needle ? 0 : label.startsWith(needle) ? 1 : label.includes(needle) ? 2 : 3
      return { person, score }
    })
    .filter((entry) => entry.score < 3)
    .sort((left, right) => left.score - right.score || left.person.label.localeCompare(right.person.label))
    .slice(0, limit)
    .map((entry) => entry.person)
}

function careerIndex(
  candidates: readonly MysteryCareerCandidate[],
  mediaMode: QuizScreenMediaMode
): IndexedPerson[] {
  const people = new Map<string, IndexedPerson>()
  for (const title of candidates) {
    if (!title.imagePath.trim() || !screenMediaMatches(mediaMode, title.mediaType)) continue
    for (const credit of title.people) {
      const topActor =
        credit.role === 'actor' &&
        credit.billingOrder != null &&
        credit.billingOrder >= 0 &&
        credit.billingOrder < 10
      if (!topActor && credit.role !== 'director') continue
      const key = String(credit.id)
      const found = people.get(key) ?? {
        key,
        label: credit.name,
        roles: [],
        photoPath: credit.photoPath ?? null,
        credits: new Map<string, IndexedCredit>()
      }
      found.photoPath ??= credit.photoPath ?? null
      const role = credit.role === 'director' ? 'director' : 'actor'
      if (!found.roles.includes(role)) found.roles.push(role)
      const { rating: _rating, people: _people, ...screenTitle } = title
      const existing = found.credits.get(title.key) ?? { title: screenTitle, roles: [], prominence: 0 }
      const roleLabel =
        credit.role === 'director'
          ? 'Director'
          : credit.characterName?.trim() || 'Main cast'
      if (!existing.roles.includes(roleLabel)) existing.roles.push(roleLabel)
      existing.prominence = Math.max(
        existing.prominence,
        careerCreditProminence(role, credit.billingOrder, title.rating)
      )
      found.credits.set(title.key, existing)
      people.set(key, found)
    }
  }
  return [...people.values()]
}

export function mysteryCareerTargetCount(
  candidates: readonly MysteryCareerCandidate[],
  mediaMode: QuizScreenMediaMode
): number {
  const people = careerIndex(candidates, mediaMode)
  if (people.filter((person) => person.credits.size >= 2).length < 8) return 0
  return people.filter((person) => person.credits.size >= MYSTERY_CAREER_CLUES).length
}

export function buildMysteryCareerQuestion(
  candidates: readonly MysteryCareerCandidate[],
  seed: string | number,
  mediaMode: QuizScreenMediaMode = 'both'
): QuizMysteryCareerQuestion | null {
  const people = careerIndex(candidates, mediaMode)
  const guessPool = people.filter((person) => person.credits.size >= 2)
  const targets = people.filter((person) => person.credits.size >= MYSTERY_CAREER_CLUES)
  if (guessPool.length < 8 || targets.length === 0) return null
  const rng = seededRng(seed)
  const target = targets[Math.floor(rng() * targets.length)]
  const credits = careerClues([...target.credits.values()], rng)
  return {
    id: `mystery-career-${seed}`,
    kind: 'mysteryCareer',
    prompt: 'Identify the actor or director from the progressively revealed career.',
    choices: [],
    validKeys: [target.key],
    targetKey: target.key,
    people: guessPool.map(({ credits: _credits, ...person }) => person),
    credits,
    maxGuesses: MYSTERY_CAREER_CLUES
  }
}

/**
 * Six clues: the two most prominent credits (so the final clues are the ones a
 * fan knows) plus four others at random, revealed least prominent first.
 */
export function careerClues(credits: readonly IndexedCredit[], rng: () => number): QuizCareerCredit[] {
  const byProminence = shuffle([...credits], rng).sort((a, b) => b.prominence - a.prominence)
  const top = byProminence.slice(0, 2)
  const rest = shuffle(byProminence.slice(2), rng).slice(0, MYSTERY_CAREER_CLUES - top.length)
  return [...rest, ...top]
    .sort((a, b) => a.prominence - b.prominence)
    .map(({ prominence: _prominence, ...credit }) => credit)
}

export function mysteryCareerScore(solved: boolean, guesses: number, maxGuesses: number): number {
  if (!solved) return 0
  return Math.max(100, (maxGuesses - Math.max(1, guesses) + 1) * 100)
}
