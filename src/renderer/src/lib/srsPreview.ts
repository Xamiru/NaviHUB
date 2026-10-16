import { calendarDaysSince, RETENTION_SETTING, retentionFromSetting } from '@shared/srs'
import { useSettings } from './hooks'

// Shared by the Japanese and English review pages, so their grade-button
// previews use exactly the inputs submitReview schedules with.

// Calendar days since the card's previous answer: 0 when this session already
// answered it (a requeued learning step), otherwise from the stored answer.
export function elapsedSinceAnswer(answeredThisSession: boolean, lastReviewedAt: string | null): number {
  return answeredThisSession ? 0 : calendarDaysSince(lastReviewedAt)
}

// Desired retention from Settings → Learning → Review scheduler.
export function useRetention(): number {
  const { data } = useSettings()
  return retentionFromSetting(data?.[RETENTION_SETTING])
}
