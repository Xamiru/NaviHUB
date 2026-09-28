import lainAvatar from '../assets/lain.png'
import foxhound from '../assets/themes/foxhound.png'
import miku from '../assets/themes/miku-classic.png'
import laura from '../assets/themes/peaks-laura.jpg'
import seinfeldLogo from '../assets/themes/fx/seinfeld-logo.png'
import berserkMark from '../assets/themes/fx/berserk-mark.png'
import onePieceMark from '../assets/themes/fx/onepiece-jolly.png'
import stardustMark from '../assets/themes/fx/jojo-sc-mark.png'
import diamondMark from '../assets/themes/fx/jojo-diu-mark.png'
import goldenWindMark from '../assets/themes/fx/jojo-gw-mark.png'
import type { AppTheme } from '@shared/appTheme'
import { useAppTheme } from '../lib/useAppTheme'

export default function AppMark({
  theme,
  className = ''
}: {
  theme: AppTheme
  className?: string
}) {
  // JoJo's mark follows the part: Star Platinum, Crazy Diamond or Giorno's brooch.
  const { variant } = useAppTheme()
  if (theme === 'miku' || theme === 'twin-peaks') {
    return (
      <span
        className={`app-mark app-mark-${theme} ${className}`}
        style={{ backgroundImage: `url(${theme === 'miku' ? miku : laura})` }}
        aria-hidden="true"
      />
    )
  }
  if (theme === 'jojo') {
    const src = variant === 'diamond-is-unbreakable' ? diamondMark : variant === 'golden-wind' ? goldenWindMark : stardustMark
    return <img src={src} alt="" className={`object-contain ${className}`} aria-hidden="true" />
  }
  if (theme === 'one-piece') {
    return <img src={onePieceMark} alt="" className={`rounded-full object-cover ${className}`} aria-hidden="true" />
  }
  if (theme === 'berserk') {
    return <img src={berserkMark} alt="" className={`object-contain grayscale ${className}`} aria-hidden="true" />
  }
  if (theme === 'seinfeld') {
    return <img src={seinfeldLogo} alt="" className={`object-contain ${className}`} aria-hidden="true" />
  }
  if (theme === 'lain') {
    return <img src={lainAvatar} alt="" className={className} aria-hidden="true" />
  }

  return <img src={foxhound} alt="" className={`object-contain ${className}`} aria-hidden="true" />
}
