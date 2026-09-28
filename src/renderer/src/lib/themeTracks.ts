import type { ThemeSongEntry } from '@shared/types'
import type { Track } from './player'

export function themeSongTitle(s: ThemeSongEntry): string {
  return s.slug ? `${s.slug} / ${s.title ?? 'Untitled'}` : (s.title ?? 'Untitled')
}

// Queue track. Keeps the `theme-<id>` id namespace the detail page and the
// player already speak, so a song queued anywhere still highlights on its anime page.
export function themeSongToTrack(s: ThemeSongEntry): Track {
  return {
    id: `theme-${s.themeId}`,
    audioPath: s.audioPath,
    audioUrl: s.audioUrl,
    title: themeSongTitle(s),
    subtitle: s.artists.map((a) => a.name).join(', ') || null,
    context: s.animeTitle,
    coverPath: s.coverPath,
    mediaId: s.mediaId
  }
}
