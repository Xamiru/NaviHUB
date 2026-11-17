import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ShuffleMixDialog from '../../src/renderer/src/components/video/ShuffleMixDialog'
import { videoQueue } from '../../src/renderer/src/lib/videoQueue'
import { expectNoAxeViolations } from './accessibility'

const { linked, files } = vi.hoisted(() => ({
  linked: vi.fn(async (type: string) =>
    type === 'tv'
      ? [
          { mediaId: 1, title: 'Seinfeld', fileCount: 3 },
          { mediaId: 2, title: 'Friends', fileCount: 2 },
          { mediaId: 3, title: 'A one-off', fileCount: 1 }
        ]
      : [{ mediaId: 4, title: 'Nichijou', fileCount: 2 }]
  ),
  files: vi.fn(async (id: number) => ({
    localDir: 'x',
    files: [
      { id: id * 10 + 1, title: `${id} E1`, season: 1 },
      { id: id * 10 + 2, title: `${id} E2`, season: 1 },
      { id: id * 10 + 9, title: `${id} OVA`, season: 0 }
    ]
  }))
}))

vi.mock('../../src/renderer/src/lib/api', () => ({ api: { video: { linked, files } } }))

function renderDialog(onClose = vi.fn()) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const result = render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/tv/linked']}>
        <Routes>
          <Route path="/tv/linked" element={<ShuffleMixDialog onClose={onClose} />} />
          <Route path="/watch/file/:id" element={<p>Player</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
  return { ...result, onClose }
}

describe('Shuffle mix dialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    videoQueue.resetForTests()
  })

  it('lists multi-file linked TV and anime titles, reads files only on Start', async () => {
    const user = userEvent.setup()
    const { container, onClose } = renderDialog()
    const tv = await screen.findByRole('group', { name: 'TV shows' })
    expect(within(tv).getAllByRole('checkbox').map((c) => c.closest('label')?.textContent)).toEqual([
      'Friends2 files',
      'Seinfeld3 files'
    ])
    expect(screen.getByRole('group', { name: 'Anime' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Shuffle' })).toBeDisabled()
    expect(files).not.toHaveBeenCalled()
    await expectNoAxeViolations(container)

    await user.click(screen.getByRole('checkbox', { name: /Seinfeld/ }))
    await user.click(screen.getByRole('checkbox', { name: /Nichijou/ }))
    await user.click(screen.getByRole('button', { name: 'Shuffle 2 shows' }))

    expect(files.mock.calls.map(([id]) => id).sort()).toEqual([1, 4])
    expect(await screen.findByText('Player')).toBeInTheDocument()
    expect(onClose).toHaveBeenCalled()
    const q = videoQueue.get()!
    expect(q.shows.map((s) => s.title).sort()).toEqual(['Nichijou', 'Seinfeld'])
    // Specials stay out by default.
    expect(q.shows.flatMap((s) => s.files.map((f) => f.title)).some((t) => t.includes('OVA'))).toBe(false)
  })

  it('filters by title and can include specials', async () => {
    const user = userEvent.setup()
    renderDialog()
    await screen.findByRole('group', { name: 'TV shows' })
    await user.type(screen.getByRole('searchbox', { name: 'Filter shows' }), 'fri')
    expect(screen.getAllByRole('checkbox', { name: /Friends|Seinfeld|Nichijou/ })).toHaveLength(1)
    await user.click(screen.getByRole('checkbox', { name: /Friends/ }))
    await user.click(screen.getByRole('checkbox', { name: 'Include specials' }))
    await user.click(screen.getByRole('button', { name: 'Shuffle' }))
    await screen.findByText('Player')
    expect(videoQueue.get()!.shows[0].files).toHaveLength(3)
  })
})
