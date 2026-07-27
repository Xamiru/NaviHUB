import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { UpdateStatus } from '@shared/types'

// States where main is still working, so the status is worth re-reading.
const ACTIVE = new Set<UpdateStatus['state']>(['checking', 'downloading'])

// Module-level, not per-hook: if the Settings card and a future header pill both
// mount this, the settled toast must fire once per run, not once per instance
// (the MusicDownloadDialog precedent).
let lastSettled: string | null = null

export interface UpdateStatusHook {
  status: UpdateStatus | undefined
  // refetchInterval is false while idle, so every mutation must kick the poll
  // back to life — otherwise a started download would never report progress.
  kick: () => Promise<void>
}

export function useUpdateStatus(): UpdateStatusHook {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.update.status,
    queryFn: () => api.updates.status(),
    // Self-gating off the polled data rather than a local flag, so a download
    // that is already running keeps reporting after navigating away and back.
    refetchInterval: (q) => (q.state.data && ACTIVE.has(q.state.data.state) ? 500 : false)
  })

  useEffect(() => {
    if (!status || ACTIVE.has(status.state)) return
    // Composite key: idempotent across re-polls, but re-arms on the next run.
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    if (status.state === 'ready') {
      toast(`Version ${status.version ?? ''} downloaded — restart to install`.trim(), 'success')
    } else if (status.state === 'upToDate') {
      toast('Already on the latest version', 'success')
    } else if (status.state === 'error' && status.message) {
      toast(status.message, 'error')
    }
  }, [status])

  return {
    status,
    kick: async () => {
      await qc.invalidateQueries({ queryKey: qk.update.status })
    }
  }
}
