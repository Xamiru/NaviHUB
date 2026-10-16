import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { gzipSync } from 'node:zlib'
import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('electron', () => ({ app: { getPath: () => tmpdir() } }))

import {
  expectedReading,
  isPlayableWav,
  keptName,
  openJTalkArgs,
  parseTarHeader,
  readingFromTrace,
  speakableText,
  ttsCacheName,
  TTS_ARCHIVES,
  type TtsArchive
} from '../src/main/tts/ttsCore'
import { extractTarGz } from '../src/main/tts/tarExtract'
import { installArchive } from '../src/main/tts/openJTalkPack'
import { createTtsService, packInstalled, pruneCache } from '../src/main/tts/ttsService'

const dirs: string[] = []
const scratch = (): string => {
  const d = mkdtempSync(join(tmpdir(), 'navihub-tts-'))
  dirs.push(d)
  return d
}
afterEach(() => {
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true })
})

// A minimal ustar archive builder, so extraction is tested on real bytes.
function tarHeader(name: string, size: number, type = '0'): Buffer {
  const h = Buffer.alloc(512)
  h.write(name.slice(0, 100), 0, 'utf8')
  h.write('0000644\0', 100)
  h.write('0000000\0', 108)
  h.write('0000000\0', 116)
  h.write(size.toString(8).padStart(11, '0') + '\0', 124)
  h.write('00000000000\0', 136)
  h.write('        ', 148)
  h.write(type, 156)
  h.write('ustar\0', 257)
  h.write('00', 263)
  let sum = 0
  for (const b of h) sum += b
  h.write(sum.toString(8).padStart(6, '0') + '\0 ', 148)
  return h
}
function tarOf(entries: { name: string; data?: string; type?: string }[]): Buffer {
  const parts: Buffer[] = []
  for (const e of entries) {
    const data = Buffer.from(e.data ?? '')
    parts.push(tarHeader(e.name, data.length, e.type))
    parts.push(data, Buffer.alloc((512 - (data.length % 512)) % 512))
  }
  parts.push(Buffer.alloc(1024))
  return Buffer.concat(parts)
}

const archive: TtsArchive = {
  key: 'voice',
  url: 'https://example.invalid/v.tar.gz',
  sha256: '',
  maxBytes: 1 << 20,
  root: 'voice-1.0',
  files: ['a.htsvoice', 'COPYING']
}

describe('voice core', () => {
  it('speaks only Japanese text, trimmed and capped', () => {
    expect(speakableText('  猫  が\n好き ')).toBe('猫 が 好き')
    expect(speakableText('hello')).toBeNull()
    expect(speakableText('')).toBeNull()
    expect(speakableText('あ'.repeat(500))!.length).toBe(200)
    // Capped by code point: a non-BMP kanji at the cut is kept whole.
    expect(Array.from(speakableText('𠮟'.repeat(300))!)).toHaveLength(200)
    expect(speakableText('ｶﾀｶﾅ')).toBe('ｶﾀｶﾅ')
    expect(speakableText(null)).toBeNull()
    expect(speakableText(42)).toBeNull()
  })

  it('reads the engine’s chosen reading from its trace', () => {
    const trace = `[Text analysis result]\n今日,名詞,副詞可能,*,*,*,*,今日,キョウ,キョー,1/2,C1,-1\nは,助詞,係助詞,*,*,*,*,は,ハ,ワ,0/1,動詞%F2/形容詞%F2/名詞%F1,1\n\n[Output label]\nxx`
    expect(readingFromTrace(trace)).toBe('きょうは')
    expect(readingFromTrace('no analysis')).toBeNull()
    expect(expectedReading('きょう、は。')).toBe('きょうは')
    expect(expectedReading('キョウ')).toBe('きょう')
    expect(expectedReading('')).toBeNull()
  })

  it('caches only real WAV clips', () => {
    const wav = Buffer.alloc(2048)
    wav.write('RIFF', 0)
    wav.write('WAVE', 8)
    expect(isPlayableWav(wav)).toBe(true)
    expect(isPlayableWav(Buffer.alloc(0))).toBe(false)
    expect(isPlayableWav(Buffer.alloc(2048))).toBe(false)
  })

  it('names cache files by text and voice, stably', () => {
    expect(ttsCacheName('猫')).toBe(ttsCacheName('猫'))
    expect(ttsCacheName('猫')).not.toBe(ttsCacheName('犬'))
    expect(ttsCacheName('猫', 'a')).not.toBe(ttsCacheName('猫', 'b'))
    expect(ttsCacheName('今日', undefined, 'こんにち')).not.toBe(ttsCacheName('今日', undefined, 'きょう'))
    expect(ttsCacheName('猫')).toMatch(/^[0-9a-f]{40}\.wav$/)
  })

  it('drives the engine inside its virtual filesystem', () => {
    // No -s: the voice's native rate (a lower rate alone would play at half speed).
    expect(openJTalkArgs()).toEqual(['-x', '/dic', '-m', '/voice/nitech_jp_atr503_m001.htsvoice', '-ow', '/out.wav', '-ot', '/trace.txt', '/in.txt'])
  })

  it('keeps only whitelisted names under the archive root (no zip-slip)', () => {
    expect(keptName(archive, 'voice-1.0/a.htsvoice')).toBe('a.htsvoice')
    expect(keptName(archive, './voice-1.0/COPYING')).toBe('COPYING')
    expect(keptName(archive, 'voice-1.0/other.bin')).toBeNull()
    expect(keptName(archive, 'voice-1.0/../a.htsvoice')).toBeNull()
    expect(keptName(archive, '/etc/a.htsvoice')).toBeNull()
    expect(keptName(archive, 'voice-1.0/sub/a.htsvoice')).toBeNull()
  })

  it('parses tar headers and rejects a corrupt checksum', () => {
    expect(parseTarHeader(tarHeader('voice-1.0/a.htsvoice', 10))).toEqual({ kind: 'file', name: 'voice-1.0/a.htsvoice', size: 10 })
    expect(parseTarHeader(tarHeader('voice-1.0/', 0, '5'))).toEqual({ kind: 'skip', size: 0 })
    expect(parseTarHeader(Buffer.alloc(512))).toEqual({ kind: 'end' })
    const bad = tarHeader('x', 1)
    bad[0] = 'y'.charCodeAt(0)
    expect(() => parseTarHeader(bad)).toThrow(/checksum/)
  })

  it('pins both pack archives with a checksum and a whitelist', () => {
    for (const a of TTS_ARCHIVES) {
      expect(a.sha256).toMatch(/^[0-9a-f]{64}$/)
      expect(a.url.startsWith('https://')).toBe(true)
      expect(a.files.length).toBeGreaterThan(0)
    }
  })
})

describe('tar.gz extraction', () => {
  it('writes the whitelisted files and nothing else', async () => {
    const dir = scratch()
    const file = join(dir, 'v.tar.gz')
    const big = 'x'.repeat(1300) // spans block boundaries
    writeFileSync(
      file,
      gzipSync(
        tarOf([
          { name: 'voice-1.0/', type: '5' },
          { name: 'voice-1.0/a.htsvoice', data: big },
          { name: 'voice-1.0/evil.sh', data: 'rm -rf /' },
          { name: 'voice-1.0/COPYING', data: 'CC BY 3.0' }
        ])
      )
    )
    const out = join(dir, 'out')
    mkdirSync(out)
    const written = await extractTarGz(file, out, archive, 1 << 20)
    expect(written.sort()).toEqual(['COPYING', 'a.htsvoice'])
    expect(readdirSync(out).sort()).toEqual(['COPYING', 'a.htsvoice'])
    expect(readFileSync(join(out, 'a.htsvoice'), 'utf8')).toBe(big)
  })

  it('stops an archive that unpacks beyond its cap', async () => {
    const dir = scratch()
    const file = join(dir, 'v.tar.gz')
    writeFileSync(file, gzipSync(tarOf([{ name: 'voice-1.0/a.htsvoice', data: 'y'.repeat(50_000) }])))
    mkdirSync(join(dir, 'out'))
    await expect(extractTarGz(file, join(dir, 'out'), archive, 10_000)).rejects.toThrow(/beyond/)
  })

  it('fails (never hangs) on an output error such as a duplicate entry', async () => {
    const dir = scratch()
    const file = join(dir, 'v.tar.gz')
    writeFileSync(
      file,
      gzipSync(tarOf([{ name: 'voice-1.0/COPYING', data: 'one' }, { name: 'voice-1.0/COPYING', data: 'two' }]))
    )
    mkdirSync(join(dir, 'out'))
    await expect(extractTarGz(file, join(dir, 'out'), archive, 1 << 20)).rejects.toThrow(/EEXIST/)
  })

  it('refuses a download whose checksum does not match, before extracting', async () => {
    const dir = scratch()
    const file = join(dir, 'v.tar.gz')
    const bytes = gzipSync(tarOf([{ name: 'voice-1.0/a.htsvoice', data: 'v' }, { name: 'voice-1.0/COPYING', data: 'c' }]))
    writeFileSync(file, bytes)
    await expect(installArchive(dir, { ...archive, sha256: '0'.repeat(64) }, file)).rejects.toThrow(/checksum/)
    expect(existsSync(join(dir, 'voice'))).toBe(false)
    const sha = createHash('sha256').update(bytes).digest('hex')
    await installArchive(dir, { ...archive, sha256: sha }, file)
    expect(readdirSync(join(dir, 'voice')).sort()).toEqual(['COPYING', 'a.htsvoice'])
  })
})

function installFakePack(packDir: string): void {
  for (const a of TTS_ARCHIVES) {
    const sub = join(packDir, a.key === 'dictionary' ? 'dic' : 'voice')
    mkdirSync(sub, { recursive: true })
    for (const f of a.files) writeFileSync(join(sub, f), 'x')
  }
}

describe('voice service', () => {
  it('returns nothing without the pack, then synthesizes once and caches', async () => {
    const packDir = scratch()
    const cacheDir = join(scratch(), 'tts')
    const fakeWav = (text: string): Uint8Array => {
      const b = Buffer.alloc(2048)
      b.write('RIFF', 0)
      b.write('WAVE', 8)
      b.write(text, 44)
      return new Uint8Array(b)
    }
    const synth = vi.fn(async (text: string) => fakeWav(text))
    const service = createTtsService({ packDir, cacheDir, synth })
    expect(await service.speak('猫')).toBeNull()
    installFakePack(packDir)
    expect(packInstalled(packDir)).toBe(true)
    const [a, b] = await Promise.all([service.speak('猫'), service.speak('猫')])
    expect(a).toBe(`ttscache/${ttsCacheName('猫')}`)
    expect(b).toBe(a)
    expect(await service.speak(' 猫 ')).toBe(a)
    expect(synth).toHaveBeenCalledTimes(1) // concurrent calls shared one synthesis; the cache served the rest
    expect(readFileSync(join(cacheDir, ttsCacheName('猫'))).subarray(44, 47).toString()).toBe('猫')
    expect(await service.speak('hello')).toBeNull()
    // A reading makes a separate clip and reaches the synthesizer.
    await service.speak('今日', 'こんにち')
    expect(synth).toHaveBeenLastCalledWith('今日', 'こんにち')
  })

  it('refuses to cache a broken clip, and stays off while the pack is replaced', async () => {
    const packDir = scratch()
    installFakePack(packDir)
    const cacheDir = join(scratch(), 'tts')
    let enabled = true
    const service = createTtsService({ packDir, cacheDir, synth: async () => new Uint8Array(0), enabled: () => enabled })
    await expect(service.speak('猫')).rejects.toThrow(/no audio/)
    expect(existsSync(join(cacheDir, ttsCacheName('猫')))).toBe(false)
    enabled = false
    expect(await service.speak('犬')).toBeNull()
  })

  it('prunes the oldest clips past the cap', async () => {
    const dir = scratch()
    for (const [i, name] of ['a', 'b', 'c'].entries()) {
      writeFileSync(join(dir, `${name}.wav`), Buffer.alloc(1000))
      const { utimesSync } = await import('node:fs')
      utimesSync(join(dir, `${name}.wav`), 1000 + i, 1000 + i)
    }
    expect(await pruneCache(dir, 2000)).toBe(1)
    expect(readdirSync(dir).sort()).toEqual(['b.wav', 'c.wav'])
  })
})

describe('the committed engine', () => {
  it('loads and instantiates its WebAssembly', async () => {
    const enginePath = join(process.cwd(), 'resources/openjtalk/open_jtalk.js')
    const create = createRequire(enginePath)(enginePath) as (o: object) => Promise<{ callMain: unknown; FS: unknown }>
    const M = await create({ print: () => {}, printErr: () => {} })
    expect(typeof M.callMain).toBe('function')
    expect(M.FS).toBeTruthy()
  })
})
