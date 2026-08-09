import { spawn, execFile, type ChildProcessWithoutNullStreams } from 'child_process'
import { join, relative, isAbsolute } from 'path'
import { mkdirSync } from 'fs'
import { createInterface } from 'readline'
import { get as getSetting } from './repos/settingsRepo'
import { musicRootDir } from './files'
import { startScan } from './music'
import type { MusicDownloadEvent, MusicDownloadInput, YtDlpDetectResult } from '@shared/types'

// Downloads music from YouTube/YT Music via a user-installed yt-dlp binary
// (settings key ytdlp.path, default "yt-dlp" on PATH; ffmpeg must also be on
// PATH for audio extraction). One download at a time; the renderer polls
// getStatus() for progress, mirroring the scanner's polling model.

// ---------------------------------------------------------------------------
// Pure helpers (exported for tests — no electron/child_process side effects).
// ---------------------------------------------------------------------------

// A folder-name-safe version of a user-typed artist/album. Unicode is kept
// (Japanese names are fine on disk); path separators and Windows-illegal
// characters are stripped so the value can never change the directory depth.
export function sanitizePathSegment(s: string): string {
  const clean = s
    .normalize('NFC')
    // eslint-disable-next-line no-control-regex
    .replace(/[/\\:*?"<>|\x00-\x1f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[.\s]+|[.\s]+$/g, '')
    .slice(0, 120)
    .trim()
  if (!clean || clean === '.' || clean === '..') {
    throw new Error(`"${s}" is not usable as a folder name`)
  }
  return clean
}

// Absolute destination folder <root>/<Artist>/<Album>, guaranteed inside root.
export function resolveAlbumDir(musicRoot: string, artist: string, album: string): string {
  const dir = join(musicRoot, sanitizePathSegment(artist), sanitizePathSegment(album))
  const rel = relative(musicRoot, dir)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error('Destination escapes the music folder')
  }
  return dir
}

// Argument vector for one download. bestaudio from YouTube is usually already
// opus, so the default format is a lossless remux; m4a/mp3 transcode. The
// --parse-metadata lines force the embedded artist/album tags to match the
// chosen destination folder (the values are pre-sanitized, so the FROM:TO
// colon split is unambiguous). Playlist URLs number their tracks; single
// videos get a bare title.
export function buildYtDlpArgs(opts: {
  url: string
  albumDir: string
  artist: string
  album: string
  format: 'opus' | 'm4a' | 'mp3'
}): string[] {
  return [
    '-f',
    'bestaudio/best',
    '-x',
    '--audio-format',
    opts.format,
    '--audio-quality',
    '0',
    '--embed-metadata',
    '--embed-thumbnail',
    '--parse-metadata',
    `${opts.artist}:(?P<meta_artist>.+)`,
    '--parse-metadata',
    `${opts.artist}:(?P<meta_album_artist>.+)`,
    '--parse-metadata',
    `${opts.album}:(?P<meta_album>.+)`,
    '--newline',
    '-o',
    `${opts.albumDir}/%(playlist_index&{} - |)s%(title)s.%(ext)s`,
    // '--' stops option parsing: a pasted "URL" starting with '-' (e.g.
    // --exec=…) must never be treated as a yt-dlp option.
    '--',
    opts.url
  ]
}

export type YtDlpLineEvent =
  | { kind: 'percent'; percent: number }
  | { kind: 'item'; index: number; count: number }
  | { kind: 'title'; title: string }
  | { kind: 'processing' }
  | { kind: 'error'; message: string }

// Progress signal from one --newline stdout/stderr line, or null for noise.
export function parseYtDlpLine(line: string): YtDlpLineEvent | null {
  const err = line.match(/^ERROR:\s*(.+)/)
  if (err) return { kind: 'error', message: err[1].trim() }
  const item = line.match(/^\[download\] Downloading item (\d+) of (\d+)/)
  if (item) return { kind: 'item', index: parseInt(item[1], 10), count: parseInt(item[2], 10) }
  const pct = line.match(/^\[download\]\s+(\d+(?:\.\d+)?)% of/)
  if (pct) return { kind: 'percent', percent: parseFloat(pct[1]) }
  const dest = line.match(/^\[download\] Destination:\s*(.+)/)
  if (dest) {
    // Split on both separators — Windows yt-dlp prints backslash paths.
    const base = dest[1].trim().split(/[\\/]/).pop() ?? dest[1].trim()
    return { kind: 'title', title: base.replace(/\.[a-z0-9]+$/i, '') }
  }
  if (line.startsWith('[ExtractAudio]') || line.startsWith('[Merger]')) return { kind: 'processing' }
  return null
}

// ---------------------------------------------------------------------------
// Runner — module state, one download at a time (verified manually, not unit
// tested; everything it feeds on is pure and tested above).
// ---------------------------------------------------------------------------

let counter = 0
let active: { id: string; proc: ChildProcessWithoutNullStreams; cancelled: boolean } | null = null
let status: MusicDownloadEvent | null = null

function ytDlpBin(): string {
  return getSetting('ytdlp.path')?.trim() || 'yt-dlp'
}

export function getStatus(): MusicDownloadEvent | null {
  return status ? { ...status } : null
}

export function startDownload(input: MusicDownloadInput): { id: string } {
  if (active) throw new Error('A download is already running')
  if (!input.url?.trim()) throw new Error('Paste a YouTube / YouTube Music URL')
  if (!getSetting('music.dir')?.trim()) {
    throw new Error('Set your music folder first (Music page or Settings)')
  }
  // Sanitize once and use the SAME values for the folder and the embedded
  // tags — also guarantees no ':' reaches the --parse-metadata FROM:TO split.
  const artist = sanitizePathSegment(input.artist) // throws on bad names
  const album = sanitizePathSegment(input.album)
  const root = musicRootDir()
  const albumDir = resolveAlbumDir(root, artist, album)
  mkdirSync(albumDir, { recursive: true })

  counter += 1
  const id = `dl-${process.pid}-${counter}`
  status = {
    id,
    status: 'starting',
    percent: null,
    itemIndex: null,
    itemCount: null,
    title: null,
    message: null
  }

  const proc = spawn(
    ytDlpBin(),
    buildYtDlpArgs({ url: input.url.trim(), albumDir, artist, album, format: input.format })
  )
  active = { id, proc, cancelled: false }
  let lastError: string | null = null

  const onLine = (line: string): void => {
    const ev = parseYtDlpLine(line)
    if (!ev || !status || status.id !== id) return
    if (ev.kind === 'percent') {
      status.status = 'downloading'
      status.percent = ev.percent
    } else if (ev.kind === 'item') {
      status.itemIndex = ev.index
      status.itemCount = ev.count
    } else if (ev.kind === 'title') {
      status.status = 'downloading'
      status.title = ev.title
      status.percent = 0
    } else if (ev.kind === 'processing') {
      status.status = 'processing'
    } else if (ev.kind === 'error') {
      lastError = ev.message
    }
  }
  createInterface({ input: proc.stdout }).on('line', onLine)
  createInterface({ input: proc.stderr }).on('line', onLine)

  proc.on('error', (e) => {
    // spawn failure (binary missing) — 'close' may never fire with a code
    if (status?.id === id) {
      status.status = 'error'
      status.message = `Could not run "${ytDlpBin()}" — install yt-dlp or set its path in Settings (${e.message})`
    }
    // Guarded like the status writes above: a stale event from a dead child
    // must not clear a NEWER download's slot, which would make cancelDownload
    // a no-op and let a second yt-dlp start. video/session.ts:106-107 does the
    // same on both handlers.
    if (active?.id === id) active = null
  })
  proc.on('close', (code) => {
    const wasCancelled = active?.id === id ? active.cancelled : false
    if (active?.id === id) active = null
    if (!status || status.id !== id || status.status === 'error') return
    if (wasCancelled) {
      status.status = 'cancelled'
      status.message = 'Download cancelled'
      return
    }
    if (code === 0) {
      status.status = 'processing'
      status.message = 'Updating library…'
      // Pick the new files up; mtime fast path makes this quick. If a manual
      // scan is already running it will see the files anyway.
      Promise.resolve()
        .then(() => startScan())
        .catch(() => undefined)
        .then(() => {
          if (status?.id === id) {
            status.status = 'done'
            status.percent = 100
            status.message = null
          }
        })
    } else {
      status.status = 'error'
      status.message =
        lastError ??
        `yt-dlp exited with code ${code} — it may be outdated (update it and try again)`
    }
  })
  return { id }
}

export function cancelDownload(id: string): void {
  if (!active || active.id !== id) return
  active.cancelled = true
  active.proc.kill('SIGTERM')
  const proc = active.proc
  setTimeout(() => {
    if (proc.exitCode === null) proc.kill('SIGKILL') // still alive after SIGTERM
  }, 5000).unref()
}

// Called from index.ts on before-quit so a half-finished yt-dlp doesn't outlive
// the app (its .part files survive and resume on the next try).
export function killActive(): void {
  if (active) {
    active.cancelled = true
    active.proc.kill('SIGKILL')
    active = null
  }
}

function version(bin: string, args: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    execFile(bin, args, { timeout: 5000 }, (err, stdout) => {
      resolve(err ? null : stdout.trim().split('\n')[0] ?? null)
    })
  })
}

// yt-dlp versions are dates ("2025.06.09"); extractors rot fast, so anything
// older than ~90 days gets a warning in Settings.
export async function detectBinary(): Promise<YtDlpDetectResult> {
  const bin = ytDlpBin()
  const [ver, ff] = await Promise.all([version(bin, ['--version']), version('ffmpeg', ['-version'])])
  if (!ver) {
    return {
      ok: false,
      version: null,
      versionOld: false,
      ffmpeg: ff != null,
      error: `Could not run "${bin}" — install yt-dlp (e.g. pipx install yt-dlp) or set its path`
    }
  }
  let versionOld = false
  const m = ver.match(/^(\d{4})\.(\d{2})\.(\d{2})/)
  if (m) {
    const released = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`).getTime()
    versionOld = Date.now() - released > 90 * 24 * 60 * 60 * 1000
  }
  return {
    ok: ff != null,
    version: ver,
    versionOld,
    ffmpeg: ff != null,
    error: ff == null ? 'ffmpeg not found on PATH — needed to extract audio' : null
  }
}
