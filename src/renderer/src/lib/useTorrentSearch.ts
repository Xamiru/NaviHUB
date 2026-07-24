import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import type { TorrentSearchResult } from '@shared/types'

export interface TorrentSearchState {
  results: TorrentSearchResult[]
  query: string // the active search text (drives relevance filtering)
  running: boolean
  started: boolean // a search has been kicked off at least once
  indexerDone: number
  indexerTotal: number
  indexerErrors: string[]
  error: string | null // start failure (unconfigured / Jackett unreachable)
  start: (query: string, categories: number[]) => Promise<void>
  cancel: () => void
}

// Drives a main-process fan-out job: start it, then poll status while it runs,
// appending only the rows we don't have yet (a broad search tops 1000 results,
// so re-sending everything every 400ms would jank the UI). Results stay put
// when the job finishes or is cancelled.
export function useTorrentSearch(): TorrentSearchState {
  const [results, setResults] = useState<TorrentSearchResult[]>([])
  const [query, setQuery] = useState('')
  const [jobId, setJobId] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const offsetRef = useRef(0)
  const jobIdRef = useRef<string | null>(null)

  const { data: status } = useQuery({
    queryKey: qk.torrents.status(jobId ?? ''),
    enabled: !!jobId && running,
    refetchInterval: 400,
    // Main already retried per indexer; a failed poll shouldn't spiral.
    retry: false,
    queryFn: async () => {
      const s = await api.torrents.searchStatus(offsetRef.current)
      // A stale job's rows must never land in a newer search's list.
      if (s && s.id === jobIdRef.current) {
        if (s.results.length > 0) {
          offsetRef.current += s.results.length
          setResults((prev) => [...prev, ...s.results])
        }
        if (!s.running) setRunning(false)
      }
      return s
    }
  })

  const start = useCallback(async (query: string, categories: number[]): Promise<void> => {
    setError(null)
    setResults([])
    setQuery(query.trim())
    setStarted(true)
    offsetRef.current = 0
    try {
      const { id } = await api.torrents.startSearch(query, categories)
      jobIdRef.current = id
      setJobId(id)
      setRunning(true)
    } catch (e) {
      jobIdRef.current = null
      setJobId(null)
      setRunning(false)
      setError(e instanceof Error ? e.message : 'Search failed')
    }
  }, [])

  const cancel = useCallback((): void => {
    const id = jobIdRef.current
    if (!id) return
    setRunning(false)
    void api.torrents.cancelSearch(id)
  }, [])

  // Closing the dialog / leaving the page must not leave 59 indexer requests
  // running. cancelSearch is id-guarded, so a re-mounted search is unaffected.
  useEffect(() => {
    return () => {
      const id = jobIdRef.current
      if (id) void api.torrents.cancelSearch(id)
    }
  }, [])

  return {
    results,
    query,
    running,
    started,
    indexerDone: status?.indexerDone ?? 0,
    indexerTotal: status?.indexerTotal ?? 0,
    indexerErrors: status?.errors ?? [],
    error,
    start,
    cancel
  }
}
