// File work for Settings → Backup & restore: writing a backup ZIP, reading a
// backup (ZIP, or the folder of one), and copying its files into this
// machine's roots. No electron and no database handle: libraryBackup.ts passes
// paths and a snapshot function in, so tests drive this with temp folders.

import { createReadStream, createWriteStream, rmSync } from 'fs'
import { lstat, mkdir, readFile, readdir, rename, rm, stat } from 'fs/promises'
import { dirname, join, resolve, sep } from 'path'
import type { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import archiver from 'archiver'
import yauzl from 'yauzl'
import {
  BACKUP_DB_ENTRY,
  BACKUP_MANIFEST_ENTRY,
  BACKUP_ROOTS,
  backupEntryTarget,
  type BackupManifest,
  type BackupRoot
} from './libraryBackupCore'

export class BackupCancelledError extends Error {
  constructor() {
    super('Cancelled')
    this.name = 'BackupCancelledError'
  }
}

function throwIfCancelled(signal?: AbortSignal): void {
  if (signal?.aborted) throw new BackupCancelledError()
}

export type Progress = (done: number, total: number) => void

// Temporary files and folders a running backup or restore has open. The async
// cleanup in each helper never runs when the app quits mid-copy, so the
// before-quit killer removes these synchronously (removePartialsSync).
const partials = new Set<string>()

export function removePartialsSync(): void {
  for (const path of partials) {
    try {
      rmSync(path, { recursive: true, force: true })
    } catch {
      // Still held open (Windows); nothing more can be done at quit.
    }
  }
  partials.clear()
}

// Writes the ZIP: database snapshot, manifest, then each included root under
// its own name. Roots are read in place (never staged), so a backup needs
// free space for one copy, not two. Written to `<output>.partial` and renamed
// only when complete.
export async function writeBackupZip(opts: {
  outputZip: string
  snapshot: (dbPath: string) => Promise<void>
  manifest: (dbPath: string) => BackupManifest
  roots: Partial<Record<BackupRoot, string>>
  totalBytes: number
  signal?: AbortSignal
  onPhase?: (phase: 'snapshotting' | 'packing') => void
  onProgress?: Progress
}): Promise<BackupManifest> {
  const stage = `${opts.outputZip}.partial-db`
  const partial = `${opts.outputZip}.partial`
  partials.add(stage)
  partials.add(partial)
  try {
    await mkdir(stage, { recursive: true })
    const dbPath = join(stage, BACKUP_DB_ENTRY)
    opts.onPhase?.('snapshotting')
    await opts.snapshot(dbPath)
    throwIfCancelled(opts.signal)
    const manifest = opts.manifest(dbPath)

    opts.onPhase?.('packing')
    await new Promise<void>((resolve, reject) => {
      const output = createWriteStream(partial)
      const archive = archiver('zip', { store: true })
      const abort = (): void => {
        archive.abort()
        output.destroy(new BackupCancelledError())
      }
      opts.signal?.addEventListener('abort', abort, { once: true })
      output.on('close', () => {
        opts.signal?.removeEventListener('abort', abort)
        resolve()
      })
      output.on('error', reject)
      archive.on('error', reject)
      archive.on('progress', (p) => opts.onProgress?.(p.fs.processedBytes, opts.totalBytes))
      archive.pipe(output)
      archive.append(`${JSON.stringify(manifest, null, 2)}\n`, { name: BACKUP_MANIFEST_ENTRY })
      archive.file(dbPath, { name: BACKUP_DB_ENTRY })
      for (const root of BACKUP_ROOTS) {
        const dir = opts.roots[root]
        if (dir) archive.directory(dir, root)
      }
      void archive.finalize()
    })
    throwIfCancelled(opts.signal)
    await rename(partial, opts.outputZip)
    return manifest
  } catch (err) {
    await rm(partial, { force: true })
    throw opts.signal?.aborted ? new BackupCancelledError() : err
  } finally {
    await rm(stage, { recursive: true, force: true })
    partials.delete(stage)
    partials.delete(partial)
  }
}

// ---- reading a backup -------------------------------------------------------

export interface BackupFile {
  name: string
  size: number
}

export interface BackupSource {
  path: string
  readManifest(): Promise<unknown>
  files(): BackupFile[]
  open(name: string): Promise<Readable>
  close(): void
}

function openZip(path: string): Promise<BackupSource> {
  return new Promise((resolve, reject) => {
    yauzl.open(path, { lazyEntries: true, autoClose: false }, (err, zipfile) => {
      if (err || !zipfile) return reject(err ?? new Error('Could not open the backup'))
      const entries = new Map<string, yauzl.Entry>()
      zipfile.on('entry', (entry: yauzl.Entry) => {
        if (!entry.fileName.endsWith('/')) entries.set(entry.fileName, entry)
        zipfile.readEntry()
      })
      zipfile.on('error', reject)
      zipfile.on('end', () => {
        const open = (name: string): Promise<Readable> =>
          new Promise((res, rej) => {
            const entry = entries.get(name)
            if (!entry) return rej(new Error(`The backup has no ${name}`))
            zipfile.openReadStream(entry, (e, stream) => (e || !stream ? rej(e ?? new Error('no stream')) : res(stream)))
          })
        resolve({
          path,
          readManifest: async () => {
            const chunks: Buffer[] = []
            for await (const chunk of await open(BACKUP_MANIFEST_ENTRY)) chunks.push(chunk as Buffer)
            return JSON.parse(Buffer.concat(chunks).toString('utf8'))
          },
          files: () => [...entries.values()].map((e) => ({ name: e.fileName, size: e.uncompressedSize })),
          open,
          close: () => zipfile.close()
        })
      })
      zipfile.readEntry()
    })
  })
}

async function openFolder(dir: string): Promise<BackupSource> {
  const files: BackupFile[] = []
  const walk = async (rel: string): Promise<void> => {
    for (const name of await readdir(join(dir, rel))) {
      const childRel = rel ? `${rel}/${name}` : name
      const info = await lstat(join(dir, childRel))
      if (info.isDirectory()) await walk(childRel)
      else if (info.isFile()) files.push({ name: childRel, size: info.size })
    }
  }
  await walk('')
  return {
    path: dir,
    readManifest: async () => JSON.parse(await readFile(join(dir, BACKUP_MANIFEST_ENTRY), 'utf8')),
    files: () => files,
    open: async (name) => createReadStream(join(dir, ...name.split('/'))),
    close: () => {}
  }
}

// A .zip backup, or a backup folder (chosen by its manifest.json or the folder).
export async function openBackupSource(path: string): Promise<BackupSource> {
  const info = await stat(path)
  if (info.isDirectory()) return openFolder(path)
  if (path.toLowerCase().endsWith('.json')) return openFolder(dirname(path))
  return openZip(path)
}

export async function extractDb(source: BackupSource, dest: string): Promise<void> {
  await mkdir(dirname(dest), { recursive: true })
  await pipeline(await source.open(BACKUP_DB_ENTRY), createWriteStream(dest))
}

// The backup's files that this machine does not already have, per root.
// Any existing file under the same name is kept as it is, whatever its size:
// media files are named by a hash of their source, but Pictures and History
// archive names are reused, so a different file there is the user's own.
export async function filesToRestore(
  source: BackupSource,
  roots: Record<BackupRoot, string>
): Promise<{ file: BackupFile; target: string }[]> {
  const out: { file: BackupFile; target: string }[] = []
  for (const file of source.files()) {
    const where = backupEntryTarget(file.name)
    if (!where) continue
    // resolve() so a saved root with a trailing or forward slash still matches.
    const root = resolve(roots[where.root])
    const target = join(root, ...where.rel.split('/'))
    if (!target.startsWith(root.endsWith(sep) ? root : root + sep)) continue
    if (await lstat(target).then(() => true, () => false)) continue
    out.push({ file, target })
  }
  return out
}

// Copies them in. Additive only: nothing on this machine is deleted or
// overwritten (a file that appeared since filesToRestore is skipped), and each file lands through a temporary
// name so a cancelled copy never leaves half an image behind.
export async function copyBackupFiles(
  source: BackupSource,
  todo: { file: BackupFile; target: string }[],
  signal?: AbortSignal,
  onProgress?: Progress
): Promise<number> {
  const total = todo.reduce((sum, t) => sum + t.file.size, 0)
  let done = 0
  for (const { file, target } of todo) {
    throwIfCancelled(signal)
    await mkdir(dirname(target), { recursive: true })
    const temp = `${target}.restoring`
    partials.add(temp)
    try {
      await pipeline(await source.open(file.name), createWriteStream(temp), { signal })
      if (await lstat(target).then(() => true, () => false)) await rm(temp, { force: true })
      else await rename(temp, target)
    } catch (err) {
      await rm(temp, { force: true })
      throw signal?.aborted ? new BackupCancelledError() : err
    } finally {
      partials.delete(temp)
    }
    done += file.size
    onProgress?.(done, total)
  }
  return todo.length
}
