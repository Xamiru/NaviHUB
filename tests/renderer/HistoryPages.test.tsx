import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { CitationProvider, QuoteBlock } from '@/components/history/Citations'
import HistoryTimeline from '@/components/history/HistoryTimeline'
import type { HistoryArticleView, HistoryTimelineItem } from '@shared/types'
import type { HistorySource, Quote } from '@shared/history/schema'
import { expectNoAxeViolations } from './accessibility'

const apiMock = vi.hoisted(() => ({
  history: {
    article: vi.fn(),
    setMark: vi.fn(async () => ({ read: '2026-10-12 10:00:00', favorite: false })),
    saveNote: vi.fn(),
    imageStatus: vi.fn(async () => ({ running: false, done: 0, total: 0 })),
    archiveJobs: vi.fn(async () => []),
    sources: vi.fn(async () => []),
    search: vi.fn(async () => []),
    saveUserEntity: vi.fn(),
    userEntity: vi.fn(),
    removeUserEntity: vi.fn(),
    attachFile: vi.fn(),
    downloadSuggestion: vi.fn(),
    linkMedia: vi.fn(),
    unlinkMedia: vi.fn()
  },
  search: { global: vi.fn() },
  app: { openExternal: vi.fn() }
}))

vi.mock('@/lib/api', () => ({ api: apiMock }))
vi.mock('@/lib/player', () => ({ usePlayerControls: () => ({ playQueue: vi.fn() }) }))

const source: HistorySource = {
  v: 1,
  kind: 'source',
  id: 'book-a',
  type: 'book',
  title: 'A Fixture History',
  lang: 'en',
  contributors: [{ name: 'A. Historian', role: 'author' }],
  publisher: 'Fixture Press',
  date: '2008'
}

const quote = (id: string, text: string, lang = 'en'): Quote => ({
  id,
  text,
  lang,
  cite: { source: 'book-a', loc: { page: '155' } },
  provenance: { via: 'local-copy', at: '2026-10-12' }
})

function withQuery(ui: React.ReactNode, path = '/'): ReturnType<typeof render> {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

beforeAll(() => {
  // Give the timeline a real width so it lays out lanes and ticks.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(private cb: ResizeObserverCallback) {}
      observe(): void {
        this.cb([{ contentRect: { width: 1000 } } as ResizeObserverEntry], this as unknown as ResizeObserver)
      }
      unobserve(): void {}
      disconnect(): void {}
    }
  )
  vi.stubGlobal('IntersectionObserver', class { observe(): void {} disconnect(): void {} })
})

beforeEach(() => vi.clearAllMocks())

describe('History citations', () => {
  it('renders quotes in their own script and opens the numbered citation', async () => {
    const user = userEvent.setup()
    const { container } = withQuery(
      <CitationProvider order={['book-a']} sources={{ 'book-a': source }}>
        <QuoteBlock quote={quote('q1', 'متن نمونه', 'fa')} />
      </CitationProvider>
    )
    const block = container.querySelector('blockquote')!
    expect(block.getAttribute('lang')).toBe('fa')
    expect(block.getAttribute('dir')).toBe('auto')
    await user.click(screen.getByRole('button', { name: /Citation 1: A Fixture History, p\. 155/ }))
    const region = screen.getByRole('region', { name: 'Citation 1' })
    expect(within(region).getByText(/Fixture Press/)).toBeTruthy()
    expect(within(region).getByText('Locator: p. 155')).toBeTruthy()
    expect(within(region).getByText(/Copied from your local copy on 2026-10-12/)).toBeTruthy()
    await expectNoAxeViolations(container)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('region', { name: 'Citation 1' })).toBeNull()
  })
})

const items: HistoryTimelineItem[] = [
  { ref: 'event:a', kind: 'event', title: 'Sample Revolution', native: null, typeLabel: 'Revolution', s: 1978, e: 1979.2, lane: 'iran', regions: ['iran'], prominence: 1, read: true, personal: false, image: null },
  { ref: 'event:b', kind: 'event', title: 'Faraway War', native: null, typeLabel: 'War', s: 1950.5, e: 1953.5, lane: 'east-asia', regions: ['east-asia'], prominence: 1, read: false, personal: false, image: null }
]

describe('History timeline', () => {
  it('selects events, zooms from the keyboard and offers the same data as a table', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { container } = withQuery(
      <HistoryTimeline items={items} periods={[]} range={{ min: 1950, max: 1980 }} selected={null} onSelect={onSelect} />
    )
    await user.click(screen.getByRole('button', { name: 'Sample Revolution, 1978 to 1979' }))
    expect(onSelect).toHaveBeenCalledWith('event:a')
    await expectNoAxeViolations(container)
    await user.click(screen.getByRole('button', { name: 'List' }))
    const table = screen.getByRole('table')
    expect(within(table).getByRole('link', { name: 'Faraway War' })).toBeTruthy()
    expect(within(table).getByText('✓ read')).toBeTruthy()
    await expectNoAxeViolations(container)
    await user.click(screen.getByRole('button', { name: 'Timeline' }))
    const track = screen.getByLabelText(/^Timeline \d{4} to \d{4}\./)
    const before = track.getAttribute('aria-label')
    track.focus()
    await user.keyboard('+')
    expect(track.getAttribute('aria-label')).not.toBe(before)
  })
})

function articleView(): HistoryArticleView {
  return {
    ref: 'event:sample',
    mapYear: null,
    rulers: [],
    successors: [],
    dependencies: [],
    events: [],
    themes: [],
    furtherReading: [],
    territory: [],
    entity: {
      v: 1,
      kind: 'event',
      id: 'sample',
      names: [
        { text: 'Sample Revolution', lang: 'en', role: 'primary' },
        { text: 'انقلاب نمونه', lang: 'fa', role: 'native' }
      ],
      researched: '2026-10-12',
      type: 'revolution',
      start: { alts: [{ value: { d: '1979-02-11' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }] },
      regions: ['iran'],
      prominence: 1,
      sections: [{ kind: 'overview', quotes: [quote('q1', 'The first quoted passage.')] }]
    },
    personal: false,
    refs: {},
    sources: { 'book-a': source },
    sourceOrder: ['book-a'],
    hero: null,
    interpretations: [
      {
        v: 1,
        kind: 'interpretation',
        id: 'sample-causes',
        about: ['event:sample'],
        topic: 'causes',
        researched: '2026-10-12',
        positions: [
          { id: 'a', category: 'scholarly', holders: [{ kind: 'scholar', name: 'A. Historian', discipline: 'historian' }], statements: [quote('s1', 'A scholarly view.')] },
          {
            id: 'b',
            category: 'fringe',
            holders: [{ kind: 'public', name: 'Various' }],
            statements: [quote('s2', 'A fringe view.')],
            reception: [quote('s3', 'How historians judged it.')]
          }
        ]
      }
    ],
    children: [],
    inbound: [],
    appearsIn: [],
    meanwhile: [],
    contemporaries: [],
    media: [],
    archive: [],
    mark: { read: null, favorite: false },
    note: null,
    solarHijri: true
  }
}

describe('History article page', () => {
  it('shows dates in both calendars, labelled interpretations and marks the page read', async () => {
    const { default: HistoryArticlePage } = await import('@/pages/HistoryArticlePage')
    apiMock.history.article.mockResolvedValue(articleView())
    const user = userEvent.setup()
    withQuery(
      <Routes>
        <Route path="/history/event/:id" element={<HistoryArticlePage kind="event" />} />
      </Routes>,
      '/history/event/sample'
    )
    expect(await screen.findByRole('heading', { level: 1, name: 'Sample Revolution' })).toBeTruthy()
    expect(screen.getAllByText(/22 Bahman 1357 SH/).length).toBeGreaterThan(0)
    expect(screen.getByText('Fringe')).toBeTruthy()
    expect(screen.getByText('How scholars received it')).toBeTruthy()
    expect(screen.getByText('The first quoted passage.')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Mark as read' }))
    await waitFor(() => expect(apiMock.history.setMark).toHaveBeenCalledWith('event:sample', 'read', true))
  })
})

describe('History editor', () => {
  it('refuses to save until the validator is satisfied and lists what is missing', async () => {
    const { default: HistoryEditPage } = await import('@/pages/HistoryEditPage')
    apiMock.history.saveUserEntity.mockResolvedValue({
      ok: false,
      id: null,
      issues: [{ severity: 'error', code: 'uncited', message: 'start.alts[0]: at least one citation is required' }]
    })
    const user = userEvent.setup()
    withQuery(
      <Routes>
        <Route path="/history/new/:kind" element={<HistoryEditPage />} />
      </Routes>,
      '/history/new/event'
    )
    await user.type(await screen.findByLabelText('Name'), 'My event')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    const alert = await screen.findByRole('alert')
    expect(within(alert).getByText(/at least one citation is required/)).toBeTruthy()
    expect(apiMock.history.saveUserEntity).toHaveBeenCalledWith(expect.objectContaining({ kind: 'event', names: [expect.objectContaining({ text: 'My event' })] }))
  })
})
