import { useEffect, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import QuietWorkspace from './QuietWorkspace'
import type { StorageRootKey } from '@shared/types'

// One of the app's own file roots (pictures, media, History archive) in
// Settings → Folders. The path is not free text: stored rows are relative to
// it, so changing it without moving the files would break every one of them.
// Move… does both.
export default function StorageFolderSetting({
  root,
  title,
  description
}: {
  root: StorageRootKey
  title: string
  description: ReactNode
}): JSX.Element {
  const qc = useQueryClient()
  const paths = useQuery({ queryKey: qk.storage.paths, queryFn: () => api.storage.paths() })
  const status = useQuery({
    queryKey: qk.storage.status,
    queryFn: () => api.storage.status(),
    refetchInterval: (q) => (q.state.data?.running ? 700 : false)
  })
  const s = status.data
  const mine = s?.root === root
  const current = paths.data?.[root] ?? null

  // The setting changes mid-move (after the copy), so re-read the path as the
  // phase moves on.
  useEffect(() => {
    if (s?.phase) void qc.invalidateQueries({ queryKey: qk.storage.paths })
  }, [s?.phase, qc])

  async function move(): Promise<void> {
    const to = await api.storage.chooseFolder(root)
    if (!to) return
    const slideshow =
      root === 'pictures' && paths.data?.slideshowInsidePictures
        ? ' The Slideshow folder moves too, so point Windows at its new location afterwards.'
        : ''
    const ok = await confirmDialog(
      `Move everything from ${current ?? 'the current folder'} to ${to}? The old copies are removed only after the new folder is complete.${slideshow}`,
      { confirmLabel: 'Move' }
    )
    if (!ok) return
    await api.storage.move(root, to)
    await qc.invalidateQueries({ queryKey: qk.storage.all })
  }

  return (
    <QuietWorkspace title={title} description={description}>
      <div className="grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <p className="min-w-0 truncate rounded bg-base-800 px-3 py-2 font-mono text-sm text-gray-300" title={current ?? undefined}>
          {current ?? '…'}
        </p>
        <button className="btn-ghost shrink-0" disabled={!!s?.running} onClick={() => void move()}>
          Move…
        </button>
        <button className="btn-ghost shrink-0" onClick={() => void api.storage.open(root)}>
          Open folder
        </button>
      </div>
      {mine && s && (
        <p
          className={`mt-2 text-xs ${s.phase === 'error' ? 'text-red-400' : 'text-gray-400'}`}
          role={s.phase === 'error' ? 'alert' : 'status'}
        >
          {s.phase === 'copying' &&
            `Copying ${s.done.toLocaleString()} of ${s.total.toLocaleString()} files…`}
          {s.phase === 'cleaning' && 'Removing the old copies…'}
          {s.phase === 'done' &&
            (s.leftovers > 0
              ? `Moved. ${s.leftovers.toLocaleString()} old files were in use and stay in the previous folder.`
              : 'Moved.')}
          {s.phase === 'cancelled' && 'Move cancelled. Nothing changed.'}
          {s.phase === 'error' && `Move failed, nothing changed: ${s.error}`}
        </p>
      )}
    </QuietWorkspace>
  )
}
