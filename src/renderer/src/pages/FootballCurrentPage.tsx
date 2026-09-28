import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { FOOTBALL_COMPETITIONS } from '@shared/football'
import type { FootballCompetitionKey, FootballMatchSummary } from '@shared/types'
import {
  FootballCoverageStrip,
  FootballFlag,
  FootballMatchRow,
  FootballPanel,
  FootballTeamMark,
  FootballZoneBadge,
  footballCompetitionStyle
} from '../components/football/FootballCommon'

const DAY = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
const SHORT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
const LEAGUES: FootballCompetitionKey[] = ['premier-league', 'la-liga', 'serie-a', 'bundesliga']

function iso(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Monday of the week containing the date, as an ISO day. */
function weekStartOf(day: string): string {
  const date = new Date(`${day}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7))
  return iso(date)
}

function addDays(day: string, days: number): string {
  const date = new Date(`${day}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return iso(date)
}

function label(day: string): string {
  return DAY.format(new Date(`${day}T00:00:00Z`))
}

export default function FootballCurrentPage() {
  const qc = useQueryClient()
  const today = iso(new Date())
  const [competition, setCompetition] = usePersistedState<FootballCompetitionKey | null>('footballMatchdayCompetition', null)
  const [week, setWeek] = usePersistedState('footballMatchdayWeek', weekStartOf(today))
  const weekEnd = addDays(week, 6)
  const tableKey = competition ?? 'premier-league'

  const weekQuery = useQuery({
    queryKey: qk.football.current(competition, week, weekEnd),
    queryFn: () => api.football.current(competition, week, weekEnd)
  })
  const tableQuery = useQuery({
    queryKey: qk.football.current(tableKey, null, null),
    queryFn: () => api.football.current(tableKey, null, null)
  })
  const overviewQuery = useQuery({ queryKey: qk.football.overview, queryFn: () => api.football.overview() })
  const statusQuery = useQuery({
    queryKey: qk.football.syncStatus,
    queryFn: () => api.football.syncStatus(),
    refetchInterval: (query) => {
      const state = query.state.data?.state
      if (state && ['running', 'pausing', 'paused'].includes(state)) return 1000
      return false
    }
  })
  const running = !!statusQuery.data && ['running', 'pausing', 'paused'].includes(statusQuery.data.state)
  const emptyWeek = weekQuery.isSuccess && weekQuery.data.matches.length === 0
  const afterFilter = { competitionKey: competition, dateFrom: addDays(weekEnd, 1), dateTo: addDays(weekEnd, 60), limit: 1, oldestFirst: true }
  const beforeFilter = { competitionKey: competition, dateFrom: addDays(week, -60), dateTo: addDays(week, -1), limit: 1 }
  const afterQuery = useQuery({
    queryKey: qk.football.matches(afterFilter),
    queryFn: () => api.football.matches(afterFilter),
    enabled: emptyWeek
  })
  const beforeQuery = useQuery({
    queryKey: qk.football.matches(beforeFilter),
    queryFn: () => api.football.matches(beforeFilter),
    enabled: emptyWeek
  })
  const nextDay = afterQuery.data?.[0]?.matchDate
  const previousDay = beforeQuery.data?.[0]?.matchDate

  const days = useMemo(() => {
    const byDay = new Map<string, FootballMatchSummary[]>()
    for (const match of [...(weekQuery.data?.matches ?? [])].sort((a, b) =>
      a.matchDate.localeCompare(b.matchDate) || a.competitionKey.localeCompare(b.competitionKey) || (a.kickoffAt ?? '').localeCompare(b.kickoffAt ?? '')
    )) {
      byDay.set(match.matchDate, [...(byDay.get(match.matchDate) ?? []), match])
    }
    return [...byDay]
  }, [weekQuery.data])

  async function update(kind: 'fixtures' | 'current') {
    await api.football.startSync(kind === 'current' && competition ? { kind, competitionKeys: [competition] } : { kind })
    await qc.invalidateQueries({ queryKey: qk.football.syncStatus })
  }
  const wasRunning = useRef(false)
  useEffect(() => {
    if (running) {
      wasRunning.current = true
      return
    }
    if (!wasRunning.current) return
    wasRunning.current = false
    void qc.invalidateQueries({ queryKey: qk.football.all })
  }, [qc, running])

  const fixtures = overviewQuery.data?.fixtures
  const freshness = fixtures?.latestResult
    ? `Results up to ${label(fixtures.latestResult)}, updated ${fixtures.updatedAt?.slice(0, 10)}.`
    : 'Fixtures and results have not been downloaded yet.'
  const table = tableQuery.data?.standings ?? []

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title="Matchday"
        subtitle={`${freshness} OpenFootball publishes results about twice a week, free and without a key; for live scores use FotMob.`}
        back={{ to: '/football', label: 'Football Almanac' }}
        actions={
          <button className="btn-primary" disabled={running} onClick={() => update('fixtures')}>
            {running ? statusQuery.data?.message ?? 'Updating' : 'Update fixtures and results'}
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Competition">
          <button className={`pill ${competition == null ? 'pill-active' : ''}`} onClick={() => setCompetition(null)}>All</button>
          {FOOTBALL_COMPETITIONS.map((item) => (
            <button key={item.key} className={`pill ${competition === item.key ? 'pill-active' : ''}`} onClick={() => setCompetition(item.key)}>
              {item.shortName ?? item.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost px-2" aria-label="Previous week" onClick={() => setWeek(addDays(week, -7))}>‹</button>
          <span className="min-w-36 text-center text-sm tabular-nums text-ink">{SHORT.format(new Date(`${week}T00:00:00Z`))} - {SHORT.format(new Date(`${weekEnd}T00:00:00Z`))}</span>
          <button className="btn-ghost px-2" aria-label="Next week" onClick={() => setWeek(addDays(week, 7))}>›</button>
          {week !== weekStartOf(today) && <button className="btn-ghost" onClick={() => setWeek(weekStartOf(today))}>This week</button>}
        </div>
      </div>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0">
          {weekQuery.isError ? <PageStatus>Could not load this week's matches.</PageStatus> : weekQuery.isLoading ? <PageStatus>Reading the week...</PageStatus> : days.length ? (
            <div className="space-y-7">
              {days.map(([day, matches]) => (
                <div key={day}>
                  <h2 className="mb-2 flex items-center gap-3 text-sm font-semibold text-ink">
                    {label(day)}
                    {day === today && <span className="rounded bg-signal-live px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-inverse">Today</span>}
                    <span className="text-xs font-normal text-ink-muted">{matches.filter((match) => match.homeScore != null).length} of {matches.length} played</span>
                  </h2>
                  <div className="card px-2">
                    {matches.map((match) => <FootballMatchRow key={match.id} match={match} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-6">
              <p className="text-sm text-ink-secondary">No matches are stored for this week{competition ? ' in this competition' : ''}.</p>
              {!fixtures?.updatedAt && <p className="mt-1 text-xs text-ink-muted">Update fixtures and results to download the current season.</p>}
              {(previousDay || nextDay) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {previousDay && <button className="btn-ghost" onClick={() => setWeek(weekStartOf(previousDay))}>Previous matchday: {label(previousDay)}</button>}
                  {nextDay && <button className="btn-ghost" onClick={() => setWeek(weekStartOf(nextDay))}>Next matchday: {label(nextDay)}</button>}
                </div>
              )}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <FootballPanel title={`${FOOTBALL_COMPETITIONS.find((item) => item.key === tableKey)?.shortName ?? ''} table`}>
            {table.length ? (
              <>
                <table className="w-full text-sm" style={footballCompetitionStyle(tableKey)}>
                  <thead>
                    <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      <th className="w-8 py-1.5">#</th><th>Club</th><th className="w-8 text-right">P</th><th className="w-10 text-right">GD</th><th className="w-10 text-right">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-subtle">
                    {table.map((row) => (
                      <tr key={row.team.id}>
                        <td className="py-1.5"><FootballZoneBadge position={row.rankOfficial ? row.rank : row.position} /></td>
                        <td className="max-w-0"><Link to={`/football/team/${row.team.id}`} className="flex min-w-0 items-center gap-2 text-ink hover:text-signal-link"><FootballTeamMark team={row.team} size="xs" /><span className="truncate">{row.team.name}</span></Link></td>
                        <td className="text-right tabular-nums text-ink-muted">{row.played}</td>
                        <td className="text-right tabular-nums text-ink-secondary">{row.goalDifference > 0 ? '+' : ''}{row.goalDifference}</td>
                        <td className="text-right font-semibold tabular-nums text-ink">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tableQuery.data?.matches[0] && (
                  <Link to={`/football/season/${tableQuery.data.matches[0].seasonId}`} className="mt-3 block text-xs text-signal-link hover:underline">Full season, results and form ›</Link>
                )}
              </>
            ) : (
              <p className="text-sm text-ink-muted">{LEAGUES.includes(tableKey) ? 'No table yet for this season.' : 'This competition has no league table.'}</p>
            )}
          </FootballPanel>

          {(tableQuery.data?.topScorers.length ?? 0) > 0 && (
            <FootballPanel title="Top scorers">
              <ol className="divide-y divide-line-subtle text-sm">
                {tableQuery.data!.topScorers.slice(0, 10).map((entry) => (
                  <li key={entry.person.id} className="flex items-center justify-between gap-3 py-1.5">
                    <Link to={`/football/person/${entry.person.id}`} className="flex min-w-0 items-center gap-2 text-ink hover:text-signal-link">
                      {entry.team && <FootballTeamMark team={entry.team} size="xs" />}
                      <span className="truncate">{entry.person.name}</span>
                    </Link>
                    <span className="font-semibold tabular-nums text-ink">{entry.goals}</span>
                  </li>
                ))}
              </ol>
            </FootballPanel>
          )}

          <details className="border-y border-line-subtle py-3 text-sm">
            <summary className="cursor-pointer text-ink-secondary">Same-day scores with API-Football (optional)</summary>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              With a free API-Football key in Settings, a refresh adds same-day scores, lineups and top scorers within its daily limit
              ({tableQuery.data?.quota.remaining ?? 0} of {tableQuery.data?.quota.limit ?? 0} requests left today).
            </p>
            <button className="btn-ghost mt-3" disabled={running} onClick={() => update('current')}>
              Refresh {competition ? FOOTBALL_COMPETITIONS.find((item) => item.key === competition)?.shortName : 'all competitions'} from API-Football
            </button>
            {tableQuery.data?.entitlement?.message && <p className="mt-3 text-xs text-ink-muted">{tableQuery.data.entitlement.message}</p>}
            <div className="mt-3"><FootballCoverageStrip coverage={tableQuery.data?.coverage ?? []} /></div>
          </details>
          <p className="flex flex-wrap gap-2 text-xs text-ink-muted">
            {LEAGUES.map((key) => <FootballFlag key={key} competitionKey={key} />)}
            <span>current season from OpenFootball</span>
          </p>
        </aside>
      </div>
    </div>
  )
}
