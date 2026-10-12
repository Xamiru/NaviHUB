// Chromium's decode counters on a media element. They are not in the DOM
// typings, so they are read through this one helper (tests stub it).
//
// They exist for the player's watchdog: two decode failures raise no error
// event at all. HEVC without a decoder plays the audio over a blank picture
// (videoWidth stays 0), and AC3/E-AC3/DTS plays the picture with zero decoded
// audio bytes.
export interface VideoDecodeStats {
  audioBytes: number | null
  videoFrames: number | null
}

export function readDecodeStats(el: HTMLVideoElement): VideoDecodeStats {
  const raw = el as HTMLVideoElement & {
    webkitAudioDecodedByteCount?: number
    webkitDecodedFrameCount?: number
  }
  return {
    audioBytes:
      typeof raw.webkitAudioDecodedByteCount === 'number' ? raw.webkitAudioDecodedByteCount : null,
    videoFrames:
      typeof raw.webkitDecodedFrameCount === 'number' ? raw.webkitDecodedFrameCount : null
  }
}

// The watchdog's verdict once playback has run past its grace period. null
// means nothing is wrong (or the counters are unavailable, so stay quiet).
export function silentDecodeFailure(input: {
  videoWidth: number
  hasAudio: boolean
  stats: VideoDecodeStats
}): string | null {
  if (input.videoWidth === 0) {
    return 'The picture could not be decoded inside NaviHUB.'
  }
  if (input.hasAudio && input.stats.audioBytes === 0) {
    return 'The audio track could not be decoded inside NaviHUB.'
  }
  return null
}
