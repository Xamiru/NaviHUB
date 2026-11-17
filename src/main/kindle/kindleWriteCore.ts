// Pure rules for writing to the Kindle (Send to Kindle). No electron, fs or
// database import. The Kindle is treated as fragile: every limit here errs on
// refusing a send rather than filling or confusing the device.
//
// - Writes go only to documents/NaviHUB/ (isNaviHubDevicePath), straight to
//   the book's final name: the Kindle's MTP cannot rename a file (probe,
//   2026-11-17), so there is no hidden .part step. The writer checks the name
//   is free, uploads, reads the file back, and removes it on a mismatch.
// - A send must leave at least 1 GiB and 10% of the storage free: KOReader
//   writes its statistics database and sidecars as you read, and a full
//   Kindle misbehaves.
// - At most 500 MiB per file and 2 GiB per send.
// - Names are FAT/NTFS/MTP-safe (deviceFileName) and never reuse a name in
//   the folder (freeFileName), compared case-insensitively.

import { NAVIHUB_DEVICE_DIR, deviceFileName, freeFileName, isNaviHubDevicePath } from './kindleCore'

export const MIN_FREE_BYTES = 1024 ** 3
export const MIN_FREE_RATIO = 0.1
export const MAX_FILE_BYTES = 500 * 1024 ** 2
export const MAX_SEND_BYTES = 2 * 1024 ** 3

export interface SendFile {
  localPath: string
  title: string
  ext: string // 'epub', 'cbz', …
  bytes: number
}

export interface PlannedSend {
  localPath: string
  bytes: number
  devicePath: string // documents/NaviHUB/<name>
}

export type SendRefusal =
  | { reason: 'nothing' }
  | { reason: 'emptyFile'; title: string }
  | { reason: 'fileTooLarge'; title: string; bytes: number }
  | { reason: 'sendTooLarge'; bytes: number }
  | { reason: 'spaceUnknown' }
  | { reason: 'notEnoughSpace'; needed: number; free: number; keep: number }

export type SendPlan =
  | { ok: true; files: PlannedSend[]; bytes: number; freeAfter: number }
  | { ok: false; refusal: SendRefusal }

// The free space a send must leave on the device.
export function keepFree(total: number): number {
  return Math.max(MIN_FREE_BYTES, Math.ceil(total * MIN_FREE_RATIO))
}

// `taken`: the names already in documents/NaviHUB/. `space` null means the
// device would not say, and a send is refused rather than guessed.
export function planSend(
  files: SendFile[],
  taken: Iterable<string>,
  space: { free: number; total: number } | null
): SendPlan {
  if (!files.length) return { ok: false, refusal: { reason: 'nothing' } }
  for (const f of files) {
    if (!Number.isSafeInteger(f.bytes) || f.bytes <= 0) {
      return { ok: false, refusal: { reason: 'emptyFile', title: f.title } }
    }
    if (f.bytes > MAX_FILE_BYTES) {
      return { ok: false, refusal: { reason: 'fileTooLarge', title: f.title, bytes: f.bytes } }
    }
  }
  const bytes = files.reduce((n, f) => n + f.bytes, 0)
  if (bytes > MAX_SEND_BYTES) return { ok: false, refusal: { reason: 'sendTooLarge', bytes } }
  if (!space || !(space.total > 0) || !(space.free >= 0))
    return { ok: false, refusal: { reason: 'spaceUnknown' } }
  const keep = keepFree(space.total)
  if (space.free - bytes < keep) {
    return {
      ok: false,
      refusal: { reason: 'notEnoughSpace', needed: bytes, free: space.free, keep }
    }
  }
  const names = [...taken]
  const planned: PlannedSend[] = files.map((f, i) => {
    const name = freeFileName(deviceFileName(f.title, f.ext), names)
    names.push(name)
    const devicePath = `${NAVIHUB_DEVICE_DIR}/${name}`
    if (
      !isNaviHubDevicePath(devicePath) ||
      devicePath.slice(NAVIHUB_DEVICE_DIR.length + 1).includes('/')
    ) {
      throw new Error('A send path left the NaviHUB folder')
    }
    return { localPath: f.localPath, bytes: f.bytes, devicePath }
  })
  return { ok: true, files: planned, bytes, freeAfter: space.free - bytes }
}

export function refusalText(r: SendRefusal): string {
  const mb = (n: number): string => `${(n / 1024 ** 2).toFixed(1)} MiB`
  switch (r.reason) {
    case 'nothing':
      return 'Nothing to send.'
    case 'emptyFile':
      return `${r.title} is empty or unreadable, so it is not sent.`
    case 'fileTooLarge':
      return `${r.title} is ${mb(r.bytes)}; a file over ${mb(MAX_FILE_BYTES)} is not sent.`
    case 'sendTooLarge':
      return `That is ${mb(r.bytes)}; send at most ${mb(MAX_SEND_BYTES)} at a time.`
    case 'spaceUnknown':
      return 'The Kindle did not report its free space, so nothing is sent.'
    case 'notEnoughSpace':
      return `The Kindle would keep less than ${mb(r.keep)} free (it has ${mb(r.free)}, the send is ${mb(r.needed)}).`
  }
}

// ---- reaching an MTP Kindle through gio ----

// Whether a storage root is a gvfs MTP mount ("/run/user/1000/gvfs/mtp:host=
// Amazon_Kindle_Paperwhite_GN43…/Internal Storage"). gio is handed paths under
// that mount, which it maps to the mtp:// backend and escapes itself ("#" and
// "%" in a title included), so no URI is ever built here.
export function isGvfsMtpRoot(root: string): boolean {
  const m = /\/gvfs\/mtp:host=([^/]+)\/([^/]+)\/?$/.exec(root)
  return !!m && !m[1].includes('..') && m[2] !== '..' && m[2] !== '.'
}

// Where distributions keep GIO's modules; the first holding the gvfs module wins.
export const SYSTEM_GIO_MODULE_DIRS = [
  '/usr/lib/x86_64-linux-gnu/gio/modules',
  '/usr/lib/aarch64-linux-gnu/gio/modules',
  '/usr/lib64/gio/modules',
  '/usr/lib/gio/modules'
]

// The environment a gio child gets. A snap (VS Code, and anything launched
// from its terminal) points GIO_MODULE_DIR at a folder without the gvfs
// module, and gio then cannot see the Kindle at all; such a value is replaced
// by a system folder that has it, or removed so gio uses its built-in default.
// `hasGvfs(dir)` says whether a folder holds the module.
export function gioEnv(
  env: Record<string, string | undefined>,
  hasGvfs: (dir: string) => boolean,
  systemDirs = SYSTEM_GIO_MODULE_DIRS
): Record<string, string | undefined> {
  const dir = env.GIO_MODULE_DIR
  if (!dir || hasGvfs(dir)) return { ...env }
  const system = systemDirs.find(hasGvfs)
  const out = { ...env }
  if (system) out.GIO_MODULE_DIR = system
  else delete out.GIO_MODULE_DIR
  return out
}

// A name the folder already holds, compared as FAT and MTP do (no case), by
// the same rule the planner uses to pick a free name.
export function nameTaken(name: string, names: Iterable<string>): boolean {
  return freeFileName(name, names) !== name
}
