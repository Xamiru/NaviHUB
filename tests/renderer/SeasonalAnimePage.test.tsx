import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SeasonalAnimePage from '../../src/renderer/src/pages/SeasonalAnimePage'
import type { MediaSummary, SeasonalAnimeOverview } from '../../src/shared/types'

const { seasonalAnime, settingsAll } = vi.hoisted(() => ({
  seasonalAnime: vi.fn(),
  settingsAll: vi.fn()
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    media: {
      seasonalAnime: (...args: unknown[]) => seasonalAnime(...args),
      update: vi.fn()
    },
    settings: { all: () => settingsAll() }
  }
}))

function item(year: number, status: string): MediaSummary {
  return {
    id: 1,
    mediaType: 'anime',
    title: 'Winter Story',
    titleOriginal: null,
    synopsis: null,
    coverPath: null,
    releaseDate: `${year}-01-05`,
    totalUnits: 12,
    status,
    score: null,
    progress: 12,
    rewatchCount: 0,
    favorite: false,
    metadata: { season: 'winter', seasonYear: year },
    createdAt: '2026-01-01 00:00:00',
    updatedAt: '2026-01-01 00:00:00'
  }
}

function overview(year: number): SeasonalAnimeOverview {
  return {
    year,
    years: [{ year, count: 1 }],
    items: [item(year, 'Finished my way')],
    unknown: [],
    unknownCount: 0
  }
}

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <SeasonalAnimePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('SeasonalAnimePage', () => {
  beforeEach(() => {
    settingsAll.mockResolvedValue({
      'anime.statuses': JSON.stringify(['Watching', 'Finished my way', 'Planned'])
    })
  })

  it('uses the positional completed status with the year-scoped projection', async () => {
    seasonalAnime.mockImplementation(async (year: number) => overview(year))
    renderPage()

    expect(await screen.findByText('1 tracked / 1 completed')).toBeInTheDocument()
    expect(seasonalAnime).toHaveBeenCalledWith(new Date().getFullYear(), false)
  })

  it('shows a retryable error instead of an empty archive', async () => {
    seasonalAnime
      .mockRejectedValueOnce(new Error('database unavailable'))
      .mockImplementation(async (year: number) => overview(year))
    const user = userEvent.setup()
    renderPage()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not load the seasonal archive — database unavailable'
    )
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    await waitFor(() => expect(screen.getByText('1 tracked / 1 completed')).toBeInTheDocument())
    expect(seasonalAnime).toHaveBeenCalledTimes(2)
  })
})
