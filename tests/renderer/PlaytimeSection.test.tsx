import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PlaytimeSection from '../../src/renderer/src/components/PlaytimeSection'
import type { MediaDetail } from '../../src/shared/types'

const { overview } = vi.hoisted(() => ({ overview: vi.fn() }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { games: { overview: (id: number) => overview(id) }, hltb: { fetch: vi.fn() } }
}))

function renderSection(m: Partial<MediaDetail>, tracked: boolean) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <PlaytimeSection m={{ id: 7, title: 'Example', ...m } as MediaDetail} tracked={tracked} onChange={vi.fn()} />
    </QueryClientProvider>
  )
}

describe('Playtime estimates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    overview.mockResolvedValue({
      supported: true,
      exePath: 'C:\\Games\\example.exe',
      totalSeconds: 5400,
      sessionCount: 2
    })
  })

  it('leads with the tracked total, then the HLTB boxes, without a dated history', async () => {
    renderSection({ mediaType: 'game', metadata: { hltb: { main: 600, completionist: 1200 } } }, true)

    const yours = await screen.findByText('Your time')
    expect(screen.getByText('1 h 30 m')).toBeInTheDocument()
    expect(screen.getByText('2 sessions tracked')).toBeInTheDocument()
    const main = screen.getByText('Main Story')
    expect(yours.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByText('Completionist')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('Last 12 weeks')).not.toBeInTheDocument()
    expect(screen.queryByRole('graphics-document')).not.toBeInTheDocument()
    expect(overview).toHaveBeenCalledWith(7)
  })

  it('skips the tracked tile and its query for a type without launching', async () => {
    renderSection({ mediaType: 'game', metadata: {} }, false)

    expect(screen.getByText('No play-time estimates yet.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fetch from HowLongToBeat' })).toBeInTheDocument()
    expect(screen.queryByText('Your time')).not.toBeInTheDocument()
    expect(overview).not.toHaveBeenCalled()
  })
})
