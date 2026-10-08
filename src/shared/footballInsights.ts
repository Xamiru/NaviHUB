import type {
  FootballCompetitionKey,
  FootballMatchSummary,
  FootballSeason,
  FootballSeasonGoals,
  FootballStanding,
  FootballTeamSummary
} from './types'

// Pure views derived from records the Football pages already load.

export type FootballFormResult = 'W' | 'D' | 'L'

function scored(match: FootballMatchSummary): match is FootballMatchSummary & {
  homeScore: number
  awayScore: number
} {
  return match.homeScore != null && match.awayScore != null
}

/** A team's last results in the given matches, oldest first. */
export function footballForm(
  matches: FootballMatchSummary[],
  teamId: number,
  count = 5
): FootballFormResult[] {
  return matches
    .filter((match) => scored(match) && (match.home.id === teamId || match.away.id === teamId))
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate) || a.id - b.id)
    .slice(-count)
    .map((match) => {
      const own = match.home.id === teamId ? match.homeScore! : match.awayScore!
      const other = match.home.id === teamId ? match.awayScore! : match.homeScore!
      return own > other ? 'W' : own === other ? 'D' : 'L'
    })
}

export interface FootballSeasonRecords {
  matches: number
  goals: number
  goalsPerMatch: number | null
  homeWinShare: number | null
  biggestWins: FootballMatchSummary[]
  highestScoring: FootballMatchSummary[]
}

export function footballSeasonRecords(matches: FootballMatchSummary[]): FootballSeasonRecords {
  const played = matches.filter(scored)
  const goals = played.reduce((total, match) => total + match.homeScore! + match.awayScore!, 0)
  const margin = (match: FootballMatchSummary): number => Math.abs(match.homeScore! - match.awayScore!)
  const total = (match: FootballMatchSummary): number => match.homeScore! + match.awayScore!
  const widest = Math.max(0, ...played.map(margin))
  const most = Math.max(0, ...played.map(total))
  return {
    matches: played.length,
    goals,
    goalsPerMatch: played.length ? goals / played.length : null,
    homeWinShare: played.length
      ? played.filter((match) => match.homeScore! > match.awayScore!).length / played.length
      : null,
    biggestWins: widest ? played.filter((match) => margin(match) === widest) : [],
    highestScoring: most ? played.filter((match) => total(match) === most) : []
  }
}

export interface FootballRollEntry {
  team: FootballTeamSummary
  titles: number
  first: string
  last: string
}

/** Champions ranked by titles, then by the most recent title. */
export function footballRollOfHonour(seasons: FootballSeason[]): FootballRollEntry[] {
  const byTeam = new Map<number, FootballRollEntry>()
  for (const season of [...seasons].sort((a, b) => a.key.localeCompare(b.key))) {
    if (!season.champion) continue
    const entry = byTeam.get(season.champion.id)
    if (entry) {
      entry.titles++
      entry.last = season.label
    } else {
      byTeam.set(season.champion.id, {
        team: season.champion,
        titles: 1,
        first: season.label,
        last: season.label
      })
    }
  }
  return [...byTeam.values()].sort((a, b) => b.titles - a.titles || b.last.localeCompare(a.last))
}

/** Tournament editions (`2006`) join the club season that ends that year (`2005/06`). */
export function footballSeasonBucket(label: string): string {
  if (label.includes('/')) return label
  const year = Number(label.match(/\d{4}/)?.[0])
  return year ? `${year - 1}/${String(year).slice(-2)}` : label
}

export interface FootballGoalBucket {
  season: string
  total: number
  parts: Array<{ competitionKey: FootballCompetitionKey; goals: number }>
}

export function footballGoalBuckets(rows: FootballSeasonGoals[]): FootballGoalBucket[] {
  const buckets = new Map<string, FootballGoalBucket>()
  for (const row of rows) {
    const season = footballSeasonBucket(row.seasonLabel)
    const bucket = buckets.get(season) ?? { season, total: 0, parts: [] }
    bucket.total += row.goals
    const part = bucket.parts.find((item) => item.competitionKey === row.competitionKey)
    if (part) part.goals += row.goals
    else bucket.parts.push({ competitionKey: row.competitionKey, goals: row.goals })
    buckets.set(season, bucket)
  }
  return [...buckets.values()].sort((a, b) => a.season.localeCompare(b.season))
}

const DOMESTIC_LEAGUES: ReadonlySet<FootballCompetitionKey> = new Set([
  'premier-league',
  'la-liga',
  'serie-a',
  'bundesliga'
])

/** Domestic league finishes, oldest first, for the league-finish chart. */
export function footballLeagueFinishes(records: FootballStanding[]): FootballStanding[] {
  return records
    .filter(
      (row) => row.competitionKey && DOMESTIC_LEAGUES.has(row.competitionKey) && row.position != null
    )
    .sort((a, b) => (a.seasonLabel ?? '').localeCompare(b.seasonLabel ?? ''))
}

export interface FootballPitchSpot<T> {
  entry: T
  /** 0-100 across the pitch length; the home side defends x=0. */
  x: number
  /** 0-100 across the pitch width. */
  y: number
}

const PITCH_LINES: Array<[RegExp, number]> = [
  [/goal ?keeper|^gk?$/i, 6],
  [/defensive midfield|^dm/i, 25],
  [/attacking midfield|^am|^cam$/i, 38],
  [/\bback\b|defen|^d$|^(cb|lb|rb|lwb|rwb)$/i, 17],
  [/midfield|^m$|^(cm|lm|rm)$/i, 31],
  [/forward|striker|wing|^f$|^(st|cf|lw|rw|ss)$/i, 45]
]

function lateral(position: string): number {
  const text = position.toLowerCase()
  const left = /\bleft\b|^l[a-z]*$/.test(text) && !/\bcent/.test(text)
  const right = /\bright\b|^r[a-z]*$/.test(text) && !/\bcent/.test(text)
  if (/left cent/.test(text)) return -0.5
  if (/right cent/.test(text)) return 0.5
  return left ? -1 : right ? 1 : 0
}

/**
 * Places starters on a pitch from their position labels (StatsBomb names, Wyscout roles or
 * single-letter codes). Returns null when any starter has no recognisable position.
 */
export function footballPitchLayout<T extends { position: string | null }>(
  starters: T[],
  side: 'home' | 'away'
): FootballPitchSpot<T>[] | null {
  if (!starters.length) return null
  const placed: Array<{ entry: T; depth: number; lateral: number }> = []
  for (const entry of starters) {
    const position = entry.position?.trim()
    const line = position ? PITCH_LINES.find(([pattern]) => pattern.test(position)) : undefined
    if (!position || !line) return null
    placed.push({ entry, depth: line[1], lateral: lateral(position) })
  }
  const byLine = new Map<number, typeof placed>()
  for (const item of placed) byLine.set(item.depth, [...(byLine.get(item.depth) ?? []), item])
  const spots: FootballPitchSpot<T>[] = []
  for (const [depth, items] of byLine) {
    const ordered = [...items].sort((a, b) => a.lateral - b.lateral)
    ordered.forEach((item, index) => {
      const across = ((index + 1) / (ordered.length + 1)) * 100
      spots.push({
        entry: item.entry,
        x: side === 'home' ? depth : 100 - depth,
        y: side === 'home' ? across : 100 - across
      })
    })
  }
  return spots
}

// ---- knockout bracket ----

export interface FootballBracketTie {
  teams: [FootballTeamSummary, FootballTeamSummary]
  /** Both legs of a two-legged tie, or a match and its replays, oldest first. */
  matches: FootballMatchSummary[]
  /** Goals over the whole tie including extra time; null until every match has a score. */
  goals: [number, number] | null
  /** The shoot-out of the deciding match, in `teams` order. */
  penalties: [number, number] | null
  winnerId: number | null
}

export interface FootballBracketRound {
  label: string
  ties: FootballBracketTie[]
}

const KNOCKOUT_STAGE = /final|semi|quarter|round of \d+|last \d+|eighth|^(r16|r32|qf|sf)$|^round ?\d+$/i
const NOT_KNOCKOUT = /group|league|matchday|qualif|prelim|play-?off|third|3rd|inter|^q-/i
const NOT_FINAL = /semi|quarter|eighth|\d\s*\/\s*\d|\b\d+(st|nd|rd|th)\b/i

function isKnockoutStage(name: string | null): boolean {
  return !!name && KNOCKOUT_STAGE.test(name.trim()) && !NOT_KNOCKOUT.test(name)
}

function isFinalStage(name: string | null): boolean {
  return isKnockoutStage(name) && /final/i.test(name!) && !NOT_FINAL.test(name!)
}

/**
 * Knockout teams in each finals tournament whose results carry no round names (international
 * results list only the tournament). Editions with a final group round or a lone final have no
 * entry and keep the plain results list.
 */
const INTERNATIONAL_KNOCKOUT: Partial<Record<FootballCompetitionKey, Record<string, number>>> = {
  'world-cup': {
    1930: 4, 1934: 16, 1938: 16, 1954: 8, 1958: 8, 1962: 8, 1966: 8, 1970: 8, 1982: 4,
    1986: 16, 1990: 16, 1994: 16, 1998: 16, 2002: 16, 2006: 16, 2010: 16, 2014: 16, 2018: 16,
    2022: 16, 2026: 32
  },
  euros: {
    1960: 4, 1964: 4, 1968: 4, 1972: 4, 1976: 4, 1984: 4, 1988: 4, 1992: 4, 1996: 8, 2000: 8,
    2004: 8, 2008: 8, 2012: 8, 2016: 16, 2020: 16, 2021: 16, 2024: 16
  }
}

const MAX_BRACKET_ROUNDS = 4

function bracketRoundLabel(ties: number): string {
  if (ties === 1) return 'Final'
  if (ties === 2) return 'Semi-finals'
  if (ties === 4) return 'Quarter-finals'
  return `Round of ${ties * 2}`
}

function matchGoals(match: FootballMatchSummary, teamId: number): number | null {
  const home = match.homeExtraTime ?? match.homeScore
  const away = match.awayExtraTime ?? match.awayScore
  if (home == null || away == null) return null
  return match.home.id === teamId ? home : away
}

function opponentOf(match: FootballMatchSummary, teamId: number): FootballTeamSummary {
  return match.home.id === teamId ? match.away : match.home
}

function buildTie(matches: FootballMatchSummary[]): Omit<FootballBracketTie, 'winnerId'> {
  const first = matches[0]
  const teams: [FootballTeamSummary, FootballTeamSummary] = [first.home, first.away]
  let goals: [number, number] | null = [0, 0]
  for (const match of matches) {
    const a = matchGoals(match, teams[0].id)
    const b = matchGoals(match, teams[1].id)
    if (a == null || b == null) goals = null
    else if (goals) goals = [goals[0] + a, goals[1] + b]
  }
  const last = matches[matches.length - 1]
  const penalties = last.homePenalties != null && last.awayPenalties != null
    ? (last.home.id === teams[0].id
        ? [last.homePenalties, last.awayPenalties] as [number, number]
        : [last.awayPenalties, last.homePenalties] as [number, number])
    : null
  return { teams, matches, goals, penalties }
}

/** The winner a tie's own scores show: aggregate goals, then the shoot-out. */
function decidedWinner(tie: Omit<FootballBracketTie, 'winnerId'>): number | null {
  if (!tie.goals) return null
  if (tie.goals[0] !== tie.goals[1]) return tie.teams[tie.goals[0] > tie.goals[1] ? 0 : 1].id
  if (tie.penalties && tie.penalties[0] !== tie.penalties[1]) {
    return tie.teams[tie.penalties[0] > tie.penalties[1] ? 0 : 1].id
  }
  return null
}

function chronological(matches: FootballMatchSummary[]): FootballMatchSummary[] {
  return [...matches].sort((a, b) =>
    a.matchDate.localeCompare(b.matchDate) || (a.kickoffAt ?? '').localeCompare(b.kickoffAt ?? '') || a.id - b.id
  )
}

/**
 * A cup season's knockout rounds, earliest first, read back from the final: each finalist's
 * previous tie is its semi-final, and so on. Rounds come from knockout stage names where the
 * source supplies them; otherwise from the edition's known knockout size, accepting a tie only
 * when its scores do not show the advancing team losing. The tree stops at the first round that
 * cannot be completed, and null means no bracket can be drawn.
 */
export function footballKnockoutBracket(
  matches: FootballMatchSummary[],
  competitionKey: FootballCompetitionKey,
  seasonKey: string,
  championId: number | null
): FootballBracketRound[] | null {
  const staged = chronological(matches.filter((match) => isKnockoutStage(match.stageName)))
  const finals = staged.filter((match) => isFinalStage(match.stageName))
  const knockoutTeams = INTERNATIONAL_KNOCKOUT[competitionKey]?.[seasonKey]
  let candidates: FootballMatchSummary[]
  let depth: number
  let inferred = false
  if (finals.length) {
    candidates = staged
    depth = MAX_BRACKET_ROUNDS
  } else if (knockoutTeams) {
    candidates = chronological(matches.filter((match) => match.status !== 'scheduled'))
    depth = Math.min(MAX_BRACKET_ROUNDS, Math.round(Math.log2(knockoutTeams)))
    inferred = true
  } else {
    return null
  }
  if (!candidates.length || depth < 1) return null

  // The tie a team played last among candidates[0, end): that match and the earlier
  // consecutive meetings with the same opponent (second legs, replays).
  const tieEndingBefore = (teamId: number, end: number) => {
    const own = candidates.slice(0, end).filter((match) => match.home.id === teamId || match.away.id === teamId)
    if (!own.length) return null
    const last = own[own.length - 1]
    const opponent = opponentOf(last, teamId).id
    const legs = [last]
    for (let index = own.length - 2; index >= 0 && opponentOf(own[index], teamId).id === opponent; index--) {
      legs.unshift(own[index])
    }
    return buildTie(legs)
  }
  const startOf = (date: string) => {
    const index = candidates.findIndex((match) => match.matchDate >= date)
    return index < 0 ? candidates.length : index
  }

  const advanced = (match: FootballMatchSummary) => [match.home.id, match.away.id].every((teamId) => {
    const previous = tieEndingBefore(teamId, startOf(match.matchDate))
    const winner = previous && decidedWinner(previous)
    return !!previous && (winner == null || winner === teamId)
  })
  let root = finals.length ? finals[finals.length - 1] : candidates[candidates.length - 1]
  if (inferred) {
    // A third-place match can share the final's day: the final is the one whose two teams
    // both came through their previous tie.
    const lastDay = candidates.filter((match) => match.matchDate === root.matchDate)
    const final = lastDay.length > 1 ? lastDay.filter(advanced) : lastDay
    if (final.length !== 1) return null
    root = final[0]
  }
  const rootTie = tieEndingBefore(root.home.id, candidates.indexOf(root) + 1)!
  if (inferred && !rootTie.goals) return null
  const rootWinner = championId != null && rootTie.teams.some((team) => team.id === championId)
    ? championId
    : decidedWinner(rootTie)
  const rounds: FootballBracketTie[][] = [[{ ...rootTie, winnerId: rootWinner }]]
  for (let level = 1; level < depth; level++) {
    const next: FootballBracketTie[] = []
    let complete = true
    for (const parent of rounds[0]) {
      for (const team of parent.teams) {
        const tie = tieEndingBefore(team.id, startOf(parent.matches[0].matchDate))
        if (!tie) {
          complete = false
          break
        }
        if (inferred) {
          const winner = decidedWinner(tie)
          if (!tie.goals || (winner != null && winner !== team.id)) {
            complete = false
            break
          }
        }
        next.push({ ...tie, winnerId: team.id })
      }
      if (!complete) break
    }
    const ids = next.flatMap((tie) => tie.teams.map((team) => team.id))
    if (!complete || new Set(ids).size !== ids.length) break
    rounds.unshift(next)
  }
  return rounds.map((ties) => ({ label: bracketRoundLabel(ties.length), ties }))
}

// ---- title race ----

export interface FootballRaceLine {
  team: FootballTeamSummary
  /** Points after each of the team's games, in date order. */
  points: number[]
}

/**
 * Running points for the clubs that decided a league title: the final top four plus any club
 * that led after ten or more games, at most six, in final table order. Deductions are not
 * applied, so a line can end above the table's total.
 */
export function footballTitleRace(
  matches: FootballMatchSummary[],
  standings: FootballStanding[],
  pointsForWin: number,
  limit = 6
): FootballRaceLine[] {
  const running = new Map<number, number[]>()
  for (const match of chronological(matches.filter(scored))) {
    if (match.status === 'scheduled' || match.homeScore == null || match.awayScore == null) continue
    const home = match.homeScore > match.awayScore ? pointsForWin : match.homeScore === match.awayScore ? 1 : 0
    const away = match.awayScore > match.homeScore ? pointsForWin : match.homeScore === match.awayScore ? 1 : 0
    for (const [id, gained] of [[match.home.id, home], [match.away.id, away]]) {
      const line = running.get(id) ?? []
      line.push((line[line.length - 1] ?? 0) + gained)
      running.set(id, line)
    }
  }
  const order = standings.filter((row) => running.has(row.team.id))
  const rank = new Map(order.map((row, index) => [row.team.id, index]))
  const chosen = new Set(order.slice(0, 4).map((row) => row.team.id))
  const games = Math.max(0, ...[...running.values()].map((line) => line.length))
  for (let game = 10; game <= games; game++) {
    let leader: number | null = null
    for (const row of order) {
      const value = running.get(row.team.id)![game - 1]
      if (value == null) continue
      if (leader == null || value > running.get(leader)![game - 1]) leader = row.team.id
    }
    if (leader != null) chosen.add(leader)
  }
  const lines = order
    .filter((row) => chosen.has(row.team.id))
    .sort((a, b) => rank.get(a.team.id)! - rank.get(b.team.id)!)
    .slice(0, limit)
    .map((row) => ({ team: row.team, points: running.get(row.team.id)! }))
  return lines.length >= 2 && games >= 2 ? lines : []
}
