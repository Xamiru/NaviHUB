import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { beforeEach, expect, it } from 'vitest'
import BackButton from '@/components/BackButton'
import TabbedRouter from '@/components/TabbedRouter'
import { activeTab, resetBrowserTabs } from '@/lib/browserTabs'
import { useLeaveDeleted, usePersistedState } from '@/lib/navState'

let go: ReturnType<typeof useNavigate>
let leave: ReturnType<typeof useLeaveDeleted>

function Shell() {
  go = useNavigate()
  leave = useLeaveDeleted()
  const { pathname } = useLocation()
  return (
    <>
      <p data-testid="path">{pathname}</p>
      <BackButton fallback="/music" />
    </>
  )
}

function FilteredList() {
  go = useNavigate()
  leave = useLeaveDeleted()
  const [search, setSearch] = usePersistedState('search', '')
  return <input aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
}

function renderApp() {
  render(
    <TabbedRouter>
      <Routes>
        <Route path="*" element={<Shell />} />
      </Routes>
    </TabbedRouter>
  )
}

const path = () => screen.getByTestId('path').textContent
async function visit(...paths: string[]) {
  for (const p of paths) await act(async () => go(p))
}

beforeEach(() => {
  resetBrowserTabs('/')
})

it('goes back past the deleted page instead of stacking a duplicate parent', async () => {
  renderApp()
  await visit('/music', '/music/artists/1', '/music/albums/2')
  const before = activeTab().history.index

  await act(async () => leave((p) => p === '/music/albums/2', '/music/artists/1'))
  expect(path()).toBe('/music/artists/1')
  expect(activeTab().history.index).toBe(before - 1)
})

it('skips every page that no longer exists, then falls back when nothing is left', async () => {
  renderApp()
  await visit('/music/artists/1', '/music/albums/2')
  await act(async () =>
    leave((p) => p === '/music/albums/2' || p === '/music/artists/1' || p === '/', '/music')
  )
  expect(path()).toBe('/music')
})

it('returns to the list with its filter intact, and Forward cannot reach the deleted page', async () => {
  const user = userEvent.setup()
  render(
    <TabbedRouter>
      <Routes>
        <Route path="/anime" element={<FilteredList />} />
        <Route path="*" element={<Shell />} />
      </Routes>
    </TabbedRouter>
  )
  await visit('/anime')
  await user.type(screen.getByRole('textbox', { name: 'Search' }), 'bleach')
  await visit('/anime/7', '/anime/7/edit', '/anime/7')

  await act(async () =>
    leave((p) => p === '/anime/7' || p.startsWith('/anime/7/'), '/anime')
  )
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('bleach')
  expect(activeTab().history.entries.map((e) => e.pathname)).toEqual(['/', '/anime'])
  expect(activeTab().history.canGoForward).toBe(false)
})

it('Back on the first page of a tab goes to its fallback', async () => {
  const user = userEvent.setup()
  resetBrowserTabs('/music/albums/5')
  renderApp()
  expect(activeTab().history.canGoBack).toBe(false)
  await user.click(screen.getByRole('button', { name: /Back/ }))
  expect(path()).toBe('/music')
})
