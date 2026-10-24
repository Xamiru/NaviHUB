import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'

const players = Array.from({ length: 10 }, (_, i) => ({
  key: String(i + 1), label: `Player ${String.fromCharCode(65 + i)}`, photoPath: null, nationality: 'Spain',
  position: 'Central Midfield', clubKey: '1', club: 'Club One', clubImagePath: null, league: 'La Liga',
  birthYear: 1990 + i, heightCm: 175 + i, shirt: i + 1
}))
const slots = ['Goalkeeper', 'Right-Back', 'Centre-Back', 'Centre-Back', 'Left-Back', 'Defensive Midfield', 'Central Midfield', 'Attacking Midfield', 'Right Winger', 'Centre-Forward', 'Left Winger']
  .map((position, i) => ({ key: String(i + 1), name: `Starter Surname${i + 1}`, aliases: [], photoPath: null, shirt: i + 1, position, line: [0, 1, 1, 1, 1, 2, 3, 4, 5, 5, 5][i] }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    quiz: {
      footballAvailability: async () => ({ wordle: 10, lineup: 3, transfer: 5 }),
      history: async () => ({ recent: [], best: null, bestStreak: 0, totalSessions: 0 }),
      logSession: async () => ({ id: 1 }),
      challengePool: async (request: { kind: string }) =>
        request.kind === 'footballWordle'
          ? [{ id: 'w', kind: 'footballWordle', prompt: '', choices: [], validKeys: ['3'], targetKey: '3', players, maxGuesses: 8, datasetRevision: 'r' }]
          : [{ id: 'l', kind: 'footballLineup', prompt: 'Name the Home FC starting XI.', choices: [], validKeys: slots.map((slot) => slot.key), matchId: 1, competitionName: 'Champions League', stage: 'Final', matchDate: '2019-06-01', homeTeam: 'Home FC', awayTeam: 'Away FC', homeImagePath: null, awayImagePath: null, scoreLabel: '2-0', side: 'home', formation: '4-3-3', slots, datasetRevision: 'r' }]
    }
  }
}))

import FootballWordlePage from '../../src/renderer/src/pages/FootballWordlePage'
import FootballLineupPage from '../../src/renderer/src/pages/FootballLineupPage'

function wrap(node: ReactNode) {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>{node}</MemoryRouter>
    </QueryClientProvider>
  )
}

it('plays a Football Wordle guess and shows its feedback row', async () => {
  const user = userEvent.setup()
  wrap(<FootballWordlePage />)
  await user.click(await screen.findByRole('button', { name: 'Start' }))
  const input = await screen.findByRole('combobox')
  await user.type(input, 'Player A')
  await user.keyboard('{Enter}')
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  expect(await screen.findByText('Guess 1')).toBeInTheDocument()
  expect(screen.getByText('1990 · target is younger')).toBeInTheDocument()
})

it('names a starter by surname on the Name the XI pitch', async () => {
  const user = userEvent.setup()
  wrap(<FootballLineupPage />)
  await user.click(await screen.findByRole('button', { name: 'Start' }))
  const input = await screen.findByLabelText('Starter')
  await user.type(input, 'Surname7{Enter}')
  expect(await screen.findByText('Starter Surname7')).toBeInTheDocument()
  expect(screen.getByText(/1 of 11 named/)).toBeInTheDocument()
})
