import { createHash } from 'crypto'

// Pure half of the offline Japanese voice (Open JTalk compiled to WebAssembly,
// resources/openjtalk/; scripts/build-openjtalk-wasm.sh). No electron, fs or
// network here: the pack definitions, the tar reader's header parsing, the
// cache key and the engine's argument list, all tested without the engine.

export interface TtsArchive {
  key: 'dictionary' | 'voice'
  url: string
  sha256: string
  maxBytes: number
  // Top-level folder inside the archive, and the files kept from it. Anything
  // else in the archive is skipped, so nothing outside these names is written.
  root: string
  files: string[]
}

// Pinned at setup time (2026-10-16) from the Open JTalk project's SourceForge
// releases. The dictionary is NAIST-jdic compiled for Open JTalk (Modified
// BSD); the voice is NIT ATR503 M001 (CC BY 3.0, credited in Settings).
export const TTS_ARCHIVES: TtsArchive[] = [
  {
    key: 'dictionary',
    url: 'https://downloads.sourceforge.net/project/open-jtalk/Dictionary/open_jtalk_dic-1.11/open_jtalk_dic_utf_8-1.11.tar.gz',
    sha256: '33e9cd251bc41aa2bd7ca36f57abbf61eae3543ca25ca892ae345e394cb10549',
    maxBytes: 40 * 1024 * 1024,
    root: 'open_jtalk_dic_utf_8-1.11',
    files: ['char.bin', 'matrix.bin', 'sys.dic', 'unk.dic', 'left-id.def', 'right-id.def', 'pos-id.def', 'rewrite.def', 'COPYING']
  },
  {
    key: 'voice',
    url: 'https://downloads.sourceforge.net/project/open-jtalk/HTS%20voice/hts_voice_nitech_jp_atr503_m001-1.05/hts_voice_nitech_jp_atr503_m001-1.05.tar.gz',
    sha256: '2e555c88482267b2931c7dbc7ecc0e3df140d6f68fc913aa4822f336c9e0adfc',
    maxBytes: 4 * 1024 * 1024,
    root: 'hts_voice_nitech_jp_atr503_m001-1.05',
    files: ['nitech_jp_atr503_m001.htsvoice', 'COPYING', 'README']
  }
]

export const TTS_VOICE_FILE = 'nitech_jp_atr503_m001.htsvoice'
// Part of every cache key: a change to the voice or its output format must
// never replay an older clip. The voice runs at its native 48 kHz: lowering
// -s alone keeps the 48 kHz frame period and plays the speech at half speed.
export const TTS_VOICE_ID = 'm001-48k'
export const TTS_MAX_CHARS = 200
// Unpacked size ceilings for the extraction (decompression-bomb guard).
export const TTS_MAX_UNPACKED_BYTES = { dictionary: 160 * 1024 * 1024, voice: 8 * 1024 * 1024 }

export const packSubdir = (key: TtsArchive['key']): string => (key === 'dictionary' ? 'dic' : 'voice')

const JAPANESE = /[぀-ヿ㐀-鿿豈-﫿ｦ-ﾟ々ー]|[\u{20000}-\u{2fa1f}]/u

// What gets spoken: trimmed, whitespace collapsed, capped by code point (never
// splitting a surrogate pair). Anything else, empty or non-Japanese, is null.
export function speakableText(text: unknown): string | null {
  if (typeof text !== 'string') return null
  const t = Array.from(text.replace(/\s+/g, ' ').trim()).slice(0, TTS_MAX_CHARS).join('')
  return JAPANESE.test(t) ? t : null
}

const toHiragana = (s: string): string =>
  s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))

// A reading to hold the engine to, as hiragana with only kana kept; null when
// none was given or it has no kana to compare against.
export function expectedReading(reading: unknown): string | null {
  if (typeof reading !== 'string') return null
  const r = toHiragana(reading).replace(/[^ぁ-ゖー]/g, '')
  return r ? r : null
}

// Content-addressed cache name: the same text, reading and voice always reuse
// one file (the reading matters: 今日 held to こんにち is a different clip).
export function ttsCacheName(text: string, voice = TTS_VOICE_ID, reading: string | null = null): string {
  return `${createHash('sha1').update(`${voice}|${text}|${reading ?? ''}`).digest('hex')}.wav`
}

// The reading Open JTalk chose, from its trace (-ot): one CSV line per word in
// the "[Text analysis result]" block, field 8 being the katakana reading.
export function readingFromTrace(trace: string): string | null {
  const block = trace.split('[Text analysis result]')[1]
  if (!block) return null
  const lines = block.split('\n[')[0].split('\n').map((l) => l.trim()).filter(Boolean)
  const kana = lines.map((l) => l.split(',')[8] ?? '').filter((r) => r && r !== '*').join('')
  return expectedReading(kana)
}

// A clip worth caching: a RIFF/WAVE file with audio after its header.
export function isPlayableWav(wav: Uint8Array): boolean {
  const tag = (from: number): string => String.fromCharCode(...wav.subarray(from, from + 4))
  return wav.length > 1024 && tag(0) === 'RIFF' && tag(8) === 'WAVE'
}

// The engine's argv inside its virtual filesystem (the worker mounts the pack
// at /dic and /voice and writes the text to /in.txt). The trace carries the
// reading the engine chose, checked against the card's reading.
export function openJTalkArgs(): string[] {
  return ['-x', '/dic', '-m', `/voice/${TTS_VOICE_FILE}`, '-ow', '/out.wav', '-ot', '/trace.txt', '/in.txt']
}

// ---- tar (ustar) headers ----

export type TarEntry =
  | { kind: 'file'; name: string; size: number }
  | { kind: 'skip'; size: number } // directories, links, pax/global headers
  | { kind: 'longname'; size: number } // GNU 'L': the next entry's name is in the data
  | { kind: 'end' }

function field(block: Uint8Array, start: number, length: number): string {
  let end = start
  while (end < start + length && block[end] !== 0) end++
  return Buffer.from(block.subarray(start, end)).toString('utf8')
}

function octal(block: Uint8Array, start: number, length: number): number {
  const s = field(block, start, length).trim()
  if (!/^[0-7]*$/.test(s)) throw new Error('Corrupt tar header (size)')
  return s ? parseInt(s, 8) : 0
}

export function parseTarHeader(block: Uint8Array): TarEntry {
  if (block.length !== 512) throw new Error('A tar header is 512 bytes')
  if (block.every((b) => b === 0)) return { kind: 'end' }
  let checksum = 0
  for (let i = 0; i < 512; i++) checksum += i >= 148 && i < 156 ? 32 : block[i]
  if (checksum !== octal(block, 148, 8)) throw new Error('Corrupt tar header (checksum)')
  const size = octal(block, 124, 12)
  const type = String.fromCharCode(block[156] || 48)
  if (type === 'L') return { kind: 'longname', size }
  if (type !== '0' && type !== '7') return { kind: 'skip', size }
  const prefix = field(block, 257, 6).startsWith('ustar') ? field(block, 345, 155) : ''
  const name = field(block, 0, 100)
  return { kind: 'file', name: prefix ? `${prefix}/${name}` : name, size }
}

// The archive path mapped to a kept file name, or null to skip it. Only the
// archive's own root folder and the whitelisted names pass, which also rules
// out absolute paths and `..` (zip-slip).
export function keptName(archive: TtsArchive, path: string): string | null {
  const clean = path.replace(/^\.\//, '')
  const [root, file, ...rest] = clean.split('/')
  if (root !== archive.root || rest.length || !file) return null
  return archive.files.includes(file) ? file : null
}
