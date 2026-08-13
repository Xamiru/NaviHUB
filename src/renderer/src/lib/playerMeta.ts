import type { PlayerSnapshot } from '@shared/types'

// The single choke point between the player and every OS-facing surface:
// mediaSession metadata (Windows SMTC flyout / GNOME top bar / media keys),
// the PlayerSnapshot pushed to the pop-out widget, and the taskbar thumbbar
// tooltip all render what displayMeta() returns — never the raw track. That is
// what keeps the song quiz unspoilable: even if a page someday hands the
// player a quiz- track with the real title on it, the OS still sees the mask.
//
// Structural input type instead of importing Track from player.tsx: vitest has
// no .tsx coverage, and this module must stay loadable from tests/.
export interface TrackMeta {
  id: string
  title: string
  subtitle?: string | null // artist(s)
  context?: string | null // album / anime title
  coverPath?: string | null
}

export interface DisplayMeta {
  title: string
  artist: string
  album: string
  coverPath: string | null
}

export function isMaskedTrack(id: string): boolean {
  return id.startsWith('quiz-')
}

export function displayMeta(track: TrackMeta): DisplayMeta {
  if (isMaskedTrack(track.id)) {
    // The quiz page already passes a masked track, but its '???' context
    // placeholder is an in-app wink, not something the OS overlay should show.
    return { title: 'Song Quiz', artist: '', album: '', coverPath: null }
  }
  return {
    title: track.title,
    artist: track.subtitle ?? '',
    album: track.context ?? '',
    coverPath: track.coverPath ?? null
  }
}

export function toPlayerSnapshot(
  track: TrackMeta | null,
  state: { isPlaying: boolean; hasNext: boolean; hasPrev: boolean }
): PlayerSnapshot | null {
  if (!track) return null
  const meta = displayMeta(track)
  return {
    trackId: track.id,
    title: meta.title,
    artist: meta.artist,
    coverPath: meta.coverPath,
    isPlaying: state.isPlaying,
    hasNext: state.hasNext,
    hasPrev: state.hasPrev
  }
}
