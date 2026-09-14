import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'

// The startup crash class this pins: init.sql runs BEFORE runMigrations, so a
// statement in init.sql may only reference columns that init.sql itself
// creates. An index on ensureColumn-added columns passes every fresh-DB test
// (createTestDb builds the current schema from scratch) and then kills the app
// on the FIRST LIVE DATABASE that predates the columns — which is exactly what
// the English-SRS release did: "SqliteError: no such column: status" out of
// initDatabase, before a window ever opened.

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import { runMigrations } from '../src/main/db/connection'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const initSql = read('../src/main/db/init.sql')

describe('a live DB that predates newer columns', () => {
  it('upgrades pre-recovery Spotify tables twice without losing saved rows', () => {
    const db = new Database(':memory:')
    const added = ['spotify_review_required', 'match_confirmed', 'download_skipped',
      'resolved_audio_url', 'catalogue_country', 'expected_tracks', 'tracks_loaded']
    const legacy = initSql.split('\n').filter((line) => !added.some((column) =>
      new RegExp(`^\\s*${column}\\s`).test(line))).join('\n')
    db.exec(legacy)
    db.exec("INSERT INTO music_artist(id,name,dir_path) VALUES (1,'Artist','Artist')")
    db.exec("INSERT INTO music_spotify_entity_snapshot(id,artist_id,provider,provider_entity_id,source_name) VALUES(1,1,'itunes','one','Artist')")
    db.exec("INSERT INTO music_spotify_entity_release(snapshot_id,provider_release_id,title,album_artist) VALUES(1,'one','Album','Artist')")
    db.exec(initSql)
    runMigrations(db)
    runMigrations(db)
    expect(db.prepare('SELECT title, expected_tracks, tracks_loaded FROM music_spotify_entity_release').get())
      .toEqual({ title: 'Album', expected_tracks: null, tracks_loaded: 1 })
    expect(db.prepare('SELECT catalogue_country FROM music_spotify_entity_snapshot').get())
      .toEqual({ catalogue_country: 'US' })
    for (const table of ['music_spotify_playlist_item', 'music_spotify_entity_track']) {
      const columns = (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).map((row) => row.name)
      expect(columns).toContain('match_confirmed')
      expect(columns).toContain('resolved_audio_url')
    }
    db.close()
  })

  it('promotes old row-level Spotify confirmations into reusable track choices', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(initSql)
    db.exec(`
      INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Artist', 'Artist');
      INSERT INTO music_album (id, artist_id, title, dir_path) VALUES (1, 1, 'Album', 'Artist/Album');
      INSERT INTO music_track (id, album_id, artist_id, file_path, title) VALUES (1, 1, 1, 'Artist/Album/song.mp3', 'Song');
      INSERT INTO music_playlist (id, title) VALUES (1, 'Mix'), (2, 'Other mix');
      INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
        VALUES (1, 'mix', 'https://open.spotify.com/playlist/mix');
      INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
        VALUES (2, 'other-mix', 'https://open.spotify.com/playlist/other-mix');
      INSERT INTO music_spotify_playlist_item
        (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
         album_title, spotify_url, raw_json, matched_track_id, match_confirmed)
        VALUES (1, 'spotify-song', 0, 'Song', '["Artist"]', 'Artist', 'Album',
                'https://open.spotify.com/track/spotify-song', '{}', 1, 1);
      INSERT INTO music_spotify_playlist_item
        (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
         album_title, spotify_url, raw_json)
        VALUES (2, 'spotify-song', 0, 'Song', '["Artist"]', 'Artist', 'Album',
                'https://open.spotify.com/track/spotify-song', '{}');
    `)
    runMigrations(db)
    runMigrations(db)
    expect(db.prepare('SELECT spotify_track_id, local_track_id FROM music_spotify_track_choice').all())
      .toEqual([{ spotify_track_id: 'spotify-song', local_track_id: 1 }])
    expect(db.prepare('SELECT matched_track_id, match_confirmed FROM music_spotify_playlist_item ORDER BY id').all())
      .toEqual([
        { matched_track_id: 1, match_confirmed: 1 },
        { matched_track_id: 1, match_confirmed: 1 }
      ])
    db.close()
  })

  it('backfills the global search projection for rows that predate its triggers', () => {
    const db = new Database(':memory:')
    db.exec(initSql)
    db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', 'Legacy Search Title')`).run()
    db.prepare('DELETE FROM global_search_fts').run()

    expect(() => runMigrations(db)).not.toThrow()
    expect(
      db.prepare(`SELECT name FROM global_search_fts WHERE global_search_fts MATCH 'Search'`).all()
    ).toEqual([{ name: 'Legacy Search Title' }])
  })

  it('adds unique Spotify IDs to legacy music artists and albums without losing rows', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(`CREATE TABLE music_artist (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, dir_path TEXT NOT NULL UNIQUE,
      cover_path TEXT, art_checked_at TEXT, art_source_url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE music_album (
      id INTEGER PRIMARY KEY AUTOINCREMENT, artist_id INTEGER NOT NULL REFERENCES music_artist(id) ON DELETE CASCADE,
      title TEXT NOT NULL, dir_path TEXT NOT NULL UNIQUE, year INTEGER, cover_path TEXT,
      art_checked_at TEXT, art_source_url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Legacy Artist', 'Legacy Artist');
    INSERT INTO music_album (id, artist_id, title, dir_path) VALUES (1, 1, 'Legacy Album', 'Legacy Artist/Legacy Album');`)
    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()
    expect(db.prepare('SELECT name, spotify_id FROM music_artist WHERE id=1').get()).toEqual({ name: 'Legacy Artist', spotify_id: null })
    expect(db.prepare('SELECT title, spotify_id FROM music_album WHERE id=1').get()).toEqual({ title: 'Legacy Album', spotify_id: null })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM sqlite_master WHERE type='index' AND name IN ('idx_music_artist_spotify','idx_music_album_spotify')`).get()).toEqual({ n: 2 })
  })
  it('adds nullable character gender without losing imported cast', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(`CREATE TABLE character (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT NOT NULL,
      name_native     TEXT,
      image_path      TEXT,
      description     TEXT,
      external_source TEXT,
      external_id     TEXT
    );`)
    db.prepare(
      `INSERT INTO character
         (name, image_path, external_source, external_id)
       VALUES ('Legacy Hero', 'media/hero.jpg', 'anilist-character', '10')`
    ).run()

    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()

    const columns = (db.prepare('PRAGMA table_info(character)').all() as { name: string }[]).map(
      (column) => column.name
    )
    expect(columns).toContain('gender')
    expect(db.prepare('SELECT name, image_path, gender FROM character').get()).toEqual({
      name: 'Legacy Hero',
      image_path: 'media/hero.jpg',
      gender: null
    })
  })

  it('adds Spotify playlist and entity snapshot tables without harming old music playlists', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(`CREATE TABLE music_playlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`)
    db.exec(`
      CREATE TABLE music_spotify_playlist_item (
        id INTEGER PRIMARY KEY, playlist_id INTEGER NOT NULL, spotify_track_id TEXT NOT NULL,
        matched_track_id INTEGER, UNIQUE(playlist_id, spotify_track_id)
      );
      CREATE TABLE music_spotify_entity_track (
        id INTEGER PRIMARY KEY, release_id INTEGER NOT NULL, provider_track_id TEXT NOT NULL,
        matched_track_id INTEGER, UNIQUE(release_id, provider_track_id)
      );
    `)
    db.prepare(`INSERT INTO music_playlist (title) VALUES ('Old mix')`).run()

    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()
    const tables = db
      .prepare(
        `SELECT name FROM sqlite_master WHERE type = 'table'
         AND name IN (
           'music_spotify_playlist', 'music_spotify_playlist_item',
           'music_spotify_entity_snapshot', 'music_spotify_entity_release',
           'music_spotify_entity_track', 'music_spotify_download_queue',
           'music_spotify_download_queue_selection'
         ) ORDER BY name`
      )
      .all()
    expect(tables).toEqual([
      { name: 'music_spotify_download_queue' },
      { name: 'music_spotify_download_queue_selection' },
      { name: 'music_spotify_entity_release' },
      { name: 'music_spotify_entity_snapshot' },
      { name: 'music_spotify_entity_track' },
      { name: 'music_spotify_playlist' },
      { name: 'music_spotify_playlist_item' }
    ])
    expect(db.prepare('SELECT title FROM music_playlist').all()).toEqual([{ title: 'Old mix' }])
    for (const table of ['music_spotify_playlist_item', 'music_spotify_entity_track']) {
      const columns = new Set((db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[])
        .map((column) => column.name))
      expect(columns.has('audio_source_url')).toBe(true)
      expect(columns.has('allow_unverified')).toBe(true)
      expect(columns.has('download_error')).toBe(true)
      expect(columns.has('match_confirmed')).toBe(true)
      if (table.endsWith('playlist_item')) expect(columns.has('download_skipped')).toBe(true)
    }
  })

  it('survives init.sql + migrations with its data intact (the en_word crash)', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // en_word exactly as the dictionary-only release created it: no SRS columns.
    db.exec(`CREATE TABLE en_word (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      word        TEXT NOT NULL,
      phonetic    TEXT,
      pos         TEXT,
      meaning     TEXT NOT NULL,
      example     TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX idx_en_word_word ON en_word(word);`)
    db.prepare(`INSERT INTO en_word (word, meaning) VALUES ('reticent', 'reserved')`).run()

    // This exec is the crash site in the broken release.
    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()

    // Migrations delivered the columns, the index, and kept the row.
    const cols = (db.prepare('PRAGMA table_info(en_word)').all() as { name: string }[]).map(
      (c) => c.name
    )
    expect(cols).toContain('status')
    expect(cols).toContain('due_at')
    const idx = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='index' AND name='idx_en_word_due'`)
      .get()
    expect(idx).toBeTruthy()
    const row = db.prepare('SELECT word, status FROM en_word').get() as {
      word: string
      status: string
    }
    expect(row).toEqual({ word: 'reticent', status: 'new' })
  })

  it('gains the achievement tables without touching the pre-existing library', () => {
    // Achievements added three BRAND-NEW tables (no ensureColumn, no index on a
    // migrated column), so the only thing to prove is that a DB predating them
    // picks them up on startup with its own rows untouched.
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // media_item as it was before the launcher landed: no local_dir, no
    // exe_path (both ensureColumn'd), everything else already there.
    db.exec(`CREATE TABLE media_item (
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
      rewatch_count   INTEGER NOT NULL DEFAULT 0,
      notes           TEXT,
      favorite        INTEGER NOT NULL DEFAULT 0,
      metadata        TEXT,
      external_source TEXT,
      external_id     TEXT,
      created_at      TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
    );`)
    db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('game', 'Old Save')`).run()

    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()

    const tables = (
      db
        .prepare(
          `SELECT name FROM sqlite_master WHERE type='table'
             AND name IN ('achievement','achievement_game','achievement_unlock')`
        )
        .all() as { name: string }[]
    ).map((t) => t.name)
    expect(tables.sort()).toEqual(['achievement', 'achievement_game', 'achievement_unlock'])
    // And the app's own eligibility query runs against the migrated shape.
    expect(() =>
      db
        .prepare(
          `SELECT 1 FROM media_item m WHERE m.id = 1
             AND (m.exe_path IS NOT NULL
                  OR EXISTS (SELECT 1 FROM game_session g WHERE g.media_id = m.id)
                  OR EXISTS (SELECT 1 FROM achievement_game a WHERE a.media_id = m.id))`
        )
        .get()
    ).not.toThrow()
    expect(db.prepare('SELECT title FROM media_item').get()).toEqual({ title: 'Old Save' })

    // 2026-08: the same legacy shape predates banner_path (detail-page hero
    // art). The column must arrive by migration, and the hero's own fallback
    // query — banner_path, else the first Art-tab image — must run on it.
    const cols = (db.prepare('PRAGMA table_info(media_item)').all() as { name: string }[]).map(
      (c) => c.name
    )
    expect(cols).toContain('banner_path')
    expect(() =>
      db
        .prepare(
          `SELECT m.banner_path,
                  (SELECT file_path FROM media_image
                    WHERE media_id = m.id AND kind IN ('fanart', 'wallpaper')
                    ORDER BY CASE kind WHEN 'fanart' THEN 0 ELSE 1 END,
                             COALESCE(sort_order, 1000000), id LIMIT 1) AS fallback
             FROM media_item m WHERE m.id = 1`
        )
        .get()
    ).not.toThrow()
  })

  it('gains is_background + slideshow_item on a media_image that predates them', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // media_image exactly as the 2026-07 wallpapers release created it — the
    // Art tab's "Set background" flag and the slideshow table came later. Note
    // the pre-existing index: init.sql recreates it IF NOT EXISTS, and it must
    // not reference the migrated column.
    db.exec(`CREATE TABLE media_item (
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
      rewatch_count   INTEGER NOT NULL DEFAULT 0,
      notes           TEXT,
      favorite        INTEGER NOT NULL DEFAULT 0,
      metadata        TEXT,
      external_source TEXT,
      external_id     TEXT,
      created_at      TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE media_image (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      media_id    INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
      kind        TEXT NOT NULL,
      file_path   TEXT NOT NULL,
      source_url  TEXT,
      source      TEXT,
      width       INTEGER, height INTEGER, sort_order INTEGER,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX idx_media_image_media ON media_image(media_id, kind);`)
    db.prepare(`INSERT INTO media_item (id, media_type, title) VALUES (1, 'anime', 'Berserk')`).run()
    db.prepare(
      `INSERT INTO media_image (id, media_id, kind, file_path)
       VALUES (5, 1, 'wallpaper', 'pictures/Berserk (anime)/wallpapers/a.jpg')`
    ).run()

    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()

    const cols = (db.prepare('PRAGMA table_info(media_image)').all() as { name: string }[]).map(
      (c) => c.name
    )
    expect(cols).toContain('is_background')
    // The existing image survives and defaults to "not the background".
    expect(db.prepare('SELECT is_background FROM media_image WHERE id=5').get()).toEqual({
      is_background: 0
    })
    expect(
      db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='slideshow_item'`).get()
    ).toBeTruthy()

    // The app's own queries against the migrated shape: the Art-tab row read
    // (LEFT JOIN onto the new table) and the backdrop lookup in mediaRepo.get.
    expect(() =>
      db
        .prepare(
          `SELECT i.id, i.is_background, s.file_name AS slideshow_file
             FROM media_image i LEFT JOIN slideshow_item s ON s.image_id = i.id
            WHERE i.media_id=? AND i.kind=? ORDER BY i.sort_order, i.id`
        )
        .all(1, 'wallpaper')
    ).not.toThrow()
    expect(() =>
      db
        .prepare(
          'SELECT file_path FROM media_image WHERE media_id = ? AND is_background = 1 ORDER BY id LIMIT 1'
        )
        .get(1)
    ).not.toThrow()

    // Re-running migrations is a no-op, and the new FK bites.
    runMigrations(db)
    db.prepare(`INSERT INTO slideshow_item (image_id, file_name) VALUES (5, 'Berserk - a.jpg')`).run()
    db.prepare('DELETE FROM media_item WHERE id=1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 0 })
    db.close()
  })

  it('NO init.sql statement references a column that only migrations create', () => {
    // The drift guard: parses the real ensureColumn list out of connection.ts
    // and cross-checks every index in init.sql against it, so the next index
    // added to the wrong file fails here instead of on someone's live DB.
    const connection = read('../src/main/db/connection.ts')
    const migrated = new Set(
      [...connection.matchAll(/ensureColumn\(sqlite, '(\w+)', '(\w+)'/g)].map(
        (m) => `${m[1]}.${m[2]}`
      )
    )
    expect(migrated.size).toBeGreaterThan(10) // the regex still matches reality

    const offenders: string[] = []
    for (const m of initSql.matchAll(
      /CREATE (?:UNIQUE )?INDEX IF NOT EXISTS (\w+) ON (\w+)\s*\(([^)]*)\)/g
    )) {
      const [, name, table, cols] = m
      for (const raw of cols.split(',')) {
        const col = raw.trim().split(/\s/)[0]
        if (migrated.has(`${table}.${col}`)) offenders.push(`${name} → ${table}.${col}`)
      }
    }
    expect(offenders).toEqual([])
  })
})
describe('a live wrestling DB imported before loose matches existed', () => {
  it('relaxes the NOT NULL event links without losing a row', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // Exactly the shape the first wrestling release created: event_id NOT NULL
    // on both tables, and no show_label/match_date/method.
    db.exec(`
      CREATE TABLE wrestling_event (
        id INTEGER PRIMARY KEY AUTOINCREMENT, promotion TEXT NOT NULL, name TEXT NOT NULL,
        wiki_title TEXT UNIQUE, series TEXT, event_date TEXT, venue TEXT, city TEXT,
        attendance INTEGER, buyrate TEXT, tagline TEXT, poster_path TEXT, lead TEXT,
        local_dir TEXT, favorite INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE wrestling_match (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL REFERENCES wrestling_event(id) ON DELETE CASCADE,
        sort_order INTEGER NOT NULL DEFAULT 0, title TEXT NOT NULL, result_text TEXT,
        stipulation TEXT, championship TEXT, duration_seconds INTEGER,
        outcome TEXT NOT NULL DEFAULT 'unknown', card_slot TEXT, card_label TEXT,
        rating REAL, favorite INTEGER NOT NULL DEFAULT 0, video_id INTEGER,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE wrestling_video (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL REFERENCES wrestling_event(id) ON DELETE CASCADE,
        file_path TEXT NOT NULL, title TEXT NOT NULL, number REAL, season INTEGER,
        sort_order INTEGER NOT NULL DEFAULT 0, file_mtime INTEGER, file_size INTEGER,
        duration REAL, width INTEGER, height INTEGER, video_codec TEXT, audio_codec TEXT,
        container TEXT, playability TEXT, resume_seconds REAL, watched_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        UNIQUE(event_id, file_path)
      );
      INSERT INTO wrestling_event (id, promotion, name, wiki_title, event_date)
        VALUES (1, 'wwe', 'WrestleMania X-Seven', 'WrestleMania X-Seven', '2001-04-01');
      INSERT INTO wrestling_match (id, event_id, sort_order, title, rating, favorite)
        VALUES (7, 1, 0, 'Austin vs. The Rock', 5, 1);
      INSERT INTO wrestling_video (id, event_id, file_path, title, resume_seconds)
        VALUES (3, 1, 'WM17/main.mkv', 'Main event', 1234);
    `)

    db.exec(initSql)
    runMigrations(db)

    // The personal layer is exactly where it was — this migration rewrites both
    // tables, so a lost rating or resume position would be silent data loss.
    expect(db.prepare('SELECT * FROM wrestling_match WHERE id = 7').get()).toMatchObject({
      id: 7,
      event_id: 1,
      title: 'Austin vs. The Rock',
      rating: 5,
      favorite: 1
    })
    expect(db.prepare('SELECT * FROM wrestling_video WHERE id = 3').get()).toMatchObject({
      id: 3,
      event_id: 1,
      file_path: 'WM17/main.mkv',
      resume_seconds: 1234
    })

    // And the constraint is gone, so a loose match can exist.
    const notNull = (t: string): number =>
      (db.prepare(`PRAGMA table_info(${t})`).all() as { name: string; notnull: number }[]).find(
        (c) => c.name === 'event_id'
      )!.notnull
    expect(notNull('wrestling_match')).toBe(0)
    expect(notNull('wrestling_video')).toBe(0)
    expect(() =>
      db
        .prepare(
          `INSERT INTO wrestling_match (event_id, show_label, sort_order, title)
           VALUES (NULL, 'Raw', 0, 'A loose one')`
        )
        .run()
    ).not.toThrow()

    // Re-running is a no-op rather than a second rebuild.
    runMigrations(db)
    expect(db.prepare('SELECT COUNT(*) AS n FROM wrestling_match').get()).toEqual({ n: 2 })

    // The FK still bites: deleting the event takes its card, not the loose one.
    db.prepare('DELETE FROM wrestling_event WHERE id = 1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM wrestling_match').get()).toEqual({ n: 1 })
    db.close()
  })
})
