import { useId, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { bytes } from '../../lib/kindle'
import { qk } from '../../lib/queryKeys'
import Dialog from '../Dialog'
import type { KindleSendItem } from '@shared/types'

// Send to Kindle: shows what goes where and the space it leaves, then copies
// on Send. Files land in documents/NaviHUB/ on the Kindle; nothing there or
// elsewhere is replaced. The copy runs as a task, so closing the dialog does
// not stop it (Tasks can).
export default function KindleSendDialog({
  title,
  items,
  onClose
}: {
  title: string
  items: KindleSendItem[]
  onClose: () => void
}) {
  const headingId = useId()
  const qc = useQueryClient()
  const key = JSON.stringify(items)
  const [started, setStarted] = useState(false)
  const [starting, setStarting] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)
  const preview = useQuery({
    queryKey: qk.kindle.sendPreview(key),
    queryFn: () => api.kindle.sendPreview(items),
    staleTime: 0,
    gcTime: 0,
    enabled: !started
  })
  const status = useQuery({
    queryKey: qk.kindle.sendStatus,
    queryFn: () => api.kindle.sendStatus(),
    enabled: started,
    refetchInterval: (q) => (q.state.data?.running === false ? false : 700)
  })

  async function send(): Promise<void> {
    setStarting(true)
    setStartError(null)
    try {
      const s = await api.kindle.send(items)
      qc.setQueryData(qk.kindle.sendStatus, s)
      setStarted(true)
    } catch (err) {
      setStartError(err instanceof Error ? err.message : 'The send could not start.')
    } finally {
      setStarting(false)
    }
  }

  const p = preview.data
  const s = started ? status.data : undefined
  const finished = !!s && !s.running

  return (
    <Dialog labelledBy={headingId} onClose={onClose} panelClassName="card flex max-h-full w-full max-w-lg flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={headingId} className="text-lg font-semibold">
          Send {title} to the Kindle
        </h2>
        <button className="px-2 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="-mx-1 flex-1 space-y-3 overflow-y-auto px-1 text-sm">
        {!started && preview.isLoading && <p className="text-gray-400">Looking for the Kindle…</p>}
        {!started && preview.isError && (
          <p role="alert" className="text-signal-anomaly">
            {preview.error instanceof Error ? preview.error.message : 'Could not prepare the send.'}
          </p>
        )}
        {!started && p && (
          <>
            {p.device && (
              <p>
                {p.device.label}
                {p.device.freeBytes != null && (
                  <span className="text-gray-400">
                    {' '}
                    · {bytes(p.device.freeBytes)} free
                    {p.freeAfter != null && `, ${bytes(p.freeAfter)} after`}
                  </span>
                )}
              </p>
            )}
            <ul className="divide-y divide-line-subtle" aria-label="Files to send">
              {p.files.map((f) => (
                <li key={f.key} className="py-2">
                  <span className="block">{f.title}</span>
                  <span className="block text-xs text-gray-400">
                    {bytes(f.bytes)}
                    {f.deviceName && ` · documents/NaviHUB/${f.deviceName}`}
                  </span>
                </li>
              ))}
            </ul>
            {p.refusal ? (
              <p role="alert" className="text-signal-anomaly">
                {p.refusal}
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                Each file is copied, then read back and compared byte for byte. A copy that does not match is
                removed again. Nothing already on the Kindle is replaced.
              </p>
            )}
          </>
        )}
        {startError && (
          <p role="alert" className="text-signal-anomaly">
            {startError}
          </p>
        )}
        {s && (
          <div role="status" className="space-y-2">
            {s.running ? (
              <p>
                Sending {Math.min(s.done + 1, s.total)} of {s.total}
                {s.current ? `: ${s.current}` : ''}…
              </p>
            ) : (
              <p>
                {s.sent.length} of {s.total} sent{s.stopped ? ', then stopped' : ''}.
              </p>
            )}
            {s.sent.map((n) => (
              <p key={n} className="text-xs text-gray-400">
                ✓ documents/NaviHUB/{n}
              </p>
            ))}
            {s.failed.map((f, i) => (
              <p key={`${i}:${f.title}`} className="text-xs text-signal-anomaly">
                {f.title}: {f.error}
              </p>
            ))}
            {finished && s.sent.length > 0 && (
              <p className="text-xs text-gray-400">On the Kindle, the books are in the NaviHUB folder in KOReader.</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose}>
          {started ? 'Done' : 'Cancel'}
        </button>
        {!started && (
          <button
            type="button"
            className="btn-primary"
            disabled={!p || !!p.refusal || p.files.length === 0 || starting}
            onClick={() => void send()}
          >
            Send {p && p.files.length > 1 ? `${p.files.length} files` : ''}
          </button>
        )}
      </div>
    </Dialog>
  )
}
