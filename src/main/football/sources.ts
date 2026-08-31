import { createHash } from 'crypto'
import { normalizeFootballName } from '@shared/football'
import type { FootballCompetitionKey, FootballCoverageState, FootballSource } from '@shared/types'

export const FOOTBALL_ARCHIVE_LIMIT = 32 * 1024 * 1024
export const FOOTBALL_DEEP_ARCHIVE_LIMIT = 96 * 1024 * 1024

export interface SourceTeam {
  sourceId: string
  name: string
  country: string | null
  national: boolean
}

export interface SourceGoal {
  team: 'home' | 'away'
  playerName: string | null
  playerSourceId?: string | null
  minute: number | null
  extraMinute: number | null
  ownGoal: boolean
  penalty: boolean
}

export interface SourceLineup {
  teamSourceId: string
  personSourceId: string
  playerName: string
  role: 'player' | 'manager'
  starter: boolean
  shirt: number | null
  position: string | null
  captain: boolean
  sortOrder: number
}

export interface StatsBombCompetitionSeason {
  competitionId: number
  seasonId: number
  competitionName: string
  seasonName: string
  countryName: string
  gender: string
}

export interface WyscoutPack {
  matches: SourceMatch[]
  lineups: Map<string, SourceLineup[]>
}

export interface SourceMatch {
  sourceId: string
  competitionKey: FootballCompetitionKey
  seasonKey: string
  seasonLabel: string
  date: string
  home: SourceTeam
  away: SourceTeam
  stage: string | null
  round: string | null
  status: 'scheduled' | 'finished' | 'abandoned' | 'awarded'
  homeScore: number | null
  awayScore: number | null
  homeHalfTime: number | null
  awayHalfTime: number | null
  homeExtraTime: number | null
  awayExtraTime: number | null
  homePenalties: number | null
  awayPenalties: number | null
  goals: SourceGoal[] | null
  source: FootballSource
  sourceUrl: string
  rawFingerprint: string
}

export interface SourceSlice {
  source: FootballSource
  competitionKey: FootballCompetitionKey
  seasonKey: string
  revision: string | null
  etag?: string | null
  checksum?: string | null
  rawFingerprint?: string | null
  coverage: Record<string, FootballCoverageState>
  matches: SourceMatch[]
}

export interface FootballLedgerRow {
  teamId: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export function footballPointsForWin(competitionKey: FootballCompetitionKey, seasonKey: string): number {
  const start = Number(seasonKey.match(/\d{4}/)?.[0] ?? 0)
  if (competitionKey === 'premier-league') return start >= 1981 ? 3 : 2
  if (competitionKey === 'la-liga') return start >= 1995 ? 3 : 2
  if (competitionKey === 'serie-a') return start >= 1994 ? 3 : 2
  if (competitionKey === 'bundesliga') return start >= 1995 ? 3 : 2
  return 3
}

export function buildFootballLedger(
  matches: Array<{ homeTeamId: number; awayTeamId: number; homeScore: number; awayScore: number }>,
  pointsForWin: number
): FootballLedgerRow[] {
  const rows = new Map<number, FootballLedgerRow>()
  const rowFor = (teamId: number): FootballLedgerRow => {
    const existing = rows.get(teamId)
    if (existing) return existing
    const created = { teamId, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    rows.set(teamId, created)
    return created
  }
  for (const match of matches) {
    const home = rowFor(match.homeTeamId)
    const away = rowFor(match.awayTeamId)
    home.played++
    away.played++
    home.goalsFor += match.homeScore
    home.goalsAgainst += match.awayScore
    away.goalsFor += match.awayScore
    away.goalsAgainst += match.homeScore
    if (match.homeScore === match.awayScore) {
      home.drawn++
      away.drawn++
      home.points++
      away.points++
    } else if (match.homeScore > match.awayScore) {
      home.won++
      away.lost++
      home.points += pointsForWin
    } else {
      away.won++
      home.lost++
      away.points += pointsForWin
    }
  }
  for (const row of rows.values()) row.goalDifference = row.goalsFor - row.goalsAgainst
  return [...rows.values()]
}

export function assertBoundedArchive(bytes: number, limit = FOOTBALL_ARCHIVE_LIMIT): void {
  if (!Number.isFinite(bytes) || bytes < 0) throw new Error('Invalid source archive size')
  if (bytes > limit) throw new Error(`Football source archive exceeds ${Math.floor(limit / 1024 / 1024)} MB`)
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (char === '"') quoted = false
      else field += char
      continue
    }
    if (char === '"') quoted = true
    else if (char === ',') {
      row.push(field.trim())
      field = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++
      row.push(field.trim())
      field = ''
      if (row.some((value) => value.length)) rows.push(row)
      row = []
    } else field += char
  }
  if (quoted) throw new Error('Unclosed quoted field in Football CSV')
  if (field.length || row.length) {
    row.push(field.trim())
    if (row.some((value) => value.length)) rows.push(row)
  }
  return rows
}

function headerIndex(headers: string[], aliases: string[], required = true): number {
  const normalized = headers.map((header) => header.trim().toLocaleLowerCase('en'))
  const index = aliases.map((alias) => normalized.indexOf(alias)).find((value) => value >= 0) ?? -1
  if (required && index < 0) throw new Error(`Football source header missing: ${aliases.join(' / ')}`)
  return index
}

function cell(row: string[], index: number): string | null {
  const value = index < 0 ? '' : row[index]?.trim()
  return value ? value : null
}

function integer(value: string | null): number | null {
  if (value == null || !/^-?\d+$/.test(value)) return null
  return Number(value)
}

export function isoDate(value: string): string {
  const trimmed = value.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
  const slash = trimmed.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{2}|\d{4})$/)
  if (slash) {
    const year = slash[3].length === 2 ? Number(slash[3]) + (Number(slash[3]) >= 50 ? 1900 : 2000) : Number(slash[3])
    return `${year}-${slash[2].padStart(2, '0')}-${slash[1].padStart(2, '0')}`
  }
  const parsed = new Date(trimmed)
  if (!Number.isFinite(parsed.getTime())) throw new Error(`Invalid Football match date: ${value}`)
  return parsed.toISOString().slice(0, 10)
}

function seasonLabel(value: string): string {
  const trimmed = value.trim()
  if (/^\d{4}$/.test(trimmed)) return trimmed
  const compact = trimmed.match(/^(\d{4})[-/]?(\d{2}|\d{4})$/)
  if (!compact) return trimmed
  const end = compact[2].length === 2 ? compact[2] : compact[2].slice(2)
  return `${compact[1]}/${end}`
}

export function footballSeasonKey(
  value: string,
  competitionKey: FootballCompetitionKey
): string {
  const normalized = seasonLabel(value)
  if (/^\d{4}$/.test(normalized) && competitionKey !== 'world-cup' && competitionKey !== 'euros') {
    const start = Number(normalized)
    return `${normalized}/${String(start + 1).slice(-2)}`
  }
  return normalized
}

function resultFromCells(
  ft: string | null,
  home: string | null,
  away: string | null
): { home: number | null; away: number | null; status: SourceMatch['status'] } {
  const separateHome = integer(home)
  const separateAway = integer(away)
  if (separateHome != null && separateAway != null) {
    return { home: separateHome, away: separateAway, status: 'finished' }
  }
  const score = ft?.match(/(-?\d+)\s*[-:–]\s*(-?\d+)/)
  if (score) return { home: Number(score[1]), away: Number(score[2]), status: 'finished' }
  const lowered = ft?.toLocaleLowerCase('en') ?? ''
  if (/abandon|cancel/.test(lowered)) return { home: null, away: null, status: 'abandoned' }
  if (/award|walkover|w\/o/.test(lowered)) return { home: null, away: null, status: 'awarded' }
  return { home: null, away: null, status: 'scheduled' }
}

function scoreFromCells(
  combined: string | null,
  home: string | null = null,
  away: string | null = null
): [number, number] | null {
  const separateHome = integer(home)
  const separateAway = integer(away)
  if (separateHome != null && separateAway != null) return [separateHome, separateAway]
  const score = combined?.match(/(\d+)\s*[-:\u2013]\s*(\d+)/)
  return score ? [Number(score[1]), Number(score[2])] : null
}

export function parseEngsoccerCsv(input: {
  text: string
  competitionKey: FootballCompetitionKey
  sourceUrl: string
  fingerprint: string
  tierOneOnly?: boolean
}): SourceMatch[] {
  assertBoundedArchive(Buffer.byteLength(input.text))
  const rows = parseCsv(input.text)
  if (rows.length < 2) return []
  const headers = rows[0]
  const dateCol = headerIndex(headers, ['date'])
  const seasonCol = headerIndex(headers, ['season'])
  const homeCol = headerIndex(headers, ['home', 'hometeam'])
  const awayCol = headerIndex(headers, ['visitor', 'away', 'awayteam'])
  const ftCol = headerIndex(headers, ['ft', 'ftr', 'score'], false)
  const hgCol = headerIndex(headers, ['hgoal', 'fthg', 'home_score'], false)
  const agCol = headerIndex(headers, ['vgoal', 'ftag', 'away_score'], false)
  const htCol = headerIndex(headers, ['ht'], false)
  const hthgCol = headerIndex(headers, ['hthg', 'home_halftime'], false)
  const htagCol = headerIndex(headers, ['htag', 'away_halftime'], false)
  const aetCol = headerIndex(headers, ['aet'], false)
  const aetHomeCol = headerIndex(headers, ['tothgoal', 'aethgoal', 'home_extra_time'], false)
  const aetAwayCol = headerIndex(headers, ['totvgoal', 'aetvgoal', 'away_extra_time'], false)
  const pensCol = headerIndex(headers, ['pens', 'penalties'], false)
  const penHomeCol = headerIndex(headers, ['home_penalties', 'hpen'], false)
  const penAwayCol = headerIndex(headers, ['away_penalties', 'vpen'], false)
  const tierCol = headerIndex(headers, ['tier'], false)
  const roundCol = headerIndex(headers, ['round', 'matchday'], false)
  return rows.slice(1).flatMap((row, index) => {
    if (input.tierOneOnly && tierCol >= 0 && integer(cell(row, tierCol)) !== 1) return []
    const dateRaw = cell(row, dateCol)
    const seasonRaw = cell(row, seasonCol)
    const homeName = cell(row, homeCol)
    const awayName = cell(row, awayCol)
    if (!dateRaw || !seasonRaw || !homeName || !awayName) return []
    const score = resultFromCells(cell(row, ftCol), cell(row, hgCol), cell(row, agCol))
    const halfTime = scoreFromCells(cell(row, htCol), cell(row, hthgCol), cell(row, htagCol))
    const aetValue = cell(row, aetCol)
    const hasExtraTime = aetValue != null && !/^n\/?a|false|0$/i.test(aetValue)
    const extraTime = hasExtraTime
      ? scoreFromCells(aetValue, cell(row, aetHomeCol), cell(row, aetAwayCol))
      : null
    const penalties = scoreFromCells(
      cell(row, pensCol),
      cell(row, penHomeCol),
      cell(row, penAwayCol)
    )
    const seasonKey = footballSeasonKey(seasonRaw, input.competitionKey)
    const date = isoDate(dateRaw)
    return [{
      sourceId: `${seasonKey}:${date}:${normalizeFootballName(homeName)}:${normalizeFootballName(awayName)}`,
      competitionKey: input.competitionKey,
      seasonKey,
      seasonLabel: seasonKey,
      date,
      home: { sourceId: normalizeFootballName(homeName), name: homeName, country: null, national: false },
      away: { sourceId: normalizeFootballName(awayName), name: awayName, country: null, national: false },
      stage: input.competitionKey === 'champions-league' ? cell(row, roundCol) : null,
      round: cell(row, roundCol),
      status: score.status,
      homeScore: extraTime?.[0] ?? score.home,
      awayScore: extraTime?.[1] ?? score.away,
      homeHalfTime: halfTime?.[0] ?? null,
      awayHalfTime: halfTime?.[1] ?? null,
      homeExtraTime: extraTime?.[0] ?? null,
      awayExtraTime: extraTime?.[1] ?? null,
      homePenalties: penalties?.[0] ?? null,
      awayPenalties: penalties?.[1] ?? null,
      goals: null,
      source: 'engsoccerdata',
      sourceUrl: input.sourceUrl,
      rawFingerprint: `${input.fingerprint}:${index + 2}`
    }]
  })
}

type Json = null | boolean | number | string | Json[] | { [key: string]: Json }

function object(value: Json | undefined): { [key: string]: Json } | null {
  return value != null && typeof value === 'object' && !Array.isArray(value)
    ? value as { [key: string]: Json }
    : null
}

function scorePair(value: Json | undefined): [number, number] | null {
  if (Array.isArray(value) && value.length >= 2) {
    const home = Number(value[0])
    const away = Number(value[1])
    return Number.isFinite(home) && Number.isFinite(away) ? [home, away] : null
  }
  const obj = object(value)
  if (!obj) return null
  const home = Number(obj.home ?? obj[0])
  const away = Number(obj.away ?? obj[1])
  return Number.isFinite(home) && Number.isFinite(away) ? [home, away] : null
}

function parseMinute(value: Json | undefined): { minute: number | null; extraMinute: number | null } {
  if (typeof value === 'number') return { minute: value, extraMinute: null }
  const match = String(value ?? '').match(/(\d+)(?:\+(\d+))?/) 
  return {
    minute: match ? Number(match[1]) : null,
    extraMinute: match?.[2] ? Number(match[2]) : null
  }
}

function openFootballGoals(value: Json | undefined, team: 'home' | 'away'): SourceGoal[] | null {
  if (value == null) return null
  if (!Array.isArray(value)) return []
  return value.flatMap((entry) => {
    if (typeof entry === 'string') {
      const minute = parseMinute(entry)
      const name = entry.replace(/\(?\d+(?:\+\d+)?'?\)?/g, '').replace(/\((?:og|pen)\)/gi, '').trim()
      return [{
        team,
        playerName: name || null,
        ...minute,
        ownGoal: /\bog\b/i.test(entry),
        penalty: /\bpen\b/i.test(entry)
      }]
    }
    const item = object(entry)
    if (!item) return []
    const minute = parseMinute(item.minute ?? item.min)
    const name = String(item.name ?? item.player ?? item.scorer ?? '').trim()
    const note = String(item.type ?? item.note ?? '')
    return [{
      team,
      playerName: name || null,
      ...minute,
      ownGoal: boolJson(item.own_goal ?? item.og) || /own goal|\bog\b/i.test(note),
      penalty: boolJson(item.penalty ?? item.pen) || /penalty|\bpen\b/i.test(note)
    }]
  })
}

function boolJson(value: Json | undefined): boolean {
  return value === true || value === 1 || value === '1' || value === 'true'
}

function collectOpenFootballMatches(value: Json, inheritedRound: string | null, out: Array<{ match: { [key: string]: Json }; round: string | null }>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectOpenFootballMatches(item, inheritedRound, out)
    return
  }
  const item = object(value)
  if (!item) return
  const round = String(item.name ?? item.round ?? inheritedRound ?? '').trim() || null
  if ((item.team1 || item.home || item.homeTeam) && (item.team2 || item.away || item.awayTeam)) {
    out.push({ match: item, round: inheritedRound })
    return
  }
  for (const [key, child] of Object.entries(item)) {
    if (key === 'rounds' || key === 'matches' || key === 'games' || key === 'groups') {
      collectOpenFootballMatches(child, round, out)
    }
  }
}

export function parseOpenFootballJson(input: {
  text: string
  competitionKey: FootballCompetitionKey
  seasonKey: string
  sourceUrl: string
  fingerprint: string
  national?: boolean
}): SourceMatch[] {
  assertBoundedArchive(Buffer.byteLength(input.text))
  const root = JSON.parse(input.text) as Json
  const found: Array<{ match: { [key: string]: Json }; round: string | null }> = []
  collectOpenFootballMatches(root, null, found)
  return found.flatMap(({ match, round }, index) => {
    const homeName = String(match.team1 ?? match.home ?? match.homeTeam ?? '').trim()
    const awayName = String(match.team2 ?? match.away ?? match.awayTeam ?? '').trim()
    const dateRaw = String(match.date ?? match.played_at ?? '').trim()
    if (!homeName || !awayName || !dateRaw) return []
    const score = object(match.score)
    const full = scorePair(score?.ft ?? match.score)
    const half = scorePair(score?.ht)
    const extra = scorePair(score?.et)
    const penalties = scorePair(score?.p ?? score?.pen ?? score?.pens ?? score?.penalties)
    const homeGoals = openFootballGoals(match.goals1 ?? match.homeGoals, 'home')
    const awayGoals = openFootballGoals(match.goals2 ?? match.awayGoals, 'away')
    const goals = homeGoals == null && awayGoals == null ? null : [...(homeGoals ?? []), ...(awayGoals ?? [])]
    const date = isoDate(dateRaw)
    return [{
      sourceId: String(match.id ?? `${input.seasonKey}:${date}:${normalizeFootballName(homeName)}:${normalizeFootballName(awayName)}`),
      competitionKey: input.competitionKey,
      seasonKey: input.seasonKey,
      seasonLabel: seasonLabel(input.seasonKey),
      date,
      home: { sourceId: normalizeFootballName(homeName), name: homeName, country: null, national: !!input.national },
      away: { sourceId: normalizeFootballName(awayName), name: awayName, country: null, national: !!input.national },
      stage: round,
      round,
      status: full ? 'finished' : 'scheduled',
      homeScore: full?.[0] ?? null,
      awayScore: full?.[1] ?? null,
      homeHalfTime: half?.[0] ?? null,
      awayHalfTime: half?.[1] ?? null,
      homeExtraTime: extra?.[0] ?? null,
      awayExtraTime: extra?.[1] ?? null,
      homePenalties: penalties?.[0] ?? null,
      awayPenalties: penalties?.[1] ?? null,
      goals,
      source: 'openfootball',
      sourceUrl: input.sourceUrl,
      rawFingerprint: `${input.fingerprint}:${index}`
    }]
  })
}

function seasonYearBounds(seasonKey: string): { start: number; end: number } {
  const match = seasonKey.match(/(\d{4})(?:[-/](\d{2}|\d{4}))?/)
  const start = match ? Number(match[1]) : new Date().getUTCFullYear()
  const end = !match?.[2]
    ? start
    : match[2].length === 2
      ? Math.floor(start / 100) * 100 + Number(match[2])
      : Number(match[2])
  return { start, end }
}

function openFootballTextDate(value: string, seasonKey: string): string | null {
  const clean = value.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+/i, '').trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean
  const numeric = clean.match(/^(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?$/)
  const bounds = seasonYearBounds(seasonKey)
  if (numeric) {
    const month = Number(numeric[2])
    const year = numeric[3]
      ? Number(numeric[3].length === 2 ? `${String(bounds.start).slice(0, 2)}${numeric[3]}` : numeric[3])
      : month >= 7
        ? bounds.start
        : bounds.end
    return `${year}-${String(month).padStart(2, '0')}-${numeric[1].padStart(2, '0')}`
  }
  const named = clean.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})(?:,?\s+(\d{4}))?$/i)
  if (!named) return null
  const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    .indexOf(named[1].slice(0, 3).toLocaleLowerCase('en')) + 1
  const year = named[3] ? Number(named[3]) : month >= 7 ? bounds.start : bounds.end
  return `${year}-${String(month).padStart(2, '0')}-${named[2].padStart(2, '0')}`
}

export function parseOpenFootballTxt(input: {
  text: string
  competitionKey: FootballCompetitionKey
  seasonKey: string
  sourceUrl: string
  fingerprint: string
}): SourceMatch[] {
  assertBoundedArchive(Buffer.byteLength(input.text))
  const lines = input.text.replace(/\r/g, '').split('\n')
  let stage: string | null = null
  let date: string | null = null
  const matches: SourceMatch[] = []
  for (let index = 0; index < lines.length; index++) {
    const trimmed = lines[index].trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    if (/^[=▪]/.test(trimmed)) {
      stage = trimmed.replace(/^[=▪]+\s*/, '').trim() || stage
      continue
    }
    const parsedDate = openFootballTextDate(trimmed, input.seasonKey)
    if (parsedDate) {
      date = parsedDate
      continue
    }
    // Football.TXT separates the teams with a literal ` v `; this is safer
    // than attempting to split on the variable amount of alignment whitespace.
    const match = trimmed.match(/^(?:\d{1,2}:\d{2}\s+)?(.+?)\s+v\s+(.+?)\s+(\d+)\s*[-:–]\s*(\d+)(.*)$/i)
    if (!match || !date) continue
    const homeName = match[1].trim()
    const awayName = match[2].trim()
    const tail = match[5]
    const penaltyScore = tail.match(/(?:pen|pens|penalties)[^\d]*(\d+)\s*[-:–]\s*(\d+)/i)
    const next = lines[index + 1]?.trim() ?? ''
    const scorerLine = /^\(.+\)$/.test(next) ? next.slice(1, -1) : null
    const goals: SourceGoal[] | null = scorerLine == null
      ? null
      : scorerLine.split(';').flatMap((side, sideIndex) => {
          const team = sideIndex === 0 ? 'home' as const : 'away' as const
          const tokens = [...side.matchAll(/([^,;]+?)\s+(\d+)(?:\+(\d+))?'(?:\s*\(([^)]+)\))?/g)]
          return tokens.map((token) => ({
            team,
            playerName: token[1].trim() || null,
            minute: Number(token[2]),
            extraMinute: token[3] ? Number(token[3]) : null,
            ownGoal: /o\.?g\.?|own goal/i.test(token[4] ?? ''),
            penalty: /pen/i.test(token[4] ?? '')
          }))
        })
    if (scorerLine != null) index++
    matches.push({
      sourceId: `${input.seasonKey}:${date}:${normalizeFootballName(homeName)}:${normalizeFootballName(awayName)}`,
      competitionKey: input.competitionKey,
      seasonKey: input.seasonKey,
      seasonLabel: seasonLabel(input.seasonKey),
      date,
      home: { sourceId: normalizeFootballName(homeName), name: homeName, country: null, national: false },
      away: { sourceId: normalizeFootballName(awayName), name: awayName, country: null, national: false },
      stage,
      round: stage,
      status: 'finished',
      homeScore: Number(match[3]),
      awayScore: Number(match[4]),
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: /aet|extra time/i.test(tail) ? Number(match[3]) : null,
      awayExtraTime: /aet|extra time/i.test(tail) ? Number(match[4]) : null,
      homePenalties: penaltyScore ? Number(penaltyScore[1]) : null,
      awayPenalties: penaltyScore ? Number(penaltyScore[2]) : null,
      goals,
      source: 'openfootball',
      sourceUrl: input.sourceUrl,
      rawFingerprint: `${input.fingerprint}:${index + 1}`
    })
  }
  return matches
}

export interface InternationalResult {
  date: string
  home: string
  away: string
  homeScore: number
  awayScore: number
  tournament: string
  city: string | null
  country: string | null
  neutral: boolean
}

export function parseInternationalResultsCsv(text: string): InternationalResult[] {
  const rows = parseCsv(text)
  if (rows.length < 2) return []
  const h = rows[0]
  const date = headerIndex(h, ['date'])
  const home = headerIndex(h, ['home_team'])
  const away = headerIndex(h, ['away_team'])
  const hg = headerIndex(h, ['home_score'])
  const ag = headerIndex(h, ['away_score'])
  const tournament = headerIndex(h, ['tournament'])
  const city = headerIndex(h, ['city'], false)
  const country = headerIndex(h, ['country'], false)
  const neutral = headerIndex(h, ['neutral'], false)
  return rows.slice(1).flatMap((row) => {
    const dateValue = cell(row, date)
    const homeValue = cell(row, home)
    const awayValue = cell(row, away)
    const homeScore = integer(cell(row, hg))
    const awayScore = integer(cell(row, ag))
    if (!dateValue || !homeValue || !awayValue || homeScore == null || awayScore == null) return []
    return [{
      date: isoDate(dateValue),
      home: homeValue,
      away: awayValue,
      homeScore,
      awayScore,
      tournament: cell(row, tournament) ?? '',
      city: cell(row, city),
      country: cell(row, country),
      neutral: /true|1|yes/i.test(cell(row, neutral) ?? '')
    }]
  })
}

export interface InternationalScorer {
  date: string
  home: string
  away: string
  team: string
  scorer: string
  minute: number | null
  extraMinute: number | null
  ownGoal: boolean
  penalty: boolean
}

export function parseInternationalScorersCsv(text: string): InternationalScorer[] {
  const rows = parseCsv(text)
  if (rows.length < 2) return []
  const h = rows[0]
  const date = headerIndex(h, ['date'])
  const home = headerIndex(h, ['home_team'])
  const away = headerIndex(h, ['away_team'])
  const team = headerIndex(h, ['team'])
  const scorer = headerIndex(h, ['scorer'])
  const minute = headerIndex(h, ['minute'], false)
  const ownGoal = headerIndex(h, ['own_goal'], false)
  const penalty = headerIndex(h, ['penalty'], false)
  return rows.slice(1).flatMap((row) => {
    const dateValue = cell(row, date)
    const homeValue = cell(row, home)
    const awayValue = cell(row, away)
    const teamValue = cell(row, team)
    const scorerValue = cell(row, scorer)
    if (!dateValue || !homeValue || !awayValue || !teamValue || !scorerValue) return []
    const parsedMinute = parseMinute(cell(row, minute) ?? undefined)
    return [{
      date: isoDate(dateValue),
      home: homeValue,
      away: awayValue,
      team: teamValue,
      scorer: scorerValue,
      ...parsedMinute,
      ownGoal: /true|1|yes/i.test(cell(row, ownGoal) ?? ''),
      penalty: /true|1|yes/i.test(cell(row, penalty) ?? '')
    }]
  })
}

export function attachInternationalScorers(
  matches: InternationalResult[],
  scorers: InternationalScorer[]
): Map<number, InternationalScorer[]> {
  const result = new Map<number, InternationalScorer[]>()
  const matchKey = (date: string, home: string, away: string) =>
    `${date}|${normalizeFootballName(home)}|${normalizeFootballName(away)}`
  const indices = new Map<string, number[]>()
  matches.forEach((match, index) => {
    const key = matchKey(match.date, match.home, match.away)
    indices.set(key, [...(indices.get(key) ?? []), index])
  })
  for (const scorer of scorers) {
    const candidates = indices.get(matchKey(scorer.date, scorer.home, scorer.away)) ?? []
    if (candidates.length !== 1) continue
    const index = candidates[0]
    result.set(index, [...(result.get(index) ?? []), scorer])
  }
  return result
}

export function parseStatsBombCompetitionSeasons(raw: unknown): StatsBombCompetitionSeason[] {
  if (!Array.isArray(raw)) throw new Error('StatsBomb competitions payload is not an array')
  return raw.flatMap((value) => {
    const row = value as Record<string, unknown>
    const competitionId = Number(row.competition_id)
    const seasonId = Number(row.season_id)
    const competitionName = String(row.competition_name ?? '').trim()
    const seasonName = String(row.season_name ?? '').trim()
    if (!Number.isInteger(competitionId) || !Number.isInteger(seasonId) || !competitionName || !seasonName) {
      return []
    }
    return [{
      competitionId,
      seasonId,
      competitionName,
      seasonName,
      countryName: String(row.country_name ?? '').trim(),
      gender: String(row.competition_gender ?? '').trim().toLocaleLowerCase('en')
    }]
  })
}

export function parseStatsBombMatches(input: {
  raw: unknown
  competitionKey: FootballCompetitionKey
  seasonKey: string
  sourceUrl: string
  fingerprint: string
}): SourceMatch[] {
  if (!Array.isArray(input.raw)) throw new Error('StatsBomb matches payload is not an array')
  return input.raw.flatMap((value, index) => {
    const row = value as Record<string, any>
    const homeName = String(row.home_team?.home_team_name ?? '').trim()
    const awayName = String(row.away_team?.away_team_name ?? '').trim()
    const homeId = Number(row.home_team?.home_team_id)
    const awayId = Number(row.away_team?.away_team_id)
    const matchId = Number(row.match_id)
    const date = String(row.match_date ?? '').slice(0, 10)
    if (!homeName || !awayName || !Number.isInteger(homeId) || !Number.isInteger(awayId) ||
        !Number.isInteger(matchId) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return []
    const homeScore = Number(row.home_score)
    const awayScore = Number(row.away_score)
    return [{
      sourceId: String(matchId),
      competitionKey: input.competitionKey,
      seasonKey: input.seasonKey,
      seasonLabel: seasonLabel(input.seasonKey),
      date,
      home: {
        sourceId: String(homeId),
        name: homeName,
        country: null,
        national: input.competitionKey === 'world-cup' || input.competitionKey === 'euros'
      },
      away: {
        sourceId: String(awayId),
        name: awayName,
        country: null,
        national: input.competitionKey === 'world-cup' || input.competitionKey === 'euros'
      },
      stage: String(row.competition_stage?.name ?? '').trim() || null,
      round: Number.isFinite(Number(row.match_week)) ? String(row.match_week) : null,
      status: Number.isFinite(homeScore) && Number.isFinite(awayScore) ? 'finished' : 'scheduled',
      homeScore: Number.isFinite(homeScore) ? homeScore : null,
      awayScore: Number.isFinite(awayScore) ? awayScore : null,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source: 'statsbomb',
      sourceUrl: input.sourceUrl,
      rawFingerprint: `${input.fingerprint}:${index}:${matchId}`
    }]
  })
}

export function parseStatsBombEvents(raw: unknown, homeTeamSourceId: string): SourceGoal[] {
  if (!Array.isArray(raw)) throw new Error('StatsBomb events payload is not an array')
  return raw.flatMap((value) => {
    const row = value as Record<string, any>
    const type = String(row.type?.name ?? '')
    const shotGoal = type === 'Shot' && String(row.shot?.outcome?.name ?? '') === 'Goal'
    const ownGoal = type === 'Own Goal Against' || type === 'Own Goal For'
    if (!shotGoal && !ownGoal) return []
    const elapsed = Number(row.minute)
    const rawMinute = Number.isFinite(elapsed) ? Math.floor(elapsed) : null
    const periodEnd = Number(row.period) === 1
      ? 45
      : Number(row.period) === 2
        ? 90
        : Number(row.period) === 3
          ? 105
          : Number(row.period) === 4
            ? 120
            : null
    const minute = rawMinute != null && periodEnd != null && rawMinute > periodEnd
      ? periodEnd
      : rawMinute
    const extraMinute = rawMinute != null && periodEnd != null && rawMinute > periodEnd
      ? rawMinute - periodEnd
      : null
    const ownAgainst = type === 'Own Goal Against'
    const rawHome = String(row.team?.id) === homeTeamSourceId
    return [{
      team: ownAgainst ? (rawHome ? 'away' as const : 'home' as const) : (rawHome ? 'home' as const : 'away' as const),
      playerName: String(row.player?.name ?? '').trim() || null,
      playerSourceId: row.player?.id == null ? null : String(row.player.id),
      minute,
      extraMinute,
      ownGoal,
      penalty: String(row.shot?.type?.name ?? '') === 'Penalty'
    }]
  })
}

export function parseStatsBombLineups(raw: unknown): SourceLineup[] {
  if (!Array.isArray(raw)) throw new Error('StatsBomb lineups payload is not an array')
  const output: SourceLineup[] = []
  for (const teamValue of raw) {
    const team = teamValue as Record<string, any>
    const teamSourceId = String(team.team_id ?? '')
    if (!teamSourceId || !Array.isArray(team.lineup)) continue
    team.lineup.forEach((value: unknown, index: number) => {
      const player = value as Record<string, any>
      const personSourceId = String(player.player_id ?? '')
      const playerName = String(player.player_name ?? player.player_nickname ?? '').trim()
      if (!personSourceId || !playerName) return
      const positions = Array.isArray(player.positions) ? player.positions : []
      const first = positions[0] as Record<string, any> | undefined
      output.push({
        teamSourceId,
        personSourceId,
        playerName,
        role: 'player',
        starter: String(first?.start_reason ?? '') === 'Starting XI' || String(first?.from ?? '') === '00:00',
        shirt: Number.isFinite(Number(player.jersey_number)) ? Number(player.jersey_number) : null,
        position: String(first?.position ?? first?.position_name ?? '').trim() || null,
        captain: false,
        sortOrder: index
      })
    })
  }
  return output
}

function wyscoutName(value: unknown): string {
  const row = value as Record<string, any>
  return String(row.shortName ?? [row.firstName, row.middleName, row.lastName].filter(Boolean).join(' ')).trim()
}

export function parseWyscoutPack(input: {
  matches: unknown
  teams: unknown
  players: unknown
  competitionKey: FootballCompetitionKey
  seasonKey: string
  sourceUrl: string
  fingerprint: string
}): WyscoutPack {
  if (!Array.isArray(input.matches) || !Array.isArray(input.teams) || !Array.isArray(input.players)) {
    throw new Error('Wyscout pack payload has an invalid shape')
  }
  const teams = new Map(input.teams.map((value) => {
    const row = value as Record<string, any>
    return [String(row.wyId), String(row.name ?? row.officialName ?? '').trim()] as const
  }))
  const players = new Map(input.players.map((value) => {
    const row = value as Record<string, any>
    return [String(row.wyId), wyscoutName(row)] as const
  }))
  const lineups = new Map<string, SourceLineup[]>()
  const matches = input.matches.flatMap((value, index) => {
    const row = value as Record<string, any>
    const matchId = String(row.wyId ?? '')
    const data = Object.values(row.teamsData ?? {}) as Array<Record<string, any>>
    const home = data.find((item) => item.side === 'home')
    const away = data.find((item) => item.side === 'away')
    const homeName = home ? teams.get(String(home.teamId)) : null
    const awayName = away ? teams.get(String(away.teamId)) : null
    const date = String(row.dateutc ?? row.date ?? '').slice(0, 10)
    if (!matchId || !home || !away || !homeName || !awayName || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return []
    const lineupRows: SourceLineup[] = []
    for (const team of [home, away]) {
      const sections: Array<{ starter: boolean; rows: unknown[] }> = [
        { starter: true, rows: Array.isArray(team.lineup) ? team.lineup : [] },
        { starter: false, rows: Array.isArray(team.bench) ? team.bench : [] }
      ]
      for (const section of sections) {
        section.rows.forEach((entry, playerIndex) => {
          const player = entry as Record<string, any>
          const sourceId = String(player.playerId ?? '')
          const name = players.get(sourceId)
          if (!sourceId || !name) return
          lineupRows.push({
            teamSourceId: String(team.teamId),
            personSourceId: sourceId,
            playerName: name,
            role: 'player',
            starter: section.starter,
            shirt: Number.isFinite(Number(player.shirtNumber)) ? Number(player.shirtNumber) : null,
            position: null,
            captain: !!player.captain,
            sortOrder: (section.starter ? 0 : 100) + playerIndex
          })
        })
      }
    }
    lineups.set(matchId, lineupRows)
    const duration = String(row.duration ?? '')
    const fullHome = Number(/ExtraTime|Penal/i.test(duration) ? home.scoreET : home.score)
    const fullAway = Number(/ExtraTime|Penal/i.test(duration) ? away.scoreET : away.score)
    const statusText = String(row.status ?? '')
    return [{
      sourceId: matchId,
      competitionKey: input.competitionKey,
      seasonKey: input.seasonKey,
      seasonLabel: seasonLabel(input.seasonKey),
      date,
      home: {
        sourceId: String(home.teamId), name: homeName, country: null,
        national: input.competitionKey === 'world-cup' || input.competitionKey === 'euros'
      },
      away: {
        sourceId: String(away.teamId), name: awayName, country: null,
        national: input.competitionKey === 'world-cup' || input.competitionKey === 'euros'
      },
      stage: row.roundID == null ? null : String(row.roundID),
      round: row.gameweek == null ? null : String(row.gameweek),
      status: (statusText === 'Played'
        ? 'finished'
        : /Cancel|Suspend/i.test(statusText)
          ? 'abandoned'
          : 'scheduled') as SourceMatch['status'],
      homeScore: Number.isFinite(fullHome) ? fullHome : null,
      awayScore: Number.isFinite(fullAway) ? fullAway : null,
      homeHalfTime: Number.isFinite(Number(home.scoreHT)) ? Number(home.scoreHT) : null,
      awayHalfTime: Number.isFinite(Number(away.scoreHT)) ? Number(away.scoreHT) : null,
      homeExtraTime: /ExtraTime|Penal/i.test(duration) && Number.isFinite(Number(home.scoreET)) ? Number(home.scoreET) : null,
      awayExtraTime: /ExtraTime|Penal/i.test(duration) && Number.isFinite(Number(away.scoreET)) ? Number(away.scoreET) : null,
      homePenalties: /Penal/i.test(duration) && Number.isFinite(Number(home.scoreP)) ? Number(home.scoreP) : null,
      awayPenalties: /Penal/i.test(duration) && Number.isFinite(Number(away.scoreP)) ? Number(away.scoreP) : null,
      goals: null,
      source: 'wyscout' as const,
      sourceUrl: input.sourceUrl,
      rawFingerprint: `${input.fingerprint}:${index}:${matchId}`
    }]
  })
  return { matches, lineups }
}

function wyscoutMinute(period: string, seconds: number): { minute: number; extraMinute: number | null } {
  const base = period === '2H' ? 45 : period === 'E1' ? 90 : period === 'E2' ? 105 : 0
  const regulationEnd = period === '1H' ? 45 : period === '2H' ? 90 : period === 'E1' ? 105 : period === 'E2' ? 120 : null
  const elapsed = base + Math.floor(Math.max(0, seconds) / 60)
  return regulationEnd != null && elapsed > regulationEnd
    ? { minute: regulationEnd, extraMinute: elapsed - regulationEnd }
    : { minute: elapsed, extraMinute: null }
}

export function parseWyscoutEvents(
  raw: unknown,
  homeTeamByMatch: Map<string, string>,
  playerNames: Map<string, string>
): Map<string, SourceGoal[]> {
  if (!Array.isArray(raw)) throw new Error('Wyscout events payload is not an array')
  const output = new Map<string, SourceGoal[]>()
  for (const value of raw) {
    const row = value as Record<string, any>
    const tags = new Set((Array.isArray(row.tags) ? row.tags : []).map((tag: any) => Number(tag.id)))
    if (String(row.eventName ?? '') !== 'Shot' || (!tags.has(101) && !tags.has(102))) continue
    const matchId = String(row.matchId ?? '')
    const personSourceId = String(row.playerId ?? '')
    if (!matchId) continue
    const ownGoal = tags.has(102)
    const rawHome = String(row.teamId) === homeTeamByMatch.get(matchId)
    const timing = wyscoutMinute(String(row.matchPeriod ?? ''), Number(row.eventSec) || 0)
    const goal: SourceGoal = {
      team: ownGoal ? (rawHome ? 'away' : 'home') : (rawHome ? 'home' : 'away'),
      playerName: playerNames.get(personSourceId) ?? null,
      playerSourceId: personSourceId || null,
      ...timing,
      ownGoal,
      penalty: /penalty/i.test(String(row.subEventName ?? ''))
    }
    output.set(matchId, [...(output.get(matchId) ?? []), goal])
  }
  return output
}

export function parseApiFootballFixture(raw: unknown, competitionKey: FootballCompetitionKey): SourceMatch {
  const root = raw as Record<string, any>
  const fixture = root.fixture ?? {}
  const league = root.league ?? {}
  const teams = root.teams ?? {}
  const goals = root.goals ?? {}
  const score = root.score ?? {}
  const statusShort = String(fixture.status?.short ?? '')
  const status: SourceMatch['status'] =
    statusShort === 'AWD'
      ? 'awarded'
      : ['CANC', 'ABD'].includes(statusShort)
        ? 'abandoned'
        : ['FT', 'AET', 'PEN'].includes(statusShort)
          ? 'finished'
          : 'scheduled'
  const date = String(fixture.date ?? '').slice(0, 10)
  if (!fixture.id || !date || !teams.home?.name || !teams.away?.name) {
    throw new Error('API-Football fixture is missing its identity fields')
  }
  return {
    sourceId: String(fixture.id),
    competitionKey,
      seasonKey: footballSeasonKey(
        String(league.season ?? date.slice(0, 4)),
        competitionKey
      ),
      seasonLabel: footballSeasonKey(
        String(league.season ?? date.slice(0, 4)),
        competitionKey
      ),
    date,
    home: {
      sourceId: String(teams.home.id),
      name: String(teams.home.name),
      country: null,
      national: competitionKey === 'world-cup' || competitionKey === 'euros'
    },
    away: {
      sourceId: String(teams.away.id),
      name: String(teams.away.name),
      country: null,
      national: competitionKey === 'world-cup' || competitionKey === 'euros'
    },
    stage: String(league.round ?? '').trim() || null,
    round: String(league.round ?? '').trim() || null,
    status,
    homeScore: Number.isFinite(Number(goals.home)) ? Number(goals.home) : null,
    awayScore: Number.isFinite(Number(goals.away)) ? Number(goals.away) : null,
    homeHalfTime: Number.isFinite(Number(score.halftime?.home)) ? Number(score.halftime.home) : null,
    awayHalfTime: Number.isFinite(Number(score.halftime?.away)) ? Number(score.halftime.away) : null,
    homeExtraTime: Number.isFinite(Number(score.extratime?.home)) ? Number(score.extratime.home) : null,
    awayExtraTime: Number.isFinite(Number(score.extratime?.away)) ? Number(score.extratime.away) : null,
    homePenalties: Number.isFinite(Number(score.penalty?.home)) ? Number(score.penalty.home) : null,
    awayPenalties: Number.isFinite(Number(score.penalty?.away)) ? Number(score.penalty.away) : null,
    goals: null,
    source: 'api-football',
    sourceUrl: 'https://v3.football.api-sports.io/fixtures',
    rawFingerprint: createHash('sha256').update(JSON.stringify(raw)).digest('hex')
  }
}

export function parseApiFootballEvents(raw: unknown, homeTeamSourceId: string): SourceGoal[] {
  if (!Array.isArray(raw)) return []
  return raw.flatMap((value) => {
    const item = value as Record<string, any>
    if (String(item.type).toLocaleLowerCase('en') !== 'goal') return []
    const detail = String(item.detail ?? '')
    return [{
      team: String(item.team?.id) === homeTeamSourceId ? 'home' as const : 'away' as const,
      playerName: String(item.player?.name ?? '').trim() || null,
      playerSourceId: item.player?.id == null ? null : String(item.player.id),
      minute: Number.isFinite(Number(item.time?.elapsed)) ? Number(item.time.elapsed) : null,
      extraMinute: Number.isFinite(Number(item.time?.extra)) ? Number(item.time.extra) : null,
      ownGoal: /own goal/i.test(detail),
      penalty: /penalty/i.test(detail)
    }]
  })
}

export function parseApiFootballLineups(raw: unknown): SourceLineup[] {
  if (!Array.isArray(raw)) return []
  const output: SourceLineup[] = []
  for (const teamRow of raw) {
    const row = teamRow as Record<string, any>
    const teamSourceId = String(row.team?.id ?? '')
    if (!teamSourceId) continue
    const coachSourceId = String(row.coach?.id ?? '')
    const coachName = String(row.coach?.name ?? '').trim()
    if (coachSourceId && coachName) {
      output.push({
        teamSourceId,
        personSourceId: coachSourceId,
        playerName: coachName,
        role: 'manager',
        starter: false,
        shirt: null,
        position: 'Head coach',
        captain: false,
        sortOrder: -1
      })
    }
    const sections: Array<{ starter: boolean; values: unknown[] }> = [
      { starter: true, values: Array.isArray(row.startXI) ? row.startXI : [] },
      { starter: false, values: Array.isArray(row.substitutes) ? row.substitutes : [] }
    ]
    for (const section of sections) {
      section.values.forEach((value, index) => {
        const player = (value as Record<string, any>)?.player ?? {}
        const personSourceId = String(player.id ?? '')
        const playerName = String(player.name ?? '').trim()
        if (!personSourceId || !playerName) return
        output.push({
          teamSourceId,
          personSourceId,
          playerName,
          role: 'player',
          starter: section.starter,
          shirt: Number.isFinite(Number(player.number)) ? Number(player.number) : null,
          position: String(player.pos ?? '').trim() || null,
          captain: !!player.captain,
          sortOrder: (section.starter ? 0 : 100) + index
        })
      })
    }
  }
  return output
}
