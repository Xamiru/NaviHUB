// Pure EPUB 3 builder for books NaviHUB makes for the Kindle (Quotes, the
// Japanese graded readings). It returns the zip entries; epubWrite.ts packs
// them. No electron, fs or database import.
//
// The output is deliberately plain so every reader opens it: XHTML with one
// small stylesheet, no scripts, no remote resources, no fonts. Text is always
// escaped here, so content can never inject markup. Ruby (<ruby>/<rt>) carries
// furigana; KOReader renders it. An NCX table of contents sits beside the EPUB
// 3 nav for older readers.

export interface Inline {
  text: string
  ruby?: string | null
}

export type Block =
  | { kind: 'p'; parts: Inline[]; style?: 'quote' | 'source' | 'note' | 'muted' }
  | { kind: 'h2'; text: string }
  | { kind: 'list'; ordered: boolean; items: Inline[][] }
  | { kind: 'rule' }

export interface EpubChapter {
  title: string
  blocks: Block[]
}

export interface EpubBook {
  id: string // a stable urn:uuid: for the same book, so re-made copies match
  title: string
  author: string
  language: string // BCP 47: 'en', 'ja'
  modified: string // ISO time, seconds precision
  chapters: EpubChapter[]
}

export interface EpubEntry {
  name: string
  data: string
  // Only `mimetype` is stored uncompressed, and it is always first: the EPUB
  // container format requires both.
  store: boolean
}

// Characters XML 1.0 forbids (control codes other than tab, newline, return,
// and unpaired surrogates' replacement). Imported text can carry them.
const XML_INVALID = /[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]/g

export function xmlEscape(s: string): string {
  return s
    .replace(XML_INVALID, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function inline(parts: Inline[]): string {
  return parts
    .map((p) => {
      const text = xmlEscape(p.text).replace(/\n/g, '<br/>')
      return p.ruby ? `<ruby>${text}<rt>${xmlEscape(p.ruby)}</rt></ruby>` : text
    })
    .join('')
}

function block(b: Block): string {
  switch (b.kind) {
    case 'p':
      return b.style ? `<p class="${b.style}">${inline(b.parts)}</p>` : `<p>${inline(b.parts)}</p>`
    case 'h2':
      return `<h2>${xmlEscape(b.text)}</h2>`
    case 'list': {
      const tag = b.ordered ? 'ol' : 'ul'
      return `<${tag}>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${tag}>`
    }
    case 'rule':
      return '<hr/>'
  }
}

const CSS = `body { margin: 0 4%; line-height: 1.5; }
h1 { font-size: 1.4em; margin: 1em 0 0.6em; }
h2 { font-size: 1.15em; margin: 1.2em 0 0.4em; }
p { margin: 0 0 0.7em; }
p.quote { margin: 0.9em 0 0.2em; }
p.source { margin: 0 0 0.9em; text-align: right; font-style: italic; }
p.note, p.muted { font-size: 0.9em; }
rt { font-size: 0.5em; }
hr { border: none; border-top: 1px solid; margin: 1.2em 30%; }
`

function chapterName(i: number): string {
  return `chapter-${String(i + 1).padStart(3, '0')}.xhtml`
}

function xhtml(lang: string, title: string, body: string): string {
  const l = xmlEscape(lang)
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${l}" lang="${l}">
<head><meta charset="UTF-8"/><title>${xmlEscape(title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
${body}
</body>
</html>
`
}

export function buildEpub(book: EpubBook): EpubEntry[] {
  if (!book.chapters.length) throw new Error('A book needs at least one chapter')
  const lang = book.language
  const chapters = book.chapters.map((c, i) => ({
    name: chapterName(i),
    title: c.title,
    data: xhtml(lang, c.title, `<h1>${xmlEscape(c.title)}</h1>\n${c.blocks.map(block).join('\n')}`)
  }))

  const nav = xhtml(
    lang,
    book.title,
    `<nav epub:type="toc" id="toc"><h1>${xmlEscape(book.title)}</h1><ol>${chapters
      .map((c) => `<li><a href="${c.name}">${xmlEscape(c.title)}</a></li>`)
      .join('')}</ol></nav>`
  )

  const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
<head><meta name="dtb:uid" content="${xmlEscape(book.id)}"/></head>
<docTitle><text>${xmlEscape(book.title)}</text></docTitle>
<navMap>${chapters
    .map(
      (c, i) =>
        `<navPoint id="np${i + 1}" playOrder="${i + 1}"><navLabel><text>${xmlEscape(c.title)}</text></navLabel><content src="${c.name}"/></navPoint>`
    )
    .join('')}</navMap>
</ncx>
`

  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="${xmlEscape(lang)}">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">${xmlEscape(book.id)}</dc:identifier>
<dc:title>${xmlEscape(book.title)}</dc:title>
<dc:creator>${xmlEscape(book.author)}</dc:creator>
<dc:language>${xmlEscape(lang)}</dc:language>
<meta property="dcterms:modified">${xmlEscape(book.modified)}</meta>
</metadata>
<manifest>
<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
<item id="css" href="style.css" media-type="text/css"/>
${chapters.map((c, i) => `<item id="c${i + 1}" href="${c.name}" media-type="application/xhtml+xml"/>`).join('\n')}
</manifest>
<spine toc="ncx">
${chapters.map((_, i) => `<itemref idref="c${i + 1}"/>`).join('\n')}
</spine>
</package>
`

  const container = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>
`

  return [
    { name: 'mimetype', data: 'application/epub+zip', store: true },
    { name: 'META-INF/container.xml', data: container, store: false },
    { name: 'OEBPS/content.opf', data: opf, store: false },
    { name: 'OEBPS/nav.xhtml', data: nav, store: false },
    { name: 'OEBPS/toc.ncx', data: ncx, store: false },
    { name: 'OEBPS/style.css', data: CSS, store: false },
    ...chapters.map((c) => ({ name: `OEBPS/${c.name}`, data: c.data, store: false }))
  ]
}

// A stable urn:uuid from a name, so making "My Quotes" again gives the same
// identifier and KOReader treats it as a new edition of the same book.
export function stableBookId(name: string, hash: (s: string) => string): string {
  const h = hash(`navihub-book:${name}`).padEnd(32, '0')
  return `urn:uuid:${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`
}
