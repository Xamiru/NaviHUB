import { queryOptions } from '@tanstack/react-query'
import type { QuizAvailabilityRequest } from '@shared/types'
import { api } from './api'
import { qk } from './queryKeys'

// Availability is served from main's cache at once; when that cached result is
// being rebuilt in the background the reply says `refreshing`, and the query
// polls until the fresh counts land (src/main/quizAvailabilityCacheCore.ts).
const REFRESH_POLL_MS = 1_000

export function quizAvailabilityQuery(request: QuizAvailabilityRequest) {
  return queryOptions({
    queryKey: qk.quiz.availability(request),
    queryFn: () => api.quiz.availability(request),
    refetchInterval: (query) => (query.state.data?.refreshing ? REFRESH_POLL_MS : false)
  })
}

export function footballAvailabilityQuery() {
  return queryOptions({
    queryKey: qk.quiz.footballAvailability(),
    queryFn: () => api.quiz.footballAvailability(),
    refetchInterval: (query) => (query.state.data?.refreshing ? REFRESH_POLL_MS : false)
  })
}
