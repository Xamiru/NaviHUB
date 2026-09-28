import { useEffect, useState } from 'react'
import { FX_ART } from '../../lib/themeFxArt'
import { useAppTheme } from '../../lib/useAppTheme'
import { TypedText } from './ThemeText'

// The theme's loading screen. It waits a moment first so fast loads never
// flash it; the label is the accessible status throughout.
export default function ThemedLoading({ label, compact = false }: { label: string; compact?: boolean }) {
  const { theme, variant } = useAppTheme()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setShow(true), 350)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div
      className={`themed-loading themed-loading-${theme} ${compact ? 'themed-loading-compact' : ''}`}
      role="status"
      aria-busy="true"
    >
      {show && theme === 'lain' && (
        <div className="lain-boot" aria-hidden="true">
          <img src={FX_ART.lainCoplandEye} alt="" />
          <p className="lain-boot-log">
            <TypedText text={`COPLAND OS ENTERPRISE\nPROTOCOL 7 ........ OK\n${label.replace(/…$/, '').toUpperCase()}`} speed={14} />
          </p>
        </div>
      )}
      {show && theme === 'metal-gear' && (
        <div className="mgs-scan" aria-hidden="true">
          <div className="mgs-scan-radar" style={{ backgroundImage: `url(${FX_ART.mgsRadar})` }} />
          <p className="mgs-scan-label">SCANNING...</p>
        </div>
      )}
      {show && theme === 'miku' && (
        <div className="miku-wait" aria-hidden="true">
          <span className="miku-wait-sprite" style={{ backgroundImage: `url(${FX_ART.mikuHachuneBusy})` }} />
        </div>
      )}
      {show && theme === 'twin-peaks' && (
        <div className="peaks-titles" aria-hidden="true">
          <img className="peaks-titles-still" src={FX_ART.peaksWren} alt="" />
          <img className="peaks-titles-still" src={FX_ART.peaksFalls} alt="" />
          <img className="peaks-titles-still" src={FX_ART.peaksMist} alt="" />
          <img className="peaks-titles-logo" src={FX_ART.peaksLogo} alt="" />
        </div>
      )}
      {show && theme === 'seinfeld' && (
        <div className="seinfeld-wait" aria-hidden="true">
          <img src={FX_ART.sfPuddy} alt="" />
          <p>Puddy is waiting.</p>
        </div>
      )}
      {show && theme === 'berserk' && (
        <div className="berserk-wait" aria-hidden="true">
          <span className="berserk-wait-lines" />
          <img src={FX_ART.bzCloak} alt="" />
          <p>The Black Swordsman is on his way...</p>
        </div>
      )}
      {show && theme === 'one-piece' && (
        <div className="op-logpose" aria-hidden="true">
          <img src={FX_ART.opLogpose} alt="" />
          <p>The Log Pose is setting...</p>
        </div>
      )}
      {show && theme === 'jojo' && (
        <div className="jojo-wait" aria-hidden="true">
          <img
            src={variant === 'diamond-is-unbreakable' ? FX_ART.jjDiuCard : variant === 'golden-wind' ? FX_ART.jjGwCard : FX_ART.jjScCard}
            alt=""
          />
        </div>
      )}
      <p className="themed-loading-label text-sm text-gray-400">{label}</p>
    </div>
  )
}
