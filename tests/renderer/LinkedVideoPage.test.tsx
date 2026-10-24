import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LinkedVideoPage from '../../src/renderer/src/pages/LinkedVideoPage'
import { ANIME, TV, type MediaConfig } from '../../src/renderer/src/lib/mediaConfig'
import type { LinkedVideoTitle } from '../../src/shared/types'

const { linked } = vi.hoisted(() => ({ linked: vi.fn() }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { video: { linked: (type: string) => linked(type) } }
}))

vi.mock('../../src/renderer/src/components/CoverImage', () => ({
  default: ({ alt }: { alt: string }) => <div role="img" aria-label={alt} />
}))

function title(over: Partial<LinkedVideoTitle>): LinkedVideoTitle {
  return {
    mediaId: 1,
    title: 'Frieren',
    mediaType: 'anime',
    coverPath: null,
    status: null,
    localDir: 'Frieren',
    linkKind: 'folder',
    fileCount: 12,
    watchedCount: 4,
    nextFile: { id: 50, title: 'Episode 5', resumeSeconds: 120 },
    lastActivityAt: '2026-10-20 20:00:00',
    linkedAt: '2026-10-01 10:00:00',
    ...over
  }
}

const titles: LinkedVideoTitle[] = [
  title({}),
  title({
    mediaId: 2, title: 'Akira', fileCount: 1, watchedCount: 1, localDir: 'Akira.mkv',
    linkKind: 'file', nextFile: { id: 60, title: 'Akira', resumeSeconds: null },
    lastActivityAt: '2026-10-22 20:00:00'
  }),
  title({
    mediaId: 3, title: 'Mushishi', watchedCount: 0, lastActivityAt: null,
    nextFile: { id: 70, title: 'Episode 1', resumeSeconds: null }
  })
]

function renderPage(cfg: MediaConfig = ANIME) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`${cfg.basePath}/linked`]}>
        <LinkedVideoPage cfg={cfg} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

function grid(): HTMLElement {
  return screen.getByRole('heading', { name: 'All linked anime' }).closest('section')!
}

describe('Linked videos page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    linked.mockResolvedValue(titles)
  })

  it('asks for the page type and puts unfinished, watched titles under Continue watching', async () => {
    renderPage()
    const continuing = (await screen.findByRole('heading', { name: 'Continue watching' })).closest('section')!
    expect(linked).toHaveBeenCalledWith('anime')
    expect(within(continuing).getByRole('link', { name: 'Resume Frieren: Episode 5' }))
      .toHaveAttribute('href', '/watch/file/50')
    // Finished and never-started titles stay out of the shelf.
    expect(within(continuing).queryByText('Akira')).toBeNull()
    expect(within(continuing).queryByText('Mushishi')).toBeNull()
  })

  it('lists every linked title by recent activity with its progress and play action', async () => {
    renderPage()
    await screen.findByRole('heading', { name: 'All linked anime' })
    const names = within(grid()).getAllByRole('link', { name: /^View .* details$/ })
      .map((link) => link.getAttribute('aria-label'))
    expect(names).toEqual(['View Akira details', 'View Frieren details', 'View Mushishi details'])
    expect(within(grid()).getByText('4 / 12 watched')).toBeInTheDocument()
    expect(within(grid()).getByText('Watched')).toBeInTheDocument()
    expect(within(grid()).getByRole('link', { name: 'Watch again Akira' }))
      .toHaveAttribute('href', '/watch/file/60')
    expect(within(grid()).getByRole('link', { name: 'Play Mushishi: Episode 1' }))
      .toHaveAttribute('href', '/watch/file/70')
  })

  it('searches, filters and sorts the collection', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: 'All linked anime' })

    await user.selectOptions(screen.getByRole('combobox', { name: 'Show linked anime' }), 'watched')
    expect(within(grid()).getByText('1 title')).toBeInTheDocument()
    await user.selectOptions(screen.getByRole('combobox', { name: 'Show linked anime' }), 'all')

    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort linked anime' }), 'left')
    const names = within(grid()).getAllByRole('link', { name: /^View .* details$/ })
      .map((link) => link.getAttribute('aria-label'))
    expect(names).toEqual(['View Mushishi details', 'View Frieren details', 'View Akira details'])

    await user.type(screen.getByRole('searchbox', { name: 'Search linked anime' }), 'mushi')
    expect(await within(grid()).findByText('1 title')).toBeInTheDocument()
    expect(within(grid()).getByRole('link', { name: 'View Mushishi details' })).toBeInTheDocument()
  })

  it('points at the Episodes tab when nothing is linked, and keeps a failed read an error', async () => {
    linked.mockResolvedValueOnce([])
    const { unmount } = renderPage()
    expect(await screen.findByText('Nothing linked yet')).toBeInTheDocument()
    expect(screen.getByText(/go to its Episodes tab/)).toBeInTheDocument()
    unmount()

    linked.mockRejectedValueOnce(new Error('boom'))
    renderPage()
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load linked anime.')
  })

  it('switches between linked movies and TV with route tabs', async () => {
    linked.mockResolvedValue([title({ mediaId: 9, title: 'Twin Peaks', mediaType: 'tv' })])
    renderPage(TV)
    expect(await screen.findByRole('heading', { name: 'All linked TV shows' })).toBeInTheDocument()
    expect(linked).toHaveBeenCalledWith('tv')
    const nav = screen.getByRole('navigation', { name: 'Linked libraries' })
    expect(within(nav).getByRole('link', { name: 'Movies' })).toHaveAttribute('href', '/movies/linked')
    expect(within(nav).getByRole('link', { name: 'TV Shows' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: 'TV Shows' })).toHaveAttribute('href', '/tv/linked')
    expect(screen.getByRole('link', { name: 'View Twin Peaks details' })).toHaveAttribute('href', '/tv/9')
  })
})
