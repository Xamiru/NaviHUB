import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatTime } from '@shared/subtitles'
import type { MediaDetail, VideoFile } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import Section from './Section'
import { confirmDialog } from '../lib/confirm'

// Linked-video entry point on an anime/movie/tv detail page. Mirrors
// MangaChaptersSection: attach a folder from the video library, list what was
// scanned, then launch files in the operating system's default video app.
// Watched marks remain manual and credit progress through the usual path.
export default function VideoEpisodesSection({ m }: { m: MediaDetail }): JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)

  const { data } = useQuery({
    queryKey: qk.video.library(m.id),
    queryFn: () => api.video.files(m.id)
  })

  const refresh = (): void => {
    qc.invalidateQueries({ queryKey: qk.video.all })
    qc.invalidateQueries({ queryKey: qk.media.detail(m.id) })
  }

  async function run(fn: () => Promise<void>): Promise<void> {
    setBusy(true)
    try {
      await fn()
      refresh()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const attach = (): Promise<void> =>
    run(async () => {
      const res = await api.video.attachFolder(m.id)
      if (res.ok) toast(`Found ${res.fileCount} file${res.fileCount === 1 ? '' : 's'}`, 'success')
      else if (res.error) toast(res.error)
    })

  const rescan = (): Promise<void> =>
    run(async () => {
      const res = await api.video.rescan(m.id)
      if (res.ok) toast(`Rescanned: ${res.fileCount} file${res.fileCount === 1 ? '' : 's'}`, 'success')
      else if (res.error) toast(res.error)
    })

  const detach = async (): Promise<void> => {
    const ok = await confirmDialog('Unlink the local folder? Watched marks will be forgotten.', {
      confirmLabel: 'Unlink',
      danger: true
    })
    if (!ok) return
    await run(async () => {
      await api.video.detach(m.id)
    })
  }

  const files = data?.files ?? []
  const continueFile = files.find((f) => !f.watchedAt)
  const watched = files.filter((f) => f.watchedAt).length

  const open = (f: VideoFile): void => {
    void api.video.openExternal({ kind: 'file', fileId: f.id }).catch(toastError)
  }

  return (
    <Section
      title={`Episodes${files.length ? ` · ${watched}/${files.length} watched` : ''}`}
      className="mb-6"
    >
      {!data?.localDir ? (
        <div className="flex items-center gap-3">
          <button className="btn-ghost px-3 py-1 text-sm" disabled={busy} onClick={() => void attach()}>
            Link video folder
          </button>
          <span className="text-xs text-gray-400">
            Point at this title&apos;s folder to open episodes in your system video player.
          </span>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-2 text-sm">
            {continueFile && (
              <button className="btn-ghost px-3 py-1" onClick={() => open(continueFile)}>
                Open next · {continueFile.title}
              </button>
            )}
            <button className="btn-ghost px-3 py-1" disabled={busy} onClick={() => void rescan()}>
              Rescan
            </button>
            <button className="btn-ghost px-3 py-1" disabled={busy} onClick={() => void detach()}>
              Unlink
            </button>
            <span className="truncate text-xs text-gray-400" title={data.localDir}>
              {data.localDir}
            </span>
          </div>
          <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
            {files.map((f) => (
              <EpisodeRow key={f.id} f={f} onOpen={() => open(f)} onChange={refresh} />
            ))}
          </div>
        </>
      )}
    </Section>
  )
}

function EpisodeRow({
  f,
  onOpen,
  onChange
}: {
  f: VideoFile
  onOpen: () => void
  onChange: () => void
}): JSX.Element {
  async function toggleWatched(): Promise<void> {
    try {
      await api.video.markWatched({ kind: 'file', fileId: f.id }, !f.watchedAt)
      onChange()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-md bg-base-800 px-3 py-2">
      <button
        onClick={() => void toggleWatched()}
        title={f.watchedAt ? 'Mark unwatched' : 'Mark watched'}
        aria-label={f.watchedAt ? 'Mark unwatched' : 'Mark watched'}
        className={`shrink-0 text-sm ${f.watchedAt ? 'text-accent' : 'text-gray-600 hover:text-gray-300'}`}
      >
        {f.watchedAt ? '✓' : '○'}
      </button>
      <button className="min-w-0 flex-1 truncate text-left text-sm" onClick={onOpen}>
        {f.title}
      </button>
      {f.duration != null && (
        <span className="chip shrink-0 text-[10px]">
          {formatTime(f.duration)}
        </span>
      )}
      <button className="btn-ghost shrink-0 px-2 py-0.5 text-xs" onClick={onOpen}>
        Open
      </button>
    </div>
  )
}
