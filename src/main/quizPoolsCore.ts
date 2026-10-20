import * as quizRepo from './repos/quizRepo'
import * as creditTimeRepo from './repos/creditTimeRepo'
import * as directoryRepo from './repos/directoryRepo'
import { getSqlite } from './db/sqliteHandle'
import { buildVaNameQuestions, buildVaQuizQuestions } from '@shared/vaQuiz'
import type { TimeStatsConfig } from '@shared/timeStats'
import type {
  QuizAvailabilityRequest,
  QuizChallengeRequest,
  QuizLibFilter,
  QuizSongFilter,
  QuizSynopsisFilter,
  QuizVaItem,
  CreditTimeGroup,
  CompanyDirectoryEntry,
  CompanyDirectoryQuery,
  PersonDirectoryEntry,
  PersonDirectoryQuery
} from '@shared/types'

// The read-only quiz computations the quiz pool process answers (and main
// answers itself when that process cannot run). Each one reads the whole
// library, which on a large library blocked every IPC call for seconds.

// One answer per filter and connection until the library changes: a VA round
// needs a fresh seed, not a fresh 190k-row read, and the /stats people and
// studios and the directories are re-read on every visit. total_changes()
// covers writes through this connection (tests, the in-process fallback),
// data_version writes by others.
type Memo<T> = WeakMap<ReturnType<typeof getSqlite>, { key: string; value: T }>
const vaCache: Memo<QuizVaItem[]> = new WeakMap()
const creditTimeCache: Memo<CreditTimeGroup[]> = new WeakMap()
const personDirectoryCache: Memo<PersonDirectoryEntry[]> = new WeakMap()
const companyDirectoryCache: Memo<CompanyDirectoryEntry[]> = new WeakMap()

function memoByLibrary<T>(cache: Memo<T>, args: unknown, compute: () => T): T {
  const db = getSqlite()
  const { changes } = db.prepare('SELECT total_changes() AS changes').get() as { changes: number }
  const version = db.pragma('data_version', { simple: true }) as number
  const key = `${changes}:${version}|${JSON.stringify(args)}`
  const cached = cache.get(db)
  if (cached?.key === key) return cached.value
  const value = compute()
  cache.set(db, { key, value })
  return value
}

const vaPoolFor = (filter: QuizLibFilter): QuizVaItem[] =>
  memoByLibrary(vaCache, filter, () => quizRepo.vaPool(filter))

export const QUIZ_POOL_METHODS = {
  availability: (request: QuizAvailabilityRequest) => quizRepo.availability(request),
  challengePool: (request: QuizChallengeRequest) => quizRepo.challengePool(request),
  songPool: (filter: QuizSongFilter) => quizRepo.songPool(filter),
  castPool: (filter: QuizLibFilter) => quizRepo.castPool(filter),
  synopsisPool: (filter: QuizSynopsisFilter) => quizRepo.synopsisPool(filter),
  vaQuestions: (filter: QuizLibFilter, count: number, seed: number) =>
    buildVaQuizQuestions(vaPoolFor(filter), count, seed),
  vaNameQuestions: (filter: QuizLibFilter, count: number, seed: number) =>
    buildVaNameQuestions(vaPoolFor(filter), count, seed),
  // /stats "Who you kept coming back to": every credit of every consumed title.
  creditTime: (cfg: TimeStatsConfig) =>
    memoByLibrary(creditTimeCache, cfg, () => creditTimeRepo.creditTime(cfg)),
  // The Mangaka and Studios directories: one type's titles with every credit
  // or company on them.
  personDirectory: (query: PersonDirectoryQuery) =>
    memoByLibrary(personDirectoryCache, query, () => directoryRepo.personDirectory(query)),
  companyDirectory: (query: CompanyDirectoryQuery) =>
    memoByLibrary(companyDirectoryCache, query, () => directoryRepo.companyDirectory(query)),
  // Settings → Maintenance "Check database". Not a quiz read, but the same
  // shape: it reads every page of the library database, so it runs on this
  // process's read-only connection instead of blocking main.
  quickCheck: () =>
    (getSqlite().pragma('quick_check') as { quick_check: string }[]).map((row) => row.quick_check)
}

export type QuizPoolMethods = typeof QUIZ_POOL_METHODS
export type QuizPoolMethod = keyof QuizPoolMethods

export function runQuizPoolRequest(method: string, args: readonly unknown[]): unknown {
  if (!Object.hasOwn(QUIZ_POOL_METHODS, method)) throw new Error(`Unknown quiz request: ${method}`)
  const run = QUIZ_POOL_METHODS[method as QuizPoolMethod] as (...values: unknown[]) => unknown
  return run(...args)
}
