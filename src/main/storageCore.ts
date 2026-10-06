import path, { join } from 'path'

// Pure decisions for relocating the app-owned file roots (the IO half is
// storageMove.ts). Rows store "pictures/…", "media/…" and "history/…" paths
// relative to these roots, so moving a root is: move the files, then change one
// setting.

export type StorageRoot = 'pictures' | 'media' | 'history'

export const STORAGE_SETTING: Record<StorageRoot, string> = {
  pictures: 'pictures.dir',
  media: 'media.dir',
  history: 'history.dir'
}

export const STORAGE_LABEL: Record<StorageRoot, string> = {
  pictures: 'pictures folder',
  media: 'media folder',
  history: 'History archive folder'
}

// Where an unset pictures.dir should point on startup. A library that already
// saved Art images under the old default keeps them there (pinned, so a later
// default change can never strand them); a fresh one starts in the OS Pictures
// folder, where Explorer, Photos and the Windows slideshow setting can see it.
// null = leave the setting unset (the OS has no Pictures folder).
export function initialPicturesDir(opts: {
  legacyDir: string
  legacyHasFiles: boolean
  osPictures: string | null
}): string | null {
  if (opts.legacyHasFiles) return opts.legacyDir
  return opts.osPictures ? join(opts.osPictures, 'NaviHUB') : null
}

// a contains b (or equals it). Uses the target platform's path rules, so it is
// case-insensitive on Windows.
export function isInside(parent: string, child: string, platform = process.platform): boolean {
  const p = platform === 'win32' ? path.win32 : path.posix
  const fold = (x: string): string => (platform === 'win32' ? p.resolve(x).toLowerCase() : p.resolve(x))
  const rel = p.relative(fold(parent), fold(child))
  return rel === '' || (!rel.startsWith('..') && !p.isAbsolute(rel))
}

// The user-facing reason a destination is refused, or null when it is fine.
export function moveTargetProblem(opts: {
  from: string
  to: string
  toExists: boolean
  toEmpty: boolean
  // Other folders NaviHUB owns or reads (music, manga, the other image root…)
  otherRoots: { label: string; dir: string }[]
  platform?: NodeJS.Platform
}): string | null {
  const platform = opts.platform ?? process.platform
  if (!(platform === 'win32' ? path.win32 : path.posix).isAbsolute(opts.to)) {
    return 'Choose a full folder path.'
  }
  if (isInside(opts.from, opts.to, platform) && isInside(opts.to, opts.from, platform)) {
    return 'That is already the current folder.'
  }
  if (isInside(opts.from, opts.to, platform) || isInside(opts.to, opts.from, platform)) {
    return 'The new folder cannot be inside the current one, or contain it.'
  }
  for (const other of opts.otherRoots) {
    if (isInside(other.dir, opts.to, platform) || isInside(opts.to, other.dir, platform)) {
      return `That folder overlaps the ${other.label}. Choose a separate folder.`
    }
  }
  if (opts.toExists && !opts.toEmpty) return 'Choose an empty folder, or create a new one.'
  return null
}

// fs.rename cannot cross drives; these codes mean "copy instead", anything else
// is a real failure.
export function isCrossDeviceError(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code
  return code === 'EXDEV' || code === 'EPERM' || code === 'ENOTEMPTY' || code === 'EEXIST'
}
