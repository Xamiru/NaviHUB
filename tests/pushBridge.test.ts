import { readdirSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

// The app's main→renderer push surface is EXACTLY two channels: 'player:cmd'
// (transport commands into the main window) and 'player:state' (snapshot
// mirror into the pop-out widget). Everything else polls over invoke — that is
// the house pattern, and the remote player transport is the one sanctioned
// exception because a pause button can't wait out a poll interval.
//
// This test is the friction: growing the push surface means editing ALLOWED
// here, on purpose, in a reviewable diff. It also keeps the two sides of each
// push channel (webContents.send in main, ipcRenderer.on in preload) from
// drifting — like ipcContractSync, these are bare strings typecheck can't see.

const ALLOWED = ['player:cmd', 'player:state']

const here = (rel: string): string => fileURLToPath(new URL(rel, import.meta.url))

function collectMainSends(): Set<string> {
  const sends = new Set<string>()
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = `${dir}/${entry.name}`
      if (entry.isDirectory()) walk(p)
      else if (entry.name.endsWith('.ts')) {
        for (const m of readFileSync(p, 'utf8').matchAll(/webContents\.send\(\s*'([^']+)'/g)) {
          sends.add(m[1])
        }
      }
    }
  }
  walk(here('../src/main'))
  return sends
}

const mainSends = collectMainSends()
const preloadListens = new Set(
  [...readFileSync(here('../src/preload/index.ts'), 'utf8').matchAll(
    /ipcRenderer\.on\(\s*'([^']+)'/g
  )].map((m) => m[1])
)

describe('main→renderer push surface', () => {
  it('main sends only the sanctioned channels', () => {
    expect([...mainSends].sort()).toEqual([...ALLOWED].sort())
  })

  it('preload listens on exactly the sanctioned channels', () => {
    expect([...preloadListens].sort()).toEqual([...ALLOWED].sort())
  })
})
