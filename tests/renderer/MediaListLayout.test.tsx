import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import MediaListPage from '../../src/renderer/src/pages/MediaListPage'
import { ANIME } from '../../src/renderer/src/lib/mediaConfig'
import { expectNoAxeViolations } from './accessibility'

const { listPage, logProgress } = vi.hoisted(() => ({ listPage: vi.fn(), logProgress: vi.fn() }))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    tags: { list: async () => [] },
    settings: { all: async () => ({}) },
    media: {
      facets: async () => ({ total: 2 }),
      statusCounts: async () => ({ Watching: 1, Completed: 1 }),
      listPage: (...args: unknown[]) => listPage(...args),
      logProgress: (...args: unknown[]) => logProgress(...args)
    }
  }
}))

const row = (id: number, title: string, status: string, progress: number) => ({
  id, mediaType: 'anime', title, titleOriginal: null, synopsis: null, coverPath: null,
  releaseDate: '2004-10-05', totalUnits: 366, status, score: 8, progress, rewatchCount: 0,
  favorite: false, metadata: null, createdAt: '', updatedAt: ''
})

function mount() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <MediaListPage cfg={ANIME} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
  listPage.mockResolvedValue({
    items: [row(1, 'Bleach', ANIME.defaultStatuses[0], 142), row(2, 'Perfect Blue', ANIME.defaultStatuses[1], 366)],
    total: 2, offset: 0, hasMore: false
  })
  logProgress.mockResolvedValue({ title: 'Bleach', status: 'Watching', startedRewatch: false, rewatchCount: 0 })
})

it('remembers the list layout per library and logs progress from a row', async () => {
  const user = userEvent.setup()
  const { container, unmount } = mount()
  await user.click(await screen.findByRole('button', { name: 'list' }))
  const table = await screen.findByRole('table', { name: 'Anime' })
  const bleach = within(table).getByRole('row', { name: /Bleach/ })
  // A finished title offers no +1; starting a new pass stays on its page.
  expect(within(table).getByRole('row', { name: /Perfect Blue/ })).not.toHaveTextContent('+1')
  await user.click(within(bleach).getByRole('button', { name: 'Log one more episode of Bleach' }))
  expect(logProgress).toHaveBeenCalledWith(1)
  await expectNoAxeViolations(container)

  unmount()
  mount()
  expect(await screen.findByRole('table', { name: 'Anime' })).toBeInTheDocument()
  await waitFor(() => expect(screen.getByRole('button', { name: 'list' })).toHaveAttribute('aria-pressed', 'true'))
})
