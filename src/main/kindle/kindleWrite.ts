// The ONLY code that writes to a Kindle. kindleDevice.ts stays read-only; this
// module adds the few write steps Send to Kindle needs, each one confined to
// documents/NaviHUB/ and checked here, not by the caller. A text guard
// (tests/kindleWriteGuard.test.ts) fails if any other module writes, renames
// or deletes on a device.
//
// What the user's Kindle allows, from the 2026-11-17 probe (PW 12th gen,
// gvfs MTP, gio 2.80): folders can be made through the FUSE mount, but a file
// cannot be created or written through it (ENOTSUP); the one way in is an MTP
// upload (`gio copy`), which silently REPLACES an existing name; a file cannot
// be renamed (libmtp refuses); reading back through the mount works; a file
// can be removed with `gio remove`. So the protocol, per file and one device
// operation at a time (MTP is one session):
//   1. check documents/ and documents/NaviHUB/ are plain folders, list the
//      latter fresh (an unreadable folder is an error, never "empty"), and
//      refuse a name already there (case-insensitive), because the upload
//      itself would replace it;
//   2. hash the local file, then upload straight to that name;
//   3. read it back: the size, then a SHA-256 of the whole file, must equal
//      the local file's;
//   4. on a mismatch or a failed upload, remove that one file: its name was
//      free a moment ago, so whatever is there is the upload's. A failed
//      removal is reported with the file's name, never swallowed.
// NaviHUB never deletes or replaces a book it did not just upload.
//
// Used by kindleSend.ts (Send to Kindle and its clean-up of unfinished
// sends) only. At quit, cancelKindleWrites ends a running gio child at once
// and skips the clean-up: Send's ledger row stays 'pending', and the next
// launch lists the file under Unfinished sends.

import { spawn, type ChildProcess } from 'child_process'
import { createHash } from 'crypto'
import { createReadStream, createWriteStream, existsSync, promises as fsp } from 'fs'
import { join } from 'path'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'
import { isNaviHubDevicePath, partialMd5, NAVIHUB_DEVICE_DIR } from './kindleCore'
import { gioEnv, isGvfsMtpRoot, nameTaken, type PlannedSend } from './kindleWriteCore'

export interface SentFile {
  devicePath: string
  bytes: number
  partialMd5: string
  sha256: string
}

// Set at quit: every running and later write stops, and a gio child that is
// running is killed now (the app exits right after the before-quit steps).
let stopAll = false
const children = new Set<ChildProcess>()

export function cancelKindleWrites(): void {
  stopAll = true
  // SIGTERM: gio cancels its transfer itself, the gentlest stop for the
  // device's MTP session. The app exits right after, and the cut-off file
  // stays in Send's ledger for the next launch.
  for (const child of children) child.kill('SIGTERM')
}

// A copy that failed AND could not be removed: a partial file may be on the
// Kindle under `name`.
export class IncompleteCopyError extends Error {
  constructor(
    message: string,
    readonly fileName: string
  ) {
    super(message)
    this.name = 'IncompleteCopyError'
  }
}

async function localPartialMd5(abs: string): Promise<string> {
  const handle = await fsp.open(abs, 'r')
  try {
    return await partialMd5(async (offset, length) => {
      const buf = Buffer.alloc(length)
      const { bytesRead } = await handle.read(buf, 0, length, offset)
      return buf.subarray(0, bytesRead)
    })
  } finally {
    await handle.close()
  }
}

function stopGate(shouldStop: () => boolean): Transform {
  return new Transform({
    transform(chunk, _enc, done) {
      done(shouldStop() ? new Error('Send stopped') : null, chunk)
    }
  })
}

// The whole file, so a corrupted region anywhere fails the check (the partial
// MD5 samples only 12 KiB and is kept for the ledger, not for verification).
async function sha256(abs: string, shouldStop: () => boolean = () => false): Promise<string> {
  const hash = createHash('sha256')
  await pipeline(createReadStream(abs), stopGate(shouldStop), hash)
  return hash.digest('hex')
}

// A real directory, never a symlink to somewhere else.
async function assertRealDir(abs: string, what: string): Promise<void> {
  const st = await fsp.lstat(abs).catch(() => null)
  if (!st || st.isSymbolicLink() || !st.isDirectory()) {
    throw new Error(`${what} on the Kindle is not a plain folder`)
  }
}

// A bare, visible file name inside documents/NaviHUB/, never a path.
function assertName(name: string): void {
  const ok =
    !!name &&
    !name.includes('/') &&
    !name.includes('\\') &&
    !name.startsWith('.') &&
    isNaviHubDevicePath(`${NAVIHUB_DEVICE_DIR}/${name}`)
  if (!ok) throw new Error(`Refusing to write outside ${NAVIHUB_DEVICE_DIR}: ${name}`)
}

// ---- uploaders: how bytes reach a given kind of mount ----

// Every name an uploader is given passes assertName; each method acts on
// documents/NaviHUB/<name> only.
export interface Uploader {
  // documents/ is a plain folder; documents/NaviHUB/ is made if absent and
  // must then be a plain folder too.
  ensureFolder(): Promise<void>
  // Read-only: whether documents/NaviHUB/ exists (as a plain folder; a link
  // throws), for inspecting the device without writing to it.
  hasFolder(): Promise<boolean>
  // The names in documents/NaviHUB/. Any failure to read it throws.
  names(): Promise<string[]>
  upload(localAbs: string, name: string, bytes: number, shouldStop: () => boolean): Promise<void>
  // The file's size as the device reports it; null when absent.
  size(name: string): Promise<number | null>
  // Whether the name is a plain file (not a folder or a link); null when absent.
  isPlainFile(name: string): Promise<boolean | null>
  sha256(name: string, shouldStop: () => boolean): Promise<string>
  remove(name: string): Promise<void>
}

// Both uploaders read through a mounted folder (the gvfs FUSE mount reads
// fine), so the folder checks, the listing and the read-back are shared.
abstract class MountedFolder {
  constructor(readonly root: string) {}

  protected dir(): string {
    return join(this.root, ...NAVIHUB_DEVICE_DIR.split('/'))
  }

  protected file(name: string): string {
    assertName(name)
    return join(this.dir(), name)
  }

  async ensureFolder(): Promise<void> {
    await assertRealDir(join(this.root, 'documents'), 'The documents folder')
    await fsp.mkdir(this.dir()).catch((err: NodeJS.ErrnoException) => {
      if (err.code !== 'EEXIST') throw err
    })
    await assertRealDir(this.dir(), 'The NaviHUB folder')
  }

  async hasFolder(): Promise<boolean> {
    await assertRealDir(join(this.root, 'documents'), 'The documents folder')
    const st = await fsp.lstat(this.dir()).catch((err: NodeJS.ErrnoException) => {
      if (err.code === 'ENOENT') return null
      throw err
    })
    if (!st) return false
    if (st.isSymbolicLink() || !st.isDirectory()) throw new Error('The NaviHUB folder on the Kindle is not a plain folder')
    return true
  }

  async names(): Promise<string[]> {
    return fsp.readdir(this.dir())
  }

  async size(name: string): Promise<number | null> {
    try {
      return (await fsp.stat(this.file(name))).size
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null
      throw err
    }
  }

  sha256(name: string, shouldStop: () => boolean): Promise<string> {
    return sha256(this.file(name), shouldStop)
  }

  async isPlainFile(name: string): Promise<boolean | null> {
    try {
      const st = await fsp.lstat(this.file(name))
      return st.isFile() && !st.isSymbolicLink()
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null
      throw err
    }
  }
}

// A mass-storage Kindle mount (FAT): plain file writes work, 'wx' refuses an
// existing name on its own (EEXIST, which the writer never cleans up after),
// and the data is synced to the device before it is read back, so the check
// does not just read the page cache.
export class FilesystemUploader extends MountedFolder implements Uploader {
  async upload(
    localAbs: string,
    name: string,
    _bytes: number,
    shouldStop: () => boolean
  ): Promise<void> {
    const abs = this.file(name)
    await pipeline(
      createReadStream(localAbs),
      stopGate(shouldStop),
      createWriteStream(abs, { flags: 'wx' })
    )
    // fsync works per file, whichever descriptor asks.
    const handle = await fsp.open(abs, 'r')
    try {
      await handle.datasync()
    } finally {
      await handle.close()
    }
  }

  async remove(name: string): Promise<void> {
    await fsp.rm(this.file(name), { force: true })
  }
}

export interface GioResult {
  code: number | null
  stderr: string
}

// Runs gio with an argv array, ended after `timeoutMs` or when `shouldStop`
// says so (SIGTERM, then SIGKILL two seconds later). Injected in tests.
export type GioRunner = (
  args: string[],
  shouldStop: () => boolean,
  timeoutMs: number
) => Promise<GioResult>

export const runGio: GioRunner = (args, shouldStop, timeoutMs) =>
  new Promise((resolve, reject) => {
    const env = gioEnv(process.env, (dir) => existsSync(join(dir, 'libgvfsdbus.so')))
    const child = spawn('gio', args, { env, stdio: ['ignore', 'ignore', 'pipe'] })
    children.add(child)
    const started = Date.now()
    let stderr = ''
    let killedAt: number | null = null
    child.stderr.on('data', (d: Buffer) => {
      if (stderr.length < 4000) stderr += d.toString()
    })
    const timer = setInterval(() => {
      if (killedAt == null && (shouldStop() || Date.now() - started > timeoutMs)) {
        killedAt = Date.now()
        child.kill('SIGTERM')
      } else if (killedAt != null && Date.now() - killedAt > 2000) {
        child.kill('SIGKILL')
      }
    }, 200)
    child.on('error', (err) => {
      clearInterval(timer)
      children.delete(child)
      reject(
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? new Error('gio is not installed, so NaviHUB cannot write to an MTP Kindle')
          : err
      )
    })
    child.on('close', (code) => {
      clearInterval(timer)
      children.delete(child)
      const timedOut = killedAt != null && !shouldStop()
      resolve({ code, stderr: timedOut ? 'The Kindle stopped answering' : stderr.trim() })
    })
  })

// The gvfs MTP Kindle: gio uploads and removes, given paths under the FUSE
// mount, which it maps to the mtp:// backend and escapes itself. The upload
// replaces an existing name, so DeviceWriter's name check is the guard.
export class GioMtpUploader extends MountedFolder implements Uploader {
  constructor(
    root: string,
    private readonly gio: GioRunner = runGio
  ) {
    super(root)
    if (!isGvfsMtpRoot(root)) throw new Error('Not a gvfs MTP mount')
  }

  async upload(
    localAbs: string,
    name: string,
    bytes: number,
    shouldStop: () => boolean
  ): Promise<void> {
    if (!localAbs.startsWith('/')) throw new Error('The file to send must be an absolute path')
    // Generous for USB 2 MTP: two minutes, plus a second for every 512 KiB.
    const timeoutMs = 120_000 + Math.ceil(bytes / (512 * 1024)) * 1000
    const r = await this.gio(['copy', '--', localAbs, this.file(name)], shouldStop, timeoutMs)
    if (shouldStop() || stopAll) throw new Error('Send stopped')
    if (r.code !== 0)
      throw new Error(`The Kindle refused the file${r.stderr ? `: ${r.stderr}` : ''}`)
  }

  async remove(name: string): Promise<void> {
    const r = await this.gio(['remove', '--', this.file(name)], () => false, 60_000)
    if (r.code !== 0 && (await this.size(name)) != null) {
      throw new Error(`gio could not remove it${r.stderr ? `: ${r.stderr}` : ''}`)
    }
  }
}

// The uploader for a mounted storage root.
export function uploaderFor(root: string): Uploader {
  return isGvfsMtpRoot(root) ? new GioMtpUploader(root) : new FilesystemUploader(root)
}

// ---- the writer ----

// Reads through the gvfs mount have no timeout of their own, and a pulled
// cable can leave one hanging. Each is raced against a deadline, so the send
// fails (and its locks are released) instead of waiting forever.
const READ_MS = 30_000

function readBackMs(bytes: number): number {
  return 120_000 + Math.ceil(bytes / (512 * 1024)) * 1000
}

function deadline<T>(work: Promise<T>, ms: number, what: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`The Kindle stopped answering while ${what}`)), ms)
  })
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer))
}

// One device operation at a time, across every writer instance.
let busy = false

async function exclusive<T>(fn: () => Promise<T>): Promise<T> {
  if (busy) throw new Error('Something is already being written to the Kindle')
  busy = true
  try {
    return await fn()
  } finally {
    busy = false
  }
}

export class DeviceWriter {
  constructor(private readonly up: Uploader) {}

  ensureFolder(): Promise<void> {
    return exclusive(() => deadline(this.up.ensureFolder(), READ_MS, 'reading the Kindle'))
  }

  names(): Promise<string[]> {
    return exclusive(() => deadline(this.up.names(), READ_MS, 'reading the Kindle'))
  }

  // Removes a file from an upload that never finished, and only when it can be
  // that upload's copy: a plain file, no larger than the upload, and not the
  // complete upload (checked again under the lock). Anything else under the
  // name is someone else's and is left alone ('foreign'). The caller passes a
  // name from Send's own ledger, for the device that send went to.
  removeIncomplete(
    name: string,
    bytes: number,
    sha: string
  ): Promise<'absent' | 'complete' | 'removed' | 'foreign'> {
    return exclusive(async () => {
      const state = await this.state(name, bytes, sha)
      if (state !== 'incomplete') return state
      await this.up.remove(name)
      if ((await deadline(this.up.size(name), READ_MS, 'checking the file')) != null)
        throw new Error(`${name} is still on the Kindle; delete it there`)
      return 'removed'
    })
  }

  private async state(
    name: string,
    bytes: number,
    sha: string
  ): Promise<'absent' | 'complete' | 'incomplete' | 'foreign'> {
    // Read-only: never makes the folder just to look.
    assertName(name)
    if (!(await deadline(this.up.hasFolder(), READ_MS, 'reading the Kindle'))) return 'absent'
    const plain = await deadline(this.up.isPlainFile(name), READ_MS, 'checking the file')
    if (plain == null) return 'absent'
    if (!plain) return 'foreign'
    const size = await deadline(this.up.size(name), READ_MS, 'checking the file')
    if (size == null) return 'absent'
    // An upload never leaves more bytes than it sends.
    if (size > bytes) return 'foreign'
    if (size !== bytes) return 'incomplete'
    const got = await deadline(this.up.sha256(name, () => stopAll), readBackMs(bytes), 'reading the file back')
    return got === sha ? 'complete' : 'incomplete'
  }

  // `beforeUpload` runs once the local file is hashed and the name is known
  // free, right before the first byte goes out: Send records its ledger row
  // there, so an upload cut off mid-way is found again. It is synchronous.
  sendOne(
    file: PlannedSend,
    shouldStop: () => boolean = () => false,
    beforeUpload: (h: { sha256: string; partialMd5: string }) => void = () => undefined
  ): Promise<SentFile> {
    return exclusive(() => this.send(file, () => stopAll || shouldStop(), beforeUpload))
  }

  private async send(
    file: PlannedSend,
    shouldStop: () => boolean,
    beforeUpload: (h: { sha256: string; partialMd5: string }) => void
  ): Promise<SentFile> {
    if (!isNaviHubDevicePath(file.devicePath))
      throw new Error(`Refusing to write outside ${NAVIHUB_DEVICE_DIR}`)
    const name = file.devicePath.slice(NAVIHUB_DEVICE_DIR.length + 1)
    assertName(name)
    await deadline(this.up.ensureFolder(), READ_MS, 'reading the Kindle')
    if (nameTaken(name, await deadline(this.up.names(), READ_MS, 'reading the Kindle')))
      throw new Error(`${file.devicePath} already exists on the Kindle`)

    // Everything recorded about the file is taken before the upload, from
    // the bytes that are then sent.
    const local = await fsp.stat(file.localPath)
    if (local.size !== file.bytes) throw new Error('The file changed since the send was planned')
    const want = await sha256(file.localPath, shouldStop)
    const md5 = await localPartialMd5(file.localPath)
    if (shouldStop()) throw new Error('Send stopped')
    // Hashing a large file takes seconds: list again right before the first
    // byte, since the upload itself would replace a file that appeared.
    if (nameTaken(name, await deadline(this.up.names(), READ_MS, 'reading the Kindle'))) {
      throw new Error(`${file.devicePath} already exists on the Kindle`)
    }
    beforeUpload({ sha256: want, partialMd5: md5 })

    // From here a file under `name` is this upload's: the name was free.
    try {
      await this.up.upload(file.localPath, name, local.size, shouldStop)
      const size = await deadline(this.up.size(name), READ_MS, 'checking the file')
      if (size == null) throw new Error('The file is not on the Kindle after the upload')
      if (size !== local.size) throw new Error(`The Kindle holds ${size} of ${local.size} bytes`)
      if ((await deadline(this.up.sha256(name, shouldStop), readBackMs(local.size), 'reading the file back')) !== want) {
        throw new Error('The copy on the Kindle does not match the file')
      }
    } catch (err) {
      // EEXIST: the mount refused the name itself, so nothing there is ours.
      if ((err as NodeJS.ErrnoException).code === 'EEXIST') {
        throw new Error(`${file.devicePath} already exists on the Kindle`)
      }
      const reason = err instanceof Error ? err.message : String(err)
      // Quitting: the app is about to exit, so the clean-up is left to the
      // ledger (the row stays pending and is offered next launch).
      if (stopAll) throw new IncompleteCopyError(`${reason} (NaviHUB quit)`, name)
      try {
        await this.up.remove(name)
      } catch (cleanup) {
        const why = cleanup instanceof Error ? cleanup.message : String(cleanup)
        throw new IncompleteCopyError(
          `${reason}. The incomplete ${name} is still on the Kindle (${why}); delete it there.`,
          name
        )
      }
      throw err
    }
    return { devicePath: file.devicePath, bytes: local.size, partialMd5: md5, sha256: want }
  }
}
