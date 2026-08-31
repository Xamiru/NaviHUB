import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import { confirmDialog } from '../../lib/confirm'
import Section from '../Section'
import type { WrestlingVideo } from '@shared/types'

// The collection half of an event page: attach a folder of rips, then open them
// in the operating system's default video player.

function fmtDuration(seconds: number | null): string {
  if (seconds == null) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function Row({ file }: { file: WrestlingVideo }): JSX.Element {
  return (
    <button
      onClick={() =>
        void api.video.openExternal({ kind: 'wrestling', fileId: file.id }).catch(toastError)
      }
      className="flex w-full items-baseline justify-between gap-4 border-b border-base-700 py-2 text-left last:border-0 hover:text-accent"
    >
      <span className="min-w-0 truncate text-sm">{file.title}</span>
      <span className="shrink-0 text-xs text-gray-500">{fmtDuration(file.duration)}</span>
    </button>
  )
}

export default function WrestlingFilesSection({ eventId }: { eventId: number }): JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const { data } = useQuery({
    queryKey: qk.wrestling.files(eventId),
    queryFn: () => api.wrestling.files(eventId)
  })

  async function run(fn: () => Promise<{ ok: boolean; error?: string; fileCount?: number }>) {
    setBusy(true)
    try {
      const res = await fn()
      // ok:false with no error is a cancelled picker — not a failure.
      if (!res.ok && res.error) toast(res.error, 'error')
      else if (res.ok) toast(`${res.fileCount} file${res.fileCount === 1 ? '' : 's'} found.`, 'success')
      await qc.invalidateQueries({ queryKey: qk.wrestling.all })
    } finally {
      setBusy(false)
    }
  }

  const files = data?.files ?? []

  return (
    <Section
      title="My copy"
      subtitle={files.length ? `${files.length} file${files.length === 1 ? '' : 's'}` : undefined}
    >
      {files.length === 0 ? (
        <div className="card p-5">
          <p className="text-sm text-gray-500">
            No files attached. Point this event at the folder holding your rip.
          </p>
          <button className="btn mt-3" disabled={busy} onClick={() => run(() => api.wrestling.attachFolder(eventId))}>
            Attach folder
          </button>
        </div>
      ) : (
        <div className="card px-4 py-1">
          {files.map((f) => (
            <Row key={f.id} file={f} />
          ))}
          <div className="flex gap-2 border-t border-base-700 py-3">
            <button className="btn" disabled={busy} onClick={() => run(() => api.wrestling.rescan(eventId))}>
              Rescan
            </button>
            <button
              className="btn-danger"
              disabled={busy}
              onClick={async () => {
                if (!(await confirmDialog('Detach this folder?\n\nThe files stay on disk.', { danger: true })))
                  return
                await api.wrestling.detach(eventId)
                await qc.invalidateQueries({ queryKey: qk.wrestling.all })
              }}
            >
              Detach
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}
