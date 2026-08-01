import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { pathForEntity, KIND_LABEL, KIND_NOUN } from '../lib/listLinks'
import CoverImage from '../components/CoverImage'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
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
      <PageHeader
        back="history"
        title={list.title}
        subtitle={
          <>
            {list.description && <span className="block text-gray-400">{list.description}</span>}
            {KIND_LABEL[kind]} · {items.length} {items.length === 1 ? 'item' : 'items'}
            {list.ranked && ' · Ranked'}
          </>
        }
        actions={
          <>
            <Link to={`/lists/${listId}/edit`} className="btn-ghost">
              Edit
            </Link>
            <ActionMenu items={[{ label: 'Delete…', onSelect: del, danger: true }]} />
          </>
        }
      />

      <div className="mb-5">
        <UniversalPicker
          kind={kind}
          excludeIds={items.map((i) => i.entityId)}
          onPick={addEntity}
        />
      </div>

      {items.length === 0 ? (
        <EmptyState title={`No entries yet — search above to add a ${KIND_NOUN[kind]}.`} />
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
            aria-label="Remove"
          >
            ✕
          </button>
        </>
      )}
    </SortableRow>
  )
}
