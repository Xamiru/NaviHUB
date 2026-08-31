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
  people: Array<{
    id: number
    name: string
    role: string
    characterName?: string | null
    billingOrder?: number | null
  }>
}

interface IndexedPerson extends QuizCareerPerson {
  credits: Map<string, QuizCareerCredit>
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
        credits: new Map<string, QuizCareerCredit>()
      }
      const role = credit.role === 'director' ? 'director' : 'actor'
      if (!found.roles.includes(role)) found.roles.push(role)
      const existing = found.credits.get(title.key) ?? { title, roles: [] }
      const roleLabel =
        credit.role === 'director'
          ? 'Director'
          : credit.characterName?.trim() || 'Main cast'
      if (!existing.roles.includes(roleLabel)) existing.roles.push(roleLabel)
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
  const credits = shuffle([...target.credits.values()], rng).slice(0, MYSTERY_CAREER_CLUES)
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

export function mysteryCareerScore(solved: boolean, guesses: number, maxGuesses: number): number {
  if (!solved) return 0
  return Math.max(100, (maxGuesses - Math.max(1, guesses) + 1) * 100)
}
