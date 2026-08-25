import type { TournamentGroup, TournamentGroupStanding, TournamentTiebreak } from './types'

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
  qualified: number[]
  tiebreak: TournamentTiebreak | null
} {
  if (group.matches.some((m) => m.winner == null)) return { qualified: [], tiebreak: null }
  const table = group.standings
  const boundaryWins = table[1].wins
  const above = table.filter((s) => s.wins > boundaryWins).map((s) => s.contender)
  const tied = table.filter((s) => s.wins === boundaryWins).map((s) => s.contender)
  const needed = 2 - above.length
  if (tied.length <= needed) return { qualified: [...above, ...tied], tiebreak: null }
  return {
    qualified: above,
    tiebreak: { groupId: group.id, contenders: tied, needed: needed as 1 | 2 }
  }
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
