import type { GlossaryItem, StructuredNode } from './types'

// Flattens Yomitan glossary/structured-content into plain text. Used in two
// places that must agree: the importer feeds it to the English gloss-search FTS
// index, and the renderer uses it for the mining card's `back` field and the
// compact one-line definition in result rows. Pure — no DOM, no deps.

// Block-level tags that should force a line break before their content when
// flattened, so list items and paragraphs don't run together.
const BLOCK_TAGS = new Set(['div', 'p', 'li', 'tr', 'br', 'ul', 'ol', 'details'])

function nodeToText(node: StructuredNode, out: string[]): void {
  if (node == null) return
  if (typeof node === 'string') {
    out.push(node)
    return
  }
  if (Array.isArray(node)) {
    for (const child of node) nodeToText(child, out)
    return
  }
  const tag = node.tag
  // ruby: keep the base text, drop the reading (rt) and fallback parens (rp).
  if (tag === 'rt' || tag === 'rp') return
  if (tag === 'img') return // images never contribute text
  if (tag === 'br') {
    out.push('\n')
    return
  }
  if (tag === 'li') out.push('\n• ')
  else if (BLOCK_TAGS.has(tag)) out.push('\n')
  else if (tag === 'td' || tag === 'th') out.push('\t')

  if (node.content !== undefined) nodeToText(node.content, out)
}

// One glossary item → text. Bare strings pass through; {type:'text'} yields its
// text; structured content is walked; images yield nothing.
export function flattenItem(item: GlossaryItem): string {
  if (typeof item === 'string') return item
  if (item.type === 'text') return item.text ?? ''
  if (item.type === 'structured-content') {
    const out: string[] = []
    nodeToText(item.content, out)
    return out.join('')
  }
  return '' // image or unknown
}

// Collapse runs of whitespace (but keep newlines meaningful), trim, and cap.
function normalize(s: string, maxLen?: number): string {
  const cleaned = s
    .replace(/[ \t]*\n[ \t]*/g, '\n') // trim around newlines
    .replace(/\n{2,}/g, '\n') // collapse blank lines
    .replace(/[ \t]{2,}/g, ' ') // collapse runs of spaces/tabs
    .trim()
  if (maxLen != null && cleaned.length > maxLen) {
    return cleaned.slice(0, maxLen - 1).trimEnd() + '…'
  }
  return cleaned
}

// Flatten a whole glossary array into one plain-text block (items joined with
// '; '). Optional cap for the mining `back` field / one-line previews.
export function flattenGlossary(items: GlossaryItem[], maxLen?: number): string {
  const parts = items.map(flattenItem).map((s) => s.trim()).filter(Boolean)
  return normalize(parts.join('; '), maxLen)
}
