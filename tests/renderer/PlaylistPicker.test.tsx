import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MusicPlaylistMembership } from '@shared/types'
import PlaylistPicker, { addedMessage, pickerRows } from '@/components/music/PlaylistPicker'
import { loadRecentPlaylists, rememberPlaylist } from '@/lib/recentPlaylists'
import { expectNoAxeViolations } from './accessibility'

const m = vi.hoisted(() => ({
  playlistsForTracks: vi.fn(),
  addPlaylistTracks: vi.fn(),
  removePlaylistTrackByTrack: vi.fn(async () => undefined),
  createPlaylist: vi.fn(),
  toast: vi.fn()
}))

vi.mock('@/lib/api', () => ({
  api: {
    music: {
      playlistsForTracks: m.playlistsForTracks,
      addPlaylistTracks: m.addPlaylistTracks,
      removePlaylistTrackByTrack: m.removePlaylistTrackByTrack,
      createPlaylist: m.createPlaylist
    }
  }
}))
vi.mock('@/lib/toast', () => ({ toast: m.toast, toastError: vi.fn() }))

const list = (rows: [number, string, number][]): MusicPlaylistMembership[] =>
  rows.map(([id, title, contains]) => ({ id, title, contains }))

function renderPicker(trackIds: number[], onDone = vi.fn()) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <PlaylistPicker trackIds={trackIds} onDone={onDone} />
    </QueryClientProvider>
  )
  return onDone
}

const rowTitles = (): string[] =>
  [...document.querySelectorAll('[data-picker-row]')].map((el) => el.textContent ?? '')

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

describe('pickerRows', () => {
  const all = list([
    [1, 'Alpha', 0],
    [2, 'Beta', 0],
    [3, 'Gamma', 0]
  ])

  it('puts recent playlists first, once, and drops deleted ones', () => {
    const rows = pickerRows(all, [3, 99, 1], '')
    expect(rows.recent.map((p) => p.id)).toEqual([3, 1])
    expect(rows.rest.map((p) => p.id)).toEqual([2])
  })

  it('searches every playlist as one flat list', () => {
    const rows = pickerRows(all, [3], 'a')
    expect(rows.recent).toEqual([])
    expect(rows.rest.map((p) => p.id)).toEqual([1, 2, 3])
    expect(pickerRows(all, [], 'GAM').rest.map((p) => p.id)).toEqual([3])
  })
})

describe('addedMessage', () => {
  it('reports added and already-present songs', () => {
    expect(addedMessage('Mix', 3, 0)).toBe('Added 3 songs to Mix')
    expect(addedMessage('Mix', 1, 2)).toBe('Added 1 song to Mix, 2 already there')
    expect(addedMessage('Mix', 0, 1)).toBe('Already in Mix')
    expect(addedMessage('Mix', 0, 4)).toBe('All already in Mix')
  })
})

describe('PlaylistPicker', () => {
  it('keeps its order while one song is toggled in and out', async () => {
    rememberPlaylist({ id: 3, title: 'Gamma' })
    m.playlistsForTracks.mockResolvedValueOnce(
      list([
        [1, 'Alpha', 0],
        [2, 'Beta', 0],
        [3, 'Gamma', 1]
      ])
    )
    m.playlistsForTracks.mockResolvedValue(
      list([
        [1, 'Alpha', 1],
        [2, 'Beta', 0],
        [3, 'Gamma', 1]
      ])
    )
    m.addPlaylistTracks.mockResolvedValue({ added: 1, skipped: 0 })
    renderPicker([7])

    const alpha = await screen.findByRole('button', { name: 'Alpha' })
    expect(rowTitles().map((t) => t.slice(1))).toEqual(['Gamma', 'Alpha', 'Beta'])
    expect(screen.getByRole('button', { name: 'Gamma' })).toHaveAttribute('aria-pressed', 'true')
    expect(alpha).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(alpha)
    expect(m.addPlaylistTracks).toHaveBeenCalledWith(1, [7])
    await waitFor(() => expect(alpha).toHaveAttribute('aria-pressed', 'true'))
    // Same order after the refetch; the new recent playlist waits for the next open.
    expect(rowTitles().map((t) => t.slice(1))).toEqual(['Gamma', 'Alpha', 'Beta'])
    expect(loadRecentPlaylists().map((p) => p.id)).toEqual([1, 3])
    expect(m.toast).not.toHaveBeenCalled()

    await userEvent.click(screen.getByRole('button', { name: 'Gamma' }))
    expect(m.removePlaylistTrackByTrack).toHaveBeenCalledWith(3, 7)
    await expectNoAxeViolations(document.body)
  })

  it('filters by search and creates a playlist that matches nothing', async () => {
    m.playlistsForTracks.mockResolvedValue(list([[1, 'Road trip', 0]]))
    m.createPlaylist.mockResolvedValue(5)
    m.addPlaylistTracks.mockResolvedValue({ added: 1, skipped: 0 })
    renderPicker([7])
    await screen.findByRole('button', { name: 'Road trip' })

    const search = screen.getByRole('searchbox', { name: 'Find or create a playlist' })
    expect(search).toHaveFocus()
    await userEvent.type(search, 'gym')
    expect(screen.queryByRole('button', { name: 'Road trip' })).toBeNull()
    expect(screen.getByText('No playlist matches “gym”.')).toBeInTheDocument()
    await userEvent.keyboard('{Enter}')

    expect(m.createPlaylist).toHaveBeenCalledWith({ title: 'gym' })
    expect(m.addPlaylistTracks).toHaveBeenCalledWith(5, [7])
    expect(loadRecentPlaylists()).toEqual([{ id: 5, title: 'gym' }])
  })

  it('Enter adds to the top match and arrow keys reach the rows', async () => {
    m.playlistsForTracks.mockResolvedValue(
      list([
        [1, 'Chill', 0],
        [2, 'Chill evening', 0]
      ])
    )
    m.addPlaylistTracks.mockResolvedValue({ added: 1, skipped: 0 })
    renderPicker([7])
    await screen.findByRole('button', { name: 'Chill' })
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    expect(screen.getByRole('button', { name: 'Chill evening' })).toHaveFocus()

    await userEvent.click(screen.getByRole('searchbox'))
    await userEvent.keyboard('chill{Enter}')
    expect(m.addPlaylistTracks).toHaveBeenCalledWith(1, [7])
    expect(m.createPlaylist).not.toHaveBeenCalled()
  })

  it('Enter creates a name that only part-matches, and never re-adds an exact one', async () => {
    m.playlistsForTracks.mockResolvedValue(
      list([
        [1, 'Rock Classics', 0],
        [2, 'Chill', 1]
      ])
    )
    m.createPlaylist.mockResolvedValue(5)
    m.addPlaylistTracks.mockResolvedValue({ added: 1, skipped: 0 })
    renderPicker([7])
    await screen.findByRole('button', { name: 'Rock Classics' })
    await userEvent.keyboard('Rock{Enter}')
    expect(m.createPlaylist).toHaveBeenCalledWith({ title: 'Rock' })
    expect(m.addPlaylistTracks).toHaveBeenCalledWith(5, [7])

    m.createPlaylist.mockClear()
    m.addPlaylistTracks.mockClear()
    const box = screen.getByRole('searchbox')
    await waitFor(() => expect(box).toHaveValue(''))
    await waitFor(() => expect(box).toBeEnabled())
    await userEvent.type(box, 'chill{Enter}')
    expect(m.createPlaylist).not.toHaveBeenCalled()
    expect(m.addPlaylistTracks).not.toHaveBeenCalled()
    expect(m.removePlaylistTrackByTrack).not.toHaveBeenCalled()
    expect(m.toast).toHaveBeenCalledWith('Already in Chill', 'success')
  })

  it('Enter waits for the list, and a failed add still shows the new playlist', async () => {
    let loaded: (rows: MusicPlaylistMembership[]) => void = () => undefined
    m.playlistsForTracks.mockReturnValueOnce(new Promise((r) => (loaded = r)))
    renderPicker([7])
    const box = screen.getByRole('searchbox')
    await userEvent.type(box, 'Gym{Enter}')
    // Nothing is known about existing names yet, so nothing is created.
    expect(m.createPlaylist).not.toHaveBeenCalled()

    m.playlistsForTracks.mockResolvedValue(list([[5, 'Gym', 0]]))
    m.createPlaylist.mockResolvedValue(5)
    m.addPlaylistTracks.mockRejectedValue(new Error('disk full'))
    loaded(list([]))
    await screen.findByRole('button', { name: 'Create playlist “Gym”' })
    await userEvent.type(box, '{Enter}')
    expect(m.createPlaylist).toHaveBeenCalledTimes(1)
    // The playlist exists even though the add failed; the list shows it, so
    // another Enter adds to it instead of creating a second “Gym”.
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Create playlist “Gym”' })).toBeNull())
    expect(screen.getByRole('button', { name: 'Gym' })).toBeInTheDocument()
  })

  it('shows partial membership for a selection and reports what was skipped', async () => {
    m.playlistsForTracks.mockResolvedValue(
      list([
        [1, 'All in', 3],
        [2, 'Some in', 2],
        [3, 'None in', 0]
      ])
    )
    m.addPlaylistTracks.mockResolvedValue({ added: 1, skipped: 2 })
    const onDone = renderPicker([7, 8, 9])

    expect(await screen.findByRole('button', { name: 'All in, all 3 songs already in' })).toBeDisabled()
    const some = screen.getByRole('button', { name: 'Some in, 2 of 3 already in' })
    expect(within(some).getByText('2/3')).toBeInTheDocument()
    expect(screen.getByText('Add 3 songs to')).toBeInTheDocument()

    await userEvent.click(some)
    expect(m.addPlaylistTracks).toHaveBeenCalledWith(2, [7, 8, 9])
    expect(m.toast).toHaveBeenCalledWith('Added 1 song to Some in, 2 already there', 'success')
    expect(onDone).toHaveBeenCalled()
  })

  it('says so when the playlists cannot be read', async () => {
    m.playlistsForTracks.mockRejectedValue(new Error('boom'))
    renderPicker([7])
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load your playlists.')
    expect(screen.queryByText(/No playlists yet/)).toBeNull()
  })
})
