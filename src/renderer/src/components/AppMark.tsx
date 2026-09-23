import lainAvatar from '../assets/lain.png'
import foxhound from '../assets/themes/foxhound.png'
import miku from '../assets/themes/miku-classic.png'
import laura from '../assets/themes/peaks-laura.jpg'
import type { AppTheme } from '@shared/appTheme'

export default function AppMark({
  theme,
  className = ''
}: {
  theme: AppTheme
  className?: string
}) {
  if (theme === 'miku' || theme === 'twin-peaks') {
    return (
      <span
        className={`app-mark app-mark-${theme} ${className}`}
        style={{ backgroundImage: `url(${theme === 'miku' ? miku : laura})` }}
        aria-hidden="true"
      />
    )
  }
  if (theme === 'lain') {
    return <img src={lainAvatar} alt="" className={className} aria-hidden="true" />
  }

  return <img src={foxhound} alt="" className={`object-contain ${className}`} aria-hidden="true" />
}
