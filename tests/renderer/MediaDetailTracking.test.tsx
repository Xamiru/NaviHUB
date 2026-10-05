import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, expect, it, vi } from 'vitest'
import type { MediaDetail } from '@shared/types'
import { TrackingCard } from '../../src/renderer/src/pages/MediaDetailPage'
import { ANIME } from '../../src/renderer/src/lib/mediaConfig'
import { expectNoAxeViolations } from './accessibility'

const { update, settingsAll } = vi.hoisted(() => ({ update: vi.fn(), settingsAll: vi.fn() }))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    media: { update: (...args: unknown[]) => update(...args) },
    settings: { all: () => settingsAll() }
  }
}))

const bleach = {
  id: 7,
  mediaType: 'anime',
  title: 'Bleach',
  status: 'Watching',
  score: 8,
  progress: 142,
  totalUnits: 366,
  rewatchCount: 0
} as MediaDetail

function mount(scoreMax = 10) {
  settingsAll.mockResolvedValue({ 'score.max': String(scoreMax) })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <TrackingCard cfg={ANIME} m={bleach} />
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  update.mockResolvedValue(undefined)
})

it('edits status and score in place, filling progress when a title is completed', async () => {
  const user = userEvent.setup()
  const { container } = mount()
  const status = screen.getByRole('combobox', { name: 'Status' })
  await user.selectOptions(status, ANIME.defaultStatuses[1])
  expect(update).toHaveBeenLastCalledWith(7, { status: ANIME.defaultStatuses[1], progress: 366 })
  await user.selectOptions(status, '')
  expect(update).toHaveBeenLastCalledWith(7, { status: null })

  const stars = await screen.findAllByRole('button', { name: /^Score \d+ of 10$/ })
  expect(stars).toHaveLength(10)
  expect(screen.getByRole('button', { name: 'Score 8 of 10' })).toHaveAttribute('aria-pressed', 'true')
  await user.click(screen.getByRole('button', { name: 'Score 9 of 10' }))
  expect(update).toHaveBeenLastCalledWith(7, { score: 9 })
  // Clicking the active score clears it.
  await user.click(screen.getByRole('button', { name: 'Score 9 of 10' }))
  expect(update).toHaveBeenLastCalledWith(7, { score: null })
  await expectNoAxeViolations(container)
})

it('rolls back an optimistic status when the write fails', async () => {
  update.mockRejectedValueOnce(new Error('disk full'))
  const user = userEvent.setup()
  mount()
  const status = screen.getByRole('combobox', { name: 'Status' })
  await user.selectOptions(status, '')
  await waitFor(() => expect(status).toHaveValue('Watching'))
})

it('takes a number instead of stars on scales longer than ten', async () => {
  const user = userEvent.setup()
  mount(100)
  const input = await screen.findByRole('textbox', { name: 'Score out of 100' })
  await user.clear(input)
  await user.type(input, '87{Enter}')
  expect(update).toHaveBeenLastCalledWith(7, { score: 87 })
  expect(screen.queryByRole('button', { name: /^Score/ })).not.toBeInTheDocument()
})
