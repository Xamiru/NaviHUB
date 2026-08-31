import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'src/renderer/src')

function tsxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return tsxFiles(path)
    return entry.name.endsWith('.tsx') ? [path] : []
  })
}

const japaneseFiles = [
  ...tsxFiles(join(ROOT, 'components/japanese')),
  ...tsxFiles(join(ROOT, 'pages')).filter((file) => /Japanese[^/]*\.tsx$/.test(file))
]

function source(file: string): string {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

describe('Japanese renderer contracts', () => {
  it('gives every native form control a programmatic accessible name', () => {
    const missing: string[] = []
    for (const file of japaneseFiles) {
      const text = source(file)
      const controls = /<(input|textarea|select)\b[\s\S]*?>/g
      for (const match of text.matchAll(controls)) {
        if (/\b(aria-label|aria-labelledby|id)=/.test(match[0])) continue
        const line = text.slice(0, match.index).split('\n').length
        missing.push(`${file}:${line}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('uses theme signal roles for learning feedback and shared SVG transport icons', () => {
    const violations: string[] = []
    for (const file of japaneseFiles) {
      const text = source(file)
      if (/(?:text|bg|border)-(?:red|green|amber)-(?:200|300|400|500)/.test(text)) {
        violations.push(`${file}: literal feedback color`)
      }
      if (/[▶⏮⏭♥❤]/u.test(text)) violations.push(`${file}: unicode transport or heart`)
    }
    expect(violations).toEqual([])
  })

  it('keeps Japanese pages out of the initial renderer bundle', () => {
    const app = readFileSync(join(ROOT, 'App.tsx'), 'utf8')
    expect(app).not.toMatch(/import Japanese\w+Page from/)
    expect(app.match(/const Japanese\w+Page = lazy\(/g)?.length).toBeGreaterThanOrEqual(35)
    expect(app).toContain('<Suspense')
  })
})
