// Settings → Backup & about: full backups and restores of the library.
// Pure decisions are in libraryBackupCore.ts, file work in libraryBackupFiles.ts;
// this module owns the pickers, the task row, the polled status and the
// restart that hands a restore to startupMaintenance.ts.
//
// A restore never edits the live database. It stages the backup's database
// under userData, copies image files in additively, merges this machine's
// settings into the STAGED copy, writes a marker and restarts; the swap
// happens at the next launch before anything opens the file.

import { app, BrowserWindow, dialog, shell } from 'electron'
import Database from 'better-sqlite3'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'fs'
import { statfs } from 'fs/promises'
import { hostname } from 'os'
import { dirname, join, relative, resolve, sep } from 'path'
import type {
  LibraryBackupEstimate,
  LibraryBackupOptions,
  LibraryBackupStatus,
  RestorePreview,
  SafetyCopy
} from '@shared/types'
import { SECRET_SETTING_KEYS, type SecretSettingKey } from '@shared/secretSettings'
import { getDbPath, getSqlite } from './db/connection'
import { audioDir, audioDirSetting, chooseFolder, historyRootDir, jpAudioDir, mediaRoot, picturesDir } from './files'
import { measureTree } from './fsMeasure'
import { logInfo, logWarn } from './logBus'
import * as tasks from './tasks'
import * as secretStorage from './secretStorage'
import * as settingsRepo from './repos/settingsRepo'
import { backupsDir } from './storageUsage'
import {
  BACKUP_FORMAT_VERSION,
  BACKUP_KIND,
  MACHINE_LOCAL_SETTING_KEYS,
  RESTORE_MARKER,
  backupBaseName,
  planSettingsMerge,
  validateManifest,
  type BackupManifest,
  type BackupRoot
} from './libraryBackupCore'
import {
  BackupCancelledError,
  copyBackupFiles,
  extractDb,
  filesToRestore,
  openBackupSource,
  removePartialsSync,
  writeBackupZip,
  type BackupSource
} from './libraryBackupFiles'

const state: LibraryBackupStatus = {
  id: null,
  kind: null,
  running: false,
  phase: 'idle',
  message: null,
  done: 0,
  total: 0,
  percent: null,
  outputPath: null,
  error: null
}

let choosing = false
let active: { controller: AbortController; handle: tasks.TaskHandle } | null = null
// A backup chosen for restore and waiting for the user's confirmation.
let inspected: { source: BackupSource; manifest: BackupManifest; stagedDb: string } | null = null

export function getStatus(): LibraryBackupStatus {
  return { ...state }
}

function stagingDir(): string {
  return join(app.getPath('userData'), 'restore-staging')
}

function currentRoots(): Record<BackupRoot, string> {
  return {
    media: mediaRoot(),
    history: historyRootDir(),
    pictures: picturesDir(),
    jpaudio: jpAudioDir(),
    audio: audioDir()
  }
}

// What a backup carries. Theme songs get their own entry only when they have
// their own folder; otherwise they are already inside Media.
function backupRoots(includePictures: boolean): Partial<Record<BackupRoot, string>> {
  const all = currentRoots()
  const roots: Partial<Record<BackupRoot, string>> = { media: all.media, history: all.history, jpaudio: all.jpaudio }
  if (includePictures) roots.pictures = all.pictures
  if (audioDirSetting()) roots.audio = all.audio
  return roots
}

function isInside(parent: string, candidate: string): boolean {
  const rel = relative(resolve(parent), resolve(candidate))
  return rel === '' || (!rel.startsWith('..') && !rel.startsWith(sep) && !/^[a-z]:/i.test(rel))
}

function errText(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

function refuseWhileTasksRun(what: string): void {
  if (state.running || choosing) throw new Error('A backup or restore is already running.')
  if (tasks.list().some((t) => t.endedAt == null)) {
    throw new Error(`Wait for the running tasks to finish before ${what}.`)
  }
}

function progress(phase: LibraryBackupStatus['phase'], message: string, done: number, total: number): void {
  const percent = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : null
  Object.assign(state, { phase, message, done, total, percent })
  active?.handle.progress({ detail: message, done, total, percent })
}

function begin(kind: 'backup' | 'restore', label: string): AbortController {
  const controller = new AbortController()
  const common = {
    label,
    route: '/settings?tab=about',
    controls: {
      cancel: () => controller.abort(),
      pauseNote: 'Backups and restores cannot be paused'
    },
    project: () =>
      state.id === handle.id
        ? {
            state: state.running ? (controller.signal.aborted ? ('cancelling' as const) : ('running' as const)) : undefined,
            detail: state.message,
            percent: state.percent,
            done: state.done,
            total: state.total,
            error: state.error
          }
        : null
  }
  // One literal kind per call: tests/taskKindSync.test.ts reads them.
  const handle =
    kind === 'backup'
      ? tasks.create({ kind: 'libraryBackup', ...common })
      : tasks.create({ kind: 'libraryRestore', ...common })
  active = { controller, handle }
  Object.assign(state, {
    id: handle.id,
    kind,
    running: true,
    phase: 'measuring',
    message: null,
    done: 0,
    total: 0,
    percent: null,
    outputPath: null,
    error: null
  })
  return controller
}

function finish(err: unknown, cancelledMessage: string): void {
  const handle = active?.handle
  const cancelled = active?.controller.signal.aborted || err instanceof BackupCancelledError
  if (err == null) {
    handle?.settle({ state: 'done' })
  } else {
    Object.assign(state, {
      running: false,
      phase: cancelled ? 'cancelled' : 'error',
      message: cancelled ? cancelledMessage : null,
      error: cancelled ? null : errText(err)
    })
    handle?.settle(cancelled ? { state: 'cancelled' } : { state: 'error', error: errText(err) })
  }
  active = null
}

async function assertFreeSpace(dir: string, bytes: number, what: string): Promise<void> {
  try {
    mkdirSync(dir, { recursive: true })
    const fs = await statfs(dir)
    if (Number(fs.bavail) * Number(fs.bsize) < bytes * 1.05) {
      throw new Error(`Not enough free space for ${what}.`)
    }
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Not enough free space')) throw err
    logWarn('app', `backup: free-space check unavailable: ${errText(err)}`)
  }
}

// ---- backup -----------------------------------------------------------------

export async function estimate(): Promise<LibraryBackupEstimate> {
  const roots = currentRoots()
  return {
    database: (await measureTree(getDbPath())).bytes,
    media: (await measureTree(roots.media)).bytes,
    history: (await measureTree(roots.history)).bytes,
    pictures: (await measureTree(roots.pictures)).bytes,
    jpaudio: (await measureTree(roots.jpaudio)).bytes,
    audio: audioDirSetting() ? (await measureTree(roots.audio)).bytes : 0
  }
}

export async function startBackup(
  options: LibraryBackupOptions,
  parent: BrowserWindow | null
): Promise<{ started: boolean }> {
  refuseWhileTasksRun('making a backup')
  choosing = true
  Object.assign(state, { phase: 'choosing', message: 'Choose where to save the backup', error: null })
  let destination: string
  try {
    const picked = await chooseFolder(parent, 'Choose where to save the backup')
    if (!picked) {
      Object.assign(state, { phase: 'idle', message: null })
      return { started: false }
    }
    destination = resolve(picked)
    const forbidden = [app.getPath('userData'), ...Object.values(backupRoots(options.includePictures))]
    if (forbidden.some((dir) => isInside(dir, destination))) {
      throw new Error('Choose a folder outside NaviHUB’s data folder and the folders being backed up.')
    }
  } catch (err) {
    Object.assign(state, { phase: 'error', message: null, error: errText(err) })
    throw err
  } finally {
    choosing = false
  }

  const controller = begin('backup', 'Backing up the library')
  void runBackup(options, destination, controller.signal)
    .then((outputPath) => {
      Object.assign(state, { running: false, phase: 'done', message: 'Backup ready', percent: 100, outputPath })
      logInfo('app', `library backup ready: ${outputPath}`)
      finish(null, '')
    })
    .catch((err) => finish(err, 'Backup cancelled'))
  return { started: true }
}

async function runBackup(options: LibraryBackupOptions, destination: string, signal: AbortSignal): Promise<string> {
  const roots = backupRoots(options.includePictures)
  progress('measuring', 'Measuring what to back up', 0, 1)
  let files = 0
  let bytes = (await measureTree(getDbPath())).bytes
  for (const dir of Object.values(roots)) {
    const m = await measureTree(dir!)
    files += m.files
    bytes += m.bytes
  }
  await assertFreeSpace(destination, bytes, 'the backup')

  const base = backupBaseName()
  let outputZip = join(destination, `${base}.zip`)
  for (let n = 2; existsSync(outputZip); n++) outputZip = join(destination, `${base} (${n}).zip`)

  await writeBackupZip({
    outputZip,
    roots,
    totalBytes: bytes,
    signal,
    snapshot: (dbPath) =>
      getSqlite()
        .backup(dbPath, {
          progress: (info) => {
            if (signal.aborted) throw new BackupCancelledError()
            progress('snapshotting', 'Copying the library database', info.totalPages - info.remainingPages, info.totalPages)
            return 100
          }
        })
        .then(() => undefined),
    manifest: (dbPath) => {
      const copy = new Database(dbPath, { readonly: true, fileMustExist: true })
      try {
        const titles = (copy.prepare('SELECT COUNT(*) AS n FROM media_item').get() as { n: number }).n
        return {
          kind: BACKUP_KIND,
          formatVersion: BACKUP_FORMAT_VERSION,
          appVersion: app.getVersion(),
          createdAt: new Date().toISOString(),
          machine: hostname(),
          includes: { media: true, history: true, pictures: !!roots.pictures, jpaudio: true, audio: !!roots.audio },
          counts: { titles, files, bytes }
        }
      } finally {
        copy.close()
      }
    },
    onPhase: (phase) =>
      progress(phase, phase === 'packing' ? 'Writing the backup file' : 'Copying the library database', 0, 1),
    onProgress: (done, total) => progress('packing', 'Writing the backup file', done, total)
  })
  return outputZip
}

export async function revealBackup(): Promise<void> {
  if (state.outputPath && existsSync(state.outputPath)) shell.showItemInFolder(state.outputPath)
}

export function cancel(): void {
  if (active) tasks.cancel(active.handle.id)
}

// Before-quit: stop a running backup or restore copy and remove its partial
// files synchronously; the helpers' own async cleanup would not run before the
// process exits. A backup chosen for restore but not applied is discarded too.
// A restore that already scheduled its restart has cleared `inspected`, so its
// staged database survives for startupMaintenance.ts.
export function cancelActiveLibraryBackup(): void {
  active?.controller.abort()
  removePartialsSync()
  try {
    discardInspected()
  } catch (err) {
    logWarn('app', `backup: could not discard the staged restore at quit: ${errText(err)}`)
  }
}

// ---- restore ----------------------------------------------------------------

function discardInspected(): void {
  inspected?.source.close()
  inspected = null
  rmSync(stagingDir(), { recursive: true, force: true })
}

export function discardRestore(): void {
  if (state.running) return
  discardInspected()
}

// Pick a backup, check it, and stage its database; nothing changes yet.
export async function chooseRestore(parent: BrowserWindow | null): Promise<RestorePreview | null> {
  refuseWhileTasksRun('restoring a backup')
  discardInspected()
  const pickerOptions = {
    title: 'Choose a NaviHUB backup',
    properties: ['openFile'] as 'openFile'[],
    filters: [{ name: 'NaviHUB backup (.zip, or manifest.json in a backup folder)', extensions: ['zip', 'json'] }]
  }
  const picked = parent ? await dialog.showOpenDialog(parent, pickerOptions) : await dialog.showOpenDialog(pickerOptions)
  if (picked.canceled || !picked.filePaths[0]) return null

  const source = await openBackupSource(picked.filePaths[0])
  try {
    const check = validateManifest(await source.readManifest().catch(() => null), app.getVersion())
    if (!check.ok) throw new Error(check.reason)
    const stagedDb = join(stagingDir(), 'navihub.db')
    await extractDb(source, stagedDb)
    let titles = check.manifest.counts.titles
    try {
      const db = new Database(stagedDb, { readonly: true, fileMustExist: true })
      try {
        titles = (db.prepare('SELECT COUNT(*) AS n FROM media_item').get() as { n: number }).n
      } finally {
        db.close()
      }
    } catch {
      throw new Error('The backup’s database could not be read.')
    }
    inspected = { source, manifest: check.manifest, stagedDb }
    const m = check.manifest
    return {
      createdAt: m.createdAt,
      appVersion: m.appVersion,
      machine: m.machine,
      sameMachine: m.machine === hostname(),
      titles,
      files: m.counts.files,
      bytes: m.counts.bytes,
      includes: m.includes
    }
  } catch (err) {
    source.close()
    rmSync(stagingDir(), { recursive: true, force: true })
    throw err
  }
}

// Keeps this machine's folders, tool paths and readable keys in the staged copy.
async function mergeSettingsInto(stagedDb: string): Promise<void> {
  const db = new Database(stagedDb, { fileMustExist: true })
  try {
    const backupRows = new Map(
      (db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[]).map(
        (row) => [row.key, row.value]
      )
    )
    // Machine-local keys are plain settings; keys come as stored envelopes.
    const currentRows = new Map<string, string>()
    for (const key of MACHINE_LOCAL_SETTING_KEYS) {
      const value = settingsRepo.get(key)
      if (value != null) currentRows.set(key, value)
    }
    for (const [key, value] of secretStorage.storedSecretEnvelopes()) currentRows.set(key, value)
    const backupReadable = new Map<SecretSettingKey, boolean>()
    for (const key of SECRET_SETTING_KEYS) {
      const value = backupRows.get(key)
      if (value) backupReadable.set(key, await secretStorage.canReadStoredSecret(value))
    }
    const writes = planSettingsMerge(
      backupRows,
      currentRows,
      (key) => backupReadable.get(key) ?? false,
      (key) => !secretStorage.isSecretUnreadable(key)
    )
    const upsert = db.prepare(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
    )
    const remove = db.prepare('DELETE FROM settings WHERE key = ?')
    db.transaction(() => {
      for (const w of writes) {
        if (w.value == null) remove.run(w.key)
        else upsert.run(w.key, w.value)
      }
    })()
  } finally {
    db.close()
  }
}

function scheduleRestart(stagedDb: string, label: string): void {
  const safetyDir = join(backupsDir(), `before-restore-${new Date().toISOString().replace(/[:.]/g, '-')}`)
  writeFileSync(
    join(app.getPath('userData'), RESTORE_MARKER),
    JSON.stringify({ stagedDb, safetyDir, label }, null, 2)
  )
  Object.assign(state, { running: false, phase: 'restarting', message: 'Restarting to finish the restore', percent: 100 })
  logInfo('app', `restore staged (${label}); restarting`)
  // Long enough for the window's next status poll to show "Restarting".
  setTimeout(() => {
    app.relaunch()
    app.quit()
  }, 1500)
}

export async function startRestore(): Promise<void> {
  if (!inspected) throw new Error('Choose a backup first.')
  refuseWhileTasksRun('restoring a backup')
  const { source, manifest, stagedDb } = inspected
  const label = `the backup from ${manifest.createdAt ? new Date(manifest.createdAt).toLocaleString() : 'an unknown date'}`
  const controller = begin('restore', 'Restoring a backup')
  try {
    progress('copying', 'Checking which images this machine is missing', 0, 1)
    const todo = await filesToRestore(source, currentRoots())
    const needed = todo.reduce((sum, t) => sum + t.file.size, 0)
    await assertFreeSpace(mediaRoot(), needed, 'the restored images')
    await copyBackupFiles(source, todo, controller.signal, (done, total) =>
      progress('copying', `Copying images (${todo.length} files)`, done, total)
    )
    progress('merging', 'Keeping this machine’s folders and keys', 0, 1)
    await mergeSettingsInto(stagedDb)
    source.close()
    inspected = null
    finish(null, '')
    scheduleRestart(stagedDb, label)
  } catch (err) {
    finish(err, 'Restore cancelled; nothing was changed')
    // Drop the staged database and close the backup (a ZIP stays locked on
    // Windows while open); a retry starts from choosing the backup again.
    discardInspected()
    throw err
  }
}

// ---- safety copies ----------------------------------------------------------

export function safetyCopies(): SafetyCopy[] {
  const dir = backupsDir()
  if (!existsSync(dir)) return []
  const out: SafetyCopy[] = []
  for (const id of readdirSync(dir)) {
    const db = join(dir, id, 'navihub.db')
    if (!existsSync(db)) continue
    let info: { createdAt?: string; replacedBy?: string } = {}
    try {
      info = JSON.parse(readFileSync(join(dir, id, 'safety.json'), 'utf8'))
    } catch {
      info = {}
    }
    const bytes = ['', '-wal', '-shm'].reduce((sum, s) => sum + (existsSync(db + s) ? statSync(db + s).size : 0), 0)
    out.push({ id, createdAt: info.createdAt ?? '', replacedBy: info.replacedBy ?? '', bytes })
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

// Puts a replaced library back, through the same staged swap as a restore
// (so the library it replaces becomes a safety copy in turn).
export async function restoreSafetyCopy(id: string): Promise<void> {
  refuseWhileTasksRun('undoing a restore')
  const copy = safetyCopies().find((c) => c.id === id)
  if (!copy || id.includes('/') || id.includes('\\') || id.includes('..')) throw new Error('That safety copy no longer exists.')
  discardInspected()
  const stagedDb = join(stagingDir(), 'navihub.db')
  mkdirSync(dirname(stagedDb), { recursive: true })
  // Opening it folds a leftover -wal into the copy.
  const source = new Database(join(backupsDir(), id, 'navihub.db'), { fileMustExist: true })
  try {
    await source.backup(stagedDb)
  } finally {
    source.close()
  }
  await mergeSettingsInto(stagedDb)
  scheduleRestart(stagedDb, `the library from before ${copy.replacedBy || 'the restore'}`)
}

export function deleteSafetyCopy(id: string): void {
  if (!safetyCopies().some((c) => c.id === id) || id.includes('..')) throw new Error('That safety copy no longer exists.')
  rmSync(join(backupsDir(), id), { recursive: true, force: true })
}
