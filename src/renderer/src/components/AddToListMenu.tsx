import { useId, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { KIND_LABEL } from '../lib/listLinks'
import type { ListKind } from '@shared/types'
import { usePopover } from '../lib/hooks'
import { Field } from './Field'

// Dropdown for an entity detail page: toggle this entity in/out of any list of
// its kind, or spin up a new list containing it. `label` overrides the button.
export default function AddToListMenu({
  kind,
  entityId,
  label,
  fullWidth = false
}: {
  kind: ListKind
  entityId: number
  label?: string
  fullWidth?: boolean // detail-page action column stacks full-width buttons
}) {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const triggerId = useId()
  const panelId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first'
  })

  const { data: lists = [] } = useQuery({
    queryKey: qk.lists.forEntity(kind, entityId),
    queryFn: () => api.lists.forEntity(kind, entityId),
    enabled: open
  })

  function refresh() {
    qc.invalidateQueries({ queryKey: qk.lists.all })
  }

  async function toggle(listId: number, contains: boolean) {
    if (contains) await api.lists.removeItemByEntity(listId, entityId)
    else await api.lists.addItem(listId, entityId)
    refresh()
  }

  async function createAndAdd() {
    const title = newTitle.trim()
    if (!title) return
    const listId = await api.lists.create({ title, kind })
    await api.lists.addItem(listId, entityId)
    setNewTitle('')
    refresh()
  }

  return (
    <div className="relative">
      <button
        id={triggerId}
        ref={triggerRef}
        className={`btn-ghost ${fullWidth ? 'w-full' : ''}`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {label ?? 'Add to list'}
      </button>
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-labelledby={triggerId}
          className="absolute right-0 z-30 mt-1 w-64 rounded-md border border-base-500 bg-base-800 p-2 shadow-lg"
        >
          <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            {KIND_LABEL[kind]} lists
          </div>
          <div className="max-h-56 overflow-y-auto">
            {lists.length === 0 && (
              <p className="px-1 py-1 text-xs text-gray-500">No {KIND_LABEL[kind]} lists yet.</p>
            )}
            {lists.map((l) => (
              <button
                key={l.id}
                className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-left text-sm hover:bg-base-700"
                onClick={() => toggle(l.id, l.contains)}
              >
                <span className={`w-4 text-center ${l.contains ? 'text-accent' : 'text-gray-600'}`}>
                  {l.contains ? '✓' : '○'}
                </span>
                <span className="truncate">{l.title}</span>
              </button>
            ))}
          </div>
          <div className="mt-2 flex gap-1 border-t border-base-700 pt-2">
            <Field label="New list title" hiddenLabel className="contents">
              <input
                className="input py-1 text-sm"
                placeholder="New list…"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    createAndAdd()
                  }
                }}
              />
            </Field>
            <button className="btn-primary px-2 py-1 text-sm" disabled={!newTitle.trim()} onClick={createAndAdd}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
