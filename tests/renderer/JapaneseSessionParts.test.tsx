import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import SessionLauncher from '../../src/renderer/src/components/japanese/SessionLauncher'
import SessionSummary from '../../src/renderer/src/components/japanese/SessionSummary'
import JapaneseToolsPage from '../../src/renderer/src/pages/JapaneseToolsPage'
import { expectNoAxeViolations } from './accessibility'

const celebrate = vi.hoisted(() => vi.fn())
vi.mock('../../src/renderer/src/lib/themeFx', () => ({ celebrateProgress: celebrate }))
vi.mock('../../src/renderer/src/lib/useJapaneseTutorModel', () => ({
  useJapaneseTutorModel: () => ({ ready: true, kanaNeeded: false, plan: { phase: { id: 'bridge' } } })
}))

function wrap(ui: JSX.Element) {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  celebrate.mockClear()
})

it('starts a session in one click and keeps the settings folded away', async () => {
  const onStart = vi.fn()
  const { container } = wrap(
    <SessionLauncher
      summary={<p>10 questions</p>}
      defaults="Japanese to English · all courses"
      startLabel="Start quiz"
      onStart={onStart}
      options={<button type="button">Endless</button>}
    />
  )
  expect(screen.getByRole('button', { name: 'Endless' })).not.toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: 'Start quiz' }))
  expect(onStart).toHaveBeenCalledTimes(1)
  await userEvent.click(screen.getByText('Options'))
  expect(screen.getByRole('button', { name: 'Endless' })).toBeVisible()
  await expectNoAxeViolations(container)
})

it('summarises a session, lists what to look at again and celebrates once', async () => {
  const retry = vi.fn()
  const { container } = wrap(
    <SessionSummary
      title="Quiz complete"
      score={{ correct: 7, total: 10 }}
      missed={[{ key: '1', jp: '食べ物', reading: 'たべもの', meaning: 'food' }]}
      onRetryMissed={retry}
    />
  )
  expect(screen.getByText('70%')).toBeInTheDocument()
  expect(screen.getByText('7 of 10 correct')).toBeInTheDocument()
  const missed = screen.getByRole('heading', { name: 'To look at again · 1' }).closest('div')!.parentElement!
  expect(within(missed).getByText('もの').tagName).toBe('RT')
  await userEvent.click(screen.getByRole('button', { name: 'Practise these again' }))
  expect(retry).toHaveBeenCalled()
  // No guided session is running, so the next step is Today.
  expect(screen.getByRole('link', { name: 'Back to Today' })).toHaveAttribute('href', '/japanese')
  expect(celebrate).toHaveBeenCalledTimes(1)
  await expectNoAxeViolations(container)
})

it('offers the guided session as the next step while one is running', () => {
  const today = new Date()
  const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  localStorage.setItem(
    'japanese.tutorSession.v1',
    JSON.stringify({
      version: 1, day, startedAt: today.toISOString(), phaseId: 'foundation', tasks: [],
      baseline: { due: 0, reviewsToday: 0, introducedToday: 0, chaptersRead: 0 },
      manualCompleted: [], dismissedRepairs: [], endedAt: null
    })
  )
  wrap(<SessionSummary score={{ correct: 0, total: 4 }} />)
  expect(screen.getByRole('link', { name: 'Continue today’s session' })).toHaveAttribute(
    'href',
    '/japanese/tutor/session'
  )
  expect(celebrate).not.toHaveBeenCalled()
})

it('lists every tool by goal, marks suggestions and filters by search', async () => {
  const { container } = wrap(<JapaneseToolsPage />)
  expect(screen.getByRole('heading', { name: 'Read' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Sentence feed.*Suggested for you/ })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^Dictionary/ })).not.toHaveTextContent('Suggested')
  await expectNoAxeViolations(container)

  await userEvent.type(screen.getByRole('searchbox', { name: 'Search tools' }), 'kanji')
  expect(screen.getByRole('link', { name: /Kanji writing/ })).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: /Sentence feed/ })).not.toBeInTheDocument()
})
