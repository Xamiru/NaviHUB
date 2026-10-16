import type { MediaSummary, SettingsMap } from '@shared/types'
import { statusesFrom } from './hooks'
import { configFor, isCompletedStatus, pathForMedia } from './mediaConfig'

// What a title offers without opening it first, shared by the command palette
// (Tab on a title) and the right-click menu on any link to it: the detail page's
// one-click log, and its tabs as direct destinations. `log` carries no route;
// each caller runs it through useLogProgress().
export interface MediaQuickAction {
  key: 'log' | 'cast' | 'media' | 'art'
  label: string
  to: string | null
}

export function mediaQuickActions(m: MediaSummary, settings: SettingsMap | undefined): MediaQuickAction[] {
  const cfg = configFor(m.mediaType)
  const statuses = statusesFrom(settings, cfg)
  const finished = isCompletedStatus(m.status, statuses) || (!!m.totalUnits && m.progress >= m.totalUnits)
  const base = pathForMedia(m)
  const out: MediaQuickAction[] = []
  if (cfg.logUnitLabel && !finished) out.push({ key: 'log', label: `Log one more ${cfg.logUnitLabel}`, to: null })
  out.push({ key: 'cast', label: `Open ${cfg.castSectionTitle.toLowerCase()}`, to: `${base}?tab=cast` })
  if (cfg.mediaTabLabel) {
    out.push({ key: 'media', label: `Open ${cfg.mediaTabLabel.toLowerCase()}`, to: `${base}?tab=media` })
  }
  out.push({ key: 'art', label: 'Open art', to: `${base}?tab=art` })
  return out
}
