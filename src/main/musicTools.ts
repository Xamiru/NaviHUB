import { redact } from './logCore'
import { createHash } from 'crypto'
import { execFile } from 'child_process'
import { existsSync, statSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { get as getSetting } from './repos/settingsRepo'
import type { YtDlpDetectResult } from '@shared/types'

/** One yt-dlp policy for inspection, previews, URL jobs and Spotify acquisitions. */
export function musicToolOptions() {
  const executable = process.platform === 'win32' ? 'deno.exe' : 'deno'
  // Deno's own installer location first, then the older spotDL-managed copies.
  const roots = [join(homedir(), '.deno', 'bin'), ...(process.platform === 'linux'
    ? [join(homedir(), '.config', 'spotdl'), join(homedir(), '.spotdl')]
    : [join(homedir(), '.spotdl')])]
  return {
    ytdlp: getSetting('ytdlp.path')?.trim() || 'yt-dlp',
    cookies: getSetting('spotdl.cookieFile')?.trim() || null,
    deno: roots.map((root) => join(root, executable)).find(existsSync) ?? executable,
    ffmpeg: getSetting('music.ffmpegPath')?.trim() || 'ffmpeg',
    workers: Math.min(4, Math.max(1, Math.floor(Number(getSetting('music.downloadWorkers')) || 4)))
  }
}

export function musicYtDlpArgs(standalone = true): string[] {
  const options = musicToolOptions()
  return [
    ...(standalone ? ['--ignore-config'] : []),
    '--js-runtimes', ['deno', 'deno.exe'].includes(options.deno) ? 'deno' : `deno:${options.deno}`,
    // yt-dlp also accepts Node.js 22+; it is used only when Deno is unavailable.
    '--js-runtimes', 'node',
    ...(options.ffmpeg === 'ffmpeg' ? [] : ['--ffmpeg-location', options.ffmpeg]),
    ...(options.cookies ? ['--cookies', options.cookies] : []),
    '--socket-timeout', '30', '--retries', '0', '--fragment-retries', '0',
    '--extractor-retries', '0', '--concurrent-fragments', '1'
  ]
}

/** YouTube's answers to a session it is throttling (yt-dlp: "rate-limited by YouTube for up to an hour"). */
export const YOUTUBE_LIMIT = /rate-limited|try again later|content isn't available|HTTP (?:Error )?429|too many requests/i
/** A throttled session can also get a bare "Video unavailable" for videos its catalogue just listed. */
export const BARE_UNAVAILABLE = /\bvideo unavailable\.?\s*$/i

const FAILURE_REASONS: [RegExp, string][] = [
  [/confirm your age|age.restricted|inappropriate for some users/i, 'The video is age-restricted; YouTube needs signed-in cookies in Settings'],
  [YOUTUBE_LIMIT, 'YouTube is limiting requests from this network; try again later'],
  [/sign in|captcha|bot verification|login_required|cookies.*(?:expired|invalid|rotated)/i, 'Authentication or bot verification is required; test fresh cookies in Settings'],
  [/members[- ]only|join this channel/i, 'The video is for channel members only; choose another source'],
  [/requested format|no suitable format|format.*not available/i, 'The requested audio format is unavailable'],
  [/no compatible native audio/i, 'The source has no compatible native audio; choose another source'],
  [/HTTP Error 403|forbidden/i, 'YouTube refused the download; update yt-dlp or retry the song'],
  [/been removed|account.*terminated|no longer available|copyright (?:claim|grounds)/i, 'The video was removed; choose another source'],
  [/private video|video.*private|unavailable|not available|geo.restrict/i, 'The selected source is unavailable'],
  [/timed out|timeout/i, 'The request timed out']
]

export function musicFailure(stage: string, tool: string, raw: string): string {
  const detail = redact(raw).replace(new RegExp(`^${stage}:\\s*`), '').replace(/https?:\/\/[^\s"']+/g, (url) => {
    try { const parsed = new URL(url); return `${parsed.origin}${parsed.pathname}` } catch { return '[URL]' }
  }).slice(-1200)
  const reason = FAILURE_REASONS.find(([pattern]) => pattern.test(detail))?.[1] ?? 'Operation failed'
  return `${stage} (${tool}): ${reason}. ${detail}`
}

/** Access cache identity contains no cookie contents or reusable credentials. */
export function musicAccessKey(): string {
  const options = musicToolOptions()
  let modified = 0
  try { if (options.cookies) modified = statSync(options.cookies).mtimeMs } catch { /* missing cookies invalidate access */ }
  return createHash('sha256').update(JSON.stringify([options.ytdlp, options.deno, options.ffmpeg, options.cookies, modified])).digest('hex')
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
  const bin = getSetting('ytdlp.path')?.trim() || 'yt-dlp'
  const [ver, ff] = await Promise.all([version(bin, ['--version']), version(musicToolOptions().ffmpeg, ['-version'])])
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
