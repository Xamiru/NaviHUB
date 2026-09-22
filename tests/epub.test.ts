import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import AdmZip from 'adm-zip'
import { parseEpub, epubSpineCount, listEpubPages, epubToc, isEpubFile } from '../src/main/epub'
import { resolveEpubHref } from '../src/shared/epubPaths'

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(os.tmpdir(), 'navihub-epub-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function makeZip(name: string, entries: Record<string, string | Buffer>): string {
  const zip = new AdmZip()
  for (const [entry, content] of Object.entries(entries)) {
    zip.addFile(entry, typeof content === 'string' ? Buffer.from(content) : content)
  }
  const abs = join(dir, name)
  zip.writeZip(abs)
  return abs
}

const CONTAINER = `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`

// A realistic EPUB3 skeleton: nav doc, three spine documents (one linear=no),
// an image, and an NCX kept alongside for EPUB2 readers.
function makeBook(overrides: Partial<Record<string, string | null>> = {}): string {
  const entries: Record<string, string | Buffer> = {
    mimetype: 'application/epub+zip',
    'META-INF/container.xml': overrides.container === null ? '' : (overrides.container ?? CONTAINER),
    'OEBPS/content.opf':
      overrides.opf ??
      `<?xml version="1.0"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>吸血鬼の夜 &amp; 昼</dc:title>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="cover" href="text/cover.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch1" href="text/ch%201.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch2" href="text/ch2.xhtml" media-type="application/xhtml+xml"/>
    <item id="notes" href="text/notes.xhtml" media-type="application/xhtml+xml"/>
    <item id="img1" href="images/cover.jpg" media-type="image/jpeg"/>
    <item id="css" href="style.css" media-type="text/css"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="cover"/>
    <itemref idref="ch1"/>
    <itemref idref="ch2"/>
    <itemref idref="notes" linear="no"/>
    <itemref idref="img1"/>
  </spine>
</package>`,
    'OEBPS/nav.xhtml':
      overrides.nav ??
      `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><body>
<nav epub:type="toc"><ol>
  <li><a href="text/cover.xhtml">表紙</a></li>
  <li><a href="text/ch%201.xhtml#start">第一章 <span>夜</span></a></li>
  <li><a href="text/ch%201.xhtml#mid">第一章の途中</a></li>
  <li><a href="text/ch2.xhtml">第二章</a></li>
</ol></nav>
<nav epub:type="landmarks"><ol><li><a href="text/cover.xhtml">cover</a></li></ol></nav>
</body></html>`,
    'OEBPS/toc.ncx': `<?xml version="1.0"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/"><navMap>
  <navPoint id="n1"><navLabel><text>NCX 第一章</text></navLabel><content src="text/ch%201.xhtml"/></navPoint>
  <navPoint id="n2"><navLabel><text>NCX 第二章</text></navLabel><content src="text/ch2.xhtml#frag"/></navPoint>
</navMap></ncx>`,
    'OEBPS/text/cover.xhtml': '<html><body><img src="../images/cover.jpg"/></body></html>',
    'OEBPS/text/ch 1.xhtml': '<html><body><p>吸血鬼は夜にしか動けない。</p></body></html>',
    'OEBPS/text/ch2.xhtml': '<html><body><p>それでも彼女は昼の街を歩いた。</p></body></html>',
    'OEBPS/text/notes.xhtml': '<html><body><p>notes</p></body></html>',
    'OEBPS/images/cover.jpg': Buffer.from([0xff, 0xd8, 0xff]),
    'OEBPS/style.css': 'p { margin: 0 }'
  }
  if (overrides.container === null) delete entries['META-INF/container.xml']
  return makeZip('book.epub', entries)
}

describe('isEpubFile', () => {
  it('matches only the .epub extension, case-insensitively', () => {
    expect(isEpubFile('Vol 1.epub')).toBe(true)
    expect(isEpubFile('Vol 1.EPUB')).toBe(true)
    expect(isEpubFile('Vol 1.cbz')).toBe(false)
    expect(isEpubFile('epub')).toBe(false)
  })
})

describe('parseEpub', () => {
  it('reads title, ordered spine (html only, linear=no skipped), URL-encoded hrefs', async () => {
    const abs = makeBook()
    const info = await parseEpub(abs)
    expect(info).not.toBeNull()
    expect(info!.title).toBe('吸血鬼の夜 & 昼')
    // notes (linear=no) and img1 (not html) are excluded; hrefs resolve
    // relative to the OPF dir with %20 decoded to the literal entry name.
    expect(info!.spine).toEqual([
      'OEBPS/text/cover.xhtml',
      'OEBPS/text/ch 1.xhtml',
      'OEBPS/text/ch2.xhtml'
    ])
    expect(await epubSpineCount(abs)).toBe(3)
    expect(await listEpubPages(abs)).toEqual(info!.spine)
  })

  it('builds the TOC from the nav doc: labels flattened, fragments stripped, one entry per document', async () => {
    const abs = makeBook()
    const toc = await epubToc(abs)
    expect(toc).toEqual([
      { label: '表紙', page: 0 },
      { label: '第一章 夜', page: 1 }, // #mid duplicate for the same doc deduped
      { label: '第二章', page: 2 }
    ])
  })

  it('falls back to the NCX when there is no nav document', async () => {
    const abs = makeBook({
      nav: '<html><body><p>not a nav</p></body></html>',
      opf: `<?xml version="1.0"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Old Book</dc:title></metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="ch1" href="text/ch%201.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch2" href="text/ch2.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="ch1"/>
    <itemref idref="ch2"/>
  </spine>
</package>`
    })
    const toc = await epubToc(abs)
    expect(toc).toEqual([
      { label: 'NCX 第一章', page: 0 },
      { label: 'NCX 第二章', page: 1 }
    ])
  })

  it('finds the OPF without container.xml (first *.opf fallback)', async () => {
    const abs = makeBook({ container: null })
    expect(await epubSpineCount(abs)).toBe(3)
  })

  it('returns null/0/[] on garbage input instead of throwing', async () => {
    const notZip = join(dir, 'broken.epub')
    writeFileSync(notZip, 'not a zip at all')
    expect(await parseEpub(notZip)).toBeNull()
    expect(await epubSpineCount(notZip)).toBe(0)
    expect(await epubToc(notZip)).toEqual([])

    const emptyZip = makeZip('empty.epub', { mimetype: 'application/epub+zip' })
    expect(await parseEpub(emptyZip)).toBeNull()

    expect(await epubSpineCount(join(dir, 'missing.epub'))).toBe(0)
  })

  it('never emits a phantom spine target missing from the archive', async () => {
    const abs = makeBook({
      opf: `<?xml version="1.0"?>
      <package><metadata><dc:title>Phantom</dc:title></metadata>
        <manifest>
          <item id="missing" href="text/missing.xhtml" media-type="application/xhtml+xml"/>
          <item id="real" href="text/ch2.xhtml" media-type="application/xhtml+xml"/>
        </manifest>
        <spine><itemref idref="missing"/><itemref idref="real"/></spine>
      </package>`
    })
    expect((await parseEpub(abs))!.spine).toEqual(['OEBPS/text/ch2.xhtml'])
  })
})

describe('resolveEpubHref', () => {
  it.each([
    ['OEBPS/content.opf', 'text/ch1.xhtml', 'OEBPS/text/ch1.xhtml'],
    ['OEBPS/text/ch1.xhtml', '../images/pic.png', 'OEBPS/images/pic.png'],
    ['OEBPS/text/ch1.xhtml', './same/dir.png', 'OEBPS/text/same/dir.png'],
    ['OEBPS/nav.xhtml', 'text/ch%201.xhtml#frag', 'OEBPS/text/ch 1.xhtml'],
    ['content.opf', 'ch1.xhtml?x=1', 'ch1.xhtml'],
    ['OEBPS/content.opf', '/images/root.png', 'images/root.png']
  ])('%s + %s → %s', (base, href, expected) => {
    expect(resolveEpubHref(base, href)).toBe(expected)
  })

  it('rejects external URLs, fragment-only refs, and root escapes', () => {
    expect(resolveEpubHref('OEBPS/a.xhtml', 'https://x.com/y.png')).toBeNull()
    expect(resolveEpubHref('OEBPS/a.xhtml', 'data:image/png;base64,x')).toBeNull()
    expect(resolveEpubHref('OEBPS/a.xhtml', '#section-2')).toBeNull()
    expect(resolveEpubHref('OEBPS/a.xhtml', '../../../etc/passwd')).toBeNull()
    expect(resolveEpubHref('a.xhtml', '')).toBeNull()
  })
})
