import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'

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
      if (/\btext-gray-600\b/.test(text)) violations.push(`${file}: unreadable decorative text used in Japanese UI`)
      if (/[▶⏮⏭♥❤]/u.test(text)) violations.push(`${file}: unicode transport or heart`)
    }
    expect(violations).toEqual([])
  })

  it('exposes the state of every visually selected pill or chip button', () => {
    const missing: string[] = []
    for (const file of japaneseFiles) {
      if (file.endsWith('FlickKey.tsx')) continue // momentary pointer gesture, not a toggle
      const text = source(file)
      const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
      const visit = (node: ts.Node): void => {
        if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText(ast) === 'button') {
          const attrs = node.attributes.properties.filter(ts.isJsxAttribute)
          const classAttr = attrs.find((attr) => attr.name.getText(ast) === 'className')
          const classText = classAttr?.initializer?.getText(ast) ?? ''
          if (/(?:pill-active|chip-toggle-active)/.test(classText)) {
            const hasState = attrs.some((attr) => /aria-(?:pressed|selected)/.test(attr.name.getText(ast)))
            if (!hasState) {
              const line = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1
              missing.push(`${file}:${line}`)
            }
          }
        }
        ts.forEachChild(node, visit)
      }
      visit(ast)
    }
    expect(missing).toEqual([])
  })

  it('keeps the Japanese Home task-first and the shared study surface accessible', () => {
    const home = readFileSync(join(ROOT, 'pages/JapaneseHomePage.tsx'), 'utf8')
    const guide = readFileSync(join(ROOT, 'pages/JapaneseGuidePage.tsx'), 'utf8')
    const frame = readFileSync(join(ROOT, 'components/StudySessionFrame.tsx'), 'utf8')
    const lesson = readFileSync(join(ROOT, 'pages/JapaneseLessonPage.tsx'), 'utf8')

    expect(home.indexOf('title="Today"')).toBeLessThan(home.indexOf('title="Course path"'))
    expect(home).toContain('currentCourseWindow')
    expect(home).toContain("if (loading) return <PageStatus>Preparing today’s Japanese plan…</PageStatus>")
    expect(home).not.toContain('roadmap.steps.slice(0, 5)')
    expect(guide).toContain('Twelve authored offline conversations')
    expect(guide).not.toContain('attached to the local player')
    expect(frame).toContain('role="progressbar"')
    expect(frame).toContain('Session guidance and evidence')
    expect(frame).toContain('border-signal-affirmative/40')
    expect(frame).toContain('border-signal-anomaly/40')
    expect(lesson.match(/overflow-x-auto/g)?.length).toBeGreaterThanOrEqual(2)
  })

  it('keeps Japanese pages out of the initial renderer bundle', () => {
    const app = readFileSync(join(ROOT, 'App.tsx'), 'utf8')
    expect(app).not.toMatch(/import Japanese\w+Page from/)
    expect(app.match(/const Japanese\w+Page = lazy\(/g)?.length).toBeGreaterThanOrEqual(35)
    expect(app).toContain('<Suspense')
  })
})
