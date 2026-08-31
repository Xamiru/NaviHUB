import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'

export default function FootballCompetitionsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: qk.football.competitions,
    queryFn: () => api.football.competitions()
  })
  if (isLoading) return <PageStatus>Reading competition volumes...</PageStatus>
  return (
    <div className="mx-auto max-w-[1400px] p-6">
      <PageHeader
        title="Competition volumes"
        subtitle="Four domestic leagues, three UEFA club competitions and two international finals archives, with their recognized lineages preserved."
        back={{ to: '/football', label: 'Football Archive' }}
      />
      <div className="divide-y divide-line-subtle border-y border-line-subtle">
        {data.map((competition, index) => (
          <Link
            key={competition.key}
            to={`/football/competition/${competition.key}`}
            className="grid gap-3 py-5 transition-colors hover:bg-surface-raised/35 sm:grid-cols-[48px_minmax(220px,0.8fr)_minmax(260px,1.4fr)_140px] sm:items-center sm:px-3"
          >
            <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <span className="block text-lg font-semibold text-ink">{competition.name}</span>
              <span className="mt-1 block text-xs text-ink-muted">{competition.country ?? competition.scope}</span>
            </span>
            <span className="text-sm leading-relaxed text-ink-muted">
              {competition.lineageNote ?? `Archive begins ${competition.startYear ?? 'with the first sourced edition'}.`}
            </span>
            <span className="text-right text-xs tabular-nums text-ink-muted">
              {competition.seasonCount} seasons<br />{competition.matchCount} matches
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
