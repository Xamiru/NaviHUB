import { useRef } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import RouteFocus from '@/components/RouteFocus'

vi.mock('@/lib/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/hooks')>()
  return { ...actual, useSettings: () => ({ data: {} }) }
})

import Sidebar from '@/components/Sidebar'

function NavigationFixture() {
  const mainRef = useRef<HTMLElement>(null)
  return (
    <>
      <Link to="/music">Music</Link>
      <main ref={mainRef} tabIndex={-1}>
        <RouteFocus mainRef={mainRef} />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/music" element={<h1>Music library</h1>} />
        </Routes>
      </main>
    </>
  )
}

describe('route focus', () => {
  it('moves focus to the destination heading after client-side navigation', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <NavigationFixture />
      </MemoryRouter>
    )
    await user.click(screen.getByRole('link', { name: 'Music' }))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Music library' })).toHaveFocus())
  })

  it('focuses the destination after closing the compact navigation drawer', async () => {
    const user = userEvent.setup()
    function Shell() {
      const mainRef = useRef<HTMLElement>(null)
      return (
        <>
          <Sidebar />
          <main ref={mainRef} tabIndex={-1}>
            <RouteFocus mainRef={mainRef} />
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/music" element={<h1>Music library</h1>} />
            </Routes>
          </main>
        </>
      )
    }
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Shell />
      </MemoryRouter>
    )
    await user.click(screen.getByRole('button', { name: 'Library' }))
    await user.click(within(screen.getByRole('dialog', { name: 'Library' })).getByRole('link', { name: 'Music' }))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Music library' })).toHaveFocus())
  })
})
