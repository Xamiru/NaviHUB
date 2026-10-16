import { describe, expect, it } from 'vitest'
import { describeTags, isFrequencyTag, isSenseNumberTag, tagLabel } from '../src/shared/japanese/dictTags'
import type { DictTagInfo } from '../src/shared/types'

const info: DictTagInfo[] = [
  { name: 'v1', category: 'partOfSpeech', notes: 'Ichidan verb' },
  { name: 'vt', category: 'partOfSpeech', notes: 'transitive verb' },
  { name: 'n', category: 'partOfSpeech', notes: 'noun (common) (futsuumeishi)' },
  { name: 'ichi', category: 'frequent', notes: 'included in Ichimango Goi Bunruishuu' },
  { name: 'astron', category: '', notes: 'astronomy' }
]
const index = new Map(info.map((t) => [t.name, t]))

describe('dictionary tag labels', () => {
  it('folds every frequency marker, the star included, into one Common flag', () => {
    expect(isFrequencyTag('⭐')).toBe(true)
    expect(isFrequencyTag('news13k')).toBe(true)
    const d = describeTags(['⭐', 'ichi', 'news13k', 'spec1'], index)
    expect(d).toEqual({ common: true, labels: [] })
  })

  it('names parts of speech in short English', () => {
    expect(tagLabel('v1', index.get('v1')).label).toBe('Ichidan verb')
    expect(tagLabel('n', index.get('n')).label).toBe('noun')
    expect(tagLabel('n', index.get('n')).title).toBe('noun (common) (futsuumeishi)')
  })

  it('shows a field description, and the bare code when nothing describes it', () => {
    expect(describeTags(['astron', 'zz9'], index).labels.map((l) => l.label)).toEqual(['astronomy', 'zz9'])
  })

  it('drops JMdict sense-number tags, which the page numbers itself', () => {
    expect(isSenseNumberTag('1')).toBe(true)
    expect(isSenseNumberTag('v1')).toBe(false)
    expect(describeTags(['1', 'v1'], new Map()).labels.map((l) => l.label)).toEqual(['v1'])
  })
})
