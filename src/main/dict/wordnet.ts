import { readFile, unlink } from 'fs/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import { getDictDb } from './dictDb'
import {
  downloadToTemp,
  openZipReader,
  runImport,
  setImportPhase,
  setImportProgress
} from './importer'
import type { EnglishDictInfo } from '@shared/types'

// The offline English dictionary: WordNet 3.0 (definitions, examples, synonyms)
// plus CMUdict (pronunciations, converted to IPA here). Same shape as
// sentences.ts/strokes.ts — download to temp, parse with hand-rolled pure
// functions, stage every row under a fresh bank_id and write the registry row
// LAST so a crash mid-import leaves only sweepable orphans.
//
// Both URLs are pinned to a commit: nltk_data's gh-pages branch and cmudict's
// master both move, and an unpinned URL would silently change what "the
// dictionary" is between two users' installs (the KanjiVG precedent).

const SOURCE = 'wordnet'
const WORDNET_VERSION = '3.0'
const NLTK_SHA = '550b6625bcef1f2abff2ff770a5a0d272c9c6b2a'
const CMU_SHA = '74790861f652b15e4ac49015a90074ad62a27690'
const WORDNET_URL = `https://raw.githubusercontent.com/nltk/nltk_data/${NLTK_SHA}/packages/corpora/wordnet.zip`
const CMU_URL = `https://raw.githubusercontent.com/cmusphinx/cmudict/${CMU_SHA}/cmudict.dict`

const CHUNK = 2000
const DELETE_CHUNK = 5000

// WordNet ships four data/index file pairs. The 'a' (adjective) files also hold
// satellite synsets (ss_type 's'); both are stored as 'a' so a lookup for an
// adjective finds them together.
const POS_FILES: { pos: EnPos; file: string }[] = [
  { pos: 'n', file: 'noun' },
  { pos: 'v', file: 'verb' },
  { pos: 'a', file: 'adj' },
  { pos: 'r', file: 'adv' }
]

export type EnPos = 'n' | 'v' | 'a' | 'r'

// ---- pure parsers (exported for tests) ----

// WordNet's data files are prefixed with a ~29-line license block whose lines
// all start with two spaces; every real record starts with a digit.
const isDataLine = (line: string): boolean => /^\d/.test(line)

export interface WnIndexEntry {
  lemma: string
  pos: EnPos
  offsets: number[]
}

// index.{pos} line:
//   lemma pos synset_cnt p_cnt [ptr_symbol...] sense_cnt tagsense_cnt offset...
// The offsets are in WordNet's sense order (most frequent sense first), which is
// the ordering the UI shows definitions in.
export function parseWnIndexLine(line: string): WnIndexEntry | null {
  if (!line || !/^[^\s]/.test(line) || line.startsWith(' ')) return null
  const t = line.trim().split(/\s+/)
  if (t.length < 7) return null
  const lemma = t[0]
  const pos = t[1] as EnPos
  const synsetCnt = Number(t[2])
  const pCnt = Number(t[3])
  if (!lemma || !Number.isFinite(synsetCnt) || !Number.isFinite(pCnt)) return null
  // Skip the pointer symbols, then sense_cnt + tagsense_cnt.
  const offsets = t.slice(4 + pCnt + 2, 4 + pCnt + 2 + synsetCnt).map(Number)
  if (offsets.length === 0 || offsets.some((n) => !Number.isFinite(n))) return null
  return { lemma: lemma.replace(/_/g, ' ').toLowerCase(), pos, offsets }
}

export interface WnSynset {
  offset: number
  pos: EnPos
  words: string[]
  def: string
  examples: string[]
}

// data.{pos} line:
//   offset lex_filenum ss_type w_cnt(HEX) [word lex_id]... p_cnt [ptrs]... | gloss
// Word counts are hex; adjective members can carry syntactic markers ("good(a)")
// which are stripped. The gloss is "definition; "example"; "example"".
export function parseWnDataLine(line: string): WnSynset | null {
  if (!isDataLine(line)) return null
  const bar = line.indexOf('|')
  const head = (bar >= 0 ? line.slice(0, bar) : line).trim().split(/\s+/)
  if (head.length < 4) return null
  const offset = Number(head[0])
  const ssType = head[2]
  const wCnt = parseInt(head[3], 16)
  if (!Number.isFinite(offset) || !Number.isFinite(wCnt) || wCnt <= 0) return null
  const words: string[] = []
  for (let i = 0; i < wCnt; i++) {
    const w = head[4 + i * 2]
    if (!w) return null
    words.push(w.replace(/\(\w+\)$/, '').replace(/_/g, ' '))
  }
  const gloss = bar >= 0 ? line.slice(bar + 1).trim() : ''
  const { def, examples } = splitGloss(gloss)
  if (!def) return null
  // 's' (satellite adjective) is stored with the adjectives it qualifies.
  const pos = (ssType === 's' ? 'a' : ssType) as EnPos
  return { offset, pos, words, def, examples }
}

// A gloss is a definition followed by zero or more quoted usage examples,
// semicolon-separated. Definitions themselves contain semicolons often enough
// that splitting on ';' is wrong — the quotes are the reliable boundary.
export function splitGloss(gloss: string): { def: string; examples: string[] } {
  const examples: string[] = []
  const quote = gloss.indexOf('"')
  const def = (quote >= 0 ? gloss.slice(0, quote) : gloss).replace(/[\s;]+$/, '').trim()
  if (quote >= 0) {
    for (const m of gloss.slice(quote).matchAll(/"([^"]+)"/g)) {
      const ex = m[1].trim()
      if (ex) examples.push(ex)
    }
  }
  return { def, examples }
}

export interface WnExcEntry {
  form: string
  lemmas: string[]
}

// {pos}.exc line: "ran run" / "better good well" — an inflected form followed by
// one or more base forms.
export function parseWnExcLine(line: string): WnExcEntry | null {
  const t = line.trim().split(/\s+/)
  if (t.length < 2) return null
  const form = t[0].replace(/_/g, ' ').toLowerCase()
  const lemmas = t.slice(1).map((l) => l.replace(/_/g, ' ').toLowerCase())
  if (!form || lemmas.length === 0) return null
  return { form, lemmas }
}

// ARPABET -> IPA. Stress digits become IPA stress marks placed directly before
// the stressed vowel (true IPA puts them at the syllable onset, but CMUdict
// carries no syllable boundaries and vowel-anchored marks read fine).
const ARPABET_IPA: Record<string, string> = {
  AA: 'ɑ', AE: 'æ', AH: 'ʌ', AO: 'ɔ', AW: 'aʊ', AY: 'aɪ', B: 'b', CH: 'tʃ',
  D: 'd', DH: 'ð', EH: 'ɛ', ER: 'ɝ', EY: 'eɪ', F: 'f', G: 'ɡ', HH: 'h',
  IH: 'ɪ', IY: 'i', JH: 'dʒ', K: 'k', L: 'l', M: 'm', N: 'n', NG: 'ŋ',
  OW: 'oʊ', OY: 'ɔɪ', P: 'p', R: 'ɹ', S: 's', SH: 'ʃ', T: 't', TH: 'θ',
  UH: 'ʊ', UW: 'u', V: 'v', W: 'w', Y: 'j', Z: 'z', ZH: 'ʒ'
}

export function arpabetToIpa(phones: string[]): string {
  let out = ''
  for (const raw of phones) {
    const m = /^([A-Z]+)([0-2])?$/.exec(raw.toUpperCase())
    if (!m) continue
    const [, base, stress] = m
    let sym = ARPABET_IPA[base]
    if (!sym) continue
    // Unstressed AH is a schwa, unstressed ER an r-colored schwa.
    if (base === 'AH' && stress === '0') sym = 'ə'
    if (base === 'ER' && stress === '0') sym = 'ɚ'
    if (stress === '1') out += 'ˈ'
    else if (stress === '2') out += 'ˌ'
    out += sym
  }
  return out
}

export interface CmuEntry {
  word: string
  ipa: string
}

// cmudict.dict line: "hello HH AH0 L OW1", with alternate pronunciations as
// "hello(2) ..." and optional trailing "# comment". Only the first variant is
// kept — the page shows one phonetic line.
export function parseCmuLine(line: string): CmuEntry | null {
  const clean = line.split('#')[0].trim()
  if (!clean) return null
  const t = clean.split(/\s+/)
  const word = t[0]
  if (!word || /\(\d+\)$/.test(word)) return null // alternate variant
  const ipa = arpabetToIpa(t.slice(1))
  if (!ipa) return null
  return { word: word.toLowerCase(), ipa }
}

// ---- import ----

// The four file groups WordNet's zip holds, located by suffix so the archive's
// top-level directory name ("wordnet/") never matters.
export interface WordNetFiles {
  index: Record<string, string> // pos file base ('noun') -> text
  data: Record<string, string>
  exc: Record<string, string>
}

export async function readWordNetFiles(
  names: string[],
  readText: (name: string) => Promise<string>
): Promise<WordNetFiles> {
  const files: WordNetFiles = { index: {}, data: {}, exc: {} }
  for (const { file } of POS_FILES) {
    const find = (suffix: string): string | undefined =>
      names.find((n) => n.endsWith(suffix) && !n.endsWith('/'))
    const idx = find(`index.${file}`)
    const dat = find(`data.${file}`)
    const exc = find(`${file}.exc`)
    if (idx) files.index[file] = await readText(idx)
    if (dat) files.data[file] = await readText(dat)
    if (exc) files.exc[file] = await readText(exc)
  }
  return files
}

function deleteBankRows(db: ReturnType<typeof getDictDb>, bankId: number): void {
  for (const table of ['en_lemma', 'en_exc']) {
    let more = true
    while (more) {
      const res = db
        .prepare(`DELETE FROM ${table} WHERE rowid IN (SELECT rowid FROM ${table} WHERE bank_id = ? LIMIT ${DELETE_CHUNK})`)
        .run(bankId)
      more = res.changes > 0
    }
  }
  db.prepare('DELETE FROM en_synset WHERE bank_id = ?').run(bankId)
  db.prepare('DELETE FROM en_pron WHERE bank_id = ?').run(bankId)
}

// Parses + inserts everything under a fresh bank id, then swaps the registry
// row. Exported (taking already-read text) so tests drive the real SQL without
// network or zip handling — the importer.ts BankReader-seam precedent.
export async function importWordNetText(files: WordNetFiles, cmuText: string): Promise<EnglishDictInfo> {
  const db = getDictDb()
  const bankId =
    ((db.prepare('SELECT COALESCE(MAX(id), 0) AS m FROM en_dict').get() as { m: number }).m ?? 0) + 1

  const insLemma = db.prepare(
    'INSERT INTO en_lemma (bank_id, lemma, pos, offsets) VALUES (?, ?, ?, ?)'
  )
  const insSynset = db.prepare(
    `INSERT OR REPLACE INTO en_synset (bank_id, pos, offset, def, examples, words)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
  const insExc = db.prepare('INSERT INTO en_exc (bank_id, form, pos, lemmas) VALUES (?, ?, ?, ?)')
  const insPron = db.prepare('INSERT OR REPLACE INTO en_pron (bank_id, word, ipa) VALUES (?, ?, ?)')

  const lemmaChunk = db.transaction((rows: WnIndexEntry[]) => {
    for (const r of rows) insLemma.run(bankId, r.lemma, r.pos, JSON.stringify(r.offsets))
  })
  const synsetChunk = db.transaction((rows: WnSynset[]) => {
    for (const r of rows) {
      insSynset.run(bankId, r.pos, r.offset, r.def, JSON.stringify(r.examples), JSON.stringify(r.words))
    }
  })
  const excChunk = db.transaction((rows: (WnExcEntry & { pos: EnPos })[]) => {
    for (const r of rows) insExc.run(bankId, r.form, r.pos, JSON.stringify(r.lemmas))
  })
  const pronChunk = db.transaction((rows: CmuEntry[]) => {
    for (const r of rows) insPron.run(bankId, r.word, r.ipa)
  })

  let lemmaCount = 0
  let synsetCount = 0
  let pronCount = 0

  try {
    setImportPhase('english', 0, 0)
    for (const { pos, file } of POS_FILES) {
      // synsets
      const dataText = files.data[file]
      if (dataText) {
        const rows: WnSynset[] = []
        for (const line of dataText.split('\n')) {
          const r = parseWnDataLine(line)
          if (r) rows.push(r)
        }
        for (let i = 0; i < rows.length; i += CHUNK) {
          synsetChunk(rows.slice(i, i + CHUNK))
          synsetCount += Math.min(CHUNK, rows.length - i)
          setImportProgress(lemmaCount + synsetCount)
          await yieldToLoop()
        }
      }
      // lemmas
      const indexText = files.index[file]
      if (indexText) {
        const rows: WnIndexEntry[] = []
        for (const line of indexText.split('\n')) {
          const r = parseWnIndexLine(line)
          if (r) rows.push(r)
        }
        for (let i = 0; i < rows.length; i += CHUNK) {
          lemmaChunk(rows.slice(i, i + CHUNK))
          lemmaCount += Math.min(CHUNK, rows.length - i)
          setImportProgress(lemmaCount + synsetCount)
          await yieldToLoop()
        }
      }
      // irregular forms
      const excText = files.exc[file]
      if (excText) {
        const rows: (WnExcEntry & { pos: EnPos })[] = []
        for (const line of excText.split('\n')) {
          const r = parseWnExcLine(line)
          if (r) rows.push({ ...r, pos })
        }
        for (let i = 0; i < rows.length; i += CHUNK) {
          excChunk(rows.slice(i, i + CHUNK))
          await yieldToLoop()
        }
      }
    }

    if (cmuText.trim()) {
      setImportPhase('pronunciations', 0, 0)
      const rows: CmuEntry[] = []
      for (const line of cmuText.split('\n')) {
        const r = parseCmuLine(line)
        if (r) rows.push(r)
      }
      for (let i = 0; i < rows.length; i += CHUNK) {
        pronChunk(rows.slice(i, i + CHUNK))
        pronCount += Math.min(CHUNK, rows.length - i)
        setImportProgress(pronCount, rows.length)
        await yieldToLoop()
      }
    }

    if (lemmaCount === 0 || synsetCount === 0) {
      throw new Error('WordNet archive contained no usable entries')
    }
  } catch (err) {
    deleteBankRows(db, bankId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM en_dict WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  db.transaction(() => {
    if (old) {
      db.prepare('DELETE FROM en_dict WHERE id = ?').run(old.id)
      deleteBankRows(db, old.id)
    }
    db.prepare(
      `INSERT INTO en_dict (id, source, version, lemma_count, synset_count, pron_count)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(bankId, SOURCE, WORDNET_VERSION, lemmaCount, synsetCount, pronCount)
  })()
  db.pragma('optimize')

  return getEnglishDictInfo()!
}

export async function importEnglishDict(): Promise<EnglishDictInfo> {
  return runImport(async () => {
    const wnTmp = await downloadToTemp(WORDNET_URL)
    let files: WordNetFiles
    try {
      setImportPhase('reading')
      const reader = await openZipReader(wnTmp)
      try {
        const names = reader.bankNames()
        files = await readWordNetFiles(names, async (n) => (await reader.readRaw(n)).toString('utf8'))
      } finally {
        reader.close()
      }
    } finally {
      await unlink(wnTmp).catch(() => {})
    }

    // Pronunciations are a bonus: a CMUdict failure must not lose the WordNet
    // import the user just waited for.
    let cmuText = ''
    try {
      const cmuTmp = await downloadToTemp(CMU_URL, 'dict')
      try {
        cmuText = await readFile(cmuTmp, 'utf8')
      } finally {
        await unlink(cmuTmp).catch(() => {})
      }
    } catch {
      cmuText = ''
    }

    return importWordNetText(files, cmuText)
  })
}

// ---- queries ----

export function getEnglishDictInfo(): EnglishDictInfo | null {
  try {
    const row = getDictDb()
      .prepare(
        `SELECT source, version, lemma_count, synset_count, pron_count, imported_at
         FROM en_dict WHERE source = ?`
      )
      .get(SOURCE) as Record<string, unknown> | undefined
    if (!row) return null
    return {
      source: row.source as string,
      version: (row.version as string) ?? null,
      lemmaCount: row.lemma_count as number,
      synsetCount: row.synset_count as number,
      pronCount: row.pron_count as number,
      importedAt: row.imported_at as string
    }
  } catch {
    return null
  }
}

export function hasEnglishDict(): boolean {
  return getEnglishDictInfo() !== null
}

export function removeEnglishDict(): void {
  const db = getDictDb()
  const row = db.prepare('SELECT id FROM en_dict WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (!row) return
  db.prepare('DELETE FROM en_dict WHERE id = ?').run(row.id)
  deleteBankRows(db, row.id)
}

// ---- offline lookup ----

// Morphy's suffix detachment rules, in WordNet's own order. Applied only when
// the surface form itself is not a known lemma.
const MORPHY_RULES: { pos: EnPos; suffix: string; replacement: string }[] = [
  { pos: 'n', suffix: 's', replacement: '' },
  { pos: 'n', suffix: 'ses', replacement: 's' },
  { pos: 'n', suffix: 'xes', replacement: 'x' },
  { pos: 'n', suffix: 'zes', replacement: 'z' },
  { pos: 'n', suffix: 'ches', replacement: 'ch' },
  { pos: 'n', suffix: 'shes', replacement: 'sh' },
  { pos: 'n', suffix: 'men', replacement: 'man' },
  { pos: 'n', suffix: 'ies', replacement: 'y' },
  { pos: 'v', suffix: 's', replacement: '' },
  { pos: 'v', suffix: 'ies', replacement: 'y' },
  { pos: 'v', suffix: 'es', replacement: 'e' },
  { pos: 'v', suffix: 'es', replacement: '' },
  { pos: 'v', suffix: 'ed', replacement: 'e' },
  { pos: 'v', suffix: 'ed', replacement: '' },
  { pos: 'v', suffix: 'ing', replacement: 'e' },
  { pos: 'v', suffix: 'ing', replacement: '' },
  { pos: 'a', suffix: 'er', replacement: '' },
  { pos: 'a', suffix: 'est', replacement: '' },
  { pos: 'a', suffix: 'er', replacement: 'e' },
  { pos: 'a', suffix: 'est', replacement: 'e' }
]

// Every base form the suffix rules can produce for a word. Over-generates on
// purpose (deinflect.ts's approach): a candidate that is not a real lemma
// simply matches no row. Doubled consonants are undone too ("running" is
// covered by the -ing rule, "stopped" needs "stopp" -> "stop").
export function morphyCandidates(word: string): string[] {
  const w = word.toLowerCase().trim()
  const out = new Set<string>()
  for (const rule of MORPHY_RULES) {
    if (!w.endsWith(rule.suffix) || w.length <= rule.suffix.length) continue
    const base = w.slice(0, w.length - rule.suffix.length) + rule.replacement
    if (!base) continue
    out.add(base)
    // stopped -> stopp -> stop, running -> runn -> run
    if (/(.)\1$/.test(base) && !/(ss|ll|ee|oo)$/.test(base)) out.add(base.slice(0, -1))
  }
  out.delete(w)
  return [...out]
}
