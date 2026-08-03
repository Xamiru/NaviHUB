import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'

// The startup crash class this pins: init.sql runs BEFORE runMigrations, so a
// statement in init.sql may only reference columns that init.sql itself
// creates. An index on ensureColumn-added columns passes every fresh-DB test
// (createTestDb builds the current schema from scratch) and then kills the app
// on the FIRST LIVE DATABASE that predates the columns — which is exactly what
// the English-SRS release did: "SqliteError: no such column: status" out of
// initDatabase, before a window ever opened.

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import { runMigrations } from '../src/main/db/connection'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const initSql = read('../src/main/db/init.sql')

describe('a live DB that predates newer columns', () => {
  it('survives init.sql + migrations with its data intact (the en_word crash)', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // en_word exactly as the dictionary-only release created it: no SRS columns.
    db.exec(`CREATE TABLE en_word (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      word        TEXT NOT NULL,
      phonetic    TEXT,
      pos         TEXT,
      meaning     TEXT NOT NULL,
      example     TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX idx_en_word_word ON en_word(word);`)
    db.prepare(`INSERT INTO en_word (word, meaning) VALUES ('reticent', 'reserved')`).run()

    // This exec is the crash site in the broken release.
    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()

    // Migrations delivered the columns, the index, and kept the row.
    const cols = (db.prepare('PRAGMA table_info(en_word)').all() as { name: string }[]).map(
      (c) => c.name
    )
    expect(cols).toContain('status')
    expect(cols).toContain('due_at')
    const idx = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='index' AND name='idx_en_word_due'`)
      .get()
    expect(idx).toBeTruthy()
    const row = db.prepare('SELECT word, status FROM en_word').get() as {
      word: string
      status: string
    }
    expect(row).toEqual({ word: 'reticent', status: 'new' })
  })

  it('NO init.sql statement references a column that only migrations create', () => {
    // The drift guard: parses the real ensureColumn list out of connection.ts
    // and cross-checks every index in init.sql against it, so the next index
    // added to the wrong file fails here instead of on someone's live DB.
    const connection = read('../src/main/db/connection.ts')
    const migrated = new Set(
      [...connection.matchAll(/ensureColumn\(sqlite, '(\w+)', '(\w+)'/g)].map(
        (m) => `${m[1]}.${m[2]}`
      )
    )
    expect(migrated.size).toBeGreaterThan(10) // the regex still matches reality

    const offenders: string[] = []
    for (const m of initSql.matchAll(
      /CREATE (?:UNIQUE )?INDEX IF NOT EXISTS (\w+) ON (\w+)\s*\(([^)]*)\)/g
    )) {
      const [, name, table, cols] = m
      for (const raw of cols.split(',')) {
        const col = raw.trim().split(/\s/)[0]
        if (migrated.has(`${table}.${col}`)) offenders.push(`${name} → ${table}.${col}`)
      }
    }
    expect(offenders).toEqual([])
  })
})