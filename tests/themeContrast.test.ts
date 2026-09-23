import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'
import { APP_THEME_OPTIONS, appThemeBackground, type AppTheme } from '../src/shared/appTheme'

const css = postcss.parse(readFileSync(resolve('src/renderer/src/styles.css'), 'utf8'))

// Evaluate the actual palette declarations, including locally rebound aliases.
// Numeric contrast catches regressions a screenshot or class-name check misses.
function palette(theme: AppTheme, island?: 'theme-dark' | 'media-contrast' | 'archive-sidebar') {
  const values = new Map<string, string>()
  const collect = (selector: string) => {
    css.walkRules((rule) => {
      if (!rule.selectors.includes(selector)) return
      let parent = rule.parent
      while (parent) {
        if (parent.type === 'atrule' && parent.name === 'media') return
        parent = parent.parent
      }
      rule.walkDecls((declaration) => {
        if (declaration.prop.startsWith('--')) values.set(declaration.prop, declaration.value)
      })
    })
  }
  collect(':root')
  collect(`html[data-theme='${theme}']`)
  if (island) {
    collect(`.${island}`)
    collect(`html[data-theme='${theme}'] .${island}`)
  }
  const get = (name: string): number[] => {
    const value = values.get(`--${name}`)
    if (!value) throw new Error(`Missing theme token: ${name}`)
    const alias = /^var\(--(.+)\)$/.exec(value)
    return alias ? get(alias[1]) : value.split(' ').map(Number)
  }
  return get
}
function contrast(a: number[], b: number[]) {
  const luminance = (rgb: number[]) => rgb.map((n) => {
    const c = n / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }).reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0)
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

describe.each(APP_THEME_OPTIONS.map((option) => option.value))('%s theme contrast', (theme) => {
  const get = palette(theme)
  it('matches the native launch fill to the renderer canvas', () => {
    const hex = '#' + get('surface-canvas').map((n) => n.toString(16).padStart(2, '0')).join('')
    expect(appThemeBackground(theme)).toBe(hex)
  })
  it.each(['surface-canvas', 'surface-panel', 'surface-raised', 'surface-active'])(
    'keeps reading, placeholder and signal ink readable on %s', (surface) => {
      for (const ink of ['ink-primary', 'ink-secondary', 'ink-muted', 'signal-live', 'signal-link', 'signal-affirmative', 'signal-caution', 'signal-anomaly']) {
        expect(contrast(get(ink), get(surface)), `${ink} on ${surface}`).toBeGreaterThanOrEqual(4.5)
      }
    }
  )
  it('keeps primary, danger and selected controls readable', () => {
    for (const background of ['signal-live', 'accent-hover', 'signal-anomaly']) {
      expect(contrast(get('ink-inverse'), get(background)), background).toBeGreaterThanOrEqual(4.5)
    }
  })
  it('preserves light ink over fixed dark media surfaces', () => {
    for (const island of ['theme-dark', 'media-contrast'] as const) {
      const dark = palette(theme, island)
      // Black at 70% opacity over a fully white cover is the brightest badge backing.
      for (const ink of ['ink-primary', 'ink-muted', 'signal-live']) {
        expect(contrast(dark(ink), [77, 77, 77]), `${island}: ${ink}`).toBeGreaterThanOrEqual(4.5)
      }
    }
  })
})

// The ring is owned by the shared :focus-visible rule. An input-specific glow
// may add a shadow, but cannot replace either part of that shared ring.
it('keeps the shared keyboard ring when inputs add their theme glow', () => {
  let shadow = ''
  css.walkRules('.input:focus', (rule) => {
    rule.walkDecls('box-shadow', (declaration) => { shadow = declaration.value })
  })
  expect(shadow).toContain('var(--tw-ring-offset-shadow')
  expect(shadow).toContain('var(--tw-ring-shadow')
})

it('keeps Twin Peaks drawer text and its selected destination readable', () => {
  const get = palette('twin-peaks', 'archive-sidebar')
  for (const surface of ['surface-canvas', 'surface-panel', 'surface-raised', 'surface-active']) {
    for (const ink of ['ink-primary', 'ink-secondary', 'ink-muted', 'signal-live']) {
      expect(contrast(get(ink), get(surface)), `${ink} on ${surface}`).toBeGreaterThanOrEqual(4.5)
    }
  }
  expect(contrast(get('ink-inverse'), get('signal-live'))).toBeGreaterThanOrEqual(4.5)
})

it('keeps legacy status labels readable on the saturated Miku panel', () => {
  const get = palette('miku')
  for (const hue of ['red', 'rose', 'pink', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia']) {
    expect(contrast(get(`status-${hue}`), get('surface-panel')), hue).toBeGreaterThanOrEqual(4.5)
  }
})

it('scopes persisted Lain clarity and animation selectors to Lain', () => {
  css.walkRules((rule) => {
    if (rule.selector.includes('[data-signal=')) expect(rule.selector).toContain("[data-theme='lain']")
  })
})
