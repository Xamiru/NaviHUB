import { spawn, execFile, type ChildProcessWithoutNullStreams } from 'child_process'
import { basename, join } from 'path'
import { getSqlite } from './db/connection'
import { get as getSetting } from './repos/settingsRepo'
import { mangaRootDir } from './files'
import { assertSafeArgPath } from './video/playability'
import { findSidecar } from './mokuro'
import { isEpubFile } from './epub'
import type { ChapterOcrOverview, MangaOcrRunStatus, MokuroDetectResult } from '@shared/types'

// In-app mokuro runs: ONE spawn of the user-installed binary (settings key
// mokuro.path, never bundled — the ytdlp.path posture) over every eligible
// volume of a series that lacks a sidecar. mokuro accepts directories AND
// .cbz/.zip archives directly (it extracts to its own temp dir) and writes
// <stem>.mokuro beside the input — exactly where mokuro.ts:findSidecar looks,
// so a finished run is picked up on the next chapter open with no cache-busting.
// One run at a time, polled via manga:ocrRunStatus — the video/session.ts shape.

// ---------------------------------------------------------------------------
// Pure helpers (exported for tests — no child_process, no fs).
// ---------------------------------------------------------------------------

export function mokuroBin(): string {
  return getSetting('mokuro.path')?.trim() || 'mokuro'
}

// --disable_html is load-bearing: legacy HTML output forces mokuro to unzip
// archives IN PLACE, littering the manga dir with extracted folders.
export function buildMokuroArgs(volumePaths: string[]): string[] {
  for (const p of volumePaths) assertSafeArgPath(p)
  return ['--disable_confirmation', '--ignore_errors', '--disable_html', ...volumePaths]
}

export type MokuroLineEvent =
  | { kind: 'volume'; index: number; count: number; title: string }
  | { kind: 'page'; percent: number; done: number; total: number }
  | { kind: 'summary'; ok: number; total: number }

// mokuro logs through loguru (per-volume "Processing i/N: <path>" lines, and a
// final "Processed successfully: k/N") and tqdm (per-page bars, \r-separated).
// The model-download tqdm bars ("450M/450M") deliberately don't match the page
// pattern — their counts carry unit suffixes, so \d+/\d+ misses them.
export function parseMokuroLine(line: string): MokuroLineEvent | null {
  const vol = line.match(/Processing (\d+)\/(\d+): (.+?)\s*$/)
  if (vol) {
    return {
      kind: 'volume',
      index: Number(vol[1]),
      count: Number(vol[2]),
      title: basename(vol[3].trim())
    }
  }
  const summary = line.match(/Processed successfully: (\d+)\/(\d+)/)
  if (summary) return { kind: 'summary', ok: Number(summary[1]), total: Number(summary[2]) }
  const page = line.match(/(\d+)%\|.*\|\s*(\d+)\/(\d+)/)
  if (page) {
    return { kind: 'page', percent: Number(page[1]), done: Number(page[2]), total: Number(page[3]) }
  }
  return null
}

// Which chapters need a run: image chapters (folder or archive — EPUBs are
// text already) without a sidecar. The fs probe is injected so tests drive
// this against plain strings.
export function selectOcrTargets(
  chapterAbsPaths: string[],
  sidecarExists: (absPath: string) => boolean
): string[] {
  return chapterAbsPaths.filter((p) => !isEpubFile(p) && !sidecarExists(p))
}

// ---------------------------------------------------------------------------
// Runner (the video/session.ts singleton: status + poll, stale-run guard).
// ---------------------------------------------------------------------------

let counter = 0
let active: { id: string; proc: ChildProcessWithoutNullStreams; cancelled: boolean } | null = null
let status: MangaOcrRunStatus | null = null

export function getOcrStatus(): MangaOcrRunStatus | null {
  return status ? { ...status } : null
}

function chapterAbsPaths(mediaId: number): string[] {
  const rows = getSqlite()
    .prepare('SELECT dir_path FROM manga_chapter WHERE media_id = ? ORDER BY sort_order, id')
    .all(mediaId) as { dir_path: string }[]
  const root = mangaRootDir()
  return rows.map((r) => join(root, r.dir_path))
}

// tqdm ends bars with \r, not \n — readline would buffer a whole bar's worth
// of updates until the closing newline, so lines are split by hand.
function onStreamLines(stream: NodeJS.ReadableStream, onLine: (line: string) => void): void {
  let buf = ''
  stream.setEncoding('utf-8')
  stream.on('data', (chunk: string) => {
    buf += chunk
    const parts = buf.split(/\r\n|\r|\n/)
    buf = parts.pop() ?? ''
    for (const p of parts) if (p.trim() !== '') onLine(p)
  })
  stream.on('end', () => {
    if (buf.trim() !== '') onLine(buf)
  })
}

// Fire-and-poll: returns as soon as mokuro is spawned. Throws synchronously
// for anything the caller can fix, so the UI shows a real message instead of
// a status that never starts.
export function startOcr(mediaId: number): { id: string } {
  if (active) throw new Error('An OCR run is already in progress.')
  const paths = chapterAbsPaths(mediaId)
  if (paths.length === 0) throw new Error('This series has no local chapters to OCR.')
  const targets = selectOcrTargets(paths, (p) => findSidecar(p) != null)
  if (targets.length === 0) {
    throw new Error('Every chapter already has OCR (EPUB volumes never need it).')
  }
  const args = buildMokuroArgs(targets)

  counter += 1
  const id = `ocr-${process.pid}-${counter}`
  status = {
    id,
    state: 'starting',
    volumeIndex: null,
    volumeCount: targets.length,
    volumeTitle: null,
    percent: null,
    okCount: null,
    message: 'Loading OCR model — a first run downloads ~450 MB of models…'
  }

  const proc = spawn(mokuroBin(), args) as ChildProcessWithoutNullStreams
  active = { id, proc, cancelled: false }

  // Python tracebacks land on stderr; keep a tail so an error status can show
  // the real cause instead of "exited with code 1".
  const tail: string[] = []
  const onLine = (line: string): void => {
    if (!status || status.id !== id) return
    tail.push(line)
    if (tail.length > 20) tail.shift()
    const ev = parseMokuroLine(line)
    if (!ev) return
    if (ev.kind === 'volume') {
      status.state = 'running'
      status.volumeIndex = ev.index
      status.volumeCount = ev.count
      status.volumeTitle = ev.title
      status.percent = 0
      status.message = null
    } else if (ev.kind === 'page') {
      // Only meaningful once a volume started — the model download shows tqdm
      // bars too, but those never match the page pattern (unit suffixes).
      if (status.state === 'running') status.percent = ev.percent
    } else {
      status.okCount = ev.ok
    }
  }
  onStreamLines(proc.stdout, onLine)
  onStreamLines(proc.stderr, onLine)

  const done = new Promise<{ code: number | null; errMsg: string | null }>((resolve) => {
    let settled = false
    const finish = (code: number | null, errMsg: string | null = null): void => {
      if (settled) return
      settled = true
      resolve({ code, errMsg })
    }
    proc.on('error', (err) => finish(null, err.message))
    proc.on('close', (code) => finish(code))
  })

  void done.then(({ code, errMsg }) => {
    const wasCancelled = active?.id === id && active.cancelled
    if (active?.id === id) active = null
    if (!status || status.id !== id) return

    if (wasCancelled) {
      status.state = 'cancelled'
      status.message = 'Cancelled — finished volumes keep their OCR.'
    } else if (code === 0) {
      status.state = 'done'
      status.percent = 100
      status.okCount = status.okCount ?? targets.length
      status.message = null
    } else {
      status.state = 'error'
      status.percent = null
      status.message =
        code == null
          ? `Could not run "${mokuroBin()}" — install mokuro (pipx install mokuro) or set its path in Settings (${errMsg})`
          : tail.slice(-3).join(' · ') || `mokuro exited with code ${code}`
    }
  })

  return { id }
}

export function cancelOcr(id: string): void {
  if (!active || active.id !== id) return
  active.cancelled = true
  active.proc.kill('SIGTERM')
  const proc = active.proc
  // Unref'd so a pending kill timer can't hold the app open at quit.
  setTimeout(() => {
    try {
      proc.kill('SIGKILL')
    } catch {
      // Already gone.
    }
  }, 5000).unref()
}

// Joins killActiveMusicDownload / killActivePrepare / … in the before-quit list.
export function killActiveOcr(): void {
  if (!active) return
  active.cancelled = true
  try {
    active.proc.kill('SIGKILL')
  } catch {
    // Already gone.
  }
  active = null
}

// Backs the Settings "Save & test" probe. --version never loads the ML model,
// so this is fast; never throws.
export function detectBinary(): Promise<MokuroDetectResult> {
  const bin = mokuroBin()
  return new Promise((resolve) => {
    execFile(bin, ['--version'], { timeout: 10_000 }, (err, stdout) => {
      const ver = err ? null : (stdout.trim().split('\n')[0] ?? null)
      if (ver) resolve({ ok: true, version: ver, error: null })
      else {
        resolve({
          ok: false,
          version: null,
          error: `Could not run "${bin}" — install mokuro (pipx install mokuro) or set its path`
        })
      }
    })
  })
}

// Sidecar presence per chapter, for the Chapters tab chips + missing count.
// Just existsSync probes via findSidecar — cheap even for long series.
export function ocrOverview(mediaId: number): ChapterOcrOverview[] {
  const rows = getSqlite()
    .prepare('SELECT id, dir_path FROM manga_chapter WHERE media_id = ? ORDER BY sort_order, id')
    .all(mediaId) as { id: number; dir_path: string }[]
  const root = mangaRootDir()
  return rows.map((r) => {
    const abs = join(root, r.dir_path)
    return {
      chapterId: r.id,
      hasSidecar: findSidecar(abs) != null,
      ocrEligible: !isEpubFile(abs)
    }
  })
}
