import type {
  FootballCompetitionKey,
  FootballExternalProvider,
  FootballMediaKind
} from './types'

export interface FootballCompetitionConfig {
  key: FootballCompetitionKey
  name: string
  shortName: string
  country: string | null
  scope: 'domestic' | 'continental' | 'international'
  format: 'league' | 'cup'
  startYear: number
  lineageNote: string | null
}

export interface FootballEraConfig {
  competitionKey: FootballCompetitionKey
  name: string
  startSeason: string | null
  endSeason: string | null
  pointsWin: number | null
  pointsDraw: number | null
  rankRules: string | null
  narrative: string | null
}

export interface FootballWikimediaManifestEntry {
  competitionKey: FootballCompetitionKey
  page: string
  winnerHeaders: string[]
  runnerUpHeaders: string[]
  firstSeasonKey: string
  minimumHonours: number
}

// Frozen values persist in source refs, saved filters, quiz settings and routes.
export const FOOTBALL_COMPETITIONS: readonly FootballCompetitionConfig[] = [
  {
    key: 'premier-league',
    name: 'Premier League',
    shortName: 'Premier League',
    country: 'England',
    scope: 'domestic',
    format: 'league',
    startYear: 1888,
    lineageNote: 'Includes the recognized English First Division lineage.'
  },
  {
    key: 'la-liga',
    name: 'La Liga',
    shortName: 'La Liga',
    country: 'Spain',
    scope: 'domestic',
    format: 'league',
    startYear: 1929,
    lineageNote: null
  },
  {
    key: 'serie-a',
    name: 'Serie A',
    shortName: 'Serie A',
    country: 'Italy',
    scope: 'domestic',
    format: 'league',
    startYear: 1898,
    lineageNote: 'Includes the recognized top-flight Italian championship lineage.'
  },
  {
    key: 'bundesliga',
    name: 'Bundesliga',
    shortName: 'Bundesliga',
    country: 'Germany',
    scope: 'domestic',
    format: 'league',
    startYear: 1963,
    lineageNote: null
  },
  {
    key: 'champions-league',
    name: 'UEFA Champions League',
    shortName: 'Champions League',
    country: null,
    scope: 'continental',
    format: 'cup',
    startYear: 1955,
    lineageNote: 'Includes the recognized European Cup lineage.'
  },
  {
    key: 'europa-league',
    name: 'UEFA Europa League',
    shortName: 'Europa League',
    country: null,
    scope: 'continental',
    format: 'cup',
    startYear: 1971,
    lineageNote: 'Includes the recognized UEFA Cup lineage; excludes the Fairs Cup.'
  },
  {
    key: 'conference-league',
    name: 'UEFA Conference League',
    shortName: 'Conference League',
    country: null,
    scope: 'continental',
    format: 'cup',
    startYear: 2021,
    lineageNote: null
  },
  {
    key: 'world-cup',
    name: 'FIFA World Cup',
    shortName: 'World Cup',
    country: null,
    scope: 'international',
    format: 'cup',
    startYear: 1930,
    lineageNote: 'Finals tournaments only; qualification campaigns are excluded.'
  },
  {
    key: 'euros',
    name: 'UEFA European Championship',
    shortName: 'Euros',
    country: null,
    scope: 'international',
    format: 'cup',
    startYear: 1960,
    lineageNote: 'Finals tournaments only; qualification campaigns are excluded.'
  }
] as const

export const FOOTBALL_COMPETITION_KEYS = FOOTBALL_COMPETITIONS.map((item) => item.key)

// Frozen history boundaries. They are display/reference eras; an ordinal table
// rank is still accepted only when a source supplies an official tested rank.
export const FOOTBALL_ERAS: readonly FootballEraConfig[] = [
  { competitionKey: 'premier-league', name: 'Football League First Division', startSeason: '1888/89', endSeason: '1991/92', pointsWin: null, pointsDraw: 1, rankRules: 'Provider-supplied official rank only; points-for-a-win changed within this era.', narrative: 'The recognized English top-flight lineage before the Premier League name.' },
  { competitionKey: 'premier-league', name: 'Premier League', startSeason: '1992/93', endSeason: null, pointsWin: 3, pointsDraw: 1, rankRules: 'Official provider rank preserves deductions and season-specific tie-breaks.', narrative: null },
  { competitionKey: 'la-liga', name: 'Primera Division', startSeason: '1929', endSeason: null, pointsWin: null, pointsDraw: 1, rankRules: 'Official provider rank only; historical scoring and tie-break rules vary.', narrative: null },
  { competitionKey: 'serie-a', name: 'Italian top flight', startSeason: '1898', endSeason: '1928/29', pointsWin: null, pointsDraw: 1, rankRules: 'Official provider rank only.', narrative: 'Pre-round-robin championship formats remain part of the recognized lineage.' },
  { competitionKey: 'serie-a', name: 'Serie A round robin', startSeason: '1929/30', endSeason: null, pointsWin: null, pointsDraw: 1, rankRules: 'Official provider rank only; deductions and scoring rules vary by season.', narrative: null },
  { competitionKey: 'bundesliga', name: 'Bundesliga', startSeason: '1963/64', endSeason: null, pointsWin: null, pointsDraw: 1, rankRules: 'Official provider rank only; points-for-a-win changed historically.', narrative: null },
  { competitionKey: 'champions-league', name: 'European Cup', startSeason: '1955/56', endSeason: '1991/92', pointsWin: null, pointsDraw: null, rankRules: null, narrative: 'The original name in the recognized Champions League lineage.' },
  { competitionKey: 'champions-league', name: 'UEFA Champions League', startSeason: '1992/93', endSeason: null, pointsWin: null, pointsDraw: null, rankRules: null, narrative: null },
  { competitionKey: 'europa-league', name: 'UEFA Cup', startSeason: '1971/72', endSeason: '2008/09', pointsWin: null, pointsDraw: null, rankRules: null, narrative: 'The Inter-Cities Fairs Cup is deliberately excluded.' },
  { competitionKey: 'europa-league', name: 'UEFA Europa League', startSeason: '2009/10', endSeason: null, pointsWin: null, pointsDraw: null, rankRules: null, narrative: null },
  { competitionKey: 'conference-league', name: 'UEFA Conference League', startSeason: '2021/22', endSeason: null, pointsWin: null, pointsDraw: null, rankRules: null, narrative: null },
  { competitionKey: 'world-cup', name: 'World Cup finals', startSeason: '1930', endSeason: null, pointsWin: null, pointsDraw: null, rankRules: null, narrative: 'Finals tournaments only.' },
  { competitionKey: 'euros', name: 'European Championship finals', startSeason: '1960', endSeason: null, pointsWin: null, pointsDraw: null, rankRules: null, narrative: 'Finals tournaments only.' }
] as const

// Exactly nine Wikimedia pages are allowed to contribute edition honours and
// narrative references. Keeping this manifest frozen prevents a category
// crawl and makes source attribution inspectable.
export const FOOTBALL_WIKIMEDIA_MANIFEST: readonly FootballWikimediaManifestEntry[] = [
  { competitionKey: 'premier-league', page: 'List of English football champions', winnerHeaders: ['champions', 'champion', 'winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1888/89', minimumHonours: 100 },
  { competitionKey: 'la-liga', page: 'List of Spanish football champions', winnerHeaders: ['champions', 'champion', 'winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1929', minimumHonours: 80 },
  { competitionKey: 'serie-a', page: 'List of Italian football champions', winnerHeaders: ['champions', 'champion', 'winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1898', minimumHonours: 90 },
  { competitionKey: 'bundesliga', page: 'List of German football champions', winnerHeaders: ['champions', 'champion', 'winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1963/64', minimumHonours: 55 },
  { competitionKey: 'champions-league', page: 'List of European Cup and UEFA Champions League finals', winnerHeaders: ['winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1955/56', minimumHonours: 60 },
  { competitionKey: 'europa-league', page: 'List of UEFA Cup and Europa League finals', winnerHeaders: ['winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1971/72', minimumHonours: 45 },
  { competitionKey: 'conference-league', page: 'UEFA Conference League', winnerHeaders: ['winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '2021/22', minimumHonours: 3 },
  { competitionKey: 'world-cup', page: 'List of FIFA World Cup finals', winnerHeaders: ['winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1930', minimumHonours: 20 },
  { competitionKey: 'euros', page: 'List of UEFA European Championship finals', winnerHeaders: ['winners', 'winner'], runnerUpHeaders: ['runners-up', 'runner-up'], firstSeasonKey: '1960', minimumHonours: 15 }
] as const

export const FOOTBALL_MEDIA_KINDS: readonly FootballMediaKind[] = [
  'clip',
  'highlight',
  'fullMatch',
  'interview',
  'documentary'
] as const

export function isFootballCompetitionKey(value: string): value is FootballCompetitionKey {
  return FOOTBALL_COMPETITION_KEYS.includes(value as FootballCompetitionKey)
}

export function escapeFootballLike(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
}

export function normalizeFootballName(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function validateFootballHttpUrl(value: string): string {
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    throw new Error('Enter a valid HTTP or HTTPS URL')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS links are supported')
  }
  parsed.username = ''
  parsed.password = ''
  return parsed.toString()
}

export function validateFootballExternalLink(
  provider: FootballExternalProvider,
  value: string
): string {
  const normalized = validateFootballHttpUrl(value)
  if (provider !== 'fotmob') return normalized

  const parsed = new URL(normalized)
  const hostname = parsed.hostname.toLocaleLowerCase('en')
  if (hostname !== 'fotmob.com' && hostname !== 'www.fotmob.com') {
    throw new Error('FotMob links must use fotmob.com')
  }
  const firstPath = parsed.pathname.split('/').filter(Boolean)[0]?.toLocaleLowerCase('en')
  if (!firstPath || !['matches', 'teams', 'players', 'leagues'].includes(firstPath)) {
    throw new Error('Use a FotMob match, team, player, or league link')
  }
  return normalized
}

export function validateFootballRelativePath(value: string): string {
  const normalized = value.replace(/\\/g, '/').replace(/^\/+/, '')
  if (!normalized || normalized.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error('The file must be inside the configured Football folder')
  }
  return normalized
}

export function formatFootballScore(match: {
  homeScore: number | null
  awayScore: number | null
  homeExtraTime?: number | null
  awayExtraTime?: number | null
  homePenalties?: number | null
  awayPenalties?: number | null
}): string {
  if (match.homeScore == null || match.awayScore == null) return 'vs'
  const base = `${match.homeScore}-${match.awayScore}`
  const extra =
    match.homeExtraTime != null && match.awayExtraTime != null
      ? `, ${match.homeExtraTime}-${match.awayExtraTime} aet`
      : ''
  const penalties =
    match.homePenalties != null && match.awayPenalties != null
      ? `, ${match.homePenalties}-${match.awayPenalties} pens`
      : ''
  return `${base}${extra}${penalties}`
}
