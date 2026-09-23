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
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  return <div className="flex items-center gap-3 border-b border-line-subtle py-2">
    <button className="min-w-0 flex-1 text-left text-sm hover:text-accent" onClick={() => void api.video.openExternal({ kind: 'wrestling', fileId: file.id }).catch(toastError)}>{file.title}</button>
    <span className="text-xs text-ink-muted">{fmtDuration(file.duration)}</span>
    <button className="btn-ghost text-xs" aria-label={`${file.watchedAt ? 'Mark unwatched' : 'Mark watched'}: ${file.title}`} disabled={busy} onClick={async () => {
      setBusy(true)
      try { await api.video.markWatched({ kind: 'wrestling', fileId: file.id }, !file.watchedAt); await qc.invalidateQueries({ queryKey: qk.wrestling.all }) }
      catch (e) { toastError(e) } finally { setBusy(false) }
    }}>{file.watchedAt ? 'Watched' : 'Mark watched'}</button>
  </div>
}

export default function WrestlingFilesSection({ eventId }: { eventId: number }): JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery({
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

  if (isLoading) return <Section title="My copy"><p className="text-sm text-ink-muted">Loading files…</p></Section>
  if (isError) return <Section title="My copy"><p role="alert">Could not load files. <button className="btn" onClick={() => void refetch()}>Retry files</button></p></Section>
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
