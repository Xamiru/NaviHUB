import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import ProgrammingHomePage from '../../src/renderer/src/pages/ProgrammingHomePage'
import { PROG_COURSES, progLessonKey } from '@shared/programming/courses'
import { expectNoAxeViolations } from './accessibility'

const course = PROG_COURSES[0]
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    programming: {
      progress: async () => [{ lessonKey: progLessonKey(PROG_COURSES[0].key, PROG_COURSES[0].lessons[0].key), completedAt: '' }],
      attempts: async () => [],
      cliMisses: async () => [],
      solves: async () => [{ kind: 'sql', key: 'x', solvedAt: '' }]
    },
    quiz: { history: async () => ({ recent: [], best: null, bestStreak: 0, totalSessions: 2 }) }
  }
}))

beforeEach(() => localStorage.clear())

function mount() {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <ProgrammingHomePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

it('asks for a focus first, then shows the lesson spine with the recommendation', async () => {
  const user = userEvent.setup()
  const { container } = mount()
  expect(screen.getByRole('region', { name: 'Pick a focus' })).toBeInTheDocument()
  expect(await screen.findByText(/^1 \/ \d+ solved$/)).toBeInTheDocument()
  expect(screen.queryByText('Lessons read')).not.toBeInTheDocument()
  await expectNoAxeViolations(container)

  await user.selectOptions(screen.getByRole('combobox', { name: 'Course to focus on' }), course.key)
  expect(screen.queryByRole('region', { name: 'Pick a focus' })).not.toBeInTheDocument()
  const recommended = await screen.findByRole('link', { current: 'step' })
  // The first lesson is marked read, so the recommendation is the next one.
  expect(recommended).toHaveTextContent(course.lessons[1].title)
  expect(screen.getByRole('link', { name: new RegExp(`^${course.lessons[0].title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*Read`) })).toBeInTheDocument()
  expect(container.querySelectorAll('.btn-primary')).toHaveLength(1)
})
