import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, expect, it, vi } from 'vitest'
import type { MusicPlaylistDetail } from '@shared/types'
import { api } from '@/lib/api'
import MusicPlaylistPage from '@/pages/MusicPlaylistPage'

vi.mock('@/lib/api', () => ({ api: { music: {
  playlist: vi.fn(),
  spotifyDownloadQueue: async () => ({ pending: [], completed: [] })
} } }))
vi.mock('@/lib/player', () => ({ usePlayerControls: () => ({}) }))
vi.mock('@/components/MusicDownloadDialog', () => ({ useDownloadStatus: () => null }))

afterEach(() => vi.unstubAllGlobals())

it('reaches every batch of a large Spotify playlist and retains it across unrelated renders', async () => {
  const observers = new Set<IntersectionObserverCallback>()
  vi.stubGlobal('IntersectionObserver', class {
    constructor(private callback: IntersectionObserverCallback) {}
    observe() { observers.add(this.callback) }
    disconnect() { observers.delete(this.callback) }
  })
  const playlist: MusicPlaylistDetail = {
    id: 1, title: 'Large playlist', description: null, createdAt: '', updatedAt: '',
    source: { spotifyId: 'source', sourceUrl: 'https://open.spotify.com/playlist/source', importedAt: '' },
    playableCount: 0, missingCount: 205, verificationCount: 0,
    items: Array.from({ length: 205 }, (_, index) => ({
      kind: 'spotify', itemId: index + 1, position: index, spotifyTrackId: String(index),
      title: `Song ${index + 1}`, artists: ['Artist'], primaryArtist: 'Artist',
      albumArtist: 'Artist', albumTitle: 'Album', duration: 200, coverPath: null,
      spotifyUrl: '', trackNo: null, discNo: null, year: null, audioSourceUrl: null,
      allowUnverified: false, downloadError: null, downloadCandidate: null,
      matchedTrack: null, localAlternatives: []
    }))
  }
  vi.mocked(api.music.playlist).mockResolvedValue(playlist)
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const user = userEvent.setup()
  render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/music/playlists/1']}>
    <Routes><Route path="/music/playlists/:id" element={<MusicPlaylistPage />} /></Routes>
  </MemoryRouter></QueryClientProvider>)
  await screen.findByText('Song 96')
  expect(screen.queryByText('Song 97')).not.toBeInTheDocument()
  const reachBottom = () => act(() => {
    for (const callback of [...observers]) {
      callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    }
  })
  reachBottom()
  expect(screen.getByText('Song 192')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Rename' }))
  expect(screen.getByText('Song 192')).toBeInTheDocument()
  reachBottom()
  expect(screen.getByText('Song 205')).toBeInTheDocument()
  await user.click(screen.getByRole('textbox', { name: 'Search this playlist' }))
  await user.paste('Song 205')
  expect(screen.getByText('Song 205')).toBeInTheDocument()
  expect(screen.queryByText('Song 1')).not.toBeInTheDocument()
  await user.clear(screen.getByRole('textbox', { name: 'Search this playlist' }))
  expect(screen.getByText('Song 96')).toBeInTheDocument()
  expect(screen.queryByText('Song 97')).not.toBeInTheDocument()
// This mounts hundreds of real rows alongside the other jsdom test workers.
}, 30000)
