import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import initSql from './init.sql?raw'
import { seedJapanese } from './japaneseSeed'
import { CHECKLIST_SEED } from '@shared/checklist'
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
  'visual_novel.statuses': JSON.stringify([
    'Playing',
    'Completed',
    'On Hold',
    'Dropped',
    'Plan to Play'
  ]),
  'book.statuses': JSON.stringify(['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read']),
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

// Drops a column that init.sql no longer defines, if a pre-existing DB still
// has it. SQLite (3.35+) supports ALTER TABLE DROP COLUMN; guarded so it only
// runs when the column is actually present.
function dropColumn(sqlite: Database.Database, table: string, column: string): void {
  const cols = sqlite.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]
  if (cols.some((c) => c.name === column)) {
    sqlite.exec(`ALTER TABLE ${table} DROP COLUMN ${column}`)
  }
}

// The checklist starts as a working board rather than an empty page. Gated by
// a settings flag (the seedJapanese pattern) so removing an item in-app sticks
// — and wiped on export, so a recipient's board seeds fresh.
export function seedChecklist(sqlite: Database.Database): void {
  const seeded = sqlite.prepare("SELECT value FROM settings WHERE key = 'checklist.seeded'").get()
  if (seeded) return
  // The checklist shipped before this flag existed, so an established board has
  // no flag — seeding it would silently re-add items the user had removed and
  // renumber the rest from 0. A board with rows has already been set up by
  // definition: adopt it and just record the flag.
  const existing = (
    sqlite.prepare('SELECT COUNT(*) AS n FROM checklist_task').get() as { n: number }
  ).n
  const ins = sqlite.prepare(
    'INSERT OR IGNORE INTO checklist_task (task_key, cadence, sort_order) VALUES (?, ?, ?)'
  )
  const order = { daily: 0, weekly: 0 }
  sqlite.transaction(() => {
    if (existing === 0) {
      for (const item of CHECKLIST_SEED) ins.run(item.key, item.cadence, order[item.cadence]++)
    }
    sqlite
      .prepare("INSERT OR IGNORE INTO settings (key, value) VALUES ('checklist.seeded', '1')")
      .run()
  })()
}

// Exported for tests/initLegacyDb.test.ts, which replays a pre-SRS live DB
// against the real init.sql + migrations.
export function runMigrations(sqlite: Database.Database): void {
  ensureColumn(sqlite, 'character', 'external_source', 'external_source TEXT')
  ensureColumn(sqlite, 'character', 'external_id', 'external_id TEXT')
  ensureColumn(sqlite, 'credit', 'importance', 'importance INTEGER')
  ensureColumn(sqlite, 'media_character', 'sort_order', 'sort_order INTEGER')
  // Japanese section: kanji readings + mined-word source (DBs created before
  // these columns existed in init.sql). Must run before seedJapanese().
  ensureColumn(sqlite, 'jp_card', 'onyomi', 'onyomi TEXT')
  ensureColumn(sqlite, 'jp_card', 'kunyomi', 'kunyomi TEXT')
  ensureColumn(sqlite, 'jp_card', 'source_media_id', 'source_media_id INTEGER')
  // 2026-08: cards mined from the video player carry the sentence's audio and
  // the frame it was said on.
  ensureColumn(sqlite, 'jp_card', 'audio_path', 'audio_path TEXT')
  ensureColumn(sqlite, 'jp_card', 'image_path', 'image_path TEXT')
  ensureColumn(sqlite, 'jp_course', 'level', 'level TEXT')
  ensureColumn(sqlite, 'jp_course', 'difficulty', 'difficulty INTEGER')
  // Manga reader: series folder attached to a manga entry (written only by
  // src/main/manga.ts — deliberately absent from mediaRepo's column map).
  ensureColumn(sqlite, 'media_item', 'local_dir', 'local_dir TEXT')
  // Game/VN launcher: per-title executable (written only by src/main/gameLaunch.ts,
  // same deliberate absence from mediaRepo's column map as local_dir).
  ensureColumn(sqlite, 'media_item', 'exe_path', 'exe_path TEXT')
  // Gacha news moved to subreddit feeds right after first shipping: post
  // author + the feed's hot-rank ordering (DBs from the day-one build lack
  // these columns).
  ensureColumn(sqlite, 'gacha_news', 'author', 'author TEXT')
  ensureColumn(sqlite, 'gacha_news', 'sort_order', 'sort_order INTEGER NOT NULL DEFAULT 0')
  // Theme songs got a personal "favorite" flag with the /anime/songs page;
  // every DB that already imported themes predates it.
  ensureColumn(sqlite, 'theme_song', 'favorite', 'favorite INTEGER NOT NULL DEFAULT 0')
  // Per-board target override arrived one build after the checklist itself.
  ensureColumn(sqlite, 'checklist_task', 'target', 'target INTEGER')
  // English saved words became the /english/review SRS deck (2026-08); every
  // DB with saved words predates the SRS columns.
  ensureColumn(sqlite, 'en_word', 'status', "status TEXT NOT NULL DEFAULT 'new'")
  ensureColumn(sqlite, 'en_word', 'learning_step', 'learning_step INTEGER NOT NULL DEFAULT 0')
  ensureColumn(sqlite, 'en_word', 'due_at', 'due_at TEXT')
  ensureColumn(sqlite, 'en_word', 'interval_days', 'interval_days REAL NOT NULL DEFAULT 0')
  ensureColumn(sqlite, 'en_word', 'ease', 'ease REAL NOT NULL DEFAULT 2.5')
  ensureColumn(sqlite, 'en_word', 'reps', 'reps INTEGER NOT NULL DEFAULT 0')
  ensureColumn(sqlite, 'en_word', 'lapses', 'lapses INTEGER NOT NULL DEFAULT 0')
  ensureColumn(sqlite, 'en_word', 'last_reviewed_at', 'last_reviewed_at TEXT')
  // The review-queue index MUST be created here, after the columns it touches,
  // never in init.sql — init.sql runs first, so on a pre-SRS DB the index would
  // reference columns that don't exist yet and the app dies at startup ("no
  // such column: status"). tests/initLegacyDb.test.ts replays that DB shape.
  sqlite.exec('CREATE INDEX IF NOT EXISTS idx_en_word_due ON en_word(status, due_at)')

  // Movies used to store "times watched" in the generic `progress` column;
  // it's now unified into `rewatch_count` (the universal times-consumed counter)
  // like every other media type. Copy the old value across once, then blank the
  // movie progress. The WHERE guard (progress>0 AND rewatch_count=0) makes this
  // self-idempotent — it can't run twice or clobber a real rewatch_count.
  sqlite.exec(
    `UPDATE media_item SET rewatch_count = progress, progress = 0
     WHERE media_type = 'movie' AND progress > 0 AND rewatch_count = 0`
  )

  // Retired: per-item start/finish dates are no longer tracked. Drop them from
  // any DB that predates their removal so the schema matches init.sql (and the
  // export sanitizer, which no longer references them).
  dropColumn(sqlite, 'media_item', 'started_at')
  dropColumn(sqlite, 'media_item', 'finished_at')
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
  seedJapanese(sqlite)
  seedChecklist(sqlite)

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
  // Fold the WAL back into the main db file and truncate it on exit, so it can't
  // grow unbounded across sessions (it had been larger than the db itself).
  try {
    _sqlite?.pragma('wal_checkpoint(TRUNCATE)')
  } catch {
    // Best-effort: a checkpoint failure must never block a clean shutdown.
  }
  _sqlite?.close()
  _sqlite = null
  _db = null
}
