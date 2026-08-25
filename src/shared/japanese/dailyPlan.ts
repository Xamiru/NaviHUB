export interface JpDailyPacing {
  dailyTarget: number
  introducedToday: number
  remainingToday: number
  newAvailable: number
  newThisSession: number
  holdNextLesson: boolean
}

// Turns the review setup's target into a real DAILY budget. A second session
// can clear more due cards but cannot silently introduce another full batch.
export function jpDailyPacing(
  dailyTarget: number,
  introducedToday: number,
  newAvailable: number
): JpDailyPacing {
  const target = Math.max(0, Math.floor(dailyTarget))
  const introduced = Math.max(0, Math.floor(introducedToday))
  const available = Math.max(0, Math.floor(newAvailable))
  const remaining = Math.max(0, target - introduced)
  return {
    dailyTarget: target,
    introducedToday: introduced,
    remainingToday: remaining,
    newAvailable: available,
    newThisSession: Math.min(available, remaining),
    holdNextLesson: available > 0
  }
}
