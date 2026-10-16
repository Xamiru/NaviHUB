import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MediaDetail } from '@shared/types'
import ContextMenu, { type ContextMenuItem } from '@/components/ContextMenu'
import GlobalContextMenu from '@/components/GlobalContextMenu'
import TabbedRouter from '@/components/TabbedRouter'
import TabStrip from '@/components/TabStrip'
import { getTabsSnapshot, openTab, resetBrowserTabs } from '@/lib/browserTabs'
import { ANIME, MEDIA_CONFIGS, mediaRouteFor } from '@/lib/mediaConfig'
import { expectNoAxeViolations } from './accessibility'

const { mediaGet, logProgress } = vi.hoisted(() => ({ mediaGet: vi.fn(), logProgress: vi.fn() }))
vi.mock('@/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    media: {
      get: (...a: unknown[]) => mediaGet(...a),
      logProgress: (...a: unknown[]) => logProgress(...a)
    }
  }
}))
vi.mock('@/lib/themeFx', () => ({ celebrateProgress: vi.fn(), celebrateCompletion: vi.fn() }))

const lain = {
  id: 7,
  mediaType: 'anime',
  title: 'Serial Experiments Lain',
  status: ANIME.defaultStatuses[0],
  progress: 3,
  totalUnits: 13,
  coverPath: null
} as unknown as MediaDetail

function Where() {
  const { pathname, search } = useLocation()
  return <p data-testid="path">{pathname + search}</p>
}

function Page() {
  return (
    <main>
      <Where />
      <Link to="/games">Games</Link>
      <Link to="/anime/7">Lain</Link>
      <label>
        Note
        <input defaultValue="text" />
      </label>
    </main>
  )
}

function renderApp(extra?: React.ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <TabbedRouter>
        <TabStrip />
        <Routes>
          <Route path="*" element={<Page />} />
        </Routes>
        {extra}
        <GlobalContextMenu />
      </TabbedRouter>
    </QueryClientProvider>
  )
}

const rightClick = (el: Element) =>
  act(async () => {
    fireEvent.contextMenu(el, { clientX: 40, clientY: 50 })
  })
const path = () => screen.getByTestId('path').textContent
const tabCount = () => getTabsSnapshot().tabs.length

beforeEach(() => {
  resetBrowserTabs('/music')
  mediaGet.mockReset().mockResolvedValue(lain)
  logProgress.mockReset().mockResolvedValue({ title: lain.title, status: lain.status, startedRewatch: false, rewatchCount: 0 })
  window.getSelection()?.removeAllRanges()
})

describe('ContextMenu destination items', () => {
  function Harness({ items }: { items: ContextMenuItem[] }) {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Where />
        {open && <ContextMenu x={10} y={10} items={items} onClose={() => setOpen(false)} />}
      </>
    )
  }
  const items: ContextMenuItem[] = [
    { label: 'Go to games', to: '/games' },
    { label: 'Do it', separatorBefore: true, onSelect: vi.fn() }
  ]
  const renderMenu = () =>
    render(
      <TabbedRouter>
        <Harness items={items} />
      </TabbedRouter>
    )

  it('navigates here on a plain click and draws group separators', async () => {
    renderMenu()
    expect(screen.getByRole('separator')).toBeInTheDocument()
    await userEvent.setup().click(screen.getByRole('menuitem', { name: 'Go to games' }))
    expect(path()).toBe('/games')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('opens a background tab on Ctrl+click and middle-click', async () => {
    renderMenu()
    await act(async () => {
      fireEvent.click(screen.getByRole('menuitem', { name: 'Go to games' }), { ctrlKey: true })
    })
    expect(tabCount()).toBe(2)
    expect(path()).toBe('/music')
    renderMenu()
    await act(async () => {
      fireEvent(
        screen.getAllByRole('menuitem', { name: 'Go to games' })[0],
        new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 })
      )
    })
    expect(getTabsSnapshot().tabs.map((t) => t.history.location.pathname)).toEqual(['/music', '/games', '/games'])
  })
})

describe('GlobalContextMenu', () => {
  it('offers open, open in new tab and open-and-switch on any in-app link', async () => {
    const { container } = renderApp()
    await rightClick(screen.getByRole('link', { name: 'Games' }))
    const menu = screen.getByRole('menu')
    expect(
      [...menu.querySelectorAll('[role="menuitem"]')].map((b) => b.textContent)
    ).toEqual(['Open', 'Open in new tab', 'Open in new tab and switch'])
    await expectNoAxeViolations(container)
    await userEvent.setup().click(screen.getByRole('menuitem', { name: 'Open in new tab' }))
    expect(tabCount()).toBe(2)
    expect(path()).toBe('/music')

    await rightClick(screen.getByRole('link', { name: 'Games' }))
    await userEvent.setup().click(screen.getByRole('menuitem', { name: 'Open in new tab and switch' }))
    expect(tabCount()).toBe(3)
    expect(path()).toBe('/games')
  })

  it('adds the title actions to a link to a title, and logs from the menu', async () => {
    renderApp()
    await rightClick(screen.getByRole('link', { name: 'Lain' }))
    await screen.findByRole('menuitem', { name: 'Log one more episode' })
    expect(mediaGet).toHaveBeenCalledWith(7)
    expect(screen.getByRole('menuitem', { name: 'Open art' })).toBeInTheDocument()
    expect(screen.getAllByRole('separator')).toHaveLength(1)

    await userEvent.setup().click(screen.getByRole('menuitem', { name: 'Log one more episode' }))
    await waitFor(() => expect(logProgress).toHaveBeenCalledWith(7))

    await rightClick(screen.getByRole('link', { name: 'Lain' }))
    await userEvent.setup().click(await screen.findByRole('menuitem', { name: 'Open art' }))
    expect(path()).toBe('/anime/7?tab=art')
  })

  it('leaves component menus, text fields, selected text and open dialogs alone', async () => {
    renderApp(
      <div onContextMenu={(e) => e.preventDefault()}>
        <Link to="/claimed">Claimed</Link>
      </div>
    )
    await rightClick(screen.getByRole('link', { name: 'Claimed' }))
    await rightClick(screen.getByRole('textbox', { name: 'Note' }))
    expect(screen.queryByRole('menu')).toBeNull()

    const range = document.createRange()
    range.selectNodeContents(screen.getByRole('link', { name: 'Games' }))
    window.getSelection()?.addRange(range)
    await rightClick(screen.getByRole('link', { name: 'Games' }))
    expect(screen.queryByRole('menu')).toBeNull()
    window.getSelection()?.removeAllRanges()

    const modal = document.createElement('div')
    modal.setAttribute('aria-modal', 'true')
    document.body.appendChild(modal)
    await rightClick(screen.getByRole('link', { name: 'Games' }))
    expect(screen.queryByRole('menu')).toBeNull()
    modal.remove()
  })

  it('opens from the keyboard at the focused link and focuses the first item', async () => {
    renderApp()
    const link = screen.getByRole('link', { name: 'Games' })
    link.getBoundingClientRect = () => ({ left: 120, bottom: 80, top: 60, right: 200, width: 80, height: 20, x: 120, y: 60, toJSON: () => ({}) })
    link.focus()
    await act(async () => {
      fireEvent.keyDown(link, { key: 'ContextMenu' })
      fireEvent.contextMenu(link, { clientX: 999, clientY: 999 })
    })
    const menu = screen.getByRole('menu')
    expect(menu.style.left).toBe('120px')
    expect(menu.style.top).toBe('80px')
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Open' }))
  })
})

describe('tab strip menu', () => {
  it('closes other tabs and to the right, duplicates, and reopens', async () => {
    const user = userEvent.setup()
    await openTab('/a', { activate: false })
    await openTab('/b', { activate: false })
    renderApp()
    const paths = () => getTabsSnapshot().tabs.map((t) => t.history.location.pathname)
    const activeTabButton = () =>
      screen.getAllByRole('button').find((b) => b.getAttribute('aria-current') === 'true')!
    expect(paths()).toEqual(['/music', '/b', '/a'])

    await rightClick(activeTabButton())
    await user.click(screen.getByRole('menuitem', { name: 'Close tabs to the right' }))
    expect(paths()).toEqual(['/music'])

    await act(async () => {
      await openTab('/c', { activate: false })
    })
    await rightClick(activeTabButton())
    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }))
    expect(paths()).toEqual(['/music', '/music', '/c'])

    await rightClick(activeTabButton())
    await user.click(screen.getByRole('menuitem', { name: 'Close other tabs' }))
    expect(paths()).toEqual(['/music'])

    await act(async () => {
      await openTab('/d', { activate: false })
    })
    await rightClick(activeTabButton())
    await user.click(screen.getByRole('menuitem', { name: 'Reopen closed tab' }))
    expect(paths()).toEqual(['/music', '/music', '/d'])
  })
})

describe('mediaRouteFor', () => {
  it('recognises only bare detail routes', () => {
    for (const cfg of MEDIA_CONFIGS) expect(mediaRouteFor(`${cfg.basePath}/42`)).toEqual({ cfg, id: 42 })
    expect(mediaRouteFor('/anime/seasonal')).toBeNull()
    expect(mediaRouteFor('/anime/7/edit')).toBeNull()
    expect(mediaRouteFor('/manga/7/read/3')).toBeNull()
    expect(mediaRouteFor('/music/albums/7')).toBeNull()
  })
})
