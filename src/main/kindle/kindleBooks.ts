// Books NaviHUB makes for the Kindle (My Quotes, Japanese graded readings),
// written as EPUB files under userData/kindle/generated/. Nothing here touches
// the device: Send to Kindle copies these files later, through its own gate.
// Every call starts from a user action.

import { app, shell } from 'electron'
import archiver from 'archiver'
import { createHash } from 'crypto'
import { createWriteStream, promises as fsp } from 'fs'
import { join } from 'path'
import { JP_PASSAGES } from '@shared/japanese/readings'
import type { KindleBookRequest, KindleMadeBook } from '@shared/types'
import { logInfo } from '../logBus'
import * as quoteRepo from '../repos/quoteRepo'
import { buildEpub, stableBookId, type EpubEntry } from './epubBuild'
import { quotesBook, readingsBook, READING_LEVELS } from './epubContent'
import { deviceFileName, freeFileName } from './kindleCore'

export function generatedDir(): string {
  return join(app.getPath('userData'), 'kindle', 'generated')
}

function hex(s: string): string {
  return createHash('sha1').update(s).digest('hex')
}

function localDay(d: Date): string {
  const p = (n: number): string => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// The IPC boundary: only known shapes are accepted.
function validate(req: KindleBookRequest): KindleBookRequest {
  if (req?.kind === 'quotes') {
    if (req.grouping !== 'source' && req.grouping !== 'theme') throw new Error('Unknown quote grouping')
    return { kind: 'quotes', grouping: req.grouping, favoritesOnly: req.favoritesOnly === true }
  }
  if (req?.kind === 'jpReadings') {
    if (!READING_LEVELS.includes(req.level)) throw new Error('Unknown reading level')
    return { kind: 'jpReadings', level: req.level }
  }
  throw new Error('Unknown book')
}

// Packs the entries in order (mimetype first, stored) into a .part file and
// links it into place, so a failed write never leaves a broken .epub and an
// existing file is never replaced (link fails on an existing name). Only a
// part this call created is removed on failure.
export async function writeEpub(entries: EpubEntry[], dest: string): Promise<number> {
  const part = `${dest}.part`
  let created = false
  // A part left by a crash (Make is one at a time, so nothing else owns it)
  // would make every later 'wx' open of the same name fail. This is the local
  // generated folder under userData, never the device.
  if (!(await fsp.stat(dest).then(() => true, () => false))) {
    await fsp.rm(part, { force: true }).catch(() => undefined)
  }
  try {
    await new Promise<void>((resolve, reject) => {
      const out = createWriteStream(part, { flags: 'wx' })
      const zip = archiver('zip', { zlib: { level: 9 } })
      out.on('open', () => {
        created = true
      })
      out.on('close', () => resolve())
      out.on('error', reject)
      zip.on('error', reject)
      zip.pipe(out)
      for (const e of entries) zip.append(e.data, { name: e.name, store: e.store })
      void zip.finalize()
    })
    await fsp.link(part, dest)
  } catch (err) {
    if (created) await fsp.rm(part, { force: true }).catch(() => undefined)
    throw err
  }
  // Linked: the book is made, so dropping the part is best-effort.
  await fsp.unlink(part).catch(() => undefined)
  return (await fsp.stat(dest)).size
}

// One book at a time: a double-clicked Make must not race itself for a name.
let making = false

export async function listBooks(): Promise<KindleMadeBook[]> {
  const dir = generatedDir()
  const names = await fsp.readdir(dir).catch(() => [] as string[])
  const epubs = names.filter((n) => n.toLowerCase().endsWith('.epub'))
  const stats = await Promise.all(epubs.map((n) => fsp.stat(join(dir, n)).catch(() => null)))
  const out: KindleMadeBook[] = []
  epubs.forEach((fileName, i) => {
    const st = stats[i]
    if (st?.isFile()) out.push({ fileName, bytes: st.size, madeAt: st.mtime.toISOString() })
  })
  return out.sort((a, b) => b.madeAt.localeCompare(a.madeAt))
}

export async function makeBook(request: KindleBookRequest): Promise<KindleMadeBook> {
  const req = validate(request)
  if (making) throw new Error('A book is already being made')
  making = true
  try {
    return await make(req)
  } finally {
    making = false
  }
}

// The quote table is the user's own, hand-curated book (hundreds to a few
// thousand rows), read once per press; it is not whole-library work.
async function make(req: KindleBookRequest): Promise<KindleMadeBook> {
  const now = new Date()
  const book =
    req.kind === 'quotes'
      ? quotesBook(
          quoteRepo.list(),
          req,
          now,
          stableBookId(`${req.favoritesOnly ? 'favorite-quotes' : 'quotes'}-${req.grouping}`, hex)
        )
      : readingsBook(JP_PASSAGES, req.level, now, stableBookId(`jp-readings-${req.level}`, hex))
  const dir = generatedDir()
  await fsp.mkdir(dir, { recursive: true })
  const taken = await fsp.readdir(dir)
  const fileName = freeFileName(deviceFileName(`${book.title} ${localDay(now)}`, 'epub'), taken)
  const bytes = await writeEpub(buildEpub(book), join(dir, fileName))
  logInfo('app', `Kindle: made ${fileName} (${book.chapters.length} chapters, ${bytes} bytes)`)
  return { fileName, bytes, madeAt: now.toISOString() }
}

// Only a book this module lists can be shown: the name is matched against
// the folder, never joined blindly.
export async function revealBook(fileName: string): Promise<void> {
  const books = await listBooks()
  if (!books.some((b) => b.fileName === fileName)) throw new Error('That book is no longer there')
  shell.showItemInFolder(join(generatedDir(), fileName))
}
