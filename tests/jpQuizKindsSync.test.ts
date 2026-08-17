import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { JP_QUIZ_KINDS } from '../src/main/repos/japaneseRepo'

// Every quiz kind a Japanese page or drill logs must be in JP_QUIZ_KINDS, or
// the stats page's Journey "quiz rounds" silently undercounts. String-matched
// (house style: dictSchemaSync / ipcContractSync) — the union type cannot see
// which kinds are Japanese.

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.tsx?$/.test(name)) out.push(p)
  }
  return out
}

describe('JP_QUIZ_KINDS ↔ Japanese renderer kinds', () => {
  it('every kind literal used under pages/Japanese* and components/japanese/ is listed', () => {
    const files = [
      ...walk('src/renderer/src/components/japanese'),
      ...readdirSync('src/renderer/src/pages')
        .filter((f) => /^Japanese.*\.tsx$/.test(f))
        .map((f) => join('src/renderer/src/pages', f))
    ]
    // The QuizKind union, read as text, so `kind: 'cards'` (a lesson kind) or
    // `kind="level"` never trip the guard — only real quiz kinds are checked.
    const typesText = readFileSync('src/shared/types.ts', 'utf8')
    const unionStart = typesText.indexOf('export type QuizKind =')
    const unionEnd = typesText.indexOf('\n\n', unionStart)
    const union = new Set(
      [...typesText.slice(unionStart, unionEnd).matchAll(/\|\s*'([a-zA-Z]+)'/g)].map((m) => m[1])
    )
    expect(union.size).toBeGreaterThan(20)
    const used = new Set<string>()
    for (const f of files) {
      const text = readFileSync(f, 'utf8')
      for (const m of text.matchAll(/\bkind(?:\s*[:=]\s*|=)\s*["']([a-zA-Z]+)["']/g)) {
        if (union.has(m[1])) used.add(m[1])
      }
    }
    // The shared engines are parameterised (kind={kind}); only literals count.
    const missing = [...used].filter((k) => !JP_QUIZ_KINDS.includes(k as never))
    expect(missing, 'add these to JP_QUIZ_KINDS in japaneseRepo.ts').toEqual([])
    expect(used.size).toBeGreaterThan(10)
  })
})
