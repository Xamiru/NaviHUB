import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { pathForEntity, KIND_LABEL, KIND_NOUN } from '../lib/listLinks'
import CoverImage from '../components/CoverImage'
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

  const [items, setItems] = useState<ListEntry[]>([])
  useEffect(() => {
    if (list) setItems(list.items)
  }, [list])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  if (isLoading) return <p className="p-6 text-gray-500">Loading…</p>
  if (!list) return <p className="p-6 text-gray-500">List not found.</p>

  const kind = list.kind
  const listTitle = list.title

  function invalidate() {
    qc.invalidateQueries({ queryKey: qk.lists.all })
  }

  async function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.itemId === active.id)
    const newIndex = items.findIndex((i) => i.itemId === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    const next = arrayMove(items, oldIndex, newIndex)
    setItems(next)
    try {
      await api.lists.reorder(listId, next.map((i) => i.itemId))
    } catch (err) {
      // Persisting failed — put the visible order back in sync with the DB.
      setItems(items)
      toastError(err)
      return
    }
    invalidate()
  }

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
        <p className="text-sm text-gray-500">
          No entries yet — search above to add a {KIND_NOUN[kind]}.
        </p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items.map((i) => i.itemId)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((item, index) => (
                <SortableRow
                  key={item.itemId}
                  item={item}
                  index={index}
                  ranked={list.ranked}
                  kind={kind}
                  onRemove={removeItem}
                  onSaveNote={saveNote}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

function SortableRow({
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.itemId
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  }
  const [note, setNote] = useState(item.note ?? '')
  useEffect(() => setNote(item.note ?? ''), [item.note])
  const to = pathForEntity(kind, item.entityId, item.mediaType)

  return (
    <div ref={setNodeRef} style={style} className="card flex items-center gap-3 p-2">
      <button
        className="cursor-grab touch-none px-1 text-gray-500 hover:text-white"
        title="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
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
    </div>
  )
}
