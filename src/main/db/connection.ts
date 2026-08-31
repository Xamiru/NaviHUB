import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'
import initSql from './init.sql?raw'
import { seedJapanese } from './japaneseSeed'
import { CHECKLIST_SEED } from '@shared/checklist'
import { logInfo } from '../logBus'

let _sqlite: Database.Database | null = null

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
  'score.max': '10'
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
    // Logged only when it GENUINELY altered — on a current DB this whole
    // function is 30 silent no-ops, and a log line per startup would be noise.
    // On an old DB this is the record of what the upgrade actually did.
    logInfo('db', `migration: ALTER TABLE ${table} ADD COLUMN ${ddl}`)
  }
}

// SQLite cannot relax a NOT NULL column, so dropping the constraint means the
// full copy-and-rename dance. Guarded on the current shape, so it runs at most
// once per DB and is a no-op on a fresh install (init.sql already emits the
// nullable form).
function dropNotNull(
  sqlite: Database.Database,
  table: string,
  column: string,
  createNew: string,
  columns: string
): void {
  const cols = sqlite.prepare(`PRAGMA table_info(${table})`).all() as {
    name: string
    notnull: number
  }[]
  const target = cols.find((c) => c.name === column)
  if (!target || target.notnull === 0) return
  sqlite.exec('PRAGMA foreign_keys = OFF')
  sqlite.transaction(() => {
    sqlite.exec(createNew)
    sqlite.exec(`INSERT INTO ${table}__new (${columns}) SELECT ${columns} FROM ${table}`)
    sqlite.exec(`DROP TABLE ${table}`)
    sqlite.exec(`ALTER TABLE ${table}__new RENAME TO ${table}`)
  })()
  sqlite.exec('PRAGMA foreign_keys = ON')
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
  // Spotify entity sources arrived after the music library. The indexes must
  // be created after ALTER TABLE or a pre-feature database cannot start.
  ensureColumn(sqlite, 'music_artist', 'spotify_id', 'spotify_id TEXT')
  ensureColumn(sqlite, 'music_album', 'spotify_id', 'spotify_id TEXT')
  sqlite
    .prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_music_artist_spotify ON music_artist(spotify_id)')
    .run()
  sqlite
    .prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_music_album_spotify ON music_album(spotify_id)')
    .run()
  ensureColumn(sqlite, 'character', 'external_source', 'external_source TEXT')
  ensureColumn(sqlite, 'character', 'external_id', 'external_id TEXT')
  // AniList character gender powers plausible same-VA quiz distractors. Old
  // rows remain NULL until their anime is re-imported.
  ensureColumn(sqlite, 'character', 'gender', 'gender TEXT')
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
  // 2026-08: wide hero art for the detail page (AniList bannerImage / TMDB
  // backdrop). Every pre-existing row has it NULL until re-imported, which is
  // why the hero resolves through media_image and the cover before giving up.
  ensureColumn(sqlite, 'media_item', 'banner_path', 'banner_path TEXT')
  // 2026-08: chapter/volume thumbnails for the Volumes grid. Fills in on the
  // next rescan of an already-attached series.
  ensureColumn(sqlite, 'manga_chapter', 'cover_path', 'cover_path TEXT')
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
  // 2026-08-17: the Art tab's "Set background" flag. media_image predates it.
  // No index on this column — an index in init.sql would run BEFORE this ALTER.
  ensureColumn(sqlite, 'media_image', 'is_background', 'is_background INTEGER NOT NULL DEFAULT 0')
  // Shipped one build after the wrestling section, so live DBs already have the
  // table without it.
  ensureColumn(sqlite, 'wrestling_match', 'method', 'method TEXT')
  // Loose matches (a standalone rip with no PPV behind it) need these; the
  // tables shipped before the feature, so both need the migration.
  ensureColumn(sqlite, 'wrestling_match', 'show_label', 'show_label TEXT')
  ensureColumn(sqlite, 'wrestling_match', 'match_date', 'match_date TEXT')
  dropNotNull(
    sqlite,
    'wrestling_match',
    'event_id',
    `CREATE TABLE wrestling_match__new (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       event_id INTEGER REFERENCES wrestling_event(id) ON DELETE CASCADE,
       show_label TEXT, match_date TEXT,
       sort_order INTEGER NOT NULL DEFAULT 0, title TEXT NOT NULL,
       result_text TEXT, stipulation TEXT, championship TEXT,
       duration_seconds INTEGER, outcome TEXT NOT NULL DEFAULT 'unknown',
       method TEXT, card_slot TEXT, card_label TEXT, rating REAL,
       favorite INTEGER NOT NULL DEFAULT 0, video_id INTEGER,
       created_at TEXT NOT NULL DEFAULT (datetime('now')),
       updated_at TEXT NOT NULL DEFAULT (datetime('now'))
     )`,
    `id, event_id, show_label, match_date, sort_order, title, result_text,
     stipulation, championship, duration_seconds, outcome, method, card_slot,
     card_label, rating, favorite, video_id, created_at, updated_at`
  )
  dropNotNull(
    sqlite,
    'wrestling_video',
    'event_id',
    `CREATE TABLE wrestling_video__new (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       event_id INTEGER REFERENCES wrestling_event(id) ON DELETE CASCADE,
       file_path TEXT NOT NULL, title TEXT NOT NULL, number REAL, season INTEGER,
       sort_order INTEGER NOT NULL DEFAULT 0, file_mtime INTEGER, file_size INTEGER,
       duration REAL, width INTEGER, height INTEGER, video_codec TEXT,
       audio_codec TEXT, container TEXT, playability TEXT, resume_seconds REAL,
       watched_at TEXT,
       created_at TEXT NOT NULL DEFAULT (datetime('now')),
       updated_at TEXT NOT NULL DEFAULT (datetime('now')),
       UNIQUE(event_id, file_path)
     )`,
    `id, event_id, file_path, title, number, season, sort_order, file_mtime,
     file_size, duration, width, height, video_codec, audio_codec, container,
     playability, resume_seconds, watched_at, created_at, updated_at`
  )
  // The review-queue index MUST be created here, after the columns it touches,
  // never in init.sql — init.sql runs first, so on a pre-SRS DB the index would
  // reference columns that don't exist yet and the app dies at startup ("no
  // such column: status"). tests/initLegacyDb.test.ts replays that DB shape.
  sqlite.exec('CREATE INDEX IF NOT EXISTS idx_en_word_due ON en_word(status, due_at)')

  // init.sql creates the FTS table and its maintenance triggers on both fresh
  // and old databases. Existing entity rows predate those triggers, so rebuild
  // once when the projection count proves it is incomplete.
  const sourceCount = (
    sqlite
      .prepare(
        `SELECT
          (SELECT COUNT(*) FROM media_item) +
          (SELECT COUNT(*) FROM person) +
          (SELECT COUNT(*) FROM company) +
          (SELECT COUNT(*) FROM character) AS n`
      )
      .get() as { n: number }
  ).n
  const indexedCount = (
    sqlite.prepare('SELECT COUNT(*) AS n FROM global_search_fts').get() as { n: number }
  ).n
  if (sourceCount !== indexedCount) {
    sqlite.transaction(() => {
      sqlite.prepare('DELETE FROM global_search_fts').run()
      sqlite
        .prepare(
          `INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
           SELECT 'media', id, title, title_original FROM media_item`
        )
        .run()
      sqlite
        .prepare(
          `INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
           SELECT 'person', id, name, name_native FROM person`
        )
        .run()
      sqlite
        .prepare(
          `INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
           SELECT 'company', id, name, name_native FROM company`
        )
        .run()
      sqlite
        .prepare(
          `INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
           SELECT 'character', id, name, name_native FROM character`
        )
        .run()
    })()
  }

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

export function initDatabase(): Database.Database {
  if (_sqlite) return _sqlite

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
  return sqlite
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
}
