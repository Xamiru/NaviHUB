import type { ReactNode } from 'react'

interface EditorialDetailFrameProps {
  children: ReactNode
  aside?: ReactNode
  width?: 'reading' | 'wide' | 'full'
  className?: string
}

const WIDTH = {
  reading: 'max-w-5xl',
  wide: 'max-w-[1400px]',
  full: 'max-w-[1600px]'
} as const

// Shared page geometry for details, dossiers and collection editors. It does
// not impose a hero or tabs; existing pages keep those behaviors and gain one
// predictable desktop context column when they have useful evidence for it.
export default function EditorialDetailFrame({
  children,
  aside,
  width = 'wide',
  className = ''
}: EditorialDetailFrameProps) {
  return (
    <div className={`mx-auto w-full ${WIDTH[width]} p-4 sm:p-6 ${className}`}>
      {aside ? (
        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">{children}</div>
          {aside}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export function RelationshipTrail({ children }: { children: ReactNode }) {
  return (
    <nav
      className="mb-5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-base-700 pb-4 text-sm text-gray-400"
      aria-label="Relationship trail"
    >
      {children}
    </nav>
  )
}
