import { describe, expect, it } from 'vitest'
import {
  buildFootballLineupQuestion,
  buildFootballTransferChain,
  buildFootballWordleQuestion,
  footballDuelWinner,
  footballLineupLine,
  footballPositionGroup,
  footballWordleFeedback,
  footballWordleScore,
  formatTransferFee,
  matchFootballLineupName,
  orderFootballLineupMatches,
  type FootballLineupMatchCandidate,
  type FootballLineupRow
} from '../src/shared/footballGames'
import {
  buildFootballChronologyQuestions,
  footballCareerGuessPoints,
  footballCareerMaxGuesses,
  isBigFootballMatch,
  plausibleScoreShapes
} from '../src/shared/footballQuiz'
import { formatFootballScore } from '../src/shared/football'
import { seededRng } from '../src/shared/quizCore'
import type { FootballWordlePlayer, QuizFootballTransferFact } from '../src/shared/types'

function player(key: string, extra: Partial<FootballWordlePlayer> = {}): FootballWordlePlayer {
  return {
    key,
    label: `Player ${key}`,
    photoPath: null,
    nationality: 'Spain',
    position: 'Central Midfield',
    clubKey: '1',
    club: 'Club One',
    clubImagePath: null,
    league: 'La Liga',
    birthYear: 1990,
    heightCm: 180,
    shirt: 8,
    ...extra
  }
}

describe('Football Wordle', () => {
  it('groups positions by line, testing midfield before defence', () => {
    expect(footballPositionGroup('Defensive Midfield')).toBe('Midfielder')
    expect(footballPositionGroup('Centre-Back')).toBe('Defender')
    expect(footballPositionGroup('Left Winger')).toBe('Forward')
    expect(footballPositionGroup('Goalkeeper')).toBe('Goalkeeper')
  })

  it('marks exact, same-line and numeric higher/lower feedback toward the target', () => {
    const target = player('t', { birthYear: 1992, heightCm: 190, shirt: 10 })
    const guess = player('g', { position: 'Attacking Midfield', clubKey: '2', birthYear: 1989, heightCm: 188, shirt: 9, nationality: 'France' })
    const feedback = footballWordleFeedback(target, guess)
    expect(feedback.nationality).toBe('none')
    expect(feedback.position).toBe('near')
    expect(feedback.club).toBe('none')
    expect(feedback.league).toBe('exact')
    expect(feedback.birthYear).toEqual({ match: 'none', direction: 'higher' })
    expect(feedback.height).toEqual({ match: 'near', direction: 'higher' })
    expect(feedback.shirt).toEqual({ match: 'near', direction: 'higher' })
    expect(footballWordleFeedback(target, player('x', { shirt: null })).shirt.match).toBe('unknown')
  })

  it('picks the target from the best-known players and scores like Libraryle', () => {
    const players = Array.from({ length: 400 }, (_, i) => player(String(i)))
    const question = buildFootballWordleQuestion(players, 7, 'r1')!
    expect(Number(question.targetKey)).toBeLessThan(300)
    expect(question.players).toHaveLength(400)
    expect(footballWordleScore(true, 1)).toBe(1000)
    expect(footballWordleScore(true, 8)).toBe(300)
    expect(footballWordleScore(false, 8)).toBe(0)
  })
})

describe('Name the XI', () => {
  const match: FootballLineupMatchCandidate = {
    matchId: 1, competitionKey: 'champions-league', competitionName: 'Champions League', stage: 'Final',
    matchDate: '2019-06-01', homeTeam: 'Home FC', awayTeam: 'Away FC', homeImagePath: null, awayImagePath: null,
    homeFormation: '4-3-3', awayFormation: '4-4-2', scoreLabel: '2-0', datasetRevision: 'r1'
  }
  const positions = ['Goalkeeper', 'Right-Back', 'Centre-Back', 'Centre-Back', 'Left-Back', 'Defensive Midfield', 'Central Midfield', 'Attacking Midfield', 'Right Winger', 'Centre-Forward', 'Left Winger']
  const rows = (side: 'home' | 'away', base: number): FootballLineupRow[] =>
    positions.map((position, i) => ({
      side, personId: base + i, name: `${side} Player${i}`, aliases: [], photoPath: null,
      shirt: i + 1, position, starter: true
    }))

  it('places positions on pitch lines keeper to attack, left to right', () => {
    expect(footballLineupLine('Goalkeeper')).toBe(0)
    expect(footballLineupLine('Left-Back')).toBe(1)
    expect(footballLineupLine('Defensive Midfield')).toBe(2)
    expect(footballLineupLine('Central Midfield')).toBe(3)
    expect(footballLineupLine('Attacking Midfield')).toBe(4)
    expect(footballLineupLine('Centre-Forward')).toBe(5)
    const question = buildFootballLineupQuestion(match, [...rows('home', 0), ...rows('away', 100)], 3)!
    expect(question.slots).toHaveLength(11)
    const defence = question.slots.filter((slot) => slot.line === 1).map((slot) => slot.position)
    expect(defence).toEqual(['Left-Back', 'Centre-Back', 'Centre-Back', 'Right-Back'])
  })

  it('refuses a side without exactly eleven starters and one keeper', () => {
    const thin = rows('home', 0).slice(0, 10)
    const awayNoKeeper = rows('away', 100).map((row) => (row.position === 'Goalkeeper' ? { ...row, position: 'Centre-Back' } : row))
    expect(buildFootballLineupQuestion(match, [...thin, ...awayNoKeeper], 3)).toBeNull()
  })

  it('accepts full names and unique surnames, never an already named slot', () => {
    const question = buildFootballLineupQuestion(match, [...rows('home', 0), ...rows('away', 100)], 3)!
    const slot = question.slots[0]
    expect(matchFootballLineupName(question.slots, slot.name, [])?.key).toBe(slot.key)
    expect(matchFootballLineupName(question.slots, slot.name.split(' ')[1], [])?.key).toBe(slot.key)
    expect(matchFootballLineupName(question.slots, slot.name, [slot.key])).toBeNull()
  })

  it('orders finals and tournaments before other matches', () => {
    const ordered = orderFootballLineupMatches(
      [
        { stage: 'Group A', competitionKey: 'premier-league' },
        { stage: 'Final', competitionKey: 'champions-league' },
        { stage: null, competitionKey: 'world-cup' }
      ],
      1
    )
    expect(ordered.slice(0, 2).every((match) => match.stage === 'Final' || match.competitionKey === 'world-cup')).toBe(true)
  })
})

describe('Transfer Higher or Lower', () => {
  const fact = (key: string, fee: number, personName = `Player ${key}`): QuizFootballTransferFact => ({
    key, personName, photoPath: null, fromTeam: 'A', toTeam: 'B', fromImagePath: null, toImagePath: null, season: '2019', fee
  })

  it('chains each challenger into the next reference and never compares equal fees', () => {
    const facts = [fact('1', 10e6), fact('2', 20e6), fact('3', 20e6), fact('4', 80e6), fact('5', 5e6)]
    const chain = buildFootballTransferChain(facts, 10, 4, 'r1')
    expect(chain.length).toBeGreaterThan(3)
    chain.forEach((question, i) => {
      expect(question.challenger.fee).not.toBe(question.reference.fee)
      expect(question.validKeys).toEqual([question.challenger.fee > question.reference.fee ? 'higher' : 'lower'])
      if (i > 0) expect(question.reference.key).toBe(chain[i - 1].challenger.key)
    })
    expect(formatTransferFee(80e6)).toBe('€80m')
    expect(formatTransferFee(12.5e6)).toBe('€12.5m')
  })
})

describe('Football quiz fixes', () => {
  it('gives scoreline options the answer format, still level after 90 when the answer was', () => {
    const answer = { homeScore: 1, awayScore: 1, homeExtraTime: 1, awayExtraTime: 1, homePenalties: 4, awayPenalties: 3 }
    for (let seed = 0; seed < 10; seed++) {
      const shapes = plausibleScoreShapes(answer, seededRng(seed))
      expect(shapes).toHaveLength(3)
      for (const shape of shapes) {
        expect(formatFootballScore(shape)).toContain('pens')
        expect(formatFootballScore(shape)).toContain('aet')
        expect(shape.homeScore).toBe(shape.awayScore)
        expect(formatFootballScore(shape)).not.toBe(formatFootballScore(answer))
      }
    }
    const plain = plausibleScoreShapes({ homeScore: 2, awayScore: 1, homeExtraTime: null, awayExtraTime: null, homePenalties: null, awayPenalties: null }, seededRng(1))
    expect(plain.every((shape) => !formatFootballScore(shape).includes('aet'))).toBe(true)
    // Extra time with no shootout never ends level in a wrong option.
    for (let seed = 0; seed < 20; seed++) {
      const aet = plausibleScoreShapes({ homeScore: 1, awayScore: 1, homeExtraTime: 2, awayExtraTime: 1, homePenalties: null, awayPenalties: null }, seededRng(seed))
      for (const shape of aet) expect(shape.homeExtraTime).not.toBe(shape.awayExtraTime)
    }
  })

  it('treats finals, knockouts and international tournaments as big matches', () => {
    expect(isBigFootballMatch({ stage: 'Final', competitionKey: 'champions-league' })).toBe(true)
    expect(isBigFootballMatch({ stage: 'Quarter-finals', competitionKey: 'champions-league' })).toBe(true)
    expect(isBigFootballMatch({ stage: null, competitionKey: 'euros' })).toBe(true)
    expect(isBigFootballMatch({ stage: null, competitionKey: 'premier-league' })).toBe(false)
  })

  it('never deals one club twice on a chronology board', () => {
    const champions = Array.from({ length: 12 }, (_, i) => ({
      seasonId: i + 1, competitionKey: 'premier-league' as const, competitionName: 'Premier League',
      seasonLabel: `${2000 + i}`, year: 2000 + i, teamId: i % 3 === 0 ? 1 : i + 10, teamName: `Team ${i % 3 === 0 ? 1 : i + 10}`,
      datasetRevision: 'r1'
    }))
    for (const board of buildFootballChronologyQuestions(champions, 5, 9)) {
      expect(new Set(board.entries.map((entry) => entry.label)).size).toBe(4)
    }
  })

  it('scores a typed career path from 100 down by 20 per extra club', () => {
    expect(footballCareerGuessPoints(true, 0)).toBe(100)
    expect(footballCareerGuessPoints(true, 2)).toBe(60)
    expect(footballCareerGuessPoints(true, 9)).toBe(20)
    expect(footballCareerGuessPoints(false, 1)).toBe(0)
    expect(footballCareerMaxGuesses(6)).toBe(5)
  })
})

describe('Player Grid duel', () => {
  it('wins on three in a row, else on most cells, else a draw', () => {
    expect(footballDuelWinner({ '0-0': 1, '1-1': 1, '2-2': 1 }, 3)).toBe(1)
    expect(footballDuelWinner({ '0-0': 1, '0-1': 2 }, 2)).toBeNull()
    const full: Record<string, 1 | 2> = { '0-0': 1, '0-1': 2, '0-2': 1, '1-0': 1, '1-1': 2, '1-2': 2, '2-0': 2, '2-1': 1, '2-2': 1 }
    expect(footballDuelWinner(full, 9)).toBe(1)
  })
})
