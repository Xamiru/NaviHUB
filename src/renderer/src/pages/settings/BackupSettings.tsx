import { useId, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { LibraryBackupStatus, RestorePreview } from '@shared/types'
import { formatBytes } from '@shared/torrents'
import Dialog from '../../components/Dialog'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { confirmDialog } from '../../lib/confirm'
import { toast, toastError } from '../../lib/toast'
import { SettingCard } from './shared'

function when(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? 'an unknown date' : date.toLocaleString()
}

function StatusLine({ status }: { status: LibraryBackupStatus }) {
  if (status.phase === 'idle' || status.phase === 'choosing') return null
  const tone =
    status.phase === 'error' ? 'text-signal-anomaly' : status.phase === 'done' ? 'text-signal-affirmative' : 'text-ink-secondary'
  return (
    <div className="mt-4" role="status">
      <p className={`text-sm ${tone}`}>
        {status.error ?? status.message}
        {status.running && status.percent != null ? ` (${status.percent}%)` : ''}
      </p>
      {status.running && status.percent != null && (
        <div
          className="mt-2 h-1.5 overflow-hidden rounded bg-surface-raised"
          role="progressbar"
          aria-label={status.kind === 'restore' ? 'Restore progress' : 'Backup progress'}
          aria-valuenow={status.percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full bg-accent" style={{ width: `${status.percent}%` }} />
        </div>
      )}
    </div>
  )
}

function RestoreDialog({
  preview,
  busy,
  onConfirm,
  onClose
}: {
  preview: RestorePreview
  busy: boolean
  onConfirm: () => void
  onClose: () => void
}) {
  const titleId = useId()
  const included = [
    preview.includes.media && 'Media',
    preview.includes.history && 'History archive',
    preview.includes.pictures && 'Pictures',
    preview.includes.jpaudio && 'Japanese audio',
    preview.includes.audio && 'Theme songs'
  ].filter(Boolean)
  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card w-full max-w-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 id={titleId} className="text-lg font-semibold text-ink">
          Restore this backup?
        </h2>
        <button type="button" className="btn-ghost px-2" aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      <dl className="mt-4 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
        <dt className="text-ink-muted">Made</dt>
        <dd className="text-ink">{when(preview.createdAt)}</dd>
        <dt className="text-ink-muted">On</dt>
        <dd className="text-ink">
          {preview.machine || 'an unknown machine'}
          {preview.sameMachine ? ' (this machine)' : ''}
        </dd>
        <dt className="text-ink-muted">NaviHUB</dt>
        <dd className="text-ink">{preview.appVersion}</dd>
        <dt className="text-ink-muted">Titles</dt>
        <dd className="text-ink">{preview.titles.toLocaleString()}</dd>
        <dt className="text-ink-muted">Files</dt>
        <dd className="text-ink">
          {included.length ? `${included.join(', ')}: ${preview.files.toLocaleString()} files, ${formatBytes(preview.bytes)}` : 'none'}
        </dd>
      </dl>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-secondary">
        <li>Your current library is replaced by this backup, then NaviHUB restarts.</li>
        <li>The current library is kept as a safety copy, so you can undo this below.</li>
        <li>Images are only added, never deleted. This machine keeps its own folders and tool paths.</li>
        {!preview.sameMachine && (
          <li>Keys saved on another machine cannot be read here; re-enter any that show as unreadable.</li>
        )}
      </ul>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="btn-danger" onClick={onConfirm} disabled={busy}>
          {busy ? 'Restoring…' : 'Replace library and restart'}
        </button>
      </div>
    </Dialog>
  )
}

export function BackupSettings() {
  const qc = useQueryClient()
  const [includePictures, setIncludePictures] = useState(false)
  const [starting, setStarting] = useState(false)
  const [preview, setPreview] = useState<RestorePreview | null>(null)
  // Measuring reads every file in the backed-up folders, so it runs only when
  // asked, like Storage usage; a backup measures again for itself anyway.
  const estimate = useQuery({
    queryKey: qk.backup.estimate,
    queryFn: () => api.backup.estimate(),
    enabled: false,
    staleTime: Infinity
  })
  const statusQuery = useQuery({
    queryKey: qk.backup.status,
    queryFn: () => api.backup.status(),
    refetchInterval: (query) =>
      query.state.data?.running || query.state.data?.phase === 'restarting' || starting ? 500 : false
  })
  const copies = useQuery({ queryKey: qk.backup.safetyCopies, queryFn: () => api.backup.safetyCopies() })
  const status = statusQuery.data
  const busy = starting || status?.running === true || status?.phase === 'restarting'

  async function run(action: () => Promise<unknown>): Promise<void> {
    setStarting(true)
    try {
      await action()
    } catch (err) {
      toastError(err)
    } finally {
      setStarting(false)
      await qc.invalidateQueries({ queryKey: qk.backup.all })
    }
  }

  async function chooseRestore(): Promise<void> {
    await run(async () => {
      const picked = await api.backup.chooseRestore()
      if (picked) setPreview(picked)
    })
  }

  async function confirmRestore(): Promise<void> {
    await run(() => api.backup.startRestore())
    setPreview(null)
  }

  async function closePreview(): Promise<void> {
    setPreview(null)
    await api.backup.discardRestore()
  }

  const sizes = estimate.data
  const backupBytes = sizes
    ? sizes.database + sizes.media + sizes.history + sizes.jpaudio + sizes.audio + (includePictures ? sizes.pictures : 0)
    : null

  return (
    <SettingCard
      title="Backup and restore"
      description="A complete copy of your library: tracking, notes, lists, playlists, learning progress, settings and keys, plus your Media and History archive files, Japanese mining audio and theme songs. Restore it here or on another machine to carry your library across; nothing syncs on its own."
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="btn-primary"
          disabled={busy}
          onClick={() => void run(() => api.backup.start({ includePictures }))}
        >
          Back up now…
        </button>
        <button className="btn-ghost" disabled={busy} onClick={() => void chooseRestore()}>
          Restore from backup…
        </button>
        {status?.running && (
          <button className="btn-ghost" onClick={() => void api.backup.cancel()}>
            Cancel
          </button>
        )}
        {status?.phase === 'done' && status.outputPath && (
          <button className="btn-ghost" onClick={() => void api.backup.reveal()}>
            Show backup file
          </button>
        )}
      </div>
      <label className="mt-4 flex items-start gap-2 text-sm text-ink">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={includePictures}
          disabled={busy}
          onChange={(e) => setIncludePictures(e.target.checked)}
        />
        <span>
          Include the Pictures folder
          {sizes ? ` (${sizes.pictures > 0 ? formatBytes(sizes.pictures) : 'empty'})` : ''}
          <span className="block text-xs text-ink-muted">
            Wallpapers and fan art from Art tabs. Without it, those pictures stay listed but their
            files must be copied by hand.
          </span>
        </span>
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
        <span>
          {estimate.isFetching
            ? 'Measuring the backup size…'
            : backupBytes != null
              ? `This backup will be about ${formatBytes(backupBytes)}.`
              : estimate.isError
                ? 'Could not measure the backup size.'
                : 'Measuring reads every file in the backed-up folders, so it runs only when you ask.'}
        </span>
        <button
          className="btn-ghost px-2 py-1 text-xs"
          disabled={estimate.isFetching}
          onClick={() => void estimate.refetch()}
        >
          {sizes ? 'Measure again' : 'Measure size'}
        </button>
      </div>
      {status && <StatusLine status={status} />}

      {copies.data && copies.data.length > 0 && (
        <div className="mt-6 border-t border-line-subtle pt-4">
          <h3 className="text-sm font-semibold text-ink">Libraries replaced by a restore</h3>
          <p className="mt-0.5 text-xs text-ink-muted">
            Putting one back replaces the current library the same way, keeping it as a safety copy in turn.
          </p>
          <ul className="mt-3 space-y-2">
            {copies.data.map((copy) => (
              <li key={copy.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-ink">
                  Replaced {when(copy.createdAt)}
                  {copy.replacedBy ? ` by ${copy.replacedBy}` : ''}
                  <span className="ml-2 text-xs text-ink-muted">{formatBytes(copy.bytes)}</span>
                </span>
                <span className="flex gap-2">
                  <button
                    className="btn-ghost px-2 py-1 text-xs"
                    disabled={busy}
                    onClick={async () => {
                      const ok = await confirmDialog(
                        'Put this library back? The current one is kept as a safety copy, and NaviHUB restarts.',
                        { confirmLabel: 'Put it back', danger: true }
                      )
                      if (ok) await run(() => api.backup.restoreSafetyCopy(copy.id))
                    }}
                  >
                    Put back
                  </button>
                  <button
                    className="btn-ghost px-2 py-1 text-xs"
                    disabled={busy}
                    onClick={async () => {
                      const ok = await confirmDialog('Delete this safety copy? It cannot be recovered.', {
                        confirmLabel: 'Delete',
                        danger: true
                      })
                      if (!ok) return
                      await run(() => api.backup.deleteSafetyCopy(copy.id))
                      toast('Safety copy deleted', 'success')
                    }}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {preview && (
        <RestoreDialog
          preview={preview}
          busy={busy}
          onConfirm={() => void confirmRestore()}
          onClose={() => void closePreview()}
        />
      )}
    </SettingCard>
  )
}
