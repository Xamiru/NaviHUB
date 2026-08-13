import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

// The IPC contract is five links (types → api.ts → ipc.ts → preload → renderer).
// Typecheck covers api.ts ↔ preload ↔ renderer because preload is typed `NaviApi`.
// It does NOT cover ipc.ts: the channel name is a bare string on both sides, so
// `ipcMain.handle('media:lst', …)` typechecks cleanly and fails at runtime the
// first time a user clicks the thing. This closes that gap.

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const ipc = read('../src/main/ipc.ts')
const preload = read('../src/preload/index.ts')

const handled = new Set(
  [...ipc.matchAll(/ipcMain\.handle\(\s*'([^']+)'/g)].map((m) => m[1])
)
const invoked = new Set(
  [...preload.matchAll(/invoke\(\s*'([^']+)'/g)].map((m) => m[1])
)

describe('IPC channel strings stay in sync', () => {
  it('finds channels on both sides at all', () => {
    // Guards the regexes themselves: a refactor that changes the call shape
    // would otherwise make both sets empty and the test vacuously green.
    expect(handled.size).toBeGreaterThan(300)
    expect(invoked.size).toBeGreaterThan(300)
  })

  it('every handler has a preload caller', () => {
    const orphans = [...handled].filter((c) => !invoked.has(c)).sort()
    expect(orphans, `handled in ipc.ts but never invoked from preload: ${orphans.join(', ')}`)
      .toEqual([])
  })

  it('every preload call has a handler', () => {
    // This is the direction that ships a runtime crash.
    const missing = [...invoked].filter((c) => !handled.has(c)).sort()
    expect(missing, `invoked from preload but no ipcMain.handle: ${missing.join(', ')}`)
      .toEqual([])
  })
})
