import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import JapaneseCoursePage from '../../src/renderer/src/pages/JapaneseCoursePage'
import { expectNoAxeViolations } from './accessibility'

// 14 lessons, the first 7 learned: unit 1 complete, unit 2 holds the next one.
const lessons = Array.from({ length: 14 }, (_, i) => ({
  id: 100 + i,
  courseId: 1,
  kind: 'grammar' as const,
  title: `Lesson ${i + 1}`,
  learned: i < 7,
  cardCount: 5,
  sortOrder: i
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    japanese: {
      getCourse: async () => ({
        id: 1,
        title: 'JLPT N5 Foundations',
        description: 'Core grammar.',
        level: 'N5',
        difficulty: 1,
        seedKey: 'n5',
        lessons
      })
    }
  }
}))

it('groups a long course into units with a Continue button on the next lesson', async () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={['/japanese/courses/1']}>
        <Routes>
          <Route path="/japanese/courses/:id" element={<JapaneseCoursePage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
  const cont = await screen.findByRole('link', { name: 'Continue' })
  expect(cont).toHaveAttribute('href', '/japanese/lessons/107')
  expect(screen.getByText('Up next · lesson 8 of 14')).toBeInTheDocument()
  // Units of six: the finished first unit folds away, the current one is open.
  const units = container.querySelectorAll('details')
  expect(units).toHaveLength(3)
  expect(units[0]).not.toHaveAttribute('open')
  expect(units[1]).toHaveAttribute('open')
  expect(screen.getByRole('link', { name: /Lesson 8/ })).toHaveAttribute('aria-current', 'step')
  await expectNoAxeViolations(container)
})
