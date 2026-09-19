import { musicToolOptions, musicYtDlpArgs, musicFailure, musicAccessKey } from './musicTools'
import { execFile } from 'child_process'
import { BrowserWindow, dialog } from 'electron'
import { copyFileSync, constants, mkdirSync, existsSync, statSync } from 'fs'
import { basename, extname, join } from 'path'
import { randomUUID } from 'crypto'
import { get as getSetting } from './repos/settingsRepo'
import { listTracks } from './repos/musicRepo'
import { getSqlite } from './db/connection'
import { musicRootDir } from './files'
import { indexMusicFiles } from './music'
import { currentActivitySignal } from './activityContext'
import { claimMusicMaintenance, releaseMusicMaintenance } from './musicMaintenance'
import type { MusicTrack, SpotifyAudioCandidate } from '@shared/types'

export function youtubeSourceUrl(value: string): string {
  let url: URL
  try { url = new URL(value) } catch { throw new Error('Paste a full YouTube video URL') }
  const id = url.hostname === 'youtu.be' ? url.pathname.slice(1)
    : ['youtube.com', 'www.youtube.com', 'music.youtube.com'].includes(url.hostname)
      ? url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)$/)?.[1]
      : null
  if (url.protocol !== 'https:' || !id || !/^[\w-]{11}$/.test(id)) throw new Error('Choose one YouTube video, not a channel or playlist')
  return `https://www.youtube.com/watch?v=${id}`
}

export function parseAudioCandidates(output: string): SpotifyAudioCandidate[] {
  return output.split('\n').flatMap((line) => {
    try {
      const row = JSON.parse(line)
      const url = youtubeSourceUrl(row.webpage_url ?? row.url ?? `https://www.youtube.com/watch?v=${row.id}`)
      if (typeof row.title !== 'string') return []
      return [{ url, title: row.title, channel: String(row.channel ?? row.uploader ?? ''),
        duration: typeof row.duration === 'number' ? row.duration : null }]
    } catch { return [] }
  }).slice(0, 8)
}

function ytdlp(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => execFile(
    musicToolOptions().ytdlp,
    [...musicYtDlpArgs(), '--no-warnings', ...args],
    { timeout: 45_000, maxBuffer: 4 * 1024 * 1024, signal: currentActivitySignal() },
    (error, stdout, stderr) => error ? reject(new Error(musicFailure('Extraction', 'standalone yt-dlp', stderr || error.message))) : resolve(stdout)
  ))
}

export async function searchAudio(query: string): Promise<SpotifyAudioCandidate[]> {
  const trimmed = query.trim().slice(0, 300)
  if (!trimmed) return []
  return parseAudioCandidates(await ytdlp(['--flat-playlist', '--dump-json', '--', `ytsearch8:${trimmed}`]))
}

export async function previewAudio(url: string): Promise<string> {
  const output = await ytdlp(['--no-playlist', '--skip-download', '--format', 'bestaudio', '--get-url', '--', youtubeSourceUrl(url)])
  const stream = output.trim().split('\n')[0]
  if (!stream?.startsWith('https://')) throw new Error('No playable preview was returned')
  return stream
}

export async function pickLocalAudio(): Promise<MusicTrack | null> {
  const parent = BrowserWindow.getFocusedWindow()
  const options = { title: 'Choose audio to copy into the music library',
    properties: ['openFile'] as ('openFile')[],
    filters: [{ name: 'Audio', extensions: ['mp3', 'flac', 'm4a', 'aac', 'ogg', 'opus', 'wav'] }] }
  const result = await (parent ? dialog.showOpenDialog(parent, options) : dialog.showOpenDialog(options))
  if (result.canceled || !result.filePaths[0]) return null
  const source = result.filePaths[0]
  if (!/\.(mp3|flac|m4a|aac|ogg|opus|wav)$/i.test(source)) throw new Error('Choose an audio file')
  if (!getSetting('music.dir')?.trim()) throw new Error('Set the music folder first')
  const owner = `Import local audio ${randomUUID()}`
  claimMusicMaintenance(owner)
  try {
    const folder = join('Manual imports', basename(source, extname(source)).replace(/[<>:"/\\|?*]/g, '_').replace(/[. ]+$/g, '').slice(0, 100) || 'Audio')
    const rel = join(folder, `${randomUUID()}${extname(source)}`).replace(/\\/g, '/')
    mkdirSync(join(musicRootDir(), folder), { recursive: true })
    copyFileSync(source, join(musicRootDir(), rel), constants.COPYFILE_EXCL)
    await indexMusicFiles([rel], owner)
    const row = getSqlite().prepare('SELECT id FROM music_track WHERE file_path=?').get(rel) as { id: number }
    return listTracks().find((track) => track.id === row.id) ?? null
  } finally { releaseMusicMaintenance(owner) }
}
export function denoExecutable(): string { return musicToolOptions().deno }

export async function inspectAudio(url: string): Promise<import('@shared/types').MusicSourceEvidence> {
  const canonical = youtubeSourceUrl(url)
  const row = JSON.parse(await ytdlp(['--no-playlist', '--skip-download', '--dump-single-json', '--', canonical]))
  return parseSourceEvidence(canonical, row)
}

export function canonicalAudioSource(value: string): string {
  const url = new URL(value)
  if (url.protocol !== 'https:') throw new Error('Audio sources must use HTTPS')
  if (['youtu.be', 'youtube.com', 'www.youtube.com', 'music.youtube.com'].includes(url.hostname)) return youtubeSourceUrl(value)
  if (url.hostname === 'soundcloud.com' || url.hostname === 'www.soundcloud.com' || url.hostname.endsWith('.bandcamp.com')) {
    url.hash = ''; url.search = ''
    return url.toString().replace(/\/$/, '')
  }
  throw new Error('This provider did not return a supported permanent source URL; choose a manual source')
}

export function parseSourceEvidence(canonical: string, row: Record<string, any>): import('@shared/types').MusicSourceEvidence {
  const actual = canonical.includes('youtube.com/watch') ? youtubeSourceUrl(`https://www.youtube.com/watch?v=${row.id}`) : canonicalAudioSource(String(row.webpage_url ?? ''))
  if (actual !== canonical) throw new Error('The selected source changed')
  const formats = (Array.isArray(row.formats) ? row.formats : [row]).filter((f: Record<string, unknown>) =>
    (f.vcodec === 'none' || (f.vcodec == null && ['mp3', 'm4a', 'opus'].includes(String(f.ext)))) && (f.acodec === 'opus' || f.acodec === 'mp3' || String(f.acodec).startsWith('mp4a')))
  const best = formats.sort((a: Record<string, unknown>, b: Record<string, unknown>) => Number(b.abr ?? 0) - Number(a.abr ?? 0))[0]
  if (!best) throw new Error('Extraction: no compatible native audio is available')
  return { albumTitle: typeof row.album === 'string' ? row.album : null, url: canonical, title: String(row.title || row.track || ''),
    artist: typeof row.artist === 'string' ? row.artist : null,
    channel: String(row.channel || row.uploader || ''),
    duration: typeof row.duration === 'number' ? row.duration : null,
    format: best.acodec === 'opus' ? 'opus' : best.acodec === 'mp3' ? 'mp3' : 'm4a', observedAt: Date.now(), accessKey: musicAccessKey() }
}
