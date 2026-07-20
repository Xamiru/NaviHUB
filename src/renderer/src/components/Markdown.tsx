import { Fragment } from 'react'
import { parseMarkdown, type MdBlock, type MdInline } from '@shared/markdown'
import { api } from '../lib/api'

// Renders LLM coach replies from the pure parseMarkdown() block tree into React
// elements. House rule: NEVER dangerouslySetInnerHTML. Links open in the system
// browser via app:openExternal (raw <a href> would be hijacked by HashRouter).

function Inline({ spans }: { spans: MdInline[] }) {
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
          case 'link':
            return (
              <button
                key={i}
                className="text-accent underline hover:text-accent-hover"
                onClick={() => /^https?:\/\//i.test(s.href) && api.app.openExternal(s.href)}
              >
                {s.text}
              </button>
            )
          default:
            return <Fragment key={i}>{s.text}</Fragment>
        }
      })}
    </>
  )
}

export default function Markdown({ text }: { text: string }) {
  const blocks = parseMarkdown(text)
  return (
    <div className="space-y-2 text-sm leading-relaxed text-gray-200">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  )
}

function Block({ block }: { block: MdBlock }) {
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
          <Inline spans={block.content} />
        </p>
      )
    }
    case 'list':
      return block.ordered ? (
        <ol className="list-decimal space-y-1 pl-5">
          {block.items.map((it, i) => (
            <li key={i}>
              <Inline spans={it} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1 pl-5">
          {block.items.map((it, i) => (
            <li key={i}>
              <Inline spans={it} />
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
          <Inline spans={block.content} />
        </p>
      )
  }
}
