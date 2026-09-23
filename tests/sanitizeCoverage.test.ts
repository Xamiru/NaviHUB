import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

// tests/exportSanitize.test.ts proves the wipe statements RUN. This proves the
// list is COMPLETE: every table in init.sql is either wiped or consciously
// listed below as canonical. Without it, a new personal table (the gacha_*,
// en_*, wrestling_* pattern — five sections added tables in six weeks) silently
// ships the user's data inside a "sanitized" export, and nothing complains.
//
// Adding a table? Put it in sanitizeSql.cjs, or add it here with a reason.

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const initSql = read('../src/main/db/init.sql')
const sanitize = read('../scripts/sanitizeSql.cjs')

const tables = [
  ...initSql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g)
].map((m) => m[1])

// Canonical/imported reference data that SHOULD survive an export: the shared
// library graph is the point of the bundle. Each entry is a deliberate decision.
const CANONICAL_SURVIVORS = new Set([
  // The cross-linking graph — the app's defining feature.
  'vn_release_cache', // Public VNDB release metadata; personal edition lives separately.
  'person',
  'character',
  'company',
  'credit',
  'media_character',
  'media_company',
  'media_relation',
  'tag',
  'media_tag',
  'theme_artist',
  // Achievement sets are provider reference data (names, descriptions, icon
  // paths, global rarity) and the provider↔title mapping that produced them.
  // Only achievement_unlock — what the exporter actually earned — is personal,
  // and sanitizeSql.cjs deletes it.
  'achievement',
  'achievement_game',
  // Wikipedia-derived wrestling reference data. The wiki is canonical; only the
  // personal layer (ratings, favourites, local files, posters) is stripped, which
  // sanitizeSql.cjs does via UPDATEs on the parent rows.
  'wrestling_alias',
  'wrestling_honour',
  'wrestling_match_participant',
  'wrestling_stable_member'
])

describe('export sanitize covers every table', () => {
  it('parsed the schema at all', () => {
    expect(tables.length).toBeGreaterThan(50)
  })

  it('wipes or consciously spares every table', () => {
    const unaccounted = tables
      .filter((t) => !CANONICAL_SURVIVORS.has(t))
      .filter((t) => !new RegExp(`\\b${t}\\b`).test(sanitize))
      .sort()
    expect(
      unaccounted,
      `not in sanitizeSql.cjs and not listed as canonical: ${unaccounted.join(', ')}. ` +
        `If these hold personal data, wipe them; if not, add them to CANONICAL_SURVIVORS.`
    ).toEqual([])
  })

  it('keeps the survivor list honest', () => {
    // A survivor that no longer exists means the list rotted.
    const stale = [...CANONICAL_SURVIVORS].filter((t) => !tables.includes(t)).sort()
    expect(stale, `listed as canonical but not in init.sql: ${stale.join(', ')}`).toEqual([])
  })
})
