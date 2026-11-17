import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import LessonCheck from '../../src/renderer/src/components/japanese/LessonCheck'
import JapaneseReviewPage from '../../src/renderer/src/pages/JapaneseReviewPage'
import { expectNoAxeViolations } from './accessibility'

// The fast lane: a lesson's Test out and the review page's "I know this".

const item = (id: number, front: string, back: string) => ({ id, front, reading: null, back })
const ITEMS = [
  item(1, '猫がいます。', 'There is a cat.'),
  item(2, '犬がいます。', 'There is a dog.'),
  item(3, '鳥がいます。', 'There is a bird.'),
  item(4, '馬がいます。', 'There is a horse.')
]
const DISTRACTORS = [item(9, '魚がいます。', 'There is a fish.'), item(10, '牛がいます。', 'There is a cow.')]

const reviewCard = {
  id: 7, lessonId: 2, sortOrder: 0, front: '今日', reading: 'きょう', back: 'today', pos: 'noun',
  notes: null, exampleJp: null, exampleReading: null, exampleEn: null, onyomi: null, kunyomi: null,
  sourceMediaId: null, audioPath: null, imagePath: null, sourceTitle: null, sourceMediaType: null,
  sourceCoverPath: null, status: 'new', learningStep: 0, dueAt: null, intervalDays: 0, ease: 2.5,
  reps: 0, lapses: 0, lastReviewedAt: null, stability: null, difficulty: null,
  lessonKind: 'vocab', lessonTitle: 'Time', direction: 'recognition'
}

const markCardKnown = vi.hoisted(() => vi.fn(async () => ({ marked: 1 })))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    japanese: {
      lessonQuizPool: async () => ({ items: ITEMS, distractors: DISTRACTORS }),
      stats: async () => ({
        dueCount: 0, newAvailableCount: 2, newDirectionCount: 0, learnedLessons: 1, totalLessons: 2,
        totalCards: 2, reviewsToday: 0, introducedToday: 0
      }),
      reviewQueue: async () => ({ due: [], fresh: [reviewCard, { ...reviewCard, id: 8, front: '明日', reading: 'あした', back: 'tomorrow' }] }),
      ghostQueue: async () => [],
      markCardKnown,
      submitReview: vi.fn()
    }
  }
}))

beforeEach(() => {
  markCardKnown.mockClear()
})

function wrap(node: JSX.Element) {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>{node}</MemoryRouter>
    </QueryClientProvider>
  )
}

async function answerAll(correctly: boolean): Promise<void> {
  for (let i = 0; i < ITEMS.length; i++) {
    const card = ITEMS.find((c) => screen.queryByText(c.front))!
    const options = screen.getAllByRole('button').filter((b) => /There is/.test(b.textContent ?? ''))
    const pick = options.find((b) => (b.textContent ?? '').includes(card.back) === correctly)!
    await userEvent.click(pick)
    await userEvent.click(screen.getByRole('button', { name: /Next|Finish/ }))
  }
}

it('tests out a whole lesson and, at 90% or better, offers to mark it known', async () => {
  const onMarkKnown = vi.fn(async () => {})
  const { container } = wrap(
    <LessonCheck lessonId={2} kind="grammar" learned={false} cardCount={4} onMarkLearned={async () => {}} onMarkKnown={onMarkKnown} />
  )
  await userEvent.click(screen.getByRole('button', { name: 'Test out' }))
  // Every card is asked, not the usual sample.
  expect(await screen.findByText('Test out · 1 / 4')).toBeInTheDocument()
  await answerAll(true)
  expect(screen.getByText(/Tested out/)).toBeInTheDocument()
  await expectNoAxeViolations(container)
  await userEvent.click(screen.getByRole('button', { name: 'Mark all as known' }))
  expect(onMarkKnown).toHaveBeenCalledTimes(1)
})

it('does not offer Mark all as known below the pass mark', async () => {
  wrap(
    <LessonCheck lessonId={2} kind="grammar" learned={false} cardCount={4} onMarkLearned={async () => {}} onMarkKnown={async () => {}} />
  )
  await userEvent.click(screen.getByRole('button', { name: 'Test out' }))
  await screen.findByText('Test out · 1 / 4')
  await answerAll(false)
  expect(screen.getByText(/Below 90%/)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Mark all as known' })).not.toBeInTheDocument()
})

it('lets a new card be marked known from the review, by button or K, and moves on', async () => {
  const { container } = wrap(<JapaneseReviewPage />)
  await userEvent.click(await screen.findByRole('button', { name: 'Start review' }))
  expect(await screen.findByText('今日')).toBeInTheDocument()
  await expectNoAxeViolations(container)
  await userEvent.click(screen.getByRole('button', { name: 'I know this' }))
  expect(markCardKnown).toHaveBeenCalledWith(7)
  expect(await screen.findByText('明日')).toBeInTheDocument()
  await userEvent.keyboard('k')
  expect(markCardKnown).toHaveBeenLastCalledWith(8)
  const summary = await screen.findByText('Review complete')
  expect(within(summary.closest('section') ?? document.body).getByText('Marked known')).toBeInTheDocument()
})
