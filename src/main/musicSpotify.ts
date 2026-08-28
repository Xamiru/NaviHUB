import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { randomUUID } from 'crypto'
import { get as getSetting } from './repos/settingsRepo'
import { downloadImages, musicRootDir } from './files'
import { fetchWithRetry } from './http'
import { startScan } from './music'
import { claimMusicMaintenance, releaseMusicMaintenance } from './musicMaintenance'
import * as spotifyRepo from './repos/musicSpotifyRepo'
import * as tasks from './tasks'
import { pipeProcLines } from './childLines'
import { processControls } from './taskControls'
import { updateActivity } from './progress'
import { currentActivitySignal } from './activityContext'
import type {
  MusicDownloadEvent,
  SpotifyEntityDownloadInput,
  SpotifyEntityInspectInput,
  SpotifyEntityInspection,
  SpotifyEntityInspectionStatus,
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

export function buildSpotdlSaveArgs(url: string, saveFile: string): string[] {
  return ['save', url, '--threads', '4', '--save-file', saveFile]
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

interface CachedInspection {
  createdAt: number
  inspection: SpotifyEntityInspection
  songs: spotifyRepo.SpotdlSong[]
}

export class SpotifyInspectionCache {
  private entries = new Map<string, CachedInspection>()
  constructor(
    private readonly now: () => number = Date.now,
    private readonly max = 8,
    private readonly ttlMs = 30 * 60_000
  ) {}
  private prune(): void {
    const now = this.now()
    for (const [id, entry] of this.entries) {
      if (now - entry.createdAt >= this.ttlMs) this.entries.delete(id)
    }
  }
  set(entry: Omit<CachedInspection, 'createdAt'>): void {
    this.prune()
    while (this.entries.size >= this.max) this.entries.delete(this.entries.keys().next().value as string)
    this.entries.set(entry.inspection.inspectionId, { ...entry, createdAt: this.now() })
  }
  get(id: string): CachedInspection | null {
    this.prune()
    return this.entries.get(id) ?? null
  }
}

const inspections = new SpotifyInspectionCache()

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
  if (release && same(current.name) === same(release.title) &&
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
    if (!song.spotifyAlbumId) continue
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
      preselected: kind === 'album' || primary
    }
  }).sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title))
}

let counter = 0
let active: { id: string; proc: ChildProcessWithoutNullStreams; cancelled: boolean; owner: string } | null = null
let status: MusicDownloadEvent | null = null
const inspectionStatus: SpotifyEntityInspectionStatus = {
  running: false,
  kind: null,
  entityId: null,
  phase: 'idle',
  message: null,
  foundCount: null,
  cancelled: false
}

export function getInspectionStatus(): SpotifyEntityInspectionStatus {
  return { ...inspectionStatus }
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
      proc = spawnProcess(spotdlBin(), args)
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
      processControls(() => (active?.id === id ? active.proc : null)).cancel?.()
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

export async function inspectEntity(input: SpotifyEntityInspectInput): Promise<SpotifyEntityInspection> {
  const current = spotifyRepo.getEntity(input.kind, input.entityId)
  if (!current) throw new Error(`That local ${input.kind} no longer exists`)
  if (!current.sampleTracks.length) throw new Error(`This ${input.kind} has no local tracks to identify`)
  if (inspectionStatus.running) throw new Error('A Spotify inspection is already running')
  Object.assign(inspectionStatus, {
    running: true,
    kind: input.kind,
    entityId: input.entityId,
    phase: 'discovering',
    message: 'Finding the matching Spotify source from your local music',
    foundCount: null,
    cancelled: false
  })
  updateActivity({ phase: 'fetching', done: 0, total: 1 })
  const dir = mkdtempSync(join(tmpdir(), 'navihub-spotify-inspect-'))
  const saveFile = join(dir, `${input.kind}.spotdl`)
  try {
    let parsed: ParsedSpotifyUrl
    const suppliedUrl = input.url?.trim() || (current.spotifyId
      ? `https://open.spotify.com/${input.kind}/${current.spotifyId}`
      : '')
    if (suppliedUrl) {
      parsed = await resolveEntityUrl(suppliedUrl, input.kind)
    } else {
      const sample = current.sampleTracks[0]
      const discoveryFile = join(dir, 'discovery.spotdl')
      const discoveryCode = await runSpotdl(
        buildSpotdlSaveArgs(buildSpotifyDiscoveryQuery(sample.artist, sample.title), discoveryFile),
        `Spotify inspection ${input.kind}:${input.entityId}`
      )
      if (inspectionStatus.cancelled) {
        throw new tasks.TaskCancelledError('Spotify inspection')
      }
      if (discoveryCode !== 0) throw new Error('NaviHUB could not find this music on Spotify automatically')
      let discoveryPayload: unknown
      try {
        discoveryPayload = JSON.parse(readFileSync(discoveryFile, 'utf8'))
      } catch {
        throw new Error('spotDL returned invalid search metadata')
      }
      parsed = pickDiscoveredEntity(input.kind, current, validateSpotdlPayload(discoveryPayload).songs) ??
        (() => { throw new Error(`NaviHUB could not identify the matching Spotify ${input.kind}. Choose a source manually.`) })()
    }
    Object.assign(inspectionStatus, {
      phase: 'catalogue',
      message: input.kind === 'artist'
        ? 'Reading the Spotify catalogue. Large discographies can take several minutes.'
        : 'Reading the Spotify album tracks'
    })
    const code = await runSpotdl(
      buildSpotdlSaveArgs(parsed.canonicalUrl, saveFile),
      `Spotify inspection ${input.kind}:${input.entityId}`,
      (line) => {
        const event = parseSpotdlInspectionLine(line)
        if (event) Object.assign(inspectionStatus, event)
      }
    )
    if (inspectionStatus.cancelled) {
      throw new tasks.TaskCancelledError('Spotify inspection')
    }
    if (code !== 0) throw new Error(`spotDL could not read that ${input.kind}. It may be inaccessible.`)
    let payload: unknown
    try {
      payload = JSON.parse(readFileSync(saveFile, 'utf8'))
    } catch {
      throw new Error(`spotDL returned invalid ${input.kind} metadata`)
    }
    const validated = validateSpotdlPayload(payload)
    const songs = input.kind === 'album'
      ? validated.songs.filter((song) => song.spotifyAlbumId === parsed.spotifyId)
      : validated.songs
    if (!songs.length) throw new Error(`No downloadable tracks were found for that ${input.kind}`)
    const sourceName = input.kind === 'album'
      ? songs[0].albumTitle
      : (() => {
          for (const song of songs) {
            const index = song.spotifyArtistIds.indexOf(parsed.spotifyId)
            if (index >= 0 && song.artists[index]) return song.artists[index]
          }
          return songs[0].primaryArtist
        })()
    const releases = groupEntityReleases(songs, sourceName, input.kind)
    if (!releases.length) throw new Error('spotDL metadata did not include stable Spotify album IDs')
    Object.assign(inspectionStatus, {
      phase: 'matching',
      message: 'Comparing Spotify tracks with your local library',
      foundCount: songs.length
    })
    const inspection: SpotifyEntityInspection = {
      inspectionId: randomUUID(),
      kind: input.kind,
      entityId: input.entityId,
      sourceId: parsed.spotifyId,
      sourceUrl: parsed.canonicalUrl,
      sourceName,
      matchesCurrentEntity: false,
      mismatchMessage: null,
      duplicateCount: validated.duplicates,
      skippedCount: validated.skipped,
      releases
    }
    inspection.mismatchMessage = mismatchFor(input, current, sourceName, releases)
    inspection.matchesCurrentEntity = inspection.mismatchMessage == null
    inspections.set({ inspection, songs })
    updateActivity({ phase: 'fetching', done: 1, total: 1 })
    return inspection
  } finally {
    inspectionStatus.running = false
    if (!inspectionStatus.cancelled) inspectionStatus.phase = 'idle'
    rmSync(dir, { recursive: true, force: true })
  }
}

export function cancelInspection(): void {
  if (!inspectionStatus.running) return
  inspectionStatus.cancelled = true
  inspectionStatus.message = 'Cancelling Spotify inspection'
  if (active?.owner.startsWith('Spotify inspection ')) {
    active.cancelled = true
    processControls(() => active?.proc ?? null).cancel?.()
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
  downloading: 'running',
  processing: 'running',
  done: 'done',
  error: 'error',
  cancelled: 'cancelled'
}

export function getStatus(): MusicDownloadEvent | null {
  return status ? { ...status } : null
}

export function clearStatus(): void {
  if (!active) status = null
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
  const controls = processControls(() => (active?.id === id ? active.proc : null), {
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
    tasks.create({
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
    void runPlaylistDownload(id, input.playlistId, pending, owner)
  } catch (error) {
    releaseMusicMaintenance(owner)
    throw error
  }
  return { id }
}

export function selectInspectionSongs(
  entry: Pick<CachedInspection, 'inspection' | 'songs'>,
  albumIds: string[]
): spotifyRepo.SpotdlSong[] {
  const allowed = new Set(entry.inspection.releases.map((release) => release.spotifyAlbumId))
  const selected = new Set(albumIds)
  if (!selected.size || [...selected].some((id) => !allowed.has(id))) {
    throw new Error('Select at least one release from this inspection')
  }
  if (entry.inspection.kind === 'album' && selected.size !== 1) {
    throw new Error('An album download must target its inspected release')
  }
  return entry.songs.filter((song) => song.spotifyAlbumId && selected.has(song.spotifyAlbumId))
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

export function startEntityDownload(input: SpotifyEntityDownloadInput): { id: string | null } {
  if (active) throw new Error('Music maintenance is already running')
  const entry = inspections.get(input.inspectionId)
  if (!entry) throw new Error('This Spotify preview expired. Inspect the source again.')
  if (!entry.inspection.matchesCurrentEntity && !input.allowMismatch) {
    throw new Error('Confirm the source mismatch before downloading')
  }
  const selected = selectInspectionSongs(entry, input.albumIds)
  const matches = spotifyRepo.matchDetails(selected)
  const pending = selected.filter((song) => !matches.has(song.spotifyTrackId))
  if (entry.inspection.matchesCurrentEntity) {
    spotifyRepo.rememberEntitySource(
      entry.inspection.kind,
      entry.inspection.entityId,
      entry.inspection.sourceId
    )
  }
  const selectedReleases = input.albumIds.map((spotifyAlbumId) => ({
    spotifyAlbumId,
    songs: selected.filter((song) => song.spotifyAlbumId === spotifyAlbumId)
  }))
  if (!pending.length) {
    spotifyRepo.linkUnambiguousSources(
      entry.inspection.kind === 'artist' ? entry.inspection.sourceId : null,
      selectedReleases
    )
    return { id: null }
  }
  if (!getSetting('music.dir')?.trim()) throw new Error('Set your music folder first')
  counter += 1
  const id = `spotify-entity-dl-${process.pid}-${counter}`
  const owner = `Spotify entity download ${id}`
  claimMusicMaintenance(owner)
  const route = `/music/${entry.inspection.kind === 'artist' ? 'artists' : 'albums'}/${entry.inspection.entityId}`
  status = {
    id,
    status: 'starting',
    percent: 0,
    itemIndex: 0,
    itemCount: pending.length,
    title: null,
    message: null,
    source: 'spotifyEntity',
    playlistId: null,
    entityKind: entry.inspection.kind,
    entityId: entry.inspection.entityId,
    route,
    resolvedCount: 0,
    failedCount: 0
  }
  const controls = processControls(() => (active?.id === id ? active.proc : null), {
    onCancel: () => { if (active) active.cancelled = true }
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
    tasks.create({
      kind: 'musicDownload',
      label: `Download Spotify ${entry.inspection.kind} (${pending.length})`,
      route,
      controls,
      project: () => status?.id === id ? {
        state: DOWNLOAD_STATE[status.status], detail: status.title ?? status.message,
        percent: status.percent, done: status.itemIndex ?? 0, total: status.itemCount ?? 0,
        error: status.status === 'error' ? status.message : null
      } : null
    })
    void runEntityDownload(id, entry, pending, selectedReleases, owner)
  } catch (error) {
    releaseMusicMaintenance(owner)
    throw error
  }
  return { id }
}

async function runEntityDownload(
  id: string,
  entry: CachedInspection,
  songs: spotifyRepo.SpotdlSong[],
  releases: { spotifyAlbumId: string; songs: spotifyRepo.SpotdlSong[] }[],
  owner: string
): Promise<void> {
  let dir: string | null = null
  const chunks = chunkSpotifyItems(songs)
  let processed = 0
  try {
    dir = mkdtempSync(join(tmpdir(), 'navihub-spotdl-entity-'))
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      if (status?.id !== id || status.status === 'cancelled') break
      const file = join(dir, `chunk-${chunkIndex}.spotdl`)
      const errors = join(dir, `chunk-${chunkIndex}.errors.spotdl`)
      writeFileSync(file, JSON.stringify(chunks[chunkIndex].map((song) => JSON.parse(song.rawJson))), {
        encoding: 'utf8', mode: 0o600
      })
      status.status = 'downloading'
      const code = await runSpotdl(buildSpotdlDownloadArgs(file, musicRootDir(), errors), owner, (line) => {
        const event = parseSpotdlLine(line)
        if (!event || status?.id !== id) return
        if (event.kind === 'item') status.title = event.title
        if (event.kind === 'progress') {
          status.itemIndex = processed + event.done
          status.percent = Math.round(((processed + event.done) / songs.length) * 100)
        }
        if (event.kind === 'error') status.message = event.message
      }, id)
      processed += chunks[chunkIndex].length
      status.itemIndex = processed
      status.status = 'processing'
      status.message = 'Updating library'
      try { await startScan(undefined, owner) } catch { if (code !== 0) throw new Error(`spotDL exited with code ${code}`) }
      const resolved = spotifyRepo.matchDetails(songs).size
      status.resolvedCount = resolved
      status.failedCount = songs.length - resolved
      spotifyRepo.linkUnambiguousSources(
        entry.inspection.kind === 'artist' ? entry.inspection.sourceId : null,
        releases
      )
      if (code !== 0 && resolved === 0) throw new Error(`spotDL exited with code ${code}`)
    }
    if (!status || status.id !== id) return
    const resolved = spotifyRepo.matchDetails(songs).size
    Object.assign(status, settleSpotifyBatch({
      cancelled: status.status === 'cancelled',
      resolved,
      total: songs.length
    }))
  } catch (error) {
    if (status?.id === id) {
      status.status = status.status === 'cancelled' ? 'cancelled' : 'error'
      status.message = error instanceof Error ? error.message : String(error)
    }
  } finally {
    if (dir) rmSync(dir, { recursive: true, force: true })
    releaseMusicMaintenance(owner)
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
      if (status?.id !== id || status.status === 'cancelled') break
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
      cancelled: active?.cancelled === true || status.status === 'cancelled',
      resolved: rows.length - remaining.length,
      total: rows.length
    }))
  } catch (error) {
    if (status?.id === id) {
      status.status = active?.cancelled ? 'cancelled' : 'error'
      status.message = error instanceof Error ? error.message : String(error)
    }
  } finally {
    if (dir) rmSync(dir, { recursive: true, force: true })
    releaseMusicMaintenance(owner)
  }
}

export function cancelDownload(id: string): void {
  if (status?.id !== id) return
  status.status = 'cancelled'
  status.message = 'Stopping after completed files are scanned'
  if (active?.id) {
    active.cancelled = true
    processControls(() => active?.proc ?? null).cancel?.()
  }
}

export function killActive(): void {
  if (!active) return
  const owner = active.owner
  active.cancelled = true
  active.proc.kill('SIGKILL')
  active = null
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
