import { readdirSync, readFileSync, statSync } from 'fs'
import { fileURLToPath } from 'url'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

// House-style text guard (dictSchemaSync / ipcContractSync / gamesCatalog):
// TaskKind lives in shared/types.ts but is USED as a bare string literal in
// tasks.create({ kind: '…' }) calls scattered across src/main. Typecheck does
// catch a typo'd literal — what it cannot catch is the other direction, a kind
// declared in the union that nothing ever creates, which shows up as a filter
// chip for a task type that can never appear.

const root = fileURLToPath(new URL('../src/main', import.meta.url))
const typesFile = fileURLToPath(new URL('../src/shared/types.ts', import.meta.url))

function walk(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (p.endsWith('.ts')) out.push(p)
  }
  return out
}

const sources = walk(root).map((p) => readFileSync(p, 'utf8'))

// The union block: `export type TaskKind =` up to the first blank line.
const declared = (() => {
  const src = readFileSync(typesFile, 'utf8')
  const start = src.indexOf('export type TaskKind =')
  expect(start, 'TaskKind union not found in shared/types.ts').toBeGreaterThan(-1)
  const block = src.slice(start, src.indexOf('\n\n', start))
  return new Set([...block.matchAll(/\|\s*'([a-zA-Z]+)'/g)].map((m) => m[1]))
})()

// Every `kind: 'x'` passed to a task creation call. Anchored on the CALL, not
// on the bare property: `kind:` is a common discriminator across this codebase
// (parseYtDlpLine events, playability plans), and matching it loosely picks up
// dozens of unrelated literals.
const used = new Set(
  sources.flatMap((src) =>
    [...src.matchAll(/tasks\.(?:create|runTask)\(/g)]
      .map((m) => /\bkind:\s*'([a-zA-Z]+)'/.exec(src.slice(m.index, m.index + 400))?.[1])
      .filter((k): k is string => k != null)
  )
)

describe('TaskKind stays in sync with what src/main actually creates', () => {
  it('finds both sides at all', () => {
    // Guards the regexes: a refactor that changed the call shape would
    // otherwise make this file vacuously green.
    expect(declared.size).toBeGreaterThan(10)
    expect(used.size).toBeGreaterThan(10)
  })

  it('every kind used in src/main is declared in the union', () => {
    const undeclared = [...used].filter((k) => !declared.has(k)).sort()
    expect(undeclared, `used in src/main but missing from TaskKind: ${undeclared.join(', ')}`)
      .toEqual([])
  })

  it('every declared kind is actually created somewhere', () => {
    // A kind nothing creates renders as a filter option for a task that can
    // never appear.
    const unused = [...declared].filter((k) => !used.has(k)).sort()
    expect(unused, `declared in TaskKind but never created: ${unused.join(', ')}`).toEqual([])
  })
})
