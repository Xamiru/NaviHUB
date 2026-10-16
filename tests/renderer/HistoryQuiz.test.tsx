import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import HistoryQuizGamePage from '@/pages/HistoryQuizGamePage'
import type { HistoryQuizQuestion } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

const dateQuestion = (i: number): HistoryQuizQuestion => ({
  kind: 'historyDate',
  key: `event:e${i}`,
  ref: `event:e${i}`,
  title: `Event ${i}`,
  image: null,
  choices: [1500, 1510, 1520, 1530].map((y) => ({ key: String(y + i), label: String(y + i), image: null })),
  validKeys: [String(1510 + i)]
})

const apiMock = vi.hoisted(() => ({
  history: { quizCounts: vi.fn(), quizDeal: vi.fn() },
  quiz: { logSession: vi.fn(async () => ({ id: 1 })) }
}))
vi.mock('@/lib/api', () => ({ api: apiMock }))
vi.mock('@/lib/browserTabs', () => ({ useTabLeaveGuard: () => {} }))

describe('History quiz game', () => {
  it('deals a round, scores each answer and logs the round once', async () => {
    apiMock.history.quizCounts.mockResolvedValue({ historyChronology: 0, historyQuote: 0, historyDate: 30, historyMapState: 0 })
    apiMock.history.quizDeal.mockResolvedValue([0, 1, 2, 3, 4].map(dateQuestion))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const { container } = render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/history/quiz/date?scope=all']}>
          <Routes>
            <Route path="/history/quiz/:game" element={<HistoryQuizGamePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
    expect(await screen.findByText(/30 to deal from/)).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: '5 questions' }))
    await userEvent.click(screen.getByRole('button', { name: 'Start round' }))
    expect(apiMock.history.quizDeal).toHaveBeenCalledWith(expect.objectContaining({ kind: 'historyDate', length: 5, scope: 'all' }))

    expect(await screen.findByText('In which year did Event 0 begin?')).toBeTruthy()
    await expectNoAxeViolations(container)
    for (let i = 0; i < 5; i++) {
      // Right on even questions, wrong on odd ones.
      await userEvent.click(screen.getByRole('button', { name: String((i % 2 ? 1500 : 1510) + i) }))
      if (i % 2) expect(screen.getByText(`Answer: ${1510 + i}`)).toBeTruthy()
      await userEvent.click(screen.getByRole('button', { name: i === 4 ? 'Finish' : 'Next' }))
    }
    expect(await screen.findByRole('heading', { name: 'Round complete' })).toBeTruthy()
    expect(apiMock.quiz.logSession).toHaveBeenCalledTimes(1)
    expect(apiMock.quiz.logSession).toHaveBeenCalledWith(
      expect.objectContaining({ kind: 'historyDate', score: 3, total: 5, settings: expect.objectContaining({ scorePolicy: 'accuracy', filters: { scope: 'all' } }) })
    )
    expect(screen.getByRole('link', { name: 'Event 1' }).getAttribute('href')).toBe('/history/event/e1')
  })
})
