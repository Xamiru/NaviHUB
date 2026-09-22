import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { readFile, unlink } from 'fs/promises'
import { dirname, join } from 'path'
import { setTimeout as sleep } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, runImport, setImportPhase, setImportProgress } from './importer'
import { fetchWithRetry } from '../http'
import { jpAudioDir } from '../files'
import type { AudioSentence, SentenceAudioBankInfo, SentenceAudioImportSummary } from '@shared/types'

// Tatoeba per-sentence audio: ~6.4k Japanese sentences have native recordings.
// The clip list + sentence texts come as two small bz2 exports; each clip is
// then fetched individually (throttled, resumable — files are keyed by
// audio_id, so a re-run skips everything already on disk). Rows join onto the
// EXISTING sentence bank by exact jp text: re-importing the bank rebuilds
// sentence ids, but the text survives.
//
// Licensing is per clip: rows with an EMPTY license column are not reusable
// and are SKIPPED, and each kept row stores its license + contributor.

const SOURCE = 'tatoeba-audio'
const CHUNK = 500
const THROTTLE_MS = 300
const MAX_CONSECUTIVE_FAILURES = 20
const MAX_CLIP_BYTES = 16 * 1024 * 1024

const AUDIO_LIST_URL =
  'https://downloads.tatoeba.org/exports/per_language/jpn/jpn_sentences_with_audio.tsv.bz2'
const JPN_SENTENCES_URL =
  'https://downloads.tatoeba.org/exports/per_language/jpn/jpn_sentences.tsv.bz2'
// Verified live (2026-08-01): 200 audio/mpeg.
const clipUrl = (audioId: number): string => `https://tatoeba.org/audio/download/${audioId}`

// ---- pure parsing (exported for tests) ----

export interface AudioListRow {
  sentenceId: number
  audioId: number
  username: string
  license: string
  attribution: string | null // attribution URL when supplied
}

// jpn_sentences_with_audio.tsv: sentence_id \t audio_id \t username \t license
// \t attribution_url (verified live). EMPTY license = not reusable = skipped.
export function parseAudioListTsv(text: string): {
  rows: AudioListRow[]
  skippedUnlicensed: number
} {
  const rows: AudioListRow[] = []
  let skippedUnlicensed = 0
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue
    const cols = line.split('\t')
    if (cols.length < 4) continue
    const sentenceId = Number(cols[0])
    const audioId = Number(cols[1])
    if (!Number.isInteger(sentenceId) || !Number.isInteger(audioId)) continue
    const license = (cols[3] ?? '').trim()
    if (!license) {
      skippedUnlicensed += 1
      continue
    }
    rows.push({
      sentenceId,
      audioId,
      username: (cols[2] ?? '').trim(),
      license,
      attribution: cols.length > 4 && cols[4].trim() ? cols[4].trim() : null
    })
  }
  if (rows.length === 0) {
    throw new Error('No licensed audio rows parsed — the Tatoeba export format may have drifted')
  }
  return { rows, skippedUnlicensed }
}

// jpn_sentences.tsv: id \t lang \t text — only the ids we need are kept.
export function parseJpnSentencesTsv(text: string, wantedIds: Set<number>): Map<number, string> {
  const out = new Map<number, string>()
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue
    const cols = line.split('\t')
    if (cols.length < 3) continue
    const id = Number(cols[0])
    if (!wantedIds.has(id)) continue
    const jp = cols[2].trim()
    if (jp) out.set(id, jp)
  }
  return out
}

export interface PlannedClip {
  audioId: number
  tatoebaId: number
  jp: string
  license: string
  attribution: string | null
}

// Intersect the audio list with the sentences actually installed in the bank.
// Text drift between Tatoeba's nightly export and the bank's source just
// means a skipped clip, counted honestly.
export function planClips(
  rows: AudioListRow[],
  idToText: Map<number, string>,
  installedJp: Set<string>
): { clips: PlannedClip[]; skippedUnmatched: number } {
  const clips: PlannedClip[] = []
  const seenAudio = new Set<number>()
  let skippedUnmatched = 0
  for (const row of rows) {
    if (seenAudio.has(row.audioId)) continue
    seenAudio.add(row.audioId)
    const jp = idToText.get(row.sentenceId)
    if (!jp || !installedJp.has(jp)) {
      skippedUnmatched += 1
      continue
    }
    clips.push({
      audioId: row.audioId,
      tatoebaId: row.sentenceId,
      jp,
      license: row.license,
      attribution: row.attribution ? `${row.username} · ${row.attribution}` : row.username || null
    })
  }
  return { clips, skippedUnmatched }
}

// ---- import ----

function deleteBankRows(db: Database.Database, bankId: number): void {
  db.prepare('DELETE FROM sentence_audio WHERE bank_id = ?').run(bankId)
}

export interface AudioImportDeps {
  fetchClip(audioId: number): Promise<Buffer | null>
  fileExists(relPath: string): boolean // relative to the jpaudio root
  writeClip(relPath: string, bytes: Buffer): void
  throttle(): Promise<void>
}

// Core import, pure of network/fs IO — the unit-test entry point. Resume is
// free: clips already on disk are neither fetched nor throttled.
export async function importAudioData(
  clips: PlannedClip[],
  skippedUnlicensed: number,
  skippedUnmatched: number,
  deps: AudioImportDeps
): Promise<SentenceAudioImportSummary> {
  const db = getDictDb()
  if (clips.length === 0) {
    throw new Error(
      'No clips match the installed sentence bank — re-import the example sentences first'
    )
  }

  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM audio_bank').get() as { n: number }).n
  const ins = db.prepare(
    `INSERT INTO sentence_audio (bank_id, audio_id, tatoeba_id, jp, path, license, attribution)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  const insChunk = db.transaction((rows: { clip: PlannedClip; path: string }[]) => {
    for (const { clip, path } of rows) {
      ins.run(newId, clip.audioId, clip.tatoebaId, clip.jp, path, clip.license, clip.attribution)
    }
  })

  let clipCount = 0
  let failed = 0
  let consecutiveFailures = 0
  try {
    setImportPhase('audio', 0, clips.length)
    let pending: { clip: PlannedClip; path: string }[] = []
    let processed = 0
    for (const clip of clips) {
      processed += 1
      const rel = `tatoeba/${clip.audioId}.mp3`
      let onDisk = deps.fileExists(rel)
      if (!onDisk) {
        const bytes = await deps.fetchClip(clip.audioId)
        if (bytes && bytes.length > 0) {
          deps.writeClip(rel, bytes)
          onDisk = true
          consecutiveFailures = 0
        } else {
          failed += 1
          consecutiveFailures += 1
          if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
            throw new Error(
              `Aborted after ${MAX_CONSECUTIVE_FAILURES} consecutive download failures — ` +
                'the audio host looks down; re-running later resumes where this stopped'
            )
          }
        }
        await deps.throttle()
      }
      // Rows are staged only for files verified on disk.
      if (onDisk) {
        pending.push({ clip, path: `jpaudio/${rel}` })
        clipCount += 1
      }
      if (pending.length >= CHUNK) {
        insChunk(pending)
        pending = []
      }
      setImportProgress(processed)
    }
    if (pending.length > 0) insChunk(pending)
    if (clipCount === 0) throw new Error('Every clip download failed — nothing imported')
  } catch (err) {
    deleteBankRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM audio_bank WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    deleteBankRows(db, old.id)
    db.prepare('DELETE FROM audio_bank WHERE id = ?').run(old.id)
  }
  db.prepare('INSERT INTO audio_bank (id, source, clip_count) VALUES (?, ?, ?)').run(
    newId,
    SOURCE,
    clipCount
  )
  return { clipCount, skippedUnlicensed, skippedUnmatched, failed }
}

export function importSentenceAudio(): Promise<SentenceAudioImportSummary> {
  return runImport(async () => {
    const db = getDictDb()
    // Precondition: the audio joins onto the sentence bank by text.
    const installed = db
      .prepare('SELECT s.jp FROM sentence s JOIN sentence_bank b ON b.id = s.bank_id')
      .all() as { jp: string }[]
    if (installed.length === 0) {
      throw new Error('Install the example-sentence bank first — the audio attaches to it')
    }
    const installedJp = new Set(installed.map((r) => r.jp))

    // seek-bzip is CJS and pure JS; lazy import keeps startup untouched.
    const bz = (await import('seek-bzip')) as unknown as { decode(buf: Buffer): Buffer }

    const listTmp = await downloadToTemp(AUDIO_LIST_URL, 'bz2')
    let sentTmp: string | null = null
    try {
      sentTmp = await downloadToTemp(JPN_SENTENCES_URL, 'bz2')
      setImportPhase('reading')
      const { rows, skippedUnlicensed } = parseAudioListTsv(
        bz.decode(await readFile(listTmp)).toString('utf8')
      )
      const idToText = parseJpnSentencesTsv(
        bz.decode(await readFile(sentTmp)).toString('utf8'),
        new Set(rows.map((r) => r.sentenceId))
      )
      const { clips, skippedUnmatched } = planClips(rows, idToText, installedJp)

      const root = jpAudioDir()
      return await importAudioData(clips, skippedUnlicensed, skippedUnmatched, {
        fetchClip: async (audioId) => {
          try {
            // Fail fast per clip: one worker, bounded timeout, no 429 waits
            // (the gachaNews lesson) — a down host aborts via the
            // consecutive-failure counter instead of hanging for an hour.
            const res = await fetchWithRetry(
              clipUrl(audioId),
              {
                timeoutMs: 30_000,
                rateLimitWaits: 0,
                maxResponseBytes: MAX_CLIP_BYTES
              },
              1
            )
            if (!res.ok) return null
            return Buffer.from(await res.arrayBuffer())
          } catch {
            return null
          }
        },
        fileExists: (rel) => existsSync(join(root, rel)),
        writeClip: (rel, bytes) => {
          const abs = join(root, rel)
          mkdirSync(dirname(abs), { recursive: true })
          writeFileSync(abs, bytes)
        },
        throttle: () => sleep(THROTTLE_MS)
      })
    } finally {
      await unlink(listTmp).catch(() => {})
      if (sentTmp) await unlink(sentTmp).catch(() => {})
    }
  })
}

// ---- queries ----

export function getAudioBankInfo(): SentenceAudioBankInfo | null {
  try {
    const row = getDictDb()
      .prepare('SELECT clip_count, imported_at FROM audio_bank WHERE source = ?')
      .get(SOURCE) as { clip_count: number; imported_at: string } | undefined
    return row ? { clipCount: row.clip_count, importedAt: row.imported_at } : null
  } catch {
    return null
  }
}

export function removeAudioBank(): void {
  const db = getDictDb()
  const row = db.prepare('SELECT id FROM audio_bank WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (!row) return
  deleteBankRows(db, row.id)
  db.prepare('DELETE FROM audio_bank WHERE id = ?').run(row.id)
  const dir = join(jpAudioDir(), 'tatoeba')
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
}

// Random playable sentences for the dictation drill, EN gloss joined from the
// sentence bank by exact text.
export function sampleAudioSentences(req: { limit: number; maxChars?: number }): AudioSentence[] {
  try {
    const db = getDictDb()
    const limit = Math.max(1, Math.min(50, req.limit))
    const maxChars = req.maxChars ?? 60
    const rows = db
      .prepare(
        `SELECT sa.jp, sa.path, sa.attribution, sa.license,
                (SELECT s.en FROM sentence s JOIN sentence_bank b ON b.id = s.bank_id
                 WHERE s.jp = sa.jp LIMIT 1) AS en
         FROM sentence_audio sa JOIN audio_bank ab ON ab.id = sa.bank_id
         WHERE length(sa.jp) <= ?
         ORDER BY RANDOM() LIMIT ?`
      )
      .all(maxChars, limit) as {
      jp: string
      path: string
      attribution: string | null
      license: string
      en: string | null
    }[]
    return rows
      .filter((r) => r.en)
      .map((r) => ({
        jp: r.jp,
        en: r.en!,
        audioPath: r.path,
        attribution: r.attribution ? `${r.attribution} (${r.license})` : r.license
      }))
  } catch {
    return []
  }
}
