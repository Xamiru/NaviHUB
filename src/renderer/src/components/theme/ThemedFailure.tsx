import { useNavigate } from 'react-router-dom'
import { FX_ART } from '../../lib/themeFxArt'
import { useAppTheme } from '../../lib/useAppTheme'

// A failed read, framed by the theme. The real error text and the retry action
// always stay; Metal Gear adds EXIT (go back), as on its GAME OVER screen.
export default function ThemedFailure({
  message,
  onRetry,
  retryLabel = 'Try again',
  className = ''
}: {
  message: string
  onRetry: () => void
  retryLabel?: string
  className?: string
}) {
  const { theme, variant } = useAppTheme()
  const navigate = useNavigate()

  if (theme === 'metal-gear') {
    return (
      <div className={`themed-failure mgs-gameover ${className}`} role="alert">
        <img src={FX_ART.mgsGameOver} alt="GAME OVER" />
        <div className="mgs-gameover-choices">
          <button onClick={onRetry} aria-label={`Continue: ${retryLabel}`}>CONTINUE</button>
          <button onClick={() => navigate(-1)} aria-label="Exit: go back">EXIT</button>
        </div>
        <p className="mgs-gameover-error">{message}</p>
      </div>
    )
  }

  if (theme === 'seinfeld') {
    return (
      <div className={`themed-failure themed-failure-seinfeld ${className}`} role="alert">
        <img className="themed-failure-art" src={FX_ART.sfSoupNazi} alt="" />
        <div className="themed-failure-copy">
          <p className="themed-failure-title">No soup for you!</p>
          <p className="mt-1 text-sm text-ink-muted">{message}</p>
          <button className="btn-primary mt-4 self-start" onClick={onRetry} aria-label={retryLabel}>
            Next!
          </button>
        </div>
      </div>
    )
  }

  // JoJo blames the active part's villain.
  const villain =
    variant === 'diamond-is-unbreakable'
      ? { art: FX_ART.jjDiuVillain, title: 'Killer Queen has already touched it.' }
      : variant === 'golden-wind'
        ? { art: FX_ART.jjGwVillain, title: 'King Crimson erased it.' }
        : { art: FX_ART.jjScVillain, title: 'It was me, DIO!' }
  const art = {
    lain: FX_ART.lainSignalLost,
    miku: FX_ART.mikuHachunePanic,
    'twin-peaks': FX_ART.peaksWhiteHorse,
    berserk: FX_ART.bzEclipse,
    'one-piece': FX_ART.opTsuzuku,
    jojo: villain.art
  }[theme]
  const title = {
    lain: 'Connection to the Wired lost.',
    miku: "That didn't load.",
    'twin-peaks': 'It is happening again.',
    berserk: 'The Eclipse has come.',
    'one-piece': 'To be continued...',
    jojo: villain.title
  }[theme]
  return (
    <div className={`themed-failure themed-failure-${theme} ${className}`} role="alert">
      <img className="themed-failure-art" src={art} alt="" />
      <div className="themed-failure-copy media-contrast">
        <p className="themed-failure-title">{title}</p>
        <p className="mt-1 text-sm text-ink-muted">{message}</p>
        <button className="btn-primary mt-4 self-start" onClick={onRetry}>{retryLabel}</button>
      </div>
    </div>
  )
}
