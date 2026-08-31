import { createHash } from 'crypto'
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { app, nativeImage } from 'electron'
import { absoluteMediaPath } from './files'

// Disk-cached, generated-on-first-request thumbnails for stored images,
// served through the navimg handler's "thumb/<w>/<rel>" branch.
//
// Why: covers are stored at source resolution (Steam's library_600x900_2x is
// 1200x1800; VNDB originals run larger), but most slots display them at
// ~100-200 px. Decoding the full bitmap for each — and re-decoding as rows
// scroll out of and back into Chromium's decoded-image cache — is what made
// the Installed page jank on scroll (2026-08). A 320-wide JPEG decodes an
// order of magnitude cheaper.
//
// Nothing here needs a re-import or migration: thumbs derive lazily from
// files already on disk, keyed by content-addressed rel path. A missing or
// undecodable original just yields null and the renderer falls back to the
// full-size URL via <img> onError.

// Fixed set — bounds the cache and keeps URLs canonical. Callers ask for one
// of these; nothing resizes on the fly per arbitrary width.
export const THUMB_WIDTHS = [160, 320, 480]

export interface ThumbRequest {
  width: number
  sourceRel: string
}

// PURE: "thumb/320/media/dl-<sha1>.jpg" -> { width, sourceRel }, or null when
// the request is malformed. Restricted to media/ (the content-addressed cover
// store) so a crafted URL can't demand thumbs of arbitrary user files, and
// traversal is rejected before absoluteMediaPath ever sees it.
export function parseThumbRequest(relPath: string): ThumbRequest | null {
  const m = /^thumb\/(\d+)\/(.+)$/.exec(relPath)
  if (!m) return null
  const width = Number(m[1])
  if (!THUMB_WIDTHS.includes(width)) return null
  const sourceRel = m[2].split('\\').join('/')
  if (!sourceRel.startsWith('media/')) return null
  if (sourceRel.split('/').includes('..')) return null
  return { width, sourceRel }
}

// PURE: deterministic cache file name under userData/thumbs. Keyed by width +
// rel path (rel paths are already content-addressed by downloadImage, so a
// re-imported cover is a new file name and gets its own thumb).
export function thumbCacheName(sourceRel: string, width: number): string {
  const hash = createHash('sha1').update(`${width}:${sourceRel}`).digest('hex')
  return `${hash}-${width}.jpg`
}

function thumbsDir(): string {
  return join(app.getPath('userData'), 'thumbs')
}

// One decode/resize per image even when several requests land together (a grid
// mounts all its visible covers in the same frame).
const inflight = new Map<string, Promise<string | null>>()
let generationTail: Promise<void> = Promise.resolve()

function enqueueGeneration<T>(work: () => Promise<T>): Promise<T> {
  const job = generationTail
    .then(() => new Promise<void>((resolve) => setImmediate(resolve)))
    .then(work)
  generationTail = job.then(
    () => undefined,
    () => undefined
  )
  return job
}

// Returns the absolute path of the cached thumbnail, generating it first if
// needed, or null when the source is missing or can't be decoded.
export async function ensureThumb(width: number, sourceRel: string): Promise<string | null> {
  const key = `${width}:${sourceRel}`
  const existing = inflight.get(key)
  if (existing) return existing
  const job = enqueueGeneration(() => generateThumb(width, sourceRel)).finally(() =>
    inflight.delete(key)
  )
  inflight.set(key, job)
  return job
}

async function generateThumb(width: number, sourceRel: string): Promise<string | null> {
  let absSource: string
  try {
    absSource = absoluteMediaPath(sourceRel)
  } catch {
    return null
  }
  if (!existsSync(absSource)) return null

  const outPath = join(thumbsDir(), thumbCacheName(sourceRel, width))
  if (existsSync(outPath)) return outPath

  // nativeImage decoding is synchronous. The global queue bounds it to one
  // image at a time and yields between covers so a cold grid cannot run an
  // uninterrupted burst of decode + resize + disk writes on the main thread.
  const img = nativeImage.createFromPath(absSource)
  if (img.isEmpty()) return null
  const size = img.getSize()
  const scaled = size.width > width ? img.resize({ width }) : img
  const jpeg = scaled.toJPEG(80)

  await mkdir(thumbsDir(), { recursive: true })
  await writeFile(outPath, jpeg)
  return outPath
}
