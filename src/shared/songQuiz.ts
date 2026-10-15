// Song Quiz answer rules: one recording shared by several anime, and how many
// options one franchise may fill. Pure, so the deal is tested without audio.

import type { QuizSong } from './types'
import { guessTrackRecordingKey } from './guessTrack'
import { pickDistractors } from './quizDistractors'
import { FRANCHISE_OPTION_CAP, takeWithFranchiseCap, titleFranchiseKey } from './franchiseKey'

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

// Kept under the Song Quiz name for its callers; the rule lives in franchiseKey.ts.
export const animeFranchiseKey = titleFranchiseKey
export const SONG_FRANCHISE_OPTION_CAP = FRANCHISE_OPTION_CAP

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
  return takeWithFranchiseCap(ranked, count, franchiseOf, franchiseOf(answer))
}
