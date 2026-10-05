import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import EnglishHomePage from '../../src/renderer/src/pages/EnglishHomePage'
import { expectNoAxeViolations } from './accessibility'

const word = (id: number, w: string) => ({
  id, word: w, phonetic: '/ɪˈnɛfəbl/', pos: 'adjective', meaning: 'too great to be expressed in words',
  example: null, createdAt: '', status: 'new', learningStep: 0, dueAt: null, intervalDays: 0, ease: 2.5, reps: 0, rank: 9000
})

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    english: {
      srsStats: async () => ({ dueCount: 3, newCount: 1, totalCount: 1, reviewedToday: 0 }),
      listLeeches: async () => [],
      errorTally: async () => ({ corrections: 0, submissions: 0, byCategory: [] }),
      deck: async () => [word(1, 'ineffable')]
    }
  }
}))

it('leads with the ledger, shows a word from the deck and lists tools as rows', async () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <EnglishHomePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
  expect(await screen.findByText('No corrections on record yet')).toBeInTheDocument()
  expect(await screen.findByText('ineffable')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^Review 3 due/ })).toHaveAttribute('href', '/english/review')
  expect(screen.getByRole('link', { name: 'Review 3 cards' })).toHaveClass('btn-primary')
  expect(container.querySelectorAll('.btn-primary')).toHaveLength(1)
  await expectNoAxeViolations(container)
})
