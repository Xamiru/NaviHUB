import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { unlink } from 'fs/promises'
import { dirname, join } from 'path'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, openZipReader, runImport, setImportPhase, setImportProgress } from './importer'
import { jpAudioDir } from '../files'
import type { MinimalPair, MinimalPairItem, PairImportSummary, PairSetInfo } from '@shared/types'

// Pitch minimal pairs — Kuuuube's static backup of the kotu.io perception
// test, with all audio in-repo as base64 blobs inside per-pair JSON files.
// Clips are decoded to userData/jpaudio/pairs/<id>/<n>.<ext> (served via
// navimg://); rows carry the notation metadata. ~18 MB zip, ~4k pairs.

const SOURCE = 'kotu-minimal-pairs'
const CHUNK = 200

// Pinned at a commit sha (repo main verified 2026-08-01).
const PAIRS_SHA = '774a17422a6baadce5877c10069a1d40648e20a9'
const ZIP_URL = `https://codeload.github.com/Kuuuube/minimal-pairs/zip/${PAIRS_SHA}`

// ---- pure parsing (exported for tests) ----

// js/pairs_index.js is `export const pairs_index = {...}` with strict JSON
// after the prefix (verified live) — slice the braces and parse, with a
// drift-friendly error.
export function parsePairsIndexJs(text: string): Record<string, string[]> {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end <= start) {
    throw new Error('pairs_index.js: no JSON object found — format drifted?')
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(text.slice(start, end + 1))
  } catch {
    throw new Error('pairs_index.js: body is not valid JSON — format drifted?')
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('pairs_index.js: expected an object of buckets')
  }
  const out: Record<string, string[]> = {}
  for (const [bucket, ids] of Object.entries(parsed)) {
    if (!Array.isArray(ids)) continue
    out[bucket] = ids.filter((i): i is string => typeof i === 'string')
  }
  if (Object.keys(out).length === 0) throw new Error('pairs_index.js: no buckets found')
  return out
}

export interface ParsedPairClip {
  pron: string // kana as recorded (katakana in the source)
  position: number
  moraCount: number
  bytes: Buffer
  ext: string
}

export interface ParsedPairFile {
  kana: string
  clips: ParsedPairClip[]
}

// Audio containers actually present are sniffed, never trusted from names —
// the source stores bare base64 with no extension at all.
export function sniffAudioExt(bytes: Buffer): string {
  if (bytes.length >= 4 && bytes.toString('latin1', 0, 4) === 'OggS') return '.ogg'
  if (bytes.length >= 3 && bytes.toString('latin1', 0, 3) === 'ID3') return '.mp3'
  if (bytes.length >= 2 && bytes[0] === 0xff) {
    const b1 = bytes[1]
    // ADTS AAC (FFF1/FFF9) vs MPEG audio (FFFB/FFFA/FFF3/FFF2).
    if (b1 === 0xf1 || b1 === 0xf9) return '.aac'
    if ((b1 & 0xe0) === 0xe0) return '.mp3'
  }
  return '.mp3'
}

// data/<id>: {kana, pairs: [{accentedMora, moraCount, pitchAccent,
// rawPronunciation, silencedMoras, soundData(base64)}]} (verified live).
// Malformed files return null and are skipped.
export function parsePairFile(raw: unknown): ParsedPairFile | null {
  const obj = raw as { kana?: unknown; pairs?: unknown }
  if (typeof obj?.kana !== 'string' || !obj.kana || !Array.isArray(obj.pairs)) return null
  const clips: ParsedPairClip[] = []
  for (const p of obj.pairs as Record<string, unknown>[]) {
    const position = typeof p?.pitchAccent === 'number' ? p.pitchAccent : null
    const moraCount = typeof p?.moraCount === 'number' ? p.moraCount : null
    const sound = typeof p?.soundData === 'string' ? p.soundData : null
    if (position === null || moraCount === null || !sound) continue
    let bytes: Buffer
    try {
      bytes = Buffer.from(sound, 'base64')
    } catch {
      continue
    }
    if (bytes.length === 0) continue
    clips.push({
      pron: typeof p.rawPronunciation === 'string' && p.rawPronunciation ? p.rawPronunciation : obj.kana,
      position,
      moraCount,
      bytes,
      ext: sniffAudioExt(bytes)
    })
  }
  if (clips.length < 2) return null // a "pair" needs at least two recordings
  return { kana: obj.kana, clips }
}

// ---- import ----

function deleteSetRows(db: Database.Database, setId: number): void {
  db.prepare('DELETE FROM minimal_pair WHERE set_id = ?').run(setId)
}

// Core import, pure of zip/network IO — the unit-test entry point. `writeClip`
// receives a path relative to the jpaudio root ('pairs/<id>/<n>.<ext>').
export async function importPairsData(
  bucketsById: Map<string, string[]>,
  readPairFile: (id: string) => Promise<unknown | null>,
  writeClip: (relPath: string, bytes: Buffer) => void
): Promise<PairImportSummary> {
  const db = getDictDb()
  const ids = [...bucketsById.keys()]
  if (ids.length === 0) throw new Error('No pairs listed in the pack index')

  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM pair_set').get() as { n: number }).n
  const ins = db.prepare(
    'INSERT INTO minimal_pair (set_id, pair_id, buckets, kana, items) VALUES (?, ?, ?, ?, ?)'
  )
  const insChunk = db.transaction(
    (rows: { pairId: string; buckets: string[]; kana: string; items: MinimalPairItem[] }[]) => {
      for (const r of rows) {
        ins.run(newId, r.pairId, JSON.stringify(r.buckets), r.kana, JSON.stringify(r.items))
      }
    }
  )

  let pairCount = 0
  let clipCount = 0
  try {
    setImportPhase('pairs', 0, ids.length)
    let processed = 0
    let pending: { pairId: string; buckets: string[]; kana: string; items: MinimalPairItem[] }[] = []
    for (const id of ids) {
      processed += 1
      const raw = await readPairFile(id)
      const parsed = raw === null ? null : parsePairFile(raw)
      if (parsed) {
        const items: MinimalPairItem[] = []
        for (let n = 0; n < parsed.clips.length; n++) {
          const clip = parsed.clips[n]
          const rel = `pairs/${id}/${n}${clip.ext}`
          writeClip(rel, clip.bytes)
          items.push({
            pron: clip.pron,
            position: clip.position,
            moraCount: clip.moraCount,
            audioPath: `jpaudio/${rel}`
          })
          clipCount += 1
        }
        pending.push({ pairId: id, buckets: bucketsById.get(id) ?? [], kana: parsed.kana, items })
        pairCount += 1
      }
      if (pending.length >= CHUNK) {
        insChunk(pending)
        pending = []
        await yieldToLoop()
      }
      if (processed % 50 === 0) setImportProgress(processed)
    }
    if (pending.length > 0) insChunk(pending)
    setImportProgress(processed)
    if (pairCount === 0) throw new Error('No usable pairs in the pack — format drifted?')
  } catch (err) {
    deleteSetRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM pair_set WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    deleteSetRows(db, old.id)
    db.prepare('DELETE FROM pair_set WHERE id = ?').run(old.id)
  }
  db.prepare('INSERT INTO pair_set (id, source, revision, pair_count) VALUES (?, ?, ?, ?)').run(
    newId,
    SOURCE,
    PAIRS_SHA.slice(0, 7),
    pairCount
  )
  return { pairCount, clipCount }
}

export function importPairs(): Promise<PairImportSummary> {
  return runImport(async () => {
    const tmp = await downloadToTemp(ZIP_URL)
    try {
      setImportPhase('reading')
      const reader = await openZipReader(tmp)
      try {
        // Entries are prefixed 'minimal-pairs-<sha>/' — locate by suffix.
        const names = reader.bankNames()
        const indexName = names.find((n) => n.endsWith('js/pairs_index.js'))
        if (!indexName) throw new Error('pairs_index.js not found in the download')
        const buckets = parsePairsIndexJs((await reader.readRaw(indexName)).toString('utf8'))
        // id → every bucket it appears in.
        const bucketsById = new Map<string, string[]>()
        for (const [bucket, ids] of Object.entries(buckets)) {
          for (const id of ids) {
            const list = bucketsById.get(id) ?? []
            list.push(bucket)
            bucketsById.set(id, list)
          }
        }
        const dataName = new Map<string, string>()
        for (const n of names) {
          const m = n.match(/(^|\/)data\/([^/]+)$/)
          if (m) dataName.set(m[2], n)
        }
        const root = jpAudioDir()
        return await importPairsData(
          bucketsById,
          async (id) => {
            const entry = dataName.get(id)
            if (!entry) return null
            try {
              return JSON.parse((await reader.readRaw(entry)).toString('utf8'))
            } catch {
              return null
            }
          },
          (relPath, bytes) => {
            const abs = join(root, relPath)
            mkdirSync(dirname(abs), { recursive: true })
            writeFileSync(abs, bytes)
          }
        )
      } finally {
        reader.close()
      }
    } finally {
      await unlink(tmp).catch(() => {})
    }
  })
}

// ---- queries ----

export function getPairSetInfo(): PairSetInfo | null {
  try {
    const row = getDictDb()
      .prepare('SELECT revision, pair_count, imported_at FROM pair_set WHERE source = ?')
      .get(SOURCE) as { revision: string | null; pair_count: number; imported_at: string } | undefined
    return row
      ? { revision: row.revision, pairCount: row.pair_count, importedAt: row.imported_at }
      : null
  } catch {
    return null
  }
}

export function removePairSet(): void {
  const db = getDictDb()
  const row = db.prepare('SELECT id FROM pair_set WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (!row) return
  deleteSetRows(db, row.id)
  db.prepare('DELETE FROM pair_set WHERE id = ?').run(row.id)
  const dir = join(jpAudioDir(), 'pairs')
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
}

// The whole pack in one call (~4k small rows) — the drill filters and samples
// client-side (TorrentFilterBar's derive-chips-from-data precedent).
export function listMinimalPairs(): MinimalPair[] {
  try {
    const db = getDictDb()
    const set = db.prepare('SELECT id FROM pair_set WHERE source = ?').get(SOURCE) as
      | { id: number }
      | undefined
    if (!set) return []
    const rows = db
      .prepare('SELECT pair_id, buckets, kana, items FROM minimal_pair WHERE set_id = ?')
      .all(set.id) as { pair_id: string; buckets: string; kana: string; items: string }[]
    const out: MinimalPair[] = []
    for (const row of rows) {
      try {
        out.push({
          pairId: row.pair_id,
          buckets: JSON.parse(row.buckets),
          kana: row.kana,
          items: JSON.parse(row.items)
        })
      } catch {
        // skip one bad row rather than losing the pack
      }
    }
    return out
  } catch {
    return []
  }
}
