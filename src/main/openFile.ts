import { basename, extname, isAbsolute, resolve } from 'path'
import { existsSync, statSync } from 'fs'
import { registerOpenedFile } from './files'
import { VIDEO_EXTS } from './video/names'
import type { OpenTarget, OpenKind } from '@shared/types'

// "Open with NaviHUB": the OS hands us a path (startup argv, a second-instance
// launch, or macOS's open-file event) and we turn it into a route the renderer
// can go to.
//
// Everything here is deliberately DB-free. A file opened this way is ad-hoc —
// it is not scanned, not attached to a media item, and nothing about it is
// persisted. That is what makes "open with" safe to point at any file on disk.

const BOOK_EXTS = new Set(['.epub'])
const MANGA_EXTS = new Set(['.cbz', '.zip'])
const AUDIO_EXTS = new Set(['.mp3', '.flac', '.m4a', '.aac', '.ogg', '.opus', '.wav'])

// Pure: what kind of thing is this, by extension alone. null = we don't open it.
// Mirrors the per-feature extension sets (video/names.ts:VIDEO_EXTS,
// music.ts:AUDIO_EXTS, archive.ts:ARCHIVE_EXTS, epub.ts:isEpubFile) — keep them
// in step, and keep this list in step with electron-builder.yml's
// fileAssociations, which is what the OS actually offers NaviHUB for.
export function classifyPath(filePath: string): OpenKind | null {
  const ext = extname(filePath).toLowerCase()
  if (VIDEO_EXTS.has(ext)) return 'video'
  if (BOOK_EXTS.has(ext)) return 'book'
  if (MANGA_EXTS.has(ext)) return 'manga'
  if (AUDIO_EXTS.has(ext)) return 'audio'
  return null
}

export const OPENABLE_EXTS: string[] = [
  ...VIDEO_EXTS,
  ...BOOK_EXTS,
  ...MANGA_EXTS,
  ...AUDIO_EXTS
].map((e) => e.slice(1))

// Pure: the file paths in a process argv. Electron hands us the executable
// first and, in dev, the app directory second; flags and the Chromium switches
// Electron injects (--no-sandbox, --allow-file-access-from-files, …) must never
// be mistaken for filenames.
export function parseArgvFiles(argv: string[], cwd: string): string[] {
  const out: string[] = []
  // Skip argv[0] (the binary). In a dev run argv[1] is the app directory.
  for (const raw of argv.slice(1)) {
    if (!raw || raw.startsWith('-')) continue
    const abs = isAbsolute(raw) ? raw : resolve(cwd, raw)
    if (classifyPath(abs) == null) continue
    out.push(abs)
  }
  return out
}

// ---------------------------------------------------------------------------
// The pending queue
// ---------------------------------------------------------------------------
//
// This app has NO push channel to the renderer (no ipcRenderer.on anywhere —
// see CLAUDE.md), so an OS-delivered open cannot be sent. It is parked here and
// the renderer collects it through the `app:pendingOpen` invoke, which returns
// and CLEARS in one step so a target is delivered exactly once.

let pending: OpenTarget[] = []

export function openTargetFor(absPath: string): OpenTarget | null {
  const kind = classifyPath(absPath)
  if (!kind) return null
  try {
    if (!existsSync(absPath) || !statSync(absPath).isFile()) return null
  } catch {
    return null
  }
  const relPath = registerOpenedFile(absPath)
  const token = relPath.slice('open/'.length)
  const title = basename(absPath, extname(absPath))
  return { kind, token, relPath, title, route: routeFor(kind, token) }
}

function routeFor(kind: OpenKind, token: string): string {
  switch (kind) {
    case 'video':
      return `/watch/adhoc/${token}`
    case 'book':
      return `/read/book/${token}`
    case 'manga':
      return `/read/manga/${token}`
    case 'audio':
      // Audio has no page of its own: the renderer hands it straight to the
      // global player and stays where it is.
      return ''
  }
}

// Queues everything openable in `paths`. Returns how many were accepted, so
// callers can decide whether to focus the window.
export function queueOpen(paths: string[]): number {
  const targets = paths.map(openTargetFor).filter((t): t is OpenTarget => t != null)
  if (targets.length === 0) return 0
  // Cap: a "select 500 files → open with" would otherwise flood the renderer.
  pending = [...pending, ...targets].slice(-32)
  return targets.length
}

// Returns and CLEARS. Exactly-once delivery is the whole contract — the poller
// runs on focus and on an interval, so a peek-without-clear would reopen the
// same file every tick.
export function takePending(): OpenTarget[] {
  const out = pending
  pending = []
  return out
}

export function hasPending(): boolean {
  return pending.length > 0
}
