import { useLayoutEffect, useRef, type RefObject } from 'react'

// FLIP ("First, Last, Invert, Play") for a data-driven list re-sort: rows keep
// their identity (React keys), so when their ORDER changes the DOM already
// holds each row's new position before paint. This hook remembers where each
// row was on the previous render, and in a layout effect translates every
// moved row back to its old spot with no transition, forces a reflow, then
// clears the transform WITH a transition — the row slides to its new home.
//
// Rows are found by `[data-flip-key]`; give each row a stable key attribute.
// `orderKey` is any value that changes when the order might have changed —
// re-measuring is cheap (one getBoundingClientRect per row) so over-firing
// is fine, but a value that never changes silently disables the animation.
//
// No library exists here for this (dnd-kit only animates during a drag), and
// this is the whole helper — keep it dependency-free.
export function useFlipList(containerRef: RefObject<HTMLElement>, orderKey: unknown, ms = 320): void {
  const positions = useRef<Map<string, number>>(new Map())

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const rows = Array.from(container.querySelectorAll<HTMLElement>('[data-flip-key]'))
    const prev = positions.current
    const next = new Map<string, number>()
    const moved: { el: HTMLElement; dy: number }[] = []
    for (const el of rows) {
      const key = el.dataset.flipKey!
      const top = el.getBoundingClientRect().top
      next.set(key, top)
      const before = prev.get(key)
      if (before != null && Math.abs(before - top) > 0.5) moved.push({ el, dy: before - top })
    }
    positions.current = next
    if (moved.length === 0) return

    // Invert.
    for (const { el, dy } of moved) {
      el.style.transition = 'none'
      el.style.transform = `translateY(${dy}px)`
    }
    // Force the browser to commit the inverted frame before we animate away
    // from it — reading offsetHeight is the standard reflow trigger.
    void container.offsetHeight
    // Play.
    for (const { el } of moved) {
      el.style.transition = `transform ${ms}ms cubic-bezier(0.22, 1, 0.36, 1)`
      el.style.transform = ''
    }
    const timer = window.setTimeout(() => {
      for (const { el } of moved) el.style.transition = ''
    }, ms)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderKey])
}
