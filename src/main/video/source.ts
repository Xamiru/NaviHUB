import { shell } from 'electron'
import { existsSync, statSync } from 'fs'
import { extname } from 'path'
import { mediaUrl } from '@shared/mediaUrl'
import type {
  MediaType,
  VideoAudioTrack,
  VideoFileRef,
  VideoSource,
  VideoSourceRef,
  VideoSubtitleTrack
} from '@shared/types'
import { getSqlite } from '../db/connection'
import { absoluteMediaPath } from '../files'
import * as footballMedia from '../football/media'
import * as footballRepo from '../repos/footballRepo'
import * as clipRepo from '../repos/wrestlingClipRepo'
import { cleanRelative } from '../wrestling/clips'
import { probeFile } from './ffmpeg'
import { decideDecodable } from './playability'
import { pickAudioStream, pickVideoStream, type MediaProbe } from './probeParse'
import * as mine from './mine'
import * as scan from './scan'
import { VIDEO_SCOPES, type VideoScope } from './scope'
import * as subs from './subtitles'

// What the in-app player needs to open one file, for every kind of local video
// the app tracks. Playback is direct: the url is the file itself on navimg://,
// never a converted copy. The decode verdict tells the renderer whether to
// mount a <video> at all; the renderer's watchdog has the final word.

export function scopeOfFile(ref: VideoFileRef): VideoScope {
  return ref.kind === 'file' ? VIDEO_SCOPES.video : VIDEO_SCOPES.wrestling
}

interface Resolved {
  relPath: string
  absPath: string
  title: string
  seriesTitle: string | null
  mediaId: number | null
  mediaType: MediaType | null
  backPath: string | null
  videoCodec: string | null
  audioCodec: string | null
  duration: number | null
  resumeSeconds: number | null
  watchedAt: string | null
  fileId: number | null
  scope: VideoScope | null
}

function ownerOf(
  scope: VideoScope,
  ownerId: number | null
): Pick<Resolved, 'seriesTitle' | 'mediaId' | 'mediaType' | 'backPath'> {
  const db = getSqlite()
  if (scope.id === 'video') {
    const row =
      ownerId == null
        ? undefined
        : (db.prepare('SELECT title, media_type FROM media_item WHERE id = ?').get(ownerId) as
            | { title: string; media_type: MediaType }
            | undefined)
    return {
      seriesTitle: row?.title ?? null,
      mediaId: row ? ownerId : null,
      mediaType: row?.media_type ?? null,
      backPath: null
    }
  }
  if (ownerId == null) {
    return { seriesTitle: null, mediaId: null, mediaType: null, backPath: '/wrestling/collection' }
  }
  const row = db.prepare('SELECT name FROM wrestling_event WHERE id = ?').get(ownerId) as
    | { name: string }
    | undefined
  return {
    seriesTitle: row?.name ?? null,
    mediaId: null,
    mediaType: null,
    backPath: row ? `/wrestling/event/${ownerId}` : '/wrestling/collection'
  }
}

function safeAbs(relPath: string): string | null {
  try {
    const abs = absoluteMediaPath(relPath)
    return existsSync(abs) && statSync(abs).isFile() ? abs : null
  } catch {
    return null
  }
}

// The system-player fallback for every kind: the same lookup and the same
// sentences as the in-app player, so the two never disagree about a file.
export async function openExternal(ref: VideoSourceRef): Promise<void> {
  const { absPath } = resolve(ref)
  const error = await shell.openPath(absPath)
  if (error) throw new Error(`Could not open the video in the system player: ${error}`)
}

// Throws a sentence the player shows when the file cannot be reached.
function resolve(ref: VideoSourceRef): Resolved {
  if (ref.kind === 'file' || ref.kind === 'wrestling') {
    const scope = scopeOfFile(ref)
    const row = scan.scopedFileById(scope, ref.fileId)
    if (!row) throw new Error('That video is no longer in the library. Rescan its folder.')
    const relPath = `${scope.prefix}/${row.filePath}`
    const absPath = safeAbs(relPath)
    if (!absPath) {
      throw new Error(
        `Video file not found on disk. Rescan the folder, or check the ${scope.label} library root in Settings.`
      )
    }
    return {
      relPath,
      absPath,
      title: row.title,
      ...ownerOf(scope, row.ownerId),
      videoCodec: row.videoCodec,
      audioCodec: row.audioCodec,
      duration: row.duration,
      resumeSeconds: row.resumeSeconds,
      watchedAt: row.watchedAt,
      fileId: row.id,
      scope
    }
  }
  if (ref.kind === 'clip') {
    const clip = clipRepo.get(ref.clipId)
    if (!clip) throw new Error('That clip no longer exists.')
    const relPath = `wrestling/${cleanRelative(clip.localPath)}`
    const absPath = safeAbs(relPath)
    if (!absPath) {
      throw new Error('Local file is unavailable. Reconnect the drive or pick the file again.')
    }
    return {
      relPath,
      absPath,
      title: clip.title,
      seriesTitle: 'Wrestling clip',
      mediaId: null,
      mediaType: null,
      backPath: '/wrestling/clips',
      videoCodec: null,
      audioCodec: null,
      duration: null,
      resumeSeconds: null,
      watchedAt: null,
      fileId: null,
      scope: null
    }
  }
  const item = footballRepo.getMedia(ref.mediaId)
  if (!item) throw new Error('That Football media item no longer exists.')
  if (!item.localPath) throw new Error('This Football media item has no local file.')
  let paths: { relPath: string; absPath: string }
  try {
    paths = footballMedia.resolveLocal(item.localPath)
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'The Football file is unavailable.')
  }
  if (!safeAbs(paths.relPath)) {
    throw new Error('Local file is unavailable. Reconnect the drive or pick the file again.')
  }
  return {
    ...paths,
    title: item.title,
    seriesTitle: 'Football',
    mediaId: null,
    mediaType: null,
    backPath: '/football/media',
    videoCodec: null,
    audioCodec: null,
    duration: null,
    resumeSeconds: null,
    watchedAt: null,
    fileId: null,
    scope: null
  }
}

function audioTracksOf(probe: MediaProbe | null): VideoAudioTrack[] {
  if (!probe) return []
  const chosen = pickAudioStream(probe, { preferLang: 'ja' })?.index ?? null
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

export async function source(ref: VideoSourceRef): Promise<VideoSource> {
  const r = resolve(ref)
  // ffprobe is optional. When present it supplies codecs for clips and Football
  // items, the audio list and embedded subtitle tracks; probeFile caches by
  // path, so a scanned episode costs nothing extra.
  const probe = await probeFile(r.absPath)
  const video = probe ? pickVideoStream(probe) : null
  const audio = probe ? pickAudioStream(probe, { preferLang: 'ja' }) : null
  const decode = decideDecodable({
    ext: extname(r.absPath),
    videoCodec: video?.codec ?? r.videoCodec,
    audioCodec: audio?.codec ?? r.audioCodec,
    platform: process.platform
  })
  const neighbours =
    r.scope && r.fileId != null ? scan.neighboursIn(r.scope, r.fileId) : { prev: null, next: null }
  return {
    ref,
    title: r.title,
    seriesTitle: r.seriesTitle,
    mediaId: r.mediaId,
    mediaType: r.mediaType,
    backPath: r.backPath,
    url: mediaUrl(r.relPath) as string, // relPath is never empty here
    decode,
    hasAudio: probe ? audio != null : r.audioCodec != null,
    durationSeconds: probe?.durationSec ?? r.duration,
    resumeSeconds: r.resumeSeconds,
    watchedAt: r.watchedAt,
    audioTracks: audioTracksOf(probe),
    subtitles: subs.listTracks(r.absPath, r.relPath, probe),
    ...neighbours
  }
}

// Extracts one embedded track on demand (or returns a sidecar unchanged). A
// whole-file read on a large MKV can take a while, hence the longer timeout.
export async function subtitleTrack(
  ref: VideoSourceRef,
  trackId: string
): Promise<VideoSubtitleTrack | null> {
  const r = resolve(ref)
  const probe = await probeFile(r.absPath)
  const track = subs.listTracks(r.absPath, r.relPath, probe).find((t) => t.id === trackId)
  if (!track) return null
  return subs.ensureExtracted(r.absPath, track, 5 * 60_000)
}

export async function clipAudio(input: {
  ref: VideoSourceRef
  startSec: number
  endSec: number
}): Promise<{ audioPath: string } | null> {
  const r = resolve(input.ref)
  return mine.clipSentenceAudio({
    absPath: r.absPath,
    relPath: r.relPath,
    startSec: input.startSec,
    endSec: input.endSec
  })
}
