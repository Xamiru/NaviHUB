import { useEffect, useState } from 'react'
import { parseAppTheme, parseAppThemeVariant, type AppTheme } from '@shared/appTheme'
import { FX_ART } from '../lib/themeFxArt'

const BOOT_KEY = 'ui.booted'

// Decided ONCE at module load with the flag set immediately: StrictMode
// remounts can't re-trigger it. sessionStorage survives in-app reloads but
// resets per app launch, so each launch boots exactly once.
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
const SCRIPTS = {
  lain: [
    'TACHIBANA GENERAL LABORATORIES',
    'COPLAND OS ENTERPRISE',
    'connecting to the Wired...',
    'Present day. Present time.',
    'Close the world, open the nExt.'
  ].join('\n'),
  'metal-gear': [
    'NAVI TACTICAL ARCHIVE',
    'LOCAL DATABASE LINK',
    'MISSION INDEX ONLINE',
    'operations ready.'
  ].join('\n'),
  miku: ['NaviHUB', 'Your library. Your own world.', 'Leave a little room for possibility.'].join('\n'),
  'twin-peaks': ['NaviHUB', 'Your personal archive.', 'Some stories stay with you.'].join('\n'),
  seinfeld: ['A show about nothing.', 'A library about everything.'].join('\n'),
  // Berserk, One Piece and JoJo have no typed script: their launches are images.
  berserk: '',
  'one-piece': '',
  jojo: ''
} satisfies Record<AppTheme, string>
const CHAR_MS = 14
const HOLD_MS = 400
const FADE_MS = 200
const CURTAIN_MS = 900
const BERSERK_MS = 1800
// How long each image launch holds before its hard cut to Home.
const IMAGE_BOOT_MS: Partial<Record<AppTheme, number>> = { berserk: BERSERK_MS, 'one-piece': 1800, jojo: 1500 }

type Phase = 'typing' | 'fading' | 'done'

// Fullscreen themed boot splash. The app mounts and loads data beneath it the
// whole time, and any input dismisses it immediately.
export default function BootSequence() {
  const theme = parseAppTheme(document.documentElement.dataset.theme)
  const script = SCRIPTS[theme]
  const [chars, setChars] = useState(0)
  const [phase, setPhase] = useState<Phase>(shouldBoot ? 'typing' : 'done')

  useEffect(() => {
    if (phase !== 'typing') return
    const iv = setInterval(() => setChars((c) => Math.min(c + 1, script.length)), CHAR_MS)
    return () => clearInterval(iv)
  }, [phase, script.length])

  // Fully typed → hold, then fade, then unmount.
  useEffect(() => {
    if (phase !== 'typing' || chars < script.length) return
    const t = setTimeout(() => setPhase('fading'), IMAGE_BOOT_MS[theme] ?? HOLD_MS)
    return () => clearTimeout(t)
  }, [phase, chars, script.length, theme])

  // Twin Peaks parts its curtains instead of fading, so the exit is longer;
  // Berserk hard-cuts to Home like a page turn.
  const exitMs = theme === 'twin-peaks' ? CURTAIN_MS : IMAGE_BOOT_MS[theme] ? 0 : FADE_MS
  useEffect(() => {
    if (phase !== 'fading') return
    const t = setTimeout(() => setPhase('done'), exitMs)
    return () => clearTimeout(t)
  }, [phase, exitMs])

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
  if (theme === 'one-piece') {
    return (
      <div aria-hidden="true" className="theme-boot boot-one-piece fixed inset-0 z-[70]">
        <div className="boot-one-piece-lens" style={{ backgroundImage: `url(${FX_ART.opEyecatch})` }} />
      </div>
    )
  }
  if (theme === 'jojo') {
    const variant = parseAppThemeVariant('jojo', document.documentElement.dataset.themeVariant)
    const art = variant === 'diamond-is-unbreakable' ? FX_ART.jjDiuTitle : variant === 'golden-wind' ? FX_ART.jjGwHero : FX_ART.jjScTitle
    return (
      <div aria-hidden="true" className="theme-boot boot-jojo fixed inset-0 z-[70] overflow-hidden">
        <img className="boot-jojo-art" src={art} alt="" />
        <span className="boot-jojo-lines" />
        <span className="boot-jojo-flash" />
      </div>
    )
  }
  if (theme === 'berserk') {
    return (
      <div aria-hidden="true" className="theme-boot boot-berserk fixed inset-0 z-[70]">
        <svg width="0" height="0" className="absolute">
          <filter id="berserk-crimson" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.28 0.57 0.1 0 0 0.03 0.07 0.01 0 0 0.04 0.09 0.02 0 0 0 0 0 1 0" />
          </filter>
        </svg>
        <div className="boot-berserk-stage">
          <img className="boot-berserk-panel boot-berserk-panel-ink boot-berserk-dormant" src={FX_ART.bzBehelitDormant} alt="" />
          <img className="boot-berserk-panel boot-berserk-panel-ink boot-berserk-awake" src={FX_ART.bzBehelitAwake} alt="" />
          <img className="boot-berserk-panel boot-berserk-brand" src={FX_ART.bzBrandPanel} alt="" />
        </div>
      </div>
    )
  }
  const lines = script.slice(0, chars).split('\n')
  return (
    <div
      aria-hidden="true"
      className={
        theme === 'twin-peaks'
          ? `theme-boot boot-peaks fixed inset-0 z-[70] flex items-center justify-center ${phase === 'fading' ? 'boot-peaks-open' : ''}`
          : `${theme === 'lain' ? 'lain-crt' : theme === 'metal-gear' ? 'tactical-boot' : theme === 'seinfeld' ? 'theme-boot boot-seinfeld flex-col' : 'theme-boot'} fixed inset-0 z-[70] flex items-center justify-center bg-base-900 transition-opacity duration-200 ${
              phase === 'fading' ? 'opacity-0' : ''
            }`
      }
    >
      {theme === 'seinfeld' && <img className="boot-seinfeld-logo" src={FX_ART.sfLogo} alt="" />}
      {theme === 'twin-peaks' && (
        <>
          <i className="peaks-curtain peaks-curtain-left" style={{ backgroundImage: `url(${FX_ART.peaksCurtain})` }} />
          <i className="peaks-curtain peaks-curtain-right" style={{ backgroundImage: `url(${FX_ART.peaksCurtain})` }} />
        </>
      )}
      {theme === 'lain' && (
        <>
          <img className="boot-lain-site" src={FX_ART.lainSite} alt="" />
          <img className="boot-lain-logo" src={FX_ART.lainLogo} alt="" />
        </>
      )}
      <div className="boot-copy text-signal-live text-2xl leading-relaxed">
        {lines.map((l, i) => (
          <p key={i}>
            {l}
            {i === lines.length - 1 && <span className="boot-cursor">▮</span>}
          </p>
        ))}
      </div>
    </div>
  )
}
