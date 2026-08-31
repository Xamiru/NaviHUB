import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { FOOTBALL_COMPETITIONS } from '@shared/football'
import type { FootballCompetitionKey } from '@shared/types'
import {
  FootballCoverageStrip,
  FootballMatchRow,
  FootballSectionTitle
} from '../components/football/FootballCommon'

export default function FootballCurrentPage() {
  const navigate = useNavigate()
  const [competition, setCompetition] = usePersistedState<FootballCompetitionKey | null>(
    'footballCurrentCompetition',
    'premier-league'
  )
  const [dateFrom, setDateFrom] = usePersistedState('footballCurrentFrom', '')
  const [dateTo, setDateTo] = usePersistedState('footballCurrentTo', '')
  const [starting, setStarting] = useState(false)
  const key = useMemo(
    () => qk.football.current(competition, dateFrom || null, dateTo || null),
    [competition, dateFrom, dateTo]
  )
  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => api.football.current(competition, dateFrom || null, dateTo || null)
  })

  async function refresh() {
    if (!competition) return
    setStarting(true)
    try {
      await api.football.startSync({ kind: 'current', competitionKeys: [competition] })
      navigate('/football/sync')
    } finally {
      setStarting(false)
    }
  }

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Current desk"
        subtitle="Stored fixtures, results, tables and scorer records. Refreshes are manual and the last complete snapshot stays available offline."
        back={{ to: '/football', label: 'Football Archive' }}
        actions={<button className="btn-primary" disabled={starting || !competition} onClick={refresh}>Refresh selected</button>}
      />

      <div className="mb-4">
        <Group label="Competition">
          {FOOTBALL_COMPETITIONS.map((item) => (
            <Pill
              key={item.key}
              active={competition === item.key}
              onClick={() => setCompetition(item.key)}
              label={item.shortName}
            />
          ))}
        </Group>
      </div>
      <div className="mb-7 flex flex-wrap items-end gap-3 border-b border-line-subtle pb-5">
        <label>
          <span className="label mb-1 block">From</span>
          <input className="input" type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />
        </label>
        <label>
          <span className="label mb-1 block">To</span>
          <input className="input" type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} />
        </label>
        {(dateFrom || dateTo) && <button className="btn-ghost" onClick={() => { setDateFrom(''); setDateTo('') }}>Clear dates</button>}
      </div>

      {isLoading || !data ? (
        <PageStatus>Reading the stored current snapshot...</PageStatus>
      ) : (
        <>
          <section className="mb-8 grid gap-4 border-y border-line-subtle py-4 md:grid-cols-4">
            <div>
              <p className="text-xs text-ink-muted">Entitlement</p>
              <p className="mt-1 text-sm font-medium text-ink">
                {data.entitlement?.entitled ? 'Available' : 'Unavailable or unchecked'}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">Last refresh</p>
              <p className="mt-1 text-sm font-medium text-ink">{data.lastRefreshAt?.slice(0, 16).replace('T', ' ') ?? 'Never'}</p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">Daily quota</p>
              <p className="mt-1 text-sm font-medium tabular-nums text-ink">{data.quota.remaining} of {data.quota.limit} remaining</p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">Backlog</p>
              <p className="mt-1 text-sm font-medium tabular-nums text-ink">{data.quota.backlog} requests</p>
            </div>
          </section>

          {data.entitlement?.message && (
            <p className="mb-7 border-l-2 border-signal-anomaly pl-4 text-sm leading-relaxed text-ink-muted">
              {data.entitlement.message} OpenFootball results may still appear, but unavailable scorer or lineup details are never fabricated.
            </p>
          )}

          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.75fr)]">
            <div>
              <FootballSectionTitle title="Fixtures and results" detail={`${data.matches.length} stored`} />
              {data.matches.length ? data.matches.map((match) => <FootballMatchRow key={match.id} match={match} />) : (
                <p className="py-6 text-sm text-ink-muted">No stored matches match these filters.</p>
              )}
            </div>
            <aside className="space-y-9">
              <section>
                <FootballSectionTitle title="Coverage" />
                <FootballCoverageStrip coverage={data.coverage} />
              </section>
              <section>
                <FootballSectionTitle title="Top scorers" detail="Top 20" />
                {data.topScorers.length ? (
                  <ol className="divide-y divide-line-subtle">
                    {data.topScorers.map((entry) => (
                      <li key={entry.person.id} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 py-2.5 text-sm">
                        <span className="text-xs tabular-nums text-ink-muted">{entry.rank}</span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-ink">{entry.person.name}</span>
                          <span className="block truncate text-xs text-ink-muted">{entry.team?.name ?? 'Team not supplied'}</span>
                        </span>
                        <span className="font-semibold tabular-nums text-ink">{entry.goals}</span>
                      </li>
                    ))}
                  </ol>
                ) : <p className="text-sm text-ink-muted">Scorer data not supplied.</p>}
              </section>
            </aside>
          </div>

          <section className="mt-10">
            <FootballSectionTitle title="Season table" detail={data.standings.some((row) => row.rankOfficial) ? 'Official rank' : 'Ledger only'} />
            {data.standings.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs text-ink-muted"><tr><th className="py-2">Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead>
                  <tbody className="divide-y divide-line-subtle">
                    {data.standings.map((row) => (
                      <tr key={row.team.id}>
                        <td className="py-2.5 tabular-nums text-ink-muted">{row.rankOfficial ? row.rank : '-'}</td>
                        <td className="font-medium text-ink">{row.team.name}</td>
                        {[row.played, row.won, row.drawn, row.lost, row.goalsFor, row.goalsAgainst, row.goalDifference, row.points].map((value, index) => (
                          <td key={index} className="tabular-nums text-ink-secondary">{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="py-5 text-sm text-ink-muted">A table is not supplied for this competition or season.</p>}
          </section>
        </>
      )}
    </div>
  )
}
