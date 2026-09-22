import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import HomePage from '../../src/renderer/src/pages/HomePage'
import HomeCustomiseDialog from '../../src/renderer/src/components/HomeCustomiseDialog'
import { defaultHomeLayout } from '../../src/renderer/src/lib/homeWidgets'

const { homeOverview, resumePoints, japaneseStats, companiesList, timeStats } = vi.hoisted(() => ({
  homeOverview: vi.fn(),
  resumePoints: vi.fn(),
  japaneseStats: vi.fn(),
  companiesList: vi.fn(),
  timeStats: vi.fn()
}))

vi.mock('../../src/renderer/src/lib/player', () => ({
  usePlayerControls: () => ({})
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    achievements: { recent: async () => [] },
    checklist: { status: async () => ({ daily: [], weekly: [], streak: { current: 0 } }) },
    companies: { list: () => companiesList() },
    english: { srsStats: async () => ({ totalCount: 0, dueCount: 0, reviewedToday: 0 }) },
    gacha: { dueCounts: async () => ({}) },
    japanese: { stats: () => japaneseStats() },
    media: {
      homeOverview: () => homeOverview(),
      resumePoints: () => resumePoints(),
      timeStats: () => timeStats()
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
  beforeEach(() => {
    homeOverview.mockReset()
    resumePoints.mockReset().mockResolvedValue([])
    japaneseStats.mockReset().mockResolvedValue({ totalCards: 0, dueCount: 0 })
    companiesList.mockReset().mockResolvedValue([])
    timeStats.mockReset().mockResolvedValue({ totalMinutes: 0, consumedCount: 0, byType: [] })
  })

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

  it('does not show first-run guidance while saved positions are still loading', async () => {
    homeOverview.mockResolvedValue({
      wall: [], recent: [], continuing: [], favorites: [], spotlight: [],
      spotlightFromBacklog: false,
      stats: { titles: 1, inProgress: 0, completed: 0, favorites: 0, avgScore: null }
    })
    resumePoints.mockReturnValue(new Promise(() => {}))
    renderPage()

    expect(await screen.findByText('Loading saved positions…')).toBeInTheDocument()
    expect(screen.queryByText('Build your personal archive')).not.toBeInTheDocument()
  })

  it('shows a retry when Japanese stats fail instead of claiming there is no deck', async () => {
    homeOverview.mockResolvedValue({
      wall: [], recent: [], continuing: [], favorites: [], spotlight: [],
      spotlightFromBacklog: false,
      stats: { titles: 0, inProgress: 0, completed: 0, favorites: 0, avgScore: null }
    })
    japaneseStats.mockRejectedValueOnce(new Error('read failed'))
      .mockResolvedValueOnce({ totalCards: 10, dueCount: 3, reviewsToday: 0, introducedToday: 0 })
    const user = userEvent.setup()
    renderPage()

    expect(await screen.findByText('Could not load Japanese reviews.')).toBeInTheDocument()
    expect(screen.queryByText('Start the deck')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Retry Japanese reviews' }))
    expect(await screen.findByText('3 cards due')).toBeInTheDocument()
  })

  it('keeps studios visible when there are no voice actors', async () => {
    homeOverview.mockResolvedValue({
      wall: [], recent: [], continuing: [], favorites: [], spotlight: [],
      spotlightFromBacklog: false,
      stats: { titles: 0, inProgress: 0, completed: 0, favorites: 0, avgScore: null }
    })
    companiesList.mockResolvedValue([{ id: 12, name: 'Studio A' }])
    renderPage()

    expect(await screen.findByRole('link', { name: /Studio A/ })).toHaveAttribute('href', '/studios/12')
  })

  it('always changes the spotlight title when rerolling a pool with two titles', async () => {
    homeOverview.mockResolvedValue({
      wall: [], recent: [], continuing: [], favorites: [],
      spotlight: [
        { id: 1, mediaType: 'anime', title: 'Alpha', coverPath: null, releaseDate: null, status: 'Planned' },
        { id: 2, mediaType: 'anime', title: 'Beta', coverPath: null, releaseDate: null, status: 'Planned' }
      ],
      spotlightFromBacklog: true,
      stats: { titles: 2, inProgress: 0, completed: 0, favorites: 0, avgScore: null }
    })
    const user = userEvent.setup()
    renderPage()

    const reroll = await screen.findByRole('button', { name: 'Reroll' })
    const first = screen.queryByText('Alpha') ? 'Alpha' : 'Beta'
    await user.click(reroll)
    expect(screen.queryByText(first)).not.toBeInTheDocument()
  })

  it('shows labelled amounts for each time-spent segment', async () => {
    homeOverview.mockResolvedValue({
      wall: [], recent: [], continuing: [], favorites: [], spotlight: [],
      spotlightFromBacklog: false,
      stats: { titles: 2, inProgress: 0, completed: 0, favorites: 0, avgScore: null }
    })
    timeStats.mockResolvedValue({
      totalMinutes: 120, consumedCount: 2,
      byType: [
        { mediaType: 'anime', minutes: 90 },
        { mediaType: 'game', minutes: 30 }
      ]
    })
    renderPage()

    expect(await screen.findByText('Anime: 90 min')).toBeInTheDocument()
    expect(screen.getByText('Games: 30 min')).toBeInTheDocument()
  })

  it('names each widget visibility control in the customise dialog', () => {
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <HomeCustomiseDialog layout={defaultHomeLayout()} onClose={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByRole('button', { name: 'Hide Today' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hide Music' })).toBeInTheDocument()
  })
})
