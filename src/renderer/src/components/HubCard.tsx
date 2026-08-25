import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// The quiet section-hub card (Japanese/Quiz/Gacha/Programming hub grids): plain
// card, accent border on hover. DoorCard's glow is reserved for Home's right
// rail — hub grids stay quiet so the gradient keeps meaning "a door out of Home".
// Pass `to` for navigation or `onClick` when the card opens a dialog.
export default function HubCard({
  to,
  onClick,
  title,
  body,
  badge,
  meta,
  children
}: {
  to?: string
  onClick?: () => void
  title: string
  body?: ReactNode
  badge?: string
  meta?: ReactNode
  children?: ReactNode
}) {
  const inner = (
    <>
      <p className="font-semibold transition-colors group-hover:text-accent">
        {title}
        {badge && <span className="ml-2 text-xs font-normal text-accent">{badge}</span>}
      </p>
      {body && <p className="mt-1 text-sm text-gray-500">{body}</p>}
      {children}
      {meta && <p className="mt-3 text-xs text-gray-500">{meta}</p>}
    </>
  )
  const cls =
    'card group block h-full min-h-[126px] p-5 text-left transition-colors hover:border-accent hover:bg-base-700/60'
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}
