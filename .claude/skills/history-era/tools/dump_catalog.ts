// Dumps every committed content file as JSON ({ path: entity }) for edit.py:
//   node_modules/.bin/vite-node -c vitest.config.ts .claude/skills/history-era/tools/dump_catalog.ts <out.json>
import { writeFileSync } from 'fs'
import { loadCatalogEntries } from '../../../../src/shared/history/catalog'

const out: Record<string, unknown> = {}
for (const e of loadCatalogEntries()) out[e.path] = e.entity
writeFileSync(process.argv[2], JSON.stringify(out))
console.log(`${Object.keys(out).length} files`)
