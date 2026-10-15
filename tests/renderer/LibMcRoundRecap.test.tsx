import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import LibMcRound, { type McQuestion } from '../../src/renderer/src/components/libraryQuiz/LibMcRound'

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    quiz: {
      history: async () => ({ recent: [], best: null, bestStreak: 0, totalSessions: 0 }),
      logSession: async () => ({ id: 1 })
    }
  }
}))

const question = (key: string, title: string, answer: string, other: string): McQuestion => ({
  key,
  validKeys: [`${key}-right`],
  prompt: <p>{title}</p>,
  recap: { title, imagePath: null },
  options: [
    { key: `${key}-right`, label: answer, node: <span>{answer}</span> },
    { key: `${key}-wrong`, label: other, node: <span>{other}</span> }
  ]
})

it('lists every question with its answer and the wrong pick in the summary', async () => {
  const user = userEvent.setup()
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <LibMcRound
          kind="cast"
          questions={[question('a', 'Actor One', 'Right Film', 'Other Film'), question('b', 'Actor Two', 'Second Film', 'Decoy Film')]}
          settings={{ seed: 1 }}
          timed={false}
          onPlayAgain={() => {}}
          backTo={{ to: '/quiz', label: 'quizzes' }}
        />
      </MemoryRouter>
    </QueryClientProvider>
  )
  await user.click(screen.getByRole('button', { name: /Right Film/ }))
  await user.click(screen.getByRole('button', { name: /Next/ }))
  await user.click(screen.getByRole('button', { name: /Decoy Film/ }))
  await user.click(screen.getByRole('button', { name: /See results/ }))

  const rows = screen.getAllByRole('listitem')
  expect(rows).toHaveLength(2)
  expect(within(rows[0]).getByText('Actor One')).toBeInTheDocument()
  expect(within(rows[0]).getByText('Correct')).toBeInTheDocument()
  expect(within(rows[1]).getByText('Second Film')).toBeInTheDocument()
  expect(within(rows[1]).getByText('You picked Decoy Film')).toBeInTheDocument()
})
