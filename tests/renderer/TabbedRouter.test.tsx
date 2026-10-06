import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { beforeEach, expect, it } from 'vitest'
import ConfirmHost from '@/components/ConfirmHost'
import TabbedRouter from '@/components/TabbedRouter'
import TabStrip from '@/components/TabStrip'
import {
  activeTab,
  getTabsSnapshot,
  resetBrowserTabs,
  useEditLeaveGuard,
  usePageKey,
  useTabLeaveGuard
} from '@/lib/browserTabs'
import { usePersistedState } from '@/lib/navState'
import { expectNoAxeViolations } from './accessibility'

function Page({ guarded = false }: { guarded?: boolean }) {
  const { pathname } = useLocation()
  const [persisted, setPersisted] = usePersistedState('filter', 'all')
  const [local, setLocal] = useState(0)
  useTabLeaveGuard(guarded, 'run')
  return (
    <main>
      <h1>Page {pathname}</h1>
      <p data-testid="path">{pathname}</p>
      <button onClick={() => setPersisted('liked')}>Filter: {persisted}</button>
      <button onClick={() => setLocal((n) => n + 1)}>Local: {local}</button>
      <Link to="/games">Games</Link>
    </main>
  )
}

// Keyed the way App keys its routed subtree.
function KeyedPage({ guarded }: { guarded: boolean }) {
  return <Page key={usePageKey()} guarded={guarded} />
}

function renderTabs({ guarded = false } = {}) {
  return render(
    <TabbedRouter>
      <TabStrip />
      <Routes>
        <Route path="*" element={<KeyedPage guarded={guarded} />} />
      </Routes>
      <ConfirmHost />
    </TabbedRouter>
  )
}

const key = (code: string, mods: Partial<KeyboardEventInit> = {}) =>
  act(async () => {
    fireEvent.keyDown(document.body, { code, ctrlKey: true, ...mods })
  })
const path = () => screen.getByTestId('path').textContent
const tabCount = () => getTabsSnapshot().tabs.length

beforeEach(() => {
  resetBrowserTabs('/music')
})

it('keeps each tab on its own page and restores persisted state on return', async () => {
  const user = userEvent.setup()
  renderTabs()
  await user.click(screen.getByRole('button', { name: 'Filter: all' }))
  await key('KeyT')
  expect(tabCount()).toBe(2)
  expect(path()).toBe('/')
  expect(screen.getByRole('button', { name: 'Filter: all' })).toBeInTheDocument()

  await key('Digit1')
  expect(path()).toBe('/music')
  expect(screen.getByRole('button', { name: 'Filter: liked' })).toBeInTheDocument()
})

it('never shares component state between two tabs on the same route', async () => {
  const user = userEvent.setup()
  resetBrowserTabs('/')
  renderTabs()
  await user.click(screen.getByRole('button', { name: 'Local: 0' }))
  expect(screen.getByRole('button', { name: 'Local: 1' })).toBeInTheDocument()
  await key('KeyT')
  expect(path()).toBe('/')
  expect(screen.getByRole('button', { name: 'Local: 0' })).toBeInTheDocument()
})

it('opens Ctrl+clicked and middle-clicked links in background tabs', async () => {
  renderTabs()
  await act(async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Games' }), { ctrlKey: true })
  })
  expect(tabCount()).toBe(2)
  expect(path()).toBe('/music')

  await act(async () => {
    fireEvent(
      screen.getByRole('link', { name: 'Games' }),
      new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 })
    )
  })
  expect(getTabsSnapshot().tabs.map((t) => t.history.location.pathname)).toEqual([
    '/music',
    '/games',
    '/games'
  ])
  expect(screen.getByRole('navigation', { name: 'Open tabs' })).toBeInTheDocument()
})

it('closes with Ctrl+W, keeps the last tab, and reopens with Ctrl+Shift+T', async () => {
  renderTabs()
  await key('KeyW')
  expect(tabCount()).toBe(1)

  await key('KeyT')
  await key('KeyW')
  expect(tabCount()).toBe(1)
  expect(path()).toBe('/music')
  await key('KeyT', { shiftKey: true })
  expect(tabCount()).toBe(2)
  expect(path()).toBe('/')
})

it('ignores tab shortcuts while a modal dialog is open', async () => {
  renderTabs()
  const modal = document.createElement('div')
  modal.setAttribute('aria-modal', 'true')
  document.body.appendChild(modal)
  await key('KeyT')
  expect(tabCount()).toBe(1)
  modal.remove()
})

it('goes back and forward in the current tab with Alt+arrows and the mouse side buttons', async () => {
  renderTabs()
  await act(async () => activeTab().history.push('/music/albums/2'))
  await key('ArrowLeft', { ctrlKey: false, altKey: true })
  expect(path()).toBe('/music')
  await act(async () => {
    fireEvent.mouseUp(document.body, { button: 4 })
  })
  expect(path()).toBe('/music/albums/2')
  await act(async () => {
    fireEvent.mouseUp(document.body, { button: 3 })
  })
  expect(path()).toBe('/music')
})

it('asks before leaving a tab with progress in it', async () => {
  const user = userEvent.setup()
  renderTabs({ guarded: true })
  await key('KeyT')
  expect(screen.getByText('Leave this tab? Progress in this round will be lost.')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Cancel' }))
  expect(path()).toBe('/music')
  expect(tabCount()).toBe(1)

  await key('KeyT')
  await user.click(screen.getByRole('button', { name: 'Leave' }))
  expect(path()).toBe('/')
})

function FormPage() {
  const [title, setTitle] = useState('Loaded title')
  useEditLeaveGuard({ title }, true)
  return (
    <label>
      Title
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
  )
}

it('guards an edit form only once its draft differs from what the user started with', async () => {
  const user = userEvent.setup()
  render(
    <TabbedRouter>
      <Routes>
        <Route path="*" element={<FormPage />} />
      </Routes>
      <ConfirmHost />
    </TabbedRouter>
  )
  await user.click(screen.getByRole('textbox', { name: 'Title' }))
  await key('KeyT')
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(tabCount()).toBe(2)

  await key('Digit1')
  await user.type(screen.getByRole('textbox', { name: 'Title' }), '!')
  await key('Digit2')
  expect(screen.getByText('Leave this tab? Unsaved changes will be lost.')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Cancel' }))
})

it('labels the tab strip accessibly', async () => {
  const { container } = renderTabs()
  await key('KeyT')
  const strip = screen.getByRole('navigation', { name: 'Open tabs' })
  expect(screen.getByRole('button', { name: 'New tab' })).toBeInTheDocument()
  expect(strip.querySelector('[aria-current="true"]')).not.toBeNull()
  await expectNoAxeViolations(container)
})
