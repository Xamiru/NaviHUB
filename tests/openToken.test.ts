import { describe, expect, it, vi } from 'vitest'
import { splitArchivePath } from '../src/main/archive'

vi.mock('electron', () => ({
  app: { getPath: () => '/userData' },
  dialog: { showOpenDialog: async () => ({ canceled: true, filePaths: [] }) }
}))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => null, set: () => undefined }))
vi.mock('../src/main/progress', () => ({ imageProgress: () => undefined }))
vi.mock('../src/main/http', () => ({ fetchWithRetry: async () => new Response('') }))

import { absoluteMediaPath, openedFilePath, registerOpenedFile } from '../src/main/files'

describe('ad-hoc file tokens', () => {
  it('round-trips a path and is idempotent for the same file', () => {
    const rel = registerOpenedFile('/mnt/usb/Some Film.mkv')
    expect(rel).toMatch(/^open\/[0-9a-f]{16}\.mkv$/)
    expect(registerOpenedFile('/mnt/usb/Some Film.mkv')).toBe(rel)
    expect(absoluteMediaPath(rel)).toBe('/mnt/usb/Some Film.mkv')
  })

  it('KEEPS the extension, which is what makes an ad-hoc archive streamable', () => {
    // archive.ts finds the container by scanning segments for a ziplike
    // extension. A bare hex token would make splitArchivePath return null and
    // an opened .cbz would be served as one opaque blob instead of pages.
    const rel = registerOpenedFile('/mnt/usb/Vol 1.cbz')
    expect(rel.endsWith('.cbz')).toBe(true)
    expect(splitArchivePath(`${rel}/pages/0001.png`)).toEqual({
      archiveRel: rel,
      entryName: 'pages/0001.png'
    })
    // …and the split-off container half still resolves back to the real file.
    expect(absoluteMediaPath(rel)).toBe('/mnt/usb/Vol 1.cbz')
  })

  it('does the same for an EPUB spine entry', () => {
    const rel = registerOpenedFile('/books/A Novel.epub')
    expect(splitArchivePath(`${rel}/OEBPS/ch1.xhtml`)).toEqual({
      archiveRel: rel,
      entryName: 'OEBPS/ch1.xhtml'
    })
  })

  it('refuses anything that is not one opaque segment', () => {
    // This is what keeps the token branch as escape-proof as the plain prefix
    // lines: no separators means nothing can be appended to reach another file.
    for (const bad of ['../etc/passwd', 'abc/def', 'ZZZZ', 'abc.mkv/x', '']) {
      expect(() => openedFilePath(bad)).toThrow()
    }
  })

  it('rejects a token it never minted', () => {
    expect(() => openedFilePath('0123456789abcdef.mkv')).toThrow(/no longer open/)
  })

  it('evicts the oldest once the session cap is passed', () => {
    const first = registerOpenedFile('/evict/first.mp3')
    for (let i = 0; i < 40; i += 1) registerOpenedFile(`/evict/f${i}.mp3`)
    expect(() => absoluteMediaPath(first)).toThrow(/no longer open/)
  })

  it('still refuses a traversal through the prefix table itself', () => {
    expect(() => absoluteMediaPath('open/../../etc/passwd')).toThrow(/escapes media root/)
  })
})
