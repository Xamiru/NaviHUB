import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FranchisesPage from '../../src/renderer/src/pages/FranchisesPage'
import FranchisePage from '../../src/renderer/src/pages/FranchisePage'
import GoldbergWizardDialog from '../../src/renderer/src/components/GoldbergWizardDialog'

const { listGames, settingsAll, goldbergState, goldbergInstall } = vi.hoisted(() => ({
  listGames: vi.fn(),
  settingsAll: vi.fn(),
  goldbergState: vi.fn(),
  goldbergInstall: vi.fn()
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
    achievements: {
      goldbergState: (...args: unknown[]) => goldbergState(...args),
      goldbergInstall: (...args: unknown[]) => goldbergInstall(...args)
    }
  }
}))

// The linked-music section needs the audio player; its own tests are MusicLinks.test.tsx.
vi.mock('../../src/renderer/src/components/music/FranchiseMusic', () => ({
  default: () => null
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

  it('cannot be closed while it is writing into the game folder', async () => {
    const state = {
      gameDir: 'C:\\Games\\DS2',
      dllName: 'steam_api64.dll',
      emulator: 'goldberg',
      settingsDir: 'C:\\Games\\DS2\\steam_settings',
      list: 'missing',
      missing: 12,
      total: 12,
      canRestore: false
    }
    goldbergState.mockResolvedValue(state)
    let finish!: (value: unknown) => void
    goldbergInstall.mockImplementation(() => new Promise((resolve) => { finish = resolve }))
    const onClose = vi.fn()
    const user = userEvent.setup()
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={client}>
        <GoldbergWizardDialog mediaId={7} onClose={onClose} />
      </QueryClientProvider>
    )

    await user.click(await screen.findByRole('button', { name: 'Write the achievement list' }))
    expect(screen.getByRole('button', { name: 'Writing…' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Not now' })).toBeDisabled()
    await user.keyboard('{Escape}')
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!)
    expect(onClose).not.toHaveBeenCalled()

    await act(async () => finish({ ...state, list: 'complete', missing: 0, canRestore: true }))
    expect(await screen.findByText('Wrote 12 achievements to the game folder.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Done' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
