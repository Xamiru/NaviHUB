import { balancedDeal, seededRng } from './quizCore'
import { shuffle } from './shuffle'
import { formatFootballScore } from './football'
import type {
  FootballCompetitionKey,
  QuizChallengeChoice,
  QuizFootballCareerPathQuestion,
  QuizFootballChampionQuestion,
  QuizFootballChronologyQuestion,
  QuizFootballGridCell,
  QuizFootballGridClue,
  QuizFootballPlayerGridQuestion,
  QuizFootballScorelineQuestion
} from './types'

export interface FootballChampionCandidate {
  seasonId: number
  competitionKey: FootballCompetitionKey
  competitionName: string
  seasonLabel: string
  year: number
  teamId: number
  teamName: string
  datasetRevision: string
}

export interface FootballScorelineCandidate {
  matchId: number
  competitionKey: FootballCompetitionKey
  competitionName: string
  homeTeam: string
  awayTeam: string
  matchDate: string
  stage: string | null
  homeScore: number
  awayScore: number
  homeExtraTime: number | null
  awayExtraTime: number | null
  homePenalties: number | null
  awayPenalties: number | null
  datasetRevision: string
}

export interface FootballCareerCandidate {
  personId: number
  name: string
  datasetRevision: string
  spells: Array<{
    team: string
    start: string | null
    end: string | null
    loan: boolean
  }>
}

export interface FootballGridCandidate {
  personId: number
  name: string
  aliases: string[]
  clueKeys: string[]
}

export interface FootballGridPool {
  clues: QuizFootballGridClue[]
  players: FootballGridCandidate[]
  datasetRevision: string
}

function choice(key: string | number, label: string): QuizChallengeChoice {
  return { key: String(key), label }
}

export function buildFootballChampionQuestions(
  candidates: readonly FootballChampionCandidate[],
  length: number,
  seed: number
): QuizFootballChampionQuestion[] {
  const rng = seededRng(seed)
  const byCompetition = new Map<FootballCompetitionKey, FootballChampionCandidate[]>()
  for (const candidate of candidates) {
    byCompetition.set(candidate.competitionKey, [
      ...(byCompetition.get(candidate.competitionKey) ?? []),
      candidate
    ])
  }
  const eligible = candidates.filter((candidate) => {
    const uniqueTeams = new Set(
      (byCompetition.get(candidate.competitionKey) ?? []).map((item) => item.teamId)
    )
    return uniqueTeams.size >= 4
  })
  return balancedDeal(eligible, Math.max(1, length), (item) => item.competitionKey, rng).map(
    (answer, index) => {
      const distractors = (byCompetition.get(answer.competitionKey) ?? [])
        .filter((item) => item.teamId !== answer.teamId)
        .map((item) => ({ item, distance: Math.abs(item.year - answer.year), tie: rng() }))
        .sort((a, b) => a.distance - b.distance || a.tie - b.tie)
        .filter((entry, i, all) => all.findIndex((other) => other.item.teamId === entry.item.teamId) === i)
        .slice(0, 3)
        .map((entry) => entry.item)
      const choices = shuffle([answer, ...distractors], rng).map((item) =>
        choice(item.teamId, item.teamName)
      )
      return {
        id: `football-champion-${seed}-${index}`,
        kind: 'footballChampion',
        prompt: `Who won ${answer.competitionName} ${answer.seasonLabel}?`,
        choices,
        validKeys: [String(answer.teamId)],
        competitionKey: answer.competitionKey,
        competitionName: answer.competitionName,
        seasonId: answer.seasonId,
        seasonLabel: answer.seasonLabel,
        datasetRevision: answer.datasetRevision
      }
    }
  )
}

function scoreChoice(
  candidate: Pick<
    FootballScorelineCandidate,
    | 'homeScore'
    | 'awayScore'
    | 'homeExtraTime'
    | 'awayExtraTime'
    | 'homePenalties'
    | 'awayPenalties'
  >
): QuizChallengeChoice {
  const label = formatFootballScore(candidate)
  return { key: label, label }
}

function plausibleScores(answer: FootballScorelineCandidate, rng: () => number): QuizChallengeChoice[] {
  const choices = new Map<string, QuizChallengeChoice>()
  const add = (home: number, away: number): void => {
    const item = scoreChoice({
      homeScore: Math.max(0, home),
      awayScore: Math.max(0, away),
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null
    })
    choices.set(item.key, item)
  }
  const answerChoice = scoreChoice(answer)
  choices.set(answerChoice.key, answerChoice)
  const candidates: [number, number][] = [
    [answer.awayScore, answer.homeScore],
    [answer.homeScore + 1, answer.awayScore],
    [answer.homeScore, answer.awayScore + 1],
    [Math.max(0, answer.homeScore - 1), answer.awayScore],
    [answer.homeScore, Math.max(0, answer.awayScore - 1)],
    [answer.homeScore + 1, answer.awayScore + 1],
    [Math.max(0, answer.homeScore - 1), Math.max(0, answer.awayScore - 1)]
  ]
  for (const [home, away] of shuffle(candidates, rng)) {
    add(home, away)
    if (choices.size >= 4) break
  }
  return shuffle([...choices.values()].slice(0, 4), rng)
}

export function buildFootballScorelineQuestions(
  candidates: readonly FootballScorelineCandidate[],
  length: number,
  seed: number
): QuizFootballScorelineQuestion[] {
  const rng = seededRng(seed)
  return balancedDeal(candidates, Math.max(1, length), (item) => item.competitionKey, rng).map(
    (answer, index) => {
      const answerChoice = scoreChoice(answer)
      return {
        id: `football-score-${seed}-${index}`,
        kind: 'footballScoreline',
        prompt: `What was the final score?`,
        choices: plausibleScores(answer, rng),
        validKeys: [answerChoice.key],
        competitionKey: answer.competitionKey,
        matchId: answer.matchId,
        homeTeam: answer.homeTeam,
        awayTeam: answer.awayTeam,
        matchDate: answer.matchDate,
        stage: answer.stage,
        reveal: `${answer.competitionName}: ${answer.homeTeam} ${answerChoice.label} ${answer.awayTeam}`,
        datasetRevision: answer.datasetRevision
      }
    }
  )
}

function shortenedSpells(candidate: FootballCareerCandidate): QuizFootballCareerPathQuestion['spells'] {
  const spells = candidate.spells
  if (spells.length <= 6) return spells.map((spell) => ({ ...spell, ellipsisBefore: false }))
  return [
    ...spells.slice(0, 3).map((spell) => ({ ...spell, ellipsisBefore: false })),
    ...spells.slice(-3).map((spell, index) => ({ ...spell, ellipsisBefore: index === 0 }))
  ]
}

export function buildFootballCareerQuestions(
  candidates: readonly FootballCareerCandidate[],
  length: number,
  seed: number
): QuizFootballCareerPathQuestion[] {
  const rng = seededRng(seed)
  const signatures = new Map<string, number>()
  for (const candidate of candidates) {
    const signature = candidate.spells.map((spell) => `${spell.team}:${spell.start}:${spell.end}:${spell.loan}`).join('|')
    signatures.set(signature, (signatures.get(signature) ?? 0) + 1)
  }
  const eligible = candidates.filter((candidate) => {
    if (candidate.spells.length < 4) return false
    const signature = candidate.spells.map((spell) => `${spell.team}:${spell.start}:${spell.end}:${spell.loan}`).join('|')
    return signatures.get(signature) === 1
  })
  return shuffle(eligible, rng).slice(0, Math.max(1, length)).flatMap((answer, index) => {
    const distractors = shuffle(eligible.filter((item) => item.personId !== answer.personId), rng).slice(0, 3)
    if (distractors.length < 3) return []
    return [{
      id: `football-career-${seed}-${index}`,
      kind: 'footballCareerPath' as const,
      prompt: 'Which player followed this senior club career path?',
      choices: shuffle([answer, ...distractors], rng).map((item) => choice(item.personId, item.name)),
      validKeys: [String(answer.personId)],
      spells: shortenedSpells(answer),
      datasetRevision: answer.datasetRevision
    }]
  })
}

export function buildFootballChronologyQuestions(
  candidates: readonly FootballChampionCandidate[],
  length: number,
  seed: number
): QuizFootballChronologyQuestion[] {
  const rng = seededRng(seed)
  const groups = new Map<FootballCompetitionKey, FootballChampionCandidate[]>()
  for (const candidate of candidates) {
    groups.set(candidate.competitionKey, [...(groups.get(candidate.competitionKey) ?? []), candidate])
  }
  const usable = [...groups.values()].filter((items) => items.length >= 4)
  const out: QuizFootballChronologyQuestion[] = []
  let attempts = 0
  while (out.length < Math.max(1, length) && usable.length && attempts++ < length * 20) {
    const group = usable[Math.floor(rng() * usable.length)]
    const entries = shuffle(group, rng).slice(0, 4)
    if (new Set(entries.map((entry) => entry.year)).size < 4) continue
    const choices = shuffle(entries, rng).map((entry) => ({
      ...choice(entry.seasonId, entry.teamName),
      seasonId: entry.seasonId,
      year: entry.year
    }))
    out.push({
      id: `football-chronology-${seed}-${out.length}`,
      kind: 'footballChronology',
      prompt: `Order these ${entries[0].competitionName} champions from earliest to latest.`,
      choices,
      validKeys: [...entries].sort((a, b) => a.year - b.year).map((entry) => String(entry.seasonId)),
      competitionKey: entries[0].competitionKey,
      competitionName: entries[0].competitionName,
      entries: choices,
      datasetRevision: entries.map((entry) => entry.datasetRevision).sort().at(-1) ?? 'unknown'
    })
  }
  return out
}

function perfectMatching(cells: readonly QuizFootballGridCell[]): string[] | null {
  const used = new Set<string>()
  const assignment: string[] = []
  const ordered = [...cells].sort((a, b) => a.validKeys.length - b.validKeys.length)
  function visit(index: number): boolean {
    if (index === ordered.length) return true
    for (const key of ordered[index].validKeys) {
      if (used.has(key)) continue
      used.add(key)
      assignment[index] = key
      if (visit(index + 1)) return true
      used.delete(key)
    }
    return false
  }
  if (!visit(0)) return null
  const byCell = new Map(ordered.map((cell, index) => [cell.key, assignment[index]]))
  return cells.map((cell) => byCell.get(cell.key)!)
}

export function buildFootballPlayerGrid(
  pool: FootballGridPool,
  seed: number
): QuizFootballPlayerGridQuestion[] {
  const rng = seededRng(seed)
  const clueMap = new Map(pool.clues.map((clue) => [clue.key, clue]))
  const valid = (a: string, b: string) =>
    pool.players.filter((player) => player.clueKeys.includes(a) && player.clueKeys.includes(b))
  const clues = pool.clues.filter((clue) =>
    pool.clues.some((other) => other.key !== clue.key && valid(clue.key, other.key).length >= 2)
  )
  for (let attempt = 0; attempt < 1500; attempt++) {
    const picked = shuffle(clues, rng).slice(0, 6)
    if (picked.length < 6 || new Set(picked.map((clue) => clue.kind)).size < 3) continue
    const rows = picked.slice(0, 3)
    const columns = picked.slice(3)
    const cells: QuizFootballGridCell[] = []
    let validBoard = true
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const people = valid(rows[row].key, columns[column].key)
        if (people.length < 2) {
          validBoard = false
          break
        }
        cells.push({
          key: `${row}-${column}`,
          row,
          column,
          validKeys: people.map((person) => String(person.personId)),
          revealKey: String(people[0].personId),
          hintChoices: shuffle(people, rng).slice(0, 4).map((person) => String(person.personId))
        })
      }
      if (!validBoard) break
    }
    if (!validBoard) continue
    const matching = perfectMatching(cells)
    if (!matching) continue
    cells.forEach((cell, index) => {
      cell.revealKey = matching[index]
    })
    const playerKeys = new Set(cells.flatMap((cell) => cell.validKeys))
    const players = pool.players
      .filter((player) => playerKeys.has(String(player.personId)))
      .map((player) => ({
        ...choice(player.personId, player.name),
        aliases: player.aliases
      }))
    return [{
      id: `football-grid-${seed}`,
      kind: 'footballPlayerGrid',
      prompt: 'Fill every intersection with a different verified senior player.',
      choices: players,
      validKeys: [],
      rows: rows.map((clue) => clueMap.get(clue.key)!),
      columns: columns.map((clue) => clueMap.get(clue.key)!),
      cells,
      players,
      datasetRevision: pool.datasetRevision
    }]
  }
  return []
}
