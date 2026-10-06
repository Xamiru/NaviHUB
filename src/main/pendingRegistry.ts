// Request bookkeeping for main-process clients of a child process (the SQL
// sandbox and the quiz pool process): each request is owned by the process it
// was sent to, so a dead child can only fail its own work.
//
// Which pending requests does an event settle? A timed-out query kills its
// child, and the NEXT query spawns a replacement — so by the time the dead
// child's 'exit' arrives, the map can already hold the replacement's requests.
// Failing "everything pending" there rejects a query that is still perfectly
// alive, which the user sees as a phantom "the sandbox crashed" on a query
// they just typed. Ownership is therefore tracked per request, and a process
// may only settle its own.
//
// Timers are injected as a plain clearTimer callback so this stays testable
// with no electron and no real timers.

export interface PendingEntry<P, V> {
  proc: P
  resolve: (value: V) => void
  reject: (err: Error) => void
  clearTimer: () => void
}

export class PendingRegistry<P, V> {
  private readonly map = new Map<number, PendingEntry<P, V>>()

  get size(): number {
    return this.map.size
  }

  add(id: number, entry: PendingEntry<P, V>): void {
    this.map.set(id, entry)
  }

  // Drops the entry and stops its timer WITHOUT settling it — for the caller
  // that wants to settle with its own message (the timeout path).
  take(id: number): PendingEntry<P, V> | undefined {
    const e = this.map.get(id)
    if (!e) return undefined
    this.map.delete(id)
    e.clearTimer()
    return e
  }

  // Resolves the request with this id. False when it is no longer in flight
  // (already timed out, or failed with its process).
  settle(id: number, value: V): boolean {
    const e = this.take(id)
    if (!e) return false
    e.resolve(value)
    return true
  }

  // Rejects in-flight requests and returns how many. With `owner`, ONLY the
  // ones issued to that process — a dead child must never settle work that
  // belongs to its replacement.
  fail(reason: string, owner?: P): number {
    let n = 0
    for (const [id, e] of [...this.map]) {
      if (owner !== undefined && e.proc !== owner) continue
      this.map.delete(id)
      e.clearTimer()
      e.reject(new Error(reason))
      n += 1
    }
    return n
  }
}
