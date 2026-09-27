import { getSqlite } from '../db/connection'
import type { ImageOverrideKind, ImageOverrideState } from '@shared/types'

// Hand-picked images for imported entities. The row in image_override is the
// lock; the restore triggers in init.sql enforce it against every importer.
// Writing the override row BEFORE the image column is what lets setManual's
// own write through: the trigger only fires when the column differs from
// manual_path.

// `imported` is the SQL deciding whether anything automatic can overwrite the
// image. Music art always can (the scanner and the online art fetcher).
const TARGET: Record<ImageOverrideKind, { table: string; column: string; imported: string; touch: boolean }> = {
  media: { table: 'media_item', column: 'cover_path', imported: 'external_source IS NOT NULL', touch: true },
  person: { table: 'person', column: 'photo_path', imported: 'external_source IS NOT NULL', touch: false },
  character: { table: 'character', column: 'image_path', imported: 'external_source IS NOT NULL', touch: false },
  music_album: { table: 'music_album', column: 'cover_path', imported: '1', touch: true },
  music_artist: { table: 'music_artist', column: 'cover_path', imported: '1', touch: true }
}

function current(kind: ImageOverrideKind, id: number): { path: string | null; imported: boolean } {
  const { table, column, imported } = TARGET[kind]
  const row = getSqlite()
    .prepare(`SELECT ${column} AS path, (${imported}) AS imported FROM ${table} WHERE id = ?`)
    .get(id) as { path: string | null; imported: number } | undefined
  if (!row) throw new Error(`No ${kind} with id ${id}`)
  return { path: row.path, imported: row.imported === 1 }
}

// Explicitly removing music art ("Clear cover") releases the pick too.
export function forget(kind: ImageOverrideKind, id: number): void {
  getSqlite().prepare('DELETE FROM image_override WHERE kind = ? AND entity_id = ?').run(kind, id)
}

function writeImage(kind: ImageOverrideKind, id: number, path: string | null): void {
  const { table, column, touch: stamp } = TARGET[kind]
  const touch = stamp ? `, updated_at = datetime('now')` : ''
  getSqlite().prepare(`UPDATE ${table} SET ${column} = ?${touch} WHERE id = ?`).run(path, id)
}

export function getState(kind: ImageOverrideKind, id: number): ImageOverrideState {
  const row = getSqlite()
    .prepare('SELECT provider_path FROM image_override WHERE kind = ? AND entity_id = ?')
    .get(kind, id) as { provider_path: string | null } | undefined
  return row ? { manual: true, providerPath: row.provider_path } : { manual: false, providerPath: null }
}

// null removes the image on purpose. Hand-made entities (no external_source)
// have no import to protect against, so they just take the new path.
export function setManual(kind: ImageOverrideKind, id: number, path: string | null): void {
  const db = getSqlite()
  db.transaction(() => {
    const now = current(kind, id)
    if (now.imported) {
      // provider_path is kept from the first pick: it is the imported image,
      // not a previous manual one.
      db.prepare(
        `INSERT INTO image_override (kind, entity_id, manual_path, provider_path) VALUES (?, ?, ?, ?)
         ON CONFLICT(kind, entity_id) DO UPDATE SET manual_path = excluded.manual_path`
      ).run(kind, id, path, now.path)
    }
    writeImage(kind, id, path)
  })()
}

// Drops the lock and puts the imported image back. Returns the restored path.
export function revert(kind: ImageOverrideKind, id: number): string | null {
  const db = getSqlite()
  return db.transaction(() => {
    const row = db
      .prepare('SELECT provider_path FROM image_override WHERE kind = ? AND entity_id = ?')
      .get(kind, id) as { provider_path: string | null } | undefined
    if (!row) return current(kind, id).path
    db.prepare('DELETE FROM image_override WHERE kind = ? AND entity_id = ?').run(kind, id)
    writeImage(kind, id, row.provider_path)
    return row.provider_path
  })()
}
