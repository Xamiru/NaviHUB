import {
  STARTER_PACKS,
  missingStarterPacks,
  type StarterPackFacts,
  type StarterPackKey
} from '@shared/japanese/starterPacks'
import type { StarterInstallStatus } from '@shared/types'
import { logWarn } from '../logBus'

// One click installs whichever of the six core Japanese packs are missing, one
// after another. Each step is the ordinary importer (its own task row, its own
// cancel), so this module only sequences them and reports where it is. The
// downloads happen here, at setup time; nothing at study time touches the
// network. Stops at the first failure or cancel, keeping what already landed.

export interface StarterInstallDeps {
  facts: () => StarterPackFacts
  install: (key: StarterPackKey) => Promise<unknown>
}

const status: StarterInstallStatus = {
  running: false,
  current: null,
  done: [],
  remaining: [],
  error: null
}

export function getStarterInstallStatus(): StarterInstallStatus {
  return { ...status, done: [...status.done], remaining: [...status.remaining] }
}

export async function runStarterInstall(deps: StarterInstallDeps): Promise<StarterInstallStatus> {
  if (status.running) return getStarterInstallStatus()
  const todo = missingStarterPacks(deps.facts())
  status.running = true
  status.current = null
  status.done = []
  status.remaining = [...todo]
  status.error = null
  try {
    for (const key of todo) {
      status.current = key
      try {
        await deps.install(key)
      } catch (err) {
        const title = STARTER_PACKS.find((pack) => pack.key === key)?.title ?? key
        status.error = `${title}: ${err instanceof Error ? err.message : String(err)}`
        logWarn('app', `starter install stopped at ${key}: ${status.error}`)
        break
      }
      status.done.push(key)
      status.remaining = status.remaining.filter((item) => item !== key)
    }
  } finally {
    status.running = false
    status.current = null
  }
  return getStarterInstallStatus()
}

/** Test seam: forget the last run. */
export function resetStarterInstallStatus(): void {
  status.running = false
  status.current = null
  status.done = []
  status.remaining = []
  status.error = null
}
