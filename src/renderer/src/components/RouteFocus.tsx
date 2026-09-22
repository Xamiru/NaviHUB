import { useEffect, useRef, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'

// React Router changes the page without a browser document navigation. Move
// focus to the new heading once its lazy route has rendered, so the destination
// is announced after a sidebar, Topbar, or command-palette jump.
export default function RouteFocus({ mainRef }: { mainRef: RefObject<HTMLElement> }) {
  const location = useLocation()
  const previousKey = useRef(location.key)

  useEffect(() => {
    if (previousKey.current === location.key) return
    previousKey.current = location.key
    const main = mainRef.current
    if (!main) return

    const opener = document.activeElement
    let observer: MutationObserver | null = null
    let settled = false
    const mayMoveFocus = () => {
      const active = document.activeElement
      return (
        active === opener ||
        active === document.body ||
        (opener != null && !opener.isConnected && !main.contains(active))
      )
    }
    const focusDestination = () => {
      if (settled) return true
      if (!mayMoveFocus()) {
        observer?.disconnect()
        return false
      }
      const heading = main.querySelector<HTMLElement>('h1')
      if (!heading) return false
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
      settled = true
      observer?.disconnect()
      return true
    }

    const frame = requestAnimationFrame(() => {
      if (focusDestination()) return
      observer = new MutationObserver(focusDestination)
      observer.observe(main, { childList: true, subtree: true })
    })
    const timeout = window.setTimeout(() => {
      if (!settled && mayMoveFocus()) {
        main.focus({ preventScroll: true })
      }
      observer?.disconnect()
    }, 3000)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      observer?.disconnect()
    }
  }, [location.key, mainRef])

  return null
}
