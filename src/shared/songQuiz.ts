// Song Quiz answer rules: one recording shared by several anime, and how many
// options one franchise may fill. Pure, so the deal is tested without audio.

import type { QuizSong } from './types'
import { guessTrackRecordingKey } from './guessTrack'
import { pickDistractors } from './quizDistractors'

type SongIdentity = Pick<QuizSong, 'mediaId' | 'title' | 'artists'>

export function songRecordingKey(song: Pick<QuizSong, 'title' | 'artists'>): string | null {
  const title = song.title?.trim()
  const artists = song.artists.map((artist) => artist.trim()).filter(Boolean)
  return title && artists.length > 0 ? guessTrackRecordingKey(title, artists) : null
}

/**
 * Maps a song to every anime in the pool that uses the same recording (a split
 * cour or a sequel reusing its opening). All of them are correct answers, and
 * none may be offered as a distractor. Built once per session.
 */
export function songRecordingIndex(pool: readonly SongIdentity[]): (song: SongIdentity) => number[] {
  const byKey = new Map<string, Set<number>>()
  for (const song of pool) {
    const key = songRecordingKey(song)
    if (!key) continue
    const ids = byKey.get(key)
    if (ids) ids.add(song.mediaId)
    else byKey.set(key, new Set([song.mediaId]))
  }
  return (song) => {
    const key = songRecordingKey(song)
    const ids = new Set([song.mediaId, ...(key ? (byKey.get(key) ?? []) : [])])
    return [...ids]
  }
}

const SEQUEL_TAIL = [
  /\b(?:season|part|cour)\s*\d+\b.*$/,
  /\b\d+(?:st|nd|rd|th)\s+(?:season|part|cour)\b.*$/,
  /\b(?:final season|the final|the movie|movie|ova|ona|specials?)\b.*$/,
  /\s(?:ii|iii|iv|v|vi|\d+)$/
]

/**
 * A title-based franchise key: the subtitle, season, part and sequel numbering
 * removed ("Show Season 2", "Show II", "Show: The Movie" all become "show").
 * A heuristic only; a miss just means a sibling is treated as unrelated.
 */
export function animeFranchiseKey(title: string): string {
  let base = title.normalize('NFKC').toLowerCase().trim()
  // A subtitle split needs a real prefix, or "Re:Zero" and "Re:Creators" would merge.
  const subtitle = base.match(/^(.{4,}?)\s*(?:[:：]|\s[-–—]\s)/)
  if (subtitle) base = subtitle[1]
  let previous = ''
  while (previous !== base) {
    previous = base
    for (const pattern of SEQUEL_TAIL) base = base.replace(pattern, '').trim()
  }
  const key = base.replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  return key || title.normalize('NFKC').toLowerCase().trim()
}

export const SONG_FRANCHISE_OPTION_CAP = 2

/**
 * Distractors by era/genre affinity (`pickDistractors`), with no franchise
 * filling more than two of the four options: a sequel can still make a hard
 * question, but a round never becomes four seasons of one show. Falls back to
 * the uncapped ranking only when the pool has nothing else.
 */
export function pickSongDistractors<T extends QuizSong>(
  pool: T[],
  answer: T,
  count: number,
  forbiddenMediaIds: readonly number[],
  franchiseOf: (song: T) => string,
  rng: () => number
): T[] {
  const ranked = pickDistractors(pool, answer, pool.length, forbiddenMediaIds, rng)
  const used = new Map<string, number>([[franchiseOf(answer), 1]])
  const out: T[] = []
  for (const candidate of ranked) {
    if (out.length >= count) break
    const key = franchiseOf(candidate)
    const n = used.get(key) ?? 0
    if (n >= SONG_FRANCHISE_OPTION_CAP) continue
    used.set(key, n + 1)
    out.push(candidate)
  }
  for (const candidate of ranked) {
    if (out.length >= count) break
    if (!out.includes(candidate)) out.push(candidate)
  }
  return out
}
