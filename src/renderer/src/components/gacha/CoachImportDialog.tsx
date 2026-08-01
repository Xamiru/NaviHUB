import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDialog } from '../../lib/hooks'
import { toast, toastError } from '../../lib/toast'
import type { GachaGameId } from '@shared/types'

// Import a prior chat with another LLM as coach context. Paste the text or pick
// a .txt/.md file; the coach digests it into a summary (one LLM call) at import.
export default function CoachImportDialog({
  game,
  onClose
}: {
  game: GachaGameId
  onClose: () => void
}) {
  const qc = useQueryClient()
  const panelRef = useDialog(onClose)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)

  async function pickFile(): Promise<void> {
    const picked = await api.app.pickTextFile()
    if (picked) {
      setContent(picked.content)
      if (!title.trim()) setTitle(picked.name)
    }
  }

  async function submit(): Promise<void> {
    if (!content.trim()) return
    setBusy(true)
    try {
      await api.gacha.importCoachDoc(game, { title: title.trim() || 'Imported chat', content })
      await qc.invalidateQueries({ queryKey: qk.gacha.all })
      toast('Chat imported — the coach digested it', 'success')
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Import a chat"
        tabIndex={-1}
        className="card max-h-full w-full max-w-lg overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Import a chat</h2>
          <button className="px-2 text-gray-500 hover:text-white" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              placeholder="e.g. ChatGPT roster review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="label mb-0">Chat text</label>
              <button type="button" className="btn-ghost text-xs" onClick={pickFile}>
                Pick .txt / .md
              </button>
            </div>
            <textarea
              className="input min-h-[200px] font-mono text-xs"
              placeholder="Paste your previous conversation here…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">
            The coach reads this once, extracts the durable facts, and keeps the summary as context.
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={busy || !content.trim()} onClick={submit}>
            {busy ? 'Importing…' : 'Import'}
          </button>
        </div>
      </div>
    </div>
  )
}
