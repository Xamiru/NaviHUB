import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { get as getSetting } from './repos/settingsRepo'
import { downloadImages, musicRootDir } from './files'
import { fetchWithRetry } from './http'
import { startScan } from './music'
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
  SpotdlDetectResult,
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
  for (const raw of payload) {
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
        : null
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
  fallbackBytes = 10 * 1024 * 1024
): number {
  return Math.ceil(
    items.reduce(
      (total, item) => total + (item.duration == null ? fallbackBytes : item.duration * 40_000),
      0
    ) * 1.05
  )
}

export type SpotdlLineEvent =
  | { kind: 'item'; title: string }
  | { kind: 'progress'; done: number; total: number }
  | { kind: 'error'; message: string }

export function parseSpotdlLine(line: string): SpotdlLineEvent | null {
  const progress = line.match(/(?:^|\s)(\d+)\s*\/\s*(\d+)\s+(?:complete|completed)/i)
  if (progress) return { kind: 'progress', done: Number(progress[1]), total: Number(progress[2]) }
  const error = line.match(/(?:error|failed)\s*:\s*(.+)$/i)
  if (error) return { kind: 'error', message: error[1].trim() }
  const item = line.match(/^(.+?):\s*(?:Searching|Downloading|Converting|Done)/i)
  return item ? { kind: 'item', title: item[1].trim() } : null
}

export function buildSpotdlSaveArgs(url: string, saveFile: string, threads = 8): string[] {
  return ['save', url, '--threads', String(threads), '--use-cache-file', '--save-file', saveFile]
}

export function buildSpotifyDiscoveryQuery(artist: string, title: string): string {
  return `${artist.trim()} - ${title.trim()}`
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

export function buildSpotdlDownloadArgs(inputFile: string, outputRoot: string, errorFile: string): string[] {
  return [
    'download',
    inputFile,
    '--format',
    'mp3',
    '--bitrate',
    '320k',
    '--threads',
    '4',
    '--overwrite',
    'skip',
    '--simple-tui',
    '--save-errors',
    errorFile,
    '--output',
    join(
      outputRoot,
      '{album-artist}',
      '{album}',
      '{disc-number}-{track-number} - {title}.{output-ext}'
    )
  ]
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

async function itunesResults(url: string, deadline?: number): Promise<ItunesResult[]> {
  const remaining = deadline == null ? 8_000 : deadline - Date.now()
  if (remaining <= 0) throw new Error('Fast music catalogue exceeded its 25-second budget')
  const response = await fetchWithRetry(
    url,
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

function itunesRelease(
  collection: ItunesResult,
  tracks: ItunesResult[]
): spotifyRepo.IndexedEntityRelease | null {
  if (!collection.collectionId || !collection.collectionName || !collection.artistName) return null
  const songs = tracks.filter((track) =>
    track.wrapperType === 'track' && track.kind === 'song' &&
    track.collectionId === collection.collectionId && track.trackId && track.trackName
  )
  if (!songs.length) return null
  return {
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
  const releases: spotifyRepo.IndexedEntityRelease[] = []
  for (let offset = 0; offset < collections.length; offset += 4) {
    const batch = collections.slice(offset, offset + 4)
    const payloads = await Promise.all(batch.map((collection) =>
      itunesResults(
        `https://itunes.apple.com/lookup?id=${collection.collectionId}&entity=song&limit=200`,
        deadline
      )
    ))
    batch.forEach((collection, index) => {
      const release = itunesRelease(collection, payloads[index])
      if (release) releases.push(release)
    })
  }
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
      trackCount: release.tracks.length,
      localCount: release.tracks.length - missing.length,
      missingCount: missing.length,
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
    matchesCurrentEntity: mismatchMessage == null,
    mismatchMessage,
    duplicateCount: 0,
    skippedCount: 0,
    releases
  }
}

let counter = 0
let active: { id: string; proc: ChildProcessWithoutNullStreams; cancelled: boolean; owner: string } | null = null
let status: MusicDownloadEvent | null = null
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
    processControls(() => activeProcessTarget(jobId), { killAfterMs: 500 }).cancel?.()
  }, 6_000)
  timer.unref()
  try {
    const code = await runSpotdl(
      ['save', ...queries, '--threads', '8', '--use-cache-file', '--save-file', file],
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
  return found
    ? { foundCount: Number(found[1]), message: `Found ${found[1]} tracks; preparing the preview` }
    : null
}

export function runSpotdl(
  args: string[],
  owner: string,
  onLine?: (line: string) => void,
  jobId?: string,
  spawnProcess: typeof spawn = spawn
): Promise<number> {
  claimMusicMaintenance(owner)
  return new Promise((resolve, reject) => {
    counter += 1
    const id = jobId ?? `spotdl-${process.pid}-${counter}`
    let proc: ChildProcessWithoutNullStreams
    try {
      proc = spawnProcess(spotdlBin(), args, { detached: process.platform !== 'win32' })
    } catch (error) {
      releaseMusicMaintenance(owner)
      reject(error)
      return
    }
    active = { id, proc, cancelled: false, owner }
    const taskSignal = currentActivitySignal()
    const abortFromTask = (): void => {
      if (active?.id !== id) return
      active.cancelled = true
      processControls(() => activeProcessTarget(id)).cancel?.()
    }
    if (taskSignal?.aborted) abortFromTask()
    else taskSignal?.addEventListener('abort', abortFromTask, { once: true })
    const cleanup = (): void => taskSignal?.removeEventListener('abort', abortFromTask)
    const handleLine = onLine ?? (() => undefined)
    pipeProcLines(proc, { tool: 'spotdl', onStdout: handleLine, onStderr: handleLine })
    proc.once('error', (error) => {
      cleanup()
      if (active?.id === id) active = null
      releaseMusicMaintenance(owner)
      reject(new Error(`Could not run "${spotdlBin()}" — install spotDL or set its path in Settings (${error.message})`))
    })
    proc.once('close', (code) => {
      cleanup()
      if (active?.id === id) active = null
      releaseMusicMaintenance(owner)
      resolve(code ?? 1)
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
    const discoveryCode = await runSpotdl(
      ['save', ...queries, '--threads', '8', '--use-cache-file', '--save-file', discoveryFile],
      `Spotify inspection ${input.kind}:${input.entityId}`
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
    }
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
  if (!current.sampleTracks.length) throw new Error(`This ${input.kind} has no local tracks to identify`)
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
            releases: indexed.releases
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
    processControls(() => activeProcessTarget()).cancel?.()
  }
}

export function forgetEntitySource(input: { kind: SpotifyEntityKind; entityId: number }): void {
  spotifyRepo.forgetEntitySource(input.kind, input.entityId)
}

export async function importPlaylist(url: string): Promise<SpotifyImportResult> {
  updateActivity({ phase: 'fetching', done: 0, total: 1 })
  const parsed = await resolvePlaylistUrl(url)
  const existing = spotifyRepo.findPlaylistBySpotifyId(parsed.spotifyId)
  if (existing != null) {
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
    const code = await runSpotdl(buildSpotdlSaveArgs(parsed.canonicalUrl, saveFile), 'Spotify import')
    updateActivity({ phase: 'fetching', done: 1, total: 1 })
    if (code !== 0) {
      throw new Error('spotDL could not read that playlist. It may be private or inaccessible.')
    }
    let payload: unknown
    try {
      payload = JSON.parse(readFileSync(saveFile, 'utf8'))
    } catch {
      throw new Error('spotDL returned an invalid playlist file')
    }
    const validated = validateSpotdlPayload(payload)
    if (validated.songs.length === 0) {
      throw new Error('No importable songs were found. The playlist may be private or unavailable.')
    }
    const covers = await downloadImages(validated.songs.map((song) => song.coverUrl))
    updateActivity({ phase: 'writing', done: validated.songs.length, total: validated.songs.length })
    const created = spotifyRepo.createSpotifyPlaylist({
      spotifyId: parsed.spotifyId,
      sourceUrl: parsed.canonicalUrl,
      title: validated.title,
      songs: validated.songs.map((song) => ({
        ...song,
        coverPath: song.coverUrl ? (covers.get(song.coverUrl) ?? null) : null
      }))
    })
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
  if (!active && !entityRun && !queueRun) status = null
}

export function startPlaylistDownload(input: SpotifyDownloadInput): { id: string } {
  if (active) throw new Error('Music maintenance is already running')
  const pending = spotifyRepo.pendingSpotifyItems(input.playlistId, input.itemIds)
  if (pending.length === 0) throw new Error('There are no selected missing songs to download')
  if (!getSetting('music.dir')?.trim()) throw new Error('Set your music folder first')
  counter += 1
  const id = `spotify-dl-${process.pid}-${counter}`
  const owner = `Spotify playlist download ${id}`
  claimMusicMaintenance(owner)
  status = {
    id,
    status: 'starting',
    percent: 0,
    itemIndex: 0,
    itemCount: pending.length,
    title: null,
    message: null,
    source: 'spotify',
    playlistId: input.playlistId,
    resolvedCount: 0,
    failedCount: 0
  }
  const controls = processControls(() => activeProcessTarget(id), {
    onCancel: () => {
      if (active) active.cancelled = true
    }
  })
  const cancelProcess = controls.cancel
  controls.cancel = () => {
    if (status?.id === id) {
      status.status = 'cancelled'
      status.message = 'Stopping after completed files are scanned'
    }
    cancelProcess?.()
  }
  try {
    const task = tasks.create({
      kind: 'musicDownload',
      label: `Download Spotify playlist (${pending.length})`,
      route: `/music/playlists/${input.playlistId}`,
      controls,
      project: () =>
        status?.id === id
          ? {
              state: DOWNLOAD_STATE[status.status],
              detail: status.title ?? status.message,
              percent: status.percent,
              done: status.itemIndex ?? 0,
              total: status.itemCount ?? 0,
              error: status.status === 'error' ? status.message : null
            }
          : null
    })
    if (status?.id === id) status.taskId = task.id
    void runPlaylistDownload(id, input.playlistId, pending, owner)
  } catch (error) {
    releaseMusicMaintenance(owner)
    throw error
  }
  return { id }
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

interface EntityRun extends SpotifyRunControl {
  input: SpotifyEntityDownloadInput
}

let entityRun: EntityRun | null = null

function stopEntityRun(run: EntityRun, intent: 'pause' | 'cancel'): void {
  if (entityRun?.id !== run.id) return
  run.intent = intent
  if (status?.id === run.id) {
    status.status = intent === 'pause' ? 'pausing' : 'cancelling'
    status.message = intent === 'pause'
      ? 'Pausing safely; completed files will be scanned first'
      : 'Cancelling safely; completed files will be scanned first'
  }
  if (active?.id === run.id) {
    const proc = active.proc
    active.cancelled = true
    processControls(() => processTreeTarget(proc)).cancel?.()
  } else if (intent === 'cancel' && !run.active) {
    // A paused run owns the maintenance gate but has no child or cleanup loop
    // alive. Settle it here instead of leaving an immortal cancelling task.
    if (status?.id === run.id) {
      status.status = 'cancelled'
      status.phase = 'cancelled'
      status.message = 'Download cancelled; completed files were kept and scanned'
    }
    entityRun = null
    releaseMusicMaintenance(run.owner)
  }
}

function resumeEntityRun(run: EntityRun): void {
  if (entityRun?.id !== run.id || run.intent !== 'pause' || run.active) return
  run.intent = 'running'
  if (status?.id === run.id) {
    status.status = 'starting'
    status.message = 'Resuming unresolved releases'
  }
  void runEntityDownload(run)
}

export function startEntityDownload(input: SpotifyEntityDownloadInput): { id: string | null } {
  const maintenance = musicMaintenanceOwner()
  if (maintenance) throw new Error(`Music maintenance is busy: ${maintenance}. Open Tasks to manage it.`)
  const snapshot = spotifyRepo.getEntitySnapshotById(input.snapshotId)
  if (!snapshot) throw new Error('This saved catalogue no longer exists. Refresh it and try again.')
  const inspection = snapshotInspection(snapshot)
  if (!inspection.matchesCurrentEntity && !input.allowMismatch) {
    throw new Error('Confirm the source mismatch before downloading')
  }
  const selected = new Set(input.releaseIds)
  if (!selected.size || [...selected].some((id) => !snapshot.releases.some((release) => release.id === id))) {
    throw new Error('Select at least one release from this catalogue')
  }
  if (snapshot.kind === 'album' && selected.size !== 1) throw new Error('An album download must target one release')
  const selectedReleases = snapshot.releases.filter((release) => selected.has(release.id))
  const estimatedPending = selectedReleases.flatMap((release) => release.tracks)
    .filter((track) => track.matchedTrackId == null)
  if (!estimatedPending.length) return { id: null }
  if (!getSetting('music.dir')?.trim()) throw new Error('Set your music folder first')
  counter += 1
  const id = `spotify-entity-dl-${process.pid}-${counter}`
  const owner = `Spotify entity download ${id}`
  claimMusicMaintenance(owner)
  const route = `/music/${snapshot.kind === 'artist' ? 'artists' : 'albums'}/${snapshot.entityId}`
  status = {
    id,
    status: 'starting',
    percent: null,
    itemIndex: null,
    itemCount: null,
    title: null,
    message: null,
    source: 'spotifyEntity',
    playlistId: null,
    entityKind: snapshot.kind,
    entityId: snapshot.entityId,
    route,
    resolvedCount: 0,
    failedCount: 0,
    phase: 'starting',
    releaseIndex: 0,
    releaseCount: selectedReleases.length,
    releaseTitle: null,
    startedAt: Date.now()
  }
  const run: EntityRun = { id, input, owner, intent: 'running', active: false }
  entityRun = run
  try {
    const task = tasks.create({
      kind: 'musicDownload',
      label: `Download Spotify ${snapshot.kind} (${estimatedPending.length})`,
      route,
      controls: {
        cancel: () => stopEntityRun(run, 'cancel'),
        pause: () => stopEntityRun(run, 'pause'),
        resume: () => resumeEntityRun(run),
        pauseNote: null
      },
      project: () => status?.id === id ? {
        state: DOWNLOAD_STATE[status.status], detail: status.title ?? status.message,
        percent: status.percent, done: status.itemIndex ?? 0, total: status.itemCount ?? 0,
        error: status.status === 'error' ? status.message : null
      } : null
    })
    if (status?.id === id) status.taskId = task.id
    void runEntityDownload(run)
  } catch (error) {
    entityRun = null
    releaseMusicMaintenance(owner)
    throw error
  }
  return { id }
}

async function resolveReleaseForDownload(
  run: SpotifyRunControl,
  snapshot: spotifyRepo.EntitySnapshotRow,
  release: spotifyRepo.EntitySnapshotRow['releases'][number],
  dir: string
): Promise<spotifyRepo.EntitySnapshotRow['releases'][number]> {
  if (release.metadataState === 'resolved' && release.tracks.every((track) => track.rawJson)) return release
  if (status?.id === run.id) {
    status.status = 'resolving'
    status.phase = 'resolvingRelease'
    status.releaseTitle = release.title
    status.message = `Resolving ${release.title} through Spotify`
  }
  const saveFile = join(dir, `release-${release.id}.spotdl`)
  const query = release.spotifyAlbumId
    ? `https://open.spotify.com/album/${release.spotifyAlbumId}`
    : `album:${release.albumArtist} ${release.title}`
  const code = await runSpotdl(buildSpotdlSaveArgs(query, saveFile), run.owner, undefined, run.id)
  if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
  if (code !== 0) throw new Error(`spotDL could not resolve ${release.title}`)
  const validated = validateSpotdlPayload(JSON.parse(readFileSync(saveFile, 'utf8')) as unknown)
  const same = spotifyRepo.normalizeSpotifyMatch
  const songs = validated.songs.filter((song) =>
    same(song.albumTitle) === same(release.title) &&
    same(song.albumArtist ?? song.primaryArtist) === same(release.albumArtist) &&
    song.albumType !== 'compilation'
  )
  if (!songs.length || !songs[0].spotifyAlbumId) {
    throw new Error(`Spotify returned a different release for ${release.title}`)
  }
  const indexedTitles = new Set(release.tracks.map((track) => spotifyRepo.normalizeSpotifyMatch(track.title)))
  const overlap = songs.filter((song) => indexedTitles.has(spotifyRepo.normalizeSpotifyMatch(song.title))).length
  const requiredOverlap = Math.max(1, Math.ceil(Math.min(release.tracks.length, songs.length) / 2))
  if (overlap < requiredOverlap) {
    throw new Error(`Spotify returned a tracklist that does not match ${release.title}`)
  }
  spotifyRepo.resolveEntityRelease(release.id, songs)
  spotifyRepo.linkUnambiguousSources(
    snapshot.kind === 'artist'
      ? songs[0].spotifyArtistIds[songs[0].artists.findIndex((artist) => same(artist) === same(snapshot.sourceName))] ?? null
      : null,
    [{ spotifyAlbumId: songs[0].spotifyAlbumId, songs }]
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

async function runEntityDownload(run: EntityRun): Promise<void> {
  if (run.active) return
  run.active = true
  let dir: string | null = null
  let terminal = false
  try {
    dir = mkdtempSync(join(tmpdir(), 'navihub-spotdl-entity-'))
    let snapshot = spotifyRepo.getEntitySnapshotById(run.input.snapshotId)
    if (!snapshot) throw new Error('This saved catalogue no longer exists')
    const selected = new Set(run.input.releaseIds)
    const releases = snapshot.releases.filter((release) => selected.has(release.id))
    for (let releaseIndex = 0; releaseIndex < releases.length; releaseIndex++) {
      if (run.intent !== 'running') break
      if (status?.id === run.id) {
        status.releaseIndex = releaseIndex + 1
        status.releaseCount = releases.length
        status.releaseTitle = releases[releaseIndex].title
      }
      let release: typeof releases[number]
      try {
        release = await resolveReleaseForDownload(run, snapshot, releases[releaseIndex], dir)
      } catch (error) {
        if (run.intent !== 'running') break
        const message = error instanceof Error ? error.message : String(error)
        spotifyRepo.markEntityReleaseError(releases[releaseIndex].id, message)
        if (status?.id === run.id) {
          status.failedCount = (status.failedCount ?? 0) + releases[releaseIndex].tracks.length
          status.message = message
        }
        continue
      }
      const pending = release.tracks.filter((track) => track.matchedTrackId == null && track.rawJson)
      let processed = 0
      if (status?.id === run.id) {
        status.itemIndex = 0
        status.itemCount = pending.length
        status.percent = pending.length ? 0 : 100
      }
      const chunks = chunkSpotifyItems(pending)
      for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
        if (run.intent !== 'running') break
        const file = join(dir, `release-${release.id}-chunk-${chunkIndex}.spotdl`)
        const errors = join(dir, `release-${release.id}-chunk-${chunkIndex}.errors.spotdl`)
        writeFileSync(file, JSON.stringify(chunks[chunkIndex].map((track) => JSON.parse(track.rawJson!))), {
          encoding: 'utf8', mode: 0o600
        })
        if (status?.id === run.id) {
          status.status = 'downloading'
          status.phase = 'downloading'
          status.message = null
        }
        const code = await runSpotdl(buildSpotdlDownloadArgs(file, musicRootDir(), errors), run.owner, (line) => {
          const event = parseSpotdlLine(line)
          if (!event || status?.id !== run.id) return
          if (event.kind === 'item') status.title = event.title
          if (event.kind === 'progress') {
            status.itemIndex = processed + event.done
            status.percent = status.itemCount
              ? Math.min(99, Math.round(((processed + event.done) / status.itemCount) * 100))
              : null
          }
          if (event.kind === 'error') status.message = event.message
        }, run.id)
        processed += chunks[chunkIndex].length
        if (status?.id === run.id) status.itemIndex = processed
        if (run.intent !== 'running') break
        if (code !== 0) logWarn('proc', `spotDL release download exited with code ${code}: ${release.title}`)
      }
      if (status?.id === run.id) {
        status.status = 'processing'
        status.phase = 'scanning'
        status.message = `Scanning ${release.title} into the library`
      }
      try { await startScan(undefined, run.owner) } catch (error) {
        if (run.intent === 'running') logWarn('proc', `music scan after Spotify release failed: ${error instanceof Error ? error.message : String(error)}`)
      }
      snapshot = spotifyRepo.getEntitySnapshotById(run.input.snapshotId)!
    }
    if (!status || status.id !== run.id) return
    if (run.intent === 'pause') {
      status.status = 'paused'
      status.phase = 'paused'
      status.message = 'Paused safely; Resume continues unresolved releases'
      return
    }
    if (run.intent === 'cancel') {
      status.status = 'cancelled'
      status.phase = 'cancelled'
      status.message = 'Download cancelled; completed files were kept and scanned'
      terminal = true
      return
    }
    const finalSnapshot = spotifyRepo.getEntitySnapshotById(run.input.snapshotId)!
    const finalTracks = finalSnapshot.releases.filter((release) => selected.has(release.id)).flatMap((release) => release.tracks)
    const resolved = finalTracks.filter((track) => track.matchedTrackId != null).length
    Object.assign(status, settleSpotifyBatch({ cancelled: false, resolved, total: finalTracks.length }))
    status.phase = 'done'
    terminal = true
  } catch (error) {
    if (status?.id === run.id) {
      status.status = run.intent === 'cancel' ? 'cancelled' : run.intent === 'pause' ? 'paused' : 'error'
      status.message = error instanceof Error ? error.message : String(error)
      status.phase = status.status
    }
    terminal = run.intent !== 'pause'
  } finally {
    if (dir) rmSync(dir, { recursive: true, force: true })
    run.active = false
    if (terminal) {
      if (entityRun?.id === run.id) entityRun = null
      releaseMusicMaintenance(run.owner)
    }
  }
}

async function runPlaylistDownload(
  id: string,
  playlistId: number,
  rows: Record<string, unknown>[],
  owner: string
): Promise<void> {
  let dir: string | null = null
  const chunks = chunkSpotifyItems(rows)
  let processed = 0
  try {
    dir = mkdtempSync(join(tmpdir(), 'navihub-spotdl-download-'))
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      if (status?.id !== id || ['cancelled', 'cancelling'].includes(status.status)) break
      const file = join(dir, `chunk-${chunkIndex}.spotdl`)
      const errors = join(dir, `chunk-${chunkIndex}.errors.spotdl`)
      writeFileSync(
        file,
        JSON.stringify(chunks[chunkIndex].map((row) => JSON.parse(row.raw_json as string))),
        { encoding: 'utf8', mode: 0o600 }
      )
      status.status = 'downloading'
      const code = await runSpotdl(
        buildSpotdlDownloadArgs(file, musicRootDir(), errors),
        owner,
        (line) => {
          const event = parseSpotdlLine(line)
          if (!event || status?.id !== id) return
          if (event.kind === 'item') status.title = event.title
          if (event.kind === 'progress') {
            status.itemIndex = processed + event.done
            status.percent = Math.round(((processed + event.done) / rows.length) * 100)
          }
          if (event.kind === 'error') status.message = event.message
        },
        id
      )
      processed += chunks[chunkIndex].length
      status.itemIndex = processed
      status.status = 'processing'
      status.message = 'Updating library'
      try {
        await startScan(undefined, owner)
      } catch {
        if (code !== 0) throw new Error(`spotDL exited with code ${code}`)
      }
      const remaining = spotifyRepo.pendingSpotifyItems(playlistId, rows.map((row) => row.id as number))
      status.resolvedCount = rows.length - remaining.length
      status.failedCount = remaining.length
      if (code !== 0 && status.resolvedCount === 0) throw new Error(`spotDL exited with code ${code}`)
    }
    if (!status || status.id !== id) return
    const remaining = spotifyRepo.pendingSpotifyItems(playlistId, rows.map((row) => row.id as number))
    Object.assign(status, settleSpotifyBatch({
      cancelled: active?.cancelled === true || ['cancelled', 'cancelling'].includes(status.status),
      resolved: rows.length - remaining.length,
      total: rows.length
    }))
  } catch (error) {
    if (status?.id === id) {
      status.status = active?.cancelled || status.status === 'cancelling' ? 'cancelled' : 'error'
      status.message = error instanceof Error ? error.message : String(error)
    }
  } finally {
    if (dir) rmSync(dir, { recursive: true, force: true })
    releaseMusicMaintenance(owner)
  }
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

export function addEntityDownloadQueue(
  input: SpotifyEntityDownloadInput
): SpotifyDownloadQueueAddResult {
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
  if (status?.id === run.id) {
    status.status = 'processing'
    status.phase = 'scanning'
    status.message = message
  }
  try {
    await startScan(undefined, run.owner)
  } catch (error) {
    if (run.intent === 'running') {
      logWarn('proc', `music scan during Spotify queue failed: ${error instanceof Error ? error.message : String(error)}`)
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
  const total = snapshot.releases
    .filter((release) => releaseIds.includes(release.id))
    .flatMap((release) => release.tracks).length
  const failures: string[] = []
  for (let releaseIndex = 0; releaseIndex < releaseIds.length; releaseIndex++) {
    if (run.intent !== 'running') break
    const queuedRelease = snapshot.releases.find((release) => release.id === releaseIds[releaseIndex])
    if (!queuedRelease) continue
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
      release = await resolveReleaseForDownload(run, snapshot, queuedRelease, dir)
    } catch (error) {
      if (run.intent !== 'running') break
      const message = error instanceof Error ? error.message : String(error)
      spotifyRepo.markEntityReleaseError(queuedRelease.id, message)
      failures.push(message)
      continue
    }
    const pending = release.tracks.filter((track) => track.matchedTrackId == null && track.rawJson)
    let processed = 0
    if (status?.id === run.id) {
      status.itemIndex = 0
      status.itemCount = pending.length
      status.percent = pending.length ? 0 : 100
    }
    const chunks = chunkSpotifyItems(pending)
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      if (run.intent !== 'running') break
      const file = join(dir, `queue-${card.id}-release-${release.id}-chunk-${chunkIndex}.spotdl`)
      const errors = join(dir, `queue-${card.id}-release-${release.id}-chunk-${chunkIndex}.errors.spotdl`)
      writeFileSync(
        file,
        JSON.stringify(chunks[chunkIndex].map((track) => JSON.parse(track.rawJson!))),
        { encoding: 'utf8', mode: 0o600 }
      )
      if (status?.id === run.id) {
        status.status = 'downloading'
        status.phase = 'downloading'
        status.message = null
      }
      const code = await runSpotdl(buildSpotdlDownloadArgs(file, musicRootDir(), errors), run.owner, (line) => {
        const event = parseSpotdlLine(line)
        if (!event || status?.id !== run.id) return
        if (event.kind === 'item') status.title = event.title
        if (event.kind === 'progress') {
          status.itemIndex = processed + event.done
          status.percent = status.itemCount
            ? Math.min(99, Math.round(((processed + event.done) / status.itemCount) * 100))
            : null
        }
        if (event.kind === 'error') status.message = event.message
      }, run.id)
      processed += chunks[chunkIndex].length
      if (status?.id === run.id) status.itemIndex = processed
      if (run.intent !== 'running') break
      if (code !== 0) failures.push(`spotDL exited with code ${code} for ${release.title}`)
    }
    await scanQueueFiles(run, `Scanning ${release.title} into the library`)
    snapshot = spotifyRepo.getEntitySnapshot(card.entityKind, card.entityId) ?? snapshot
  }
  const current = spotifyRepo.getEntitySnapshot(card.entityKind, card.entityId)
  const selectedTracks = current?.releases
    .filter((release) => releaseIds.includes(release.id))
    .flatMap((release) => release.tracks) ?? []
  const resolved = selectedTracks.filter((track) => track.matchedTrackId != null).length
  const missing = Math.max(0, total - resolved)
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
  if (!rows.length) return { total, resolved: total, error: null }
  let processed = 0
  const failures: string[] = []
  if (status?.id === run.id) {
    status.itemIndex = 0
    status.itemCount = rows.length
    status.releaseCount = null
    status.releaseIndex = null
  }
  const chunks = chunkSpotifyItems(rows)
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    if (run.intent !== 'running') break
    const file = join(dir, `queue-${card.id}-playlist-chunk-${chunkIndex}.spotdl`)
    const errors = join(dir, `queue-${card.id}-playlist-chunk-${chunkIndex}.errors.spotdl`)
    writeFileSync(
      file,
      JSON.stringify(chunks[chunkIndex].map((row) => JSON.parse(row.raw_json as string))),
      { encoding: 'utf8', mode: 0o600 }
    )
    if (status?.id === run.id) {
      status.status = 'downloading'
      status.phase = 'downloading'
      status.message = null
    }
    const code = await runSpotdl(buildSpotdlDownloadArgs(file, musicRootDir(), errors), run.owner, (line) => {
      const event = parseSpotdlLine(line)
      if (!event || status?.id !== run.id) return
      if (event.kind === 'item') status.title = event.title
      if (event.kind === 'progress') {
        status.itemIndex = processed + event.done
        status.percent = rows.length
          ? Math.min(99, Math.round(((processed + event.done) / rows.length) * 100))
          : null
      }
      if (event.kind === 'error') status.message = event.message
    }, run.id)
    processed += chunks[chunkIndex].length
    if (status?.id === run.id) status.itemIndex = processed
    await scanQueueFiles(run, `Scanning downloads from ${card.title}`)
    if (run.intent !== 'running') break
    if (code !== 0) failures.push(`spotDL exited with code ${code}`)
  }
  const remaining = spotifyRepo.pendingSpotifyItems(card.playlistId, itemIds)
  const resolved = total - remaining.length
  return {
    total,
    resolved,
    error: remaining.length > 0
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
    processControls(() => activeProcessTarget(run.id)).cancel?.()
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
  if (run.active) return
  run.active = true
  let dir: string | null = null
  let terminal = false
  let completedCards = 0
  let failedCards = 0
  let resolvedTracks = 0
  let totalTracks = 0
  try {
    dir = mkdtempSync(join(tmpdir(), 'navihub-spotify-queue-'))
    if (run.needsRecoveryScan) {
      run.needsRecoveryScan = false
      await scanQueueFiles(run, 'Recovering completed files before resume')
    }
    while (run.intent === 'running') {
      const card = nextQueueCard(run)
      if (!card) break
      run.activeCardId = card.id
      spotifyRepo.setDownloadQueueCardState(card.id, 'running', null, run.mode === 'all')
      updateQueueStatusCard(card)
      let result: { total: number; resolved: number; error: string | null }
      try {
        result = card.sourceKind === 'entity'
          ? await processEntityQueueCard(run, card, dir)
          : await processPlaylistQueueCard(run, card, dir)
      } catch (error) {
        result = {
          total: card.missingCount,
          resolved: 0,
          error: error instanceof Error ? error.message : String(error)
        }
      }
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
        completedCards += 1
        spotifyRepo.setDownloadQueueCardState(card.id, 'completed', null, false)
      }
    }
    if (!status || status.id !== run.id) return
    status.resolvedCount = resolvedTracks
    status.failedCount = Math.max(0, totalTracks - resolvedTracks)
    status.percent = totalTracks ? Math.round((resolvedTracks / totalTracks) * 100) : 100
    status.phase = failedCards > 0 && completedCards === 0 ? 'error' : 'done'
    status.status = failedCards > 0 && completedCards === 0 ? 'error' : 'done'
    status.message = failedCards > 0
      ? `${failedCards} queue card${failedCards === 1 ? '' : 's'} remain available to retry`
      : null
    terminal = true
  } catch (error) {
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
    if (terminal) {
      if (queueRun?.id === run.id) queueRun = null
      releaseMusicMaintenance(run.owner)
    }
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
      label: mode === 'single' ? `Download ${target.title}` : `Download Spotify queue (${snapshot.pendingSources})`,
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
  if (entityRun?.id === id) {
    stopEntityRun(entityRun, 'cancel')
    return
  }
  status.status = 'cancelling'
  status.message = 'Stopping after completed files are scanned'
  if (active?.id) {
    active.cancelled = true
    processControls(() => activeProcessTarget()).cancel?.()
  }
}

export function killActive(): void {
  inspectionCancelled = true
  inspectionStatus.running = false
  inspectionStatus.cancelled = true
  inspectionStatus.phase = 'idle'
  if (entityRun) entityRun.intent = 'cancel'
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
    if (entityRun) {
      releaseMusicMaintenance(entityRun.owner)
      entityRun = null
    }
    if (queueRun) {
      releaseMusicMaintenance(queueRun.owner)
      queueRun = null
    }
    return
  }
  const owner = active.owner
  const proc = active.proc
  active.cancelled = true
  // Keep the child reference alive for the SIGKILL follow-up after clearing
  // module state. Otherwise a stubborn process survives app shutdown invisibly.
  processControls(() => processTreeTarget(proc), { killAfterMs: 1_000 }).cancel?.()
  active = null
  entityRun = null
  queueRun = null
  releaseMusicMaintenance(owner)
}

function version(bin: string, args: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    execFile(bin, args, { timeout: 5000 }, (error, stdout) => {
      resolve(error ? null : stdout.trim().split('\n')[0] ?? null)
    })
  })
}

export async function detectBinary(): Promise<SpotdlDetectResult> {
  const bin = spotdlBin()
  const [spotdl, ffmpeg] = await Promise.all([
    version(bin, ['--version']),
    version('ffmpeg', ['-version'])
  ])
  return {
    ok: spotdl != null && ffmpeg != null,
    version: spotdl,
    ffmpeg: ffmpeg != null,
    error:
      spotdl == null
        ? `Could not run "${bin}" — install spotDL or set its path`
        : ffmpeg == null
          ? 'ffmpeg not found on PATH — spotDL needs it to create MP3 files'
          : null
  }
}
