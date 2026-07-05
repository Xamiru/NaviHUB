-- Offline Yomitan dictionaries live in their own SQLite file
-- (userData/dictionaries.db), separate from navihub.db: the data is large,
-- fully rebuildable from the source zips, and carries no personal data, so it
-- stays out of the library export. Bump DICT_SCHEMA_VERSION in dictDb.ts on any
-- incompatible change here — the DB is dropped and recreated, and the user
-- re-imports.

-- Registry of installed dictionaries. `title` (from the zip's index.json) is the
-- replace key: re-importing the same title swaps its rows in place.
CREATE TABLE IF NOT EXISTS dict (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE,
  revision TEXT,
  format INTEGER,
  priority INTEGER NOT NULL DEFAULT 0,
  term_count INTEGER NOT NULL DEFAULT 0,
  kanji_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One term-bank row. reading '' means "same as expression" (Yomitan
-- convention). glossary holds the raw glossary array as JSON text; it is parsed
-- per-result at lookup time (cheap for the <=32 results we ever return).
CREATE TABLE IF NOT EXISTS term (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  expression TEXT NOT NULL,
  reading TEXT NOT NULL DEFAULT '',
  def_tags TEXT,
  rules TEXT,                 -- space-separated deinflection word-types (v1 v5 vs vk adj-i)
  score INTEGER NOT NULL DEFAULT 0,
  glossary TEXT NOT NULL,     -- JSON array of glossary items
  sequence INTEGER,
  term_tags TEXT
);
CREATE INDEX IF NOT EXISTS idx_term_expr ON term(expression);
CREATE INDEX IF NOT EXISTS idx_term_reading ON term(reading);
CREATE INDEX IF NOT EXISTS idx_term_dict ON term(dict_id);

CREATE TABLE IF NOT EXISTS kanji (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  character TEXT NOT NULL,
  onyomi TEXT,                -- space-separated
  kunyomi TEXT,              -- space-separated
  tags TEXT,
  meanings TEXT NOT NULL,     -- JSON array
  stats TEXT                  -- JSON object (grade/strokes/jlpt/freq/...)
);
CREATE INDEX IF NOT EXISTS idx_kanji_char ON kanji(character);
CREATE INDEX IF NOT EXISTS idx_kanji_dict ON kanji(dict_id);

-- Pitch accent from term_meta banks (mode='pitch' only; 'freq' rows are skipped
-- on import). pitches is a JSON array of {position, devoice?, nasal?, tags?}.
CREATE TABLE IF NOT EXISTS pitch (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  expression TEXT NOT NULL,
  reading TEXT NOT NULL DEFAULT '',
  pitches TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pitch_expr ON pitch(expression);
CREATE INDEX IF NOT EXISTS idx_pitch_dict ON pitch(dict_id);

-- Tag definitions (def_tags/term_tags resolve against this per dictionary).
CREATE TABLE IF NOT EXISTS tag (
  dict_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  ord INTEGER,
  notes TEXT,
  score INTEGER,
  PRIMARY KEY (dict_id, name)
) WITHOUT ROWID;

-- English -> Japanese search. Self-contained FTS5 (stores its own copy of the
-- flattened gloss text) so rows delete with a plain WHERE dict_id=? and there is
-- no external-content sync hazard.
CREATE VIRTUAL TABLE IF NOT EXISTS gloss_fts USING fts5(
  gloss,
  term_id UNINDEXED,
  dict_id UNINDEXED,
  tokenize = 'porter unicode61'
);
