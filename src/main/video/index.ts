import { dialog } from 'electron'
import { basename, extname, join } from 'path'
import { existsSync, statSync } from 'fs'
import { absoluteMediaPath, registerOpenedFile } from '../files'
import { mediaUrl } from '@shared/mediaUrl'
import { VIDEO_EXTS, cleanTitle } from './names'
import { decidePlayback, type PlaybackPlan } from './playability'
import { pickAudioStream, type MediaProbe } from './probeParse'
import { probeFile, detectTools } from './ffmpeg'
import * as cache from './cache'
import * as session from './session'
import * as subs from './subtitles'
import * as scan from './scan'
import { VIDEO_SCOPES, type VideoScope } from './scope'
import * as mine from './mine'
import type {
  VideoAudioTrack,
  VideoSource,
  VideoSourceRef,
  VideoSubtitleTrack
} from '@shared/types'

// The single module ipc.ts imports. Everything the renderer can ask for about
// video goes through here; the player page speaks only VideoSource and never
// learns whether it came from a library row or an ad-hoc pick.

export {
  attachFolder,
  attachFolderIn,
  detach,
  detachIn,
  files,
  markProgress,
  markProgressIn,
  markWatched,
  markWatchedIn,
  rescan,
  rescanIn
} from './scan'
export { detectTools } from './ffmpeg'
export { cancelPrepare, getPrepareStatus, killActivePrepare } from './session'
export const cacheStats = cache.stats
export const clearCache = cache.clear

// Wires the real prober into the scanner now that ffmpeg.ts exists. Called once
// from ipc.ts; scan.ts keeps its injectable seam so tests need no binary.
export function installProber(): void {
  scan.setProber(async (absPath) => {
    const probe = await probeFile(absPath)
    if (!probe) return null
    const plan = decidePlayback({ ext: extname(absPath).toLowerCase(), probe })
    const video = probe.streams.find((s) => s.index === plan.videoStream)
    return {
      duration: probe.durationSec,
      width: video?.width ?? null,
      height: video?.height ?? null,
      videoCodec: video?.codec ?? null,
      audioCodec: probe.streams.find((s) => s.index === plan.audioStream)?.codec ?? null,
      playability: plan.action
    }
  })
}

// The scope a ref reads from; null for ad-hoc, which has no row.
function scopeOf(ref: VideoSourceRef): VideoScope | null {
  if (ref.kind === 'file') return VIDEO_SCOPES.video
  if (ref.kind === 'wrestling') return VIDEO_SCOPES.wrestling
  return null
}

function resolvePaths(ref: VideoSourceRef): { relPath: string; absPath: string } | null {
  if (ref.kind === 'adhoc') {
    const relPath = `open/${ref.token}`
    try {
      const absPath = absoluteMediaPath(relPath)
      return existsSync(absPath) ? { relPath, absPath } : null
    } catch {
      return null
    }
  }
  const scope = scopeOf(ref)!
  const row = scan.scopedFileById(scope, ref.fileId)
  if (!row) return null
  const relPath = `${scope.prefix}/${row.filePath}`
  const absPath = join(scope.root(), row.filePath)
  return existsSync(absPath) ? { relPath, absPath } : null
}

function audioTracksOf(probe: MediaProbe | null, chosen: number | null): VideoAudioTrack[] {
  if (!probe) return []
  return probe.streams
    .filter((s) => s.type === 'audio')
    .map((s) => ({
      index: s.index,
      label: s.title ?? `${(s.language ?? 'und').toUpperCase()} (${s.codec})`,
      lang: s.language,
      codec: s.codec,
      channels: s.channels,
      isDefault: s.index === chosen
    }))
}

export interface SourceOptions {
  audioStream?: number | null
}

export async function source(
  ref: VideoSourceRef,
  opts?: SourceOptions
): Promise<VideoSource | null> {
  const scope = scopeOf(ref)
  const row = scope && ref.kind !== 'adhoc' ? scan.scopedFileById(scope, ref.fileId) : null
  if (scope && !row) return null
  const paths = resolvePaths(ref)
  const owner = scope && row ? scope.owner(row.ownerId) : null

  const base = {
    ref,
    title: row?.title ?? (paths ? cleanTitle(basename(paths.absPath)) : 'Video'),
    seriesTitle: owner?.title ?? null,
    mediaId: owner?.mediaId ?? null,
    mediaType: owner?.mediaType ?? null,
    backPath: owner?.backPath ?? null,
    fileId: row?.id ?? null,
    durationSeconds: row?.duration ?? null,
    resumeSeconds: row?.resumeSeconds ?? null,
    watchedAt: row?.watchedAt ?? null,
    audioTracks: [] as VideoAudioTrack[],
    subtitles: [] as VideoSubtitleTrack[],
    warnings: [] as string[],
    ...(scope && row ? scan.neighboursIn(scope, row.id) : { prev: null, next: null })
  }

  if (!paths) {
    return {
      ...base,
      action: 'unsupported',
      url: null,
      plan: null,
      reason:
        ref.kind === 'adhoc'
          ? 'That file is no longer open — pick it again.'
          : `File not found on disk. Rescan the folder, or check the ${scope?.label ?? 'video'} library root in Settings.`
    }
  }

  const probe = await probeFile(paths.absPath)
  const plan: PlaybackPlan = decidePlayback({
    ext: extname(paths.absPath).toLowerCase(),
    probe,
    preferAudioLang: 'ja',
    audioStreamOverride: opts?.audioStream ?? null
  })

  const chosenAudio = probe
    ? (pickAudioStream(probe, { preferLang: 'ja', override: opts?.audioStream ?? null })?.index ??
      null)
    : null

  // Subtitles are worth the wait even when the video itself can't play — the
  // user may be here to check whether a track exists at all.
  const tracks = await subs.extractAll(
    paths.absPath,
    subs.listTracks(paths.absPath, paths.relPath, probe)
  )

  const common = {
    ...base,
    durationSeconds: probe?.durationSec ?? base.durationSeconds,
    audioTracks: audioTracksOf(probe, chosenAudio),
    subtitles: tracks,
    warnings: plan.warnings,
    plan: plan.action
  }

  if (plan.action === 'direct') {
    return { ...common, action: 'direct', url: mediaUrl(paths.relPath), reason: null }
  }
  if (plan.action === 'unsupported') {
    return { ...common, action: 'unsupported', url: null, reason: plan.reason }
  }

  // A converted copy may already exist from a previous watch.
  try {
    const st = statSync(paths.absPath)
    const hit = cache.lookup(
      cache.cacheKey({ absPath: paths.absPath, mtimeMs: st.mtimeMs, size: st.size, plan })
    )
    if (hit) {
      return { ...common, action: 'cached', url: mediaUrl(hit.relPath), reason: null }
    }
  } catch {
    // Fall through to needsPrepare.
  }

  return { ...common, action: 'needsPrepare', url: null, reason: plan.reason }
}

// Starts the ffmpeg pass. Fire-and-poll: returns as soon as the process is
// spawned, and the renderer polls video:prepareStatus.
export async function prepare(
  ref: VideoSourceRef,
  opts?: SourceOptions
): Promise<{ id: string }> {
  const paths = resolvePaths(ref)
  if (!paths) throw new Error('That file is no longer available.')
  const probe = await probeFile(paths.absPath)
  const plan = decidePlayback({
    ext: extname(paths.absPath).toLowerCase(),
    probe,
    preferAudioLang: 'ja',
    audioStreamOverride: opts?.audioStream ?? null
  })
  const row = ref.kind === 'file' ? scan.fileById(ref.fileId) : null
  return session.startPrepare({
    absPath: paths.absPath,
    sourceLabel: row?.title ?? basename(paths.absPath),
    plan,
    durationSec: probe?.durationSec ?? row?.duration ?? null
  })
}

// Native picker for the ad-hoc path. The file gets a session token rather than
// a real prefix (files.ts:registerOpenedFile) so absoluteMediaPath never has
// to serve an arbitrary absolute path.
export async function pickFile(): Promise<VideoSourceRef | null> {
  const res = await dialog.showOpenDialog({
    title: 'Choose a video file',
    properties: ['openFile'],
    filters: [{ name: 'Video', extensions: [...VIDEO_EXTS].map((e) => e.slice(1)) }]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  const rel = registerOpenedFile(res.filePaths[0])
  return { kind: 'adhoc', token: rel.slice('open/'.length) }
}

export async function tools(): Promise<Awaited<ReturnType<typeof detectTools>>> {
  return detectTools()
}

// Clips the audio of one subtitle line for a mined card. Returns null when
// ffmpeg isn't installed or the clip fails — the screenshot and the card itself
// are unaffected, so mining never depends on this succeeding.
export async function clipAudio(input: {
  ref: VideoSourceRef
  startSec: number
  endSec: number
}): Promise<{ audioPath: string } | null> {
  const paths = resolvePaths(input.ref)
  if (!paths) return null
  return mine.clipSentenceAudio({
    absPath: paths.absPath,
    relPath: paths.relPath,
    startSec: input.startSec,
    endSec: input.endSec
  })
}
