import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))
// The import path only touches these for the network/zip half, which this test
// bypasses by driving importWordNetText directly (the BankReader-seam idiom).
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import {
  arpabetToIpa,
  getEnglishDictInfo,
  hasEnglishDict,
  importWordNetText,
  morphyCandidates,
  parseCmuLine,
  parseWnDataLine,
  parseWnExcLine,
  parseWnIndexLine,
  readWordNetFiles,
  removeEnglishDict,
  splitGloss,
  type WordNetFiles
} from '../src/main/dict/wordnet'
import { candidatesFor, lookupOffline } from '../src/main/english'

// Fixtures are REAL slices of WordNet 3.0's own files (license header included,
// so the header-skipping is exercised), cut down to a handful of lemmas.
const fixture = (name: string): string =>
  readFileSync(fileURLToPath(new URL(`./fixtures/wordnet/${name}`, import.meta.url)), 'utf8')

const FIXTURE_NAMES = [
  'wordnet/index.noun', 'wordnet/data.noun', 'wordnet/noun.exc',
  'wordnet/index.verb', 'wordnet/data.verb', 'wordnet/verb.exc',
  'wordnet/index.adj', 'wordnet/data.adj', 'wordnet/adj.exc',
  'wordnet/index.adv', 'wordnet/data.adv', 'wordnet/adv.exc'
]

const CMU_TEXT = [
  ';;; comment line',
  'run R AH1 N',
  'run(2) R AH0 N',
  'good G UH1 D',
  'mouse M AW1 S',
  'serendipity S EH2 R AH0 N D IH1 P IH0 T IY0'
].join('\n')

async function loadFixtures(): Promise<WordNetFiles> {
  return readWordNetFiles(FIXTURE_NAMES, async (n) => fixture(n.replace('wordnet/', '')))
}

describe('WordNet parsers', () => {
  it('parses an index line, keeping WordNet sense order', () => {
    const e = parseWnIndexLine(
      'run v 4 7 ! @ ~ ^ $ + ; 4 29 02685951 02721284 01525666 00539110  '
    )
    expect(e).toEqual({
      lemma: 'run',
      pos: 'v',
      offsets: [2685951, 2721284, 1525666, 539110]
    })
  })

  it('skips the license header and malformed lines', () => {
    expect(parseWnIndexLine('  1 This software and database is being provided')).toBeNull()
    expect(parseWnIndexLine('')).toBeNull()
    expect(parseWnIndexLine('garbage')).toBeNull()
  })

  it('parses a data line: hex word count, underscores, markers, gloss', () => {
    const s = parseWnDataLine(
      '07460104 11 n 03 footrace 0 foot_race 0 run 2 010 @ 07458453 n 0000 | a race run on foot; "she broke the record for the half-mile run"  '
    )
    expect(s).not.toBeNull()
    expect(s!.offset).toBe(7460104)
    expect(s!.pos).toBe('n')
    expect(s!.words).toEqual(['footrace', 'foot race', 'run'])
    expect(s!.def).toBe('a race run on foot')
    expect(s!.examples).toEqual(['she broke the record for the half-mile run'])
  })

  it('stores satellite adjectives (ss_type s) with the adjectives', () => {
    const s = parseWnDataLine(
      '01350494 00 s 01 extraneous 2 002 & 01349041 a 0000 | not essential; "the ballet struck me as extraneous"  '
    )
    expect(s!.pos).toBe('a')
    expect(s!.words).toEqual(['extraneous'])
  })

  it('strips adjective syntactic markers from synset words', () => {
    const s = parseWnDataLine('00001740 03 a 02 good(a) 0 fine(p) 1 000 | of high quality  ')
    expect(s!.words).toEqual(['good', 'fine'])
  })

  it('splits a gloss into definition and quoted examples', () => {
    expect(
      splitGloss('move fast; "Don\'t run--you\'ll be out of breath"; "The children ran to the store"')
    ).toEqual({
      def: 'move fast',
      examples: ["Don't run--you'll be out of breath", 'The children ran to the store']
    })
    // Definitions containing semicolons survive (why quotes, not ';', are the boundary).
    expect(splitGloss('a thing; another clause of the same definition')).toEqual({
      def: 'a thing; another clause of the same definition',
      examples: []
    })
  })

  it('parses exception lines with one or many base forms', () => {
    expect(parseWnExcLine('ran run')).toEqual({ form: 'ran', lemmas: ['run'] })
    expect(parseWnExcLine('better good well')).toEqual({
      form: 'better',
      lemmas: ['good', 'well']
    })
    expect(parseWnExcLine('lonely')).toBeNull()
  })
})

describe('CMUdict / ARPABET', () => {
  it('converts ARPABET to IPA with stress marks', () => {
    expect(arpabetToIpa(['R', 'AH1', 'N'])).toBe('ɹˈʌn')
    // unstressed AH is a schwa, secondary stress is the lower mark
    expect(arpabetToIpa(['S', 'EH2', 'R', 'AH0', 'N'])).toBe('sˌɛɹən')
    expect(arpabetToIpa(['garbage'])).toBe('')
  })

  it('parses dict lines and skips alternate variants and comments', () => {
    expect(parseCmuLine('run R AH1 N')).toEqual({ word: 'run', ipa: 'ɹˈʌn' })
    expect(parseCmuLine('run(2) R AH0 N')).toBeNull()
    expect(parseCmuLine('# just a comment')).toBeNull()
    expect(parseCmuLine('')).toBeNull()
  })
})

describe('Morphy candidates', () => {
  it('detaches regular suffixes and undoes doubled consonants', () => {
    expect(morphyCandidates('dogs')).toContain('dog')
    expect(morphyCandidates('running')).toContain('run')
    expect(morphyCandidates('stopped')).toContain('stop')
    expect(morphyCandidates('parties')).toContain('party')
    expect(morphyCandidates('boxes')).toContain('box')
    expect(morphyCandidates('taller')).toContain('tall')
  })

  it('never returns the word itself and tolerates short words', () => {
    expect(morphyCandidates('run')).not.toContain('run')
    expect(morphyCandidates('a')).toEqual([])
  })
})

describe('import + offline lookup', () => {
  beforeEach(async () => {
    db = createDictTestDb()
    await importWordNetText(await loadFixtures(), CMU_TEXT)
  })

  it('records the bank with counts', () => {
    const info = getEnglishDictInfo()
    expect(info).not.toBeNull()
    expect(info!.source).toBe('wordnet')
    expect(info!.version).toBe('3.0')
    expect(info!.lemmaCount).toBeGreaterThan(0)
    expect(info!.synsetCount).toBeGreaterThan(0)
    expect(info!.pronCount).toBe(4) // the alternate 'run(2)' is not counted
    expect(hasEnglishDict()).toBe(true)
  })

  it('looks a word up offline with definitions, examples, synonyms and IPA', () => {
    const entries = lookupOffline('run')
    expect(entries.length).toBeGreaterThan(0)
    const run = entries[0]
    expect(run.word).toBe('run')
    expect(run.source).toBe('offline')
    expect(run.phonetic).toBe('/ɹˈʌn/')
    // WordNet has 'run' as both a noun and a verb; both surface, nouns first.
    const parts = run.meanings.map((m) => m.partOfSpeech)
    expect(parts).toContain('verb')
    expect(new Set(parts).size).toBe(parts.length)
    const verb = run.meanings.find((m) => m.partOfSpeech === 'verb')!
    expect(verb.definitions.length).toBeGreaterThan(0)
    expect(verb.definitions[0].definition).toBeTruthy()
    // a synset's other members are the synonyms, and never the headword itself
    expect(verb.definitions.flatMap((d) => d.synonyms)).not.toContain('run')
  })

  it('finds irregular forms through the exception table', () => {
    expect(candidatesFor('ran')).toContain('run')
    const entries = lookupOffline('ran')
    expect(entries.some((e) => e.word === 'run')).toBe(true)
    // 'better' maps to two different lemmas in adj.exc
    expect(candidatesFor('better')).toEqual(expect.arrayContaining(['good', 'well']))
  })

  it('finds regular inflections through the suffix rules', () => {
    const entries = lookupOffline('running')
    expect(entries.some((e) => e.word === 'run')).toBe(true)
  })

  it('returns [] for an unknown word instead of throwing', () => {
    expect(lookupOffline('zzzznotaword')).toEqual([])
    expect(lookupOffline('')).toEqual([])
  })

  it('re-import replaces the bank rather than duplicating it', async () => {
    const before = getEnglishDictInfo()!
    await importWordNetText(await loadFixtures(), CMU_TEXT)
    const after = getEnglishDictInfo()!
    expect(after.lemmaCount).toBe(before.lemmaCount)
    const banks = db.prepare('SELECT COUNT(*) AS n FROM en_dict').get() as { n: number }
    expect(banks.n).toBe(1)
    // no orphaned rows from the replaced bank
    const orphans = db
      .prepare('SELECT COUNT(*) AS n FROM en_lemma WHERE bank_id NOT IN (SELECT id FROM en_dict)')
      .get() as { n: number }
    expect(orphans.n).toBe(0)
    expect(lookupOffline('run').length).toBeGreaterThan(0)
  })

  it('removing the dictionary clears every table and stops offline lookup', () => {
    removeEnglishDict()
    expect(getEnglishDictInfo()).toBeNull()
    expect(hasEnglishDict()).toBe(false)
    for (const t of ['en_lemma', 'en_synset', 'en_exc', 'en_pron']) {
      const row = db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get() as { n: number }
      expect(row.n, t).toBe(0)
    }
    expect(lookupOffline('run')).toEqual([])
  })

  it('an archive with no usable entries throws and leaves nothing behind', async () => {
    removeEnglishDict()
    await expect(importWordNetText({ index: {}, data: {}, exc: {} }, '')).rejects.toThrow()
    expect(getEnglishDictInfo()).toBeNull()
    const row = db.prepare('SELECT COUNT(*) AS n FROM en_lemma').get() as { n: number }
    expect(row.n).toBe(0)
  })
})
