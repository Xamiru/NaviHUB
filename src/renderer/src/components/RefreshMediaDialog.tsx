import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog } from '../lib/hooks'
import { toast, toastError } from '../lib/toast'
import { REFRESH_ASPECTS } from '@shared/refresh'
import type { RefreshAspect } from '@shared/refresh'
import type { MediaDetail } from '@shared/types'

// One title's refresh, from the detail page's ActionMenu. The bulk tab's little
// brother: same aspects, no run and no poll — a plain await, because it is a
// single import and the toast is the whole feedback story.
export default function RefreshMediaDialog({
  m,
  onClose
}: {
  m: MediaDetail
  onClose: () => void
}): React.JSX.Element {
  const qc = useQueryClient()
  const ref = useDialog(onClose)
  const supported = REFRESH_ASPECTS.filter((a) => a.types.includes(m.mediaType))
  const [aspects, setAspects] = useState<RefreshAspect[]>(
    // Default to the art, which is what an existing library is usually missing.
    supported.filter((a) => a.key === 'cover' || a.key === 'banner').map((a) => a.key)
  )
  const [busy, setBusy] = useState(false)

  async function go(): Promise<void> {
    setBusy(true)
    try {
      await api.refresh.one(m.id, aspects)
      await qc.invalidateQueries({ queryKey: qk.media.all })
      toast(`Refreshed ${m.title}.`, 'success')
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Refresh from source"
        tabIndex={-1}
        className="card w-full max-w-md p-5"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold">Refresh from source</h2>
            <p className="mt-0.5 truncate text-xs text-gray-500">{m.title}</p>
          </div>
          <button className="text-gray-400 hover:text-white" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-1.5">
          {supported.map((a) => {
            const on = aspects.includes(a.key)
            return (
              <button
                key={a.key}
                className={`${on ? 'chip-toggle chip-toggle-active' : 'chip-toggle'} w-full text-left`}
                aria-pressed={on}
                onClick={() =>
                  setAspects(on ? aspects.filter((x) => x !== a.key) : [...aspects, a.key])
                }
              >
                <span className="block text-sm">{a.label}</span>
                <span className="block text-[10px] text-gray-500">{a.hint}</span>
              </button>
            )
          })}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          Only what you tick is rewritten. Your status, score and progress stay put, and so do the
          cast, studios and genres.
        </p>

        <button className="btn-primary mt-4 w-full" onClick={go} disabled={busy || !aspects.length}>
          {busy ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}
