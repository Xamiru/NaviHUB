import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const refreshTab = readFileSync(
  join(root, 'src/renderer/src/components/RefreshTab.tsx'),
  'utf8'
)
const refreshCore = readFileSync(join(root, 'src/shared/refresh.ts'), 'utf8')
const bulkTab = readFileSync(join(root, 'src/renderer/src/pages/BulkImportPage.tsx'), 'utf8')

describe('Refresh keeps local music maintenance separate from source re-imports', () => {
  it('surfaces the existing scan and artwork actions in the Refresh tab', () => {
    expect(refreshTab).toContain('Local files')
    expect(refreshTab).toContain('api.music.scan()')
    expect(refreshTab).toContain('api.music.artFetchMissing()')
    expect(refreshTab).toContain('reconnect imported Spotify tracks')
  })

  it('offers safe presets, remembers a custom setup, and requires a review before refresh', () => {
    expect(refreshTab).toContain('Fill missing covers')
    expect(refreshTab).toContain('Fill missing hero art')
    expect(refreshTab).toContain('Update TV episodes')
    expect(refreshTab).toContain('Update anime theme songs')
    expect(refreshTab).toContain('My custom refresh')
    expect(refreshTab).toContain("usePersistedState<RefreshSetup>(")
    expect(refreshTab).toContain(
      "if (!reviewedPreview || reviewedPreview.total === 0) return"
    )
    expect(refreshTab).toContain('Review selection')
    expect(refreshTab).toContain('role="progressbar"')
    expect(refreshTab).not.toContain('Start refresh')
  })

  it('offers a dedicated missing-anime-theme backfill on the Import tab', () => {
    expect(bulkTab).toContain('Fetch missing anime theme songs')
    expect(bulkTab).toContain('Check for missing themes')
    expect(bulkTab).toContain("aspects: ['themes']")
    expect(bulkTab).toContain('api.refresh.start(themeReq)')
  })

  it('does not add music to the media_item refresh aspect engine', () => {
    expect(refreshCore).not.toMatch(/ALL_TYPES[^\n]*music/)
    expect(refreshCore).not.toMatch(/types:\s*\[[^\]]*music/)
  })
})
