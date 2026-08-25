import type { QuizPartyParticipants, QuizPartyResult, QuizKind, QuizConsumptionScope } from './types'

export type PartyPhase = 'owner' | 'steal' | 'reveal' | 'done'

export interface PartyQuizState {
  labels: string[]
  scores: number[]
  owner: number
  stealSide: number | null
  question: number
  questionCount: number
  phase: PartyPhase
}

export function partyLabels(participants: QuizPartyParticipants): string[] {
  if (participants === 'teams') return ['Team A', 'Team B']
  return Array.from({ length: participants }, (_, i) => `Player ${i + 1}`)
}

export function createPartyState(participants: QuizPartyParticipants): PartyQuizState {
  const labels = partyLabels(participants)
  return {
    labels,
    scores: labels.map(() => 0),
    owner: 0,
    stealSide: null,
    question: 0,
    questionCount: labels.length * 5,
    phase: 'owner'
  }
}

function finishQuestion(state: PartyQuizState): PartyQuizState {
  if (state.question + 1 >= state.questionCount) return { ...state, phase: 'done', stealSide: null }
  return {
    ...state,
    question: state.question + 1,
    owner: (state.owner + 1) % state.labels.length,
    stealSide: null,
    phase: 'owner'
  }
}

export function answerParty(state: PartyQuizState, correct: boolean): PartyQuizState {
  if (state.phase === 'owner') {
    if (correct) {
      const scores = [...state.scores]
      scores[state.owner] += 2
      return { ...state, scores, phase: 'reveal' }
    }
    return { ...state, stealSide: (state.owner + 1) % state.labels.length, phase: 'steal' }
  }
  if (state.phase === 'steal') {
    const scores = [...state.scores]
    if (correct && state.stealSide != null) scores[state.stealSide] += 1
    return { ...state, scores, phase: 'reveal' }
  }
  return state
}

export function advanceParty(state: PartyQuizState): PartyQuizState {
  return state.phase === 'reveal' ? finishQuestion(state) : state
}

export function partyResult(
  state: PartyQuizState,
  kind: QuizKind,
  scope: QuizConsumptionScope,
  seed: number
): QuizPartyResult {
  const high = Math.max(...state.scores)
  return {
    kind,
    participants: state.labels,
    scores: state.labels.map((label, i) => ({ label, score: state.scores[i] })),
    winners: state.labels.filter((_, i) => state.scores[i] === high),
    questionCount: state.questionCount,
    scope,
    seed
  }
}
