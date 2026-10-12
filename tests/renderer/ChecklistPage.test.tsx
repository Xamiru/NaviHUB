import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ChecklistPage from '@/pages/ChecklistPage'
import ChecklistQuickCard from '@/components/checklist/ChecklistQuickCard'
import { expectNoAxeViolations } from './accessibility'
import type { ChecklistStatus, ChecklistTaskStatus } from '@shared/types'

const SAT = '2026-07-25'
const FRI = '2026-07-24'
const WEEK = ['2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30', '2026-07-31']
const PREV_WEEK = ['2026-07-18', '2026-07-19', '2026-07-20', '2026-07-21', '2026-07-22', '2026-07-23', FRI]

const checklist = vi.hoisted(() => ({
  status: vi.fn(),
  tick: vi.fn(async () => 1),
  untick: vi.fn(async () => undefined),
  credit: vi.fn(async () => 1),
  skip: vi.fn(async () => undefined),
  logMedia: vi.fn(async () => ({ logId: 1, title: 'Frieren', startedRewatch: false, rewatchCount: 0, progress: 4, status: 'Watching' })),
  logSession: vi.fn(),
  undoLog: vi.fn(async () => undefined),
  addTask: vi.fn(async () => 9),
  removeTask: vi.fn(async () => undefined),
  setTarget: vi.fn(async () => undefined),
  setDays: vi.fn(async () => undefined),
  reorder: vi.fn(async () => undefined),
  createCustom: vi.fn(async () => 10),
  updateCustom: vi.fn(async () => undefined),
  deleteCustom: vi.fn(async () => undefined)
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { checklist, settings: { all: async () => ({}) }, media: { list: async () => [] } }
}))

function task(over: Partial<ChecklistTaskStatus>): ChecklistTaskStatus {
  return {
    id: 1,
    key: 'custom-1',
    cadence: 'daily',
    label: 'Stretch',
    hint: '',
    note: null,
    unit: null,
    kind: 'manual',
    customId: 1,
    route: null,
    mediaType: null,
    target: 1,
    defaultTarget: 1,
    days: null,
    due: true,
    skipped: false,
    detected: 0,
    credited: 0,
    progress: 0,
    done: false,
    state: 'pending',
    entries: [],
    streak: { current: 0, longest: 0 },
    rate: { done: 0, due: 0 },
    strip: WEEK.map((period, i) => ({ period, state: i === 0 ? 'pending' : 'future' })),
    suggestions: [],
    ...over
  }
}

function status(day = SAT): ChecklistStatus {
  const days = day === SAT ? WEEK : PREV_WEEK
  return {
    today: SAT,
    day,
    week: { start: days[0], end: days[6] },
    restDay: false,
    summary: { done: 0, due: 3 },
    daily: [
      task({}),
      task({
        id: 2,
        key: 'custom-2',
        customId: 2,
        label: 'Workout',
        unit: 'sets',
        target: 3,
        defaultTarget: 3,
        streak: { current: 4, longest: 6 },
        rate: { done: 20, due: 25 }
      }),
      task({
        id: 3,
        key: 'anime-episode',
        customId: null,
        label: 'Watch an anime episode',
        kind: 'mediaLog',
        mediaType: 'anime',
        suggestions: [{ mediaId: 7, title: 'Frieren', coverPath: null }]
      })
    ],
    weekly: [
      task({
        id: 4,
        key: 'movie-watch',
        cadence: 'weekly',
        customId: null,
        label: 'Watch a movie',
        kind: 'mediaLog',
        mediaType: 'movie',
        target: 2,
        defaultTarget: 2
      })
    ],
    streak: { current: 3, longest: 9 },
    weekDays: days.map((d) => ({
      day: d,
      state: d < SAT ? 'done' : d === SAT ? 'pending' : 'future',
      done: d < SAT ? 3 : 0,
      due: d <= SAT ? 3 : 0
    })),
    history: [{ day: FRI, count: 3, skipped: false }]
  }
}

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <ChecklistPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  checklist.status.mockImplementation(async (day?: string) => status(day ?? SAT))
})

describe('ChecklistPage', () => {
  it('renders the day, the boards and the week strip without axe violations', async () => {
    const { container } = renderPage()
    expect(await screen.findByRole('heading', { name: 'Today' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'This week' })).toBeInTheDocument()
    expect(await screen.findByText('4-day streak', { exact: false })).toBeInTheDocument()
    const strip = screen.getByRole('navigation', { name: 'Choose a day' })
    expect(within(strip).getAllByRole('button', { name: /Jul/ })).toHaveLength(7)
    await expectNoAxeViolations(container)
  })

  it('ticks a checkbox item, adds an amount and logs a suggested title', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(await screen.findByRole('checkbox', { name: 'Stretch' }))
    expect(checklist.tick).toHaveBeenCalledWith('custom-1', 'daily', undefined)

    await user.click(screen.getByRole('button', { name: 'Add an amount to Workout' }))
    const amount = screen.getByRole('textbox', { name: 'Amount (sets)' })
    await user.clear(amount)
    await user.type(amount, '2')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(checklist.credit).toHaveBeenCalledWith('custom-2', 'daily', 2, undefined)

    await user.click(screen.getByRole('button', { name: 'Log Frieren' }))
    expect(checklist.logMedia).toHaveBeenCalledWith('anime-episode', 'daily', 7, undefined)
  })

  it('skips an item and takes a rest day', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(await screen.findByRole('button', { name: 'More for Stretch' }))
    await user.click(screen.getByRole('menuitem', { name: 'Skip this day' }))
    expect(checklist.skip).toHaveBeenCalledWith(1, 'daily', true, undefined)

    await user.click(screen.getByRole('button', { name: 'Take a rest day' }))
    expect(checklist.skip).toHaveBeenCalledWith(null, 'daily', true, undefined)
  })

  it('steps back to an earlier day and writes to it', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(await screen.findByRole('button', { name: 'Previous week' }))
    await waitFor(() => expect(checklist.status).toHaveBeenCalledWith(FRI))
    expect(await screen.findByText(/Ticks, credits and logs count for that day/)).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Stretch' }))
    expect(checklist.tick).toHaveBeenCalledWith('custom-1', 'daily', FRI)

    await user.click(screen.getByRole('button', { name: 'Back to today' }))
    expect(await screen.findByRole('heading', { name: 'Today' })).toBeInTheDocument()
  })

  it('creates a custom counter from the add dialog', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(await screen.findByRole('button', { name: 'Add item' }))
    const dialog = screen.getByRole('dialog', { name: 'Add to your daily board' })
    await user.click(within(dialog).getByRole('tab', { name: 'Your own' }))
    await user.type(within(dialog).getByRole('textbox', { name: 'Name' }), 'Read')
    const target = within(dialog).getByRole('textbox', { name: /Target per day/ })
    await user.clear(target)
    await user.type(target, '20')
    await user.type(within(dialog).getByRole('textbox', { name: /Unit/ }), 'pages')
    await user.click(within(dialog).getByRole('button', { name: 'Monday' }))
    await expectNoAxeViolations(dialog)
    await user.click(within(dialog).getByRole('button', { name: 'Add to board' }))
    // Every day but Monday.
    expect(checklist.createCustom).toHaveBeenCalledWith(
      { label: 'Read', target: 20, unit: 'pages', note: null },
      'daily',
      0b1111101
    )
  })

  it('refuses a custom item with no name', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(await screen.findByRole('button', { name: 'Add item' }))
    const dialog = screen.getByRole('dialog')
    await user.click(within(dialog).getByRole('tab', { name: 'Your own' }))
    await user.click(within(dialog).getByRole('button', { name: 'Add to board' }))
    expect(within(dialog).getByText('Give the item a name.')).toBeInTheDocument()
    expect(checklist.createCustom).not.toHaveBeenCalled()
  })

  it('edits a target and shows the item stats', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(await screen.findByRole('button', { name: 'More for Workout' }))
    await user.click(screen.getByRole('menuitem', { name: 'Edit…' }))
    const dialog = screen.getByRole('dialog', { name: 'Workout' })
    expect(within(dialog).getByText('80%')).toBeInTheDocument()
    await user.type(within(dialog).getByRole('textbox', { name: /Target per day/ }), '5')
    await expectNoAxeViolations(dialog)
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))
    expect(checklist.setTarget).toHaveBeenCalledWith(2, 5)
    expect(checklist.setDays).not.toHaveBeenCalled()
  })
})

describe('ChecklistQuickCard', () => {
  function renderCard(data: ChecklistStatus) {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    return render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <ChecklistQuickCard data={data} />
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  it('lists the next open items with one action each, outside any link', async () => {
    const user = userEvent.setup()
    const { container } = renderCard(status())
    expect(screen.getByRole('heading', { name: '0 of 3 done today' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open checklist' })).toHaveAttribute('href', '/checklist')
    const items = within(screen.getByRole('list', { name: 'Open items' })).getAllByRole('listitem')
    expect(items).toHaveLength(3)
    await expectNoAxeViolations(container)

    await user.click(screen.getByRole('button', { name: 'Mark Stretch done' }))
    expect(checklist.tick).toHaveBeenCalledWith('custom-1', 'daily', undefined)
    await user.click(screen.getByRole('button', { name: 'Log Frieren' }))
    expect(checklist.logMedia).toHaveBeenCalledWith('anime-episode', 'daily', 7, undefined)
  })

  it('invites setup on an empty board', () => {
    renderCard({ ...status(), daily: [], weekly: [], summary: { done: 0, due: 0 } })
    expect(screen.getByRole('heading', { name: 'Checklist' })).toBeInTheDocument()
    expect(screen.getByText(/Set up the things/)).toBeInTheDocument()
  })
})
