import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import FootballExternalLinks from '@/components/football/FootballExternalLinks'
import { FootballCompetitionMark, FootballCoverageStrip, FootballFlag } from '@/components/football/FootballCommon'
import FootballTeamPage from '@/pages/FootballTeamPage'
import FootballSyncPage from '@/pages/FootballSyncPage'
import FootballCurrentPage from '@/pages/FootballCurrentPage'
import FootballTitleTimeline, { footballTitleRuns } from '@/components/football/FootballTitleTimeline'
import FootballBracket from '@/components/football/FootballBracket'
import FootballTitleRace from '@/components/football/FootballTitleRace'
import type { FootballMatchSummary } from '@shared/types'
import type { FootballSeason, FootballTeamSummary } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

const apiMock = vi.hoisted(() => ({
  football: {
    team: vi.fn(),
    current: vi.fn(),
    overview: vi.fn(),
    matches: vi.fn(),
    syncStatus: vi.fn(),
    syncOverview: vi.fn(),
    startSync: vi.fn(),
    setFavorite: vi.fn(),
    saveExternalLink: vi.fn(),
    removeExternalLink: vi.fn(),
    openExternalLink: vi.fn(),
    competitionLogos: vi.fn(async () => ({}))
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

  it('draws a knockout bracket with legs and a title race with exact values', async () => {
    const club = (id: number, name: string): FootballTeamSummary => ({
      id, name, shortName: null, country: null, isNational: false, imagePath: null,
      colors: { primary: id === 1 ? '#c8102e' : '#ffffff', secondary: '#034694' }, favorite: false
    })
    const game = (id: number, home: FootballTeamSummary, away: FootballTeamSummary, score: [number, number]): FootballMatchSummary => ({
      id, seasonId: 1, competitionId: 1, competitionKey: 'champions-league', competitionName: 'Champions League',
      seasonLabel: '2020/21', stageId: null, stageName: 'SF', home, away, kickoffAt: null, matchDate: `2021-04-0${id}`,
      round: null, status: 'finished', homeScore: score[0], awayScore: score[1], homeExtraTime: null, awayExtraTime: null,
      homePenalties: null, awayPenalties: null, favorite: false, watchedAt: null, rating: null,
      eventCoverage: 'not_supplied', conflicted: false
    })
    const [a, b, c, d] = [club(1, 'Liverpool'), club(2, 'Chelsea'), club(3, 'Ajax'), club(4, 'Porto')]
    const { container, unmount } = render(
      <MemoryRouter>
        <FootballBracket rounds={[
          { label: 'Semi-finals', ties: [
            { teams: [a, c], matches: [game(1, a, c, [2, 0]), game(2, c, a, [1, 1])], goals: [3, 1], penalties: null, winnerId: 1 },
            { teams: [b, d], matches: [game(3, b, d, [0, 0])], goals: [0, 0], penalties: [5, 4], winnerId: 2 }
          ] },
          { label: 'Final', ties: [{ teams: [a, b], matches: [game(5, a, b, [1, 0])], goals: [1, 0], penalties: null, winnerId: 1 }] }
        ]} />
      </MemoryRouter>
    )
    expect(screen.getByRole('region', { name: 'Semi-finals' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Leg 2 1-1' }).getAttribute('href')).toBe('/football/match/2')
    expect(screen.getByText('(5)')).toBeTruthy()
    await expectNoAxeViolations(container)
    unmount()

    const race = render(
      <MemoryRouter>
        <FootballTitleRace lines={[{ team: a, points: [3, 4, 7] }, { team: b, points: [1, 4, 5] }]} />
      </MemoryRouter>
    )
    const table = screen.getByRole('table', { name: 'Points after each game' })
    expect([...table.querySelectorAll('tbody tr')].map((row) => row.textContent)).toEqual(['Liverpool347', 'Chelsea145'])
    // Chelsea's white primary would vanish on a light theme, so its line takes the secondary.
    expect([...race.container.querySelectorAll('polyline')].map((line) => line.getAttribute('stroke'))).toEqual(['#c8102e', '#034694'])
    await expectNoAxeViolations(race.container)
  })

  it('draws back-to-back titles as one block with the crest and a hover card per season', async () => {
    const team = (id: number, name: string, imagePath: string | null): FootballTeamSummary => ({
      id, name, shortName: null, country: 'England', isNational: false, imagePath,
      colors: { primary: '#ef0107', secondary: '#ffffff' }, favorite: false
    })
    const arsenal = team(1, 'Arsenal', 'media/arsenal.png')
    const leeds = team(2, 'Leeds United', null)
    const season = (id: number, label: string, champion: FootballTeamSummary | null): FootballSeason => ({
      id, competitionId: 1, competitionKey: 'premier-league', competitionName: 'Premier League', key: label,
      label, startDate: null, endDate: null, status: 'complete', editionNumber: null, teamCount: 20,
      championVerified: !!champion, champion, runnerUp: null, narrative: null, dataRevision: null, matchCount: 380
    })
    const seasons = [
      season(1, '1990/91', arsenal), season(2, '1991/92', leeds), season(3, '1992/93', null),
      season(4, '1993/94', arsenal), season(5, '1994/95', arsenal)
    ]
    expect(footballTitleRuns(seasons).map((run) => [run.champion?.name ?? null, run.seasons.length, run.start]))
      .toEqual([['Arsenal', 1, 0], ['Leeds United', 1, 1], [null, 1, 2], ['Arsenal', 2, 3]])

    const width = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100)
    try {
      const { container } = render(<MemoryRouter><FootballTitleTimeline seasons={seasons} /></MemoryRouter>)
      expect(screen.getAllByRole('listitem')).toHaveLength(5)
      // 20 px a season: only the two-season Arsenal run is wide enough for its crest.
      expect([...container.querySelectorAll('img')].map((img) => img.getAttribute('src')))
        .toEqual([expect.stringContaining('thumb/160/media/arsenal.png')])

      fireEvent.mouseEnter(screen.getByRole('link', { name: '1991/92: Leeds United' }))
      expect(screen.getByText('Leeds United')).toBeTruthy()
      fireEvent.focus(screen.getByRole('link', { name: '1992/93: no verified champion' }))
      expect(screen.getByText('No verified champion')).toBeTruthy()
      expect(screen.getByRole('link', { name: '1994/95: Arsenal' }).getAttribute('href')).toBe('/football/season/5')
      await expectNoAxeViolations(container)
    } finally {
      width.mockRestore()
    }
  })
  it('shows a stored competition logo as a thumbnail, then the original, then the code badge', async () => {
    apiMock.football.competitionLogos.mockResolvedValueOnce({ 'premier-league': 'media/dl-pl.png' })
    const { container } = renderWithQuery(
      <>
        <FootballFlag competitionKey="premier-league" />
        <FootballCompetitionMark competitionKey="premier-league" size="xs" />
      </>
    )
    await waitFor(() => expect(container.querySelectorAll('img')).toHaveLength(2))
    const [, mark] = [...container.querySelectorAll('img')]
    expect(mark.getAttribute('src')).toContain('thumb/160/media/dl-pl.png')

    fireEvent.error(mark)
    const original = container.querySelectorAll('img')[1]
    expect(original.getAttribute('src')).toContain('media/dl-pl.png')
    expect(original.getAttribute('src')).not.toContain('thumb/')

    fireEvent.error(original)
    expect(container.querySelectorAll('img')).toHaveLength(1)
    expect(screen.getAllByText('PL').length).toBeGreaterThanOrEqual(2)
  })

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

  it('offers the next matchday when the week has no matches', async () => {
    const user = userEvent.setup()
    const day = (offset: number) => new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10)
    const next = day(30)
    const monday = new Date(`${next}T00:00:00Z`)
    monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7))
    apiMock.football.current.mockResolvedValue({
      matches: [], standings: [], topScorers: [], coverage: [], entitlement: null, lastRefreshAt: null,
      quota: { used: 0, limit: 0, remaining: 0 }
    })
    apiMock.football.overview.mockResolvedValue({ fixtures: { updatedAt: '2026-09-28T10:00:00.000Z', latestResult: null } })
    apiMock.football.syncStatus.mockResolvedValue({ state: 'idle' })
    apiMock.football.matches.mockImplementation(async (filter: { dateFrom: string }) =>
      filter.dateFrom > day(0) ? [{ matchDate: next }] : [])

    renderWithQuery(<MemoryRouter><FootballCurrentPage /></MemoryRouter>)

    await user.click(await screen.findByRole('button', { name: /^Next matchday:/ }))
    const start = monday.toISOString().slice(0, 10)
    await waitFor(() => expect(apiMock.football.current).toHaveBeenCalledWith(null, start, expect.any(String)))
    expect(screen.queryByRole('button', { name: /^Previous matchday:/ })).not.toBeInTheDocument()
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
