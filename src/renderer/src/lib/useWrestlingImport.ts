import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { WrestlingImportStatus } from '@shared/types'

// Poll for a wiki import run — the useBulkRun/useOcrRun shape verbatim.
// Module-level lastSettled so the settled toast fires once per run even with
// two panels mounted.
let lastSettled: string | null = null

export interface WrestlingImportHook {
  status: WrestlingImportStatus | undefined
  running: boolean
  // refetchInterval is false while idle, so every start/cancel must kick the
  // poll back to life — otherwise a started run never reports progress.
  kick: () => Promise<void>
}

export function useWrestlingImport(): WrestlingImportHook {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.wrestling.importStatus,
    queryFn: () => api.wrestling.importStatus(),
    // Self-gating off the polled data, so a crawl already under way keeps
    // reporting after navigating away and back.
    refetchInterval: (q) => (q.state.data?.state === 'running' ? 700 : false)
  })

  useEffect(() => {
    if (!status || status.state === 'running' || status.state === 'idle') return
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    const tally = `${status.events} events, ${status.matches} matches${
      status.failed ? `, ${status.failed} failed` : ''
    }`
    if (status.state === 'done') toast(`Wiki import finished — ${tally}.`, 'success')
    else if (status.state === 'cancelled') toast(`Wiki import stopped — ${tally} kept.`, 'success')
    else if (status.state === 'error' && status.message) toast(status.message, 'error')
    void qc.invalidateQueries({ queryKey: qk.wrestling.all })
  }, [status, qc])

  return {
    status,
    running: status?.state === 'running',
    kick: async () => {
      await qc.invalidateQueries({ queryKey: qk.wrestling.importStatus })
    }
  }
}
