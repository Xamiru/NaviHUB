import lainAvatar from '../assets/lain.png'
import type { AppTheme } from '@shared/appTheme'

export default function AppMark({
  theme,
  className = ''
}: {
  theme: AppTheme
  className?: string
}) {
  if (theme === 'lain') {
    return <img src={lainAvatar} alt="" className={className} aria-hidden="true" />
  }

  // An original radar/registration mark, deliberately not a Metal Gear logo.
  // It supplies a neutral NaviHUB identity when the Lain portrait is out of place.
  return (
    <svg
      viewBox="0 0 48 48"
      className={`tactical-mark ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 16V4h12M32 4h12v12M44 32v12H32M16 44H4V32" />
      <circle cx="24" cy="24" r="13" />
      <path d="M24 8v32M8 24h32M15 33l18-18" />
      <circle className="tactical-mark-lock" cx="30" cy="18" r="2.5" />
    </svg>
  )
}
