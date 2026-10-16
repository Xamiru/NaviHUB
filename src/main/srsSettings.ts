import * as settingsRepo from './repos/settingsRepo'
import { RETENTION_SETTING, retentionFromSetting } from '@shared/srs'

// Desired retention for the Japanese and English review decks (Settings →
// Learning → Review scheduler). Both submitReview paths read it; the review
// pages read the same settings row so their button previews agree.
export function desiredRetention(): number {
  return retentionFromSetting(settingsRepo.get(RETENTION_SETTING))
}
