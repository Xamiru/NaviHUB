import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import {
  FootballCoverageStrip,
  FootballMatchRow,
  FootballSectionTitle
} from '../components/football/FootballCommon'

export default function FootballSeasonPage() {
  const id = Number(useParams().id)
  const { data, isLoading } = useQuery({
    queryKey: qk.football.season(id),
    queryFn: () => api.football.season(id),
    enabled: Number.isInteger(id) && id > 0
  })
  if (isLoading) return <PageStatus>Opening season chapter...</PageStatus>
  if (!data) return <PageStatus>Season not found.</PageStatus>
  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title={`${data.competitionName} ${data.label}`}
        subtitle={data.narrative ?? `${data.status} edition with ${data.matchCount} stored matches.`}
        back={{ to: `/football/competition/${data.competitionKey}`, label: data.competitionName }}
        actions={data.champion ? <Link to={`/football/team/${data.champion.id}`} className="btn-ghost">Champion: {data.champion.name}</Link> : undefined}
      />

      <div className="mb-8 grid gap-5 border-y border-line-subtle py-5 sm:grid-cols-4">
        <div><p className="text-xs text-ink-muted">Status</p><p className="mt-1 font-medium capitalize text-ink">{data.status}</p></div>
        <div><p className="text-xs text-ink-muted">Edition</p><p className="mt-1 font-medium tabular-nums text-ink">{data.editionNumber ?? 'Not supplied'}</p></div>
        <div><p className="text-xs text-ink-muted">Teams</p><p className="mt-1 font-medium tabular-nums text-ink">{data.teamCount ?? 'Not supplied'}</p></div>
        <div><p className="text-xs text-ink-muted">Revision</p><p className="mt-1 truncate font-medium text-ink">{data.dataRevision ?? 'Unknown'}</p></div>
      </div>

      {data.standings.length > 0 && (
        <section className="mb-10">
          <FootballSectionTitle title="Season ledger" detail={data.standings.some((row) => row.rankOfficial) ? 'Official order' : 'No official rank assigned'} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-ink-muted"><tr><th className="py-2">Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead>
              <tbody className="divide-y divide-line-subtle">
                {data.standings.map((row) => (
                  <tr key={row.team.id}>
                    <td className="py-2.5 tabular-nums text-ink-muted">{row.rankOfficial ? row.rank : '-'}</td>
                    <td><Link to={`/football/team/${row.team.id}`} className="font-medium text-ink hover:text-signal-link">{row.team.name}</Link></td>
                    {[row.played, row.won, row.drawn, row.lost, row.goalsFor, row.goalsAgainst, row.goalDifference, row.points].map((value, index) => <td key={index} className="tabular-nums text-ink-secondary">{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.65fr)]">
        <section>
          <FootballSectionTitle title="Match record" detail={`${data.matches.length} stored`} />
          {data.matches.map((match) => <FootballMatchRow key={match.id} match={match} />)}
          {!data.matches.length && <p className="py-5 text-sm text-ink-muted">No match results are stored for this edition.</p>}
        </section>
        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="Top scorers" detail={data.topScorers.length ? 'Verified goals' : undefined} />
            {data.topScorers.length ? (
              <ol className="divide-y divide-line-subtle">
                {data.topScorers.map((entry) => (
                  <li key={entry.person.id} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 py-2.5 text-sm">
                    <span className="text-xs tabular-nums text-ink-muted">{entry.rank}</span>
                    <Link to={`/football/person/${entry.person.id}`} className="truncate font-medium text-ink hover:text-signal-link">{entry.person.name}</Link>
                    <span className="font-semibold tabular-nums text-ink">{entry.goals}</span>
                  </li>
                ))}
              </ol>
            ) : <p className="text-sm text-ink-muted">Scorer data not supplied.</p>}
          </section>
          <section><FootballSectionTitle title="Coverage evidence" /><FootballCoverageStrip coverage={data.coverage} /></section>
          <section>
            <FootballSectionTitle title="Stages" />
            <ol className="divide-y divide-line-subtle">
              {data.stages.map((stage) => <li key={stage.id} className="flex justify-between gap-4 py-2.5 text-sm"><span className="text-ink">{stage.name}</span><span className="text-ink-muted">{stage.kind}</span></li>)}
              {!data.stages.length && <li className="text-sm text-ink-muted">Stage structure not supplied.</li>}
            </ol>
          </section>
          <section>
            <FootballSectionTitle title="Honours" />
            {data.honours.map((honour) => <p key={honour.id} className="border-b border-line-subtle py-2.5 text-sm text-ink"><span className="capitalize text-ink-muted">{honour.placement}</span> / {honour.team?.name ?? honour.person?.name ?? honour.title}</p>)}
            {!data.honours.length && <p className="text-sm text-ink-muted">Official honours not supplied.</p>}
          </section>
        </aside>
      </div>
    </div>
  )
}
