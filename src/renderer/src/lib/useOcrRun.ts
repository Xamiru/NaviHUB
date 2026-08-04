import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { MangaOcrRunStatus } from '@shared/types'

// Poll for an in-app mokuro OCR run — the useUpdateStatus shape verbatim.
const ACTIVE = new Set<MangaOcrRunStatus['state']>(['starting', 'running'])

// Module-level, not per-hook: the settled toast must fire once per run even if
// several Chapters tabs mount the hook (the MusicDownloadDialog precedent).
let lastSettled: string | null = null

export interface OcrRunHook {
  status: MangaOcrRunStatus | undefined | null
  running: boolean
  // refetchInterval is false while idle, so every start/cancel must kick the
  // poll back to life — otherwise a started run would never report progress.
  kick: () => Promise<void>
}

export function useOcrRun(): OcrRunHook {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.manga.ocrRunStatus,
    queryFn: () => api.manga.ocrRunStatus(),
    // Self-gating off the polled data rather than a local flag, so a run that
    // is already going keeps reporting after navigating away and back.
    refetchInterval: (q) => (q.state.data && ACTIVE.has(q.state.data.state) ? 500 : false)
  })

  useEffect(() => {
    if (!status || ACTIVE.has(status.state)) return
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    if (status.state === 'done') {
      const n = status.okCount ?? status.volumeCount ?? 0
      toast(`OCR finished: ${n} volume${n === 1 ? '' : 's'} — open a chapter to mine`, 'success')
    } else if (status.state === 'error' && status.message) {
      toast(status.message, 'error')
    }
    // New sidecars change the overview chips + the reader's ocrStatus.
    void qc.invalidateQueries({ queryKey: qk.manga.all })
  }, [status, qc])

  return {
    status,
    running: status != null && ACTIVE.has(status.state),
    kick: async () => {
      await qc.invalidateQueries({ queryKey: qk.manga.ocrRunStatus })
    }
  }
}
