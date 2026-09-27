import { useEffect, useState } from 'react'

export function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
}

// Visual-only effects over a message: screen readers always get the full text.
// Typed out character by character (Lain terminal lines).
export function TypedText({ text, speed = 22 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? text.length : 0))
  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(text.length)
      return
    }
    setShown(0)
    const id = window.setInterval(() => {
      setShown((n) => {
        if (n >= text.length) window.clearInterval(id)
        return Math.min(text.length, n + 1)
      })
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed])
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
    </>
  )
}

// Red Room speech: mirrored and reversed for a moment, then forwards.
export function ReversedText({ text, holdMs = 900 }: { text: string; holdMs?: number }) {
  const [forward, setForward] = useState(prefersReducedMotion)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setForward(true)
      return
    }
    setForward(false)
    const id = window.setTimeout(() => setForward(true), holdMs)
    return () => window.clearTimeout(id)
  }, [text, holdMs])
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={forward ? undefined : 'peaks-reversed'}>
        {forward ? text : [...text].reverse().join('')}
      </span>
    </>
  )
}
