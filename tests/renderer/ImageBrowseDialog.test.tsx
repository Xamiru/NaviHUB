import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ImageBrowseDialog from '@/components/ImageBrowseDialog'
import { api } from '@/lib/api'
import type { MediaDetail } from '@shared/types'

vi.mock('@/lib/api', () => ({
  api: {
    pictures: { sources: vi.fn(), search: vi.fn(), list: vi.fn(), addFromSearch: vi.fn() }
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
    await waitFor(() => expect(api.pictures.search).toHaveBeenCalledWith(7, 'wallhaven', 'Lain', 1))
  })

  it('waits for Load before querying a fixed source', async () => {
    const user = userEvent.setup()
    vi.mocked(api.pictures.sources).mockResolvedValue([
      { source: 'anilist', label: 'AniList', query: null, needsKey: null }
    ])
    renderBrowse()

    await user.click(await screen.findByRole('button', { name: 'Load AniList' }))
    await waitFor(() => expect(api.pictures.search).toHaveBeenCalledWith(7, 'anilist', '', 1))
  })
})
