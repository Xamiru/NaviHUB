import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FavoriteEpisodesSection from '../../src/renderer/src/components/FavoriteEpisodesSection'
import { episodeNumberHeartable } from '../../src/renderer/src/components/VideoEpisodesSection'
import type { MediaDetail } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const { stored, list, set, files } = vi.hoisted(() => {
  const stored = new Set<number>()
  return {
    stored,
    files: vi.fn(async () => ({ localDir: null as string | null, files: [] as { number: number }[] })),
    list: vi.fn(async () => [...stored].sort((a, b) => a - b)),
    set: vi.fn(async (_mediaId: number, n: number, on: boolean) => {
      if (on) stored.add(n)
      else stored.delete(n)
    })
  }
})

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { episodeFavorites: { list, set }, video: { files } }
}))

function renderSection(m: Partial<MediaDetail>): ReturnType<typeof render> {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <FavoriteEpisodesSection m={{ id: 4, progress: 0, totalUnits: null, ...m } as MediaDetail} />
    </QueryClientProvider>
  )
}

describe('Favorite episodes on an anime Episodes tab', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    stored.clear()
  })

  it('hearts and un-hearts an episode without a linked folder', async () => {
    const user = userEvent.setup()
    const { container } = renderSection({ totalUnits: 12 })
    const grid = await screen.findByRole('list', { name: 'Episodes' })
    expect(within(grid).getAllByRole('listitem')).toHaveLength(12)

    await user.click(screen.getByRole('button', { name: 'Add episode 5 to favorites' }))
    const remove = await screen.findByRole('button', { name: 'Remove episode 5 from favorites' })
    expect(remove).toHaveAttribute('aria-pressed', 'true')
    expect(set).toHaveBeenCalledWith(4, 5, true)
    expect(screen.getByText('Episode 5')).toBeInTheDocument()
    await expectNoAxeViolations(container)

    await user.click(remove)
    expect(
      await screen.findByRole('button', { name: 'Add episode 5 to favorites' })
    ).toHaveAttribute('aria-pressed', 'false')
    expect(set).toHaveBeenLastCalledWith(4, 5, false)
  })

  it('without a known total, offers the logged episodes and keeps a later favorite', async () => {
    stored.add(9)
    renderSection({ totalUnits: null, progress: 3 })
    expect(
      await screen.findByRole('button', { name: 'Remove episode 9 from favorites' })
    ).toBeInTheDocument()
    expect(within(screen.getByRole('list', { name: 'Episodes' })).getAllByRole('listitem')).toHaveLength(9)
  })

  it('a quick double-click undoes the first click instead of repeating it', async () => {
    const user = userEvent.setup()
    renderSection({ totalUnits: 3 })
    const heart = await screen.findByRole('button', { name: 'Add episode 2 to favorites' })
    await user.dblClick(heart)
    expect(set.mock.calls).toEqual([
      [4, 2, true],
      [4, 2, false]
    ])
    expect(
      await screen.findByRole('button', { name: 'Add episode 2 to favorites' })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('a refetch sent before a later click does not overwrite that click', async () => {
    const user = userEvent.setup()
    renderSection({ totalUnits: 6 })
    const add = await screen.findByRole('button', { name: 'Add episode 5 to favorites' })
    // The first click's refetch stays in flight, holding the list as [5].
    let release: (rows: number[]) => void = () => {}
    list.mockImplementationOnce(() => new Promise<number[]>((resolve) => (release = resolve)))
    await user.click(add)
    await waitFor(() => expect(list).toHaveBeenCalledTimes(2))
    // The second click's save is slow; the stale list arrives while it waits.
    let saved: () => void = () => {}
    set.mockImplementationOnce(
      (_mediaId: number, n: number) =>
        new Promise<void>((resolve) => {
          saved = () => {
            stored.delete(n)
            resolve()
          }
        })
    )
    await user.click(screen.getByRole('button', { name: 'Remove episode 5 from favorites' }))
    release([5])
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(screen.getByRole('button', { name: 'Add episode 5 to favorites' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    saved()
    await waitFor(() => expect(list).toHaveBeenCalledTimes(3))
    expect(
      await screen.findByRole('button', { name: 'Add episode 5 to favorites' })
    ).toHaveAttribute('aria-pressed', 'false')
    expect(set).toHaveBeenLastCalledWith(4, 5, false)
  })

  it('treats a stored total of 0 as unknown and reaches the last linked file', async () => {
    files.mockResolvedValueOnce({ localDir: 'Show', files: [{ number: 6 }] })
    renderSection({ totalUnits: 0, progress: 2 })
    expect(
      await screen.findByRole('button', { name: 'Add episode 6 to favorites' })
    ).toBeInTheDocument()
    expect(within(screen.getByRole('list', { name: 'Episodes' })).getAllByRole('listitem')).toHaveLength(6)
  })

  it('caps the grid on a bogus count but still shows a favorite past the cap', async () => {
    stored.add(90000)
    const { container } = renderSection({ totalUnits: 5, progress: 80000 })
    // Role queries over three thousand rows are slow; read the DOM directly.
    await waitFor(() =>
      expect(container.querySelectorAll('ul[aria-label="Episodes"] > li')).toHaveLength(3001)
    )
    expect(
      container.querySelector('button[aria-label="Remove episode 90000 from favorites"]')
    ).not.toBeNull()
    expect(container.querySelector('button[aria-label="Add episode 3001 to favorites"]')).toBeNull()
  })

  it('says so when there is nothing to number yet', async () => {
    renderSection({ totalUnits: null, progress: 0 })
    expect(await screen.findByText(/The episode count is unknown/)).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})

describe('Which linked files heart an episode', () => {
  const file = (number: number | null, season: number | null = null) => ({ number, season })
  const heartable = (files: ReturnType<typeof file>[], total: number | null, n: number) =>
    episodeNumberHeartable(files, total)(n)

  it('takes one season numbered within the entry', () => {
    const files = [file(1), file(2), file(12)]
    expect([1, 2, 12].map((n) => heartable(files, 12, n))).toEqual([true, true, true])
  })

  it('refuses several seasons, whose numbers collide', () => {
    expect(heartable([file(5, 1), file(5, 2)], 24, 5)).toBe(false)
  })

  it('does not count specials as a second season, and never hearts one', () => {
    const files = [file(1, null), file(2, null), file(1, 0)]
    expect(heartable(files, 12, 2)).toBe(true)
  })

  it('refuses a second cour numbered on from the first', () => {
    expect(heartable([file(13), file(24)], 12, 13)).toBe(false)
  })

  it('leaves out only the file past the total, such as an OVA', () => {
    const files = [file(1), file(12), file(13)]
    expect([1, 12, 13].map((n) => heartable(files, 12, n))).toEqual([true, true, false])
  })

  it('follows the files when the total is unknown, never a fraction', () => {
    expect(heartable([file(13), file(24)], null, 24)).toBe(true)
    expect(heartable([file(13), file(null)], 0, 13)).toBe(true)
    expect(heartable([file(6.5)], null, 6.5)).toBe(false)
  })
})
