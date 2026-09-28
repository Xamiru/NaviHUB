import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import FootballExternalLinks from '@/components/football/FootballExternalLinks'
import { FootballCoverageStrip } from '@/components/football/FootballCommon'
import FootballTeamPage from '@/pages/FootballTeamPage'
import FootballSyncPage from '@/pages/FootballSyncPage'

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
      colors: null,
      favorite: false,
      foundedYear: 1900,
      venue: null,
      venueCapacity: null,
      bio: null,
      enrichmentState: 'not_requested',
      tenures: [],
      honours: [],
      matches: [],
      seasonRecords: [],
      scorers: [],
      rivals: [],
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

  it('shows setup as three ordered steps and continues with the unfinished ones in one run', async () => {
    const user = userEvent.setup()
    apiMock.football.syncOverview.mockResolvedValue({
      installed: true,
      setup: { history: '2026-09-28T10:00:00.000Z', detail: null, pictures: null },
      status: { state: 'idle', kind: null, done: 0, total: 0, message: null, setupStep: null },
      quota: { remaining: 100, limit: 100, backlog: 0 },
      entitlements: [],
      coverage: [],
      conflicts: [],
      playerQuizEligible: 0,
      playerQuizTarget: 250,
      artwork: { competitionsWithLogo: 0, teams: 10, teamsWithCrest: 2, teamsWithColors: 2, peopleWithPortrait: 0 },
      lastRuns: []
    })
    apiMock.football.startSync.mockResolvedValue({})
    renderWithQuery(<MemoryRouter><FootballSyncPage /></MemoryRouter>)

    expect(await screen.findByText('Match history')).toBeInTheDocument()
    expect(screen.getByText('Done 2026-09-28')).toBeInTheDocument()
    expect(screen.getByText('2 of 3 steps left.', { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(/Resolution queue/)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Continue setup' }))
    expect(apiMock.football.startSync).toHaveBeenCalledWith({ kind: 'setup' })
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
