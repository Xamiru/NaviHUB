// Dry-run validation of a session spec against the committed catalog, without
// writing content files. `checks.py json <spec> <out.json>` dumps the spec;
// run from the repo root:
//   node_modules/.bin/vite-node -c vitest.config.ts .claude/skills/history-era/tools/validate_spec.ts <out.json>
import { readFileSync } from 'fs'
import { ID_LOCK, loadCatalogEntries } from '../../../../src/shared/history/catalog'
import type { CatalogEntry } from '../../../../src/shared/history/model'
import { formatIssue, validateCatalog } from '../../../../src/shared/history/validate'

const dumped = JSON.parse(readFileSync(process.argv[2], 'utf8')) as CatalogEntry[]
const committed = loadCatalogEntries()
const clash = dumped.filter((d) => committed.some((c) => c.path === d.path)).map((d) => d.path)
if (clash.length) console.log(`ALREADY COMMITTED (edit those files instead): ${clash.join(', ')}`)
const entries = [...committed, ...dumped.filter((d) => !clash.includes(d.path))]
const ids = new Set(ID_LOCK.ids)
for (const d of dumped) ids.add(`${d.entity.kind}:${d.entity.id}`)
const issues = validateCatalog(entries, { ...ID_LOCK, ids: [...ids] })
const errors = issues.filter((i) => i.severity === 'error')
const warnings = issues.filter((i) => i.severity === 'warning')
for (const i of [...errors, ...warnings]) console.log(formatIssue(i))
console.log(`${dumped.length} new entities: ${errors.length} errors, ${warnings.length} warnings`)
process.exit(errors.length ? 1 : 0)
