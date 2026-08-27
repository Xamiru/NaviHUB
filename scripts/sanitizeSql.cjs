/*
 * The personal-data wipe applied to an exported copy of the NaviHUB database
 * (see scripts/export-library.cjs). Shared with tests/exportSanitize.test.ts so
 * the statements run against the real schema (init.sql) under vitest.
 *
 * What survives: every canonical/imported table (person, company, character,
 * credit, media_company, media_character, tag, media_tag, theme_song incl.
 * audio_path but NOT its favorite flag, theme_artist, media_relation),
 * media_item's canonical columns (title, synopsis, cover_path, metadata,
 * external ids, ...), and harmless preference settings (*.statuses, score.max,
 * theme).
 */

// Order matters: FK children before parents. list_item.entity_id is polymorphic
// (no FK) and settings has none, so nothing cascades them — delete explicitly.
const SANITIZE_STATEMENTS = [
  // Personal tracking on media, reset to fresh-item defaults. local_dir points
  // at a folder under the exporter's manga.dir, exe_path at the exporter's game
  // installs — both meaningless on another machine.
  `UPDATE media_item SET status=NULL, score=NULL, progress=0,
     rewatch_count=0, notes=NULL, favorite=0, local_dir=NULL, exe_path=NULL`,

  // The TMDB episode catalogue is canonical and worth shipping; which episodes
  // the exporter watched is not. Same shape as the wrestling reference tables:
  // keep the rows, clear the personal column.
  'UPDATE tv_episode SET watched_at=NULL',

  // User-curated lists (rankings + notes).
  'DELETE FROM list_item',
  'DELETE FROM list',

  // User-curated tier boards (same personal layer as list/list_item; children
  // before parents).
  'DELETE FROM tier_item',
  'DELETE FROM tier_row',
  'DELETE FROM tier_list',

  // Japanese learning: content AND progress go — the default courses re-seed on
  // the recipient's first launch once the japanese.seeded% flags are cleared.
  'DELETE FROM jp_ghost',
  'DELETE FROM jp_review_log',
  'DELETE FROM jp_card',
  'DELETE FROM jp_lesson',
  'DELETE FROM jp_course',
  // Comprehension scans: which series the user reads and how much of each they
  // understand — personal on both counts.
  'DELETE FROM jp_coverage_word',
  'DELETE FROM jp_coverage',

  // Music library: scan rows reference files under the exporter's music.dir,
  // so they'd all be dead on arrival; the recipient's first scan rebuilds.
  'DELETE FROM music_play_log',
  'DELETE FROM music_spotify_playlist_item',
  'DELETE FROM music_spotify_playlist',
  'DELETE FROM music_playlist_track',
  'DELETE FROM music_playlist',
  'DELETE FROM music_track',
  'DELETE FROM music_album',
  'DELETE FROM music_artist',

  // Local-manga scan cache (tied to the exporter's manga.dir + local_dir).
  'DELETE FROM manga_chapter',

  // Local-video scan cache (tied to the exporter's video.dir + local_dir), plus
  // the remux cache index, whose files live under the exporter's userData —
  // both would be dead rows on arrival, and resume positions are personal.
  'DELETE FROM video_file',
  'DELETE FROM video_cache',

  // Wrestling: the WIKI itself is canonical reference data and survives (the
  // theme_song posture) — only the personal layer goes. wrestling_video is the
  // exporter's own scan cache (paths under their wrestling.dir), and
  // poster_path is dropped because event posters are non-free fair use: fair
  // use is context-specific, so a shared bundle must not carry them.
  // (list/list_item are deleted wholesale above, so wrestling list entries go
  // with them — no extra statement needed for the new ListKinds.)
  'DELETE FROM wrestling_video',
  `UPDATE wrestling_event SET favorite=0, local_dir=NULL, poster_path=NULL`,
  `UPDATE wrestling_match SET rating=NULL, favorite=0, video_id=NULL`,
  'UPDATE wrestling_wrestler SET favorite=0',
  'UPDATE wrestling_stable SET favorite=0',

  // Wallpapers/fan art: rows point at files under the exporter's pictures.dir,
  // which isn't part of the bundle — they'd all be dead links on arrival.
  // slideshow_item goes first (child FK) and is personal anyway: it names files
  // in the exporter's own Windows desktop slideshow folder.
  'DELETE FROM slideshow_item',
  'DELETE FROM media_image',

  // Quiz round history (personal scores).
  'DELETE FROM quiz_session',

  // Game/VN play sessions launched from the app — play history is personal.
  'DELETE FROM game_session',

  // Which achievements the exporter has EARNED is personal; the achievement
  // sets themselves (achievement, achievement_game) are provider reference
  // data and survive, the theme_song posture.
  'DELETE FROM achievement_unlock',

  // Theme songs themselves are canonical (AnimeThemes data + downloaded audio)
  // and survive; only the hearts from the Songs page are personal.
  'UPDATE theme_song SET favorite=0',

  // Gacha tracker: everything is personal (owned roster, builds, wallet,
  // banner notes, fetched news, fetch timestamps). Children before parents
  // (gacha_build FKs gacha_unit).
  'DELETE FROM gacha_build',
  'DELETE FROM gacha_unit',
  'DELETE FROM gacha_currency',
  'DELETE FROM gacha_banner',
  'DELETE FROM gacha_news',
  'DELETE FROM gacha_meta',

  // Gacha coach: chat history, goals/tasks, coach memory notes, imported chats
  // — all personal. Children before parents (messages FK threads).
  'DELETE FROM gacha_chat_message',
  'DELETE FROM gacha_chat_thread',
  'DELETE FROM gacha_goal',
  'DELETE FROM gacha_coach_note',
  'DELETE FROM gacha_coach_doc',

  // Daily/weekly checklist: the enabled board and everything logged against it
  // are personal (the item catalog itself is code, not data).
  'DELETE FROM checklist_log',
  'DELETE FROM checklist_task',

  // English section (saved words = the SRS deck, its review log, graded
  // writing submissions) + programming lesson completion — all personal (the
  // test/course content itself is code, not data). Children before parents.
  'DELETE FROM en_review_log',
  'DELETE FROM en_word',
  'DELETE FROM en_writing',
  'DELETE FROM prog_progress',
  'DELETE FROM prog_attempt',
  'DELETE FROM prog_cli_miss',
  'DELETE FROM prog_solve',

  // Legacy: the PC↔phone sync server was removed (2026-08-01), but a DB that
  // ran an older build still has its table. sanitizeDb skips tables the DB
  // doesn't have, so this is a no-op on a fresh one — keep it until the
  // orphaned table is gone for good.
  'DELETE FROM sync_batch',

  // Secrets and machine-specific paths. The LIKE clause clears ALL the
  // japanese.seeded* flags (one per seeded course, see db/japaneseSeed.ts) so
  // the default courses re-seed for the recipient, and checklist.seeded so the
  // starter board seeds too. The sync.* keys are likewise legacy leftovers of
  // the removed phone sync (a bearer token, a device name and a port).
  // jp.knownBaseline is personal knowledge, not a preference: exporting it
  // hands the recipient an empty deck plus a standing claim that they already
  // know the top N Japanese words, inflating every comprehension figure.
  // franchise.<id>.background rows point at the user's own image files.
  `DELETE FROM settings WHERE key IN
     ('tmdb.api_key','rawg.api_key','igdb.client_id','igdb.client_secret','omdb.api_key','ytdlp.path','spotdl.path',
      'music.dir','manga.dir','books.dir','audio.dir','pictures.dir','slideshow.dir','video.dir','wrestling.dir',
      'ffmpeg.path','ffprobe.path','mokuro.path',
      'gemini.api_key','anthropic.api_key',
      'steam.web_api_key','ra.username','ra.api_key',
      'vertex.project_id','vertex.region','vertex.credentials_path',
      'sync.token','sync.device','sync.port',
      'jackett.url','jackett.api_key','jackett.start_cmd',
      'qbittorrent.url','qbittorrent.username','qbittorrent.password',
      'github.token','checklist.seeded','jp.knownBaseline')
     OR key LIKE 'japanese.seeded%' OR key LIKE 'franchise.%'`
]

const tableOf = (sql) => sql.match(/(?:DELETE FROM|UPDATE)\s+(\w+)/i)[1]

// db: a better-sqlite3 Database opened read-write on the COPY (never the live
// DB). Tables the live DB doesn't have yet are skipped — init.sql only creates
// missing tables at app startup, so a DB the app hasn't reopened since a
// feature landed can legitimately lack its tables (and the recipient's app
// will create them empty on first launch). VACUUM is the caller's job — it
// can't run inside a transaction.
function sanitizeDb(db) {
  const hasTable = db.prepare(`SELECT 1 FROM sqlite_master WHERE type='table' AND name=?`)
  db.transaction(() => {
    for (const sql of SANITIZE_STATEMENTS) {
      if (hasTable.get(tableOf(sql))) db.prepare(sql).run()
    }
  })()
}

module.exports = { SANITIZE_STATEMENTS, sanitizeDb }
