// The six offline packs the Japanese section leans on, in install order, and
// how to tell each is installed. Shared by the Today banner and the one-click
// starter install in main, so the two can never disagree about what
// "installed" means. Settings' per-pack cards still test the same things inline.

import type { StarterPackKey } from '../types'

export type { StarterPackKey }

export interface StarterPack {
  key: StarterPackKey
  title: string
  size: string | null
  unlocks: string
}

export const STARTER_PACKS: StarterPack[] = [
  {
    key: 'jmdict',
    title: 'JMdict (English)',
    size: '~60 MB',
    unlocks: 'Lookups, saving words and both deck generators.'
  },
  {
    key: 'freq',
    title: 'Frequency dictionary (JPDB)',
    size: null,
    unlocks: 'Word rankings: the core words, the sentence feed and most drills.'
  },
  {
    key: 'kanjidic',
    title: 'KANJIDIC (English)',
    size: null,
    unlocks: 'Readings, meanings and JLPT levels for every kanji.'
  },
  {
    key: 'krad',
    title: 'Kanji components (KRADFILE)',
    size: '<1 MB',
    unlocks: 'Search by parts, build-a-kanji and the look-alike drills.'
  },
  {
    key: 'grammar',
    title: 'Grammar library (N5-N1)',
    size: '~2 MB',
    unlocks: 'The grammar reference and the fill-the-blank drill.'
  },
  {
    key: 'sentences',
    title: 'Example sentences (Tatoeba)',
    size: null,
    unlocks: 'The sentence feed and examples in the dictionary and on cards.'
  }
]

export interface StarterPackFacts {
  dicts: { title: string; freqCount: number }[]
  krad: boolean
  grammar: boolean
  sentences: boolean
}

export function starterPackInstalled(key: StarterPackKey, facts: StarterPackFacts): boolean {
  const hasDict = (prefix: string): boolean =>
    facts.dicts.some((d) => d.title.toLowerCase().startsWith(prefix.toLowerCase()))
  switch (key) {
    case 'jmdict':
      return hasDict('JMdict')
    case 'freq':
      // Any Yomitan dictionary carrying frequency ranks counts, not just JPDB.
      return facts.dicts.some((d) => d.freqCount > 0)
    case 'kanjidic':
      return hasDict('KANJIDIC')
    case 'krad':
      return facts.krad
    case 'grammar':
      return facts.grammar
    case 'sentences':
      return facts.sentences
  }
}

export function missingStarterPacks(facts: StarterPackFacts): StarterPackKey[] {
  return STARTER_PACKS.map((pack) => pack.key).filter((key) => !starterPackInstalled(key, facts))
}
