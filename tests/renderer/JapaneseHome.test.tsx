import { render, screen, within } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import JapaneseHomePage from '../../src/renderer/src/pages/JapaneseHomePage'
import { localDayString } from '../../src/renderer/src/lib/archiveDisplay'
import { expectNoAxeViolations } from './accessibility'

const course = (id: number, title: string, learned: number, total: number) => ({
  id, title, difficulty: id, lessonCount: total, learnedLessonCount: learned,
  description: null, seenCardCount: 0, dueCardCount: 0
})
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    media: { list: async () => [] },
    japanese: {
      stats: async () => ({ dueCount: 0, newAvailableCount: 0, learnedLessons: 0, totalLessons: 21, totalCards: 40, reviewsToday: 0, introducedToday: 0 }),
      roadmap: async () => ({
        steps: [course(1, 'Kana', 4, 4), course(2, 'JLPT N5 Foundations', 0, 21), course(3, 'N5 Kanji', 0, 6)],
        unscheduled: [],
        frontierCourseId: 2,
        nextLesson: { id: 9, title: 'Greetings', kind: 'grammar', courseId: 2, courseTitle: 'JLPT N5 Foundations' }
      }),
      statsDetail: async () => ({ dueForecast: [{ day: localDayString(tomorrow), due: 12 }] })
    }
  }
}))
vi.mock('../../src/renderer/src/components/japanese/SetupChecklist', () => ({ default: () => null }))

it('shows the week of reviews, the course path as steps, and one filled action', async () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <JapaneseHomePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
  const chart = await screen.findByRole('table', { name: 'Reviews due over the next 7 days' })
  expect(within(chart).getByText('12')).toBeInTheDocument()
  const current = screen.getByRole('link', { current: 'step' })
  expect(current).toHaveTextContent('JLPT N5 Foundations')
  expect(screen.getByRole('link', { name: /^Kana 4 \/ 4 lessons/ })).toHaveTextContent('learned')
  expect(container.querySelectorAll('.btn-primary')).toHaveLength(1)
  expect(screen.queryByRole('link', { name: 'Continue lesson' })).not.toBeInTheDocument()
  await expectNoAxeViolations(container)
})
