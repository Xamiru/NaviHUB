import type { VideoAudioTrack } from '@shared/types'

// Audio-track switching in the in-app player (2026-11-16). Chromium exposes
// HTMLMediaElement.audioTracks only behind its experimental AudioVideoTracks
// feature, which main enables for the app window (src/main/index.ts). When the
// list is missing the player shows no menu and the system player remains the
// way to change language.

// The slice of Chromium's AudioTrack / AudioTrackList the player uses; neither
// is in TypeScript's DOM library.
export interface MediaAudioTrack {
  enabled: boolean
  label: string
  language: string
}
interface MediaAudioTrackList {
  length: number
  [index: number]: MediaAudioTrack
}

export interface AudioOption {
  label: string
  lang: string | null
  playable: boolean
  // The track main's decode gate judged (Japanese first, then the default).
  judged: boolean
}

export interface AudioChoice {
  lang: string | null
  label: string
}

export function mediaAudioTracks(el: HTMLVideoElement | null): MediaAudioTrack[] | null {
  const list = (el as unknown as { audioTracks?: MediaAudioTrackList } | null)?.audioTracks
  if (!list || typeof list.length !== 'number') return null
  return Array.from({ length: list.length }, (_, i) => list[i])
}

function channelText(channels: number | null): string | null {
  if (channels == null) return null
  return channels === 1 ? 'mono' : channels === 2 ? '2.0' : channels === 6 ? '5.1' : channels === 8 ? '7.1' : `${channels} ch`
}

// Pairs the element's tracks with ffprobe's audio streams by position: both
// follow the container's stream order. When the counts disagree the pairing
// cannot be trusted, so the element's own labels stand and every track is
// offered.
export function audioOptions(media: MediaAudioTrack[], probe: VideoAudioTrack[]): AudioOption[] {
  const paired = probe.length === media.length
  return media.map((t, i) => {
    const p = paired ? probe[i] : null
    const base = p?.label || t.label || (t.language ? t.language.toUpperCase() : `Track ${i + 1}`)
    const ch = channelText(p?.channels ?? null)
    return {
      label: ch ? `${base} · ${ch}` : base,
      lang: p?.lang ?? (t.language || null),
      playable: p?.playable ?? true,
      judged: p?.isDefault ?? false
    }
  })
}

// The track to start on: the show's saved choice (same track, else same
// language), else the track the decode gate judged, else what the file
// enabled. Never an unplayable one while a playable one exists.
export function initialAudio(options: AudioOption[], saved: AudioChoice | null, current: number): number {
  const find = (ok: (o: AudioOption) => boolean): number => options.findIndex((o) => o.playable && ok(o))
  if (saved) {
    const same = find((o) => o.lang === saved.lang && o.label === saved.label)
    if (same >= 0) return same
    const lang = saved.lang != null ? find((o) => o.lang === saved.lang) : -1
    if (lang >= 0) return lang
  }
  const judged = find((o) => o.judged)
  if (judged >= 0) return judged
  if (options[current]?.playable) return current
  const first = find(() => true)
  return first >= 0 ? first : Math.max(0, current)
}

export function applyAudio(media: MediaAudioTrack[], index: number): void {
  // Enable first, so the element is never left with no audio track.
  if (media[index]) media[index].enabled = true
  media.forEach((t, i) => {
    if (i !== index) t.enabled = false
  })
}

// ---- per-show memory, like the subtitle delay (VideoSource.offsetKey) ----

const CHOICES_KEY = 'video.audioChoices'
const MAX_CHOICES = 500

function readChoices(): Record<string, AudioChoice> {
  try {
    const raw = JSON.parse(localStorage.getItem(CHOICES_KEY) ?? '{}') as unknown
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, AudioChoice>) : {}
  } catch {
    return {}
  }
}

export function loadAudioChoice(key: string): AudioChoice | null {
  const c = readChoices()[key]
  return c && typeof c.label === 'string' && (c.lang === null || typeof c.lang === 'string') ? c : null
}

export function saveAudioChoice(key: string, choice: AudioChoice): void {
  try {
    const map = readChoices()
    delete map[key]
    // Insertion order is recency: the changed key goes last, the oldest first.
    map[key] = choice
    const keys = Object.keys(map)
    for (const old of keys.slice(0, Math.max(0, keys.length - MAX_CHOICES))) delete map[old]
    localStorage.setItem(CHOICES_KEY, JSON.stringify(map))
  } catch {
    // A full or disabled localStorage must never break playback.
  }
}
