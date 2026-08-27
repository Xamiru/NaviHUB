import { describe, expect, it } from 'vitest'
import { createBracket, currentMatch, pickWinner } from '../src/shared/bracket'
import { parseSavedTournament, type SavedTournament } from '../src/shared/tournamentSave'

const entries = [0, 1, 2, 3].map((id) => ({
  key: `media-${id}`,
  entryKind: 'media' as const,
  name: `Entry ${id}`,
  subtitle: null,
  imagePath: null,
  audioPath: null,
  audioUrl: null
}))

function save(bracket = createBracket(4)): SavedTournament {
  return {
    version: 3,
    sourceLabel: 'Movies',
    createdAt: new Date(0).toISOString(),
    contenders: entries,
    format: 'knockout',
    stage: 'knockout',
    groups: null,
    groupField: null,
    qualified: [],
    tiebreakQueue: [],
    activeTiebreak: null,
    bracket,
    undoStack: [],
    seed: 12,
    size: 4
  }
}

describe('parseSavedTournament', () => {
  it('accepts an unfinished versioned tournament', () => {
    expect(parseSavedTournament(JSON.stringify(save()))?.sourceLabel).toBe('Movies')
  })

  it('rejects old, malformed, and already-finished saves', () => {
    expect(parseSavedTournament('{')).toBeNull()
    expect(parseSavedTournament(JSON.stringify({ ...save(), version: 2 }))).toBeNull()
    let bracket = createBracket(4)
    while (currentMatch(bracket)) bracket = pickWinner(bracket, currentMatch(bracket)!.matchIndex, 'a')
    expect(parseSavedTournament(JSON.stringify(save(bracket)))).toBeNull()
  })
})
