import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import type { LogEntry } from '@shared/types'

// Cursor poll over the main-process log ring — the useTorrentSearch idiom:
// the cursor lives in a ref and the rows accumulate in component state, NOT in
// the query cache. Keying by cursor would mint a fresh cache entry every second
// and grow the cache without bound.
//
// Memory is capped in three independent places: main's ring (3000), the
// per-poll limit (below), and the client slice here. Nothing accumulates
// forever, and unmounting the page drops all of it.
const MAX_ROWS = 5000
const PAGE = 500
const POLL_MS = 1000

export interface LogTailHook {
  rows: LogEntry[]
  dropped: number
  refetch: () => void
  clear: () => void
}

export function useLogTail(follow: boolean): LogTailHook {
  const cursorRef = useRef(0)
  const [rows, setRows] = useState<LogEntry[]>([])
  const [dropped, setDropped] = useState(0)

  const { refetch } = useQuery({
    queryKey: qk.logs.tail,
    // Follow off = frozen: no poll at all. The Refresh button calls refetch(),
    // so a paused reader can still top up on demand.
    refetchInterval: follow ? POLL_MS : false,
    retry: false,
    queryFn: async () => {
      // afterSeq 0/undefined means "seed me": main answers with the NEWEST
      // entries and jumps the cursor to its head, so a freshly-opened viewer is
      // instantly current instead of replaying history.
      const page = await api.logs.tail({ afterSeq: cursorRef.current || undefined, limit: PAGE })
      if (page.dropped > 0) setDropped((d) => d + page.dropped)
      cursorRef.current = page.nextSeq
      if (page.entries.length > 0) {
        setRows((prev) => {
          const next = prev.concat(page.entries)
          return next.length > MAX_ROWS ? next.slice(next.length - MAX_ROWS) : next
        })
      }
      // The QUERY holds one small page; the accumulated array lives in state.
      return page
    }
  })

  return {
    rows,
    dropped,
    refetch: () => void refetch(),
    clear: () => {
      setRows([])
      setDropped(0)
    }
  }
}
