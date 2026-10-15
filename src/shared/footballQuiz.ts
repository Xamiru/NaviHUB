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
  teamImagePath?: string | null
  datasetRevision: string
}

export interface FootballScorelineCandidate {
  matchId: number
  competitionKey: FootballCompetitionKey
  competitionName: string
  homeTeam: string
  awayTeam: string
  homeImagePath?: string | null
  awayImagePath?: string | null
  matchDate: string
  stage: string | null
  // football_stage.kind: league | group | knockout | final | qualifier.
  stageKind?: string | null
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
    imagePath?: string | null
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

function choice(key: string | number, label: string, imagePath?: string | null): QuizChallengeChoice {
  return imagePath ? { key: String(key), label, imagePath } : { key: String(key), label }
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
        choice(item.teamId, item.teamName, item.teamImagePath)
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

type ScoreShape = Pick<
  FootballScorelineCandidate,
  'homeScore' | 'awayScore' | 'homeExtraTime' | 'awayExtraTime' | 'homePenalties' | 'awayPenalties'
>

/**
 * Wrong scores in the answer's own format: a match that went to extra time or
 * penalties gets options that did too (still level after 90 minutes when the
 * answer was), so an "aet" or "pens" suffix never singles out the answer.
 */
export function plausibleScoreShapes(answer: ScoreShape, rng: () => number): ScoreShape[] {
  const hasExtra = answer.homeExtraTime != null && answer.awayExtraTime != null
  const hasPens = answer.homePenalties != null && answer.awayPenalties != null
  const level90 = answer.homeScore === answer.awayScore
  const shape = (h: number, a: number, eh: number | null, ea: number | null, ph: number | null, pa: number | null): ScoreShape => ({
    homeScore: h, awayScore: a, homeExtraTime: eh, awayExtraTime: ea, homePenalties: ph, awayPenalties: pa
  })
  const valid = (item: ScoreShape): boolean => {
    if (item.homeScore < 0 || item.awayScore < 0) return false
    if (hasExtra && level90 && item.homeScore !== item.awayScore) return false
    if (hasExtra && (item.homeExtraTime! < item.homeScore || item.awayExtraTime! < item.awayScore)) return false
    // Level after extra time with no shootout cannot happen, unless the answer
    // itself is such a match (a replay-era tie).
    if (hasExtra && !hasPens && answer.homeExtraTime !== answer.awayExtraTime && item.homeExtraTime === item.awayExtraTime) return false
    if (hasPens) {
      if (item.homePenalties! < 0 || item.awayPenalties! < 0 || item.homePenalties === item.awayPenalties) return false
      // Penalties follow a level match.
      const h = hasExtra ? item.homeExtraTime! : item.homeScore
      const a = hasExtra ? item.awayExtraTime! : item.awayScore
      if (h !== a) return false
    }
    return true
  }
  const { homeScore: h, awayScore: a } = answer
  const eh = answer.homeExtraTime
  const ea = answer.awayExtraTime
  const ph = answer.homePenalties
  const pa = answer.awayPenalties
  const candidates: ScoreShape[] = []
  if (!hasExtra && !hasPens) {
    for (const [x, y] of [[a, h], [h + 1, a], [h, a + 1], [h - 1, a], [h, a - 1], [h + 1, a + 1], [h - 1, a - 1]] as const) {
      candidates.push(shape(x, y, null, null, null, null))
    }
  } else {
    const shift = (dh: number, da: number, deh: number, dea: number, dph: number, dpa: number) =>
      shape(h + dh, a + da, eh == null ? null : eh + deh, ea == null ? null : ea + dea, ph == null ? null : ph + dph, pa == null ? null : pa + dpa)
    // Mirror the whole match, move the level 90-minute score, or change who
    // scored in extra time or won the shootout.
    candidates.push(shape(a, h, ea, eh, pa, ph))
    candidates.push(shift(1, 1, 1, 1, 0, 0), shift(-1, -1, -1, -1, 0, 0))
    if (hasExtra && !hasPens) candidates.push(shift(0, 0, 1, 0, 0, 0), shift(0, 0, 0, 1, 0, 0), shift(0, 0, -1, 0, 0, 0), shift(0, 0, 0, -1, 0, 0))
    if (hasPens) candidates.push(shift(0, 0, 0, 0, 1, 0), shift(0, 0, 0, 0, 0, 1), shift(0, 0, 0, 0, -1, 0), shift(0, 0, 0, 0, 0, -1), shape(h, a, eh, ea, pa, ph))
    if (hasExtra && hasPens) candidates.push(shift(1, 1, 1, 1, 0, 0), shift(0, 0, 1, 1, 0, 0))
  }
  const answerLabel = formatFootballScore(answer)
  const seen = new Set<string>([answerLabel])
  const out: ScoreShape[] = []
  for (const item of shuffle(candidates, rng)) {
    if (!valid(item)) continue
    const label = formatFootballScore(item)
    if (seen.has(label)) continue
    seen.add(label)
    out.push(item)
    if (out.length === 3) break
  }
  return out
}

function plausibleScores(answer: FootballScorelineCandidate, rng: () => number): QuizChallengeChoice[] {
  return shuffle([answer, ...plausibleScoreShapes(answer, rng)].map(scoreChoice), rng)
}

const BIG_MATCH_STAGE = /\b(final|semi|quarter)/i

/** Finals and knockout rounds, plus every international-tournament match. */
export function isBigFootballMatch(
  candidate: Pick<FootballScorelineCandidate, 'stage' | 'competitionKey'> & { stageKind?: string | null }
): boolean {
  return (
    candidate.stageKind === 'knockout' ||
    candidate.stageKind === 'final' ||
    (candidate.stage != null && BIG_MATCH_STAGE.test(candidate.stage)) ||
    candidate.competitionKey === 'world-cup' ||
    candidate.competitionKey === 'euros'
  )
}

export function buildFootballScorelineQuestions(
  candidates: readonly FootballScorelineCandidate[],
  length: number,
  seed: number,
  scope: 'big' | 'any' = 'big'
): QuizFootballScorelineQuestion[] {
  const rng = seededRng(seed)
  // Big matches first: a random league fixture from 1990 is rarely knowable.
  const big = scope === 'big' ? candidates.filter(isBigFootballMatch) : []
  const pool = big.length >= Math.max(1, length) ? big : candidates
  return balancedDeal(pool, Math.max(1, length), (item) => item.competitionKey, rng).map(
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
        homeImagePath: answer.homeImagePath ?? null,
        awayImagePath: answer.awayImagePath ?? null,
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
  // Typed guesses (2026-10-14): the clubs reveal in career order, two at the
  // start and one more per wrong guess, and any quiz-pack player can be typed,
  // so there are no four names to eliminate from.
  const players = eligible
    .map((item) => ({ key: String(item.personId), label: item.name }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return shuffle(eligible, rng).slice(0, Math.max(1, length)).map((answer, index) => ({
    id: `football-career-${seed}-${index}`,
    kind: 'footballCareerPath' as const,
    prompt: 'Which player followed this senior club career path?',
    choices: [],
    validKeys: [String(answer.personId)],
    answer: { key: String(answer.personId), label: answer.name },
    players,
    spells: shortenedSpells(answer),
    datasetRevision: answer.datasetRevision
  }))
}

export const FOOTBALL_CAREER_START_SPELLS = 2

/** Points for one career: 100 with the opening clubs, 20 less per extra club revealed. */
export function footballCareerGuessPoints(solved: boolean, wrongGuesses: number): number {
  return solved ? Math.max(20, 100 - 20 * wrongGuesses) : 0
}

/** How many wrong guesses a career allows: until every shown club is revealed, then one last try. */
export function footballCareerMaxGuesses(spellCount: number): number {
  return Math.max(1, spellCount - FOOTBALL_CAREER_START_SPELLS + 1)
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
    // Four different champions: a club named twice could not be told apart.
    const entries: FootballChampionCandidate[] = []
    for (const entry of shuffle(group, rng)) {
      if (entries.some((item) => item.teamId === entry.teamId || item.year === entry.year)) continue
      entries.push(entry)
      if (entries.length === 4) break
    }
    if (entries.length < 4) continue
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
