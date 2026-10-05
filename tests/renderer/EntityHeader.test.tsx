import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import EntityHeader from '../../src/renderer/src/components/EntityHeader'
import { expectNoAxeViolations } from './accessibility'

const { setManual } = vi.hoisted(() => ({ setManual: vi.fn() }))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { images: { setManual: (...args: unknown[]) => setManual(...args) } }
}))
// The picker's own sources are covered elsewhere; here it only hands back a path.
vi.mock('../../src/renderer/src/components/ImagePickerDialog', () => ({
  default: ({ onPick }: { onPick: (path: string) => Promise<void> }) => (
    <button onClick={() => void onPick('media/picked/new.jpg')}>Pick test image</button>
  )
}))

const initial = { name: 'Toshiyuki Morikawa', native: '森川智之', longText: '', imgPath: 'media/old.jpg' }

beforeEach(() => {
  vi.clearAllMocks()
  setManual.mockResolvedValue(undefined)
})

it('reads as a profile and edits through a dialog', async () => {
  const onSave = vi.fn().mockResolvedValue(undefined)
  const user = userEvent.setup()
  const { container } = render(
    <EntityHeader
      initial={initial}
      longTextLabel="Biography"
      facts={[{ label: 'Born', value: 'January 26, 1967' }]}
      onSave={onSave}
      onDelete={vi.fn()}
    >
      <p>Credits</p>
    </EntityHeader>
  )
  expect(screen.getByRole('heading', { level: 1, name: 'Toshiyuki Morikawa' })).toBeInTheDocument()
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  expect(screen.getByText('January 26, 1967')).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await user.click(screen.getByRole('button', { name: 'Add one' }))
  const dialog = screen.getByRole('dialog', { name: 'Edit Toshiyuki Morikawa' })
  await user.type(screen.getByRole('textbox', { name: 'Biography' }), 'Voice of Griffith.')
  await user.click(screen.getByRole('button', { name: 'Save' }))
  expect(onSave).toHaveBeenCalledWith({ ...initial, longText: 'Voice of Griffith.' })
  await waitFor(() => expect(dialog).not.toBeInTheDocument())
})

it('saves a picked image as a manual override before the page upsert', async () => {
  const order: string[] = []
  setManual.mockImplementation(async () => void order.push('setManual'))
  const onSave = vi.fn(async () => void order.push('upsert'))
  const user = userEvent.setup()
  render(
    <EntityHeader
      initial={initial}
      onSave={onSave}
      onDelete={vi.fn()}
      imageOverride={{ kind: 'person', id: 4, onReverted: vi.fn() }}
    />
  )
  await user.click(screen.getByRole('button', { name: 'More' }))
  await user.click(screen.getByRole('menuitem', { name: 'Change image…' }))
  await user.click(screen.getByRole('button', { name: 'Pick test image' }))
  await waitFor(() => expect(order).toEqual(['setManual', 'upsert']))
  expect(setManual).toHaveBeenCalledWith('person', 4, 'media/picked/new.jpg')
  expect(onSave).toHaveBeenCalledWith({ ...initial, imgPath: 'media/picked/new.jpg' })
})

it('clears a page-held edit draft when the dialog closes without saving', async () => {
  const onEditReset = vi.fn()
  const user = userEvent.setup()
  render(<EntityHeader initial={initial} onSave={vi.fn()} onDelete={vi.fn()} onEditReset={onEditReset} />)
  await user.click(screen.getByRole('button', { name: 'Edit' }))
  expect(onEditReset).toHaveBeenCalledTimes(1)
  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(onEditReset).toHaveBeenCalledTimes(2)
})
