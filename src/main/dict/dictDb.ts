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

// Deletes rows left behind by a crash mid-import or mid-removal: every
// registry row (`dict`, `sentence_bank`, `stroke_set`, ...) is written last and
// deleted last, so child rows whose parent id has no registry entry are
// orphans. This runs on every open, where scanning every child table read
// hundreds of MB from disk on a cold launch, so it only seeks: each child's
// parent id leads an index or its WITHOUT ROWID key, and its distinct values
// are read one seek apiece.
//
// The FTS tables cannot be seeked. Their rows are written in the same
// transaction as their content table's rows and deleted before them, so an
// orphaned FTS row always has an orphaned content row beside it (gloss_fts
// with term, sentence_fts with sentence); an id's rows go in one transaction,
// FTS first, so a crash mid-sweep cannot split them either.
export function sweepOrphans(db: Database.Database): void {
  for (const { registry, column, children, fts } of ORPHAN_SWEEPS) {
    const live = new Set(
      (db.prepare(`SELECT id FROM ${registry}`).all() as { id: number }[]).map((r) => r.id)
    )
    const orphans = new Set<number>()
    for (const child of children) {
      for (const id of distinctParentIds(db, child, column)) if (!live.has(id)) orphans.add(id)
    }
    const purge = db.transaction((id: number) => {
      for (const table of [...fts, ...children]) {
        db.prepare(`DELETE FROM ${table} WHERE ${column} = ?`).run(id)
      }
    })
    for (const id of orphans) purge(id)
  }
}

export const ORPHAN_SWEEPS: ReadonlyArray<{
  registry: string
  column: string
  children: readonly string[]
  fts: readonly string[]
}> = [
  { registry: 'dict', column: 'dict_id', children: ['term', 'kanji', 'pitch', 'tag', 'freq'], fts: ['gloss_fts'] },
  { registry: 'sentence_bank', column: 'bank_id', children: ['sentence'], fts: ['sentence_fts'] },
  { registry: 'stroke_set', column: 'set_id', children: ['stroke'], fts: [] },
  { registry: 'en_dict', column: 'bank_id', children: ['en_lemma', 'en_synset', 'en_exc', 'en_pron'], fts: [] },
  { registry: 'en_freq_set', column: 'bank_id', children: ['en_freq'], fts: [] },
  { registry: 'krad_set', column: 'set_id', children: ['krad', 'krad_part', 'krad_component'], fts: [] },
  { registry: 'grammar_bank', column: 'bank_id', children: ['grammar_point'], fts: [] },
  { registry: 'audio_bank', column: 'bank_id', children: ['sentence_audio'], fts: [] },
  { registry: 'pair_set', column: 'set_id', children: ['minimal_pair'], fts: [] }
]

// The distinct non-null values of an indexed column, one index seek each.
export function distinctParentIds(db: Database.Database, table: string, column: string): number[] {
  const next = db.prepare(
    `SELECT ${column} AS id FROM ${table} WHERE ${column} > ? ORDER BY ${column} LIMIT 1`
  )
  const ids: number[] = []
  let row = next.get(Number.MIN_SAFE_INTEGER) as { id: number } | undefined
  while (row) {
    ids.push(row.id)
    row = next.get(row.id) as { id: number } | undefined
  }
  return ids
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
