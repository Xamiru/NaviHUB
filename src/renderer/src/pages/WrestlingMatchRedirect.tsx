import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageStatus from '../components/PageStatus'

// Matches have one stable route even though their visible home differs: event
// card for imported matches, Collection for loose matches.
export default function WrestlingMatchRedirect(): JSX.Element {
  const { id = '' } = useParams()
  const matchId = Number(id)
  const query = useQuery({
    queryKey: qk.wrestling.matchLocation(matchId),
    queryFn: () => api.wrestling.matchLocation(matchId),
    enabled: Number.isFinite(matchId)
  })

  if (query.isLoading) return <PageStatus>Loading…</PageStatus>
  if (query.isError) return <PageStatus>Could not locate that match.</PageStatus>
  if (!query.data) return <PageStatus>That match is no longer in the wiki.</PageStatus>
  return query.data.kind === 'loose' ? (
    <Navigate to={`/wrestling/collection?match=${matchId}`} replace />
  ) : (
    <Navigate to={`/wrestling/event/${query.data.eventId}?match=${matchId}`} replace />
  )
}
