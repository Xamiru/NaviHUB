import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it, vi } from 'vitest'
import { createDictTestDb } from './helpers'
import { distinctParentIds, ORPHAN_SWEEPS, sweepOrphans } from '../src/main/dict/dictDb'

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

// Guards the three lists that must stay in sync when a dict pack adds tables:
// init.sql's CREATE TABLE set, dictDb.ts's version-bump DROP list, and its
// sweepOrphans() child-table sweeps. Forgetting the DROP list would leak
// tables across a future DICT_SCHEMA_VERSION bump; forgetting the sweep would
// leave orphans from a crashed import.

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const initSql = read('../src/main/dict/init.sql')
const dictDb = read('../src/main/dict/dictDb.ts')

const created = [
  ...initSql.matchAll(/CREATE (?:VIRTUAL )?TABLE IF NOT EXISTS (\w+)/g)
].map((m) => m[1])

describe('dict schema lists stay in sync', () => {
  it('drops every created table on a version bump', () => {
    const dropped = [...dictDb.matchAll(/DROP TABLE IF EXISTS (\w+);/g)].map((m) => m[1])
    for (const table of created) {
      expect(dropped, `missing from DROP list: ${table}`).toContain(table)
    }
  })

  it('sweeps orphans in every child table', () => {
    // Registry tables own their children; everything else must appear in a
    // sweepOrphans DELETE (matched loosely by name to tolerate loop lists).
    const registries = new Set([
      'dict',
      'sentence_bank',
      'stroke_set',
      'en_dict',
      'en_freq_set',
      'krad_set',
      'grammar_bank',
      'audio_bank',
      'pair_set'
    ])
    const sweepBlock = dictDb.slice(
      dictDb.indexOf('function sweepOrphans'),
      dictDb.indexOf('function open')
    )
    for (const table of created) {
      if (registries.has(table)) continue
      const mentioned =
        sweepBlock.includes(`'${table}'`) || sweepBlock.includes(`DELETE FROM ${table} `)
      expect(mentioned, `missing from sweepOrphans: ${table}`).toBe(true)
    }
  })
})

describe('dict orphan sweep', () => {
  it('reads every child table through an index, never a scan', () => {
    const db = createDictTestDb()
    for (const { column, children } of ORPHAN_SWEEPS) {
      for (const child of children) {
        const plan = (
          db
            .prepare(
              `EXPLAIN QUERY PLAN SELECT ${column} AS id FROM ${child} WHERE ${column} > ? ORDER BY ${column} LIMIT 1`
            )
            .all(0) as { detail: string }[]
        ).map((row) => row.detail)
        expect(plan.join(' | '), child).toMatch(/^SEARCH /)
      }
    }
  })

  it('deletes unregistered ids across content and FTS rows and keeps registered ones', () => {
    const db = createDictTestDb()
    db.prepare(`INSERT INTO dict (id, title) VALUES (1, 'Live')`).run()
    const addTerm = (dictId: number, expression: string): void => {
      const termId = db
        .prepare(`INSERT INTO term (dict_id, expression, glossary) VALUES (?, ?, '[]')`)
        .run(dictId, expression).lastInsertRowid
      db.prepare(`INSERT INTO gloss_fts (gloss, term_id, dict_id) VALUES (?, ?, ?)`).run(
        `gloss ${expression}`,
        termId,
        dictId
      )
    }
    addTerm(1, 'kept')
    addTerm(2, 'crashed import')
    addTerm(3, 'crashed removal')
    db.prepare(`INSERT INTO sentence_bank (id, source, sentence_count) VALUES (1, 'tatoeba', 1)`).run()
    for (const bankId of [1, 5]) {
      const sentenceId = db
        .prepare(`INSERT INTO sentence (bank_id, jp, en) VALUES (?, 'jp', 'en')`)
        .run(bankId).lastInsertRowid
      db.prepare(`INSERT INTO sentence_fts (keywords, sentence_id, bank_id) VALUES ('k', ?, ?)`).run(
        sentenceId,
        bankId
      )
    }

    expect(distinctParentIds(db, 'term', 'dict_id')).toEqual([1, 2, 3])
    sweepOrphans(db)

    const ids = (sql: string): number[] =>
      (db.prepare(sql).all() as { id: number }[]).map((row) => Number(row.id))
    expect(ids('SELECT dict_id AS id FROM term')).toEqual([1])
    expect(ids('SELECT dict_id AS id FROM gloss_fts')).toEqual([1])
    expect(ids('SELECT bank_id AS id FROM sentence')).toEqual([1])
    expect(ids('SELECT bank_id AS id FROM sentence_fts')).toEqual([1])
  })
})
