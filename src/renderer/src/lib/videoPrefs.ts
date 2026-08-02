import type { SubLang } from '@shared/subtitles'

// Player preferences that outlive a session, in the ReaderPrefs idiom
// (localStorage, spread over defaults inside a try/catch so a stale or
// hand-edited blob can never break the page).
//
// Deliberately NOT here: the mining panel's open state (session-only, like the
// manga reader), the selected track IDs (re-derived per file by
// pickDefaultTracks — a track id from one release means nothing in the next),
// and the playback position (that's DB state, not a preference).

const KEY = 'video.playerPrefs'

export interface VideoPrefs {
  volume: number
  muted: boolean
  rate: number
  subsOn: boolean
  dualSubs: boolean
  subFontScale: number
  subBackdrop: boolean
  subOffsetSec: number
  primaryLang: SubLang
  secondaryLang: SubLang
  dialogueOnly: boolean
  autoPauseOnMine: boolean
  pauseOnHover: boolean
  transcriptOpen: boolean
}

export const DEFAULT_VIDEO_PREFS: VideoPrefs = {
  volume: 0.9,
  muted: false,
  rate: 1,
  subsOn: true,
  dualSubs: true,
  subFontScale: 1,
  subBackdrop: true,
  subOffsetSec: 0,
  primaryLang: 'ja',
  secondaryLang: 'en',
  dialogueOnly: true,
  autoPauseOnMine: true,
  pauseOnHover: false,
  transcriptOpen: false
}

export function loadVideoPrefs(): VideoPrefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT_VIDEO_PREFS }
    return { ...DEFAULT_VIDEO_PREFS, ...(JSON.parse(raw) as Partial<VideoPrefs>) }
  } catch {
    return { ...DEFAULT_VIDEO_PREFS }
  }
}

export function saveVideoPrefs(prefs: VideoPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs))
  } catch {
    // A full or disabled localStorage must never break playback.
  }
}

export const PLAYBACK_RATES = [0.5, 0.75, 0.85, 1, 1.1, 1.25, 1.5, 2] as const
