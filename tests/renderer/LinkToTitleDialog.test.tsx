import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MusicLinkOwnerCandidate, MusicLinkUsage } from '@shared/types'
import LinkToTitleDialog, { linkedMessage, type LinkSubject } from '@/components/music/LinkToTitleDialog'
import { expectNoAxeViolations } from './accessibility'

const m = vi.hoisted(() => ({
  usages: vi.fn(),
  searchOwners: vi.fn(),
  linkTracks: vi.fn(),
  create: vi.fn(async () => 1),
  remove: vi.fn(async () => undefined),
  labels: vi.fn(async () => ['OST', 'Opening']),
  mediaGet: vi.fn(),
  confirm: vi.fn(async () => true)
}))

vi.mock('@/lib/api', () => ({
  api: {
    musicLinks: {
      usages: m.usages,
      searchOwners: m.searchOwners,
      linkTracks: m.linkTracks,
      create: m.create,
      remove: m.remove,
      labels: m.labels
    },
    media: { get: m.mediaGet }
  }
}))
vi.mock('@/lib/confirm', () => ({ confirmDialog: m.confirm }))
// Search without waiting out the debounce.
vi.mock('@/lib/hooks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/hooks')>()),
  useDebouncedValue: <T,>(value: T) => value
}))

const anime: MusicLinkOwnerCandidate = {
  mediaId: 2,
  wrestlerId: null,
  mediaType: 'anime',
  title: 'Bocchi the Rock!',
  year: 2022,
  coverPath: null
}
const wrestler: MusicLinkOwnerCandidate = {
  mediaId: null,
  wrestlerId: 4,
  mediaType: null,
  title: 'Stone Cold',
  year: 1989,
  coverPath: null
}
const usage = (extra: Partial<MusicLinkUsage>): MusicLinkUsage => ({
  linkId: 1,
  kind: 'track',
  viaAlbum: false,
  label: '',
  mediaId: 1,
  wrestlerId: null,
  mediaType: 'game',
  ownerTitle: 'Persona 5',
  coverPath: null,
  ...extra
})

function renderDialog(subject: LinkSubject, onClose = vi.fn()) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <LinkToTitleDialog subject={subject} onClose={onClose} />
      </MemoryRouter>
    </QueryClientProvider>
  )
  return onClose
}

beforeEach(() => {
  vi.clearAllMocks()
  m.searchOwners.mockResolvedValue([anime, wrestler])
})

describe('linkedMessage', () => {
  it('reports new and existing links', () => {
    expect(linkedMessage('Bocchi', 'OST', 1, 0)).toBe('Linked to Bocchi as “OST”.')
    expect(linkedMessage('Bocchi', '', 3, 0)).toBe('Linked 3 songs to Bocchi.')
    expect(linkedMessage('Bocchi', 'OST', 2, 1)).toBe('Linked 2 songs to Bocchi as “OST”; 1 was already there.')
    expect(linkedMessage('Bocchi', 'OST', 0, 1)).toBe('Already linked to Bocchi as “OST”.')
    expect(linkedMessage('Bocchi', '', 0, 2)).toBe('All already linked to Bocchi.')
  })
})

describe('LinkToTitleDialog', () => {
  it('shows what one song is linked to and links it to an anime theme', async () => {
    m.usages.mockResolvedValue([
      usage({ linkId: 7, kind: 'album', viaAlbum: true, label: 'OST' }),
      usage({ linkId: 8, mediaId: null, wrestlerId: 4, mediaType: null, ownerTitle: 'Stone Cold', label: 'Entrance' })
    ])
    m.mediaGet.mockResolvedValue({ themes: [{ id: 30, slug: 'OP1', title: 'Seishun Complex' }] })
    m.linkTracks.mockResolvedValue({ added: 1, skipped: 0 })
    renderDialog({ kind: 'tracks', trackIds: [11], title: 'Seishun Complex' })

    expect(await screen.findByRole('heading', { name: 'Link “Seishun Complex” to a title' })).toBeInTheDocument()
    expect(m.usages).toHaveBeenCalledWith({ trackId: 11 })
    const linked = screen.getByRole('region', { name: 'Linked to' })
    expect(await within(linked).findByText('Game · OST · through its album')).toBeInTheDocument()
    expect(within(linked).getByRole('link', { name: 'Stone Cold' })).toHaveAttribute('href', '/wrestling/wrestler/4')
    // Only a direct link can be unlinked from here.
    expect(within(linked).getAllByRole('button', { name: /^Unlink/ })).toHaveLength(1)

    await userEvent.type(screen.getByRole('searchbox', { name: /Search your library/ }), 'stone')
    expect(await screen.findByRole('button', { name: /Stone Cold.*Linked/ })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Bocchi the Rock!/ }))
    expect(screen.getByText('Selected: Bocchi the Rock! (Anime)')).toBeInTheDocument()

    await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Full version of' }), '30')
    await userEvent.type(screen.getByRole('combobox', { name: /Label/ }), 'Opening')
    await userEvent.click(screen.getByRole('button', { name: 'Link' }))

    expect(m.linkTracks).toHaveBeenCalledWith({
      owner: { mediaId: 2 },
      trackIds: [11],
      label: 'Opening',
      themeSongId: 30
    })
    expect(await screen.findByRole('status')).toHaveTextContent('Linked to Bocchi the Rock! as “Opening”.')
    await expectNoAxeViolations(document.body)
  })

  it('unlinks a direct link after confirming', async () => {
    m.usages.mockResolvedValue([usage({ linkId: 8, label: 'Battle' })])
    renderDialog({ kind: 'tracks', trackIds: [11], title: 'Last Surprise' })
    await userEvent.click(await screen.findByRole('button', { name: 'Unlink from Persona 5 as “Battle”' }))
    expect(m.confirm).toHaveBeenCalled()
    expect(m.remove).toHaveBeenCalledWith(8)
  })

  it('links a selection of songs to a wrestler and reports the ones already linked', async () => {
    m.linkTracks.mockResolvedValue({ added: 2, skipped: 1 })
    renderDialog({ kind: 'tracks', trackIds: [1, 2, 3], title: '3 songs' })

    expect(screen.getByRole('heading', { name: 'Link 3 songs to a title' })).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Linked to' })).toBeNull()
    expect(m.usages).not.toHaveBeenCalled()

    await userEvent.type(screen.getByRole('searchbox', { name: /Search your library/ }), 'stone')
    await userEvent.click(await screen.findByRole('button', { name: /Stone Cold/ }))
    expect(screen.queryByRole('combobox', { name: 'Full version of' })).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'Link' }))

    expect(m.linkTracks).toHaveBeenCalledWith({ owner: { wrestlerId: 4 }, trackIds: [1, 2, 3], label: '', themeSongId: null })
    expect(await screen.findByRole('status')).toHaveTextContent('Linked 2 songs to Stone Cold; 1 was already there.')
  })

  it('links a whole album as an album link', async () => {
    m.usages.mockResolvedValue([])
    renderDialog({ kind: 'album', albumId: 5, title: 'Kessoku Band' })

    expect(await screen.findByText('Not linked to anything yet.')).toBeInTheDocument()
    expect(m.usages).toHaveBeenCalledWith({ albumId: 5 })
    await userEvent.type(screen.getByRole('searchbox', { name: /Search your library/ }), 'bocchi')
    await userEvent.click(await screen.findByRole('button', { name: /Bocchi the Rock!/ }))
    // A theme belongs to one track, never an album.
    expect(screen.queryByRole('combobox', { name: 'Full version of' })).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'Link' }))
    expect(m.create).toHaveBeenCalledWith({ owner: { mediaId: 2 }, kind: 'album', albumId: 5, label: '' })
  })
})
