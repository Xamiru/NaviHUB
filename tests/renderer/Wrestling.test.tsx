import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import type { WrestlingMatchWithEvent } from '@shared/types'
import { api } from '@/lib/api'
import StarRating from '@/components/wrestling/StarRating'
import LooseMatchDialog from '@/components/wrestling/LooseMatchDialog'
import WrestlingMatchRedirect from '@/pages/WrestlingMatchRedirect'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    wrestling: {
      matchLocation: vi.fn(),
      searchWrestlers: vi.fn(async () => []),
      updateLooseMatch: vi.fn()
    }
  }
}))

function queryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } })
}

function match(): WrestlingMatchWithEvent {
  return {
    id: 7,
    eventId: null,
    eventName: 'Raw',
    eventDate: '1997-03-17',
    showLabel: 'Raw',
    matchDate: '1997-03-17',
    sortOrder: 0,
    title: 'Alpha vs. Beta',
    resultText: null,
    stipulation: null,
    championship: null,
    durationSeconds: null,
    outcome: 'decision',
    method: null,
    cardSlot: null,
    cardLabel: null,
    rating: null,
    favorite: false,
    videoId: null,
    participants: [
      {
        wrestlerId: 1,
        name: 'Alpha',
        side: 0,
        won: true,
        isChampion: false,
        teamName: null,
        sortOrder: 0
      },
      {
        wrestlerId: 2,
        name: 'Beta',
        side: 1,
        won: false,
        isChampion: false,
        teamName: null,
        sortOrder: 1
      }
    ]
  }
}

describe('wrestling rating control', () => {
  it('uses one keyboard-operable slider for half-star changes and clearing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container, rerender } = render(<StarRating value={3.5} onChange={onChange} />)
    const slider = screen.getByRole('slider', { name: 'Match rating' })
    expect(slider).toHaveAttribute('aria-valuetext', '3.5 of 5 stars')

    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenLastCalledWith(4)
    await user.keyboard('{Delete}')
    expect(onChange).toHaveBeenLastCalledWith(null)
    expect(screen.getAllByRole('slider')).toHaveLength(1)
    await expectNoAxeViolations(container)

    rerender(<StarRating value={null} onChange={onChange} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', 'Not rated')
  })

  it('maps pointer ratings against the visible five-star rail', () => {
    const onChange = vi.fn()
    render(<StarRating value={null} onChange={onChange} />)
    const slider = screen.getByRole('slider', { name: 'Match rating' })
    const rail = slider.firstElementChild as HTMLElement
    vi.spyOn(rail, 'getBoundingClientRect').mockReturnValue({
      x: 10,
      y: 0,
      left: 10,
      right: 110,
      top: 0,
      bottom: 16,
      width: 100,
      height: 16,
      toJSON: () => ({})
    })

    fireEvent.click(slider, { clientX: 109 })
    expect(onChange).toHaveBeenLastCalledWith(5)
  })
})

describe('loose match editing', () => {
  it('keeps removals in dialog state without mutating cached query data', async () => {
    const user = userEvent.setup()
    const source = match()
    render(
      <QueryClientProvider client={queryClient()}>
        <LooseMatchDialog match={source} onClose={vi.fn()} onSaved={vi.fn()} />
      </QueryClientProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Remove Alpha' }))
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument()
    expect(source.participants.map((participant) => participant.name)).toEqual(['Alpha', 'Beta'])
  })
})

function Destination(): JSX.Element {
  const location = useLocation()
  return <div>{`${location.pathname}${location.search}`}</div>
}

describe('wrestling match route', () => {
  it('routes a loose match to its highlighted Collection row', async () => {
    vi.mocked(api.wrestling.matchLocation).mockResolvedValue({ kind: 'loose' })
    render(
      <QueryClientProvider client={queryClient()}>
        <MemoryRouter initialEntries={['/wrestling/match/7']}>
          <Routes>
            <Route path="/wrestling/match/:id" element={<WrestlingMatchRedirect />} />
            <Route path="/wrestling/collection" element={<Destination />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(await screen.findByText('/wrestling/collection?match=7')).toBeInTheDocument()
  })

  it('routes an imported match to its highlighted event row', async () => {
    vi.mocked(api.wrestling.matchLocation).mockResolvedValue({ kind: 'event', eventId: 42 })
    render(
      <QueryClientProvider client={queryClient()}>
        <MemoryRouter initialEntries={['/wrestling/match/7']}>
          <Routes>
            <Route path="/wrestling/match/:id" element={<WrestlingMatchRedirect />} />
            <Route path="/wrestling/event/:id" element={<Destination />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(await screen.findByText('/wrestling/event/42?match=7')).toBeInTheDocument()
  })
})
