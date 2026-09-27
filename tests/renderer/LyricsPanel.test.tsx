import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import type { MusicLyrics } from '@shared/types'
import { api } from '@/lib/api'
import LyricsPanel from '@/components/music/LyricsPanel'

vi.mock('@/lib/api', () => ({ api: { music: { lyrics: vi.fn(), fetchLyrics: vi.fn() } } }))

const lyrics = (patch: Partial<MusicLyrics>): MusicLyrics =>
  ({ trackId: 7, state: 'unchecked', synced: null, plain: null, source: null, ...patch })

function mount(currentTime: number, onSeek = vi.fn()) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <LyricsPanel trackId={7} currentTime={currentTime} onSeek={onSeek} />
    </QueryClientProvider>
  )
  return onSeek
}

beforeEach(() => {
  vi.mocked(api.music.lyrics).mockReset()
  vi.mocked(api.music.fetchLyrics).mockReset()
})

it('looks lyrics up once on first open, follows playback, and seeks from a line', async () => {
  vi.mocked(api.music.lyrics).mockResolvedValue(lyrics({}))
  vi.mocked(api.music.fetchLyrics).mockResolvedValue(
    lyrics({ state: 'found', source: 'lrclib', synced: '[00:01.00]First line\n[00:05.00]Second line' })
  )
  const onSeek = mount(5.2)
  expect(await screen.findByRole('button', { name: 'Second line' })).toHaveAttribute('aria-current', 'true')
  expect(screen.getByRole('button', { name: 'First line' })).not.toHaveAttribute('aria-current')
  expect(api.music.fetchLyrics).toHaveBeenCalledTimes(1)
  expect(screen.getByText('From LRCLIB, saved for offline use')).toBeInTheDocument()
  await userEvent.setup().click(screen.getByRole('button', { name: 'First line' }))
  expect(onSeek).toHaveBeenCalledWith(1)
})

it('shows a stored miss without searching again until asked', async () => {
  vi.mocked(api.music.lyrics).mockResolvedValue(lyrics({ state: 'missing', source: 'lrclib' }))
  vi.mocked(api.music.fetchLyrics).mockResolvedValue(lyrics({ state: 'found', source: 'lrclib', plain: 'Found later' }))
  mount(0)
  expect(await screen.findByText('No lyrics found for this track.')).toBeInTheDocument()
  expect(api.music.fetchLyrics).not.toHaveBeenCalled()
  await userEvent.setup().click(screen.getByRole('button', { name: 'Search again' }))
  expect(await screen.findByText('Found later')).toBeInTheDocument()
})

it('keeps a failed lookup retryable instead of claiming there are no lyrics', async () => {
  vi.mocked(api.music.lyrics).mockResolvedValue(lyrics({}))
  vi.mocked(api.music.fetchLyrics).mockRejectedValueOnce(new Error('The lyrics service is unavailable right now'))
  mount(0)
  expect(await screen.findByRole('alert')).toHaveTextContent('unavailable right now')
  expect(screen.queryByText('No lyrics found for this track.')).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
})
