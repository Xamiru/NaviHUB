// Schema of the offline games-catalog pack (rawg-catalog.db). Zero imports on
// purpose: the pack is BUILT by scripts/build-games-catalog.cjs (which embeds
// a copy of this DDL — tests/gamesCatalog.test.ts drift-guards the two) and
// only READ by the app, so this constant exists for the drift guard and for
// tests to construct in-memory packs.
//
// catalog_fts is contentless with rowid = game id; `alt` carries the joined
// alternative names so "GTA 5" finds Grand Theft Auto V.
export const CATALOG_DDL = `
CREATE TABLE IF NOT EXISTS catalog_meta (key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS catalog_game (
  id            INTEGER PRIMARY KEY,  -- RAWG id: media dedup key ('rawg', id)
  name          TEXT NOT NULL,
  name_original TEXT,
  released      TEXT,
  image_url     TEXT,
  rating        REAL,
  ratings_count INTEGER,
  added         INTEGER NOT NULL DEFAULT 0,  -- RAWG popularity: the search rank
  metacritic    INTEGER,
  playtime      INTEGER,                     -- RAWG avg hours: length fallback
  platforms     TEXT,                        -- JSON array of platform slugs
  developers    TEXT,                        -- JSON [{id,name}]
  publishers    TEXT,                        -- JSON [{id,name}]
  genres        TEXT,                        -- JSON array of names
  description   TEXT
);
CREATE VIRTUAL TABLE IF NOT EXISTS catalog_fts USING fts5(name, alt, content='');
`
