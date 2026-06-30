import { app, dialog } from 'electron'
import { join, extname, basename } from 'path'
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs'
import { get as getSetting } from './repos/settingsRepo'

// Images live under userData/media. The DB stores only the relative filename
// (e.g. "media/cover-169...png") so the library stays portable.
function mediaDir(): string {
  const dir = join(app.getPath('userData'), 'media')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

// Theme-song audio can be heavy, so it gets its own directory — overridable via
// the `audio.dir` setting (e.g. a roomier external drive). DB paths use a virtual
// "audio/" prefix; only this module maps that prefix to the real folder, so the
// location can be changed later without touching stored rows.
function audioDir(): string {
  const custom = getSetting('audio.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'media')
}

let counter = 0
function uniqueName(srcPath: string): string {
  // Avoid Date.now()/Math.random(): derive from a process-lifetime counter
  // plus the original base name. Good enough for a single-user local app.
  counter += 1
  const ext = extname(srcPath) || '.img'
  const stem = basename(srcPath, ext)
    .replace(/[^a-z0-9_-]+/gi, '-')
    .slice(0, 40)
  return `${stem}-${process.pid}-${counter}${ext}`
}

export async function pickImage(): Promise<string | null> {
  const res = await dialog.showOpenDialog({
    title: 'Choose an image',
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'] }]
  })
  if (res.canceled || res.filePaths.length === 0) return null

  const src = res.filePaths[0]
  const fileName = uniqueName(src)
  const dest = join(mediaDir(), fileName)
  copyFileSync(src, dest)
  return join('media', fileName)
}

// Strips characters that are illegal/awkward in filenames, so theme audio can be
// saved with a readable name (e.g. "Berserk OP1 - Tell Me Why.ogg").
function sanitizeFileBase(s: string): string {
  const clean = s
    // illegal path chars + control chars -> space; hyphens/spaces are kept
    // eslint-disable-next-line no-control-regex
    .replace(/[/\\:*?"<>|\x00-\x1f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
  return clean || 'theme'
}

// Returns a custom-protocol URL (served by the navimg handler in index.ts) so
// the renderer can display the image (or play the audio) without relaxing web
// security. Each path segment is percent-encoded so readable filenames with
// spaces/punctuation resolve correctly (the handler decodeURIComponent's it back).
export function resolveUrl(relPath: string | null): string | null {
  if (!relPath) return null
  const abs = absoluteMediaPath(relPath)
  if (!existsSync(abs)) return null
  const encoded = relPath
    .split('\\')
    .join('/')
    .split('/')
    .map(encodeURIComponent)
    .join('/')
  return `navimg://${encoded}`
}

// Absolute path on disk for a stored relative path (used by the protocol handler
// and resolveUrl). "audio/<file>" resolves against the configurable audio dir;
// everything else ("media/<file>") against userData.
export function absoluteMediaPath(relPath: string): string {
  const norm = relPath.split('\\').join('/')
  if (norm.startsWith('audio/')) return join(audioDir(), norm.slice('audio/'.length))
  return join(app.getPath('userData'), norm)
}

// Downloads a remote audio file (e.g. an AnimeThemes .ogg) into the audio dir
// and returns the stored relative path ("audio/<file>"), or null on failure.
// `baseName` (e.g. "Berserk OP1 - Tell Me Why") gives the file a readable name;
// without it a counter-based name is used. Served back through the navimg
// protocol like images.
export async function downloadAudio(
  url: string | null | undefined,
  baseName?: string | null
): Promise<string | null> {
  if (!url) return null
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const urlExt = extname(new URL(url).pathname)
    const ext = /^\.(ogg|mp3|m4a|aac|opus|webm|wav)$/i.test(urlExt) ? urlExt : '.ogg'
    const dir = audioDir()
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    let fileName: string
    if (baseName && baseName.trim()) {
      fileName = `${sanitizeFileBase(baseName)}${ext}`
    } else {
      counter += 1
      fileName = `aud-${process.pid}-${counter}${ext}`
    }
    writeFileSync(join(dir, fileName), buf)
    return `audio/${fileName}`
  } catch {
    return null
  }
}

// Downloads a remote image (e.g. an AniList cover) into userData/media and
// returns the stored relative path, or null on failure.
export async function downloadImage(url: string | null | undefined): Promise<string | null> {
  if (!url) return null
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const urlExt = extname(new URL(url).pathname)
    const ext = /^\.(png|jpe?g|webp|gif|bmp)$/i.test(urlExt) ? urlExt : '.jpg'
    counter += 1
    const fileName = `dl-${process.pid}-${counter}${ext}`
    const dest = join(mediaDir(), fileName)
    writeFileSync(dest, buf)
    return join('media', fileName)
  } catch {
    return null
  }
}
