import type { ReactNode } from 'react'

interface SignalResolveProps {
  identity: string | number | null | undefined
  children: ReactNode
  className?: string
}

// Re-keying the content starts the short CSS-only scan-and-lock reveal. It
// never gates a query or navigation, and reduced-motion users get a static
// mount because the animation only exists in the no-preference media query.
export default function SignalResolve({
  identity,
  children,
  className = ''
}: SignalResolveProps) {
  return (
    <div key={identity ?? 'signal-idle'} className={`signal-resolve ${className}`}>
      {children}
    </div>
  )
}
