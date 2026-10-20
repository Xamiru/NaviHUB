import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/hooks')>()
  return { ...actual, useSettings: () => ({ data: {} }) }
})
vi.mock('@/components/GameSessionIndicator', () => ({ default: () => null }))
vi.mock('@/components/TasksIndicator', () => ({ default: () => null }))

import TabbedRouter from '@/components/TabbedRouter'
import TabStrip from '@/components/TabStrip'
import Topbar from '@/components/Topbar'
import { getTabsSnapshot, resetBrowserTabs } from '@/lib/browserTabs'

describe('Topbar navigation', () => {
  it('exposes a scroll control when contextual destinations overflow', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter
        initialEntries={['/japanese']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Topbar />
      </MemoryRouter>
    )
    const nav = screen.getByRole('navigation', { name: 'Japanese navigation' })
    Object.defineProperty(nav, 'clientWidth', { configurable: true, value: 200 })
    Object.defineProperty(nav, 'scrollWidth', { configurable: true, value: 900 })
    const scrollBy = vi.fn()
    Object.defineProperty(nav, 'scrollBy', { configurable: true, value: scrollBy })
    fireEvent.resize(window)
    await user.click(screen.getByRole('button', { name: 'Show more navigation links' }))
    expect(scrollBy).toHaveBeenCalledWith({ left: 240, behavior: 'smooth' })
  })

  it('clears the search box when navigation leaves the results page', async () => {
    const user = userEvent.setup()
    function BackFromSearch() {
      const navigate = useNavigate()
      return (
        <button type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      )
    }
    render(
      <MemoryRouter
        initialEntries={['/anime', '/search?q=lain']}
        initialIndex={1}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Topbar />
        <BackFromSearch />
      </MemoryRouter>
    )
    const box = screen.getByRole('textbox', { name: 'Search library' })
    expect(box).toHaveValue('lain')
    await user.click(screen.getByRole('button', { name: 'Go back' }))
    expect(box).toHaveValue('')
  })

  it('offers a New tab button with one tab and hands it to the tab strip after', async () => {
    const user = userEvent.setup()
    resetBrowserTabs('/anime')
    render(
      <TabbedRouter>
        <TabStrip />
        <Topbar />
      </TabbedRouter>
    )
    expect(screen.queryByRole('navigation', { name: 'Open tabs' })).toBeNull()
    await user.click(screen.getByRole('button', { name: 'New tab' }))
    expect(getTabsSnapshot().tabs).toHaveLength(2)
    const strip = screen.getByRole('navigation', { name: 'Open tabs' })
    // Exactly one New tab button on screen: the strip's, not the Topbar's.
    const buttons = screen.getAllByRole('button', { name: 'New tab' })
    expect(buttons).toHaveLength(1)
    expect(strip).toContainElement(buttons[0])
  })
})
