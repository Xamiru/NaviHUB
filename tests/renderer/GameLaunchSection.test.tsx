import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import GameLaunchSection from '../../src/renderer/src/components/GameLaunchSection'
import type { MediaDetail } from '../../src/shared/types'

const { overview } = vi.hoisted(() => ({ overview: vi.fn() }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { games: { overview: (id: number) => overview(id) } }
}))

vi.mock('../../src/renderer/src/lib/useGameSession', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/renderer/src/lib/useGameSession')>()
  return { ...actual, useGameSession: () => ({ running: false, status: null, kick: vi.fn() }) }
})

describe('Game detail launcher panel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    overview.mockResolvedValue({
      supported: true,
      exePath: 'C:\\Games\\example.exe',
      totalSeconds: 5400,
      sessionCount: 2,
      sessions: [
        { id: 1, mediaId: 7, startedAt: '2026-09-20 20:00:00', endedAt: '2026-09-20 21:00:00', durationSec: 3600 },
        { id: 2, mediaId: 7, startedAt: '2026-09-19 20:00:00', endedAt: '2026-09-19 20:30:00', durationSec: 1800 }
      ]
    })
  })

  it('keeps playtime and session history without a weekly chart', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={client}>
        <GameLaunchSection m={{ id: 7, metadata: {} } as MediaDetail} />
      </QueryClientProvider>
    )

    expect(await screen.findByText('Tracked')).toBeInTheDocument()
    expect(screen.getByText('1 h 30 m')).toBeInTheDocument()
    expect(screen.getByText('2 sessions')).toBeInTheDocument()
    expect(screen.getByText('1 h 0 m')).toBeInTheDocument()
    expect(screen.queryByText('Last 12 weeks')).not.toBeInTheDocument()
    expect(screen.queryByRole('graphics-document')).not.toBeInTheDocument()
    expect(overview).toHaveBeenCalledWith(7)
  })
})
