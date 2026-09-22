import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import OcrOverlay from '../../src/renderer/src/components/reader/OcrOverlay'
import { expectNoAxeViolations } from './accessibility'

describe('OcrOverlay', () => {
  it('lets a keyboard user open an OCR block', async () => {
    const onBlockTap = vi.fn()
    const { container } = render(
      <OcrOverlay
        ocr={{
          imgWidth: 1000,
          imgHeight: 1500,
          blocks: [
            { box: [10, 20, 300, 180], lines: ['猫です'], vertical: false, fontSize: null }
          ]
        }}
        onBlockTap={onBlockTap}
        onTextSelect={vi.fn()}
      />
    )
    const user = userEvent.setup()
    const block = screen.getByRole('button', { name: 'Look up 猫です' })

    block.focus()
    await user.keyboard('{Enter}')

    expect(onBlockTap).toHaveBeenCalledWith(
      expect.objectContaining({ lines: ['猫です'] })
    )
    await expectNoAxeViolations(container)
  })
})
