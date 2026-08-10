import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayer } from '../lib/player'
import { playerShortcutsEnabled } from '../lib/playerShortcuts'

const KEYS = [' ', 'PageUp', 'PageDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const SEEK_STEP = 10 // seconds
const VOLUME_STEP = 0.05

// Headless: global keyboard transport for the music player. Space = play/pause,
// PageUp/PageDown = previous/next, ←/→ = seek, ↑/↓ = volume. Nothing fires
// until something is loaded in the player, so on a fresh launch these keys
// still scroll the page as usual.
export default function PlayerShortcuts() {
  const player = usePlayer()
  const { pathname } = useLocation()
  const enabled = playerShortcutsEnabled(pathname)

  // The context value is a fresh object every render (currentTime ticks ~4/s),
  // so read it through a ref and register the listener once — re-adding it on
  // every tick would also keep reshuffling its position in the window queue.
  const playerRef = useRef(player)
  playerRef.current = player

  useEffect(() => {
    if (!enabled) return
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
      // A capture-phase handler (the video track menu) may already have claimed it.
      if (e.defaultPrevented) return
      if (!KEYS.includes(e.key)) return
      if (isTypingTarget(e.target)) return
      // Space activates whatever has focus — a button, or the role="button"
      // rows in the queue panel and the art grids. Never steal it from them.
      if (e.key === ' ' && isActivatable(e.target)) return
      // An open dialog owns the keyboard (the lightbox walks images with ←/→).
      if (document.querySelector('[role="dialog"]')) return
      const p = playerRef.current
      if (!p.track) return

      e.preventDefault()
      switch (e.key) {
        case ' ':
          p.toggle()
          break
        case 'PageDown':
          p.next()
          break
        case 'PageUp':
          p.previous()
          break
        case 'ArrowRight':
          p.seek(Math.min(p.currentTime + SEEK_STEP, p.duration || p.currentTime))
          break
        case 'ArrowLeft':
          p.seek(Math.max(p.currentTime - SEEK_STEP, 0))
          break
        case 'ArrowUp':
          p.setVolume(stepVolume(p.volume, VOLUME_STEP))
          break
        case 'ArrowDown':
          p.setVolume(stepVolume(p.volume, -VOLUME_STEP))
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled])

  return null
}

// Rounded to whole percent — the value is persisted, and repeated steps would
// otherwise drift into 0.8500000000000001.
function stepVolume(v: number, by: number): number {
  return Math.min(Math.max(Math.round((v + by) * 100) / 100, 0), 1)
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  return (
    el.isContentEditable ||
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  )
}

function isActivatable(el: EventTarget | null): boolean {
  return el instanceof Element && el.closest('button, a[href], [role="button"]') !== null
}
