import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FranchisesPage from '../../src/renderer/src/pages/FranchisesPage'
import FranchisePage from '../../src/renderer/src/pages/FranchisePage'
import GoldbergWizardDialog from '../../src/renderer/src/components/GoldbergWizardDialog'

const { listGames, settingsAll, generateGoldberg } = vi.hoisted(() => ({
  listGames: vi.fn(),
  settingsAll: vi.fn(),
  generateGoldberg: vi.fn()
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    media: { list: (...args: unknown[]) => listGames(...args) },
    settings: { all: () => settingsAll() },
    franchise: {
      heroMap: async () => ({}),
      ensureHeroes: async () => ({ started: false }),
      artMap: async () => ({}),
      ensureArt: async () => ({ started: false }),
      artStatus: async () => ({ running: false, done: 0, total: 0 })
    },
    achievements: { generateGoldberg: (...args: unknown[]) => generateGoldberg(...args) }
  }
}))

vi.mock('../../src/renderer/src/components/FranchiseBackground', () => ({
  default: () => null
}))

function renderRoute(path: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/franchises" element={<FranchisesPage />} />
          <Route path="/franchises/:id" element={<FranchisePage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Games audit regressions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    settingsAll.mockResolvedValue({})
  })

  it.each(['/franchises', '/franchises/metal-gear'])(
    'shows a retryable library error on %s instead of zero ownership',
    async (path) => {
      listGames.mockRejectedValueOnce(new Error('database unavailable')).mockResolvedValue([])
      const user = userEvent.setup()
      renderRoute(path)

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Could not load your library — database unavailable'
      )
      expect(screen.queryByText(/Owned 0/)).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Try again' }))
      await waitFor(() => expect(screen.getAllByText(/Owned 0/).length).toBeGreaterThan(0))
      expect(listGames).toHaveBeenCalledWith({ mediaType: 'game' })
    }
  )

  it('hides a franchise hero that fails to load instead of showing a broken image', async () => {
    listGames.mockResolvedValue([])
    const { container } = renderRoute('/franchises')
    await waitFor(() => expect(screen.getAllByText(/Owned 0/).length).toBeGreaterThan(0))
    const heroes = container.querySelectorAll('a[href^="/franchises/"] img')
    expect(heroes.length).toBeGreaterThan(0)
    fireEvent.error(heroes[0])
    expect(container.querySelectorAll('a[href^="/franchises/"] img')).toHaveLength(heroes.length - 1)
  })

  it('keeps the Goldberg instructions visible until generation finishes', async () => {
    let finish!: (value: { dir: string; achievements: number }) => void
    generateGoldberg.mockImplementation(
      () => new Promise<{ dir: string; achievements: number }>((resolve) => { finish = resolve })
    )
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<GoldbergWizardDialog mediaId={7} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Generate config…' }))
    expect(screen.getByRole('button', { name: 'Generating…' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    await user.keyboard('{Escape}')
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!)
    expect(onClose).not.toHaveBeenCalled()

    await act(async () => finish({ dir: 'C:\\Temp\\steam_settings', achievements: 12 }))
    expect(await screen.findByText('C:\\Temp\\steam_settings')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Done' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
