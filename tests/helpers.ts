import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

// A throwaway in-memory database with the real schema (the same init.sql the
// app runs at startup). Each test file mocks src/main/db/connection so that
// getSqlite() returns one of these — the repos under test run their actual SQL.
export function createTestDb(): Database.Database {
  const initSql = readFileSync(
    fileURLToPath(new URL('../src/main/db/init.sql', import.meta.url)),
    'utf8'
  )
  const db = new Database(':memory:')
  db.pragma('foreign_keys = ON')
  db.exec(initSql)
  return db
}

// In-memory dictionaries.db with the real dict schema (incl. the FTS5 virtual
// table). Dict tests mock src/main/dict/dictDb so getDictDb() returns one.
export function createDictTestDb(): Database.Database {
  const initSql = readFileSync(
    fileURLToPath(new URL('../src/main/dict/init.sql', import.meta.url)),
    'utf8'
  )
  const db = new Database(':memory:')
  db.exec(initSql)
  return db
}
