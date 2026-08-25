import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useIncrementalList } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import WrestlingMatchRow from '../components/wrestling/WrestlingMatchRow'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

const LIMIT = 200

// Cross-event view of the personal layer: the matches you rated, best first.
export default function WrestlingRatedPage(): JSX.Element {
  const { data: matches, isLoading } = useQuery({
    queryKey: qk.wrestling.topRated(LIMIT),
    queryFn: () => api.wrestling.topRatedMatches(LIMIT)
  })
  const { visible, sentinelRef } = useIncrementalList(matches ?? [])

  if (isLoading) return <PageStatus>Loading…</PageStatus>

  return (
    <EditorialDetailFrame width="reading">
      <PageHeader
        back={{ to: '/wrestling', label: 'Wrestling' }}
        title="Highest rated"
        subtitle={matches?.length ? `${matches.length} rated matches` : undefined}
      />
      {!matches?.length ? (
        <EmptyState
          title="Nothing rated yet"
          body="Give a match stars from any event's card and it shows up here."
        />
      ) : (
        <div className="card px-4 py-1">
          {visible.map((m) => (
            <div key={m.id}>
              <Link
                to={`/wrestling/event/${m.eventId}`}
                className="mt-3 block text-xs uppercase tracking-wider text-gray-500 hover:text-accent"
              >
                {m.eventName}
                {m.eventDate ? ` · ${m.eventDate.slice(0, 4)}` : ''}
              </Link>
              <WrestlingMatchRow match={m} />
            </div>
          ))}
          <div ref={sentinelRef} />
        </div>
      )}
    </EditorialDetailFrame>
  )
}
