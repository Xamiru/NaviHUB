import type { AchievementLaunchCheck } from '@shared/types'
import { api } from './api'
import { chooseDialog } from './confirm'
import { toast } from './toast'

// The copy for a failed pre-launch check: what is wrong with the game folder's
// achievement list and what it costs.
export function launchCheckMessage(check: AchievementLaunchCheck): string {
  const what =
    check.problem === 'missing'
      ? 'This game has no achievement list for its Steam emulator'
      : `This game's achievement list is missing ${check.missing} of ${check.total} achievements`
  return (
    `${what}. The emulator throws away any achievement the list does not include, ` +
    'and the game will not award it again, so achievements earned this session can be lost for good.'
  )
}

// Run before Play. True = go ahead. "Fix and launch" writes the list into the
// game folder first (backed up, undoable from the Achievements tab). Nothing
// here ever blocks a launch except the user's own Cancel: a check that fails
// to run, or a fix that fails, says so and lets the game start.
export async function confirmAchievementLaunch(mediaId: number): Promise<boolean> {
  let check: AchievementLaunchCheck | null = null
  try {
    check = await api.achievements.launchCheck(mediaId)
  } catch {
    return true
  }
  if (!check) return true
  const answer = await chooseDialog(launchCheckMessage(check), {
    confirmLabel: 'Fix and launch',
    secondaryLabel: 'Launch anyway'
  })
  if (answer === 'cancel') return false
  if (answer === 'secondary') return true
  try {
    const state = await api.achievements.goldbergInstall(mediaId)
    toast(`Wrote ${state.total} achievements to the game folder.`, 'success')
  } catch (e) {
    toast(
      `Could not write the achievement list, so this session may not save achievements: ${e instanceof Error ? e.message : String(e)}`,
      'warning'
    )
  }
  return true
}
