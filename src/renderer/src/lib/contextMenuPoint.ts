// Where a right-click menu opens. A mouse right-click opens it at the cursor;
// the Menu key or Shift+F10 fires the same `contextmenu` event on the focused
// element, with coordinates that need not be anywhere near it, so a menu opened
// from the keyboard is placed just below that element instead.

let keyboardMenuAt = -Infinity
let tracking = false

// Recognising a keyboard-opened menu needs the key that opened it. Called once by
// GlobalContextMenu; idempotent.
export function installContextMenuKeyTracking(): void {
  if (tracking || typeof window === 'undefined') return
  tracking = true
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'ContextMenu' || (e.key === 'F10' && e.shiftKey)) keyboardMenuAt = performance.now()
    },
    true
  )
  // A mouse right-click presses a button first, so a Menu key press that opened
  // no menu (a text field's native one, a spot with no menu) cannot misplace it.
  window.addEventListener(
    'mousedown',
    () => {
      keyboardMenuAt = -Infinity
    },
    true
  )
}

interface MenuEvent {
  clientX: number
  clientY: number
  currentTarget: EventTarget | null
  target: EventTarget | null
}

export function contextMenuPoint(e: MenuEvent): { x: number; y: number } {
  const fromKeyboard =
    performance.now() - keyboardMenuAt < 1000 || (e.clientX === 0 && e.clientY === 0)
  if (fromKeyboard) {
    keyboardMenuAt = -Infinity
    const el = e.currentTarget instanceof Element ? e.currentTarget : e.target instanceof Element ? e.target : null
    if (el) {
      const rect = el.getBoundingClientRect()
      return { x: rect.left, y: rect.bottom }
    }
  }
  return { x: e.clientX, y: e.clientY }
}
