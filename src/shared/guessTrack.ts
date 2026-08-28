import type { MusicTrack, QuizSong } from './types'
import { balancedDeal, seededRng } from './quizCore'
import { shuffle } from './shuffle'

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
    .map(normalizeGuessTrackText)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join('|')
}

export function guessTrackRecordingKey(title: string, performers: readonly string[]): string {
  return `${normalizeGuessTrackText(title)}::${normalizedPerformer(performers)}`
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
    answerLabel: `${title} — ${song.animeTitle}`,
    audioPath: song.audioPath,
    audioUrl: song.audioUrl,
    coverPath: song.coverPath,
    balanceKey: `anime-${song.mediaId}`
  }
}

export function guessTrackMusicEntry(track: MusicTrack): GuessTrackEntry | null {
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

export function guessTrackChoices(entries: readonly GuessTrackEntry[]): GuessTrackEntry[] {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    const label = normalizeGuessTrackText(entry.answerLabel)
    if (seen.has(label)) return false
    seen.add(label)
    return true
  })
}

function searchRank(entry: GuessTrackEntry, query: string): number | null {
  const title = normalizeGuessTrackText(entry.title)
  const label = normalizeGuessTrackText(entry.answerLabel)
  const performer = normalizeGuessTrackText(entry.performer)
  const context = normalizeGuessTrackText(entry.context)
  if (!query) return 10
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

export function guessTrackHintVisible(state: GuessTrackRoundState): boolean {
  return state.status === 'playing' && state.attempts.length >= 4
}

export function guessTrackArtistInitial(performer: string): string {
  return Array.from(performer.trim())[0] ?? ''
}

export function submitGuessTrack(
  state: GuessTrackRoundState,
  picked: GuessTrackEntry,
  validKeys: readonly string[]
): GuessTrackTransition {
  if (state.status !== 'playing') return { state, outcome: state.status }
  if (state.guessedRecordingKeys.includes(picked.recordingKey)) {
    return { state, outcome: 'repeated' }
  }
  const attempts = [
    ...state.attempts,
    { kind: 'guess' as const, key: picked.key, label: picked.answerLabel }
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
