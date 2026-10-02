import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { beforeEach, expect, it, vi } from 'vitest'
import type { MusicPlaylistDetail, MusicTrack } from '@shared/types'
import { api } from '@/lib/api'
import { TrackList } from '@/components/music/MusicBrowse'
import MusicLikedPage from '@/pages/MusicLikedPage'
import MusicPlaylistPage from '@/pages/MusicPlaylistPage'
import { expectNoAxeViolations } from './accessibility'

const m = vi.hoisted(() => ({
  playQueue: vi.fn(),
  enqueue: vi.fn(),
  current: { value: null as { id: string } | null }
}))

vi.mock('@/lib/api', () => ({
  api: {
    music: {
      tracks: vi.fn(),
      playlist: vi.fn(),
      playlists: vi.fn(async () => []),
      playlistsForTrack: vi.fn(async () => []),
      removePlaylistTrack: vi.fn(async () => undefined),
      spotifyDownloadQueue: vi.fn(async () => ({ pending: [], completed: [] }))
    }
  }
}))
vi.mock('@/lib/player', () => ({
  usePlayerControls: () => ({
    track: m.current.value,
    queue: [{ id: 'music-99' }],
    playQueue: m.playQueue,
    enqueue: m.enqueue
  })
}))
vi.mock('@/components/MusicDownloadDialog', () => ({ useDownloadStatus: () => null }))

function track(id: number, title: string, extra: Partial<MusicTrack> = {}): MusicTrack {
  return {
    id,
    albumId: 1,
    albumTitle: 'Album',
    artistId: 1,
    artistName: 'Artist',
    tagArtist: null,
    filePath: `Artist/Album/${id}.mp3`,
    title,
    trackNo: id,
    discNo: 1,
    duration: 180,
    likedAt: '2026-01-01',
    playCount: 0,
    lastPlayedAt: null,
    coverPath: null,
    ...extra
  }
}

function renderAt(path: string, route: string, element: ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={element} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  m.current.value = null
})

const titleButton = (name: string) => screen.getByRole('button', { name: new RegExp(`^${name}`) })

it('selects with Ctrl and Shift clicks and queues the selection in list order', async () => {
  const user = userEvent.setup()
  const tracks = [track(1, 'One'), track(2, 'Two'), track(3, 'Three'), track(4, 'Four')]
  const view = renderAt('/', '/', <TrackList tracks={tracks} />)

  await user.keyboard('{Control>}')
  await user.click(titleButton('Three'))
  await user.keyboard('{/Control}')
  expect(m.playQueue).not.toHaveBeenCalled()
  await user.keyboard('{Shift>}')
  await user.click(titleButton('One'))
  await user.keyboard('{/Shift}')

  const bar = screen.getByRole('region', { name: 'Selected songs' })
  expect(within(bar).getByText('3 selected')).toBeInTheDocument()
  expect(screen.getByRole('checkbox', { name: 'Select Four' })).not.toBeChecked()
  await expectNoAxeViolations(view.container)

  await user.click(within(bar).getByRole('button', { name: 'Play next' }))
  const queued = m.enqueue.mock.calls[0][0] as { title: string }[]
  expect(queued.map((t) => t.title)).toEqual(['One', 'Two', 'Three'])
  expect(m.enqueue.mock.calls[0][1]).toEqual({ next: true })
  expect(screen.queryByRole('region', { name: 'Selected songs' })).not.toBeInTheDocument()

  await user.click(screen.getByRole('checkbox', { name: 'Select Two' }))
  expect(screen.getByText('1 selected')).toBeInTheDocument()
  expect(screen.getByRole('checkbox', { name: 'Select Two' })).toBeChecked()
  await user.keyboard('{Shift>}')
  await user.click(screen.getByRole('checkbox', { name: 'Select Four' }))
  await user.keyboard('{/Shift}')
  expect(screen.getByText('3 selected')).toBeInTheDocument()
  expect(screen.getByRole('checkbox', { name: 'Select Three' })).toBeChecked()
  await user.keyboard('{Escape}')
  expect(screen.queryByText('3 selected')).not.toBeInTheDocument()
  await user.click(titleButton('Two'))
  expect(m.playQueue).toHaveBeenCalledWith(expect.any(Array), 1)
})

it('opens a right-click menu with the delete action last, behind a separator', async () => {
  const user = userEvent.setup()
  renderAt('/', '/', <TrackList tracks={[track(1, 'One'), track(2, 'Two')]} />)

  await user.pointer({ keys: '[MouseRight]', target: titleButton('Two') })
  const menu = screen.getByRole('menu', { name: 'Context menu' })
  const items = within(menu).getAllByRole('menuitem').map((item) => item.textContent)
  expect(items[0]).toBe('Play')
  expect(items.at(-1)).toBe('Delete from computer…')
  expect(within(menu).getByRole('separator')).toBeInTheDocument()

  await user.click(within(menu).getByRole('menuitem', { name: 'Play next' }))
  expect(m.enqueue).toHaveBeenCalledWith([expect.objectContaining({ id: 'music-2' })], { next: true })
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

it('jumps to the playing row even when it has not been rendered yet', async () => {
  const user = userEvent.setup()
  vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} })
  vi.stubGlobal('matchMedia', () => ({ matches: true }))
  const scroll = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
  const tracks = Array.from({ length: 150 }, (_, i) => track(i + 1, `Song ${i + 1}`))
  m.current.value = { id: 'music-140' }
  renderAt('/', '/', <TrackList tracks={tracks} />)

  expect(screen.queryByText('Song 140')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Jump to playing' }))
  expect(screen.getByText('Song 140')).toBeInTheDocument()
  expect(scroll).toHaveBeenCalled()
  vi.unstubAllGlobals()
})

it('searches and sorts liked songs, and Play follows what is listed', async () => {
  const user = userEvent.setup()
  vi.mocked(api.music.tracks).mockResolvedValue([
    track(1, 'Bravo', { playCount: 1 }),
    track(2, 'Alpha', { playCount: 9 }),
    track(3, 'Charlie', { albumTitle: 'Other', playCount: 4 })
  ])
  renderAt('/music/liked', '/music/liked', <MusicLikedPage />)

  await screen.findByText('Bravo')
  expect(screen.getByText(/3 tracks · 9m/)).toBeInTheDocument()
  await user.selectOptions(screen.getByRole('combobox', { name: 'Sort liked songs' }), 'most')
  const rows = screen.getAllByRole('button', { name: /^(Alpha|Bravo|Charlie)/ })
  expect(rows.map((row) => row.textContent?.split('Artist')[0])).toEqual(['Alpha', 'Charlie', 'Bravo'])

  await user.type(screen.getByRole('textbox', { name: 'Search liked songs' }), 'other')
  expect(screen.getByText('Charlie')).toBeInTheDocument()
  expect(screen.queryByText('Alpha')).not.toBeInTheDocument()
  await user.click(screen.getAllByRole('button', { name: 'Play' })[0])
  expect(m.playQueue.mock.calls[0][0]).toHaveLength(1)

  await user.type(screen.getByRole('textbox', { name: 'Search liked songs' }), 'zzz')
  expect(screen.getByText(/No liked songs match/)).toBeInTheDocument()
})

it('removes selected songs from a local playlist and drops drag handles while searching', async () => {
  const user = userEvent.setup()
  const items = Array.from({ length: 30 }, (_, i) => ({
    kind: 'local' as const,
    itemId: 100 + i,
    position: i,
    track: track(i + 1, `Tune ${i + 1}`)
  }))
  const playlist = {
    id: 5, title: 'Mine', description: null, createdAt: '', updatedAt: '', source: null,
    playableCount: 30, missingCount: 0, verificationCount: 0, items
  } as unknown as MusicPlaylistDetail
  vi.mocked(api.music.playlist).mockResolvedValue(playlist)
  renderAt('/music/playlists/5', '/music/playlists/:id', <MusicPlaylistPage />)

  await screen.findByText('Tune 1')
  expect(screen.getByText(/30 tracks · 1h 30m/)).toBeInTheDocument()
  await user.type(screen.getByRole('textbox', { name: 'Search this playlist' }), 'Tune 2')
  expect(screen.queryByText('Tune 1')).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^Move/ })).not.toBeInTheDocument()

  await user.click(screen.getByRole('checkbox', { name: 'Select Tune 2' }))
  await user.click(screen.getByRole('checkbox', { name: 'Select Tune 20' }))
  await user.click(screen.getByRole('button', { name: 'Remove from playlist' }))
  expect(api.music.removePlaylistTrack).toHaveBeenCalledTimes(2)
  expect(api.music.removePlaylistTrack).toHaveBeenCalledWith(101)
  expect(api.music.removePlaylistTrack).toHaveBeenCalledWith(119)
})
