import { join } from 'path'
import { assessMusicSource } from '@shared/musicSourceMatch'
import type { YtmSong } from './youtubeMusic'

/**
 * Pure decisions for the native Spotify-to-audio pipeline (orchestrated in
 * musicSpotify.ts): pick a YouTube Music source, name the staged output, and
 * build one yt-dlp invocation that keeps the source codec and writes the
 * Spotify metadata the library scanner and playlist matching rely on.
 */

type Json = Record<string, any>

export interface ExpectedRecording {
  title: string
  artist: string
  duration: number | null
  albumTitle: string
}

export function expectedRecording(raw: Json): ExpectedRecording {
  const artists = Array.isArray(raw.artists) ? raw.artists : []
  return {
    title: String(raw.name ?? ''),
    artist: String(artists[0] ?? raw.artist ?? ''),
    duration: typeof raw.duration === 'number' ? raw.duration : null,
    albumTitle: String(raw.album_name ?? '')
  }
}

export function sourceSearchQueries(expected: ExpectedRecording): string[] {
  const base = `${expected.artist} ${expected.title}`.trim()
  // A "(feat. …)" or "- Remastered" suffix can hide the canonical upload; retry without it.
  const plain = expected.title.replace(/\s*[([].*?[)\]]\s*/g, ' ').replace(/\s+-\s+.*$/, '').trim()
  return [...new Set([base, plain && plain !== expected.title ? `${expected.artist} ${plain}` : ''])].filter(Boolean)
}

export interface RankedSource {
  source: YtmSong
  strong: boolean
  reasons: string[]
  rank: number
}

export function rankYtmSources(expected: ExpectedRecording, candidates: YtmSong[]): RankedSource[] {
  const same = (a: string | null, b: string) => (a ?? '').normalize('NFKC').toLowerCase().trim() === b.normalize('NFKC').toLowerCase().trim()
  return candidates
    .map((source, index) => {
      const assessment = assessMusicSource(expected, {
        title: source.title,
        artist: source.artists.join(', ') || null,
        channel: source.artists.join(', '),
        duration: source.duration,
        albumTitle: source.album
      })
      const albumBonus = same(source.album, expected.albumTitle) ? 1 : 0
      const drift = expected.duration != null && source.duration != null ? Math.abs(expected.duration - source.duration) : 99
      return { source, strong: assessment.strong, reasons: assessment.reasons, rank: assessment.rank, albumBonus, drift, index }
    })
    .sort((a, b) => Number(b.strong) - Number(a.strong) || b.rank - a.rank || b.albumBonus - a.albumBonus ||
      a.drift - b.drift || a.index - b.index)
    .map(({ source, strong, reasons, rank }) => ({ source, strong, reasons, rank }))
}

/** Windows-safe single path component; yt-dlp templates also need literal `%` doubled. */
export function safePathComponent(value: string, fallback: string): string {
  const cleaned = value
    .normalize('NFC')
    .replace(/[\u0000-\u001f<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/g, '')
    .slice(0, 120)
    .trim()
  const reserved = /^(?:con|prn|aux|nul|com\d|lpt\d)(?:\..*)?$/i.test(cleaned)
  return cleaned && !reserved ? cleaned : fallback
}

/** Artist and album folders, shared by the staged output and its final library location. */
export function albumFolders(raw: Json): [string, string] {
  return [
    safePathComponent(String(raw.album_artist || (Array.isArray(raw.artists) ? raw.artists[0] : '') || raw.artist || ''), 'Unknown Artist'),
    safePathComponent(String(raw.album_name ?? ''), 'Unknown Album')
  ]
}

/** The staged output path without its extension; every file one yt-dlp run writes starts with it. */
export function stagedOutputBase(stagingRoot: string, raw: Json, artifact: string): string {
  const [artist, album] = albumFolders(raw)
  const track = typeof raw.track_number === 'number' ? String(raw.track_number).padStart(2, '0') : null
  const disc = typeof raw.disc_number === 'number' ? raw.disc_number : 1
  const title = safePathComponent(String(raw.name ?? ''), 'Untitled')
  const name = `${track ? `${disc}-${track} - ` : ''}${title} [navirun-${artifact}] [navihub-${String(raw.song_id)}]`
  return join(stagingRoot, artist, album, name)
}

export function stagedOutputTemplate(stagingRoot: string, raw: Json, artifact: string): string {
  return stagedOutputBase(stagingRoot, raw, artifact).replace(/%/g, '%%') + '.%(ext)s'
}

/**
 * Apply Spotify's catalogue metadata to a yt-dlp info JSON. `--embed-metadata`
 * then tags the file with the playlist's identity instead of YouTube's, and
 * the thumbnail list is replaced by the album cover.
 */
export function taggedInfoJson(info: Json, raw: Json): Json {
  const artists = Array.isArray(raw.artists) ? raw.artists.filter((value: unknown) => typeof value === 'string') : []
  const cover = typeof raw.cover_url === 'string' ? raw.cover_url : null
  const date = typeof raw.date === 'string' ? raw.date.replace(/-/g, '') : null
  return {
    ...info,
    title: raw.name,
    track: raw.name,
    fulltitle: raw.name,
    artists,
    artist: artists.join(', '),
    creators: artists,
    album: raw.album_name,
    album_artists: raw.album_artist ? [raw.album_artist] : artists.slice(0, 1),
    album_artist: raw.album_artist ?? artists[0] ?? null,
    track_number: raw.track_number ?? null,
    disc_number: raw.disc_number ?? null,
    release_year: raw.year ?? null,
    release_date: date && date.length === 8 ? date : null,
    // `--embed-metadata` writes the date tag from upload_date only, and yt-dlp
    // rebuilds it from the video timestamp when it is empty.
    upload_date: date,
    timestamp: null,
    release_timestamp: null,
    modified_timestamp: null,
    description: null,
    genre: null,
    genres: null,
    categories: null,
    tags: null,
    ...(cover ? { thumbnails: [{ id: 'cover', url: cover, preference: 1 }], thumbnail: cover } : {})
  }
}

export function formatSelector(format: 'opus' | 'm4a' | 'mp3'): string {
  // An exact codec filter prevents silent transcoding: `-x` then copies the stream.
  return format === 'm4a' ? 'bestaudio[acodec^=mp4a]' : `bestaudio[acodec=${format}]`
}

export function ytdlpAcquisitionArgs(input: {
  base: string[]
  infoFile: string
  outputTemplate: string
  format: 'opus' | 'm4a' | 'mp3'
  embedThumbnail: boolean
}): string[] {
  return [
    ...input.base,
    '--load-info-json', input.infoFile,
    '--format', formatSelector(input.format),
    '--extract-audio',
    '--embed-metadata',
    ...(input.embedThumbnail ? ['--embed-thumbnail', '--convert-thumbnails', 'jpg'] : []),
    '--no-overwrites',
    '--no-progress',
    '--output', input.outputTemplate,
    '--print', 'after_move:NAVIHUB_DONE %(filepath)s'
  ]
}

/** yt-dlp only lists its optional libraries in verbose mode. */
export function ytdlpHasMutagen(verboseOutput: string): boolean {
  const line = verboseOutput.split('\n').find((row) => row.includes('Optional libraries'))
  return line != null && /\bmutagen-/i.test(line)
}

/** Bounded worker pool; items start in order and each worker takes the next one. */
export async function runPool<T>(items: T[], workers: number, run: (item: T, index: number) => Promise<void>): Promise<void> {
  let next = 0
  await Promise.all(Array.from({ length: Math.min(Math.max(1, workers), items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      await run(items[index], index)
    }
  }))
}
