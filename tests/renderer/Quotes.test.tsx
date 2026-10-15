import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import type { SavedQuote } from '../../src/shared/types'
import QuotesPage from '../../src/renderer/src/pages/QuotesPage'
import QuoteDialog from '../../src/renderer/src/components/quotes/QuoteDialog'
import { expectNoAxeViolations } from './accessibility'

const base: SavedQuote = {
  key: 'q-1',
  id: 1,
  origin: 'manual',
  text: '',
  furigana: null,
  translation: null,
  locator: null,
  note: null,
  favorite: false,
  themes: [],
  mediaId: null,
  mediaType: null,
  sourceTitle: null,
  coverPath: null,
  backgroundPath: null,
  speakerKind: null,
  speakerId: null,
  speakerName: null,
  speakerImagePath: null,
  createdAt: '2026-10-14 10:00:00'
}

const quotes: SavedQuote[] = [
  {
    ...base,
    text: 'Struggle.',
    mediaId: 7,
    mediaType: 'manga',
    sourceTitle: 'Berserk',
    speakerKind: 'character',
    speakerId: 3,
    speakerName: 'Guts',
    themes: ['Resolve']
  },
  { ...base, key: 'q-2', id: 2, text: 'El Psy Kongroo.', mediaId: 8, mediaType: 'anime', sourceTitle: 'Steins;Gate' },
  {
    ...base,
    key: 'vn-4',
    id: null,
    origin: 'vnNotebook',
    text: 'Without love, it cannot be seen.',
    mediaId: 9,
    mediaType: 'visual_novel',
    sourceTitle: 'Umineko'
  }
]

const save = vi.fn(async () => 11)
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    quotes: {
      list: async () => quotes,
      save: (...args: unknown[]) => save(...(args as [])),
      setFavorite: async () => undefined,
      remove: async () => undefined
    },
    japanese: {
      tokenize: async () => [
        { surface: '東京', reading: 'とうきょう' },
        { surface: 'へ', reading: 'へ' },
        { surface: '行く', reading: 'いく' }
      ]
    },
    search: { global: async () => ({ media: [], people: [], characters: [], companies: [] }) }
  }
}))

function wrap(ui: React.ReactNode) {
  return (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

it('shows the wall with shelves and themes, and steps through focus mode', async () => {
  const user = userEvent.setup()
  const { container } = render(wrap(<QuotesPage />))
  expect((await screen.findAllByText('Struggle.')).length).toBeGreaterThan(0)
  expect(screen.getAllByRole('link', { name: 'Guts' })[0]).toHaveAttribute('href', '/characters/3')
  expect(screen.getByText('VN notebook')).toBeInTheDocument()
  // The read-only notebook quote offers no edit or delete.
  expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(2)
  const shelves = screen.getByRole('group', { name: 'Show' })
  expect(within(shelves).getAllByRole('button').map((b) => b.textContent)).toEqual([
    'All 3',
    'Manga 1',
    'Anime 1',
    'Visual Novel 1'
  ])
  await expectNoAxeViolations(container)

  await user.click(screen.getByRole('button', { name: /^Resolve/ }))
  expect(screen.queryByRole('button', { name: /Open quote: El Psy/ })).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /^Resolve/ }))

  await user.click(screen.getByRole('button', { name: /Open quote: El Psy/ }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByText('El Psy Kongroo.')).toBeInTheDocument()
  await user.keyboard('{ArrowRight}')
  expect(within(dialog).getByText('Without love, it cannot be seen.')).toBeInTheDocument()
  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

it('generates editable readings for Japanese text and saves the markup', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  const { container } = render(
    wrap(<QuoteDialog seed={{ origin: 'video', locator: 'Episode 1 · 3:12' }} onClose={onClose} />)
  )
  await user.type(screen.getByRole('textbox', { name: 'Quote' }), '東京へ行く')
  const readings = await screen.findByRole('textbox', { name: 'Readings' })
  await vi.waitFor(() => expect(readings).toHaveValue('東京[とうきょう]へ行[い]く'))
  expect(container.querySelector('ruby')).not.toBeNull()
  await expectNoAxeViolations(container)

  await user.click(screen.getByRole('button', { name: 'Save quote' }))
  await vi.waitFor(() => expect(onClose).toHaveBeenCalled())
  expect(save).toHaveBeenCalledWith(
    expect.objectContaining({
      text: '東京へ行く',
      furigana: '東京[とうきょう]へ行[い]く',
      locator: 'Episode 1 · 3:12',
      origin: 'video'
    }),
    null
  )
})

it('refuses readings that no longer match the text', async () => {
  const user = userEvent.setup()
  render(wrap(<QuoteDialog onClose={() => undefined} />))
  await user.type(screen.getByRole('textbox', { name: 'Quote' }), '東京へ行く')
  const readings = await screen.findByRole('textbox', { name: 'Readings' })
  await vi.waitFor(() => expect(readings).toHaveValue('東京[とうきょう]へ行[い]く'))
  await user.clear(readings)
  await user.type(readings, '大阪[[おおさか]')
  save.mockClear()
  await user.click(screen.getByRole('button', { name: 'Save quote' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('no longer match')
  expect(save).not.toHaveBeenCalled()
})

it('keeps the saved speaker name when the linked character no longer exists', async () => {
  const user = userEvent.setup()
  const orphan: SavedQuote = {
    ...base,
    text: 'Struggle.',
    speakerKind: 'character',
    speakerId: null, // a re-import pruned the character row
    speakerName: 'Guts'
  }
  save.mockClear()
  render(wrap(<QuoteDialog quote={orphan} onClose={() => undefined} />))
  expect(screen.getByRole('button', { name: 'Other' })).toHaveAttribute('aria-pressed', 'true')
  const text = screen.getByRole('textbox', { name: 'Quote' })
  await user.clear(text)
  await user.type(text, 'Struggle on.')
  await user.click(screen.getByRole('button', { name: 'Save quote' }))
  await vi.waitFor(() => expect(save).toHaveBeenCalled())
  expect(save).toHaveBeenCalledWith(
    expect.objectContaining({ text: 'Struggle on.', speakerKind: null, speakerName: 'Guts' }),
    1
  )
})
