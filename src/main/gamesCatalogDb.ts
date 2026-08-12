import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'

// The offline RAWG catalog lives in its OWN SQLite file under userData —
// downloaded as a prebuilt data pack, rebuildable, and deliberately outside
// navihub.db so exports never carry 100+ MB of canonical catalog. Split into
// this tiny module (the db/connection shape) so tests can vi.mock it and
// drive gamesCatalog.ts against an in-memory catalog. The pack's schema lives
// in gamesCatalogSchema.ts (electron-free, shared with the build script's
// drift guard).

export function catalogPath(): string {
  return join(app.getPath('userData'), 'rawg-catalog.db')
}

let _db: Database.Database | null = null

// Null when the pack isn't installed — callers surface a friendly message.
export function getCatalogDb(): Database.Database | null {
  if (_db) return _db
  try {
    _db = new Database(catalogPath(), { fileMustExist: true, readonly: true })
    return _db
  } catch {
    return null
  }
}

// After a (re)install swaps the file, the old handle must not linger; also in
// the before-quit list.
export function closeCatalogDb(): void {
  try {
    _db?.close()
  } catch {
    // Already gone.
  }
  _db = null
}
