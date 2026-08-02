import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'
import initSql from './init.sql?raw'

// Second SQLite handle, entirely separate from navihub.db (see db/connection.ts
// for the primary). The dictionary DB is large and rebuildable, so it lives in
// its own file and is dropped-and-recreated on a schema-version bump rather than
// migrated in place. Mirrors the connection.ts lifecycle: lazy open, WAL,
// checkpoint-on-close.

// Bump when init.sql changes incompatibly. On mismatch the file is wiped and the
// user re-imports their dictionaries.
const DICT_SCHEMA_VERSION = 1

let _dict: Database.Database | null = null

export function getDictDbPath(): string {
  return join(app.getPath('userData'), 'dictionaries.db')
}

// Deletes rows left behind by a crash mid-import: every registry row (`dict`,
// `sentence_bank`, `stroke_set`) is written last, so child rows whose parent id
// has no registry entry are orphans from an import that never finished.
function sweepOrphans(db: Database.Database): void {
  for (const table of ['term', 'kanji', 'pitch', 'tag', 'gloss_fts', 'freq']) {
    db.exec(`DELETE FROM ${table} WHERE dict_id NOT IN (SELECT id FROM dict)`)
  }
  for (const table of ['sentence', 'sentence_fts']) {
    db.exec(`DELETE FROM ${table} WHERE bank_id NOT IN (SELECT id FROM sentence_bank)`)
  }
  db.exec('DELETE FROM stroke WHERE set_id NOT IN (SELECT id FROM stroke_set)')
  for (const table of ['en_lemma', 'en_synset', 'en_exc', 'en_pron']) {
    db.exec(`DELETE FROM ${table} WHERE bank_id NOT IN (SELECT id FROM en_dict)`)
  }
  db.exec('DELETE FROM en_freq WHERE bank_id NOT IN (SELECT id FROM en_freq_set)')
  for (const table of ['krad', 'krad_part', 'krad_component']) {
    db.exec(`DELETE FROM ${table} WHERE set_id NOT IN (SELECT id FROM krad_set)`)
  }
  db.exec('DELETE FROM grammar_point WHERE bank_id NOT IN (SELECT id FROM grammar_bank)')
  db.exec('DELETE FROM sentence_audio WHERE bank_id NOT IN (SELECT id FROM audio_bank)')
  db.exec('DELETE FROM minimal_pair WHERE set_id NOT IN (SELECT id FROM pair_set)')
}

function open(): Database.Database {
  const db = new Database(getDictDbPath())
  db.pragma('journal_mode = WAL')

  const version = (db.pragma('user_version', { simple: true }) as number) ?? 0
  if (version !== 0 && version !== DICT_SCHEMA_VERSION) {
    // Incompatible schema: drop everything and start clean.
    db.exec(`
      DROP TABLE IF EXISTS gloss_fts;
      DROP TABLE IF EXISTS tag;
      DROP TABLE IF EXISTS pitch;
      DROP TABLE IF EXISTS freq;
      DROP TABLE IF EXISTS kanji;
      DROP TABLE IF EXISTS term;
      DROP TABLE IF EXISTS dict;
      DROP TABLE IF EXISTS sentence_fts;
      DROP TABLE IF EXISTS sentence;
      DROP TABLE IF EXISTS sentence_bank;
      DROP TABLE IF EXISTS stroke;
      DROP TABLE IF EXISTS stroke_set;
      DROP TABLE IF EXISTS en_lemma;
      DROP TABLE IF EXISTS en_synset;
      DROP TABLE IF EXISTS en_exc;
      DROP TABLE IF EXISTS en_pron;
      DROP TABLE IF EXISTS en_dict;
      DROP TABLE IF EXISTS en_freq;
      DROP TABLE IF EXISTS en_freq_set;
      DROP TABLE IF EXISTS krad;
      DROP TABLE IF EXISTS krad_part;
      DROP TABLE IF EXISTS krad_component;
      DROP TABLE IF EXISTS krad_set;
      DROP TABLE IF EXISTS grammar_point;
      DROP TABLE IF EXISTS grammar_bank;
      DROP TABLE IF EXISTS sentence_audio;
      DROP TABLE IF EXISTS audio_bank;
      DROP TABLE IF EXISTS minimal_pair;
      DROP TABLE IF EXISTS pair_set;
    `)
  }
  db.exec(initSql)
  db.pragma(`user_version = ${DICT_SCHEMA_VERSION}`)
  sweepOrphans(db)
  return db
}

export function getDictDb(): Database.Database {
  if (!_dict) _dict = open()
  return _dict
}

export function closeDictDb(): void {
  try {
    _dict?.pragma('wal_checkpoint(TRUNCATE)')
  } catch {
    // Best-effort: never block shutdown on a checkpoint failure.
  }
  _dict?.close()
  _dict = null
}
