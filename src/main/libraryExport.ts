import { app, BrowserWindow, dialog, shell } from 'electron'
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync
} from 'node:fs'
import { copyFile, mkdir, statfs, writeFile } from 'node:fs/promises'
import { basename, dirname, isAbsolute, join, normalize, relative, resolve, sep } from 'node:path'
import archiver from 'archiver'
import Database from 'better-sqlite3'
import type {
  LibraryExportOptions,
  LibraryExportPreview,
  LibraryExportSection,
  LibraryExportStartResult,
  LibraryExportStatus
} from '@shared/types'
import { getDbPath, getSqlite } from './db/connection'
import { get as getSetting } from './repos/settingsRepo'
import { logInfo, logWarn } from './logBus'
import * as tasks from './tasks'
// The CJS module is also consumed directly by the command-line exporter.
// @ts-expect-error — intentionally shared with a plain Electron-as-Node script
import { normalizeExportOptions, sanitizeDb } from '../../scripts/sanitizeSql.cjs'

type AssetRef = { source: string; destination: string; bytes: number }

const SECTIONS: LibraryExportSection[] = [
  'anime',
  'manga',
  'visual_novel',
  'game',
  'movie',
  'tv',
  'book',
  'wrestling'
]

const state: LibraryExportStatus = {
  id: null,
  running: false,
  phase: 'idle',
  message: null,
  done: 0,
  total: 0,
  percent: null,
  outputPath: null,
  error: null,
  missingAssetCount: 0
}

let choosing = false
let active:
  | {
      controller: AbortController
      handle: tasks.TaskHandle
      partialPaths: string[]
    }
  | null = null

export function getStatus(): LibraryExportStatus {
  return { ...state }
}

export function validateOptions(input: LibraryExportOptions): LibraryExportOptions {
  const normalized = normalizeExportOptions(input) as Omit<LibraryExportOptions, 'format'>
  if (input.format !== 'folder' && input.format !== 'zip') throw new Error('Choose folder or ZIP')
  return { ...normalized, format: input.format }
}

export function isInsidePath(parent: string, candidate: string): boolean {
  const rel = relative(resolve(parent), resolve(candidate))
  return rel === '' || (!rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel))
}

export function exportBaseName(now = new Date()): string {
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    '-',
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
  ].join('')
  return `NaviHUB Library ${stamp}`
}

export function uniqueOutputPath(
  parent: string,
  format: LibraryExportOptions['format'],
  now = new Date()
): string {
  const base = exportBaseName(now)
  const ext = format === 'zip' ? '.zip' : ''
  for (let n = 1; ; n += 1) {
    const suffix = n === 1 ? '' : ` (${n})`
    const candidate = join(parent, `${base}${suffix}${ext}`)
    if (!existsSync(candidate)) return candidate
  }
}

export async function preview(input: LibraryExportOptions): Promise<LibraryExportPreview> {
  const options = validateOptions(input)
  const db = getSqlite()
  const sectionCounts = Object.fromEntries(
    SECTIONS.map((section) => [section, sectionCount(db, section)])
  ) as Record<LibraryExportSection, number>
  const selectedCount = options.sections.reduce((sum, section) => sum + sectionCounts[section], 0)
  const assets = collectLiveAssets(db, options)
  const databaseBytes = Math.max(0, safeSize(getDbPath()))
  return {
    sectionCounts,
    selectedCount,
    spotifyPlaylistCount: options.includeSpotifyPlaylists
      ? scalar(db, 'SELECT COUNT(*) AS n FROM music_spotify_playlist')
      : 0,
    assetFileCount: assets.refs.length,
    estimatedBytes: databaseBytes + assets.refs.reduce((sum, asset) => sum + asset.bytes, 0),
    missingAssetCount: assets.missing
  }
}

export async function start(
  input: LibraryExportOptions,
  parent: BrowserWindow | null
): Promise<LibraryExportStartResult> {
  if (choosing || state.running) throw new Error('A library export is already running')
  const options = validateOptions(input)
  choosing = true
  Object.assign(state, {
    phase: 'choosing',
    message: 'Choose where to save the export',
    outputPath: null,
    error: null
  })
  try {
    const picker = parent
      ? await dialog.showOpenDialog(parent, {
          title: 'Choose library export destination',
          properties: ['openDirectory', 'createDirectory']
        })
      : await dialog.showOpenDialog({
          title: 'Choose library export destination',
          properties: ['openDirectory', 'createDirectory']
        })
    if (picker.canceled || !picker.filePaths[0]) {
      Object.assign(state, { phase: 'idle', message: null })
      return { started: false, id: null }
    }

    const destination = resolve(picker.filePaths[0])
    const userData = resolve(app.getPath('userData'))
    if (isInsidePath(userData, destination)) {
      throw new Error('Choose a destination outside NaviHUB’s data folder')
    }
    const audioRoot = getSetting('audio.dir')?.trim()
    if (audioRoot && isInsidePath(resolve(audioRoot), destination)) {
      throw new Error('Choose a destination outside the anime theme audio folder')
    }
    const estimate = await preview(options)
    await assertFreeSpace(destination, estimate.estimatedBytes, options.format)
    const outputPath = uniqueOutputPath(destination, options.format)
    launch(options, outputPath, estimate)
    return { started: true, id: state.id }
  } catch (error) {
    Object.assign(state, {
      running: false,
      phase: 'error',
      message: null,
      error: errorText(error)
    })
    throw error
  } finally {
    choosing = false
  }
}

function launch(
  options: LibraryExportOptions,
  outputPath: string,
  estimate: LibraryExportPreview
): void {
  const controller = new AbortController()
  const stagePath = `${outputPath}.partial-${process.pid}`
  const zipPartial = options.format === 'zip' ? `${outputPath}.partial` : null
  const handle = tasks.create({
    kind: 'libraryExport',
    label: 'Exporting library',
    route: '/settings?tab=data',
    controls: {
      cancel: () => controller.abort(),
      pauseNote: 'Library exports cannot be paused'
    },
    project: () =>
      state.id === handle.id
        ? {
            state: state.running ? (controller.signal.aborted ? 'cancelling' : 'running') : undefined,
            detail: state.message,
            percent: state.percent,
            done: state.done,
            total: state.total,
            error: state.error
          }
        : null
  })
  active = {
    controller,
    handle,
    partialPaths: [stagePath, ...(zipPartial ? [zipPartial] : [])]
  }
  Object.assign(state, {
    id: handle.id,
    running: true,
    phase: 'snapshotting',
    message: 'Creating a consistent database snapshot',
    done: 0,
    total: estimate.estimatedBytes,
    percent: 0,
    outputPath: null,
    error: null,
    missingAssetCount: estimate.missingAssetCount
  })
  void runExport(options, outputPath, stagePath, zipPartial, controller.signal)
    .then(() => {
      Object.assign(state, {
        running: false,
        phase: 'done',
        message: 'Export ready',
        done: state.total,
        percent: 100,
        outputPath
      })
      handle.settle({ state: 'done' })
      logInfo('app', `library export ready: ${outputPath}`)
    })
    .catch((error) => {
      const cancelled = controller.signal.aborted || error instanceof tasks.TaskCancelledError
      Object.assign(state, {
        running: false,
        phase: cancelled ? 'cancelled' : 'error',
        message: cancelled ? 'Export cancelled' : null,
        error: cancelled ? null : errorText(error),
        outputPath: null
      })
      handle.settle(cancelled ? { state: 'cancelled' } : { state: 'error', error: errorText(error) })
    })
    .finally(() => {
      for (const path of active?.partialPaths ?? []) removePartial(path)
      if (active?.handle.id === handle.id) active = null
    })
}

async function runExport(
  options: LibraryExportOptions,
  outputPath: string,
  stagePath: string,
  zipPartial: string | null,
  signal: AbortSignal
): Promise<void> {
  throwIfCancelled(signal)
  mkdirSync(stagePath, { recursive: true })
  const copyDbPath = join(stagePath, 'navihub.db')
  await getSqlite().backup(copyDbPath, {
    progress: (info) => {
      throwIfCancelled(signal)
      const done = info.totalPages - info.remainingPages
      updateProgress('snapshotting', 'Creating a consistent database snapshot', done, info.totalPages)
      return 100
    }
  })

  throwIfCancelled(signal)
  updateProgress('sanitizing', 'Removing excluded and private data', 0, 1)
  const copy = new Database(copyDbPath)
  try {
    sanitizeDb(copy, options)
    copy.pragma('journal_mode = DELETE')
    copy.exec('VACUUM')
  } finally {
    copy.close()
  }

  throwIfCancelled(signal)
  const sanitized = new Database(copyDbPath, { readonly: true, fileMustExist: true })
  let assets: { refs: AssetRef[]; missing: number }
  let counts: Record<string, number>
  try {
    assets = collectSanitizedAssets(sanitized)
    counts = manifestCounts(sanitized)
  } finally {
    sanitized.close()
  }
  state.missingAssetCount = assets.missing
  let copiedBytes = 0
  let copiedFiles = 0
  const totalBytes = assets.refs.reduce((sum, asset) => sum + asset.bytes, 0)
  updateProgress('copying', 'Copying referenced covers and audio', 0, Math.max(totalBytes, 1))
  for (const asset of assets.refs) {
    throwIfCancelled(signal)
    const dest = join(stagePath, asset.destination)
    await mkdir(dirname(dest), { recursive: true })
    await copyFile(asset.source, dest)
    copiedBytes += asset.bytes
    copiedFiles += 1
    updateProgress(
      'copying',
      `Copying ${basename(asset.destination)}`,
      copiedBytes,
      Math.max(totalBytes, 1)
    )
  }

  const manifest = {
    schemaVersion: 1,
    appVersion: app.getVersion(),
    createdAt: new Date().toISOString(),
    options,
    counts,
    copiedFiles,
    missingAssets: assets.missing
  }
  await writeFile(join(stagePath, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  await writeFile(join(stagePath, 'README.txt'), readmeText(options), 'utf8')
  throwIfCancelled(signal)

  if (options.format === 'zip' && zipPartial) {
    const stageBytes = directoryBytes(stagePath)
    updateProgress('packing', 'Packing the portable ZIP', 0, Math.max(stageBytes, 1))
    await packZip(stagePath, zipPartial, signal, stageBytes)
    throwIfCancelled(signal)
    updateProgress('finalizing', 'Finalizing the export', 1, 1)
    renameSync(zipPartial, outputPath)
    rmSync(stagePath, { recursive: true, force: true })
  } else {
    updateProgress('finalizing', 'Finalizing the export', 1, 1)
    renameSync(stagePath, outputPath)
  }
}

export function cancel(): void {
  if (!active) return
  tasks.cancel(active.handle.id)
}

export function cancelActiveLibraryExport(): void {
  active?.controller.abort()
  for (const path of active?.partialPaths ?? []) removePartial(path)
}

export function __reset(): void {
  cancelActiveLibraryExport()
  active = null
  choosing = false
  Object.assign(state, {
    id: null,
    running: false,
    phase: 'idle',
    message: null,
    done: 0,
    total: 0,
    percent: null,
    outputPath: null,
    error: null,
    missingAssetCount: 0
  })
}

export async function reveal(): Promise<void> {
  if (!state.outputPath || !existsSync(state.outputPath)) throw new Error('The export is not available')
  if (state.outputPath.toLowerCase().endsWith('.zip')) shell.showItemInFolder(state.outputPath)
  else {
    const error = await shell.openPath(state.outputPath)
    if (error) throw new Error(error)
  }
}

function sectionCount(db: Database.Database, section: LibraryExportSection): number {
  if (section === 'wrestling') return scalar(db, 'SELECT COUNT(*) AS n FROM wrestling_event')
  return scalar(db, 'SELECT COUNT(*) AS n FROM media_item WHERE media_type=?', section)
}

function scalar(db: Database.Database, sql: string, ...args: unknown[]): number {
  return Number((db.prepare(sql).get(...args) as { n?: number } | undefined)?.n ?? 0)
}

function collectLiveAssets(
  db: Database.Database,
  options: LibraryExportOptions
): { refs: AssetRef[]; missing: number } {
  const mediaSections = options.sections.filter((section) => section !== 'wrestling')
  const holes = mediaSections.map(() => '?').join(',')
  const refs: string[] = []
  const addRows = (sql: string, args: unknown[] = []): void => {
    for (const row of db.prepare(sql).all(...args) as Record<string, unknown>[]) {
      for (const value of Object.values(row)) if (typeof value === 'string' && value) refs.push(value)
    }
  }
  if (options.includeAssets && mediaSections.length) {
    addRows(`SELECT cover_path, banner_path FROM media_item WHERE media_type IN (${holes})`, mediaSections)
    addRows(
      `SELECT DISTINCT p.photo_path FROM person p JOIN credit c ON c.person_id=p.id
       JOIN media_item m ON m.id=c.media_id WHERE m.media_type IN (${holes})`,
      mediaSections
    )
    addRows(
      `SELECT DISTINCT c.image_path FROM character c JOIN media_character mc ON mc.character_id=c.id
       JOIN media_item m ON m.id=mc.media_id WHERE m.media_type IN (${holes})`,
      mediaSections
    )
    addRows(
      `SELECT DISTINCT c.logo_path FROM company c JOIN media_company mc ON mc.company_id=c.id
       JOIN media_item m ON m.id=mc.media_id WHERE m.media_type IN (${holes})`,
      mediaSections
    )
    if (mediaSections.includes('game')) {
      addRows(
        `SELECT a.icon_path, a.icon_gray_path FROM achievement a
         JOIN media_item m ON m.id=a.media_id WHERE m.media_type='game'`
      )
    }
    if (options.includeSpotifyPlaylists) addRows('SELECT cover_path FROM music_spotify_playlist_item')
    if (options.sections.includes('wrestling')) {
      addRows('SELECT photo_path FROM wrestling_wrestler')
      addRows('SELECT image_path FROM wrestling_stable')
    }
  }
  if (options.includeThemeAudio && mediaSections.includes('anime')) {
    addRows('SELECT ts.audio_path FROM theme_song ts JOIN media_item m ON m.id=ts.media_id')
  }
  return resolveAssets(refs)
}

function collectSanitizedAssets(db: Database.Database): { refs: AssetRef[]; missing: number } {
  const refs: string[] = []
  const tables: Array<[string, string]> = [
    ['media_item', 'cover_path, banner_path'],
    ['person', 'photo_path'],
    ['company', 'logo_path'],
    ['character', 'image_path'],
    ['achievement', 'icon_path, icon_gray_path'],
    ['music_spotify_playlist_item', 'cover_path'],
    ['wrestling_wrestler', 'photo_path'],
    ['wrestling_stable', 'image_path'],
    ['theme_song', 'audio_path']
  ]
  const has = db.prepare(`SELECT 1 FROM sqlite_master WHERE type='table' AND name=?`)
  for (const [table, columns] of tables) {
    if (!has.get(table)) continue
    for (const row of db.prepare(`SELECT ${columns} FROM ${table}`).all() as Record<string, unknown>[]) {
      for (const value of Object.values(row)) if (typeof value === 'string' && value) refs.push(value)
    }
  }
  return resolveAssets(refs)
}

function resolveAssets(paths: string[]): { refs: AssetRef[]; missing: number } {
  const userData = app.getPath('userData')
  const audioRoot = getSetting('audio.dir')?.trim() || join(userData, 'media')
  const byDestination = new Map<string, AssetRef>()
  let missing = 0
  for (const relPath of new Set(paths)) {
    const normalized = normalize(relPath).replaceAll('\\', '/')
    let source: string
    let destination: string
    if (normalized.startsWith('media/') && !normalized.includes('../')) {
      const rest = normalized.slice('media/'.length)
      source = join(userData, 'media', rest)
      destination = join('media', rest)
    } else if (normalized.startsWith('audio/') && !normalized.includes('../')) {
      const rest = normalized.slice('audio/'.length)
      source = join(audioRoot, rest)
      if (!existsSync(source)) source = join(userData, 'media', rest)
      destination = join('media', rest)
    } else continue
    const bytes = safeSize(source)
    if (bytes < 0) {
      missing += 1
      continue
    }
    const key = destination.toLocaleLowerCase()
    const existing = byDestination.get(key)
    if (existing && resolve(existing.source) !== resolve(source)) {
      throw new Error(`Two exported assets would use the same path: ${destination}`)
    }
    byDestination.set(key, { source, destination, bytes })
  }
  return { refs: [...byDestination.values()], missing }
}

function safeSize(path: string): number {
  try {
    const stat = statSync(path)
    return stat.isFile() ? stat.size : -1
  } catch {
    return -1
  }
}

async function assertFreeSpace(
  destination: string,
  estimatedBytes: number,
  format: LibraryExportOptions['format']
): Promise<void> {
  try {
    const stats = await statfs(destination)
    const available = Number(stats.bavail) * Number(stats.bsize)
    const required = Math.ceil(estimatedBytes * (format === 'zip' ? 2.1 : 1.1))
    if (available < required) throw new Error('The selected destination does not have enough free space')
  } catch (error) {
    if (error instanceof Error && error.message.includes('enough free space')) throw error
    logWarn('app', `library export: free-space check unavailable: ${errorText(error)}`)
  }
}

function updateProgress(
  phase: LibraryExportStatus['phase'],
  message: string,
  done: number,
  total: number
): void {
  const percent = total > 0 ? Math.round((done / total) * 100) : null
  Object.assign(state, { phase, message, done, total, percent })
  active?.handle.progress({ detail: message, done, total, percent })
}

async function packZip(
  sourceDir: string,
  destination: string,
  signal: AbortSignal,
  totalBytes: number
): Promise<void> {
  await new Promise<void>((resolvePromise, reject) => {
    const output = createWriteStream(destination)
    const archive = archiver('zip', { store: true })
    const abort = (): void => {
      archive.abort()
      output.destroy(new tasks.TaskCancelledError('Exporting library'))
    }
    signal.addEventListener('abort', abort, { once: true })
    output.on('close', () => {
      signal.removeEventListener('abort', abort)
      resolvePromise()
    })
    output.on('error', reject)
    archive.on('error', reject)
    archive.on('progress', (progress) => {
      updateProgress('packing', 'Packing the portable ZIP', progress.fs.processedBytes, totalBytes)
    })
    archive.pipe(output)
    archive.directory(sourceDir, false)
    void archive.finalize()
  })
}

function directoryBytes(dir: string): number {
  let total = 0
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()!
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name)
      if (entry.isDirectory()) stack.push(path)
      else if (entry.isFile()) total += statSync(path).size
    }
  }
  return total
}

function manifestCounts(db: Database.Database): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const section of SECTIONS) counts[section] = sectionCount(db, section)
  counts.spotifyPlaylists = scalar(db, 'SELECT COUNT(*) AS n FROM music_spotify_playlist')
  counts.lists = scalar(db, 'SELECT COUNT(*) AS n FROM list')
  counts.tierLists = scalar(db, 'SELECT COUNT(*) AS n FROM tier_list')
  return counts
}

function readmeText(options: LibraryExportOptions): string {
  return `NaviHUB library bundle\n======================\n\nThis export contains the selected imported library sections. Local music, manga, book, video and wrestling files are not included.\n\nSetup on Windows\n----------------\n1. Install NaviHUB, but do not launch it yet.\n2. Extract this ZIP if necessary.\n3. Copy navihub.db and the media folder into %APPDATA%\\navihub.\n4. Launch NaviHUB.\n\nIf NaviHUB was already launched, close it first, delete its existing navihub.db, navihub.db-wal and navihub.db-shm files, then copy this bundle's navihub.db into place. Configure local library folders and scan them separately.\n\nPersonal tracking included: ${
    options.includeProgress || options.includeRatings || options.includeLists ? 'yes, as selected in the export dialog' : 'no'
  }. Logs, credentials and machine paths are never included.\n`
}

function throwIfCancelled(signal: AbortSignal): void {
  if (signal.aborted) throw new tasks.TaskCancelledError('Exporting library')
}

function removePartial(path: string): void {
  try {
    rmSync(path, { recursive: true, force: true })
  } catch (error) {
    logWarn('app', `library export: could not remove partial output: ${errorText(error)}`)
  }
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
