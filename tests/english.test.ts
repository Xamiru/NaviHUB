import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
// The saved-word repo lives in navihub.db; the offline dictionary lives in
// dictionaries.db. These tests cover the online half, so the dict handle is a
// bare in-memory DB with no en_dict row — lookup() then falls through to the API.
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => dictDb,
  closeDictDb: () => {}
}))

import { parseEnglishEntries } from '../src/main/english'
import * as englishRepo from '../src/main/repos/englishRepo'

const dictDb = createDictTestDb()

// A trimmed but shape-faithful dictionaryapi.dev payload: top-level phonetic
// missing (only phonetics[] has text), two meanings, definition-level and
// meaning-level synonyms, one junk definitions entry.
const API_FIXTURE = [
  {
    word: 'run',
    phonetics: [{ audio: 'https://x/run.mp3' }, { text: '/ɹʌn/', audio: '' }],
    meanings: [
      {
        partOfSpeech: 'verb',
        definitions: [
          {
            definition: 'To move swiftly on foot.',
            example: 'He ran to the station.',
            synonyms: ['sprint', 'dash'],
            antonyms: []
          },
          { definition: '', synonyms: [], antonyms: [] }
        ],
        synonyms: ['jog'],
        antonyms: ['walk']
      },
      {
        partOfSpeech: 'noun',
        definitions: [{ definition: 'An act of running.', synonyms: [], antonyms: [] }],
        synonyms: [],
        antonyms: []
      }
    ],
    sourceUrls: ['https://en.wiktionary.org/wiki/run']
  }
]

describe('parseEnglishEntries', () => {
  it('maps the API shape, using phonetics[] when the top-level phonetic is missing', () => {
    const entries = parseEnglishEntries(API_FIXTURE)
    expect(entries).toHaveLength(1)
    const e = entries[0]
    expect(e.word).toBe('run')
    expect(e.phonetic).toBe('/ɹʌn/')
    expect(e.meanings).toHaveLength(2)
    expect(e.meanings[0].partOfSpeech).toBe('verb')
    // the empty-definition row is dropped
    expect(e.meanings[0].definitions).toHaveLength(1)
    expect(e.meanings[0].definitions[0]).toEqual({
      definition: 'To move swiftly on foot.',
      example: 'He ran to the station.',
      synonyms: ['sprint', 'dash']
    })
    expect(e.meanings[0].synonyms).toEqual(['jog'])
    expect(e.meanings[1].partOfSpeech).toBe('noun')
  })

  it('returns [] for the 404 body shape and other non-arrays', () => {
    expect(
      parseEnglishEntries({ title: 'No Definitions Found', message: 'Sorry...', resolution: '...' })
    ).toEqual([])
    expect(parseEnglishEntries(null)).toEqual([])
    expect(parseEnglishEntries('nope')).toEqual([])
  })

  it('drops entries with no word or no usable meanings', () => {
    expect(parseEnglishEntries([{ meanings: [] }])).toEqual([])
    expect(parseEnglishEntries([{ word: 'x', meanings: [{ partOfSpeech: 'noun', definitions: [] }] }])).toEqual([])
  })
})

describe('englishRepo', () => {
  beforeEach(() => {
    db = createTestDb()
  })

  it('saves, lists newest-first, and removes', () => {
    const a = englishRepo.saveWord({ word: 'ephemeral', meaning: 'Lasting a very short time.' })
    const b = englishRepo.saveWord({
      word: 'serendipity',
      phonetic: '/ˌsɛɹ.ənˈdɪp.ɪ.ti/',
      pos: 'noun',
      meaning: 'Finding good things without looking for them.',
      example: 'Pure serendipity.'
    })
    expect(a).not.toBe(b)

    const words = englishRepo.listWords()
    expect(words).toHaveLength(2)
    // newest first (same created_at second → higher id first)
    expect(words[0].word).toBe('serendipity')
    expect(words[0].pos).toBe('noun')
    expect(words[0].example).toBe('Pure serendipity.')
    expect(words[1].phonetic).toBeNull()

    englishRepo.removeWord(a)
    expect(englishRepo.listWords()).toHaveLength(1)
  })

  it('is idempotent for an identical (word, meaning) pair', () => {
    const a = englishRepo.saveWord({ word: 'run', meaning: 'To move swiftly on foot.' })
    const again = englishRepo.saveWord({ word: 'run', meaning: 'To move swiftly on foot.' })
    expect(again).toBe(a)
    expect(englishRepo.listWords()).toHaveLength(1)
    // a different sense of the same word is a new row
    englishRepo.saveWord({ word: 'run', meaning: 'An act of running.' })
    expect(englishRepo.listWords()).toHaveLength(2)
  })

  it('rejects empty word or meaning', () => {
    expect(() => englishRepo.saveWord({ word: '  ', meaning: 'x' })).toThrow()
    expect(() => englishRepo.saveWord({ word: 'x', meaning: '' })).toThrow()
  })

  it('filters with a LIKE search across word and meaning', () => {
    englishRepo.saveWord({ word: 'ephemeral', meaning: 'Lasting a very short time.' })
    englishRepo.saveWord({ word: 'lasting', meaning: 'Enduring.' })
    expect(englishRepo.listWords('ephem')).toHaveLength(1)
    expect(englishRepo.listWords('lasting')).toHaveLength(2) // word of one, meaning of the other
    expect(englishRepo.listWords('zzz')).toHaveLength(0)
  })
})
