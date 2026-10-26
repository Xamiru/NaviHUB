// The Emulators hub groups everything by console: which emulators play it, the
// linked games whose preferred file is for it, and its emulated playtime.
import { PLATFORM_KEYS, type PlatformKey } from '@shared/emulation/platforms'
import type { EmulationStats, EmulatorInfo, InstalledGame } from '@shared/types'

export interface ConsoleSummary {
  platform: PlatformKey
  // Emulators that play it, the console's default first.
  emulators: EmulatorInfo[]
  defaultEmulator: EmulatorInfo | null
  // Linked games whose preferred (or only) game file is for this console, most
  // recently played first (the order games.installed returns).
  games: InstalledGame[]
  seconds: number
  sessions: number
  lastPlayedAt: string | null
  // Why Play would fail here, if it would.
  problem: string | null
}

export function summarizeConsole(
  platform: PlatformKey,
  emulators: readonly EmulatorInfo[],
  installed: readonly InstalledGame[],
  stats: EmulationStats | undefined
): ConsoleSummary {
  const playing = emulators.filter((e) => e.platforms.includes(platform))
  const defaultEmulator = playing.find((e) => e.defaultFor.includes(platform)) ?? null
  const ordered = defaultEmulator ? [defaultEmulator, ...playing.filter((e) => e !== defaultEmulator)] : playing
  const games = installed.filter((g) => g.platform === platform)
  const row = stats?.byPlatform.find((r) => r.platform === platform)
  const lastPlayedAt = games.reduce<string | null>(
    (latest, g) => (g.lastPlayedAt && (!latest || g.lastPlayedAt > latest) ? g.lastPlayedAt : latest),
    null
  )
  let problem: string | null = null
  if (playing.length === 0) problem = 'No emulator plays it yet'
  else if (!defaultEmulator) problem = 'No default emulator chosen'
  else if (!defaultEmulator.exeExists) problem = `${defaultEmulator.name} is not at its path any more`
  return {
    platform,
    emulators: ordered,
    defaultEmulator,
    games,
    seconds: row?.seconds ?? 0,
    sessions: row?.sessions ?? 0,
    lastPlayedAt,
    problem
  }
}

// The consoles the hub shows as tiles: any console an emulator plays or a
// linked game is for. Most recently played first, then in platform order.
export function hubConsoles(
  emulators: readonly EmulatorInfo[],
  installed: readonly InstalledGame[],
  stats: EmulationStats | undefined
): ConsoleSummary[] {
  return PLATFORM_KEYS.filter(
    (p) => emulators.some((e) => e.platforms.includes(p)) || installed.some((g) => g.platform === p)
  )
    .map((p) => summarizeConsole(p, emulators, installed, stats))
    .sort((a, b) => {
      if (a.lastPlayedAt !== b.lastPlayedAt) {
        if (!a.lastPlayedAt) return 1
        if (!b.lastPlayedAt) return -1
        return a.lastPlayedAt > b.lastPlayedAt ? -1 : 1
      }
      return PLATFORM_KEYS.indexOf(a.platform) - PLATFORM_KEYS.indexOf(b.platform)
    })
}

export function consolePath(platform: PlatformKey): string {
  return `/games/emulators/${platform}`
}
