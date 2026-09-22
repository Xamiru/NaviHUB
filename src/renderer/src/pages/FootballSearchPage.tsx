import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue } from '../lib/hooks'
import {
  FootballCompetitionMark,
  FootballFlag,
  FootballTeamMark
} from '../components/football/FootballCommon'

export default function FootballSearchPage() {
  const [params, setParams] = useSearchParams()
  const value = params.get('q') ?? ''
  const query = useDebouncedValue(value.trim(), 200)
  const { data, isFetching, isError } = useQuery({
    queryKey: qk.football.search(query),
    queryFn: () => api.football.search(query),
    enabled: query.length > 0
  })
  const groups = data ? [
    { title: 'Competitions', rows: data.competitions.map((item) => ({ key: `c-${item.id}`, label: item.name, detail: item.lineageNote, to: `/football/competition/${item.key}`, visual: <FootballCompetitionMark competitionKey={item.key} size="sm" /> })) },
    { title: 'Seasons', rows: data.seasons.map((item) => ({ key: `s-${item.id}`, label: item.label, detail: item.competitionName, to: `/football/season/${item.id}`, visual: <FootballFlag competitionKey={item.competitionKey} /> })) },
    { title: 'Teams', rows: data.teams.map((item) => ({ key: `t-${item.id}`, label: item.name, detail: item.country, to: `/football/team/${item.id}`, visual: <FootballTeamMark team={item} size="sm" /> })) },
    { title: 'People', rows: data.people.map((item) => ({ key: `p-${item.id}`, label: item.name, detail: item.role, to: `/football/person/${item.id}`, visual: <CoverImage path={item.imagePath} alt={item.name} className="h-10 w-10 object-cover" rounded="rounded-full" thumbWidth={80} /> })) },
    { title: 'Matches', rows: data.matches.map((item) => ({ key: `m-${item.id}`, label: `${item.home.name} vs ${item.away.name}`, detail: `${item.matchDate} / ${item.competitionName}`, to: `/football/match/${item.id}`, visual: <span className="flex -space-x-2"><FootballTeamMark team={item.home} size="sm" /><FootballTeamMark team={item.away} size="sm" /></span> })) }
  ] : []
  const total = groups.reduce((sum, group) => sum + group.rows.length, 0)

  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader title="Search the Football Archive" subtitle="Find a competition, season, team, player, manager or match in the installed history." back={{ to: '/football', label: 'Football Archive' }} />
      <label className="mb-7 block max-w-2xl"><span className="label mb-2 block">Search the installed archive</span><input
          className="input"
          autoFocus
          value={value}
          onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })}
          placeholder="Competition, season, team, person or match"
        /></label>
      {isFetching && <PageStatus>Searching the archive...</PageStatus>}
      {isError && <PageStatus>Could not search the Football archive.</PageStatus>}
      {!isFetching && !isError && query && !total && <p className="py-8 text-sm text-ink-muted">No installed Football record matches this search.</p>}
      <div className="grid gap-x-10 lg:grid-cols-2">
        {groups.filter((group) => group.rows.length).map((group) => (
          <section key={group.title} className="mb-8">
            <h2 className="label mb-2">{group.title}</h2>
            <div className="border-t border-line-subtle">
              {group.rows.map((row) => (
                <Link key={row.key} to={row.to} className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 border-b border-line-subtle py-3 hover:bg-surface-raised/35">
                  <span className="flex justify-center">{row.visual}</span>
                  <span><span className="block font-medium text-ink">{row.label}</span>{row.detail && <span className="mt-0.5 block text-xs text-ink-muted">{row.detail}</span>}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
