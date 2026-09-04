import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// The app's right-click menu — drawn in the renderer, not by the OS. Electron
// ships no context menu of its own (main/index.ts only adds cut/copy/paste for
// text), and an OS menu would be a bright system-themed rectangle in the middle
// of the Lain palette, so this reuses ActionMenu's look and its
// mousedown-outside + Escape idiom rather than useDialog.
//
// Positioning: `fixed` at the cursor, then clamped into the viewport after
// measuring, so a menu opened near the right or bottom edge folds back instead
// of being cut off. Fixed elements ignore ancestor `overflow-hidden`, and the
// app's zoom is setZoomFactor (coordinates stay CSS px), so no portal is needed.
//
// Escape is handled in the CAPTURE phase on purpose: the Lightbox's useDialog
// listens for Escape too, and without capture one press would close both.

export interface ContextMenuItem {
  label: string
  onSelect: () => void | Promise<void>
  disabled?: boolean
  danger?: boolean
}

export default function ContextMenu({
  x,
  y,
  items,
  onClose
}: {
  x: number
  y: number
  items: ContextMenuItem[]
  onClose: () => void
}): React.JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef(document.activeElement as HTMLElement | null)
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: x, top: y })

  // Measure, clamp, then focus the first enabled item so the menu is keyboard
  // usable from the moment it opens.
  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    const { width, height } = box.getBoundingClientRect()
    const pad = 4
    const left = Math.max(pad, Math.min(x, window.innerWidth - width - pad))
    const top = Math.max(pad, Math.min(y, window.innerHeight - height - pad))
    setPos({ left, top })
    box.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()
  }, [x, y])

  useEffect(() => {
    function itemButtons(): HTMLButtonElement[] {
      const box = boxRef.current
      if (!box) return []
      return Array.from(box.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
    }

    function onDown(e: MouseEvent): void {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape' || e.key === 'Tab') {
        // Capture phase + stopPropagation: an open menu owns Escape, so pressing
        // it inside the Lightbox closes the menu only.
        e.preventDefault()
        e.stopImmediatePropagation()
        onClose()
        return
      }
      const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
      if (!keys.includes(e.key)) return
      const buttons = itemButtons()
      if (buttons.length === 0) return
      e.preventDefault()
      e.stopPropagation()
      const at = buttons.indexOf(document.activeElement as HTMLButtonElement)
      const next =
        e.key === 'Home'
          ? 0
          : e.key === 'End'
            ? buttons.length - 1
            : e.key === 'ArrowDown'
              ? (at + 1 + buttons.length) % buttons.length
              : (at - 1 + buttons.length) % buttons.length
      buttons[next]?.focus()
    }
    // The app scrolls <main>, not the window, so scroll must be captured.
    function onLeave(): void {
      onClose()
    }

    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey, true)
    document.addEventListener('scroll', onLeave, true)
    window.addEventListener('resize', onLeave)
    window.addEventListener('blur', onLeave)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey, true)
      document.removeEventListener('scroll', onLeave, true)
      window.removeEventListener('resize', onLeave)
      window.removeEventListener('blur', onLeave)
      if (openerRef.current?.isConnected) openerRef.current.focus()
    }
  }, [onClose])

  return (
    <div
      ref={boxRef}
      role="menu"
      aria-label="Context menu"
      data-player-shortcuts="suspend"
      style={{ left: pos.left, top: pos.top }}
      className="fixed z-50 min-w-44 rounded-md border border-base-500 bg-base-800 p-1 shadow-lg"
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item) => (
        <button
          key={item.label}
          role="menuitem"
          className={`w-full rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-base-700 disabled:cursor-not-allowed disabled:opacity-50 ${
            item.danger ? 'text-red-400' : 'text-gray-200'
          }`}
          disabled={item.disabled}
          onClick={() => {
            onClose()
            void item.onSelect()
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
