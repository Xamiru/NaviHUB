import { randomUUID } from 'crypto'
import { processUrlJob, validateUrlInput } from './musicUrlQueue'
import { addUrlJob } from './repos/musicUrlRepo'
import { assessMusicSource } from '@shared/musicSourceMatch'
import { musicToolOptions, musicYtDlpArgs, spotdlYtDlpOptions, musicFailure, musicAccessKey } from './musicTools'
import metadataAdapter from './spotifyMetadata.py?raw'
import { youtubeSourceUrl, denoExecutable, inspectAudio, parseSourceEvidence, canonicalAudioSource } from './musicSpotifyRecovery'
import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync, mkdirSync } from 'fs'
import { homedir, tmpdir } from 'os'
import { dirname, extname, isAbsolute, join, relative } from 'path'
import { app, BrowserWindow, dialog, type OpenDialogOptions } from 'electron'
import { get as getSetting } from './repos/settingsRepo'
import { absoluteMediaPath, downloadImages, musicRootDir } from './files'
import { fetchWithRetry } from './http'
import { indexMusicFiles } from './music'
import {
  claimMusicMaintenance,
  musicMaintenanceOwner,
  releaseMusicMaintenance
} from './musicMaintenance'
import * as spotifyRepo from './repos/musicSpotifyRepo'
import * as tasks from './tasks'
import { pipeProcLines } from './childLines'
import { processControls, type Killable } from './taskControls'
import { updateActivity } from './progress'
import { currentActivitySignal } from './activityContext'
import { logInfo, logWarn } from './logBus'
import type {
  MusicDownloadEvent,
  SpotifyDownloadQueueAddResult,
  SpotifyDownloadQueueSnapshot,
  SpotifyDownloadQueueStartInput,
  SpotifyEntityCandidate,
  SpotifyEntityDownloadInput,
  SpotifyEntityInspectInput,
  SpotifyEntityInspection,
  SpotifyEntityInspectionStatus,
  SpotifyEntityRef,
  SpotifyEntityState,
  SpotifyEntityKind,
  SpotifyReleasePreview,
  SpotifyDownloadInput,
  SpotifyImportResult,
  SpotifyTrackDownloadOptionsInput,
  SpotdlDetectResult,
  SpotifyDownloadCandidateInput,
  SpotifyYouTubeAccess,
  SpotifyYouTubeAccessTestResult,
  TaskState
} from '@shared/types'

export interface ParsedSpotifyUrl {
  kind: 'playlist' | SpotifyEntityKind
  spotifyId: string
  canonicalUrl: string
}

export interface SpotdlValidation {
  songs: spotifyRepo.SpotdlSong[]
  duplicates: number
  skipped: number
  title: string
}

export function parseSpotifyUrl(value: string): ParsedSpotifyUrl | null {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    return null
  }
  if (!['open.spotify.com', 'www.open.spotify.com'].includes(url.hostname.toLowerCase())) return null
  const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(playlist|artist|album)\/([A-Za-z0-9]{10,64})\/?$/i)
  if (!match) return null
  return {
    kind: match[1].toLowerCase() as ParsedSpotifyUrl['kind'],
    spotifyId: match[2],
    canonicalUrl: `https://open.spotify.com/${match[1].toLowerCase()}/${match[2]}`
  }
}

export function parseSpotifyPlaylistUrl(value: string): ParsedSpotifyUrl | null {
  const parsed = parseSpotifyUrl(value)
  return parsed?.kind === 'playlist' ? parsed : null
}

export function validateSpotdlPayload(payload: unknown): SpotdlValidation {
  if (!Array.isArray(payload)) throw new Error('spotDL returned an invalid playlist file')
  const seen = new Set<string>()
  const songs: spotifyRepo.SpotdlSong[] = []
  let duplicates = 0
  let skipped = 0
  let title = 'Spotify playlist'
  const orderedPayload = payload.map((raw, index) => ({
    raw,
    index,
    position: raw && typeof raw === 'object' &&
      typeof (raw as Record<string, unknown>).list_position === 'number'
      ? (raw as Record<string, unknown>).list_position as number
      : null
  }))
  if (orderedPayload.filter((entry) => entry.position != null).length > 1) {
    orderedPayload.sort((a, b) => {
      if (a.position == null) return b.position == null ? a.index - b.index : 1
      if (b.position == null) return -1
      return a.position - b.position || a.index - b.index
    })
  }
  for (const { raw } of orderedPayload) {
    if (!raw || typeof raw !== 'object') {
      skipped += 1
      continue
    }
    const row = raw as Record<string, unknown>
    const songUrl = typeof row.url === 'string' ? row.url : ''
    const idFromUrl = songUrl.match(/\/track\/([A-Za-z0-9]+)/)?.[1]
    const id = typeof row.song_id === 'string' ? row.song_id : idFromUrl
    const artists = Array.isArray(row.artists)
      ? row.artists.filter((artist): artist is string => typeof artist === 'string' && !!artist.trim())
      : typeof row.artist === 'string'
        ? [row.artist]
        : []
    const name = typeof row.name === 'string' ? row.name.trim() : ''
    const album = typeof row.album_name === 'string' ? row.album_name.trim() : ''
    const unavailable = row.is_unavailable === true || row.available === false
    const local = row.is_local === true || songUrl.startsWith('spotify:local:')
    const podcast = row.type === 'episode' || songUrl.includes('/episode/')
    if (!id || !name || !album || artists.length === 0 || unavailable || local || podcast) {
      skipped += 1
      continue
    }
    if (seen.has(id)) {
      duplicates += 1
      continue
    }
    seen.add(id)
    if (typeof row.list_name === 'string' && row.list_name.trim()) title = row.list_name.trim()
    const number = (value: unknown): number | null =>
      typeof value === 'number' && Number.isFinite(value) ? value : null
    songs.push({
      spotifyTrackId: id,
      title: name,
      artists,
      primaryArtist: artists[0],
      albumArtist:
        typeof row.album_artist === 'string' && row.album_artist.trim()
          ? row.album_artist.trim()
          : null,
      albumTitle: album,
      duration: number(row.duration),
      coverUrl: typeof row.cover_url === 'string' ? row.cover_url : null,
      spotifyUrl: songUrl || `https://open.spotify.com/track/${id}`,
      discNo: number(row.disc_number),
      trackNo: number(row.track_number),
      year: number(row.year),
      rawJson: JSON.stringify(row),
      spotifyAlbumId: typeof row.album_id === 'string' ? row.album_id : null,
      spotifyArtistId: typeof row.artist_id === 'string'
        ? row.artist_id
        : Array.isArray(row.artist_ids) && typeof row.artist_ids[0] === 'string'
          ? row.artist_ids[0]
          : null,
      spotifyArtistIds: Array.isArray(row.artist_ids)
        ? row.artist_ids.filter((id): id is string => typeof id === 'string')
        : typeof row.artist_id === 'string' ? [row.artist_id] : [],
      albumType: ['album', 'single', 'compilation'].includes(String(row.album_type))
        ? (row.album_type as 'album' | 'single' | 'compilation')
        : null,
      listPosition: number(row.list_position)
    })
  }
  return { songs, duplicates, skipped, title }
}

export function chunkSpotifyItems<T>(items: T[], size = 100): T[][] {
  if (!Number.isInteger(size) || size < 1) throw new Error('Chunk size must be positive')
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  return chunks
}

export function estimateSpotifyDownloadBytes(
  items: { duration: number | null }[],
  fallbackBytes = 4 * 1024 * 1024
): number {
  return Math.ceil(
    items.reduce(
      (total, item) => total + (item.duration == null ? fallbackBytes : item.duration * 16_000),
      0
    ) * 1.05
  )
}

export type SpotdlLineEvent =
  | { kind: 'item'; title: string }
  | { kind: 'progress'; done: number; total: number }
  | { kind: 'error'; message: string; spotifyTrackId: string | null }

export function parseSpotdlLine(line: string): SpotdlLineEvent | null {
  const progress = line.match(/(?:^|\s)(\d+)\s*\/\s*(\d+)\s+(?:complete|completed)/i)
  if (progress) return { kind: 'progress', done: Number(progress[1]), total: Number(progress[2]) }
  const printed = line.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)(?:\?\S*)?\s+-\s+(.+)$/i)
  if (printed) return { kind: 'error', spotifyTrackId: printed[1], message: printed[2].trim() }
  const error = line.match(/(?:error|failed)\s*:\s*(.+)$/i)
  if (error) return { kind: 'error', spotifyTrackId: null, message: error[1].trim() }
  const item = line.match(/^(.+?):\s*(?:Searching|Downloading|Converting|Done)/i)
  return item ? { kind: 'item', title: item[1].trim() } : null
}

export function buildSpotdlSaveArgs(url: string, saveFile: string, threads = 8): string[] {
  // `save` does not need an audio provider, but spotDL still probes YouTube Music at
  // startup when it is present in the provider list. That probe can hang before any
  // Spotify metadata is read. Selecting YouTube avoids the irrelevant YTM health
  // check while leaving the saved Spotify payload unchanged.
  return ['save', url, '--audio', 'youtube', '--threads', String(threads), '--save-file', saveFile]
}

export function parseSpotdlRateLimitWait(line: string): number | null {
  const match = line.match(/rate\/request limit.*?after:\s*(\d+)\s*s/i)
  return match ? Number(match[1]) : null
}

export function buildSpotifyDiscoveryQuery(artist: string, title: string): string {
  return `${artist.trim()} - ${title.trim()}`
}

export function stripCatalogReleaseTypeSuffix(albumTitle: string): string {
  const trimmed = albumTitle.trim()
  const stripped = trimmed.replace(/\s+[-–—]\s+(?:single|ep)$/i, '').trim()
  return stripped || trimmed
}

export function spotifyReleaseTitlesMatch(indexedTitle: string, spotifyTitle: string): boolean {
  const same = spotifyRepo.normalizeSpotifyMatch
  return same(indexedTitle) === same(spotifyTitle) ||
    same(stripCatalogReleaseTypeSuffix(indexedTitle)) ===
      same(stripCatalogReleaseTypeSuffix(spotifyTitle))
}

export function completeResolvedReleaseSongs(
  release: Pick<spotifyRepo.IndexedEntityRelease, 'title' | 'albumArtist' | 'tracks'>,
  candidates: spotifyRepo.SpotdlSong[]
): { songs: spotifyRepo.SpotdlSong[]; missing: spotifyRepo.IndexedEntityTrack[] } {
  const same = spotifyRepo.normalizeSpotifyMatch
  const unused = [...candidates]
  const songs: spotifyRepo.SpotdlSong[] = []
  const missing: spotifyRepo.IndexedEntityTrack[] = []
  for (const track of release.tracks) {
    const matches = unused
      .map((song, index) => ({ song, index }))
      .filter(({ song }) =>
        same(song.title) === same(track.title) &&
        same(song.albumArtist ?? song.primaryArtist) === same(release.albumArtist) &&
        spotifyReleaseTitlesMatch(release.title, song.albumTitle) &&
        (track.duration == null || song.duration == null || Math.abs(track.duration - song.duration) <= 3)
      )
      .sort((a, b) => {
        const aPosition = Number(a.song.discNo === track.discNo && a.song.trackNo === track.trackNo)
        const bPosition = Number(b.song.discNo === track.discNo && b.song.trackNo === track.trackNo)
        return bPosition - aPosition
      })
    if (!matches.length) {
      missing.push(track)
      continue
    }
    songs.push(matches[0].song)
    unused.splice(matches[0].index, 1)
  }
  return { songs, missing }
}

export function adaptRecoveredReleaseSongs(
  release: Pick<spotifyRepo.IndexedEntityRelease, 'title' | 'albumArtist'>,
  missing: spotifyRepo.IndexedEntityTrack[],
  candidates: spotifyRepo.SpotdlSong[],
  spotifyAlbumId: string
): spotifyRepo.SpotdlSong[] {
  const same = spotifyRepo.normalizeSpotifyMatch
  const used = new Set<string>()
  return missing.flatMap((track): spotifyRepo.SpotdlSong[] => {
    const matches = candidates.filter((song) =>
      !used.has(song.spotifyTrackId) &&
      same(song.title) === same(track.title) &&
      same(song.albumArtist ?? song.primaryArtist) === same(release.albumArtist) &&
      (track.duration == null || song.duration == null || Math.abs(track.duration - song.duration) <= 3)
    )
    const preferred = matches.filter((song) => song.spotifyAlbumId === spotifyAlbumId)
    const source = preferred.length === 1
      ? preferred[0]
      : matches.length === 1 ? matches[0] : null
    if (!source) return []
    used.add(source.spotifyTrackId)
    let raw: Record<string, unknown>
    try {
      raw = JSON.parse(source.rawJson) as Record<string, unknown>
    } catch {
      raw = {}
    }
    Object.assign(raw, {
      name: track.title,
      album_name: release.title,
      album_artist: release.albumArtist,
      album_id: spotifyAlbumId,
      disc_number: track.discNo,
      track_number: track.trackNo
    })
    return [{
      ...source,
      title: track.title,
      albumArtist: release.albumArtist,
      albumTitle: release.title,
      duration: track.duration ?? source.duration,
      discNo: track.discNo,
      trackNo: track.trackNo,
      rawJson: JSON.stringify(raw),
      spotifyAlbumId
    }]
  })
}

export function releaseTrackNumberingIsIncomplete(
  tracks: Array<{ discNo: number | null; trackNo: number | null }>
): boolean {
  if (!tracks.length || tracks.some((track) => track.trackNo == null)) return false
  const discs = new Map<number, number[]>()
  for (const track of tracks) {
    const disc = track.discNo ?? 1
    const numbers = discs.get(disc) ?? []
    numbers.push(track.trackNo!)
    discs.set(disc, numbers)
  }
  return [...discs.values()].some((numbers) => {
    const unique = [...new Set(numbers)].sort((a, b) => a - b)
    return unique[0] !== 1 || unique.some((value, index) => value !== index + 1)
  })
}

interface ReleaseDiscoveryTrack {
  title: string
  duration: number | null
}

interface ReleaseDiscoverySource {
  tracks: ReleaseDiscoveryTrack[]
}

export function rankSpotifyReleaseDiscoveryTracks<T extends ReleaseDiscoveryTrack>(
  releases: ReleaseDiscoverySource[],
  target: { tracks: T[] }
): T[] {
  const releaseCounts = new Map<string, number>()
  for (const release of releases) {
    const titles = new Set(release.tracks.map((track) => spotifyRepo.normalizeSpotifyMatch(track.title)))
    for (const title of titles) releaseCounts.set(title, (releaseCounts.get(title) ?? 0) + 1)
  }
  return target.tracks
    .map((track, index) => ({
      track,
      index,
      releaseCount: releaseCounts.get(spotifyRepo.normalizeSpotifyMatch(track.title)) ?? 0
    }))
    .sort((a, b) => a.releaseCount - b.releaseCount || b.index - a.index)
    .map(({ track }) => track)
}

export function spotifyAlbumIdFromTrackLookup(
  release: { title: string; albumArtist: string },
  track: ReleaseDiscoveryTrack,
  songs: spotifyRepo.SpotdlSong[]
): string | null {
  const same = spotifyRepo.normalizeSpotifyMatch
  const ids = new Set(songs.flatMap((song) => {
    if (same(song.title) !== same(track.title)) return []
    if (track.duration == null || song.duration == null || Math.abs(track.duration - song.duration) > 3) {
      return []
    }
    if (same(song.albumArtist ?? song.primaryArtist) !== same(release.albumArtist)) return []
    if (!spotifyReleaseTitlesMatch(release.title, song.albumTitle)) return []
    return song.spotifyAlbumId ? [song.spotifyAlbumId] : []
  }))
  return ids.size === 1 ? [...ids][0] : null
}

export function pickDiscoveredEntity(
  kind: SpotifyEntityKind,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  songs: spotifyRepo.SpotdlSong[]
): ParsedSpotifyUrl | null {
  const same = spotifyRepo.normalizeSpotifyMatch
  const targetArtist = same(kind === 'artist' ? current.name : current.artistName ?? '')
  const targetAlbum = same(spotifyRepo.stripAlbumYearPrefix(current.name))
  for (const sample of current.sampleTracks) {
    const song = songs.find((candidate) => {
      if (same(candidate.title) !== same(sample.title)) return false
      if (sample.duration == null || candidate.duration == null ||
          Math.abs(sample.duration - candidate.duration) > 3) return false
      const artists = candidate.artists.map(same)
      if (!artists.includes(targetArtist)) return false
      return kind === 'artist' || same(spotifyRepo.stripAlbumYearPrefix(candidate.albumTitle)) === targetAlbum
    })
    if (!song) continue
    if (kind === 'album' && song.spotifyAlbumId) {
      return {
        kind,
        spotifyId: song.spotifyAlbumId,
        canonicalUrl: `https://open.spotify.com/album/${song.spotifyAlbumId}`
      }
    }
    const artistIndex = song.artists.findIndex((artist) => same(artist) === targetArtist)
    const spotifyId = artistIndex >= 0 ? song.spotifyArtistIds[artistIndex] : null
    if (kind === 'artist' && spotifyId) {
      return {
        kind,
        spotifyId,
        canonicalUrl: `https://open.spotify.com/artist/${spotifyId}`
      }
    }
  }
  return null
}

export function pickConsensusDiscoveredEntity(
  kind: SpotifyEntityKind,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  songs: spotifyRepo.SpotdlSong[]
): ParsedSpotifyUrl | null {
  const votes = new Map<string, { parsed: ParsedSpotifyUrl; count: number }>()
  for (const sample of current.sampleTracks.slice(0, 3)) {
    const parsed = pickDiscoveredEntity(kind, { ...current, sampleTracks: [sample] }, songs)
    if (!parsed) continue
    const vote = votes.get(parsed.spotifyId) ?? { parsed, count: 0 }
    vote.count += 1
    votes.set(parsed.spotifyId, vote)
  }
  const ranked = [...votes.values()].sort((a, b) => b.count - a.count)
  if (!ranked.length || (ranked[1] && ranked[1].count === ranked[0].count)) return null
  return ranked[0].parsed
}

export function buildSpotdlDownloadArgs(
  inputFile: string,
  outputRoot: string,
  errorFile: string,
  overwrite: 'skip' | 'force' = 'skip',
  options: {
    allowUnverified?: boolean
    cookieFile?: string | null
    audioProviders?: string[]
    provenance?: boolean
  } = {}
): string[] {
  const audioProviders = options.audioProviders?.length
    ? options.audioProviders
    : ['youtube-music', 'youtube']
  const args = [
    'download',
    inputFile,
    '--audio',
    ...audioProviders,
    '--lyrics',
    '--format',
    options.cookieFile ? 'm4a' : 'opus',
    '--bitrate',
    'disable',
    ...(musicToolOptions().ffmpeg === 'ffmpeg' ? [] : ['--ffmpeg', musicToolOptions().ffmpeg]),
    '--threads',
    String(musicToolOptions().workers),
    '--yt-dlp-args', spotdlYtDlpOptions(),
    '--overwrite',
    overwrite,
    '--simple-tui',
    '--print-errors',
    '--max-retries',
    '0',
    '--save-errors',
    errorFile,
    '--save-file',
    `${errorFile}.result.spotdl`,
    '--output',
    join(
      outputRoot,
      '{album-artist}',
      '{album}',
      `{disc-number}-{track-number} - {title}${options.provenance ? ' [navihub-{track-id}]' : ''}.{output-ext}`
    )
  ]
  // spotDL's normal filtered ranking already validates artist/title/duration and is
  // the default used by its CLI and maintained wrappers. `--only-verified-results`
  // discards otherwise strong matches when YouTube has not marked the upload as an
  // official music result. The explicit broader retry goes one step further by
  // disabling spotDL's normal result filter.
  if (options.allowUnverified) args.splice(args.indexOf('--simple-tui'), 0, '--dont-filter-results')
  if (options.cookieFile) args.splice(args.indexOf('--output'), 0, '--cookie-file', options.cookieFile)
  return args
}

/** Remove NaviHUB's temporary Spotify-id filename marker after a download.
 * If a clean target already exists, keep the marked file so the scanner can
 * expose it as a candidate instead of silently replacing the user's audio.
 */
function spotifyStagingRoot(): string { return join(musicRootDir(), '.navihub-downloads') }

export function recoverSpotifyOutputs(root = musicRootDir()): string[] {
  const staging = join(root, '.navihub-downloads')
  const manifest = join(staging, 'pending-index.json')
  let paths: string[] = []
  try {
    const saved = JSON.parse(readFileSync(manifest, 'utf8'))
    if (Array.isArray(saved)) paths = saved.filter((path): path is string => typeof path === 'string' && !isAbsolute(path) && !path.split(/[\\/]/).includes('..') && existsSync(join(root, path)))
  } catch { /* no pending index */ }
  const walk = (dir: string): void => {
    if (!existsSync(dir)) return
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name)
      if (entry.isDirectory()) { walk(abs); continue }
      if (!entry.isFile() || !['.opus', '.m4a', '.mp3', '.flac', '.ogg', '.wav'].includes(extname(abs))) continue
      const rel = relative(staging, abs)
      if (rel.split(/[\\/]/).length < 3) continue
      let target = join(root, rel)
      mkdirSync(dirname(target), { recursive: true })
      // A previous file belongs to the library. Keep both until the user reviews them.
      if (existsSync(target)) target = join(dirname(target), `${Date.now()}-${entry.name}`)
      paths.push(relative(root, target).replace(/\\/g, '/'))
      writeFileSync(`${manifest}.tmp`, JSON.stringify(paths), { mode: 0o600 })
      renameSync(`${manifest}.tmp`, manifest)
      renameSync(abs, target)
    }
  }
  walk(staging)
  return paths
}

async function indexSpotifyOutputs(owner: string): Promise<void> {
  const started = Date.now()
  recoverProvenanceRenames(musicRootDir())
  const paths = recoverSpotifyOutputs()
  spotifyRepo.markSourceArtifactsIndexing(paths)
  const jobId = queueRun?.owner === owner ? queueRun.id : null
  const alive = () => !jobId || !abandonedRuns.has(jobId)
  if (paths.length) await indexMusicFiles(paths, owner, undefined, alive)
  if (!alive()) return
  for (const sourceKind of ['playlistItem', 'entityTrack'] as const) {
    const rows = spotifyRepo.pendingProvenanceSources(sourceKind)
    if (rows.length) settleDownloadedProvenance(sourceKind, rows)
  }
  spotifyRepo.linkArchivedVerifiedSources((path) => existsSync(join(musicRootDir(), path)))
  const ids = paths.flatMap((path) => path.match(/\[navihub-([A-Za-z0-9]+)\]/)?.[1] ?? [])
  if (ids.length) spotifyRepo.updateProvenanceTrackPaths(normalizeProvenanceFiles(musicRootDir(), ids))
  rmSync(join(spotifyStagingRoot(), 'pending-index.json'), { force: true })
  logInfo('proc', `Spotify indexing: ${paths.length} new files in ${Date.now() - started}ms`)
}

export function normalizeProvenanceFiles(root: string, trackIds: string[]): { from: string; to: string }[] {
  const allowed = new Set(trackIds)
  const renames: { from: string; to: string }[] = []
  const rows = spotifyRepo.provenanceFilePaths(trackIds)
  for (const rel of rows) {
    const abs = join(root, rel)
    const name = rel.split(/[\\/]/).at(-1) ?? ''
    const match = name.match(/(?: \[navirun-[A-Za-z0-9-]+\])? \[navihub-([A-Za-z0-9]+)\](\.[^.]*)$/)
    if (!match || !allowed.has(match[1]) || !existsSync(abs)) continue
    const target = join(dirname(abs), name.slice(0, match.index ?? 0) + match[2])
    if (existsSync(target)) continue
    const rename = { from: rel, to: relative(root, target).replace(/\\/g, '/') }
    const journal = join(root, '.navihub-downloads', 'pending-rename.json')
    mkdirSync(dirname(journal), { recursive: true })
    writeFileSync(`${journal}.tmp`, JSON.stringify(rename), { mode: 0o600 })
    renameSync(`${journal}.tmp`, journal)
    renameSync(abs, target)
    spotifyRepo.updateProvenanceTrackPaths([rename])
    rmSync(journal, { force: true })
    renames.push(rename)
  }
  return renames
}

function recoverProvenanceRenames(root: string): void {
  const journal = join(root, '.navihub-downloads', 'pending-rename.json')
  if (!existsSync(journal)) return
  const value = JSON.parse(readFileSync(journal, 'utf8')) as { from: string; to: string }
  if (![value.from, value.to].every((path) => typeof path === 'string' && !isAbsolute(path) && !path.split(/[\\/]/).includes('..'))) throw new Error('Invalid pending audio rename')
  const from = join(root, value.from), to = join(root, value.to)
  if (existsSync(from)) {
    if (existsSync(to)) throw new Error('Audio rename needs review: both paths exist')
    renameSync(from, to)
  }
  if (!existsSync(to)) throw new Error('Audio rename needs review: completed file is missing')
  spotifyRepo.updateProvenanceTrackPaths([value])
  rmSync(journal, { force: true })
}

function settleDownloadedProvenance(
  sourceKind: 'playlistItem' | 'entityTrack',
  rows: Array<{ id: number; spotifyTrackId: string; audioSourceUrl?: string | null }>,
  provider: spotifyRepo.DownloadCandidateRow['provider'] = 'youtube-music'
): void {
  spotifyRepo.linkProvenanceTracks(rows.map((row) => ({
    sourceKind,
    sourceId: row.id,
    spotifyTrackId: row.spotifyTrackId,
    marker: `[navihub-${row.spotifyTrackId}]`,
    manual: Boolean(row.audioSourceUrl),
    provider: row.audioSourceUrl ? 'manual' : provider,
    sourceUrl: row.audioSourceUrl ?? null
  })))
  const renames = normalizeProvenanceFiles(musicRootDir(), rows.map((row) => row.spotifyTrackId))
  spotifyRepo.updateProvenanceTrackPaths(renames)
}

export function payloadWithAudioSource(rawJson: string, audioSourceUrl: string | null): unknown {
  const parsed = JSON.parse(rawJson) as Record<string, unknown>
  if (audioSourceUrl) parsed.download_url = audioSourceUrl
  return parsed
}

export function parseSpotdlVersion(value: string | null): { version: string | null; supported: boolean } {
  const match = value?.match(/(\d+)\.(\d+)\.(\d+)/)
  if (!match) return { version: value, supported: false }
  const version = `${match[1]}.${match[2]}.${match[3]}`
  const parts = match.slice(1).map(Number)
  const supported = parts[0] > 4 ||
    (parts[0] === 4 && (parts[1] > 5 || (parts[1] === 5 && parts[2] >= 2)))
  return { version, supported }
}

function premiumCookieFile(): string | null {
  const value = getSetting('spotdl.cookieFile')?.trim()
  if (!value) return null
  if (!isAbsolute(value) || !existsSync(value) || !statSync(value).isFile()) {
    throw new Error('The YouTube Music Premium cookie file is missing or is not an absolute file path')
  }
  return value
}

function configuredAudioProviders(): string[] {
  const value = getSetting('spotdl.audioProviders')?.trim()
  if (value === 'piped') return ['youtube-music', 'youtube', 'piped']
  if (value === 'catalogues') {
    return ['youtube-music', 'youtube', 'piped', 'bandcamp', 'soundcloud']
  }
  return ['youtube-music', 'youtube']
}

function downloadCliOptions(allowUnverified = false): {
  allowUnverified: boolean
  cookieFile: string | null
  audioProviders: string[]
} {
  return {
    allowUnverified,
    cookieFile: premiumCookieFile(),
    audioProviders: configuredAudioProviders()
  }
}

function spotdlBin(): string {
  return getSetting('spotdl.path')?.trim() || 'spotdl'
}

async function resolvePlaylistUrl(input: string): Promise<ParsedSpotifyUrl> {
  const parsed = parseSpotifyPlaylistUrl(input)
  if (parsed) return parsed
  let short: URL
  try {
    short = new URL(input.trim())
  } catch {
    throw new Error('Paste a Spotify playlist link')
  }
  if (!['spotify.link', 'www.spotify.link'].includes(short.hostname.toLowerCase())) {
    throw new Error('Only public Spotify playlist links can be imported')
  }
  const response = await fetchWithRetry(short.toString(), { timeoutMs: 15_000 }, 1)
  const resolved = parseSpotifyPlaylistUrl(response.url)
  if (!resolved) throw new Error('That Spotify short link did not resolve to a playlist')
  return resolved
}

async function resolveEntityUrl(input: string, kind: SpotifyEntityKind): Promise<ParsedSpotifyUrl> {
  let parsed = parseSpotifyUrl(input)
  if (!parsed) {
    let short: URL
    try {
      short = new URL(input.trim())
    } catch {
      throw new Error(`Paste a Spotify ${kind} link`)
    }
    if (!['spotify.link', 'www.spotify.link'].includes(short.hostname.toLowerCase())) {
      throw new Error(`Paste a public Spotify ${kind} link`)
    }
    const response = await fetchWithRetry(short.toString(), { timeoutMs: 15_000 }, 1)
    parsed = parseSpotifyUrl(response.url)
  }
  if (!parsed || parsed.kind !== kind) throw new Error(`That link is not a Spotify ${kind}`)
  return parsed
}

export function mismatchFor(
  input: SpotifyEntityInspectInput,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  sourceName: string,
  releases: SpotifyReleasePreview[]
): string | null {
  const same = spotifyRepo.normalizeSpotifyMatch
  if (input.kind === 'artist') {
    return same(current.name) === same(sourceName)
      ? null
      : `Spotify calls this artist “${sourceName}”, but this page is “${current.name}”.`
  }
  const release = releases[0]
  if (release && same(spotifyRepo.stripAlbumYearPrefix(current.name)) ===
      same(spotifyRepo.stripAlbumYearPrefix(release.title)) &&
      same(current.artistName ?? '') === same(release.albumArtist)) return null
  return `Spotify identifies this as “${release?.title ?? sourceName}” by ${release?.albumArtist ?? sourceName}, which does not match this album page.`
}

export function groupEntityReleases(
  songs: spotifyRepo.SpotdlSong[],
  sourceName: string,
  kind: SpotifyEntityKind,
  matches = spotifyRepo.matchDetails(songs)
): SpotifyReleasePreview[] {
  const groups = new Map<string, spotifyRepo.SpotdlSong[]>()
  for (const song of songs) {
    if (!song.spotifyAlbumId || !['album', 'single'].includes(song.albumType ?? '')) continue
    const group = groups.get(song.spotifyAlbumId) ?? []
    group.push(song)
    groups.set(song.spotifyAlbumId, group)
  }
  return [...groups].map(([spotifyAlbumId, tracks]) => {
    const first = tracks[0]
    const localCount = tracks.filter((song) => matches.has(song.spotifyTrackId)).length
    const missingTracks = tracks.filter((song) => !matches.has(song.spotifyTrackId))
    const duration = tracks.reduce((sum, song) => sum + (song.duration ?? 0), 0)
    const primary = ['album', 'single'].includes(first.albumType ?? '') &&
      spotifyRepo.normalizeSpotifyMatch(first.albumArtist ?? first.primaryArtist) === spotifyRepo.normalizeSpotifyMatch(sourceName)
    return {
      releaseId: 0,
      spotifyAlbumId,
      spotifyUrl: `https://open.spotify.com/album/${spotifyAlbumId}`,
      title: first.albumTitle,
      albumArtist: first.albumArtist ?? first.primaryArtist,
      year: first.year,
      albumType: first.albumType,
      trackCount: tracks.length,
      localCount,
      missingCount: tracks.length - localCount,
      duration,
      estimatedBytes: estimateSpotifyDownloadBytes(tracks),
      missingDuration: missingTracks.reduce((sum, song) => sum + (song.duration ?? 0), 0),
      missingEstimatedBytes: estimateSpotifyDownloadBytes(missingTracks),
      preselected: kind === 'album' || primary,
      metadataState: 'resolved' as const,
      resolutionError: null
    }
  }).sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title))
}

interface ItunesResult {
  wrapperType?: string
  kind?: string
  artistId?: number
  artistName?: string
  primaryGenreName?: string
  collectionId?: number
  collectionName?: string
  collectionType?: string
  releaseDate?: string
  trackCount?: number
  trackId?: number
  trackName?: string
  trackTimeMillis?: number
  discNumber?: number
  trackNumber?: number
}

function catalogueCountry(): string {
  const country = getSetting('spotdl.catalogueCountry')?.trim().toUpperCase() ?? 'US'
  return /^[A-Z]{2}$/.test(country) ? country : 'US'
}

async function itunesResults(url: string, deadline?: number, country = catalogueCountry()): Promise<ItunesResult[]> {
  const remaining = deadline == null ? 8_000 : deadline - Date.now()
  if (remaining <= 0) throw new Error('Fast music catalogue exceeded its 25-second budget')
  const response = await fetchWithRetry(
    `${url}&country=${country}`,
    { timeoutMs: Math.max(250, Math.min(8_000, remaining)), rateLimitWaits: 0 },
    1
  )
  if (!response.ok) throw new Error(`Fast music catalogue returned HTTP ${response.status}`)
  const payload = await response.json() as { results?: unknown }
  if (!Array.isArray(payload.results)) throw new Error('Fast music catalogue returned invalid data')
  return payload.results.filter((row): row is ItunesResult => !!row && typeof row === 'object')
}

function candidateId(key: string, expected: SpotifyEntityKind): number {
  const match = key.match(new RegExp(`^itunes:${expected}:(\\d+)$`))
  if (!match) throw new Error('That catalogue candidate expired; search again')
  return Number(match[1])
}

export async function findEntityCandidates(
  input: SpotifyEntityRef & { query?: string }
): Promise<SpotifyEntityCandidate[]> {
  const current = spotifyRepo.getEntity(input.kind, input.entityId)
  if (!current) throw new Error(`That local ${input.kind} no longer exists`)
  const query = input.query?.trim() || (input.kind === 'artist'
    ? current.name
    : `${current.artistName ?? ''} ${spotifyRepo.stripAlbumYearPrefix(current.name)}`)
  const entity = input.kind === 'artist' ? 'musicArtist' : 'album'
  const rows = await itunesResults(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=${entity}&limit=12`
  )
  const targetName = spotifyRepo.normalizeSpotifyMatch(
    input.kind === 'album' ? spotifyRepo.stripAlbumYearPrefix(current.name) : current.name
  )
  const targetArtist = spotifyRepo.normalizeSpotifyMatch(current.artistName ?? current.name)
  const seen = new Set<number>()
  return rows.flatMap((row): SpotifyEntityCandidate[] => {
    const id = input.kind === 'artist' ? row.artistId : row.collectionId
    const name = input.kind === 'artist' ? row.artistName : row.collectionName
    if (!Number.isInteger(id) || !name || seen.has(id!)) return []
    seen.add(id!)
    const artist = row.artistName ?? ''
    const exact = input.kind === 'artist'
      ? spotifyRepo.normalizeSpotifyMatch(name) === targetName
      : spotifyRepo.normalizeSpotifyMatch(name) === targetName &&
        spotifyRepo.normalizeSpotifyMatch(artist) === targetArtist
    return [{
      candidateKey: `itunes:${input.kind}:${id}`,
      name,
      secondary: input.kind === 'artist' ? row.primaryGenreName ?? null : artist || null,
      year: row.releaseDate ? Number(row.releaseDate.slice(0, 4)) || null : null,
      exact
    }]
  }).sort((a, b) => Number(b.exact) - Number(a.exact) || (b.year ?? 0) - (a.year ?? 0))
}

export function itunesRelease(
  collection: ItunesResult,
  tracks: ItunesResult[]
): spotifyRepo.IndexedEntityRelease | null {
  if (!collection.collectionId || !collection.collectionName || !collection.artistName) return null
  const songs = tracks.filter((track) =>
    track.wrapperType === 'track' && track.kind === 'song' &&
    track.collectionId === collection.collectionId && track.trackId && track.trackName
  )
  if (!songs.length) return null
  if (typeof collection.trackCount === 'number' && songs.length !== collection.trackCount) {
    throw new Error(`Incomplete catalogue for ${collection.collectionName}: ${songs.length}/${collection.trackCount} tracks`)
  }
  return {
    expectedTracks: collection.trackCount ?? songs.length,
    tracksLoaded: true,
    providerReleaseId: String(collection.collectionId),
    title: collection.collectionName,
    albumArtist: collection.artistName,
    year: collection.releaseDate ? Number(collection.releaseDate.slice(0, 4)) || null : null,
    albumType: (collection.trackCount ?? songs.length) <= 3 ? 'single' : 'album',
    tracks: songs.map((track) => ({
      providerTrackId: String(track.trackId),
      title: track.trackName!,
      artists: [track.artistName ?? collection.artistName!],
      primaryArtist: track.artistName ?? collection.artistName!,
      albumTitle: collection.collectionName!,
      duration: typeof track.trackTimeMillis === 'number' ? track.trackTimeMillis / 1000 : null,
      discNo: track.discNumber ?? null,
      trackNo: track.trackNumber ?? null
    }))
  }
}

async function fetchItunesSnapshot(
  input: SpotifyEntityInspectInput,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  candidateKey: string
): Promise<{ providerEntityId: string; sourceName: string; releases: spotifyRepo.IndexedEntityRelease[] }> {
  const deadline = Date.now() + 25_000
  const id = candidateId(candidateKey, input.kind)
  if (input.kind === 'album') {
    const rows = await itunesResults(
      `https://itunes.apple.com/lookup?id=${id}&entity=song&limit=200`,
      deadline
    )
    const collection = rows.find((row) => row.wrapperType === 'collection' && row.collectionId === id)
    const release = collection ? itunesRelease(collection, rows) : null
    if (!release) throw new Error('The fast catalogue did not return tracks for that album')
    return { providerEntityId: String(id), sourceName: collection!.artistName ?? current.artistName ?? current.name, releases: [release] }
  }

  const rows = await itunesResults(
    `https://itunes.apple.com/lookup?id=${id}&entity=album&limit=200`,
    deadline
  )
  const artist = rows.find((row) => row.wrapperType === 'artist' && row.artistId === id)
  const same = spotifyRepo.normalizeSpotifyMatch
  const collections = rows.filter((row) =>
    row.wrapperType === 'collection' && row.collectionId && row.collectionName &&
    same(row.artistName ?? '') === same(artist?.artistName ?? current.name)
  )
  if (!collections.length) throw new Error('The fast catalogue did not return albums for that artist')
  // Show release headers immediately. Tracklists are fetched only when selected or opened.
  const releases: spotifyRepo.IndexedEntityRelease[] = collections.map((collection) => ({
    providerReleaseId: String(collection.collectionId), title: collection.collectionName!,
    albumArtist: collection.artistName!, year: Number(collection.releaseDate?.slice(0, 4)) || null,
    albumType: (collection.trackCount ?? 0) <= 3 ? 'single' : 'album',
    expectedTracks: collection.trackCount ?? null, tracksLoaded: false, tracks: []
  }))
  if (!releases.length) throw new Error('The fast catalogue did not return usable album tracks')
  const unique = new Map<string, spotifyRepo.IndexedEntityRelease>()
  for (const release of releases) {
    const key = `${spotifyRepo.normalizeSpotifyMatch(release.title)}:${release.year ?? ''}:${release.tracks.length}`
    if (!unique.has(key)) unique.set(key, release)
  }
  return {
    providerEntityId: String(id),
    sourceName: artist?.artistName ?? current.name,
    releases: [...unique.values()].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title))
  }
}

function snapshotInspection(snapshot: spotifyRepo.EntitySnapshotRow): SpotifyEntityInspection {
  const current = spotifyRepo.getEntity(snapshot.kind, snapshot.entityId)
  if (!current) throw new Error(`That local ${snapshot.kind} no longer exists`)
  const releases: SpotifyReleasePreview[] = snapshot.releases.map((release) => {
    const missing = release.tracks.filter((track) => track.matchedTrackId == null)
    const duration = release.tracks.reduce((sum, track) => sum + (track.duration ?? 0), 0)
    return {
      releaseId: release.id,
      spotifyAlbumId: release.spotifyAlbumId,
      spotifyUrl: release.spotifyAlbumId
        ? `https://open.spotify.com/album/${release.spotifyAlbumId}`
        : null,
      title: release.title,
      albumArtist: release.albumArtist,
      year: release.year,
      albumType: release.albumType,
      tracksLoaded: release.tracksLoaded,
      trackCount: release.tracksLoaded ? release.tracks.length : release.expectedTracks ?? 0,
      localCount: release.tracks.length - missing.length,
      missingCount: release.tracksLoaded ? missing.length : release.expectedTracks ?? 0,
      duration,
      estimatedBytes: estimateSpotifyDownloadBytes(release.tracks),
      missingDuration: missing.reduce((sum, track) => sum + (track.duration ?? 0), 0),
      missingEstimatedBytes: estimateSpotifyDownloadBytes(missing),
      preselected: true,
      metadataState: release.metadataState,
      resolutionError: release.resolutionError
    }
  })
  const sourceUrl = snapshot.spotifyId
    ? `https://open.spotify.com/${snapshot.kind}/${snapshot.spotifyId}`
    : null
  const mismatchMessage = mismatchFor(
    { kind: snapshot.kind, entityId: snapshot.entityId },
    current,
    snapshot.sourceName,
    releases
  )
  return {
    snapshotId: snapshot.id,
    kind: snapshot.kind,
    entityId: snapshot.entityId,
    sourceId: snapshot.spotifyId,
    sourceUrl,
    sourceName: snapshot.sourceName,
    provider: snapshot.provider,
    refreshedAt: snapshot.refreshedAt,
    catalogueState: snapshot.catalogueState,
    catalogueCountry: snapshot.catalogueCountry,
    matchesCurrentEntity: mismatchMessage == null,
    mismatchMessage,
    duplicateCount: 0,
    skippedCount: 0,
    releases
  }
}

let counter = 0
type MusicProcess = { id: string; proc: ChildProcessWithoutNullStreams; cancelled: boolean; owner: string }
let active: MusicProcess | null = null
const activeProcesses = new Set<MusicProcess>()
let status: MusicDownloadEvent | null = null
const SPOTDL_METADATA_STALL_MS = 5 * 60_000
// A large playlist can go completely quiet after printing "Found N songs"
// while its worker pool is still fetching and serializing every track. Five
// minutes produced repeatable false failures on a healthy 100-track import.
// Rate-limit lines are handled immediately and the task remains cancellable.
// Before the count is known use this conservative floor; after "Found N" the
// allowance scales in 100-track blocks because spotDL emits no intermediate
// checkpoints while rebuilding every Spotify track object.
export const SPOTDL_PLAYLIST_METADATA_STALL_MS = 30 * 60_000
export const SPOTDL_PLAYLIST_METADATA_MAX_STALL_MS = 8 * 60 * 60_000
const SPOTDL_AUDIO_STALL_MS = 10 * 60_000
const abandonedRuns = new Set<string>()
let inspectionPromise: Promise<SpotifyEntityInspection> | null = null
let inspectionCancelled = false
const inspectionStatus: SpotifyEntityInspectionStatus = {
  running: false,
  jobId: null,
  kind: null,
  entityId: null,
  phase: 'idle',
  message: null,
  foundCount: null,
  cancelled: false,
  startedAt: null,
  elapsedMs: 0,
  provider: null
}

function processTreeTarget(proc: ChildProcessWithoutNullStreams): Killable {
  return {
    get exitCode() {
      return proc.exitCode
    },
    pid: proc.pid,
    kill: (signal) => {
      // spotDL starts yt-dlp and ffmpeg descendants. On POSIX it is spawned as
      // its own process group so pause/cancel/quit reaches the complete tree.
      if (process.platform !== 'win32' && proc.pid != null) {
        process.kill(-proc.pid, signal)
        return true
      }
      return proc.kill(signal)
    }
  }
}

function activeProcessTarget(id?: string): Killable | null {
  if (!active || (id != null && active.id !== id)) return null
  return processTreeTarget(active.proc)
}

function cancelMusicProcesses(id?: string, killAfterMs = 5000): void {
  for (const entry of activeProcesses) {
    if (id != null && entry.id !== id) continue
    entry.cancelled = true
    // Capture each process separately: Windows needs one taskkill /T per PID.
    processControls(() => processTreeTarget(entry.proc), { killAfterMs }).cancel?.()
  }
}

async function discoverIdentityBounded(
  input: SpotifyEntityInspectInput,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  dir: string
): Promise<ParsedSpotifyUrl | null> {
  if (input.url || current.spotifyId) return null
  const queries = current.sampleTracks.slice(0, 3)
    .map((sample) => buildSpotifyDiscoveryQuery(sample.artist, sample.title))
  if (!queries.length) return null
  const file = join(dir, 'fast-identity.spotdl')
  const jobId = `${inspectionStatus.jobId ?? 'spotify-inspect'}-identity`
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    cancelMusicProcesses(jobId, 500)
  }, 6_000)
  timer.unref()
  try {
    const code = await runSpotdl(
      ['save', ...queries, '--threads', '8', '--save-file', file],
      `Spotify inspection ${input.kind}:${input.entityId}`,
      undefined,
      jobId
    )
    if (timedOut || inspectionCancelled || code !== 0) return null
    return pickConsensusDiscoveredEntity(
      input.kind,
      current,
      validateSpotdlPayload(JSON.parse(readFileSync(file, 'utf8')) as unknown).songs
    )
  } catch (error) {
    if (!inspectionCancelled) {
      logWarn('proc', `bounded Spotify identity lookup failed: ${error instanceof Error ? error.message : String(error)}`)
    }
    return null
  } finally {
    clearTimeout(timer)
  }
}

export function getInspectionStatus(): SpotifyEntityInspectionStatus {
  return {
    ...inspectionStatus,
    elapsedMs: inspectionStatus.running && inspectionStatus.startedAt
      ? Date.now() - inspectionStatus.startedAt
      : inspectionStatus.elapsedMs
  }
}

export function entityState(input: SpotifyEntityRef): SpotifyEntityState {
  if (inspectionStatus.running && inspectionStatus.kind === input.kind && inspectionStatus.entityId === input.entityId) {
    return { state: 'building', inspection: null, jobId: inspectionStatus.jobId!, error: null }
  }
  const snapshot = spotifyRepo.getEntitySnapshot(input.kind, input.entityId)
  if (snapshot) return { state: 'ready', inspection: snapshotInspection(snapshot), jobId: null, error: null }
  if (inspectionStatus.phase === 'error' && inspectionStatus.kind === input.kind && inspectionStatus.entityId === input.entityId) {
    return { state: 'error', inspection: null, jobId: null, error: inspectionStatus.message ?? 'Spotify catalogue failed' }
  }
  return { state: 'empty', inspection: null, jobId: null, error: null }
}

export function parseSpotdlInspectionLine(line: string): { foundCount: number; message: string } | null {
  const found = line.match(/Found\s+(\d+)\s+songs?\s+in\s+(.+?)(?:\s+\([^)]+\))?\s*$/i)
  if (!found) return null
  const foundCount = Number(found[1])
  const stallMs = spotifyPlaylistMetadataStallMs(foundCount)
  return {
    foundCount,
    message: `Found ${found[1]} tracks; resolving Spotify metadata with 8 workers. spotDL may be quiet for up to ${formatPlaylistWait(stallMs)}.`
  }
}

export function spotifyPlaylistMetadataStallMs(trackCount: number): number {
  if (!Number.isFinite(trackCount) || trackCount <= 0) return SPOTDL_PLAYLIST_METADATA_STALL_MS
  const blocks = Math.max(1, Math.ceil(trackCount / 100))
  return Math.min(
    SPOTDL_PLAYLIST_METADATA_MAX_STALL_MS,
    blocks * SPOTDL_PLAYLIST_METADATA_STALL_MS
  )
}

function formatPlaylistWait(ms: number): string {
  const minutes = Math.round(ms / 60_000)
  if (minutes < 60) return `${minutes} minutes`
  const hours = minutes / 60
  return `${hours} hour${hours === 1 ? '' : 's'}`
}

export function completeSpotdlPlaylistSnapshot(payload: unknown, expectedCount: number | null): boolean {
  return Array.isArray(payload) && expectedCount != null && payload.length >= expectedCount
}

export function runSpotdl(
  args: string[],
  owner: string,
  onLine?: (line: string) => void,
  jobId?: string,
  spawnProcess: typeof spawn = spawn,
  stallTimeoutMs?: number,
  stallTimeoutForLine?: (line: string) => number | null,
  executable = spotdlBin()
): Promise<number> {
  claimMusicMaintenance(owner)
  const started = Date.now()
  return new Promise((resolve, reject) => {
    counter += 1
    const id = jobId ?? `spotdl-${process.pid}-${counter}`
    let proc: ChildProcessWithoutNullStreams
    try {
      // spotDL checks ffmpeg even for metadata-only `save` and `--preload`.
      // Apply the configured path to every CLI operation, not just downloads.
      const processArgs = executable === spotdlBin() && ['save', 'download'].includes(args[0]) && !args.includes('--ffmpeg') && musicToolOptions().ffmpeg !== 'ffmpeg'
        ? [...args, '--ffmpeg', musicToolOptions().ffmpeg] : args
      proc = spawnProcess(executable, processArgs, {
        detached: process.platform !== 'win32',
        env: {
          ...process.env,
          // spotDL is Python-based. Force a stable UTF-8 pipe on Windows so
          // names such as Björk do not become replacement characters in the
          // parser or the structured log.
          PYTHONUTF8: '1',
          PYTHONIOENCODING: 'utf-8'
        }
      })
    } catch (error) {
      releaseMusicMaintenance(owner)
      reject(error)
      return
    }
    const entry = { id, proc, cancelled: false, owner }
    activeProcesses.add(entry)
    active = entry
    let settled = false
    const release = () => {
      activeProcesses.delete(entry)
      if (active === entry) active = [...activeProcesses].at(-1) ?? null
      releaseMusicMaintenance(owner)
    }
    let stalled = false
    let stalledAfterMs: number | null = null
    let rateLimitWaitSec: number | null = null
    let stallTimer: NodeJS.Timeout | null = null
    let currentStallTimeoutMs = stallTimeoutMs
    const clearStallTimer = (): void => {
      if (stallTimer) clearTimeout(stallTimer)
      stallTimer = null
    }
    const armStallTimer = (): void => {
      clearStallTimer()
      if (!currentStallTimeoutMs) return
      stallTimer = setTimeout(() => {
        if (!activeProcesses.has(entry)) return
        stalled = true
        stalledAfterMs = currentStallTimeoutMs ?? null
        entry.cancelled = true
        processControls(() => processTreeTarget(proc), { killAfterMs: 1_000 }).cancel?.()
      }, currentStallTimeoutMs)
      stallTimer.unref()
    }
    const taskSignal = currentActivitySignal()
    const abortFromTask = (): void => {
      if (!activeProcesses.has(entry)) return
      entry.cancelled = true
      processControls(() => processTreeTarget(proc)).cancel?.()
    }
    if (taskSignal?.aborted) abortFromTask()
    else taskSignal?.addEventListener('abort', abortFromTask, { once: true })
    const cleanup = (): void => {
      clearStallTimer()
      taskSignal?.removeEventListener('abort', abortFromTask)
    }
    const handleLine = onLine ?? (() => undefined)
    const observeLine = (line: string): void => {
      if (abandonedRuns.has(id)) return
      const adjustedTimeout = stallTimeoutForLine?.(line)
      if (adjustedTimeout != null && Number.isFinite(adjustedTimeout) && adjustedTimeout > 0) {
        currentStallTimeoutMs = adjustedTimeout
      }
      armStallTimer()
      handleLine(line)
      const wait = parseSpotdlRateLimitWait(line)
      if (wait != null && wait >= 300 && activeProcesses.has(entry)) {
        rateLimitWaitSec = wait
        entry.cancelled = true
        processControls(() => processTreeTarget(proc), { killAfterMs: 1_000 }).cancel?.()
      }
    }
    armStallTimer()
    pipeProcLines(proc, { tool: executable === musicToolOptions().ytdlp ? 'ytdlp' : 'spotdl', onStdout: observeLine, onStderr: observeLine, logStdout: !args.some((arg) => ['--dump-json', '--dump-single-json'].includes(arg)) })
    proc.once('error', (error) => {
      if (settled) return
      settled = true
      cleanup()
      release()
      reject(new Error(`Could not run ${executable}; install ${executable === musicToolOptions().ytdlp ? 'yt-dlp' : 'spotDL'} or set its path in Settings (${error.message})`))
    })
    proc.once('close', (code) => {
      if (settled) return
      settled = true
      const resultFile = args[0] === 'download' ? args[args.indexOf('--save-file') + 1] : null
      if (!abandonedRuns.has(id) && resultFile && args.includes('--save-file')) {
        try { spotifyRepo.retainResolvedAudioUrls(JSON.parse(readFileSync(resultFile, 'utf8'))) }
        catch { /* cancellation can precede the downloader's result file */ }
      }
      logInfo('proc', `Spotify ${args[0]} process finished in ${Date.now() - started}ms (exit ${code})`)
      cleanup()
      release()
      if (rateLimitWaitSec != null) {
        const hours = Math.max(1, Math.ceil(rateLimitWaitSec / 3600))
        reject(new Error(
          `spotDL's Spotify metadata provider is rate-limited for about ${hours} hour${hours === 1 ? '' : 's'}. NaviHUB stopped the wait; retry after updating spotDL or when the provider limit clears.`
        ))
      } else if (stalled) {
        reject(new Error(
          `spotDL stopped responding to NaviHUB (no output for ${formatPlaylistWait(stalledAfterMs ?? SPOTDL_METADATA_STALL_MS)}), so NaviHUB stopped it. Retry or check spotDL and yt-dlp in Settings.`
        ))
      } else {
        resolve(code ?? 1)
      }
    })
  })
}

async function inspectWithSpotdl(
  input: SpotifyEntityInspectInput,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  dir: string
): Promise<SpotifyEntityInspection> {
  let parsed: ParsedSpotifyUrl
  const suppliedUrl = input.url?.trim() || (current.spotifyId
    ? `https://open.spotify.com/${input.kind}/${current.spotifyId}`
    : '')
  if (suppliedUrl) {
    parsed = await resolveEntityUrl(suppliedUrl, input.kind)
  } else {
    inspectionStatus.message = 'Finding the Spotify source from representative local tracks'
    const discoveryFile = join(dir, 'discovery.spotdl')
    const queries = current.sampleTracks.slice(0, 3)
      .map((sample) => buildSpotifyDiscoveryQuery(sample.artist, sample.title))
    if (!queries.length) {
      throw new Error(
        `The fast catalogue could not identify this ${input.kind}. Use Advanced source replacement to paste its Spotify link.`
      )
    }
    const discoveryCode = await runSpotdl(
      ['save', ...queries, '--threads', '8', '--save-file', discoveryFile],
      `Spotify inspection ${input.kind}:${input.entityId}`,
      undefined,
      undefined,
      undefined,
      SPOTDL_METADATA_STALL_MS
    )
    if (inspectionCancelled) throw new tasks.TaskCancelledError('Spotify inspection')
    if (discoveryCode !== 0) throw new Error('NaviHUB could not identify this music on Spotify')
    const discoveryPayload = JSON.parse(readFileSync(discoveryFile, 'utf8')) as unknown
    parsed = pickDiscoveredEntity(input.kind, current, validateSpotdlPayload(discoveryPayload).songs) ??
      (() => { throw new Error(`NaviHUB could not identify the matching Spotify ${input.kind}`) })()
  }

  Object.assign(inspectionStatus, {
    phase: 'spotifyFallback' as const,
    provider: 'spotdl' as const,
    message: 'Fast catalogue unavailable; using spotDL fallback. This may take several minutes.'
  })
  const saveFile = join(dir, `${input.kind}.spotdl`)
  const code = await runSpotdl(
    buildSpotdlSaveArgs(parsed.canonicalUrl, saveFile),
    `Spotify inspection ${input.kind}:${input.entityId}`,
    (line) => {
      const event = parseSpotdlInspectionLine(line)
      if (event) Object.assign(inspectionStatus, event)
    },
    undefined,
    undefined,
    SPOTDL_METADATA_STALL_MS
  )
  if (inspectionCancelled) throw new tasks.TaskCancelledError('Spotify inspection')
  if (code !== 0) throw new Error(`spotDL could not read that ${input.kind}. It may be inaccessible.`)
  const validated = validateSpotdlPayload(JSON.parse(readFileSync(saveFile, 'utf8')) as unknown)
  let songs = input.kind === 'album'
    ? validated.songs.filter((song) => song.spotifyAlbumId === parsed.spotifyId)
    : validated.songs.filter((song) => ['album', 'single'].includes(song.albumType ?? ''))
  if (!songs.length) throw new Error(`No downloadable albums or singles were found for that ${input.kind}`)
  const sourceName = input.kind === 'album'
    ? songs[0].albumArtist ?? songs[0].primaryArtist
    : (() => {
        for (const song of songs) {
          const index = song.spotifyArtistIds.indexOf(parsed.spotifyId)
          if (index >= 0 && song.artists[index]) return song.artists[index]
        }
        return songs[0].primaryArtist
      })()
  if (input.kind === 'artist') {
    songs = songs.filter((song) =>
      spotifyRepo.normalizeSpotifyMatch(song.albumArtist ?? song.primaryArtist) ===
      spotifyRepo.normalizeSpotifyMatch(sourceName)
    )
  }
  const grouped = new Map<string, spotifyRepo.SpotdlSong[]>()
  for (const song of songs) {
    if (!song.spotifyAlbumId) continue
    const rows = grouped.get(song.spotifyAlbumId) ?? []
    rows.push(song)
    grouped.set(song.spotifyAlbumId, rows)
  }
  if (!grouped.size) throw new Error('spotDL metadata did not include stable Spotify album IDs')
  const snapshotId = spotifyRepo.saveEntitySnapshot({
    kind: input.kind,
    entityId: input.entityId,
    provider: 'spotdl',
    providerEntityId: parsed.spotifyId,
    sourceName,
    releases: [...grouped].map(([albumId, tracks]) => ({
      providerReleaseId: albumId,
      title: tracks[0].albumTitle,
      albumArtist: tracks[0].albumArtist ?? tracks[0].primaryArtist,
      year: tracks[0].year,
      albumType: tracks[0].albumType === 'single' ? 'single' : 'album',
      tracks: tracks.map((song) => ({
        providerTrackId: song.spotifyTrackId,
        title: song.title,
        artists: song.artists,
        primaryArtist: song.primaryArtist,
        albumTitle: song.albumTitle,
        duration: song.duration,
        discNo: song.discNo,
        trackNo: song.trackNo
      }))
    }))
  })
  const saved = spotifyRepo.getEntitySnapshot(input.kind, input.entityId)!
  for (const release of saved.releases) {
    const releaseSongs = grouped.get(release.providerReleaseId)
    if (releaseSongs) spotifyRepo.resolveEntityRelease(release.id, releaseSongs)
  }
  const result = snapshotInspection(spotifyRepo.getEntitySnapshot(input.kind, input.entityId)!)
  if (result.matchesCurrentEntity) spotifyRepo.rememberEntitySource(input.kind, input.entityId, parsed.spotifyId)
  return snapshotInspection(spotifyRepo.getEntitySnapshot(input.kind, input.entityId)!)
}

export async function inspectEntity(input: SpotifyEntityInspectInput): Promise<SpotifyEntityInspection> {
  const current = spotifyRepo.getEntity(input.kind, input.entityId)
  if (!current) throw new Error(`That local ${input.kind} no longer exists`)
  const saved = spotifyRepo.getEntitySnapshot(input.kind, input.entityId)
  if (saved && !input.refresh && !input.url && !input.candidateKey) return snapshotInspection(saved)
  if (inspectionStatus.running) {
    if (inspectionStatus.kind === input.kind && inspectionStatus.entityId === input.entityId && inspectionPromise) {
      return inspectionPromise
    }
    throw new Error(`Music metadata is busy with ${inspectionStatus.kind ?? 'another'} inspection. Open Tasks to manage it.`)
  }
  const maintenance = musicMaintenanceOwner()
  if (maintenance) throw new Error(`Music maintenance is busy: ${maintenance}. Open Tasks to manage it.`)
  counter += 1
  const jobId = `spotify-inspect-${process.pid}-${counter}`
  Object.assign(inspectionStatus, {
    running: true,
    jobId,
    kind: input.kind,
    entityId: input.entityId,
    phase: 'candidateSearch',
    message: 'Finding a fast catalogue match',
    foundCount: null,
    cancelled: false,
    startedAt: Date.now(),
    elapsedMs: 0,
    provider: null
  })
  inspectionCancelled = false
  const route = `/music/${input.kind === 'artist' ? 'artists' : 'albums'}/${input.entityId}`
  const handle = tasks.create({
    kind: 'musicMetadata',
    label: `Prepare ${input.kind} catalogue`,
    route,
    controls: { cancel: () => cancelInspection(jobId), pauseNote: 'Catalogue lookup cannot be paused' },
    project: () => inspectionStatus.jobId === jobId ? {
      state: inspectionStatus.phase === 'cancelling' ? 'cancelling' : 'running',
      detail: inspectionStatus.message,
      done: inspectionStatus.foundCount ?? 0,
      total: 0,
      error: inspectionStatus.phase === 'error' ? inspectionStatus.message : null
    } : null
  })
  const dir = mkdtempSync(join(tmpdir(), 'navihub-spotify-inspect-'))
  inspectionPromise = (async () => {
    const started = Date.now()
    try {
      let candidateKey = input.candidateKey
      if (!candidateKey && !input.url) {
        try {
          const candidates = await findEntityCandidates(input)
          const exact = candidates.filter((candidate) => candidate.exact)
          if (exact.length === 1) candidateKey = exact[0].candidateKey
          else if (candidates.length > 0) throw new Error('Choose the matching catalogue source')
        } catch (error) {
          if (error instanceof Error && error.message === 'Choose the matching catalogue source') throw error
          logWarn('proc', `fast music candidate search failed; falling back to spotDL: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      if (candidateKey && !input.url) {
        Object.assign(inspectionStatus, {
          phase: 'catalogue' as const,
          provider: 'itunes' as const,
          message: 'Reading albums and tracklists from the fast catalogue'
        })
        const identityPromise = discoverIdentityBounded(input, current, dir)
        try {
          const indexed = await fetchItunesSnapshot(input, current, candidateKey)
          const identity = await identityPromise
          if (inspectionCancelled) throw new tasks.TaskCancelledError('Spotify inspection')
          spotifyRepo.saveEntitySnapshot({
            kind: input.kind,
            entityId: input.entityId,
            provider: 'itunes',
            providerEntityId: indexed.providerEntityId,
            sourceName: indexed.sourceName,
            releases: indexed.releases,
            catalogueState: input.kind === 'artist' ? 'partial' : 'complete',
            catalogueCountry: catalogueCountry()
          })
          Object.assign(inspectionStatus, {
            phase: 'matching' as const,
            message: 'Comparing the saved catalogue with your local library',
            foundCount: indexed.releases.reduce((sum, release) => sum + release.tracks.length, 0)
          })
          const result = snapshotInspection(spotifyRepo.getEntitySnapshot(input.kind, input.entityId)!)
          if (identity && result.matchesCurrentEntity) {
            try {
              spotifyRepo.rememberEntitySource(input.kind, input.entityId, identity.spotifyId)
            } catch (error) {
              logWarn('proc', `Spotify identity was already linked elsewhere: ${error instanceof Error ? error.message : String(error)}`)
            }
          }
          logInfo('proc', `Spotify ${input.kind} fast catalogue ready in ${Date.now() - started}ms (${result.releases.length} releases)`)
          return snapshotInspection(spotifyRepo.getEntitySnapshot(input.kind, input.entityId)!)
        } catch (error) {
          await identityPromise
          if (error instanceof tasks.TaskCancelledError) throw error
          logWarn('proc', `fast music catalogue failed; falling back to spotDL: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      return await inspectWithSpotdl(input, current, dir)
    } catch (error) {
      if (inspectionCancelled || error instanceof tasks.TaskCancelledError) {
        handle.settle({ state: 'cancelled' })
        throw new tasks.TaskCancelledError('Spotify inspection')
      }
      Object.assign(inspectionStatus, {
        phase: 'error' as const,
        message: error instanceof Error ? error.message : String(error)
      })
      handle.settle({ state: 'error', error: inspectionStatus.message })
      throw error
    } finally {
      inspectionStatus.elapsedMs = Date.now() - (inspectionStatus.startedAt ?? Date.now())
      inspectionStatus.running = false
      if (inspectionStatus.phase !== 'error' && !inspectionCancelled) inspectionStatus.phase = 'done'
      if (!inspectionCancelled && inspectionStatus.phase === 'done') handle.settle({ state: 'done' })
      rmSync(dir, { recursive: true, force: true })
      inspectionPromise = null
    }
  })()
  return inspectionPromise
}

export function cancelInspection(jobId?: string): void {
  if (!inspectionStatus.running) return
  if (jobId && inspectionStatus.jobId !== jobId) return
  inspectionCancelled = true
  inspectionStatus.cancelled = true
  inspectionStatus.phase = 'cancelling'
  inspectionStatus.message = 'Cancelling Spotify inspection'
  if (active?.owner.startsWith('Spotify inspection ')) {
    active.cancelled = true
    cancelMusicProcesses()
  }
}

export function forgetEntitySource(input: { kind: SpotifyEntityKind; entityId: number }): void {
  spotifyRepo.forgetEntitySource(input.kind, input.entityId)
}

export async function importPlaylist(url: string, refresh = false): Promise<SpotifyImportResult> {
  updateActivity({
    phase: 'fetching',
    detail: 'Reading the public playlist with spotDL',
    done: 0,
    total: 0
  })
  const parsed = await resolvePlaylistUrl(url)
  const existing = spotifyRepo.findPlaylistBySpotifyId(parsed.spotifyId)
  if (existing != null && !refresh) {
    const counts = spotifyRepo.spotifyPlaylistCounts(existing)
    return {
      playlistId: existing,
      existing: true,
      title: counts.title,
      imported: counts.total,
      matched: counts.matched,
      missing: counts.total - counts.matched,
      duplicates: 0,
      skipped: 0
    }
  }
  const dir = mkdtempSync(join(tmpdir(), 'navihub-spotify-'))
  const saveFile = join(dir, 'playlist.spotdl')
  try {
    let foundCount: number | null = null
    let code = 1
    let runError: unknown = null
    try {
      const python = await metadataPython()
      if (python) {
        const script = join(dir, 'metadata.py')
        writeFileSync(script, metadataAdapter, { mode: 0o600 })
        const checkpoint = join(app.getPath('userData'), 'spotify-metadata', `${parsed.spotifyId}.jsonl`)
        code = await runSpotdl(
          [script, parsed.canonicalUrl, saveFile, checkpoint, refresh ? 'refresh' : 'resume'],
          'Spotify import', (line) => {
            const count = parseSpotdlInspectionLine(line)
            if (count) foundCount = count.foundCount
            const progress = line.match(/^NAVIHUB (pages|metadata) (\d+)\/(\d+)$/)
            if (progress) updateActivity({ detail: progress[1] === 'pages' ? 'Reading playlist pages' : 'Resolving tracks; progress saved for retry', done: Number(progress[2]), total: Number(progress[3]) })
          }, undefined, spawn, SPOTDL_METADATA_STALL_MS, undefined, python
        )
        if (code !== 0 && code !== 78) throw new Error('Playlist metadata interrupted. Retry resumes the saved checkpoint; your existing playlist was kept.')
      }
      if (!python || code === 78) code = await runSpotdl(
        buildSpotdlSaveArgs(parsed.canonicalUrl, saveFile),
        'Spotify import',
        (line) => {
          const event = parseSpotdlInspectionLine(line)
          if (event) {
            foundCount = event.foundCount
            updateActivity({ detail: event.message, done: 0, total: 0 })
          }
        },
        undefined,
        undefined,
        SPOTDL_PLAYLIST_METADATA_STALL_MS,
        (line) => {
          const event = parseSpotdlInspectionLine(line)
          return event ? spotifyPlaylistMetadataStallMs(event.foundCount) : null
        }
      )
    } catch (error) {
      runError = error
    }
    updateActivity({ phase: 'fetching', detail: 'Validating the playlist snapshot', done: 0, total: 0 })
    let payload: unknown
    try {
      payload = JSON.parse(readFileSync(saveFile, 'utf8'))
    } catch {
      if (runError) throw runError
      if (code !== 0) {
        throw new Error('spotDL could not read that playlist. It may be private or inaccessible.')
      }
      throw new Error('spotDL returned an invalid playlist file')
    }
    if (runError || code !== 0) {
      if (!completeSpotdlPlaylistSnapshot(payload, foundCount)) {
        if (runError) throw runError
        throw new Error('spotDL could not read that playlist. It may be private or inaccessible.')
      }
      logWarn(
        'proc',
        `spotDL exited after writing all ${foundCount} playlist tracks; continuing with the complete saved snapshot`
      )
    }
    assertPlaylistSnapshotComplete(payload, foundCount)
    const validated = validateSpotdlPayload(payload)
    if (validated.songs.length === 0) {
      throw new Error('No importable songs were found. The playlist may be private or unavailable.')
    }
    const covers = await downloadImages(validated.songs.map((song) => song.coverUrl))
    updateActivity({
      phase: 'writing',
      detail: `Matching and saving ${validated.songs.length} tracks`,
      done: validated.songs.length,
      total: validated.songs.length
    })
    const created = spotifyRepo.createSpotifyPlaylist({
      playlistId: refresh ? existing ?? undefined : undefined,
      complete: foundCount != null,
      spotifyId: parsed.spotifyId,
      sourceUrl: parsed.canonicalUrl,
      title: validated.title,
      songs: validated.songs.map((song) => ({
        ...song,
        coverPath: song.coverUrl ? (covers.get(song.coverUrl) ?? null) : null
      }))
    })
    rmSync(join(app.getPath('userData'), 'spotify-metadata', `${parsed.spotifyId}.jsonl`), { force: true })
    return {
      playlistId: created.playlistId,
      existing: false,
      title: validated.title,
      imported: validated.songs.length,
      matched: created.matched,
      missing: validated.songs.length - created.matched,
      duplicates: validated.duplicates,
      skipped: validated.skipped
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const DOWNLOAD_STATE: Record<MusicDownloadEvent['status'], TaskState> = {
  starting: 'running',
  resolving: 'running',
  downloading: 'running',
  processing: 'running',
  pausing: 'pausing',
  paused: 'paused',
  cancelling: 'cancelling',
  done: 'done',
  error: 'error',
  cancelled: 'cancelled'
}

export function getStatus(): MusicDownloadEvent | null {
  return status ? { ...status } : null
}

export function clearStatus(): void {
  if (!active && !queueRun) status = null
}

export function startPlaylistDownload(input: SpotifyDownloadInput): { id: string } {
  const queued = addPlaylistDownloadQueue(input)
  if (queued.jobId == null) throw new Error('There are no selected missing songs to download')
  const result = startDownloadQueue({ jobId: queued.jobId })
  if (result.id == null) throw new Error('There are no selected missing songs to download')
  return { id: result.id }
}

export function settleSpotifyBatch(input: {
  cancelled: boolean
  resolved: number
  total: number
}): Pick<MusicDownloadEvent, 'status' | 'percent' | 'message' | 'resolvedCount' | 'failedCount'> {
  const failed = Math.max(0, input.total - input.resolved)
  if (input.cancelled) {
    return {
      status: 'cancelled',
      percent: input.total ? Math.round((input.resolved / input.total) * 100) : 0,
      message: 'Download cancelled; completed files were kept and scanned',
      resolvedCount: input.resolved,
      failedCount: failed
    }
  }
  if (input.resolved === 0) {
    return {
      status: 'error',
      percent: 0,
      message: 'No songs were downloaded. Check spotDL, yt-dlp, and ffmpeg in Settings.',
      resolvedCount: 0,
      failedCount: failed
    }
  }
  return {
    status: 'done',
    percent: 100,
    message: failed ? `${failed} song(s) remain available to retry` : null,
    resolvedCount: input.resolved,
    failedCount: failed
  }
}

interface SpotifyRunControl {
  id: string
  owner: string
  intent: 'running' | 'pause' | 'cancel'
  active: boolean
}

export function startEntityDownload(input: SpotifyEntityDownloadInput): { id: string | null } {
  const snapshot = spotifyRepo.getEntitySnapshotById(input.snapshotId)
  if (!snapshot) throw new Error('This saved catalogue no longer exists')
  if (!snapshotInspection(snapshot).matchesCurrentEntity && !input.allowMismatch) throw new Error('Confirm the source mismatch before downloading')
  const queued = spotifyRepo.addEntityToDownloadQueue(input)
  return queued.jobId == null ? { id: null } : startDownloadQueue({ jobId: queued.jobId })
}

async function repairTruncatedIndexedRelease(
  snapshot: spotifyRepo.EntitySnapshotRow,
  release: spotifyRepo.EntitySnapshotRow['releases'][number]
): Promise<spotifyRepo.EntitySnapshotRow['releases'][number]> {
  if (
    snapshot.provider !== 'itunes' ||
    release.metadataState !== 'resolved' ||
    !releaseTrackNumberingIsIncomplete(release.tracks) ||
    !/^\d+$/.test(release.providerReleaseId)
  ) return release
  const collectionId = Number(release.providerReleaseId)
  const rows = await itunesResults(
    `https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=200`
  )
  const collection = rows.find((row) =>
    row.wrapperType === 'collection' && row.collectionId === collectionId
  )
  const indexed = collection ? itunesRelease(collection, rows) : null
  if (!indexed || indexed.tracks.length <= release.tracks.length) return release
  logWarn(
    'proc',
    `repairing truncated Spotify metadata for ${release.title}: ${release.tracks.length}/${indexed.tracks.length} tracks`
  )
  spotifyRepo.restoreIndexedEntityRelease(release.id, indexed)
  const repaired = spotifyRepo.getEntitySnapshotById(snapshot.id)
    ?.releases.find((item) => item.id === release.id)
  if (!repaired) throw new Error(`Could not restore the full catalogue for ${release.title}`)
  return repaired
}

class DirectReleaseDownloadRequired extends Error {
  constructor(
    readonly spotifyAlbumId: string,
    readonly missingCount: number
  ) {
    super('spotDL metadata was incomplete; downloading the canonical Spotify album directly')
  }
}

async function resolveReleaseForDownload(
  run: SpotifyRunControl,
  snapshot: spotifyRepo.EntitySnapshotRow,
  initialRelease: spotifyRepo.EntitySnapshotRow['releases'][number],
  dir: string
): Promise<spotifyRepo.EntitySnapshotRow['releases'][number]> {
  await loadReleaseTracks(snapshot.id, initialRelease.id)
  const fresh = spotifyRepo.getEntitySnapshotById(snapshot.id)?.releases.find((r) => r.id === initialRelease.id) ?? initialRelease
  const release = await repairTruncatedIndexedRelease(snapshot, fresh)
  if (release.metadataState === 'resolved' && release.tracks.every((track) => track.rawJson)) return release
  if (status?.id === run.id) {
    status.status = 'resolving'
    status.phase = 'resolvingRelease'
    status.releaseTitle = release.title
    status.message = `Resolving ${release.title} through Spotify`
  }
  let spotifyAlbumId = release.spotifyAlbumId
  if (!spotifyAlbumId) {
    const candidates = rankSpotifyReleaseDiscoveryTracks(snapshot.releases, release).slice(0, 3)
    for (let index = 0; index < candidates.length; index++) {
      const candidate = candidates[index]
      if (status?.id === run.id) {
        status.message = `Identifying ${release.title} from ${candidate.title}`
      }
      const identityFile = join(dir, `release-${release.id}-identity-${index}.spotdl`)
      const code = await runSpotdl(
        buildSpotdlSaveArgs(buildSpotifyDiscoveryQuery(release.albumArtist, candidate.title), identityFile),
        run.owner,
        undefined,
        run.id,
        undefined,
        SPOTDL_METADATA_STALL_MS
      )
      if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
      if (code !== 0) continue
      let lookup: SpotdlValidation
      try {
        lookup = validateSpotdlPayload(JSON.parse(readFileSync(identityFile, 'utf8')) as unknown)
      } catch {
        continue
      }
      spotifyAlbumId = spotifyAlbumIdFromTrackLookup(release, candidate, lookup.songs)
      if (spotifyAlbumId) break
    }
    if (!spotifyAlbumId) {
      throw new Error(`spotDL could not identify the Spotify edition for ${release.title}`)
    }
  }
  spotifyRepo.rememberEntityReleaseSpotifyAlbum(release.id, spotifyAlbumId)
  const saveFile = join(dir, `release-${release.id}.spotdl`)
  const query = `https://open.spotify.com/album/${spotifyAlbumId}`
  if (status?.id === run.id) status.message = `Loading ${release.title} from Spotify`
  const code = await runSpotdl(
    buildSpotdlSaveArgs(query, saveFile),
    run.owner,
    undefined,
    run.id,
    undefined,
    SPOTDL_METADATA_STALL_MS
  )
  if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
  if (code !== 0) throw new Error(`spotDL could not resolve ${release.title}`)
  const validated = validateSpotdlPayload(JSON.parse(readFileSync(saveFile, 'utf8')) as unknown)
  const same = spotifyRepo.normalizeSpotifyMatch
  let songs = validated.songs.filter((song) =>
    song.spotifyAlbumId === spotifyAlbumId &&
    spotifyReleaseTitlesMatch(release.title, song.albumTitle) &&
    same(song.albumArtist ?? song.primaryArtist) === same(release.albumArtist) &&
    song.albumType !== 'compilation'
  )
  let complete = completeResolvedReleaseSongs(release, songs)
  if (complete.missing.length) {
    if (status?.id === run.id) {
      status.message = `Recovering ${complete.missing.length} missing metadata track${complete.missing.length === 1 ? '' : 's'} for ${release.title}`
    }
    const recoveryFile = join(dir, `release-${release.id}-recovery.spotdl`)
    const recoveryArgs = [
      'save',
      ...complete.missing.map((track) => buildSpotifyDiscoveryQuery(release.albumArtist, track.title)),
      '--threads',
      '8',
      '--save-file',
      recoveryFile
    ]
    const recoveryCode = await runSpotdl(
      recoveryArgs,
      run.owner,
      undefined,
      run.id,
      undefined,
      SPOTDL_METADATA_STALL_MS
    )
    if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
    if (recoveryCode === 0) {
      try {
        const recoveredCandidates = validateSpotdlPayload(
          JSON.parse(readFileSync(recoveryFile, 'utf8')) as unknown
        ).songs
        const recovered = adaptRecoveredReleaseSongs(
          release,
          complete.missing,
          recoveredCandidates,
          spotifyAlbumId
        )
        const byId = new Map(songs.map((song) => [song.spotifyTrackId, song]))
        for (const song of recovered) byId.set(song.spotifyTrackId, song)
        songs = [...byId.values()]
        complete = completeResolvedReleaseSongs(release, songs)
      } catch (error) {
        logWarn('proc', `spotDL recovery metadata was invalid for ${release.title}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  }
  if (complete.missing.length) {
    // spotDL's supported CLI path can download an album URL even when its separate
    // `save` operation returns a partial payload. Keep the complete Apple catalogue
    // in the database and let the caller use the canonical URL directly; the scan
    // below remains the authority for which indexed tracks were actually acquired.
    spotifyRepo.rememberEntityReleaseSpotifyAlbum(release.id, spotifyAlbumId)
    throw new DirectReleaseDownloadRequired(spotifyAlbumId, complete.missing.length)
  }
  songs = complete.songs
  spotifyRepo.resolveEntityRelease(release.id, songs)
  spotifyRepo.linkUnambiguousSources(
    snapshot.kind === 'artist'
      ? songs[0].spotifyArtistIds[songs[0].artists.findIndex((artist) => same(artist) === same(snapshot.sourceName))] ?? null
      : null,
    [{ spotifyAlbumId, songs }]
  )
  const sourceArtistId = snapshot.kind === 'artist'
    ? songs[0].spotifyArtistIds[songs[0].artists.findIndex((artist) => same(artist) === same(snapshot.sourceName))]
    : null
  if (sourceArtistId && snapshotInspection(snapshot).matchesCurrentEntity) {
    spotifyRepo.rememberEntitySource('artist', snapshot.entityId, sourceArtistId)
  }
  const updated = spotifyRepo.getEntitySnapshotById(snapshot.id)!
  return updated.releases.find((item) => item.id === release.id)!
}

interface QueueRun extends SpotifyRunControl {
  mode: 'all' | 'single'
  targetJobId: number | null
  activeCardId: number | null
  processed: Set<number>
  needsRecoveryScan: boolean
}
let queueRun: QueueRun | null = null

export function initializeDownloadQueue(): void {
  spotifyRepo.normalizeInterruptedDownloadQueue()
}

export function getDownloadQueue(): SpotifyDownloadQueueSnapshot {
  return spotifyRepo.listDownloadQueue()
}

export async function addEntityDownloadQueue(
  input: SpotifyEntityDownloadInput
): Promise<SpotifyDownloadQueueAddResult> {
  for (const releaseId of input.releaseIds) await loadReleaseTracks(input.snapshotId, releaseId)
  const snapshot = spotifyRepo.getEntitySnapshotById(input.snapshotId)
  if (!snapshot) throw new Error('This saved catalogue no longer exists. Refresh it and try again.')
  if (!snapshotInspection(snapshot).matchesCurrentEntity && !input.allowMismatch) {
    throw new Error('Confirm the source mismatch before adding it to the queue')
  }
  return spotifyRepo.addEntityToDownloadQueue(input)
}

export function addPlaylistDownloadQueue(input: SpotifyDownloadInput): SpotifyDownloadQueueAddResult {
  return spotifyRepo.addPlaylistToDownloadQueue(input)
}

export function reorderDownloadQueue(ids: number[]): void {
  spotifyRepo.reorderDownloadQueue(ids)
}

export function removeDownloadQueueCard(id: number): void {
  if (queueRun?.activeCardId === id) throw new Error('Pause or cancel this download before removing it')
  spotifyRepo.removeDownloadQueueCard(id)
}

export function removeDownloadQueueSelection(id: number): void {
  const activeCard = queueRun?.activeCardId == null
    ? null
    : spotifyRepo.getDownloadQueueCard(queueRun.activeCardId)
  if (activeCard?.selections.some((selection) => selection.id === id)) {
    throw new Error('Pause or cancel this download before editing it')
  }
  spotifyRepo.removeDownloadQueueSelection(id)
}

export function clearCompletedDownloadQueue(): number {
  return spotifyRepo.clearCompletedDownloadQueue()
}

function updateQueueStatusCard(card: NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>>): void {
  if (!status || status.id !== queueRun?.id) return
  status.queueCardId = card.id
  status.route = '/music/downloads'
  status.playlistId = card.playlistId
  status.entityKind = card.entityKind ?? undefined
  status.entityId = card.entityId
  status.releaseTitle = null
  status.releaseIndex = 0
  status.releaseCount = card.sourceKind === 'entity' ? card.selections.length : null
  status.itemIndex = 0
  status.itemCount = card.missingCount
  status.percent = card.missingCount ? 0 : 100
  status.title = null
  status.message = `Preparing ${card.title}`
}

async function scanQueueFiles(run: QueueRun, message: string): Promise<void> {
  if (abandonedRuns.has(run.id)) return
  if (status?.id === run.id) {
    status.status = 'processing'
    status.phase = 'scanning'
    status.message = message
  }
  try {
    await indexSpotifyOutputs(run.owner)
  } catch (error) {
    if (run.intent === 'running') {
      throw error
    }
  }
}

async function processEntityQueueCard(
  run: QueueRun,
  card: NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>>,
  dir: string
): Promise<{ total: number; resolved: number; error: string | null }> {
  if (!card.entityKind || card.entityId == null) throw new Error('The queued catalogue source no longer exists')
  let snapshot = spotifyRepo.getEntitySnapshot(card.entityKind, card.entityId)
  if (!snapshot) throw new Error('The queued catalogue source no longer exists')
  if (!snapshotInspection(snapshot).matchesCurrentEntity && !card.allowMismatch) {
    throw new Error('The queued Spotify source no longer matches this local page')
  }
  const releaseIds = card.selections
    .filter((selection) => selection.kind === 'release')
    .map((selection) => selection.sourceId)
  const failures: string[] = []
  const groups = groupResolvedReleases(snapshot.releases.filter((release) => releaseIds.includes(release.id)))
  for (let releaseIndex = 0; releaseIndex < groups.length; releaseIndex++) {
    if (run.intent !== 'running') break
    const group = groups[releaseIndex]
    const first = snapshot.releases.find((release) => release.id === group[0].id)
    if (!first) continue
    const queuedRelease = group.length === 1 ? first : {
      ...first, title: `${group.length} small releases`, tracks: group.flatMap((release) => release.tracks)
    }
    if (queuedRelease.tracks.length > 0 && queuedRelease.tracks.every((track) => track.matchedTrackId != null)) {
      continue
    }
    if (status?.id === run.id) {
      status.releaseIndex = releaseIndex + 1
      status.releaseCount = releaseIds.length
      status.releaseTitle = queuedRelease.title
      status.message = `Preparing ${queuedRelease.title}`
    }
    let release = queuedRelease
    try {
      release = group.length > 1 ? queuedRelease : await resolveReleaseForDownload(run, snapshot, queuedRelease, dir)
    } catch (error) {
      if (run.intent !== 'running') break
      const message = error instanceof DirectReleaseDownloadRequired
        ? 'Metadata is incomplete. Retry the release before downloading; existing tracks were kept.'
        : error instanceof Error ? error.message : String(error)
      spotifyRepo.markEntityReleaseError(queuedRelease.id, message)
      failures.push(message)
      continue
    }
    // Resolve a bounded look-ahead group before launching Python for audio. This
    // also batches first-time singles, not only releases resolved by an older run.
    while (run.intent === 'running' && release.metadataState === 'resolved' && groups[releaseIndex + 1]) {
      const next = groups[releaseIndex + 1]
      if (release.tracks.length + next.reduce((sum, row) => sum + row.tracks.length, 0) > 100) break
      try {
        const resolved = [] as typeof next
        for (const upcoming of next) resolved.push(await resolveReleaseForDownload(run, snapshot, upcoming, dir))
        release = { ...release, title: `${release.title} + ${resolved.map((row) => row.title).join(', ')}`,
          tracks: [...release.tracks, ...resolved.flatMap((row) => row.tracks)] }
        groups.splice(releaseIndex + 1, 1)
      } catch {
        // Keep direct/failed releases independent; their normal iteration owns
        // fallback handling and error attribution.
        break
      }
    }
    const pending = release.tracks.filter((track) =>
      track.matchedTrackId == null && track.rawJson && !spotifyRepo.hasDownloadCandidate('entityTrack', track.id)
    )
    spotifyRepo.clearTrackDownloadErrors('entityTrack', pending.map((track) => track.id))
    let processed = 0
    if (status?.id === run.id) {
      status.itemIndex = 0
      status.itemCount = pending.length
      status.percent = pending.length ? 0 : 100
    }
    const chunks = [false, true].flatMap((allowUnverified) =>
      chunkSpotifyItems(spotifyRepo.singleRecordingDownloads(
          pending.filter((track) => track.allowUnverified === allowUnverified),
          (track) => ({ ...track, manual: Boolean(track.audioSourceUrl || track.allowUnverified) })
        ))
        .map((items) => ({ items, allowUnverified }))
    )
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      if (run.intent !== 'running') break
      const file = join(dir, `queue-${card.id}-release-${release.id}-chunk-${chunkIndex}.spotdl`)
      const errors = join(dir, `queue-${card.id}-release-${release.id}-chunk-${chunkIndex}.errors.spotdl`)
      writeFileSync(
        file,
        JSON.stringify(chunks[chunkIndex].items.map((track) =>
          payloadWithAudioSource(track.rawJson!, track.audioSourceUrl)
        )),
        { encoding: 'utf8', mode: 0o600 }
      )
      if (status?.id === run.id) {
        status.status = 'downloading'
        status.phase = 'downloading'
        status.message = null
      }
      const trackErrors = new Map<number, string>()
      const bySpotifyId = new Map(chunks[chunkIndex].items.map((track) => [track.spotifyTrackId, track.id]))
      const code = await downloadPreparedSpotify(
        buildSpotdlDownloadArgs(
          file,
          spotifyStagingRoot(),
          errors,
          card.state === 'failed' ? 'force' : 'skip',
          { ...downloadCliOptions(chunks[chunkIndex].allowUnverified), provenance: true }
        ),
        run.owner,
        (line) => {
          const event = parseSpotdlLine(line)
          if (!event || status?.id !== run.id) return
          if (event.kind === 'item') status.title = event.title
          if (event.kind === 'progress') {
            status.itemIndex = processed + event.done
            status.percent = status.itemCount
              ? Math.min(99, Math.round(((processed + event.done) / status.itemCount) * 100))
              : null
          }
        if (event.kind === 'error') {
            status.message = friendlySpotifyDownloadError(event.message)
            const trackId = event.spotifyTrackId ? bySpotifyId.get(event.spotifyTrackId) : null
            if (trackId != null) trackErrors.set(trackId, friendlySpotifyDownloadError(event.message))
          }
        },
        run.id,
        undefined,
        SPOTDL_AUDIO_STALL_MS
      )
      if (trackErrors.size) spotifyRepo.setTrackDownloadErrors('entityTrack', trackErrors)
      processed += chunks[chunkIndex].items.length
      if (status?.id === run.id) status.itemIndex = processed
      if (run.intent !== 'running') break
      if (code !== 0) failures.push(`spotDL exited with code ${code} for ${release.title}`)
    }
    if (abandonedRuns.has(run.id)) return { total: 0, resolved: 0, error: null }
    await scanQueueFiles(run, `Scanning ${release.title} into the library`)
    settleDownloadedProvenance('entityTrack', chunks.flatMap((chunk) => chunk.items).map((track) => ({
      id: track.id,
      spotifyTrackId: track.spotifyTrackId ?? track.providerTrackId,
      audioSourceUrl: track.audioSourceUrl
    })))
    snapshot = spotifyRepo.getEntitySnapshot(card.entityKind, card.entityId) ?? snapshot
  }
  if (abandonedRuns.has(run.id)) return { total: 0, resolved: 0, error: null }
  const current = spotifyRepo.getEntitySnapshot(card.entityKind, card.entityId)
  const selectedTracks = current?.releases
    .filter((release) => releaseIds.includes(release.id))
    .flatMap((release) => release.tracks) ?? []
  const total = selectedTracks.length
  const resolved = selectedTracks.filter((track) => track.matchedTrackId != null).length
  const missing = Math.max(0, total - resolved)
  if (missing > 0) {
    const generic = failures[0] ?? 'No suitable YouTube audio match was found'
    spotifyRepo.setTrackDownloadErrors(
      'entityTrack',
      new Map(selectedTracks
        .filter((track) => track.matchedTrackId == null && !track.downloadError)
        .map((track) => [track.id, generic]))
    )
  }
  return {
    total,
    resolved,
    error: missing > 0 ? failures[0] ?? `${missing} track${missing === 1 ? '' : 's'} could not be downloaded` : null
  }
}

async function processPlaylistQueueCard(
  run: QueueRun,
  card: NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>>,
  dir: string
): Promise<{ total: number; resolved: number; error: string | null }> {
  if (card.playlistId == null) throw new Error('The queued playlist no longer exists')
  const itemIds = card.selections
    .filter((selection) => selection.kind === 'playlistItem')
    .map((selection) => selection.sourceId)
  const rows = spotifyRepo.pendingSpotifyItems(card.playlistId, itemIds)
  const total = itemIds.length
  if (!rows.length) {
    const review = spotifyRepo.unverifiedPlaylistItemCount(card.playlistId, itemIds)
    return { total, resolved: total - review, error: review ? `${review} songs need your review` : null }
  }
  let processed = 0
  const failures: string[] = []
  if (status?.id === run.id) {
    status.itemIndex = 0
    status.itemCount = rows.length
    status.releaseCount = null
    status.releaseIndex = null
  }
  spotifyRepo.clearTrackDownloadErrors('playlistItem', rows.map((row) => row.id as number))
  const chunks = [false, true].flatMap((allowUnverified) =>
    chunkSpotifyItems(spotifyRepo.singleRecordingDownloads(
      rows.filter((row) => Boolean(row.allow_unverified) === allowUnverified),
      (row) => ({ title: String(row.title), primaryArtist: String(row.primary_artist),
        albumTitle: String(row.album_title), duration: row.duration as number | null,
        manual: Boolean(row.audio_source_url || row.allow_unverified) })
    ))
      .map((items) => ({ items, allowUnverified }))
  )
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    if (run.intent !== 'running') break
    const file = join(dir, `queue-${card.id}-playlist-chunk-${chunkIndex}.spotdl`)
    const errors = join(dir, `queue-${card.id}-playlist-chunk-${chunkIndex}.errors.spotdl`)
    writeFileSync(
      file,
      JSON.stringify(chunks[chunkIndex].items.map((row) =>
        payloadWithAudioSource(row.raw_json as string, (row.audio_source_url as string) ?? null)
      )),
      { encoding: 'utf8', mode: 0o600 }
    )
    if (status?.id === run.id) {
      status.status = 'downloading'
      status.phase = 'downloading'
      status.message = null
    }
    const trackErrors = new Map<number, string>()
    const bySpotifyId = new Map(chunks[chunkIndex].items.map((row) => [row.spotify_track_id as string, row.id as number]))
    const code = await downloadPreparedSpotify(
      buildSpotdlDownloadArgs(
        file,
        spotifyStagingRoot(),
        errors,
        card.state === 'failed' ? 'force' : 'skip',
        { ...downloadCliOptions(chunks[chunkIndex].allowUnverified), provenance: true }
      ),
      run.owner,
      (line) => {
        const event = parseSpotdlLine(line)
        if (!event || status?.id !== run.id) return
        if (event.kind === 'item') status.title = event.title
        if (event.kind === 'progress') {
          status.itemIndex = processed + event.done
          status.percent = rows.length
            ? Math.min(99, Math.round(((processed + event.done) / rows.length) * 100))
            : null
        }
          if (event.kind === 'error') {
          status.message = friendlySpotifyDownloadError(event.message)
          const trackId = event.spotifyTrackId ? bySpotifyId.get(event.spotifyTrackId) : null
          if (trackId != null) trackErrors.set(trackId, friendlySpotifyDownloadError(event.message))
        }
      },
      run.id,
      undefined,
      SPOTDL_AUDIO_STALL_MS
    )
    if (trackErrors.size) spotifyRepo.setTrackDownloadErrors('playlistItem', trackErrors)
    processed += chunks[chunkIndex].items.length
    if (status?.id === run.id) status.itemIndex = processed
    if (abandonedRuns.has(run.id)) return { total: 0, resolved: 0, error: null }
    await scanQueueFiles(run, `Scanning downloads from ${card.title}`)
    settleDownloadedProvenance('playlistItem', chunks[chunkIndex].items.map((row) => ({
      id: row.id as number,
      spotifyTrackId: row.spotify_track_id as string,
      audioSourceUrl: (row.audio_source_url as string) ?? null
    })))
    if (run.intent !== 'running') break
    if (code !== 0) failures.push(`spotDL exited with code ${code}`)
  }
  if (abandonedRuns.has(run.id)) return { total: 0, resolved: 0, error: null }
  const remaining = spotifyRepo.pendingSpotifyItems(card.playlistId, itemIds)
  if (remaining.length > 0) {
    const generic = failures[0] ?? 'No suitable YouTube audio match was found'
    spotifyRepo.setTrackDownloadErrors(
      'playlistItem',
      new Map(remaining
        .filter((row) => !row.download_error)
        .map((row) => [row.id as number, generic]))
    )
  }
  const unverified = spotifyRepo.unverifiedPlaylistItemCount(card.playlistId, itemIds)
  const resolved = total - unverified
  return {
    total,
    resolved,
    error: unverified > remaining.length
      ? `${unverified - remaining.length} songs need your review${remaining.length ? `; ${remaining.length} could not be downloaded` : ''}`
      : remaining.length > 0
      ? failures[0] ?? `${remaining.length} track${remaining.length === 1 ? '' : 's'} could not be downloaded`
      : null
  }
}

function stopQueueRun(run: QueueRun, intent: 'pause' | 'cancel'): void {
  if (queueRun?.id !== run.id) return
  run.intent = intent
  if (status?.id === run.id) {
    status.status = intent === 'pause' ? 'pausing' : 'cancelling'
    status.phase = intent === 'pause' ? 'pausing' : 'cancelling'
    status.message = intent === 'pause'
      ? 'Pausing safely; completed files will be scanned first'
      : 'Cancelling safely; completed files will be kept'
  }
  if (active?.id === run.id) {
    active.cancelled = true
    cancelMusicProcesses(run.id)
  } else if (!run.active && intent === 'cancel') {
    if (run.activeCardId != null) spotifyRepo.setDownloadQueueCardState(run.activeCardId, 'queued', null, false)
    if (status?.id === run.id) {
      status.status = 'cancelled'
      status.phase = 'cancelled'
      status.message = 'Queue run cancelled; completed files were kept'
    }
    queueRun = null
    releaseMusicMaintenance(run.owner)
  }
}

function resumeQueueRun(run: QueueRun): void {
  if (queueRun?.id !== run.id || run.intent !== 'pause' || run.active) return
  claimMusicMaintenance(run.owner)
  run.intent = 'running'
  run.needsRecoveryScan = true
  if (status?.id === run.id) {
    status.status = 'starting'
    status.phase = 'starting'
    status.message = 'Resuming the paused Spotify queue'
  }
  void runDownloadQueue(run)
}

function nextQueueCard(run: QueueRun): NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>> | null {
  const snapshot = spotifyRepo.listDownloadQueue()
  if (run.activeCardId != null && !run.processed.has(run.activeCardId)) {
    const interrupted = snapshot.pending.find((card) => card.id === run.activeCardId)
    if (interrupted?.state === 'paused') return interrupted
  }
  if (run.mode === 'single') {
    if (run.targetJobId == null || run.processed.has(run.targetJobId)) return null
    return snapshot.pending.find((card) => card.id === run.targetJobId) ?? null
  }
  return snapshot.pending.find((card) => !run.processed.has(card.id)) ?? null
}

function currentQueueIntent(run: QueueRun): QueueRun['intent'] {
  return run.intent
}

async function runDownloadQueue(run: QueueRun): Promise<void> {
  if (run.active || abandonedRuns.has(run.id)) return
  run.active = true
  let dir: string | null = null
  let terminal = false
  let failedCards = 0
  let resolvedTracks = 0
  let totalTracks = 0
  let spotifyReady = false
  try {
    dir = mkdtempSync(join(tmpdir(), 'navihub-spotify-queue-'))
    await indexSpotifyOutputs(run.owner)
    if (run.needsRecoveryScan) {
      run.needsRecoveryScan = false
      await indexSpotifyOutputs(run.owner)
    }
    while (run.intent === 'running') {
      const card = nextQueueCard(run)
      if (!card) break
      run.activeCardId = card.id
      spotifyRepo.setDownloadQueueCardState(card.id, 'running', null, run.mode === 'all')
      updateQueueStatusCard(card)
      let result: { total: number; resolved: number; error: string | null }
      try {
        if (card.sourceKind !== 'url' && !spotifyReady) {
          const readiness = await detectBinary()
          if (!readiness.ok) throw new Error(readiness.error ?? 'spotDL is not ready')
          spotifyReady = true
        }
        result = card.sourceKind === 'url'
          ? await processUrlJob(card.id, run.owner, (args, onLine) => runMusicCommand(args, run.owner, onLine, run.id, undefined, SPOTDL_AUDIO_STALL_MS, undefined, musicToolOptions().ytdlp), () => run.intent === 'running' && !abandonedRuns.has(run.id), (patch) => { if (status?.id === run.id) Object.assign(status, patch) })
          : card.sourceKind === 'entity'
          ? await processEntityQueueCard(run, card, dir)
          : await processPlaylistQueueCard(run, card, dir)
      } catch (error) {
        result = {
          total: card.missingCount,
          resolved: 0,
          error: error instanceof Error ? error.message : String(error)
        }
      }
      if (abandonedRuns.has(run.id)) return
      totalTracks += result.total
      resolvedTracks += result.resolved
      const intent = currentQueueIntent(run)
      if (intent === 'pause') {
        spotifyRepo.setDownloadQueueCardState(card.id, 'paused', null, run.mode === 'all')
        if (status?.id === run.id) {
          status.status = 'paused'
          status.phase = 'paused'
          status.message = 'Paused safely; Resume continues unresolved queue work'
        }
        return
      }
      if (intent === 'cancel') {
        spotifyRepo.setDownloadQueueCardState(card.id, 'queued', null, false)
        if (status?.id === run.id) {
          status.status = 'cancelled'
          status.phase = 'cancelled'
          status.message = 'Queue run cancelled; completed files were kept'
        }
        terminal = true
        return
      }
      run.processed.add(card.id)
      if (result.error) {
        failedCards += 1
        spotifyRepo.setDownloadQueueCardState(card.id, 'failed', result.error, false)
      } else {
        spotifyRepo.setDownloadQueueCardState(card.id, 'completed', null, false)
      }
    }
    if (run.intent === 'pause') {
      const next = nextQueueCard(run)
      if (next) {
        run.activeCardId = next.id
        spotifyRepo.setDownloadQueueCardState(next.id, 'paused', null, run.mode === 'all')
        if (status?.id === run.id) {
          status.queueCardId = next.id
          status.status = 'paused'
          status.phase = 'paused'
          status.message = 'Paused safely; Resume continues unresolved queue work'
        }
        return
      }
    }
    if (run.intent === 'cancel') {
      if (status?.id === run.id) {
        status.status = 'cancelled'
        status.phase = 'cancelled'
        status.message = 'Queue run cancelled; completed files were kept'
      }
      terminal = true
      return
    }
    if (!status || status.id !== run.id) return
    status.resolvedCount = resolvedTracks
    status.failedCount = Math.max(0, totalTracks - resolvedTracks)
    status.percent = totalTracks
      ? Math.min(100, Math.round((resolvedTracks / totalTracks) * 100))
      : 100
    status.title = null
    const totalFailure = failedCards > 0 && resolvedTracks === 0
    status.phase = totalFailure ? 'error' : 'done'
    status.status = totalFailure ? 'error' : 'done'
    status.message = failedCards > 0
      ? `${failedCards} queue card${failedCards === 1 ? '' : 's'} remain available to retry`
      : null
    terminal = true
  } catch (error) {
    if (abandonedRuns.has(run.id)) return
    if (run.activeCardId != null) {
      spotifyRepo.setDownloadQueueCardState(
        run.activeCardId,
        run.intent === 'pause' ? 'paused' : run.intent === 'cancel' ? 'queued' : 'failed',
        run.intent === 'running' ? (error instanceof Error ? error.message : String(error)) : null,
        run.intent === 'pause' && run.mode === 'all'
      )
    }
    if (status?.id === run.id) {
      status.status = run.intent === 'pause' ? 'paused' : run.intent === 'cancel' ? 'cancelled' : 'error'
      status.phase = status.status
      status.message = error instanceof Error ? error.message : String(error)
    }
    terminal = run.intent !== 'pause'
  } finally {
    if (dir) rmSync(dir, { recursive: true, force: true })
    run.active = false
    abandonedRuns.delete(run.id)
    if (terminal && queueRun?.id === run.id) queueRun = null
    // All children and finalization have settled. Paused work retains durable
    // checkpoints, while manual recovery can safely use the library gate.
    releaseMusicMaintenance(run.owner)
  }
}

export function startDownloadQueue(input: SpotifyDownloadQueueStartInput = {}): { id: string | null } {
  if (queueRun) {
    if (input.prioritize && input.jobId != null) {
      queueRun.processed.delete(input.jobId)
      spotifyRepo.prioritizeDownloadQueueCard(input.jobId)
      return { id: queueRun.id }
    }
    throw new Error('The Spotify download queue is already running. Open Downloads to manage it.')
  }
  const maintenance = musicMaintenanceOwner()
  if (maintenance) throw new Error(`Music maintenance is busy: ${maintenance}. Open Tasks to manage it.`)
  if (input.prioritize && input.jobId != null) spotifyRepo.prioritizeDownloadQueueCard(input.jobId)
  const snapshot = spotifyRepo.listDownloadQueue()
  const paused = snapshot.pending.find((card) => card.state === 'paused')
  const target = input.jobId != null
    ? snapshot.pending.find((card) => card.id === input.jobId)
    : input.resume && paused ? paused : snapshot.pending[0]
  if (!target) return { id: null }
  if (input.resume) spotifyRepo.prioritizeDownloadQueueCard(target.id)
  const mode = input.resume && target.continueAfter ? 'all' : input.jobId != null ? 'single' : 'all'
  if (snapshot.pendingTracks > 0 && !getSetting('music.dir')?.trim()) {
    throw new Error('Set your music folder first')
  }
  counter += 1
  const id = `spotify-queue-${process.pid}-${counter}`
  const owner = `Spotify download queue ${id}`
  claimMusicMaintenance(owner)
  status = {
    id,
    status: 'starting',
    percent: null,
    itemIndex: 0,
    itemCount: snapshot.pendingTracks,
    title: null,
    message: input.resume ? 'Resuming the paused Spotify queue' : 'Preparing the Spotify download queue',
    source: 'spotifyQueue',
    playlistId: null,
    entityId: null,
    route: '/music/downloads',
    resolvedCount: 0,
    failedCount: 0,
    phase: 'starting',
    releaseIndex: 0,
    releaseCount: null,
    releaseTitle: null,
    startedAt: Date.now(),
    queueCardId: null
  }
  const run: QueueRun = {
    id,
    owner,
    intent: 'running',
    active: false,
    mode,
    targetJobId: mode === 'single' ? target.id : null,
    activeCardId: null,
    processed: new Set(),
    needsRecoveryScan: Boolean(input.resume)
  }
  queueRun = run
  try {
    const task = tasks.create({
      kind: 'musicDownload',
      label: mode === 'single' ? `Download ${target.title}` : `Download music queue (${snapshot.pendingSources})`,
      route: '/music/downloads',
      controls: {
        cancel: () => stopQueueRun(run, 'cancel'),
        pause: () => stopQueueRun(run, 'pause'),
        resume: () => resumeQueueRun(run),
        pauseNote: null
      },
      project: () => status?.id === id ? {
        state: DOWNLOAD_STATE[status.status],
        detail: status.title ?? status.message,
        percent: status.percent,
        done: status.itemIndex ?? 0,
        total: status.itemCount ?? 0,
        error: status.status === 'error' ? status.message : null
      } : null
    })
    if (status?.id === id) status.taskId = task.id
    void runDownloadQueue(run)
  } catch (error) {
    queueRun = null
    releaseMusicMaintenance(owner)
    throw error
  }
  return { id }
}

export function cancelDownload(id: string): void {
  if (status?.id !== id) return
  if (queueRun?.id === id) {
    stopQueueRun(queueRun, 'cancel')
    return
  }
  status.status = 'cancelling'
  status.message = 'Stopping after completed files are scanned'
  if (active?.id) {
    active.cancelled = true
    cancelMusicProcesses()
  }
}

export function killActive(): void {
  inspectionCancelled = true
  inspectionStatus.running = false
  inspectionStatus.cancelled = true
  inspectionStatus.phase = 'idle'
  if (active) abandonedRuns.add(active.id)
  if (queueRun) abandonedRuns.add(queueRun.id)
  if (queueRun) {
    queueRun.intent = 'pause'
    if (queueRun.activeCardId != null) {
      spotifyRepo.setDownloadQueueCardState(
        queueRun.activeCardId,
        'paused',
        'Paused when NaviHUB closed',
        queueRun.mode === 'all'
      )
    }
  }
  if (!active) {
    if (queueRun) {
      releaseMusicMaintenance(queueRun.owner)
      queueRun = null
    }
    return
  }
  const owner = active.owner
  active.cancelled = true
  // Keep the child reference alive for the SIGKILL follow-up after clearing
  // module state. Otherwise a stubborn process survives app shutdown invisibly.
  cancelMusicProcesses(undefined, 1_000)
  activeProcesses.clear()
  active = null
  queueRun = null
  releaseMusicMaintenance(owner)
}

function version(bin: string, args: string[], onTimeout?: () => void): Promise<string | null> {
  return new Promise((resolve) => {
    // spotDL imports its Python dependency graph even for --version. A real
    // cold start can exceed five seconds without the executable being broken.
    execFile(bin, args, { timeout: bin === spotdlBin() ? 30_000 : 5000 }, (error, stdout) => {
      if (error?.killed) onTimeout?.()
      resolve(error ? null : stdout.trim().split('\n')[0] ?? null)
    })
  })
}

async function denoAvailable(): Promise<boolean> {
  if (await version('deno', ['--version'])) return true
  const executable = process.platform === 'win32' ? 'deno.exe' : 'deno'
  const candidates = process.platform === 'linux'
    ? [join(homedir(), '.config', 'spotdl', executable), join(homedir(), '.spotdl', executable)]
    : [join(homedir(), '.spotdl', executable)]
  return candidates.some((candidate) => {
    try {
      return existsSync(candidate) && statSync(candidate).isFile()
    } catch {
      return false
    }
  })
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

export function friendlySpotifyDownloadError(value: string): string {
  const text = value.toLowerCase()
  if (/sign in|captcha|login_required|requested format|http error 403|cookies.*(?:invalid|expired)/i.test(value)) return musicFailure('Download', 'spotDL embedded yt-dlp', value)
  if (/audio(provider|providererror)|yt-?dlp download error|no results found|no usable results/.test(text)) {
    return 'No usable YouTube audio result matched this track. Try a manual YouTube source or enable an alternate provider in Settings.'
  }
  if (/sign in to confirm|captcha|bot verification|confirm you.?re not|login_required/.test(text)) {
    return 'YouTube rejected this request as automated. Test fresh cookies in Settings and keep the same VPN connection.'
  }
  if (/private|members.only|age.restricted|unavailable|not available|geo/.test(text)) {
    return 'The selected YouTube source is unavailable in this region. Try a different source URL.'
  }
  if (/timed out|timeout|stopped responding/.test(text)) {
    return 'YouTube did not respond in time. Retry this track or provide a direct source URL.'
  }
  return value.length > 300 ? `${value.slice(0, 297)}…` : value
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

export async function detectBinary(): Promise<SpotdlDetectResult> {
  const bin = spotdlBin()
  let startupTimedOut = false
  let capabilitiesTimedOut = false
  const cookieConfigured = Boolean(getSetting('spotdl.cookieFile')?.trim())
  let cookieValid = !cookieConfigured
  if (cookieConfigured) {
    try {
      cookieValid = premiumCookieFile() != null
    } catch {
      cookieValid = false
    }
  }
  const [spotdlRaw, ffmpeg, deno] = await Promise.all([
    version(bin, ['--version'], () => { startupTimedOut = true }),
    version(musicToolOptions().ffmpeg, ['-version']),
    denoAvailable()
  ])
  const standaloneYtdlpVersion = await version(musicToolOptions().ytdlp, ['--version'])
  const python = await metadataPython()
  const embeddedYtdlpVersion = python ? await version(python, ['-c', 'import yt_dlp.version; print(yt_dlp.version.__version__)']) : null
  const capabilitiesReady = spotdlRaw != null && await new Promise<boolean>((resolve) => {
    execFile(bin, ['--help'], { timeout: 30_000, maxBuffer: 512 * 1024 }, (error, stdout) => {
      capabilitiesTimedOut = Boolean(error?.killed)
      resolve(!error && ['--preload', '--yt-dlp-args', '--save-file'].every((flag) => stdout.includes(flag)))
    })
  })
  const parsed = parseSpotdlVersion(spotdlRaw)
  const metadataReady = spotdlRaw != null && parsed.supported
  const downloadReady = metadataReady && capabilitiesReady && standaloneYtdlpVersion != null && ffmpeg != null && deno && cookieValid
  return {
    ok: downloadReady,
    version: parsed.version,
    ffmpeg: ffmpeg != null,
    deno,
    supportedVersion: parsed.supported,
    standaloneYtdlpVersion, embeddedYtdlpVersion, capabilitiesReady, embeddedAccessTested: false,
    premiumCookieConfigured: cookieConfigured,
    premiumCookieValid: cookieValid,
    metadataReady,
    downloadReady,
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
      spotdlRaw == null
        ? startupTimedOut ? 'The spotDL startup check timed out after 30 seconds; retry when the system is less busy' : `Could not run "${bin}" — install spotDL or set its path`
        : !parsed.supported
          ? `spotDL 4.5.2 or newer is required; found ${parsed.version ?? 'an unknown version'}`
        : !capabilitiesReady ? capabilitiesTimedOut ? 'The spotDL capability check timed out after 30 seconds; retry when the system is less busy' : 'spotDL is missing required preload or downloader options'
        : !standaloneYtdlpVersion ? 'yt-dlp is required to inspect selected sources'
        : ffmpeg == null
          ? 'ffmpeg not found on PATH — spotDL needs it to finish audio files'
          : !deno
            ? 'Deno is missing — install it here so yt-dlp can access current YouTube audio'
            : !cookieValid
              ? 'The configured YouTube cookies.txt file could not be read'
          : null
  }
}

export async function installDeno(): Promise<SpotdlDetectResult> {
  const owner = `spotify-deno-${Date.now()}`
  claimMusicMaintenance(owner)
  try {
    await tasks.runTask(
      {
        kind: 'musicMetadata',
        label: 'Installing Deno for spotDL',
        route: '/settings',
        controls: { pauseNote: 'Deno installation cannot be paused.' }
      },
      async (handle) => {
        const controls = processControls(() => activeProcessTarget(handle.id), {
          onCancel: () => {
            if (active?.id === handle.id) active.cancelled = true
          }
        })
        handle.setControls({
          cancel: controls.cancel,
          pauseNote: 'Deno installation cannot be paused.'
        })
        const code = await runSpotdl(['--download-deno'], owner, undefined, handle.id, spawn, 120_000)
        if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Installing Deno for spotDL')
        if (code !== 0) throw new Error(`spotDL could not install Deno (exit code ${code})`)
      }
    )
  } finally {
    releaseMusicMaintenance(owner)
  }
  return detectBinary()
}

export function skipPlaylistDownload(itemId: number, skipped: boolean): void {
  if (active || queueRun?.intent === 'running') throw new Error('Pause downloads before skipping or restoring songs')
  spotifyRepo.skipPlaylistDownload(itemId, skipped)
}

export async function setTrackDownloadOptions(input: SpotifyTrackDownloadOptionsInput): Promise<void> {
  if (active || queueRun?.intent === 'running') throw new Error('Pause downloads before changing a song source')
  let audioSourceUrl = input.audioSourceUrl
  if (audioSourceUrl != null) {
    audioSourceUrl = audioSourceUrl.trim()
    if (audioSourceUrl) {
      audioSourceUrl = youtubeSourceUrl(audioSourceUrl)
    } else audioSourceUrl = null
  }
  const evidence = input.approveSource && audioSourceUrl ? await inspectAudio(audioSourceUrl) : null
  if (musicMaintenanceOwner()) throw new Error('Pause music tasks before changing a song source')
  spotifyRepo.setTrackDownloadOptions({
    ...input,
    audioSourceUrl,
    allowUnverified:
      input.allowUnverified ?? (input.audioSourceUrl !== undefined ? Boolean(audioSourceUrl) : undefined)
  })
  if (evidence) {
    spotifyRepo.saveSourceEvidence(input.sourceKind, input.trackId, evidence, true)
    const queued = spotifyRepo.sourceQueue(input.sourceKind, input.trackId)
    if (input.startNow && queued.jobId != null) {
      if (queueRun?.intent === 'pause' && !queueRun.active) stopQueueRun(queueRun, 'cancel')
      startDownloadQueue({ jobId: queued.jobId })
    }
  }
}

export async function loadReleaseTracks(snapshotId: number, releaseId: number): Promise<SpotifyEntityInspection> {
  const snapshot = spotifyRepo.getEntitySnapshotById(snapshotId)
  const release = snapshot?.releases.find((row) => row.id === releaseId)
  if (!snapshot || !release) throw new Error('That catalogue release no longer exists')
  if (!release.tracksLoaded && snapshot.provider === 'itunes') {
    const rows = await itunesResults(
      `https://itunes.apple.com/lookup?id=${release.providerReleaseId}&entity=song&limit=200`,
      undefined, snapshot.catalogueCountry
    )
    const collection = rows.find((row) => row.wrapperType === 'collection')
    const indexed = collection ? itunesRelease(collection, rows) : null
    if (!indexed) throw new Error('No complete tracklist was returned; please try again')
    spotifyRepo.hydrateIndexedRelease(snapshot, releaseId, indexed)
  }
  return snapshotInspection(spotifyRepo.getEntitySnapshotById(snapshotId)!)
}

export async function refreshPlaylist(playlistId: number): Promise<SpotifyImportResult> {
  const source = spotifyRepo.spotifySource(playlistId)
  if (!source) throw new Error('That Spotify playlist no longer exists')
  if (musicMaintenanceOwner()) throw new Error('Pause downloads before refreshing this playlist')
  return importPlaylist(source.sourceUrl, true)
}

export function groupResolvedReleases<T extends { metadataState: string; tracks: unknown[] }>(releases: T[]): T[][] {
  const groups: T[][] = []
  for (const release of releases) {
    const previous = groups.at(-1)
    if (release.metadataState === 'resolved' && previous?.every((row) => row.metadataState === 'resolved') &&
        previous.reduce((sum, row) => sum + row.tracks.length, 0) + release.tracks.length <= 100) previous.push(release)
    else groups.push([release])
  }
  return groups
}

let metadataPythonCache: { key: string; value: string | null } | null = null
async function metadataPython(): Promise<string | null> {
  const configured = getSetting('spotdl.pythonPath')?.trim()
  const key = `${configured ?? ''}:${spotdlBin()}`
  if (metadataPythonCache?.key === key) return metadataPythonCache.value
  let interpreter = configured || (process.platform === 'win32' ? 'python' : 'python3')
  // pipx and virtualenv launchers name their owning interpreter in the shebang.
  if (!configured && isAbsolute(spotdlBin()) && process.platform !== 'win32') {
    try {
      const first = readFileSync(spotdlBin(), 'utf8').split('\n')[0]
      if (/^#!\/[^ ]*python[^ ]*$/.test(first)) interpreter = first.slice(2).trim()
    } catch { /* CLI fallback remains available */ }
  }
  const value = await new Promise<string | null>((resolve) => {
    execFile(interpreter, ['-c', "import importlib.metadata; print(importlib.metadata.version('spotdl'))"],
      { timeout: 5000 }, (error, stdout) => resolve(!error && stdout.trim() === '4.5.2' ? interpreter : null))
  })
  metadataPythonCache = { key, value }
  return value
}

export function assertPlaylistSnapshotComplete(payload: unknown, expected: number | null): void {
  if (!Array.isArray(payload) || expected == null || payload.length !== expected) {
    throw new Error(`Spotify returned an incomplete playlist (${Array.isArray(payload) ? payload.length : 0}/${expected ?? '?'}); your existing playlist was kept. Retry to finish the snapshot.`)
  }
}

/** Resolve once, retain independent evidence, then download the pinned source. */
async function downloadPreparedSpotify(...parameters: Parameters<typeof runSpotdl>): Promise<number> {
  const [args, owner] = parameters
  const inputFile = args[1]
  if (!inputFile.endsWith('.spotdl')) throw new Error('Acquisition requires a saved track snapshot')
  const inputSongs = JSON.parse(readFileSync(inputFile, 'utf8')) as Record<string, unknown>[]
  const fileExists = (path: string) => { try { return statSync(absoluteMediaPath(`music/${path}`)).isFile() } catch { return false } }
  const acquisitionKeys = new Set<string>()
  const songs = inputSongs.filter((raw) => {
    const key = `${String(raw.song_id)}:${String(raw.download_url ?? '')}`
    if (acquisitionKeys.has(key)) return false
    acquisitionKeys.add(key)
    if (raw.download_url) return true // An explicit source may only reuse that exact source.
    const song = { title: String(raw.name), primaryArtist: String((raw.artists as string[] | undefined)?.[0] ?? raw.artist ?? ''), albumTitle: String(raw.album_name ?? ''), duration: typeof raw.duration === 'number' ? raw.duration : null }
    const candidates = spotifyRepo.acquisitionCandidates(song).filter((row) => fileExists(row.filePath))
    const match = spotifyRepo.matchSpotifyPlaylistSong(song, candidates)
    if (match != null) { spotifyRepo.linkAvailableLocal(String(raw.song_id), match); return false }
    if (candidates.length > 1) {
      for (const ref of spotifyRepo.sourcesForSpotifyId(String(raw.song_id))) if (!ref.manual) spotifyRepo.setTrackDownloadErrors(ref.kind, new Map([[ref.id, 'Needs review: several local recordings are compatible; choose a local version']]))
      return false
    }
    return true
  })
  const groups = new Map<'opus' | 'm4a' | 'mp3', Record<string, unknown>[]>()
  let failures = 0
  const started = Date.now()
  const running = () => !parameters[3] || (!abandonedRuns.has(parameters[3]) && (queueRun?.owner !== owner || queueRun.intent === 'running'))
  const sourceKey = (raw: Record<string, unknown>) => `${String(raw.song_id)}:${String(raw.download_url ?? '')}`
  const savedById = new Map(songs.map((raw) => [sourceKey(raw), spotifyRepo.sourcesForSpotifyId(String(raw.song_id))
    .filter((ref) => !ref.manual || ref.manual === raw.download_url)
    .map((ref) => spotifyRepo.sourceEvidence(ref.kind, ref.id)).find((proof) => proof && (!raw.download_url || proof.evidence.url === raw.download_url))]))
  const unresolved = songs.filter((raw) => !raw.download_url && !savedById.get(sourceKey(raw)))
  const urls = new Map<string, string>()
  let resolutionError: string | null = null
  if (unresolved.length) {
    const resolveInput = `${inputFile}.resolve.spotdl`
    const resolveOutput = `${inputFile}.resolved.spotdl`
    writeFileSync(resolveInput, JSON.stringify(unresolved), { mode: 0o600 })
    let diagnostic = ''
    const resolveCode = await runSpotdl(['save', resolveInput, '--save-file', resolveOutput, '--preload', '--lyrics', '--threads', String(musicToolOptions().workers),
      '--max-retries', '0', ...(args.includes('--dont-filter-results') ? ['--dont-filter-results'] : []), '--audio', ...(downloadCliOptions(false).audioProviders ?? ['youtube-music', 'youtube']), '--yt-dlp-args', spotdlYtDlpOptions()], owner,
      (line) => { diagnostic = `${diagnostic}\n${line}`.slice(-4000) }, parameters[3], undefined, SPOTDL_AUDIO_STALL_MS)
    if (!running()) return 1
    if (resolveCode !== 0) resolutionError = musicFailure('Lookup', 'spotDL preload', diagnostic.trim() || `Exited with code ${resolveCode}`)
    try { for (const row of JSON.parse(readFileSync(resolveOutput, 'utf8'))) if (row?.song_id && typeof row.download_url === 'string') urls.set(row.song_id, row.download_url) } catch { /* individual failures below */ }
  }
  const toInspect = songs.flatMap((raw) => {
    const saved = savedById.get(sourceKey(raw))
    if (saved && saved.evidence.accessKey === musicAccessKey() && Date.now() - saved.evidence.observedAt < 5 * 60_000) return []
    const url = raw.download_url ?? saved?.evidence.url ?? urls.get(String(raw.song_id))
    if (typeof url !== 'string') return []
    try { return [canonicalAudioSource(url)] } catch { return [] }
  })
  const inspected = await inspectAudioSourcesInQueue([...new Set(toInspect)], owner, parameters[3])
  if (!running()) return 1
  for (const raw of songs) {
    if ((queueRun?.owner === owner && queueRun.intent !== 'running')) break
    const id = String(raw.song_id)
    const references = spotifyRepo.sourcesForSpotifyId(id).filter((ref) => !ref.manual || ref.manual === raw.download_url)
    try {
      const saved = references.map((ref) => spotifyRepo.sourceEvidence(ref.kind, ref.id)).find((proof) => proof && (!raw.download_url || proof.evidence.url === raw.download_url))
      let url = typeof raw.download_url === 'string' ? raw.download_url : saved?.evidence.url
      if (!url) url = urls.get(id)
      if (!url) throw new Error(resolutionError ?? 'No source found; choose a recording')
      const evidence = saved && saved.evidence.accessKey === musicAccessKey() && Date.now() - saved.evidence.observedAt < 5 * 60_000
        ? saved.evidence : inspected.get(canonicalAudioSource(url))
      if (!evidence) throw new Error(inspected.errors.get(canonicalAudioSource(url)) ?? 'Extraction (standalone yt-dlp): no verified source metadata returned; inspect the source or choose another recording')
      if (!running()) return 1
      if (saved?.approved && (saved.evidence.url !== evidence.url || saved.evidence.title !== evidence.title ||
          saved.evidence.duration !== evidence.duration)) throw new Error('The approved source changed; review it again')
      const artists = Array.isArray(raw.artists) ? raw.artists : []
      const assessment = assessMusicSource({ title: String(raw.name), artist: String(artists[0] ?? raw.artist ?? ''), duration: typeof raw.duration === 'number' ? raw.duration : null, albumTitle: String(raw.album_name ?? '') }, evidence)
      const approved = Boolean(saved?.approved)
      const validated = approved || (!references.some((ref) => ref.broader || ref.manual) && assessment.strong)
      for (const ref of references) spotifyRepo.saveSourceEvidence(ref.kind, ref.id, evidence, approved, validated)
      if (!validated) throw new Error(`Needs review: ${assessment.reasons.join('; ') || 'Confirm this source before downloading'}`)
      const archived = spotifyRepo.archivedAudioSource(evidence.url).find((row) => row.duration != null && row.duration > 0 && (evidence.duration == null ? approved : Math.abs(row.duration - evidence.duration) <= spotifyRepo.compatibleSpotifyDurationTolerance(evidence.duration)) && fileExists(row.filePath))
      if (archived) { spotifyRepo.linkVerifiedSource(id, archived.id, evidence.url); continue }
      const group = groups.get(evidence.format) ?? []
      if (!group.some((song) => song.download_url === evidence.url)) group.push({ ...raw, download_url: evidence.url })
      groups.set(evidence.format, group)
    } catch (error) {
      if (!running()) return 1
      failures++
      const message = error instanceof Error ? error.message : String(error)
      for (const ref of references) spotifyRepo.setTrackDownloadErrors(ref.kind, new Map([[ref.id, message]]))
    }
  }
  logInfo('proc', `Music source resolution: ${songs.length} tracks in ${Date.now() - started}ms`)
  for (const [format, group] of groups) {
    if ((queueRun?.owner === owner && queueRun.intent !== 'running')) break
    const file = `${inputFile}.${format}.spotdl`
    writeFileSync(file, JSON.stringify(group), { mode: 0o600 })
    const nativeArgs = [...args]
    const artifact = randomUUID()
    for (const raw of group) for (const ref of spotifyRepo.sourcesForSpotifyId(String(raw.song_id))) {
      const proof = spotifyRepo.sourceEvidence(ref.kind, ref.id)
      if (proof?.validated && proof.evidence.url === raw.download_url) spotifyRepo.stampSourceArtifact(ref.kind, ref.id, artifact)
    }
    const outputIndex = nativeArgs.indexOf('--output') + 1
    nativeArgs[outputIndex] = nativeArgs[outputIndex].replace(' [navihub-', ` [navirun-${artifact}] [navihub-`)
    nativeArgs[1] = file
    nativeArgs[nativeArgs.indexOf('--overwrite') + 1] = 'skip' // completed siblings survive a transient batch retry
    nativeArgs[nativeArgs.indexOf('--format') + 1] = format
    const ytdlpIndex = nativeArgs.indexOf('--yt-dlp-args') + 1
    nativeArgs[ytdlpIndex] += ` '-f' 'bestaudio[${format === 'm4a' ? 'acodec^=mp4a' : `acodec=${format}`}]'`
    let diagnostic = ''
    const transferStarted = Date.now()
    if (await runMusicCommand(nativeArgs, parameters[1], (line) => { if (/error|failed|unavailable/i.test(line)) diagnostic = line; parameters[2]?.(line) }, parameters[3], parameters[4], parameters[5], parameters[6], parameters[7]) !== 0) {
      failures++
      if (!running()) return 1
      for (const raw of group) for (const ref of spotifyRepo.sourcesForSpotifyId(String(raw.song_id))) {
        if (ref.manual && ref.manual !== raw.download_url) continue
        spotifyRepo.setTrackDownloadErrors(ref.kind, new Map([[ref.id, musicFailure('Transfer / processing', 'spotDL embedded yt-dlp', diagnostic || 'Downloader exited before all outputs completed')]]))
        spotifyRepo.invalidateSourceAccess(ref.kind, ref.id)
      }
    }
    logInfo('proc', `Music transfer / processing: ${group.length} tracks in ${Date.now() - transferStarted}ms`)
  }
  return failures ? 1 : 0
}

export function addUrlDownloadQueue(input: import('@shared/types').MusicDownloadInput): SpotifyDownloadQueueAddResult {
  if (!getSetting('music.dir')?.trim()) throw new Error('Set your music folder first')
  const id = addUrlJob(validateUrlInput(input))
  return { jobId: id, addedSelections: 1, missingCount: 1 }
}

async function inspectAudioSourcesInQueue(urls: string[], owner: string, jobId?: string): Promise<Map<string, import('@shared/types').MusicSourceEvidence> & { errors: Map<string, string> }> {
  const evidence = Object.assign(new Map<string, import('@shared/types').MusicSourceEvidence>(), { errors: new Map<string, string>() })
  if (!urls.length) return evidence
  const allowed = new Set(urls)
  let diagnostic = ''
  await runMusicCommand([...musicYtDlpArgs(), '--no-playlist', '--skip-download', '--ignore-errors', '--dump-json', '--', ...urls], owner,
    (line) => {
      if (/error|failed|unavailable/i.test(line)) diagnostic = line
      try {
        const row = JSON.parse(line)
        const url = canonicalAudioSource(String(row.webpage_url ?? `https://www.youtube.com/watch?v=${row.id}`))
        if (allowed.has(url)) evidence.set(url, parseSourceEvidence(url, row))
      } catch { /* Missing or invalid entries become individual source failures. */ }
    }, jobId, undefined, 45_000, undefined, musicToolOptions().ytdlp)
  for (const url of urls) if (!evidence.has(url)) evidence.errors.set(url, musicFailure('Extraction', 'standalone yt-dlp', diagnostic || 'No usable audio metadata or native audio format returned'))
  return evidence
}

async function runMusicCommand(...parameters: Parameters<typeof runSpotdl>): Promise<number> {
  for (let attempt = 0; attempt < 3; attempt++) {
    let diagnostic = ''
    const code = await runSpotdl(parameters[0], parameters[1], (line) => {
      if (/error|timed out|connection/i.test(line)) diagnostic = line
      parameters[2]?.(line)
    }, parameters[3], parameters[4], parameters[5], parameters[6], parameters[7])
    if (code === 0 || attempt === 2 || !/timed out|timeout|connection reset|HTTP Error 5\d\d/i.test(diagnostic) ||
      /sign in|captcha|cookie|format.*not available|unavailable/i.test(diagnostic) ||
      (queueRun?.owner === parameters[1] && queueRun.intent !== 'running') || (parameters[3] && abandonedRuns.has(parameters[3]))) return code
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt))
    if ((queueRun?.owner === parameters[1] && queueRun.intent !== 'running') || (parameters[3] && abandonedRuns.has(parameters[3]))) return code
  }
  return 1
}

export async function addMusicQueue(request: import('@shared/types').MusicQueueInput): Promise<SpotifyDownloadQueueAddResult> {
  switch (request.kind) {
    case 'entity': return addEntityDownloadQueue(request.input)
    case 'playlist': return addPlaylistDownloadQueue(request.input)
    case 'url': return addUrlDownloadQueue(request.input)
    default: throw new Error('Unknown music queue input')
  }
}
