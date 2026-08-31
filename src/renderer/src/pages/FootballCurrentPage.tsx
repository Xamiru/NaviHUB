import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { FOOTBALL_COMPETITIONS } from '@shared/football'
import type { FootballCompetitionKey } from '@shared/types'
import {
  FootballCoverageStrip,
  FootballFlag,
  FootballMatchRow,
  FootballSectionTitle,
  FootballTeamMark
} from '../components/football/FootballCommon'

export default function FootballCurrentPage() {
  const navigate = useNavigate()
  const [competition, setCompetition] = usePersistedState<FootballCompetitionKey | null>('footballCurrentCompetition', 'premier-league')
  const [dateFrom, setDateFrom] = usePersistedState('footballCurrentFrom', '')
  const [dateTo, setDateTo] = usePersistedState('footballCurrentTo', '')
  const [starting, setStarting] = useState(false)
  const key = useMemo(() => qk.football.current(competition, dateFrom || null, dateTo || null), [competition, dateFrom, dateTo])
  const { data, isLoading } = useQuery({ queryKey: key, queryFn: () => api.football.current(competition, dateFrom || null, dateTo || null) })

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

  const selected = FOOTBALL_COMPETITIONS.find((item) => item.key === competition)

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Matchday"
        subtitle="Stored fixtures, permanent scores and season tables. Nothing refreshes until you ask."
        back={{ to: '/football', label: 'Football Almanac' }}
        actions={<button className="btn-primary" disabled={starting || !competition} onClick={refresh}>Refresh {selected?.shortName ?? 'selected'}</button>}
      />

      <div className="mb-8 flex flex-wrap items-end gap-3 border-b border-line-subtle pb-5">
        <label className="min-w-56 flex-1 sm:max-w-sm"><span className="label">Competition</span><select className="input" value={competition ?? ''} onChange={(event) => setCompetition(event.target.value as FootballCompetitionKey)}>{FOOTBALL_COMPETITIONS.map((item) => <option key={item.key} value={item.key}>{item.shortName}</option>)}</select></label>
        <label><span className="label">From</span><input className="input" type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} /></label>
        <label><span className="label">To</span><input className="input" type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} /></label>
        {(dateFrom || dateTo) && <button className="btn-ghost" onClick={() => { setDateFrom(''); setDateTo('') }}>Clear dates</button>}
      </div>

      {isLoading || !data ? <PageStatus>Reading the stored matchday...</PageStatus> : (
        <>
          {data.entitlement && !data.entitlement.entitled && (
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-y border-signal-anomaly/35 py-4">
              <p className="max-w-4xl text-sm text-ink-secondary">Current provider coverage is unavailable for this edition. Stored and OpenFootball results remain visible.</p>
              <button className="text-xs text-signal-anomaly" onClick={() => document.getElementById('football-data-status')?.scrollIntoView({ behavior: 'smooth' })}>View data status</button>
            </div>
          )}

          <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.35fr)_360px]">
            <section>
              <FootballSectionTitle title="Fixtures and results" detail={`${data.matches.length} stored`} />
              {data.matches.length ? data.matches.map((match) => <FootballMatchRow key={match.id} match={match} />) : <p className="border-y border-line-subtle py-7 text-sm text-ink-muted">No stored matches match these dates.</p>}
            </section>
            <aside>
              <FootballSectionTitle title="Top scorers" detail="Top 20" />
              {data.topScorers.length ? (
                <ol className="divide-y divide-line-subtle">
                  {data.topScorers.map((entry) => (
                    <li key={entry.person.id} className="grid grid-cols-[32px_42px_minmax(0,1fr)_auto] items-center gap-2 py-3 text-sm">
                      <span className="text-xs tabular-nums text-ink-muted">{entry.rank}</span>
                      <CoverImage path={entry.person.imagePath} alt={entry.person.name} className="h-10 w-10" rounded="rounded-full" thumbWidth={80} />
                      <span className="min-w-0"><span className="block truncate font-medium text-ink">{entry.person.name}</span><span className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-ink-muted">{entry.team && <FootballTeamMark team={entry.team} size="sm" />}{entry.team?.name ?? 'Team not supplied'}</span></span>
                      <span className="text-lg font-semibold tabular-nums text-ink">{entry.goals}</span>
                    </li>
                  ))}
                </ol>
              ) : <p className="border-y border-line-subtle py-5 text-sm text-ink-muted">Scorer data not supplied.</p>}
            </aside>
          </div>

          <section className="mt-12">
            <FootballSectionTitle title="Season table" detail={data.standings.some((row) => row.rankOfficial) ? 'Official order' : 'Results ledger'} />
            {data.standings.length ? (
              <div className="overflow-x-auto border-y border-line-subtle">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs text-ink-muted"><tr><th className="py-3">Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead>
                  <tbody className="divide-y divide-line-subtle">{data.standings.map((row) => <tr key={row.team.id}><td className="py-3 tabular-nums text-ink-muted">{row.rankOfficial ? row.rank : '-'}</td><td><span className="flex items-center gap-2 font-medium text-ink"><FootballTeamMark team={row.team} size="sm" />{row.team.name}</span></td>{[row.played,row.won,row.drawn,row.lost,row.goalsFor,row.goalsAgainst,row.goalDifference,row.points].map((value,index) => <td key={index} className="tabular-nums text-ink-secondary">{value}</td>)}</tr>)}</tbody>
                </table>
              </div>
            ) : <p className="border-y border-line-subtle py-5 text-sm text-ink-muted">A table is not supplied for this competition or season.</p>}
          </section>

          <details id="football-data-status" className="mt-10 border-y border-line-subtle py-4">
            <summary className="cursor-pointer text-sm font-medium text-ink">Data status and refresh budget</summary>
            <div className="mt-5 grid gap-6 md:grid-cols-[repeat(4,minmax(0,1fr))]">
              <div><p className="text-xs text-ink-muted">Competition</p><p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink">{competition && <FootballFlag competitionKey={competition} />}{selected?.shortName}</p></div>
              <div><p className="text-xs text-ink-muted">Last refresh</p><p className="mt-1 text-sm font-medium text-ink">{data.lastRefreshAt?.slice(0,16).replace('T',' ') ?? 'Never'}</p></div>
              <div><p className="text-xs text-ink-muted">Daily quota</p><p className="mt-1 text-sm font-medium tabular-nums text-ink">{data.quota.remaining} of {data.quota.limit}</p></div>
              <div><p className="text-xs text-ink-muted">Waiting</p><p className="mt-1 text-sm font-medium tabular-nums text-ink">{data.quota.backlog} requests</p></div>
            </div>
            {data.entitlement?.message && <p className="mt-5 max-w-4xl text-sm leading-relaxed text-ink-muted">{data.entitlement.message}</p>}
            <div className="mt-5"><FootballCoverageStrip coverage={data.coverage} /></div>
          </details>
        </>
      )}
    </div>
  )
}
