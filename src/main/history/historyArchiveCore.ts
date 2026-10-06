// PURE: the History archive's file decisions — which files may be attached,
// where a copy lands under the history/ prefix, and the size cap for each kind
// of research download. historyJobs.ts does the IO.

import type { ArchiveKind } from '@shared/history/schema'

const KIND_BY_EXT: Record<string, ArchiveKind> = {}
const add = (kind: ArchiveKind, exts: string[]): void => exts.forEach((e) => (KIND_BY_EXT[e] = kind))
add('video', ['mp4', 'm4v', 'mkv', 'webm', 'avi', 'mov', 'mpg', 'mpeg', 'ogv', 'wmv'])
add('audio', ['mp3', 'ogg', 'oga', 'opus', 'm4a', 'aac', 'flac', 'wav'])
add('image', ['jpg', 'jpeg', 'png', 'gif', 'webp', 'tif', 'tiff', 'bmp'])
add('document', ['pdf', 'epub', 'txt', 'djvu'])

export const ATTACHABLE_EXTENSIONS = Object.keys(KIND_BY_EXT)

export function archiveKindForFile(name: string): ArchiveKind | null {
  const ext = /\.([a-z0-9]+)$/i.exec(name)?.[1]?.toLowerCase()
  return ext ? KIND_BY_EXT[ext] ?? null : null
}

/** Byte caps per kind for research downloads. */
export const DOWNLOAD_CAPS: Record<ArchiveKind, number> = {
  image: 128 * 1024 * 1024,
  document: 512 * 1024 * 1024,
  audio: 1024 * 1024 * 1024,
  video: 8 * 1024 * 1024 * 1024
}

/** One folder per entity: `event:1953-iranian-coup` -> `event-1953-iranian-coup`. */
export function archiveFolder(ref: string): string {
  const folder = ref.replace(/[^a-z0-9-]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase()
  if (!folder) throw new Error(`Bad History ref "${ref}"`)
  return folder
}

/** A file name safe on Windows and Linux, keeping its extension. */
export function safeFileName(name: string, fallback = 'file'): string {
  const base = name.split(/[\\/]/).pop() ?? ''
  const clean = base
    .normalize('NFC')
    .replace(/[\u0000-\u001f<>:"|?*]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\.+/, '')
  const m = /^(.*?)(\.[a-z0-9]{1,8})?$/i.exec(clean)!
  const stem = (m[1] || fallback).slice(0, 120).trim() || fallback
  return `${stem}${(m[2] ?? '').toLowerCase()}`
}

/** `name.ext`, then `name (2).ext`, ... avoiding names already taken. */
export function uniqueName(taken: ReadonlySet<string>, name: string): string {
  if (!taken.has(name.toLowerCase())) return name
  const m = /^(.*?)(\.[^.]*)?$/.exec(name)!
  for (let i = 2; ; i++) {
    const candidate = `${m[1]} (${i})${m[2] ?? ''}`
    if (!taken.has(candidate.toLowerCase())) return candidate
  }
}

/** The file name a research download is saved under. */
export function fileNameFromUrl(url: string, fallback: string): string {
  let last = ''
  try {
    last = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '')
  } catch {
    last = ''
  }
  return safeFileName(last || fallback, fallback)
}

export function titleFromFileName(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').trim() || name
}
