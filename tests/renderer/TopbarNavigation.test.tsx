import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/hooks')>()
  return { ...actual, useSettings: () => ({ data: {} }) }
})
vi.mock('@/components/GameSessionIndicator', () => ({ default: () => null }))
vi.mock('@/components/TasksIndicator', () => ({ default: () => null }))

import Topbar from '@/components/Topbar'

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
})
