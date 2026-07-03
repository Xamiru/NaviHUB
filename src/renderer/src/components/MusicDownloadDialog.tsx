import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import type { MusicDownloadEvent } from '@shared/types'

const ACTIVE = new Set(['starting', 'downloading', 'processing'])

// Module-level, not per-hook: the header pill and an open dialog both run
// useDownloadStatus, and the settled toast/invalidate must fire once per
// download, not once per mounted instance.
let lastSettled: string | null = null

// Polls the (single) yt-dlp download status: every 500ms while one is running,
// otherwise not at all — starting a download invalidates the key to kick the
// polling off. Also invalidates the music library once when a download lands.
export function useDownloadStatus(): MusicDownloadEvent | null {
  const qc = useQueryClient()
  const { data } = useQuery({
    queryKey: qk.music.downloadStatus,
    queryFn: () => api.music.downloadStatus(),
    refetchInterval: (query) => {
      const s = query.state.data
      return s && ACTIVE.has(s.status) ? 500 : false
    }
  })
  const status = data ?? null

  useEffect(() => {
    if (!status) return
    const key = `${status.id}:${status.status}`
    if (lastSettled === key) return
    lastSettled = key
    if (status.status === 'done') {
      toast('Download finished — library updated', 'success')
      qc.invalidateQueries({ queryKey: qk.music.all })
    } else if (status.status === 'error' && status.message) {
      toast(status.message, 'error')
    }
  }, [status, qc])
  return status
}

// Small always-visible indicator for the Music page header while a download
// runs (the dialog itself can be closed without stopping anything).
export function DownloadPill(): React.JSX.Element | null {
  const status = useDownloadStatus()
  if (!status || !ACTIVE.has(status.status)) return null
  return (
    <span className="chip animate-pulse" title={status.title ?? undefined}>
      ⬇ {status.status === 'processing' ? 'Processing…' : `${Math.round(status.percent ?? 0)}%`}
      {status.itemCount != null && ` · ${status.itemIndex}/${status.itemCount}`}
    </span>
  )
}

// Paste a YouTube / YouTube Music URL (single video, album or playlist) and
// download its audio into <music root>/<Artist>/<Album>/ via yt-dlp. The
// library rescans itself when the download finishes.
export default function MusicDownloadDialog({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient()
  const status = useDownloadStatus()
  const busy = status != null && ACTIVE.has(status.status)

  const [url, setUrl] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [format, setFormat] = useState<'opus' | 'm4a' | 'mp3'>('opus')

  const { data: artists = [] } = useQuery({
    queryKey: qk.music.artists(''),
    queryFn: () => api.music.artists()
  })
  const { data: albums = [] } = useQuery({
    queryKey: qk.music.albums(''),
    queryFn: () => api.music.albums()
  })
  const albumOptions = albums.filter(
    (a) => !artist.trim() || a.artistName.toLowerCase() === artist.trim().toLowerCase()
  )

  async function start(): Promise<void> {
    try {
      await api.music.downloadStart({ url, artist, album, format })
      qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
    } catch (e) {
      toastError(e)
    }
  }

  async function cancel(): Promise<void> {
    if (status) await api.music.downloadCancel(status.id)
    qc.invalidateQueries({ queryKey: qk.music.downloadStatus })
  }

  const canStart = !busy && url.trim() && artist.trim() && album.trim()

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="card w-full max-w-lg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Download music</h2>
          <button className="px-2 text-gray-500 hover:text-white" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="label">YouTube / YouTube Music URL</label>
            <input
              className="input"
              placeholder="https://music.youtube.com/… (video, album or playlist)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="label">Artist folder</label>
              <input
                className="input"
                list="music-dl-artists"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                disabled={busy}
              />
              <datalist id="music-dl-artists">
                {artists.map((a) => (
                  <option key={a.id} value={a.name} />
                ))}
              </datalist>
            </div>
            <div className="flex-1">
              <label className="label">Album folder</label>
              <input
                className="input"
                list="music-dl-albums"
                placeholder="Album"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                disabled={busy}
              />
              <datalist id="music-dl-albums">
                {albumOptions.map((a) => (
                  <option key={a.id} value={a.title} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="label">Format</label>
              <select
                className="input"
                value={format}
                onChange={(e) => setFormat(e.target.value as typeof format)}
                disabled={busy}
              >
                <option value="opus">opus</option>
                <option value="m4a">m4a</option>
                <option value="mp3">mp3</option>
              </select>
            </div>
          </div>

          {status && (busy || status.status === 'error') && (
            <div className="rounded-md bg-base-700/60 p-3 text-sm">
              {busy ? (
                <>
                  <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
                    <span className="line-clamp-1">
                      {status.status === 'processing'
                        ? (status.message ?? 'Extracting audio…')
                        : (status.title ?? 'Starting…')}
                    </span>
                    <span className="ml-2 shrink-0 tabular-nums">
                      {status.itemCount != null && `${status.itemIndex}/${status.itemCount} · `}
                      {Math.round(status.percent ?? 0)}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded bg-base-600">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${Math.min(status.percent ?? 0, 100)}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-red-400">{status.message}</p>
              )}
            </div>
          )}

          <div className="flex justify-between pt-1">
            <p className="text-xs text-gray-500">
              Needs yt-dlp + ffmpeg — check them in Settings.
            </p>
            <div className="flex gap-2">
              {busy && (
                <button className="btn-ghost" onClick={cancel}>
                  Cancel download
                </button>
              )}
              <button className="btn-primary" disabled={!canStart} onClick={start}>
                {busy ? 'Downloading…' : 'Download'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
