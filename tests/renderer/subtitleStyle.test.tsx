import { describe, expect, it } from 'vitest'
import { pickCjkFamily } from '../../src/renderer/src/lib/subtitleFallbackFont'
import { DEFAULT_VIDEO_PREFS, normalizeVideoPrefs } from '../../src/renderer/src/lib/videoPrefs'
import { scaledStyle } from '../../src/renderer/src/components/video/StyledSubtitleLayer'

describe('Japanese fallback font for libass', () => {
  it('prefers the Windows faces, needs a Regular face, and lower-cases the family', () => {
    expect(
      pickCjkFamily([
        { family: 'Arial', style: 'Regular' },
        { family: 'Noto Sans CJK JP', style: 'Regular' },
        { family: 'Yu Gothic', style: 'Bold' },
        { family: 'Meiryo', style: 'Regular' }
      ])
    ).toBe('meiryo')
    expect(pickCjkFamily([{ family: 'Noto Sans CJK JP', style: 'Regular' }])).toBe('noto sans cjk jp')
    expect(pickCjkFamily([{ family: 'Arial', style: 'Regular' }])).toBeNull()
  })
})

describe('styled subtitle size', () => {
  const style = (Name: string) => ({ Name, FontSize: 40, Outline: 2, Shadow: 1, MarginV: 21 })

  it('scales dialogue styles and leaves signs and songs as authored', () => {
    expect(scaledStyle(style('Default'), 1.5)).toMatchObject({ FontSize: 60, Outline: 3, Shadow: 1.5, MarginV: 32 })
    expect(scaledStyle(style('Signs'), 1.5)).toMatchObject({ FontSize: 40 })
    expect(scaledStyle(style('OP Romaji'), 1.5)).toMatchObject({ FontSize: 40 })
  })
})

describe('player prefs', () => {
  it('fills defaults, clamps ranges and rejects unknown options', () => {
    const p = normalizeVideoPrefs({ scale: 9, position: -4, font: 'comic', color: 'cyan', boxOpacity: 'x' })
    expect(p).toMatchObject({ scale: 2, position: 2, font: 'app', color: 'cyan', boxOpacity: 0.55 })
    expect(normalizeVideoPrefs(null)).toEqual(DEFAULT_VIDEO_PREFS)
  })

  it('reads the first player\'s subtitle keys and drops them', () => {
    const p = normalizeVideoPrefs({ subFontScale: 1.2, subBackdrop: false, volume: 0.4 })
    expect(p).toMatchObject({ scale: 1.2, background: 'outline', volume: 0.4 })
    expect(p).not.toHaveProperty('subFontScale')
    expect(p).not.toHaveProperty('subBackdrop')
  })
})
