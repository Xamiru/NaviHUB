import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import CommandPalette from '../../src/renderer/src/components/CommandPalette'
import { ANIME } from '../../src/renderer/src/lib/mediaConfig'
import { expectNoAxeViolations } from './accessibility'

const { logProgress } = vi.hoisted(() => ({ logProgress: vi.fn() }))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    search: {
      global: async () => ({
        media: [{
          id: 7, mediaType: 'anime', title: 'Berserk', coverPath: null, status: ANIME.defaultStatuses[0],
          progress: 3, totalUnits: 25, metadata: null
        }],
        people: [{ id: 1, name: 'Toshiyuki Morikawa', photoPath: null }],
        companies: [],
        characters: [{ id: 2, name: 'Guts', imagePath: null }],
        history: []
      })
    },
    media: { logProgress: (...args: unknown[]) => logProgress(...args) }
  }
}))

it('groups results, lists a title’s actions on Tab, and steps back on Escape', async () => {
  logProgress.mockResolvedValue({ title: 'Berserk' })
  const user = userEvent.setup()
  const { baseElement } = render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <CommandPalette />
      </MemoryRouter>
    </QueryClientProvider>
  )
  await user.keyboard('{Control>}k{/Control}')
  await user.type(screen.getByRole('textbox', { name: 'Search commands and library' }), 'ber')
  expect(await screen.findByText('Titles')).toBeInTheDocument()
  expect(screen.getByText('People and characters')).toBeInTheDocument()
  expect(screen.getByText(`Anime · ${ANIME.defaultStatuses[0]} · 3 / 25 ep`)).toBeInTheDocument()
  await expectNoAxeViolations(baseElement)

  await user.keyboard('{Tab}')
  expect(screen.getByRole('group', { name: 'Actions for Berserk' })).toBeInTheDocument()
  // Escape leaves the action list, not the palette.
  await user.keyboard('{Escape}')
  expect(screen.queryByRole('group', { name: 'Actions for Berserk' })).not.toBeInTheDocument()
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument()

  await user.keyboard('{Tab}{ArrowDown}{Enter}')
  await waitFor(() => expect(logProgress).toHaveBeenCalledWith(7))
  expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument()
})
