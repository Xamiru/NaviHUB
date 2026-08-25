import { describe, expect, it } from 'vitest'
import { createTournamentGroups, currentGroupMatch, groupPlacements, groupQualification, pickGroupWinner } from '../src/shared/tournamentGroups'

describe('tournament group stage', () => {
  it('creates every round-robin pairing once', () => {
    const state = createTournamentGroups(8)
    expect(state.groups).toHaveLength(2)
    expect(state.groups[0].matches).toHaveLength(6)
    expect(new Set(state.groups[0].matches.map((m) => [m.a, m.b].sort().join('-'))).size).toBe(6)
  })

  it('updates immutably and rejects a duplicate resolution', () => {
    const state = createTournamentGroups(8)
    const match = currentGroupMatch(state)!
    const next = pickGroupWinner(state, match.groupId, match.matchIndex, match.a)
    expect(state.groups[0].matches[0].winner).toBeNull()
    expect(next.groups[0].standings[0].wins).toBe(1)
    expect(() => pickGroupWinner(next, match.groupId, match.matchIndex, match.b)).toThrow('already decided')
  })

  it('keeps harmless ties shared and creates a cutoff tiebreak only across second place', () => {
    let state = createTournamentGroups(8)
    const winners = [0, 0, 0, 1, 3, 2] // 3,1,1,1: three-way tie for one cutoff place
    for (const winner of winners) {
      const match = currentGroupMatch(state)!
      state = pickGroupWinner(state, match.groupId, match.matchIndex, winner)
    }
    const result = groupQualification(state.groups[0])
    expect(result.qualified).toEqual([0])
    expect(result.tiebreak).toEqual({ groupId: 0, contenders: [1, 2, 3], needed: 1 })
    expect(groupPlacements(state.groups[0])[0].place).toBe(1)
  })

  it('takes winner and runner-up from a three-way tie crossing both qualification places', () => {
    let state = createTournamentGroups(8)
    for (const winner of [0, 2, 0, 1, 1, 2]) {
      const match = currentGroupMatch(state)!
      state = pickGroupWinner(state, match.groupId, match.matchIndex, winner)
    }
    expect(groupQualification(state.groups[0]).tiebreak).toEqual({
      groupId: 0,
      contenders: [0, 1, 2],
      needed: 2
    })
    expect(JSON.parse(JSON.stringify(state))).toEqual(state)
  })
})
