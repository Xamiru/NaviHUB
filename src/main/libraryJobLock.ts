// Bulk import, Library Refresh and the games upgrade re-run the same importers
// against the same sources, so only one of them may run at a time. A tiny
// shared slot rather than each module reading the others' status, which would
// make the modules import each other.

export type LibraryJob = 'bulk' | 'refresh' | 'upgrade'

const RUNNING_MESSAGE: Record<LibraryJob, string> = {
  bulk: 'A bulk import is running. Wait for it to finish or stop it first.',
  refresh: 'A library refresh is running. Wait for it to finish or stop it first.',
  upgrade: 'The games upgrade is running. Wait for it to finish or stop it first.'
}

let holder: { job: LibraryJob; token: number } | null = null
let nextToken = 1

// Throws when another run holds the slot; the returned release is idempotent
// and only ever frees its own claim.
export function claimLibraryJob(job: LibraryJob): () => void {
  if (holder) throw new Error(RUNNING_MESSAGE[holder.job])
  const token = nextToken++
  holder = { job, token }
  return () => {
    if (holder?.token === token) holder = null
  }
}

export function __resetLibraryJobLock(): void {
  holder = null
}
