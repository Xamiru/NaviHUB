import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import FootballExternalLinks from '@/components/football/FootballExternalLinks'
import { FootballCoverageStrip } from '@/components/football/FootballCommon'
import FootballTeamPage from '@/pages/FootballTeamPage'

const apiMock = vi.hoisted(() => ({
  football: {
    team: vi.fn(),
    syncOverview: vi.fn(),
    startSync: vi.fn(),
    setFavorite: vi.fn(),
    saveExternalLink: vi.fn(),
    removeExternalLink: vi.fn(),
    openExternalLink: vi.fn()
  },
  lists: {
    all: vi.fn(async () => []),
    addItem: vi.fn(),
    removeItem: vi.fn()
  }
}))

vi.mock('@/lib/api', () => ({ api: apiMock }))

function renderWithQuery(ui: React.ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('Football pages', () => {
  it('opens a team without starting enrichment in the background', async () => {
    apiMock.football.team.mockResolvedValue({
      id: 1,
      name: 'Archive FC',
      shortName: null,
      country: 'England',
      isNational: false,
      imagePath: null,
      favorite: false,
      foundedYear: 1900,
      bio: null,
      enrichmentState: 'not_requested',
      tenures: [],
      honours: [],
      matches: [],
      seasonRecords: [],
      media: [],
      externalLinks: [],
      article: null
    })
    apiMock.football.syncOverview.mockResolvedValue({
      status: { state: 'idle' }
    })

    renderWithQuery(
      <MemoryRouter initialEntries={['/football/team/1']}>
        <Routes><Route path="/football/team/:id" element={<FootballTeamPage />} /></Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Archive FC' })).toBeInTheDocument()
    await waitFor(() => expect(apiMock.football.startSync).not.toHaveBeenCalled())
    expect(screen.getByRole('button', { name: 'Fetch reference' })).toBeInTheDocument()
  })

  it('provides labelled external-link creation and preserves source-scoped coverage labels', async () => {
    const user = userEvent.setup()
    apiMock.football.saveExternalLink.mockResolvedValue({ id: 2 })
    const onChanged = vi.fn()
    render(
      <>
        <FootballExternalLinks entityKind="team" entityId={1} links={[]} onChanged={onChanged} />
        <FootballCoverageStrip coverage={[{
          id: 1,
          competitionId: 1,
          competitionKey: 'premier-league',
          competitionName: 'Premier League',
          seasonId: 1,
          source: 'statsbomb',
          facet: 'lineups',
          state: 'partial',
          itemCount: 1,
          expectedCount: 2,
          note: null,
          revision: 'one',
          checkedAt: '2026-01-01'
        }]}/>
      </>
    )

    expect(screen.getByRole('combobox', { name: 'Provider' })).toBeInTheDocument()
    await user.type(screen.getByRole('textbox', { name: 'Web address' }), 'https://fotmob.com/teams/example/1')
    await user.click(screen.getByRole('button', { name: 'Save link' }))
    expect(apiMock.football.saveExternalLink).toHaveBeenCalledWith(expect.objectContaining({
      entityKind: 'team',
      entityId: 1,
      provider: 'fotmob'
    }))
    expect(onChanged).toHaveBeenCalled()
    expect(screen.getByText('statsbomb / lineups')).toBeInTheDocument()
    expect(screen.getByText('partial')).toBeInTheDocument()
  })
})
