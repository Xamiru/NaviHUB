import Database from 'better-sqlite3'
import { SQL_DATASET } from '@shared/programming/sqlExercises'
import type { SqlCell, SqlMismatch, SqlTable } from '@shared/types'

// The pure half of the SQL sandbox (the IO half is sqlSandbox.ts + the utility
// process entry sqlSandboxChild.ts). Everything here runs against a plain
// better-sqlite3 handle, so tests exercise the real dataset, the real guards
// and the real grader with no Electron.
//
// Guards, in order: validateUserSql (cheap text rejections), PRAGMA query_only
// (SQLite refuses writes), `!stmt.reader` (DML never runs), and a row cap on
// the iterator. What none of these can bound is a runaway aggregate — a
// missing join condition over five tables finishes inside sqlite3_step()
// before the first row comes back — which is why the caller runs this in a
// killable utility process with a deadline (and a heap limit).

export const DEFAULT_ROW_CAP = 200

// The cap for TRUSTED expected-result queries. It exists only to bound an
// authoring mistake (a cartesian product in an expectedSql), never to shape a
// result: grading compares full tables, so an expectation that hits this is
// reported as a broken exercise rather than quietly graded against.
export const EXPECTED_ROW_CAP = 10_000

export type SandboxDb = InstanceType<typeof Database>

export interface SandboxRun extends SqlTable {
  ms: number
}

export function openSandboxDb(opts: { heapLimitBytes?: number } = {}): SandboxDb {
  const db = new Database(':memory:')
  db.exec(SQL_DATASET.ddl)
  db.exec(SQL_DATASET.inserts)
  db.pragma('query_only = 1')
  // sqlite3_hard_heap_limit64 is process-global — only the child asks for it.
  if (opts.heapLimitBytes) db.pragma(`hard_heap_limit = ${Math.floor(opts.heapLimitBytes)}`)
  return db
}

// Text-level rejections. Returns a user-facing message or null when the text
// may go on to prepare(). Deliberately narrow: SQLite itself is the parser.
export function validateUserSql(sql: string): string | null {
  const trimmed = sql.trim()
  if (!trimmed) return 'Type a query first.'
  if (/\bRECURSIVE\b/i.test(trimmed)) {
    return 'Recursive CTEs are disabled in the sandbox (no exercise needs one).'
  }
  if (/\b(ATTACH|DETACH|PRAGMA|VACUUM|REINDEX|ANALYZE)\b/i.test(trimmed)) {
    return 'That statement is not available in the sandbox.'
  }
  return null
}

function toCell(v: unknown): SqlCell {
  if (v === null || v === undefined) return null
  if (typeof v === 'number' || typeof v === 'string') return v
  if (typeof v === 'bigint') return Number(v)
  if (Buffer.isBuffer(v)) return `x'${v.toString('hex')}'`
  return String(v)
}

// One trailing semicolon is a habit, not a second statement.
export function stripTrailingSemicolon(sql: string): string {
  return sql.trim().replace(/;\s*$/, '')
}

// Runs ONE read-only statement, capped at rowCap rows (truncated flags the
// cap being hit). Throws an Error with a user-facing message on SQL errors.
export function runUserSql(db: SandboxDb, sql: string, rowCap = DEFAULT_ROW_CAP): SandboxRun {
  const started = performance.now()
  // Database.Statement<unknown[]>, not ReturnType<SandboxDb['prepare']>: that
  // instantiates prepare's generic with `unknown`, which fails the
  // `extends unknown[]` branch, so the statement types as Statement<[unknown]>
  // and iterate() then demands a bind parameter it never takes.
  let stmt: Database.Statement<unknown[]>
  try {
    stmt = db.prepare(stripTrailingSemicolon(sql))
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (/more than one statement/i.test(msg)) {
      throw new Error('One statement at a time — the sandbox runs a single query.')
    }
    throw new Error(msg)
  }
  if (!stmt.reader) {
    throw new Error('Only queries that return rows run here (SELECT / WITH … SELECT).')
  }
  const columns = stmt.columns().map((c) => c.name)
  const rows: SqlCell[][] = []
  let truncated = false
  for (const row of stmt.raw(true).iterate() as IterableIterator<unknown[]>) {
    if (rows.length >= rowCap) {
      truncated = true
      break
    }
    rows.push(row.map(toCell))
  }
  return { columns, rows, truncated, ms: Math.round(performance.now() - started) }
}

// ---- Grading ----
// Columns match by NAME, case-insensitively and in any order — the prompt names
// the aliases it wants, and `SELECT b, a` is the same answer as `SELECT a, b`.
// Rows are compared as tuples in the expected column order: as a multiset
// unless the exercise says order matters. Numbers get a small tolerance so 1
// and 1.0 (or 8.6999999) agree; NULL equals NULL; strings are exact.

// ---- in-flight request registry ----
// Which pending requests does an event settle? A timed-out query kills its
// child, and the NEXT query spawns a replacement — so by the time the dead
// child's 'exit' arrives, the map can already hold the replacement's requests.
// Failing "everything pending" there rejects a query that is still perfectly
// alive, which the user sees as a phantom "the sandbox crashed" on a query
// they just typed. Ownership is therefore tracked per request, and a process
// may only settle its own.
//
// Timers are injected as a plain clearTimer callback so this stays testable
// with no electron and no real timers.

export interface PendingEntry<P, V> {
  proc: P
  resolve: (value: V) => void
  reject: (err: Error) => void
  clearTimer: () => void
}

export class PendingRegistry<P, V> {
  private readonly map = new Map<number, PendingEntry<P, V>>()

  get size(): number {
    return this.map.size
  }

  add(id: number, entry: PendingEntry<P, V>): void {
    this.map.set(id, entry)
  }

  // Drops the entry and stops its timer WITHOUT settling it — for the caller
  // that wants to settle with its own message (the timeout path).
  take(id: number): PendingEntry<P, V> | undefined {
    const e = this.map.get(id)
    if (!e) return undefined
    this.map.delete(id)
    e.clearTimer()
    return e
  }

  // Resolves the request with this id. False when it is no longer in flight
  // (already timed out, or failed with its process).
  settle(id: number, value: V): boolean {
    const e = this.take(id)
    if (!e) return false
    e.resolve(value)
    return true
  }

  // Rejects in-flight requests and returns how many. With `owner`, ONLY the
  // ones issued to that process — a dead child must never settle work that
  // belongs to its replacement.
  fail(reason: string, owner?: P): number {
    let n = 0
    for (const [id, e] of [...this.map]) {
      if (owner !== undefined && e.proc !== owner) continue
      this.map.delete(id)
      e.clearTimer()
      e.reject(new Error(reason))
      n += 1
    }
    return n
  }
}

const NUM_EPS = 1e-9

function cellKey(c: SqlCell): string {
  if (c === null) return '<null>'
  if (typeof c === 'number') {
    const r = Math.round(c / NUM_EPS) * NUM_EPS
    return `n:${Object.is(r, -0) ? 0 : r}`
  }
  return `s:${c}`
}

function rowKey(row: SqlCell[]): string {
  return row.map(cellKey).join('|')
}

export function compareResults(
  actual: SqlTable,
  expected: SqlTable,
  orderMatters: boolean
): { correct: boolean; mismatch: SqlMismatch } {
  const lower = (s: string): string => s.trim().toLowerCase()
  const exp = expected.columns.map(lower)
  const act = actual.columns.map(lower)
  if (exp.length !== act.length || [...exp].sort().join(',') !== [...act].sort().join(',')) {
    return { correct: false, mismatch: 'columns' }
  }
  // Project actual rows into the expected column order (duplicate names map
  // positionally among themselves).
  const used = new Set<number>()
  const map = exp.map((name) => {
    const i = act.findIndex((a, idx) => a === name && !used.has(idx))
    used.add(i)
    return i
  })
  if (actual.truncated || actual.rows.length !== expected.rows.length) {
    return { correct: false, mismatch: 'rowCount' }
  }
  const projected = actual.rows.map((r) => map.map((i) => r[i] ?? null))
  const a = projected.map(rowKey)
  const e = expected.rows.map(rowKey)
  const SEP = '\n'
  if (orderMatters) {
    if (a.join(SEP) === e.join(SEP)) return { correct: true, mismatch: null }
    const same = [...a].sort().join(SEP) === [...e].sort().join(SEP)
    return { correct: false, mismatch: same ? 'order' : 'rows' }
  }
  const ok = [...a].sort().join(SEP) === [...e].sort().join(SEP)
  return { correct: ok, mismatch: ok ? null : 'rows' }
}
