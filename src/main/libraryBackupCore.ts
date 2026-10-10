// Pure decisions for Settings → Backup & restore: the backup's manifest, which
// files in it go where, and how a restored database's settings are merged
// with this machine's. No fs, no electron — libraryBackup.ts does the IO and
// tests/libraryBackup.test.ts drives both halves.
//
// A backup is NOT a library export: it is the whole, unsanitized database
// (personal tracking, notes, learning progress, encrypted keys) plus the
// image roots, meant to be restored by NaviHUB itself, on this machine or
// another one. Exports stay the shareable, privacy-filtered format.

import { SECRET_SETTING_KEYS, type SecretSettingKey } from '@shared/secretSettings'

export const BACKUP_KIND = 'navihub-backup'
export const BACKUP_FORMAT_VERSION = 1
export const BACKUP_DB_ENTRY = 'navihub.db'
export const BACKUP_MANIFEST_ENTRY = 'manifest.json'

// The folders a backup can carry, each restored into this machine's own root.
// `jpaudio` holds mined-sentence clips no download can recreate; `audio` is the
// theme-song folder, carried only when `audio.dir` is set (unset, theme songs
// already live in `media`).
export const BACKUP_ROOTS = ['media', 'history', 'pictures', 'jpaudio', 'audio'] as const
export type BackupRoot = (typeof BACKUP_ROOTS)[number]

export interface BackupManifest {
  kind: typeof BACKUP_KIND
  formatVersion: number
  appVersion: string
  createdAt: string
  machine: string
  includes: Record<BackupRoot, boolean>
  counts: { titles: number; files: number; bytes: number }
}

// Settings that describe THIS machine rather than the library: folders, tool
// locations, local service addresses and display choices. A restore keeps the
// current machine's values for these, so a PC backup restored on the laptop
// never points the laptop at D:\ paths. tests/libraryBackup.test.ts fails when
// main reads a path-like setting that is missing here.
export const MACHINE_LOCAL_SETTING_KEYS = [
  'audio.dir',
  'books.dir',
  'football.dir',
  'history.dir',
  'manga.dir',
  'media.dir',
  'music.dir',
  'pictures.dir',
  'slideshow.dir',
  'video.dir',
  'wrestling.dir',
  'ffmpeg.path',
  'ffprobe.path',
  'mokuro.path',
  'music.ffmpegPath',
  'ytdlp.path',
  'spotdl.cookieFile',
  'vertex.credentials_path',
  'jackett.start_cmd',
  'jackett.url',
  'qbittorrent.url',
  'music.downloadWorkers',
  'ui.scale',
  'ui.menuBar'
] as const

function versionParts(version: string): number[] {
  return version
    .split(/[-+]/)[0]
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0)
}

// -1 / 0 / 1 on major.minor.patch; pre-release suffixes are ignored.
export function compareVersions(a: string, b: string): number {
  const pa = versionParts(a)
  const pb = versionParts(b)
  for (let i = 0; i < Math.max(pa.length, pb.length, 3); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (d !== 0) return d < 0 ? -1 : 1
  }
  return 0
}

export type ManifestCheck = { ok: true; manifest: BackupManifest } | { ok: false; reason: string }

// A backup from a NEWER NaviHUB is refused: migrations only run forward, so
// this build cannot know the shape that version wrote.
export function validateManifest(raw: unknown, appVersion: string): ManifestCheck {
  const m = raw as Partial<BackupManifest> | null
  if (!m || typeof m !== 'object' || m.kind !== BACKUP_KIND) {
    return { ok: false, reason: 'This is not a NaviHUB backup. (A library export cannot be restored here.)' }
  }
  if (typeof m.formatVersion !== 'number' || m.formatVersion > BACKUP_FORMAT_VERSION) {
    return { ok: false, reason: 'This backup was made by a newer NaviHUB. Update NaviHUB first.' }
  }
  if (typeof m.appVersion !== 'string' || compareVersions(m.appVersion, appVersion) > 0) {
    return {
      ok: false,
      reason: `This backup was made by NaviHUB ${m.appVersion ?? '(unknown)'}, newer than this ${appVersion}. Update NaviHUB first.`
    }
  }
  const includes = (m.includes ?? {}) as Partial<Record<BackupRoot, unknown>>
  return {
    ok: true,
    manifest: {
      kind: BACKUP_KIND,
      formatVersion: m.formatVersion,
      appVersion: m.appVersion,
      createdAt: typeof m.createdAt === 'string' ? m.createdAt : '',
      machine: typeof m.machine === 'string' ? m.machine : '',
      includes: {
        media: includes.media === true,
        history: includes.history === true,
        pictures: includes.pictures === true,
        jpaudio: includes.jpaudio === true,
        audio: includes.audio === true
      },
      counts: {
        titles: Number(m.counts?.titles) || 0,
        files: Number(m.counts?.files) || 0,
        bytes: Number(m.counts?.bytes) || 0
      }
    }
  }
}

// Where a file inside the backup belongs: its root and the path under it.
// Anything else (the manifest, the database, an unexpected or escaping name)
// is not copied.
export function backupEntryTarget(name: string): { root: BackupRoot; rel: string } | null {
  const normalized = name.replace(/\\/g, '/')
  if (normalized.endsWith('/')) return null
  const slash = normalized.indexOf('/')
  if (slash <= 0) return null
  const root = normalized.slice(0, slash) as BackupRoot
  const rel = normalized.slice(slash + 1)
  if (!(BACKUP_ROOTS as readonly string[]).includes(root)) return null
  if (!rel || rel.startsWith('/') || /^[a-z]:/i.test(rel)) return null
  if (rel.split('/').some((part) => part === '..' || part === '')) return null
  return { root, rel }
}

export type SettingWrite = { key: string; value: string | null }

// What to write into the restored database's settings table so that:
//   - machine-local keys keep this machine's values (or are removed if this
//     machine never set them), and
//   - a key the backup holds but this machine cannot decrypt is replaced by
//     this machine's working key when there is one.
// `backupSecretReadable(key)` says whether the backup's envelope decrypts here.
export function planSettingsMerge(
  backup: ReadonlyMap<string, string>,
  current: ReadonlyMap<string, string>,
  backupSecretReadable: (key: SecretSettingKey) => boolean,
  currentSecretReadable: (key: SecretSettingKey) => boolean
): SettingWrite[] {
  const writes: SettingWrite[] = []
  for (const key of MACHINE_LOCAL_SETTING_KEYS) {
    const here = current.get(key)
    if (here === backup.get(key)) continue
    writes.push({ key, value: here ?? null })
  }
  for (const key of SECRET_SETTING_KEYS) {
    const theirs = backup.get(key)
    const ours = current.get(key)
    if (!ours || !currentSecretReadable(key)) continue
    if (theirs && backupSecretReadable(key)) continue
    writes.push({ key, value: ours })
  }
  return writes
}

// Written by the restore before the app restarts, read at the next launch
// before the database opens (startupMaintenance.ts).
export const RESTORE_MARKER = 'restore-pending.json'

export interface PendingRestore {
  stagedDb: string
  safetyDir: string
  label: string
}

export function parsePendingRestore(raw: string): PendingRestore | null {
  try {
    const p = JSON.parse(raw) as Partial<PendingRestore>
    if (typeof p.stagedDb !== 'string' || typeof p.safetyDir !== 'string') return null
    return { stagedDb: p.stagedDb, safetyDir: p.safetyDir, label: typeof p.label === 'string' ? p.label : '' }
  } catch {
    return null
  }
}

export function backupBaseName(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `NaviHUB Backup ${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
}
