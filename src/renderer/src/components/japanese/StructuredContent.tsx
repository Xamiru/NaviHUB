import { createElement, Fragment, type CSSProperties, type ReactNode } from 'react'
import type { StructuredNode } from '@shared/types'

// Renders a Yomitan structured-content node tree as React elements. Data-driven
// (never dangerouslySetInnerHTML), tag- and style-whitelisted, so a dictionary's
// glossary can't inject anything. Images and audio are dropped; internal
// `?query=` links become search callbacks.

// Tags rendered as their HTML equivalents. Anything else falls back to <span>.
const HTML_TAGS = new Set([
  'div',
  'span',
  'p',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'ruby',
  'rt',
  'rp',
  'details',
  'summary',
  'b',
  'strong',
  'i',
  'em'
])

// Style keys we let through (camelCase, matching Yomitan's JSON + React).
const STYLE_KEYS = new Set([
  'fontWeight',
  'fontStyle',
  'textDecorationLine',
  'verticalAlign',
  'fontSize',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'listStyleType',
  'textAlign',
  'color'
])

function pickStyle(style: Record<string, unknown> | undefined): CSSProperties | undefined {
  if (!style) return undefined
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(style)) {
    if (STYLE_KEYS.has(k) && (typeof v === 'string' || typeof v === 'number')) {
      out[k] = String(v)
    }
  }
  return Object.keys(out).length ? (out as CSSProperties) : undefined
}

// Pulls the `query` param out of a Yomitan internal link href ("?query=X&…").
function internalQuery(href: string): string | null {
  if (!href.startsWith('?')) return null
  try {
    const params = new URLSearchParams(href.slice(1))
    return params.get('query')
  } catch {
    return null
  }
}

function renderNode(
  node: StructuredNode,
  key: number,
  onSearch?: (term: string) => void
): ReactNode {
  if (node == null) return null
  if (typeof node === 'string') return node
  if (Array.isArray(node)) {
    return (
      <Fragment key={key}>
        {node.map((child, i) => renderNode(child, i, onSearch))}
      </Fragment>
    )
  }

  const { tag } = node
  if (tag === 'img') return null // images not rendered (local-only, self-contained)
  if (tag === 'br') return <br key={key} />

  const children =
    node.content !== undefined ? renderNode(node.content as StructuredNode, 0, onSearch) : null

  // Internal search link → button that drives the page's search box.
  if (tag === 'a' && typeof node.href === 'string') {
    const q = internalQuery(node.href)
    if (q && onSearch) {
      return (
        <button
          key={key}
          type="button"
          className="text-accent hover:underline"
          onClick={() => onSearch(q)}
        >
          {children ?? q}
        </button>
      )
    }
    // External / unrecognized link: render its text only (no navigation).
    return <span key={key}>{children}</span>
  }

  const element = HTML_TAGS.has(tag) ? tag : 'span'
  return createElement(
    element,
    { key, style: pickStyle(node.style), lang: typeof node.lang === 'string' ? node.lang : undefined },
    children
  )
}

export default function StructuredContent({
  content,
  onSearch
}: {
  content: StructuredNode
  onSearch?: (term: string) => void
}): JSX.Element {
  return <div className="dict-sc space-y-1">{renderNode(content, 0, onSearch)}</div>
}
