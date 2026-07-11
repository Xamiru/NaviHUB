import { useState } from 'react'
import { api } from '../../lib/api'
import { toast, toastError } from '../../lib/toast'
import CoverImage from '../CoverImage'

// Shared image picker row for the gacha dialogs: preview + native file pick
// (copies into userData/media) + paste-a-URL fetch (downloads via main —
// the renderer CSP can't fetch https). Both paths yield a media/ rel path.
export default function GachaImageField({
  value,
  onChange
}: {
  value: string | null
  onChange: (relPath: string | null) => void
}) {
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)

  async function pickFile(): Promise<void> {
    const rel = await api.files.pickImage()
    if (rel) onChange(rel)
  }

  async function fetchUrl(): Promise<void> {
    const trimmed = url.trim()
    if (!trimmed) return
    setBusy(true)
    try {
      const rel = await api.gacha.downloadImage(trimmed)
      if (rel) {
        onChange(rel)
        setUrl('')
      } else {
        toast('Could not download that image')
      }
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <label className="label">Image</label>
      <div className="flex items-start gap-3">
        <CoverImage path={value} alt="Preview" className="h-24 w-[4.5rem] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <button type="button" className="btn-ghost" onClick={pickFile}>
              Pick file
            </button>
            {value && (
              <button type="button" className="btn-ghost" onClick={() => onChange(null)}>
                Clear
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="input"
              placeholder="…or paste an image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  fetchUrl()
                }
              }}
            />
            <button
              type="button"
              className="btn-ghost shrink-0"
              disabled={busy || !url.trim()}
              onClick={fetchUrl}
            >
              {busy ? 'Fetching…' : 'Fetch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
