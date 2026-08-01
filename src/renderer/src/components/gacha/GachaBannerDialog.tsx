import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDialog } from '../../lib/hooks'
import { toastError } from '../../lib/toast'
import type { GachaGameCfg } from '@shared/gacha'
import type { GachaBanner } from '@shared/types'
import GachaImageField from './GachaImageField'

// Add/edit a banner. Manual entry this phase — per-game fetchers arrive with
// the detail phases and upsert into the same table.
export default function GachaBannerDialog({
  game,
  banner,
  onClose
}: {
  game: GachaGameCfg
  banner?: GachaBanner // edit mode
  onClose: () => void
}) {
  const qc = useQueryClient()
  const panelRef = useDialog(onClose)

  const [name, setName] = useState(banner?.name ?? '')
  const [kind, setKind] = useState(banner?.kind ?? '')
  const [featured, setFeatured] = useState(banner?.featured ?? '')
  const [startAt, setStartAt] = useState(banner?.startAt ?? '')
  const [endAt, setEndAt] = useState(banner?.endAt ?? '')
  const [notes, setNotes] = useState(banner?.notes ?? '')
  const [imagePath, setImagePath] = useState<string | null>(banner?.imagePath ?? null)
  const [saving, setSaving] = useState(false)

  const kindSuggestions = [...game.unitKinds.map((k) => k.label), 'Event', 'Rerun']

  async function save(): Promise<void> {
    if (!name.trim()) return
    setSaving(true)
    try {
      const input = {
        game: game.id,
        name: name.trim(),
        kind: kind.trim() || null,
        featured: featured.trim() || null,
        startAt: startAt || null,
        endAt: endAt || null,
        imagePath,
        notes: notes.trim() || null
      }
      if (banner) await api.gacha.updateBanner(banner.id, input)
      else await api.gacha.createBanner(input)
      await qc.invalidateQueries({ queryKey: qk.gacha.all })
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setSaving(false)
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
        aria-label={banner ? 'Edit banner' : 'Add banner'}
        tabIndex={-1}
        className="card max-h-full w-full max-w-lg overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{banner ? 'Edit banner' : 'Add banner'}</h2>
          <button className="px-2 text-gray-500 hover:text-white" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input
              className="input"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
              }}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="label">Kind</label>
              <input
                className="input"
                list="gacha-banner-kinds"
                placeholder="Character / Event / …"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
              />
              <datalist id="gacha-banner-kinds">
                {kindSuggestions.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            <div className="flex-1">
              <label className="label">Featured</label>
              <input
                className="input"
                placeholder="Who's on it"
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="label">Starts</label>
              <input
                className="input"
                type="date"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="label">Ends</label>
              <input
                className="input"
                type="date"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
              />
            </div>
          </div>

          <GachaImageField value={imagePath} onChange={setImagePath} />

          <div>
            <label className="label">Notes</label>
            <textarea
              className="input min-h-[64px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={saving || !name.trim()} onClick={save}>
            {saving ? 'Saving…' : banner ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
