import { createReadStream } from 'fs'
import { mkdtemp, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { createInterface } from 'readline'
import { createGunzip } from 'zlib'
import { getSqlite } from '../db/connection'
import { fetchWithRetry } from '../http'
import { streamResponseToFile } from '../streamDownload'
import * as repo from '../repos/footballRepo'
import { footballCoreName, normalizeFootballName } from '@shared/football'
import type { FootballCompetitionKey } from '@shared/types'

// Transfermarkt detail from dcaribou/transfermarkt-datasets (CC0, 2012 onward): lineups,
// goals with assists, cards, substitutions, shoot-outs, match facts, player facts and
// transfers. Games attach only to matches already in the archive; the archive's own
// results stay authoritative.

export const TRANSFERMARKT_BASE = 'https://pub-e682421888d945d684bcae8890b0ec20.r2.dev/data'

export const TRANSFERMARKT_COMPETITIONS: Record<string, FootballCompetitionKey> = {
  GB1: 'premier-league',
  ES1: 'la-liga',
  IT1: 'serie-a',
  L1: 'bundesliga',
  CL: 'champions-league',
  EL: 'europa-league',
  UCOL: 'conference-league',
  FIWC: 'world-cup',
  EURO: 'euros'
}

const TOURNAMENTS = new Set<FootballCompetitionKey>(['world-cup', 'euros'])
const MAX_TRANSFERMARKT_FILE = 256 * 1024 * 1024

/**
 * One quoted CSV line (the dataset never splits a record across lines). Fields are sliced
 * rather than built a character at a time: a million retained lineup rows of per-character
 * string chains ran the app out of memory.
 */
export function csvFields(line: string): string[] {
  const fields: string[] = []
  let i = 0
  while (i <= line.length) {
    if (line[i] === '"') {
      let value = ''
      let start = i + 1
      for (;;) {
        const quote = line.indexOf('"', start)
        if (quote < 0) {
          value += line.slice(start)
          i = line.length
          break
        }
        if (line[quote + 1] === '"') {
          value += line.slice(start, quote + 1)
          start = quote + 2
          continue
        }
        value += line.slice(start, quote)
        i = quote + 1
        break
      }
      fields.push(value)
      const comma = line.indexOf(',', i)
      i = comma < 0 ? line.length + 1 : comma + 1
    } else {
      const comma = line.indexOf(',', i)
      const end = comma < 0 ? line.length : comma
      fields.push(line.slice(i, end))
      i = end + 1
    }
  }
  return fields
}

/** A standalone copy, so a kept value does not pin the whole CSV line it was sliced from. */
function own(value: string): string {
  return (' ' + value).slice(1)
}

export function tmSeasonKey(key: FootballCompetitionKey, season: string, date: string): string {
  if (TOURNAMENTS.has(key)) return date.slice(0, 4)
  const start = Number(season)
  return `${start}/${String(start + 1).slice(-2)}`
}

function integer(value: string | undefined): number | null {
  const parsed = Number(value)
  return value && Number.isFinite(parsed) ? Math.round(parsed) : null
}

function text(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? own(trimmed) : null
}

export interface TmGame {
  gameId: string
  competitionKey: FootballCompetitionKey
  seasonKey: string
  date: string
  homeClubId: string
  awayClubId: string
  homeName: string
  awayName: string
  homeGoals: number | null
  awayGoals: number | null
  stadium: string | null
  attendance: number | null
  referee: string | null
  homeFormation: string | null
  awayFormation: string | null
  homeManager: string | null
  awayManager: string | null
}

export function tmGameFromRow(row: Record<string, string>): TmGame | null {
  const competitionKey = TRANSFERMARKT_COMPETITIONS[row.competition_id]
  const date = row.date?.slice(0, 10)
  if (!competitionKey || !/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') || !row.game_id) return null
  return {
    gameId: own(row.game_id),
    competitionKey,
    seasonKey: tmSeasonKey(competitionKey, row.season, date),
    date,
    homeClubId: own(row.home_club_id),
    awayClubId: own(row.away_club_id),
    homeName: text(row.home_club_name) ?? '',
    awayName: text(row.away_club_name) ?? '',
    homeGoals: integer(row.home_club_goals),
    awayGoals: integer(row.away_club_goals),
    stadium: text(row.stadium),
    attendance: integer(row.attendance),
    referee: text(row.referee),
    homeFormation: text(row.home_club_formation),
    awayFormation: text(row.away_club_formation),
    homeManager: text(row.home_club_manager_name),
    awayManager: text(row.away_club_manager_name)
  }
}

export type TmEventType = 'goal' | 'card' | 'substitution' | 'shootout'

export interface TmEvent {
  gameId: string
  minute: number | null
  type: TmEventType
  clubId: string
  playerId: string | null
  relatedPlayerId: string | null
  detail: string | null
  ownGoal: boolean
  penalty: boolean
}

export function tmEventFromRow(row: Record<string, string>): TmEvent | null {
  const description = row.description ?? ''
  const base = {
    gameId: own(row.game_id),
    minute: integer(row.minute),
    clubId: own(row.club_id),
    playerId: text(row.player_id),
    ownGoal: false,
    penalty: false
  }
  if (row.type === 'Goals') {
    return {
      ...base,
      type: 'goal',
      relatedPlayerId: text(row.player_assist_id),
      detail: null,
      ownGoal: /own-goal/i.test(description),
      penalty: /^,?\s*penalty\b/i.test(description.replace(/^\s*\d+\.\s*/, ''))
    }
  }
  if (row.type === 'Cards') {
    const detail = /second yellow/i.test(description) ? 'Second yellow' : /red card/i.test(description) ? 'Red card' : 'Yellow card'
    return { ...base, type: 'card', relatedPlayerId: null, detail }
  }
  if (row.type === 'Substitutions') {
    const reason = text(description.replace(/^[\s,]+/, '').replace(/\s*,?\s*not reported$/i, ''))
    return { ...base, type: 'substitution', relatedPlayerId: text(row.player_in_id), detail: reason }
  }
  if (row.type === 'Shootout') {
    const outcome = /saved/i.test(description) ? 'Saved' : /missed/i.test(description) ? 'Missed' : 'Scored'
    return { ...base, type: 'shootout', relatedPlayerId: null, detail: outcome }
  }
  return null
}

export interface TmLineup {
  gameId: string
  playerId: string
  playerName: string
  clubId: string
  starter: boolean
  position: string | null
  shirt: number | null
  captain: boolean
}

export function tmLineupFromRow(row: Record<string, string>): TmLineup | null {
  if (!row.game_id || !row.player_id || !row.club_id) return null
  return {
    gameId: own(row.game_id),
    playerId: own(row.player_id),
    playerName: text(row.player_name) ?? '',
    clubId: own(row.club_id),
    starter: row.type === 'starting_lineup',
    position: text(row.position),
    shirt: integer(row.number),
    captain: row.team_captain === '1'
  }
}

export interface ArchiveMatch {
  id: number
  date: string
  homeTeamId: number
  awayTeamId: number
  homeName: string
  awayName: string
  homeScore: number | null
  awayScore: number | null
}

function dayGap(a: string, b: string): number {
  return Math.abs(Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86_400_000
}

/**
 * Learns which archive team each Transfermarkt club is from games that line up on
 * date and score (a name match counts extra), then links each game to the archive
 * match between the two mapped teams within two days. Clubs never pinned stay unmapped.
 */
export function linkTmGames(
  games: TmGame[],
  archive: (competitionKey: FootballCompetitionKey, seasonKey: string) => ArchiveMatch[]
): { matchByGame: Map<string, number>; teamByClub: Map<string, number> } {
  const votes = new Map<string, Map<number, number>>()
  const vote = (clubId: string, teamId: number, weight: number) => {
    const byTeam = votes.get(clubId) ?? new Map<number, number>()
    byTeam.set(teamId, (byTeam.get(teamId) ?? 0) + weight)
    votes.set(clubId, byTeam)
  }
  const pools = new Map<string, ArchiveMatch[]>()
  const pool = (game: TmGame): ArchiveMatch[] => {
    const key = `${game.competitionKey}|${game.seasonKey}`
    if (!pools.has(key)) pools.set(key, archive(game.competitionKey, game.seasonKey))
    return pools.get(key)!
  }
  for (const game of games) {
    const candidates = pool(game).filter((match) =>
      dayGap(match.date, game.date) <= 1 && match.homeScore === game.homeGoals && match.awayScore === game.awayGoals
    )
    for (const match of candidates) {
      const homeName = footballCoreName(game.homeName, 'team') === footballCoreName(match.homeName, 'team') ? 4 : 0
      const awayName = footballCoreName(game.awayName, 'team') === footballCoreName(match.awayName, 'team') ? 4 : 0
      const weight = 1 / candidates.length
      vote(game.homeClubId, match.homeTeamId, weight + homeName)
      vote(game.awayClubId, match.awayTeamId, weight + awayName)
    }
  }
  const teamByClub = new Map<string, number>()
  const claimed = new Map<number, { clubId: string; score: number }>()
  for (const [clubId, byTeam] of votes) {
    const total = [...byTeam.values()].reduce((sum, value) => sum + value, 0)
    const [teamId, score] = [...byTeam].sort((a, b) => b[1] - a[1])[0]
    if (score < 2 || score / total < 0.6) continue
    const holder = claimed.get(teamId)
    if (holder && holder.score >= score) continue
    if (holder) teamByClub.delete(holder.clubId)
    claimed.set(teamId, { clubId, score })
    teamByClub.set(clubId, teamId)
  }
  const matchByGame = new Map<string, number>()
  const used = new Set<number>()
  for (const game of games) {
    const home = teamByClub.get(game.homeClubId)
    const away = teamByClub.get(game.awayClubId)
    if (home == null || away == null) continue
    const found = pool(game).filter((match) =>
      match.homeTeamId === home && match.awayTeamId === away && dayGap(match.date, game.date) <= 2 && !used.has(match.id)
    )
    if (found.length !== 1) continue
    matchByGame.set(game.gameId, found[0].id)
    used.add(found[0].id)
  }
  return { matchByGame, teamByClub }
}

/** Transfermarkt fees are decimals in euros; zero means a free or undisclosed move. */
export function tmFee(value: string | undefined): number | null {
  const parsed = Number(value)
  return value && Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null
}

async function download(file: string, dir: string, signal: AbortSignal): Promise<string> {
  const response = await fetchWithRetry(`${TRANSFERMARKT_BASE}/${file}`, { timeoutMs: 300_000, taskSignal: signal })
  if (!response.ok) throw new Error(`Transfermarkt dataset returned HTTP ${response.status} for ${file}`)
  const destination = join(dir, file)
  await streamResponseToFile(response, destination, { label: `Transfermarkt ${file}`, maxInputBytes: MAX_TRANSFERMARKT_FILE })
  return destination
}

/** Streams a gzipped CSV, handing each record to `onRow` as a header-keyed object. */
async function eachRow(path: string, onRow: (row: Record<string, string>) => void): Promise<void> {
  const lines = createInterface({ input: createReadStream(path).pipe(createGunzip()), crlfDelay: Infinity })
  let header: string[] | null = null
  for await (const line of lines) {
    if (!line) continue
    const fields = csvFields(line)
    if (!header) {
      header = fields
      continue
    }
    const row: Record<string, string> = {}
    header.forEach((name, index) => { row[name] = fields[index] ?? '' })
    onRow(row)
  }
}

export interface TransfermarktProgress {
  (message: string, done?: number, total?: number): Promise<void>
}

function archiveMatches(competitionKey: FootballCompetitionKey, seasonKey: string): ArchiveMatch[] {
  return getSqlite().prepare(`
    SELECT m.id, m.match_date AS date, m.home_team_id AS homeTeamId, m.away_team_id AS awayTeamId,
      ht.name AS homeName, at.name AS awayName, m.home_score AS homeScore, m.away_score AS awayScore
    FROM football_match m
    JOIN football_season s ON s.id=m.season_id
    JOIN football_competition c ON c.id=s.competition_id
    JOIN football_team ht ON ht.id=m.home_team_id
    JOIN football_team at ON at.id=m.away_team_id
    WHERE c.key=? AND s.key=?
  `).all(competitionKey, seasonKey) as ArchiveMatch[]
}

export interface TransfermarktPlayer {
  name: string
  birthDate: string | null
  position: string | null
  foot: string | null
  heightCm: number | null
  nationality: string | null
}

/** The archive person for a Transfermarkt player: by source id, else one same-team same-name person, else new. */
function personFor(playerId: string, player: TransfermarktPlayer | undefined, fallbackName: string, teamId: number | null, date: string): number | null {
  const db = getSqlite()
  const existing = repo.cachedStatement(`SELECT entity_id FROM football_source_ref
    WHERE entity_kind='person' AND source='transfermarkt' AND external_id=?`).get(playerId) as { entity_id: number } | undefined
  const name = player?.name || fallbackName
  if (existing == null && !name) return null
  let id = existing?.entity_id
  if (id == null) {
    const normalized = normalizeFootballName(name)
    const sameTeam = teamId == null ? [] : repo.sameTeamPersonIds(normalized, teamId, date)
    if (sameTeam.length === 1) id = sameTeam[0]
    else {
      const others = repo.cachedStatement(`SELECT DISTINCT entity_id AS id FROM football_alias
        WHERE entity_kind='person' AND normalized=?`).all(normalized) as { id: number }[]
      id = Number(repo.cachedStatement(`INSERT INTO football_person (name,role) VALUES (?,'player')`).run(name).lastInsertRowid)
      if (others.length) {
        repo.cachedStatement(`INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
          VALUES ('person',?,'identity','transfermarkt',?,'archive',?)`).run(id, name, `Possible matches: ${others.map((row) => row.id).join(',')}`)
      }
    }
    repo.cachedStatement(`INSERT OR IGNORE INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id)
      VALUES ('person',?,'transfermarkt',?,?,?)`).run(id, name, normalizeFootballName(name), playerId)
    repo.cachedStatement(`INSERT OR IGNORE INTO football_source_ref (entity_kind,entity_id,source,external_id,fetched_at)
      VALUES ('person',?,'transfermarkt',?,datetime('now'))`).run(id, playerId)
  }
  if (player) {
    repo.cachedStatement(`UPDATE football_person SET birth_date=COALESCE(birth_date,?),position=COALESCE(position,?),
      foot=COALESCE(foot,?),height_cm=COALESCE(height_cm,?),nationality=COALESCE(nationality,?)
      WHERE id=?`).run(player.birthDate, player.position, player.foot, player.heightCm, player.nationality, id)
  }
  return id
}

export interface TransfermarktResult {
  games: number
  linked: number
  lineups: number
  goalTimelines: number
  transfers: number
}

/**
 * Downloads the dataset tables, links games to archive matches and writes their detail.
 * Temporary files are removed afterwards whatever happens.
 */
export async function installTransfermarkt(
  signal: AbortSignal,
  progress: TransfermarktProgress,
  competitionKeys?: FootballCompetitionKey[]
): Promise<TransfermarktResult> {
  const wanted = new Set(competitionKeys?.length ? competitionKeys : Object.values(TRANSFERMARKT_COMPETITIONS))
  const dir = await mkdtemp(join(tmpdir(), 'navihub-transfermarkt-'))
  try {
    await progress('Downloading Transfermarkt games and players')
    const [gamesFile, playersFile] = await Promise.all([download('games.csv.gz', dir, signal), download('players.csv.gz', dir, signal)])
    const games: TmGame[] = []
    await eachRow(gamesFile, (row) => {
      const game = tmGameFromRow(row)
      if (game && wanted.has(game.competitionKey)) games.push(game)
    })
    const { matchByGame, teamByClub } = linkTmGames(games, archiveMatches)
    await progress(`Linked ${matchByGame.size} of ${games.length} Transfermarkt games`)

    const players = new Map<string, TransfermarktPlayer>()
    await eachRow(playersFile, (row) => {
      players.set(own(row.player_id), {
        name: text(row.name) ?? '',
        birthDate: row.date_of_birth ? own(row.date_of_birth.slice(0, 10)) : null,
        position: text(row.sub_position) ?? text(row.position),
        foot: text(row.foot),
        heightCm: integer(row.height_in_cm),
        nationality: text(row.country_of_citizenship)
      })
    })

    await progress('Downloading Transfermarkt lineups and match events')
    const [lineupsFile, eventsFile] = await Promise.all([
      download('game_lineups.csv.gz', dir, signal),
      download('game_events.csv.gz', dir, signal)
    ])
    const lineups = new Map<string, TmLineup[]>()
    await eachRow(lineupsFile, (row) => {
      if (!matchByGame.has(row.game_id)) return
      const lineup = tmLineupFromRow(row)
      if (!lineup) return
      // Some players have no profile row; their lineup name is the only one there is.
      if (!players.has(lineup.playerId) && lineup.playerName) {
        players.set(lineup.playerId, { name: lineup.playerName, birthDate: null, position: null, foot: null, heightCm: null, nationality: null })
      }
      const list = lineups.get(lineup.gameId)
      if (list) list.push(lineup)
      else lineups.set(lineup.gameId, [lineup])
    })
    const events = new Map<string, TmEvent[]>()
    await eachRow(eventsFile, (row) => {
      if (!matchByGame.has(row.game_id)) return
      const event = tmEventFromRow(row)
      if (!event) return
      const list = events.get(event.gameId)
      if (list) list.push(event)
      else events.set(event.gameId, [event])
    })

    const db = getSqlite()
    const result: TransfermarktResult = { games: games.length, linked: matchByGame.size, lineups: 0, goalTimelines: 0, transfers: 0 }
    db.transaction(() => {
      const teamAlias = repo.cachedStatement(`INSERT OR IGNORE INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id)
        VALUES ('team',?,'transfermarkt',?,?,?)`)
      const teamRef = repo.cachedStatement(`INSERT OR IGNORE INTO football_source_ref (entity_kind,entity_id,source,external_id,fetched_at)
        VALUES ('team',?,'transfermarkt',?,datetime('now'))`)
      const names = new Map(games.flatMap((game) => [[game.homeClubId, game.homeName], [game.awayClubId, game.awayName]] as const))
      for (const [clubId, teamId] of teamByClub) {
        const name = names.get(clubId) ?? clubId
        teamAlias.run(teamId, name, normalizeFootballName(name), clubId)
        teamRef.run(teamId, clubId)
      }
    })()

    const byGame = new Map(games.map((game) => [game.gameId, game]))
    const linkedGames = [...matchByGame]
    for (let index = 0; index < linkedGames.length; index += 250) {
      if (signal.aborted) throw signal.reason ?? new Error('Cancelled')
      await progress('Writing Transfermarkt match detail', index, linkedGames.length)
      db.transaction(() => {
        for (const [gameId, matchId] of linkedGames.slice(index, index + 250)) {
          const game = byGame.get(gameId)!
          const written = writeTransfermarktGame(game, matchId, teamByClub, players, lineups.get(gameId) ?? [], events.get(gameId) ?? [])
          if (written.lineups) result.lineups++
          if (written.goals) result.goalTimelines++
        }
      })()
    }

    await progress('Downloading Transfermarkt transfers')
    const transfersFile = await download('transfers.csv.gz', dir, signal)
    const known = new Map((repo.cachedStatement(`SELECT external_id AS playerId, entity_id AS personId FROM football_source_ref
      WHERE entity_kind='person' AND source='transfermarkt'`).all() as Array<{ playerId: string; personId: number }>)
      .map((row) => [row.playerId, row.personId]))
    const today = new Date().toISOString().slice(0, 10)
    const transfers: Array<Record<string, string>> = []
    await eachRow(transfersFile, (row) => {
      if (known.has(row.player_id) && row.transfer_date && row.transfer_date.slice(0, 10) <= today) transfers.push(row)
    })
    db.transaction(() => {
      const insert = repo.cachedStatement(`INSERT INTO football_transfer
        (person_id,transfer_date,season,from_team_id,to_team_id,from_team,to_team,fee,market_value,source,external_id)
        VALUES (?,?,?,?,?,?,?,?,?,'transfermarkt',?)
        ON CONFLICT(source,external_id) DO UPDATE SET person_id=excluded.person_id,
          from_team_id=excluded.from_team_id,to_team_id=excluded.to_team_id,fee=excluded.fee,
          market_value=excluded.market_value`)
      for (const row of transfers) {
        const date = row.transfer_date.slice(0, 10)
        insert.run(
          known.get(row.player_id),
          date,
          text(row.transfer_season),
          teamByClub.get(row.from_club_id) ?? null,
          teamByClub.get(row.to_club_id) ?? null,
          text(row.from_club_name) ?? 'Unknown',
          text(row.to_club_name) ?? 'Unknown',
          tmFee(row.transfer_fee),
          tmFee(row.market_value_in_eur),
          `${row.player_id}:${date}:${row.from_club_id}:${row.to_club_id}`
        )
        result.transfers++
      }
    })()
    writeCoverage(games, matchByGame, result)
    return result
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

/** Writes one linked game's detail into its archive match. Exported for tests. */
export function writeTransfermarktGame(
  game: TmGame,
  matchId: number,
  teamByClub: Map<string, number>,
  players: Map<string, TransfermarktPlayer>,
  lineups: TmLineup[],
  events: TmEvent[]
): { lineups: boolean; goals: boolean } {
  const db = getSqlite()
  repo.cachedStatement(`UPDATE football_match SET venue=COALESCE(venue,?),attendance=COALESCE(attendance,?),
    referee=COALESCE(referee,?),home_formation=?,away_formation=?,home_manager=?,away_manager=?,
    updated_at=datetime('now') WHERE id=?`).run(
    game.stadium, game.attendance, game.referee,
    game.homeFormation, game.awayFormation, game.homeManager, game.awayManager, matchId
  )
  repo.cachedStatement(`INSERT OR IGNORE INTO football_source_ref (entity_kind,entity_id,source,external_id,source_url,fetched_at)
    VALUES ('match',?,'transfermarkt',?,?,datetime('now'))`).run(matchId, game.gameId, `https://www.transfermarkt.co.uk/spielbericht/index/spielbericht/${game.gameId}`)
  const person = (playerId: string | null, name = '', clubId?: string): number | null =>
    playerId ? personFor(playerId, players.get(playerId), name, clubId ? teamByClub.get(clubId) ?? null : null, game.date) : null

  let wroteLineups = false
  const starters = (clubId: string) => lineups.filter((entry) => entry.clubId === clubId && entry.starter).length
  if (lineups.length && starters(game.homeClubId) >= 11 && starters(game.awayClubId) >= 11) {
    repo.cachedStatement(`DELETE FROM football_lineup WHERE match_id=?`).run(matchId)
    const insert = repo.cachedStatement(`INSERT OR IGNORE INTO football_lineup
      (match_id,team_id,person_id,role,starter,shirt,position,captain,sort_order)
      VALUES (?,?,?,'player',?,?,?,?,?)`)
    lineups.forEach((entry, index) => {
      const teamId = teamByClub.get(entry.clubId)
      if (teamId == null) return
      insert.run(matchId, teamId, person(entry.playerId, entry.playerName, entry.clubId), entry.starter ? 1 : 0,
        entry.shirt, entry.position, entry.captain ? 1 : 0, index)
    })
    repo.cachedStatement(`UPDATE football_match SET lineup_coverage='complete' WHERE id=?`).run(matchId)
    wroteLineups = true
  }

  const archive = repo.cachedStatement(`SELECT home_team_id AS home, away_team_id AS away, home_score AS homeScore,
    away_score AS awayScore FROM football_match WHERE id=?`).get(matchId) as { home: number; away: number; homeScore: number | null; awayScore: number | null }
  const goals = events.filter((event) => event.type === 'goal')
  const tally = (teamId: number) => goals.filter((event) => teamByClub.get(event.clubId) === teamId).length
  const goalsAgree = goals.length > 0 && tally(archive.home) === archive.homeScore && tally(archive.away) === archive.awayScore
  const insertEvent = repo.cachedStatement(`INSERT INTO football_event
    (match_id,team_id,person_id,related_person_id,type,detail,minute,own_goal,penalty,sort_order)
    VALUES (?,?,?,?,?,?,?,?,?,?)`)
  const ordered = [...events].sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0))
  if (goalsAgree) {
    repo.cachedStatement(`DELETE FROM football_event WHERE match_id=? AND type='goal'`).run(matchId)
    ordered.filter((event) => event.type === 'goal').forEach((event, index) => {
      // An own goal is credited to the team it counts for, but scored by an opponent.
      const scorerClub = event.ownGoal ? (event.clubId === game.homeClubId ? game.awayClubId : game.homeClubId) : event.clubId
      insertEvent.run(matchId, teamByClub.get(event.clubId) ?? null, person(event.playerId, '', scorerClub),
        person(event.relatedPlayerId, '', event.clubId), 'goal', event.ownGoal ? 'Own goal' : event.penalty ? 'Penalty' : null,
        event.minute, event.ownGoal ? 1 : 0, event.penalty ? 1 : 0, index)
    })
    repo.cachedStatement(`UPDATE football_match SET event_coverage='complete' WHERE id=?`).run(matchId)
  }
  // A release without these events for the game leaves the stored ones in place.
  const others = ordered.filter((event) => event.type !== 'goal')
  if (others.length) repo.cachedStatement(`DELETE FROM football_event WHERE match_id=? AND type IN ('card','substitution','shootout')`).run(matchId)
  others.forEach((event, index) => {
    insertEvent.run(matchId, teamByClub.get(event.clubId) ?? null, person(event.playerId, '', event.clubId),
      person(event.relatedPlayerId, '', event.clubId), event.type, event.detail, event.minute, 0, 0, 1000 + index)
  })
  return { lineups: wroteLineups, goals: goalsAgree }
}

function writeCoverage(games: TmGame[], matchByGame: Map<string, number>, result: TransfermarktResult): void {
  const db = getSqlite()
  const seasons = new Map<string, { key: FootballCompetitionKey; season: string; total: number; linked: number }>()
  for (const game of games) {
    const id = `${game.competitionKey}|${game.seasonKey}`
    const entry = seasons.get(id) ?? { key: game.competitionKey, season: game.seasonKey, total: 0, linked: 0 }
    entry.total++
    if (matchByGame.has(game.gameId)) entry.linked++
    seasons.set(id, entry)
  }
  const insert = repo.cachedStatement(`INSERT INTO football_coverage
    (competition_id,season_id,source,facet,state,item_count,expected_count,note,checked_at)
    SELECT c.id,s.id,'transfermarkt','lineups',?,?,?,?,datetime('now')
    FROM football_season s JOIN football_competition c ON c.id=s.competition_id WHERE c.key=? AND s.key=?
    ON CONFLICT(competition_id,season_id,source,facet) DO UPDATE SET state=excluded.state,
      item_count=excluded.item_count,expected_count=excluded.expected_count,note=excluded.note,checked_at=excluded.checked_at`)
  db.transaction(() => {
    for (const entry of seasons.values()) {
      insert.run(entry.linked === entry.total ? 'complete' : 'partial', entry.linked, entry.total,
        `${entry.linked} of ${entry.total} Transfermarkt games linked; ${result.transfers} transfers in this install`, entry.key, entry.season)
    }
  })()
}
