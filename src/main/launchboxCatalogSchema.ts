// Schema of the games catalog pack v2 (games-catalog.db, release tag
// games-catalog-2). Zero imports on purpose: the pack is BUILT by
// scripts/build-games-catalog2.cjs (which embeds a copy of this DDL —
// tests/launchboxCatalog.test.ts drift-guards the two) and only READ by the
// app, so this constant exists for the drift guard and for tests that build
// in-memory packs.
//
// A work is one game across platforms: LaunchBox lists every platform release
// as its own entry, and the builder collapses them (same title, close years,
// no platform twice, never across different Wikipedia articles). Its id is the
// smallest member DatabaseID and is the media key ('launchbox', id).
//
// lb_image.rank orders cover candidates: region first (Japan, then North
// America, World, Europe, unmarked), then the member platform's release order.
// lb_xref ties a work to other databases; method is the media_external_link
// vocabulary ('xref' = an id the source states, 'wikidata', 'exact' = unique
// exact title within a year). bgm_person / bgm_character hold only the
// readings and Latin names of the people (cast and staff) and characters of
// linked games.
export const LAUNCHBOX_CATALOG_DDL = `
CREATE TABLE IF NOT EXISTS lb_meta (key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS lb_work (
  id           INTEGER PRIMARY KEY,
  name         TEXT NOT NULL,
  name_ja      TEXT,
  released     TEXT,
  overview     TEXT,
  developers   TEXT,
  publishers   TEXT,
  genres       TEXT,
  platforms    TEXT,
  metacritic   INTEGER,
  popularity   INTEGER NOT NULL DEFAULT 0,
  rating       REAL,
  video_url    TEXT
);
CREATE INDEX IF NOT EXISTS idx_lb_work_popularity ON lb_work(popularity);
CREATE TABLE IF NOT EXISTS lb_member (
  lb_id     INTEGER PRIMARY KEY,
  work_id   INTEGER NOT NULL,
  platform  TEXT
);
CREATE INDEX IF NOT EXISTS idx_lb_member_work ON lb_member(work_id);
CREATE TABLE IF NOT EXISTS lb_image (
  work_id   INTEGER NOT NULL,
  kind      TEXT NOT NULL,
  region    TEXT,
  platform  TEXT,
  file      TEXT NOT NULL,
  rank      INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_lb_image_work ON lb_image(work_id, kind, rank);
CREATE TABLE IF NOT EXISTS lb_xref (
  work_id      INTEGER NOT NULL,
  source       TEXT NOT NULL,
  external_id  TEXT NOT NULL,
  method       TEXT NOT NULL,
  PRIMARY KEY (work_id, source, external_id)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_lb_xref_ext ON lb_xref(source, external_id);
CREATE TABLE IF NOT EXISTS bgm_person (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  kana    TEXT,
  romaji  TEXT
);
CREATE TABLE IF NOT EXISTS bgm_character (
  id       INTEGER PRIMARY KEY,
  romaji   TEXT,
  english  TEXT
);
CREATE VIRTUAL TABLE IF NOT EXISTS lb_fts USING fts5(name, alt, content='');
`
