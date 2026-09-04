import { useEffect, useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import { toastError } from '../lib/toast'
import CoverImage from './CoverImage'
import type { TierBoard as TierBoardData, TierEntry, TierPlacement, TierRowGroup } from '@shared/types'

// The tiermaker-style board: draggable cover tiles inside colored tier rows,
// plus the unranked pool below. One custom DndContext drives ALL containers —
// SortableList (vertical single-container) doesn't fit a grid board — reusing
// its pointer/keyboard sensors and optimistic-persist-rollback shape.
//
// Every drop persists the WHOLE placement in one persistBoard transaction;
// a failure rolls the visible board back to the server state with a toast.

type ContainerId = string // 'pool' or 'row:<rowId>'

const POOL: ContainerId = 'pool'
const rowCid = (rowId: number): ContainerId => `row:${rowId}`

function getContainer(state: BoardState, cid: ContainerId): TierEntry[] {
  if (cid === POOL) return state.pool
  const g = state.rows.find((r) => rowCid(r.row.id) === cid)
  return g ? g.items : []
}

function replaceContainer(state: BoardState, cid: ContainerId, items: TierEntry[]): BoardState {
  if (cid === POOL) return { ...state, pool: items }
  return {
    ...state,
    rows: state.rows.map((g) => (rowCid(g.row.id) === cid ? { ...g, items } : g))
  }
}

function findContainerOf(state: BoardState, id: string | number): ContainerId | null {
  if (typeof id === 'string') return id === POOL || id.startsWith('row:') ? id : null
  for (const g of state.rows) if (g.items.some((i) => i.itemId === id)) return rowCid(g.row.id)
  if (state.pool.some((i) => i.itemId === id)) return POOL
  return null
}

interface BoardState {
  rows: TierBoardData['rows']
  pool: TierEntry[]
}

export default function TierBoard({
  listId,
  board,
  onRemoveItem
}: {
  listId: number
  board: TierBoardData
  onRemoveItem: (itemId: number) => void
}) {
  const qc = useQueryClient()
  const [state, setState] = useState<BoardState>({ rows: [], pool: [] })
  const [activeEntry, setActiveEntry] = useState<TierEntry | null>(null)
  // Mirror of the latest committed board. dnd-kit can fire dragEnd before React
  // has re-rendered after the last dragOver, so handlers read this ref — never
  // the closure's `state` — or a cross-row drop resolves against stale data.
  const stateRef = useRef<BoardState>(state)
  function applyState(next: BoardState): void {
    stateRef.current = next
    setState(next)
  }
  // Last server-known placement, for rollback when a persist fails.
  const serverState = useRef<BoardState>(state)

  useEffect(() => {
    const fresh = { rows: board.rows.map((g) => ({ ...g, items: [...g.items] })), pool: [...board.pool] }
    serverState.current = fresh
    applyState(fresh)
  }, [board])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Prefer whatever is literally under the pointer (tiles + their tray), so
  // dropping into a crowded row lands where aimed; fall back to nearest.
  const collision: CollisionDetection = (args) => {
    const within = pointerWithin(args)
    return within.length > 0 ? within : closestCenter(args)
  }

  function placements(final: BoardState): TierPlacement[] {
    return [
      ...final.rows.map((g) => ({ rowId: g.row.id, itemIds: g.items.map((i) => i.itemId) })),
      { rowId: null, itemIds: final.pool.map((i) => i.itemId) }
    ]
  }

  async function persist(final: BoardState): Promise<void> {
    try {
      await api.tierLists.persistBoard(listId, placements(final))
      serverState.current = final
      await qc.invalidateQueries({ queryKey: qk.tierLists.all })
    } catch (err) {
      applyState(serverState.current) // persisting failed — resync the visible board
      toastError(err)
    }
  }

  function handleDragStart(e: DragStartEvent): void {
    const cur = stateRef.current
    const cid = findContainerOf(cur, e.active.id)
    if (!cid) return
    setActiveEntry(getContainer(cur, cid).find((i) => i.itemId === e.active.id) ?? null)
  }

  // Live cross-container move while hovering another row/pool (the official
  // multi-container pattern): the tile follows between containers during the
  // drag; dragEnd only settles order within the final container and persists.
  function handleDragOver(e: DragOverEvent): void {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const prev = stateRef.current
    const from = findContainerOf(prev, active.id)
    const to = findContainerOf(prev, over.id)
    if (!from || !to || from === to) return
    const moving = getContainer(prev, from).find((i) => i.itemId === active.id)
    if (!moving) return
    const stripped = replaceContainer(prev, from, getContainer(prev, from).filter((i) => i.itemId !== active.id))
    const target = getContainer(stripped, to)
    const overIndex =
      typeof over.id === 'number' ? target.findIndex((i) => i.itemId === over.id) : -1
    const insertAt = overIndex >= 0 ? overIndex : target.length
    applyState(
      replaceContainer(stripped, to, [
        ...target.slice(0, insertAt),
        moving,
        ...target.slice(insertAt)
      ])
    )
  }

  async function handleDragEnd(e: DragEndEvent): Promise<void> {
    setActiveEntry(null)
    const { active, over } = e
    if (!over) {
      applyState(serverState.current)
      return
    }
    const cur = stateRef.current
    const cid = findContainerOf(cur, active.id)
    if (!cid || cid !== findContainerOf(cur, over.id)) return
    // Settle order within the final container. `over` may be the tray itself
    // (drop on empty space) — dragOver already placed the tile there, so the
    // board as-is IS the placement and still needs persisting.
    let final = cur
    const arr = getContainer(cur, cid)
    const oldIndex = arr.findIndex((i) => i.itemId === Number(active.id))
    const newIndex = typeof over.id === 'number' ? arr.findIndex((i) => i.itemId === Number(over.id)) : -1
    if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex)
      final = replaceContainer(cur, cid, arrayMove(arr, oldIndex, newIndex))
    applyState(final)
    await persist(final)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collision}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveEntry(null)
        applyState(serverState.current)
      }}
    >
      <div className="space-y-3">
        {state.rows.map((g) => (
          <TierRowBand key={g.row.id} group={g} onRemoveItem={onRemoveItem} />
        ))}

        <div className="mt-7 border-t border-base-700 pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Unranked pool / {state.pool.length}
          </p>
          <DropTray cid={POOL}>
            <SortableContext items={state.pool.map((i) => i.itemId)} strategy={rectSortingStrategy}>
              {state.pool.map((item) => (
                <Tile key={item.itemId} item={item} onRemove={onRemoveItem} />
              ))}
            </SortableContext>
            {state.pool.length === 0 && <TrayHint />}
          </DropTray>
        </div>
      </div>

      <DragOverlay>{activeEntry && <TileVisual item={activeEntry} overlay />}</DragOverlay>
    </DndContext>
  )
}

function TierRowBand({
  group,
  onRemoveItem
}: {
  group: TierRowGroup
  onRemoveItem: (itemId: number) => void
}) {
  const cid = rowCid(group.row.id)
  return (
    <div className="grid min-w-0 grid-cols-[88px_minmax(0,1fr)] overflow-hidden rounded-lg border border-base-600 sm:grid-cols-[112px_minmax(0,1fr)]">
      <div
        className="flex min-h-[132px] cursor-default select-none items-center justify-center px-2 text-center text-lg font-bold break-words"
        style={{ backgroundColor: group.row.color, color: '#17171f' }}
        title={group.row.label}
      >
        <span className="break-all">{group.row.label}</span>
      </div>
      <DropTray cid={cid} grow>
        <SortableContext items={group.items.map((i) => i.itemId)} strategy={rectSortingStrategy}>
          {group.items.map((item) => (
            <Tile key={item.itemId} item={item} onRemove={onRemoveItem} />
          ))}
        </SortableContext>
        {group.items.length === 0 && <TrayHint />}
      </DropTray>
    </div>
  )
}

// A container's droppable area. `grow` fills the remaining width of a tier row;
// the pool renders standalone at full width.
function DropTray({
  cid,
  children,
  grow
}: {
  cid: ContainerId
  children: React.ReactNode
  grow?: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: cid })
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-wrap content-start gap-2 rounded-lg p-3 transition-colors ${
        isOver ? 'bg-base-700 ring-1 ring-accent' : 'bg-base-800/50'
      } ${grow ? 'min-h-[132px] min-w-0' : 'min-h-[132px] w-full border border-dashed border-base-600'}`}
    >
      {children}
    </div>
  )
}

function TrayHint() {
  return (
    <span className="self-center px-2 py-1 text-xs text-gray-500">Drop here</span>
  )
}

function Tile({ item, onRemove }: { item: TierEntry; onRemove: (itemId: number) => void }) {
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.itemId })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="group/tile relative touch-none"
    >
      <button
        ref={setActivatorNodeRef}
        className="block cursor-grab touch-none"
        title={`Move ${item.name} (Space, Arrow keys, Space)`}
        aria-label={`Move ${item.name}`}
        {...attributes}
        {...listeners}
      >
        <TileVisual item={item} />
      </button>
      <button
        className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-base-900 text-xs text-gray-300 opacity-0 ring-1 ring-base-500 hover:text-red-400 group-hover/tile:pointer-events-auto group-hover/tile:opacity-100 group-focus-within/tile:pointer-events-auto group-focus-within/tile:opacity-100"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(item.itemId)}
        title={`Remove ${item.name}`}
        aria-label={`Remove ${item.name}`}
      >
        ✕
      </button>
    </div>
  )
}

function TileVisual({ item, overlay }: { item: TierEntry; overlay?: boolean }) {
  return (
    <div
      className={`${overlay ? 'shadow-xl ring-2 ring-accent' : ''}`}
      title={item.name}
    >
      <CoverImage path={item.imagePath} alt={item.name} className="h-28 w-20 rounded" thumbWidth={160} />
    </div>
  )
}
