import { currentMatch, type Bracket } from './bracket'
import { currentGroupMatch, type TournamentGroupsState } from './tournamentGroups'
import type { TournamentEntry, TournamentFormat, TournamentQualifier, TournamentTiebreak } from './types'

export type TournamentStage = 'groups' | 'tiebreak' | 'knockout'

export interface TournamentSnapshot {
  contenders: TournamentEntry[]
  stage: TournamentStage
  groups: TournamentGroupsState | null
  qualified: TournamentQualifier[]
  tiebreakQueue: TournamentTiebreak[]
  activeTiebreak: { spec: TournamentTiebreak; bracket: Bracket } | null
  bracket: Bracket | null
}

export interface SavedTournament extends TournamentSnapshot {
  version: 3
  sourceLabel: string
  createdAt: string
  format: TournamentFormat
  groupField: TournamentEntry[] | null
  undoStack: TournamentSnapshot[]
  seed: number
  size: number
}

function hasBracket(value: unknown): value is Bracket {
  if (!value || typeof value !== 'object') return false
  const bracket = value as Bracket
  return Number.isInteger(bracket.entryCount) && bracket.entryCount >= 2 && Array.isArray(bracket.matches)
}

function hasGroups(value: unknown): value is TournamentGroupsState {
  if (!value || typeof value !== 'object') return false
  const groups = value as TournamentGroupsState
  return Number.isInteger(groups.entryCount) && Array.isArray(groups.groups)
}

export function parseSavedTournament(raw: string | undefined): SavedTournament | null {
  if (!raw) return null
  try {
    const saved = JSON.parse(raw) as SavedTournament
    if (
      saved?.version !== 3 ||
      !Array.isArray(saved.contenders) ||
      saved.contenders.length < 2 ||
      !Array.isArray(saved.qualified) ||
      !Array.isArray(saved.tiebreakQueue) ||
      !Array.isArray(saved.undoStack) ||
      !['knockout', 'groups'].includes(saved.format) ||
      !['groups', 'tiebreak', 'knockout'].includes(saved.stage) ||
      typeof saved.sourceLabel !== 'string' ||
      typeof saved.createdAt !== 'string' ||
      !Number.isInteger(saved.size) ||
      saved.size < 2 ||
      typeof saved.seed !== 'number'
    ) return null

    if (saved.stage === 'groups') {
      return hasGroups(saved.groups) && currentGroupMatch(saved.groups) ? saved : null
    }
    if (saved.stage === 'tiebreak') {
      return saved.activeTiebreak && hasBracket(saved.activeTiebreak.bracket) && currentMatch(saved.activeTiebreak.bracket)
        ? saved
        : null
    }
    return hasBracket(saved.bracket) && currentMatch(saved.bracket) ? saved : null
  } catch {
    return null
  }
}
