import { describe, expect, it } from 'vitest'
import {
  APP_THEME_OPTIONS,
  appThemeBackground,
  parseAppTheme
} from '../src/shared/appTheme'
import {
  persistAppTheme,
  readStoredAppTheme,
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
    stampAppTheme(theme, root)
    expect(root.dataset).toEqual({ mood: 'quiet', theme })
  })

  it('changes shell language only for the tactical theme', () => {
    for (const theme of ['lain', 'miku', 'twin-peaks'] as const) {
      expect(themedDescriptor(theme, 'Archive directory')).toBe('Archive directory')
    }
    expect(themedDescriptor('metal-gear', 'Archive directory')).toBe('Mission database')
    expect(themedDescriptor('metal-gear', 'Knowledge map')).toBe('Knowledge map')
  })
})
