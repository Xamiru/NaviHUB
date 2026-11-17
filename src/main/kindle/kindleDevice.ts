// How NaviHUB reaches a Kindle's storage. Every adapter speaks paths relative
// to the device's storage root with forward slashes ("koreader/settings/…"),
// and every path is checked by isSafeRelative before it touches a disk.
//
// The filesystem adapter covers a Linux gvfs MTP mount
// (/run/user/<uid>/gvfs/mtp:host=Amazon_Kindle_…/Internal Storage), a
// mass-storage Kindle, and a folder the user copied the Kindle's `documents`
// and `koreader` folders into (the `kindle.folder` setting). The Windows shell
// adapter is a later slice. Discovery is read-only: no adapter here writes.

import { createReadStream, promises as fsp } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream/promises'
import type { KindleTransport } from '@shared/types'
import { isSafeRelative } from './kindleCore'

export interface DeviceEntry {
  name: string
  isDir: boolean
  size: number
}

export interface KindleDevice {
  label: string
  transport: KindleTransport
  location: string
  // '' is the storage root. A missing folder lists as [].
  list(rel: string): Promise<DeviceEntry[]>
  // null when the file is missing; throws when it is larger than maxBytes.
  readText(rel: string, maxBytes: number): Promise<string | null>
  // Copies one device file to a local path; false when it is missing.
  copyToLocal(rel: string, localAbs: string): Promise<boolean>
  // Bytes [offset, offset + length) of a file, short or empty past its end.
  readRange(rel: string, offset: number, length: number): Promise<Buffer | null>
  freeSpace(): Promise<{ free: number; total: number } | null>
}

function isMissing(err: unknown): boolean {
  const code = (err as NodeJS.ErrnoException | null)?.code
  return code === 'ENOENT' || code === 'ENOTDIR'
}

export class FilesystemDevice implements KindleDevice {
  readonly transport: KindleTransport = 'filesystem'

  constructor(
    readonly root: string,
    readonly label: string
  ) {}

  get location(): string {
    return this.root
  }

  private abs(rel: string): string {
    if (rel === '') return this.root
    if (!isSafeRelative(rel)) throw new Error(`Unsafe device path: ${rel}`)
    return join(this.root, ...rel.split('/'))
  }

  async list(rel: string): Promise<DeviceEntry[]> {
    let dirents: import('fs').Dirent[]
    try {
      dirents = await fsp.readdir(this.abs(rel), { withFileTypes: true })
    } catch (err) {
      if (isMissing(err)) return []
      throw err
    }
    const out: DeviceEntry[] = []
    for (const d of dirents) {
      // A symlink (only possible in a copied folder) is never followed: a
      // link to a parent would loop until the entry budget fails the check.
      if (d.isSymbolicLink()) continue
      // gvfs reports some entries as unknown types; stat settles them.
      let isDir = d.isDirectory()
      let size = 0
      // Only an entry of unknown type is stat'd: over MTP each stat is a
      // device round trip, and sizes are not needed to read the device.
      if (!isDir && !d.isFile()) {
        try {
          const st = await fsp.stat(join(this.abs(rel), d.name))
          isDir = st.isDirectory()
          size = st.isFile() ? st.size : 0
        } catch {
          continue
        }
      }
      out.push({ name: d.name, isDir, size })
    }
    return out
  }

  async readText(rel: string, maxBytes: number): Promise<string | null> {
    try {
      const st = await fsp.stat(this.abs(rel))
      if (!st.isFile()) return null
      if (st.size > maxBytes) throw new Error(`${rel} is larger than ${maxBytes} bytes`)
      return await fsp.readFile(this.abs(rel), 'utf8')
    } catch (err) {
      if (isMissing(err)) return null
      throw err
    }
  }

  async copyToLocal(rel: string, localAbs: string): Promise<boolean> {
    const source = this.abs(rel)
    // 'wx': never overwrite a local file; only a file opened here is removed.
    const handle = await fsp.open(localAbs, 'wx')
    try {
      // copyFile may try reflinks or sparse tricks a FUSE mount refuses; a
      // plain stream copy works on every mount.
      await pipeline(createReadStream(source), handle.createWriteStream())
      return true
    } catch (err) {
      await handle.close().catch(() => undefined)
      await fsp.rm(localAbs, { force: true }).catch(() => undefined)
      if (isMissing(err)) return false
      throw err
    }
  }

  async readRange(rel: string, offset: number, length: number): Promise<Buffer | null> {
    let handle: import('fs').promises.FileHandle
    try {
      handle = await fsp.open(this.abs(rel), 'r')
    } catch (err) {
      if (isMissing(err)) return null
      throw err
    }
    try {
      const buf = Buffer.alloc(length)
      const { bytesRead } = await handle.read(buf, 0, length, offset)
      return buf.subarray(0, bytesRead)
    } finally {
      await handle.close()
    }
  }

  async freeSpace(): Promise<{ free: number; total: number } | null> {
    try {
      const st = await fsp.statfs(this.root)
      const total = st.blocks * st.bsize
      // Some FUSE mounts answer with zeros; that is "unknown", not "full".
      if (!(total > 0)) return null
      return { free: st.bavail * st.bsize, total }
    } catch {
      return null
    }
  }
}

// ---- detection ----

export interface DetectEnv {
  platform: NodeJS.Platform
  uid: number | null
  user: string | null
  folderSetting: string | null
  // Overridable for tests.
  readdir?: (abs: string) => Promise<string[]>
  isDir?: (abs: string) => Promise<boolean>
}

async function defaultReaddir(abs: string): Promise<string[]> {
  try {
    return await fsp.readdir(abs)
  } catch {
    return []
  }
}

async function defaultIsDir(abs: string): Promise<boolean> {
  try {
    return (await fsp.stat(abs)).isDirectory()
  } catch {
    return false
  }
}

// A Kindle storage root has `documents` and usually `koreader`.
async function looksLikeKindleRoot(abs: string, env: DetectEnv): Promise<boolean> {
  const isDir = env.isDir ?? defaultIsDir
  return (await isDir(join(abs, 'documents'))) || (await isDir(join(abs, 'koreader')))
}

function mtpLabel(mountName: string): string {
  const host = /^mtp:host=(.*)$/.exec(mountName)?.[1] ?? mountName
  return decodeURIComponentSafe(host)
    .replace(/_[0-9A-Z]{8,}$/i, '') // the serial number
    .replace(/_/g, ' ')
    .trim()
}

function decodeURIComponentSafe(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

// Every reachable Kindle, best first: a connected device before the copied
// folder, so plugging the Kindle in wins over a stale copy.
export async function detectDevices(env: DetectEnv): Promise<FilesystemDevice[]> {
  const readdir = env.readdir ?? defaultReaddir
  const found: FilesystemDevice[] = []

  if (env.platform === 'linux') {
    if (env.uid != null) {
      const gvfs = `/run/user/${env.uid}/gvfs`
      for (const mount of await readdir(gvfs)) {
        if (!/^mtp:host=.*kindle/i.test(mount)) continue
        const base = join(gvfs, mount)
        for (const storage of await readdir(base)) {
          const root = join(base, storage)
          if (await looksLikeKindleRoot(root, env)) found.push(new FilesystemDevice(root, mtpLabel(mount)))
        }
      }
    }
    if (env.user) {
      for (const base of [`/media/${env.user}`, `/run/media/${env.user}`]) {
        for (const name of await readdir(base)) {
          if (!/kindle/i.test(name)) continue
          const root = join(base, name)
          if (await looksLikeKindleRoot(root, env)) found.push(new FilesystemDevice(root, name))
        }
      }
    }
  }

  if (env.folderSetting && (await looksLikeKindleRoot(env.folderSetting, env))) {
    found.push(new FilesystemDevice(env.folderSetting, 'Kindle folder'))
  }
  return found
}
