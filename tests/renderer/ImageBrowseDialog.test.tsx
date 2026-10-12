import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ImageBrowseDialog from '@/components/ImageBrowseDialog'
import { api } from '@/lib/api'
import type { MediaDetail, MediaImage } from '@shared/types'

vi.mock('@/lib/api', () => ({
  api: {
    pictures: { sources: vi.fn(), search: vi.fn(), list: vi.fn(), addFromSearch: vi.fn(), replace: vi.fn() }
  }
}))

const m = { id: 7, title: 'Serial Experiments Lain', characters: [] } as unknown as MediaDetail

function renderBrowse(): void {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <ImageBrowseDialog m={m} kind="wallpaper" onClose={vi.fn()} />
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.mocked(api.pictures.list).mockResolvedValue([])
  vi.mocked(api.pictures.search).mockResolvedValue({ results: [], page: 1, lastPage: 1 })
})
afterEach(() => vi.clearAllMocks())

describe('ImageBrowseDialog', () => {
  it('waits for Search before querying a searchable source', async () => {
    const user = userEvent.setup()
    vi.mocked(api.pictures.sources).mockResolvedValue([
      { source: 'wallhaven', label: 'Wallhaven', query: 'Lain', needsKey: null }
    ])
    renderBrowse()

    const box = await screen.findByRole('textbox', { name: 'Search Wallhaven' })
    expect((box as HTMLInputElement).value).toBe('Lain')
    expect(api.pictures.search).not.toHaveBeenCalled()
    expect(screen.queryByText('No results.')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Search' }))
    await waitFor(() => expect(api.pictures.search).toHaveBeenCalledWith(7, 'wallhaven', 'Lain', 1, null))
  })

  it('waits for Load before querying a fixed source', async () => {
    const user = userEvent.setup()
    vi.mocked(api.pictures.sources).mockResolvedValue([
      { source: 'anilist', label: 'AniList', query: null, needsKey: null }
    ])
    renderBrowse()

    await user.click(await screen.findByRole('button', { name: 'Load AniList' }))
    await waitFor(() => expect(api.pictures.search).toHaveBeenCalledWith(7, 'anilist', '', 1, null))
  })

  it('finds a larger version: Wallhaven floor, smaller results hidden, pick replaces', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    vi.mocked(api.pictures.sources).mockResolvedValue([
      { source: 'wallhaven', label: 'Wallhaven', query: 'Lain', needsKey: null }
    ])
    const result = (id: string, width: number, height: number) => ({
      source: 'wallhaven' as const,
      id,
      thumbUrl: `https://th/${id}.jpg`,
      fullUrl: `https://full/${id}.jpg`,
      width,
      height
    })
    vi.mocked(api.pictures.search).mockResolvedValue({
      results: [result('same', 1920, 1080), result('big', 3840, 2160)],
      page: 1,
      lastPage: 1
    })
    const current = { id: 4, mediaId: 7, kind: 'wallpaper', width: 1920, height: 1080 } as MediaImage
    vi.mocked(api.pictures.replace).mockResolvedValue({ ...current, width: 3840, height: 2160 })
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
      <QueryClientProvider client={client}>
        <ImageBrowseDialog m={m} kind="wallpaper" replace={current} onClose={onClose} />
      </QueryClientProvider>
    )

    expect(await screen.findByRole('heading', { name: /Find a larger version/ })).toBeInTheDocument()
    await user.click(await screen.findByRole('button', { name: 'Search' }))
    await waitFor(() =>
      expect(api.pictures.search).toHaveBeenCalledWith(7, 'wallhaven', 'Lain', 1, {
        width: 2560,
        height: 1440
      })
    )
    expect(await screen.findByText('1 smaller result hidden')).toBeInTheDocument()
    const picks = screen.getAllByRole('button', { name: /3840×2160/ })
    expect(picks).toHaveLength(1)
    expect(screen.queryByText('1920×1080')).toBeNull()
    await user.click(picks[0])
    await waitFor(() => expect(api.pictures.replace).toHaveBeenCalledWith(4, result('big', 3840, 2160)))
    expect(onClose).toHaveBeenCalled()
  })
})
