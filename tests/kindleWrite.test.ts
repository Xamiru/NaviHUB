import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  DeviceWriter,
  FilesystemUploader,
  GioMtpUploader,
  uploaderFor,
  type GioRunner,
  type Uploader
} from '../src/main/kindle/kindleWrite'
import {
  MAX_FILE_BYTES,
  MAX_SEND_BYTES,
  gioEnv,
  isGvfsMtpRoot,
  keepFree,
  nameTaken,
  planSend,
  refusalText,
  type PlannedSend,
  type SendFile
} from '../src/main/kindle/kindleWriteCore'

const GiB = 1024 ** 3
const SPACE = { free: 8 * GiB, total: 16 * GiB }
const KINDLE =
  '/run/user/1000/gvfs/mtp:host=Amazon_Kindle_Paperwhite_GN433X10448400B9_GN433X10448400B9/Internal Storage'

function file(title: string, bytes = 1000, ext = 'epub'): SendFile {
  return { localPath: `/local/${title}.${ext}`, title, ext, bytes }
}

describe('planSend', () => {
  it('names files straight inside documents/NaviHUB, never reusing a name', () => {
    const plan = planSend([file('Dune'), file('Dune'), file('a/b:c')], ['dune.epub'], SPACE)
    expect(plan.ok).toBe(true)
    if (!plan.ok) return
    expect(plan.files.map((f) => f.devicePath)).toEqual([
      'documents/NaviHUB/Dune (2).epub',
      'documents/NaviHUB/Dune (3).epub',
      'documents/NaviHUB/a b c.epub'
    ])
  })

  it('keeps 1 GiB and 10% of the Kindle free', () => {
    expect(keepFree(16 * GiB)).toBe(Math.ceil(1.6 * GiB))
    expect(keepFree(4 * GiB)).toBe(GiB)
    const tight = planSend([file('x', 200 * 1024 ** 2)], [], { free: 1.7 * GiB, total: 16 * GiB })
    expect(tight).toMatchObject({ ok: false, refusal: { reason: 'notEnoughSpace' } })
    if (!tight.ok) expect(refusalText(tight.refusal)).toMatch(/keep less than/)
  })

  it('refuses unknown space, empty and huge files, huge sends, and an empty send', () => {
    expect(planSend([file('x')], [], null)).toMatchObject({
      ok: false,
      refusal: { reason: 'spaceUnknown' }
    })
    expect(planSend([file('x', MAX_FILE_BYTES + 1)], [], SPACE)).toMatchObject({
      ok: false,
      refusal: { reason: 'fileTooLarge' }
    })
    const many = Array.from({ length: 5 }, (_, i) => file(`v${i}`, MAX_FILE_BYTES))
    expect(MAX_FILE_BYTES * 5).toBeGreaterThan(MAX_SEND_BYTES)
    expect(planSend(many, [], { free: 100 * GiB, total: 200 * GiB })).toMatchObject({
      ok: false,
      refusal: { reason: 'sendTooLarge' }
    })
    expect(planSend([], [], SPACE)).toMatchObject({ ok: false, refusal: { reason: 'nothing' } })
    const empty = planSend([file('x', 0)], [], SPACE)
    expect(empty).toMatchObject({ ok: false, refusal: { reason: 'emptyFile' } })
    if (!empty.ok) expect(refusalText(empty.refusal)).toMatch(/empty or unreadable/)
  })
})

describe('reaching an MTP Kindle', () => {
  it('recognises a gvfs MTP mount', () => {
    expect(isGvfsMtpRoot(KINDLE)).toBe(true)
    expect(isGvfsMtpRoot('/media/xamir/Kindle')).toBe(false)
    expect(isGvfsMtpRoot('/home/x/Copied Kindle')).toBe(false)
    expect(isGvfsMtpRoot('/run/user/1000/gvfs/mtp:host=K/..')).toBe(false)
  })

  it("replaces a snap's gio module folder that hides gvfs", () => {
    const snap = { GIO_MODULE_DIR: '/home/x/snap/code/common/.cache/gio-modules', HOME: '/home/x' }
    const system = (d: string): boolean => d === '/usr/lib64/gio/modules'
    expect(gioEnv(snap, system).GIO_MODULE_DIR).toBe('/usr/lib64/gio/modules')
    expect(gioEnv(snap, (d) => d === snap.GIO_MODULE_DIR).GIO_MODULE_DIR).toBe(snap.GIO_MODULE_DIR)
    // No system folder has it: the variable is dropped so gio uses its default.
    expect('GIO_MODULE_DIR' in gioEnv(snap, () => false)).toBe(false)
    expect(gioEnv({ HOME: '/home/x' }, () => false).GIO_MODULE_DIR).toBeUndefined()
  })

  it('compares names as FAT and MTP do', () => {
    expect(nameTaken('Dune.epub', ['dune.EPUB'])).toBe(true)
    expect(nameTaken('Dune.epub', ['Dune (2).epub'])).toBe(false)
  })

  it('picks gio for a gvfs MTP mount and plain files otherwise', () => {
    expect(uploaderFor(KINDLE)).toBeInstanceOf(GioMtpUploader)
    expect(uploaderFor('/media/xamir/Kindle')).toBeInstanceOf(FilesystemUploader)
  })
})

describe('DeviceWriter', () => {
  let root: string
  let local: string
  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'navihub-kwrite-dev-'))
    local = mkdtempSync(join(tmpdir(), 'navihub-kwrite-local-'))
    mkdirSync(join(root, 'documents'))
    mkdirSync(join(root, 'koreader'))
    writeFileSync(join(root, 'documents', 'Mine.epub'), 'the user own book')
  })
  afterEach(() => {
    rmSync(root, { recursive: true, force: true })
    rmSync(local, { recursive: true, force: true })
  })

  function localBook(name: string, size: number, fill = 7): { path: string; bytes: number } {
    const path = join(local, name)
    writeFileSync(path, Buffer.alloc(size, fill))
    return { path, bytes: size }
  }

  function planned(path: string, bytes: number, name = 'Dune.epub'): PlannedSend {
    return { localPath: path, bytes, devicePath: `documents/NaviHUB/${name}` }
  }

  const navihub = (): string => join(root, 'documents', 'NaviHUB')

  // Everything outside documents/NaviHUB, as it was.
  function untouched(): void {
    expect(readFileSync(join(root, 'documents', 'Mine.epub'), 'utf8')).toBe('the user own book')
    expect(readdirSync(join(root, 'koreader'))).toEqual([])
    expect(readdirSync(join(root, 'documents')).sort()).toEqual(['Mine.epub', 'NaviHUB'])
  }

  // Behaves like the user's Kindle over gvfs MTP (2026-11-17 probe): an upload
  // silently REPLACES an existing name, rename is impossible, remove works.
  // `corrupt` flips the uploaded bytes; `fail` writes half and reports failure.
  function fakeGio(mode: 'ok' | 'corrupt' | 'fail' | 'noRemove' = 'ok'): {
    run: GioRunner
    calls: string[][]
  } {
    const calls: string[][] = []
    const run: GioRunner = async (args) => {
      calls.push(args)
      expect(args[1]).toBe('--')
      if (args[0] === 'copy') {
        const dest = args[3]
        if (mode === 'noRemove') {
          writeFileSync(dest, Buffer.alloc(3, 1))
          return { code: 0, stderr: '' }
        }
        if (mode === 'fail') {
          writeFileSync(dest, readFileSync(args[2]).subarray(0, 10))
          return { code: 1, stderr: 'Error transferring file' }
        }
        copyFileSync(args[2], dest)
        if (mode === 'corrupt') writeFileSync(dest, Buffer.alloc(readFileSync(args[2]).length, 0))
        return { code: 0, stderr: '' }
      }
      if (args[0] === 'remove') {
        if (mode === 'noRemove') return { code: 1, stderr: 'Device busy' }
        rmSync(args[2], { force: true })
        return { code: 0, stderr: '' }
      }
      return { code: 1, stderr: 'Operation not supported' }
    }
    return { run, calls }
  }

  // A GioMtpUploader whose FUSE root is the scratch folder.
  function gioWriter(run: GioRunner): DeviceWriter {
    const up = new GioMtpUploader(`/run/user/1000/gvfs/mtp:host=K/Internal Storage`, run)
    Object.defineProperty(up, 'root', { value: root })
    return new DeviceWriter(up)
  }

  it('uploads through gio to the final name, verified, and touches nothing else', async () => {
    const { run, calls } = fakeGio()
    const w = gioWriter(run)
    await w.ensureFolder()
    const book = localBook('dune.epub', 300 * 1024)
    const sent = await w.sendOne(planned(book.path, book.bytes))
    expect(sent).toMatchObject({ devicePath: 'documents/NaviHUB/Dune.epub', bytes: book.bytes })
    expect(sent.partialMd5).toMatch(/^[0-9a-f]{32}$/)
    expect(readFileSync(join(navihub(), 'Dune.epub'))).toEqual(readFileSync(book.path))
    // gio gets the mounted-folder path and maps it to mtp:// itself.
    expect(calls).toEqual([['copy', '--', book.path, join(navihub(), 'Dune.epub')]])
    untouched()
  })

  it('passes "#" and "%" in a name through untouched, as a path', async () => {
    const { run, calls } = fakeGio()
    const w = gioWriter(run)
    await w.ensureFolder()
    writeFileSync(join(navihub(), 'C.epub'), 'another book')
    const book = localBook('c.epub', 2048)
    await w.sendOne(planned(book.path, book.bytes, 'C# in Depth 100%.epub'))
    expect(calls[0][3]).toBe(join(navihub(), 'C# in Depth 100%.epub'))
    expect(readFileSync(join(navihub(), 'C.epub'), 'utf8')).toBe('another book')
  })

  it('reports a removal that failed instead of hiding a broken file', async () => {
    const { run } = fakeGio('noRemove')
    const w = gioWriter(run)
    await w.ensureFolder()
    const book = localBook('dune.epub', 4096)
    await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(
      /holds 3 of 4096 bytes\. The incomplete Dune\.epub is still on the Kindle \(gio could not remove it: Device busy\); delete it there/
    )
  })

  it('never deletes a file the mount itself refused to replace', async () => {
    // The listing missed the name (a stale read), so only the mount's own
    // 'wx' stops the write; the user's file must survive the failed send.
    const fs = new FilesystemUploader(root)
    const lying: Uploader = {
      ensureFolder: () => fs.ensureFolder(),
      hasFolder: () => fs.hasFolder(),
      names: async () => [],
      upload: (...a) => fs.upload(...a),
      size: (n) => fs.size(n),
      isPlainFile: (n) => fs.isPlainFile(n),
      sha256: (n, s) => fs.sha256(n, s),
      remove: (n) => fs.remove(n)
    }
    const w = new DeviceWriter(lying)
    await w.ensureFolder()
    writeFileSync(join(navihub(), 'Dune.epub'), 'already here')
    const book = localBook('dune.epub', 2048)
    await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(/already exists/)
    expect(readFileSync(join(navihub(), 'Dune.epub'), 'utf8')).toBe('already here')
  })

  it('never lets the replacing upload reach a name that exists, in any case', async () => {
    const { run, calls } = fakeGio()
    const w = gioWriter(run)
    await w.ensureFolder()
    writeFileSync(join(navihub(), 'dune.EPUB'), 'already here')
    const book = localBook('dune.epub', 2048)
    await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(/already exists/)
    expect(calls).toEqual([])
    expect(readFileSync(join(navihub(), 'dune.EPUB'), 'utf8')).toBe('already here')
  })

  it('removes only its own upload when the copy on the Kindle does not match', async () => {
    const { run, calls } = fakeGio('corrupt')
    const w = gioWriter(run)
    await w.ensureFolder()
    writeFileSync(join(navihub(), 'Other.epub'), 'sent before')
    const book = localBook('dune.epub', 4096)
    await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(/does not match/)
    expect(readdirSync(navihub())).toEqual(['Other.epub'])
    expect(calls.map((c) => c[0])).toEqual(['copy', 'remove'])
    untouched()
  })

  it('removes a half upload when gio fails', async () => {
    const { run } = fakeGio('fail')
    const w = gioWriter(run)
    await w.ensureFolder()
    const book = localBook('dune.epub', 4096)
    await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(
      /refused the file: Error transferring/
    )
    expect(readdirSync(navihub())).toEqual([])
    untouched()
  })

  it('refuses a changed local file before uploading anything', async () => {
    const { run, calls } = fakeGio()
    const w = gioWriter(run)
    await w.ensureFolder()
    const book = localBook('dune.epub', 4096)
    await expect(w.sendOne(planned(book.path, book.bytes + 1))).rejects.toThrow(/changed/)
    await expect(w.sendOne(planned(join(local, 'gone.epub'), 10))).rejects.toThrow()
    expect(calls).toEqual([])
    expect(readdirSync(navihub())).toEqual([])
  })

  it('refuses any path outside documents/NaviHUB', async () => {
    const { run, calls } = fakeGio()
    const w = gioWriter(run)
    await w.ensureFolder()
    const book = localBook('dune.epub', 100)
    for (const devicePath of [
      'documents/Mine.epub',
      'koreader/x.epub',
      'documents/NaviHUB/../Mine.epub',
      'documents/NaviHUB/sub/x.epub',
      'documents/NaviHUB/.hidden.epub'
    ]) {
      await expect(w.sendOne({ ...planned(book.path, book.bytes), devicePath })).rejects.toThrow(
        /outside|Refusing/
      )
    }
    expect(calls).toEqual([])
    untouched()
  })

  it('runs one device write at a time', async () => {
    const { run } = fakeGio()
    const w = gioWriter(run)
    await w.ensureFolder()
    const book = localBook('dune.epub', 4096)
    const first = w.sendOne(planned(book.path, book.bytes, 'A.epub'))
    await expect(w.sendOne(planned(book.path, book.bytes, 'B.epub'))).rejects.toThrow(
      /already being written/
    )
    await first
    expect(await w.names()).toEqual(['A.epub'])
  })

  it('writes plain files on a mass-storage mount, honouring Stop and never replacing', async () => {
    const w = new DeviceWriter(new FilesystemUploader(root))
    await w.ensureFolder()
    const book = localBook('dune.epub', 300 * 1024)
    await w.sendOne(planned(book.path, book.bytes))
    expect(readFileSync(join(navihub(), 'Dune.epub'))).toEqual(readFileSync(book.path))
    await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(/already exists/)

    const big = localBook('big.cbz', 8 * 1024 * 1024)
    let chunks = 0
    await expect(
      w.sendOne(planned(big.path, big.bytes, 'Big.cbz'), () => ++chunks > 1)
    ).rejects.toThrow(/stopped/)
    expect(chunks).toBeLessThan(10)
    expect(existsSync(join(navihub(), 'Big.cbz'))).toBe(false)
    untouched()
  })

  it('checks the folders on every send, not only when asked', async () => {
    const elsewhere = mkdtempSync(join(tmpdir(), 'navihub-kwrite-else-'))
    try {
      symlinkSync(elsewhere, navihub())
      const w = new DeviceWriter(new FilesystemUploader(root))
      const book = localBook('dune.epub', 100)
      await expect(w.sendOne(planned(book.path, book.bytes))).rejects.toThrow(/not a plain folder/)
      expect(readdirSync(elsewhere)).toEqual([])
    } finally {
      rmSync(elsewhere, { recursive: true, force: true })
    }
  })

  it('refuses a NaviHUB folder that is a link elsewhere, and makes nothing without documents/', async () => {
    const elsewhere = mkdtempSync(join(tmpdir(), 'navihub-kwrite-else-'))
    const bare = mkdtempSync(join(tmpdir(), 'navihub-kwrite-bare-'))
    try {
      symlinkSync(elsewhere, navihub())
      await expect(new DeviceWriter(new FilesystemUploader(root)).ensureFolder()).rejects.toThrow(
        /not a plain folder/
      )
      expect(readdirSync(elsewhere)).toEqual([])
      await expect(new DeviceWriter(new FilesystemUploader(bare)).ensureFolder()).rejects.toThrow(
        /documents folder/
      )
      expect(readdirSync(bare)).toEqual([])
    } finally {
      rmSync(elsewhere, { recursive: true, force: true })
      rmSync(bare, { recursive: true, force: true })
    }
  })

  it('lists again right before the upload, so a file that appeared meanwhile is never replaced', async () => {
    const fs = new FilesystemUploader(root)
    let listings = 0
    const uploads: string[] = []
    const racing: Uploader = {
      ensureFolder: () => fs.ensureFolder(),
      hasFolder: () => fs.hasFolder(),
      // The user drops a same-named book in while the local file is hashed.
      names: async () => (++listings === 1 ? [] : ['Dune.epub']),
      upload: async (local, name, bytes, stop) => {
        uploads.push(name)
        await fs.upload(local, name, bytes, stop)
      },
      size: (n) => fs.size(n),
      isPlainFile: (n) => fs.isPlainFile(n),
      sha256: (n, s) => fs.sha256(n, s),
      remove: (n) => fs.remove(n)
    }
    const w = new DeviceWriter(racing)
    await w.ensureFolder()
    const book = localBook('dune.epub', 2048)
    let ledger = 0
    await expect(w.sendOne(planned(book.path, book.bytes), () => false, () => ledger++)).rejects.toThrow(/already exists/)
    expect(uploads).toEqual([])
    expect(ledger).toBe(0)
  })

  it("cleans up only what can be the upload's own copy", async () => {
    const w = new DeviceWriter(new FilesystemUploader(root))
    await w.ensureFolder()
    const sha = (b: Buffer): string => require('crypto').createHash('sha256').update(b).digest('hex')
    const full = Buffer.alloc(4000, 3)
    // Larger than the upload: someone else's file, left alone.
    writeFileSync(join(navihub(), 'Big.epub'), Buffer.alloc(9000, 1))
    expect(await w.removeIncomplete('Big.epub', 4000, sha(full))).toBe('foreign')
    expect(existsSync(join(navihub(), 'Big.epub'))).toBe(true)
    // A folder under the name: left alone.
    mkdirSync(join(navihub(), 'Folder.epub'))
    expect(await w.removeIncomplete('Folder.epub', 4000, sha(full))).toBe('foreign')
    // A cut-off copy: removed. The complete copy: kept. Nothing there: absent.
    writeFileSync(join(navihub(), 'Cut.epub'), full.subarray(0, 100))
    expect(await w.removeIncomplete('Cut.epub', 4000, sha(full))).toBe('removed')
    writeFileSync(join(navihub(), 'Whole.epub'), full)
    expect(await w.removeIncomplete('Whole.epub', 4000, sha(full))).toBe('complete')
    expect(await w.removeIncomplete('Gone.epub', 4000, sha(full))).toBe('absent')
    expect(readdirSync(navihub()).sort()).toEqual(['Big.epub', 'Folder.epub', 'Whole.epub'])
    untouched()
  })
})
