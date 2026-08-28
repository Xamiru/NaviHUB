import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const component = readFileSync(
  new URL('../src/renderer/src/components/LibraryExportSettings.tsx', import.meta.url),
  'utf8'
)
const settings = readFileSync(
  new URL('../src/renderer/src/pages/SettingsPage.tsx', import.meta.url),
  'utf8'
)

describe('library export renderer contract', () => {
  it('keeps privacy-safe defaults and ZIP selected', () => {
    expect(component).toMatch(/includeSpotifyPlaylists: false/)
    expect(component).toMatch(/includeProgress: false/)
    expect(component).toMatch(/includeRatings: false/)
    expect(component).toMatch(/includeLists: false/)
    expect(component).toMatch(/format: 'zip'/)
  })

  it('requires confirmation before exporting selected personal data', () => {
    expect(component).toContain('if (personal)')
    expect(component).toContain('await confirmDialog(')
    expect(component).toContain("confirmLabel: 'Include personal data'")
  })

  it('locks configuration and exposes every terminal state', () => {
    expect(component).toContain('const locked = starting || status?.running === true')
    expect(component).toContain('disabled={locked}')
    expect(component).toContain('Export complete')
    expect(component).toContain('Export cancelled')
    expect(component).toContain("status?.phase === 'error'")
    expect(component).toContain('Open location')
    expect(component).toContain('Cancel')
  })

  it('is discoverable through Settings search', () => {
    for (const term of ['export', 'backup', 'transfer', 'privacy', 'portable', 'zip']) {
      expect(settings).toContain(`'${term}'`)
    }
    expect(settings).toContain('<LibraryExportSettings />')
  })
})
