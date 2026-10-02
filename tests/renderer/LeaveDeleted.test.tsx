import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HashRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { beforeEach, expect, it } from 'vitest'
import BackButton from '@/components/BackButton'
import { historyIndex, useHistoryTrail, useLeaveDeleted } from '@/lib/navState'

let go: ReturnType<typeof useNavigate>
let leave: ReturnType<typeof useLeaveDeleted>

function Shell() {
  useHistoryTrail()
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

function renderApp() {
  render(
    <HashRouter>
      <Routes>
        <Route path="*" element={<Shell />} />
      </Routes>
    </HashRouter>
  )
}

const path = () => screen.getByTestId('path').textContent
async function visit(...paths: string[]) {
  for (const p of paths) await act(async () => go(p))
}
// jsdom applies history.go asynchronously.
const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 20)))

beforeEach(() => {
  window.history.replaceState(null, '', '/#/')
})

it('goes back past the deleted page instead of stacking a duplicate parent', async () => {
  renderApp()
  await visit('/music', '/music/artists/1', '/music/albums/2')
  const before = historyIndex()

  await act(async () => leave((p) => p === '/music/albums/2', '/music/artists/1'))
  await settle()
  expect(path()).toBe('/music/artists/1')
  expect(historyIndex()).toBe(before - 1)
})

it('skips every page that no longer exists, then falls back when nothing is left', async () => {
  renderApp()
  await visit('/music/artists/1', '/music/albums/2')
  await act(async () =>
    leave((p) => p === '/music/albums/2' || p === '/music/artists/1' || p === '/', '/music')
  )
  await settle()
  expect(path()).toBe('/music')
})

it('Back on the first page of a session goes to its fallback', async () => {
  const user = userEvent.setup()
  window.history.replaceState(null, '', '/#/music/albums/5')
  renderApp()
  expect(historyIndex()).toBe(0)
  await user.click(screen.getByRole('button', { name: /Back/ }))
  expect(path()).toBe('/music')
})
