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
