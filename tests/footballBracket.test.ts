import { describe, expect, it } from 'vitest'
import { footballKnockoutBracket, footballTitleRace } from '../src/shared/footballInsights'
import type { FootballMatchSummary, FootballStanding, FootballTeamSummary } from '../src/shared/types'

const team = (id: number): FootballTeamSummary => ({
  id, name: `Team ${id}`, shortName: null, country: null, isNational: false, imagePath: null, colors: null, favorite: false
})

let nextId = 1
function match(
  date: string,
  home: number,
  away: number,
  score: [number, number] | null,
  stageName: string | null = null,
  penalties: [number, number] | null = null
): FootballMatchSummary {
  return {
    id: nextId++, seasonId: 1, competitionId: 1, competitionKey: 'champions-league', competitionName: 'Cup',
    seasonLabel: 'S', stageId: null, stageName, home: team(home), away: team(away), kickoffAt: null,
    matchDate: date, round: stageName, status: score ? 'finished' : 'scheduled',
    homeScore: score?.[0] ?? null, awayScore: score?.[1] ?? null, homeExtraTime: null, awayExtraTime: null,
    homePenalties: penalties?.[0] ?? null, awayPenalties: penalties?.[1] ?? null,
    favorite: false, watchedAt: null, rating: null, eventCoverage: 'not_supplied', conflicted: false
  }
}

const shape = (rounds: ReturnType<typeof footballKnockoutBracket>) => rounds?.map((round) => ({
  label: round.label,
  ties: round.ties.map((tie) => ({ teams: tie.teams.map((t) => t.id), goals: tie.goals, legs: tie.matches.length, winner: tie.winnerId }))
}))

describe('football knockout bracket', () => {
  it('reads two-legged rounds back from a named final and ignores group and qualifying stages', () => {
    const matches = [
      match('2020-07-01', 1, 9, [1, 0], 'Q-1'),
      match('2020-09-01', 1, 2, [3, 3], 'GroupA'),
      // Quarter-finals: 1-8, 2-7, 3-6, 4-5 over two legs.
      match('2021-03-01', 1, 8, [2, 0], 'QF'), match('2021-03-08', 8, 1, [1, 1], 'QF'),
      match('2021-03-01', 2, 7, [0, 1], 'QF'), match('2021-03-08', 7, 2, [0, 2], 'QF'),
      match('2021-03-02', 3, 6, [1, 1], 'QF'), match('2021-03-09', 6, 3, [2, 2], 'QF'),
      match('2021-03-02', 4, 5, [0, 0], 'QF'), match('2021-03-09', 5, 4, [1, 0], 'QF'),
      match('2021-04-01', 1, 3, [1, 0], 'SF'), match('2021-04-08', 3, 1, [0, 0], 'SF'),
      match('2021-04-01', 2, 5, [2, 2], 'SF'), match('2021-04-08', 5, 2, [1, 3], 'SF'),
      match('2021-05-29', 1, 2, [1, 1], 'final', [4, 3])
    ]
    expect(shape(footballKnockoutBracket(matches, 'champions-league', '2020/21', null))).toEqual([
      { label: 'Quarter-finals', ties: [
        { teams: [1, 8], goals: [3, 1], legs: 2, winner: 1 },
        { teams: [3, 6], goals: [3, 3], legs: 2, winner: 3 },
        { teams: [2, 7], goals: [2, 1], legs: 2, winner: 2 },
        { teams: [4, 5], goals: [0, 1], legs: 2, winner: 5 }
      ] },
      { label: 'Semi-finals', ties: [
        { teams: [1, 3], goals: [1, 0], legs: 2, winner: 1 },
        { teams: [2, 5], goals: [5, 3], legs: 2, winner: 2 }
      ] },
      { label: 'Final', ties: [{ teams: [1, 2], goals: [1, 1], legs: 1, winner: 1 }] }
    ])
    const final = footballKnockoutBracket(matches, 'champions-league', '2020/21', null)!.at(-1)!.ties[0]
    expect(final.penalties).toEqual([4, 3])
  })

  it('infers an unnamed finals tournament from its knockout size, final replays included', () => {
    // Euro 1968 shape: four teams, a semi-final drawn without a shoot-out, a replayed final.
    const matches = [
      match('1968-05-01', 1, 9, [2, 0]), match('1968-05-02', 2, 9, [1, 0]),
      match('1968-05-03', 3, 9, [1, 0]), match('1968-05-04', 4, 9, [3, 0]),
      match('1968-06-05', 1, 3, [0, 0]),
      match('1968-06-05', 2, 4, [1, 0]),
      match('1968-06-08', 4, 3, [2, 0]),
      match('1968-06-08', 1, 2, [1, 1]),
      match('1968-06-10', 1, 2, [2, 0])
    ]
    const rounds = footballKnockoutBracket(matches, 'euros', '1968', 1)
    expect(shape(rounds)).toEqual([
      { label: 'Semi-finals', ties: [
        { teams: [1, 3], goals: [0, 0], legs: 1, winner: 1 },
        { teams: [2, 4], goals: [1, 0], legs: 1, winner: 2 }
      ] },
      { label: 'Final', ties: [{ teams: [1, 2], goals: [3, 1], legs: 2, winner: 1 }] }
    ])
  })

  it('tells the final from a third-place match played the same day', () => {
    const matches = [
      match('1982-07-08', 1, 3, [2, 0]), match('1982-07-08', 2, 4, [3, 3]),
      match('1982-07-11', 3, 4, [2, 3]), match('1982-07-11', 1, 2, [3, 1])
    ]
    expect(shape(footballKnockoutBracket(matches, 'world-cup', '1982', 1))?.at(-1)).toEqual({
      label: 'Final', ties: [{ teams: [1, 2], goals: [3, 1], legs: 1, winner: 1 }]
    })
  })

  it('stops at a round whose advancing team lost its tie, and skips editions without a format', () => {
    const matches = [
      match('2000-06-01', 1, 5, [0, 1]), match('2000-06-01', 2, 6, [2, 0]),
      match('2000-06-02', 3, 7, [1, 0]), match('2000-06-02', 4, 8, [1, 0]),
      match('2000-06-10', 1, 3, [2, 0]), match('2000-06-10', 2, 4, [0, 0], null, [5, 4]),
      match('2000-06-20', 1, 2, [1, 0])
    ]
    expect(shape(footballKnockoutBracket(matches, 'euros', '2000', null))?.map((round) => round.label))
      .toEqual(['Semi-finals', 'Final'])
    expect(footballKnockoutBracket(matches, 'euros', '1980', null)).toBeNull()
    expect(footballKnockoutBracket(matches, 'europa-league', '2000/01', null)).toBeNull()
  })

  it('leaves an unplayed final without a winner and caps the bracket at four rounds', () => {
    const r32: FootballMatchSummary[] = []
    const ids = Array.from({ length: 32 }, (_, index) => index + 1)
    let field = ids
    const names = ['Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals']
    names.forEach((name, round) => {
      const winners: number[] = []
      for (let index = 0; index < field.length; index += 2) {
        r32.push(match(`2026-0${round + 1}-10`, field[index], field[index + 1], [1, 0], name))
        winners.push(field[index])
      }
      field = winners
    })
    r32.push(match('2026-07-19', field[0], field[1], null, 'Final'))
    // Provider spellings of earlier rounds never stand in for the final.
    r32.push(match('2025-09-01', 40, 41, [1, 0], '8th Finals'), match('2025-09-02', 42, 43, [1, 0], '1/8-finals'))
    r32.push(match('2025-08-01', 44, 45, [1, 0], '3rd Place Final'))
    const rounds = footballKnockoutBracket(r32, 'champions-league', '2025/26', null)!
    expect(rounds.map((round) => [round.label, round.ties.length])).toEqual([
      ['Round of 16', 8], ['Quarter-finals', 4], ['Semi-finals', 2], ['Final', 1]
    ])
    expect(rounds[3].ties[0]).toMatchObject({ goals: null, winnerId: null })
    expect(footballKnockoutBracket(r32.filter((item) => /8th|1\/8/.test(item.stageName ?? '')), 'champions-league', '2025/26', null))
      .toBeNull()
  })
})

describe('football title race', () => {
  const standing = (id: number): FootballStanding => ({
    team: team(id), rank: null, rankOfficial: false, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0,
    goalsAgainst: 0, goalDifference: 0, points: 0, deduction: 0, note: null, position: id, teamCount: 6, fate: null
  })

  it('follows the top four plus any club that led after ten games', () => {
    const matches: FootballMatchSummary[] = []
    // Team 1 draws its first ten games; team 5 wins its first twelve and leads; team 6 never leads.
    for (let game = 1; game <= 20; game++) {
      const date = `2020-${String(Math.ceil(game / 2)).padStart(2, '0')}-${game % 2 ? '05' : '20'}`
      matches.push(match(date, 5, 6, game <= 12 ? [1, 0] : [0, 1]))
      matches.push(match(date, 1, 2, game <= 10 ? [1, 1] : [2, 1]))
      matches.push(match(date, 3, 4, [1, 1]))
    }
    const lines = footballTitleRace(matches, [1, 2, 3, 4, 5, 6].map(standing), 2)
    expect(lines.map((line) => line.team.id)).toEqual([1, 2, 3, 4, 5])
    expect(lines[0].points.slice(0, 3)).toEqual([1, 2, 3])
    expect(lines[0].points.at(-1)).toBe(30)
    expect(lines[4].points[11]).toBe(24)
    expect(lines[2].points.at(-1)).toBe(20)
  })

  it('draws nothing before a season has two games', () => {
    expect(footballTitleRace([match('2020-08-01', 1, 2, [1, 0])], [standing(1), standing(2)], 3)).toEqual([])
  })
})
