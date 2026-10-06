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

/**
 * The local copy only. Pages never load the remote URL themselves: a decade or
 * article would fire dozens of parallel requests at Wikimedia (which rate-limits
 * bursts) on top of the paced background cache, so an image shows a placeholder
 * until its copy lands.
 */
export function historyImageSrc(img: HistoryImage | null | undefined, width?: number): string | null {
  if (!img?.cached) return null
  return (width ? thumbUrl(img.cached, width) : null) ?? mediaUrl(img.cached)
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

const NO_IMAGE_KEYS = new Set<unknown>([qk.history.imageStatus[1], qk.history.borders[1], qk.history.archiveJobs[1]])

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
  // Refresh the views as images land (each poll that saw progress) and once more
  // when the queue settles, so pictures appear one by one instead of all at the end.
  const wasRunning = useRef(false)
  const seenDone = useRef(0)
  useEffect(() => {
    if (!data) return
    // Only views that carry images: the map's borders are large and never change.
    const refresh = (): void =>
      void queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === 'history' && !NO_IMAGE_KEYS.has(q.queryKey[1])
      })
    if (data.running) {
      if (wasRunning.current && data.done > seenDone.current) refresh()
      wasRunning.current = true
      seenDone.current = data.done
    } else if (wasRunning.current) {
      wasRunning.current = false
      seenDone.current = 0
      refresh()
    }
  }, [data, queryClient])
}

/** Decade label: 1970 -> "1970s". */
export function decadeLabel(start: number): string {
  return `${start}s`
}
