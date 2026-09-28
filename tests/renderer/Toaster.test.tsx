import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Toaster from '@/components/Toaster'
import { dismissToast, getToasts, toast } from '@/lib/toast'

afterEach(() => {
  for (const item of getToasts()) dismissToast(item.id)
  vi.useRealTimers()
  delete document.documentElement.dataset.theme
})

describe('Toaster', () => {
  it('announces errors assertively and provides an explicit close action', async () => {
    toast('Database unavailable', 'error')
    render(<Toaster />)

    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive')
    await userEvent.click(
      screen.getByRole('button', { name: 'Close notification: Database unavailable' })
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('pauses automatic dismissal while hovered or focused', () => {
    vi.useFakeTimers()
    toast('Saved', 'success')
    render(<Toaster />)
    const notice = screen.getByRole('status')
    const close = screen.getByRole('button', { name: 'Close notification: Saved' })

    fireEvent.mouseEnter(notice)
    act(() => vi.advanceTimersByTime(7_000))
    expect(notice).toBeInTheDocument()
    fireEvent.mouseLeave(notice)
    fireEvent.focus(close)
    act(() => vi.advanceTimersByTime(7_000))
    expect(notice).toBeInTheDocument()
    fireEvent.blur(close, { relatedTarget: null })
    act(() => vi.advanceTimersByTime(6_000))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('brings Twin Peaks warnings from the Log Lady without hiding the message', () => {
    document.documentElement.dataset.theme = 'twin-peaks'
    vi.useFakeTimers()
    toast('The music folder is almost full', 'warning')
    render(<Toaster />)
    act(() => vi.advanceTimersByTime(1_000))
    const notice = screen.getByRole('status')
    expect(notice).toHaveTextContent('My log has something to tell you.')
    expect(notice).toHaveTextContent('The music folder is almost full')
  })

  it.each([
    ['lain', 'NAVI / MESSAGE'],
    ['metal-gear', 'COMPLETE'],
    ['miku', 'Library'],
    ['twin-peaks', ''],
    ['seinfeld', ''],
    ['berserk', ''],
    ['one-piece', 'Puru puru puru'],
    ['jojo', '']
  ])('frames the %s toast without hiding the message or its controls', (theme, frame) => {
    document.documentElement.dataset.theme = theme
    vi.useFakeTimers()
    toast('Settings saved', 'success')
    render(<Toaster />)
    act(() => vi.advanceTimersByTime(1_000))
    const notice = screen.getByRole('status')
    expect(notice).toHaveClass(`theme-toast-${theme}`)
    expect(notice).toHaveTextContent('Settings saved')
    if (frame) expect(notice).toHaveTextContent(frame)
    expect(screen.getByRole('button', { name: 'Close notification: Settings saved' })).toBeInTheDocument()
  })
})
