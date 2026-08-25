import type { ReactNode } from 'react'
import SignalResolve from './SignalResolve'

interface ContextPanelProps {
  title: string
  subtitle?: ReactNode
  image?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  identity?: string | number | null
}

// The desktop-only relationship lens used beside discovery and archive lists.
// It is deliberately content-agnostic: callers own queries and navigation while
// this component keeps the reading order and responsive disappearance stable.
export default function ContextPanel({
  title,
  subtitle,
  image,
  children,
  footer,
  className = '',
  identity
}: ContextPanelProps) {
  return (
    <aside className={`hidden lg:block ${className}`} aria-label={`${title} context`}>
      <SignalResolve identity={identity ?? title} className="sticky top-6">
        <div className="card overflow-hidden p-0">
          {image && <div className="border-b border-base-700">{image}</div>}
          <div className="p-5">
            <h2 className="text-xl font-semibold text-white text-balance">{title}</h2>
            {subtitle && <div className="mt-1.5 text-sm text-gray-400">{subtitle}</div>}
            <div className="mt-5">{children}</div>
          </div>
          {footer && <div className="border-t border-base-700 px-5 py-4">{footer}</div>}
        </div>
      </SignalResolve>
    </aside>
  )
}

export function ContextFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-base-700 py-3 first:border-t-0 first:pt-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">{label}</p>
      <div className="mt-1 text-sm text-gray-300">{children}</div>
    </div>
  )
}

export function ContextTrail({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">{children}</div>
}
