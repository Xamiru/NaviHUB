import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageStatus from '../components/PageStatus'

// A match has no page of its own — it belongs on its event's card. A list entry
// still needs somewhere to point, so this resolves the match to its event and
// hands off, highlighting the row on arrival.
export default function WrestlingMatchRedirect(): JSX.Element {
  const { id = '' } = useParams()
  const matchId = Number(id)
  const { data: eventId, isLoading } = useQuery({
    queryKey: qk.wrestling.match(matchId),
    queryFn: () => api.wrestling.eventIdOfMatch(matchId),
    enabled: Number.isFinite(matchId)
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!eventId) return <PageStatus>That match is no longer in the wiki.</PageStatus>
  return <Navigate to={`/wrestling/event/${eventId}?match=${matchId}`} replace />
}
