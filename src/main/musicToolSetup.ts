// Tool readiness and setup behind Settings: yt-dlp/ffmpeg/JavaScript runtime
// detection, the YouTube access check, the Premium cookie picker and the Deno install.
import { execFile } from 'child_process'
import { createWriteStream, existsSync, mkdirSync, renameSync, rmSync, statSync } from 'fs'
import { pipeline } from 'stream/promises'
import yauzl from 'yauzl'
import { homedir } from 'os'
import { isAbsolute, join } from 'path'
import { BrowserWindow, dialog, type OpenDialogOptions } from 'electron'
import { get as getSetting } from './repos/settingsRepo'
import { fetchWithRetry } from './http'
import { streamResponseToFile } from './streamDownload'
import { musicToolOptions, musicYtDlpArgs } from './musicTools'
import { denoExecutable } from './musicSpotifyRecovery'
import { ytdlpHasMutagen } from './musicAcquisition'
import { claimMusicMaintenance, releaseMusicMaintenance } from './musicMaintenance'
import * as tasks from './tasks'
import type { MusicToolsCheck, SpotifyYouTubeAccess, SpotifyYouTubeAccessTestResult } from '@shared/types'

function premiumCookieFile(): string | null {
  const value = getSetting('spotdl.cookieFile')?.trim()
  if (!value) return null
  if (!isAbsolute(value) || !existsSync(value) || !statSync(value).isFile()) {
    throw new Error('The YouTube Music Premium cookie file is missing or is not an absolute file path')
  }
  return value
}

let mutagenProbe: { ytdlp: string; value: Promise<boolean> } | null = null
/** Opus cover embedding needs yt-dlp's optional mutagen library; m4a/mp3 fall back to ffmpeg. */
export function ytdlpEmbedsOpusCovers(): Promise<boolean> {
  const ytdlp = musicToolOptions().ytdlp
  if (mutagenProbe?.ytdlp !== ytdlp) {
    mutagenProbe = {
      ytdlp,
      value: new Promise((resolve) => execFile(ytdlp, ['-v', '--ignore-config', '--list-impersonate-targets'],
        { timeout: 30_000, maxBuffer: 1024 * 1024 }, (_error, stdout, stderr) => resolve(ytdlpHasMutagen(`${stdout}\n${stderr}`))))
    }
  }
  return mutagenProbe.value
}

function version(bin: string, args: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    // A cold Python start (pip/pipx yt-dlp) can take several seconds on Windows.
    execFile(bin, args, { timeout: 30_000 }, (error, stdout) => {
      resolve(error ? null : stdout.trim().split('\n')[0] ?? null)
    })
  })
}

/** The JavaScript runtime yt-dlp will use: Deno first, then Node.js. */
async function javascriptRuntime(): Promise<string | null> {
  const deno = musicToolOptions().deno
  if (isAbsolute(deno)) {
    try { if (statSync(deno).isFile()) return 'Deno' } catch { /* try Node.js */ }
  } else if (await version(deno, ['--version'])) return 'Deno'
  const node = await version('node', ['--version'])
  return node && Number(node.match(/^v(\d+)/)?.[1]) >= 22 ? 'Node.js' : null
}

export function classifyYoutubeAccessError(value: string): SpotifyYouTubeAccess['state'] {
  const text = value.toLowerCase()
  if (/cookie[s\s\-_]*(?:are|is).*valid|rotated/.test(text)) return 'invalidCookies'
  if (/login_required|sign in to confirm|captcha|bot verification|confirm you.?re not/.test(text)) return 'botCheck'
  if (/po token|po_token|proof of origin|gvs.*token|http error 403/.test(text)) return 'poToken'
  if (/private|members.only|age.restricted|unavailable|not available|geo/.test(text)) return 'unavailable'
  return 'error'
}

/** The probe video may itself be unavailable without the provider being
 * blocked. Authentication and client challenges are the failures that must
 * stop a batch before it starts. */
export function youtubeAccessBlocksDownload(result: SpotifyYouTubeAccessTestResult): boolean {
  return !result.ok && result.state !== 'unavailable'
}

let youtubeAccessCache: { signature: string; result: SpotifyYouTubeAccessTestResult } | null = null

function cookieSignature(): string {
  const value = getSetting('spotdl.cookieFile')?.trim() ?? ''
  const tools = `${getSetting('ytdlp.path') ?? 'yt-dlp'}:${denoExecutable() ?? ''}`
  if (!value) return `${tools}:none`
  try { return `${tools}:${value}:${statSync(value).mtimeMs}` } catch { return `${tools}:${value}:missing` }
}

export function testYoutubeAccess(force = false): Promise<SpotifyYouTubeAccessTestResult> {
  const signature = cookieSignature()
  if (!force && youtubeAccessCache?.signature === signature &&
      youtubeAccessCache.result.ok && Date.now() - (youtubeAccessCache.result.testedAt ?? 0) < 5 * 60_000) {
    return Promise.resolve(youtubeAccessCache.result)
  }
  const cookie = getSetting('spotdl.cookieFile')?.trim() || null
  const args = [
    ...musicYtDlpArgs(), '--no-warnings', '--no-playlist', '--skip-download', '--dump-single-json',
    '--', 'https://www.youtube.com/watch?v=BaW_jenozKc'
  ]
  return new Promise((resolve) => {
    execFile(getSetting('ytdlp.path')?.trim() || 'yt-dlp', args,
      { timeout: 35_000, maxBuffer: 8 * 1024 * 1024 }, (error, stdout, stderr) => {
        const diagnostic = `${stdout}\n${stderr}`
        if (error) {
          const state = classifyYoutubeAccessError(diagnostic)
          const result: SpotifyYouTubeAccessTestResult = {
            // The fixed probe can be removed or geo-blocked independently of
            // the user's selected tracks. Treat that as inconclusive rather
            // than reporting a broken downloader.
            ok: state === 'unavailable',
            state,
            authenticated: Boolean(cookie) && state === 'error',
            message: state === 'invalidCookies'
              ? 'YouTube cookies are expired or rotated. Export a fresh private-session cookies.txt.'
              : state === 'botCheck'
                ? 'YouTube requires bot verification for this connection. Keep the same VPN and renew cookies.'
                : state === 'poToken'
                  ? 'YouTube requires a PO token for this client. See the yt-dlp PO-token setup guidance.'
                  : state === 'unavailable'
                    ? 'The fixed probe video is unavailable; selected tracks will be tested during download.'
                  : 'yt-dlp could not access a usable YouTube audio stream.',
            testedAt: Date.now(), codec: null, bitrate: null
          }
          youtubeAccessCache = { signature, result }
          resolve(result)
          return
        }
        let payload: Record<string, unknown> = {}
        try { payload = JSON.parse(stdout) as Record<string, unknown> } catch { /* diagnostic only */ }
        const formats = Array.isArray(payload.formats) ? payload.formats as Record<string, unknown>[] : []
        const audio = formats
          .filter((format) => typeof format.acodec === 'string' && format.acodec !== 'none')
          .sort((a, b) => Number(b.abr ?? 0) - Number(a.abr ?? 0))[0]
        const authenticated = Boolean(cookie)
        const result: SpotifyYouTubeAccessTestResult = {
          ok: true,
          state: authenticated ? 'ready' : 'anonymous',
          authenticated,
          message: authenticated
            ? 'YouTube audio access is working with the configured cookies.'
            : 'YouTube audio access is working without authenticated cookies.',
          testedAt: Date.now(),
          codec: typeof audio?.acodec === 'string' ? audio.acodec : null,
          bitrate: typeof audio?.abr === 'number' ? audio.abr : null
        }
        youtubeAccessCache = { signature, result }
        resolve(result)
      })
  })
}

export async function pickCookieFile(): Promise<string | null> {
  const owner = BrowserWindow.getAllWindows().find((window) => !window.isDestroyed())
  const options: OpenDialogOptions = {
    title: 'Choose YouTube cookies.txt', properties: ['openFile'],
    filters: [{ name: 'Cookies text file', extensions: ['txt'] }, { name: 'All files', extensions: ['*'] }]
  }
  const result = await (owner ? dialog.showOpenDialog(owner, options) : dialog.showOpenDialog(options))
  return result.canceled || result.filePaths.length === 0 ? null : result.filePaths[0]
}

export async function detectMusicTools(): Promise<MusicToolsCheck> {
  const cookieConfigured = Boolean(getSetting('spotdl.cookieFile')?.trim())
  let cookieValid = !cookieConfigured
  if (cookieConfigured) {
    try {
      cookieValid = premiumCookieFile() != null
    } catch {
      cookieValid = false
    }
  }
  const [ytdlpVersion, ffmpeg, jsRuntime] = await Promise.all([
    version(musicToolOptions().ytdlp, ['--version']),
    version(musicToolOptions().ffmpeg, ['-version']),
    javascriptRuntime()
  ])
  const coverArt = ytdlpVersion != null && await ytdlpEmbedsOpusCovers()
  return {
    ok: ytdlpVersion != null && ffmpeg != null && cookieValid,
    ytdlpVersion,
    ffmpeg: ffmpeg != null,
    jsRuntime,
    coverArt,
    cookieConfigured,
    cookieValid,
    youtubeAccess: youtubeAccessCache?.signature === cookieSignature()
      ? youtubeAccessCache.result
      : {
          state: 'untested',
          authenticated: false,
          message: 'YouTube access has not been tested.',
          testedAt: null,
          codec: null,
          bitrate: null
        },
    error:
      ytdlpVersion == null
        ? `Could not run "${musicToolOptions().ytdlp}". Install yt-dlp or set its path in Settings.`
        : ffmpeg == null
          ? 'ffmpeg was not found. Install it or set its path in Settings.'
          : !cookieValid
            ? 'The configured YouTube cookies.txt file could not be read'
            : null
  }
}

function denoAsset(): string {
  const arch = process.arch === 'arm64' ? 'aarch64' : process.arch === 'x64' ? 'x86_64' : null
  const target = process.platform === 'win32' ? 'pc-windows-msvc' : process.platform === 'darwin' ? 'apple-darwin'
    : process.platform === 'linux' ? 'unknown-linux-gnu' : null
  if (!arch || !target || (process.platform === 'win32' && arch !== 'x86_64')) {
    throw new Error('Deno has no prebuilt download for this system; install it manually')
  }
  return `deno-${arch}-${target}.zip`
}

function extractSingleZipEntry(zipPath: string, entryName: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (openError, zip) => {
      if (openError || !zip) return reject(openError ?? new Error('Could not open the Deno archive'))
      let found = false
      zip.on('entry', (entry: yauzl.Entry) => {
        if (entry.fileName !== entryName) { zip.readEntry(); return }
        found = true
        zip.openReadStream(entry, (streamError, stream) => {
          if (streamError || !stream) { zip.close(); return reject(streamError ?? new Error('Could not read the Deno archive')) }
          pipeline(stream, createWriteStream(destination, { mode: 0o755 }))
            .then(() => { zip.close(); resolve() }, (error) => { zip.close(); reject(error) })
        })
      })
      zip.on('end', () => { if (!found) reject(new Error('The Deno archive did not contain the executable')) })
      zip.on('error', reject)
      zip.readEntry()
    })
  })
}

/** Deno is yt-dlp's recommended JavaScript runtime for current YouTube extraction. */
export async function installDeno(): Promise<MusicToolsCheck> {
  const owner = `music-deno-${Date.now()}`
  claimMusicMaintenance(owner)
  try {
    await tasks.runTask(
      {
        kind: 'musicMetadata',
        label: 'Installing Deno for yt-dlp',
        route: '/settings',
        controls: { pauseNote: 'Deno installation cannot be paused.' }
      },
      async () => {
        const executable = process.platform === 'win32' ? 'deno.exe' : 'deno'
        const dir = join(homedir(), '.deno', 'bin')
        mkdirSync(dir, { recursive: true })
        const zipPath = join(dir, 'navihub-deno-download.zip')
        const response = await fetchWithRetry(`https://github.com/denoland/deno/releases/latest/download/${denoAsset()}`, { timeoutMs: 120_000 })
        if (!response.ok) throw new Error(`Deno download failed (HTTP ${response.status})`)
        try {
          await streamResponseToFile(response, zipPath, { label: 'Deno download', maxInputBytes: 256 * 1024 * 1024, replace: true })
          const staged = join(dir, `${executable}.navihub-new`)
          await extractSingleZipEntry(zipPath, executable, staged)
          renameSync(staged, join(dir, executable))
        } finally {
          rmSync(zipPath, { force: true })
        }
      }
    )
  } finally {
    releaseMusicMaintenance(owner)
  }
  return detectMusicTools()
}
