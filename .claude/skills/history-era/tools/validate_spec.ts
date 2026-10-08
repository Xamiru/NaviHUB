// Dry-run validation of a session spec against the committed catalog, without
// writing content files. `checks.py json <spec> <out.json>` dumps the spec;
// run from the repo root:
//   node_modules/.bin/vite-node -c vitest.config.ts .claude/skills/history-era/tools/validate_spec.ts <out.json> [--rebuild]
// It runs the validator AND the quality lint (src/shared/history/lint.ts): a spec
// must add no error and no lint issue outside content/lint.baseline.json.
// --rebuild: the spec's files are already built (a revision); its versions replace them.
import { readFileSync } from 'fs'
import { ID_LOCK, loadCatalogEntries } from '../../../../src/shared/history/catalog'
import { buildCatalog, type CatalogEntry } from '../../../../src/shared/history/model'
import { lintCatalog, lintKey } from '../../../../src/shared/history/lint'
import { formatIssue, validateCatalog } from '../../../../src/shared/history/validate'
import baseline from '../../../../src/shared/history/content/lint.baseline.json'

const rebuild = process.argv.includes('--rebuild')
const dumped = JSON.parse(readFileSync(process.argv[2], 'utf8')) as CatalogEntry[]
const committed = loadCatalogEntries()
const clash = dumped.filter((d) => committed.some((c) => c.path === d.path)).map((d) => d.path)
if (clash.length && !rebuild) console.log(`ALREADY COMMITTED (edit those files instead): ${clash.join(', ')}`)
const mine = new Set(dumped.map((d) => d.path))
const entries = rebuild
  ? [...committed.filter((c) => !mine.has(c.path ?? '')), ...dumped]
  : [...committed, ...dumped.filter((d) => !clash.includes(d.path))]
const ids = new Set(ID_LOCK.ids)
for (const d of dumped) ids.add(`${d.entity.kind}:${d.entity.id}`)
const issues = validateCatalog(entries, { ...ID_LOCK, ids: [...ids] })
const errors = issues.filter((i) => i.severity === 'error')
const warnings = issues.filter((i) => i.severity === 'warning')
for (const i of [...errors, ...warnings]) console.log(formatIssue(i))
const all = entries.map((e) => e.entity)
const known = new Set(baseline as string[])
const lint = lintCatalog(buildCatalog(all), all).filter((i) => !known.has(lintKey(i)))
for (const i of lint) console.log(`LINT ${i.code} ${i.ref}${i.path ? ` [${i.path}]` : ''}: ${i.message}`)
console.log(`${dumped.length} new entities: ${errors.length} errors, ${warnings.length} warnings, ${lint.length} new lint issues`)
process.exit(errors.length || lint.length ? 1 : 0)
