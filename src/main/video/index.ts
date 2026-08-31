import { shell } from 'electron'
import { existsSync } from 'fs'
import type { VideoFileRef } from '@shared/types'
import { absoluteMediaPath } from '../files'
import { probeFile } from './ffmpeg'
import { pickAudioStream, pickVideoStream } from './probeParse'
import * as scan from './scan'
import { VIDEO_SCOPES, type VideoScope } from './scope'

// The single video module ipc.ts imports. NaviHUB discovers files and keeps
// manual watched state; playback belongs to the operating system's default
// application (normally VLC when the user has associated video files with it).

export {
  attachFolder,
  attachFolderIn,
  detach,
  detachIn,
  files,
  markWatched,
  markWatchedIn,
  rescan,
  rescanIn
} from './scan'
export { detectTools } from './ffmpeg'

// Wires the real prober into the scanner. ffprobe metadata remains useful for
// episode ordering/details and offline Japanese subtitle-corpus extraction;
// external playback itself does not depend on it.
export function installProber(): void {
  scan.setProber(async (absPath) => {
    const probe = await probeFile(absPath)
    if (!probe) return null
    const video = pickVideoStream(probe)
    const audio = pickAudioStream(probe, { preferLang: 'ja' })
    return {
      duration: probe.durationSec,
      width: video?.width ?? null,
      height: video?.height ?? null,
      videoCodec: video?.codec ?? null,
      audioCodec: audio?.codec ?? null,
      playability: null
    }
  })
}

function scopeOf(ref: VideoFileRef): VideoScope {
  return ref.kind === 'file' ? VIDEO_SCOPES.video : VIDEO_SCOPES.wrestling
}

export async function openExternal(ref: VideoFileRef): Promise<void> {
  const scope = scopeOf(ref)
  const row = scan.scopedFileById(scope, ref.fileId)
  if (!row) throw new Error('That video is no longer in the library. Rescan its folder.')

  let absPath: string
  try {
    absPath = absoluteMediaPath(`${scope.prefix}/${row.filePath}`)
  } catch {
    throw new Error('That video path is invalid. Rescan its folder.')
  }
  if (!existsSync(absPath)) {
    throw new Error(
      `Video file not found on disk. Rescan the folder, or check the ${scope.label} library root in Settings.`
    )
  }

  const error = await shell.openPath(absPath)
  if (error) throw new Error(`Could not open the video in the system player: ${error}`)
}
