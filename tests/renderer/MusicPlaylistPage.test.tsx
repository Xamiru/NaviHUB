import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, expect, it, vi } from 'vitest'
import type { MusicPlaylistDetail, MusicDownloadEvent } from '@shared/types'
import { api } from '@/lib/api'
import MusicPlaylistPage from '@/pages/MusicPlaylistPage'
import { qk } from '@/lib/queryKeys'

vi.mock('@/lib/api', () => ({ api: { music: {
  playlist: vi.fn(),
  spotifyDownloadQueue: vi.fn(async () => ({ pending: [], completed: [] })),
  spotifyQueueAddPlaylist: vi.fn(),
  spotifyQueueStart: vi.fn(async () => ({ id: 'run' }))
} } }))
vi.mock('@/lib/player', () => ({ usePlayerControls: () => ({}) }))
let downloadStatus: MusicDownloadEvent | null = null
vi.mock('@/components/MusicDownloadDialog', () => ({ useDownloadStatus: () => downloadStatus }))

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
  expect(screen.getByText('Song 205')).toBeInTheDocument()
  await act(async () => {
    client.setQueryData(qk.music.playlist(1), { ...playlist, items: playlist.items.map((item, i) => i === 0 ? { ...item, downloadError: 'Needs review' } : item) })
  })
  expect(screen.getByText('Song 205')).toBeInTheDocument()
// This mounts hundreds of real rows alongside the other jsdom test workers.
}, 30000)

it('offers a retry instead of "not found" when the playlist read fails', async () => {
  vi.mocked(api.music.playlist).mockRejectedValueOnce(new Error('SQLITE_BUSY')).mockResolvedValueOnce({
    id: 1, title: 'Recovered playlist', description: null, createdAt: '', updatedAt: '',
    source: null, playableCount: 0, missingCount: 0, verificationCount: 0, items: []
  })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const user = userEvent.setup()
  render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/music/playlists/1']}>
    <Routes><Route path="/music/playlists/:id" element={<MusicPlaylistPage />} /></Routes>
  </MemoryRouter></QueryClientProvider>)
  await user.click(await screen.findByRole('button', { name: 'Retry playlist' }))
  expect(screen.queryByText('Playlist not found.')).not.toBeInTheDocument()
  expect(await screen.findByText('Recovered playlist')).toBeInTheDocument()
})

it('starts only the pressed song and marks only that song as coming soon', async () => {
  const song = (itemId: number) => ({
    kind: 'spotify' as const, itemId, position: itemId, spotifyTrackId: String(itemId),
    title: `Song ${itemId}`, artists: ['Artist'], primaryArtist: 'Artist',
    albumArtist: 'Artist', albumTitle: 'Album', duration: 200, coverPath: null,
    spotifyUrl: '', trackNo: null, discNo: null, year: null, audioSourceUrl: null,
    allowUnverified: false, downloadError: null, downloadCandidate: null,
    matchedTrack: null, localAlternatives: []
  })
  vi.mocked(api.music.playlist).mockResolvedValue({
    id: 1, title: 'Playlist', description: null, createdAt: '', updatedAt: '',
    source: { spotifyId: 'source', sourceUrl: 'https://open.spotify.com/playlist/source', importedAt: '' },
    playableCount: 0, missingCount: 2, verificationCount: 0, items: [song(1), song(2)]
  })
  vi.mocked(api.music.spotifyQueueAddPlaylist).mockResolvedValue({ jobId: 7, addedSelections: 1, missingCount: 1 })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const user = userEvent.setup()
  const view = render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/music/playlists/1']}>
    <Routes><Route path="/music/playlists/:id" element={<MusicPlaylistPage />} /></Routes>
  </MemoryRouter></QueryClientProvider>)
  await screen.findByText('Song 2')
  await user.click(screen.getAllByRole('button', { name: 'Download' })[1])
  expect(api.music.spotifyQueueStart).toHaveBeenCalledWith({ jobId: 7, itemIds: [2], prioritize: true })

  const card = { id: 7, sourceKind: 'playlist', playlistId: 1, selections: [1, 2].map((sourceId) => ({ kind: 'playlistItem', sourceId })) }
  vi.mocked(api.music.spotifyDownloadQueue).mockResolvedValue({ pending: [card], completed: [] } as never)
  downloadStatus = { id: 'run', status: 'downloading', source: 'spotifyQueue', queueCardId: 7, queueItemIds: [2] } as MusicDownloadEvent
  await act(async () => { await client.invalidateQueries() })
  view.rerender(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/music/playlists/1']}>
    <Routes><Route path="/music/playlists/:id" element={<MusicPlaylistPage />} /></Routes>
  </MemoryRouter></QueryClientProvider>)
  expect(await screen.findAllByText('Downloading soon')).toHaveLength(1)
  downloadStatus = null
})
