// One Kindle job at a time: a check (reading the device) and a send or
// clean-up (writing it) share one MTP session, and running them together can
// stall it. Each claims the device first and releases it when done.

export type KindleJob = 'check' | 'send' | 'cleanup'

let holder: KindleJob | null = null

const BUSY: Record<KindleJob, string> = {
  check: 'The Kindle is being checked; wait for it to finish',
  send: 'A send to the Kindle is running; wait for it to finish',
  cleanup: 'An unfinished send is being cleaned up; wait for it to finish'
}

export function claimKindle(job: KindleJob): void {
  if (holder) throw new Error(BUSY[holder])
  holder = job
}

export function releaseKindle(job: KindleJob): void {
  if (holder === job) holder = null
}

export function kindleBusyWith(): KindleJob | null {
  return holder
}
