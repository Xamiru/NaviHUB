import type { MusicTrack, QuizSong } from './types'
import { balancedDeal, seededRng } from './quizCore'
import { shuffle } from './shuffle'
import { recordingText, withoutFeaturing } from './musicSourceMatch'

export const GUESS_TRACK_CLIP_SECONDS = [1, 2, 4, 7, 11, 16] as const
export const GUESS_TRACK_ROUND_LENGTH = 5

export type GuessTrackSource = 'theme' | 'music'

export interface GuessTrackEntry {
  key: string
  source: GuessTrackSource
  recordingKey: string
  title: string
  performer: string
  context: string
  answerLabel: string
  audioPath: string | null
  audioUrl: string | null
  coverPath: string | null
  // Anime season year or album year; the first hint.
  year: number | null
  balanceKey: string
}

export interface GuessTrackQuestion {
  mystery: GuessTrackEntry
  entries: GuessTrackEntry[]
  validKeys: string[]
  recordingKey: string
}

export interface GuessTrackAttempt {
  kind: 'guess' | 'skip'
  key: string | null
  label: string
  // A wrong guess from the right anime (themes) or the right artist (music).
  near?: boolean
}

export interface GuessTrackRoundState {
  status: 'playing' | 'correct' | 'failed'
  attempts: GuessTrackAttempt[]
  guessedRecordingKeys: string[]
  points: number
}

export type GuessTrackTransitionOutcome =
  | 'correct'
  | 'wrong'
  | 'failed'
  | 'repeated'

export interface GuessTrackTransition {
  state: GuessTrackRoundState
  outcome: GuessTrackTransitionOutcome
}

export function normalizeGuessTrackText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function normalizedPerformer(performers: readonly string[]): string {
  return performers
    .map((performer) => normalizeGuessTrackText(withoutFeaturing(performer)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join('|')
}

// Remaster labels and featuring credits name the same recording (the music
// section's rule); live, acoustic, remix and other variants stay distinct.
export function guessTrackRecordingKey(title: string, performers: readonly string[]): string {
  const base = recordingText(title.replace(/[’'`]/g, ''))
  return `${normalizeGuessTrackText(base)}::${normalizedPerformer(performers)}`
}

export function guessTrackThemeEntry(song: QuizSong): GuessTrackEntry | null {
  const title = song.title?.trim() ?? ''
  const artists = song.artists.map((artist) => artist.trim()).filter(Boolean)
  if (!title || artists.length === 0 || (!song.audioPath && !song.audioUrl)) return null
  const performer = artists.join(', ')
  return {
    key: `theme-${song.themeId}`,
    source: 'theme',
    recordingKey: guessTrackRecordingKey(title, artists),
    title,
    performer,
    context: song.animeTitle,
    answerLabel: `${title} — ${song.animeTitle}${song.slug ? ` (${song.slug})` : ''}`,
    audioPath: song.audioPath,
    audioUrl: song.audioUrl,
    coverPath: song.coverPath,
    year: song.year,
    balanceKey: `anime-${song.mediaId}`
  }
}

export function guessTrackMusicEntry(
  track: MusicTrack,
  year: number | null = null
): GuessTrackEntry | null {
  const title = track.title.trim()
  const performer = (track.tagArtist || track.artistName).trim()
  if (!title || !performer || !track.filePath.trim()) return null
  return {
    key: `music-${track.id}`,
    source: 'music',
    recordingKey: guessTrackRecordingKey(title, [performer]),
    title,
    performer,
    context: track.albumTitle,
    answerLabel: `${title} — ${performer}`,
    audioPath: `music/${track.filePath}`,
    audioUrl: null,
    coverPath: track.coverPath,
    year,
    balanceKey: `artist-${track.artistId}`
  }
}

export function guessTrackGroups(entries: readonly GuessTrackEntry[]): GuessTrackEntry[][] {
  const groups = new Map<string, GuessTrackEntry[]>()
  for (const entry of entries) {
    const group = groups.get(entry.recordingKey)
    if (group) group.push(entry)
    else groups.set(entry.recordingKey, [entry])
  }
  return [...groups.values()]
}

export function guessTrackIdentityCount(entries: readonly GuessTrackEntry[]): number {
  return guessTrackGroups(entries).length
}

export function buildGuessTrackQuestions(
  entries: readonly GuessTrackEntry[],
  count: number,
  seed: string | number
): GuessTrackQuestion[] {
  const rng = seededRng(seed)
  const candidates = guessTrackGroups(entries).map((group) => {
    const randomized = shuffle(group, rng)
    return { entries: randomized, mystery: randomized[0] }
  })
  return balancedDeal(candidates, count, (candidate) => candidate.mystery.balanceKey, rng).map(
    ({ entries: group, mystery }) => ({
      mystery,
      entries: group,
      validKeys: group.map((entry) => entry.key),
      recordingKey: mystery.recordingKey
    })
  )
}

// One row per answer. Music copies of one recording collapse to the shortest
// label (the plain title over "… - 2011 Remaster"); a theme shared by two anime
// keeps a row per anime, so searching either show finds it.
export function guessTrackChoices(entries: readonly GuessTrackEntry[]): GuessTrackEntry[] {
  const chosen = new Map<string, GuessTrackEntry>()
  for (const entry of entries) {
    const id =
      entry.source === 'music' ? entry.recordingKey : normalizeGuessTrackText(entry.answerLabel)
    const kept = chosen.get(id)
    if (!kept || entry.answerLabel.length < kept.answerLabel.length) chosen.set(id, entry)
  }
  return [...chosen.values()]
}

function searchRank(entry: GuessTrackEntry, query: string): number | null {
  const title = normalizeGuessTrackText(entry.title)
  const label = normalizeGuessTrackText(entry.answerLabel)
  const performer = normalizeGuessTrackText(entry.performer)
  const context = normalizeGuessTrackText(entry.context)
  if (title === query) return 0
  if (title.startsWith(query)) return 1
  if (title.split(' ').some((part) => part.startsWith(query))) return 2
  if (label.startsWith(query)) return 3
  if (performer.startsWith(query) || context.startsWith(query)) return 4
  if (label.includes(query)) return 5
  return null
}

export function searchGuessTrackChoices(
  entries: readonly GuessTrackEntry[],
  query: string,
  guessedRecordingKeys: readonly string[] = [],
  limit = 8
): GuessTrackEntry[] {
  const normalized = normalizeGuessTrackText(query)
  // Nothing is suggested until the player types, so the list never covers Skip.
  if (!normalized) return []
  const guessed = new Set(guessedRecordingKeys)
  return guessTrackChoices(entries)
    .map((entry) => ({ entry, rank: searchRank(entry, normalized) }))
    .filter(
      (row): row is { entry: GuessTrackEntry; rank: number } =>
        row.rank != null && !guessed.has(row.entry.recordingKey)
    )
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        a.entry.answerLabel.localeCompare(b.entry.answerLabel, undefined, { sensitivity: 'base' })
    )
    .slice(0, Math.max(0, limit))
    .map((row) => row.entry)
}

export function guessTrackPoints(attemptIndex: number): number {
  return Math.max(0, GUESS_TRACK_CLIP_SECONDS.length - Math.max(0, attemptIndex))
}

export function initialGuessTrackRound(): GuessTrackRoundState {
  return { status: 'playing', attempts: [], guessedRecordingKeys: [], points: 0 }
}

export function guessTrackClipSeconds(state: GuessTrackRoundState): number {
  return GUESS_TRACK_CLIP_SECONDS[
    Math.min(state.attempts.length, GUESS_TRACK_CLIP_SECONDS.length - 1)
  ]
}

export function guessTrackArtistInitial(performer: string): string {
  return Array.from(performer.trim())[0] ?? ''
}

export const GUESS_TRACK_YEAR_HINT_AFTER = 3
export const GUESS_TRACK_ARTIST_HINT_AFTER = 5

/** One ladder for both sources: the year after three misses, the artist after five. */
export function guessTrackHints(entry: GuessTrackEntry, state: GuessTrackRoundState): string[] {
  if (state.status !== 'playing') return []
  const misses = state.attempts.length
  const who = entry.source === 'theme' ? 'Performer' : 'Artist'
  const hints: string[] = []
  if (misses >= GUESS_TRACK_YEAR_HINT_AFTER) {
    hints.push(
      entry.year
        ? `${entry.source === 'theme' ? 'Anime aired' : 'Released'} ${entry.year}`
        : `${who} starts with “${guessTrackArtistInitial(entry.performer)}”`
    )
  }
  if (misses >= GUESS_TRACK_ARTIST_HINT_AFTER) hints.push(`${who}: ${entry.performer}`)
  return hints
}

/** A wrong pick from the same anime (themes) or artist (music) as any valid answer. */
export function guessTrackNearMiss(
  picked: GuessTrackEntry,
  answers: readonly GuessTrackEntry[]
): boolean {
  return answers.some(
    (answer) => answer.balanceKey === picked.balanceKey && answer.key !== picked.key
  )
}

/**
 * Seconds of leading silence before the first audible window, so a 1 second
 * clip is never spent on a fade-in gap. Returns 0 when nothing is audible
 * within `maxSeconds` (play from the start rather than guess).
 */
export function leadingSilenceSeconds(
  channels: readonly Float32Array[],
  sampleRate: number,
  { windowSeconds = 0.02, threshold = 0.015, prerollSeconds = 0.05, maxSeconds = 20 } = {}
): number {
  if (channels.length === 0 || !(sampleRate > 0)) return 0
  const length = Math.min(...channels.map((channel) => channel.length))
  const step = Math.max(1, Math.round(windowSeconds * sampleRate))
  const limit = Math.min(length, Math.round(maxSeconds * sampleRate))
  for (let start = 0; start < limit; start += step) {
    const end = Math.min(start + step, length)
    for (const channel of channels) {
      let sum = 0
      for (let i = start; i < end; i++) sum += channel[i] * channel[i]
      if (Math.sqrt(sum / (end - start)) >= threshold) {
        return Math.round(Math.max(0, start / sampleRate - prerollSeconds) * 1000) / 1000
      }
    }
  }
  return 0
}

export function submitGuessTrack(
  state: GuessTrackRoundState,
  picked: GuessTrackEntry,
  validKeys: readonly string[],
  near = false
): GuessTrackTransition {
  if (state.status !== 'playing') return { state, outcome: state.status }
  if (state.guessedRecordingKeys.includes(picked.recordingKey)) {
    return { state, outcome: 'repeated' }
  }
  const attempts = [
    ...state.attempts,
    { kind: 'guess' as const, key: picked.key, label: picked.answerLabel, near }
  ]
  const guessedRecordingKeys = [...state.guessedRecordingKeys, picked.recordingKey]
  if (validKeys.includes(picked.key)) {
    return {
      outcome: 'correct',
      state: {
        status: 'correct',
        attempts,
        guessedRecordingKeys,
        points: guessTrackPoints(state.attempts.length)
      }
    }
  }
  if (attempts.length >= GUESS_TRACK_CLIP_SECONDS.length) {
    return {
      outcome: 'failed',
      state: { status: 'failed', attempts, guessedRecordingKeys, points: 0 }
    }
  }
  return {
    outcome: 'wrong',
    state: { status: 'playing', attempts, guessedRecordingKeys, points: 0 }
  }
}

export function skipGuessTrack(state: GuessTrackRoundState): GuessTrackTransition {
  if (state.status !== 'playing') return { state, outcome: state.status }
  const attempts = [
    ...state.attempts,
    { kind: 'skip' as const, key: null, label: 'Skipped' }
  ]
  if (attempts.length >= GUESS_TRACK_CLIP_SECONDS.length) {
    return {
      outcome: 'failed',
      state: { ...state, status: 'failed', attempts, points: 0 }
    }
  }
  return { outcome: 'wrong', state: { ...state, attempts, points: 0 } }
}
