import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import VideoEpisodesSection from '../../src/renderer/src/components/VideoEpisodesSection'
import type { MediaDetail, VideoFile, VideoLibrary } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const { files, attachFile, attachFolder } = vi.hoisted(() => ({
  files: vi.fn(async (): Promise<VideoLibrary> => ({ localDir: null, linkKind: null, files: [] })),
  attachFile: vi.fn(async () => ({ ok: true, fileCount: 1 })),
  attachFolder: vi.fn(async () => ({ ok: true, fileCount: 1 }))
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    video: { files, attachFile, attachFolder },
    episodeFavorites: { list: async () => [], set: async () => {} }
  }
}))

function renderSection(m: Partial<MediaDetail>): ReturnType<typeof render> {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <VideoEpisodesSection m={{ id: 7, mediaType: 'anime', totalUnits: 12, ...m } as MediaDetail} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

const row = (id: number, season: number | null, number: number, title: string): VideoFile =>
  ({ id, season, number, title, filePath: `Show/${id}.mkv`, watchedAt: null, resumeSeconds: null, duration: null }) as VideoFile

describe('Linking local video', () => {
  beforeEach(() => vi.clearAllMocks())

  it('offers a single file for a movie and links it', async () => {
    const user = userEvent.setup()
    const { container } = renderSection({ mediaType: 'movie', totalUnits: null })
    await user.click(await screen.findByRole('button', { name: 'Link video file' }))
    expect(attachFile).toHaveBeenCalledWith(7)
    expect(screen.getByRole('button', { name: 'Link video folder' })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('offers a single file for a one-episode anime, and only a folder for a series', async () => {
    const { unmount } = renderSection({ totalUnits: 1 })
    expect(await screen.findByRole('button', { name: 'Link video file' })).toBeInTheDocument()
    unmount()
    renderSection({ totalUnits: 12 })
    expect(await screen.findByRole('button', { name: 'Link video folder' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Link video file' })).not.toBeInTheDocument()
  })

  it('shows a linked file as one video with a plain Play', async () => {
    files.mockResolvedValueOnce({
      localDir: 'Heat/Heat.mkv',
      linkKind: 'file',
      files: [row(1, null, 0, 'Heat')]
    })
    renderSection({ mediaType: 'movie', totalUnits: null })
    expect(await screen.findByRole('link', { name: 'Play' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Video' })).toBeInTheDocument()
  })

  it('heads each season when a folder spans several, with specials last', async () => {
    files.mockResolvedValueOnce({
      localDir: 'Show',
      linkKind: 'folder',
      files: [row(1, 1, 1, 'S1 · Episode 01'), row(2, 2, 1, 'S2 · Episode 01'), row(3, 0, 1, 'Special 01')]
    })
    renderSection({ mediaType: 'tv', totalUnits: 20 })
    expect(await screen.findByRole('heading', { name: 'Season 1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Season 2' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Specials' })).toBeInTheDocument()
  })
})
