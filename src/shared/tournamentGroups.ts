import type {
  TournamentGroup,
  TournamentGroupStanding,
  TournamentQualifier,
  TournamentTiebreak
} from './types'

export interface TournamentGroupsState {
  entryCount: number
  groups: TournamentGroup[]
}

function standings(contenders: number[], matches: TournamentGroup['matches']): TournamentGroupStanding[] {
  return contenders.map((contender) => ({
    contender,
    played: matches.filter((m) => m.winner != null && (m.a === contender || m.b === contender)).length,
    wins: matches.filter((m) => m.winner === contender).length
  })).sort((a, b) => b.wins - a.wins || a.contender - b.contender)
}

export function createTournamentGroups(entryCount: number): TournamentGroupsState {
  if (![8, 16, 32, 64].includes(entryCount)) throw new Error('Group format requires 8, 16, 32, or 64 contenders')
  const groups: TournamentGroup[] = []
  for (let start = 0; start < entryCount; start += 4) {
    const contenders = [start, start + 1, start + 2, start + 3]
    const matches: TournamentGroup['matches'] = []
    for (let i = 0; i < contenders.length; i++) {
      for (let j = i + 1; j < contenders.length; j++) matches.push({ a: contenders[i], b: contenders[j], winner: null })
    }
    groups.push({ id: groups.length, contenders, matches, standings: standings(contenders, matches) })
  }
  return { entryCount, groups }
}

export function currentGroupMatch(state: TournamentGroupsState): { groupId: number; matchIndex: number; a: number; b: number } | null {
  for (const group of state.groups) {
    const matchIndex = group.matches.findIndex((m) => m.winner == null)
    if (matchIndex >= 0) return { groupId: group.id, matchIndex, a: group.matches[matchIndex].a, b: group.matches[matchIndex].b }
  }
  return null
}

export function pickGroupWinner(
  state: TournamentGroupsState,
  groupId: number,
  matchIndex: number,
  winner: number
): TournamentGroupsState {
  const groups = state.groups.map((group) => {
    if (group.id !== groupId) return group
    const matches = group.matches.map((match, i) => {
      if (i !== matchIndex) return match
      if (match.winner != null) throw new Error('Group match already decided')
      if (winner !== match.a && winner !== match.b) throw new Error('Winner is not in this match')
      return { ...match, winner }
    })
    return { ...group, matches, standings: standings(group.contenders, matches) }
  })
  return { ...state, groups }
}

export function groupQualification(group: TournamentGroup): {
  qualified: TournamentQualifier[]
  tiebreak: TournamentTiebreak | null
} {
  if (group.matches.some((m) => m.winner == null)) return { qualified: [], tiebreak: null }
  const table = group.standings
  const boundaryWins = table[1].wins
  const above = table.filter((s) => s.wins > boundaryWins).map((s) => s.contender)
  const tied = table.filter((s) => s.wins === boundaryWins).map((s) => s.contender)
  const needed = 2 - above.length
  if (tied.length <= needed) {
    return {
      qualified: [...above, ...tied].map((contender, index) => ({
        contender,
        groupId: group.id,
        place: (index + 1) as 1 | 2
      })),
      tiebreak: null
    }
  }
  return {
    qualified: above.map((contender, index) => ({
      contender,
      groupId: group.id,
      place: (index + 1) as 1 | 2
    })),
    tiebreak: {
      groupId: group.id,
      contenders: tied,
      needed: needed as 1 | 2,
      places: Array.from({ length: needed }, (_, index) => (above.length + index + 1) as 1 | 2)
    }
  }
}

// Adjacent groups cross over in the first knockout round: A1 v B2 and B1 v
// A2, then C1 v D2 and D1 v C2. Keeping the four-entry blocks adjacent also
// ensures those pairs cannot meet again before their local bracket final.
export function seedGroupKnockout(
  qualifiers: TournamentQualifier[],
  groupCount: number
): number[] {
  if (groupCount < 2 || groupCount % 2 !== 0) throw new Error('Knockout seeding requires paired groups')
  const find = (groupId: number, place: 1 | 2) => {
    const qualifier = qualifiers.find((item) => item.groupId === groupId && item.place === place)
    if (!qualifier) throw new Error(`Missing group ${groupId + 1} place ${place}`)
    return qualifier.contender
  }
  const seeded: number[] = []
  for (let groupId = 0; groupId < groupCount; groupId += 2) {
    seeded.push(
      find(groupId, 1),
      find(groupId + 1, 2),
      find(groupId + 1, 1),
      find(groupId, 2)
    )
  }
  return seeded
}

export function groupPlacements(group: TournamentGroup): Array<{ place: number; contenders: number[] }> {
  const byWins = new Map<number, number[]>()
  for (const row of group.standings) byWins.set(row.wins, [...(byWins.get(row.wins) ?? []), row.contender])
  let place = 1
  return [...byWins.entries()].sort((a, b) => b[0] - a[0]).map(([, contenders]) => {
    const result = { place, contenders }
    place += contenders.length
    return result
  })
}
