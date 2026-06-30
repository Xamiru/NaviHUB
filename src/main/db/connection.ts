import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import initSql from './init.sql?raw'
import * as schema from './schema'

export type DB = BetterSQLite3Database<typeof schema>

let _sqlite: Database.Database | null = null
let _db: DB | null = null

// Default customization values, seeded once on first run.
const DEFAULT_SETTINGS: Record<string, string> = {
  'anime.statuses': JSON.stringify([
    'Watching',
    'Completed',
    'On Hold',
    'Dropped',
    'Plan to Watch'
  ]),
  'movie.statuses': JSON.stringify(['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch']),
  'score.max': '10',
  theme: 'dark'
}

export function getDbPath(): string {
  return join(app.getPath('userData'), 'navihub.db')
}

// Adds columns that CREATE TABLE IF NOT EXISTS can't apply to a pre-existing
// table. Idempotent: only ALTERs when the column is genuinely absent.
function ensureColumn(
  sqlite: Database.Database,
  table: string,
  column: string,
  ddl: string
): void {
  const cols = sqlite.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]
  if (!cols.some((c) => c.name === column)) {
    sqlite.exec(`ALTER TABLE ${table} ADD COLUMN ${ddl}`)
  }
}

function runMigrations(sqlite: Database.Database): void {
  ensureColumn(sqlite, 'character', 'external_source', 'external_source TEXT')
  ensureColumn(sqlite, 'character', 'external_id', 'external_id TEXT')
  ensureColumn(sqlite, 'credit', 'importance', 'importance INTEGER')
  ensureColumn(sqlite, 'media_character', 'sort_order', 'sort_order INTEGER')
}

export function initDatabase(): DB {
  if (_db) return _db

  const sqlite = new Database(getDbPath())
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  sqlite.exec(initSql)
  runMigrations(sqlite)

  const seed = sqlite.prepare(
    'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)'
  )
  const seedMany = sqlite.transaction((rows: [string, string][]) => {
    for (const [k, v] of rows) seed.run(k, v)
  })
  seedMany(Object.entries(DEFAULT_SETTINGS))

  _sqlite = sqlite
  _db = drizzle(sqlite, { schema })
  return _db
}

export function getDb(): DB {
  if (!_db) return initDatabase()
  return _db
}

export function getSqlite(): Database.Database {
  if (!_sqlite) initDatabase()
  return _sqlite!
}

export function closeDatabase(): void {
  _sqlite?.close()
  _sqlite = null
  _db = null
}
