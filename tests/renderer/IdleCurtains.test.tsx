import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { IDLE_CURTAIN_MS, IdleCurtains, IdleIslands, IdleTbc } from '@/components/theme/ThemeFx'

vi.mock('@/lib/api', () => ({ api: {} }))

afterEach(() => vi.useRealTimers())

describe('Twin Peaks idle curtains', () => {
  it('close after the idle period and open on input without passing that input on', () => {
    vi.useFakeTimers()
    const pressed = vi.fn()
    render(
      <>
        <IdleCurtains />
        <button onKeyDown={pressed}>Continue</button>
      </>
    )
    const curtains = screen.getByTestId('idle-curtains')
    act(() => vi.advanceTimersByTime(IDLE_CURTAIN_MS - 1000))
    fireEvent.pointerMove(window)
    act(() => vi.advanceTimersByTime(IDLE_CURTAIN_MS - 1000))
    expect(curtains).not.toHaveClass('idle-curtains-closed')

    act(() => vi.advanceTimersByTime(1000))
    expect(curtains).toHaveClass('idle-curtains-closed')

    fireEvent.keyDown(screen.getByRole('button', { name: 'Continue' }), { key: 'Enter' })
    expect(pressed).not.toHaveBeenCalled()
    expect(curtains).not.toHaveClass('idle-curtains-closed')

    fireEvent.keyDown(screen.getByRole('button', { name: 'Continue' }), { key: 'Enter' })
    expect(pressed).toHaveBeenCalledTimes(1)
  })
})

describe('One Piece and JoJo idle covers', () => {
  it('cut to the named islands and the To Be Continued freeze after the idle period', () => {
    vi.useFakeTimers()
    render(
      <>
        <IdleIslands />
        <IdleTbc />
      </>
    )
    expect(screen.getByTestId('idle-islands')).not.toHaveTextContent('Whisky Peak')
    act(() => vi.advanceTimersByTime(IDLE_CURTAIN_MS))
    expect(screen.getByTestId('idle-islands')).toHaveClass('idle-islands-closed')
    expect(screen.getByTestId('idle-islands')).toHaveTextContent('Whisky Peak')
    expect(screen.getByTestId('idle-tbc')).toHaveClass('idle-tbc-closed')
    fireEvent.pointerDown(window)
    expect(screen.getByTestId('idle-tbc')).not.toHaveClass('idle-tbc-closed')
  })
})
