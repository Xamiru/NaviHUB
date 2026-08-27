import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relative: string): string =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

describe('AniList character gender importer mirrors', () => {
  it('keeps the app importer and standalone bulk importer on the same field', () => {
    const appImporter = read('../src/main/anilist.ts')
    const bulkImporter = read('../scripts/bulk-import.cjs')
    const connection = read('../src/main/db/connection.ts')

    expect(appImporter).toContain('gender image { large }')
    expect(bulkImporter).toContain('gender image { large }')
    expect(appImporter).toContain('(name, name_native, gender, image_path, external_source, external_id)')
    expect(bulkImporter).toContain('(name, name_native, gender, image_path, external_source, external_id)')
    expect(connection).toContain("ensureColumn(sqlite, 'character', 'gender', 'gender TEXT')")
    expect(bulkImporter).toContain('ALTER TABLE character ADD COLUMN gender TEXT')
  })
})
