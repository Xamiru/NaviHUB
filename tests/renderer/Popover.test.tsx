import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useId, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import ActionMenu from '@/components/ActionMenu'
import ContextMenu from '@/components/ContextMenu'
import { usePopover } from '@/lib/hooks'
import { expectNoAxeViolations } from './accessibility'

function Disclosure(): JSX.Element {
  const [open, setOpen] = useState(false)
  const triggerId = useId()
  const panelId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first'
  })

  return (
    <>
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        Open options
      </button>
      {open && (
        <div id={panelId} ref={panelRef} role="region" aria-labelledby={triggerId}>
          <button type="button">First option</button>
          <button type="button">Last option</button>
        </div>
      )}
      <button type="button">Outside</button>
    </>
  )
}

describe('usePopover', () => {
  it('moves focus in, permits Tab to leave, and restores the trigger on Escape', async () => {
    const user = userEvent.setup()
    render(<Disclosure />)

    const trigger = screen.getByRole('button', { name: 'Open options' })
    await user.click(trigger)
    expect(screen.getByRole('region', { name: 'Open options' })).toHaveAttribute(
      'data-player-shortcuts',
      'suspend'
    )
    expect(screen.getByRole('button', { name: 'First option' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Last option' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus()

    screen.getByRole('button', { name: 'Last option' }).focus()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('region', { name: 'Open options' })).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it('closes on an outside press without stealing focus from the outside target', async () => {
    const user = userEvent.setup()
    render(<Disclosure />)
    await user.click(screen.getByRole('button', { name: 'Open options' }))
    const outside = screen.getByRole('button', { name: 'Outside' })
    await user.click(outside)

    expect(screen.queryByRole('region', { name: 'Open options' })).toBeNull()
    expect(outside).toHaveFocus()
  })
})

describe('ActionMenu', () => {
  it('uses menu semantics and shared arrow-key navigation', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { container } = render(
      <ActionMenu
        items={[
          { label: 'First', onSelect },
          { label: 'Unavailable', onSelect, disabled: true },
          { label: 'Last', onSelect }
        ]}
      />
    )

    const trigger = screen.getByRole('button', { name: 'More' })
    await user.click(trigger)
    expect(screen.getByRole('menu', { name: 'More' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Last' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
    expect(trigger).toHaveFocus()
    await expectNoAxeViolations(container)
  })
})

describe('ContextMenu', () => {
  it('restores the element focused before the menu moved focus', async () => {
    const user = userEvent.setup()

    function Host(): JSX.Element {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open context menu
          </button>
          {open && (
            <ContextMenu x={10} y={10} items={[{ label: 'Inspect', onSelect: vi.fn() }]} onClose={() => setOpen(false)} />
          )}
        </>
      )
    }

    render(<Host />)
    const opener = screen.getByRole('button', { name: 'Open context menu' })
    await user.click(opener)
    expect(screen.getByRole('menuitem', { name: 'Inspect' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(opener).toHaveFocus()
  })
})
