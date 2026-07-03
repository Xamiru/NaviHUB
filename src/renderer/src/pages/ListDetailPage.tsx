import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { pathForEntity, KIND_LABEL, KIND_NOUN } from '../lib/listLinks'
import CoverImage from '../components/CoverImage'
import PageStatus from '../components/PageStatus'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import UniversalPicker, { type PickedEntity } from '../components/UniversalPicker'
import type { ListEntry, ListKind } from '@shared/types'

export default function ListDetailPage() {
  const { id } = useParams()
  const listId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: list, isLoading } = useQuery({
    queryKey: qk.lists.detail(listId),
    queryFn: () => api.lists.get(listId)
  })

  const invalidate = (): void => {
    qc.invalidateQueries({ queryKey: qk.lists.all })
  }

  // Optimistic drag-reorder over the server's item list (shared with playlists).
  const { items, setItems, sensors, onDragEnd } = useOptimisticReorder(
    list?.items,
    (next) =>
      api.lists.reorder(
        listId,
        next.map((i) => i.itemId)
      ),
    invalidate
  )

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!list) return <PageStatus>List not found.</PageStatus>

  const kind = list.kind
  const listTitle = list.title

  async function addEntity(e: PickedEntity) {
    await api.lists.addItem(listId, e.entityId)
    await qc.invalidateQueries({ queryKey: qk.lists.detail(listId) })
    invalidate()
  }

  async function removeItem(itemId: number) {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId))
    await api.lists.removeItem(itemId)
    invalidate()
  }

  async function saveNote(itemId: number, note: string | null) {
    await api.lists.updateItem(itemId, { note })
    invalidate()
  }

  async function del() {
    if (!confirm(`Delete the list “${listTitle}”? This can’t be undone.`)) return
    await api.lists.remove(listId)
    invalidate()
    navigate('/lists')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="text-sm text-gray-500 hover:text-gray-300 mb-4" onClick={() => navigate('/lists')}>
        ← Lists
      </button>

      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">{list.title}</h1>
          {list.description && <p className="mt-1 text-sm text-gray-400">{list.description}</p>}
          <p className="mt-1 text-xs text-gray-500">
            {KIND_LABEL[kind]} · {items.length} {items.length === 1 ? 'item' : 'items'}
            {list.ranked && ' · Ranked'}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link to={`/lists/${listId}/edit`} className="btn-ghost">
            Edit
          </Link>
          <button className="btn-danger" onClick={del}>
            Delete
          </button>
        </div>
      </div>

      <div className="mb-5">
        <UniversalPicker
          kind={kind}
          excludeIds={items.map((i) => i.entityId)}
          onPick={addEntity}
        />
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400">
          No entries yet — search above to add a {KIND_NOUN[kind]}.
        </p>
      ) : (
        <SortableList
          ids={items.map((i) => i.itemId)}
          sensors={sensors}
          onDragEnd={onDragEnd}
          className="space-y-2"
        >
          {items.map((item, index) => (
            <ListRow
              key={item.itemId}
              item={item}
              index={index}
              ranked={list.ranked}
              kind={kind}
              onRemove={removeItem}
              onSaveNote={saveNote}
            />
          ))}
        </SortableList>
      )}
    </div>
  )
}

function ListRow({
  item,
  index,
  ranked,
  kind,
  onRemove,
  onSaveNote
}: {
  item: ListEntry
  index: number
  ranked: boolean
  kind: ListKind
  onRemove: (itemId: number) => void
  onSaveNote: (itemId: number, note: string | null) => void
}) {
  const [note, setNote] = useState(item.note ?? '')
  useEffect(() => setNote(item.note ?? ''), [item.note])
  const to = pathForEntity(kind, item.entityId, item.mediaType)

  return (
    <SortableRow id={item.itemId} className="card flex items-center gap-3 p-2">
      {(handle) => (
        <>
          {handle}
          {ranked && (
            <span className="w-6 shrink-0 text-center text-sm font-semibold text-gray-400">
              {index + 1}
            </span>
          )}
          <Link to={to} className="shrink-0">
            <CoverImage path={item.imagePath} alt={item.name} className="h-14 w-10" />
          </Link>
          <div className="min-w-0 flex-1">
            <Link to={to} className="line-clamp-1 font-medium hover:text-accent">
              {item.name}
            </Link>
            {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
            <input
              className="input mt-1 py-1 text-xs"
              placeholder="Add a note…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => {
                if ((item.note ?? '') !== note) onSaveNote(item.itemId, note.trim() || null)
              }}
            />
          </div>
          <button
            className="px-2 text-gray-500 hover:text-red-400"
            onClick={() => onRemove(item.itemId)}
            title="Remove from list"
          >
            ✕
          </button>
        </>
      )}
    </SortableRow>
  )
}
