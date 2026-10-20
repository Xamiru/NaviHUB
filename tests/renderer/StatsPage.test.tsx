import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import StatsPage from '../../src/renderer/src/pages/StatsPage'
import { expectNoAxeViolations } from './accessibility'
import type {
  ActivityHeatmap,
  CreditTimeGroup,
  LibraryInsights,
  LibraryTimeStats,
  TimeStatsItem
} from '../../src/shared/types'

const { timeStats, timeStatsType, activityHeatmap, libraryInsights, creditTime } = vi.hoisted(
  () => ({
    timeStats: vi.fn(),
    timeStatsType: vi.fn(),
    activityHeatmap: vi.fn(),
    libraryInsights: vi.fn(),
    creditTime: vi.fn()
  })
)

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    media: {
      timeStats: () => timeStats(),
      timeStatsType: (type: string) => timeStatsType(type),
      activityHeatmap: () => activityHeatmap(),
      libraryInsights: () => libraryInsights(),
      creditTime: () => creditTime()
    },
    settings: { all: async () => ({ 'score.max': '10' }) }
  }
}))

function item(id: number, title: string, minutes: number): TimeStatsItem {
  return {
    id,
    mediaType: 'manga',
    title,
    coverPath: null,
    minutes,
    estimated: true,
    progress: minutes / 5,
    totalUnits: null,
    rewatchCount: 0
  }
}

const manga = [1, 2, 3, 4, 5, 6, 7].map((i) => item(i, `Manga ${i}`, (8 - i) * 100))

const stats: LibraryTimeStats = {
  totalMinutes: 2800,
  consumedCount: 7,
  libraryCount: 10,
  byType: [
    {
      mediaType: 'manga',
      minutes: 2800,
      estimated: true,
      itemCount: 7,
      topItems: manga.slice(0, 5)
    }
  ],
  longest: manga[0],
  mostRevisited: null
}

const heat: ActivityHeatmap = {
  combined: [{ day: '2026-10-01', count: 3 }],
  sources: [
    {
      key: 'jpReviews',
      label: 'Japanese reviews',
      hasMinutes: false,
      days: [{ day: '2026-10-01', count: 2 }]
    },
    {
      key: 'games',
      label: 'Play sessions',
      hasMinutes: true,
      days: [{ day: '2026-10-01', count: 1, minutes: 90 }]
    }
  ]
}

const insights: LibraryInsights = {
  scores: [
    { mediaType: 'manga', score: 8, count: 3 },
    { mediaType: 'anime', score: 7, count: 1 }
  ],
  decades: [{ decade: 1990, mediaType: 'manga', count: 2 }],
  unknownYear: 1
}

const credits: CreditTimeGroup[] = [
  {
    key: 'writer',
    label: 'Writers and authors',
    entries: [
      { id: 9, name: 'Kentaro Miura', imagePath: null, titleCount: 2, coverPaths: [] }
    ]
  },
  {
    key: 'studio',
    label: 'Studios',
    entries: [
      { id: 4, name: 'Studio Four', imagePath: null, titleCount: 1, coverPaths: ['covers/a.jpg'] }
    ]
  }
]

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <StatsPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  timeStats.mockReset().mockResolvedValue(stats)
  timeStatsType.mockReset().mockResolvedValue(manga)
  activityHeatmap.mockReset().mockResolvedValue(heat)
  libraryInsights.mockReset().mockResolvedValue(insights)
  creditTime.mockReset().mockResolvedValue(credits)
})

describe('Stats page', () => {
  it('offers a retry when the stats cannot be read', async () => {
    timeStats.mockReset().mockRejectedValueOnce(new Error('boom')).mockResolvedValue(stats)
    renderPage()
    const retry = await screen.findByRole('button', { name: 'Retry stats' })
    await userEvent.click(retry)
    expect(await screen.findByText('Biggest time sink')).toBeInTheDocument()
  })

  it('expands a leaderboard to every title and collapses it again', async () => {
    renderPage()
    const board = (await screen.findByRole('heading', { name: 'Manga' })).closest('.card')!
    expect(within(board as HTMLElement).getAllByRole('listitem')).toHaveLength(5)
    await userEvent.click(within(board as HTMLElement).getByRole('button', { name: 'Show all 7' }))
    await waitFor(() =>
      expect(within(board as HTMLElement).getAllByRole('listitem')).toHaveLength(7)
    )
    expect(timeStatsType).toHaveBeenCalledWith('manga')
    await userEvent.click(within(board as HTMLElement).getByRole('button', { name: 'Show less' }))
    expect(within(board as HTMLElement).getAllByRole('listitem')).toHaveLength(5)
  })

  it('offers minutes only for sources that record a duration', async () => {
    renderPage()
    const reviews = await screen.findByRole('button', { name: 'Japanese reviews' })
    expect(reviews).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByRole('button', { name: 'Minutes' })).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'Play sessions' }))
    await userEvent.click(screen.getByRole('button', { name: 'Minutes' }))
    expect(screen.getByRole('button', { name: 'Minutes' })).toHaveAttribute('aria-pressed', 'true')
    expect(localStorage.getItem('stats.activitySource')).toBe('games')
    expect(localStorage.getItem('stats.activityMeasure')).toBe('minutes')
  })

  it('switches people and studios with the keyboard', async () => {
    const { container } = renderPage()
    const writers = await screen.findByRole('tab', { name: 'Writers and authors' })
    expect(screen.getByRole('link', { name: 'Kentaro Miura' })).toHaveAttribute('href', '/people/9')
    // Ranked by titles; no hours.
    expect(screen.getByText('2 titles')).toBeInTheDocument()
    writers.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Studios' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('link', { name: 'Studio Four' })).toHaveAttribute('href', '/studios/4')
    // A studio with covers shows them instead of a monogram.
    expect(container.querySelector('[aria-label="Studio Four"]')).toBeNull()
    expect(container.querySelectorAll('li img')).toHaveLength(1)
  })

  it('shows scores, release decades and passes axe', async () => {
    const { container } = renderPage()
    expect(await screen.findByRole('heading', { name: 'Scores' })).toBeInTheDocument()
    expect(screen.getByRole('table', { name: 'Finished titles per release decade' })).toBeInTheDocument()
    expect(screen.getByText(/1 finished title has no release year/)).toBeInTheDocument()
    await screen.findByRole('tab', { name: 'Writers and authors' })
    await expectNoAxeViolations(container)
  })
})
