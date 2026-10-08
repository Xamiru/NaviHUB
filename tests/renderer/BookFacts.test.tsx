import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import BookFacts from '@/components/BookFacts'
import { api } from '@/lib/api'
import type { BookEdition, MediaDetail } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    books: {
      edition: vi.fn(),
      editions: vi.fn(),
      chooseEdition: vi.fn(),
      clearEdition: vi.fn()
    }
  }
}))

const PAPERBACK: BookEdition = {
  id: 900,
  title: 'Dune',
  format: 'Paperback',
  readingFormat: 'Physical',
  pages: 896,
  releaseDate: '2005-08-02',
  isbn13: '9780441013593',
  isbn10: null,
  audioSeconds: null,
  publisher: 'Ace',
  language: 'English',
  coverUrl: null
}

function book(overrides: Partial<MediaDetail> = {}): MediaDetail {
  return {
    id: 7,
    mediaType: 'book',
    title: 'Dune',
    externalSource: 'hardcover',
    externalId: '312460',
    metadata: {
      series: { name: 'Dune', position: 1, details: '1', count: 6 },
      bookCategory: 'Book',
      literaryType: 'Fiction',
      hcReaders: 40000,
      audioSeconds: 79200
    },
    cast: [
      {
        creditId: 1,
        person: { id: 3, name: 'Frank Herbert' },
        character: null,
        role: 'writer',
        language: null,
        roleNote: null
      }
    ],
    ...overrides
  } as unknown as MediaDetail
}

function renderFacts(m: MediaDetail) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const view = render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <aside aria-label="Facts">
          <BookFacts m={m} />
        </aside>
      </MemoryRouter>
    </QueryClientProvider>
  )
  return view.container
}

afterEach(() => vi.clearAllMocks())

describe('BookFacts', () => {
  it('shows the author, series position, kind, readers and audiobook length', async () => {
    vi.mocked(api.books.edition).mockResolvedValue(null)
    const container = renderFacts(book())
    expect(screen.getByRole('link', { name: 'Frank Herbert' }).getAttribute('href')).toContain('/people/3?role=writer')
    expect(screen.getByText('Book 1 of 6 · Dune')).toBeTruthy()
    expect(screen.getByText('Book · Fiction')).toBeTruthy()
    expect(screen.getByText((40000).toLocaleString())).toBeTruthy()
    expect(screen.getByText('22 h 0 min')).toBeTruthy()
    expect(await screen.findByRole('button', { name: 'Choose edition…' })).toBeTruthy()
    await expectNoAxeViolations(container)
  })

  it('chooses an edition from the picker', async () => {
    const user = userEvent.setup()
    vi.mocked(api.books.edition).mockResolvedValue(null)
    vi.mocked(api.books.editions).mockResolvedValue([PAPERBACK])
    vi.mocked(api.books.chooseEdition).mockResolvedValue({ edition: PAPERBACK, chosenAt: '2026-10-09' })
    renderFacts(book())

    await user.click(await screen.findByRole('button', { name: 'Choose edition…' }))
    const dialog = await screen.findByRole('dialog', { name: 'Choose your edition' })
    expect(await screen.findByText('Paperback · Ace · 896 pages · 2005 · English')).toBeTruthy()
    await expectNoAxeViolations(dialog)
    await user.click(screen.getByRole('button', { name: 'Use this' }))
    await waitFor(() => expect(api.books.chooseEdition).toHaveBeenCalledWith(7, 900))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('shows the chosen edition, and offers no picker for Open Library rows', async () => {
    vi.mocked(api.books.edition).mockResolvedValue({ edition: PAPERBACK, chosenAt: '2026-10-09' })
    renderFacts(book())
    expect(await screen.findByText('ISBN 9780441013593')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Change edition…' })).toBeTruthy()

    vi.mocked(api.books.edition).mockResolvedValue(null)
    const other = renderFacts(book({ externalSource: 'openlibrary', metadata: null }))
    await waitFor(() => expect(api.books.edition).toHaveBeenCalled())
    expect(other.textContent).not.toContain('My edition')
  })
})
