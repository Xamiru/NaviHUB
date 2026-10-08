import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import GameLinksPanel from '@/components/GameLinksPanel'
import GamesUpgradeSection from '@/components/GamesUpgradeSection'
import { api } from '@/lib/api'
import type { GameLinksState, GameUpgradePlan } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    gameCatalog: { status: vi.fn(), install: vi.fn() },
    gameUpgrade: { plan: vi.fn(), start: vi.fn(), status: vi.fn(), cancel: vi.fn() },
    gameLinks: {
      get: vi.fn(),
      searchWorks: vi.fn(),
      setWork: vi.fn(),
      unlinkWork: vi.fn(),
      searchBangumi: vi.fn(),
      setBangumi: vi.fn(),
      unlinkBangumi: vi.fn(),
      reset: vi.fn(),
      refreshCast: vi.fn()
    }
  }
}))

const mocked = api as unknown as {
  gameCatalog: Record<string, ReturnType<typeof vi.fn>>
  gameUpgrade: Record<string, ReturnType<typeof vi.fn>>
  gameLinks: Record<string, ReturnType<typeof vi.fn>>
}

function wrap(ui: ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

const idle = { id: 0, state: 'idle', done: 0, total: 0, upgraded: 0, failed: 0, message: null, failures: [] }

beforeEach(() => {
  vi.clearAllMocks()
  mocked.gameCatalog.status.mockResolvedValue({ installed: true, gameCount: 148272, snapshot: '2026-10-08' })
  mocked.gameUpgrade.status.mockResolvedValue(idle)
})

describe('Upgrade games', () => {
  const plan: GameUpgradePlan = {
    snapshot: '2026-10-08',
    total: 4,
    linked: 1,
    autoLinks: 2,
    unmatched: 0,
    toUpgrade: 3,
    review: [
      {
        mediaId: 9,
        title: 'DOOM',
        year: 1993,
        candidates: [
          { workId: 300, title: 'Doom', titleJa: null, year: 1993, platforms: ['MS-DOS'], coverUrl: null },
          { workId: 301, title: 'Doom', titleJa: null, year: 1994, platforms: ['Sega 32X'], coverUrl: null }
        ]
      }
    ]
  }

  it('checks first, then offers the run and the picks it could not make', async () => {
    mocked.gameUpgrade.plan.mockResolvedValue(plan)
    mocked.gameLinks.setWork.mockResolvedValue({})
    const user = userEvent.setup()
    const { container } = wrap(<GamesUpgradeSection />)

    await user.click(await screen.findByRole('button', { name: 'Check my games' }))
    expect(await screen.findByRole('button', { name: 'Upgrade 3 games' })).toBeInTheDocument()
    expect(screen.getByText('Need your pick').nextSibling).toHaveTextContent('1')

    const review = screen.getByRole('region', { name: 'Which game is it?' })
    await user.click(within(review).getByRole('button', { name: /Doom 1994/ }))
    expect(mocked.gameLinks.setWork).toHaveBeenCalledWith(9, 301)
    await waitFor(() => expect(screen.queryByRole('region', { name: 'Which game is it?' })).not.toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Upgrade 3 games' }))
    expect(mocked.gameUpgrade.start).toHaveBeenCalled()
    await expectNoAxeViolations(container)
  })

  it('asks for the catalog before anything else', async () => {
    mocked.gameCatalog.status.mockResolvedValue({ installed: false, gameCount: 0, snapshot: null })
    wrap(<GamesUpgradeSection />)
    expect(await screen.findByRole('button', { name: 'Install catalog' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Check my games' })).not.toBeInTheDocument()
  })
})

describe('Game sources panel', () => {
  const state: GameLinksState = {
    catalogInstalled: true,
    links: [
      { source: 'bangumi', externalId: '278949', method: 'exact', linkedAt: '' },
      { source: 'launchbox', externalId: '179069', method: 'xref', linkedAt: '' }
    ],
    work: { workId: 179069, title: 'Persona 5 Royal', titleJa: 'ペルソナ5 ザ・ロイヤル', year: 2020, platforms: ['PC'], coverUrl: null },
    unlinked: [],
    covers: []
  }

  it('shows where the game comes from and re-links Bangumi by search', async () => {
    mocked.gameLinks.get.mockResolvedValue(state)
    mocked.gameLinks.searchBangumi.mockResolvedValue([{ id: 88868, name: 'ペルソナ5', date: '2016-09-15', coverUrl: null }])
    mocked.gameLinks.setBangumi.mockResolvedValue({ linked: true, cast: 30, staff: 4, relations: 1 })
    const user = userEvent.setup()
    const { container } = wrap(<GameLinksPanel mediaId={5} title="Persona 5 Royal" />)

    expect(await screen.findByText('Persona 5 Royal')).toBeInTheDocument()
    expect(screen.getByText(/Bangumi entry 278949/)).toHaveTextContent('matched by exact title')
    await expectNoAxeViolations(container)

    const cast = screen.getByRole('heading', { name: 'Cast (Bangumi)' }).parentElement!
    await user.click(within(cast).getByRole('button', { name: 'Change…' }))
    const dialog = await screen.findByRole('dialog', { name: 'Find on Bangumi' })
    await user.click(await within(dialog).findByRole('button', { name: /ペルソナ5/ }))
    await waitFor(() => expect(mocked.gameLinks.setBangumi).toHaveBeenCalledWith(5, 88868))
  })

  it('removes a wrong Bangumi link together with its cast', async () => {
    mocked.gameLinks.get.mockResolvedValue(state)
    mocked.gameLinks.unlinkBangumi.mockResolvedValue(undefined)
    const user = userEvent.setup()
    wrap(<GameLinksPanel mediaId={5} title="Persona 5 Royal" />)
    const cast = (await screen.findByRole('heading', { name: 'Cast (Bangumi)' })).parentElement!
    await user.click(within(cast).getByRole('button', { name: 'Not this game' }))
    expect(mocked.gameLinks.unlinkBangumi).toHaveBeenCalledWith(5)
  })
})
