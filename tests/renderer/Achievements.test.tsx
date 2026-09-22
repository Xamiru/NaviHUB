import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AchievementSetupDialog from '@/components/AchievementSetupDialog'
import { TrophyRow } from '@/components/TrophyDisplay'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    achievements: {
      raConsoles: vi.fn(async () => [{ id: '1', name: 'SNES' }]),
      raSearch: vi.fn(async () => []),
      setupRa: vi.fn(),
      setupSteam: vi.fn(),
      resolveSteam: vi.fn(async () => [])
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
            unlockSource: null
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
