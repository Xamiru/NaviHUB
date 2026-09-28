import { normalizeFootballName } from './football'
import type { FootballCompetitionKey, FootballSeasonFate } from './types'

// Visual identity for the Football section. Competition and club colours are data
// hues (like chart fills), so they live here rather than in the theme palette.

export interface FootballCompetitionIdentity {
  code: string
  /** Space-separated RGB channels, consumed as `rgb(var(--football-c))`. */
  rgb: string
  /** Text colour on a solid competition fill. */
  ink: string
}

export const FOOTBALL_COMPETITION_IDENTITY: Record<FootballCompetitionKey, FootballCompetitionIdentity> = {
  'premier-league': { code: 'PL', rgb: '168 85 247', ink: '#ffffff' },
  'la-liga': { code: 'LL', rgb: '249 115 22', ink: '#ffffff' },
  'serie-a': { code: 'SA', rgb: '14 165 233', ink: '#ffffff' },
  bundesliga: { code: 'BL', rgb: '239 68 68', ink: '#ffffff' },
  'champions-league': { code: 'UCL', rgb: '226 232 240', ink: '#111827' },
  'europa-league': { code: 'UEL', rgb: '245 158 11', ink: '#111827' },
  'conference-league': { code: 'UECL', rgb: '34 197 94', ink: '#ffffff' },
  'world-cup': { code: 'WC', rgb: '212 175 55', ink: '#111827' },
  euros: { code: 'EURO', rgb: '99 102 241', ink: '#ffffff' }
}

function seasonStart(seasonKey: string): number {
  return Number(seasonKey.match(/\d{4}/)?.[0] ?? 0)
}

/** The name a competition carried in a given season (European Cup, UEFA Cup, First Division). */
export function footballEraName(key: FootballCompetitionKey, seasonKey: string, name: string): string {
  const start = seasonStart(seasonKey)
  if (key === 'champions-league' && start && start < 1992) return 'European Cup'
  if (key === 'europa-league' && start && start < 2009) return 'UEFA Cup'
  if (key === 'premier-league' && start && start < 1992) return 'First Division'
  return name
}

/** Label for what a team did the following season, named for that season's era. */
export function footballFateLabel(fate: FootballSeasonFate, seasonKey: string): string {
  const next = `${seasonStart(seasonKey) + 1}`
  if (fate === 'relegated') return 'Relegated'
  if (fate === 'champions-league') return footballEraName('champions-league', next, 'Champions League')
  if (fate === 'europa-league') return footballEraName('europa-league', next, 'Europa League')
  return 'Conference League'
}

// [primary, secondary, code, ...normalized aliases]
const CLUBS: ReadonlyArray<readonly [string, string, string, ...string[]]> = [
  ['#ef0107', '#ffffff', 'ARS', 'arsenal'],
  ['#670e36', '#95bfe5', 'AVL', 'aston villa'],
  ['#0000ff', '#ffffff', 'BIR', 'birmingham city', 'birmingham'],
  ['#009ee0', '#ffffff', 'BLB', 'blackburn rovers', 'blackburn'],
  ['#f68712', '#ffffff', 'BLP', 'blackpool'],
  ['#ffffff', '#263c7e', 'BOL', 'bolton wanderers', 'bolton'],
  ['#da291c', '#000000', 'BOU', 'afc bournemouth', 'bournemouth'],
  ['#e30613', '#ffffff', 'BRE', 'brentford'],
  ['#0057b8', '#ffffff', 'BHA', 'brighton hove albion', 'brighton and hove albion', 'brighton'],
  ['#6c1d45', '#99d6ea', 'BUR', 'burnley'],
  ['#e21f26', '#ffffff', 'BRC', 'bristol city'],
  ['#0070b5', '#ffffff', 'CAR', 'cardiff city', 'cardiff'],
  ['#d4021d', '#ffffff', 'CHA', 'charlton athletic', 'charlton'],
  ['#034694', '#ffffff', 'CHE', 'chelsea'],
  ['#87ceeb', '#ffffff', 'COV', 'coventry city', 'coventry'],
  ['#1b458f', '#c4122e', 'CRY', 'crystal palace'],
  ['#ffffff', '#000000', 'DER', 'derby county', 'derby'],
  ['#003399', '#ffffff', 'EVE', 'everton'],
  ['#ffffff', '#000000', 'FUL', 'fulham'],
  ['#0e63ad', '#ffffff', 'HUD', 'huddersfield town', 'huddersfield'],
  ['#f18a01', '#000000', 'HUL', 'hull city', 'hull'],
  ['#3a64a3', '#ffffff', 'IPS', 'ipswich town', 'ipswich'],
  ['#ffffff', '#1d428a', 'LEE', 'leeds united', 'leeds'],
  ['#003090', '#fdbe11', 'LEI', 'leicester city', 'leicester'],
  ['#c8102e', '#f6eb61', 'LIV', 'liverpool'],
  ['#f78f1e', '#002d62', 'LUT', 'luton town', 'luton'],
  ['#6cabdd', '#1c2c5b', 'MCI', 'manchester city', 'man city'],
  ['#da291c', '#fbe122', 'MUN', 'manchester united', 'man united', 'manchester utd'],
  ['#e11b22', '#ffffff', 'MID', 'middlesbrough'],
  ['#241f20', '#ffffff', 'NEW', 'newcastle united', 'newcastle'],
  ['#fff200', '#00a650', 'NOR', 'norwich city', 'norwich'],
  ['#dd0000', '#ffffff', 'NFO', 'nottingham forest', 'nottm forest'],
  ['#000000', '#ffffff', 'NCO', 'notts county'],
  ['#0a3a7d', '#ffffff', 'OLD', 'oldham athletic', 'oldham'],
  ['#001489', '#ffffff', 'POR', 'portsmouth'],
  ['#ffffff', '#1a2c5b', 'PNE', 'preston north end', 'preston'],
  ['#1d5ba4', '#ffffff', 'QPR', 'queens park rangers', 'qpr'],
  ['#004494', '#ffffff', 'REA', 'reading'],
  ['#ee2737', '#ffffff', 'SHU', 'sheffield united'],
  ['#0e00f7', '#ffffff', 'SHW', 'sheffield wednesday'],
  ['#d71920', '#ffffff', 'SOU', 'southampton'],
  ['#e03a3e', '#ffffff', 'STK', 'stoke city', 'stoke'],
  ['#eb172b', '#ffffff', 'SUN', 'sunderland'],
  ['#ffffff', '#121212', 'SWA', 'swansea city', 'swansea'],
  ['#ffffff', '#132257', 'TOT', 'tottenham hotspur', 'tottenham', 'spurs'],
  ['#fbee23', '#ed2127', 'WAT', 'watford'],
  ['#122f67', '#ffffff', 'WBA', 'west bromwich albion', 'west brom'],
  ['#7a263a', '#1bb1e7', 'WHU', 'west ham united', 'west ham'],
  ['#1d59af', '#ffffff', 'WIG', 'wigan athletic', 'wigan'],
  ['#0000ff', '#ffff00', 'WIM', 'wimbledon'],
  ['#fdb913', '#231f20', 'WOL', 'wolverhampton wanderers', 'wolverhampton', 'wolves'],
  ['#ffffff', '#febe10', 'RMA', 'real madrid'],
  ['#a50044', '#004d98', 'BAR', 'barcelona', 'fc barcelona'],
  ['#cb3524', '#ffffff', 'ATM', 'atletico madrid', 'atletico de madrid', 'club atletico de madrid'],
  ['#ee2523', '#ffffff', 'ATH', 'athletic bilbao', 'athletic club'],
  ['#ffffff', '#000000', 'VAL', 'valencia', 'valencia cf'],
  ['#ffffff', '#d81f26', 'SEV', 'sevilla', 'sevilla fc'],
  ['#00954c', '#ffffff', 'BET', 'real betis', 'betis'],
  ['#0067b1', '#ffffff', 'RSO', 'real sociedad'],
  ['#ffe114', '#005187', 'VIL', 'villarreal'],
  ['#8ac3ee', '#ffffff', 'CEL', 'celta vigo', 'celta de vigo', 'rc celta'],
  ['#1b4aa8', '#ffffff', 'DEP', 'deportivo la coruna', 'deportivo', 'rc deportivo'],
  ['#007fc8', '#ffffff', 'RCD', 'espanyol', 'rcd espanyol'],
  ['#1a7bc8', '#ffffff', 'MAL', 'malaga'],
  ['#e20613', '#000000', 'RCM', 'mallorca', 'rcd mallorca', 'real mallorca'],
  ['#d91a21', '#0a346f', 'OSA', 'osasuna', 'ca osasuna'],
  ['#005999', '#ffffff', 'GET', 'getafe'],
  ['#0d4596', '#ffffff', 'ZAR', 'real zaragoza', 'zaragoza'],
  ['#5b2b82', '#ffffff', 'VLL', 'real valladolid', 'valladolid'],
  ['#ffffff', '#00553e', 'RAC', 'racing santander', 'racing de santander'],
  ['#e30613', '#ffffff', 'SPG', 'sporting gijon', 'sporting de gijon'],
  ['#ffffff', '#e53027', 'RAY', 'rayo vallecano'],
  ['#ffe400', '#0066b3', 'LPA', 'las palmas', 'ud las palmas'],
  ['#b4053f', '#004f9f', 'LEV', 'levante'],
  ['#c8102e', '#ffffff', 'GRA', 'granada'],
  ['#0761af', '#ffffff', 'ALA', 'alaves', 'deportivo alaves'],
  ['#0033a0', '#ffffff', 'OVI', 'real oviedo', 'oviedo'],
  ['#000000', '#ffffff', 'JUV', 'juventus'],
  ['#fb090b', '#000000', 'MIL', 'ac milan', 'milan'],
  ['#0068a8', '#000000', 'INT', 'inter', 'internazionale', 'inter milan', 'fc internazionale', 'ambrosiana inter'],
  ['#8e1f2f', '#f0bc42', 'ROM', 'roma', 'as roma'],
  ['#87d8f7', '#ffffff', 'LAZ', 'lazio', 'ss lazio'],
  ['#12a0d7', '#ffffff', 'NAP', 'napoli', 'ssc napoli'],
  ['#482e92', '#ffffff', 'FIO', 'fiorentina', 'acf fiorentina'],
  ['#8a1e03', '#ffffff', 'TOR', 'torino'],
  ['#1e71b8', '#000000', 'ATA', 'atalanta'],
  ['#1a2f48', '#a21c26', 'BFC', 'bologna'],
  ['#ae1919', '#002a5c', 'GEN', 'genoa'],
  ['#1b5497', '#ffffff', 'SAM', 'sampdoria'],
  ['#ffd200', '#1b4094', 'PAR', 'parma'],
  ['#000000', '#ffffff', 'UDI', 'udinese'],
  ['#a40e2c', '#002350', 'CAG', 'cagliari'],
  ['#ffe000', '#002d72', 'VER', 'hellas verona', 'verona'],
  ['#00a752', '#000000', 'SAS', 'sassuolo'],
  ['#dc052d', '#ffffff', 'FCB', 'bayern munich', 'bayern munchen', 'fc bayern munchen', 'bayern'],
  ['#fde100', '#000000', 'BVB', 'borussia dortmund', 'dortmund'],
  ['#004d9d', '#ffffff', 'S04', 'schalke 04', 'fc schalke 04', 'schalke'],
  ['#0a3f86', '#ffffff', 'HSV', 'hamburger sv', 'hamburg'],
  ['#1d9053', '#ffffff', 'SVW', 'werder bremen', 'sv werder bremen'],
  ['#e32221', '#000000', 'B04', 'bayer leverkusen', 'bayer 04 leverkusen', 'leverkusen'],
  ['#ffffff', '#000000', 'BMG', 'borussia monchengladbach', 'monchengladbach', 'borussia m gladbach'],
  ['#ffffff', '#e32219', 'VFB', 'vfb stuttgart', 'stuttgart'],
  ['#e1000f', '#000000', 'SGE', 'eintracht frankfurt', 'frankfurt'],
  ['#ed1c24', '#ffffff', 'KOE', '1 fc koln', 'fc koln', 'koln', 'cologne'],
  ['#d00027', '#ffffff', 'FCK', '1 fc kaiserslautern', 'kaiserslautern'],
  ['#65b32e', '#ffffff', 'WOB', 'vfl wolfsburg', 'wolfsburg'],
  ['#005ca9', '#ffffff', 'BSC', 'hertha bsc', 'hertha berlin', 'hertha'],
  ['#aa1124', '#000000', 'FCN', '1 fc nurnberg', 'nurnberg', 'nuremberg'],
  ['#ffffff', '#dd0741', 'RBL', 'rb leipzig', 'leipzig'],
  ['#1961b5', '#ffffff', 'TSG', 'tsg hoffenheim', 'hoffenheim', '1899 hoffenheim'],
  ['#e2001a', '#000000', 'SCF', 'sc freiburg', 'freiburg'],
  ['#ed1c24', '#ffffff', 'M05', 'mainz 05', 'fsv mainz 05', 'mainz'],
  ['#eb1923', '#ffffff', 'FCU', 'union berlin', '1 fc union berlin'],
  ['#e3001b', '#000000', 'H96', 'hannover 96', 'hannover'],
  ['#005ba4', '#ffffff', 'BOC', 'vfl bochum', 'bochum'],
  ['#d2122e', '#ffffff', 'AJA', 'ajax', 'afc ajax'],
  ['#ed1c24', '#ffffff', 'PSV', 'psv eindhoven', 'psv'],
  ['#e30613', '#ffffff', 'FEY', 'feyenoord'],
  ['#e83030', '#ffffff', 'SLB', 'benfica', 'sl benfica'],
  ['#00428c', '#ffffff', 'FCP', 'porto', 'fc porto'],
  ['#008057', '#ffffff', 'SCP', 'sporting cp', 'sporting lisbon', 'sporting clube de portugal'],
  ['#018749', '#ffffff', 'CEL', 'celtic'],
  ['#1b458f', '#ffffff', 'RAN', 'rangers'],
  ['#004170', '#da291c', 'PSG', 'paris saint germain', 'paris sg', 'psg'],
  ['#2faee0', '#ffffff', 'OM', 'olympique de marseille', 'marseille'],
  ['#ffffff', '#1b3f8f', 'OL', 'olympique lyonnais', 'lyon'],
  ['#e7001e', '#ffffff', 'ASM', 'as monaco', 'monaco'],
  ['#4c2683', '#ffffff', 'AND', 'anderlecht', 'rsc anderlecht'],
  ['#a90432', '#fdb912', 'GAL', 'galatasaray'],
  ['#00205b', '#ffed00', 'FEN', 'fenerbahce'],
  ['#d2232a', '#ffffff', 'CZV', 'red star belgrade', 'crvena zvezda'],
  ['#00539f', '#ed1c24', 'STE', 'steaua bucuresti', 'steaua bucharest', 'fcsb'],
  ['#ffffff', '#0052a5', 'DYN', 'dynamo kyiv', 'dynamo kiev'],
  ['#f26522', '#000000', 'SHA', 'shakhtar donetsk'],
  ['#d71920', '#ffffff', 'OLY', 'olympiacos'],
  ['#ffffff', '#ce1124', 'ENG', 'england'],
  ['#aa151b', '#f1bf00', 'ESP', 'spain'],
  ['#0066cc', '#ffffff', 'ITA', 'italy'],
  ['#ffffff', '#000000', 'GER', 'germany', 'west germany'],
  ['#002654', '#ed2939', 'FRA', 'france'],
  ['#ffdf00', '#009c3b', 'BRA', 'brazil'],
  ['#75aadb', '#ffffff', 'ARG', 'argentina'],
  ['#f36c21', '#ffffff', 'NED', 'netherlands', 'holland'],
  ['#da291c', '#046a38', 'POR', 'portugal'],
  ['#e30613', '#000000', 'BEL', 'belgium'],
  ['#ff0000', '#ffffff', 'CRO', 'croatia'],
  ['#5cbfeb', '#ffffff', 'URU', 'uruguay'],
  ['#c60c30', '#ffffff', 'DEN', 'denmark'],
  ['#fecc00', '#006aa7', 'SWE', 'sweden'],
  ['#006847', '#ce1126', 'MEX', 'mexico'],
  ['#002868', '#bf0a30', 'USA', 'united states', 'usa'],
  ['#d7141a', '#11457e', 'CZE', 'czech republic', 'czechia', 'czechoslovakia'],
  ['#cc0000', '#ffd700', 'URS', 'soviet union', 'ussr'],
  ['#cd2a3e', '#436f4d', 'HUN', 'hungary'],
  ['#0c4076', '#ffffff', 'YUG', 'yugoslavia'],
  ['#ffffff', '#dc143c', 'POL', 'poland'],
  ['#ff0000', '#ffffff', 'SUI', 'switzerland'],
  ['#ed2939', '#ffffff', 'AUT', 'austria'],
  ['#005eb8', '#ffffff', 'SCO', 'scotland'],
  ['#c8102e', '#00b140', 'WAL', 'wales'],
  ['#00843d', '#ffffff', 'NIR', 'northern ireland'],
  ['#169b62', '#ffffff', 'IRL', 'republic of ireland', 'ireland'],
  ['#0d5eaf', '#ffffff', 'GRE', 'greece'],
  ['#e30a17', '#ffffff', 'TUR', 'turkey', 'turkiye'],
  ['#ffffff', '#d52b1e', 'RUS', 'russia'],
  ['#000080', '#ffffff', 'JPN', 'japan'],
  ['#cd2e3a', '#0047a0', 'KOR', 'south korea', 'korea republic'],
  ['#fcd116', '#003893', 'COL', 'colombia'],
  ['#d52b1e', '#0039a6', 'CHI', 'chile'],
  ['#008751', '#ffffff', 'NGA', 'nigeria'],
  ['#007a5e', '#ce1126', 'CMR', 'cameroon'],
  ['#00853f', '#fdef42', 'SEN', 'senegal'],
  ['#c1272d', '#006233', 'MAR', 'morocco'],
  ['#006b3f', '#fcd116', 'GHA', 'ghana'],
  ['#c6363c', '#0c4076', 'SRB', 'serbia'],
  ['#ba0c2f', '#ffffff', 'NOR', 'norway'],
  ['#fcd116', '#002b7f', 'ROU', 'romania'],
  ['#ffffff', '#00966e', 'BUL', 'bulgaria'],
  ['#ffd500', '#005bbb', 'UKR', 'ukraine'],
  ['#02529c', '#dc1e35', 'ISL', 'iceland'],
  ['#ffcd00', '#00843d', 'AUS', 'australia'],
  ['#ffffff', '#da0000', 'IRN', 'iran'],
  ['#006c35', '#ffffff', 'KSA', 'saudi arabia'],
  ['#ffd100', '#034ea2', 'ECU', 'ecuador'],
  ['#ffffff', '#d91023', 'PER', 'peru'],
  ['#002b7f', '#ce1126', 'CRC', 'costa rica'],
  ['#8a1538', '#ffffff', 'QAT', 'qatar'],
  ['#ff0000', '#ffffff', 'CAN', 'canada'],
  ['#e70013', '#ffffff', 'TUN', 'tunisia'],
  ['#ce1126', '#000000', 'EGY', 'egypt'],
  ['#006633', '#ffffff', 'ALG', 'algeria'],
  ['#007749', '#ffb81c', 'RSA', 'south africa'],
  ['#f77f00', '#009e60', 'CIV', 'ivory coast', 'cote d ivoire'],
  ['#d52b1e', '#ffffff', 'SVK', 'slovakia'],
  ['#005da4', '#ffffff', 'SVN', 'slovenia'],
  ['#fcd116', '#d52b1e', 'PAR', 'paraguay'],
  ['#ffffff', '#003da5', 'SCG', 'serbia and montenegro']
]

const BY_NAME = new Map<string, { primary: string; secondary: string; code: string }>()
for (const [primary, secondary, code, ...aliases] of CLUBS) {
  for (const alias of aliases) BY_NAME.set(alias, { primary, secondary, code })
}

const CODE_STOP_WORDS = new Set([
  'fc', 'afc', 'cf', 'sc', 'ac', 'as', 'ss', 'ssc', 'us', 'rc', 'rcd', 'cd', 'ud', 'sd', 'sv', 'vfb',
  'vfl', 'tsv', 'fsv', 'bv', 'club', 'de', 'del', 'la', 'of', 'the', 'and', '1'
])

export function footballTeamCode(name: string, shortName?: string | null): string {
  const known = BY_NAME.get(normalizeFootballName(name))
  if (known) return known.code
  if (shortName && shortName.length <= 4) return shortName.toUpperCase()
  const words = normalizeFootballName(name).split(' ').filter((word) => word && !CODE_STOP_WORDS.has(word))
  if (!words.length) return name.slice(0, 3).toUpperCase()
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return (words[0][0] + words[1].slice(0, 2)).toUpperCase()
}

function luminance(hex: string): number {
  const value = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((offset) => {
    const channel = parseInt(value.slice(offset, offset + 2), 16) / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function hslHex(hue: number, saturation: number, light: number): string {
  const a = saturation * Math.min(light, 1 - light)
  const channel = (n: number): string => {
    const k = (n + hue / 30) % 12
    const value = light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(value * 255).toString(16).padStart(2, '0')
  }
  return `#${channel(0)}${channel(8)}${channel(4)}`
}

export interface FootballTeamColors {
  primary: string
  secondary: string
  /** Readable text colour on the primary fill. */
  ink: string
}

/**
 * Club colours: stored colours first (from licensed reference data), then the curated
 * map, then a stable colour pair derived from the name so every club stays recognisable.
 */
export function footballTeamColors(
  name: string,
  stored?: { primary: string | null; secondary: string | null } | null
): FootballTeamColors {
  const known = BY_NAME.get(normalizeFootballName(name))
  let primary = stored?.primary ?? known?.primary
  let secondary = stored?.secondary ?? known?.secondary
  if (!primary) {
    const hue = [...normalizeFootballName(name)].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) % 360, 7)
    primary = hslHex(hue, 0.55, 0.38)
    secondary ??= hslHex((hue + 40) % 360, 0.6, 0.72)
  }
  secondary ??= '#ffffff'
  const light = luminance(primary) > 0.45
  const secondaryLight = luminance(secondary) > 0.45
  const ink = light ? (secondaryLight ? '#111827' : secondary) : secondaryLight ? secondary : '#ffffff'
  return { primary, secondary, ink }
}
