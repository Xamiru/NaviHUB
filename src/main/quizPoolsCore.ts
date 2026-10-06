import * as quizRepo from './repos/quizRepo'
import { getSqlite } from './db/sqliteHandle'
import { buildVaQuizQuestions } from '@shared/vaQuiz'
import type {
  QuizAvailabilityRequest,
  QuizChallengeRequest,
  QuizLibFilter,
  QuizSongFilter,
  QuizSynopsisFilter,
  QuizVaItem
} from '@shared/types'

// The read-only quiz computations the quiz pool process answers (and main
// answers itself when that process cannot run). Each one reads the whole
// library, which on a large library blocked every IPC call for seconds.

// One VA pool per filter until the library changes: a round needs a fresh
// seed, not a fresh 190k-row read. total_changes() covers writes through this
// connection (tests, the in-process fallback), data_version writes by others.
const vaCache = new WeakMap<ReturnType<typeof getSqlite>, { key: string; pool: QuizVaItem[] }>()

function vaPoolFor(filter: QuizLibFilter): QuizVaItem[] {
  const db = getSqlite()
  const { changes } = db.prepare('SELECT total_changes() AS changes').get() as { changes: number }
  const version = db.pragma('data_version', { simple: true }) as number
  const key = `${changes}:${version}|${JSON.stringify(filter)}`
  const cached = vaCache.get(db)
  if (cached?.key === key) return cached.pool
  const pool = quizRepo.vaPool(filter)
  vaCache.set(db, { key, pool })
  return pool
}

export const QUIZ_POOL_METHODS = {
  availability: (request: QuizAvailabilityRequest) => quizRepo.availability(request),
  challengePool: (request: QuizChallengeRequest) => quizRepo.challengePool(request),
  songPool: (filter: QuizSongFilter) => quizRepo.songPool(filter),
  castPool: (filter: QuizLibFilter) => quizRepo.castPool(filter),
  synopsisPool: (filter: QuizSynopsisFilter) => quizRepo.synopsisPool(filter),
  vaQuestions: (filter: QuizLibFilter, count: number, seed: number) =>
    buildVaQuizQuestions(vaPoolFor(filter), count, seed)
}

export type QuizPoolMethods = typeof QUIZ_POOL_METHODS
export type QuizPoolMethod = keyof QuizPoolMethods

export function runQuizPoolRequest(method: string, args: readonly unknown[]): unknown {
  if (!Object.hasOwn(QUIZ_POOL_METHODS, method)) throw new Error(`Unknown quiz request: ${method}`)
  const run = QUIZ_POOL_METHODS[method as QuizPoolMethod] as (...values: unknown[]) => unknown
  return run(...args)
}
