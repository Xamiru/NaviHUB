import { describe, expect, it } from 'vitest'
import {
  assertBoundedArchive,
  attachInternationalScorers,
  buildFootballLedger,
  footballPointsForWin,
  parseApiFootballEvents,
  parseApiFootballFixture,
  parseApiFootballLineups,
  parseEngsoccerCsv,
  parseInternationalResultsCsv,
  parseInternationalScorersCsv,
  parseOpenFootballJson,
  parseOpenFootballTxt,
  parseStatsBombCompetitionSeasons,
  parseStatsBombEvents,
  parseStatsBombLineups,
  parseStatsBombMatches,
  parseWyscoutEvents,
  parseWyscoutPack
} from '../src/main/football/sources'
import {
  parseWikimediaHonours,
  wikimediaHonoursComplete,
  wikimediaPlainText
} from '../src/main/football/wikimedia'
import { FOOTBALL_WIKIMEDIA_MANIFEST } from '../src/shared/football'
import {
  escapeFootballLike,
  validateFootballExternalLink,
  validateFootballRelativePath
} from '../src/shared/football'

describe('Football source adapters', () => {
  it('adapts heterogeneous engsoccer headers and filters England to tier one', () => {
    const rows = parseEngsoccerCsv({
      text: 'Season,Date,tier,home,visitor,hgoal,vgoal\n1992,15/08/1992,1,Arsenal,Norwich,2,4\n1992,15/08/1992,2,Bristol Rovers,Wigan,1,0\n',
      competitionKey: 'premier-league',
      sourceUrl: 'fixture.csv',
      fingerprint: 'abc',
      tierOneOnly: true
    })
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      date: '1992-08-15', seasonKey: '1992/93', homeScore: 2, awayScore: 4
    })
    expect(() => parseEngsoccerCsv({
      text: 'when,club_a,club_b\n1992,x,y\n',
      competitionKey: 'la-liga', sourceUrl: 'x', fingerprint: 'x'
    })).toThrow(/header missing/i)
  })

  it('parses OpenFootball JSON score variants and never treats absent scorers as nil goals', () => {
    const rows = parseOpenFootballJson({
      text: JSON.stringify({ rounds: [{ name: 'Final', matches: [{ date: '2024-06-01', team1: 'A', team2: 'B', score: { ft: [2, 1], pen: [5, 4] } }] }] }),
      competitionKey: 'champions-league', seasonKey: '2023/24', sourceUrl: 'x', fingerprint: 'r1'
    })
    expect(rows[0]).toMatchObject({ homeScore: 2, awayScore: 1, homePenalties: 5, awayPenalties: 4, goals: null })
  })

  it('keeps engsoccer half-time, extra-time and shootout phases distinct', () => {
    const rows = parseEngsoccerCsv({
      text: 'Season,Date,round,home,visitor,FT,HT,aet,pens,hgoal,vgoal,tothgoal,totvgoal\n2015,28/05/2016,final,A,B,1-1,0-0,true,5-4,1,1,2,2\n',
      competitionKey: 'champions-league',
      sourceUrl: 'fixture.csv',
      fingerprint: 'phases'
    })
    expect(rows[0]).toMatchObject({
      seasonKey: '2015/16',
      stage: 'final',
      homeScore: 2,
      awayScore: 2,
      homeHalfTime: 0,
      awayHalfTime: 0,
      homeExtraTime: 2,
      awayExtraTime: 2,
      homePenalties: 5,
      awayPenalties: 4
    })
  })

  it('parses Football.TXT stoppage time, own goals, penalties and shootouts', () => {
    const rows = parseOpenFootballTxt({
      text: '= Final\n2024-05-22\nAtalanta v Leverkusen 3-0 (pens 5-4)\n(Lookman 12\', Lookman 45+2\' (pen), Tah 70\' (og); )\n',
      competitionKey: 'europa-league', seasonKey: '2023/24', sourceUrl: 'x', fingerprint: 'r2'
    })
    expect(rows[0].goals).toEqual(expect.arrayContaining([
      expect.objectContaining({ minute: 45, extraMinute: 2, penalty: true }),
      expect.objectContaining({ ownGoal: true })
    ]))
    expect(rows[0]).toMatchObject({ homePenalties: 5, awayPenalties: 4 })
  })

  it('joins international scorers only to one exact date/home/away match', () => {
    const results = parseInternationalResultsCsv('date,home_team,away_team,home_score,away_score,tournament\n2022-12-18,Argentina,France,3,3,FIFA World Cup\n2022-12-18,Argentina,France,3,3,Friendly\n')
    const scorers = parseInternationalScorersCsv('date,home_team,away_team,team,scorer,minute,own_goal,penalty\n2022-12-18,Argentina,France,Argentina,Lionel Messi,23,false,true\n')
    expect(attachInternationalScorers(results, scorers).size).toBe(0)
    expect(attachInternationalScorers(results.slice(0, 1), scorers).get(0)?.[0]).toMatchObject({ scorer: 'Lionel Messi', penalty: true })
  })

  it('keeps API-Football score phases, source player ids and lineup roles', () => {
    const fixture = parseApiFootballFixture({
      fixture: { id: 7, date: '2026-05-30T19:00:00Z', status: { short: 'PEN' } },
      league: { season: 2025, round: 'Final' },
      teams: { home: { id: 1, name: 'A' }, away: { id: 2, name: 'B' } },
      goals: { home: 1, away: 1 },
      score: { halftime: { home: 0, away: 0 }, extratime: { home: 1, away: 1 }, penalty: { home: 5, away: 4 } }
    }, 'champions-league')
    expect(fixture).toMatchObject({
      status: 'finished', seasonKey: '2025/26', homeExtraTime: 1, homePenalties: 5
    })
    expect(parseApiFootballEvents([{ type: 'Goal', detail: 'Penalty', team: { id: 1 }, player: { id: 9, name: 'Player' }, time: { elapsed: 90, extra: 3 } }], '1')[0])
      .toMatchObject({ team: 'home', playerSourceId: '9', minute: 90, extraMinute: 3, penalty: true })
    const lineups = parseApiFootballLineups([{
      team: { id: 1 },
      coach: { id: 99, name: 'Manager' },
      startXI: [{ player: { id: 9, name: 'Player', number: 10, pos: 'F', captain: true } }],
      substitutes: []
    }])
    expect(lineups).toEqual(expect.arrayContaining([
      expect.objectContaining({ personSourceId: '99', role: 'manager', position: 'Head coach' }),
      expect.objectContaining({ personSourceId: '9', role: 'player', starter: true, captain: true })
    ]))
  })

  it('adapts StatsBomb competition, match, goal and lineup shapes', () => {
    const competitions = parseStatsBombCompetitionSeasons([{
      competition_id: 2,
      season_id: 44,
      competition_name: 'Premier League',
      season_name: '2003/2004',
      country_name: 'England',
      competition_gender: 'male'
    }])
    expect(competitions[0]).toMatchObject({ competitionId: 2, seasonId: 44, gender: 'male' })
    const matches = parseStatsBombMatches({
      raw: [{
        match_id: 7,
        match_date: '2004-05-15',
        home_team: { home_team_id: 1, home_team_name: 'Arsenal' },
        away_team: { away_team_id: 2, away_team_name: 'Leicester City' },
        home_score: 2,
        away_score: 1,
        competition_stage: { name: 'Regular Season' },
        match_week: 38
      }],
      competitionKey: 'premier-league',
      seasonKey: '2003/04',
      sourceUrl: 'statsbomb',
      fingerprint: 'sb'
    })
    expect(matches[0]).toMatchObject({ sourceId: '7', homeScore: 2, stage: 'Regular Season' })
    expect(parseStatsBombEvents([{
      type: { name: 'Shot' },
      team: { id: 1 },
      player: { id: 9, name: 'Player' },
      minute: 92,
      period: 2,
      shot: { outcome: { name: 'Goal' }, type: { name: 'Penalty' } }
    }], '1')[0]).toMatchObject({
      team: 'home', playerSourceId: '9', minute: 90, extraMinute: 2, penalty: true
    })
    expect(parseStatsBombLineups([{
      team_id: 1,
      lineup: [{
        player_id: 9,
        player_name: 'Player',
        jersey_number: 10,
        positions: [{ position: 'Center Forward', from: '00:00', start_reason: 'Starting XI' }]
      }]
    }])[0]).toMatchObject({ teamSourceId: '1', starter: true, shirt: 10 })
  })

  it('adapts the fixed Wyscout pack and preserves stoppage, penalty and own-goal facts', () => {
    const pack = parseWyscoutPack({
      teams: [{ wyId: 1, name: 'A' }, { wyId: 2, name: 'B' }],
      players: [{ wyId: 9, shortName: 'Player' }],
      matches: [{
        wyId: 77,
        dateutc: '2018-05-01 18:00:00',
        status: 'Played',
        duration: 'Penalities',
        roundID: 4,
        gameweek: 38,
        teamsData: {
          1: { side: 'home', teamId: 1, score: 1, scoreHT: 0, scoreET: 1, scoreP: 5, lineup: [{ playerId: 9, shirtNumber: 10 }], bench: [] },
          2: { side: 'away', teamId: 2, score: 1, scoreHT: 0, scoreET: 1, scoreP: 4, lineup: [], bench: [] }
        }
      }],
      competitionKey: 'premier-league',
      seasonKey: '2017/18',
      sourceUrl: 'wyscout',
      fingerprint: 'wy'
    })
    expect(pack.matches[0]).toMatchObject({ homeScore: 1, homePenalties: 5 })
    expect(pack.lineups.get('77')?.[0]).toMatchObject({ personSourceId: '9', starter: true })
    const goals = parseWyscoutEvents([{
      eventName: 'Shot',
      subEventName: 'Penalty',
      matchId: 77,
      playerId: 9,
      teamId: 1,
      matchPeriod: '2H',
      eventSec: 2760,
      tags: [{ id: 102 }]
    }], new Map([['77', '1']]), new Map([['9', 'Player']]))
    expect(goals.get('77')?.[0]).toMatchObject({
      team: 'away', minute: 90, extraMinute: 1, ownGoal: true, penalty: true
    })
  })

  it('builds domestic ledgers without pretending their order is official', () => {
    expect(footballPointsForWin('premier-league', '1980/81')).toBe(2)
    expect(footballPointsForWin('premier-league', '1981/82')).toBe(3)
    const rows = buildFootballLedger([
      { homeTeamId: 1, awayTeamId: 2, homeScore: 2, awayScore: 0 },
      { homeTeamId: 2, awayTeamId: 1, homeScore: 1, awayScore: 1 }
    ], 3)
    expect(rows.find((row) => row.teamId === 1)).toMatchObject({ played: 2, won: 1, drawn: 1, goalsFor: 3, goalsAgainst: 1, points: 4 })
  })

  it('extracts explicit Wikimedia winners and runners-up from manifested tables', () => {
    const text = `{| class="wikitable"\n! Season !! Winners !! Runners-up\n|-\n| 2022–23 || [[Manchester City F.C.|Manchester City]] || [[Arsenal F.C.|Arsenal]]\n|-\n| 2023–24 || [[Manchester City F.C.|Manchester City]] || [[Arsenal F.C.|Arsenal]]\n|}\n\nA long narrative paragraph about the competition history that is deliberately plain text after extraction.`
    expect(parseWikimediaHonours(text, ['winners'], ['runners-up'])).toEqual([
      { seasonKey: '2022/23', seasonLabel: '2022/23', winners: ['Manchester City'], runnersUp: ['Arsenal'] },
      { seasonKey: '2023/24', seasonLabel: '2023/24', winners: ['Manchester City'], runnersUp: ['Arsenal'] }
    ])
    expect(wikimediaPlainText(text)).not.toContain('{|')
  })

  it('rejects a Wikimedia honours slice that loses its frozen boundary or row floor', () => {
    const entry = FOOTBALL_WIKIMEDIA_MANIFEST.find((item) => item.competitionKey === 'premier-league')!
    const complete = Array.from({ length: entry.minimumHonours }, (_, index) => ({
      seasonKey: index === 0 ? entry.firstSeasonKey : `${1900 + index}/${String(1901 + index).slice(-2)}`,
      seasonLabel: String(1900 + index),
      winners: ['Champion'],
      runnersUp: ['Runner-up']
    }))
    expect(wikimediaHonoursComplete(entry, complete)).toBe(true)
    expect(wikimediaHonoursComplete(entry, complete.slice(1))).toBe(false)
    expect(wikimediaHonoursComplete(entry, complete.slice(0, -1))).toBe(false)
  })

  it('enforces archive, path, LIKE and FotMob boundaries', () => {
    expect(() => assertBoundedArchive(101, 100)).toThrow(/exceeds/i)
    expect(escapeFootballLike('100%_club')).toBe('100\\%\\_club')
    expect(() => validateFootballRelativePath('../match.mkv')).toThrow(/inside/i)
    expect(validateFootballExternalLink('fotmob', 'https://www.fotmob.com/matches/a/b#1')).toContain('fotmob.com/matches')
    expect(() => validateFootballExternalLink('fotmob', 'https://example.com/matches/1')).toThrow(/fotmob.com/i)
  })
})
