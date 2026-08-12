import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { parseMarkdown, type MdBlock, type MdInline } from '@shared/markdown'
import { api } from '../lib/api'

// Renders the pure parseMarkdown() block tree into React elements (LLM coach
// replies, English feedback, wiki prose). House rule: NEVER
// dangerouslySetInnerHTML. http(s) links open in the system browser via
// app:openExternal (raw <a href> would be hijacked by HashRouter).
//
// `linkResolver` handles NON-http hrefs, which were previously inert: the
// wrestling wiki emits [label](wiki:Some_Article), and the resolver turns a
// target we hold into an in-app route. Anything it can't place renders as
// quiet text rather than a dead click (the RelatedSection greyed precedent).
// Omit the prop and behaviour is exactly as before.
export type MdLinkResolver = (href: string) => string | null

function Inline({
  spans,
  linkResolver,
  unresolvedTitle
}: {
  spans: MdInline[]
  linkResolver?: MdLinkResolver
  unresolvedTitle?: string
}) {
  return (
    <>
      {spans.map((s, i) => {
        switch (s.type) {
          case 'bold':
            return (
              <strong key={i} className="font-semibold text-white">
                {s.text}
              </strong>
            )
          case 'italic':
            return (
              <em key={i} className="italic">
                {s.text}
              </em>
            )
          case 'code':
            return (
              <code key={i} className="rounded bg-base-700 px-1 py-0.5 text-[0.85em]">
                {s.text}
              </code>
            )
          case 'link': {
            if (/^https?:\/\//i.test(s.href)) {
              return (
                <button
                  key={i}
                  className="text-accent underline hover:text-accent-hover"
                  onClick={() => api.app.openExternal(s.href)}
                >
                  {s.text}
                </button>
              )
            }
            const to = linkResolver?.(s.href)
            if (to) {
              return (
                <Link key={i} to={to} className="text-accent hover:text-accent-hover">
                  {s.text}
                </Link>
              )
            }
            return (
              <span key={i} className="text-gray-400" title={unresolvedTitle}>
                {s.text}
              </span>
            )
          }
          default:
            return <Fragment key={i}>{s.text}</Fragment>
        }
      })}
    </>
  )
}

export default function Markdown({
  text,
  linkResolver,
  // Tooltip for a non-http link the resolver couldn't place. Supplied by the
  // caller, because "Not in the wiki" is meaningless in the coach chat or in
  // English writing feedback, which share this renderer.
  unresolvedTitle
}: {
  text: string
  linkResolver?: MdLinkResolver
  unresolvedTitle?: string
}) {
  const blocks = parseMarkdown(text)
  return (
    <div className="space-y-2 text-sm leading-relaxed text-gray-200">
      {blocks.map((b, i) => (
        <Block key={i} block={b} linkResolver={linkResolver} unresolvedTitle={unresolvedTitle} />
      ))}
    </div>
  )
}

function Block({
  block,
  linkResolver,
  unresolvedTitle
}: {
  block: MdBlock
  linkResolver?: MdLinkResolver
  unresolvedTitle?: string
}) {
  switch (block.type) {
    case 'heading': {
      const cls =
        block.level === 1
          ? 'text-base font-semibold text-white'
          : block.level === 2
            ? 'text-sm font-semibold text-white'
            : 'text-sm font-medium text-gray-100'
      return (
        <p className={`mt-1 ${cls}`}>
          <Inline spans={block.content} linkResolver={linkResolver} unresolvedTitle={unresolvedTitle} />
        </p>
      )
    }
    case 'list':
      return block.ordered ? (
        <ol className="list-decimal space-y-1 pl-5">
          {block.items.map((it, i) => (
            <li key={i}>
              <Inline spans={it} linkResolver={linkResolver} unresolvedTitle={unresolvedTitle} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1 pl-5">
          {block.items.map((it, i) => (
            <li key={i}>
              <Inline spans={it} linkResolver={linkResolver} unresolvedTitle={unresolvedTitle} />
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre className="overflow-x-auto rounded-md bg-base-900 p-3 text-xs">
          <code>{block.text}</code>
        </pre>
      )
    default:
      return (
        <p>
          <Inline spans={block.content} linkResolver={linkResolver} unresolvedTitle={unresolvedTitle} />
        </p>
      )
  }
}
