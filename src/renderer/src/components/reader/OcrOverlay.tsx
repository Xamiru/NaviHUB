import { useEffect, useRef, useState } from 'react'
import type { MokuroBlock, MokuroPageOcr } from '@shared/types'

// Tappable text boxes from a mokuro OCR sidecar, laid over a rendered manga
// page. The overlay fills the page image's shrink-wrapped wrapper, so block
// positions are pure percentages of the source image size — correct under any
// fit mode without transform math. Only font size needs the real pixel scale.
export default function OcrOverlay({
  ocr,
  onBlockTap,
  onTextSelect
}: {
  ocr: MokuroPageOcr
  // Click on a block without dragging a selection.
  onBlockTap: (block: MokuroBlock) => void
  // Drag-selected text inside a block (escape hatch for bad tokenization).
  onTextSelect: (text: string) => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      if (el.clientWidth > 0) setScale(el.clientWidth / ocr.imgWidth)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ocr.imgWidth])

  function handleMouseUp(block: MokuroBlock, e: React.MouseEvent) {
    e.stopPropagation()
    const sel = window.getSelection()
    if (sel && !sel.isCollapsed && sel.toString().trim()) {
      onTextSelect(sel.toString().trim())
    } else {
      onBlockTap(block)
    }
  }

  return (
    <div ref={rootRef} className="absolute inset-0">
      {ocr.blocks.map((b, i) => {
        const [x1, y1, x2, y2] = b.box
        return (
          <div
            key={i}
            // stopPropagation on mousedown/click so page-turn zones under the
            // overlay never fire when interacting with text.
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => handleMouseUp(b, e)}
            className="absolute cursor-pointer select-text overflow-hidden rounded-sm
              text-transparent hover:bg-base-900/90 hover:text-white hover:ring-1 hover:ring-accent/60
              transition-colors"
            style={{
              left: `${(x1 / ocr.imgWidth) * 100}%`,
              top: `${(y1 / ocr.imgHeight) * 100}%`,
              width: `${((x2 - x1) / ocr.imgWidth) * 100}%`,
              height: `${((y2 - y1) / ocr.imgHeight) * 100}%`,
              writingMode: b.vertical ? 'vertical-rl' : 'horizontal-tb',
              textOrientation: b.vertical ? 'upright' : undefined,
              fontSize: `${Math.max(10, (b.fontSize ?? 16) * scale)}px`,
              lineHeight: 1.1
            }}
            title="Click to look up"
          >
            {/* mokuro lines are visual wraps of one utterance — join bare. */}
            {b.lines.join('')}
          </div>
        )
      })}
    </div>
  )
}
