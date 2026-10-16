import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import JapaneseHomePage from '../../src/renderer/src/pages/JapaneseHomePage'
import { localDayString } from '../../src/renderer/src/lib/archiveDisplay'
import { expectNoAxeViolations } from './accessibility'

const course = (id: number, title: string, learned: number, total: number) => ({
  id, title, difficulty: id, lessonCount: total, learnedLessonCount: learned,
  description: null, seenCardCount: 0, dueCardCount: 0
})
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const history = { totalSessions: 0, bestStreak: 0, best: null, recent: [] }

const state = vi.hoisted(() => ({ settings: {} as Record<string, string>, totalReviews: 0 }))
const setSetting = vi.hoisted(() => vi.fn(async () => {}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => state.settings, set: setSetting },
    media: { list: async () => [] },
    quiz: { history: async () => history },
    japanese: {
      stats: async () => ({ dueCount: 0, newAvailableCount: 0, newDirectionCount: 0, learnedLessons: 0, totalLessons: 21, totalCards: 40, reviewsToday: 0, introducedToday: 0 }),
      roadmap: async () => ({
        steps: [course(1, 'Kana', 4, 4), course(2, 'JLPT N5 Foundations', 0, 21), course(3, 'N5 Kanji', 0, 6)],
        unscheduled: [],
        tracks: {
          words: { built: 0, target: 0, decks: 0, nextLesson: null },
          kanji: { built: 0, target: 0, decks: 0, nextLesson: null }
        },
        frontierCourseId: 2,
        nextLesson: { id: 9, title: 'Greetings', kind: 'vocab', courseId: 2, courseTitle: 'JLPT N5 Foundations' }
      }),
      statsDetail: async () => ({
        reviewsPerDay: [],
        streak: { current: 0, longest: 0 },
        gradeCounts: { again: 0, hard: 0, good: 0, easy: 0 },
        totalReviews: state.totalReviews,
        firstReviewAt: null,
        dueForecast: [{ day: localDayString(tomorrow), due: 12 }],
        retention: { strict: null, lenient: null, strict30: null, lenient30: null },
        journey: { distinctCardsReviewed: 0, wordsMined: 0, lessonsLearned: 0, chaptersRead: 0, quizRounds: 0 }
      }),
      tutorDays: async () => [],
      tutorErrors: async () => [],
      getLesson: async () => ({
        id: 9, courseId: 2, kind: 'vocab', title: 'Greetings', body: null, sortOrder: 1,
        learned: false, learnedAt: null, courseTitle: 'JLPT N5 Foundations',
        cards: [{ id: 1, front: '今日', reading: 'きょう', back: 'today' }]
      })
    }
  }
}))
vi.mock('../../src/renderer/src/components/japanese/SetupChecklist', () => ({ default: () => null }))

function renderToday() {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={['/japanese']}>
        <Routes>
          <Route path="/japanese" element={<JapaneseHomePage />} />
          <Route path="/japanese/tutor/session" element={<p>Session runner</p>} />
          <Route path="/japanese/kana" element={<p>Kana drills</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  state.settings = {}
  state.totalReviews = 0
  setSetting.mockClear()
})

it('welcomes a brand-new learner and starts them on kana', async () => {
  const { container } = renderToday()
  expect(await screen.findByRole('heading', { name: 'New to Japanese?' })).toBeInTheDocument()
  expect(screen.getByRole('list', { name: 'The first hiragana row' })).toHaveTextContent('あ')
  const blocks = screen.getByRole('list', { name: 'Blocks in this session' })
  expect(within(blocks).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
    expect.stringContaining('Learn the kana'),
    expect.stringContaining('One sound-system unit')
  ])
  expect(screen.getByRole('button', { name: 'Start 20-minute session' })).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await userEvent.click(screen.getByRole('button', { name: 'Start with hiragana' }))
  expect(setSetting).toHaveBeenCalledWith('japanese.kanaKnown', '0')
  expect(await screen.findByText('Kana drills')).toBeInTheDocument()
})

it('scales the session to the chosen length and remembers it', async () => {
  state.settings = { 'japanese.kanaKnown': '1' }
  renderToday()
  const ten = await screen.findByRole('button', { name: '10 min' })
  await userEvent.click(ten)
  expect(ten).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Start 10-minute session' })).toBeInTheDocument()
  const blocks = screen.getByRole('list', { name: 'Blocks in this session' })
  // Nothing to review yet, so the next lesson comes first.
  expect(within(blocks).getAllByRole('listitem')[0]).toHaveTextContent('Learn: Greetings')
  expect(localStorage.getItem('japanese.sessionBudget')).toBe('10')
})

it('shows the next lesson in Japanese, the week, the path and one primary action', async () => {
  state.settings = { 'japanese.kanaKnown': '1' }
  state.totalReviews = 3
  const { container } = renderToday()
  const words = await screen.findByRole('list', { name: 'Words in this lesson' })
  expect(within(words).getByText('きょう').tagName).toBe('RT')
  const chart = screen.getByRole('table', { name: 'Reviews due over the next 7 days' })
  expect(within(chart).getByText('12')).toBeInTheDocument()
  expect(screen.getByRole('link', { current: 'step' })).toHaveTextContent('JLPT N5 Foundations')
  expect(screen.queryByRole('heading', { name: 'New to Japanese?' })).not.toBeInTheDocument()
  expect(container.querySelectorAll('.btn-primary')).toHaveLength(1)
  await expectNoAxeViolations(container)

  await userEvent.click(screen.getByRole('button', { name: 'Start 20-minute session' }))
  expect(await screen.findByText('Session runner')).toBeInTheDocument()
  const saved = JSON.parse(localStorage.getItem('japanese.tutorSession.v1') ?? 'null')
  expect(saved).toMatchObject({ budgetMinutes: 20, baseline: { learnedLessons: 0 } })
})
