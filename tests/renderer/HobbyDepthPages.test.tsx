import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import VnStudyPage from '../../src/renderer/src/pages/VnStudyPage'
import VnDiscoverPage from '../../src/renderer/src/pages/VnDiscoverPage'
import VnEditionPage from '../../src/renderer/src/pages/VnEditionPage'
import WrestlingJourneysPage from '../../src/renderer/src/pages/WrestlingJourneysPage'
import WrestlingFilesSection from '../../src/renderer/src/components/wrestling/WrestlingFilesSection'
import MediaGuidesPage from '../../src/renderer/src/pages/MediaGuidesPage'
const m = vi.hoisted(() => ({
  overview: vi.fn(),
  captures: vi.fn(),
  capture: vi.fn(),
  saveCapture: vi.fn(),
  analyze: vi.fn(),
  coverageStatus: vi.fn(),
  discover: vi.fn(),
  tags: vi.fn(),
  edition: vi.fn(),
  refreshReleases: vi.fn(),
  saveEdition: vi.fn(),
  journey: vi.fn(),
  logViewing: vi.fn(),
  saveStep: vi.fn(),
  reorder: vi.fn(),
  targets: vi.fn(),
  files: vi.fn(),
  markWatched: vi.fn(),
  list: vi.fn(),
  openExternal: vi.fn(),
  settings: vi.fn()
}))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    app: { openExternal: m.openExternal },
    vnReading: { overview: m.overview },
    vnCapture: { list: m.captures, get: m.capture, save: m.saveCapture },
    japanese: {
      coverage: async () => null,
      coverageScanStatus: m.coverageStatus,
      prepDeckStatus: async () => ({ running: false }),
      analyzeText: m.analyze
    },
    vnExplore: {
      discover: m.discover,
      tags: m.tags,
      edition: m.edition,
      refreshReleases: m.refreshReleases,
      saveEdition: m.saveEdition
    },
    journeys: {
      detail: m.journey,
      logViewing: m.logViewing,
      saveStep: m.saveStep,
      reorder: m.reorder,
      targets: m.targets
    },
    wrestling: { files: m.files },
    video: { markWatched: m.markWatched },
    media: { list: m.list },
    settings: { all: m.settings }
  }
}))
vi.mock('../../src/renderer/src/components/reader/MiningPanel', () => ({
  default: (props: { mediaId: number; blockText: string; initialTerm: string }) => (
    <aside aria-label="Mining context">
      {props.mediaId}:{props.initialTerm}:{props.blockText}
    </aside>
  )
}))
function mount(path: string, route: string, page: ReactNode) {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={page} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}
beforeEach(() => {
  vi.clearAllMocks()
  m.coverageStatus.mockResolvedValue({ running: false })
  m.overview.mockResolvedValue({ title: 'Novel', nodes: [] })
  m.captures.mockResolvedValue([])
  m.capture.mockResolvedValue({
    id: 1,
    title: 'Session',
    body: '猫がいる',
    nodeId: null,
    capturedOn: '2026-09-23'
  })
  m.saveCapture.mockResolvedValue(1)
  m.discover.mockResolvedValue({ results: [], more: false })
  m.tags.mockResolvedValue([{ id: 'g1', name: 'Mystery' }])
  m.edition.mockResolvedValue({
    title: 'Novel',
    sourceId: 17,
    languages: ['ja'],
    platforms: ['win'],
    fetchedAt: '2026-09-23',
    releases: [],
    selected: {
      id: 'r1',
      title: 'Saved edition',
      released: '2025',
      languages: [],
      platforms: [],
      publishers: [],
      official: false,
      patch: true,
      completeness: 'partial'
    },
    notes: 'Old patch notes'
  })
  m.journey.mockResolvedValue({
    id: 1,
    title: 'Rivalry',
    description: 'A story',
    steps: 1,
    watched: 0,
    entries: [
      {
        id: 7,
        kind: 'segment',
        linkedId: null,
        title: 'Challenge',
        stepDate: '2012-02-20',
        notes: 'Context',
        sourceUrl: '',
        filePath: null,
        hasLocalFile: false,
        videos: [],
        viewings: []
      }
    ]
  })
  m.targets.mockResolvedValue([])
  m.files.mockResolvedValue({
    files: [{ id: 5, title: 'My event', duration: 120, watchedAt: null }]
  })
  m.list.mockResolvedValue([])
  m.settings.mockResolvedValue({})
})
describe('hobby-depth interactions', () => {
  it('saves pasted captures with their VN identity and date', async () => {
    const user = userEvent.setup()
    mount('/visual-novels/1/study', '/visual-novels/:id/study', <VnStudyPage />)
    await user.click(await screen.findByRole('button', { name: 'New capture' }))
    await user.type(screen.getByLabelText('Capture title'), 'First evening')
    await user.type(screen.getByLabelText('Captured text'), '猫がいる')
    await user.click(screen.getByRole('button', { name: 'Save capture' }))
    await waitFor(() =>
      expect(m.saveCapture).toHaveBeenCalledWith(
        1,
        null,
        expect.objectContaining({
          title: 'First evening',
          body: '猫がいる',
          nodeId: null,
          capturedOn: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
        })
      )
    )
  })
  it('keeps polling a study job already running when the page opens', async () => {
    m.coverageStatus.mockResolvedValueOnce({ running: true }).mockResolvedValue({ running: false })
    mount('/visual-novels/1/study', '/visual-novels/:id/study', <VnStudyPage />)
    const add = await screen.findByRole('button', { name: 'New capture' })
    await waitFor(() => expect(add).toBeDisabled())
    await waitFor(() => expect(add).toBeEnabled(), { timeout: 2000 })
    expect(m.coverageStatus).toHaveBeenCalledTimes(2)
  })
  it('passes the captured sentence and VN source into mining', async () => {
    m.captures.mockResolvedValue([
      { id: 1, title: 'Session', characters: 5, capturedOn: '2026-09-23', nodeId: null }
    ])
    const zero = { uniqueCount: 0, tokenCount: 0 }
    m.analyze.mockResolvedValue({
      paragraphs: [
        [
          { surface: '猫', base: '猫', tier: 'unknown' },
          { surface: 'がいる', base: '', tier: 'nonword' }
        ]
      ],
      stats: {
        tokenCount: 1,
        uniqueWords: 1,
        tiers: {
          known: zero,
          learning: zero,
          unstarted: zero,
          unknown: { uniqueCount: 1, tokenCount: 1 }
        }
      },
      unknown: []
    })
    const user = userEvent.setup()
    mount('/visual-novels/1/study', '/visual-novels/:id/study', <VnStudyPage />)
    await user.click(await screen.findByRole('button', { name: 'Analyze Session' }))
    await user.click(await screen.findByRole('button', { name: '猫' }))
    expect(screen.getByRole('complementary', { name: 'Mining context' })).toHaveTextContent(
      '1:猫:猫がいる'
    )
  })
  it('searches only on submit and sends selected tag filters with pagination', async () => {
    const user = userEvent.setup()
    mount('/visual-novels/discover', '/visual-novels/discover', <VnDiscoverPage />)
    expect(m.discover).not.toHaveBeenCalled()
    await user.selectOptions(screen.getByLabelText('Language'), 'ja')
    await user.type(screen.getByLabelText('Find tags'), 'Mystery')
    await user.click(screen.getByRole('button', { name: 'Search tags' }))
    await user.click(await screen.findByRole('button', { name: 'Add Mystery' }))
    await user.click(screen.getByRole('button', { name: 'Search VNDB' }))
    await waitFor(() =>
      expect(m.discover).toHaveBeenCalledWith(
        expect.objectContaining({ language: 'ja', tags: ['g1'], page: 1 })
      )
    )
    expect(await screen.findByText(/No titles match/)).toBeInTheDocument()
  })
  it('preserves a saved edition absent from the cache when notes are edited', async () => {
    const user = userEvent.setup()
    mount('/visual-novels/1/editions', '/visual-novels/:id/editions', <VnEditionPage />)
    expect(await screen.findByText(/absent from the latest cache/)).toBeInTheDocument()
    await user.clear(screen.getByLabelText('Installation, translation and patch notes'))
    await user.type(
      screen.getByLabelText('Installation, translation and patch notes'),
      'New patch notes'
    )
    await user.click(screen.getByRole('button', { name: 'Save edition and notes' }))
    await waitFor(() => expect(m.saveEdition).toHaveBeenCalledWith(1, 'r1', 'New patch notes'))
  })
  it('logs a dated viewing and allows keyboard lifting/cancelling of journey steps', async () => {
    const user = userEvent.setup()
    mount('/wrestling/journeys/1', '/wrestling/journeys/:id', <WrestlingJourneysPage />)
    await user.click(await screen.findByRole('button', { name: 'Mark watched' }))
    await user.type(screen.getByLabelText('Viewing notes'), 'Great callback')
    await user.click(screen.getByRole('button', { name: 'Save viewing' }))
    await waitFor(() =>
      expect(m.logViewing).toHaveBeenCalledWith(1, 7, expect.any(String), 'Great callback')
    )
    const handle = screen.getByRole('button', { name: 'Move item' })
    handle.focus()
    await user.keyboard(' ')
    await waitFor(() => expect(handle).toHaveAttribute('aria-pressed', 'true'))
    await user.keyboard('{Escape}')
    expect(m.reorder).not.toHaveBeenCalled()
  })
  it('marks wrestling files through the wrestling scope and shows read failures', async () => {
    const user = userEvent.setup()
    mount('/wrestling/event/1', '/wrestling/event/:id', <WrestlingFilesSection eventId={1} />)
    await user.click(await screen.findByRole('button', { name: 'Mark watched: My event' }))
    await waitFor(() =>
      expect(m.markWatched).toHaveBeenCalledWith({ kind: 'wrestling', fileId: 5 }, true)
    )
  })
  it('keeps guide completion separate across media types and follows renamed statuses', async () => {
    m.list.mockImplementation(async ({ mediaType }: { mediaType: string }) =>
      mediaType === 'visual_novel'
        ? [{ id: 2, title: 'Steins;Gate', mediaType, status: 'Finished it', coverPath: null }]
        : [{ id: 3, title: 'Steins;Gate', mediaType, status: 'Planned', coverPath: null }]
    )
    m.settings.mockResolvedValue({
      'visual_novel.statuses': JSON.stringify(['Reading', 'Finished it', 'Planned'])
    })
    mount('/guides/science-adventure', '/guides/:id', <MediaGuidesPage />)
    const links = await screen.findAllByRole('link', { name: 'Steins;Gate' })
    expect(links.map((l) => l.getAttribute('href')).sort()).toEqual([
      '/anime/3',
      '/visual-novels/2'
    ])
    expect(screen.getByText(/1\/4 core entries completed/)).toBeInTheDocument()
    await userEvent.setup().click(screen.getAllByRole('button', { name: 'Source' })[0])
    expect(m.openExternal).toHaveBeenCalledWith('https://www.kagaku-adv.com/titles/chaoshead_noah/')
  })
  it('offers retry instead of onboarding when wrestling files fail to load', async () => {
    m.files.mockRejectedValue(new Error('DB busy'))
    mount('/wrestling/event/1', '/wrestling/event/:id', <WrestlingFilesSection eventId={1} />)
    expect(await screen.findByRole('button', { name: 'Retry files' })).toBeInTheDocument()
    expect(screen.queryByText(/No files attached/)).not.toBeInTheDocument()
  })
})
