import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import {
  FootballCompetitionMark,
  FootballCoverageStrip,
  FootballFlag,
  FootballMatchRow,
  FootballSectionTitle,
  FootballTeamMark
} from '../components/football/FootballCommon'

export default function FootballSeasonPage() {
  const id = Number(useParams().id)
  const { data, isLoading } = useQuery({ queryKey: qk.football.season(id), queryFn: () => api.football.season(id), enabled: Number.isInteger(id) && id > 0 })
  if (isLoading) return <PageStatus>Opening season chapter...</PageStatus>
  if (!data) return <PageStatus>Season not found.</PageStatus>

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title={`${data.competitionName} ${data.label}`}
        subtitle={data.narrative ?? `${data.status} edition with ${data.matchCount} stored matches.`}
        back={{ to: `/football/competition/${data.competitionKey}`, label: data.competitionName }}
        eyebrow={<span className="flex items-center gap-2"><FootballFlag competitionKey={data.competitionKey} /><FootballCompetitionMark competitionKey={data.competitionKey} size="sm" /></span>}
      />

      <section className="mb-10 border-y border-line-subtle py-7">
        {data.champion ? (
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]">
            <div className="text-center md:text-right"><p className="text-xs uppercase tracking-[0.16em] text-ink-muted">Champion</p><Link to={`/football/team/${data.champion.id}`} className="mt-3 inline-flex flex-col items-center gap-3 md:items-end"><FootballTeamMark team={data.champion} size="lg" /><span className="text-2xl font-semibold text-ink hover:text-signal-link">{data.champion.name}</span></Link></div>
            <div className="text-center"><p className="text-4xl font-semibold tabular-nums text-ink">{data.editionNumber ?? data.label}</p><p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-muted">Edition</p></div>
            <div className="text-center md:text-left"><p className="text-xs uppercase tracking-[0.16em] text-ink-muted">Runner-up</p>{data.runnerUp ? <Link to={`/football/team/${data.runnerUp.id}`} className="mt-3 inline-flex flex-col items-center gap-3 md:items-start"><FootballTeamMark team={data.runnerUp} size="lg" /><span className="text-xl font-semibold text-ink hover:text-signal-link">{data.runnerUp.name}</span></Link> : <p className="mt-3 text-sm text-ink-muted">Not supplied</p>}</div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.16em] text-ink-muted">Edition status</p><p className="mt-2 text-2xl font-semibold capitalize text-ink">{data.status}</p></div><p className="text-sm text-ink-muted">Champion not verified</p></div>
        )}
      </section>

      {data.standings.length > 0 && (
        <section className="mb-11">
          <FootballSectionTitle title="Season table" detail={data.standings.some((row) => row.rankOfficial) ? 'Official order' : 'Results ledger'} />
          <div className="overflow-x-auto border-y border-line-subtle"><table className="w-full text-sm"><thead className="text-left text-xs text-ink-muted"><tr><th className="py-3">Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead><tbody className="divide-y divide-line-subtle">{data.standings.map((row) => <tr key={row.team.id}><td className="py-3 tabular-nums text-ink-muted">{row.rankOfficial ? row.rank : '-'}</td><td><Link to={`/football/team/${row.team.id}`} className="flex items-center gap-2 font-medium text-ink hover:text-signal-link"><FootballTeamMark team={row.team} size="sm" />{row.team.name}</Link></td>{[row.played,row.won,row.drawn,row.lost,row.goalsFor,row.goalsAgainst,row.goalDifference,row.points].map((value,index) => <td key={index} className="tabular-nums text-ink-secondary">{value}</td>)}</tr>)}</tbody></table></div>
        </section>
      )}

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.35fr)_340px]">
        <section>
          <FootballSectionTitle title="Match record" detail={`${data.matches.length} stored`} />
          {data.matches.map((match) => <FootballMatchRow key={match.id} match={match} />)}
          {!data.matches.length && <p className="border-y border-line-subtle py-5 text-sm text-ink-muted">No match results are stored for this edition.</p>}
        </section>
        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="Top scorers" detail={data.topScorers.length ? 'Verified goals' : undefined} />
            {data.topScorers.length ? <ol className="divide-y divide-line-subtle">{data.topScorers.map((entry) => <li key={entry.person.id} className="grid grid-cols-[28px_40px_minmax(0,1fr)_auto] items-center gap-2 py-2.5 text-sm"><span className="text-xs tabular-nums text-ink-muted">{entry.rank}</span><CoverImage path={entry.person.imagePath} alt={entry.person.name} className="h-9 w-9" rounded="rounded-full" thumbWidth={72} /><Link to={`/football/person/${entry.person.id}`} className="truncate font-medium text-ink hover:text-signal-link">{entry.person.name}</Link><span className="font-semibold tabular-nums text-ink">{entry.goals}</span></li>)}</ol> : <p className="text-sm text-ink-muted">Scorer data not supplied.</p>}
          </section>
          {data.stages.length > 0 && <section><FootballSectionTitle title="Tournament path" /><ol className="divide-y divide-line-subtle">{data.stages.map((stage) => <li key={stage.id} className="flex justify-between gap-4 py-2.5 text-sm"><span className="text-ink">{stage.name}</span><span className="text-ink-muted">{stage.kind}</span></li>)}</ol></section>}
          {data.honours.length > 0 && <section><FootballSectionTitle title="Honours" />{data.honours.map((honour) => <p key={honour.id} className="flex items-center gap-2 border-b border-line-subtle py-2.5 text-sm text-ink">{honour.team && <FootballTeamMark team={honour.team} size="sm" />}<span><span className="capitalize text-ink-muted">{honour.placement}</span> / {honour.team?.name ?? honour.person?.name ?? honour.title}</span></p>)}</section>}
        </aside>
      </div>

      <details className="mt-10 border-y border-line-subtle py-4"><summary className="cursor-pointer text-sm font-medium text-ink">Chapter details and sources</summary><div className="mt-5 grid gap-4 sm:grid-cols-4"><div><p className="text-xs text-ink-muted">Status</p><p className="mt-1 capitalize text-ink">{data.status}</p></div><div><p className="text-xs text-ink-muted">Teams</p><p className="mt-1 text-ink">{data.teamCount ?? 'Not supplied'}</p></div><div><p className="text-xs text-ink-muted">Revision</p><p className="mt-1 truncate text-ink">{data.dataRevision ?? 'Unknown'}</p></div><div><p className="text-xs text-ink-muted">Matches</p><p className="mt-1 text-ink">{data.matchCount}</p></div></div><div className="mt-5"><FootballCoverageStrip coverage={data.coverage} /></div></details>
    </div>
  )
}
