import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { FootballTeamMark } from '../components/football/FootballCommon'

export default function FootballDirectoryPage({ kind }: { kind: 'teams' | 'people' }) {
  const [search, setSearch] = usePersistedState(`football${kind}Search`, '')
  const query = useDebouncedValue(search, 200)
  const filter = { search: query || null, limit: 300 }
  const teams = useQuery({
    queryKey: qk.football.teams(filter),
    queryFn: () => api.football.teams(filter),
    enabled: kind === 'teams'
  })
  const people = useQuery({
    queryKey: qk.football.people(filter),
    queryFn: () => api.football.people(filter),
    enabled: kind === 'people'
  })
  const data = kind === 'teams' ? teams.data ?? [] : people.data ?? []
  const isLoading = kind === 'teams' ? teams.isLoading : people.isLoading
  return (
    <div className="mx-auto max-w-[1450px] p-6">
      <PageHeader
        title={kind === 'teams' ? 'Teams' : 'Players and managers'}
        subtitle={kind === 'teams' ? 'Club and national-team records across the installed competition archive.' : 'Portraits, senior club spells, appearances and honours across playing and managerial careers.'}
        back={{ to: '/football', label: 'Football Archive' }}
      />
      <div className="mb-7 max-w-xl">
        <label className="label mb-2 block" htmlFor={`football-${kind}-search`}>Search the directory</label>
        <input id={`football-${kind}-search`} className="input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={kind === 'teams' ? 'Club or national team' : 'Player or manager'} />
      </div>
      {isLoading ? <PageStatus>Reading the directory...</PageStatus> : (
        kind === 'teams' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-px bg-line-subtle border-y border-line-subtle">
            {(teams.data ?? []).map((team) => (
              <Link key={team.id} to={`/football/team/${team.id}`} className="flex min-h-28 items-center gap-4 bg-surface-canvas p-4 hover:bg-surface-raised/70">
                <FootballTeamMark team={team} size="md" />
                <span className="min-w-0"><span className="block truncate font-semibold text-ink">{team.name}</span><span className="mt-1 block truncate text-xs text-ink-muted">{team.country ?? (team.isNational ? 'National team' : 'Country not supplied')}</span></span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-x-5 gap-y-8">
            {(people.data ?? []).map((person) => (
              <Link key={person.id} to={`/football/person/${person.id}`} className="group min-w-0">
                <CoverImage path={person.imagePath} alt={person.name} className="aspect-[3/4] w-full bg-surface-raised object-cover" rounded="rounded-sm" thumbWidth={320} />
                <span className="mt-3 block truncate font-semibold text-ink group-hover:text-signal-link">{person.name}</span>
                <span className="mt-1 block truncate text-xs text-ink-muted">{person.role} / {person.nationality ?? 'nationality not supplied'}</span>
              </Link>
            ))}
          </div>
        )
      )}
      {!isLoading && !data.length && <p className="py-8 text-sm text-ink-muted">No entries match this search.</p>}
    </div>
  )
}
