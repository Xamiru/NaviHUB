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
  it.each(['lain', 'metal-gear'] as const)('accepts %s', (value) => {
    expect(parseAppTheme(value)).toBe(value)
  })

  it('falls back to Lain for missing and unknown values', () => {
    expect(parseAppTheme(undefined)).toBe('lain')
    expect(parseAppTheme('unknown')).toBe('lain')
  })

  it('keeps every stored choice and launch fill unique', () => {
    const values = APP_THEME_OPTIONS.map((option) => option.value)
    expect(new Set(values).size).toBe(values.length)
    expect(appThemeBackground('lain')).not.toBe(appThemeBackground('metal-gear'))
  })

  it('round-trips the pre-render storage mirror', () => {
    const storage = memoryStorage()
    expect(readStoredAppTheme(storage)).toBe('lain')
    persistAppTheme('metal-gear', storage)
    expect(readStoredAppTheme(storage)).toBe('metal-gear')
  })

  it('stamps the renderer root without touching other attributes', () => {
    const root = { dataset: { mood: 'quiet' } } as unknown as Pick<HTMLElement, 'dataset'>
    stampAppTheme('metal-gear', root)
    expect(root.dataset).toEqual({ mood: 'quiet', theme: 'metal-gear' })
  })

  it('changes shell language only for the tactical theme', () => {
    expect(themedDescriptor('lain', 'Archive directory')).toBe('Archive directory')
    expect(themedDescriptor('metal-gear', 'Archive directory')).toBe('Mission database')
    expect(themedDescriptor('metal-gear', 'Knowledge map')).toBe('Knowledge map')
  })
})
