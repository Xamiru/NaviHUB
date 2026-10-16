import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import FranchisePage from '../../src/renderer/src/pages/FranchisePage'

const { search } = vi.hoisted(() => ({ search: vi.fn(async (_q: string) => []) }))

// The music shelf needs the audio player provider and plays no part here.
vi.mock('../../src/renderer/src/components/music/FranchiseMusic', () => ({ default: () => null }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    media: {
      list: async () => [
        {
          id: 7,
          mediaType: 'game',
          title: 'EarthBound',
          coverPath: null,
          status: null,
          score: null,
          progress: 0,
          totalUnits: null,
          favorite: false
        }
      ]
    },
    settings: { all: async () => ({}), secretStorage: async () => ({}) },
    franchise: {
      artMap: async () => ({}),
      ensureArt: async () => ({ started: false }),
      artStatus: async () => ({ running: false, done: 0, total: 0 })
    },
    gameCatalog: { status: async () => ({ installed: true }), search },
    steam: { search: async () => [] }
  }
}))

function renderPage() {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={['/franchises/mother']}>
        <Routes>
          <Route path="/franchises/:id" element={<FranchisePage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

it('opens the import dialog prefilled with an unowned entry, and keeps owned entries as links', async () => {
  const user = userEvent.setup()
  renderPage()

  // Owned: the row title is still a link to the library title.
  const owned = await screen.findAllByRole('link', { name: 'EarthBound' })
  expect(owned.length).toBeGreaterThan(0)

  // Unowned row title: a button that opens the import dialog with its title.
  await user.click(screen.getByRole('button', { name: 'Import Mother 3' }))
  const dialog = await screen.findByRole('dialog')
  expect(dialog).toHaveTextContent('Import from Catalog')
  expect(screen.getByRole('textbox', { name: 'Search Catalog' })).toHaveValue('Mother 3')
  expect(search).toHaveBeenCalledWith('Mother 3')

  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

  // The greyed timeline tile imports too.
  await user.click(screen.getByRole('button', { name: /Import EarthBound Beginnings \(1989\)/ }))
  expect(await screen.findByRole('textbox', { name: 'Search Catalog' })).toHaveValue('EarthBound Beginnings')
})
