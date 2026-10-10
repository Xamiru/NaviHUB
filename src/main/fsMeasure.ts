// Bytes and file count under one or more paths, walked with async fs calls so
// a large folder never blocks main. Symlinks are skipped and a missing or
// unreadable path counts as zero. No electron: the backup file helpers and
// Settings → Storage usage both use it, and tests drive it with temp folders.

import { lstat, readdir } from 'fs/promises'
import { join } from 'path'

export async function measureTree(...roots: string[]): Promise<{ bytes: number; files: number }> {
  let bytes = 0
  let files = 0
  const walk = async (path: string): Promise<void> => {
    let info
    try {
      info = await lstat(path)
    } catch {
      return
    }
    if (info.isSymbolicLink()) return
    if (info.isFile()) {
      bytes += info.size
      files++
    } else if (info.isDirectory()) {
      for (const name of await readdir(path).catch(() => [] as string[])) await walk(join(path, name))
    }
  }
  for (const root of roots) await walk(root)
  return { bytes, files }
}
