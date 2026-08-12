import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { BulkRunStatus } from '@shared/types'

// Poll for a bulk-import run — the useOcrRun shape verbatim. Module-level
// lastSettled so the settled toast fires once per run even across remounts.
let lastSettled: string | null = null

export interface BulkRunHook {
  status: BulkRunStatus | undefined | null
  running: boolean
  // refetchInterval is false while idle, so every start/cancel must kick the
  // poll back to life — otherwise a started run would never report progress.
  kick: () => Promise<void>
}

export function useBulkRun(): BulkRunHook {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.bulk.status,
    queryFn: () => api.bulk.status(),
    // Self-gating off the polled data, so a run that is already going keeps
    // reporting after navigating away and back.
    refetchInterval: (q) => (q.state.data?.state === 'running' ? 500 : false)
  })

  useEffect(() => {
    if (!status || status.state === 'running' || status.state === 'idle') return
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    const tally = `${status.imported} imported, ${status.skipped} skipped${status.failed ? `, ${status.failed} failed` : ''}`
    if (status.state === 'done') {
      toast(`Bulk import finished — ${tally}.`, 'success')
    } else if (status.state === 'cancelled') {
      toast(`Bulk import stopped — ${tally} kept.`, 'success')
    } else if (status.state === 'error' && status.message) {
      toast(status.message, 'error')
    }
    void qc.invalidateQueries({ queryKey: qk.media.all })
    void qc.invalidateQueries({ queryKey: qk.mediaCounts.all })
  }, [status, qc])

  return {
    status,
    running: status?.state === 'running',
    kick: async () => {
      await qc.invalidateQueries({ queryKey: qk.bulk.status })
    }
  }
}
