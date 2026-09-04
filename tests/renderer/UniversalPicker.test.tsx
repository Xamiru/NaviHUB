import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import UniversalPicker from '../../src/renderer/src/components/UniversalPicker'
import { expectNoAxeViolations } from './accessibility'

const { globalSearch } = vi.hoisted(() => ({ globalSearch: vi.fn() }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    search: { global: (...args: unknown[]) => globalSearch(...args) }
  }
}))

describe('UniversalPicker', () => {
  it('uses shared popover dismissal and an active-descendant keyboard model', async () => {
    globalSearch.mockResolvedValue({
      media: [
        { id: 1, title: 'Alpha', coverPath: null, mediaType: 'movie' },
        { id: 2, title: 'Alpine', coverPath: null, mediaType: 'movie' }
      ],
      people: [],
      characters: [],
      companies: []
    })
    const user = userEvent.setup()
    const onPick = vi.fn()
    const { container } = render(<UniversalPicker kind="media" onPick={onPick} />)
    const input = screen.getByRole('combobox', { name: 'Search for a title' })

    await user.type(input, 'be')
    const listbox = await screen.findByRole('listbox', { name: 'title results' })
    const options = screen.getAllByRole('option')
    expect(input).toHaveAttribute('aria-controls', listbox.id)
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id)
    expect(options[0]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowDown}')
    expect(options[1]).toHaveAttribute('aria-selected', 'true')
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id)
    await user.keyboard('{Enter}')
    expect(onPick).toHaveBeenCalledWith(expect.objectContaining({ entityId: 2, name: 'Alpine' }))
    expect(input).toHaveValue('')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.type(input, 'al')
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument())
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveFocus()
    await expectNoAxeViolations(container)
  })
})
