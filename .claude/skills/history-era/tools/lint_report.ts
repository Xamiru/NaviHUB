// The History content lint (src/shared/history/lint.ts) as a report, from the repo root:
//   node_modules/.bin/vite-node -c vitest.config.ts .claude/skills/history-era/tools/lint_report.ts [--all] [--write-baseline]
// Default: only issues NOT in content/lint.baseline.json (what the gate fails on).
// --all prints every issue grouped by code; --write-baseline records today's issues as
// the baseline (only after fixing what you can: the baseline is a ratchet, never a dump).
import { writeFileSync } from 'fs'
import { join } from 'path'
import { ID_LOCK, loadCatalogEntries } from '../../../../src/shared/history/catalog'
import { buildCatalog } from '../../../../src/shared/history/model'
import { lintCatalog, lintKey } from '../../../../src/shared/history/lint'
import baseline from '../../../../src/shared/history/content/lint.baseline.json'

void ID_LOCK
const entities = loadCatalogEntries().map((e) => e.entity)
const issues = lintCatalog(buildCatalog(entities), entities)
const known = new Set(baseline as string[])
const args = new Set(process.argv.slice(2))
if (args.has('--write-baseline')) {
  const keys = [...new Set(issues.map(lintKey))].sort()
  writeFileSync(join(__dirname, '../../../../src/shared/history/content/lint.baseline.json'), JSON.stringify(keys, null, 1) + '\n')
  console.log(`baseline: ${keys.length} issues`)
} else {
  const shown = args.has('--all') ? issues : issues.filter((i) => !known.has(lintKey(i)))
  const byCode = new Map<string, typeof shown>()
  for (const i of shown) byCode.set(i.code, [...(byCode.get(i.code) ?? []), i])
  for (const [code, list] of [...byCode].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${code} (${list.length})`)
    for (const i of list) console.log(`  ${i.ref}${i.path ? ` [${i.path}]` : ''}: ${i.message}`)
  }
  console.log(`\n${shown.length} ${args.has('--all') ? 'issues' : 'new issues (not in the baseline)'}`)
}
