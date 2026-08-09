import { describe, it, expect, beforeEach } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
// @ts-expect-error — plain CJS maintenance module, no type declarations
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'

// The export sanitizer (scripts/export-library.cjs) must strip everything
// personal while leaving the imported library intact. Runs the real statements
// against the real schema (init.sql via createTestDb).

let db: Database.Database

function seed(): void {
  db.exec(`
    INSERT INTO media_item (id, media_type, title, title_original, synopsis, cover_path,
      release_date, total_units, status, score, progress,
      rewatch_count, notes, favorite, metadata, external_source, external_id, local_dir, exe_path)
    VALUES (1, 'anime', 'Cowboy Bebop', 'カウボーイビバップ', 'Space bounty hunters.',
      'media/dl-abc.jpg', '1998-04-03', 26, 'Completed', 9.5, 26,
      2, 'my private notes', 1, '{"communityScore":8.8}', 'anilist', '1',
      'Cowboy Bebop', 'C:\\Games\\Bebop\\bebop.exe');

    INSERT INTO person (id, name, photo_path) VALUES (1, 'Megumi Hayashibara', 'media/dl-p.jpg');
    INSERT INTO character (id, name, image_path) VALUES (1, 'Faye Valentine', 'media/dl-c.jpg');
    INSERT INTO company (id, name) VALUES (1, 'Sunrise');
    INSERT INTO credit (media_id, person_id, character_id, role) VALUES (1, 1, 1, 'voice_actor');
    INSERT INTO media_company (media_id, company_id) VALUES (1, 1);
    INSERT INTO media_character (media_id, character_id) VALUES (1, 1);
    INSERT INTO tag (id, name) VALUES (1, 'Space');
    INSERT INTO media_tag (media_id, tag_id) VALUES (1, 1);
    INSERT INTO theme_song (id, media_id, slug, type, title, audio_url, audio_path, favorite)
      VALUES (1, 1, 'OP1', 'OP', 'Tank!', 'https://x/tank.ogg', 'audio/tank.ogg', 1);
    INSERT INTO theme_artist (theme_song_id, person_id) VALUES (1, 1);
    INSERT INTO media_relation (media_id, relation_type, related_source, related_external_id)
      VALUES (1, 'SEQUEL', 'anilist', '5');

    INSERT INTO list (id, title, entity_kind) VALUES (1, 'Top anime', 'media');
    INSERT INTO list_item (list_id, entity_id, note) VALUES (1, 1, 'the best');

    INSERT INTO jp_course (id, title) VALUES (1, 'My custom course');
    INSERT INTO jp_lesson (id, course_id, kind, title, learned, learned_at)
      VALUES (1, 1, 'vocab', 'Lesson 1', 1, '2025-06-01');
    INSERT INTO jp_card (id, lesson_id, front, back, status, learning_step, due_at,
      interval_days, ease, reps, lapses, last_reviewed_at)
      VALUES (1, 1, '猫', 'cat', 'review', 2, '2025-06-10', 12, 2.1, 9, 1, '2025-06-01');
    INSERT INTO jp_review_log (card_id, grade, interval_days, ease) VALUES (1, 'good', 12, 2.1);
    INSERT INTO jp_ghost (card_id, remaining) VALUES (1, 2);

    INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Radiohead', 'Radiohead');
    INSERT INTO music_album (id, artist_id, title, dir_path)
      VALUES (1, 1, 'OK Computer', 'Radiohead/OK Computer');
    INSERT INTO music_track (id, album_id, artist_id, file_path, title, liked_at, play_count,
      last_played_at)
      VALUES (1, 1, 1, 'Radiohead/OK Computer/01 Airbag.mp3', 'Airbag', '2025-05-01', 42,
        '2025-06-30');
    INSERT INTO music_playlist (id, title) VALUES (1, 'Favorites');
    INSERT INTO music_playlist_track (playlist_id, track_id) VALUES (1, 1);
    INSERT INTO music_play_log (track_id, duration) VALUES (1, 284);

    INSERT INTO manga_chapter (media_id, dir_path, title, last_read_page, read_at)
      VALUES (1, 'ch1', 'Chapter 1', 12, '2025-06-15');

    INSERT INTO media_image (media_id, kind, file_path, source_url, source, width, height)
      VALUES (1, 'wallpaper', 'pictures/Cowboy Bebop (anime)/wallpapers/wallhaven-x1.jpg',
        'https://w.wallhaven.cc/full/x1.jpg', 'wallhaven', 1920, 1080);

    INSERT INTO video_file (media_id, file_path, title, number, watched_at, resume_seconds)
      VALUES (1, 'Cowboy Bebop/ep01.mkv', 'Session 1', 1, '2026-08-01 22:00:00', 431);
    INSERT INTO video_cache (cache_key, file_name, source_path, action, bytes)
      VALUES ('sha1-abc', 'sha1-abc.mp4', '/media/x/ep01.mkv', 'remux', 812345678);

    INSERT INTO quiz_session (kind, score, total, best_streak, settings)
      VALUES ('song', 8, 10, 5, '{"songType":"OP"}');

    INSERT INTO game_session (media_id, started_at, ended_at, duration)
      VALUES (1, '2026-08-01 20:00:00', '2026-08-01 21:00:00', 3600);

    INSERT INTO gacha_unit (id, game, kind, name, rarity, element, role, level, dupes, notes, data)
      VALUES (1, 'hsr', 'character', 'Kafka', 5, 'Lightning', 'Nihility', 80, 2,
        'my private build notes', '{"relics":"SSS"}');
    INSERT INTO gacha_build (unit_id, name, notes) VALUES (1, 'DoT team', 'ATK boots');
    INSERT INTO gacha_currency (game, key, amount) VALUES ('hsr', 'jade', 12345);
    INSERT INTO gacha_banner (game, name, kind, featured, start_at, end_at)
      VALUES ('hsr', 'Kafka Rerun', 'Character', 'Kafka', '2026-07-01', '2026-07-22');
    INSERT INTO gacha_news (game, title, url, external_id)
      VALUES ('hsr', 'Version 4.4 Update', 'https://www.hoyolab.com/article/1', '1');
    INSERT INTO gacha_meta (game, key, value) VALUES ('hsr', 'news.fetchedAt', '2026-07-09T12:00:00Z');

    INSERT INTO gacha_chat_thread (id, game, title) VALUES (1, 'fgo', 'My roster help');
    INSERT INTO gacha_chat_message (thread_id, role, text) VALUES (1, 'user', 'add Mash');
    INSERT INTO gacha_goal (game, kind, title, recur) VALUES ('fgo', 'task', 'Do dailies', 'daily');
    INSERT INTO gacha_coach_note (game, content) VALUES ('fgo', 'Plays on NA server');
    INSERT INTO gacha_coach_doc (game, title, content) VALUES ('fgo', 'ChatGPT log', 'raw text');

    INSERT INTO checklist_task (task_key, cadence) VALUES ('anime-episode', 'daily');
    INSERT INTO checklist_log (task_key, cadence, period_key, media_id, payload)
      VALUES ('anime-episode', 'daily', '2026-07-25', 1, '{"title":"Cowboy Bebop"}');

    INSERT INTO en_word (word, meaning, pos) VALUES ('ephemeral', 'Lasting a short time.', 'adjective');
    INSERT INTO en_review_log (word_id, grade, interval_days, ease) VALUES (1, 'good', 1, 2.5);
    INSERT INTO en_writing (prompt_key, prompt_title, submission, feedback, score)
      VALUES ('opinion-remote-work', 'Remote work', 'My essay text.', '{"scores":{}}', 7.5);
    INSERT INTO prog_progress (lesson_key) VALUES ('go-from-python/why-go');

    INSERT INTO settings (key, value) VALUES
      ('tmdb.api_key', 'secret-tmdb'),
      ('rawg.api_key', 'secret-rawg'),
      ('omdb.api_key', 'secret-omdb'),
      ('gemini.api_key', 'secret-gemini'),
      ('anthropic.api_key', 'secret-anthropic'),
      ('vertex.project_id', 'my-gcp-project'),
      ('vertex.credentials_path', '/home/x/sa.json'),
      ('ytdlp.path', '/usr/local/bin/yt-dlp'),
      ('music.dir', '/media/xamir/Anglo/Music'),
      ('manga.dir', '/media/xamir/Nihon/Manga'),
      ('books.dir', '/media/xamir/Anglo/Books'),
      ('audio.dir', '/media/xamir/Anglo/Anime'),
      ('pictures.dir', '/media/xamir/Anglo/Pictures'),
      ('jackett.url', 'http://localhost:9117'),
      ('jackett.api_key', 'secret-jackett'),
      ('jackett.start_cmd', 'systemctl start jackett.service'),
      ('qbittorrent.url', 'http://localhost:8080'),
      ('qbittorrent.username', 'admin'),
      ('qbittorrent.password', 'secret-qbit'),
      ('github.token', 'ghp_secret-updater-token'),
      ('video.dir', '/media/xamir/Anglo/Video'),
      ('ffmpeg.path', '/usr/bin/ffmpeg'),
      ('ffprobe.path', '/usr/bin/ffprobe'),
      ('mokuro.path', '/home/xamir/.local/bin/mokuro'),
      ('vertex.region', 'us-east5'),
      ('sync.token', 'secret-sync'),
      ('sync.device', 'pixel-8'),
      ('sync.port', '8787'),
      ('checklist.seeded', '1'),
      ('jp.knownBaseline', '2000'),
      ('japanese.seeded', '1'),
      ('japanese.seeded.n3kanji', '1'),
      ('japanese.seeded.levels', '1'),
      ('anime.statuses', '["Watching","Completed"]'),
      ('score.max', '10'),
      ('theme', 'dark');
  `)
}

const count = (table: string): number =>
  (db.prepare(`SELECT COUNT(*) AS n FROM "${table}"`).get() as { n: number }).n

beforeEach(() => {
  db = createTestDb()
  seed()
  sanitizeDb(db)
})

describe('export sanitize', () => {
  it('resets personal tracking on media_item but keeps canonical fields', () => {
    const row = db.prepare('SELECT * FROM media_item WHERE id=1').get() as Record<string, unknown>
    expect(row.status).toBeNull()
    expect(row.score).toBeNull()
    expect(row.progress).toBe(0)
    expect(row.rewatch_count).toBe(0)
    expect(row.notes).toBeNull()
    expect(row.favorite).toBe(0)
    expect(row.local_dir).toBeNull()
    expect(row.exe_path).toBeNull()
    // canonical data intact
    expect(row.title).toBe('Cowboy Bebop')
    expect(row.title_original).toBe('カウボーイビバップ')
    expect(row.cover_path).toBe('media/dl-abc.jpg')
    expect(row.metadata).toBe('{"communityScore":8.8}')
    expect(row.external_source).toBe('anilist')
    expect(row.external_id).toBe('1')
  })

  it('keeps the whole cross-link graph and theme songs', () => {
    for (const t of [
      'person', 'company', 'character', 'credit', 'media_company', 'media_character',
      'tag', 'media_tag', 'theme_song', 'theme_artist', 'media_relation'
    ]) {
      expect(count(t), t).toBe(1)
    }
    const theme = db.prepare('SELECT * FROM theme_song WHERE id=1').get() as Record<string, unknown>
    expect(theme.audio_path).toBe('audio/tank.ogg')
    // …but the heart is personal and goes.
    expect(theme.favorite).toBe(0)
  })

  it('wipes lists, japanese content+progress, music library, manga chapters, images, quiz history, gacha, checklist', () => {
    for (const t of [
      'list', 'list_item', 'jp_course', 'jp_lesson', 'jp_card', 'jp_review_log', 'jp_ghost',
      'music_artist', 'music_album', 'music_track', 'music_playlist',
      'music_playlist_track', 'music_play_log', 'manga_chapter', 'media_image', 'quiz_session',
      'game_session',
      'gacha_unit', 'gacha_build', 'gacha_currency', 'gacha_banner', 'gacha_news', 'gacha_meta',
      'gacha_chat_thread', 'gacha_chat_message', 'gacha_goal', 'gacha_coach_note', 'gacha_coach_doc',
      'checklist_task', 'checklist_log', 'en_word', 'en_review_log', 'en_writing', 'prog_progress',
      // Scan cache + remux index: rows point at the exporter's own userData,
      // and resume positions are personal. sanitizeSql.cjs has always deleted
      // these two; nothing ever seeded them, so the guard had a hole.
      'video_file', 'video_cache'
    ]) {
      expect(count(t), t).toBe(0)
    }
  })

  it('removes secrets, machine paths, and ALL japanese.seeded flags from settings', () => {
    const keys = (db.prepare('SELECT key FROM settings ORDER BY key').all() as { key: string }[])
      .map((r) => r.key)
    expect(keys).toEqual(['anime.statuses', 'score.max', 'theme'])
  })

  it('tolerates a live DB that predates newer tables', () => {
    const older = createTestDb()
    older.exec('DROP TABLE music_play_log; DROP TABLE music_playlist_track; DROP TABLE music_playlist')
    older.exec(`INSERT INTO media_item (id, media_type, title, status) VALUES (1, 'anime', 'X', 'Watching')`)
    expect(() => sanitizeDb(older)).not.toThrow()
    expect(older.prepare('SELECT status FROM media_item WHERE id=1').get()).toEqual({ status: null })
  })
})
