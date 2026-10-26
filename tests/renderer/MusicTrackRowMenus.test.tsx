import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import type { MusicTrack } from '@shared/types'
import MusicTrackRow from '@/components/MusicTrackRow'
import { rememberPlaylist } from '@/lib/recentPlaylists'

const m = vi.hoisted(() => ({
  playlistsForTracks: vi.fn(async () => [{ id: 1, title: 'Road trip', contains: 0 }]),
  addPlaylistTracks: vi.fn(async () => ({ added: 1, skipped: 0 })),
  toast: vi.fn()
}))

vi.mock('@/lib/api', () => ({
  api: {
    music: { setLiked: vi.fn(), playlistsForTracks: m.playlistsForTracks, addPlaylistTracks: m.addPlaylistTracks },
    musicLinks: { usages: vi.fn(async () => []), searchOwners: vi.fn(async () => []), labels: vi.fn(async () => []) }
  }
}))
vi.mock('@/lib/toast', () => ({ toast: m.toast, toastError: vi.fn() }))
vi.mock('@/lib/player', () => ({
  usePlayerControls: () => ({ enqueue: vi.fn(), stop: vi.fn(), track: null, queue: [] })
}))

const track: MusicTrack = {
  id: 9, albumId: 10, albumTitle: 'Album', artistId: 1, artistName: 'Artist', tagArtist: null,
  filePath: 'a/9.mp3', title: 'Nightcall', trackNo: 1, discNo: 1, duration: 200, likedAt: null,
  playCount: 0, lastPlayedAt: null, coverPath: null
}

function renderRow() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <MusicTrackRow track={track} onPlay={vi.fn()} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

it('opens the playlist picker straight from the right-click menu', async () => {
  renderRow()
  fireEvent.contextMenu(screen.getByRole('button', { name: 'Nightcall' }))
  await userEvent.click(screen.getByRole('menuitem', { name: 'Add to playlist…' }))
  expect(await screen.findByRole('button', { name: 'Road trip' })).toBeInTheDocument()
  expect(screen.getByRole('searchbox', { name: 'Find or create a playlist' })).toHaveFocus()
  // The picker replaces the actions; Delete is not on the way to it.
  expect(screen.queryByRole('button', { name: 'Delete from computer' })).toBeNull()
})

it('swaps the ⋯ actions for the picker and offers Link to title', async () => {
  renderRow()
  await userEvent.click(screen.getByRole('button', { name: 'More actions for Nightcall' }))
  expect(screen.getByRole('button', { name: 'Link to title…' })).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Add to playlist…' }))
  expect(await screen.findByRole('button', { name: 'Road trip' })).toBeInTheDocument()
  expect(screen.getByRole('searchbox', { name: 'Find or create a playlist' })).toHaveFocus()

  await userEvent.keyboard('{Escape}')
  await userEvent.click(screen.getByRole('button', { name: 'More actions for Nightcall' }))
  await userEvent.click(screen.getByRole('button', { name: 'Link to title…' }))
  expect(await screen.findByRole('dialog', { name: 'Link “Nightcall” to a title' })).toBeInTheDocument()
})

it('adds to the last used playlist in one click from the right-click menu', async () => {
  rememberPlaylist({ id: 4, title: 'Gym' })
  renderRow()
  fireEvent.contextMenu(screen.getByRole('button', { name: 'Nightcall' }))
  expect(screen.getByRole('menuitem', { name: 'Link to title…' })).toBeInTheDocument()
  await userEvent.click(screen.getByRole('menuitem', { name: 'Add to “Gym”' }))
  expect(m.addPlaylistTracks).toHaveBeenCalledWith(4, [9])
  expect(m.toast).toHaveBeenCalledWith('Added 1 song to Gym', 'success')
})

it('leaves the native menu to its dialogs', async () => {
  renderRow()
  await userEvent.click(screen.getByRole('button', { name: 'More actions for Nightcall' }))
  await userEvent.click(screen.getByRole('button', { name: 'Link to title…' }))
  const dialog = await screen.findByRole('dialog', { name: 'Link “Nightcall” to a title' })
  // Portaled out of the row, but React still bubbles the event to it.
  expect(fireEvent.contextMenu(dialog)).toBe(true)
  expect(screen.queryByRole('menuitem', { name: 'Play' })).toBeNull()

  await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }))
  await userEvent.click(screen.getByRole('button', { name: 'More actions for Nightcall' }))
  await userEvent.click(screen.getByRole('button', { name: 'Tags and standout track' }))
  const tags = await screen.findByRole('dialog')
  expect(fireEvent.contextMenu(tags)).toBe(true)
  expect(screen.queryByRole('menuitem', { name: 'Play' })).toBeNull()
})

it('leaves the native menu to the playlist search box', async () => {
  renderRow()
  await userEvent.click(screen.getByRole('button', { name: 'More actions for Nightcall' }))
  await userEvent.click(screen.getByRole('button', { name: 'Add to playlist…' }))
  const box = await screen.findByRole('searchbox', { name: 'Find or create a playlist' })
  expect(fireEvent.contextMenu(box)).toBe(true)
  expect(screen.queryByRole('menuitem', { name: 'Play' })).toBeNull()
})
