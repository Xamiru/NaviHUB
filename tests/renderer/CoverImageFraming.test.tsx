import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CoverImage from '@/components/CoverImage'

// Full-body character art (Bangumi's game characters) is anchored to the top
// so a portrait slot shows the face; portraits, covers and contained images
// keep their centred framing.
function loadAs(img: HTMLElement, width: number, height: number): void {
  Object.defineProperty(img, 'naturalWidth', { configurable: true, value: width })
  Object.defineProperty(img, 'naturalHeight', { configurable: true, value: height })
  fireEvent.load(img)
}

describe('CoverImage framing', () => {
  it('anchors full-body art to the top', () => {
    render(<CoverImage path="media/ryuji.jpg" alt="Ryuji" className="w-[72px] h-24" />)
    const img = screen.getByRole('img', { name: 'Ryuji' })
    loadAs(img, 331, 868)
    expect(img).toHaveClass('object-top')
  })

  it('keeps ordinary portraits and contained images centred', () => {
    render(<CoverImage path="media/portrait.jpg" alt="Portrait" />)
    const portrait = screen.getByRole('img', { name: 'Portrait' })
    loadAs(portrait, 230, 345)
    expect(portrait).not.toHaveClass('object-top')

    render(<CoverImage path="media/logo.png" alt="Logo" className="object-contain" />)
    const logo = screen.getByRole('img', { name: 'Logo' })
    loadAs(logo, 100, 400)
    expect(logo).not.toHaveClass('object-top')
  })
})
