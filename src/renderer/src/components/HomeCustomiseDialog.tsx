import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog } from '../lib/hooks'
import {
  HOME_LAYOUT_SETTING,
  defaultHomeLayout,
  moveHomeWidget,
  serializeHomeLayout,
  toggleHomeWidget,
  widgetDef,
  type HomeLayoutEntry
} from '../lib/homeWidgets'

// Home's Customise dialog: which widgets show, and in what order.
//
// ▲▼ buttons rather than the SortableList drag primitive, on the play-queue
// precedent: that primitive exists for lists whose order is persisted per-row
// on the server with optimistic rollback. This list is client-side until Save
// writes ONE settings row, so dragging would be machinery without a job.
export default function HomeCustomiseDialog({
  layout,
  onClose
}: {
  layout: HomeLayoutEntry[]
  onClose: () => void
}) {
  const qc = useQueryClient()
  const [draft, setDraft] = useState<HomeLayoutEntry[]>(layout)
  const [saving, setSaving] = useState(false)
  const ref = useDialog(onClose)

  async function save(): Promise<void> {
    setSaving(true)
    try {
      await api.settings.set(HOME_LAYOUT_SETTING, serializeHomeLayout(draft))
      await qc.invalidateQueries({ queryKey: qk.settings.all })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Customise Home"
        tabIndex={-1}
        className="card max-h-[80vh] w-full max-w-lg overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Customise Home</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              The cover wall at the top always stays.
            </p>
          </div>
          <button className="text-gray-400 hover:text-white" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-1.5">
          {draft.map((entry, i) => {
            const def = widgetDef(entry.key)
            if (!def) return null
            return (
              <div
                key={entry.key}
                className={`flex items-center gap-3 rounded-md border border-base-700 px-3 py-2 ${
                  entry.visible ? '' : 'opacity-50'
                }`}
              >
                <button
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm ${
                    entry.visible
                      ? 'bg-accent/20 text-accent'
                      : 'bg-base-700 text-gray-600 hover:text-gray-300'
                  }`}
                  title={`${entry.visible ? 'Hide' : 'Show'} ${def.label}`}
                  aria-label={`${entry.visible ? 'Hide' : 'Show'} ${def.label}`}
                  aria-pressed={entry.visible}
                  onClick={() => setDraft(toggleHomeWidget(draft, entry.key))}
                >
                  {entry.visible ? '✓' : '○'}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{def.label}</p>
                  <p className="truncate text-xs text-gray-500">{def.hint}</p>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-accent disabled:opacity-30 disabled:hover:text-gray-500"
                  title="Move up"
                  aria-label={`Move ${def.label} up`}
                  disabled={i === 0}
                  onClick={() => setDraft(moveHomeWidget(draft, i, -1))}
                >
                  ▲
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-accent disabled:opacity-30 disabled:hover:text-gray-500"
                  title="Move down"
                  aria-label={`Move ${def.label} down`}
                  disabled={i === draft.length - 1}
                  onClick={() => setDraft(moveHomeWidget(draft, i, 1))}
                >
                  ▼
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button className="btn-primary flex-1" onClick={save} disabled={saving}>
            Save layout
          </button>
          <button className="btn-ghost" onClick={() => setDraft(defaultHomeLayout())}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
