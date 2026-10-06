import { app, dialog, type BrowserWindow } from 'electron'
import { existsSync, readdirSync } from 'fs'
import { copyFile, mkdir, readdir, rename, rm, rmdir, stat, statfs, unlink } from 'fs/promises'
import { dirname, isAbsolute, join, relative, resolve } from 'path'
import * as settingsRepo from './repos/settingsRepo'
import * as tasks from './tasks'
import { logInfo, logWarn } from './logBus'
import {
  audioDirSetting,
  booksRootDir,
  footballRootDir,
  historyRootDir,
  mangaRootDir,
  mediaRoot,
  musicRootDir,
  picturesDir,
  videoRootDir,
  wrestlingRootDir
} from './files'
import {
  initialPicturesDir,
  isCrossDeviceError,
  moveTargetProblem,
  STORAGE_LABEL,
  STORAGE_SETTING,
  type StorageRoot
} from './storageCore'
import type { StorageMoveStatus, StoragePaths } from '@shared/types'

// Moves the pictures, media or History archive root to another folder
// (Settings → Folders).
// Order is what keeps it safe: nothing in the old root is deleted until every
// file has a verified copy AND the setting points at the new root, so a crash,
// cancel or full disk at any earlier moment leaves the library exactly as it
// was. Decisions live in storageCore.ts.

const state: StorageMoveStatus = {
  running: false,
  root: null,
  from: null,
  to: null,
  phase: 'idle',
  done: 0,
  total: 0,
  leftovers: 0,
  error: null
}
let active: { cancelled: boolean; handle: tasks.TaskHandle } | null = null

export function getStatus(): StorageMoveStatus {
  return { ...state }
}

export function paths(): StoragePaths {
  return {
    pictures: picturesDir(),
    media: mediaRoot(),
    history: historyRootDir(),
    slideshowInsidePictures: !settingsRepo.get('slideshow.dir')?.trim()
  }
}

function rootDir(root: StorageRoot): string {
  return root === 'pictures' ? picturesDir() : root === 'history' ? historyRootDir() : mediaRoot()
}

// For "Open folder": the root may not exist yet on a fresh library.
export async function ensureRoot(root: StorageRoot): Promise<string> {
  const dir = rootDir(root)
  await mkdir(dir, { recursive: true })
  return dir
}

// ---------------- startup ----------------

// Pins pictures.dir the first time it is unset: an existing library keeps its
// folder, a fresh one starts in the OS Pictures folder (storageCore).
export function pinPicturesDir(): void {
  if (settingsRepo.get('pictures.dir')?.trim()) return
  const legacyDir = join(app.getPath('userData'), 'pictures')
  let legacyHasFiles = false
  try {
    legacyHasFiles = existsSync(legacyDir) && readdirSync(legacyDir).length > 0
  } catch {
    legacyHasFiles = true // unreadable: never point away from it
  }
  let osPictures: string | null = null
  try {
    osPictures = app.getPath('pictures')
  } catch {
    // headless Linux can lack an XDG pictures dir
  }
  const dir = initialPicturesDir({ legacyDir, legacyHasFiles, osPictures })
  if (dir) settingsRepo.set('pictures.dir', dir)
}

// ---------------- the move (IO, injectable for tests) ----------------

export class MoveCancelled extends Error {
  constructor() {
    super('Move cancelled')
  }
}

export interface RelocateHooks {
  // Writes the setting. Called exactly once, only after the new root is complete.
  commit: () => void
  progress?: (phase: 'copying' | 'cleaning', done: number, total: number) => void
  cancelled?: () => boolean
  rename?: (from: string, to: string) => Promise<void>
  freeBytes?: (dir: string) => Promise<number | null>
}

export interface RelocateResult {
  method: 'rename' | 'copy'
  files: number
  leftovers: number
}

async function walk(root: string): Promise<string[]> {
  const out: string[] = []
  const visit = async (dir: string): Promise<void> => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name)
      if (entry.isDirectory()) await visit(abs)
      else if (entry.isFile()) out.push(relative(root, abs))
    }
  }
  if (existsSync(root)) await visit(root)
  return out
}

async function removeEmptyDirs(dir: string, keepRoot: boolean): Promise<void> {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    if (entry.isDirectory()) await removeEmptyDirs(join(dir, entry.name), false)
  }
  if (keepRoot) return
  try {
    await rmdir(dir)
  } catch {
    // not empty (a leftover) or in use
  }
}

async function defaultFreeBytes(dir: string): Promise<number | null> {
  try {
    const s = await statfs(dir)
    return Number(s.bavail) * Number(s.bsize)
  } catch {
    return null
  }
}

const formatGb = (bytes: number): string => `${(bytes / 1024 ** 3).toFixed(1)} GB`

export async function relocate(from: string, to: string, hooks: RelocateHooks): Promise<RelocateResult> {
  const cancelled = hooks.cancelled ?? (() => false)
  if (!existsSync(from)) {
    hooks.commit()
    return { method: 'rename', files: 0, leftovers: 0 }
  }
  const createdTo = !existsSync(to)

  // Same drive: one atomic rename, nothing to verify.
  try {
    if (!createdTo) await rmdir(to) // validated empty
    await mkdir(dirname(to), { recursive: true })
    await (hooks.rename ?? rename)(from, to)
    hooks.commit()
    return { method: 'rename', files: (await walk(to)).length, leftovers: 0 }
  } catch (error) {
    if (!isCrossDeviceError(error)) throw error
    await mkdir(to, { recursive: true })
  }

  const files = await walk(from)
  let bytes = 0
  for (const rel of files) bytes += (await stat(join(from, rel))).size
  const free = await (hooks.freeBytes ?? defaultFreeBytes)(to)
  if (free != null && free < bytes * 1.02) {
    if (createdTo) await rm(to, { recursive: true, force: true })
    throw new Error(`Not enough free space: the move needs ${formatGb(bytes)}, ${formatGb(free)} is free.`)
  }

  const copied = new Set<string>()
  const copyOne = async (rel: string): Promise<void> => {
    const src = join(from, rel)
    const dest = join(to, rel)
    await mkdir(dirname(dest), { recursive: true })
    await copyFile(src, dest)
    if ((await stat(src)).size !== (await stat(dest)).size) {
      throw new Error(`Copy of ${rel} did not verify`)
    }
    copied.add(rel)
  }

  try {
    for (const rel of files) {
      if (cancelled()) throw new MoveCancelled()
      await copyOne(rel)
      hooks.progress?.('copying', copied.size, files.length)
    }
  } catch (error) {
    // Nothing has pointed at the new root yet: remove only what this run made.
    if (createdTo) await rm(to, { recursive: true, force: true })
    else for (const rel of copied) await rm(join(to, rel), { force: true })
    if (!createdTo) await removeEmptyDirs(to, true)
    throw error
  }

  hooks.commit()
  // From here the new root is live, so nothing below may fail the move: an
  // unreadable old folder just leaves its files behind.
  try {
    return { method: 'copy', files: copied.size, leftovers: await cleanUp(from, to, copied, copyOne, hooks) }
  } catch (error) {
    logWarn('app', `storage move: cleanup of ${from} stopped: ${String(error)}`)
    return { method: 'copy', files: copied.size, leftovers: Math.max(1, (await walk(from).catch(() => [])).length) }
  }
}

async function cleanUp(
  from: string,
  to: string,
  copied: Set<string>,
  copyOne: (rel: string) => Promise<void>,
  hooks: RelocateHooks
): Promise<number> {
  // Files written into the old root while the copy ran (an import finishing).
  for (const rel of await walk(from)) {
    if (copied.has(rel)) continue
    try {
      await copyOne(rel)
    } catch (error) {
      logWarn('app', `storage move: could not copy late file ${rel}: ${String(error)}`)
    }
  }

  // Delete an original only when its copy is present and the same size.
  const originals = await walk(from)
  let leftovers = 0
  let cleaned = 0
  for (const rel of originals) {
    try {
      const [a, b] = await Promise.all([stat(join(from, rel)), stat(join(to, rel))])
      if (!copied.has(rel) || a.size !== b.size) throw new Error('unverified')
      await unlink(join(from, rel))
    } catch {
      leftovers += 1
    }
    cleaned += 1
    hooks.progress?.('cleaning', cleaned, originals.length)
  }
  await removeEmptyDirs(from, false)
  return leftovers
}

// ---------------- the job ----------------

function otherRoots(root: StorageRoot): { label: string; dir: string }[] {
  const out: { label: string; dir: string }[] = [
    ...(Object.keys(STORAGE_LABEL) as StorageRoot[])
      .filter((r) => r !== root)
      .map((r) => ({ label: STORAGE_LABEL[r], dir: rootDir(r) })),
    { label: 'music library', dir: musicRootDir() },
    { label: 'manga library', dir: mangaRootDir() },
    { label: 'books library', dir: booksRootDir() },
    { label: 'video library', dir: videoRootDir() },
    { label: 'wrestling library', dir: wrestlingRootDir() },
    { label: 'Football media folder', dir: footballRootDir() }
  ]
  const audio = audioDirSetting()
  if (audio) out.push({ label: 'theme audio folder', dir: audio })
  const slideshow = settingsRepo.get('slideshow.dir')?.trim()
  if (slideshow) out.push({ label: 'slideshow folder', dir: slideshow })
  return out
}

function emptyDir(dir: string): boolean {
  try {
    return readdirSync(dir).length === 0
  } catch {
    return false
  }
}

export async function chooseFolder(root: StorageRoot, parent: BrowserWindow | null): Promise<string | null> {
  const options = {
    title: `Choose the new ${STORAGE_LABEL[root]}`,
    properties: ['openDirectory', 'createDirectory'] as ('openDirectory' | 'createDirectory')[]
  }
  const picked = parent ? await dialog.showOpenDialog(parent, options) : await dialog.showOpenDialog(options)
  if (picked.canceled || !picked.filePaths[0]) return null
  return resolve(picked.filePaths[0])
}

export function start(root: StorageRoot, to: string): void {
  // Checked on the raw input: resolve() below would quietly anchor a relative
  // path to the working directory and let it through.
  if (typeof to !== 'string' || !isAbsolute(to)) throw new Error('Choose a full folder path.')
  if (state.running) throw new Error('A folder move is already running.')
  if (tasks.list().some((t) => t.endedAt == null)) {
    throw new Error('Wait for the running tasks to finish before moving a folder.')
  }
  const from = rootDir(root)
  const dest = resolve(to)
  const problem = moveTargetProblem({
    from,
    to: dest,
    toExists: existsSync(dest),
    toEmpty: emptyDir(dest),
    otherRoots: otherRoots(root)
  })
  if (problem) throw new Error(problem)

  const run = { cancelled: false, handle: null as unknown as tasks.TaskHandle }
  const handle = tasks.create({
    kind: 'storageMove',
    label: `Moving the ${STORAGE_LABEL[root]}`,
    route: '/settings?tab=data',
    controls: {
      // Only the copy can stop; once the setting points at the new folder the
      // cleanup always finishes.
      cancel: () => {
        if (state.phase === 'copying') run.cancelled = true
      },
      pauseNote: 'Folder moves cannot be paused'
    },
    project: () =>
      active === run
        ? {
            state: state.running ? (run.cancelled ? 'cancelling' : 'running') : undefined,
            detail: state.phase === 'cleaning' ? 'Removing the old copies' : 'Copying files',
            done: state.done,
            total: state.total,
            error: state.error
          }
        : null
  })
  run.handle = handle
  active = run
  Object.assign(state, {
    running: true,
    root,
    from,
    to: dest,
    phase: 'copying',
    done: 0,
    total: 0,
    leftovers: 0,
    error: null
  })

  void relocate(from, dest, {
    commit: () => settingsRepo.set(STORAGE_SETTING[root], dest),
    cancelled: () => run.cancelled,
    progress: (phase, done, total) => Object.assign(state, { phase, done, total })
  })
    .then((result) => {
      Object.assign(state, { running: false, phase: 'done', leftovers: result.leftovers })
      handle.settle({ state: 'done' })
      logInfo(
        'app',
        `moved ${root} folder to ${dest} by ${result.method}: ${result.files} files, ${result.leftovers} left in the old folder`
      )
    })
    .catch((error: unknown) => {
      const cancelledRun = error instanceof MoveCancelled
      Object.assign(state, {
        running: false,
        phase: cancelledRun ? 'cancelled' : 'error',
        error: cancelledRun ? null : error instanceof Error ? error.message : String(error)
      })
      handle.settle(cancelledRun ? { state: 'cancelled' } : { state: 'error', error: state.error })
      if (!cancelledRun) logWarn('app', `storage move failed: ${state.error}`)
    })
}

// before-quit: stops a copy between files. The setting only changes after a
// complete copy, so quitting mid-move leaves the library on its old folder; a
// partial new folder may remain and is simply not used.
export function cancelActiveStorageMove(): void {
  if (active && state.phase === 'copying') active.cancelled = true
}
