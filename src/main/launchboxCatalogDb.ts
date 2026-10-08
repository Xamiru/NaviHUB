import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'

// The games catalog v2 lives in its own SQLite file under userData, like the
// RAWG pack (gamesCatalogDb.ts): downloaded prebuilt, rebuildable, and outside
// navihub.db so exports never carry it. Split out so tests can vi.mock it and
// drive launchboxCatalog.ts against an in-memory pack built from
// LAUNCHBOX_CATALOG_DDL.

export function launchboxCatalogPath(): string {
  return join(app.getPath('userData'), 'games-catalog.db')
}

export function inspectLaunchboxCatalog(path: string): { workCount: number; snapshot: string | null } {
  const db = new Database(path, { fileMustExist: true, readonly: true })
  try {
    if (db.pragma('quick_check', { simple: true }) !== 'ok') {
      throw new Error('Games catalog database failed its integrity check')
    }
    const workCount = (db.prepare('SELECT COUNT(*) AS n FROM lb_work').get() as { n: number }).n
    if (workCount <= 0) throw new Error('Games catalog database contains no games')
    const snap = db.prepare(`SELECT value FROM lb_meta WHERE key = 'snapshot'`).get() as
      | { value: string }
      | undefined
    return { workCount, snapshot: snap?.value ?? null }
  } finally {
    db.close()
  }
}

let _db: Database.Database | null = null

// Null when the pack isn't installed — callers surface a friendly message.
export function getLaunchboxDb(): Database.Database | null {
  if (_db) return _db
  try {
    _db = new Database(launchboxCatalogPath(), { fileMustExist: true, readonly: true })
    return _db
  } catch {
    return null
  }
}

// After a (re)install swaps the file the old handle must not linger; also in
// the before-quit list beside closeCatalogDb.
export function closeLaunchboxDb(): void {
  try {
    _db?.close()
  } catch {
    // Already gone.
  }
  _db = null
}
