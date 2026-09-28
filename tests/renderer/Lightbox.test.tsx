import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Lightbox from '@/components/Lightbox'

const images = [
  { url: 'navimg://a.jpg', alt: 'First' },
  { url: 'navimg://b.jpg', alt: 'Second' }
]

function renderLightbox(onClose = vi.fn()): ReturnType<typeof vi.fn> {
  render(<Lightbox images={images} index={0} onIndexChange={vi.fn()} onClose={onClose} />)
  return onClose
}

describe('Lightbox mouse dismissal', () => {
  it('closes on a click beside the image but not on the image', () => {
    const onClose = renderLightbox()
    fireEvent.mouseDown(screen.getByRole('img'))
    expect(onClose).not.toHaveBeenCalled()
    fireEvent.mouseDown(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes on the mouse Back button', () => {
    const onClose = renderLightbox()
    fireEvent.mouseUp(screen.getByRole('img'), { button: 3 })
    expect(onClose).toHaveBeenCalledOnce()
  })
})
