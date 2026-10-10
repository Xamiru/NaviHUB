import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { APP_THEME_OPTIONS } from '../src/shared/appTheme'
import {
  SETTINGS_CATALOG,
  resolveSettingsTab,
  searchSettings
} from '../src/renderer/src/lib/settingsCatalog'
import { MEDIA_CONFIGS } from '../src/renderer/src/lib/mediaConfig'

const renderer = fileURLToPath(new URL('../src/renderer/src/', import.meta.url))
const settingsDir = join(renderer, 'pages/settings')

// Every card title the Settings page renders: literal titles on the card
// shells in pages/settings/**, the cards that live in components/, and the
// generated status editors.
function renderedTitles(): string[] {
  const sources = [
    ...readdirSync(settingsDir).map((file) => readFileSync(join(settingsDir, file), 'utf8')),
    readFileSync(join(renderer, 'components/LibraryExportSettings.tsx'), 'utf8')
  ]
  const titles = new Set<string>()
  for (const source of sources) {
    for (const match of source.matchAll(
      /<(SettingCard|TextSetting|StorageFolderSetting|QuietWorkspace)\b[^>]*?\btitle="([^"]+)"/g
    )) {
      titles.add(match[2])
    }
  }
  for (const cfg of MEDIA_CONFIGS) titles.add(`${cfg.singular} statuses`)
  return [...titles].sort()
}

describe('settings catalog', () => {
  it('lists exactly the cards the page renders', () => {
    const catalog = [...new Set(SETTINGS_CATALOG.map((card) => card.title))].sort()
    expect(catalog).toEqual(renderedTitles())
  })

  it('has no duplicate titles, so every anchor is unique', () => {
    const titles = SETTINGS_CATALOG.map((card) => card.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('finds every theme by name', () => {
    for (const option of APP_THEME_OPTIONS) {
      expect(searchSettings(option.label).map((card) => card.title)).toContain('Theme')
    }
  })

  it.each([
    ['dictionary', 'Japanese dictionaries'],
    ['tmdb', 'TMDB API key'],
    ['steam', 'Steam Web API key'],
    ['hardcover', 'Hardcover API token'],
    ['retroachievements', 'RetroAchievements Web API key'],
    ['berserk', 'Theme'],
    ['video', 'Video library folder'],
    ['keys', 'TMDB API key'],
    ['claude', 'AI model'],
    ['export', 'Library export']
  ])('"%s" finds %s', (query, title) => {
    expect(searchSettings(query).map((card) => card.title)).toContain(title)
  })

  it('needs every query word to match', () => {
    expect(searchSettings('music folder').map((card) => card.title)).toEqual([
      'Anime music folder',
      'Music library folder'
    ])
    expect(searchSettings('zzzz')).toEqual([])
  })

  it('ranks title hits above keyword hits', () => {
    expect(searchSettings('video')[0].title).toBe('Video library folder')
  })

  it('resolves current and pre-regroup tab keys', () => {
    expect(resolveSettingsTab('storage')).toBe('storage')
    expect(resolveSettingsTab('data')).toBe('storage')
    expect(resolveSettingsTab('japanese')).toBe('learning')
    expect(resolveSettingsTab('integrations')).toBe('tools')
    expect(resolveSettingsTab('general')).toBe('appearance')
    expect(resolveSettingsTab('nope')).toBeNull()
  })
})
