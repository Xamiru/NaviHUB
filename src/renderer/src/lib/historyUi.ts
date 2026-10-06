import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { mediaUrl, thumbUrl } from '@shared/mediaUrl'
import { parseRef } from '@shared/history/schema'
import type { HistoryImage, MediaType } from '@shared/types'
import { api } from './api'
import { qk } from './queryKeys'

const ARTICLE_KINDS = new Set(['event', 'person', 'period', 'place', 'source'])

/** In-app route of a History ref, or null for kinds without a page. */
export function historyPath(ref: string): string | null {
  const p = parseRef(ref)
  if (!p || !ARTICLE_KINDS.has(p.kind)) return null
  return `/history/${p.kind}/${p.id}`
}

/** The cached copy once it exists (as a thumbnail when small), else the remote URL. */
export function historyImageSrc(img: HistoryImage | null | undefined, width?: number): string | null {
  if (!img) return null
  if (img.cached) return (width ? thumbUrl(img.cached, width) : null) ?? mediaUrl(img.cached)
  return img.url
}

const MEDIA_TYPE_PATHS: Record<MediaType, string> = {
  anime: '/anime',
  manga: '/manga',
  visual_novel: '/visual-novels',
  game: '/games',
  movie: '/movies',
  tv: '/tv',
  book: '/books'
}

export function libraryPath(mediaType: MediaType, id: number): string {
  return `${MEDIA_TYPE_PATHS[mediaType]}/${id}`
}

/**
 * Pages trigger a background image-cache batch when they load; poll its
 * status while it runs and refetch History views once it settles so cached
 * copies replace remote URLs.
 */
export function useHistoryImageRefresh(loadedAt: number): void {
  const queryClient = useQueryClient()
  const { data, refetch } = useQuery({
    queryKey: qk.history.imageStatus,
    queryFn: () => api.history.imageStatus(),
    refetchInterval: (query) => (query.state.data?.running ? 1500 : false)
  })
  // The view request is what starts a batch, so look again once it landed.
  useEffect(() => {
    if (loadedAt) void refetch()
  }, [loadedAt, refetch])
  const wasRunning = useRef(false)
  useEffect(() => {
    if (data?.running) wasRunning.current = true
    else if (wasRunning.current && data && !data.running) {
      wasRunning.current = false
      void queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === 'history' && q.queryKey[1] !== 'imageStatus'
      })
    }
  }, [data, queryClient])
}

/** Decade label: 1970 -> "1970s". */
export function decadeLabel(start: number): string {
  return `${start}s`
}
