import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { KIND_LABEL } from '../lib/listLinks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import ActionMenu from '../components/ActionMenu'
import UniversalPicker, { type PickedEntity } from '../components/UniversalPicker'
import TierBoard from '../components/TierBoard'
import { renderTierBoard } from '../lib/tierExport'
import { confirmDialog } from '../lib/confirm'
import { toast, toastError } from '../lib/toast'
import { useDialog } from '../lib/hooks'
import type { TierRowInput } from '@shared/types'

export default function TierListEditorPage() {
  const { id } = useParams()
  const listId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: board, isLoading } = useQuery({
    queryKey: qk.tierLists.detail(listId),
    queryFn: () => api.tierLists.get(listId)
  })

  const [editingRows, setEditingRows] = useState(false)
  const [exporting, setExporting] = useState(false)

  const invalidate = (): void => {
    void qc.invalidateQueries({ queryKey: qk.tierLists.all })
  }

  async function addEntity(e: PickedEntity) {
    await api.tierLists.addItem(listId, e.entityId)
    invalidate()
  }

  async function removeItem(itemId: number) {
    await api.tierLists.removeItem(itemId)
    invalidate()
  }

  async function del() {
    if (!board) return
    const ok = await confirmDialog(`Delete the tier list “${board.title}”? This can’t be undone.`, {
      confirmLabel: 'Delete',
      danger: true
    })
    if (!ok) return
    await api.tierLists.remove(listId)
    invalidate()
    navigate('/lists', { replace: true })
  }

  async function exportPng() {
    if (!board) return
    setExporting(true)
    try {
      const blob = await renderTierBoard(board)
      const saved = await api.files.saveImageAs(
        new Uint8Array(await blob.arrayBuffer()),
        `${board.title}.png`
      )
      if (saved) toast(`Saved to ${saved}`, 'success')
    } catch (err) {
      toastError(err)
    } finally {
      setExporting(false)
    }
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!board) return <PageStatus>Tier list not found.</PageStatus>

  const totalItems = board.rows.reduce((n, g) => n + g.items.length, 0) + board.pool.length

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader
        back="history"
        title={board.title}
        subtitle={
          <>
            {board.description && <span className="block text-gray-400">{board.description}</span>}
            {KIND_LABEL[board.kind]} · {totalItems}{' '}
            {totalItems === 1 ? 'item' : 'items'} · drag covers between the tiers
          </>
        }
        actions={
          <>
            <button className="btn-primary" disabled={exporting || totalItems === 0} onClick={exportPng}>
              {exporting ? 'Rendering…' : 'Export PNG'}
            </button>
            <button className="btn-ghost" onClick={() => setEditingRows(true)}>
              Edit tiers…
            </button>
            <Link to={`/lists/tier/${listId}/edit`} className="btn-ghost">
              Edit
            </Link>
            <ActionMenu items={[{ label: 'Delete…', onSelect: del, danger: true }]} />
          </>
        }
      />

      <div className="mb-5">
        <UniversalPicker
          kind={board.kind}
          excludeIds={[
            ...board.rows.flatMap((g) => g.items.map((i) => i.entityId)),
            ...board.pool.map((i) => i.entityId)
          ]}
          onPick={addEntity}
        />
      </div>

      <TierBoard listId={listId} board={board} onRemoveItem={removeItem} />

      {editingRows && (
        <EditRowsDialog
          listId={listId}
          initial={board.rows.map((g) => ({ label: g.row.label, color: g.row.color }))}
          onClose={() => setEditingRows(false)}
          onSaved={() => {
            setEditingRows(false)
            invalidate()
          }}
        />
      )}
    </div>
  )
}

// The "edit tiers" modal: rename/recolor/reorder/add/delete rows as a draft,
// committed by one setRows transaction on save. Deleting a row here returns
// its items to the pool server-side — nothing is ever lost.
function EditRowsDialog({
  listId,
  initial,
  onClose,
  onSaved
}: {
  listId: number
  initial: TierRowInput[]
  onClose: () => void
  onSaved: () => void
}) {
  const panelRef = useDialog(onClose)
  const [draft, setDraft] = useState<TierRowInput[]>(initial.map((r) => ({ ...r })))
  const [saving, setSaving] = useState(false)

  // A readable rotation for newly added rows.
  const NEW_COLORS = ['#FF7F7F', '#FFDF7F', '#BFFF7F', '#7FBFFF', '#BF7FFF', '#7FFFFF']

  function move(i: number, dir: -1 | 1) {
    setDraft((prev) => {
      const j = i + dir
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  async function save() {
    setSaving(true)
    try {
      await api.tierLists.setRows(listId, draft)
      onSaved()
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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="card w-full max-w-lg p-5 outline-none"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit tiers</h2>
          <button className="text-gray-500 hover:text-white" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <p className="mb-4 text-xs text-gray-500">
          Removing a tier returns its items to the unranked pool. Saving replaces all rows of the
          board in one go.
        </p>

        <div className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
          {draft.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <label
                className="h-9 w-9 shrink-0 cursor-pointer rounded-md border border-base-500"
                style={{ backgroundColor: r.color }}
                title="Pick a color"
              >
                <input
                  type="color"
                  className="sr-only"
                  value={r.color}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev.map((x, xi) => (xi === i ? { ...x, color: e.target.value.toUpperCase() } : x))
                    )
                  }
                />
              </label>
              <input
                className="input py-1.5"
                value={r.label}
                placeholder="Label"
                onChange={(e) =>
                  setDraft((prev) => prev.map((x, xi) => (xi === i ? { ...x, label: e.target.value } : x)))
                }
              />
              <button
                className="btn-ghost px-2 py-1"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                title="Move up"
                aria-label={`Move ${r.label || 'row'} up`}
              >
                ▲
              </button>
              <button
                className="btn-ghost px-2 py-1"
                onClick={() => move(i, 1)}
                disabled={i === draft.length - 1}
                title="Move down"
                aria-label={`Move ${r.label || 'row'} down`}
              >
                ▼
              </button>
              <button
                className="px-2 text-gray-500 hover:text-red-400"
                onClick={() => setDraft((prev) => prev.filter((_, xi) => xi !== i))}
                title="Remove tier"
                aria-label={`Remove ${r.label || 'row'}`}
              >
                ✕
              </button>
            </div>
          ))}
          {draft.length === 0 && (
            <p className="py-3 text-center text-sm text-gray-600">No tiers — add one below.</p>
          )}
        </div>

        <button
          className="mt-3 text-sm text-accent hover:underline"
          onClick={() =>
            setDraft((prev) => [
              ...prev,
              { label: '', color: NEW_COLORS[prev.length % NEW_COLORS.length] }
            ])
          }
        >
          + Add tier
        </button>

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={saving} onClick={save}>
            {saving ? 'Saving…' : 'Save tiers'}
          </button>
        </div>
      </div>
    </div>
  )
}
