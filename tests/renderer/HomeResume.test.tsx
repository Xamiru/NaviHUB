import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import HomePage from '../../src/renderer/src/pages/HomePage'

const { homeOverview } = vi.hoisted(() => ({ homeOverview: vi.fn() }))

vi.mock('../../src/renderer/src/lib/player', () => ({
  usePlayerControls: () => ({})
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    achievements: { recent: async () => [] },
    checklist: { status: async () => ({ daily: [], weekly: [], streak: { current: 0 } }) },
    companies: { list: async () => [] },
    english: { srsStats: async () => ({ totalCount: 0, dueCount: 0, reviewedToday: 0 }) },
    gacha: { dueCounts: async () => ({}) },
    japanese: { stats: async () => ({ totalCards: 0, dueCount: 0 }) },
    media: {
      homeOverview: () => homeOverview(),
      resumePoints: async () => [],
      timeStats: async () => ({ totalMinutes: 0, consumedCount: 0, byType: [] })
    },
    music: { recent: async () => [] },
    people: { list: async () => [] },
    quiz: { songPool: async () => [] },
    settings: { all: async () => ({}) }
  }
}))

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Home resume failure', () => {
  beforeEach(() => homeOverview.mockReset())

  it('shows a durable retry instead of presenting a failed read as an empty library', async () => {
    homeOverview
      .mockRejectedValueOnce(new Error('database temporarily unavailable'))
      .mockResolvedValue({
        wall: [],
        recent: [],
        continuing: [],
        favorites: [],
        spotlight: [],
        spotlightFromBacklog: false,
        stats: { titles: 0, inProgress: 0, completed: 0, favorites: 0, avgScore: null }
      })
    const user = userEvent.setup()
    renderPage()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not read your local library — database temporarily unavailable'
    )
    expect(screen.queryByText('Nothing here yet')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    await waitFor(() => expect(screen.getByText('Nothing here yet')).toBeInTheDocument())
    expect(homeOverview).toHaveBeenCalledTimes(2)
  })
})
