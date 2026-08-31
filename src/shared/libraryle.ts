import type {
  QuizIdentityLabel,
  QuizLibraryleQuestion,
  QuizLibraryleTitle,
  QuizScreenMediaMode
} from './types'
import { seededRng } from './quizCore'
import { screenMediaMatches } from './libraryGrid'

export type LibraryleCandidate = QuizLibraryleTitle

export type LibraryleMatch = 'exact' | 'partial' | 'none'

export interface LibraryleFeedback {
  year: {
    match: 'exact' | 'near' | 'none'
    direction: 'earlier' | 'later' | null
  }
  mediaType: LibraryleMatch
  genres: { match: LibraryleMatch; shared: string[] }
  companies: { match: LibraryleMatch; shared: string[] }
  directors: { match: LibraryleMatch; shared: string[] }
  cast: { match: LibraryleMatch; shared: string[] }
}

export const LIBRARYLE_MAX_GUESSES = 8

function unique(values: readonly QuizIdentityLabel[]): QuizIdentityLabel[] {
  return [...new Map(values.map((value) => [value.key, value])).values()]
}

function eligibleTitles(
  candidates: readonly LibraryleCandidate[],
  mediaMode: QuizScreenMediaMode
): LibraryleCandidate[] {
  return candidates.filter(
    (item) =>
      item.imagePath.trim() &&
      item.releaseYear != null &&
      item.genres.length > 0 &&
      item.directors.length + item.cast.length > 0 &&
      screenMediaMatches(mediaMode, item.mediaType)
  )
}

export function libraryleTargetCount(
  candidates: readonly LibraryleCandidate[],
  mediaMode: QuizScreenMediaMode
): number {
  const pool = eligibleTitles(candidates, mediaMode)
  return pool.length >= LIBRARYLE_MAX_GUESSES ? pool.length : 0
}

export function buildLibraryleQuestion(
  candidates: readonly LibraryleCandidate[],
  seed: string | number,
  mediaMode: QuizScreenMediaMode = 'both'
): QuizLibraryleQuestion | null {
  const pool = eligibleTitles(candidates, mediaMode).map((item) => ({
    ...item,
    genres: unique(item.genres),
    companies: unique(item.companies),
    directors: unique(item.directors),
    cast: unique(item.cast)
  }))
  if (pool.length < LIBRARYLE_MAX_GUESSES) return null
  const rng = seededRng(seed)
  const target = pool[Math.floor(rng() * pool.length)]
  return {
    id: `libraryle-${seed}`,
    kind: 'libraryle',
    prompt: 'Identify the hidden title from the attribute feedback.',
    choices: [],
    validKeys: [target.key],
    targetKey: target.key,
    titles: pool,
    maxGuesses: LIBRARYLE_MAX_GUESSES
  }
}

function compareSets(
  target: readonly QuizIdentityLabel[],
  guess: readonly QuizIdentityLabel[]
): { match: LibraryleMatch; shared: string[] } {
  const targetKeys = new Set(target.map((value) => value.key))
  const guessKeys = new Set(guess.map((value) => value.key))
  const shared = target.filter((value) => guessKeys.has(value.key)).map((value) => value.label)
  const exact =
    targetKeys.size === guessKeys.size && [...targetKeys].every((key) => guessKeys.has(key))
  return { match: exact ? 'exact' : shared.length > 0 ? 'partial' : 'none', shared }
}

export function libraryleFeedback(
  target: QuizLibraryleTitle,
  guess: QuizLibraryleTitle
): LibraryleFeedback {
  const difference = target.releaseYear! - guess.releaseYear!
  return {
    year: {
      match: difference === 0 ? 'exact' : Math.abs(difference) <= 5 ? 'near' : 'none',
      direction: difference === 0 ? null : difference < 0 ? 'earlier' : 'later'
    },
    mediaType: target.mediaType === guess.mediaType ? 'exact' : 'none',
    genres: compareSets(target.genres, guess.genres),
    companies: compareSets(target.companies, guess.companies),
    directors: compareSets(target.directors, guess.directors),
    cast: compareSets(target.cast, guess.cast)
  }
}

export function libraryleScore(solved: boolean, guesses: number): number {
  if (!solved) return 0
  return Math.max(100, 1000 - Math.max(0, guesses - 1) * 100)
}
