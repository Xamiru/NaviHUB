import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'

// openFile.ts pulls in files.ts (electron `app`) for the token mint. Only the
// pure halves are exercised here, so a stub is enough.
vi.mock('../src/main/files', () => ({
  registerOpenedFile: (abs: string) => `open/deadbeef${abs.length}`
}))

import { classifyPath, parseArgvFiles, OPENABLE_EXTS } from '../src/main/openFile'

describe('classifyPath', () => {
  it('routes each supported format to its reader', () => {
    expect(classifyPath('/x/book.epub')).toBe('book')
    expect(classifyPath('/x/Vol 1.cbz')).toBe('manga')
    expect(classifyPath('/x/archive.zip')).toBe('manga')
    expect(classifyPath('/x/song.flac')).toBe('audio')
    expect(classifyPath('/x/song.OPUS')).toBe('audio')
  })

  it('refuses everything it has no page for', () => {
    for (const p of [
      '/x/a.txt',
      '/x/a.png',
      '/x/a.srt',
      '/x/a.pdf',
      '/x/a.mkv',
      '/x/a.mp4',
      '/x/noext',
      '/x/.hidden'
    ]) {
      expect(classifyPath(p)).toBeNull()
    }
  })
})

describe('parseArgvFiles', () => {
  it('picks the openable files out of a real Electron argv', () => {
    // argv[0] is the binary; Electron injects switches of its own.
    const argv = [
      '/usr/lib/navihub/electron',
      '--no-sandbox',
      '/home/u/Books/story.epub',
      '--allow-file-access-from-files',
      '/home/u/Docs/notes.txt'
    ]
    expect(parseArgvFiles(argv, '/home/u')).toEqual(['/home/u/Books/story.epub'])
  })

  it('resolves a relative path against the launching directory', () => {
    // A second instance carries its own cwd; a shell-completed relative path is
    // meaningless without it.
    expect(parseArgvFiles(['electron', 'Books/story.epub'], '/home/u')).toEqual([
      '/home/u/Books/story.epub'
    ])
  })

  it('never treats the binary or a flag as a file', () => {
    expect(parseArgvFiles(['/usr/bin/x.epub'], '/tmp')).toEqual([])
    expect(parseArgvFiles(['electron', '--inspect=5858', '-h', ''], '/tmp')).toEqual([])
  })

  it('keeps several files, in order', () => {
    expect(parseArgvFiles(['e', '/a/1.mp3', '/a/2.mp3'], '/tmp')).toEqual(['/a/1.mp3', '/a/2.mp3'])
  })
})

describe('OS registration stays in step with the code', () => {
  // The realistic drift: an extension is added to electron-builder.yml (so the
  // OS offers NaviHUB for it) but not to classifyPath, and the file is silently
  // ignored after the app opens. Or the reverse, and the OS never offers it.
  const yml = readFileSync(
    fileURLToPath(new URL('../electron-builder.yml', import.meta.url)),
    'utf8'
  )

  const declared = (): string[] => {
    const block = yml.slice(yml.indexOf('fileAssociations:'), yml.indexOf('\nwin:'))
    const out: string[] = []
    for (const m of block.matchAll(/^\s*-\s*ext:\s*\[([^\]]*)\]/gm)) {
      out.push(...m[1].split(',').map((e) => e.trim()).filter(Boolean))
    }
    return out
  }

  it('every extension the installer claims is one the app can actually open', () => {
    const exts = declared()
    expect(exts.length).toBeGreaterThan(8)
    for (const ext of exts) {
      expect(classifyPath(`/x/file.${ext}`), `.${ext} is registered but unhandled`).not.toBeNull()
    }
  })

  it('only .zip is handled without being registered, and that is deliberate', () => {
    // Claiming application/zip would put NaviHUB in the "Open with" menu of
    // every archive on the system. Explicitly choosing it still works.
    const registered = new Set(declared())
    const unregistered = OPENABLE_EXTS.filter((e) => !registered.has(e))
    expect(unregistered).toEqual(['zip'])
  })
})
