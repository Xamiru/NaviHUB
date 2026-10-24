import { probeFile } from './ffmpeg'
import { pickAudioStream, pickVideoStream } from './probeParse'
import * as scan from './scan'

// The single video module ipc.ts imports. NaviHUB discovers files, keeps
// watched state and resume positions, and plays what Chromium can decode in
// the in-app player. Every file can also open in the operating system's
// default application (normally VLC), the fallback for anything undecodable.

export {
  attachFile,
  attachFolder,
  attachFolderIn,
  detach,
  detachIn,
  files,
  linkedTitles,
  markProgressIn,
  markWatched,
  markWatchedIn,
  rescan,
  rescanIn,
  setProgressUndo,
  takeProgressUndo
} from './scan'
export { detectTools } from './ffmpeg'
export {
  clipAudio,
  openExternal,
  scopeOfFile,
  source,
  subtitleFonts,
  subtitleTrack
} from './source'

// Wires the real prober into the scanner. ffprobe metadata feeds episode
// details, the player's decode gate and offline subtitle extraction; playback
// itself never depends on it.
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
