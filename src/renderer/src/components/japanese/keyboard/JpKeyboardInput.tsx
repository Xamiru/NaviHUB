import { RefObject, useRef, useState } from 'react'
import JpKeyboardPanel, { JpKeyboardBridge } from './JpKeyboardPanel'

// A drop-in replacement for `<input className="input">` at Japanese-typing
// sites: same controlled contract, plus an あ toggle that opens the on-screen
// keyboard below. Physical typing is untouched — the panel only ever inserts
// at the caret through onChange, so the page's state/debounce/Enter flows keep
// working exactly as before.

export default function JpKeyboardInput({
  value,
  onChange,
  onEnter,
  placeholder,
  className = '',
  wrapClassName = '',
  autoFocus,
  inputRef
}: {
  value: string
  onChange: (next: string) => void
  onEnter?: () => void
  placeholder?: string
  className?: string
  wrapClassName?: string // layout classes for the positioning wrapper (flex-1…)
  autoFocus?: boolean
  inputRef?: RefObject<HTMLInputElement | null>
}) {
  const [open, setOpen] = useState(false)
  const innerRef = useRef<HTMLInputElement | null>(null)
  // Physical Enter/Escape must consult the panel's composition buffer first —
  // Enter with uncommitted kana commits it (never submits the stale value),
  // Escape clears the buffer before it closes the panel (real-IME order).
  const bridgeRef = useRef<JpKeyboardBridge | null>(null)

  const setRefs = (el: HTMLInputElement | null) => {
    innerRef.current = el
    if (inputRef) (inputRef as { current: HTMLInputElement | null }).current = el
  }

  // Splice at the caret and restore it after the controlled re-render (which
  // would otherwise send it to the end).
  const insertAtCaret = (text: string) => {
    const el = innerRef.current
    if (!el) {
      onChange(value + text)
      return
    }
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? start
    onChange(value.slice(0, start) + text + value.slice(end))
    requestAnimationFrame(() => {
      const pos = start + text.length
      el.setSelectionRange(pos, pos)
    })
  }

  // The panel's ⌫ once its own buffer is empty: delete the selection, or the
  // character before the caret.
  const deleteAtCaret = () => {
    const el = innerRef.current
    if (!el) {
      onChange(value.slice(0, -1))
      return
    }
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? start
    const from = start === end ? Math.max(0, start - 1) : start
    if (from === end) return
    onChange(value.slice(0, from) + value.slice(end))
    requestAnimationFrame(() => el.setSelectionRange(from, from))
  }

  return (
    <div className={`relative ${wrapClassName}`}>
      <input
        ref={setRefs}
        className={`input pr-10 ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && open) {
            // Clear the composition first, close the keyboard second — and
            // always BEFORE any page Escape cascade fires.
            e.stopPropagation()
            if (!bridgeRef.current?.consumeEscape()) setOpen(false)
          } else if (e.key === 'Enter') {
            // Uncommitted composition wins over submit: commit it instead of
            // letting the page act on a value that's missing the buffer.
            if (open && bridgeRef.current?.consumeEnter()) return
            onEnter?.()
          }
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="button"
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-sm ${
          open ? 'bg-accent/20 text-accent' : 'text-gray-500 hover:text-gray-300'
        }`}
        aria-label="Japanese keyboard"
        aria-pressed={open}
        onPointerDown={(e) => e.preventDefault()}
        onClick={() => {
          setOpen((o) => !o)
          innerRef.current?.focus()
        }}
      >
        あ
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2">
          <JpKeyboardPanel
            onCommit={insertAtCaret}
            onEnter={onEnter}
            onBackspaceEmpty={deleteAtCaret}
            onClose={() => setOpen(false)}
            bridge={bridgeRef}
          />
        </div>
      )}
    </div>
  )
}
