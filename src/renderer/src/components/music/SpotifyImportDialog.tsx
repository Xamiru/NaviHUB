import { useState } from 'react'
import { api } from '../../lib/api'
import { useDialog } from '../../lib/hooks'
import { toast } from '../../lib/toast'
import { activityText, useActivity } from '../ActivityIndicator'

export function SpotifyImportDialog({
  onClose,
  onImported
}: {
  onClose: () => void
  onImported: (playlistId: number) => void
}) {
  const panelRef = useDialog(onClose)
  const [url, setUrl] = useState('')
  const [importing, setImporting] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const activity = useActivity(importing)

  async function start(): Promise<void> {
    if (!url.trim() || importing) return
    setImporting(true)
    setError(null)
    try {
      const result = await api.music.spotifyImportPlaylist(url.trim())
      const extra = [
        result.duplicates ? `${result.duplicates} duplicate` : '',
        result.skipped ? `${result.skipped} local or unavailable skipped` : ''
      ].filter(Boolean)
      toast(
        result.existing
          ? 'This playlist was already imported; opening it.'
          : `Imported ${result.imported} songs: ${result.matched} already in your library, ${result.missing} to download${extra.length ? ` (${extra.join(', ')})` : ''}.`,
        'success'
      )
      onImported(result.playlistId)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setImporting(false)
      setCancelling(false)
    }
  }

  async function cancelImport(): Promise<void> {
    if (!activity?.taskId || cancelling) return
    setCancelling(true)
    try {
      await api.tasks.cancel(activity.taskId)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
      setCancelling(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Import Spotify playlist"
        tabIndex={-1}
        className="card w-full max-w-lg p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Import Spotify playlist</h2>
          <button className="px-2 text-gray-500 hover:text-white" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        <label className="label" htmlFor="spotify-playlist-url">
          Public playlist link
        </label>
        <input
          id="spotify-playlist-url"
          className="input"
          autoFocus
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void start()
          }}
          placeholder="https://open.spotify.com/playlist/…"
          disabled={importing}
        />
        <p className="mt-2 text-sm text-gray-400">
          Public playlists only. This saves a snapshot that you can refresh later; songs already in
          your library play right away and the rest can be downloaded from YouTube Music.
        </p>
        {importing && (
          <div className="mt-3 rounded-md bg-base-700/60 p-3" role="status" aria-live="polite">
            <p className="text-sm text-gray-300">
              {activity?.active ? activityText(activity) : 'Starting playlist import…'}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded bg-base-600">
              {activity?.active && activity.total > 0 ? (
                <div
                  className="h-full bg-accent transition-[width]"
                  style={{ width: `${Math.round((activity.done / activity.total) * 100)}%` }}
                />
              ) : (
                <div className="h-full w-1/3 bg-accent motion-safe:animate-pulse" />
              )}
            </div>
          </div>
        )}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={importing ? () => void cancelImport() : onClose} disabled={cancelling}>
            {importing ? (cancelling ? 'Stopping…' : 'Stop import') : 'Cancel'}
          </button>
          <button
            className="btn-primary"
            onClick={start}
            disabled={!url.trim() || importing}
          >
            {importing ? 'Importing…' : 'Import'}
          </button>
        </div>
      </div>
    </div>
  )
}
