let owner: string | null = null
let depth = 0

export function claimMusicMaintenance(nextOwner: string): void {
  if (owner && owner !== nextOwner) throw new Error(`Music maintenance is busy: ${owner}`)
  owner = nextOwner
  depth += 1
}

export function releaseMusicMaintenance(currentOwner: string): void {
  if (owner !== currentOwner) return
  depth -= 1
  if (depth <= 0) {
    owner = null
    depth = 0
  }
}

export function musicMaintenanceOwner(): string | null {
  return owner
}
