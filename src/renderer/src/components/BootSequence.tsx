import { useEffect, useState } from 'react'

const BOOT_KEY = 'ui.booted'

// Decided ONCE at module load with the flag set immediately: StrictMode
// remounts can't re-trigger it. sessionStorage survives in-app reloads but
// resets per app launch, so each launch of the Wired boots exactly once.
const shouldBoot = ((): boolean => {
  try {
    if (sessionStorage.getItem(BOOT_KEY)) return false
    sessionStorage.setItem(BOOT_KEY, '1')
  } catch {
    return false
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})()

// ASCII "..." on purpose — VT323 has no '…' glyph.
const SCRIPT = [
  'TACHIBANA GENERAL LABORATORIES',
  'COPLAND OS ENTERPRISE',
  'connecting to the Wired...',
  'Present day. Present time.'
].join('\n')
const CHAR_MS = 14
const HOLD_MS = 400
const FADE_MS = 200

type Phase = 'typing' | 'fading' | 'done'

// Fullscreen Copland OS boot splash. Sits at z-[70]: above all app UI (which
// tops out at z-50) but below the CRT scanline overlay (z 80/81), so the boot
// text flickers like everything else. The app mounts and loads data beneath
// it the whole time.
export default function BootSequence() {
  const [chars, setChars] = useState(0)
  const [phase, setPhase] = useState<Phase>(shouldBoot ? 'typing' : 'done')

  useEffect(() => {
    if (phase !== 'typing') return
    const iv = setInterval(() => setChars((c) => Math.min(c + 1, SCRIPT.length)), CHAR_MS)
    return () => clearInterval(iv)
  }, [phase])

  // Fully typed → hold, then fade, then unmount.
  useEffect(() => {
    if (phase !== 'typing' || chars < SCRIPT.length) return
    const t = setTimeout(() => setPhase('fading'), HOLD_MS)
    return () => clearTimeout(t)
  }, [phase, chars])

  useEffect(() => {
    if (phase !== 'fading') return
    const t = setTimeout(() => setPhase('done'), FADE_MS)
    return () => clearTimeout(t)
  }, [phase])

  // Any key/click skips. Capture phase so the skip event can't also reach app
  // shortcuts (CommandPalette listens on window). Keyed on phase so the
  // listeners detach the moment the boot ends — a lingering capture-phase
  // stopPropagation would swallow every later click and keypress.
  useEffect(() => {
    if (phase === 'done') return
    const skip = (e: Event): void => {
      e.stopPropagation()
      setPhase('done')
    }
    window.addEventListener('keydown', skip, true)
    window.addEventListener('pointerdown', skip, true)
    return () => {
      window.removeEventListener('keydown', skip, true)
      window.removeEventListener('pointerdown', skip, true)
    }
  }, [phase])

  if (phase === 'done') return null
  const lines = SCRIPT.slice(0, chars).split('\n')
  return (
    <div
      aria-hidden="true"
      className={`lain-crt fixed inset-0 z-[70] flex items-center justify-center bg-base-900 transition-opacity duration-200 ${
        phase === 'fading' ? 'opacity-0' : ''
      }`}
    >
      <div
        className="text-accent text-2xl leading-relaxed"
        style={{ textShadow: '0 0 8px rgb(var(--accent) / 0.5)' }}
      >
        {lines.map((l, i) => (
          <p key={i}>
            {l}
            {i === lines.length - 1 && <span className="lain-cursor">▮</span>}
          </p>
        ))}
      </div>
    </div>
  )
}
