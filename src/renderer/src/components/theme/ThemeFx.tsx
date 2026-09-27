import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { FX_ART } from '../../lib/themeFxArt'
import { clearProgressFx, getProgressFx, subscribeProgressFx } from '../../lib/themeFx'
import { usePlayerControls } from '../../lib/player'
import { useAppTheme } from '../../lib/useAppTheme'
import { prefersReducedMotion } from './ThemeText'

// Theme effects that are not tied to one component: the page-change transition,
// Miku's progress judgement and her beat pulse. Everything here is decorative,
// pointer-transparent, hidden from assistive technology, and never delays the
// route (the new page is already rendered underneath).
export default function ThemeFx() {
  const { theme } = useAppTheme()
  return (
    <>
      {theme !== 'miku' && <RouteTransition theme={theme} />}
      {theme === 'miku' && <ProgressJudgement />}
      {theme === 'miku' && <BeatPulse />}
    </>
  )
}

function RouteTransition({ theme }: { theme: 'lain' | 'metal-gear' | 'twin-peaks' }) {
  const { pathname } = useLocation()
  const previous = useRef(pathname)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    if (!prefersReducedMotion()) setRun((n) => n + 1)
  }, [pathname])
  if (run === 0) return null
  return (
    <div key={run} className={`route-fx route-fx-${theme}`} aria-hidden="true" onAnimationEnd={(e) => {
      if (e.target === e.currentTarget) setRun(0)
    }}>
      {theme === 'twin-peaks' && (
        <>
          <i style={{ backgroundImage: `url(${FX_ART.peaksCurtain})` }} />
          <i style={{ backgroundImage: `url(${FX_ART.peaksCurtain})` }} />
        </>
      )}
    </div>
  )
}

function ProgressJudgement() {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearProgressFx(fx.id), 1000)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  return (
    <div
      key={fx.id}
      className="miku-judgement"
      style={{ left: fx.x, top: fx.y }}
      aria-hidden="true"
    >
      <img src={FX_ART.mikuNote} alt="" className="miku-judgement-note" />
      <img src={FX_ART.mikuCool} alt="" className="miku-judgement-cool" />
      {fx.combo > 1 && <span className="miku-judgement-combo">{fx.combo} COMBO</span>}
    </div>
  )
}

// A steady penlight pulse while music plays. The app cannot read the track's
// tempo: audio is served over navimg:// without CORS, and analysing it through
// Web Audio would silence playback.
function BeatPulse() {
  const { isPlaying } = usePlayerControls()
  useEffect(() => {
    const root = document.documentElement
    if (!isPlaying || prefersReducedMotion()) return
    let off = 0
    const id = window.setInterval(() => {
      root.dataset.beat = ''
      off = window.setTimeout(() => delete root.dataset.beat, 140)
    }, 500)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(off)
      delete root.dataset.beat
    }
  }, [isPlaying])
  return null
}
