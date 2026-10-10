// Settings → Folders & storage: how much space each part of NaviHUB uses, and
// the two caches that are safe to clear because they rebuild themselves.
// Measured only on request and with async fs calls, never a sync walk on main.

import { app } from 'electron'
import { promises as fsp } from 'fs'
import { measureTree } from './fsMeasure'
import { join } from 'path'
import type { MaintenanceResult, StorageUsage, StorageUsageEntry, StorageUsageKey } from '@shared/types'
import { getDbPath } from './db/connection'
import { getDictDbPath } from './dict/dictDb'
import { catalogPath } from './gamesCatalogDb'
import { launchboxCatalogPath } from './launchboxCatalogDb'
import { historyRootDir, mediaRoot, picturesDir, videoCacheDir } from './files'
import { thumbsDir } from './thumbs'
import { logDir } from './logFile'
import { logInfo, logWarn } from './logBus'
import { callQuizPools } from './quizPools'

export function backupsDir(): string {
  return join(app.getPath('userData'), 'backups')
}

function subtitlesDir(): string {
  return join(videoCacheDir(), 'subs')
}

const DEFS: { key: StorageUsageKey; label: string; paths: () => string[]; clearable?: boolean }[] = [
  {
    key: 'database',
    label: 'Library database',
    paths: () => [getDbPath(), `${getDbPath()}-wal`, `${getDbPath()}-shm`]
  },
  { key: 'dictionaries', label: 'Dictionaries', paths: () => [getDictDbPath()] },
  { key: 'catalogs', label: 'Games catalogs', paths: () => [catalogPath(), launchboxCatalogPath()] },
  { key: 'media', label: 'Media (covers, photos, picked images)', paths: () => [mediaRoot()] },
  { key: 'pictures', label: 'Pictures', paths: () => [picturesDir()] },
  { key: 'history', label: 'History archive', paths: () => [historyRootDir()] },
  { key: 'thumbnails', label: 'Thumbnail cache', paths: () => [thumbsDir()], clearable: true },
  { key: 'subtitles', label: 'Extracted subtitles', paths: () => [subtitlesDir()], clearable: true },
  { key: 'logs', label: 'Logs', paths: () => [logDir()] },
  { key: 'backups', label: 'Safety copies before restore', paths: () => [backupsDir()] }
]

export async function usage(): Promise<StorageUsage> {
  const entries: StorageUsageEntry[] = []
  for (const def of DEFS) {
    const paths = def.paths()
    entries.push({
      key: def.key,
      label: def.label,
      path: paths[0],
      ...(await measureTree(...paths)),
      clearable: def.clearable ?? false
    })
  }
  return { dataFolder: app.getPath('userData'), entries, measuredAt: Date.now() }
}

// Empties a regenerated cache: thumbnails are rebuilt on their next request,
// subtitle tracks are re-extracted the next time a video wants them. Only the
// files inside go; the folder itself stays.
export async function clearCache(key: StorageUsageKey): Promise<MaintenanceResult> {
  const dir = key === 'thumbnails' ? thumbsDir() : key === 'subtitles' ? subtitlesDir() : null
  if (!dir) throw new Error(`${key} is not a clearable cache`)
  const before = await measureTree(dir)
  let names: string[] = []
  try {
    names = await fsp.readdir(dir)
  } catch {
    return { ok: true, message: 'Already empty.' }
  }
  for (const name of names) await fsp.rm(join(dir, name), { recursive: true, force: true })
  logInfo('app', `cleared ${key}: ${before.files} files`)
  return { ok: true, message: `Cleared ${before.files} files.` }
}

// PRAGMA quick_check, on the quiz pool process's read-only connection so a
// large library never blocks main while every page is read.
export async function checkDatabase(): Promise<MaintenanceResult> {
  const rows = await callQuizPools('quickCheck')
  if (rows.length === 1 && rows[0] === 'ok') {
    return { ok: true, message: 'The library database passed its integrity check.' }
  }
  logWarn('db', `quick_check reported: ${rows.slice(0, 20).join(' | ')}`)
  return {
    ok: false,
    message: `The integrity check found ${rows.length} problem${rows.length === 1 ? '' : 's'}; details are in the log. Restore a backup if pages misbehave.`
  }
}
