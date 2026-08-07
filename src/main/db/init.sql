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
  -- Absolute path to a game/VN executable ("Play" on the Playtime tab). A
  -- machine-local path like local_dir, so it stays out of exports. Written
  -- only by src/main/gameLaunch.ts — deliberately absent from mediaRepo's
  -- column map.
  exe_path        TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_media_type ON media_item(media_type);
CREATE INDEX IF NOT EXISTS idx_media_external ON media_item(external_source, external_id);

-- One finished play session of a game/VN launched from the app (gameLaunch.ts;
-- sessions under a minute are never recorded). Source of truth for TRACKED
-- time — media_item.progress moves by the delta of the rounded cumulative on
-- each insert (gameLaunchCore.foldedProgress), so hand-entered hours survive.
-- Rows die with the title (CASCADE), the music_play_log lifetime rule.
CREATE TABLE IF NOT EXISTS game_session (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id   INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  started_at TEXT NOT NULL,   -- UTC, like all timestamps
  ended_at   TEXT NOT NULL,   -- UTC
  duration   INTEGER NOT NULL -- seconds of wall-clock process lifetime
);
CREATE INDEX IF NOT EXISTS idx_game_session_media   ON game_session(media_id);
CREATE INDEX IF NOT EXISTS idx_game_session_started ON game_session(started_at);

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
-- favorite is the only PERSONAL column here (the Songs page's heart) — it is
-- wiped on export and preserved by re-imports, like media_item.favorite.
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
  favorite        INTEGER NOT NULL DEFAULT 0,
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

-- media_image — wallpapers + fan art attached to a media item. Files live under
-- pictures.dir (virtual "pictures/" prefix in file_path); rows are personal and
-- stripped on library export (sanitizeSql.cjs). source_url is NULL for images
-- picked from local disk, and is the soft dedupe key for re-downloads.
CREATE TABLE IF NOT EXISTS media_image (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id    INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  kind        TEXT NOT NULL,              -- 'wallpaper' | 'fanart'
  file_path   TEXT NOT NULL,              -- 'pictures/<title folder>/<kind>/<file>'
  source_url  TEXT,
  source      TEXT,                       -- 'wallhaven' | 'tmdb' | 'url' | 'file'
  width       INTEGER,
  height      INTEGER,
  sort_order  INTEGER,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_media_image_media ON media_image(media_id, kind);

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

-- video_file — a locally-playable episode/film of an anime/movie/tv media_item,
-- discovered by scanning the attached folder (media_item.local_dir, reused —
-- an anime row is never also a manga row). file_path is relative to the video
-- library root (settings key video.dir).
--
-- Column groups, deliberately: identity + freshness (file_path/file_mtime/
-- file_size, the rescan fast path), the ffprobe snapshot (all NULL when ffprobe
-- isn't installed — .mp4/.webm still play), then user state that the SCANNER
-- NEVER WRITES so a rescan can't wipe a resume position.
CREATE TABLE IF NOT EXISTS video_file (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id       INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  file_path      TEXT NOT NULL,
  title          TEXT NOT NULL,
  number         REAL,
  season         INTEGER,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  file_mtime     INTEGER,
  file_size      INTEGER,
  duration       REAL,
  width          INTEGER,
  height         INTEGER,
  video_codec    TEXT,
  audio_codec    TEXT,
  container      TEXT,
  playability    TEXT,
  resume_seconds REAL,
  watched_at     TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(media_id, file_path)
);
CREATE INDEX IF NOT EXISTS idx_video_file_media ON video_file(media_id);

-- video_cache — index of remuxed/transcoded playback copies under
-- userData/videocache. A real table rather than reading the directory because
-- eviction needs last_used_at and filesystem atime is unreliable (relatime/
-- noatime mounts). cache_key covers path+mtime+size+plan, so a re-downloaded
-- file or a different audio-track choice produces a different entry.
CREATE TABLE IF NOT EXISTS video_cache (
  cache_key    TEXT PRIMARY KEY,
  file_name    TEXT NOT NULL,
  source_path  TEXT NOT NULL,
  action       TEXT NOT NULL,
  bytes        INTEGER NOT NULL,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  last_used_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_video_cache_used ON video_cache(last_used_at);

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
  -- Mined from the video player: the sentence's audio clipped out of the
  -- source ("jpaudio/mining/…") and the frame it was said on ("media/mining/…").
  audio_path       TEXT,
  image_path       TEXT,
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

-- Speeds the coverage/analyze tier joins (and minedFronts, which predates them).
CREATE INDEX IF NOT EXISTS idx_jp_card_front ON jp_card(front);

-- ---- Series comprehension coverage ----
-- "You know 78% of the words in this series." A scan snapshots only TEXT facts
-- (per-word frequencies, which don't change until the series gains chapters);
-- the known/learning split is recomputed at read time against jp_card, so the
-- score self-updates as the user learns and never needs invalidating.
-- media_id carries NO FK (list_item / jp_card.source_media_id precedent) —
-- reads LEFT JOIN media_item and tolerate deletion.
CREATE TABLE IF NOT EXISTS jp_coverage (
  media_id         INTEGER PRIMARY KEY,
  scanned_at       TEXT NOT NULL DEFAULT (datetime('now')),
  chapters_scanned INTEGER NOT NULL,
  token_count      INTEGER NOT NULL,   -- word-like token occurrences (denominator)
  unique_words     INTEGER NOT NULL    -- distinct base forms seen, pre-noise-filter
);

CREATE TABLE IF NOT EXISTS jp_coverage_word (
  media_id INTEGER NOT NULL,
  word     TEXT NOT NULL,              -- dictionary (base) form
  count    INTEGER NOT NULL,
  PRIMARY KEY (media_id, word)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_jp_coverage_word_word ON jp_coverage_word(word);

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

-- Finished quiz rounds (song quiz + Japanese quiz), for personal bests and
-- history. settings snapshots the round's options as JSON so a best score can
-- show what it was played with.
CREATE TABLE IF NOT EXISTS quiz_session (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  kind         TEXT NOT NULL,                -- QuizKind: 'song' | 'japanese' | … | 'tournament'
  score        INTEGER NOT NULL,
  total        INTEGER NOT NULL,
  best_streak  INTEGER NOT NULL DEFAULT 0,
  settings     TEXT,                         -- JSON snapshot of round options
  played_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_quiz_session_kind ON quiz_session(kind, played_at);

-- ---- Gacha tracker ----
-- Standalone section for live-service gacha games (HSR, FGO, E7, WuWa — the
-- list and per-game kinds/currencies live in src/shared/gacha.ts, so the
-- tables are game-agnostic). Everything here is personal and stripped on
-- library export (sanitizeSql.cjs).

-- One roster entry: a character OR the game's equipment kind (light cone /
-- craft essence / artifact / weapon) — `kind` keys into config unitKinds.
-- element/role are generic facet slots labeled per kind by config. `dupes` is
-- extra copies consumed, 0-based (HSR eidolon/superimpose, FGO NP-1, E7
-- imprint, WuWa sequence/rank) — importers must never write 1-based values.
-- `data` is a JSON escape hatch for per-game detail phases; owned defaults 1
-- for manual entry — future catalog importers MUST bind owned explicitly (0).
CREATE TABLE IF NOT EXISTS gacha_unit (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  game            TEXT NOT NULL,
  kind            TEXT NOT NULL,
  name            TEXT NOT NULL,
  rarity          INTEGER,
  element         TEXT,
  role            TEXT,
  image_path      TEXT,
  owned           INTEGER NOT NULL DEFAULT 1,
  favorite        INTEGER NOT NULL DEFAULT 0,
  level           INTEGER,
  dupes           INTEGER NOT NULL DEFAULT 0,
  obtained_at     TEXT,
  notes           TEXT,
  data            TEXT,
  external_source TEXT,
  external_id     TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_unit_game ON gacha_unit(game, kind);
-- Unique now so future catalog importers can ON CONFLICT-upsert. Manual rows
-- (NULL externals) stay unconstrained — SQLite treats NULLs as distinct
-- (theme_song precedent). kind is part of the key: FGO servant and craft
-- essence ids share one numeric range.
CREATE UNIQUE INDEX IF NOT EXISTS idx_gacha_unit_external
  ON gacha_unit(game, kind, external_source, external_id);

-- Saved builds per unit. FGO (buildMode 'levelOnly') never shows these.
-- `data` is freeform JSON this phase; detail phases give it structure (e.g.
-- E7 gear-piece id arrays — FK-less JSON refs per app convention).
CREATE TABLE IF NOT EXISTS gacha_build (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_id     INTEGER NOT NULL REFERENCES gacha_unit(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  data        TEXT,
  notes       TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_build_unit ON gacha_build(unit_id);

-- Current premium-currency amounts, edited inline on the game page. Keys come
-- from config; currencies without a row display as 0. The UNIQUE's auto-index
-- also serves the per-game list query (leading `game` column).
CREATE TABLE IF NOT EXISTS gacha_currency (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  game        TEXT NOT NULL,
  key         TEXT NOT NULL,
  amount      INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(game, key)
);

-- Banner schedule, manually entered this phase (per-game fetchers arrive with
-- detail phases; external_source/external_id are their future dedupe key).
-- Dates are 'YYYY-MM-DD' TEXT; start NULL while unannounced, end NULL when
-- open-ended.
CREATE TABLE IF NOT EXISTS gacha_banner (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  game            TEXT NOT NULL,
  name            TEXT NOT NULL,
  kind            TEXT,
  featured        TEXT,
  start_at        TEXT,
  end_at          TEXT,
  image_path      TEXT,
  notes           TEXT,
  external_source TEXT,
  external_id     TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_banner_game ON gacha_banner(game, start_at);

-- Fetched-on-demand news: the game's subreddit hot feed (Atom RSS — Reddit's
-- JSON API 403s unauthenticated clients), only via the Fetch button — never
-- automatic. A fetch REPLACES the game's rows (hot feeds churn; the tab always
-- mirrors the latest fetch); sort_order preserves the feed's hot ranking.
-- image_url stays REMOTE (renderer CSP img-src allows https:) — news is
-- ephemeral, not worth media/ disk. external_id = reddit post id (t3_…).
-- author/sort_order arrived after first ship → ensureColumn in connection.ts.
CREATE TABLE IF NOT EXISTS gacha_news (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  game          TEXT NOT NULL,
  title         TEXT NOT NULL,
  url           TEXT,
  summary       TEXT,
  image_url     TEXT,
  published_at  TEXT,
  author        TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  external_id   TEXT NOT NULL,
  fetched_at    TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(game, external_id)
);
CREATE INDEX IF NOT EXISTS idx_gacha_news_game ON gacha_news(game, published_at);

-- Per-game key/value scratch (news.fetchedAt stamp now; pity counters later).
CREATE TABLE IF NOT EXISTS gacha_meta (
  game        TEXT NOT NULL,
  key         TEXT NOT NULL,
  value       TEXT NOT NULL,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (game, key)
);

-- ---- Gacha coach (FGO LLM coaching chat) ----
-- The AI coach for a gacha game (config-gated by GachaGameCfg.coach; FGO only
-- for now). All rows are personal and stripped on library export
-- (sanitizeSql.cjs). LLM calls happen ONLY on explicit user actions (send /
-- import) — everything below renders reminders/history with zero API calls.

-- One chat thread per game (archived_at NULL = the active thread). "New
-- conversation" archives the current one and starts fresh.
CREATE TABLE IF NOT EXISTS gacha_chat_thread (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  game        TEXT NOT NULL,
  title       TEXT,
  archived_at TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_chat_thread_game ON gacha_chat_thread(game, archived_at);

-- Two rows per turn (one user, one assistant). `text` is the display string;
-- `api_blocks` is the VERBATIM Anthropic content-block array used to replay the
-- conversation (assistant thinking/text blocks passed back unchanged; user rows
-- store text + [screenshot attached] markers — images are never replayed).
-- `actions` = UI chips for tool calls; `attachments` = media/ rel paths.
CREATE TABLE IF NOT EXISTS gacha_chat_message (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id   INTEGER NOT NULL REFERENCES gacha_chat_thread(id) ON DELETE CASCADE,
  role        TEXT NOT NULL,
  text        TEXT,
  api_blocks  TEXT,
  actions     TEXT,
  attachments TEXT,
  usage_in    INTEGER,
  usage_out   INTEGER,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_chat_message_thread ON gacha_chat_message(thread_id, id);

-- Goals + recurring tasks. Reminders render from here (due_at lexical compare,
-- like gacha_banner). Completing a recurring task rolls due_at forward from
-- TODAY instead of closing it.
CREATE TABLE IF NOT EXISTS gacha_goal (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  game        TEXT NOT NULL,
  kind        TEXT NOT NULL DEFAULT 'goal',   -- 'goal' | 'task'
  title       TEXT NOT NULL,
  notes       TEXT,
  status      TEXT NOT NULL DEFAULT 'active',  -- 'active' | 'done' | 'dropped'
  due_at      TEXT,                            -- 'YYYY-MM-DD'
  recur       TEXT,                            -- NULL | 'daily' | 'weekly'
  created_by  TEXT NOT NULL DEFAULT 'user',    -- 'user' | 'coach'
  done_at     TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_goal_game ON gacha_goal(game, status, due_at);

-- Coach long-term memory (server NA/JP, playstyle, spending rules). The coach
-- saves/deletes these via tools; shown in the UI rail.
CREATE TABLE IF NOT EXISTS gacha_coach_note (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  game        TEXT NOT NULL,
  content     TEXT NOT NULL,
  created_by  TEXT NOT NULL DEFAULT 'coach',
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_coach_note_game ON gacha_coach_note(game);

-- Imported prior chats with another LLM. `content` is the raw paste; `summary`
-- is a one-shot LLM digest made at import time (the context block uses the
-- summary, falling back to truncated raw if the digest failed).
CREATE TABLE IF NOT EXISTS gacha_coach_doc (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  game        TEXT NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  summary     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gacha_coach_doc_game ON gacha_coach_doc(game);

-- ---- Daily / weekly checklist ----
-- The CATALOG of possible items lives in src/shared/checklist.ts
-- (GACHA_GAMES-style config); these tables only store which items are enabled
-- and what happened. Weeks run Saturday→Friday; period_key and every "today"
-- decision are computed in MAIN with local dates (the renderer never derives
-- today). Both tables are personal → wiped on export (sanitizeSql.cjs).

CREATE TABLE IF NOT EXISTS checklist_task (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  task_key    TEXT NOT NULL,               -- FROZEN key from shared/checklist.ts
  cadence     TEXT NOT NULL,               -- 'daily' | 'weekly'
  target      INTEGER,                     -- per-board override; NULL = the def's default
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(task_key, cadence)
);

-- One row per manual tick / logged episode / logged movie. Deliberately NO FK
-- to checklist_task (keyed by task_key, so removing + re-adding a task keeps
-- its history) and none on media_id (jp_card.source_media_id precedent — reads
-- LEFT JOIN and tolerate deletion; payload caches the title for display).
-- period_key: the local day for daily rows, the week's Saturday for weekly.
-- payload JSON: {"title": string, "prior": {"progress": number,
-- "status": string|null}} — prior is what undo restores on the media row.
CREATE TABLE IF NOT EXISTS checklist_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  task_key    TEXT NOT NULL,
  cadence     TEXT NOT NULL,
  period_key  TEXT NOT NULL,
  media_id    INTEGER,
  payload     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_checklist_log_task
  ON checklist_log(task_key, cadence, period_key);

-- ---- English words (saved list = the SRS deck) ----
-- One row per saved (word, chosen definition) from the English dictionary
-- page / video mining / vocab-quiz misses. Since 2026-08 every saved word IS
-- an SRS card (status 'new' until first review) — the deck for
-- /english/review. Personal → wiped on export (sanitizeSql.cjs).
CREATE TABLE IF NOT EXISTS en_word (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  word        TEXT NOT NULL,
  phonetic    TEXT,                          -- IPA, e.g. /ˈsʌn.sɛt/
  pos         TEXT,                          -- part of speech of the chosen sense
  meaning     TEXT NOT NULL,                 -- the one definition the user chose
  example     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  -- SRS state; written only by submitReview (see src/shared/srs.ts).
  -- Added post-ship → every column here needs its ensureColumn (connection.ts).
  status           TEXT NOT NULL DEFAULT 'new',
  learning_step    INTEGER NOT NULL DEFAULT 0,
  due_at           TEXT,
  interval_days    REAL NOT NULL DEFAULT 0,
  ease             REAL NOT NULL DEFAULT 2.5,
  reps             INTEGER NOT NULL DEFAULT 0,
  lapses           INTEGER NOT NULL DEFAULT 0,
  last_reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_en_word_word ON en_word(word);
-- idx_en_word_due lives in connection.ts:runMigrations, NOT here. Its columns
-- (status, due_at) are ensureColumn migrations, and init.sql runs BEFORE
-- migrations — so on a live DB whose en_word predates the SRS columns, creating
-- the index here crashes the whole app at startup ("no such column: status";
-- the 0.x English-SRS release shipped exactly that). Rule: an index may only
-- live in this file if every column it touches is in the CREATE TABLE above it.

CREATE TABLE IF NOT EXISTS en_review_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id       INTEGER NOT NULL REFERENCES en_word(id) ON DELETE CASCADE,
  grade         TEXT NOT NULL,
  reviewed_at   TEXT NOT NULL DEFAULT (datetime('now')),
  interval_days REAL NOT NULL,
  ease          REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_en_review_log_word ON en_review_log(word_id);
CREATE INDEX IF NOT EXISTS idx_en_review_log_time ON en_review_log(reviewed_at);

-- ---- English writing practice ----
-- One row per graded submission (/english/writing). Prompt CONTENT is code
-- (src/shared/english/writingPrompts.ts); prompt_title is cached so history
-- survives prompt removal. feedback = JSON EnWritingFeedback (shared/types),
-- score = mean of its four rubric scores. Personal → wiped on export.
CREATE TABLE IF NOT EXISTS en_writing (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt_key   TEXT NOT NULL,
  prompt_title TEXT NOT NULL,
  submission   TEXT NOT NULL,
  feedback     TEXT NOT NULL,
  score        REAL,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_en_writing_time ON en_writing(created_at);

-- ---- Programming learn section ----
-- Course/lesson CONTENT is code (src/shared/programming/, the checklist.ts
-- idiom) so app updates update it; only completion lives here. lesson_key is
-- the FROZEN '<courseKey>/<lessonKey>' string. Personal → wiped on export.
CREATE TABLE IF NOT EXISTS prog_progress (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_key   TEXT NOT NULL UNIQUE,
  completed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ---- Ghost reviews (Bunpro-style echoes of lapsed cards) ----
-- A review-state card graded Again spawns a ghost: the same card must be
-- answered correctly `remaining` more times in FUTURE sessions, independent of
-- its real SM-2 state. No FK (house style) — removeCard/resetCard clean up,
-- removeLesson/removeCourse sweep orphans, and ghostQueue JOINs jp_card so an
-- orphan never serves. Personal → wiped on export (sanitizeSql.cjs).
CREATE TABLE IF NOT EXISTS jp_ghost (
  card_id    INTEGER PRIMARY KEY,
  remaining  INTEGER NOT NULL DEFAULT 3,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
