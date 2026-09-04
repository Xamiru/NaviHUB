import { useMemo } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  SortableList,
  SortableRow,
  useOptimisticReorder
} from '@/components/SortableList'

const SOURCE = [
  { itemId: 1, label: 'First' },
  { itemId: 2, label: 'Second' }
]

function Harness({ persist }: { persist: (items: typeof SOURCE) => Promise<void> }) {
  const source = useMemo(() => SOURCE, [])
  const reorder = useOptimisticReorder(source, persist, () => undefined)
  return (
    <SortableList
      ids={reorder.items.map((item) => item.itemId)}
      sensors={reorder.sensors}
      onDragEnd={reorder.onDragEnd}
    >
      {reorder.items.map((item) => (
        <SortableRow key={item.itemId} id={item.itemId}>
          {(handle) => (
            <div>
              {handle}
              <span>{item.label}</span>
            </div>
          )}
        </SortableRow>
      ))}
    </SortableList>
  )
}

describe('SortableList keyboard reordering', () => {
  it('exposes a named handle that keyboard users can lift and cancel', async () => {
    const user = userEvent.setup()
    const persist = vi.fn<(items: typeof SOURCE) => Promise<void>>(async () => undefined)
    render(<Harness persist={persist} />)

    const handles = screen.getAllByRole('button', { name: 'Move item' })
    handles[0].focus()
    await user.keyboard(' ')
    await waitFor(() => expect(handles[0]).toHaveAttribute('aria-pressed', 'true'))
    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('cancelled'))
    expect(handles[0]).not.toHaveAttribute('aria-pressed')
    expect(persist).not.toHaveBeenCalled()
  })
})
