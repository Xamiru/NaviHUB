-- NaviHUB schema. Idempotent: safe to run on every startup.
-- Mirrors src/main/db/schema.ts (Drizzle) — keep the two in sync.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS media_item (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  media_type      TEXT NOT NULL,
  title           TEXT NOT NULL,
  title_original  TEXT,
  synopsis        TEXT,
  cover_path      TEXT,
  release_date    TEXT,
  total_units     INTEGER,
  status          TEXT,
  score           REAL,
  progress        INTEGER NOT NULL DEFAULT 0,
  started_at      TEXT,
  finished_at     TEXT,
  rewatch_count   INTEGER NOT NULL DEFAULT 0,
  notes           TEXT,
  favorite        INTEGER NOT NULL DEFAULT 0,
  metadata        TEXT,
  external_source TEXT,
  external_id     TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_media_type ON media_item(media_type);
CREATE INDEX IF NOT EXISTS idx_media_external ON media_item(external_source, external_id);

CREATE TABLE IF NOT EXISTS person (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  name_native     TEXT,
  photo_path      TEXT,
  bio             TEXT,
  birthday        TEXT,
  external_source TEXT,
  external_id     TEXT
);
CREATE INDEX IF NOT EXISTS idx_person_name ON person(name);

CREATE TABLE IF NOT EXISTS company (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  name_native     TEXT,
  type            TEXT NOT NULL DEFAULT 'studio',
  logo_path       TEXT,
  external_source TEXT,
  external_id     TEXT
);
CREATE INDEX IF NOT EXISTS idx_company_name ON company(name);

CREATE TABLE IF NOT EXISTS character (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  name_native     TEXT,
  image_path      TEXT,
  description     TEXT,
  external_source TEXT,
  external_id     TEXT
);
CREATE INDEX IF NOT EXISTS idx_character_name ON character(name);

CREATE TABLE IF NOT EXISTS credit (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id      INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  person_id     INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
  character_id  INTEGER REFERENCES character(id) ON DELETE SET NULL,
  role          TEXT NOT NULL DEFAULT 'voice_actor',
  language      TEXT,
  importance    INTEGER
);
CREATE INDEX IF NOT EXISTS idx_credit_media ON credit(media_id);
CREATE INDEX IF NOT EXISTS idx_credit_person ON credit(person_id);
CREATE INDEX IF NOT EXISTS idx_credit_character ON credit(character_id);

CREATE TABLE IF NOT EXISTS media_company (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id    INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  company_id  INTEGER NOT NULL REFERENCES company(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'animation_studio',
  UNIQUE(media_id, company_id, role)
);
CREATE INDEX IF NOT EXISTS idx_mc_media ON media_company(media_id);
CREATE INDEX IF NOT EXISTS idx_mc_company ON media_company(company_id);

CREATE TABLE IF NOT EXISTS media_character (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id      INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  character_id  INTEGER NOT NULL REFERENCES character(id) ON DELETE CASCADE,
  sort_order    INTEGER,
  UNIQUE(media_id, character_id)
);

CREATE TABLE IF NOT EXISTS tag (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  category  TEXT,
  UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS media_tag (
  media_id  INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  tag_id    INTEGER NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
  UNIQUE(media_id, tag_id)
);

CREATE TABLE IF NOT EXISTS settings (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);

-- theme_song — an anime's opening/ending songs (from AnimeThemes.moe).
-- audio_url is the remote .ogg; audio_path is the locally-downloaded copy (if any).
CREATE TABLE IF NOT EXISTS theme_song (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id        INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  slug            TEXT,
  type            TEXT,
  sequence        INTEGER,
  title           TEXT,
  audio_url       TEXT,
  audio_path      TEXT,
  sort_order      INTEGER,
  external_source TEXT,
  external_id     TEXT,
  UNIQUE(external_source, external_id)
);
CREATE INDEX IF NOT EXISTS idx_theme_media ON theme_song(media_id);

-- theme_artist — the singer(s)/band(s) who performed a theme song. Artists are
-- stored as person rows (external_source 'animethemes'), so they get the same
-- browse/detail pages as voice actors.
CREATE TABLE IF NOT EXISTS theme_artist (
  theme_song_id INTEGER NOT NULL REFERENCES theme_song(id) ON DELETE CASCADE,
  person_id     INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
  sort_order    INTEGER,
  UNIQUE(theme_song_id, person_id)
);
CREATE INDEX IF NOT EXISTS idx_theme_artist_song ON theme_artist(theme_song_id);
CREATE INDEX IF NOT EXISTS idx_theme_artist_person ON theme_artist(person_id);
