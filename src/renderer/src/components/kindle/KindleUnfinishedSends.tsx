import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { confirmDialog } from '../../lib/confirm'
import { bytes } from '../../lib/kindle'
import { qk } from '../../lib/queryKeys'
import { toast } from '../../lib/toast'

const RESULT = {
  complete: 'was complete after all, and is now recorded as sent',
  absent: 'is not on the Kindle; nothing to clean up',
  removed: 'was an incomplete copy and was removed',
  superseded: 'now holds a later, complete send, so it was left alone',
  foreign: 'now holds a different file (larger than the upload, or not a book file), so it was left alone'
} as const

// Sends that never finished (NaviHUB quit mid-copy, or a cleanup failed) may
// have left a partial book in documents/NaviHUB/. Each one is checked on the
// connected Kindle when the user asks, and removed only if it is not the
// complete file.
export default function KindleUnfinishedSends() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState<number | null>(null)
  const { data: rows = [] } = useQuery({
    queryKey: qk.kindle.unfinishedSends,
    queryFn: () => api.kindle.unfinishedSends()
  })
  // A send that ends after its dialog closed can leave a row here: watch the
  // send while it runs and refresh this list when it finishes.
  const { data: sending } = useQuery({
    queryKey: qk.kindle.sendStatus,
    queryFn: () => api.kindle.sendStatus(),
    refetchInterval: (q) => (q.state.data?.running ? 1500 : false)
  })
  const wasRunning = useRef(false)
  useEffect(() => {
    if (wasRunning.current && sending && !sending.running) {
      void qc.invalidateQueries({ queryKey: qk.kindle.unfinishedSends })
    }
    wasRunning.current = !!sending?.running
  }, [sending, qc])
  if (rows.length === 0) return null

  async function resolve(id: number, path: string): Promise<void> {
    const ok = await confirmDialog(
      `Check ${path} on the Kindle? If it is an incomplete copy from this send, it is removed. A complete copy is kept and recorded as sent, and a different file under that name is left alone.`,
      { confirmLabel: 'Check and clean up' }
    )
    if (!ok) return
    setBusy(id)
    try {
      const r = await api.kindle.resolveUnfinished(id)
      toast(`${path} ${RESULT[r]}.`, 'success')
      await qc.invalidateQueries({ queryKey: qk.kindle.all })
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Could not check that file.', 'error')
    } finally {
      setBusy(null)
    }
  }

  return (
    <section className="mb-6" aria-label="Unfinished sends">
      <h2 className="label mb-1">Unfinished sends ({rows.length})</h2>
      <p className="mb-2 text-xs text-gray-400">
        These copies were cut off, so a partial book may be on the Kindle. With the Kindle connected, Check and
        clean up compares the file with the original and removes it only if it is incomplete.
      </p>
      <ul className="divide-y divide-line-subtle">
        {rows.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center gap-3 py-2 text-sm">
            <span className="min-w-0 flex-1">
              <span className="block">{r.title}</span>
              <span className="block break-all text-xs text-gray-400">
                {r.devicePath} · {bytes(r.bytes)} · {new Date(`${r.createdAt}Z`).toLocaleString()}
              </span>
            </span>
            <button
              type="button"
              className="btn-ghost text-xs"
              disabled={busy != null}
              onClick={() => void resolve(r.id, r.devicePath)}
            >
              {busy === r.id ? 'Checking…' : 'Check and clean up'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
