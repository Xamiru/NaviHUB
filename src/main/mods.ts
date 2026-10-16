import { createHash } from 'crypto'
import { createReadStream, existsSync, rmSync } from 'fs'
import { copyFile, cp, lstat, mkdir, open as openFile, readdir, rename, rm, rmdir, stat, unlink } from 'fs/promises'
import { constants as fsConstants } from 'fs'
import { join, dirname } from 'path'
import type { ChildProcess } from 'child_process'
import { app } from 'electron'
import { fetchWithRetry } from './http'
import { streamResponseToFile } from './streamDownload'
import * as settingsRepo from './repos/settingsRepo'
import * as modRepo from './repos/modRepo'
import type { ModFileRow } from './repos/modRepo'
import * as emulation from './emulation'
import * as gamebanana from './gamebanana'
import * as tasks from './tasks'
import { logInfo, logWarn } from './logBus'
import { processControls } from './taskControls'
import { downloadUrl, isGameBananaHost } from './gamebananaCore'
import { extractWithSevenZip, extractZip, isStrictlyInside, listTree } from './safeExtract'
import { MOD_LAYOUT_PRESETS, filesUnder, planInstall, type InstallPlan } from './modLayoutCore'
import type { PresetKey } from '@shared/emulation/emulatorPresets'
import type { GbFile, ModInstallInfo, ModJobStatus, ModRemoveResult, ModTarget } from '@shared/types'

// Installing GameBanana mods into an emulator's user folder.
//
// The order is fixed: check the mod is still public and family-friendly
// (gamebananaCore.isSafeProfile, via gamebanana.modDetail), download to
// userData/modcache, extract into a private staging folder (safeExtract),
// plan the layout (modLayoutCore), wait for the user to confirm the
// destination, then copy into a new "<name>.navihub-partial" folder and
// rename it into place. The ledger records exactly what was written, and
// uninstall/disable only ever touch those files. Nothing outside userData is
// written before the user confirms; nothing existing is ever overwritten.

const MAX_ARCHIVE_BYTES = 8 * 1024 * 1024 * 1024
const MTIME_TOLERANCE_MS = 2_000
const AWAIT_LIMIT_MS = 30 * 60_000
const SEVEN_ZIP_DEFAULTS = ['C:\\Program Files\\7-Zip\\7z.exe', 'C:\\Program Files (x86)\\7-Zip\\7z.exe']

function cacheRoot(): string {
  return join(app.getPath('userData'), 'modcache')
}

function disabledDir(installId: number): string {
  return join(cacheRoot(), 'disabled', String(installId))
}

const inside = isStrictlyInside

export function sevenZipPath(): string | null {
  const configured = settingsRepo.get('sevenzip.path')?.trim()
  if (configured) return existsSync(configured) ? configured : null
  return SEVEN_ZIP_DEFAULTS.find((p) => existsSync(p)) ?? null
}

// ---- targets ----

export function targets(mediaId: number): ModTarget[] {
  const opts = emulation.playOptions(mediaId)
  const emulators = opts.roms.length > 0 ? new Map(emulation.listEmulators().map((e) => [e.id, e])) : new Map()
  return opts.roms.map((rom) => {
    const info = rom.effectiveEmulatorId != null ? emulators.get(rom.effectiveEmulatorId) ?? null : null
    const emu = info ? { id: info.id, name: info.name } : null
    const preset: PresetKey | null = info ? info.presetKey : null
    let blocked: string | null = null
    if (!emu) blocked = 'No emulator plays this game file yet.'
    else if (!preset || !MOD_LAYOUT_PRESETS.has(preset)) blocked = `NaviHUB cannot install mods for ${emu.name} yet.`
    else if (!info?.dataDir) blocked = `Choose ${emu.name}'s user folder on the Emulators page first.`
    return {
      romId: rom.id,
      romName: rom.romPath.split(/[\\/]/).pop() ?? rom.romPath,
      platform: rom.platform,
      gameCode: rom.gameCode,
      emulatorId: emu?.id ?? null,
      emulatorName: emu?.name ?? null,
      presetKey: preset,
      dataDir: info?.dataDir ?? null,
      blocked
    }
  })
}

// ---- the install job ----

interface Job {
  id: string
  status: ModJobStatus
  mediaId: number
  romId: number
  emulatorId: number
  preset: PresetKey
  dataDir: string
  gameCode: string | null
  modId: number
  file: GbFile
  version: string | null
  sourceUpdatedAt: number | null
  staging: string
  archive: string
  plan: InstallPlan | null
  cancelled: boolean
  abort: AbortController
  proc: ChildProcess | null
  // A copy in progress: its partial folder/files, removed on cancel or failure.
  partials: string[]
}

let counter = 0
let job: Job | null = null

export function status(): ModJobStatus | null {
  return job ? { ...job.status, plan: job.status.plan ? { ...job.status.plan } : null } : null
}

function settle(j: Job, state: ModJobStatus['state'], message: string | null = null): void {
  if (j.status.state === 'done' || j.status.state === 'cancelled' || j.status.state === 'error') return
  j.status.state = state
  j.status.message = message
}

async function cleanup(j: Job): Promise<void> {
  for (const p of j.partials) await rm(p, { recursive: true, force: true }).catch(() => undefined)
  j.partials = []
  await rm(j.staging, { recursive: true, force: true }).catch(() => undefined)
  await rm(j.archive, { force: true }).catch(() => undefined)
}

function md5Of(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('md5')
    createReadStream(path)
      .on('data', (c) => hash.update(c))
      .on('error', reject)
      .on('end', () => resolve(hash.digest('hex')))
  })
}

async function download(j: Job): Promise<void> {
  await mkdir(cacheRoot(), { recursive: true })
  const res = await fetchWithRetry(downloadUrl(j.file.id), {
    headers: { 'User-Agent': gamebanana.GB_USER_AGENT },
    // The per-attempt timeout also covers streaming the body, so it scales
    // with the file: ten minutes, or the time at 100 KB/s, whichever is longer.
    timeoutMs: Math.max(10 * 60_000, Math.ceil(j.file.size / (100 * 1024)) * 1000),
    taskSignal: j.abort.signal
  })
  if (!res.ok) throw new Error(`GameBanana answered ${res.status} for the download`)
  if (!isGameBananaHost(res.url)) throw new Error('The download left GameBanana — refused.')
  await streamResponseToFile(res, j.archive, {
    label: 'Mod download',
    maxInputBytes: Math.min(MAX_ARCHIVE_BYTES, j.file.size + 1024 * 1024),
    signal: j.abort.signal,
    replace: true,
    onProgress: (done, total) => {
      j.status.bytes = done
      if (total > 0) j.status.totalBytes = total
    },
    validateTemp: async (tmp) => {
      if (j.file.md5 && (await md5Of(tmp)) !== j.file.md5) {
        throw new Error('The download does not match GameBanana’s checksum.')
      }
    }
  })
}

async function extract(j: Job): Promise<void> {
  await rm(j.staging, { recursive: true, force: true })
  await mkdir(j.staging, { recursive: true })
  const head = Buffer.alloc(8)
  const fh = await openFile(j.archive, 'r')
  try {
    await fh.read(head, 0, 8, 0)
  } finally {
    await fh.close()
  }
  const isZip = head[0] === 0x50 && head[1] === 0x4b
  if (isZip) {
    await extractZip(j.archive, j.staging, () => j.cancelled)
  } else {
    const sevenZip = sevenZipPath()
    if (!sevenZip) {
      throw new Error(
        `${j.file.name} needs 7-Zip to unpack. Install 7-Zip, or set its location in Settings → Tools.`
      )
    }
    await extractWithSevenZip(sevenZip, j.archive, j.staging, (p) => {
      j.proc = p
    })
  }
}

function destinationOf(j: Job, plan: InstallPlan): string {
  if (plan.kind === 'unsupported') return j.dataDir
  return join(j.dataDir, ...plan.targetSubdir)
}

// A folder name that is free, "Name", "Name (2)", ... — never an existing folder.
// A folder a disabled install will move back into counts as taken too.
function freeFolder(parent: string, name: string): string {
  const owned = modRepo.ownedDirs(parent)
  for (let i = 1; i < 100; i++) {
    const candidate = i === 1 ? name : `${name} (${i})`
    if (
      !existsSync(join(parent, candidate)) &&
      !existsSync(join(parent, `${candidate}.navihub-partial`)) &&
      !owned.has(candidate.toLowerCase())
    ) {
      return candidate
    }
  }
  throw new Error('Too many folders with this mod’s name already exist.')
}

async function prepare(j: Job): Promise<void> {
  j.status.state = 'downloading'
  await download(j)
  if (j.cancelled) return
  j.status.state = 'extracting'
  await extract(j)
  if (j.cancelled) return
  const tree = await listTree(j.staging)
  const plan = planInstall(j.preset, tree, j.gameCode, j.status.modName)
  if (plan.kind === 'unsupported') throw new Error(plan.reason)
  j.plan = plan
  const files = plan.kind === 'files' ? plan.variants[0].files.length : filesUnder(tree, plan.variants[0].root).length
  j.status.plan = {
    destination: destinationOf(j, plan),
    fileCount: files,
    variants: plan.variants.map((v, index) => ({ index, label: v.label }))
  }
  j.status.state = 'awaiting'
  // A confirmation nobody answers gives way after half an hour, so the task
  // row and the downloaded archive do not linger.
  setTimeout(() => {
    if (job === j && j.status.state === 'awaiting') void cancel(j.id)
  }, AWAIT_LIMIT_MS).unref?.()
}

// Set while start() awaits GameBanana, before the new job claims `job`: two
// quick Install clicks must not both pass the in-progress check and download
// into the same archive path, orphaning the first job's staging and task row.
let starting = false

export async function start(req: { mediaId: number; romId: number; modId: number; fileId: number }): Promise<{ id: string }> {
  if (starting) throw new Error('Another mod install is in progress.')
  starting = true
  try {
    return await startJob(req)
  } finally {
    starting = false
  }
}

async function startJob(req: { mediaId: number; romId: number; modId: number; fileId: number }): Promise<{ id: string }> {
  // A job left waiting for confirmation gives way to a new install.
  if (job?.status.state === 'awaiting') await cancel(job.id)
  if (job && ['downloading', 'extracting', 'installing'].includes(job.status.state)) {
    throw new Error('Another mod install is in progress.')
  }
  const target = targets(req.mediaId).find((t) => t.romId === req.romId)
  if (!target) throw new Error('That game file is not linked to this game.')
  if (target.blocked || !target.emulatorId || !target.presetKey || !target.dataDir) {
    throw new Error(target.blocked ?? 'This game file cannot take mods.')
  }
  // Re-read now: the mod must still be public and family-friendly
  // (modDetail returns null otherwise) and the file still part of it.
  const detail = await gamebanana.modDetail(req.modId)
  if (!detail) throw new Error('This mod is not available.')
  const file = detail.files.find((f) => f.id === req.fileId)
  if (!file) throw new Error('That file is no longer part of the mod.')
  if (!file.avClean) {
    throw new Error('GameBanana has not marked this file clean of viruses, so NaviHUB will not install it.')
  }
  if (file.size > MAX_ARCHIVE_BYTES) throw new Error('This file is larger than 8 GB.')

  // Leftovers of a run the app quit during: staging folders and archives
  // live only in userData/modcache, never in an emulator folder.
  await rm(join(cacheRoot(), 'staging'), { recursive: true, force: true }).catch(() => undefined)
  counter += 1
  const id = `mod-${process.pid}-${counter}`
  const j: Job = {
    id,
    status: {
      id,
      state: 'downloading',
      mediaId: req.mediaId,
      modName: detail.name,
      fileName: file.name,
      bytes: 0,
      totalBytes: file.size,
      message: null,
      plan: null,
      installId: null
    },
    mediaId: req.mediaId,
    romId: req.romId,
    emulatorId: target.emulatorId,
    preset: target.presetKey,
    dataDir: target.dataDir,
    gameCode: target.gameCode,
    modId: req.modId,
    file,
    version: file.version ?? detail.version,
    sourceUpdatedAt: detail.dateModified ?? detail.dateUpdated,
    staging: join(cacheRoot(), 'staging', id),
    archive: join(cacheRoot(), `${file.id}.archive`),
    plan: null,
    cancelled: false,
    abort: new AbortController(),
    proc: null,
    partials: []
  }
  job = j
  tasks.create({
    kind: 'modInstall',
    label: `Install mod: ${detail.name}`,
    route: null,
    controls: processControls(() => j.proc, { onCancel: () => void cancel(j.id) }),
    project: () => {
      if (job?.id !== j.id) return null
      const s = j.status
      if (s.state === 'done') return { state: 'done' }
      if (s.state === 'cancelled') return { state: 'cancelled' }
      if (s.state === 'error') return { state: 'error', error: s.message }
      if (s.state === 'downloading') {
        return { detail: 'Downloading', done: s.bytes, total: s.totalBytes || undefined }
      }
      return { detail: s.state === 'awaiting' ? 'Waiting for you to confirm' : s.state === 'extracting' ? 'Unpacking' : 'Installing' }
    }
  })
  void prepare(j).then(
    async () => {
      if (j.cancelled) {
        settle(j, 'cancelled')
        await cleanup(j)
      }
    },
    async (e) => {
      settle(j, j.cancelled ? 'cancelled' : 'error', j.cancelled ? null : e instanceof Error ? e.message : String(e))
      await cleanup(j)
    }
  )
  return { id }
}

export async function cancel(jobId: string): Promise<void> {
  const j = job
  if (!j || j.id !== jobId) return
  j.cancelled = true
  j.abort.abort()
  try {
    j.proc?.kill()
  } catch {
    // Already gone.
  }
  if (j.status.state === 'awaiting') {
    settle(j, 'cancelled')
    await cleanup(j)
  }
}

async function statRow(path: string, rel: string): Promise<ModFileRow> {
  const s = await stat(path)
  return { rel_path: rel, size: s.size, mtime_ms: Math.round(s.mtimeMs) }
}

// The user said yes to the destination: copy, rename into place, record.
// Resolves { installId: null } when the user cancelled during the copy.
export async function confirm(jobId: string, variantIndex = 0): Promise<{ installId: number | null }> {
  const j = job
  if (!j || j.id !== jobId || j.status.state !== 'awaiting' || !j.plan || j.plan.kind === 'unsupported') {
    throw new Error('Nothing is waiting to be installed.')
  }
  const plan = j.plan
  j.status.state = 'installing'
  const stop = (): void => {
    if (j.cancelled) throw new CancelledInstall()
  }
  try {
    const tree = await listTree(j.staging)
    const targetRoot = destinationOf(j, plan)
    if (!inside(j.dataDir, targetRoot)) throw new Error('The destination is outside the emulator’s folder.')
    await mkdir(targetRoot, { recursive: true })
    const rows: ModFileRow[] = []
    let installDir: string | null = null

    if (plan.kind === 'files') {
      const variant = plan.variants[variantIndex] ?? plan.variants[0]
      const owned = modRepo.ownedPaths(targetRoot)
      const finals = variant.files.map((from) => {
        const name = from.split('/').pop() as string
        return { from, name, final: join(targetRoot, name), partial: join(targetRoot, `${name}.navihub-partial`) }
      })
      for (const f of finals) {
        if (existsSync(f.final) || existsSync(f.partial) || owned.has(f.name.toLowerCase())) {
          throw new Error(`${f.name} already exists in ${targetRoot}; NaviHUB will not overwrite it.`)
        }
      }
      for (const f of finals) {
        stop()
        await copyFile(join(j.staging, ...f.from.split('/')), f.partial, fsConstants.COPYFILE_EXCL)
        j.partials.push(f.partial)
      }
      stop()
      for (const f of finals) {
        await rename(f.partial, f.final)
        j.partials = j.partials.filter((p) => p !== f.partial)
        j.partials.push(f.final)
        rows.push(await statRow(f.final, f.name))
      }
    } else {
      const variant = plan.variants[variantIndex] ?? plan.variants[0]
      const name = plan.exactName ? plan.folderName : freeFolder(targetRoot, plan.folderName)
      const finalDir = join(targetRoot, name)
      // An exact name (PPSSPP) a disabled install will move back into is taken
      // too, or re-enabling it would merge into this install's folder.
      if (existsSync(finalDir) || (plan.exactName && modRepo.ownedDirs(targetRoot).has(name.toLowerCase()))) {
        throw new Error(`${finalDir} already exists; NaviHUB will not merge into it.`)
      }
      const partialDir = `${finalDir}.navihub-partial`
      if (existsSync(partialDir)) throw new Error(`${partialDir} is in the way; remove it and try again.`)
      const files = filesUnder(tree, variant.root)
      if (files.length === 0) throw new Error('The chosen folder has no files.')
      await mkdir(partialDir)
      j.partials.push(partialDir)
      for (const f of files) {
        stop()
        const to = join(partialDir, ...f.rel.split('/'))
        if (!inside(partialDir, to)) throw new Error(`Refusing ${f.rel}.`)
        await mkdir(dirname(to), { recursive: true })
        await copyFile(join(j.staging, ...f.from.split('/')), to, fsConstants.COPYFILE_EXCL)
      }
      stop()
      await rename(partialDir, finalDir)
      j.partials = [finalDir]
      installDir = name
      for (const f of files) rows.push(await statRow(join(finalDir, ...f.rel.split('/')), `${name}/${f.rel}`))
    }

    // The last chance to stop: past this line the ledger owns the files.
    stop()
    const installId = modRepo.insert(
      {
        media_id: j.mediaId,
        emulator_id: j.emulatorId,
        gb_mod_id: j.modId,
        gb_file_id: j.file.id,
        name: j.status.modName,
        version: j.version,
        kind: plan.kind,
        target_root: targetRoot,
        install_dir: installDir,
        source_updated_at: j.sourceUpdatedAt
      },
      rows
    )
    j.partials = []
    j.status.installId = installId
    settle(j, 'done')
    logInfo('app', `installed mod ${j.status.modName} (${rows.length} files) into ${targetRoot}`)
    await cleanup(j)
    return { installId }
  } catch (e) {
    const cancelled = j.cancelled || e instanceof CancelledInstall
    settle(j, cancelled ? 'cancelled' : 'error', cancelled ? null : e instanceof Error ? e.message : String(e))
    await cleanup(j)
    // A deliberate stop is not an error the user should be told about.
    if (cancelled) return { installId: null }
    throw e
  }
}

class CancelledInstall extends Error {
  constructor() {
    super('Cancelled')
  }
}

// before-quit: stop a download, unpack or copy and remove its partial files
// synchronously, before the database closes. A finished install is already
// recorded; one waiting for confirmation is dropped. The copy loop checks the
// flag before each file and before the ledger write.
export function cancelModJobs(): void {
  const j = job
  if (!j || ['done', 'cancelled', 'error'].includes(j.status.state)) return
  j.cancelled = true
  j.abort.abort()
  try {
    j.proc?.kill()
  } catch {
    // Already gone.
  }
  settle(j, 'cancelled')
  // j.partials is kept: a copy step already in flight (its mkdir) can recreate
  // the partial folder after this, and confirm()'s own cleanup must still
  // know to remove it.
  for (const p of j.partials) {
    try {
      rmSync(p, { recursive: true, force: true })
    } catch {
      // Best effort at quit; a leftover partial is never reused.
    }
  }
  try {
    rmSync(j.staging, { recursive: true, force: true })
    rmSync(j.archive, { force: true })
  } catch {
    // Staging is cleared again when the next install starts.
  }
}

// ---- installed mods ----

function locationOf(row: modRepo.ModInstallRow, enabled = row.enabled === 1): string {
  return enabled ? row.target_root : disabledDir(row.id)
}

// A game's installed mods, or (null) the ones whose game was deleted from the
// library, so they can still be removed.
export function installed(mediaId: number | null): ModInstallInfo[] {
  return modRepo.forMedia(mediaId).map((r) => ({
    id: r.id,
    gbModId: r.gb_mod_id,
    gbFileId: r.gb_file_id,
    name: r.name,
    version: r.version,
    emulatorName: r.emulator_name,
    kind: r.kind,
    location: r.install_dir ? join(locationOf(r), r.install_dir) : locationOf(r),
    enabled: r.enabled === 1,
    installedAt: r.installed_at,
    fileCount: r.file_count,
    sourceUpdatedAt: r.source_updated_at
  }))
}

function matches(info: { size: number; mtimeMs: number }, row: ModFileRow): boolean {
  return info.size === row.size && Math.abs(info.mtimeMs - row.mtime_ms) <= MTIME_TOLERANCE_MS
}

// Removes empty folders under (and including) dir, deepest first. A folder
// with anything left in it stays.
async function pruneEmpty(dir: string): Promise<void> {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) if (e.isDirectory()) await pruneEmpty(join(dir, e.name))
  await rmdir(dir).catch(() => undefined)
}

// Deletes the install's own unchanged files wherever they are — the active
// location first, then the other one (a file that changed was left behind by
// an earlier disable or enable).
export async function uninstall(installId: number): Promise<ModRemoveResult> {
  const row = modRepo.get(installId)
  if (!row) throw new Error('That mod is not installed.')
  const bases = [locationOf(row), locationOf(row, row.enabled !== 1)]
  const kept: string[] = []
  let removed = 0
  for (const f of modRepo.files(installId)) {
    let handled = false
    for (const base of bases) {
      const path = join(base, ...f.rel_path.split('/'))
      if (!inside(base, path)) continue
      let info
      try {
        info = await lstat(path)
      } catch {
        continue
      }
      handled = true
      if (info.isFile() && matches(info, f)) {
        await unlink(path)
        removed += 1
      } else {
        kept.push(path)
      }
      break
    }
    if (!handled) continue
  }
  if (row.install_dir) {
    for (const base of bases) await pruneEmpty(join(base, row.install_dir))
  }
  await pruneEmpty(disabledDir(row.id))
  modRepo.remove(installId)
  if (kept.length > 0) logWarn('app', `mod uninstall kept ${kept.length} changed files for ${row.name}`)
  return { removed, kept }
}

// Moves one file, across drives too: copy with timestamps, check the size,
// then remove the original.
async function moveFile(from: string, to: string): Promise<void> {
  await mkdir(dirname(to), { recursive: true })
  if (existsSync(to)) throw new Error(`${to} already exists.`)
  try {
    await rename(from, to)
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== 'EXDEV') throw e
    await cp(from, to, { preserveTimestamps: true, errorOnExist: true, force: false })
    const [a, b] = await Promise.all([stat(from), stat(to)])
    if (a.size !== b.size) {
      await unlink(to).catch(() => undefined)
      throw new Error(`Copying ${from} did not complete.`)
    }
    await unlink(from)
  }
}

// Disable moves the mod's own unchanged files into
// userData/modcache/disabled/<id>; enable moves them back. Files that changed
// since install, and anything the user added, stay where they are. A move that
// fails partway is rolled back, so a mod is never left half here, half there.
export async function setEnabled(installId: number, enabled: boolean): Promise<ModRemoveResult> {
  const row = modRepo.get(installId)
  if (!row) throw new Error('That mod is not installed.')
  if ((row.enabled === 1) === enabled) return { removed: 0, kept: [] }
  const from = locationOf(row)
  const to = locationOf(row, enabled)
  const plan: { src: string; dst: string; rel: string }[] = []
  const kept: string[] = []
  for (const f of modRepo.files(installId)) {
    const src = join(from, ...f.rel_path.split('/'))
    const dst = join(to, ...f.rel_path.split('/'))
    if (!inside(from, src) || !inside(to, dst)) continue
    let info
    try {
      info = await lstat(src)
    } catch {
      continue // left behind earlier, or removed by the user
    }
    if (!info.isFile() || !matches(info, f)) {
      kept.push(src)
      continue
    }
    if (existsSync(dst)) throw new Error(`${dst} already exists; move it away first.`)
    plan.push({ src, dst, rel: f.rel_path })
  }
  const done: typeof plan = []
  try {
    for (const step of plan) {
      await moveFile(step.src, step.dst)
      done.push(step)
    }
  } catch (e) {
    for (const step of done.reverse()) await moveFile(step.dst, step.src).catch(() => undefined)
    throw e
  }
  const moved: ModFileRow[] = []
  for (const step of done) {
    const after = await stat(step.dst)
    moved.push({ rel_path: step.rel, size: after.size, mtime_ms: Math.round(after.mtimeMs) })
  }
  if (row.install_dir) await pruneEmpty(join(from, row.install_dir))
  if (enabled) await pruneEmpty(disabledDir(row.id))
  modRepo.setEnabled(installId, enabled, moved)
  return { removed: moved.length, kept }
}

// Which installed mods GameBanana has updated since (a user action: one
// request per distinct mod).
export async function checkUpdates(mediaId: number): Promise<number[]> {
  const rows = modRepo.forMedia(mediaId)
  const latest = new Map<number, number | null>()
  for (const id of [...new Set(rows.map((r) => r.gb_mod_id))]) {
    const detail = await gamebanana.modDetail(id).catch(() => null)
    latest.set(id, detail ? detail.dateModified ?? detail.dateUpdated : null)
  }
  return rows
    .filter((r) => {
      const now = latest.get(r.gb_mod_id)
      return now != null && r.source_updated_at != null && now > r.source_updated_at
    })
    .map((r) => r.id)
}
