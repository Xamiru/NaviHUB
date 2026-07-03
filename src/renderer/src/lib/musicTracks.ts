import type { MusicTrack } from '@shared/types'
import type { Track } from './player'

// Maps a library track to a player queue track. The `music-` id namespace
// keeps music rows highlightable/toggleable everywhere (like `theme-` does for
// anime pages) and is what MusicPlayLogger keys play counts off.
export function musicTrackToPlayerTrack(t: MusicTrack): Track {
  return {
    id: `music-${t.id}`,
    audioPath: `music/${t.filePath}`,
    title: t.title,
    subtitle: t.tagArtist ?? t.artistName,
    context: t.albumTitle,
    coverPath: t.coverPath,
    // Must stay null: NowPlayingBar links a mediaId back to /anime/:id.
    mediaId: null
  }
}

export function musicTrackId(t: MusicTrack): string {
  return `music-${t.id}`
}

// Queue a whole list from its start — or from a random track when shuffling
// (the player keeps the start track first in shuffle mode, so a fixed 0 would
// always open with the same song). No-op on an empty list. Shared by every
// "Play / Shuffle" button in the music section.
export function playTracks(
  player: { playQueue: (tracks: Track[], startIndex: number, opts?: { shuffle?: boolean }) => void },
  tracks: MusicTrack[],
  opts: { shuffle?: boolean } = {}
): void {
  if (tracks.length === 0) return
  player.playQueue(
    tracks.map(musicTrackToPlayerTrack),
    opts.shuffle ? Math.floor(Math.random() * tracks.length) : 0,
    { shuffle: !!opts.shuffle }
  )
}
