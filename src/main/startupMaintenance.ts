// Work that must happen while NO connection holds the library database: a
// requested VACUUM ("Compact on next launch") and applying a restore.
// index.ts runs it before initDatabase(), so nothing else has the file open.
// Each step leaves a notice the window shows as a toast once it loads.

import Database from 'better-sqlite3'
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'fs'
import { basename, dirname, join } from 'path'
import type { MaintenanceResult } from '@shared/types'
import { logError, logInfo } from './logBus'
import { RESTORE_MARKER, parsePendingRestore } from './libraryBackupCore'

export const COMPACT_MARKER = 'compact-pending'

let notices: MaintenanceResult[] = []

export function requestCompact(userData: string): void {
  writeFileSync(join(userData, COMPACT_MARKER), String(Date.now()))
}

export function cancelCompact(userData: string): void {
  rmSync(join(userData, COMPACT_MARKER), { force: true })
}

export function compactPending(userData: string): boolean {
  return existsSync(join(userData, COMPACT_MARKER))
}

function mb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function compact(userData: string, dbPath: string): void {
  // The marker goes first: a VACUUM that crashes the process must not run
  // again on every launch.
  cancelCompact(userData)
  if (!existsSync(dbPath)) return
  const before = statSync(dbPath).size
  try {
    const db = new Database(dbPath)
    try {
      db.pragma('wal_checkpoint(TRUNCATE)')
      db.exec('VACUUM')
    } finally {
      db.close()
    }
    const after = statSync(dbPath).size
    logInfo('db', `compacted library database: ${before} -> ${after} bytes`)
    notices.push({ ok: true, message: `Library database compacted (${mb(before)} to ${mb(after)}).` })
  } catch (err) {
    logError('db', `compact failed: ${err instanceof Error ? err.message : String(err)}`)
    notices.push({ ok: false, message: 'Compacting the library database failed; see the log.' })
  }
}

function errText(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

// Swaps the staged (restored) database in. The library it replaces moves into
// the safety folder whole, -wal and -shm included, so "Undo last restore" can
// put it back exactly. Any failure puts every original back where it was.
function applyRestore(userData: string, dbPath: string): void {
  const markerPath = join(userData, RESTORE_MARKER)
  let raw = ''
  try {
    raw = readFileSync(markerPath, 'utf8')
  } catch (err) {
    logError('db', `restore: could not read ${RESTORE_MARKER}: ${errText(err)}`)
  }
  const pending = parsePendingRestore(raw)
  // The marker goes first, like compact's: a restore that crashes the process
  // must not be retried on every launch.
  rmSync(markerPath, { force: true })
  if (!pending || !existsSync(pending.stagedDb)) {
    notices.push({ ok: false, message: 'The restore could not find its staged database; nothing was changed.' })
    return
  }
  const stagingDir = dirname(pending.stagedDb)

  try {
    const staged = new Database(pending.stagedDb, { fileMustExist: true })
    try {
      const rows = staged.pragma('quick_check') as { quick_check: string }[]
      if (rows.length !== 1 || rows[0].quick_check !== 'ok') throw new Error(rows[0]?.quick_check ?? 'check failed')
      staged.pragma('journal_mode = DELETE')
    } finally {
      staged.close()
    }
  } catch (err) {
    logError('db', `restore: staged database failed its check: ${errText(err)}`)
    rmSync(stagingDir, { recursive: true, force: true })
    notices.push({ ok: false, message: 'The backup database is damaged, so it was not restored. Your library is unchanged.' })
    return
  }

  const moved: [string, string][] = []
  try {
    mkdirSync(pending.safetyDir, { recursive: true })
    for (const suffix of ['', '-wal', '-shm']) {
      const live = `${dbPath}${suffix}`
      if (!existsSync(live)) continue
      const kept = join(pending.safetyDir, `${basename(dbPath)}${suffix}`)
      renameSync(live, kept)
      moved.push([kept, live])
    }
    renameSync(pending.stagedDb, dbPath)
  } catch (err) {
    for (const [kept, live] of moved.reverse()) {
      try {
        renameSync(kept, live)
      } catch (undo) {
        logError('db', `restore rollback: could not move ${kept} back: ${errText(undo)}`)
      }
    }
    logError('db', `restore failed, original kept: ${errText(err)}`)
    notices.push({ ok: false, message: 'Restoring the backup failed; your library is unchanged. See the log.' })
    return
  } finally {
    rmSync(stagingDir, { recursive: true, force: true })
  }

  try {
    writeFileSync(
      join(pending.safetyDir, 'safety.json'),
      `${JSON.stringify({ createdAt: new Date().toISOString(), replacedBy: pending.label }, null, 2)}\n`
    )
  } catch (err) {
    // The restore itself succeeded; the safety copy just lists without a date.
    logError('db', `restore: could not write safety.json: ${errText(err)}`)
  }
  logInfo('db', `restored ${pending.label}; previous library kept in ${pending.safetyDir}`)
  notices.push({
    ok: true,
    message: `Restored ${pending.label}. Your previous library is kept; Settings → Backup & about can undo this.`
  })
}

// Never throws: it runs inside whenReady before the window exists, so an
// escaping fs error would leave the app running with no window at all.
export function runStartupMaintenance(userData: string, dbPath: string): void {
  try {
    if (existsSync(join(userData, RESTORE_MARKER))) applyRestore(userData, dbPath)
  } catch (err) {
    logError('db', `restore at startup failed: ${errText(err)}`)
    notices.push({ ok: false, message: 'Applying the restore failed at startup; see the log.' })
  }
  try {
    if (compactPending(userData)) compact(userData, dbPath)
  } catch (err) {
    logError('db', `compact at startup failed: ${errText(err)}`)
    notices.push({ ok: false, message: 'Compacting the library database failed; see the log.' })
  }
}

// Read once by the window after launch; a second read returns nothing.
export function takeStartupNotices(): MaintenanceResult[] {
  const out = notices
  notices = []
  return out
}
