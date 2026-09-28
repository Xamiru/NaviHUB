import { randomUUID } from 'crypto'
import { processUrlJob, validateUrlInput } from './musicUrlQueue'
import { addUrlJob } from './repos/musicUrlRepo'
import { assessMusicSource, durationFits } from '@shared/musicSourceMatch'
import { musicToolOptions, musicYtDlpArgs, musicFailure } from './musicTools'
import { youtubeSourceUrl, inspectAudio, audioSourceInspection, forgetAudioSource, canonicalAudioSource } from './musicSpotifyRecovery'
import * as spotifyWeb from './spotifyWeb'
import { searchYouTubeMusic, type YtmLocale, type YtmSong } from './youtubeMusic'
import {
  albumFolders,
  expectedRecording,
  rankYtmSources,
  runPool,
  sourceSearchLocales,
  sourceSearchQueries,
  stagedOutputBase,
  stagedOutputTemplate,
  taggedInfoJson,
  ytdlpAcquisitionArgs,
  type RankedSource
} from './musicAcquisition'
import { spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { copyFileSync, existsSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync, mkdirSync } from 'fs'
import { tmpdir } from 'os'
import { basename, dirname, extname, isAbsolute, join, relative } from 'path'
import { app } from 'electron'
import { get as getSetting } from './repos/settingsRepo'
import { absoluteMediaPath, downloadImages, musicRootDir } from './files'
import { fetchWithRetry } from './http'
import { indexMusicFiles } from './music'
import { queueLyricsSweep } from './musicLyrics'
import {
  claimMusicMaintenance,
  musicMaintenanceOwner,
  releaseMusicMaintenance
} from './musicMaintenance'
import * as spotifyRepo from './repos/musicSpotifyRepo'
import * as spotifyMatch from './musicSpotifyMatch'
import {
  type ParsedSpotifyUrl,
  type SpotdlValidation,
  parseSpotifyUrl,
  parseSpotifyPlaylistUrl,
  validateSpotdlPayload,
  chunkSpotifyItems,
  estimateSpotifyDownloadBytes,
  buildSpotifyDiscoveryQuery,
  stripCatalogReleaseTypeSuffix,
  spotifyReleaseTitlesMatch,
  completeResolvedReleaseSongs,
  adaptRecoveredReleaseSongs,
  releaseTrackNumberingIsIncomplete,
  rankSpotifyReleaseDiscoveryTracks,
  spotifyAlbumIdFromTrackLookup,
  pickDiscoveredEntity,
  pickConsensusDiscoveredEntity
} from './musicSpotifyCore'
import {
  catalogueCountry,
  fetchItunesSnapshot,
  findEntityCandidates,
  itunesRelease,
  itunesResults
} from './musicCatalogue'
import { detectMusicTools, ytdlpEmbedsOpusCovers } from './musicToolSetup'
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
  SpotifyDownloadCandidateInput,
  TaskState
} from '@shared/types'

function spotifyStagingRoot(): string { return join(musicRootDir(), '.spotdl', 'navihub-downloads') }

/** `only` limits the move to files of finished runs, given as staged output bases without an extension. */
export function recoverSpotifyOutputs(root = musicRootDir(), only?: string[]): string[] {
  const staging = join(root, '.navihub-downloads')
  const manifest = join(staging, 'pending-index.json')
  let paths: string[] = []
  try {
    const saved = JSON.parse(readFileSync(manifest, 'utf8'))
    if (Array.isArray(saved)) paths = saved.filter((path): path is string => typeof path === 'string' && !isAbsolute(path) && !path.split(/[\\/]/).includes('..') && existsSync(join(root, path)))
  } catch { /* no pending index */ }
  const walk = (dir: string, origin: string): void => {
    if (!existsSync(dir)) return
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name)
      if (entry.isDirectory()) { walk(abs, origin); continue }
      if (!entry.isFile() || !['.opus', '.m4a', '.mp3', '.flac', '.ogg', '.wav'].includes(extname(abs))) continue
      // yt-dlp's metadata and thumbnail steps write `<name>.temp.<ext>` before replacing the output.
      if (/\.temp\.[^.]+$/.test(entry.name)) continue
      if (only && !only.some((base) => abs.startsWith(`${base}.`))) continue
      const rel = relative(origin, abs)
      if (rel.split(/[\\/]/).length < 3) continue
      let target = join(root, rel)
      mkdirSync(dirname(target), { recursive: true })
      // A previous file belongs to the library. Keep both until the user reviews them.
      if (existsSync(target)) target = join(dirname(target), `${Date.now()}-${entry.name}`)
      paths.push(relative(root, target).replace(/\\/g, '/'))
      mkdirSync(staging, { recursive: true })
      writeFileSync(`${manifest}.tmp`, JSON.stringify(paths), { mode: 0o600 })
      renameSync(`${manifest}.tmp`, manifest)
      renameSync(abs, target)
    }
  }
  walk(staging, staging)
  const current = join(root, '.spotdl', 'navihub-downloads')
  walk(current, current)
  return [...new Set(paths)]
}

/** Remove what an unfinished yt-dlp run left in staging, so recovery never files a partial track. */
export function discardStagedOutputs(base: string): void {
  const dir = dirname(base)
  if (!existsSync(dir)) return
  const prefix = `${basename(base)}.`
  for (const name of readdirSync(dir)) {
    if (name.startsWith(prefix)) rmSync(join(dir, name), { force: true })
  }
}

async function indexSpotifyOutputs(owner: string, only?: string[]): Promise<void> {
  const started = Date.now()
  recoverProvenanceRenames(musicRootDir())
  const paths = recoverSpotifyOutputs(musicRootDir(), only)
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
  rmSync(join(musicRootDir(), '.navihub-downloads', 'pending-index.json'), { force: true })
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
  const same = spotifyMatch.normalizeSpotifyMatch
  if (input.kind === 'artist') {
    return same(current.name) === same(sourceName)
      ? null
      : `Spotify calls this artist “${sourceName}”, but this page is “${current.name}”.`
  }
  const release = releases[0]
  if (release && same(spotifyMatch.stripAlbumYearPrefix(current.name)) ===
      same(spotifyMatch.stripAlbumYearPrefix(release.title)) &&
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
      spotifyMatch.normalizeSpotifyMatch(first.albumArtist ?? first.primaryArtist) === spotifyMatch.normalizeSpotifyMatch(sourceName)
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
// A yt-dlp child that prints nothing for this long is stuck, not slow: every
// extraction and single-track transfer normally reports within seconds.
const AUDIO_STALL_MS = 10 * 60_000
// Finished downloads join the library in small groups rather than once per 100-song batch.
const LIBRARY_FLUSH_SONGS = 10
const LIBRARY_FLUSH_MS = 20_000
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
      // yt-dlp starts ffmpeg descendants. On POSIX it is spawned as
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
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>
): Promise<ParsedSpotifyUrl | null> {
  if (input.url || current.spotifyId) return null
  const queries = current.sampleTracks.slice(0, 3)
    .map((sample) => buildSpotifyDiscoveryQuery(sample.artist, sample.title))
  if (!queries.length) return null
  let timer: NodeJS.Timeout | undefined
  try {
    // Identity is an optional improvement; it must never delay the catalogue preview.
    const songs = await Promise.race([
      spotifyWeb.searchTracks(queries),
      new Promise<null>((resolve) => { timer = setTimeout(() => resolve(null), 6_000); timer.unref() })
    ])
    if (!songs || inspectionCancelled) return null
    return pickConsensusDiscoveredEntity(input.kind, current, validateSpotdlPayload(songs).songs)
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

export function runMusicProcess(
  args: string[],
  owner: string,
  onLine?: (line: string) => void,
  jobId?: string,
  spawnProcess: typeof spawn = spawn,
  stallTimeoutMs?: number,
  executable = musicToolOptions().ytdlp
): Promise<number> {
  claimMusicMaintenance(owner)
  const started = Date.now()
  return new Promise((resolve, reject) => {
    counter += 1
    const id = jobId ?? `music-${process.pid}-${counter}`
    let proc: ChildProcessWithoutNullStreams
    try {
      proc = spawnProcess(executable, args, {
        detached: process.platform !== 'win32',
        env: {
          ...process.env,
          // yt-dlp is Python-based. Force a stable UTF-8 pipe on Windows so
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
    let stallTimer: NodeJS.Timeout | null = null
    const clearStallTimer = (): void => {
      if (stallTimer) clearTimeout(stallTimer)
      stallTimer = null
    }
    const armStallTimer = (): void => {
      clearStallTimer()
      if (!stallTimeoutMs) return
      stallTimer = setTimeout(() => {
        if (!activeProcesses.has(entry)) return
        stalled = true
        entry.cancelled = true
        processControls(() => processTreeTarget(proc), { killAfterMs: 1_000 }).cancel?.()
      }, stallTimeoutMs)
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
      armStallTimer()
      handleLine(line)
    }
    armStallTimer()
    pipeProcLines(proc, { tool: 'ytdlp', onStdout: observeLine, onStderr: observeLine, logStdout: !args.some((arg) => ['--dump-json', '--dump-single-json'].includes(arg)) })
    proc.once('error', (error) => {
      if (settled) return
      settled = true
      cleanup()
      release()
      reject(new Error(`Could not run ${executable}; install yt-dlp or set its path in Settings (${error.message})`))
    })
    proc.once('close', (code) => {
      if (settled) return
      settled = true
      logInfo('proc', `Music tool process finished in ${Date.now() - started}ms (exit ${code})`)
      cleanup()
      release()
      if (stalled) {
        reject(new Error(
          `yt-dlp stopped responding (no output for ${Math.round((stallTimeoutMs ?? AUDIO_STALL_MS) / 60_000)} minutes), so NaviHUB stopped it. Retry or check yt-dlp in Settings.`
        ))
      } else {
        resolve(code ?? 1)
      }
    })
  })
}

async function inspectWithSpotify(
  input: SpotifyEntityInspectInput,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>
): Promise<SpotifyEntityInspection> {
  let parsed: ParsedSpotifyUrl
  const suppliedUrl = input.url?.trim() || (current.spotifyId
    ? `https://open.spotify.com/${input.kind}/${current.spotifyId}`
    : '')
  if (suppliedUrl) {
    parsed = await resolveEntityUrl(suppliedUrl, input.kind)
  } else {
    inspectionStatus.message = 'Finding the Spotify source from representative local tracks'
    const queries = current.sampleTracks.slice(0, 3)
      .map((sample) => buildSpotifyDiscoveryQuery(sample.artist, sample.title))
    if (!queries.length) {
      throw new Error(
        `The fast catalogue could not identify this ${input.kind}. Use Advanced source replacement to paste its Spotify link.`
      )
    }
    const discovered = await spotifyWeb.searchTracks(queries)
    if (inspectionCancelled) throw new tasks.TaskCancelledError('Spotify inspection')
    parsed = pickDiscoveredEntity(input.kind, current, validateSpotdlPayload(discovered).songs) ??
      (() => { throw new Error(`NaviHUB could not identify the matching Spotify ${input.kind}`) })()
  }

  Object.assign(inspectionStatus, {
    phase: 'spotifyFallback' as const,
    provider: 'spotdl' as const,
    message: 'Fast catalogue unavailable; reading the Spotify catalogue instead.'
  })
  const payload = await spotifyWeb.saveSongs([parsed.canonicalUrl], (done, total) => {
    inspectionStatus.message = `Reading Spotify releases (${done}/${total})`
  })
  if (inspectionCancelled) throw new tasks.TaskCancelledError('Spotify inspection')
  const validated = validateSpotdlPayload(payload)
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
      spotifyMatch.normalizeSpotifyMatch(song.albumArtist ?? song.primaryArtist) ===
      spotifyMatch.normalizeSpotifyMatch(sourceName)
    )
  }
  const grouped = new Map<string, spotifyRepo.SpotdlSong[]>()
  for (const song of songs) {
    if (!song.spotifyAlbumId) continue
    const rows = grouped.get(song.spotifyAlbumId) ?? []
    rows.push(song)
    grouped.set(song.spotifyAlbumId, rows)
  }
  if (!grouped.size) throw new Error('Spotify metadata did not include stable album IDs')
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
  // A paused run releases the maintenance lock but still owns its cards' catalogues.
  if (queueRun) throw new Error('The Spotify download queue is paused. Resume or cancel it in Downloads first.')
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
          logWarn('proc', `fast music candidate search failed; falling back to the Spotify catalogue: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      if (candidateKey && !input.url) {
        Object.assign(inspectionStatus, {
          phase: 'catalogue' as const,
          provider: 'itunes' as const,
          message: 'Reading albums and tracklists from the fast catalogue'
        })
        const identityPromise = discoverIdentityBounded(input, current)
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
          logWarn('proc', `fast music catalogue failed; falling back to the Spotify catalogue: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      return await inspectWithSpotify(input, current)
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
  updateActivity({ phase: 'fetching', detail: 'Reading the public playlist from Spotify', done: 0, total: 0 })
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
  const read = await spotifyWeb.readPlaylist(parsed.spotifyId, (done, total) =>
    updateActivity({ detail: `Reading playlist tracks (${done}/${total})`, done, total }))
  assertPlaylistSnapshotComplete(read.songs, read.total)
  const validated = validateSpotdlPayload(read.songs)
  if (validated.songs.length === 0) {
    throw new Error('No importable songs were found. The playlist may be empty or contain only local files.')
  }
  updateActivity({ detail: 'Downloading track covers', done: 0, total: 0 })
  const covers = await downloadImages(validated.songs.map((song) => song.coverUrl))
  updateActivity({
    phase: 'writing',
    detail: `Matching and saving ${validated.songs.length} tracks`,
    done: validated.songs.length,
    total: validated.songs.length
  })
  const created = spotifyRepo.createSpotifyPlaylist({
    playlistId: refresh ? existing ?? undefined : undefined,
    complete: true,
    spotifyId: parsed.spotifyId,
    sourceUrl: parsed.canonicalUrl,
    title: read.title,
    songs: validated.songs.map((song) => ({
      ...song,
      coverPath: song.coverUrl ? (covers.get(song.coverUrl) ?? null) : null
    }))
  })
  return {
    playlistId: created.playlistId,
    existing: false,
    title: read.title,
    imported: validated.songs.length,
    matched: created.matched,
    missing: validated.songs.length - created.matched,
    duplicates: validated.duplicates,
    skipped: validated.skipped
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
  const result = startDownloadQueue({ jobId: queued.jobId, prioritize: true })
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
      message: 'No songs were downloaded. Check yt-dlp and ffmpeg in Settings.',
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
  let indexed: spotifyRepo.IndexedEntityRelease | null = null
  try {
    const rows = await itunesResults(
      `https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=200`,
      undefined, snapshot.catalogueCountry
    )
    const collection = rows.find((row) =>
      row.wrapperType === 'collection' && row.collectionId === collectionId
    )
    indexed = collection ? itunesRelease(collection, rows) : null
  } catch (error) {
    // The repair is optional; the release keeps the tracks it already has.
    logWarn('proc', `Apple track list unavailable for ${release.title}: ${error instanceof Error ? error.message : String(error)}`)
  }
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
    super('Spotify album metadata was incomplete')
  }
}

async function resolveReleaseForDownload(
  run: SpotifyRunControl,
  snapshot: spotifyRepo.EntitySnapshotRow,
  initialRelease: spotifyRepo.EntitySnapshotRow['releases'][number]
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
      let lookup: SpotdlValidation
      try {
        lookup = validateSpotdlPayload(await spotifyWeb.searchTracks([buildSpotifyDiscoveryQuery(release.albumArtist, candidate.title)]))
      } catch (error) {
        logWarn('proc', `Spotify edition lookup failed for ${release.title}: ${error instanceof Error ? error.message : String(error)}`)
        continue
      }
      if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
      spotifyAlbumId = spotifyAlbumIdFromTrackLookup(release, candidate, lookup.songs)
      if (spotifyAlbumId) break
    }
    if (!spotifyAlbumId) {
      throw new Error(`NaviHUB could not identify the Spotify edition for ${release.title}`)
    }
  }
  spotifyRepo.rememberEntityReleaseSpotifyAlbum(release.id, spotifyAlbumId)
  if (status?.id === run.id) status.message = `Loading ${release.title} from Spotify`
  const validated = validateSpotdlPayload(await spotifyWeb.readAlbum(spotifyAlbumId))
  if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
  const same = spotifyMatch.normalizeSpotifyMatch
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
    try {
      const recoveredCandidates = validateSpotdlPayload(await spotifyWeb.searchTracks(
        complete.missing.map((track) => buildSpotifyDiscoveryQuery(release.albumArtist, track.title))
      )).songs
      if (run.intent !== 'running') throw new tasks.TaskCancelledError('Spotify release resolution')
      const recovered = adaptRecoveredReleaseSongs(release, complete.missing, recoveredCandidates, spotifyAlbumId)
      const byId = new Map(songs.map((song) => [song.spotifyTrackId, song]))
      for (const song of recovered) byId.set(song.spotifyTrackId, song)
      songs = [...byId.values()]
      complete = completeResolvedReleaseSongs(release, songs)
    } catch (error) {
      if (error instanceof tasks.TaskCancelledError) throw error
      logWarn('proc', `Spotify recovery metadata failed for ${release.title}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  if (complete.missing.length) {
    // Keep the complete Apple catalogue in the database; the release stays
    // retryable rather than downloading a partial edition.
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
  /** Cards a single-card run was asked for; later "start now" requests join it. */
  targetJobIds: Set<number>
  activeCardId: number | null
  processed: Set<number>
  /** Cards that received new songs while they were being processed. */
  rerun: Set<number>
  /** Playlist cards this run passes over only partly: a single song's Download leaves the rest queued. */
  onlyItems: Map<number, Set<number>>
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
  // One unreadable release must not block the others.
  const readable: number[] = []
  const unreadable: string[] = []
  for (const releaseId of input.releaseIds) {
    try {
      await loadReleaseTracks(input.snapshotId, releaseId)
      readable.push(releaseId)
    } catch (error) {
      const title = spotifyRepo.getEntitySnapshotById(input.snapshotId)?.releases.find((row) => row.id === releaseId)?.title
      unreadable.push(title ?? 'A release')
      logWarn('proc', error instanceof Error ? error.message : String(error))
    }
  }
  if (!readable.length) throw new Error(`Couldn't read the track list for ${unreadable.join(', ')}. Try again later.`)
  const snapshot = spotifyRepo.getEntitySnapshotById(input.snapshotId)
  if (!snapshot) throw new Error('This saved catalogue no longer exists. Refresh it and try again.')
  if (!snapshotInspection(snapshot).matchesCurrentEntity && !input.allowMismatch) {
    throw new Error('Confirm the source mismatch before adding it to the queue')
  }
  return { ...rerunActiveCard(spotifyRepo.addEntityToDownloadQueue({ ...input, releaseIds: readable })), unreadable }
}

export function addPlaylistDownloadQueue(input: SpotifyDownloadInput): SpotifyDownloadQueueAddResult {
  return rerunActiveCard(spotifyRepo.addPlaylistToDownloadQueue(input))
}

// The runner read the active card's selections when its pass began; songs added
// since then need another pass, whether or not the caller also starts the queue.
function rerunActiveCard(result: SpotifyDownloadQueueAddResult): SpotifyDownloadQueueAddResult {
  if (result.jobId != null && result.addedSelections > 0 && queueRun?.activeCardId === result.jobId) {
    queueRun.rerun.add(result.jobId)
  }
  return result
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

function queueOnlyItemIds(cardId: number): number[] | null {
  const only = queueRun?.onlyItems.get(cardId)
  return only ? [...only] : null
}

function updateQueueStatusCard(card: NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>>): void {
  if (!status || status.id !== queueRun?.id) return
  status.queueCardId = card.id
  status.queueItemIds = queueOnlyItemIds(card.id)
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
  card: NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>>
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
      release = group.length > 1 ? queuedRelease : await resolveReleaseForDownload(run, snapshot, queuedRelease)
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
        for (const upcoming of next) resolved.push(await resolveReleaseForDownload(run, snapshot, upcoming))
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
      chunkSpotifyItems(spotifyMatch.singleRecordingDownloads(
          pending.filter((track) => track.allowUnverified === allowUnverified),
          (track) => ({ ...track, manual: Boolean(track.audioSourceUrl || track.allowUnverified) })
        ))
        .map((items) => ({ items, allowUnverified }))
    )
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      if (run.intent !== 'running') break
      if (status?.id === run.id) {
        status.status = 'downloading'
        status.phase = 'downloading'
        status.message = null
      }
      const code = await acquireSongs({
        songs: chunks[chunkIndex].items.map((track) => payloadWithAudioSource(track.rawJson!, track.audioSourceUrl) as Record<string, unknown>),
        owner: run.owner,
        jobId: run.id,
        broader: chunks[chunkIndex].allowUnverified,
        onProgress: (done, _total, title) => {
          if (status?.id !== run.id) return
          if (title) status.title = title
          status.itemIndex = processed + done
          status.percent = status.itemCount ? Math.min(99, Math.round(((processed + done) / status.itemCount) * 100)) : null
        }
      })
      processed += chunks[chunkIndex].items.length
      if (status?.id === run.id) status.itemIndex = processed
      if (run.intent !== 'running') break
      if (code !== 0) failures.push(`Some tracks from ${release.title} could not be downloaded`)
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
  card: NonNullable<ReturnType<typeof spotifyRepo.getDownloadQueueCard>>
): Promise<{ total: number; resolved: number; error: string | null }> {
  if (card.playlistId == null) throw new Error('The queued playlist no longer exists')
  const only = run.onlyItems.get(card.id)
  const itemIds = card.selections
    .filter((selection) => selection.kind === 'playlistItem' && (!only || only.has(selection.sourceId)))
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
    chunkSpotifyItems(spotifyMatch.singleRecordingDownloads(
      rows.filter((row) => Boolean(row.allow_unverified) === allowUnverified),
      (row) => ({ title: String(row.title), primaryArtist: String(row.primary_artist),
        albumTitle: String(row.album_title), duration: row.duration as number | null,
        manual: Boolean(row.audio_source_url || row.allow_unverified) })
    ))
      .map((items) => ({ items, allowUnverified }))
  )
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    if (run.intent !== 'running') break
    if (status?.id === run.id) {
      status.status = 'downloading'
      status.phase = 'downloading'
      status.message = null
    }
    const code = await acquireSongs({
      songs: chunks[chunkIndex].items.map((row) =>
        payloadWithAudioSource(row.raw_json as string, (row.audio_source_url as string) ?? null) as Record<string, unknown>),
      owner: run.owner,
      jobId: run.id,
      broader: chunks[chunkIndex].allowUnverified,
      onProgress: (done, _total, title) => {
        if (status?.id !== run.id) return
        if (title) status.title = title
        status.itemIndex = processed + done
        status.percent = rows.length ? Math.min(99, Math.round(((processed + done) / rows.length) * 100)) : null
      }
    })
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
    if (code !== 0) failures.push('Some tracks could not be downloaded')
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
    return snapshot.pending.find((card) => run.targetJobIds.has(card.id) && !run.processed.has(card.id)) ?? null
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
  let toolsReady = false
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
        if (!toolsReady) {
          const readiness = await detectMusicTools()
          if (!readiness.ok) throw new Error(readiness.error ?? 'Music download tools are not ready')
          toolsReady = true
        }
        result = card.sourceKind === 'url'
          ? await processUrlJob(card.id, run.owner, (args, onLine) => runMusicCommand(args, run.owner, onLine, run.id), () => run.intent === 'running' && !abandonedRuns.has(run.id), (patch) => { if (status?.id === run.id) Object.assign(status, patch) })
          : card.sourceKind === 'entity'
          ? await processEntityQueueCard(run, card)
          : await processPlaylistQueueCard(run, card)
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
      if (run.rerun.delete(card.id)) {
        // Songs were added mid-pass: process the card again before moving on.
        spotifyRepo.setDownloadQueueCardState(card.id, 'queued', null, false)
        continue
      }
      run.processed.add(card.id)
      const only = run.onlyItems.get(card.id)
      run.onlyItems.delete(card.id)
      if (result.error) failedCards += 1
      if (only && card.playlistId != null && spotifyRepo.pendingSpotifyItems(
        card.playlistId,
        card.selections.filter((selection) => selection.kind === 'playlistItem' && !only.has(selection.sourceId))
          .map((selection) => selection.sourceId)
      ).length > 0) {
        // The rest of the card was never part of this pass; its failures stay on the song rows.
        spotifyRepo.setDownloadQueueCardState(card.id, 'queued', null, false)
      } else if (result.error) {
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
          status.queueItemIds = queueOnlyItemIds(next.id)
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
    // New tracks get their lyrics now so they are already stored offline.
    if (resolvedTracks > 0) queueLyricsSweep()
  }
}

export function startDownloadQueue(input: SpotifyDownloadQueueStartInput = {}): { id: string | null } {
  if (queueRun) {
    if (input.prioritize && input.jobId != null) {
      const whole = !queueRun.processed.has(input.jobId) && !queueRun.onlyItems.has(input.jobId) &&
        (queueRun.mode === 'all' || queueRun.targetJobIds.has(input.jobId))
      if (!input.itemIds?.length) queueRun.onlyItems.delete(input.jobId)
      else if (!whole) {
        queueRun.onlyItems.set(input.jobId, new Set([...(queueRun.onlyItems.get(input.jobId) ?? []), ...input.itemIds]))
      }
      queueRun.processed.delete(input.jobId)
      queueRun.targetJobIds.add(input.jobId)
      if (queueRun.activeCardId === input.jobId) {
        queueRun.rerun.add(input.jobId)
        if (status?.id === queueRun.id) status.queueItemIds = queueOnlyItemIds(input.jobId)
      }
      spotifyRepo.prioritizeDownloadQueueCard(input.jobId)
      return { id: queueRun.id }
    }
    throw new Error('The Spotify download queue is already running. Open Downloads to manage it.')
  }
  const maintenance = musicMaintenanceOwner()
  if (maintenance) throw new Error(`Music maintenance is busy: ${maintenance}. Open Tasks to manage it.`)
  // Inspection rewrites the catalogue snapshot a card downloads from.
  if (inspectionStatus.running) {
    throw new Error(`Music metadata is busy with ${inspectionStatus.kind ?? 'another'} inspection. Open Tasks to manage it.`)
  }
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
    targetJobIds: new Set(mode === 'single' ? [target.id] : []),
    activeCardId: null,
    processed: new Set(),
    rerun: new Set(),
    onlyItems: new Map(mode === 'single' && input.itemIds?.length ? [[target.id, new Set(input.itemIds)]] : []),
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

export function skipPlaylistDownload(itemId: number, skipped: boolean): void {
  assertTrackNotDownloading('playlistItem', itemId)
  spotifyRepo.skipPlaylistDownload(itemId, skipped)
}

/** Spotify ids inside an acquisition batch right now; only these songs are locked while the queue runs. */
const acquiringSpotifyIds = new Set<string>()

function assertTrackNotDownloading(kind: 'playlistItem' | 'entityTrack', id: number): void {
  const spotifyId = spotifyRepo.spotifyTrackIdForSource(kind, id)
  if (spotifyId != null && acquiringSpotifyIds.has(spotifyId)) {
    throw new Error('This song is downloading right now. Wait for it to finish or pause Downloads first.')
  }
}

export async function setTrackDownloadOptions(input: SpotifyTrackDownloadOptionsInput): Promise<void> {
  assertTrackNotDownloading(input.sourceKind, input.trackId)
  let audioSourceUrl = input.audioSourceUrl
  if (audioSourceUrl != null) {
    audioSourceUrl = audioSourceUrl.trim()
    if (audioSourceUrl) {
      audioSourceUrl = youtubeSourceUrl(audioSourceUrl)
    } else audioSourceUrl = null
  }
  const evidence = input.approveSource && audioSourceUrl ? await inspectAudio(audioSourceUrl) : null
  assertTrackNotDownloading(input.sourceKind, input.trackId)
  const maintenance = musicMaintenanceOwner()
  if (maintenance && maintenance !== queueRun?.owner) throw new Error('Pause music tasks before changing a song source')
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
      startDownloadQueue({
        jobId: queued.jobId,
        itemIds: input.sourceKind === 'playlistItem' ? [input.trackId] : undefined,
        prioritize: true
      })
    }
  }
}

export async function loadReleaseTracks(snapshotId: number, releaseId: number): Promise<SpotifyEntityInspection> {
  const snapshot = spotifyRepo.getEntitySnapshotById(snapshotId)
  const release = snapshot?.releases.find((row) => row.id === releaseId)
  if (!snapshot || !release) throw new Error('That catalogue release no longer exists')
  if (!release.tracksLoaded && snapshot.provider === 'itunes') {
    let indexed: spotifyRepo.IndexedEntityRelease | null = null
    try {
      const rows = await itunesResults(
        `https://itunes.apple.com/lookup?id=${release.providerReleaseId}&entity=song&limit=200`,
        undefined, snapshot.catalogueCountry
      )
      const collection = rows.find((row) => row.wrapperType === 'collection')
      indexed = collection ? itunesRelease(collection, rows) : null
    } catch (error) {
      logWarn('proc', `Apple track list unavailable for ${release.title}: ${error instanceof Error ? error.message : String(error)}`)
    }
    // Apple omits tracks it does not sell in the chosen country; Spotify has the full release.
    const spotify = indexed ? null : await spotifyReleaseTracks(release)
    if (!indexed && !spotify) throw new Error(`Couldn't read the track list for ${release.title}`)
    spotifyRepo.hydrateIndexedRelease(snapshot, releaseId, indexed ?? spotify!.indexed)
    if (spotify) spotifyRepo.rememberEntityReleaseSpotifyAlbum(releaseId, spotify.albumId)
  }
  return snapshotInspection(spotifyRepo.getEntitySnapshotById(snapshotId)!)
}

/** The same release on Spotify, preferring the edition with Apple's advertised track count. */
async function spotifyReleaseTracks(
  release: spotifyRepo.EntitySnapshotRow['releases'][number]
): Promise<{ albumId: string; indexed: spotifyRepo.IndexedEntityRelease } | null> {
  const same = spotifyMatch.normalizeSpotifyMatch
  const hits = (await spotifyWeb.searchAlbums(`${release.albumArtist} ${stripCatalogReleaseTypeSuffix(release.title)}`))
    .filter((hit) => spotifyReleaseTitlesMatch(release.title, hit.name) &&
      hit.artists.some((artist) => same(artist) === same(release.albumArtist)))
    .slice(0, 3)
  let best: { albumId: string; songs: spotifyRepo.SpotdlSong[] } | null = null
  for (const hit of hits) {
    const songs = validateSpotdlPayload(await spotifyWeb.readAlbum(hit.id)).songs
    if (!songs.length) continue
    if (!best) best = { albumId: hit.id, songs }
    if (release.expectedTracks != null && songs.length === release.expectedTracks) { best = { albumId: hit.id, songs }; break }
  }
  if (!best) return null
  return {
    albumId: best.albumId,
    indexed: {
      expectedTracks: best.songs.length,
      tracksLoaded: true,
      providerReleaseId: release.providerReleaseId,
      title: release.title,
      albumArtist: release.albumArtist,
      year: release.year,
      albumType: release.albumType === 'single' ? 'single' : 'album',
      tracks: best.songs.map((song) => ({
        providerTrackId: song.spotifyTrackId,
        title: song.title,
        artists: song.artists,
        primaryArtist: song.primaryArtist,
        albumTitle: release.title,
        duration: song.duration,
        discNo: song.discNo,
        trackNo: song.trackNo
      }))
    }
  }
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

export function assertPlaylistSnapshotComplete(payload: unknown, expected: number | null): void {
  if (!Array.isArray(payload) || expected == null || payload.length !== expected) {
    throw new Error(`Spotify returned an incomplete playlist (${Array.isArray(payload) ? payload.length : 0}/${expected ?? '?'}); your existing playlist was kept. Retry to finish the snapshot.`)
  }
}

interface AcquireInput {
  songs: Record<string, unknown>[]
  owner: string
  jobId: string
  /** Broader retry: also consider ordinary YouTube videos; results always need review. */
  broader: boolean
  onProgress?: (done: number, total: number, title: string | null) => void
}

async function findYouTubeMusicSource(raw: Record<string, unknown>, broader: boolean): Promise<RankedSource | null> {
  const expected = expectedRecording(raw)
  // One view per video and catalogue language: ranking combines them.
  const seen = new Map<string, YtmSong>()
  let ranked: RankedSource[] = []
  // Once one search has answered, a later failing one (another locale) only narrows the evidence.
  let answered = false
  let failure: unknown = null
  const search = async (query: string, kind: 'songs' | 'videos', locale: YtmLocale = 'en') => {
    let songs: YtmSong[]
    try {
      songs = await searchYouTubeMusic(query, kind, locale)
    } catch (error) {
      if (!answered) throw error
      failure ??= error
      return
    }
    answered = true
    for (const song of songs) {
      if (!seen.has(`${song.videoId}:${locale}`)) seen.set(`${song.videoId}:${locale}`, song)
    }
    ranked = rankYtmSources(expected, [...seen.values()])
  }
  const queries = sourceSearchQueries(expected)
  for (const query of queries) {
    for (const locale of sourceSearchLocales(expected)) {
      await search(query, 'songs', locale)
      if (ranked[0]?.strong) return ranked[0]
    }
  }
  if (broader) await search(queries[0], 'videos')
  // A different song is no evidence at all; only a same-title near miss is worth reviewing.
  const result = broader
    ? ranked[0] ?? null
    : ranked[0] && !ranked[0].reasons.includes('Title or recording version differs') ? ranked[0] : null
  // A failed search may have hidden the recording, so nothing found is then a lookup failure.
  if (!result && failure) throw failure
  return result
}

/** Without embedded art the album folder gets the Spotify cover, which the library scan reads. */
async function writeFolderCover(raw: Record<string, unknown>): Promise<void> {
  const url = typeof raw.cover_url === 'string' ? raw.cover_url : null
  if (!url) return
  const dir = join(musicRootDir(), ...albumFolders(raw))
  if (['cover.jpg', 'cover.png', 'folder.jpg'].some((name) => existsSync(join(dir, name)))) return
  const rel = (await downloadImages([url])).get(url)
  if (!rel) return
  mkdirSync(dir, { recursive: true })
  copyFileSync(absoluteMediaPath(rel), join(dir, 'cover.jpg'))
}

/**
 * Find a source on YouTube Music, inspect it with yt-dlp for independent
 * evidence, then download each approved source in its native codec with the
 * Spotify tags applied. Every song keeps its own source pin and error.
 */
async function acquireSongs(input: AcquireInput): Promise<number> {
  const ids = input.songs.map((raw) => String(raw.song_id))
  for (const id of ids) acquiringSpotifyIds.add(id)
  try {
    return await acquireLockedSongs(input)
  } finally {
    for (const id of ids) acquiringSpotifyIds.delete(id)
  }
}

async function acquireLockedSongs(input: AcquireInput): Promise<number> {
  const { owner, jobId } = input
  const fileExists = (path: string) => { try { return statSync(absoluteMediaPath(`music/${path}`)).isFile() } catch { return false } }
  const acquisitionKeys = new Set<string>()
  const songs = input.songs.filter((raw) => {
    const key = `${String(raw.song_id)}:${String(raw.download_url ?? '')}`
    if (acquisitionKeys.has(key)) return false
    acquisitionKeys.add(key)
    if (raw.download_url) return true // An explicit source may only reuse that exact source.
    const song = { title: String(raw.name), primaryArtist: String((raw.artists as string[] | undefined)?.[0] ?? raw.artist ?? ''), albumTitle: String(raw.album_name ?? ''), duration: typeof raw.duration === 'number' ? raw.duration : null }
    const candidates = spotifyRepo.acquisitionCandidates(song).filter((row) => fileExists(row.filePath))
    const match = spotifyMatch.matchSpotifyPlaylistSong(song, candidates)
    if (match != null) { spotifyRepo.linkAvailableLocal(String(raw.song_id), match); return false }
    if (candidates.length > 1) {
      for (const ref of spotifyRepo.sourcesForSpotifyId(String(raw.song_id))) if (!ref.manual) spotifyRepo.setTrackDownloadErrors(ref.kind, new Map([[ref.id, 'Needs review: several local recordings are compatible; choose a local version']]))
      return false
    }
    return true
  })
  let failures = 0
  const started = Date.now()
  const workers = musicToolOptions().workers
  const running = () => !abandonedRuns.has(jobId) && (queueRun?.owner !== owner || queueRun.intent === 'running')
  // One token per source file: two Spotify songs that resolve to one source share its
  // download and both link to it after indexing.
  const artifacts = new Map<string, string>()
  // Each claim settles with the download's failure message, or null.
  const claimedSources = new Map<string, Promise<string | null>>()
  const finished: string[] = []
  let lastFlush = Date.now()
  let indexing: Promise<void> = Promise.resolve()
  const flushFinished = () => {
    const bases = finished.splice(0)
    lastFlush = Date.now()
    indexing = indexing.then(() => indexSpotifyOutputs(owner, bases)).catch((error) =>
      logWarn('proc', `Finished downloads were not added to the library yet: ${error instanceof Error ? error.message : String(error)}`))
  }
  const embedsOpusCovers = await ytdlpEmbedsOpusCovers()
  const tempDir = mkdtempSync(join(tmpdir(), 'navihub-acquire-'))
  let done = 0
  input.onProgress?.(0, songs.length, null)
  const fail = (references: ReturnType<typeof spotifyRepo.sourcesForSpotifyId>, message: string) => {
    failures++
    for (const ref of references) spotifyRepo.setTrackDownloadErrors(ref.kind, new Map([[ref.id, message]]))
  }
  const failTransfer = (id: string, url: string, message: string) => {
    failures++
    for (const ref of spotifyRepo.sourcesForSpotifyId(id)) {
      if (ref.manual && ref.manual !== url) continue
      spotifyRepo.setTrackDownloadErrors(ref.kind, new Map([[ref.id, message]]))
      spotifyRepo.invalidateSourceAccess(ref.kind, ref.id)
    }
  }

  /** One song from search to finished file, so files arrive while later songs are still being found. */
  async function acquireOne(raw: Record<string, unknown>, index: number): Promise<void> {
    const id = String(raw.song_id)
    const references = spotifyRepo.sourcesForSpotifyId(id).filter((ref) => !ref.manual || ref.manual === raw.download_url)
    // A pick that failed review is searched again, so better matching reaches it.
    const saved = references.map((ref) => spotifyRepo.sourceEvidence(ref.kind, ref.id))
      .find((proof) => proof && (raw.download_url ? proof.evidence.url === raw.download_url : proof.approved || proof.validated))
    let url = typeof raw.download_url === 'string' ? raw.download_url : saved?.evidence.url
    let found: RankedSource | null = null
    if (!url) {
      try {
        found = await findYouTubeMusicSource(raw, input.broader)
        url = found?.source.url
      } catch (error) {
        return fail(references, musicFailure('Lookup', 'YouTube Music search', error instanceof Error ? error.message : String(error)))
      }
      if (!url) return fail(references, 'Needs review: YouTube Music has no matching recording; choose one')
    }
    if (!running()) return
    let canonical: string
    try { canonical = canonicalAudioSource(url) } catch (error) { return fail(references, error instanceof Error ? error.message : String(error)) }
    const infoFile = join(tempDir, `${index}.info.json`)
    const inspected = await inspectAudioSourcesInQueue([canonical], owner, jobId, (_url, row) =>
      writeFileSync(infoFile, JSON.stringify(row), { mode: 0o600 }))
    if (!running()) return
    const evidence = inspected.get(canonical)
    if (!evidence) return fail(references, inspected.errors.get(canonical) ?? 'Extraction (yt-dlp): no verified source metadata returned; inspect the source or choose another recording')
    if (saved?.approved && (saved.evidence.url !== evidence.url || saved.evidence.title !== evidence.title ||
        saved.evidence.duration !== evidence.duration)) return fail(references, 'The approved source changed; review it again')
    const expected = expectedRecording(raw)
    const assessment = assessMusicSource(expected, evidence)
    // yt-dlp reports YouTube's translated title ("Gurenge" for 紅蓮華), so a strong YouTube Music
    // match for this exact video stands once yt-dlp confirms its length and no version wording.
    // A retry reuses the validated video without searching, so that earlier match still counts.
    const catalogued = found?.strong === true || (found == null && saved?.validated === true && saved.evidence.url === evidence.url)
    const catalogueMatch = catalogued && durationFits(expected.duration, evidence.duration) &&
      !assessment.reasons.includes('Recording variant differs')
    const approved = Boolean(saved?.approved)
    const validated = approved || (!references.some((ref) => ref.broader || ref.manual) && (assessment.strong || catalogueMatch))
    for (const ref of references) spotifyRepo.saveSourceEvidence(ref.kind, ref.id, evidence, approved, validated)
    if (!validated) return fail(references, `Needs review: ${assessment.reasons.join('; ') || 'Confirm this source before downloading'}`)
    const archived = spotifyRepo.archivedAudioSource(evidence.url).find((row) => row.duration != null && row.duration > 0 && (evidence.duration == null ? approved : Math.abs(row.duration - evidence.duration) <= spotifyMatch.compatibleSpotifyDurationTolerance(evidence.duration)) && fileExists(row.filePath))
    if (archived) { spotifyRepo.linkVerifiedSource(id, archived.id, evidence.url); return }
    const artifact = artifacts.get(evidence.url) ?? randomUUID()
    artifacts.set(evidence.url, artifact)
    for (const ref of spotifyRepo.sourcesForSpotifyId(id)) {
      const proof = spotifyRepo.sourceEvidence(ref.kind, ref.id)
      if (proof?.validated && proof.evidence.url === evidence.url) spotifyRepo.stampSourceArtifact(ref.kind, ref.id, artifact)
    }
    const claim = claimedSources.get(evidence.url)
    if (claim) {
      const failure = await claim
      if (failure && running()) failTransfer(id, evidence.url, failure)
      return
    }
    let settle!: (failure: string | null) => void
    claimedSources.set(evidence.url, new Promise((resolve) => { settle = resolve }))
    let failure: string | null = null
    try {
      failure = await downloadClaimed(raw, index, evidence, artifact)
    } catch (error) {
      failure = error instanceof Error ? error.message : String(error)
      throw error
    } finally {
      settle(failure)
    }
  }

  /** Downloads a claimed source; returns the failure message, or null once done or stopped. */
  async function downloadClaimed(
    raw: Record<string, unknown>,
    index: number,
    evidence: import('@shared/types').MusicSourceEvidence,
    artifact: string
  ): Promise<string | null> {
    const id = String(raw.song_id)
    const infoFile = join(tempDir, `${index}.info.json`)
    const taggedFile = join(tempDir, `${index}.tagged.info.json`)
    writeFileSync(taggedFile, JSON.stringify(taggedInfoJson(JSON.parse(readFileSync(infoFile, 'utf8')), raw)), { mode: 0o600 })
    const embedThumbnail = evidence.format !== 'opus' || embedsOpusCovers
    let diagnostic = ''
    const outputBase = stagedOutputBase(spotifyStagingRoot(), raw, artifact)
    let code = 1
    try {
      code = await runMusicCommand(ytdlpAcquisitionArgs({
        base: musicYtDlpArgs(),
        infoFile: taggedFile,
        outputTemplate: stagedOutputTemplate(spotifyStagingRoot(), raw, artifact),
        format: evidence.format,
        embedThumbnail
      }), owner, (line) => { if (/^ERROR:|error|unable|failed/i.test(line)) diagnostic = line }, jobId)
    } finally {
      if (code !== 0) discardStagedOutputs(outputBase)
    }
    if (!running()) return null
    if (code === 0) {
      spotifyRepo.retainResolvedAudioUrls([{ song_id: raw.song_id, download_url: evidence.url }])
      if (!embedThumbnail) await writeFolderCover(raw).catch((error) => logWarn('proc', `Album cover was not saved: ${error instanceof Error ? error.message : String(error)}`))
      finished.push(outputBase)
      if (finished.length >= LIBRARY_FLUSH_SONGS || Date.now() - lastFlush >= LIBRARY_FLUSH_MS) flushFinished()
      return null
    }
    const failure = musicFailure('Transfer / processing', 'yt-dlp', diagnostic || 'The download stopped before the file was complete')
    failTransfer(id, evidence.url, failure)
    forgetAudioSource(evidence.url)
    return failure
  }

  try {
    await runPool(songs, workers, async (raw, index) => {
      if (!running()) return
      input.onProgress?.(done, songs.length, String(raw.name ?? ''))
      try {
        await acquireOne(raw, index)
      } catch (error) {
        if (running()) fail(spotifyRepo.sourcesForSpotifyId(String(raw.song_id)), error instanceof Error ? error.message : String(error))
      }
      if (running()) input.onProgress?.(++done, songs.length, null)
    })
    logInfo('proc', `Music acquisition: ${songs.length} tracks in ${Date.now() - started}ms`)
  } finally {
    // The caller's full scan files the remainder; it must not overlap a flush still running.
    await indexing
    rmSync(tempDir, { recursive: true, force: true })
  }
  return failures ? 1 : 0
}

export function addUrlDownloadQueue(input: import('@shared/types').MusicDownloadInput): SpotifyDownloadQueueAddResult {
  if (!getSetting('music.dir')?.trim()) throw new Error('Set your music folder first')
  const id = addUrlJob(validateUrlInput(input))
  return { jobId: id, addedSelections: 1, missingCount: 1 }
}

async function inspectAudioSourcesInQueue(
  urls: string[],
  owner: string,
  jobId?: string,
  onRow?: (url: string, row: Record<string, any>) => void
): Promise<Map<string, import('@shared/types').MusicSourceEvidence> & { errors: Map<string, string> }> {
  const inspection = audioSourceInspection(urls, onRow)
  if (!urls.length) return inspection.finish()
  // Extraction is sequential inside one yt-dlp process; split batches across the worker budget.
  const workers = Math.min(musicToolOptions().workers, urls.length)
  const batches = Array.from({ length: workers }, (_, index) => urls.filter((_url, position) => position % workers === index))
  await Promise.all(batches.map((batch) => runMusicCommand(
    [...musicYtDlpArgs(), '--no-playlist', '--skip-download', '--ignore-errors', '--dump-json', '--', ...batch],
    owner, inspection.observe, jobId
  )))
  return inspection.finish()
}

async function runMusicCommand(args: string[], owner: string, onLine?: (line: string) => void, jobId?: string): Promise<number> {
  const stopped = () => (queueRun?.owner === owner && queueRun.intent !== 'running') || (jobId != null && abandonedRuns.has(jobId))
  for (let attempt = 0; attempt < 3; attempt++) {
    let diagnostic = ''
    const code = await runMusicProcess(args, owner, (line) => {
      if (/error|timed out|connection/i.test(line)) diagnostic = line
      onLine?.(line)
    }, jobId, spawn, AUDIO_STALL_MS)
    if (code === 0 || attempt === 2 || !/timed out|timeout|connection reset|HTTP Error (?:5\d\d|403|429)|too many requests/i.test(diagnostic) ||
      /sign in|captcha|cookie|format.*not available|unavailable/i.test(diagnostic) || stopped()) return code
    // A 403 is usually an expired stream URL; a 429 needs a real pause.
    const limited = /HTTP Error 429|too many requests/i.test(diagnostic)
    await new Promise((resolve) => setTimeout(resolve, (limited ? 5000 : 500) * 2 ** attempt))
    if (stopped()) return code
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
