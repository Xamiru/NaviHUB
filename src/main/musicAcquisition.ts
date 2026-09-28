import { join } from 'path'
import { assessMusicSource } from '@shared/musicSourceMatch'
import type { YtmLocale, YtmSong } from './youtubeMusic'

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
  const plain = expected.title.normalize('NFKC').replace(/\s*[([].*?[)\]]\s*/g, ' ').replace(/\s+-\s+.*$/, '').trim()
  return [...new Set([base, plain && plain !== expected.title ? `${expected.artist} ${plain}` : ''])].filter(Boolean)
}

/** English first, then the catalogues whose script appears in the text. */
export function ytmLocalesFor(text: string): YtmLocale[] {
  const locales: YtmLocale[] = ['en']
  if (/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) locales.push('ja')
  else if (/\p{Script=Han}/u.test(text)) locales.push('ja', 'zh')
  if (/\p{Script=Hangul}/u.test(text)) locales.push('ko')
  if (/\p{Script=Cyrillic}/u.test(text)) locales.push('ru')
  return locales
}

export function sourceSearchLocales(expected: ExpectedRecording): YtmLocale[] {
  return ytmLocalesFor(`${expected.title} ${expected.artist} ${expected.albumTitle}`)
}

export interface RankedSource {
  source: YtmSong
  strong: boolean
  reasons: string[]
  rank: number
}

/**
 * Candidates may repeat one video as seen from several catalogue languages; its title can
 * match in one and its artist credit in another ("花冷え。" credits "We love sweets").
 */
export function rankYtmSources(expected: ExpectedRecording, candidates: YtmSong[]): RankedSource[] {
  const same = (a: string | null, b: string) => (a ?? '').normalize('NFKC').toLowerCase().trim() === b.normalize('NFKC').toLowerCase().trim()
  const views = new Map<string, YtmSong[]>()
  for (const candidate of candidates) views.set(candidate.videoId, [...(views.get(candidate.videoId) ?? []), candidate])
  return [...views.values()]
    .map((list, index) => {
      const [{ source, assessment }] = list
        .flatMap((titled) => list.map((credited) => {
          const source = { ...titled, artists: credited.artists }
          return {
            source,
            assessment: assessMusicSource(expected, {
              title: source.title,
              artist: source.artists.join(', ') || null,
              channel: source.artists.join(', '),
              duration: source.duration,
              albumTitle: source.album
            })
          }
        }))
        .sort((a, b) => Number(b.assessment.strong) - Number(a.assessment.strong) || b.assessment.rank - a.assessment.rank)
      const albumBonus = list.some((view) => same(view.album, expected.albumTitle)) ? 1 : 0
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
  const fullDate = date && date.length === 8 ? date : null
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
    release_date: fullDate,
    // `--embed-metadata` writes the date tag from upload_date, and yt-dlp rebuilds
    // it from the video timestamp when it is empty. yt-dlp's date filter parses
    // upload_date as YYYYMMDD, so a year-only date is tagged through meta_date.
    upload_date: fullDate,
    ...(date && !fullDate ? { meta_date: raw.date } : {}),
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
