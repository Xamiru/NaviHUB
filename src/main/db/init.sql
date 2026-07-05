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
  -- Universal "times consumed" counter (watched/read/played), per media type.
  rewatch_count   INTEGER NOT NULL DEFAULT 0,
  notes           TEXT,
  favorite        INTEGER NOT NULL DEFAULT 0,
  metadata        TEXT,
  external_source TEXT,
  external_id     TEXT,
  local_dir       TEXT,
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
-- media_id lookups are already served by the UNIQUE(media_id, character_id)
-- auto-index; only the reverse direction (character detail, import prune by
-- character) needs its own index.
CREATE INDEX IF NOT EXISTS idx_media_character_character ON media_character(character_id);

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
-- media_id lookups (and the media_id+tag_id EXISTS filter) are served by the
-- UNIQUE(media_id, tag_id) auto-index; the reverse "all media with tag X" browse
-- needs its own index on tag_id.
CREATE INDEX IF NOT EXISTS idx_media_tag_tag ON media_tag(tag_id);

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

-- media_relation — links between titles: anime seasons (prequel/sequel/side story)
-- and the manga/novel a title was adapted from, captured from AniList at import.
-- Stored by the RELATED work's AniList id (not a local FK) so a link resolves
-- whichever order the two titles are imported; related_title keeps the AniList
-- name so relations not yet in the library can still be shown (greyed).
CREATE TABLE IF NOT EXISTS media_relation (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id             INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  relation_type        TEXT NOT NULL,
  related_source       TEXT NOT NULL,
  related_external_id  TEXT NOT NULL,
  related_type         TEXT,
  related_title        TEXT,
  sort_order           INTEGER,
  UNIQUE(media_id, related_source, related_external_id)
);
CREATE INDEX IF NOT EXISTS idx_media_relation_media ON media_relation(media_id);
CREATE INDEX IF NOT EXISTS idx_media_relation_related
  ON media_relation(related_source, related_external_id);
CREATE INDEX IF NOT EXISTS idx_theme_artist_person ON theme_artist(person_id);

-- list — a user-curated, ordered collection (Letterboxd-style). entity_kind is
-- fixed per list ('media' | 'person' | 'character' | 'company'); ranked toggles
-- visible numbering. Items live in list_item and target the kind's table.
CREATE TABLE IF NOT EXISTS list (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT NOT NULL,
  description  TEXT,
  entity_kind  TEXT NOT NULL,
  ranked       INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_list_kind ON list(entity_kind);

-- list_item — one entry in a list. entity_id points at the row in the table for
-- the list's entity_kind (polymorphic, so no FK); reads resolve/skip missing ids
-- and entity deletes clean up matching rows.
CREATE TABLE IF NOT EXISTS list_item (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  list_id    INTEGER NOT NULL REFERENCES list(id) ON DELETE CASCADE,
  entity_id  INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  note       TEXT,
  added_at   TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(list_id, entity_id)
);
CREATE INDEX IF NOT EXISTS idx_list_item_list ON list_item(list_id);

-- manga_chapter — a locally-readable chapter of a manga media_item, discovered
-- by scanning the series folder (media_item.local_dir). dir_path is relative to
-- the manga library root (settings key manga.dir); '' means the series folder
-- itself holds the pages (flat series = one chapter). Pages are listed from
-- disk at read-time; only the count is cached here.
CREATE TABLE IF NOT EXISTS manga_chapter (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id       INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  dir_path       TEXT NOT NULL,
  title          TEXT NOT NULL,
  number         REAL,
  page_count     INTEGER NOT NULL DEFAULT 0,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  last_read_page INTEGER,
  read_at        TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(media_id, dir_path)
);
CREATE INDEX IF NOT EXISTS idx_manga_chapter_media ON manga_chapter(media_id);

-- ---- Japanese learning ----
-- Standalone section, unrelated to the media tables. Courses hold ordered
-- lessons; a lesson is 'grammar' (body = explanation, cards = example
-- sentences), 'vocab' (cards = vocabulary entries) or 'kanji' (cards =
-- characters with on/kun readings + an example word). Cards carry their own
-- SRS scheduling state inline (single user, strictly 1:1); only learned
-- lessons' cards surface in reviews and quizzes.

-- level is a display label ("N5", "N4–N3"); difficulty is the recommended
-- study-order step (1 = start here) — course lists sort by it, nulls last.
CREATE TABLE IF NOT EXISTS jp_course (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT,
  level       TEXT,
  difficulty  INTEGER,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jp_lesson (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id   INTEGER NOT NULL REFERENCES jp_course(id) ON DELETE CASCADE,
  kind        TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  learned     INTEGER NOT NULL DEFAULT 0,
  learned_at  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_jp_lesson_course ON jp_lesson(course_id);

-- vocab card:   front=term, reading=kana, back=meaning (+pos, example_*)
-- grammar card: front=JP sentence, reading=kana, back=translation
-- kanji card:   front=character, reading=primary reading, back=meaning,
--               onyomi/kunyomi=comma-separated readings, example_*=example word
-- source_media_id: mined cards remember the manga/VN they came from
-- (media_item.id, no FK — reads LEFT JOIN and tolerate deletion).
CREATE TABLE IF NOT EXISTS jp_card (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id        INTEGER NOT NULL REFERENCES jp_lesson(id) ON DELETE CASCADE,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  front            TEXT NOT NULL,
  reading          TEXT,
  back             TEXT NOT NULL,
  pos              TEXT,
  notes            TEXT,
  example_jp       TEXT,
  example_reading  TEXT,
  example_en       TEXT,
  onyomi           TEXT,
  kunyomi          TEXT,
  source_media_id  INTEGER,
  -- SRS state; written only by submitReview (see src/shared/srs.ts)
  status           TEXT NOT NULL DEFAULT 'new',
  learning_step    INTEGER NOT NULL DEFAULT 0,
  due_at           TEXT,
  interval_days    REAL NOT NULL DEFAULT 0,
  ease             REAL NOT NULL DEFAULT 2.5,
  reps             INTEGER NOT NULL DEFAULT 0,
  lapses           INTEGER NOT NULL DEFAULT 0,
  last_reviewed_at TEXT,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_jp_card_lesson ON jp_card(lesson_id);
CREATE INDEX IF NOT EXISTS idx_jp_card_due ON jp_card(status, due_at);

CREATE TABLE IF NOT EXISTS jp_review_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id       INTEGER NOT NULL REFERENCES jp_card(id) ON DELETE CASCADE,
  grade         TEXT NOT NULL,
  reviewed_at   TEXT NOT NULL DEFAULT (datetime('now')),
  interval_days REAL NOT NULL,
  ease          REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_jp_review_log_card ON jp_review_log(card_id);
CREATE INDEX IF NOT EXISTS idx_jp_review_log_time ON jp_review_log(reviewed_at);

-- ---- Music library ----
-- Standalone local-music section (fully separate from media_item / person —
-- anime OP/EDs stay in theme_song). Rows are created/updated ONLY by the
-- scanner (src/main/music.ts); identity is the path relative to the music root
-- (settings key music.dir), so rescans upsert in place and preserve user state
-- (liked_at, play_count, playlist membership). A moved/renamed file is a new
-- row (old state is lost — accepted for now).

CREATE TABLE IF NOT EXISTS music_artist (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,            -- folder name (authoritative)
  dir_path        TEXT NOT NULL,            -- "Radiohead"
  cover_path      TEXT,                     -- filled by the online-art fetcher (media/…)
  art_checked_at  TEXT,                     -- last online-art attempt (found or not)
  art_source_url  TEXT,                     -- provenance of the fetched image
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(dir_path)
);
CREATE INDEX IF NOT EXISTS idx_music_artist_name ON music_artist(name);

CREATE TABLE IF NOT EXISTS music_album (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  artist_id       INTEGER NOT NULL REFERENCES music_artist(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,            -- folder name (authoritative)
  dir_path        TEXT NOT NULL,            -- "Radiohead/OK Computer"; equals the artist
                                            -- dir for the synthetic "Singles" album
  year            INTEGER,                  -- from tags (first track that has one)
  cover_path      TEXT,                     -- "music/<dir>/cover.jpg" (folder art) |
                                            -- "media/music-covers/<hash>" (embedded, extracted)
                                            -- | "media/dl-<hash>" (online) | NULL
  art_checked_at  TEXT,
  art_source_url  TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(dir_path)
);
CREATE INDEX IF NOT EXISTS idx_music_album_artist ON music_album(artist_id);
CREATE INDEX IF NOT EXISTS idx_music_album_title ON music_album(title);

CREATE TABLE IF NOT EXISTS music_track (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id        INTEGER NOT NULL REFERENCES music_album(id) ON DELETE CASCADE,
  -- denormalized: track lists & search never need a double join
  artist_id       INTEGER NOT NULL REFERENCES music_artist(id) ON DELETE CASCADE,
  file_path       TEXT NOT NULL,            -- "Radiohead/OK Computer/01 Airbag.mp3"
  file_mtime      INTEGER,                  -- ms; rescan skips tag-parsing unchanged files
  title           TEXT NOT NULL,            -- tag title, else parsed from filename
  track_no        INTEGER,
  disc_no         INTEGER,
  duration        REAL,                     -- seconds (nullable: parse failures still play)
  tag_artist      TEXT,                     -- raw artist tag when it differs from the
                                            -- folder artist (feat./compilations, display-only)
  -- user state: preserved across rescans (the scanner never writes these)
  liked_at        TEXT,                     -- NULL = not liked; doubles as liked-recency sort
  play_count      INTEGER NOT NULL DEFAULT 0,
  last_played_at  TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(file_path)
);
CREATE INDEX IF NOT EXISTS idx_music_track_album  ON music_track(album_id);
CREATE INDEX IF NOT EXISTS idx_music_track_artist ON music_track(artist_id);
CREATE INDEX IF NOT EXISTS idx_music_track_title  ON music_track(title);
CREATE INDEX IF NOT EXISTS idx_music_track_liked  ON music_track(liked_at);
CREATE INDEX IF NOT EXISTS idx_music_track_played ON music_track(last_played_at);

CREATE TABLE IF NOT EXISTS music_playlist (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT NOT NULL,
  description  TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS music_playlist_track (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  playlist_id  INTEGER NOT NULL REFERENCES music_playlist(id) ON DELETE CASCADE,
  track_id     INTEGER NOT NULL REFERENCES music_track(id) ON DELETE CASCADE,
  position     INTEGER NOT NULL DEFAULT 0,
  added_at     TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(playlist_id, track_id)             -- no duplicate tracks per playlist
);
CREATE INDEX IF NOT EXISTS idx_music_playlist_track_track ON music_playlist_track(track_id);

-- Append-only play log (one row per counted play — the same 10s rule as
-- play_count, see MusicPlayLogger). duration snapshots the track length at
-- play time so listening-time math survives later re-tags. Rows die with the
-- track (CASCADE) — deliberately the same lifetime as play_count: a log that
-- outlived its track would make period totals disagree with every visible list.
CREATE TABLE IF NOT EXISTS music_play_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  track_id   INTEGER NOT NULL REFERENCES music_track(id) ON DELETE CASCADE,
  played_at  TEXT NOT NULL DEFAULT (datetime('now')),  -- UTC, like all timestamps
  duration   REAL                                      -- seconds; NULL if the track had none
);
CREATE INDEX IF NOT EXISTS idx_music_play_log_track  ON music_play_log(track_id);
CREATE INDEX IF NOT EXISTS idx_music_play_log_played ON music_play_log(played_at);
