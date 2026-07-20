// A tiny, dependency-free Markdown parser for rendering LLM coach replies.
// Pure: it produces a data structure (never HTML) that components/Markdown.tsx
// maps to React elements — the app's house rule is NEVER dangerouslySetInnerHTML.
// Scope is deliberately small (what a coach actually emits): paragraphs,
// headings, bullet/ordered lists, fenced code, and inline bold/italic/code/links.

export type MdInline =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; href: string }

export type MdBlock =
  | { type: 'heading'; level: 1 | 2 | 3; content: MdInline[] }
  | { type: 'paragraph'; content: MdInline[] }
  | { type: 'list'; ordered: boolean; items: MdInline[][] }
  | { type: 'code'; text: string; lang: string | null }

// Split a run of text into inline spans. Order of precedence: inline code
// (backticks are literal inside), then links, then bold, then italic.
export function parseInline(text: string): MdInline[] {
  const out: MdInline[] = []
  let rest = text
  // Matches, in one alternation: `code`, [label](href), **bold**, *italic* / _italic_.
  const re =
    /(`[^`]+`)|(\[[^\]]*\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(_[^_\n]+_)/
  while (rest.length > 0) {
    const m = re.exec(rest)
    if (!m) {
      out.push({ type: 'text', text: rest })
      break
    }
    if (m.index > 0) out.push({ type: 'text', text: rest.slice(0, m.index) })
    const tok = m[0]
    if (tok.startsWith('`')) {
      out.push({ type: 'code', text: tok.slice(1, -1) })
    } else if (tok.startsWith('[')) {
      const lm = /^\[([^\]]*)\]\(([^)\s]+)\)$/.exec(tok)!
      out.push({ type: 'link', text: lm[1] || lm[2], href: lm[2] })
    } else if (tok.startsWith('**')) {
      out.push({ type: 'bold', text: tok.slice(2, -2) })
    } else {
      out.push({ type: 'italic', text: tok.slice(1, -1) })
    }
    rest = rest.slice(m.index + tok.length)
  }
  return out.filter((s) => !(s.type === 'text' && s.text === ''))
}

export function parseMarkdown(input: string): MdBlock[] {
  const lines = (input ?? '').replace(/\r\n?/g, '\n').split('\n')
  const blocks: MdBlock[] = []
  let i = 0

  const bullet = /^\s*[-*+]\s+(.*)$/
  const ordered = /^\s*\d+[.)]\s+(.*)$/
  const heading = /^(#{1,3})\s+(.*)$/
  const fence = /^\s*```(\w*)\s*$/

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      i++
      continue
    }

    // Fenced code block — everything until the closing fence is literal.
    const fm = fence.exec(line)
    if (fm) {
      const lang = fm[1] || null
      const body: string[] = []
      i++
      while (i < lines.length && !fence.test(lines[i])) {
        body.push(lines[i])
        i++
      }
      i++ // consume the closing fence (or EOF)
      blocks.push({ type: 'code', text: body.join('\n'), lang })
      continue
    }

    const hm = heading.exec(line)
    if (hm) {
      blocks.push({
        type: 'heading',
        level: hm[1].length as 1 | 2 | 3,
        content: parseInline(hm[2])
      })
      i++
      continue
    }

    // A list: consecutive bullet or ordered rows of the same kind.
    if (bullet.test(line) || ordered.test(line)) {
      const isOrdered = ordered.test(line)
      const pat = isOrdered ? ordered : bullet
      const items: MdInline[][] = []
      while (i < lines.length && pat.test(lines[i])) {
        items.push(parseInline(pat.exec(lines[i])![1]))
        i++
      }
      blocks.push({ type: 'list', ordered: isOrdered, items })
      continue
    }

    // Paragraph: gather until a blank line or a block-starting line.
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !fence.test(lines[i]) &&
      !heading.test(lines[i]) &&
      !bullet.test(lines[i]) &&
      !ordered.test(lines[i])
    ) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push({ type: 'paragraph', content: parseInline(para.join(' ')) })
  }

  return blocks
}
