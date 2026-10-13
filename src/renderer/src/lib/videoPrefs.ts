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

export type SubFont = 'app' | 'gothic' | 'mincho' | 'rounded'
export type SubColor = 'white' | 'yellow' | 'cyan'
export type SubBackground = 'outline' | 'box'

// How subtitles look. `scale` also sizes styled ASS tracks; the rest styles
// the app's own text overlay (SRT/VTT, the second track, and an ASS track's
// clickable line while paused).
export interface SubtitleLook {
  scale: number // 0.6 – 2
  font: SubFont
  color: SubColor
  background: SubBackground
  boxOpacity: number // 0.3 – 0.9, for the box background
  position: number // percent above the bottom edge, 2 – 30
  secondaryScale: number // 0.5 – 1, second track relative to the first
}

export interface VideoPrefs extends SubtitleLook {
  volume: number
  muted: boolean
  rate: number
  subsOn: boolean
  dualSubs: boolean
  styledSubs: boolean // render ASS tracks as authored while playing
  subOffsetSec: number
  primaryLang: SubLang
  secondaryLang: SubLang
  dialogueOnly: boolean
  autoPauseOnMine: boolean
  pauseOnHover: boolean
  transcriptOpen: boolean
}

export const DEFAULT_SUBTITLE_LOOK: SubtitleLook = {
  scale: 1,
  font: 'app',
  color: 'white',
  background: 'outline',
  boxOpacity: 0.55,
  position: 5,
  secondaryScale: 0.72
}

export const DEFAULT_VIDEO_PREFS: VideoPrefs = {
  ...DEFAULT_SUBTITLE_LOOK,
  volume: 0.9,
  muted: false,
  rate: 1,
  subsOn: true,
  dualSubs: true,
  styledSubs: true,
  subOffsetSec: 0,
  primaryLang: 'ja',
  secondaryLang: 'en',
  dialogueOnly: true,
  autoPauseOnMine: true,
  pauseOnHover: false,
  transcriptOpen: false
}

export const SUBTITLE_LIMITS = {
  scale: { min: 0.6, max: 2, step: 0.05 },
  boxOpacity: { min: 0.3, max: 0.9, step: 0.05 },
  position: { min: 2, max: 30, step: 1 },
  secondaryScale: { min: 0.5, max: 1, step: 0.02 }
} as const

const FONTS: SubFont[] = ['app', 'gothic', 'mincho', 'rounded']
const COLORS: SubColor[] = ['white', 'yellow', 'cyan']
const BACKGROUNDS: SubBackground[] = ['outline', 'box']

function clamp(value: unknown, limits: { min: number; max: number }, fallback: number): number {
  const n = typeof value === 'number' ? value : Number.NaN
  return Number.isFinite(n) ? Math.min(limits.max, Math.max(limits.min, n)) : fallback
}

function oneOf<T extends string>(value: unknown, options: T[], fallback: T): T {
  return options.includes(value as T) ? (value as T) : fallback
}

// Accepts any stored blob, including the first player's keys (subFontScale,
// subBackdrop), and returns a complete, in-range set.
export function normalizeVideoPrefs(raw: unknown): VideoPrefs {
  const stored = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const d = DEFAULT_VIDEO_PREFS
  // The first player's subFontScale/subBackdrop are read below, never kept.
  const { subFontScale: _legacyScale, subBackdrop: _legacyBackdrop, ...rest } = stored
  void _legacyScale
  void _legacyBackdrop
  const merged = { ...d, ...rest } as VideoPrefs
  const legacyScale = stored.scale == null ? stored.subFontScale : stored.scale
  const legacyBackground =
    stored.background == null && typeof stored.subBackdrop === 'boolean'
      ? stored.subBackdrop
        ? 'box'
        : 'outline'
      : stored.background
  const out: VideoPrefs = {
    ...merged,
    scale: clamp(legacyScale, SUBTITLE_LIMITS.scale, d.scale),
    font: oneOf(stored.font, FONTS, d.font),
    color: oneOf(stored.color, COLORS, d.color),
    background: oneOf(legacyBackground, BACKGROUNDS, d.background),
    boxOpacity: clamp(stored.boxOpacity, SUBTITLE_LIMITS.boxOpacity, d.boxOpacity),
    position: clamp(stored.position, SUBTITLE_LIMITS.position, d.position),
    secondaryScale: clamp(stored.secondaryScale, SUBTITLE_LIMITS.secondaryScale, d.secondaryScale)
  }
  return out
}

export function loadVideoPrefs(): VideoPrefs {
  try {
    const raw = localStorage.getItem(KEY)
    return normalizeVideoPrefs(raw ? JSON.parse(raw) : null)
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

export function lookOf(prefs: VideoPrefs): SubtitleLook {
  return {
    scale: prefs.scale,
    font: prefs.font,
    color: prefs.color,
    background: prefs.background,
    boxOpacity: prefs.boxOpacity,
    position: prefs.position,
    secondaryScale: prefs.secondaryScale
  }
}

export const PLAYBACK_RATES = [0.5, 0.75, 0.85, 1, 1.1, 1.25, 1.5, 2] as const
