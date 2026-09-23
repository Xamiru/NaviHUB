import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import SoundtrackSection from '../../src/renderer/src/components/SoundtrackSection'
const m = vi.hoisted(() => ({
  list: vi.fn(),
  search: vi.fn(),
  save: vi.fn(),
  tracks: vi.fn(),
  playQueue: vi.fn()
}))
vi.mock('../../src/renderer/src/lib/api', () => ({ api: { soundtracks: m } }))
vi.mock('../../src/renderer/src/lib/player', () => ({
  usePlayerControls: () => ({ playQueue: m.playQueue })
}))
function mount() {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <MemoryRouter>
        <SoundtrackSection owner={{ kind: 'media', id: 1 }} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}
beforeEach(() => {
  vi.clearAllMocks()
  m.list.mockResolvedValue([])
  m.search.mockResolvedValue([
    { kind: 'track', id: 7, title: 'Theme', detail: 'Album', albumId: 3, mediaType: null }
  ])
})
describe('soundtrack associations', () => {
  it('searches local recordings and saves an explicit track-to-work link', async () => {
    const user = userEvent.setup()
    mount()
    await user.click(await screen.findByRole('button', { name: 'Link local music' }))
    await user.selectOptions(screen.getByLabelText('Link to'), 'track')
    await user.type(screen.getByLabelText('Search local library'), 'Theme')
    await user.click(await screen.findByRole('button', { name: 'Theme Album' }))
    await user.type(screen.getByLabelText('Relationship label'), 'Ending theme')
    await user.click(screen.getByRole('button', { name: 'Save association' }))
    await waitFor(() =>
      expect(m.save).toHaveBeenCalledWith(null, {
        music: { kind: 'track', id: 7 },
        target: { kind: 'media', id: 1 },
        label: 'Ending theme',
        notes: ''
      })
    )
  })
  it('plays with the music namespace and null media identity, while exposing associated-work navigation', async () => {
    m.list.mockResolvedValue([
      {
        id: 9,
        music: { kind: 'track', id: 7 },
        target: { kind: 'media', id: 1 },
        musicTitle: 'Theme',
        targetTitle: 'Novel',
        mediaType: 'visual_novel',
        albumId: 3,
        label: '',
        notes: ''
      }
    ])
    m.tracks.mockResolvedValue([
      {
        id: 7,
        title: 'Theme',
        filePath: 'Artist/Album/Theme.mp3',
        albumId: 3,
        artistId: 2,
        artistName: 'Artist',
        albumTitle: 'Album',
        tagArtist: null,
        coverPath: null,
        duration: 60
      }
    ])
    const user = userEvent.setup()
    mount()
    await user.click(await screen.findByRole('button', { name: 'Play Theme' }))
    await waitFor(() =>
      expect(m.playQueue).toHaveBeenCalledWith(
        [
          expect.objectContaining({
            id: 'music-7',
            mediaId: null,
            audioPath: 'music/Artist/Album/Theme.mp3'
          })
        ],
        0,
        { shuffle: false }
      )
    )
    expect(screen.getByRole('link', { name: 'Novel' })).toHaveAttribute('href', '/visual-novels/1')
    expect(screen.getByRole('link', { name: 'Theme' })).toHaveAttribute('href', '/music/albums/3')
  })
})
