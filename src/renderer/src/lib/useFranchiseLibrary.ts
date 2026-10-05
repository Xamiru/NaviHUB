import { useCallback } from 'react'
import { useQueries, type UseQueryResult } from '@tanstack/react-query'
import type { MediaItem, MediaType } from '@shared/types'
import { api } from './api'
import { qk } from './queryKeys'
import { configFor } from './mediaConfig'
import { statusesFrom, useSettings } from './hooks'

function combine(results: UseQueryResult<MediaItem[]>[]) {
  return {
    items: results.flatMap((r) => r.data ?? []),
    isLoading: results.some((r) => r.isLoading),
    error: results.find((r) => r.isError)?.error ?? null,
    refetch: () => results.forEach((r) => void r.refetch())
  }
}

// The library rows a franchise page matches against: one list per media type
// the franchise spans, through the SAME key + filter as HomePage's per-type
// list (keep `{ mediaType }` byte-identical, see CLAUDE.md), plus the
// positional finished check for whichever type a row has.
export function useFranchiseLibrary(types: MediaType[]) {
  const library = useQueries({
    queries: types.map((mediaType) => ({
      queryKey: qk.media.home(mediaType),
      queryFn: () => api.media.list({ mediaType })
    })),
    combine
  })
  const { data: settings } = useSettings()
  // statuses[1] is "completed" whatever the user renamed it to (the HomePage
  // convention), plus the progress fallback the detail page uses.
  const isFinished = useCallback(
    (m: MediaItem): boolean =>
      (m.status != null && m.status === statusesFrom(settings, configFor(m.mediaType))[1]) ||
      (!!m.totalUnits && m.progress >= m.totalUnits),
    [settings]
  )
  return { ...library, isFinished }
}
