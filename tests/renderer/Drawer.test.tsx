import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/hooks')>()
  return {
    ...actual,
    useSettings: () => ({ data: {} })
  }
})

import Sidebar from '@/components/Sidebar'
import ReaderSettingsDrawer from '@/components/reader/ReaderSettingsDrawer'

describe('navigation drawer', () => {
  beforeEach(() => localStorage.clear())

  it('is a named modal drawer with focus entry, Escape and restoration', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Sidebar />
      </MemoryRouter>
    )

    const trigger = screen.getByRole('button', { name: 'Library' })
    await user.click(trigger)
    const drawer = screen.getByRole('dialog', { name: 'Library' })
    expect(drawer).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveFocus()
    await expectNoAxeViolations(container)

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Library' })).toBeNull()
    expect(trigger).toHaveFocus()
  })
})

describe('reader settings side panel', () => {
  it('uses complementary non-modal semantics instead of claiming to be a dialog', async () => {
    const { container } = render(
      <ReaderSettingsDrawer onClose={vi.fn()}>
        Reader controls
      </ReaderSettingsDrawer>
    )

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('complementary', { name: 'Reader settings' })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})
