import { useMemo, type ReactNode } from 'react'
import { mediaUrl } from '@shared/mediaUrl'
import { resolveEpubHref } from '@shared/epubPaths'

// Renders one EPUB spine document as sanitized React — never
// dangerouslySetInnerHTML (same policy as the dictionary's StructuredContent).
// The XHTML is parsed with DOMParser, walked against a tag whitelist, and
// rebuilt: book scripts/styles/links are dropped, no attributes survive except
// image sources, which are resolved relative to the document's position inside
// the EPUB and rewritten to navimg:// URLs (the protocol streams them out of
// the zip). Furigana (<ruby>/<rt>) is preserved.

// Tags rendered as themselves. Everything not listed here and not in DROP is
// unwrapped (children rendered in place) so unknown wrappers can't hide text.
const KEEP = new Set([
  'p', 'div', 'section', 'article', 'main', 'blockquote',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ol', 'ul', 'li',
  'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'figure', 'figcaption',
  'span', 'em', 'i', 'b', 'strong', 'small', 'sub', 'sup', 'cite', 'code', 'pre',
  'ruby', 'rt', 'rp', 'rb',
  'br', 'hr'
])

// Never rendered, children discarded.
const DROP = new Set([
  'script', 'style', 'link', 'meta', 'head', 'title', 'iframe', 'object',
  'embed', 'video', 'audio', 'form', 'input', 'button', 'canvas', 'template'
])

// Block-level tags a click resolves to for paragraph mining.
export const BLOCK_SELECTOR = 'p, li, blockquote, h1, h2, h3, h4, h5, h6, td, figcaption, pre'

interface Props {
  html: string
  // The document's zip entry path (inside the epub) and the navimg prefix up
  // to and including the .epub segment ("manga/<dirPath>") — together they let
  // relative image refs be rewritten to servable URLs.
  docEntryPath: string
  epubUrlPrefix: string
  // Mining hook: called with the tapped block's text while the panel is open.
  onBlockText?: (text: string) => void
}

export default function BookContent({ html, docEntryPath, epubUrlPrefix, onBlockText }: Props) {
  const nodes = useMemo(() => {
    const parser = new DOMParser()
    let doc = parser.parseFromString(html, 'application/xhtml+xml')
    // Real-world EPUBs are frequently not well-formed XML; fall back to the
    // forgiving HTML parser when the XML parse reports an error.
    if (doc.querySelector('parsererror')) doc = parser.parseFromString(html, 'text/html')
    const body = doc.body ?? doc.documentElement
    if (!body) return null

    const imgUrl = (ref: string | null): string | null => {
      if (!ref) return null
      const resolved = resolveEpubHref(docEntryPath, ref)
      return resolved ? mediaUrl(`${epubUrlPrefix}/${resolved}`) : null
    }

    let key = 0
    const render = (node: Node): ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) return node.nodeValue
      if (node.nodeType !== Node.ELEMENT_NODE) return null
      const el = node as Element
      const tag = el.localName.toLowerCase()
      if (DROP.has(tag)) return null
      if (tag === 'img' || tag === 'image') {
        // <image> covers SVG-wrapped covers (xlink:href); plain <img> uses src.
        const src = imgUrl(
          el.getAttribute('src') ??
            el.getAttribute('xlink:href') ??
            el.getAttributeNS('http://www.w3.org/1999/xlink', 'href') ??
            el.getAttribute('href')
        )
        if (!src) return null
        return (
          <img
            key={key++}
            src={src}
            alt={el.getAttribute('alt') ?? ''}
            loading="lazy"
            className="book-img"
          />
        )
      }
      const children = [...el.childNodes].map(render)
      if (tag === 'br') return <br key={key++} />
      if (tag === 'hr') return <hr key={key++} />
      if (KEEP.has(tag)) {
        const Tag = tag as keyof React.JSX.IntrinsicElements
        return <Tag key={key++}>{children}</Tag>
      }
      // svg, a, spans of unknown vendor tags, … — unwrap so text/images survive.
      return <span key={key++}>{children}</span>
    }

    return [...body.childNodes].map(render)
  }, [html, docEntryPath, epubUrlPrefix])

  function onClick(e: React.MouseEvent) {
    if (!onBlockText) return
    const block = (e.target as HTMLElement).closest?.(BLOCK_SELECTOR)
    const text = block?.textContent?.trim()
    if (text) onBlockText(text)
  }

  return (
    <div className={`book-content ${onBlockText ? 'book-mining' : ''}`} onClick={onClick}>
      {nodes}
    </div>
  )
}
