import { qk } from '../../src/renderer/src/lib/queryKeys'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { GameRun, MusicSmartPlaylist, MusicTrack } from '../../src/shared/types'
import { DEFAULT_SMART_RULES } from '../../src/shared/musicPersonal'
import GamePlaythroughSection, {
  GameResumeCard
} from '../../src/renderer/src/components/GamePlaythroughSection'
import MusicAlbumJournal from '../../src/renderer/src/components/MusicAlbumJournal'
import MusicJournalPage from '../../src/renderer/src/pages/MusicJournalPage'
import MusicSmartPage from '../../src/renderer/src/pages/MusicSmartPage'
import MusicTrackRow from '../../src/renderer/src/components/MusicTrackRow'
import { expectNoAxeViolations } from './accessibility'

const m = vi.hoisted(() => ({
  runs: vi.fn(),
  saveRun: vi.fn(),
  removeRun: vi.fn(),
  history: vi.fn(),
  assign: vi.fn(),
  saveNote: vi.fn(),
  removeNote: vi.fn(),
  album: vi.fn(),
  saveAlbum: vi.fn(),
  track: vi.fn(),
  saveTrack: vi.fn(),
  listens: vi.fn(),
  saveListen: vi.fn(),
  removeListen: vi.fn(),
  journal: vi.fn(),
  tags: vi.fn(),
  smartList: vi.fn(),
  saveSmart: vi.fn(),
  removeSmart: vi.fn(),
  preview: vi.fn(),
  queue: vi.fn(),
  playQueue: vi.fn(),
  playlistsForTrack: vi.fn(),
  confirm: vi.fn(),
  toastError: vi.fn()
}))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    playthroughs: {
      list: m.runs,
      save: m.saveRun,
      remove: m.removeRun,
      history: m.history,
      assignSession: m.assign,
      saveNote: m.saveNote,
      removeNote: m.removeNote
    },
    musicJournal: {
      album: m.album,
      saveAlbum: m.saveAlbum,
      track: m.track,
      saveTrack: m.saveTrack,
      listens: m.listens,
      saveListen: m.saveListen,
      removeListen: m.removeListen,
      list: m.journal,
      tags: m.tags
    },
    musicSmart: {
      list: m.smartList,
      save: m.saveSmart,
      remove: m.removeSmart,
      preview: m.preview,
      queue: m.queue
    },
    music: { playlistsForTrack: m.playlistsForTrack }
  }
}))
vi.mock('../../src/renderer/src/lib/player', () => ({
  usePlayerControls: () => ({ track: null, playQueue: m.playQueue })
}))
vi.mock('../../src/renderer/src/lib/confirm', () => ({ confirmDialog: m.confirm }))
vi.mock('../../src/renderer/src/lib/toast', () => ({ toastError: m.toastError, toast: vi.fn() }))
const run: GameRun = {
  id: 2,
  mediaId: 1,
  title: 'Mage run',
  kind: 'first',
  state: 'active',
  difficulty: 'Hard',
  build: 'Mage',
  objective: 'Find the key',
  stoppedAt: 'Library',
  notes: '',
  createdAt: '2026-09-01',
  updatedAt: '2026-09-23',
  sessionCount: 1,
  totalSeconds: 3600
}
const track: MusicTrack = {
  id: 10,
  albumId: 1,
  albumTitle: 'Album',
  artistId: 1,
  artistName: 'Artist',
  tagArtist: null,
  filePath: 'song.mp3',
  title: 'Song',
  trackNo: 1,
  discNo: 1,
  duration: 180,
  likedAt: null,
  playCount: 0,
  lastPlayedAt: null,
  coverPath: null
}
const saved: MusicSmartPlaylist = {
  id: 7,
  title: 'Study mix',
  description: '',
  rules: { ...DEFAULT_SMART_RULES, tags: ['study'] }
}
let routeKey = 0
function Location() {
  return <output aria-label="Location">{useLocation().pathname}</output>
}
function mount(children: ReactNode, route = '/games/1') {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  const view = render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[{ pathname: route, key: `depth-${++routeKey}` }]}>
        {children}
        <Location />
      </MemoryRouter>
    </QueryClientProvider>
  )
  return { ...view, client }
}
function smartPage(route = '/music/smart/new') {
  return mount(
    <Routes>
      <Route path="/music/smart" element={<MusicSmartPage />} />
      <Route path="/music/smart/:id" element={<MusicSmartPage />} />
    </Routes>,
    route
  )
}
beforeEach(() => {
  Object.values(m).forEach((fn) => fn.mockReset())
  m.runs.mockResolvedValue([run])
  m.saveRun.mockResolvedValue(2)
  m.history.mockResolvedValue({
    sessions: [
      {
        id: 5,
        startedAt: '2026-09-23 10:00:00',
        endedAt: '2026-09-23 11:00:00',
        duration: 3600,
        runId: null,
        runTitle: null
      }
    ],
    notes: [],
    sessionTotal: 1,
    noteTotal: 0
  })
  m.album.mockResolvedValue({
    albumId: 1,
    rating: 8.5,
    shelf: 'exploring',
    review: 'A keeper',
    tags: ['study'],
    tracks: []
  })
  m.track.mockResolvedValue({ trackId: 10, standout: false, tags: [] })
  m.listens.mockResolvedValue({ items: [], total: 0 })
  m.journal.mockResolvedValue({ items: [], total: 0 })
  m.tags.mockResolvedValue(['study', 'instrumental'])
  m.smartList.mockResolvedValue([saved])
  m.preview.mockResolvedValue({ items: [track], total: 1, matching: 1 })
  m.queue.mockResolvedValue([track])
  m.playlistsForTrack.mockResolvedValue([])
  m.confirm.mockResolvedValue(true)
})

describe('playthrough workflow', () => {
  it('shows the active resume notes and opens playthrough management', async () => {
    const user = userEvent.setup()
    const open = vi.fn()
    mount(<GameResumeCard mediaId={1} onOpen={open} />)
    expect(await screen.findByText('Mage run')).toBeInTheDocument()
    expect(screen.getByText(/Find the key/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Update playthrough' }))
    expect(open).toHaveBeenCalledOnce()
  })
  it('creates a New Game Plus run with a resume point and accessible fields', async () => {
    const user = userEvent.setup()
    const view = mount(<GamePlaythroughSection mediaId={1} />)
    await user.click(await screen.findByRole('button', { name: 'New playthrough' }))
    await user.clear(screen.getByLabelText('Playthrough name'))
    await user.type(screen.getByLabelText('Playthrough name'), 'Second journey')
    await user.selectOptions(screen.getByLabelText('Run type'), 'newGamePlus')
    await user.type(screen.getByLabelText('Where I stopped'), 'At the castle')
    await user.type(screen.getByLabelText('Next objective'), 'Open the gate')
    await act(async () => {
      await expectNoAxeViolations(view.container)
    })
    await user.click(screen.getByRole('button', { name: 'Save playthrough' }))
    await waitFor(() =>
      expect(m.saveRun).toHaveBeenCalledWith(
        1,
        null,
        expect.objectContaining({
          title: 'Second journey',
          kind: 'newGamePlus',
          stoppedAt: 'At the castle',
          objective: 'Open the gate',
          state: 'active'
        })
      )
    )
  })
  it('assigns an old session and logs a dated note without changing playtime', async () => {
    const user = userEvent.setup()
    mount(<GamePlaythroughSection mediaId={1} />)
    await user.selectOptions(await screen.findByLabelText('Playthrough for session 5'), '2')
    await waitFor(() => expect(m.assign).toHaveBeenCalledWith(1, 5, 2))
    await user.click(screen.getByRole('button', { name: 'Add journal entry' }))
    await user.type(screen.getByLabelText('Journal entry'), 'Beat the boss')
    await user.click(screen.getByRole('button', { name: 'Save journal entry' }))
    await waitFor(() =>
      expect(m.saveNote).toHaveBeenCalledWith(
        1,
        2,
        null,
        expect.objectContaining({
          body: 'Beat the boss',
          entryDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
        })
      )
    )
  })
  it('keeps a failed read visible and retryable instead of showing an empty journal', async () => {
    m.runs.mockRejectedValueOnce(new Error('Database busy')).mockResolvedValue([run])
    const user = userEvent.setup()
    mount(<GamePlaythroughSection mediaId={1} />)
    await user.click(await screen.findByRole('button', { name: 'Retry playthroughs' }))
    expect(await screen.findByRole('heading', { name: 'Mage run' })).toBeInTheDocument()
  })
})
describe('music album journal', () => {
  it('saves rating, shelf, review and normalized album tags', async () => {
    const user = userEvent.setup()
    const view = mount(<MusicAlbumJournal albumId={1} />, '/music/albums/1')
    await user.click(await screen.findByRole('button', { name: 'Edit album notes' }))
    await user.clear(screen.getByLabelText('Album rating (0–10)'))
    await user.type(screen.getByLabelText('Album rating (0–10)'), '9.2')
    await user.selectOptions(screen.getByLabelText('Listening shelf'), 'revisit')
    await user.clear(screen.getByLabelText('Album tags'))
    await user.type(screen.getByLabelText('Album tags'), 'Calm, STUDY, calm')
    await act(async () => {
      await expectNoAxeViolations(view.container)
    })
    await user.click(screen.getByRole('button', { name: 'Save album notes' }))
    await waitFor(() =>
      expect(m.saveAlbum).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          rating: 9.2,
          shelf: 'revisit',
          tags: ['calm', 'study'],
          review: 'A keeper'
        })
      )
    )
  })
  it('logs a listening impression separately from the album rating', async () => {
    const user = userEvent.setup()
    mount(<MusicAlbumJournal albumId={1} />, '/music/albums/1')
    await user.click(await screen.findByRole('button', { name: 'Log a listen' }))
    await user.type(screen.getByLabelText('Listening notes'), 'Heard something new')
    await user.type(screen.getByLabelText('Rating for this listen (0–10)'), '7')
    await user.click(screen.getByRole('button', { name: 'Save listening entry' }))
    await waitFor(() =>
      expect(m.saveListen).toHaveBeenCalledWith(
        1,
        null,
        expect.objectContaining({ rating: 7, notes: 'Heard something new' })
      )
    )
    expect(m.saveAlbum).not.toHaveBeenCalled()
  })
  it('opens the shared track menu and saves tags and a standout mark', async () => {
    const user = userEvent.setup()
    mount(<MusicTrackRow track={track} onPlay={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'More actions for Song' }))
    await user.click(screen.getByRole('button', { name: 'Tags and standout track' }))
    const dialog = await screen.findByRole('dialog', { name: 'Tags and standout track: Song' })
    await user.type(await within(dialog).findByLabelText('Track tags'), 'night, calm')
    await user.click(within(dialog).getByLabelText('Standout track on this album'))
    await user.click(within(dialog).getByRole('button', { name: 'Save track tags' }))
    await waitFor(() =>
      expect(m.saveTrack).toHaveBeenCalledWith({
        trackId: 10,
        tags: ['night', 'calm'],
        standout: true
      })
    )
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
  it('filters the journal by shelf and presents read failures with retry', async () => {
    const user = userEvent.setup()
    m.journal
      .mockRejectedValueOnce(new Error('read failed'))
      .mockResolvedValue({ items: [], total: 0 })
    mount(<MusicJournalPage />, '/music/journal')
    await user.click(await screen.findByRole('button', { name: 'Retry journal' }))
    await screen.findByText('Start with an album you know')
    await user.selectOptions(screen.getByLabelText('Album shelf'), 'want')
    await waitFor(() =>
      expect(m.journal).toHaveBeenLastCalledWith({ search: '', shelf: 'want', page: 0 })
    )
  })
})
describe('smart playlist builder', () => {
  it('previews a recipe and saves its rules without creating a manual playlist', async () => {
    const user = userEvent.setup()
    m.saveSmart.mockResolvedValue(8)
    const view = smartPage()
    await user.click(await screen.findByRole('button', { name: 'Unheard soundtracks' }))
    await waitFor(() =>
      expect(m.preview).toHaveBeenCalledWith(
        expect.objectContaining({ soundtrack: 'linked', playState: 'unplayed' }),
        0
      )
    )
    await act(async () => {
      await expectNoAxeViolations(view.container)
    })
    await user.click(screen.getByRole('button', { name: 'Create smart playlist' }))
    await waitFor(() =>
      expect(m.saveSmart).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          title: 'Unheard soundtracks',
          rules: expect.objectContaining({ soundtrack: 'linked', playState: 'unplayed' })
        })
      )
    )
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toHaveTextContent('/music/smart/8')
    )
  })
  it('plays the saved matching queue using music IDs and no media linkage', async () => {
    const user = userEvent.setup()
    smartPage('/music/smart/7')
    const button = await screen.findByRole('button', { name: 'Play playlist' })
    await waitFor(() => expect(button).toBeEnabled())
    await user.click(button)
    expect(m.queue).toHaveBeenCalledWith(7)
    expect(m.playQueue).toHaveBeenCalledWith(
      [expect.objectContaining({ id: 'music-10', mediaId: null, audioPath: 'music/song.mp3' })],
      0,
      { shuffle: false }
    )
  })
  it('requires saving changed rules before playback and re-enables playback after save', async () => {
    const user = userEvent.setup()
    m.saveSmart.mockResolvedValue(7)
    smartPage('/music/smart/7')
    await user.selectOptions(await screen.findByLabelText('Favorites'), 'liked')
    expect(screen.getByRole('button', { name: 'Play playlist' })).toBeDisabled()
    await waitFor(() =>
      expect(m.preview).toHaveBeenCalledWith(expect.objectContaining({ liked: 'liked' }), 0)
    )
    await user.click(screen.getByRole('button', { name: 'Save rules' }))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Play playlist' })).toBeEnabled())
    expect(m.saveSmart).toHaveBeenCalledWith(
      7,
      expect.objectContaining({ rules: expect.objectContaining({ liked: 'liked' }) })
    )
  })
  it('adopts refreshed saved rules only when the form is pristine', async () => {
    const user = userEvent.setup()
    const view = smartPage('/music/smart/7')
    await screen.findByLabelText('Smart playlist name')
    await act(async () => {
      view.client.setQueryData(qk.music.smart, [{ ...saved, title: 'Updated mix' }])
    })
    await waitFor(() => expect(screen.getByLabelText('Smart playlist name')).toHaveValue('Updated mix'))
    await user.type(screen.getByLabelText('Smart playlist name'), ' draft')
    await act(async () => {
      view.client.setQueryData(qk.music.smart, [{ ...saved, title: 'Latest saved mix' }])
    })
    const reload = await screen.findByRole('button', { name: 'Reload saved rules' })
    expect(screen.getByLabelText('Smart playlist name')).toHaveValue('Updated mix draft')
    expect(screen.getByRole('button', { name: 'Save rules' })).toBeDisabled()
    await user.click(reload)
    expect(screen.getByLabelText('Smart playlist name')).toHaveValue('Latest saved mix')
  })

  it('shows a failed preview as an error and does not claim zero matches', async () => {
    m.preview.mockRejectedValue(new Error('Database busy'))
    smartPage('/music/smart/7')
    expect(await screen.findByRole('button', { name: 'Retry preview' })).toBeInTheDocument()
    expect(screen.queryByText('No tracks match yet.', { exact: false })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save rules' })).toBeDisabled()
  })
})
