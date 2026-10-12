import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Lightbox from '@/components/Lightbox'

const images = [
  { url: 'navimg://a.jpg', alt: 'First' },
  { url: 'navimg://b.jpg', alt: 'Second' }
]

describe('Lightbox zoom and caption', () => {
  it('toggles actual size with Z and the 1:1 button, and Escape leaves zoom before closing', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Lightbox
        images={images}
        index={0}
        onIndexChange={vi.fn()}
        onClose={onClose}
        caption={(i) => <span>Caption {i + 1}</span>}
      />
    )
    expect(screen.getByText('Caption 1')).toBeInTheDocument()
    const zoom = screen.getByRole('button', { name: 'Actual size' })
    expect(zoom).toHaveAttribute('aria-pressed', 'false')

    await user.keyboard('z')
    expect(zoom).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('img')).toHaveClass('max-w-none')

    await user.keyboard('{Escape}')
    expect(zoom).toHaveAttribute('aria-pressed', 'false')
    expect(onClose).not.toHaveBeenCalled()

    await user.click(zoom)
    expect(zoom).toHaveAttribute('aria-pressed', 'true')
    fireEvent.doubleClick(screen.getByRole('img'))
    expect(zoom).toHaveAttribute('aria-pressed', 'false')

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('leaves zoom when the image changes', () => {
    const { rerender } = render(
      <Lightbox images={images} index={0} onIndexChange={vi.fn()} onClose={vi.fn()} />
    )
    fireEvent.doubleClick(screen.getByRole('img'))
    expect(screen.getByRole('button', { name: 'Actual size' })).toHaveAttribute('aria-pressed', 'true')
    rerender(<Lightbox images={images} index={1} onIndexChange={vi.fn()} onClose={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Actual size' })).toHaveAttribute('aria-pressed', 'false')
  })
})
