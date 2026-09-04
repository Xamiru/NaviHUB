import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import {
  DndContext,
  KeyboardSensor,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toastError } from '../lib/toast'

// Shared optimistic drag-reorder: a local copy of the server list that
// re-orders instantly, persists, and rolls back (with a toast) if persisting
// fails. Used by the two drag-sortable surfaces — playlists and lists.
export function useOptimisticReorder<T extends { itemId: number }>(
  source: T[] | undefined,
  persist: (next: T[]) => Promise<unknown>,
  onPersisted: () => void
): {
  items: T[]
  setItems: Dispatch<SetStateAction<T[]>>
  sensors: SensorDescriptor<SensorOptions>[]
  onDragEnd: (e: DragEndEvent) => Promise<void>
} {
  const [items, setItems] = useState<T[]>([])
  useEffect(() => {
    if (source) setItems(source)
  }, [source])
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  async function onDragEnd(e: DragEndEvent): Promise<void> {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.itemId === active.id)
    const newIndex = items.findIndex((i) => i.itemId === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    const next = arrayMove(items, oldIndex, newIndex)
    setItems(next)
    try {
      await persist(next)
    } catch (err) {
      setItems(items) // persisting failed — resync the visible order
      toastError(err)
      return
    }
    onPersisted()
  }

  return { items, setItems, sensors, onDragEnd }
}

export function SortableList({
  ids,
  sensors,
  onDragEnd,
  className,
  children
}: {
  ids: number[]
  sensors: SensorDescriptor<SensorOptions>[]
  onDragEnd: (e: DragEndEvent) => void
  className?: string
  children: ReactNode
}) {
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className={className}>{children}</div>
      </SortableContext>
    </DndContext>
  )
}

// One sortable row: the shared handle supports pointer drag and dnd-kit's
// Space/Arrow/Space keyboard flow, then hands the renderer one control to place.
export function SortableRow({
  id,
  className,
  children
}: {
  id: number
  className?: string
  children: (handle: ReactNode) => ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  }
  const handle = (
    <button
      className="cursor-grab touch-none px-1 text-gray-500 hover:text-white"
      title="Move item (Space, Arrow keys, Space)"
      aria-label="Move item"
      {...attributes}
      {...listeners}
    >
      ⠿
    </button>
  )
  return (
    <div ref={setNodeRef} style={style} className={className}>
      {children(handle)}
    </div>
  )
}
