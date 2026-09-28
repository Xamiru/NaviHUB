import { readFileSync, readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { qk } from '../src/renderer/src/lib/queryKeys'
import {
  footballFateLabel,
  footballTeamCode,
  footballTeamColors
} from '../src/shared/footballIdentity'
import {
  footballForm,
  footballGoalBuckets,
  footballPitchLayout,
  footballRollOfHonour
} from '../src/shared/footballInsights'
import type { FootballMatchSummary, FootballSeason, FootballTeamSummary } from '../src/shared/types'

const read = (path: string) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8')

describe('Football system contracts', () => {
  it('uses one query-key prefix for every Football surface', () => {
    const keys = [
      qk.football.overview,
      qk.football.competitions,
      qk.football.competition('world-cup'),
      qk.football.seasons('euros'),
      qk.football.season(1),
      qk.football.teams({ limit: 1 }),
      qk.football.team(1),
      qk.football.people({ limit: 1 }),
      qk.football.person(1),
      qk.football.matches({ limit: 1 }),
      qk.football.match(1),
      qk.football.current('premier-league'),
      qk.football.search('100%'),
      qk.football.media(),
      qk.football.mediaFor('match', 1),
      qk.football.sync,
      qk.football.syncStatus
    ]
    expect(keys.every((key) => key[0] === qk.football.all[0])).toBe(true)
  })

  it('settles tasks, cancels Football and only then closes databases', () => {
    const source = read('../src/main/index.ts')
    const settle = source.indexOf('settleAllTasksOnQuit()')
    const football = source.indexOf('cancelActiveFootballSync()', settle)
    const close = source.indexOf('closeDatabase()', settle)
    expect(settle).toBeGreaterThan(-1)
    expect(football).toBeGreaterThan(settle)
    expect(close).toBeGreaterThan(football)
  })

  it('adds no Football push channel or interval', () => {
    const root = fileURLToPath(new URL('../src/main/football', import.meta.url))
    const source = readdirSync(root).filter((name) => name.endsWith('.ts'))
      .map((name) => readFileSync(join(root, name), 'utf8')).join('\n')
    expect(source).not.toMatch(/webContents\.send|ipcRenderer\.on|setInterval\s*\(/)
  })

  it('keeps the API key in the provider header and out of URLs', () => {
    const source = read('../src/main/football/sync.ts')
    expect(source).toContain("headers: { 'x-apisports-key': key }")
    expect(source).not.toMatch(/API_BASE[^\n]*api[_-]?key/i)
  })

  it('derives form, rolls of honour, goal buckets and pitch lines from stored records', () => {
    const team = (id: number, name: string): FootballTeamSummary => ({
      id, name, shortName: null, country: null, isNational: false, imagePath: null, colors: null, favorite: false
    })
    const [a, b] = [team(1, 'Arsenal'), team(2, 'Chelsea')]
    const match = (id: number, date: string, home: number, away: number) =>
      ({ id, matchDate: date, home: a, away: b, homeScore: home, awayScore: away }) as FootballMatchSummary
    expect(footballForm([match(2, '2024-02-01', 0, 1), match(1, '2024-01-01', 2, 2), match(3, '2024-03-01', 3, 0)], 2))
      .toEqual(['D', 'W', 'L'])

    const season = (key: string, champion: FootballTeamSummary) => ({ key, label: key, champion }) as FootballSeason
    expect(footballRollOfHonour([season('2001/02', a), season('2004/05', b), season('2003/04', a)]).map((row) => [row.team.name, row.titles, row.first, row.last]))
      .toEqual([['Arsenal', 2, '2001/02', '2003/04'], ['Chelsea', 1, '2004/05', '2004/05']])

    expect(footballGoalBuckets([
      { seasonId: 1, seasonLabel: '2005/06', competitionKey: 'premier-league', goals: 27 },
      { seasonId: 2, seasonLabel: '2006', competitionKey: 'world-cup', goals: 3 }
    ])).toEqual([{ season: '2005/06', total: 30, parts: [
      { competitionKey: 'premier-league', goals: 27 },
      { competitionKey: 'world-cup', goals: 3 }
    ] }])

    const spots = footballPitchLayout([
      { position: 'Goalkeeper' }, { position: 'Left Defensive Midfield' }, { position: 'Right Back' }
    ], 'home')!
    expect(spots.map((spot) => [spot.entry.position, spot.x])).toEqual([
      ['Goalkeeper', 6], ['Left Defensive Midfield', 25], ['Right Back', 17]
    ])
    expect(footballPitchLayout([{ position: 'Goalkeeper' }, { position: null }], 'away')).toBeNull()
  })

  it('names clubs and eras with readable colours and codes', () => {
    expect(footballTeamCode('Manchester United')).toBe('MUN')
    expect(footballTeamCode('Accrington FC')).toBe('ACC')
    expect(footballTeamCode('Nottingham Forest')).toBe('NFO')
    expect(footballTeamColors('Tottenham Hotspur').ink).toBe('#132257')
    const unknown = footballTeamColors('Leeds City')
    expect(footballTeamColors('Leeds City')).toEqual(unknown)
    expect(unknown.primary).toMatch(/^#[0-9a-f]{6}$/)
    expect(footballFateLabel('champions-league', '1990/91')).toBe('European Cup')
    expect(footballFateLabel('europa-league', '2008/09')).toBe('Europa League')
    expect(footballFateLabel('europa-league', '2007/08')).toBe('UEFA Cup')
  })
})
