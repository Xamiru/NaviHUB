import { describe, expect, it } from 'vitest'
import {
  buildFootballCareerQuestions,
  buildFootballChampionQuestions,
  buildFootballChronologyQuestions,
  buildFootballPlayerGrid,
  buildFootballScorelineQuestions,
  type FootballChampionCandidate,
  type FootballGridPool
} from '../src/shared/footballQuiz'

const champions: FootballChampionCandidate[] = [
  ['2000/01', 2001, 1, 'Arsenal'],
  ['2001/02', 2002, 2, 'Chelsea'],
  ['2002/03', 2003, 3, 'Liverpool'],
  ['2003/04', 2004, 4, 'Manchester United'],
  ['2004/05', 2005, 1, 'Arsenal']
].map(([seasonLabel, year, teamId, teamName], index) => ({
  seasonId: index + 10,
  competitionKey: 'premier-league',
  competitionName: 'Premier League',
  seasonLabel: String(seasonLabel),
  year: Number(year),
  teamId: Number(teamId),
  teamName: String(teamName),
  datasetRevision: 'r1'
}))

describe('Football quiz builders', () => {
  it('deals deterministic era-near champion choices with one valid answer', () => {
    const first = buildFootballChampionQuestions(champions, 5, 42)
    expect(first).toEqual(buildFootballChampionQuestions(champions, 5, 42))
    expect(first).toHaveLength(5)
    for (const question of first) {
      expect(question.choices).toHaveLength(4)
      expect(new Set(question.choices.map((choice) => choice.key)).size).toBe(4)
      expect(question.validKeys).toHaveLength(1)
    }
  })

  it('creates four distinct plausible scorelines and preserves penalties', () => {
    const questions = buildFootballScorelineQuestions([{
      matchId: 1,
      competitionKey: 'world-cup',
      competitionName: 'World Cup',
      homeTeam: 'Argentina',
      awayTeam: 'France',
      matchDate: '2022-12-18',
      stage: 'Final',
      homeScore: 3,
      awayScore: 3,
      homeExtraTime: 3,
      awayExtraTime: 3,
      homePenalties: 4,
      awayPenalties: 2,
      datasetRevision: 'r1'
    }], 1, 9)
    expect(questions[0].choices).toHaveLength(4)
    expect(new Set(questions[0].choices.map((choice) => choice.key)).size).toBe(4)
    expect(questions[0].validKeys[0]).toContain('pens')
  })

  it('requires complete unique four-spell careers and shortens long trails', () => {
    const candidates = Array.from({ length: 5 }, (_, person) => ({
      personId: person + 1,
      name: `Player ${person + 1}`,
      datasetRevision: 'r2',
      spells: Array.from({ length: person === 0 ? 8 : 4 }, (_, spell) => ({
        team: `Club ${person}-${spell}`,
        start: String(2000 + spell),
        end: String(2001 + spell),
        loan: spell === 2
      }))
    }))
    const questions = buildFootballCareerQuestions(candidates, 5, 3)
    expect(questions).toHaveLength(5)
    const shortened = questions.find((question) => question.validKeys[0] === '1')
    expect(shortened?.spells).toHaveLength(6)
    expect(shortened?.spells.some((spell) => spell.ellipsisBefore)).toBe(true)
  })

  it('scores chronology as twenty direct positions across five boards', () => {
    const boards = buildFootballChronologyQuestions(champions, 5, 88)
    expect(boards).toHaveLength(5)
    for (const board of boards) {
      expect(board.validKeys).toHaveLength(4)
      const years = board.validKeys.map((key) => board.entries.find((entry) => entry.key === key)!.year)
      expect(years).toEqual([...years].sort((a, b) => a - b))
    }
  })

  it('deals only grids with two answers per cell, three clue families and a perfect matching', () => {
    const clues = [
      ...Array.from({ length: 3 }, (_, index) => ({ key: `club:${index}`, kind: 'club' as const, label: `Club ${index}` })),
      ...Array.from({ length: 3 }, (_, index) => ({ key: `nation:${index}`, kind: 'nationalTeam' as const, label: `Nation ${index}` })),
      ...Array.from({ length: 3 }, (_, index) => ({ key: `edition:${index}`, kind: 'competitionEdition' as const, label: `Edition ${index}` }))
    ]
    const players: FootballGridPool['players'] = []
    let id = 1
    for (let a = 0; a < clues.length; a++) {
      for (let b = a + 1; b < clues.length; b++) {
        if (clues[a].kind === clues[b].kind) continue
        for (let copy = 0; copy < 2; copy++) {
          players.push({ personId: id, name: `Player ${id}`, aliases: [], clueKeys: [clues[a].key, clues[b].key] })
          id++
        }
      }
    }
    const board = buildFootballPlayerGrid({ clues, players, datasetRevision: 'r3' }, 27)[0]
    expect(board).toBeDefined()
    expect(new Set([...board.rows, ...board.columns].map((clue) => clue.kind)).size).toBeGreaterThanOrEqual(3)
    expect(board.cells.every((cell) => cell.validKeys.length >= 2)).toBe(true)
    expect(new Set(board.cells.map((cell) => cell.revealKey)).size).toBe(9)
  })
})
