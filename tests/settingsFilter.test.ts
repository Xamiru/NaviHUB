import { describe, expect, it } from 'vitest'
import { filterSettingsSections, matchesSettingsSection } from '../src/renderer/src/lib/settingsFilter'

const sections = [
  { key: 'general', title: 'UI scale', terms: ['zoom', 'display'] },
  { key: 'data', title: 'Video folders', terms: ['library', 'path'] },
  { key: 'integrations', title: 'Video tools', terms: ['ffmpeg', 'subtitles'] }
] as const

describe('settings filter', () => {
  it('matches titles and aliases without case sensitivity', () => {
    expect(matchesSettingsSection(sections[0], 'DISPLAY')).toBe(true)
    expect(matchesSettingsSection(sections[2], 'ffmpeg')).toBe(true)
  })

  it('returns all sections for an empty query and narrows non-empty searches', () => {
    expect(filterSettingsSections(sections, '')).toHaveLength(3)
    expect(filterSettingsSections(sections, 'video').map((section) => section.key)).toEqual([
      'data',
      'integrations'
    ])
  })
})
