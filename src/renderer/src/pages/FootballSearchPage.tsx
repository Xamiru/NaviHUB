import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue } from '../lib/hooks'

export default function FootballSearchPage() {
  const [params, setParams] = useSearchParams()
  const value = params.get('q') ?? ''
  const query = useDebouncedValue(value.trim(), 200)
  const { data, isFetching } = useQuery({
    queryKey: qk.football.search(query),
    queryFn: () => api.football.search(query),
    enabled: query.length > 0
  })
  const groups = data ? [
    { title: 'Competitions', rows: data.competitions.map((item) => ({ key: `c-${item.id}`, label: item.name, detail: item.lineageNote, to: `/football/competition/${item.key}` })) },
    { title: 'Seasons', rows: data.seasons.map((item) => ({ key: `s-${item.id}`, label: item.label, detail: item.competitionName, to: `/football/season/${item.id}` })) },
    { title: 'Teams', rows: data.teams.map((item) => ({ key: `t-${item.id}`, label: item.name, detail: item.country, to: `/football/team/${item.id}` })) },
    { title: 'People', rows: data.people.map((item) => ({ key: `p-${item.id}`, label: item.name, detail: item.role, to: `/football/person/${item.id}` })) },
    { title: 'Matches', rows: data.matches.map((item) => ({ key: `m-${item.id}`, label: `${item.home.name} vs ${item.away.name}`, detail: `${item.matchDate} / ${item.competitionName}`, to: `/football/match/${item.id}` })) }
  ] : []
  const total = groups.reduce((sum, group) => sum + group.rows.length, 0)

  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader title="Search the Football Archive" subtitle="Competitions, seasons, teams, people and matches. Percent and underscore are treated as ordinary text." back={{ to: '/football', label: 'Football Archive' }} />
      <input
        className="input mb-7 max-w-2xl"
        autoFocus
        value={value}
        onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })}
        placeholder="Search the installed archive..."
      />
      {isFetching && <PageStatus>Searching the archive...</PageStatus>}
      {!isFetching && query && !total && <p className="py-8 text-sm text-ink-muted">No installed Football record matches this search.</p>}
      <div className="grid gap-x-10 lg:grid-cols-2">
        {groups.filter((group) => group.rows.length).map((group) => (
          <section key={group.title} className="mb-8">
            <h2 className="label mb-2">{group.title}</h2>
            <div className="border-t border-line-subtle">
              {group.rows.map((row) => (
                <Link key={row.key} to={row.to} className="block border-b border-line-subtle py-3 hover:bg-surface-raised/35">
                  <span className="block font-medium text-ink">{row.label}</span>
                  {row.detail && <span className="mt-0.5 block text-xs text-ink-muted">{row.detail}</span>}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
