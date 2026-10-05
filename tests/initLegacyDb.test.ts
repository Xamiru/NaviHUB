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

import { migrateFootballCoverageUniqueness, runMigrations } from '../src/main/db/connection'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const initSql = read('../src/main/db/init.sql')

describe('a live DB that predates newer columns', () => {
  it('adds game runs and track tags without replacing legacy sessions, albums or playlists', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(initSql.slice(0, initSql.indexOf('-- Personal playthroughs and listening collections.')))
    db.exec(`INSERT INTO media_item(id,media_type,title,progress) VALUES(1,'game','Existing game',40);
      INSERT INTO game_session(id,media_id,started_at,ended_at,duration) VALUES(9,1,'2026-09-01','2026-09-02',3600);
      INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist');
      INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album');
      INSERT INTO music_track(id,album_id,artist_id,file_path,title,play_count) VALUES(1,1,1,'song.mp3','Song',12);
      INSERT INTO music_playlist(id,title) VALUES(1,'Saved mix');
      INSERT INTO music_playlist_track(playlist_id,track_id) VALUES(1,1);`)
    db.exec(initSql)
    runMigrations(db)
    db.exec(initSql)
    runMigrations(db)
    db.exec(`INSERT INTO game_playthrough(id,media_id,title,kind,state) VALUES(1,1,'Replay','replay','active');
      INSERT INTO game_playthrough_session(session_id,run_id) VALUES(9,1);
      INSERT INTO music_track_personal(track_id,standout) VALUES(1,1);`)
    expect(db.prepare('SELECT progress FROM media_item WHERE id=1').get()).toEqual({ progress: 40 })
    expect(db.prepare('SELECT duration FROM game_session WHERE id=9').get()).toEqual({ duration: 3600 })
    expect(db.prepare('SELECT play_count FROM music_track WHERE id=1').get()).toEqual({ play_count: 12 })
    expect(db.prepare('SELECT track_id FROM music_playlist_track').all()).toEqual([{ track_id: 1 }])
    expect(db.pragma('foreign_key_check')).toEqual([])
    expect(db.pragma('integrity_check', { simple: true })).toBe('ok')
    db.close()
  })

  it('indexes lyrics stored before lyrics search existed, once', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(initSql)
    db.exec(`DROP TRIGGER music_lyrics_fts_delete;
      DROP TABLE music_lyrics_fts;
      INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist');
      INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album');
      INSERT INTO music_track(id,album_id,artist_id,file_path,title) VALUES(1,1,1,'song.mp3','Song');
      INSERT INTO music_track_lyrics(track_id,state,synced,source) VALUES(1,'found','[00:04.00]Stored before search','lrclib');`)
    db.exec(initSql)
    runMigrations(db)
    db.exec(initSql)
    runMigrations(db)
    expect(db.prepare("SELECT rowid, body FROM music_lyrics_fts WHERE music_lyrics_fts MATCH '\"before search\"'").all()).toEqual([
      { rowid: 1, body: 'stored before search' }
    ])
    db.close()
  })

  it('drops the retired album journal tables while keeping track tags', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(initSql)
    db.exec(`CREATE TABLE music_album_personal (
        album_id INTEGER PRIMARY KEY REFERENCES music_album(id) ON DELETE CASCADE,
        rating REAL, shelf TEXT, review TEXT NOT NULL DEFAULT '', tags_json TEXT NOT NULL DEFAULT '[]');
      CREATE TABLE music_listen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        album_id INTEGER NOT NULL REFERENCES music_album(id) ON DELETE CASCADE,
        listened_on TEXT NOT NULL, rating REAL, notes TEXT NOT NULL DEFAULT '');
      CREATE INDEX idx_music_listen_album ON music_listen(album_id,listened_on);
      INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist');
      INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album');
      INSERT INTO music_track(id,album_id,artist_id,file_path,title) VALUES(1,1,1,'song.mp3','Song');
      INSERT INTO music_album_personal(album_id,rating) VALUES(1,8.5);
      INSERT INTO music_listen(album_id,listened_on) VALUES(1,'2026-09-23');
      INSERT INTO music_track_personal(track_id,standout,tags_json) VALUES(1,1,'["calm"]');`)
    runMigrations(db)
    db.exec(initSql)
    runMigrations(db)
    for (const table of ['music_album_personal', 'music_listen']) {
      expect(db.prepare("SELECT name FROM sqlite_master WHERE name=?").get(table)).toBeUndefined()
    }
    expect(db.prepare('SELECT standout,tags_json FROM music_track_personal').get()).toEqual({ standout: 1, tags_json: '["calm"]' })
    expect(db.pragma('foreign_key_check')).toEqual([])
    db.close()
  })

  it('drops the retired soundtrack association table', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(initSql)
    db.exec(`CREATE TABLE soundtrack_link (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        album_id INTEGER REFERENCES music_album(id) ON DELETE CASCADE,
        track_id INTEGER REFERENCES music_track(id) ON DELETE CASCADE,
        media_id INTEGER REFERENCES media_item(id) ON DELETE CASCADE,
        wrestler_id INTEGER REFERENCES wrestling_wrestler(id) ON DELETE CASCADE,
        label TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '');
      CREATE INDEX idx_soundtrack_media ON soundtrack_link(media_id);
      INSERT INTO media_item(id,media_type,title) VALUES(1,'anime','Show');
      INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist');
      INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album');
      INSERT INTO soundtrack_link(album_id,media_id) VALUES(1,1);`)
    runMigrations(db)
    db.exec(initSql)
    runMigrations(db)
    expect(db.prepare("SELECT name FROM sqlite_master WHERE name LIKE '%soundtrack%'").all()).toEqual([])
    expect(db.prepare('SELECT title FROM music_album WHERE id=1').get()).toEqual({ title: 'Album' })
    expect(db.pragma('foreign_key_check')).toEqual([])
    db.close()
  })

  it('adds all hobby-depth tables to a pre-existing library idempotently', () => {
    const db = new Database(':memory:')
    db.exec(initSql.slice(0, initSql.indexOf('-- Personal VN reading state')))
    db.exec("INSERT INTO media_item(id,media_type,title,progress) VALUES(1,'visual_novel','Existing VN',123)")
    db.exec(initSql)
    runMigrations(db)
    db.exec(initSql)
    runMigrations(db)
    db.exec("INSERT INTO vn_reading_node(media_id,kind,title) VALUES(1,'chapter','Chapter one')")
    for (const table of ['vn_reading_resume', 'vn_notebook', 'vn_text_capture', 'vn_release_cache', 'vn_edition', 'wrestling_journey', 'wrestling_journey_step', 'wrestling_journey_viewing']) {
      expect(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(table)).toEqual({ name: table })
    }
    expect(db.pragma('foreign_key_check')).toEqual([])
    expect(db.prepare('SELECT progress FROM media_item WHERE id=1').get()).toEqual({ progress: 123 })
    expect(db.pragma('integrity_check', { simple: true })).toBe('ok')
    db.close()
  })
  it('adds Football crest, colour and reference columns to a pre-existing archive', () => {
    const db = new Database(':memory:')
    const legacy = initSql
      .replace(/^\s*image_path       TEXT,\n(?=\s*created_at)/m, '')
      .replace(/^\s*(primary_color|secondary_color|venue|venue_capacity)\s+\w+,\n/gm, '')
      .replace(/^\s*(position|height_cm|birth_place|foot)\s+\w+,\n/gm, '')
      .replace(/^\s*(home_formation|away_formation|home_manager|away_manager)\s+\w+,\n/gm, '')
    expect(legacy).not.toContain('primary_color')
    expect(legacy).not.toContain('home_formation')
    db.exec(legacy)
    db.exec(`INSERT INTO football_team (id,name) VALUES (1,'Arsenal')`)
    db.exec(initSql)
    runMigrations(db)
    db.exec(initSql)
    runMigrations(db)
    db.exec(`UPDATE football_team SET primary_color='#ef0107', venue='Highbury', venue_capacity=38419 WHERE id=1`)
    db.exec(`INSERT INTO football_person (id,name,role,position,height_cm,birth_place) VALUES (1,'Thierry Henry','player','Forward',188,'Les Ulis')`)
    db.exec(`UPDATE football_competition SET image_path='media/logo.png'`)
    expect(db.prepare('SELECT name,primary_color,venue_capacity FROM football_team').get()).toEqual({
      name: 'Arsenal', primary_color: '#ef0107', venue_capacity: 38419
    })
    expect(db.prepare('SELECT height_cm FROM football_person').get()).toEqual({ height_cm: 188 })
    db.exec(`UPDATE football_person SET foot='right'`)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM pragma_table_info('football_match')
      WHERE name IN ('home_formation','away_formation','home_manager','away_manager')`).get()).toEqual({ n: 4 })
    db.close()
  })

  it('deduplicates competition-level Football coverage before enforcing uniqueness', () => {
    const db = new Database(':memory:')
    db.exec(initSql)
    db.prepare(`INSERT INTO football_competition
      (id,key,name,scope,format) VALUES (1,'premier-league','Premier League','domestic','league')`
    ).run()
    db.prepare(`INSERT INTO football_coverage
      (competition_id,source,facet,state,item_count,checked_at)
      VALUES (1,'wikimedia','honours','complete',100,'2026-01-01')`).run()
    db.prepare(`INSERT INTO football_coverage
      (competition_id,source,facet,state,item_count,checked_at)
      VALUES (1,'wikimedia','honours','partial',110,'2026-02-01')`).run()

    migrateFootballCoverageUniqueness(db)
    migrateFootballCoverageUniqueness(db)

    expect(db.prepare(`SELECT state,item_count FROM football_coverage`).all()).toEqual([
      { state: 'complete', item_count: 100 }
    ])
    expect(() => db.prepare(`INSERT INTO football_coverage
      (competition_id,source,facet,state) VALUES (1,'wikimedia','honours','partial')`).run()
    ).toThrow()
    expect(db.prepare(`SELECT name FROM sqlite_master WHERE type='index'
      AND name='uniq_football_coverage_competition'`).get()).toBeTruthy()
    db.close()
  })

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
  it('adds the genre scan flag to legacy music tracks so the next scan reads their genres', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(`CREATE TABLE music_artist (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, dir_path TEXT NOT NULL UNIQUE);
    CREATE TABLE music_album (id INTEGER PRIMARY KEY AUTOINCREMENT, artist_id INTEGER NOT NULL REFERENCES music_artist(id) ON DELETE CASCADE,
      title TEXT NOT NULL, dir_path TEXT NOT NULL UNIQUE, year INTEGER);
    CREATE TABLE music_track (id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_id INTEGER NOT NULL REFERENCES music_album(id) ON DELETE CASCADE,
      artist_id INTEGER NOT NULL REFERENCES music_artist(id) ON DELETE CASCADE,
      file_path TEXT NOT NULL UNIQUE, file_mtime INTEGER, title TEXT NOT NULL, track_no INTEGER, disc_no INTEGER,
      duration REAL, tag_artist TEXT, liked_at TEXT, play_count INTEGER NOT NULL DEFAULT 0, last_played_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now')));
    INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Artist', 'Artist');
    INSERT INTO music_album (id, artist_id, title, dir_path) VALUES (1, 1, 'Album', 'Artist/Album');
    INSERT INTO music_track (id, album_id, artist_id, file_path, file_mtime, title, play_count)
      VALUES (1, 1, 1, 'Artist/Album/song.mp3', 1000, 'Song', 7);`)
    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()
    expect(db.prepare('SELECT play_count, genres_scanned FROM music_track WHERE id=1').get())
      .toEqual({ play_count: 7, genres_scanned: 0 })
    db.exec(`INSERT INTO music_album (id, artist_id, title, dir_path, year) VALUES
      (2, 1, 'Zero', 'Artist/Zero', 0), (3, 1, 'Dated', 'Artist/Dated', 20140530), (4, 1, 'Fine', 'Artist/Fine', 1997)`)
    runMigrations(db)
    expect(db.prepare('SELECT id, year FROM music_album WHERE id > 1 ORDER BY id').all())
      .toEqual([{ id: 2, year: null }, { id: 3, year: null }, { id: 4, year: 1997 }])
    db.prepare("INSERT INTO music_track_genre (track_id, genre) VALUES (1, 'Rock')").run()
    db.prepare('DELETE FROM music_track WHERE id=1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track_genre').get()).toEqual({ n: 0 })
    db.close()
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

  it('installs the image-override triggers on a library that predates them', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(`CREATE TABLE character (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      name_native TEXT,
      image_path  TEXT,
      description TEXT
    );
    INSERT INTO character (id, name, image_path) VALUES (1, 'Legacy Hero', 'media/hero.jpg');`)

    expect(() => db.exec(initSql)).not.toThrow()
    expect(() => runMigrations(db)).not.toThrow()

    db.exec(`INSERT INTO image_override (kind, entity_id, manual_path, provider_path)
               VALUES ('character', 1, 'media/mine.jpg', 'media/hero.jpg');
             UPDATE character SET image_path = 'media/mine.jpg' WHERE id = 1;
             UPDATE character SET image_path = 'media/reimported.jpg' WHERE id = 1;`)
    expect(db.prepare('SELECT image_path FROM character').get()).toEqual({
      image_path: 'media/mine.jpg'
    })
    expect(db.prepare('SELECT provider_path FROM image_override').get()).toEqual({
      provider_path: 'media/reimported.jpg'
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
  })

  it('drops the retired gacha tracker, its checklist rows and its orphaned images', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // A pre-2026-09-26 library: the gacha tables (trimmed to the columns the
    // retirement reads) with a unit, a build, art, a chat screenshot and dailies.
    db.exec(initSql)
    db.exec(`CREATE TABLE gacha_unit (id INTEGER PRIMARY KEY, game TEXT, name TEXT, image_path TEXT);
      CREATE TABLE gacha_build (id INTEGER PRIMARY KEY,
        unit_id INTEGER NOT NULL REFERENCES gacha_unit(id) ON DELETE CASCADE);
      CREATE TABLE gacha_banner (id INTEGER PRIMARY KEY, image_path TEXT);
      CREATE TABLE gacha_meta (game TEXT, key TEXT, value TEXT);
      CREATE TABLE gacha_chat_thread (id INTEGER PRIMARY KEY);
      CREATE TABLE gacha_chat_message (id INTEGER PRIMARY KEY,
        thread_id INTEGER REFERENCES gacha_chat_thread(id) ON DELETE CASCADE, attachments TEXT);
      CREATE TABLE gacha_coach_note (id INTEGER PRIMARY KEY);
      INSERT INTO gacha_unit VALUES (1, 'fgo', 'Mash', 'media/dl-mash'), (2, 'fgo', 'No art', NULL);
      INSERT INTO gacha_build VALUES (1, 1);
      INSERT INTO gacha_banner VALUES (1, 'media/dl-shared');
      INSERT INTO gacha_meta VALUES ('fgo', 'image', 'media/dl-game'), ('fgo', 'news.fetchedAt', '2026-07-09');
      INSERT INTO gacha_chat_thread VALUES (1);
      INSERT INTO gacha_chat_message VALUES (1, 1, '["media/paste-1.png"]'), (2, 1, NULL);
      INSERT INTO media_item (id, media_type, title, cover_path) VALUES (1, 'anime', 'Keeps', 'media/dl-shared');
      INSERT INTO checklist_task (task_key, cadence) VALUES ('gacha-daily-fgo', 'daily'), ('jp-reviews', 'daily');
      INSERT INTO checklist_log (task_key, cadence, period_key)
        VALUES ('gacha-daily-fgo', 'daily', '2026-09-20'), ('jp-reviews', 'daily', '2026-09-20');`)

    // media/dl-shared is also a cover, so it survives.
    expect(runMigrations(db).sort()).toEqual(['media/dl-game', 'media/dl-mash', 'media/paste-1.png'])
    const left = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name GLOB 'gacha_*'").all()
    expect(left).toEqual([])
    expect(db.prepare('SELECT task_key FROM checklist_task').all()).toEqual([{ task_key: 'jp-reviews' }])
    expect(db.prepare('SELECT task_key FROM checklist_log').all()).toEqual([{ task_key: 'jp-reviews' }])

    db.exec(initSql)
    expect(runMigrations(db)).toEqual([])
    expect(db.pragma('foreign_key_check')).toEqual([])
    expect(db.pragma('integrity_check', { simple: true })).toBe('ok')
    db.close()
  })

  it('drops the retired banner_path and hands back only its orphaned files', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // A 2026-08/09 library: the hero's banner column, some rows filled.
    db.exec(initSql)
    db.exec('ALTER TABLE media_item ADD COLUMN banner_path TEXT')
    db.exec(`INSERT INTO media_item(id,media_type,title,cover_path,banner_path) VALUES
      (1,'anime','Has banner','media/dl-cover-1','media/dl-banner-1'),
      (2,'movie','Banner is a cover','media/dl-cover-2','media/dl-cover-1'),
      (3,'anime','No banner',NULL,NULL),
      (4,'anime','Escapes media','media/dl-cover-4','media/../navihub.db')`)

    expect(runMigrations(db)).toEqual(['media/dl-banner-1'])
    const cols = (db.prepare('PRAGMA table_info(media_item)').all() as { name: string }[]).map(
      (c) => c.name
    )
    expect(cols).not.toContain('banner_path')
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_item').get()).toEqual({ n: 4 })

    db.exec(initSql)
    expect(runMigrations(db)).toEqual([])
    expect(db.pragma('integrity_check', { simple: true })).toBe('ok')
    db.close()
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

  it('relaxes media_image.media_id for Unsorted pictures, keeping rows, index and child FKs', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    // The 2026-08 shape: is_background and slideshow_item exist, media_id is
    // still NOT NULL and is_favorite does not.
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
      is_background INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX idx_media_image_media ON media_image(media_id, kind);
    CREATE TABLE slideshow_item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_id INTEGER NOT NULL UNIQUE REFERENCES media_image(id) ON DELETE CASCADE,
      file_name TEXT NOT NULL,
      added_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO media_item (id, media_type, title) VALUES (1, 'anime', 'Berserk');
    INSERT INTO media_image (id, media_id, kind, file_path, width, height, is_background)
      VALUES (5, 1, 'wallpaper', 'pictures/Berserk (anime)/wallpapers/a.jpg', 1920, 1080, 1);
    INSERT INTO slideshow_item (image_id, file_name) VALUES (5, 'Berserk - a.jpg');`)

    db.exec(initSql)
    runMigrations(db)

    const cols = db.prepare('PRAGMA table_info(media_image)').all() as {
      name: string
      notnull: number
    }[]
    expect(cols.find((c) => c.name === 'media_id')?.notnull).toBe(0)
    expect(cols.map((c) => c.name)).toContain('is_favorite')
    expect(db.prepare('SELECT media_id, width, is_background, is_favorite FROM media_image').get())
      .toEqual({ media_id: 1, width: 1920, is_background: 1, is_favorite: 0 })
    const indexes = (
      db.prepare(`SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='media_image'`).all() as {
        name: string
      }[]
    ).map((r) => r.name)
    expect(indexes).toEqual(expect.arrayContaining(['idx_media_image_media', 'idx_media_image_favorite']))
    expect(db.prepare('SELECT file_name FROM slideshow_item WHERE image_id=5').get()).toEqual({
      file_name: 'Berserk - a.jpg'
    })

    // Unsorted rows are now legal, and the gallery tables hang off the rebuilt table.
    db.prepare(
      `INSERT INTO media_image (id, media_id, kind, file_path) VALUES (6, NULL, 'fanart', 'pictures/Unsorted/fanart/b.png')`
    ).run()
    db.prepare(`INSERT INTO picture_album (id, name) VALUES (1, 'Mixed')`).run()
    db.prepare('INSERT INTO picture_album_item (album_id, image_id) VALUES (1, 5), (1, 6)').run()

    // Idempotent, and the cascades still bite through the rebuilt table.
    runMigrations(db)
    db.prepare('DELETE FROM media_item WHERE id=1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT image_id FROM picture_album_item').all()).toEqual([{ image_id: 6 }])
    expect(db.pragma('foreign_key_check')).toEqual([])
    expect(db.pragma('integrity_check', { simple: true })).toBe('ok')
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

describe('music URL queue migration', () => {
  it('preserves saved playlist selections and queue ordering across the CHECK rebuild', () => {
    const db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    const old = initSql.slice(0, initSql.indexOf('CREATE TABLE IF NOT EXISTS music_source_evidence'))
      .replace("'entity','playlist','url'", "'entity','playlist'")
      .replace(" OR\n    (source_kind = 'url' AND snapshot_id IS NULL AND playlist_id IS NULL)", '')
    db.exec(old)
    db.exec(`INSERT INTO music_playlist(id,title) VALUES(9,'Saved mix');
      INSERT INTO music_spotify_playlist(playlist_id,spotify_id,source_url) VALUES(9,'saved','https://open.spotify.com/playlist/saved');
      INSERT INTO music_spotify_playlist_item(id,playlist_id,spotify_track_id,position,title,artists_json,primary_artist,album_title,spotify_url,raw_json)
      VALUES(12,9,'song',0,'Song','["Artist"]','Artist','Album','https://open.spotify.com/track/song','{}');
      UPDATE music_spotify_playlist_item SET audio_source_url='https://youtu.be/abcdefghijk',match_confirmed=1 WHERE id=12;
      INSERT INTO music_spotify_download_queue(id,source_kind,playlist_id,position,state) VALUES(17,'playlist',9,3,'paused');
      INSERT INTO music_spotify_download_queue_selection(id,queue_id,playlist_item_id,position) VALUES(24,17,12,2);`)
    db.exec(initSql)
    runMigrations(db)
    runMigrations(db)
    expect(db.prepare('SELECT id,playlist_id,position,state FROM music_spotify_download_queue').all()).toEqual([{id:17,playlist_id:9,position:3,state:'paused'}])
    expect(db.prepare('SELECT id,queue_id,playlist_item_id,position FROM music_spotify_download_queue_selection').all()).toEqual([{id:24,queue_id:17,playlist_item_id:12,position:2}])
    expect(() => db.prepare("INSERT INTO music_spotify_download_queue(source_kind) VALUES('url')").run()).not.toThrow()
    expect(db.prepare('SELECT audio_source_url,match_confirmed FROM music_spotify_playlist_item WHERE id=12').get()).toEqual({ audio_source_url: 'https://youtu.be/abcdefghijk', match_confirmed: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_source_evidence').get()).toEqual({ n: 0 })
    expect(db.pragma('foreign_key_check')).toEqual([])
    expect(db.pragma('foreign_keys', { simple: true })).toBe(1)
    db.close()
  })
})
