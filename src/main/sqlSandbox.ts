import { utilityProcess, type UtilityProcess } from 'electron'
import childPath from './sqlSandboxChild?modulePath'
import { logInfo, logWarn } from './logBus'
import {
  compareResults,
  DEFAULT_ROW_CAP,
  EXPECTED_ROW_CAP,
  openSandboxDb,
  PendingRegistry,
  runUserSql,
  validateUserSql,
  type SandboxDb
} from './sqlSandboxCore'
import { sqlExercise } from '@shared/programming/sqlExercises'
import * as programmingRepo from './repos/programmingRepo'
import type { SqlRunInput, SqlRunResult, SqlTable } from '@shared/types'

// IO half of the SQL sandbox. The user's query runs in a utility process
// (sqlSandboxChild.ts) with a deadline: on timeout the child is killed and
// respawned on the next run, so a missing-join-condition aggregate costs the
// user two seconds and a message, not a frozen app. The child stays warm
// between runs and is dropped after IDLE_MS of silence (an unref'd timeout,
// not an interval — the achievement watcher owns the app's one interval).
// The EXPECTED rows come from trusted content, so they run on a lazily opened
// main-thread handle and are memoized per exercise.
//
// killSqlSandbox() is in the before-quit registry (index.ts).

const TIMEOUT_MS = 2000
const IDLE_MS = 5 * 60 * 1000

type ChildReply =
  | { id: number; ok: true; columns: string[]; rows: SqlTable['rows']; truncated: boolean; ms: number }
  | { id: number; ok: false; error: string }

let child: UtilityProcess | null = null
let nextId = 1
const pending = new PendingRegistry<UtilityProcess, ChildReply>()
let idleTimer: NodeJS.Timeout | null = null

function spawn(): UtilityProcess {
  const proc = utilityProcess.fork(childPath, [], {
    serviceName: 'navihub-sql-sandbox',
    stdio: 'ignore'
  })
  proc.on('message', (msg: ChildReply) => {
    pending.settle(msg.id, msg)
  })
  proc.on('exit', (code) => {
    if (child === proc) child = null
    // Only THIS process's requests — a query issued to the replacement child
    // is still running and must not be rejected by its predecessor's exit.
    pending.fail(
      code === 0 ? 'The sandbox process exited.' : `The sandbox process crashed (${code}).`,
      proc
    )
  })
  logInfo('proc', 'sql sandbox: spawned utility process')
  return proc
}

function touchIdle(): void {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    idleTimer = null
    if (child && pending.size === 0) {
      child.kill()
      child = null
      logInfo('proc', 'sql sandbox: idle, stopped')
    }
  }, IDLE_MS)
  idleTimer.unref()
}

function runInChild(sql: string, rowCap: number): Promise<ChildReply> {
  if (!child) child = spawn()
  const proc = child
  const id = nextId++
  return new Promise<ChildReply>((resolve, reject) => {
    const timer = setTimeout(() => {
      // Remove ourselves FIRST so the exit handler's fail() cannot reject this
      // promise with the generic message; then kill and reject with the
      // timeout copy.
      pending.take(id)
      if (child === proc) child = null
      logWarn('proc', `sql sandbox: query exceeded ${TIMEOUT_MS} ms, sandbox killed`)
      proc.kill()
      reject(
        new Error(
          `Stopped after ${TIMEOUT_MS / 1000} s — the query never finished. A missing join condition multiplies every table together; check the FROM/ON clauses.`
        )
      )
    }, TIMEOUT_MS)
    pending.add(id, { proc, resolve, reject, clearTimer: () => clearTimeout(timer) })
    proc.postMessage({ id, sql, rowCap })
    touchIdle()
  })
}

// ---- expected results (trusted content, main thread, memoized) ----
let mainDb: SandboxDb | null = null
const expectedCache = new Map<string, SqlTable>()

export function expectedTable(exerciseKey: string): SqlTable {
  const cached = expectedCache.get(exerciseKey)
  if (cached) return cached
  const ex = sqlExercise(exerciseKey)
  if (!ex) throw new Error(`Unknown exercise: ${exerciseKey}`)
  if (!mainDb) mainDb = openSandboxDb()
  // The EXPECTED side must never be capped at the DISPLAY cap: a truncated
  // expectation can never equal a full answer, so the exercise would grade
  // wrong no matter what the user types. Run it wide open and make an
  // over-long expectation a loud authoring error instead of a silent one.
  const run = runUserSql(mainDb, ex.expectedSql, EXPECTED_ROW_CAP)
  if (run.truncated) {
    throw new Error(
      `Exercise ${ex.key} expects more than ${EXPECTED_ROW_CAP} rows — it cannot be graded.`
    )
  }
  const table: SqlTable = { columns: run.columns, rows: run.rows, truncated: run.truncated }
  expectedCache.set(exerciseKey, table)
  return table
}

export async function runExercise(input: SqlRunInput): Promise<SqlRunResult> {
  const ex = sqlExercise(input.exerciseKey)
  if (!ex) throw new Error(`Unknown exercise: ${input.exerciseKey}`)
  const expected = expectedTable(ex.key)
  const base: SqlRunResult = {
    columns: [],
    rows: [],
    truncated: false,
    ms: 0,
    correct: false,
    mismatch: null,
    expectedColumns: expected.columns,
    error: null
  }
  const invalid = validateUserSql(input.sql)
  if (invalid) return { ...base, error: invalid }

  let reply: ChildReply
  try {
    reply = await runInChild(input.sql, Math.max(DEFAULT_ROW_CAP + 1, expected.rows.length + 1))
  } catch (e) {
    return { ...base, error: e instanceof Error ? e.message : String(e) }
  }
  if (!reply.ok) return { ...base, error: reply.error }

  const actual: SqlTable = { columns: reply.columns, rows: reply.rows, truncated: reply.truncated }
  const verdict = compareResults(actual, expected, ex.orderMatters === true)
  if (verdict.correct) {
    // A failed bookkeeping write must not turn a correct answer into an error
    // toast — the user solved it either way. Losing the solve row costs a
    // green tick on the exercise list, which re-solving restores.
    try {
      programmingRepo.recordSolve({ kind: 'sql', key: ex.key, answer: input.sql.trim() })
    } catch (e) {
      logWarn('proc', `sql sandbox: could not record solve for ${ex.key}: ${String(e)}`)
    }
  }
  return {
    columns: actual.columns,
    rows: actual.rows.slice(0, DEFAULT_ROW_CAP),
    truncated: actual.truncated || actual.rows.length > DEFAULT_ROW_CAP,
    ms: reply.ms,
    correct: verdict.correct,
    mismatch: verdict.mismatch,
    expectedColumns: expected.columns,
    error: null
  }
}

// Before-quit: drop the child (nothing to flush — the sandbox holds no state
// worth keeping) and fail anything still in flight.
export function killSqlSandbox(): void {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = null
  pending.fail('App is quitting.')
  if (child) {
    child.kill()
    child = null
  }
  if (mainDb) {
    mainDb.close()
    mainDb = null
  }
}
