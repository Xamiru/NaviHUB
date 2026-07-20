import { describe, expect, it } from 'vitest'
import { parseMarkdown, parseInline } from '../src/shared/markdown'

describe('parseInline', () => {
  it('splits bold, italic, code and links', () => {
    const spans = parseInline('Use **NP2** and `get_roster`, see [wiki](https://x.com).')
    expect(spans.map((s) => s.type)).toEqual(['text', 'bold', 'text', 'code', 'text', 'link', 'text'])
    expect(spans[1]).toEqual({ type: 'bold', text: 'NP2' })
    expect(spans[3]).toEqual({ type: 'code', text: 'get_roster' })
    expect(spans[5]).toEqual({ type: 'link', text: 'wiki', href: 'https://x.com' })
  })

  it('treats backtick content as literal', () => {
    const spans = parseInline('`**not bold**`')
    expect(spans).toEqual([{ type: 'code', text: '**not bold**' }])
  })
})

describe('parseMarkdown', () => {
  it('parses headings, paragraphs, and both list kinds', () => {
    const blocks = parseMarkdown('# Plan\n\nHoard SQ.\n\n- Skadi\n- Castoria\n\n1. Save\n2. Roll')
    expect(blocks.map((b) => b.type)).toEqual(['heading', 'paragraph', 'list', 'list'])
    const heading = blocks[0]
    expect(heading.type === 'heading' && heading.level).toBe(1)
    const bullets = blocks[2]
    expect(bullets.type === 'list' && bullets.ordered).toBe(false)
    expect(bullets.type === 'list' && bullets.items.length).toBe(2)
    const ordered = blocks[3]
    expect(ordered.type === 'list' && ordered.ordered).toBe(true)
  })

  it('keeps fenced code literal', () => {
    const blocks = parseMarkdown('Here:\n\n```\n- not a list\n**not bold**\n```')
    const code = blocks.find((b) => b.type === 'code')
    expect(code?.type === 'code' && code.text).toBe('- not a list\n**not bold**')
  })

  it('never throws on odd input', () => {
    for (const s of ['', '   ', '**unclosed', '```\nno close', '- \n- ', '###### deep']) {
      expect(() => parseMarkdown(s)).not.toThrow()
    }
    // @ts-expect-error — guard against a null slipping through
    expect(() => parseMarkdown(null)).not.toThrow()
  })
})
