import { describe, expect, it } from 'vitest'
import {
  APP_THEME_OPTIONS,
  APP_THEME_VARIANT_OPTIONS,
  appThemeBackground,
  appThemeVariantSetting,
  parseAppTheme,
  parseAppThemeVariant
} from '../src/shared/appTheme'
import {
  persistAppTheme,
  persistAppThemeVariant,
  readStoredAppTheme,
  readStoredAppThemeVariant,
  stampAppTheme,
  themedDescriptor
} from '../src/renderer/src/lib/theme'

function memoryStorage(initial?: string) {
  const values = new Map<string, string>()
  if (initial != null) values.set('ui.theme', initial)
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value)
  }
}

describe('application theme', () => {
  it.each(APP_THEME_OPTIONS.map((option) => option.value))('accepts %s', (value) => {
    expect(parseAppTheme(value)).toBe(value)
  })

  it('falls back to Lain for missing and unknown values', () => {
    expect(parseAppTheme(undefined)).toBe('lain')
    expect(parseAppTheme('unknown')).toBe('lain')
  })

  it('keeps every stored choice and launch fill unique', () => {
    const values = APP_THEME_OPTIONS.map((option) => option.value)
    expect(new Set(values).size).toBe(values.length)
    expect(new Set(values.map(appThemeBackground)).size).toBe(values.length)
  })

  it.each(APP_THEME_OPTIONS.map((option) => option.value))('round-trips the %s pre-render storage mirror', (theme) => {
    const storage = memoryStorage()
    expect(readStoredAppTheme(storage)).toBe('lain')
    persistAppTheme(theme, storage)
    expect(readStoredAppTheme(storage)).toBe(theme)
  })

  it.each(APP_THEME_OPTIONS.map((option) => option.value))('stamps %s without touching other attributes', (theme) => {
    const root = { dataset: { mood: 'quiet' } } as unknown as Pick<HTMLElement, 'dataset'>
    stampAppTheme(theme, APP_THEME_VARIANT_OPTIONS[theme][1].value, root)
    expect(root.dataset).toEqual({ mood: 'quiet', theme, themeVariant: APP_THEME_VARIANT_OPTIONS[theme][1].value })
  })

  it('offers three unique styles per theme and falls back to the first', () => {
    const all = APP_THEME_OPTIONS.flatMap((option) => {
      const styles = APP_THEME_VARIANT_OPTIONS[option.value].map((variant) => variant.value)
      expect(styles).toHaveLength(3)
      expect(parseAppThemeVariant(option.value, undefined)).toBe(styles[0])
      expect(parseAppThemeVariant(option.value, 'unknown')).toBe(styles[0])
      for (const style of styles) expect(parseAppThemeVariant(option.value, style)).toBe(style)
      return styles
    })
    expect(new Set(all).size).toBe(all.length)
    expect(parseAppThemeVariant('lain', 'codec')).toBe('present-day')
  })

  it('keeps each theme\'s style in its own mirror key and launch fill', () => {
    const storage = memoryStorage()
    persistAppThemeVariant('miku', 'concert-night', storage)
    persistAppThemeVariant('lain', 'copland', storage)
    expect(storage.getItem(appThemeVariantSetting('miku'))).toBe('concert-night')
    expect(readStoredAppThemeVariant('miku', storage)).toBe('concert-night')
    expect(readStoredAppThemeVariant('lain', storage)).toBe('copland')
    expect(readStoredAppThemeVariant('twin-peaks', storage)).toBe('waiting-room')
    expect(appThemeBackground('miku', 'concert-night')).toBe('#091228')
    expect(appThemeBackground('miku', 'bogus')).toBe(appThemeBackground('miku'))
  })

  it('changes shell language only for the tactical theme', () => {
    for (const theme of ['lain', 'miku', 'twin-peaks'] as const) {
      expect(themedDescriptor(theme, 'Archive directory')).toBe('Archive directory')
    }
    expect(themedDescriptor('metal-gear', 'Archive directory')).toBe('Mission database')
    expect(themedDescriptor('metal-gear', 'Knowledge map')).toBe('Knowledge map')
  })
})
