import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AchievementSetupDialog from '@/components/AchievementSetupDialog'
import { TrophyRow } from '@/components/TrophyDisplay'
import AchievementNameDialog from '@/components/AchievementNameDialog'
import GoldbergWizardDialog from '@/components/GoldbergWizardDialog'
import ConfirmHost from '@/components/ConfirmHost'
import { api } from '@/lib/api'
import type { AchievementRow, GoldbergState } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    achievements: {
      raConsoles: vi.fn(async () => [{ id: '1', name: 'SNES' }]),
      raSearch: vi.fn(async () => []),
      setupRa: vi.fn(),
      setupSteam: vi.fn(),
      resolveSteam: vi.fn(async () => []),
      swapNames: vi.fn(async () => {}),
      goldbergState: vi.fn(),
      goldbergInstall: vi.fn(),
      goldbergRestore: vi.fn(),
      generateGoldberg: vi.fn(async () => null)
    }
  }
}))

function renderWithQuery(ui: React.ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('achievement setup', () => {
  it('names the RetroAchievements search controls and passes an accessibility scan', async () => {
    const { container } = renderWithQuery(
      <AchievementSetupDialog
        mediaId={1}
        provider="ra"
        onClose={vi.fn()}
        onDone={vi.fn()}
      />
    )

    expect(await screen.findByRole('combobox', { name: 'System' })).toBeInTheDocument()
    expect(await screen.findByRole('option', { name: 'SNES' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Game title' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Or enter a RetroAchievements game id' }))
      .toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})

describe('achievement row actions', () => {
  it('keeps the manual toggle rendered at narrow widths', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <ul>
        <TrophyRow
          provider="steam"
          busy={false}
          onToggle={onToggle}
          achievement={{
            id: 1,
            apiName: 'FIRST',
            name: 'First unlock',
            description: 'Finish the tutorial',
            hidden: false,
            iconPath: null,
            iconGrayPath: null,
            points: null,
            globalPct: 50,
            rarity: 'common',
            unlockedAt: null,
            unlockSource: null,
            nameStatus: 'ok',
            progress: null
          }}
        />
      </ul>
    )

    const button = screen.getByRole('button', { name: 'Mark earned' })
    expect(button).not.toHaveClass('hidden')
    await user.click(button)
    expect(onToggle).toHaveBeenCalledWith(true)
  })
})

function row(over: Partial<AchievementRow>): AchievementRow {
  return {
    id: 1,
    apiName: 'trophy_011',
    name: 'Pizza Chef',
    description: 'Discover the truth about the Pizza Chef.',
    hidden: false,
    iconPath: null,
    iconGrayPath: null,
    points: null,
    globalPct: 42.5,
    rarity: 'common',
    unlockedAt: null,
    unlockSource: null,
    nameStatus: 'ok',
    progress: null,
    ...over
  }
}

describe('achievement row corrections', () => {
  it('shows the emulator counter on a locked achievement only', () => {
    const { rerender } = render(
      <ul>
        <TrophyRow
          provider="steam"
          busy={false}
          onToggle={vi.fn()}
          achievement={row({ name: 'Heavy Lifter', progress: { current: 820, max: 2000 } })}
        />
      </ul>
    )
    const bar = screen.getByRole('progressbar', { name: 'Heavy Lifter progress' })
    expect(bar).toHaveAttribute('aria-valuenow', '820')
    expect(screen.getByText(/820\s\/\s2,000/)).toBeInTheDocument()
    rerender(
      <ul>
        <TrophyRow
          provider="steam"
          busy={false}
          onToggle={vi.fn()}
          achievement={row({
            name: 'Heavy Lifter',
            unlockedAt: '2026-09-29 10:00:00',
            unlockSource: 'manual',
            progress: { current: 820, max: 2000 }
          })}
        />
      </ul>
    )
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(screen.getByText(/marked by hand/)).toBeInTheDocument()
  })

  it('renders a named checkbox while picking several to mark earned', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ul>
        <TrophyRow
          provider="steam"
          busy={false}
          onToggle={vi.fn()}
          selection={{ selected: false, onChange }}
          achievement={row({})}
        />
      </ul>
    )
    await user.click(screen.getByRole('checkbox', { name: 'Select Pizza Chef' }))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})

describe('achievement name dialog', () => {
  it('swaps with the closest-percentage neighbour by default', async () => {
    const user = userEvent.setup()
    const onDone = vi.fn()
    const rows = [
      row({ id: 1, apiName: 'trophy_011', name: 'Pizza Chef', globalPct: 42.5 }),
      row({ id: 2, apiName: 'trophy_a', name: 'Far away', globalPct: 90 }),
      row({ id: 3, apiName: 'trophy_043', name: 'Keep Lou Safe', globalPct: 42.4 })
    ]
    const { container } = render(
      <AchievementNameDialog achievements={rows} onClose={vi.fn()} onDone={onDone} />
    )
    expect(screen.getByRole('dialog', { name: 'Fix an achievement name' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /Swap its name with/ })).toHaveValue('3')
    await user.click(screen.getByRole('button', { name: 'Swap names' }))
    expect(api.achievements.swapNames).toHaveBeenCalledWith(1, 3)
    expect(onDone).toHaveBeenCalled()
    await expectNoAxeViolations(container)
  })
})

function goldberg(over: Partial<GoldbergState>): GoldbergState {
  return {
    gameDir: 'C:\\Games\\DS2',
    dllName: 'steam_api64.dll',
    emulator: 'goldberg',
    settingsDir: 'C:\\Games\\DS2\\steam_settings',
    list: 'missing',
    missing: 55,
    total: 55,
    canRestore: false,
    ...over
  }
}

describe('one-click Goldberg setup', () => {
  it('writes the list in one click when the game already runs Goldberg', async () => {
    const user = userEvent.setup()
    vi.mocked(api.achievements.goldbergState).mockResolvedValue(goldberg({}))
    vi.mocked(api.achievements.goldbergInstall).mockResolvedValue(
      goldberg({ list: 'complete', missing: 0, canRestore: true })
    )
    const { container } = renderWithQuery(<GoldbergWizardDialog mediaId={7} onClose={vi.fn()} />)
    await user.click(await screen.findByRole('button', { name: 'Write the achievement list' }))
    expect(api.achievements.goldbergInstall).toHaveBeenCalledWith(7)
    expect(await screen.findByRole('button', { name: 'Restore the original list' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rewrite the list' })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('gives manual DLL steps, and no way to write, when the crack is not Goldberg yet', async () => {
    vi.mocked(api.achievements.goldbergState).mockResolvedValue(goldberg({ emulator: 'other' }))
    renderWithQuery(<GoldbergWizardDialog mediaId={7} onClose={vi.fn()} />)
    expect(await screen.findByText(/swap Goldberg in by hand/)).toBeInTheDocument()
    expect(screen.getByText('release/experimental/x64')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Write the achievement list|Choose/ })).not.toBeInTheDocument()
  })

  it('restores the original list only after confirming', async () => {
    const user = userEvent.setup()
    vi.mocked(api.achievements.goldbergState).mockResolvedValue(
      goldberg({ list: 'complete', missing: 0, canRestore: true })
    )
    vi.mocked(api.achievements.goldbergRestore).mockResolvedValue(goldberg({}))
    renderWithQuery(
      <>
        <GoldbergWizardDialog mediaId={7} onClose={vi.fn()} />
        <ConfirmHost />
      </>
    )
    await user.click(await screen.findByRole('button', { name: 'Restore the original list' }))
    expect(api.achievements.goldbergRestore).not.toHaveBeenCalled()
    await user.click(await screen.findByRole('button', { name: 'Restore original' }))
    expect(api.achievements.goldbergRestore).toHaveBeenCalledWith(7)
  })

  it('explains when there is no Steam DLL to work with', async () => {
    vi.mocked(api.achievements.goldbergState).mockResolvedValue(
      goldberg({ emulator: 'none', gameDir: null, dllName: null })
    )
    renderWithQuery(<GoldbergWizardDialog mediaId={7} onClose={vi.fn()} />)
    expect(await screen.findByText(/cannot be set up here/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Write the achievement list/ })).not.toBeInTheDocument()
  })
})
