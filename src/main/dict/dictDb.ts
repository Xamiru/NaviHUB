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

// Deletes rows left behind by a crash mid-import: the `dict` registry row is
// written last, so any child rows whose dict_id has no registry entry are
// orphans from an import that never finished.
function sweepOrphans(db: Database.Database): void {
  for (const table of ['term', 'kanji', 'pitch', 'tag', 'gloss_fts']) {
    db.exec(`DELETE FROM ${table} WHERE dict_id NOT IN (SELECT id FROM dict)`)
  }
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
      DROP TABLE IF EXISTS kanji;
      DROP TABLE IF EXISTS term;
      DROP TABLE IF EXISTS dict;
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
