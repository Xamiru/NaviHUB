import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import QuizLandingPage from '../../src/renderer/src/pages/QuizLandingPage'
import { expectNoAxeViolations } from './accessibility'

const session = (score: number, total: number, settings: Record<string, unknown> | null = null) => ({
  id: score, kind: 'connections', score, total, bestStreak: 0, settings, playedAt: '2026-10-01 20:00:00'
})

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    quiz: {
      availability: async () => ({
        guessTrack: 0, song: 0, imageReveal: 0, connections: 40,
        chronology: 0, cast: 0, va: 0, synopsis: 0, higherLower: 0, libraryGrid: 0, movieChain: 0,
        libraryle: 0, mysteryCareer: 0, linkWall: 0,
        higherLowerOptions: [], guessTrackOptions: [], screenGameOptions: [], football: {}
      }),
      history: async (kind: string) =>
        kind === 'connections'
          ? { recent: [], best: session(8, 10, { correct: 8 }), bestStreak: 4, totalSessions: 3 }
          : kind === 'higherLower'
            ? { recent: [], best: session(1240, 10), bestStreak: 2, totalSessions: 1 }
            : kind === 'imageReveal' || kind === 'imageRevealTyped'
              ? { recent: [], best: session(900, 10), bestStreak: 1, totalSessions: 1 }
              : { recent: [], best: null, bestStreak: 0, totalSessions: 0 }
    }
  }
}))

it('shows each format with its own record and filters by group', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <QuizLandingPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
  // Tiles become links once availability arrives; wait for that render.
  const connections = await screen.findByRole('link', { name: /^Connections/ })
  expect(await within(connections).findByText('Best 8/10 · 3 rounds')).toBeInTheDocument()
  // Higher or Lower ranks by points.
  expect(screen.getByText('Best 1,240 pts · 1 round')).toBeInTheDocument()
  // Image Reveal logs two modes that rank separately, so its tile counts rounds only.
  expect(screen.getByText('2 rounds')).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await user.click(screen.getByRole('button', { name: /^Audio/ }))
  expect(screen.getByText('Guess the Track')).toBeInTheDocument()
  expect(screen.queryByText('Image Reveal')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /^All/ }))
  expect(screen.getByText('Image Reveal')).toBeInTheDocument()
})
