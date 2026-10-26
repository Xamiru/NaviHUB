import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { MediaItem, MusicAlbumSummary, MusicLink, MusicTrack, ThemeSong } from '@shared/types'
import { api } from '@/lib/api'
import LinkMusicDialog from '@/components/music/LinkMusicDialog'
import LinkedMusicSection, { groupLinks, linkedTracks } from '@/components/music/LinkedMusicSection'
import FranchiseMusic from '@/components/music/FranchiseMusic'
import { expectNoAxeViolations } from './accessibility'

const playQueue = vi.fn()
vi.mock('@/lib/api', () => ({
  api: {
    musicLinks: {
      forOwner: vi.fn(),
      labels: vi.fn(),
      search: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      reorder: vi.fn(),
      remove: vi.fn(),
      forMediaIds: vi.fn()
    },
    music: { setLiked: vi.fn(), playlistsForTracks: vi.fn(async () => []) }
  }
}))
const confirm = vi.fn(async () => true)
vi.mock('@/lib/confirm', () => ({ confirmDialog: (...args: unknown[]) => confirm(...(args as [])) }))
vi.mock('@/lib/player', () => ({
  usePlayerControls: () => ({ playQueue, enqueue: vi.fn(), toggle: vi.fn(), track: null, isPlaying: false })
}))

const track = (id: number, title: string, albumId = 10): MusicTrack => ({
  id, albumId, albumTitle: 'Persona 5 OST', artistId: 1, artistName: 'Shoji Meguro', tagArtist: null,
  filePath: `a/${id}.mp3`, title, trackNo: id, discNo: 1, duration: 200, likedAt: null, playCount: 0,
  lastPlayedAt: null, coverPath: null
})
const album: MusicAlbumSummary = {
  id: 10, artistId: 1, artistName: 'Shoji Meguro', title: 'Persona 5 OST', year: 2016, coverPath: null, trackCount: 2
}
const link = (over: Partial<MusicLink>): MusicLink => ({
  id: 1, mediaId: 7, wrestlerId: null, kind: 'track', label: '', sortOrder: 0, missing: false,
  snapshot: { artist: 'Shoji Meguro', album: 'Persona 5 OST', title: 'Life Will Change' },
  album: null, tracks: [track(2, 'Life Will Change')], themeSongId: null, ...over
})
const theme: ThemeSong = {
  id: 55, slug: 'OP1', type: 'OP', sequence: 1, title: 'Wake Up', audioUrl: null, audioPath: null,
  favorite: false, artists: []
} as ThemeSong

function wrap(children: ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.mocked(api.musicLinks.labels).mockResolvedValue(['OST', 'Opening'])
  vi.mocked(api.musicLinks.search).mockResolvedValue({ albums: [album], tracks: [track(1, 'Wake Up, Get Up, Get Out There')] })
  vi.mocked(api.musicLinks.create).mockResolvedValue(1)
})
afterEach(() => vi.clearAllMocks())

describe('grouping helpers', () => {
  it('groups by label in first-appearance order and plays each track once', () => {
    const links = [
      link({ id: 1, label: 'OST', kind: 'album', album, tracks: [track(1, 'A'), track(2, 'B')] }),
      link({ id: 2, label: 'Opening', tracks: [track(1, 'A')] }),
      link({ id: 3, label: 'OST', tracks: [track(3, 'C')] })
    ]
    expect(groupLinks(links).map((g) => [g.label, g.links.map((l) => l.id)])).toEqual([
      ['OST', [1, 3]],
      ['Opening', [2]]
    ])
    expect(linkedTracks(links).map((t) => t.id)).toEqual([1, 2, 3])
  })
})

describe('LinkMusicDialog', () => {
  it('searches the library and links a track with a label and theme', async () => {
    const user = userEvent.setup()
    const { container } = wrap(
      <LinkMusicDialog owner={{ mediaId: 7 }} ownerTitle="Persona 5" existing={[]} themes={[theme]} onClose={vi.fn()} />
    )
    expect(screen.getByRole('dialog', { name: 'Link music to Persona 5' })).toBeTruthy()
    await user.type(screen.getByRole('searchbox', { name: 'Search your music library' }), 'persona')
    const pick = await screen.findByRole('button', { name: /Wake Up, Get Up, Get Out There/ })
    expect(screen.getByRole('button', { name: 'Link' })).toBeDisabled()
    await user.click(pick)
    expect(pick).toHaveAttribute('aria-pressed', 'true')
    await user.type(screen.getByRole('combobox', { name: 'Label' }), 'Opening')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Full version of' }), '55')
    await expectNoAxeViolations(container)
    await user.click(screen.getByRole('button', { name: 'Link' }))
    await waitFor(() =>
      expect(api.musicLinks.create).toHaveBeenCalledWith({
        owner: { mediaId: 7 }, kind: 'track', albumId: null, trackId: 1, label: 'Opening', themeSongId: 55
      })
    )
    expect(await screen.findByText('Linked Wake Up, Get Up, Get Out There.')).toBeTruthy()
  })

  it('links a whole album and marks what is already linked', async () => {
    const user = userEvent.setup()
    wrap(
      <LinkMusicDialog
        owner={{ wrestlerId: 3 }}
        ownerTitle="Stone Cold"
        existing={[link({ kind: 'album', album, tracks: [] })]}
        onClose={vi.fn()}
      />
    )
    await user.type(screen.getByRole('searchbox', { name: 'Search your music library' }), 'p5')
    const albumButton = await screen.findByRole('button', { name: /Persona 5 OST.*Linked/ })
    await user.click(albumButton)
    expect(screen.queryByRole('combobox', { name: 'Full version of' })).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Link' }))
    await waitFor(() =>
      expect(api.musicLinks.create).toHaveBeenCalledWith(
        expect.objectContaining({ owner: { wrestlerId: 3 }, kind: 'album', albumId: 10, trackId: null })
      )
    )
  })
})

describe('LinkedMusicSection', () => {
  it('shows linked music by label, plays it, and keeps missing links unlinkable', async () => {
    const user = userEvent.setup()
    vi.mocked(api.musicLinks.forOwner).mockResolvedValue([
      link({ id: 1, label: 'OST', kind: 'album', album, tracks: [track(1, 'Wake Up'), track(2, 'Life Will Change')] }),
      link({
        id: 2, label: 'Opening', missing: true, tracks: [],
        snapshot: { artist: 'Lyn', album: 'Singles', title: 'Gone Track' }
      })
    ])
    const { container } = wrap(<LinkedMusicSection owner={{ mediaId: 7 }} ownerTitle="Persona 5" />)
    expect(await screen.findByRole('heading', { name: 'OST' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Opening' })).toBeTruthy()
    expect(screen.getByText('Gone Track')).toBeTruthy()
    expect(screen.getByText(/missing from the music library/)).toBeTruthy()
    await expectNoAxeViolations(container)
    await user.click(screen.getByRole('button', { name: 'Play all' }))
    expect(playQueue).toHaveBeenCalledWith(
      [expect.objectContaining({ id: 'music-1', mediaId: null }), expect.objectContaining({ id: 'music-2', mediaId: null })],
      0,
      { shuffle: false }
    )
    await user.click(screen.getByRole('button', { name: /Tracks/ }))
    expect(screen.getByText('Life Will Change')).toBeTruthy()
  })

  it('edits and unlinks a linked track from its visible menu', async () => {
    const user = userEvent.setup()
    vi.mocked(api.musicLinks.forOwner).mockResolvedValue([link({ id: 4, label: 'Opening', themeSongId: 55 })])
    vi.mocked(api.musicLinks.update).mockResolvedValue()
    vi.mocked(api.musicLinks.remove).mockResolvedValue()
    wrap(<LinkedMusicSection owner={{ mediaId: 7 }} ownerTitle="Persona 5" themes={[theme]} />)
    expect(await screen.findByText('Full version of OP1 · Wake Up')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'More actions for Life Will Change' }))
    await user.click(screen.getByRole('button', { name: 'Edit link…' }))
    const edit = screen.getByRole('dialog', { name: 'Edit link: Life Will Change' })
    expect(edit).toBeTruthy()
    await user.clear(screen.getByRole('combobox', { name: 'Label' }))
    await user.type(screen.getByRole('combobox', { name: 'Label' }), 'Battle')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Full version of' }), '')
    await user.click(screen.getByRole('button', { name: 'Save link' }))
    await waitFor(() => expect(api.musicLinks.update).toHaveBeenCalledWith(4, { label: 'Battle', themeSongId: null }))

    await user.click(screen.getByRole('button', { name: 'More actions for Life Will Change' }))
    await user.click(screen.getByRole('button', { name: 'Unlink' }))
    await waitFor(() => expect(api.musicLinks.remove).toHaveBeenCalledWith(4))
    expect(confirm).toHaveBeenCalled()
  })

  it('offers a first link when nothing is linked', async () => {
    vi.mocked(api.musicLinks.forOwner).mockResolvedValue([])
    wrap(<LinkedMusicSection owner={{ mediaId: 7 }} ownerTitle="Persona 5" />)
    expect(await screen.findByText(/No music linked yet/)).toBeTruthy()
    await userEvent.setup().click(screen.getByRole('button', { name: 'Link music' }))
    expect(screen.getByRole('dialog', { name: 'Link music to Persona 5' })).toBeTruthy()
  })
})

describe('FranchiseMusic', () => {
  const item = (id: number, title: string, mediaType: MediaItem['mediaType']) => ({ id, title, mediaType }) as MediaItem

  it('groups linked music by entry in franchise order and links to each Music tab', async () => {
    vi.mocked(api.musicLinks.forMediaIds).mockResolvedValue([
      link({ id: 1, mediaId: 9, label: 'OST', tracks: [track(1, 'Gate of Steiner')] }),
      link({ id: 2, mediaId: 4, label: 'Opening', tracks: [track(2, 'Hacking to the Gate')] })
    ])
    wrap(
      <FranchiseMusic
        accent="#fff"
        entries={[
          { title: 'Steins;Gate', item: item(4, 'Steins;Gate', 'anime') },
          { title: 'Steins;Gate VN', item: item(9, 'Steins;Gate VN', 'visual_novel') },
          { title: 'Chaos;Head', item: item(5, 'Chaos;Head', 'anime') }
        ]}
      />
    )
    const titles = await screen.findAllByRole('link')
    expect(titles.map((a) => [a.textContent, a.getAttribute('href')])).toEqual([
      ['Steins;Gate', '/anime/4?tab=music'],
      ['Steins;Gate VN', '/visual-novels/9?tab=music']
    ])
    expect(api.musicLinks.forMediaIds).toHaveBeenCalledWith([4, 5, 9])
  })

  it('renders nothing when no entry has music', async () => {
    vi.mocked(api.musicLinks.forMediaIds).mockResolvedValue([])
    const { container } = wrap(<FranchiseMusic accent="#fff" entries={[{ title: 'A', item: item(1, 'A', 'game') }]} />)
    await waitFor(() => expect(api.musicLinks.forMediaIds).toHaveBeenCalled())
    expect(container.querySelector('section')).toBeNull()
  })
})
