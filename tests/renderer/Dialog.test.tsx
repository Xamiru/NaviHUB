import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Dialog from '@/components/Dialog'
import ConfirmHost from '@/components/ConfirmHost'
import { confirmDialog } from '@/lib/confirm'
import { expectNoAxeViolations } from './accessibility'

function DialogHost({ onClose = vi.fn() }: { onClose?: () => void }): JSX.Element {
  const [open, setOpen] = useState(false)
  const firstRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      {open && (
        <Dialog
          labelledBy="dialog-title"
          describedBy="dialog-description"
          onClose={() => {
            onClose()
            setOpen(false)
          }}
          initialFocus={() => firstRef.current}
          panelClassName="card"
        >
          <h2 id="dialog-title">Edit item</h2>
          <p id="dialog-description">Dialog description</p>
          <button ref={firstRef} type="button">
            First action
          </button>
          <button type="button">Last action</button>
        </Dialog>
      )}
    </>
  )
}

describe('Dialog', () => {
  it('moves focus in, contains Tab focus, closes on Escape and restores the opener', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<DialogHost onClose={onClose} />)

    const opener = screen.getByRole('button', { name: 'Open dialog' })
    await user.click(opener)
    const first = screen.getByRole('button', { name: 'First action' })
    const last = screen.getByRole('button', { name: 'Last action' })
    expect(first).toHaveFocus()

    first.focus()
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(last).toHaveFocus()
    await user.tab()
    expect(first).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(opener).toHaveFocus()
  })

  it('dismisses only when the backdrop itself is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<DialogHost onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    await user.click(screen.getByRole('heading', { name: 'Edit item' }))
    expect(onClose).not.toHaveBeenCalled()

    const dialog = screen.getByRole('dialog')
    await user.pointer({ keys: '[MouseLeft]', target: dialog.parentElement! })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('has a programmatic name and no applicable axe violations', async () => {
    const user = userEvent.setup()
    const { container } = render(<DialogHost />)
    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    expect(screen.getByRole('dialog', { name: 'Edit item' })).toHaveAccessibleDescription(
      'Dialog description'
    )
    await expectNoAxeViolations(container)
  })
})

describe('ConfirmHost', () => {
  it('inherits the shared initial-focus, Escape and focus-restoration behavior', async () => {
    const user = userEvent.setup()
    let answer: boolean | null = null
    render(
      <>
        <button
          type="button"
          onClick={() => {
            void confirmDialog('Delete this item?', { danger: true }).then((value) => {
              answer = value
            })
          }}
        >
          Delete item
        </button>
        <ConfirmHost />
      </>
    )

    const opener = screen.getByRole('button', { name: 'Delete item' })
    await user.click(opener)
    expect(screen.getByRole('dialog', { name: 'Confirmation' })).toHaveAccessibleDescription(
      'Delete this item?'
    )
    expect(screen.getByRole('button', { name: 'OK' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(answer).toBe(false)
    expect(opener).toHaveFocus()
  })
})
