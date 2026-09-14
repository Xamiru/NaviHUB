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
  -- Wide hero art for the detail page (AniList bannerImage / TMDB backdrop),
  -- content-addressed under media/ like cover_path. Canonical, not personal —
  -- it survives export. NULL until the title is (re-)imported; the detail page
  -- falls back to a media_image row, then to a blurred cover.
  banner_path     TEXT,
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

-- ---- Achievements ----
-- Opt-in per title: one row here means "this game is tracked". Written when the
-- user picks a provider and it is NEVER auto-created, so its existence is also
-- the durable "this title was launchable once" marker — exe_path is nulled by
-- games:clearExe and keeps no history, so eligibility is
-- (exe_path IS NOT NULL) OR (a game_session row) OR (a row here).
--
-- provider/provider_game_id are frozen key strings: 'steam' + appid (prefilled
-- from external_id for Steam-imported rows, otherwise resolved through the
-- keyless storefront search) or 'ra' + a RetroAchievements game id.
CREATE TABLE IF NOT EXISTS achievement_game (
  media_id          INTEGER PRIMARY KEY REFERENCES media_item(id) ON DELETE CASCADE,
  provider          TEXT NOT NULL,   -- 'steam' | 'ra'
  provider_game_id  TEXT NOT NULL,   -- Steam appid, or RA game id
  schema_fetched_at TEXT,            -- UTC; NULL = associated but not fetched yet
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The achievement set itself: canonical provider data (the theme_song posture —
-- survives an export). A re-fetch is authoritative for these columns and prunes
-- achievements the provider dropped, but UNIQUE(media_id, api_name) keeps ids
-- stable so unlocks below survive it.
CREATE TABLE IF NOT EXISTS achievement (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id       INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  api_name       TEXT NOT NULL,   -- Steam apiname / RA achievement id as text
  name           TEXT NOT NULL,
  description    TEXT,
  hidden         INTEGER NOT NULL DEFAULT 0,
  icon_path      TEXT,            -- media/dl-… relative, unlocked art
  icon_gray_path TEXT,            -- media/dl-… relative, locked art
  points         INTEGER,         -- RA only; NULL for Steam (no invented score)
  global_pct     REAL,            -- global unlock %, drives the rarity tier
  sort_order     INTEGER NOT NULL DEFAULT 0,
  UNIQUE(media_id, api_name)
);
CREATE INDEX IF NOT EXISTS idx_achievement_media ON achievement(media_id);

-- One row per UNLOCKED achievement (absence = locked), so the table doubles as
-- the unlocked set. Personal → dropped on export. source is a frozen key
-- string: 'emu' (parsed out of a Steam emulator's save file), 'ra', 'manual'.
-- Re-imports keep the EARLIEST timestamp: an emu file rewritten with a fresh
-- date must not relabel a years-old unlock.
CREATE TABLE IF NOT EXISTS achievement_unlock (
  achievement_id INTEGER PRIMARY KEY REFERENCES achievement(id) ON DELETE CASCADE,
  unlocked_at    TEXT NOT NULL,   -- UTC
  source         TEXT NOT NULL    -- 'emu' | 'ra' | 'manual'
);
CREATE INDEX IF NOT EXISTS idx_achievement_unlock_time ON achievement_unlock(unlocked_at);

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
  gender          TEXT,
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
  -- 1 = this image is the item's detail-page backdrop (Art tab right-click
  -- "Set background"). At most one per media_id, enforced by
  -- pictures.setBackground; personal, wiped with the table on export.
  is_background INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_media_image_media ON media_image(media_id, kind);

-- slideshow_item — Art-tab images the user pushed into the Windows desktop
-- slideshow folder (setting slideshow.dir, default <pictures.dir>/Slideshow).
-- NaviHUB only COPIES the file there; the user points Windows Personalization >
-- Background > Slideshow at the folder once and the OS does the rotating.
-- file_name is the copy's name inside that folder — not a navimg path, the copy
-- is never served by the app. Personal; wiped on export.
CREATE TABLE IF NOT EXISTS slideshow_item (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  image_id   INTEGER NOT NULL UNIQUE REFERENCES media_image(id) ON DELETE CASCADE,
  file_name  TEXT NOT NULL,
  added_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- tv_episode — the EPISODE CATALOGUE for a TV show, from TMDB. Distinct from
-- video_file, which indexes episodes you have on disk: a row here exists whether
-- or not the file does, and the detail page's season grid joins the two so an
-- episode you own gets a Play button.
--
-- Specials (TMDB season 0) are deliberately skipped: `absolute` has to agree
-- with media_item.total_units (TMDB's number_of_episodes), which excludes them.
--
-- watched_at is the only personal column — the scan/import path NEVER writes it,
-- and re-import COALESCEs it, so refreshing a show cannot wipe what you watched.
-- Stills are not downloaded: a long-running show is hundreds of images, and the
-- grid does not show one.
CREATE TABLE IF NOT EXISTS tv_episode (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id    INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
  season      INTEGER NOT NULL,
  number      INTEGER NOT NULL,
  absolute    INTEGER,                    -- 1-based position across the show
  title       TEXT,
  overview    TEXT,
  air_date    TEXT,
  runtime     INTEGER,                    -- minutes
  watched_at  TEXT,                       -- NULL = unwatched (personal)
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(media_id, season, number)
);
CREATE INDEX IF NOT EXISTS idx_tv_episode_media ON tv_episode(media_id, season, number);

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

-- tier_list — a TierMaker-style board: labeled, colored tier rows plus an
-- unranked pool, filled by dragging covers from one entity kind (the same
-- kinds as `list`). Rows live in tier_row, placements in tier_item.
CREATE TABLE IF NOT EXISTS tier_list (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT NOT NULL,
  description  TEXT,
  entity_kind  TEXT NOT NULL,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tier_list_kind ON tier_list(entity_kind);

-- tier_row — one labeled band of the board. color is a '#rrggbb' hex string.
CREATE TABLE IF NOT EXISTS tier_row (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  list_id    INTEGER NOT NULL REFERENCES tier_list(id) ON DELETE CASCADE,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#7f7f7f',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_tier_row_list ON tier_row(list_id);

-- tier_item — one cover on the board. row_id NULL = the unranked pool below
-- the tiers; deleting a row drops its items back into the pool (SET NULL),
-- never deletes them. entity_id is polymorphic like list_item's: no FK, reads
-- resolve/skip missing ids and entity deletes clean up matching rows.
CREATE TABLE IF NOT EXISTS tier_item (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  list_id    INTEGER NOT NULL REFERENCES tier_list(id) ON DELETE CASCADE,
  row_id     INTEGER REFERENCES tier_row(id) ON DELETE SET NULL,
  entity_id  INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(list_id, entity_id)
);
CREATE INDEX IF NOT EXISTS idx_tier_item_list ON tier_item(list_id);
CREATE INDEX IF NOT EXISTS idx_tier_item_row ON tier_item(row_id);

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
  -- First page of the chapter/volume as a virtual path ("manga/<dir>/<file>"),
  -- so the Volumes grid has a thumbnail without opening every chapter. Written
  -- by the scanner only; NULL for EPUBs (spine documents are XHTML, not images)
  -- and for rows scanned before this existed, until the next rescan.
  cover_path     TEXT,
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

-- One durable row per completed Tutor day. tasks_json is the evidence snapshot
-- shown at close, not a second source of truth for live SRS/quiz state.
CREATE TABLE IF NOT EXISTS jp_tutor_day (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  day               TEXT NOT NULL UNIQUE,
  phase_id          TEXT NOT NULL,
  started_at        TEXT NOT NULL,
  ended_at          TEXT NOT NULL,
  planned_minutes   INTEGER NOT NULL,
  completed_minutes INTEGER NOT NULL,
  completed_blocks  INTEGER NOT NULL,
  total_blocks      INTEGER NOT NULL,
  strongest         TEXT,
  tomorrow_focus    TEXT NOT NULL,
  tasks_json        TEXT NOT NULL,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_jp_tutor_day_ended ON jp_tutor_day(ended_at);

-- Weak measured results and learner-reported problems form the Tutor's error
-- ledger. Automatic rows carry their quiz-session id so closing a debrief
-- twice cannot duplicate an error. Manual rows deliberately have no source id.
CREATE TABLE IF NOT EXISTS jp_tutor_error (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  day               TEXT NOT NULL,
  skill             TEXT NOT NULL,
  label             TEXT NOT NULL,
  detail            TEXT NOT NULL,
  source_kind       TEXT,
  source_session_id INTEGER,
  score             INTEGER,
  threshold         INTEGER,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at       TEXT,
  UNIQUE(day, skill, label, source_session_id)
);
CREATE INDEX IF NOT EXISTS idx_jp_tutor_error_open ON jp_tutor_error(resolved_at, created_at);

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
  spotify_id      TEXT,                     -- remembered matching Spotify artist
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
  spotify_id      TEXT,                     -- remembered matching Spotify album
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
  spotify_review_required INTEGER NOT NULL DEFAULT 0,
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

-- One explicit Spotify recording choice applies everywhere that Spotify track
-- appears. This prevents a second playlist/import from downloading the same
-- recording after the user already chose a local file.
CREATE TABLE IF NOT EXISTS music_spotify_track_choice (
  spotify_track_id TEXT PRIMARY KEY,
  local_track_id   INTEGER NOT NULL REFERENCES music_track(id) ON DELETE CASCADE,
  chosen_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_track_choice_local
  ON music_spotify_track_choice(local_track_id);

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

-- One-time public Spotify playlist snapshots. Source items deliberately live
-- beside ordinary playlist tracks: imported order/metadata survives missing
-- local files, while manual additions keep the established table and append.
CREATE TABLE IF NOT EXISTS music_spotify_playlist (
  playlist_id  INTEGER PRIMARY KEY REFERENCES music_playlist(id) ON DELETE CASCADE,
  spotify_id   TEXT NOT NULL UNIQUE,
  source_url   TEXT NOT NULL,
  imported_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS music_spotify_playlist_item (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  playlist_id       INTEGER NOT NULL REFERENCES music_playlist(id) ON DELETE CASCADE,
  spotify_track_id  TEXT NOT NULL,
  position          INTEGER NOT NULL,
  title             TEXT NOT NULL,
  artists_json      TEXT NOT NULL,
  primary_artist    TEXT NOT NULL,
  album_artist      TEXT,
  album_title       TEXT NOT NULL,
  duration          REAL,
  cover_path        TEXT,
  spotify_url       TEXT NOT NULL,
  disc_no           INTEGER,
  track_no          INTEGER,
  year              INTEGER,
  raw_json          TEXT NOT NULL,
  audio_source_url  TEXT,
  allow_unverified  INTEGER NOT NULL DEFAULT 0 CHECK(allow_unverified IN (0,1)),
  download_error    TEXT,
  resolved_audio_url TEXT,
  match_confirmed   INTEGER NOT NULL DEFAULT 0,
  download_skipped  INTEGER NOT NULL DEFAULT 0,
  matched_track_id  INTEGER REFERENCES music_track(id) ON DELETE SET NULL,
  added_at          TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(playlist_id, spotify_track_id)
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_item_playlist ON music_spotify_playlist_item(playlist_id);
CREATE INDEX IF NOT EXISTS idx_music_spotify_item_match ON music_spotify_playlist_item(matched_track_id);

-- Persistent artist/album completion snapshots. The fast catalogue index is
-- stored independently from the local scan, while authoritative spotDL rows
-- progressively replace indexed metadata release by release.
CREATE TABLE IF NOT EXISTS music_spotify_entity_snapshot (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  artist_id           INTEGER REFERENCES music_artist(id) ON DELETE CASCADE,
  album_id            INTEGER REFERENCES music_album(id) ON DELETE CASCADE,
  provider            TEXT NOT NULL CHECK(provider IN ('itunes','spotdl')),
  provider_entity_id  TEXT NOT NULL,
  source_name         TEXT NOT NULL,
  catalogue_country   TEXT NOT NULL DEFAULT 'US',
  catalogue_state     TEXT NOT NULL DEFAULT 'complete' CHECK(catalogue_state IN ('complete','partial')),
  refreshed_at        TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK((artist_id IS NULL) <> (album_id IS NULL)),
  UNIQUE(artist_id),
  UNIQUE(album_id)
);

CREATE TABLE IF NOT EXISTS music_spotify_entity_release (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot_id         INTEGER NOT NULL REFERENCES music_spotify_entity_snapshot(id) ON DELETE CASCADE,
  provider_release_id TEXT NOT NULL,
  spotify_album_id    TEXT,
  position            INTEGER NOT NULL DEFAULT 0,
  title               TEXT NOT NULL,
  album_artist        TEXT NOT NULL,
  year                INTEGER,
  album_type          TEXT CHECK(album_type IN ('album','single')),
  metadata_state      TEXT NOT NULL DEFAULT 'indexed' CHECK(metadata_state IN ('indexed','resolved','error')),
  resolution_error    TEXT,
  expected_tracks     INTEGER,
  tracks_loaded       INTEGER NOT NULL DEFAULT 1,
  UNIQUE(snapshot_id, provider_release_id)
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_entity_release_snapshot ON music_spotify_entity_release(snapshot_id);
CREATE INDEX IF NOT EXISTS idx_music_spotify_entity_release_spotify ON music_spotify_entity_release(spotify_album_id);

CREATE TABLE IF NOT EXISTS music_spotify_entity_track (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  release_id          INTEGER NOT NULL REFERENCES music_spotify_entity_release(id) ON DELETE CASCADE,
  provider_track_id   TEXT NOT NULL,
  spotify_track_id    TEXT,
  position            INTEGER NOT NULL DEFAULT 0,
  title               TEXT NOT NULL,
  artists_json        TEXT NOT NULL,
  primary_artist      TEXT NOT NULL,
  album_title         TEXT NOT NULL,
  duration            REAL,
  disc_no             INTEGER,
  track_no            INTEGER,
  spotify_url         TEXT,
  raw_json            TEXT,
  audio_source_url    TEXT,
  allow_unverified    INTEGER NOT NULL DEFAULT 0 CHECK(allow_unverified IN (0,1)),
  download_error      TEXT,
  resolved_audio_url  TEXT,
  match_confirmed     INTEGER NOT NULL DEFAULT 0,
  matched_track_id    INTEGER REFERENCES music_track(id) ON DELETE SET NULL,
  UNIQUE(release_id, provider_track_id)
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_entity_track_release ON music_spotify_entity_track(release_id);
CREATE INDEX IF NOT EXISTS idx_music_spotify_entity_track_match ON music_spotify_entity_track(matched_track_id);

-- A downloaded Spotify source can have a real local file even when the
-- conservative matcher cannot prove that it is the same recording. Keep that
-- relationship separately until the user confirms it; never make an
-- unverified file playable implicitly.
CREATE TABLE IF NOT EXISTS music_spotify_download_candidate (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  playlist_item_id  INTEGER REFERENCES music_spotify_playlist_item(id) ON DELETE CASCADE,
  entity_track_id   INTEGER REFERENCES music_spotify_entity_track(id) ON DELETE CASCADE,
  local_track_id    INTEGER NOT NULL REFERENCES music_track(id) ON DELETE CASCADE,
  provider          TEXT NOT NULL CHECK(provider IN ('youtube-music','youtube','piped','bandcamp','soundcloud','manual')),
  source_url        TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK((playlist_item_id IS NULL) <> (entity_track_id IS NULL)),
  UNIQUE(playlist_item_id),
  UNIQUE(entity_track_id)
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_download_candidate_local
  ON music_spotify_download_candidate(local_track_id);

-- Durable download intent for saved Spotify catalogues and imported playlist
-- snapshots. Runtime task state remains in the task registry; these rows are
-- what make queued, paused, failed and completed work survive app restarts.
CREATE TABLE IF NOT EXISTS music_spotify_download_queue (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  source_kind         TEXT NOT NULL CHECK(source_kind IN ('entity','playlist')),
  snapshot_id         INTEGER REFERENCES music_spotify_entity_snapshot(id) ON DELETE CASCADE,
  playlist_id         INTEGER REFERENCES music_spotify_playlist(playlist_id) ON DELETE CASCADE,
  position            INTEGER NOT NULL DEFAULT 0,
  state               TEXT NOT NULL DEFAULT 'queued'
                      CHECK(state IN ('queued','running','paused','failed','completed')),
  allow_mismatch      INTEGER NOT NULL DEFAULT 0 CHECK(allow_mismatch IN (0,1)),
  continue_after      INTEGER NOT NULL DEFAULT 0 CHECK(continue_after IN (0,1)),
  last_error          TEXT,
  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at          TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at        TEXT,
  CHECK(
    (source_kind = 'entity' AND snapshot_id IS NOT NULL AND playlist_id IS NULL) OR
    (source_kind = 'playlist' AND snapshot_id IS NULL AND playlist_id IS NOT NULL)
  ),
  UNIQUE(snapshot_id),
  UNIQUE(playlist_id)
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_download_queue_order
  ON music_spotify_download_queue(state, position, id);

CREATE TABLE IF NOT EXISTS music_spotify_download_queue_selection (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  queue_id            INTEGER NOT NULL REFERENCES music_spotify_download_queue(id) ON DELETE CASCADE,
  release_id          INTEGER REFERENCES music_spotify_entity_release(id) ON DELETE CASCADE,
  playlist_item_id    INTEGER REFERENCES music_spotify_playlist_item(id) ON DELETE CASCADE,
  position            INTEGER NOT NULL DEFAULT 0,
  CHECK((release_id IS NULL) <> (playlist_item_id IS NULL)),
  UNIQUE(queue_id, release_id),
  UNIQUE(queue_id, playlist_item_id)
);
CREATE INDEX IF NOT EXISTS idx_music_spotify_download_queue_selection_queue
  ON music_spotify_download_queue_selection(queue_id, position, id);

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
-- One row per finished lesson self-check (all questions answered) — attempts
-- precede and outlive "complete", so they are append-only history, not columns
-- on prog_progress. Personal → wiped on export.
CREATE TABLE IF NOT EXISTS prog_attempt (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_key TEXT NOT NULL,
  score      INTEGER NOT NULL,
  total      INTEGER NOT NULL,
  at         TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_prog_attempt_lesson ON prog_attempt(lesson_key);
-- The CLI typing drill's weak-command memory: cmd_key is the FROZEN
-- '<sheetKey>/<answers[0]>' of a cheatsheet entry; misses go up on a miss and
-- down on a first-try hit, rows at 0 are deleted. Personal → wiped on export.
CREATE TABLE IF NOT EXISTS prog_cli_miss (
  cmd_key TEXT PRIMARY KEY,
  misses  INTEGER NOT NULL DEFAULT 0,
  last_at TEXT NOT NULL DEFAULT (datetime('now'))
);
-- Solved sandbox exercises / golf puzzles: kind is FROZEN ('sql' | 'regex'),
-- key is the exercise/puzzle key from the shared content module; best = the
-- numeric record where one exists (regex: shortest pattern length), answer =
-- the accepted SQL / winning pattern. Personal → wiped on export.
CREATE TABLE IF NOT EXISTS prog_solve (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  kind      TEXT NOT NULL,
  key       TEXT NOT NULL,
  best      INTEGER,
  answer    TEXT,
  solved_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(kind, key)
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

-- ---- Wrestling: the wiki ----
-- Reference data imported from Wikipedia (src/main/wrestling/), NOT media_item
-- rows: ~2,500 events would swamp Home strips, global search, stats and facets
-- with things the user never "planned to watch". Promotion vocabulary is code
-- (src/shared/wrestling.ts) and the tables are promotion-agnostic — adding a
-- promotion is one config entry.
--
-- wiki_title is the canonical article title AFTER redirect resolution, which is
-- what makes it a safe dedup key: [[Steve Austin]] and [["Stone Cold" Steve
-- Austin]] both redirect to one page (see wrestling_wrestler_alias).
--
-- Personal columns here are only favorite (+ wrestling_match.rating) and
-- local_dir — all wiped on export; the wiki data itself is not personal.
CREATE TABLE IF NOT EXISTS wrestling_event (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  promotion    TEXT NOT NULL,
  name         TEXT NOT NULL,
  wiki_title   TEXT UNIQUE,
  series       TEXT,
  event_date   TEXT,
  venue        TEXT,
  city         TEXT,
  attendance   INTEGER,
  buyrate      TEXT,
  tagline      TEXT,
  poster_path  TEXT,
  lead         TEXT,
  local_dir    TEXT,
  favorite     INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_wrestling_event_promo ON wrestling_event(promotion, event_date);

-- One row per match on a card. `title` is denormalized ("X vs. Y") because
-- list_item renders entities through a fixed name column, and because match
-- search shouldn't need a three-table join. `outcome` records only whether a
-- winning side exists; the prose detail stays in result_text.
--
-- rating/favorite are the personal layer (0-5 stars, Meltzer style) and survive
-- re-import. video_id is a SOFT link to wrestling_video — no FK, so detaching a
-- folder can't cascade away the wiki row (the list_item / jp_card precedent).
-- event_id is NULLABLE: a LOOSE match is one you own as a standalone rip with
-- no PPV behind it (a Raw main event, a one-off). Modelling it as a match
-- without an event rather than as its own concept means participants, ratings,
-- hearts, lists, wrestler pages and the career record all work on it unchanged.
-- show_label/match_date carry what the event row would otherwise have said.
CREATE TABLE IF NOT EXISTS wrestling_match (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id         INTEGER REFERENCES wrestling_event(id) ON DELETE CASCADE,
  show_label       TEXT,
  match_date       TEXT,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  title            TEXT NOT NULL,
  result_text      TEXT,
  stipulation      TEXT,
  championship     TEXT,
  duration_seconds INTEGER,
  outcome          TEXT NOT NULL DEFAULT 'unknown',
  method           TEXT,
  card_slot        TEXT,
  card_label       TEXT,
  rating           REAL,
  favorite         INTEGER NOT NULL DEFAULT 0,
  video_id         INTEGER,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_wrestling_match_event ON wrestling_match(event_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_wrestling_match_rating ON wrestling_match(rating);

CREATE TABLE IF NOT EXISTS wrestling_wrestler (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL,
  wiki_title        TEXT UNIQUE,
  real_name         TEXT,
  birth_date        TEXT,
  debut_year        INTEGER,
  billed_from       TEXT,
  height            TEXT,
  photo_path        TEXT,
  bio               TEXT,
  detail_fetched_at TEXT,
  favorite          INTEGER NOT NULL DEFAULT 0,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_wrestling_wrestler_name ON wrestling_wrestler(name);

-- The redirect memo, for events AND wrestlers alike. Card links point at
-- whatever title the editor typed ([[Steve Austin]], [["Stone Cold" Steve
-- Austin]], [[Stone Cold Steve Austin]]) and category members are frequently
-- redirects too; the API resolves them with &redirects=1 and every mapping seen
-- is recorded here, so later imports resolve locally without re-asking.
--
-- Deliberately NOT keyed to a wrestler row: an alias is learned BEFORE the row
-- it points at exists (title resolution happens ahead of the write), and event
-- titles need the same memo to make the resume filter work.
CREATE TABLE IF NOT EXISTS wrestling_alias (
  alias_title     TEXT PRIMARY KEY,
  canonical_title TEXT NOT NULL
);

-- Participants of a match. This is the one thing `credit` cannot express:
-- sides and results. side 0 is the winning side when outcome='decision';
-- team_name holds the parenthesised group ("X-Factor", "The Steiner Brothers").
CREATE TABLE IF NOT EXISTS wrestling_match_participant (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id    INTEGER NOT NULL REFERENCES wrestling_match(id) ON DELETE CASCADE,
  wrestler_id INTEGER NOT NULL REFERENCES wrestling_wrestler(id) ON DELETE CASCADE,
  side        INTEGER NOT NULL DEFAULT 0,
  won         INTEGER NOT NULL DEFAULT 0,
  is_champion INTEGER NOT NULL DEFAULT 0,
  team_name   TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_wrestling_participant_match ON wrestling_match_participant(match_id);
CREATE INDEX IF NOT EXISTS idx_wrestling_participant_wrestler ON wrestling_match_participant(wrestler_id);

-- "Championships and accomplishments" off the wrestler's own article: an org
-- header ("WWE", "Pro Wrestling Illustrated") and the honours under it.
-- Canonical wiki data — replaced wholesale on re-import, nothing personal.
CREATE TABLE IF NOT EXISTS wrestling_honour (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  wrestler_id INTEGER NOT NULL REFERENCES wrestling_wrestler(id) ON DELETE CASCADE,
  org         TEXT NOT NULL,
  title       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_wrestling_honour_wrestler ON wrestling_honour(wrestler_id);

CREATE TABLE IF NOT EXISTS wrestling_stable (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  wiki_title TEXT UNIQUE,
  promotion  TEXT,
  lead       TEXT,
  image_path TEXT,
  favorite   INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS wrestling_stable_member (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  stable_id   INTEGER NOT NULL REFERENCES wrestling_stable(id) ON DELETE CASCADE,
  wrestler_id INTEGER NOT NULL REFERENCES wrestling_wrestler(id) ON DELETE CASCADE,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  UNIQUE(stable_id, wrestler_id)
);

-- ---- Wrestling: the local collection ----
-- A locally-playable file attached to an event, discovered by scanning the
-- folder picked on that event's page. file_path is relative to the wrestling
-- library root (settings key wrestling.dir).
--
-- Column groups mirror video_file deliberately: identity + freshness (the
-- rescan fast path), the ffprobe snapshot (all NULL without ffprobe — .mp4/
-- .webm still play), then user state the SCANNER NEVER WRITES so a rescan can't
-- wipe a resume position. Personal → the whole table is dropped on export.
--
-- `season` is dead weight for wrestling and kept ANYWAY: the scanner is
-- generalized over a scope descriptor rather than forked, so column parity with
-- video_file keeps ONE upsert statement instead of two. One unused integer is
-- cheaper than a second copy of the sync logic.
CREATE TABLE IF NOT EXISTS wrestling_video (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  -- NULL for a loose match's file (see wrestling_match.event_id).
  event_id       INTEGER REFERENCES wrestling_event(id) ON DELETE CASCADE,
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
  UNIQUE(event_id, file_path)
);
CREATE INDEX IF NOT EXISTS idx_wrestling_video_event ON wrestling_video(event_id);

-- ---- Football Archive ----
-- A local-first, source-auditable history graph. Football is deliberately a
-- standalone section rather than media_item rows: seasons, tables, fixtures,
-- careers and source coverage are facts, while the personal layer is limited
-- to favorites, match journal entries and manually attached media.
--
-- Every football_* table is excluded from shareable exports. The archive mixes
-- personal data, machine paths and providers whose datasets are licensed for
-- personal use rather than redistribution.
CREATE TABLE IF NOT EXISTS football_competition (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  key              TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  short_name       TEXT,
  country          TEXT,
  scope            TEXT NOT NULL, -- domestic | continental | international
  format           TEXT NOT NULL, -- league | cup
  start_year       INTEGER,
  lineage_note     TEXT,
  summary          TEXT,
  current_season_id INTEGER,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS football_era (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  competition_id INTEGER NOT NULL REFERENCES football_competition(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  start_season   TEXT,
  end_season     TEXT,
  points_win     INTEGER,
  points_draw    INTEGER,
  rank_rules     TEXT,
  narrative      TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  UNIQUE(competition_id, name, start_season)
);
CREATE INDEX IF NOT EXISTS idx_football_era_competition ON football_era(competition_id, sort_order);

CREATE TABLE IF NOT EXISTS football_season (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  competition_id    INTEGER NOT NULL REFERENCES football_competition(id) ON DELETE CASCADE,
  key               TEXT NOT NULL,
  label             TEXT NOT NULL,
  start_date        TEXT,
  end_date          TEXT,
  status            TEXT NOT NULL DEFAULT 'complete', -- upcoming | current | complete | void
  edition_number    INTEGER,
  team_count        INTEGER,
  champion_verified INTEGER NOT NULL DEFAULT 0,
  narrative         TEXT,
  data_revision     TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(competition_id, key)
);
CREATE INDEX IF NOT EXISTS idx_football_season_competition ON football_season(competition_id, start_date);

CREATE TABLE IF NOT EXISTS football_stage (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  season_id  INTEGER NOT NULL REFERENCES football_season(id) ON DELETE CASCADE,
  parent_id  INTEGER REFERENCES football_stage(id) ON DELETE CASCADE,
  key        TEXT NOT NULL,
  name       TEXT NOT NULL,
  kind       TEXT NOT NULL, -- league | group | knockout | final | qualifier
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(season_id, key)
);
CREATE INDEX IF NOT EXISTS idx_football_stage_season ON football_stage(season_id, sort_order);

CREATE TABLE IF NOT EXISTS football_team (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  short_name     TEXT,
  country        TEXT,
  founded_year   INTEGER,
  is_national    INTEGER NOT NULL DEFAULT 0,
  bio            TEXT,
  image_path     TEXT,
  enrichment_state TEXT NOT NULL DEFAULT 'not_requested',
  enriched_at    TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_football_team_name ON football_team(name);

CREATE TABLE IF NOT EXISTS football_person (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  name             TEXT NOT NULL,
  role             TEXT NOT NULL, -- player | manager | both
  birth_date       TEXT,
  death_date       TEXT,
  nationality      TEXT,
  bio              TEXT,
  image_path       TEXT,
  enrichment_state TEXT NOT NULL DEFAULT 'not_requested',
  enriched_at      TEXT,
  quiz_pack        INTEGER NOT NULL DEFAULT 0,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_football_person_name ON football_person(name);

CREATE TABLE IF NOT EXISTS football_tenure (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id   INTEGER NOT NULL REFERENCES football_person(id) ON DELETE CASCADE,
  team_id     INTEGER NOT NULL REFERENCES football_team(id) ON DELETE CASCADE,
  role        TEXT NOT NULL, -- player | manager
  start_date  TEXT,
  end_date    TEXT,
  loan        INTEGER NOT NULL DEFAULT 0,
  appearances INTEGER,
  goals       INTEGER,
  verified    INTEGER NOT NULL DEFAULT 0,
  complete    INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_football_tenure_person ON football_tenure(person_id, role, sort_order);
CREATE INDEX IF NOT EXISTS idx_football_tenure_team ON football_tenure(team_id, role);

CREATE TABLE IF NOT EXISTS football_match (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  title               TEXT NOT NULL, -- denormalized "Home vs Away" for lists/search
  season_id           INTEGER NOT NULL REFERENCES football_season(id) ON DELETE CASCADE,
  stage_id            INTEGER REFERENCES football_stage(id) ON DELETE SET NULL,
  home_team_id        INTEGER NOT NULL REFERENCES football_team(id) ON DELETE RESTRICT,
  away_team_id        INTEGER NOT NULL REFERENCES football_team(id) ON DELETE RESTRICT,
  kickoff_at          TEXT,
  match_date          TEXT NOT NULL,
  round               TEXT,
  status              TEXT NOT NULL DEFAULT 'scheduled',
  home_score          INTEGER,
  away_score          INTEGER,
  home_halftime       INTEGER,
  away_halftime       INTEGER,
  home_extra_time     INTEGER,
  away_extra_time     INTEGER,
  home_penalties      INTEGER,
  away_penalties      INTEGER,
  aggregate_home      INTEGER,
  aggregate_away      INTEGER,
  awarded             INTEGER NOT NULL DEFAULT 0,
  venue               TEXT,
  city                TEXT,
  attendance          INTEGER,
  referee             TEXT,
  event_coverage      TEXT NOT NULL DEFAULT 'not_supplied',
  lineup_coverage     TEXT NOT NULL DEFAULT 'not_supplied',
  conflicted          INTEGER NOT NULL DEFAULT 0,
  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_football_match_season ON football_match(season_id, match_date);
CREATE INDEX IF NOT EXISTS idx_football_match_home ON football_match(home_team_id, match_date);
CREATE INDEX IF NOT EXISTS idx_football_match_away ON football_match(away_team_id, match_date);

CREATE TABLE IF NOT EXISTS football_lineup (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id   INTEGER NOT NULL REFERENCES football_match(id) ON DELETE CASCADE,
  team_id    INTEGER NOT NULL REFERENCES football_team(id) ON DELETE CASCADE,
  person_id  INTEGER NOT NULL REFERENCES football_person(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'player',
  starter    INTEGER NOT NULL DEFAULT 0,
  shirt      INTEGER,
  position   TEXT,
  captain    INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(match_id, team_id, person_id, role)
);
CREATE INDEX IF NOT EXISTS idx_football_lineup_match ON football_lineup(match_id, team_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_football_lineup_person ON football_lineup(person_id);

CREATE TABLE IF NOT EXISTS football_event (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id          INTEGER NOT NULL REFERENCES football_match(id) ON DELETE CASCADE,
  team_id           INTEGER REFERENCES football_team(id) ON DELETE SET NULL,
  person_id         INTEGER REFERENCES football_person(id) ON DELETE SET NULL,
  related_person_id INTEGER REFERENCES football_person(id) ON DELETE SET NULL,
  type              TEXT NOT NULL,
  detail            TEXT,
  minute            INTEGER,
  extra_minute      INTEGER,
  own_goal          INTEGER NOT NULL DEFAULT 0,
  penalty           INTEGER NOT NULL DEFAULT 0,
  score_home        INTEGER,
  score_away        INTEGER,
  sort_order        INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_football_event_match ON football_event(match_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_football_event_person ON football_event(person_id);

CREATE TABLE IF NOT EXISTS football_standing (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  season_id     INTEGER NOT NULL REFERENCES football_season(id) ON DELETE CASCADE,
  stage_id      INTEGER REFERENCES football_stage(id) ON DELETE CASCADE,
  team_id       INTEGER NOT NULL REFERENCES football_team(id) ON DELETE CASCADE,
  rank          INTEGER,
  rank_official INTEGER NOT NULL DEFAULT 0,
  played        INTEGER NOT NULL,
  won           INTEGER NOT NULL,
  drawn         INTEGER NOT NULL,
  lost          INTEGER NOT NULL,
  goals_for     INTEGER NOT NULL,
  goals_against INTEGER NOT NULL,
  goal_difference INTEGER NOT NULL,
  points        INTEGER NOT NULL,
  deduction     INTEGER NOT NULL DEFAULT 0,
  note          TEXT,
  UNIQUE(season_id, stage_id, team_id)
);
CREATE INDEX IF NOT EXISTS idx_football_standing_season ON football_standing(season_id, stage_id, rank);

CREATE TABLE IF NOT EXISTS football_honour (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  competition_id INTEGER NOT NULL REFERENCES football_competition(id) ON DELETE CASCADE,
  season_id      INTEGER REFERENCES football_season(id) ON DELETE CASCADE,
  team_id        INTEGER REFERENCES football_team(id) ON DELETE CASCADE,
  person_id      INTEGER REFERENCES football_person(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  placement      TEXT NOT NULL, -- winner | runner-up | individual
  verified       INTEGER NOT NULL DEFAULT 0,
  shared         INTEGER NOT NULL DEFAULT 0,
  sort_order     INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_football_honour_season ON football_honour(season_id, placement);
CREATE INDEX IF NOT EXISTS idx_football_honour_team ON football_honour(team_id);
CREATE INDEX IF NOT EXISTS idx_football_honour_person ON football_honour(person_id);

-- Identity and source-integrity layer. Entity links are polymorphic on purpose:
-- conflicts and aliases can exist before a canonical row has been resolved.
CREATE TABLE IF NOT EXISTS football_alias (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind     TEXT NOT NULL,
  entity_id       INTEGER NOT NULL,
  source          TEXT NOT NULL,
  alias           TEXT NOT NULL,
  normalized      TEXT NOT NULL,
  external_id     TEXT,
  UNIQUE(entity_kind, source, normalized, external_id)
);
CREATE INDEX IF NOT EXISTS idx_football_alias_lookup ON football_alias(entity_kind, source, normalized);

CREATE TABLE IF NOT EXISTS football_source_ref (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind     TEXT NOT NULL,
  entity_id       INTEGER NOT NULL,
  source          TEXT NOT NULL,
  external_id     TEXT NOT NULL,
  source_url      TEXT,
  revision        TEXT,
  checksum        TEXT,
  raw_fingerprint TEXT,
  fetched_at      TEXT,
  UNIQUE(entity_kind, source, external_id)
);
CREATE INDEX IF NOT EXISTS idx_football_source_ref_entity ON football_source_ref(entity_kind, entity_id);

CREATE TABLE IF NOT EXISTS football_assertion (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind TEXT NOT NULL,
  entity_id   INTEGER NOT NULL,
  facet       TEXT NOT NULL,
  value       TEXT,
  source      TEXT NOT NULL,
  source_ref_id INTEGER REFERENCES football_source_ref(id) ON DELETE SET NULL,
  status      TEXT NOT NULL DEFAULT 'accepted',
  confidence  REAL,
  observed_at TEXT,
  UNIQUE(entity_kind, entity_id, facet, source, value)
);
CREATE INDEX IF NOT EXISTS idx_football_assertion_entity ON football_assertion(entity_kind, entity_id, facet);

CREATE TABLE IF NOT EXISTS football_coverage (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  competition_id INTEGER REFERENCES football_competition(id) ON DELETE CASCADE,
  season_id      INTEGER REFERENCES football_season(id) ON DELETE CASCADE,
  source         TEXT NOT NULL,
  facet          TEXT NOT NULL,
  state          TEXT NOT NULL, -- complete | partial | conflicted | not_supplied
  item_count     INTEGER,
  expected_count INTEGER,
  note           TEXT,
  revision       TEXT,
  checked_at     TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(competition_id, season_id, source, facet)
);
CREATE INDEX IF NOT EXISTS idx_football_coverage_season ON football_coverage(season_id, facet);

CREATE TABLE IF NOT EXISTS football_conflict (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind TEXT NOT NULL,
  entity_id   INTEGER,
  facet       TEXT NOT NULL,
  source_a    TEXT NOT NULL,
  value_a     TEXT,
  source_b    TEXT NOT NULL,
  value_b     TEXT,
  status      TEXT NOT NULL DEFAULT 'open',
  resolution  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_football_conflict_status ON football_conflict(status, entity_kind);

CREATE TABLE IF NOT EXISTS football_import_run (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  kind            TEXT NOT NULL,
  source          TEXT NOT NULL,
  competition_key TEXT,
  season_key      TEXT,
  state           TEXT NOT NULL,
  version         TEXT,
  etag            TEXT,
  checksum        TEXT,
  raw_fingerprint TEXT,
  request_count   INTEGER NOT NULL DEFAULT 0,
  item_count      INTEGER NOT NULL DEFAULT 0,
  started_at      TEXT NOT NULL,
  finished_at     TEXT,
  message         TEXT
);
CREATE INDEX IF NOT EXISTS idx_football_import_run_source ON football_import_run(source, started_at);

CREATE TABLE IF NOT EXISTS football_article (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind      TEXT NOT NULL,
  entity_id        INTEGER NOT NULL,
  title            TEXT NOT NULL,
  body             TEXT,
  source_url       TEXT NOT NULL,
  revision         TEXT,
  license          TEXT,
  attribution      TEXT,
  state            TEXT NOT NULL DEFAULT 'not_requested',
  fetched_at       TEXT,
  UNIQUE(entity_kind, entity_id, source_url)
);
CREATE INDEX IF NOT EXISTS idx_football_article_entity ON football_article(entity_kind, entity_id);

-- Personal layer. Removing a media row only removes the attachment record; the
-- file beneath football.dir remains in place and remote URLs are never fetched.
CREATE TABLE IF NOT EXISTS football_favorite (
  entity_kind TEXT NOT NULL,
  entity_id   INTEGER NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY(entity_kind, entity_id)
);

CREATE TABLE IF NOT EXISTS football_match_journal (
  match_id    INTEGER PRIMARY KEY REFERENCES football_match(id) ON DELETE CASCADE,
  watched_at  TEXT,
  rating      REAL,
  note        TEXT,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS football_media (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT NOT NULL,
  kind       TEXT NOT NULL, -- clip | highlight | fullMatch | interview | documentary
  local_path TEXT,
  url        TEXT,
  note       TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK ((local_path IS NOT NULL AND url IS NULL) OR (local_path IS NULL AND url IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS idx_football_media_kind ON football_media(kind, created_at);

CREATE TABLE IF NOT EXISTS football_media_link (
  media_id    INTEGER NOT NULL REFERENCES football_media(id) ON DELETE CASCADE,
  entity_kind TEXT NOT NULL,
  entity_id   INTEGER NOT NULL,
  PRIMARY KEY(media_id, entity_kind, entity_id)
);
CREATE INDEX IF NOT EXISTS idx_football_media_link_entity ON football_media_link(entity_kind, entity_id);

CREATE TABLE IF NOT EXISTS football_external_link (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind TEXT NOT NULL,
  entity_id   INTEGER NOT NULL,
  provider    TEXT NOT NULL,
  label       TEXT,
  url         TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(entity_kind, entity_id, provider, url)
);
CREATE INDEX IF NOT EXISTS idx_football_external_link_entity ON football_external_link(entity_kind, entity_id);

-- One cross-entity substring index for Ctrl+K and /search. The trigram
-- tokenizer makes contains-search indexable; one- and two-character queries
-- retain a bounded LIKE fallback in searchRepo.
CREATE VIRTUAL TABLE IF NOT EXISTS global_search_fts USING fts5(
  kind UNINDEXED,
  entity_id UNINDEXED,
  name,
  alt_name,
  tokenize='trigram'
);

CREATE TRIGGER IF NOT EXISTS global_search_media_insert AFTER INSERT ON media_item BEGIN
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('media', new.id, new.title, new.title_original);
END;
CREATE TRIGGER IF NOT EXISTS global_search_media_update AFTER UPDATE OF title, title_original ON media_item BEGIN
  DELETE FROM global_search_fts WHERE kind = 'media' AND entity_id = old.id;
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('media', new.id, new.title, new.title_original);
END;
CREATE TRIGGER IF NOT EXISTS global_search_media_delete AFTER DELETE ON media_item BEGIN
  DELETE FROM global_search_fts WHERE kind = 'media' AND entity_id = old.id;
END;

CREATE TRIGGER IF NOT EXISTS global_search_person_insert AFTER INSERT ON person BEGIN
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('person', new.id, new.name, new.name_native);
END;
CREATE TRIGGER IF NOT EXISTS global_search_person_update AFTER UPDATE OF name, name_native ON person BEGIN
  DELETE FROM global_search_fts WHERE kind = 'person' AND entity_id = old.id;
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('person', new.id, new.name, new.name_native);
END;
CREATE TRIGGER IF NOT EXISTS global_search_person_delete AFTER DELETE ON person BEGIN
  DELETE FROM global_search_fts WHERE kind = 'person' AND entity_id = old.id;
END;

CREATE TRIGGER IF NOT EXISTS global_search_company_insert AFTER INSERT ON company BEGIN
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('company', new.id, new.name, new.name_native);
END;
CREATE TRIGGER IF NOT EXISTS global_search_company_update AFTER UPDATE OF name, name_native ON company BEGIN
  DELETE FROM global_search_fts WHERE kind = 'company' AND entity_id = old.id;
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('company', new.id, new.name, new.name_native);
END;
CREATE TRIGGER IF NOT EXISTS global_search_company_delete AFTER DELETE ON company BEGIN
  DELETE FROM global_search_fts WHERE kind = 'company' AND entity_id = old.id;
END;

CREATE TRIGGER IF NOT EXISTS global_search_character_insert AFTER INSERT ON character BEGIN
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('character', new.id, new.name, new.name_native);
END;
CREATE TRIGGER IF NOT EXISTS global_search_character_update AFTER UPDATE OF name, name_native ON character BEGIN
  DELETE FROM global_search_fts WHERE kind = 'character' AND entity_id = old.id;
  INSERT INTO global_search_fts(kind, entity_id, name, alt_name)
  VALUES ('character', new.id, new.name, new.name_native);
END;
CREATE TRIGGER IF NOT EXISTS global_search_character_delete AFTER DELETE ON character BEGIN
  DELETE FROM global_search_fts WHERE kind = 'character' AND entity_id = old.id;
END;
