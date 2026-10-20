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
      sessionCount: 2
    })
  })

  it('keeps setup only; the tracked total lives in the estimates row', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={client}>
        <GameLaunchSection m={{ id: 7, metadata: { hltb: { main: 600 } } } as unknown as MediaDetail} />
      </QueryClientProvider>
    )

    expect(await screen.findByRole('button', { name: 'Relink executable' })).toBeInTheDocument()
    expect(screen.queryByText('Tracked')).not.toBeInTheDocument()
    expect(screen.queryByText('HLTB Main')).not.toBeInTheDocument()
    expect(screen.queryByText('1 h 30 m')).not.toBeInTheDocument()
    expect(overview).toHaveBeenCalledWith(7)
  })
})
