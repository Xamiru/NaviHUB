import { describe, expect, it } from 'vitest'
import { flattenGlossary, flattenItem } from '../src/shared/dictContent'
import type { GlossaryItem } from '../src/shared/types'

describe('flattenGlossary', () => {
  it('passes bare strings through', () => {
    expect(flattenGlossary(['to run', 'to dash'])).toBe('to run; to dash')
  })

  it('reads {type:text} items', () => {
    expect(flattenGlossary([{ type: 'text', text: 'hello' }])).toBe('hello')
  })

  it('yields nothing for images (never the literal "undefined")', () => {
    const items: GlossaryItem[] = [{ type: 'image', path: 'x.png' } as GlossaryItem]
    expect(flattenGlossary(items)).toBe('')
  })

  it('walks a DOJG-style structured tree with bullets', () => {
    const item: GlossaryItem = {
      type: 'structured-content',
      content: {
        tag: 'ul',
        content: [
          { tag: 'li', content: 'first sense' },
          { tag: 'li', content: 'second sense' }
        ]
      }
    }
    const out = flattenItem(item)
    expect(out).toContain('first sense')
    expect(out).toContain('second sense')
    // Bullets/newlines are introduced for list items.
    expect(out).toContain('•')
  })

  it('keeps ruby base text and drops the reading', () => {
    const item: GlossaryItem = {
      type: 'structured-content',
      content: {
        tag: 'ruby',
        content: ['漢字', { tag: 'rt', content: 'かんじ' }]
      }
    }
    expect(flattenItem(item)).toBe('漢字')
  })

  it('collapses whitespace and caps length', () => {
    const long = flattenGlossary(['a'.repeat(100)], 20)
    expect(long.length).toBeLessThanOrEqual(20)
    expect(long.endsWith('…')).toBe(true)
  })
})
