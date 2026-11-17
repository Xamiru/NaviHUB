import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import type { KindleImportPreview, KindleStatus } from '../../src/shared/types'
import KindlePage from '../../src/renderer/src/pages/KindlePage'
import KindleImportDialog from '../../src/renderer/src/components/kindle/KindleImportDialog'
import KindleSendDialog from '../../src/renderer/src/components/kindle/KindleSendDialog'
import ConfirmHost from '../../src/renderer/src/components/ConfirmHost'
import type { KindleSendPreview, KindleSendStatus, KindleUnfinishedSend } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const connected: KindleStatus = {
  device: {
    label: 'Amazon Kindle Paperwhite',
    transport: 'filesystem',
    location: '/run/user/1000/gvfs/mtp:host=Amazon_Kindle/Internal Storage',
    hasKoReader: true,
    freeBytes: 10 * 1024 ** 3,
    totalBytes: 16 * 1024 ** 3
  },
  checkedAt: '2026-10-29T10:00:00.000Z',
  books: [
    {
      key: 'a'.repeat(32),
      devicePath: 'documents/Dune.epub',
      title: 'Dune',
      authors: 'Frank Herbert',
      partialMd5: 'a'.repeat(32),
      percent: 0.42,
      status: 'reading',
      highlights: 3,
      readSeconds: 5400,
      mediaId: 7,
      mediaTitle: 'Dune',
      link: 'linked',
      suggestions: []
    },
    {
      key: 'b'.repeat(32),
      devicePath: 'documents/Downloads/Neuromancer.epub',
      title: 'Neuromancer',
      authors: null,
      partialMd5: 'b'.repeat(32),
      percent: 0.1,
      status: 'reading',
      highlights: 0,
      readSeconds: 0,
      mediaId: null,
      mediaTitle: null,
      link: null,
      suggestions: [{ mediaId: 9, title: 'Neuromancer', score: 1 }]
    }
  ],
  series: [
    {
      key: 'Berserk',
      name: 'Berserk',
      files: 40,
      lastChapter: 12,
      chaptersRead: 12,
      numbering: 'series',
      volumesRead: [1, 2, 3, 5],
      readSeconds: 3600,
      mediaId: 20,
      mediaTitle: 'Berserk',
      suggestions: []
    },
    {
      key: 'Shuumatsu no Valkyrie',
      name: 'Shuumatsu no Valkyrie',
      files: 3,
      lastChapter: null,
      chaptersRead: 0,
      numbering: 'series',
      volumesRead: [],
      readSeconds: 0,
      mediaId: null,
      mediaTitle: null,
      suggestions: [{ mediaId: 21, title: 'Record of Ragnarok', score: 1 }]
    }
  ],
  lastImportAt: null,
  canUndoImport: false,
  error: null
}

const preview: KindleImportPreview = {
  scanId: 'scan-1',
  scannedAt: '2026-10-29T10:00:00.000Z',
  deviceLabel: 'Amazon Kindle Paperwhite',
  readingRange: { first: '2026-10-20', last: '2026-10-28' },
  books: [
    {
      mediaId: 7,
      title: 'Dune',
      kind: 'book',
      volumesRead: [],
      progress: { from: 0, to: 168, total: 400 },
      progressDefaultOn: true,
      chapterNumbering: null,
      status: { from: 'Plan to Read', to: 'Reading', reason: 'started' },
      statusDefaultOn: true,
      rereading: false,
      percent: 0.42,
      quotes: [
        { key: '7:x', kind: 'new', text: 'Fear is the mind-killer.', note: 'litany', locator: 'Book One' },
        { key: '7:y', kind: 'new', text: 'The spice must flow.', note: null, locator: null }
      ],
      skippedDeleted: 1,
      reading: { days: 3, seconds: 5400, firstDay: '2026-10-20', lastDay: '2026-10-28', credits: 2 }
    },
    {
      mediaId: 8,
      title: 'Hyperion',
      kind: 'book',
      volumesRead: [],
      progress: null,
      progressDefaultOn: true,
      chapterNumbering: null,
      status: { from: 'Reading', to: 'Dropped', reason: 'abandoned' },
      statusDefaultOn: false,
      rereading: false,
      percent: 0.05,
      quotes: [],
      skippedDeleted: 0,
      reading: null
    },
    {
      mediaId: 20,
      title: 'Berserk',
      kind: 'manga',
      volumesRead: [1, 2],
      progress: { from: 4, to: 12, total: null },
      progressDefaultOn: true,
      chapterNumbering: 'series',
      status: { from: 'Plan to Read', to: 'Reading', reason: 'started' },
      statusDefaultOn: true,
      rereading: false,
      percent: null,
      quotes: [],
      skippedDeleted: 0,
      reading: null
    },
    {
      mediaId: 22,
      title: '20th Century Boys',
      kind: 'manga',
      volumesRead: [],
      progress: { from: 0, to: 30, total: 249 },
      progressDefaultOn: false,
      chapterNumbering: 'per-volume',
      status: { from: 'Plan to Read', to: 'Reading', reason: 'started' },
      statusDefaultOn: false,
      rereading: false,
      percent: null,
      quotes: [],
      skippedDeleted: 0,
      reading: null
    }
  ],
  unmatched: [],
  words: [
    {
      key: 'en:lurch',
      kind: 'en',
      word: 'lurch',
      reading: null,
      meaning: 'move suddenly and unsteadily',
      context: 'dancing from side to side, he lurched across the yard.',
      book: 'Animal Farm',
      importable: true
    },
    {
      key: 'jp:珍語',
      kind: 'jp',
      word: '珍語',
      reading: null,
      meaning: null,
      context: null,
      book: 'Monster',
      importable: false
    }
  ],
  warnings: []
}

let current: KindleStatus
// Like the real check, it leaves its result as the status later reads return.
const check = vi.fn(async () => {
  current = connected
  return connected
})
const apply = vi.fn(async () => ({
  importId: 1,
  progressUpdated: 1,
  statusUpdated: 1,
  quotesAdded: 1,
  quotesUpdated: 0,
  readingDays: 3,
  checklistCredits: 2
}))
const link = vi.fn(async () => undefined)
const linkSeries = vi.fn(async () => undefined)
let sendPreview: KindleSendPreview
let unfinishedSends: KindleUnfinishedSend[] = []
const SENDING: KindleSendStatus = {
  running: true,
  total: 1,
  done: 0,
  current: 'Dune',
  sent: [],
  failed: [],
  stopped: false,
  finishedAt: null
}
const SENT: KindleSendStatus = { ...SENDING, running: false, done: 1, current: null, sent: ['Dune.epub'], finishedAt: '2026-11-17T10:00:00.000Z' }
const startSend = vi.fn(async () => SENDING)
const sendStatus = vi.fn(async () => SENT)
const resolveUnfinished = vi.fn(async () => 'removed' as const)
const makeBook = vi.fn(async () => ({ fileName: 'Japanese Graded Readings N3 2026-11-12.epub', bytes: 40960, madeAt: '2026-11-12T09:00:00.000Z' }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    kindle: {
      status: async () => current,
      check: () => check(),
      preview: async () => preview,
      apply: (...args: unknown[]) => apply(...(args as [])),
      link: (...args: unknown[]) => link(...(args as [])),
      unlink: async () => undefined,
      linkSeries: (...args: unknown[]) => linkSeries(...(args as [])),
      unlinkSeries: async () => undefined,
      makeBook: (...args: unknown[]) => makeBook(...(args as [])),
      sendPreview: async () => sendPreview,
      send: (...args: unknown[]) => startSend(...(args as [])),
      sendStatus: () => sendStatus(),
      unfinishedSends: async () => unfinishedSends,
      resolveUnfinished: (...args: unknown[]) => resolveUnfinished(...(args as [])),
      madeBooks: async () => [{ fileName: 'My Quotes 2026-11-11.epub', bytes: 20480, madeAt: '2026-11-11T09:00:00.000Z' }],
      revealMadeBook: async () => undefined,
      undoLastImport: async () => ({ restored: 0, kept: 0 })
    },
    settings: { all: async () => ({}), set: async () => undefined },
    files: { chooseFolder: async () => null },
    media: { list: async () => [] }
  }
}))

function wrap(ui: React.ReactNode) {
  return (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  current = { ...connected, device: null, books: [], series: [], checkedAt: null }
  check.mockClear()
  apply.mockClear()
  link.mockClear()
  linkSeries.mockClear()
  makeBook.mockClear()
  startSend.mockClear()
  sendStatus.mockClear()
  resolveUnfinished.mockClear()
  unfinishedSends = []
  sendPreview = {
    device: { label: 'Kindle Paperwhite', freeBytes: 2.5 * 1024 ** 3, totalBytes: 12 * 1024 ** 3 },
    files: [{ key: 'chapter:3', title: 'Dune', bytes: 2 * 1024 ** 2, deviceName: 'Dune.epub' }],
    freeAfter: 2.5 * 1024 ** 3 - 2 * 1024 ** 2,
    refusal: null
  }
})

it('shows where a send goes and the space left, then sends and reports', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  const { container } = render(
    wrap(<KindleSendDialog title="Dune" items={[{ kind: 'chapter', chapterId: 3 }]} onClose={onClose} />)
  )
  const dialog = await screen.findByRole('dialog', { name: 'Send Dune to the Kindle' })
  expect(await within(dialog).findByText(/documents\/NaviHUB\/Dune\.epub/)).toBeInTheDocument()
  expect(within(dialog).getByText(/2\.5 GB free, 2\.5 GB after/)).toBeInTheDocument()
  expect(within(dialog).getByText(/Nothing already on the Kindle is replaced/)).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await user.click(within(dialog).getByRole('button', { name: 'Send' }))
  expect(startSend).toHaveBeenCalledWith([{ kind: 'chapter', chapterId: 3 }])
  expect(await within(dialog).findByText('1 of 1 sent.', {}, { timeout: 3000 })).toBeInTheDocument()
  expect(within(dialog).getByText(/documents\/NaviHUB\/Dune\.epub/)).toBeInTheDocument()
  await user.click(within(dialog).getByRole('button', { name: 'Done' }))
  expect(onClose).toHaveBeenCalled()
})

it('offers no Send when the send cannot go ahead', async () => {
  sendPreview = { ...sendPreview, freeAfter: null, refusal: 'The Kindle would keep less than 1.2 GiB free.' }
  render(wrap(<KindleSendDialog title="Dune" items={[{ kind: 'chapter', chapterId: 3 }]} onClose={() => undefined} />))
  const dialog = await screen.findByRole('dialog')
  expect(await within(dialog).findByRole('alert')).toHaveTextContent(/keep less than/)
  expect(within(dialog).getByRole('button', { name: 'Send' })).toBeDisabled()
  expect(startSend).not.toHaveBeenCalled()
})

it('lists unfinished sends and cleans one up on request', async () => {
  const user = userEvent.setup()
  unfinishedSends = [
    { id: 4, title: 'Dune', devicePath: 'documents/NaviHUB/Dune.epub', bytes: 4096, createdAt: '2026-11-17 09:00:00' }
  ]
  render(
    wrap(
      <>
        <KindlePage />
        <ConfirmHost />
      </>
    )
  )
  const section = await screen.findByRole('region', { name: 'Unfinished sends' })
  await user.click(within(section).getByRole('button', { name: 'Check and clean up' }))
  // Nothing on the Kindle is touched before the user confirms the exact file.
  expect(resolveUnfinished).not.toHaveBeenCalled()
  const confirm = await screen.findByRole('dialog')
  expect(within(confirm).getByText(/documents\/NaviHUB\/Dune\.epub/)).toBeInTheDocument()
  await user.click(within(confirm).getByRole('button', { name: 'Check and clean up' }))
  expect(resolveUnfinished).toHaveBeenCalledWith(4)
})

it('makes a book on this computer and explains itself, with no Kindle connected', async () => {
  const user = userEvent.setup()
  const { container } = render(wrap(<KindlePage />))
  const section = await screen.findByRole('region', { name: 'Make a book for the Kindle' })
  expect(await within(section).findByText('My Quotes 2026-11-11.epub')).toBeInTheDocument()

  await user.selectOptions(within(section).getByRole('combobox', { name: 'Level' }), 'N3')
  await user.click(within(section).getByRole('button', { name: 'Make reading book' }))
  expect(makeBook).toHaveBeenCalledWith({ kind: 'jpReadings', level: 'N3' })

  await user.click(within(section).getByRole('checkbox', { name: 'Favorites only' }))
  await user.click(within(section).getByRole('button', { name: 'Make quote book' }))
  expect(makeBook).toHaveBeenLastCalledWith({ kind: 'quotes', grouping: 'source', favoritesOnly: true })

  const guide = screen.getByRole('region', { name: 'How the Kindle page works' })
  await user.click(within(guide).getByText('Manga'))
  expect(within(guide).getByText(/counted in order and offered unticked/)).toBeVisible()
  await expectNoAxeViolations(container)
})

it('reads nothing until Check Kindle, then lists linked and unlinked books', async () => {
  const user = userEvent.setup()
  const { container } = render(wrap(<KindlePage />))
  expect(await screen.findByText('Connect your Kindle')).toBeInTheDocument()
  expect(check).not.toHaveBeenCalled()
  expect(screen.queryByRole('button', { name: 'Import from Kindle…' })).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Check Kindle' }))
  expect(check).toHaveBeenCalledTimes(1)
  expect(await screen.findByRole('heading', { name: 'Amazon Kindle Paperwhite' })).toBeInTheDocument()
  expect(screen.getByText('10.0 GB of 16.0 GB')).toBeInTheDocument()

  const linkedSection = screen.getByRole('region', { name: 'Linked to your library' })
  expect(within(linkedSection).getByRole('link', { name: 'Dune' })).toHaveAttribute('href', '/books/7')
  expect(within(linkedSection).getByText(/Reading · 42% · 3 highlights · read 1 h 30 min/)).toBeInTheDocument()

  const manga = screen.getByRole('region', { name: 'Manga series' })
  expect(within(manga).getByText('Manga series (1 of 2 linked)')).toBeInTheDocument()
  expect(within(manga).getByRole('link', { name: 'Berserk' })).toHaveAttribute('href', '/manga/20')
  expect(within(manga).getByText(/40 files · read up to chapter 12 · read volumes 1-3, 5/)).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await user.click(within(manga).getByRole('button', { name: 'Link to Record of Ragnarok' }))
  expect(linkSeries).toHaveBeenCalledWith('Shuumatsu no Valkyrie', 21)
  const unlinkedSection = screen.getByRole('region', { name: 'Not linked' })
  await user.click(within(unlinkedSection).getByRole('button', { name: 'Link to Neuromancer' }))
  expect(link).toHaveBeenCalledWith('b'.repeat(32), 9)
})

it('previews an import with per-line choices and applies the selection', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  const { container } = render(wrap(<KindleImportDialog scanId="scan-1" onClose={onClose} />))
  const dialog = await screen.findByRole('dialog')
  expect(await within(dialog).findByText(/page 0 to 168 of 400/)).toBeInTheDocument()
  // Abandoned is offered unticked; everything else starts ticked.
  expect(within(dialog).getByRole('checkbox', { name: 'Status for Hyperion' })).not.toBeChecked()
  expect(within(dialog).getByRole('checkbox', { name: 'Status for Dune' })).toBeChecked()
  expect(within(dialog).getByText(/counts 2 days toward the checklist/)).toBeInTheDocument()
  expect(within(dialog).getByText(/1 highlight was deleted from Quotes/)).toBeInTheDocument()

  await user.click(within(dialog).getByText(/2 new and 0 updated highlights/))
  await user.click(within(dialog).getByRole('checkbox', { name: /Highlight: The spice must flow/ }))
  await expectNoAxeViolations(container)

  // Manga progress is chapters, with no total when the library has none.
  expect(within(dialog).getByText(/chapter 4 to 12/)).toBeInTheDocument()
  expect(within(dialog).getByText(/2 volume files are read on the Kindle/)).toBeInTheDocument()
  // A chapter counted across restarting volume numbers is offered unticked.
  expect(within(dialog).getByRole('checkbox', { name: 'Progress for 20th Century Boys' })).not.toBeChecked()
  expect(within(dialog).getByText(/counted in volume order/)).toBeInTheDocument()

  // Looked-up words: the importable one is ticked, the undefined one cannot be.
  await user.click(within(dialog).getByText('1 of 2 words ticked'))
  expect(within(dialog).getByRole('checkbox', { name: 'Word: lurch' })).toBeChecked()
  expect(within(dialog).getByText(/lurched across the yard/)).toBeInTheDocument()
  expect(within(dialog).queryByRole('checkbox', { name: 'Word: 珍語' })).not.toBeInTheDocument()
  expect(within(dialog).getByText(/No offline dictionary entry/)).toBeInTheDocument()
  // Typing a meaning makes it importable.
  await user.type(within(dialog).getByRole('textbox', { name: 'Meaning for 珍語' }), 'a rare word')
  expect(within(dialog).getByText('2 of 2 words ticked')).toBeInTheDocument()

  await user.click(within(dialog).getByRole('button', { name: 'Apply 8 changes' }))
  expect(apply).toHaveBeenCalledWith({
    scanId: 'scan-1',
    progress: [7, 20],
    status: [7, 20],
    quotes: ['7:x'],
    reading: [7],
    words: ['en:lurch', 'jp:珍語'],
    wordMeanings: { 'jp:珍語': 'a rare word' }
  })
  expect(onClose).toHaveBeenCalled()
})
