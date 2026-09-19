import { redact } from './logCore'
import { createHash } from 'crypto'
import { existsSync, statSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { get as getSetting } from './repos/settingsRepo'

/** One policy, adapted to the CLI and spotDL's embedded Python downloader. */
export function musicToolOptions() {
  const executable = process.platform === 'win32' ? 'deno.exe' : 'deno'
  const roots = process.platform === 'linux'
    ? [join(homedir(), '.config', 'spotdl'), join(homedir(), '.spotdl')]
    : [join(homedir(), '.spotdl')]
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
    ...(options.ffmpeg === 'ffmpeg' ? [] : ['--ffmpeg-location', options.ffmpeg]),
    ...(options.cookies ? ['--cookies', options.cookies] : []),
    '--socket-timeout', '30', '--retries', '0', '--fragment-retries', '0',
    '--extractor-retries', '0', '--concurrent-fragments', '1'
  ]
}

// spotDL parses this argument with shlex, not a shell. Quote every token for
// Windows paths containing spaces and backslashes; never execute this string.
export function spotdlYtDlpOptions(): string {
  return musicYtDlpArgs(false).map((arg) => `'${arg.replace(/'/g, `'"'"'`)}'`).join(' ')
}

export function musicFailure(stage: string, tool: string, raw: string): string {
  const detail = redact(raw).replace(/https?:\/\/[^\s"']+/g, (url) => {
    try { const parsed = new URL(url); return `${parsed.origin}${parsed.pathname}` } catch { return '[URL]' }
  }).slice(-1200)
  const reason = /sign in|captcha|bot verification|login_required|cookies.*(?:expired|invalid|rotated)/i.test(detail)
    ? 'Authentication or bot verification is required; test fresh cookies in Settings'
    : /requested format|no suitable format|format.*not available/i.test(detail)
      ? 'The requested audio format is unavailable'
      : /private video|video.*private|unavailable|not available|geo.restrict/i.test(detail)
        ? 'The selected source is unavailable'
        : /timed out|timeout/i.test(detail) ? 'The request timed out' : 'Operation failed'
  return `${stage} (${tool}): ${reason}. ${detail}`
}

/** Access cache identity contains no cookie contents or reusable credentials. */
export function musicAccessKey(): string {
  const options = musicToolOptions()
  let modified = 0
  try { if (options.cookies) modified = statSync(options.cookies).mtimeMs } catch { /* missing cookies invalidate access */ }
  return createHash('sha256').update(JSON.stringify([options.ytdlp, options.deno, options.ffmpeg, options.cookies, modified])).digest('hex')
}
