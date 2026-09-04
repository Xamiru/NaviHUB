import type { ReactNode } from 'react'
import { useDialog } from '../lib/hooks'

export default function Dialog({
  labelledBy,
  describedBy,
  onClose,
  initialFocus,
  children,
  panelClassName = '',
  overlayClassName = 'fixed inset-0 z-50 bg-black/60 p-4'
}: {
  labelledBy: string
  describedBy?: string
  onClose: () => void
  initialFocus?: () => HTMLElement | null
  children: ReactNode
  panelClassName?: string
  overlayClassName?: string
}): JSX.Element {
  const panelRef = useDialog(onClose, { initialFocus })

  return (
    <div
      className={`${overlayClassName} flex items-center justify-center`}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={panelClassName}
      >
        {children}
      </div>
    </div>
  )
}
