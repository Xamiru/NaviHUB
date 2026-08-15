import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

// CLAUDE.md and docs/architecture/ cite ~170 source paths. They were accurate
// when written; nothing keeps them that way as files move. A doc that confidently
// names a file that no longer exists is worse than no doc — an agent trusts it,
// greps, finds nothing, and re-derives the wrong answer. This is the cheap check.
//
// A path here fails ONLY if neither the literal path nor its basename exists
// anywhere in the tree, so moving a file between directories is tolerated while
// deleting or renaming one is not.

const root = fileURLToPath(new URL('..', import.meta.url))

const SKIP_DIRS = new Set(['node_modules', '.git', 'out', 'dist', '.vite'])

function basenameIndex(dir: string, into = new Set<string>()): Set<string> {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const abs = join(dir, entry)
    if (statSync(abs).isDirectory()) basenameIndex(abs, into)
    else into.add(entry)
  }
  return into
}

const present = basenameIndex(root)

// Cited names that are legitimately not files in this repo.
const NOT_IN_REPO = new Set([
  // Build outputs, generated at package time.
  'latest.yml',
  // A file inside the USER'S game folders (a Goldberg crack's schema), read by
  // achievements.ts — not part of this repo.
  'achievements.json',
  'latest-linux.yml',
  'app-update.yml',
  // Remote API endpoints that happen to end in .json.
  'basic_servant.json',
  'basic_equip.json',
  'ratings.json',
  'editions.json',
  'userdata.json',
  // Deliberately deleted; the docs mention them to say so.
  'theme.ts',
  'sync.ts',
  'syncOps.ts'
])

function citedPaths(md: string): string[] {
  return [...md.matchAll(/`([A-Za-z0-9_@./-]+\.(?:ts|tsx|sql|cjs|mjs|sh|yml|json))`/g)]
    .map((m) => m[1])
    .filter((p) => !p.startsWith('http'))
}

const docs: Array<[string, string]> = [
  ['CLAUDE.md', readFileSync(join(root, 'CLAUDE.md'), 'utf8')],
  ...readdirSync(join(root, 'docs/architecture'))
    .filter((f) => f.endsWith('.md'))
    .map(
      (f) =>
        [`docs/architecture/${f}`, readFileSync(join(root, 'docs/architecture', f), 'utf8')] as [
          string,
          string
        ]
    )
]

describe('docs do not cite files that no longer exist', () => {
  it('found docs to check', () => {
    expect(docs.length).toBeGreaterThan(10)
  })

  for (const [name, body] of docs) {
    it(`${name} cites only real files`, () => {
      const missing = [...new Set(citedPaths(body))]
        .filter((p) => {
          const base = p.split('/').pop() as string
          if (NOT_IN_REPO.has(base)) return false
          return !existsSync(join(root, p)) && !present.has(base)
        })
        .sort()
      expect(
        missing,
        `${name} cites files that do not exist: ${missing.join(', ')}. ` +
          `Update the doc, or add the name to NOT_IN_REPO if it is not a repo file.`
      ).toEqual([])
    })
  }
})
