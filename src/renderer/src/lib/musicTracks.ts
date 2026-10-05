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
    mediaId: null,
    albumId: t.albumId,
    artistId: t.artistId,
    duration: t.duration
  }
}

// A list this short fits on screen, so its page shows no search box.
export const TRACK_SEARCH_MIN = 25

// Case-insensitive match on title, artist and album — the in-page search on
// liked songs, playlists, albums and artist catalogs.
export function filterTracks<T extends MusicTrack>(tracks: T[], query: string): T[] {
  const q = query.trim().toLocaleLowerCase()
  if (!q) return tracks
  return tracks.filter((t) =>
    `${t.title} ${t.tagArtist ?? ''} ${t.artistName} ${t.albumTitle}`.toLocaleLowerCase().includes(q)
  )
}

// The number shown beside each album track. Tag numbers are used as long as
// they are unique within their disc; a folder of singles keeps each file's own
// source-album number (1, 1, 2, 2 ...), so a disc with a repeated or missing
// number is numbered by position instead. Keyed by track id so a search filter
// keeps every track's album number.
export function albumTrackNumbers(tracks: MusicTrack[]): Map<number, number> {
  const byDisc = new Map<number, MusicTrack[]>()
  for (const t of tracks) {
    const disc = t.discNo ?? 1
    byDisc.set(disc, [...(byDisc.get(disc) ?? []), t])
  }
  const out = new Map<number, number>()
  for (const discTracks of byDisc.values()) {
    const tagged = discTracks.map((t) => t.trackNo)
    const trustTags = tagged.every((n) => n != null) && new Set(tagged).size === tagged.length
    discTracks.forEach((t, i) => out.set(t.id, trustTags ? (t.trackNo as number) : i + 1))
  }
  return out
}

export function totalDuration(tracks: MusicTrack[]): number {
  return tracks.reduce((sum, t) => sum + (t.duration ?? 0), 0)
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

// Scrobbler rule (Last.fm, ListenBrainz): a play counts once half the track, or
// four minutes, has actually been heard. Tracks under 30 seconds never count.
// Unknown length falls back to the four-minute cap.
export function playCountThreshold(duration: number | null | undefined): number | null {
  if (duration == null || !Number.isFinite(duration) || duration <= 0) return 240
  if (duration < 30) return null
  return Math.min(duration / 2, 240)
}

export interface ListenProgress {
  listened: number // seconds actually heard
  last: number // previous playback position
  logged: boolean
}

// Folds one position update into the progress. Only normal forward playback
// adds time (timeupdate fires a few times a second, so a jump over two seconds
// is a seek); a return to the start after a counted play begins a new play,
// which is how repeat-one counts every loop.
export function advanceListen(
  progress: ListenProgress,
  time: number,
  playing: boolean,
  duration: number | null | undefined
): { progress: ListenProgress; count: boolean } {
  let { listened, logged } = progress
  const delta = time - progress.last
  if (logged && time < 1 && progress.last > 1) {
    listened = 0
    logged = false
  }
  if (playing && delta > 0 && delta <= 2) listened += delta
  const threshold = playCountThreshold(duration)
  const count = !logged && threshold != null && listened >= threshold
  return { progress: { listened, last: time, logged: logged || count }, count }
}
