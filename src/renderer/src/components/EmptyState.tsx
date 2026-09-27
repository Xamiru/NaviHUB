import type { ReactNode } from 'react'
import type { AppTheme } from '@shared/appTheme'
import { FX_ART } from '../lib/themeFxArt'
import { useAppTheme } from '../lib/useAppTheme'

const THEME_EMPTY: Record<AppTheme, { art: string; line: string }> = {
  lain: { art: FX_ART.lainPortrait, line: 'No one is here yet. Present day, present time.' },
  'metal-gear': { art: FX_ART.mgsBox, line: 'Nothing here. Just a box.' },
  miku: { art: FX_ART.mikuHachune, line: 'Miku is waiting for your first one.' },
  'twin-peaks': { art: FX_ART.peaksDoubleR, line: 'A damn fine place to start.' }
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
  const { theme } = useAppTheme()
  const themed = className == null
  const art = THEME_EMPTY[theme]
  return (
    <div className={className ?? `card empty-state empty-state-${theme} p-12 text-center`}>
      {themed && <img className="empty-state-art" src={art.art} alt="" aria-hidden="true" />}
      {themed && <p className="empty-state-line text-xs text-ink-muted">{art.line}</p>}
      <p className="mb-1 text-lg font-medium">{title}</p>
      {body && <div className="text-sm text-gray-500">{body}</div>}
      {action && <div className="mx-auto mt-5 flex justify-center gap-2">{action}</div>}
    </div>
  )
}
