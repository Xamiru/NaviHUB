import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

// Any api call the visible cards make resolves to an empty value.
vi.mock('@/lib/api', () => {
  const fn = (): unknown =>
    new Proxy(() => Promise.resolve(null), { get: (_t, key) => (key === 'then' ? undefined : fn()) })
  return { api: fn() }
})
vi.mock('@/lib/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/hooks')>()
  const settled = { isPending: false, isError: false, refetch: vi.fn() }
  return {
    ...actual,
    useSettings: () => ({ ...settled, data: {} }),
    useSecretStorage: () => ({
      ...settled,
      data: {
        available: true,
        backend: 'gnome_libsecret',
        protection: 'secure',
        configured: {},
        unreadable: []
      }
    })
  }
})

// Cards that load tool or dictionary state are not under test here.
vi.mock('@/pages/settings/LearningSettings', () => ({
  KnownBaselineSettings: () => null,
  DictionarySettings: () => null,
  EnglishDictionarySettings: () => null
}))
vi.mock('@/pages/settings/ToolSettings', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/pages/settings/ToolSettings')>()
  const none = () => null
  return {
    ...actual,
    YtdlpSettings: none,
    MusicDownloadSettings: none,
    VideoSubtitleToolsSettings: none,
    MokuroSettings: none,
    TorrentSettings: none
  }
})

import SettingsPage from '@/pages/SettingsPage'

let entry = 0
function renderAt(url: string) {
  // Page state is scoped to the history entry key; a fresh key per test keeps
  // one test's tab from leaking into the next.
  const [pathname, search = ''] = url.split('?')
  const location = { pathname, search: search ? `?${search}` : '', key: `test-${entry++}` }
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[location]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SettingsPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Settings search and tabs', () => {
  it('opens a pre-regroup ?tab= link on its new tab', async () => {
    renderAt('/settings?tab=data')
    expect(await screen.findByRole('tab', { name: 'Folders & storage', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Video library folder' })).toBeInTheDocument()
  })

  it('finds a card from another tab and reveals it', async () => {
    const user = userEvent.setup()
    renderAt('/settings')
    await user.type(screen.getByRole('searchbox', { name: 'Find a setting' }), 'tmdb')
    const nav = screen.getByRole('navigation', { name: 'Settings' })
    await user.click(within(nav).getByRole('button', { name: /TMDB API key/ }))

    expect(await screen.findByRole('tab', { name: 'Accounts & keys', selected: true })).toBeInTheDocument()
    const card = screen.getByRole('heading', { name: 'TMDB API key' }).closest('section')!
    await waitFor(() => expect(card).toHaveClass('setting-flash'))
    expect(card).toHaveFocus()
    expect(screen.getByRole('searchbox', { name: 'Find a setting' })).toHaveValue('')
  })

  it('Enter opens the best match and an empty search says so', async () => {
    const user = userEvent.setup()
    renderAt('/settings')
    const box = screen.getByRole('searchbox', { name: 'Find a setting' })
    await user.type(box, 'qqqq')
    expect(screen.getByText('No matching settings.')).toBeInTheDocument()
    await user.clear(box)
    await user.type(box, 'dictionary{Enter}')
    expect(await screen.findByRole('tab', { name: 'Learning', selected: true })).toBeInTheDocument()
  })

  it('the AI card links to its key on Accounts & keys', async () => {
    const user = userEvent.setup()
    renderAt('/settings?tab=tools')
    expect(await screen.findByText('Gemini API key: not set')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Set key' }))
    expect(await screen.findByRole('tab', { name: 'Accounts & keys', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Gemini API key' })).toBeInTheDocument()
  })

  it('opens the collapsed status editors when search targets one', async () => {
    const user = userEvent.setup()
    renderAt('/settings')
    await user.type(screen.getByRole('searchbox', { name: 'Find a setting' }), 'anime statuses{Enter}')
    const heading = await screen.findByRole('heading', { name: 'Anime statuses' })
    await waitFor(() => expect(heading.closest('details')).toHaveAttribute('open'))
  })
})
