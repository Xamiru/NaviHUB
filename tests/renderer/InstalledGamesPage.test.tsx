import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import InstalledGamesPage from '../../src/renderer/src/pages/InstalledGamesPage'
import type { GameLaunchStatus, InstalledGame } from '../../src/shared/types'

const { installed, detail, launch, kick, session } = vi.hoisted(() => ({
  installed: vi.fn(),
  detail: vi.fn(),
  launch: vi.fn(),
  kick: vi.fn(),
  session: { running: false, status: null as GameLaunchStatus | null }
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    games: { installed: () => installed(), launch: (id: number) => launch(id) },
    media: { get: (id: number) => detail(id) }
  }
}))

vi.mock('../../src/renderer/src/lib/useGameSession', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/renderer/src/lib/useGameSession')>()
  return { ...actual, useGameSession: () => ({ ...session, kick }) }
})

vi.mock('../../src/renderer/src/components/CoverImage', () => ({
  default: ({ alt, thumbWidth }: { alt: string; thumbWidth?: number }) => (
    <div role="img" aria-label={alt} data-thumb-width={thumbWidth ?? 'original'} />
  )
}))

const games: InstalledGame[] = [
  {
    mediaId: 1, title: 'Elden Ring', mediaType: 'game', coverPath: 'media/elden.jpg',
    exePath: 'C:\\elden.exe', totalSeconds: 36000, lastPlayedAt: '2026-09-18 20:00:00',
    lastSessionSeconds: 3600, achievements: { unlocked: 2, total: 4 }
  },
  {
    mediaId: 2, title: 'Journey', mediaType: 'game', coverPath: 'media/journey.jpg',
    exePath: 'C:\\journey.exe', totalSeconds: 18000, lastPlayedAt: '2026-09-14 20:00:00',
    lastSessionSeconds: 1200, achievements: null
  },
  {
    mediaId: 3, title: 'Hollow Knight', mediaType: 'game', coverPath: 'media/hollow.jpg',
    exePath: 'C:\\hollow.exe', totalSeconds: 72000, lastPlayedAt: null,
    lastSessionSeconds: null, achievements: null
  }
]

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const view = render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/games/installed']}>
        <InstalledGamesPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
  return { ...view, client }
}

function librarySection(): HTMLElement {
  return screen.getByRole('heading', { name: 'All linked games' }).closest('section')!
}

describe('Installed games launcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    session.running = false
    session.status = null
    installed.mockResolvedValue(games)
    detail.mockResolvedValue({ heroPath: 'media/elden-wide.jpg' })
    launch.mockResolvedValue(undefined)
    kick.mockResolvedValue(undefined)
  })

  it('leads with the latest game, shows its session and uses its wide artwork', async () => {
    renderPage()
    expect(await screen.findByRole('heading', { name: 'Continue playing' })).toBeInTheDocument()
    expect(screen.getByText('Last session / 1 h 0 m')).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Elden Ring achievements' })).toHaveAttribute('aria-valuenow', '2')
    expect(detail).toHaveBeenCalledWith(1)
    expect(screen.getAllByRole('img', { name: 'Elden Ring' }).length).toBeGreaterThan(0)
    const recent = screen.getByRole('heading', { name: 'Recently played' }).closest('section')!
    for (const image of within(recent).getAllByRole('img')) {
      expect(image).toHaveAttribute('data-thumb-width', '480')
    }
    const featured = screen.getByRole('heading', { name: 'Continue playing' }).closest('section')!
    expect(within(featured).getByRole('img', { name: 'Elden Ring' })).toHaveAttribute(
      'data-thumb-width',
      'original'
    )
  })

  it('uses cached thumbnails for a 50-game grid', async () => {
    installed.mockResolvedValue(
      Array.from({ length: 50 }, (_, i) => ({
        ...games[i % games.length],
        mediaId: i + 1,
        title: `Game ${i + 1}`,
        lastPlayedAt: null
      }))
    )
    renderPage()
    await screen.findByRole('heading', { name: 'All linked games' })
    await waitFor(() => expect(within(librarySection()).getAllByRole('img')).toHaveLength(50))
    for (const image of within(librarySection()).getAllByRole('img')) {
      expect(image).toHaveAttribute('data-thumb-width', '320')
    }
  })

  it('searches the complete collection and sorts by playtime', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: 'All linked games' })
    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort linked games' }), 'time')
    expect(within(librarySection()).getAllByRole('listitem').map((row) => row.textContent)).toEqual([
      expect.stringContaining('Hollow Knight'),
      expect.stringContaining('Elden Ring'),
      expect.stringContaining('Journey')
    ])

    await user.type(screen.getByRole('searchbox', { name: 'Search linked games' }), 'journey')
    await waitFor(() => expect(within(librarySection()).getAllByRole('listitem')).toHaveLength(1))
    expect(within(librarySection()).getByRole('link', { name: 'Journey' })).toBeInTheDocument()
  })

  it('launches from the artwork and blocks other games during an active session', async () => {
    const user = userEvent.setup()
    const view = renderPage()
    await screen.findByRole('heading', { name: 'Continue playing' })
    await user.click(screen.getAllByRole('button', { name: 'Play Elden Ring' })[0])
    expect(launch).toHaveBeenCalledWith(1)
    await waitFor(() => expect(kick).toHaveBeenCalledOnce())

    session.running = true
    session.status = {
      id: 'run-1', state: 'running', mediaId: 1, mediaType: 'game', title: 'Elden Ring',
      startedAt: '2026-09-18 20:00:00', elapsedSec: 42, durationSec: null,
      discarded: false, progressDelta: null, message: null
    }
    view.rerender(
      <QueryClientProvider client={view.client}>
        <MemoryRouter initialEntries={['/games/installed']}><InstalledGamesPage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(screen.getByRole('heading', { name: 'Playing now' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Cannot play Journey while another game is running' })[0]).toBeDisabled()
  })

  it('offers a retry when the installed read fails', async () => {
    installed.mockRejectedValueOnce(new Error('database unavailable')).mockResolvedValue(games)
    const user = userEvent.setup()
    renderPage()
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load installed games.')
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByRole('heading', { name: 'Continue playing' })).toBeInTheDocument()
  })
})
