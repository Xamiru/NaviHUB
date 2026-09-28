import type { ReactNode } from 'react'
import type { AppTheme, AppThemeVariant } from '@shared/appTheme'
import { FX_ART } from '../lib/themeFxArt'
import { useAppTheme } from '../lib/useAppTheme'

const THEME_EMPTY: Record<AppTheme, { art: string; line: string }> = {
  lain: { art: FX_ART.lainPortrait, line: 'No one is here yet. Present day, present time.' },
  'metal-gear': { art: FX_ART.mgsBox, line: 'Nothing here. Just a box.' },
  miku: { art: FX_ART.mikuHachune, line: 'Miku is waiting for your first one.' },
  'twin-peaks': { art: FX_ART.peaksDoubleR, line: 'A damn fine place to start.' },
  seinfeld: { art: FX_ART.sfFestivus, line: 'A Festivus for the rest of us.' },
  berserk: { art: FX_ART.bzElfhelm, line: 'Nothing here yet. Rest a while.' },
  'one-piece': { art: FX_ART.opSunset, line: 'Nothing on the horizon yet.' },
  jojo: { art: FX_ART.jjScPlate, line: 'The road to Egypt starts with one title.' }
}

// JoJo shows the active part's own street instead of one image for the theme.
const JOJO_EMPTY: Partial<Record<AppThemeVariant, { art: string; line: string }>> = {
  'diamond-is-unbreakable': { art: FX_ART.jjDiuPlate, line: 'A quiet town. For now.' },
  'golden-wind': { art: FX_ART.jjGwPlate, line: 'Every gang starts with one member.' }
}

// The empty/first-run card. When a screen is empty, its ONE filled button
// belongs here in `action` — not in the header above it. The full-size card
// carries the theme's empty-screen art; compact callers keep plain text.
export default function EmptyState({
  title,
  body,
  action,
  className
}: {
  title: string
  body?: ReactNode
  action?: ReactNode
  className?: string
}) {
  const { theme, variant } = useAppTheme()
  const themed = className == null
  const art = (theme === 'jojo' && JOJO_EMPTY[variant]) || THEME_EMPTY[theme]
  return (
    <div className={className ?? `card empty-state empty-state-${theme} p-12 text-center`}>
      {themed && <img className={`empty-state-art ${theme === 'berserk' ? 'berserk-frame' : ''}`} src={art.art} alt="" aria-hidden="true" />}
      {themed && <p className="empty-state-line text-xs text-ink-muted">{art.line}</p>}
      <p className="mb-1 text-lg font-medium">{title}</p>
      {body && <div className="text-sm text-gray-500">{body}</div>}
      {action && <div className="mx-auto mt-5 flex justify-center gap-2">{action}</div>}
    </div>
  )
}
