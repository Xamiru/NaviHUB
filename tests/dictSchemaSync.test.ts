import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

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
