import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { RefreshRunStatus } from '@shared/types'

// Poll for a Library Refresh run — the useBulkRun shape verbatim, including the
// module-level lastSettled so the settled toast fires once per run even when the
// page remounts.
let lastSettled: string | null = null

export interface RefreshRunHook {
  status: RefreshRunStatus | undefined | null
  running: boolean
  // refetchInterval is false while idle, so every start/cancel must kick the
  // poll back to life or a started run would never report progress.
  kick: () => Promise<void>
}

export function useRefreshRun(): RefreshRunHook {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.refresh.status,
    queryFn: () => api.refresh.status(),
    refetchInterval: (q) => (q.state.data?.state === 'running' ? 500 : false)
  })

  useEffect(() => {
    if (!status || status.state === 'running' || status.state === 'idle') return
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    const tally = `${status.refreshed} refreshed${status.skipped ? `, ${status.skipped} skipped` : ''}${
      status.failed ? `, ${status.failed} failed` : ''
    }`
    if (status.state === 'done') {
      toast(`Refresh finished — ${tally}.`, 'success')
    } else if (status.state === 'cancelled') {
      toast(`Refresh stopped — ${tally} kept.`, 'success')
    } else if (status.state === 'error' && status.message) {
      toast(status.message, 'error')
    }
    // A refresh rewrites covers, banners and episode catalogues, all of which
    // are denormalized into list cards and detail pages.
    void qc.invalidateQueries({ queryKey: qk.media.all })
  }, [status, qc])

  return {
    status,
    running: status?.state === 'running',
    kick: async () => {
      await qc.invalidateQueries({ queryKey: qk.refresh.status })
    }
  }
}
