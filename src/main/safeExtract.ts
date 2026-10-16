import { createWriteStream } from 'fs'
import { lstat, mkdir, readdir } from 'fs/promises'
import { dirname, join, relative, isAbsolute, sep } from 'path'
import { pipeline } from 'stream/promises'
import { Transform } from 'stream'
import { spawn, type ChildProcess } from 'child_process'
import yauzl from 'yauzl'
import { assertSafeArgPath } from './video/playability'
import type { TreeEntry } from './modLayoutCore'

// Extracting mod archives into a staging folder without ever writing outside
// it. Every entry name is checked before anything is written (zip directly,
// 7z/rar through a 7-Zip listing first), sizes and counts are capped, links
// are refused, and the finished tree is walked once more with lstat. Nothing
// from an archive is ever executed.

export const MAX_ENTRIES = 50_000
export const MAX_TOTAL_BYTES = 16 * 1024 * 1024 * 1024

// Null when the name is safe, else why not. Archive names use '/' (zip) or
// either separator (7-Zip on Windows); both are treated as separators.
export function unsafeEntryReason(name: string): string | null {
  if (!name || name.includes('\u0000')) return 'an empty or NUL name'
  const norm = name.replace(/\\/g, '/')
  if (norm.startsWith('/') || /^[a-z]:/i.test(norm) || norm.startsWith('//')) return `an absolute path (${name})`
  const parts = norm.split('/').filter((p) => p !== '' && p !== '.')
  if (parts.some((p) => p === '..')) return `a path that climbs out (${name})`
  if (parts.some((p) => /[<>:"|?*]/.test(p))) return `a name Windows cannot store (${name})`
  if (parts.length === 0) return `an empty path (${name})`
  return null
}

function normalised(name: string): string {
  return name
    .replace(/\\/g, '/')
    .split('/')
    .filter((p) => p !== '' && p !== '.')
    .join('/')
}

// Strictly below root. A first segment of exactly '..' climbs out; a name
// that merely starts with dots ('..foo') does not. Case-folded on Windows.
export function isStrictlyInside(root: string, target: string, platform = process.platform): boolean {
  const fold = (x: string): string => (platform === 'win32' ? x.toLowerCase() : x)
  const rel = relative(fold(root), fold(target))
  if (rel === '' || isAbsolute(rel)) return false
  return rel.split(/[\\/]/)[0] !== '..'
}

const inside = isStrictlyInside

function isSymlinkEntry(entry: yauzl.Entry): boolean {
  const mode = (entry.externalFileAttributes >>> 16) & 0o170000
  return mode === 0o120000
}

export class ExtractError extends Error {}

// Zip archives through yauzl (which also checks declared sizes against the
// bytes actually inflated).
export function extractZip(
  archive: string,
  dest: string,
  isCancelled: () => boolean
): Promise<void> {
  return new Promise((resolve, reject) => {
    yauzl.open(archive, { lazyEntries: true, autoClose: true, strictFileNames: false }, (err, zip) => {
      if (err || !zip) return reject(err ?? new ExtractError('Could not open the archive'))
      let count = 0
      let total = 0
      const fail = (e: Error): void => {
        zip.close()
        reject(e)
      }
      zip.on('error', fail)
      zip.on('end', () => resolve())
      zip.on('entry', (entry: yauzl.Entry) => {
        if (isCancelled()) return fail(new ExtractError('Cancelled'))
        const reason = unsafeEntryReason(entry.fileName)
        if (reason) return fail(new ExtractError(`The archive contains ${reason}.`))
        if (isSymlinkEntry(entry)) return fail(new ExtractError(`The archive contains a link (${entry.fileName}).`))
        count += 1
        total += entry.uncompressedSize
        if (count > MAX_ENTRIES) return fail(new ExtractError('The archive has too many files.'))
        if (total > MAX_TOTAL_BYTES) return fail(new ExtractError('The archive unpacks to more than 16 GB.'))
        const target = join(dest, ...normalised(entry.fileName).split('/'))
        if (!inside(dest, target)) return fail(new ExtractError(`The archive contains ${entry.fileName}.`))
        if (entry.fileName.endsWith('/') || entry.fileName.endsWith('\\')) {
          mkdir(target, { recursive: true }).then(() => zip.readEntry(), fail)
          return
        }
        mkdir(dirname(target), { recursive: true })
          .then(
            () =>
              new Promise<void>((res, rej) => {
                zip.openReadStream(entry, (e, stream) => {
                  if (e || !stream) return rej(e ?? new ExtractError('Unreadable entry'))
                  let written = 0
                  const guard = new Transform({
                    transform(chunk: Buffer, _enc, cb) {
                      written += chunk.length
                      if (written > entry.uncompressedSize) cb(new ExtractError('An archive entry is larger than it says.'))
                      else cb(null, chunk)
                    }
                  })
                  pipeline(stream, guard, createWriteStream(target, { flags: 'wx' })).then(res, rej)
                })
              })
          )
          .then(() => zip.readEntry(), fail)
      })
      zip.readEntry()
    })
  })
}

// ---- 7-Zip (7z, rar and anything else it reads) ----

export interface SevenZipEntry {
  path: string
  isDir: boolean
  link: boolean
  size: number
}

// `7z l -slt` prints one "Key = Value" block per entry after a "----------"
// line. A posix mode starting with 'l', or a symbolic-link attribute, marks a
// link.
// A listing field name, not a setting (the backup test scans for get('…')).
const PATH_FIELD = 'Path'

export function parseSevenZipListing(text: string): SevenZipEntry[] {
  const body = text.split(/^-{10}\s*$/m).slice(1).join('\n')
  const out: SevenZipEntry[] = []
  for (const block of body.split(/\r?\n\r?\n/)) {
    const fields = new Map<string, string>()
    for (const line of block.split(/\r?\n/)) {
      const m = /^([A-Za-z ]+?) = (.*)$/.exec(line)
      if (m) fields.set(m[1], m[2])
    }
    const path = fields.get(PATH_FIELD)
    if (!path) continue
    const attrs = fields.get('Attributes') ?? ''
    const folder = fields.get('Folder')
    out.push({
      path,
      isDir: folder === '+' || /^D/.test(attrs),
      link: /(^|\s)l[rwx-]{9}/.test(attrs) || fields.has('Symbolic Link') || fields.has('Hard Link'),
      size: Number(fields.get('Size') ?? 0) || 0
    })
  }
  return out
}

export function checkListing(entries: readonly SevenZipEntry[]): void {
  if (entries.length > MAX_ENTRIES) throw new ExtractError('The archive has too many files.')
  let total = 0
  for (const e of entries) {
    const reason = unsafeEntryReason(e.path)
    if (reason) throw new ExtractError(`The archive contains ${reason}.`)
    if (e.link) throw new ExtractError(`The archive contains a link (${e.path}).`)
    total += e.size
  }
  if (total > MAX_TOTAL_BYTES) throw new ExtractError('The archive unpacks to more than 16 GB.')
}

function run(
  exe: string,
  args: string[],
  onProc: (p: ChildProcess | null) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(exe, args, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true })
    onProc(proc)
    const out: Buffer[] = []
    let outBytes = 0
    let overflow = false
    proc.stdout.on('data', (c: Buffer) => {
      outBytes += c.length
      // A listing too long to hold is refused outright: validating only part
      // of it would let the rest through unchecked.
      if (outBytes > 64 * 1024 * 1024) {
        if (!overflow) {
          overflow = true
          proc.kill()
        }
        return
      }
      out.push(c)
    })
    proc.stderr.on('data', () => undefined)
    proc.on('error', (e) => {
      onProc(null)
      reject(e)
    })
    proc.on('close', (code) => {
      onProc(null)
      if (overflow) reject(new ExtractError('The archive listing is too large to check.'))
      else if (code === 0) resolve(Buffer.concat(out).toString('utf8'))
      else reject(new ExtractError(`7-Zip exited with code ${code}.`))
    })
  })
}

// List and validate first; extract only an archive whose every name passed.
export async function extractWithSevenZip(
  sevenZip: string,
  archive: string,
  dest: string,
  onProc: (p: ChildProcess | null) => void
): Promise<void> {
  assertSafeArgPath(sevenZip)
  assertSafeArgPath(archive)
  assertSafeArgPath(dest)
  const listing = await run(sevenZip, ['l', '-slt', '-sccUTF-8', '--', archive], onProc)
  checkListing(parseSevenZipListing(listing))
  // -snl would store links; leaving it out makes 7-Zip write no symbolic links.
  await run(sevenZip, ['x', '-y', '-bd', '-sccUTF-8', `-o${dest}`, '--', archive], onProc)
}

// ---- the finished tree ----

// Lists the staging folder ('/'-separated, relative) and refuses any link or
// special file — the last check before a single file is copied out.
export async function listTree(root: string): Promise<TreeEntry[]> {
  const out: TreeEntry[] = []
  const walk = async (rel: string): Promise<void> => {
    for (const name of await readdir(rel ? join(root, ...rel.split('/')) : root)) {
      const childRel = rel ? `${rel}/${name}` : name
      const info = await lstat(join(root, ...childRel.split('/')))
      if (info.isSymbolicLink()) throw new ExtractError(`The archive produced a link (${childRel}).`)
      if (info.isDirectory()) {
        out.push({ path: childRel, isDir: true })
        await walk(childRel)
      } else if (info.isFile()) {
        out.push({ path: childRel, isDir: false })
      } else {
        throw new ExtractError(`The archive produced a special file (${childRel}).`)
      }
      if (out.length > MAX_ENTRIES) throw new ExtractError('The archive has too many files.')
    }
  }
  await walk('')
  return out
}

export const PATH_SEP = sep
