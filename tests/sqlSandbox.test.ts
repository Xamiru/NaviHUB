import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  compareResults,
  EXPECTED_ROW_CAP,
  openSandboxDb,
  PendingRegistry,
  runUserSql,
  stripTrailingSemicolon,
  validateUserSql,
  type SandboxDb
} from '../src/main/sqlSandboxCore'
import { SQL_DATASET, SQL_EXERCISES } from '../src/shared/programming/sqlExercises'
import type { SqlTable } from '../src/shared/types'

// The SQL sandbox's pure half against the REAL dataset and exercises: the
// content must load, every expected query must run and be deterministic, the
// guards must hold, and the grader must accept the equivalences the prompts
// promise (column order / case, 1 vs 1.0, multiset rows) and nothing more.

let db: SandboxDb

beforeAll(() => {
  db = openSandboxDb()
})
afterAll(() => {
  db.close()
})

const table = (columns: string[], rows: SqlTable['rows'], truncated = false): SqlTable => ({
  columns,
  rows,
  truncated
})

describe('SQL sandbox — dataset', () => {
  it('loads, and the Schema panel description matches PRAGMA table_info for every table', () => {
    const names = (
      db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`).all() as {
        name: string
      }[]
    ).map((r) => r.name)
    expect(names.sort()).toEqual(SQL_DATASET.tables.map((t) => t.name).sort())
    for (const t of SQL_DATASET.tables) {
      const info = db.prepare(`PRAGMA table_info(${t.name})`).all() as { name: string; type: string }[]
      expect(info.map((c) => c.name), t.name).toEqual(t.columns.map((c) => c.name))
      for (const c of t.columns) {
        const real = info.find((i) => i.name === c.name)!
        expect(real.type.toUpperCase(), `${t.name}.${c.name}`).toBe(c.type.toUpperCase())
      }
    }
  })

  it('has a small dataset (≤ 400 rows total) with deliberate NULLs to find', () => {
    let total = 0
    for (const t of SQL_DATASET.tables) {
      total += (db.prepare(`SELECT COUNT(*) AS n FROM ${t.name}`).get() as { n: number }).n
    }
    expect(total).toBeGreaterThan(20)
    expect(total).toBeLessThanOrEqual(400)
    const nullable = SQL_DATASET.tables.flatMap((t) =>
      t.columns.filter((c) => c.note?.toLowerCase().includes('null')).map((c) => `${t.name}.${c.name}`)
    )
    expect(nullable.length).toBeGreaterThan(0)
    for (const col of nullable) {
      const [t, c] = col.split('.')
      const n = (db.prepare(`SELECT COUNT(*) AS n FROM ${t} WHERE ${c} IS NULL`).get() as { n: number })
        .n
      expect(n, `${col} promises NULLs`).toBeGreaterThan(0)
    }
  })
})

describe('SQL sandbox — exercises', () => {
  it('have unique kebab-case keys, a level, a concept and a hint', () => {
    const keys = SQL_EXERCISES.map((e) => e.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const e of SQL_EXERCISES) {
      expect(e.key).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect([1, 2, 3]).toContain(e.level)
      expect(e.concept.length).toBeGreaterThan(1)
      expect(e.hint.length).toBeGreaterThan(10)
      expect(e.prompt.length).toBeGreaterThan(20)
    }
  })

  it.each(SQL_EXERCISES.map((e) => e.key))('%s: expectedSql runs, returns 1-60 rows, unique columns, deterministic', (key) => {
    const ex = SQL_EXERCISES.find((e) => e.key === key)!
    expect(validateUserSql(ex.expectedSql)).toBeNull()
    const a = runUserSql(db, ex.expectedSql)
    const b = runUserSql(db, ex.expectedSql)
    expect(a.truncated).toBe(false)
    expect(a.rows.length).toBeGreaterThanOrEqual(1)
    expect(a.rows.length).toBeLessThanOrEqual(60)
    expect(new Set(a.columns.map((c) => c.toLowerCase())).size).toBe(a.columns.length)
    expect(a.rows).toEqual(b.rows)
    // The prompt must name every column the result has (aliases included).
    for (const c of a.columns) {
      expect(ex.prompt.toLowerCase(), `${key} prompt names column ${c}`).toContain(c.toLowerCase())
    }
    // Trivially, the reference answer grades correct against itself.
    const t = table(a.columns, a.rows)
    expect(compareResults(t, t, ex.orderMatters === true)).toEqual({ correct: true, mismatch: null })
  })
})

describe('SQL sandbox — guards', () => {
  it('rejects blank, RECURSIVE and admin statements at the text level', () => {
    expect(validateUserSql('   ')).not.toBeNull()
    expect(validateUserSql('WITH RECURSIVE c(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM c) SELECT * FROM c')).toMatch(
      /Recursive/
    )
    expect(validateUserSql('PRAGMA table_info(anime)')).not.toBeNull()
    expect(validateUserSql("ATTACH ':memory:' AS x")).not.toBeNull()
    expect(validateUserSql('SELECT 1')).toBeNull()
  })

  it('refuses a second statement, and tolerates one trailing semicolon', () => {
    expect(stripTrailingSemicolon('SELECT 1;  ')).toBe('SELECT 1')
    expect(runUserSql(db, 'SELECT 1 AS one;').rows).toEqual([[1]])
    expect(() => runUserSql(db, 'SELECT 1; SELECT 2')).toThrow(/One statement at a time/)
  })

  it('never runs a write: DML is refused before running and the DB is query_only anyway', () => {
    expect(() => runUserSql(db, "INSERT INTO studio (name, country) VALUES ('x', 'JP')")).toThrow(
      /Only queries that return rows/
    )
    expect(() => runUserSql(db, 'DELETE FROM anime')).toThrow(/Only queries/)
    // Belt and braces: even a direct run against the handle is refused.
    expect(() => db.prepare('DELETE FROM anime').run()).toThrow(/readonly/i)
  })

  it('surfaces SQL errors as messages, not crashes', () => {
    expect(() => runUserSql(db, 'SELECT nope FROM anime')).toThrow(/no such column/)
    expect(() => runUserSql(db, 'SELEC 1')).toThrow(/syntax error/)
  })

  it('caps rows and flags truncation', () => {
    const r = runUserSql(db, 'SELECT a.id FROM anime a, anime b', 5)
    expect(r.rows.length).toBe(5)
    expect(r.truncated).toBe(true)
    const full = runUserSql(db, 'SELECT id FROM anime')
    expect(full.truncated).toBe(false)
  })

  it('returns plain cells (numbers, strings, null) with column names', () => {
    const r = runUserSql(db, "SELECT 1 AS n, 'x' AS s, NULL AS z, 1.5 AS f")
    expect(r.columns).toEqual(['n', 's', 'z', 'f'])
    expect(r.rows).toEqual([[1, 'x', null, 1.5]])
    expect(r.ms).toBeGreaterThanOrEqual(0)
  })
})

describe('SQL sandbox — in-flight registry', () => {
  // Stand-ins for UtilityProcess: the registry only ever compares identity.
  const procA = { name: 'a' }
  const procB = { name: 'b' }

  const settled = (): {
    reg: PendingRegistry<object, string>
    log: string[]
    cleared: number[]
    issue: (id: number, proc: object) => void
  } => {
    const reg = new PendingRegistry<object, string>()
    const log: string[] = []
    const cleared: number[] = []
    const issue = (id: number, proc: object): void => {
      reg.add(id, {
        proc,
        resolve: (v) => log.push(`${id}:ok:${v}`),
        reject: (e) => log.push(`${id}:err:${e.message}`),
        clearTimer: () => cleared.push(id)
      })
    }
    return { reg, log, cleared, issue }
  }

  it('resolves a reply to its own request and clears that request’s timer', () => {
    const { reg, log, cleared, issue } = settled()
    issue(1, procA)
    expect(reg.size).toBe(1)
    expect(reg.settle(1, 'rows')).toBe(true)
    expect(log).toEqual(['1:ok:rows'])
    expect(cleared).toEqual([1])
    expect(reg.size).toBe(0)
    // A late duplicate reply for an id that already settled is a no-op.
    expect(reg.settle(1, 'again')).toBe(false)
    expect(log).toEqual(['1:ok:rows'])
  })

  // The regression this class exists for: a timed-out query kills its child,
  // the next query spawns a replacement, and only THEN does the dead child's
  // 'exit' land. Failing everything pending would reject a live query with a
  // phantom "the sandbox crashed".
  it('fails only the dead process’s requests, never its replacement’s', () => {
    const { reg, log, cleared, issue } = settled()
    issue(1, procA) // in flight on the child that is about to die
    issue(2, procB) // already re-issued to the replacement
    expect(reg.fail('The sandbox process crashed (1).', procA)).toBe(1)
    expect(log).toEqual(['1:err:The sandbox process crashed (1).'])
    expect(cleared).toEqual([1])
    // The replacement's request is untouched and still settles normally.
    expect(reg.size).toBe(1)
    expect(reg.settle(2, 'rows')).toBe(true)
    expect(log).toEqual(['1:err:The sandbox process crashed (1).', '2:ok:rows'])
  })

  it('fails every request when no owner is given (the quit path)', () => {
    const { reg, log, issue } = settled()
    issue(1, procA)
    issue(2, procB)
    expect(reg.fail('App is quitting.')).toBe(2)
    expect(log).toEqual(['1:err:App is quitting.', '2:err:App is quitting.'])
    expect(reg.size).toBe(0)
  })

  it('take() removes and disarms without settling, so the caller can reject its own way', () => {
    const { reg, log, cleared, issue } = settled()
    issue(1, procA)
    expect(reg.take(1)).toBeTruthy()
    expect(cleared).toEqual([1])
    expect(log).toEqual([])
    expect(reg.size).toBe(0)
    // Having taken it, the dying process must not settle it a second time.
    expect(reg.fail('The sandbox process crashed (1).', procA)).toBe(0)
    expect(log).toEqual([])
    expect(reg.take(1)).toBeUndefined()
  })
})

describe('SQL sandbox — expected results', () => {
  // The expected side is graded against in full, so it must never be capped at
  // the 200-row DISPLAY cap: a truncated expectation can equal no answer at
  // all, and the exercise becomes unsolvable however correct the user's SQL is.
  it('runs every expectedSql inside the expected cap, untruncated', () => {
    expect(EXPECTED_ROW_CAP).toBeGreaterThan(200)
    for (const ex of SQL_EXERCISES) {
      const run = runUserSql(db, ex.expectedSql, EXPECTED_ROW_CAP)
      expect(run.truncated, `${ex.key} expectation must not truncate`).toBe(false)
    }
  })

  it('a truncated expectation can never grade correct — hence the loud error', () => {
    const full = runUserSql(db, 'SELECT id FROM anime')
    const capped = runUserSql(db, 'SELECT id FROM anime', 2)
    expect(capped.truncated).toBe(true)
    // Even the reference answer itself fails against its own capped form.
    expect(compareResults(full, capped, false).correct).toBe(false)
    expect(compareResults(capped, capped, false).mismatch).toBe('rowCount')
  })
})

describe('SQL sandbox — grading', () => {
  const expected = table(['title', 'year'], [['A', 2000], ['B', 2001]])

  it('accepts the same rows in any order when order does not matter', () => {
    const actual = table(['title', 'year'], [['B', 2001], ['A', 2000]])
    expect(compareResults(actual, expected, false)).toEqual({ correct: true, mismatch: null })
    expect(compareResults(actual, expected, true)).toEqual({ correct: false, mismatch: 'order' })
  })

  it('matches columns by name, case-insensitively and in any order', () => {
    const actual = table(['YEAR', 'Title'], [[2000, 'A'], [2001, 'B']])
    expect(compareResults(actual, expected, false)).toEqual({ correct: true, mismatch: null })
  })

  it('reports a column mismatch for missing, extra or misnamed columns', () => {
    expect(compareResults(table(['title'], [['A'], ['B']]), expected, false).mismatch).toBe('columns')
    expect(
      compareResults(table(['title', 'year', 'id'], [['A', 2000, 1], ['B', 2001, 2]]), expected, false)
        .mismatch
    ).toBe('columns')
    expect(
      compareResults(table(['name', 'year'], [['A', 2000], ['B', 2001]]), expected, false).mismatch
    ).toBe('columns')
  })

  it('reports rowCount before rows, and truncation counts as too many rows', () => {
    expect(compareResults(table(['title', 'year'], [['A', 2000]]), expected, false).mismatch).toBe(
      'rowCount'
    )
    expect(
      compareResults(table(['title', 'year'], [['A', 2000], ['B', 2001]], true), expected, false)
        .mismatch
    ).toBe('rowCount')
  })

  it('treats 1 and 1.0 (and float noise) as equal, NULL as NULL, strings exactly', () => {
    const e = table(['n', 's'], [[1, 'x'], [null, 'y'], [8.7, 'z']])
    expect(compareResults(table(['n', 's'], [[1.0, 'x'], [null, 'y'], [8.7000000000001, 'z']]), e, false))
      .toEqual({ correct: true, mismatch: null })
    expect(compareResults(table(['n', 's'], [[1, 'X'], [null, 'y'], [8.7, 'z']]), e, false).mismatch)
      .toBe('rows')
    expect(compareResults(table(['n', 's'], [[1, 'x'], [0, 'y'], [8.7, 'z']]), e, false).mismatch).toBe(
      'rows'
    )
  })

  it('duplicate rows are counted (multiset, not set)', () => {
    const e = table(['t'], [['A'], ['A'], ['B']])
    expect(compareResults(table(['t'], [['A'], ['B'], ['B']]), e, false).mismatch).toBe('rows')
    expect(compareResults(table(['t'], [['B'], ['A'], ['A']]), e, false).correct).toBe(true)
  })
})
