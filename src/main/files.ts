import { app, dialog } from 'electron'
import { join, extname, basename } from 'path'
import { existsSync, mkdirSync, copyFileSync, writeFileSync, readFileSync } from 'fs'
import { createHash } from 'crypto'
import { get as getSetting } from './repos/settingsRepo'
import { imageProgress } from './progress'
import { fetchWithRetry } from './http'
import { mediaUrl } from '@shared/mediaUrl'

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

// Manga pages live in a user-chosen library root (settings key `manga.dir`,
// auto-set on the first folder attach). DB rows and navimg URLs use a virtual
// "manga/" prefix, mirroring the audio/ scheme above, so the library can be
// relocated by changing one setting.
export function mangaRootDir(): string {
  const custom = getSetting('manga.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'manga')
}

// Books (EPUB novels etc.) live in their own user-chosen root (settings key
// `books.dir`, auto-set on the first folder attach like manga.dir). DB rows and
// navimg URLs use a virtual "books/" prefix, mirroring the manga/ scheme above.
export function booksRootDir(): string {
  const custom = getSetting('books.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'books')
}

// Wrestling collection root (settings key `wrestling.dir`, auto-set on the
// first per-event folder attach like books.dir). Separate from video.dir on
// purpose: PPV rips are their own library and shouldn't be forced onto the same
// drive as the anime one. DB rows and navimg URLs use a virtual "wrestling/"
// prefix.
export function wrestlingRootDir(): string {
  const custom = getSetting('wrestling.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'wrestling')
}

// Local music library root (settings key `music.dir`, set from the Music page's
// folder picker or Settings). DB rows and navimg URLs use a virtual "music/"
// prefix, mirroring the manga/ scheme above.
export function musicRootDir(): string {
  const custom = getSetting('music.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'music')
}

// Wallpapers + fan art root (settings key `pictures.dir`). Files are organized
// by title ("<Title> (<type>)/wallpapers/…") so the folder is browsable outside
// the app too. DB rows and navimg URLs use a virtual "pictures/" prefix,
// mirroring the audio/ scheme above.
export function picturesDir(): string {
  const custom = getSetting('pictures.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'pictures')
}

// Japanese learning audio (Tatoeba sentence clips, pitch minimal pairs) —
// written by the dict/ audio pack importers, served via the "jpaudio/" navimg
// prefix. Always under userData (the packs are small and rebuildable), no
// setting.
export function jpAudioDir(): string {
  return join(app.getPath('userData'), 'jpaudio')
}

// Local video library root (settings key `video.dir`, bootstrapped from the
// first folder attach like manga.dir). DB rows and navimg URLs use a virtual
// "video/" prefix, mirroring the manga/ scheme above.
export function videoRootDir(): string {
  const custom = getSetting('video.dir')?.trim()
  return custom && custom.length ? custom : join(app.getPath('userData'), 'video')
}

// Remuxed/transcoded playback copies and subtitle tracks extracted out of
// containers. Always under userData: it's derived, rebuildable data, and
// dropping a cache on the user's media drive would surprise them.
export function videoCacheDir(): string {
  const dir = join(app.getPath('userData'), 'videocache')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

// Ad-hoc "open any file": a file at /mnt/usb/movie.mkv has no virtual prefix
// and therefore no navimg URL. Rather than widen absoluteMediaPath into a
// general absolute-path server — which would destroy the `..` guarantee that
// makes the whole prefix table safe — we mint an opaque token here and the
// "open/" prefix resolves it. Process-lifetime only: a file opened this way is
// readable for the session it was opened in, nothing more.
//
// The token KEEPS the original extension (`<hex>.cbz`), which is not cosmetic:
// archive.ts:splitArchivePath finds the container by scanning path segments for
// a ziplike extension, so a bare hex token would make an ad-hoc CBZ or EPUB
// unstreamable. mimeFor() reads the real path, so it is unaffected either way.
const OPENED_MAX = 32
const openedFiles = new Map<string, string>()

export function registerOpenedFile(abs: string): string {
  const hex = createHash('sha1').update(abs).digest('hex').slice(0, 16)
  // Deterministic per path, so re-opening the same file is idempotent and its
  // URL is stable. delete-then-set is an LRU touch (Map keeps insertion order).
  openedFiles.delete(hex)
  openedFiles.set(hex, abs)
  while (openedFiles.size > OPENED_MAX) {
    const oldest = openedFiles.keys().next().value
    if (oldest === undefined) break
    openedFiles.delete(oldest)
  }
  const ext = extname(abs).toLowerCase().replace(/[^a-z0-9.]/g, '')
  return `open/${hex}${ext}`
}

export function openedFilePath(token: string): string {
  // One opaque segment: hex plus an optional extension. Refusing separators is
  // what keeps this branch as escape-proof as the plain prefix lines below.
  if (!/^[0-9a-f]{1,64}(\.[a-z0-9]{1,8})?$/.test(token)) throw new Error('Bad file token')
  const abs = openedFiles.get(token.split('.')[0])
  if (!abs) throw new Error('That file is no longer open')
  return abs
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

// Strips characters that are illegal/awkward in filenames, so theme audio and
// picture folders/files can be saved with readable names (e.g. "Berserk OP1 -
// Tell Me Why.ogg", "Berserk (manga)/wallpapers/…").
export function sanitizeFileBase(s: string, fallback = 'theme'): string {
  const clean = s
    // illegal path chars + control chars -> space; hyphens/spaces are kept
    // eslint-disable-next-line no-control-regex
    .replace(/[/\\:*?"<>|\x00-\x1f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
  return clean || fallback
}

// Returns a custom-protocol URL (served by the navimg handler in index.ts) so
// the renderer can display the image (or play the audio) without relaxing web
// security. Each path segment is percent-encoded so readable filenames with
// spaces/punctuation resolve correctly (the handler decodeURIComponent's it back).
export function resolveUrl(relPath: string | null): string | null {
  if (!relPath) return null
  const abs = absoluteMediaPath(relPath)
  if (!existsSync(abs)) return null
  return mediaUrl(relPath)
}

// Absolute path on disk for a stored relative path (used by the protocol handler
// and resolveUrl). "audio/<file>" resolves against the configurable audio dir;
// everything else ("media/<file>") against userData.
export function absoluteMediaPath(relPath: string): string {
  const norm = relPath.split('\\').join('/')
  // The protocol handler serves whatever path this returns; with user-chosen
  // roots in play, never let a stored/requested path escape its root.
  if (norm.split('/').includes('..')) throw new Error(`Path escapes media root: ${relPath}`)
  if (norm.startsWith('audio/')) return join(audioDir(), norm.slice('audio/'.length))
  if (norm.startsWith('manga/')) return join(mangaRootDir(), norm.slice('manga/'.length))
  if (norm.startsWith('books/')) return join(booksRootDir(), norm.slice('books/'.length))
  if (norm.startsWith('music/')) return join(musicRootDir(), norm.slice('music/'.length))
  if (norm.startsWith('pictures/')) return join(picturesDir(), norm.slice('pictures/'.length))
  if (norm.startsWith('video/')) return join(videoRootDir(), norm.slice('video/'.length))
  if (norm.startsWith('wrestling/')) {
    return join(wrestlingRootDir(), norm.slice('wrestling/'.length))
  }
  // "jpaudio/" and "videocache/" would resolve identically through the default
  // branch (both live under userData) — the explicit lines document the prefix
  // contract.
  if (norm.startsWith('jpaudio/')) return join(jpAudioDir(), norm.slice('jpaudio/'.length))
  if (norm.startsWith('videocache/')) {
    return join(videoCacheDir(), norm.slice('videocache/'.length))
  }
  // The one stateful branch: a session token, not a path. See registerOpenedFile.
  if (norm.startsWith('open/')) return openedFilePath(norm.slice('open/'.length))
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
    // Generous timeout: theme audio runs to several MB on slow connections.
    const res = await fetchWithRetry(url, { timeoutMs: 120_000 })
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

// Pre-downloads a batch of images and returns url -> stored relative path (or
// null for failures). Importers fetch every image up front with this so all
// their DB writes can then run synchronously inside ONE transaction (an import
// is atomic; a crash can't leave half a title). Downloading unconditionally is
// fine: downloadImage caches by URL hash, so on re-import anything already on
// disk is a hit, not a re-download.
export async function downloadImages(
  urls: (string | null | undefined)[]
): Promise<Map<string, string | null>> {
  const unique = [...new Set(urls.filter((u): u is string => !!u))]
  const map = new Map<string, string | null>()
  let next = 0
  let done = 0
  // Small concurrency pool (same shape as music.parseFiles) — a character-heavy
  // import fetches hundreds of images and serial downloads dominated its time.
  const worker = async (): Promise<void> => {
    while (next < unique.length) {
      const url = unique[next++]
      map.set(url, await downloadImage(url))
      done += 1
      imageProgress(done, unique.length) // no-op unless an activity is running
    }
  }
  await Promise.all(Array.from({ length: Math.min(5, unique.length) }, worker))
  return map
}

// Downloads a remote image (e.g. an AniList cover) into userData/media and
// returns the stored relative path, or null on failure. The filename is derived
// deterministically from the URL, so re-importing a title whose art is already
// on disk is a cache hit (no network, no rewrite) instead of a fresh download.
export async function downloadImage(url: string | null | undefined): Promise<string | null> {
  if (!url) return null
  try {
    const urlExt = extname(new URL(url).pathname)
    const ext = /^\.(png|jpe?g|webp|gif|bmp)$/i.test(urlExt) ? urlExt : '.jpg'
    const fileName = `dl-${createHash('sha1').update(url).digest('hex').slice(0, 16)}${ext}`
    const dest = join(mediaDir(), fileName)
    const relPath = join('media', fileName)
    if (existsSync(dest)) return relPath
    const res = await fetchWithRetry(url)
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(dest, buf)
    return relPath
  } catch {
    return null
  }
}

// If `fileName` already exists in `dir`, suffix " (2)", " (3)"… before the ext.
// Two different source URLs can share a basename (…/a/art.jpg vs …/b/art.jpg),
// so an existing file must never be silently reused for a new image.
function unclashName(dir: string, fileName: string): string {
  if (!existsSync(join(dir, fileName))) return fileName
  const ext = extname(fileName)
  const stem = fileName.slice(0, fileName.length - ext.length)
  for (let n = 2; ; n += 1) {
    const candidate = `${stem} (${n})${ext}`
    if (!existsSync(join(dir, candidate))) return candidate
  }
}

// Downloads a remote image into `<picturesDir()>/<subdir>` (wallpapers/fan art)
// and returns the stored relative path ("pictures/<subdir>/<file>"), or null on
// failure. Unlike downloadImage this is NOT content-addressed — the readable
// name matters here (the folder is meant to be browsable) and duplicate-URL
// checks happen against media_image rows in pictures.ts, before any network.
export async function downloadImageTo(
  url: string,
  subdir: string,
  baseName?: string | null
): Promise<string | null> {
  try {
    // Generous timeout: full-res wallpapers run to 10+ MB on slow connections.
    const res = await fetchWithRetry(url, { timeoutMs: 120_000 })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const urlExt = extname(new URL(url).pathname)
    const ext = /^\.(png|jpe?g|webp|gif|bmp)$/i.test(urlExt) ? urlExt : '.jpg'
    const dir = join(picturesDir(), subdir)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    let base: string
    if (baseName && baseName.trim()) {
      base = sanitizeFileBase(baseName, 'image')
    } else {
      counter += 1
      base = `img-${process.pid}-${counter}`
    }
    const fileName = unclashName(dir, `${base}${ext}`)
    writeFileSync(join(dir, fileName), buf)
    return `pictures/${subdir}/${fileName}`
  } catch {
    return null
  }
}

// Copies a local image the user picked into `<picturesDir()>/<subdir>`, keeping
// a sanitized version of its original name, and returns the stored relative
// path ("pictures/<subdir>/<file>"), or null on failure.
export function copyImageInto(srcPath: string, subdir: string): string | null {
  try {
    const ext = extname(srcPath) || '.jpg'
    const base = sanitizeFileBase(basename(srcPath, ext), 'image')
    const dir = join(picturesDir(), subdir)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    const fileName = unclashName(dir, `${base}${ext}`)
    copyFileSync(srcPath, join(dir, fileName))
    return `pictures/${subdir}/${fileName}`
  } catch {
    return null
  }
}

// Native multi-select image picker. Returns absolute source paths ([] on
// cancel); the caller decides where the files go (see pictures.addFromFiles).
export async function pickImageFiles(): Promise<string[]> {
  const res = await dialog.showOpenDialog({
    title: 'Choose images',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'] }]
  })
  if (res.canceled) return []
  return res.filePaths
}

// Writes raw bytes (a pasted screenshot, or a frame grabbed off the video
// player) into userData/media and returns the stored relative path. `ext` is
// validated against the image whitelist. `subdir` keeps a caller's output in
// its own folder — mined video frames go to media/mining so a library export
// can skip them wholesale.
export function saveMediaBytes(bytes: Uint8Array, ext: string, subdir?: string): string {
  const clean = (ext || 'png').replace(/^\./, '').toLowerCase()
  const allowed = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp']
  const safeExt = allowed.includes(clean) ? clean : 'png'
  const safeDir = (subdir ?? '').replace(/[^a-z0-9_-]+/gi, '')
  counter += 1
  const fileName = `paste-${process.pid}-${counter}.${safeExt}`
  const dir = safeDir ? join(mediaDir(), safeDir) : mediaDir()
  if (safeDir && !existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, fileName), Buffer.from(bytes))
  return safeDir ? join('media', safeDir, fileName) : join('media', fileName)
}

// Native picker for a text file. Defaults match the original chat-log use
// (txt/md, ~2MB); callers reading larger structured files (e.g. a Chaldea
// userdata.json backup) pass their own extensions + maxBytes. Returns
// { name, content } or null on cancel.
export async function pickTextFile(options?: {
  title?: string
  filterName?: string
  extensions?: string[]
  maxBytes?: number
}): Promise<{ name: string; content: string } | null> {
  const res = await dialog.showOpenDialog({
    title: options?.title ?? 'Choose a chat log',
    properties: ['openFile'],
    filters: [
      {
        name: options?.filterName ?? 'Text',
        extensions: options?.extensions ?? ['txt', 'md', 'markdown', 'text']
      }
    ]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  const src = res.filePaths[0]
  const content = readFileSync(src, 'utf8').slice(0, options?.maxBytes ?? 2_000_000)
  return { name: basename(src), content }
}
