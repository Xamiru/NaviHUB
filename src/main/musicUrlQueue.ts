import { existsSync, mkdirSync, linkSync, unlinkSync } from 'fs'
import { join, relative, isAbsolute, dirname } from 'path'
import { getSqlite } from './db/connection'
import { musicRootDir } from './files'
import { indexMusicFiles } from './music'
import { musicToolOptions, musicYtDlpArgs, musicFailure } from './musicTools'
import { youtubeSourceUrl } from './musicSpotifyRecovery'
import * as repo from './repos/musicUrlRepo'
import type { MusicDownloadInput, MusicDownloadEvent } from '@shared/types'

export function validateUrlInput(input: MusicDownloadInput): MusicDownloadInput {
  const url = new URL(input.url)
  if (url.protocol !== 'https:' || !['youtu.be', 'youtube.com', 'www.youtube.com', 'music.youtube.com'].includes(url.hostname)) throw new Error('Paste an HTTPS YouTube video or playlist URL')
  const safe = (value: string) => {
    const result = value.normalize('NFC').replace(/[/\\:*?"<>|\x00-\x1f]+/g, ' ').replace(/\s+/g, ' ').replace(/^[. ]+|[. ]+$/g, '').slice(0, 100)
    if (!result || /^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(result)) throw new Error('Choose a usable artist and album name')
    return result
  }
  return { url: url.toString(), artist: safe(input.artist), album: safe(input.album), format: input.format }
}
type Runner = (args: string[], onLine: (line: string) => void) => Promise<number>
export async function processUrlJob(id: number, owner: string, run: Runner, running: () => boolean, progress: (patch: Partial<MusicDownloadEvent>) => void): Promise<{ total: number; resolved: number; error: string | null }> {
  const job = repo.urlJob(id)
  const input = validateUrlInput(job.input)
  if (!job.complete) {
    let payload: Record<string, unknown> | null = null
    const code = await run([...musicYtDlpArgs(), '--flat-playlist', '--skip-download', '--dump-single-json', '--', input.url], (line) => {
      try { const parsed = JSON.parse(line); if (parsed && typeof parsed === 'object') payload = parsed } catch { /* ordinary diagnostic */ }
    })
    if (!running()) return { total: 0, resolved: 0, error: null }
    const data = payload as Record<string, unknown> | null
    const entries = data ? (Array.isArray(data.entries) ? data.entries : [data]) : []
    const rows = entries.flatMap((entry) => {
      if (!entry || typeof entry !== 'object') return []
      try { return [{ url: youtubeSourceUrl(entry.webpage_url || entry.url || `https://www.youtube.com/watch?v=${entry.id}`), title: String(entry.title || entry.id) }] } catch { return [] }
    })
    const expected = data?.playlist_count ?? data?.n_entries
    const complete = code === 0 && rows.length > 0 && rows.length === entries.length && (expected == null || Number(expected) === entries.length)
    repo.saveEnumeration(id, rows, complete)
    if (!complete) throw new Error('Lookup: playlist enumeration is incomplete; discovered items were saved for retry')
  }
  const root = musicRootDir()
  const items = repo.urlItems(id)
  let resolved = 0
  let failed = 0
  const sourceFailures = new Map<string, string>()
  const processItem = async (item: typeof items[number]) => {
    if (!running()) return
    const existing = item.localTrackId == null ? null : getSqlite().prepare('SELECT file_path FROM music_track WHERE id=?').get(item.localTrackId) as { file_path: string } | undefined
    if (existing && existsSync(join(root, existing.file_path))) { resolved++; return }
    const reused = getSqlite().prepare(`SELECT t.id,t.file_path FROM music_audio_source i JOIN music_track t ON t.id=i.local_track_id WHERE i.source_url=? ORDER BY t.id`).all(item.url) as { id: number; file_path: string }[]
    const available = reused.find((row) => (input.format === 'source' || row.file_path.toLowerCase().endsWith(`.${input.format}`)) && existsSync(join(root, row.file_path)))
    if (available) { repo.updateUrlItem(item.id, 'ready', null, available.file_path, available.id); resolved++; return }
    const previousFailure = sourceFailures.get(item.url)
    if (previousFailure) { repo.updateUrlItem(item.id, 'failed', previousFailure); failed++; return }
    let phase: 'extraction' | 'transfer' | 'processing' | 'indexing' = 'extraction'
    try {
      progress({ title: item.title, itemIndex: resolved, itemCount: items.length, status: 'downloading', phase: 'extraction' })
      const stage = join(root, '.navihub-url-staging', String(item.id))
      mkdirSync(stage, { recursive: true })
      const pendingOutputs = getSqlite().prepare('SELECT output_path FROM music_url_item WHERE source_url=? AND output_path IS NOT NULL ORDER BY id').all(item.url) as { output_path: string }[]
      const sharedOutput = pendingOutputs.find((row) => (input.format === 'source' || row.output_path.toLowerCase().endsWith(`.${input.format}`)) && existsSync(join(root, row.output_path)))
      let finished = sharedOutput ? join(root, sharedOutput.output_path) : null
      // Completion marker is written by yt-dlp only after postprocessing. It
      // survives a crash before the database can checkpoint the final path.
      const { readFileSync } = await import('fs')
      const marker = join(stage, 'finished.json')
      if (!finished && existsSync(marker)) {
        try { const path = JSON.parse(readFileSync(marker, 'utf8').trim()); if (typeof path === 'string' && dirname(path) === stage && existsSync(path)) finished = path } catch { /* incomplete marker: retry */ }
      }
      if (!finished) {
        repo.updateUrlItem(item.id, phase)
        let diagnostic = ''
        const code = await run([...musicYtDlpArgs(), '--no-playlist', '-f', 'bestaudio[acodec=opus]/bestaudio[acodec^=mp4a]', '-x',
          '--audio-format', input.format === 'source' ? 'best' : input.format,
          '--embed-metadata', '--parse-metadata', `${input.artist}:(?P<meta_artist>.+)`, '--parse-metadata', `${input.album}:(?P<meta_album>.+)`,
          '--newline', '--progress', '--no-simulate', '--progress-template', 'download:NAVIPROGRESS %(progress._percent_str)s',
          '--print', 'before_dl:NAVIPHASE transfer', '--print', 'post_process:NAVIPHASE processing',
          '--print-to-file', 'after_move:%(filepath)j', marker,
          '-o', join(stage, '%(id)s.%(ext)s'), '--', item.url], (line) => {
          if (line === 'NAVIPHASE transfer' || line === 'NAVIPHASE processing') {
            phase = line === 'NAVIPHASE transfer' ? 'transfer' : 'processing'
            progress({ phase }); repo.updateUrlItem(item.id, phase)
          } else if (line.startsWith('NAVIPROGRESS ')) { phase = 'transfer'; progress({ percent: Number.parseFloat(line.slice(13)) || 0 }); repo.updateUrlItem(item.id, phase) }
          else if (line.startsWith('[ExtractAudio]')) { phase = 'processing'; repo.updateUrlItem(item.id, phase) }
          else if (/ERROR:/i.test(line)) diagnostic = line
        })
        if (!running()) return { total: items.length, resolved, error: null }
        if (existsSync(marker)) {
          try { const path = JSON.parse(readFileSync(marker, 'utf8').trim().split('\n').at(-1)!); if (typeof path === 'string' && dirname(path) === stage && existsSync(path)) finished = path } catch { /* rejected below */ }
        }
        if (!finished) throw new Error(diagnostic || `Downloader exited ${code} without a completed output`)
      }
      const extension = finished.split('.').at(-1)!
      if (!['opus', 'm4a', 'mp3', 'ogg'].includes(extension)) throw new Error('Unsupported completed audio format')
      const album = join(root, input.artist, input.album)
      mkdirSync(album, { recursive: true })
      const title = item.title.replace(/[/\\:*?"<>|\x00-\x1f]+/g, ' ').replace(/[. ]+$/g, '').slice(0, 100) || 'Audio'
      const target = dirname(finished) === stage ? join(album, `${title} [navihub-url-${item.id}].${extension}`) : finished
      const rel = relative(root, target).replace(/\\/g, '/')
      if (isAbsolute(rel) || rel.startsWith('..')) throw new Error('Invalid output path')
      phase = 'indexing'
      progress({ status: 'processing', phase: 'indexing', message: 'Downloaded; indexing pending' })
      repo.updateUrlItem(item.id, phase, null, rel)
      if (finished !== target) {
        if (existsSync(target)) throw new Error('Destination already exists; retained both files for review')
        linkSync(finished, target)
        unlinkSync(finished)
      }
      await indexMusicFiles([rel], owner, undefined, running)
      if (!running()) return { total: items.length, resolved, error: null }
      const local = getSqlite().prepare('SELECT id,duration FROM music_track WHERE file_path=?').get(rel) as { id: number; duration: number | null } | undefined
      if (!local || local.duration == null || local.duration <= 0) throw new Error('Completed audio could not be validated in the library')
      getSqlite().prepare('INSERT OR IGNORE INTO music_audio_source(source_url,local_track_id) VALUES(?,?)').run(item.url, local.id)
      repo.updateUrlItem(item.id, 'ready', null, rel, local.id)
      resolved++
    } catch (error) {
      if (!running()) return { total: items.length, resolved, error: null }
      const failure = musicFailure(phase, 'standalone yt-dlp', error instanceof Error ? error.message : String(error))
      repo.updateUrlItem(item.id, 'failed', failure)
      sourceFailures.set(item.url, failure)
      failed++
    }
  }
  let cursor = 0
  const inFlight = new Map<string, Promise<unknown>>()
  await Promise.all(Array.from({ length: Math.min(musicToolOptions().workers, items.length) }, async () => {
    while (running() && cursor < items.length) {
      const item = items[cursor++]
      const previous = inFlight.get(item.url) ?? Promise.resolve()
      const pending = previous.then(() => processItem(item))
      inFlight.set(item.url, pending)
      await pending
    }
  }))
  return { total: items.length, resolved, error: failed ? `${failed} item(s) need attention; completed audio was kept` : null }
}
