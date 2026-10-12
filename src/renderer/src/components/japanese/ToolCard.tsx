import { Link } from 'react-router-dom'
import type { JpTool } from '../../lib/japaneseTools'

// One practice tool as a card: Today's suggestions and the Tools catalogue.
export default function ToolCard({ tool, onCore, badge }: { tool: JpTool; onCore: () => void; badge?: string }) {
  const body = (
    <>
      <span className="flex items-start justify-between gap-2">
        <span className="font-medium text-white group-hover:text-accent">{tool.title}</span>
        {badge && <span className="chip shrink-0 text-[11px]">{badge}</span>}
      </span>
      <span className="mt-1 block text-sm text-gray-400">{tool.body}</span>
    </>
  )
  const className = 'card group block h-full p-4 text-left transition-colors hover:border-accent'
  return tool.action === 'core' ? (
    <button type="button" className={`${className} w-full`} onClick={onCore}>{body}</button>
  ) : (
    <Link to={tool.to!} className={className}>{body}</Link>
  )
}

