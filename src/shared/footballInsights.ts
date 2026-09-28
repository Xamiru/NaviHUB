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
