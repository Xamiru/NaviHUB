import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'

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
        subtitle={kind === 'teams' ? 'Club and national-team records across the installed competition archive.' : 'One identity for senior playing and managerial careers, with ambiguous source matches quarantined.'}
        back={{ to: '/football', label: 'Football Archive' }}
      />
      <div className="mb-6 max-w-xl">
        <input className="input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={kind === 'teams' ? 'Search teams...' : 'Search players and managers...'} />
      </div>
      {isLoading ? <PageStatus>Reading the directory...</PageStatus> : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6">
          {data.map((entity) => (
            <Link
              key={entity.id}
              to={`/football/${kind === 'teams' ? 'team' : 'person'}/${entity.id}`}
              className="flex items-center gap-3 border-b border-line-subtle py-4 hover:bg-surface-raised/35"
            >
              <CoverImage path={entity.imagePath} alt={entity.name} className="h-12 w-12" rounded="rounded-full" thumbWidth={96} />
              <span className="min-w-0">
                <span className="block truncate font-medium text-ink">{entity.name}</span>
                <span className="mt-0.5 block truncate text-xs text-ink-muted">
                  {'role' in entity ? `${entity.role} / ${entity.nationality ?? 'nationality not supplied'}` : entity.country ?? (entity.isNational ? 'National team' : 'Country not supplied')}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
      {!isLoading && !data.length && <p className="py-8 text-sm text-ink-muted">No entries match this search.</p>}
    </div>
  )
}
