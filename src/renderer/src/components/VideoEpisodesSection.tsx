import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatTime } from '@shared/subtitles'
import type { MediaDetail, VideoFile } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import Section from './Section'

// Local video player entry point on an anime/movie/tv detail page. Mirrors
// MangaChaptersSection: attach a folder from the video library, list what was
// scanned, jump into the player. Resume positions live in video_file rows;
// finishing an episode goes through checklistRepo.logProgress like every other
// "I watched another one" in the app.
export default function VideoEpisodesSection({ m }: { m: MediaDetail }): JSX.Element {
  const navigate = useNavigate()
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

  const detach = (): Promise<void> =>
    run(async () => {
      if (!confirm('Unlink the local folder? Resume positions will be forgotten.')) return
      await api.video.detach(m.id)
    })

  const files = data?.files ?? []
  // Continue = the file mid-watch, else the first unwatched one.
  const continueFile =
    files.find((f) => f.resumeSeconds != null && !f.watchedAt) ?? files.find((f) => !f.watchedAt)
  const watched = files.filter((f) => f.watchedAt).length

  const open = (f: VideoFile): void => navigate(`/watch/file/${f.id}`)

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
            Point at this title&apos;s folder to watch it here, with clickable subtitles.
          </span>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-2 text-sm">
            {continueFile && (
              <button className="btn-ghost px-3 py-1" onClick={() => open(continueFile)}>
                ▶ {continueFile.resumeSeconds != null ? 'Continue' : 'Start'} · {continueFile.title}
              </button>
            )}
            <button className="btn-ghost px-3 py-1" disabled={busy} onClick={() => void rescan()}>
              Rescan
            </button>
            <button className="btn-ghost px-3 py-1" disabled={busy} onClick={() => void detach()}>
              ✕ Unlink
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
  const inProgress = f.resumeSeconds != null && !f.watchedAt

  async function toggleWatched(): Promise<void> {
    try {
      await api.video.markWatched(f.id, !f.watchedAt)
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
      {inProgress && f.resumeSeconds != null && (
        <span className="chip shrink-0 text-[10px]">
          {formatTime(f.resumeSeconds)}
          {f.duration ? ` / ${formatTime(f.duration)}` : ''}
        </span>
      )}
      {f.playability === 'transcode' && (
        <span
          className="chip shrink-0 text-[10px]"
          title="Needs re-encoding before it can play — this one takes a while"
        >
          transcode
        </span>
      )}
      <button className="btn-ghost shrink-0 px-2 py-0.5 text-xs" onClick={onOpen}>
        Watch
      </button>
    </div>
  )
}
