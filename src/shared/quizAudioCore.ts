export type SongQuizMode = 'classic' | 'arcade' | 'reverse'

export interface SongAnswerIdentity {
  mediaId: number
  themeId: number
}

export function shouldAutoplaySongMode(mode: SongQuizMode): boolean {
  return mode !== 'reverse'
}

export function initialSongAuditionIndex(mode: SongQuizMode, optionCount: number): number | null {
  return mode === 'reverse' && optionCount > 0 ? 0 : null
}

export function shouldRunSongTimer(mode: SongQuizMode, quizAudioPlaying: boolean): boolean {
  return mode !== 'reverse' || !quizAudioPlaying
}

export function songAnswerKey(mode: SongQuizMode, song: SongAnswerIdentity): string {
  return mode === 'reverse' ? `theme-${song.themeId}` : `media-${song.mediaId}`
}

export function shouldAcceptAudioRequest(latestSequence: number, requestSequence: number): boolean {
  return latestSequence === requestSequence
}

export function shouldStopQuizTrack(trackId: string | null | undefined): boolean {
  return Boolean(trackId?.startsWith('quiz-'))
}

export function quizClipDurationMs(snippetSeconds: number): number | null {
  return snippetSeconds > 0 ? snippetSeconds * 1000 : null
}
