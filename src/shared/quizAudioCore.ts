export type SongQuizMode = 'classic' | 'arcade' | 'reverse'

export function shouldAutoplaySongMode(mode: SongQuizMode): boolean {
  return mode !== 'reverse'
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
