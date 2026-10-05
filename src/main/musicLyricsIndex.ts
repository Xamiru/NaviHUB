import type Database from 'better-sqlite3'
import { lyricSearchDocument } from '@shared/lyrics'

// The lyrics search index: one normalized document per track in
// music_lyrics_fts, rowid = track id. Takes the database as a parameter because
// runMigrations (db/connection.ts) also uses it to index lyrics stored before
// the index existed. Deleting a music_track_lyrics row clears its document
// through a trigger in init.sql.

export function writeLyricsIndex(
  db: Database.Database,
  trackId: number,
  synced: string | null,
  plain: string | null
): void {
  db.prepare('DELETE FROM music_lyrics_fts WHERE rowid = ?').run(trackId)
  const body = lyricSearchDocument(synced, plain)
  if (body) db.prepare('INSERT INTO music_lyrics_fts(rowid, body) VALUES (?, ?)').run(trackId, body)
}

export function rebuildLyricsIndex(db: Database.Database): void {
  const rows = db
    .prepare("SELECT track_id, synced, plain FROM music_track_lyrics WHERE state = 'found'")
    .all() as { track_id: number; synced: string | null; plain: string | null }[]
  if (!rows.length) return
  db.transaction(() => {
    db.prepare('DELETE FROM music_lyrics_fts').run()
    for (const row of rows) writeLyricsIndex(db, row.track_id, row.synced, row.plain)
  })()
}
