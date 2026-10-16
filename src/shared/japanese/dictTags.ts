import type { DictTagInfo } from '../types'

// Turns dictionary tag codes into what a learner can read. JMdict (Yomitan
// build) tags a term with frequency bands (ichi, news13k, spec1, ⭐, …) and each
// sense with part of speech and field codes (v1, vt, n, astron). The bands only
// say "this is a common word", so they fold into one Common label; parts of
// speech become their short English name; anything else shows its description.

export interface TagLabel {
  label: string
  title: string
}

const FREQUENCY_CODE = /^(news\d+k|ichi\d*|spec\d*|gai\d*|nf\d*)$/

export function isFrequencyTag(name: string, info?: DictTagInfo): boolean {
  return name === '⭐' || name === 'P' || info?.category === 'frequent' || FREQUENCY_CODE.test(name)
}

// "noun (common) (futsuumeishi)" → "noun"; "Ichidan verb" stays.
function shortNote(notes: string): string {
  return notes.replace(/\s*\([^)]*\)/g, '').trim()
}

// JMdict (Yomitan) numbers each sense with a bare tag ("1" = "JMdict Sense #1");
// the page numbers senses itself.
export function isSenseNumberTag(name: string): boolean {
  return /^\d+$/.test(name)
}

export function tagLabel(name: string, info: DictTagInfo | undefined): TagLabel {
  const notes = info?.notes?.trim()
  if (!notes) return { label: name, title: name }
  const short = shortNote(notes)
  if (info?.category === 'partOfSpeech') return { label: short || name, title: notes }
  return { label: short && short.length <= 32 ? short : name, title: notes }
}

export interface DescribedTags {
  common: boolean
  labels: TagLabel[]
}

export function describeTags(tags: readonly string[], index: ReadonlyMap<string, DictTagInfo>): DescribedTags {
  let common = false
  const labels: TagLabel[] = []
  for (const name of tags) {
    if (isSenseNumberTag(name)) continue
    const info = index.get(name)
    if (isFrequencyTag(name, info)) {
      common = true
      continue
    }
    const l = tagLabel(name, info)
    if (!labels.some((x) => x.label === l.label)) labels.push(l)
  }
  return { common, labels }
}
