// Football Wordle, Name the XI and Transfer Higher or Lower (2026-10-14).
// Pure builders over facts the repository has already filtered for
// conflicts and coverage; every deal is seeded.

import { normalizeFootballName } from './football'
import { isBigFootballMatch } from './footballQuiz'
import { seededRng } from './quizCore'
import { shuffle } from './shuffle'
import type {
  FootballCompetitionKey,
  FootballWordlePlayer,
  QuizFootballLineupQuestion,
  QuizFootballLineupSlot,
  QuizFootballTransferFact,
  QuizFootballTransferQuestion,
  QuizFootballWordleQuestion
} from './types'

// ---------------------------------------------------------------- Wordle --

export const FOOTBALL_WORDLE_MAX_GUESSES = 8
/** Mystery players come from the most-capped players in the archive. */
export const FOOTBALL_WORDLE_TARGETS = 300

export type FootballPositionGroup = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'

/** The line a detailed position belongs to; midfield is tested first ("Defensive Midfield"). */
export function footballPositionGroup(position: string | null | undefined): FootballPositionGroup | null {
  if (!position) return null
  if (/goal/i.test(position)) return 'Goalkeeper'
  if (/midfield/i.test(position)) return 'Midfielder'
  if (/back|defen|sweeper/i.test(position)) return 'Defender'
  if (/wing|forward|striker|attack/i.test(position)) return 'Forward'
  return null
}

export type FootballNumberMatch = { match: 'exact' | 'near' | 'none' | 'unknown'; direction: 'higher' | 'lower' | null }

export interface FootballWordleFeedback {
  nationality: 'exact' | 'none' | 'unknown'
  position: 'exact' | 'near' | 'none' | 'unknown'
  club: 'exact' | 'none' | 'unknown'
  league: 'exact' | 'none' | 'unknown'
  birthYear: FootballNumberMatch
  height: FootballNumberMatch
  shirt: FootballNumberMatch
}

function sameText(a: string | null, b: string | null): 'exact' | 'none' | 'unknown' {
  if (a == null || b == null) return 'unknown'
  return normalizeFootballName(a) === normalizeFootballName(b) ? 'exact' : 'none'
}

/** Higher/lower toward the target: 'higher' means the target's number is larger. */
function compareNumber(target: number | null, guess: number | null, near: number): FootballNumberMatch {
  if (target == null || guess == null) return { match: 'unknown', direction: null }
  if (target === guess) return { match: 'exact', direction: null }
  return {
    match: Math.abs(target - guess) <= near ? 'near' : 'none',
    direction: target > guess ? 'higher' : 'lower'
  }
}

export function footballWordleFeedback(target: FootballWordlePlayer, guess: FootballWordlePlayer): FootballWordleFeedback {
  const targetGroup = footballPositionGroup(target.position)
  const guessGroup = footballPositionGroup(guess.position)
  return {
    nationality: sameText(target.nationality, guess.nationality),
    position:
      target.position == null || guess.position == null
        ? 'unknown'
        : normalizeFootballName(target.position) === normalizeFootballName(guess.position)
          ? 'exact'
          : targetGroup != null && targetGroup === guessGroup
            ? 'near'
            : 'none',
    club: target.clubKey == null || guess.clubKey == null ? 'unknown' : target.clubKey === guess.clubKey ? 'exact' : 'none',
    league: sameText(target.league, guess.league),
    birthYear: compareNumber(target.birthYear, guess.birthYear, 2),
    height: compareNumber(target.heightCm, guess.heightCm, 3),
    shirt: compareNumber(target.shirt, guess.shirt, 2)
  }
}

export function footballWordleScore(solved: boolean, guesses: number): number {
  return solved ? Math.max(100, 1000 - Math.max(0, guesses - 1) * 100) : 0
}

/** `players` arrive most-capped first; the target is one of the best known. */
export function buildFootballWordleQuestion(
  players: readonly FootballWordlePlayer[],
  seed: number,
  datasetRevision: string
): QuizFootballWordleQuestion | null {
  if (players.length < FOOTBALL_WORDLE_MAX_GUESSES) return null
  const rng = seededRng(seed)
  const targets = players.slice(0, FOOTBALL_WORDLE_TARGETS)
  const target = targets[Math.floor(rng() * targets.length)]
  return {
    id: `football-wordle-${seed}`,
    kind: 'footballWordle',
    prompt: 'Find the mystery player from the attribute feedback.',
    choices: [],
    validKeys: [target.key],
    targetKey: target.key,
    players: [...players].sort((a, b) => a.label.localeCompare(b.label)),
    maxGuesses: FOOTBALL_WORDLE_MAX_GUESSES,
    datasetRevision
  }
}

// ----------------------------------------------------------- Name the XI --

export interface FootballLineupMatchCandidate {
  matchId: number
  competitionKey: FootballCompetitionKey
  competitionName: string
  stage: string | null
  stageKind?: string | null
  matchDate: string
  homeTeam: string
  awayTeam: string
  homeImagePath: string | null
  awayImagePath: string | null
  homeFormation: string | null
  awayFormation: string | null
  scoreLabel: string
  datasetRevision: string
}

export interface FootballLineupRow {
  side: 'home' | 'away'
  personId: number
  name: string
  aliases: string[]
  photoPath: string | null
  shirt: number | null
  position: string | null
  starter: boolean
}

/**
 * Pitch line for a lineup position, keeper first: 0 keeper, 1 defence,
 * 2 holding midfield, 3 midfield, 4 attacking midfield, 5 attack.
 */
export function footballLineupLine(position: string | null): number {
  if (!position) return 3
  if (/goal/i.test(position)) return 0
  if (/defensive midfield/i.test(position)) return 2
  if (/attacking midfield|second striker|playmaker/i.test(position)) return 4
  if (/midfield/i.test(position)) return 3
  if (/back|defen|sweeper/i.test(position)) return 1
  if (/wing|forward|striker|attack/i.test(position)) return 5
  return 3
}

function sideOrder(position: string | null): number {
  if (!position) return 1
  if (/left/i.test(position)) return 0
  if (/right/i.test(position)) return 2
  return 1
}

/** Order candidate matches: finals and knockouts first, each tier shuffled. */
export function orderFootballLineupMatches<
  T extends { stage: string | null; stageKind?: string | null; competitionKey: FootballCompetitionKey }
>(matches: readonly T[], seed: number): T[] {
  const rng = seededRng(seed)
  const big = (match: T) => isBigFootballMatch(match)
  return [...shuffle(matches.filter(big), rng), ...shuffle(matches.filter((match) => !big(match)), rng)]
}

export function buildFootballLineupQuestion(
  match: FootballLineupMatchCandidate,
  rows: readonly FootballLineupRow[],
  seed: number
): QuizFootballLineupQuestion | null {
  const rng = seededRng(`${seed}:${match.matchId}`)
  const sides = shuffle(['home', 'away'] as const, rng)
  for (const side of sides) {
    const starters = rows.filter((row) => row.side === side && row.starter)
    if (starters.length !== 11) continue
    const slots: QuizFootballLineupSlot[] = starters
      .map((row) => ({
        key: String(row.personId),
        name: row.name,
        aliases: row.aliases,
        photoPath: row.photoPath,
        shirt: row.shirt,
        position: row.position,
        line: footballLineupLine(row.position)
      }))
      .sort((a, b) => a.line - b.line || sideOrder(a.position) - sideOrder(b.position) || (a.shirt ?? 99) - (b.shirt ?? 99))
    if (slots.filter((slot) => slot.line === 0).length !== 1) continue
    return {
      id: `football-lineup-${seed}-${match.matchId}`,
      kind: 'footballLineup',
      prompt: `Name the ${side === 'home' ? match.homeTeam : match.awayTeam} starting XI.`,
      choices: [],
      validKeys: slots.map((slot) => slot.key),
      matchId: match.matchId,
      competitionName: match.competitionName,
      stage: match.stage,
      matchDate: match.matchDate,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeImagePath: match.homeImagePath,
      awayImagePath: match.awayImagePath,
      scoreLabel: match.scoreLabel,
      side,
      formation: side === 'home' ? match.homeFormation : match.awayFormation,
      slots,
      datasetRevision: match.datasetRevision
    }
  }
  return null
}

/**
 * The slot a typed name fills: the full name or an alias, or the surname when
 * exactly one open slot has it. Already-named slots never match again.
 */
export function matchFootballLineupName(
  slots: readonly QuizFootballLineupSlot[],
  typed: string,
  namedKeys: readonly string[]
): QuizFootballLineupSlot | null {
  const needle = normalizeFootballName(typed)
  if (!needle) return null
  const open = slots.filter((slot) => !namedKeys.includes(slot.key))
  const full = open.find((slot) =>
    [slot.name, ...slot.aliases].some((name) => normalizeFootballName(name) === needle)
  )
  if (full) return full
  const bySurname = open.filter((slot) => {
    const words = normalizeFootballName(slot.name).split(' ')
    return words[words.length - 1] === needle
  })
  return bySurname.length === 1 ? bySurname[0] : null
}

export const FOOTBALL_LINEUP_POINTS_PER_PLAYER = 100

// ------------------------------------------------------------ Grid duel --

const DUEL_LINES = [
  ['0-0', '0-1', '0-2'], ['1-0', '1-1', '1-2'], ['2-0', '2-1', '2-2'],
  ['0-0', '1-0', '2-0'], ['0-1', '1-1', '2-1'], ['0-2', '1-2', '2-2'],
  ['0-0', '1-1', '2-2'], ['0-2', '1-1', '2-0']
]

/** The Player Grid duel winner: three in a row, else the most cells once the board is full. */
export function footballDuelWinner(owners: Record<string, 1 | 2>, filledCount: number): 1 | 2 | 'draw' | null {
  for (const line of DUEL_LINES) {
    const first = owners[line[0]]
    if (first && line.every((key) => owners[key] === first)) return first
  }
  if (filledCount < 9) return null
  const one = Object.values(owners).filter((owner) => owner === 1).length
  const two = Object.values(owners).filter((owner) => owner === 2).length
  return one === two ? 'draw' : one > two ? 1 : 2
}

// ------------------------------------------------ Transfer Higher or Lower --

/** Only fees of at least this much (euros): smaller moves are rarely known. */
export const FOOTBALL_TRANSFER_MIN_FEE = 5_000_000
export const FOOTBALL_TRANSFER_CHAIN = 60

/**
 * A chain of comparisons: each challenger becomes the next reference, as in
 * the library's Higher or Lower. Equal fees and repeats of the reference are
 * skipped.
 */
export function buildFootballTransferChain(
  facts: readonly QuizFootballTransferFact[],
  length: number,
  seed: number,
  datasetRevision: string
): QuizFootballTransferQuestion[] {
  if (facts.length < 2) return []
  const rng = seededRng(seed)
  let deck = shuffle(facts, rng)
  let reference = deck.pop()!
  const out: QuizFootballTransferQuestion[] = []
  const recent: string[] = [reference.key]
  let guard = length * 20
  while (out.length < length && guard-- > 0) {
    if (deck.length === 0) deck = shuffle(facts.filter((fact) => !recent.includes(fact.key)), rng)
    const challenger = deck.pop()
    if (!challenger || challenger.key === reference.key || challenger.fee === reference.fee) continue
    if (challenger.personName === reference.personName) continue
    out.push({
      id: `football-transfer-${seed}-${out.length}`,
      kind: 'footballTransfer',
      prompt: `Did ${challenger.personName}'s move cost more or less than ${reference.personName}'s?`,
      choices: [
        { key: 'higher', label: 'More' },
        { key: 'lower', label: 'Less' }
      ],
      validKeys: [challenger.fee > reference.fee ? 'higher' : 'lower'],
      reference,
      challenger,
      datasetRevision
    })
    recent.push(challenger.key)
    if (recent.length > 8) recent.shift()
    reference = challenger
  }
  return out
}

/** "€80m", "€12.5m", "€950k". */
export function formatTransferFee(fee: number): string {
  if (fee >= 1_000_000) {
    const millions = fee / 1_000_000
    return `€${Number.isInteger(millions) ? millions : millions.toFixed(1)}m`
  }
  return `€${Math.round(fee / 1000)}k`
}
