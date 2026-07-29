import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// A "door" into another section: the accent-gradient link card used on the
// HomePage right rail. The whole card is the affordance (hover border + title
// accent) — no fake buttons inside a link.
export default function DoorCard({
  eyebrow,
  title,
  body,
  to,
  value,
  meta
}: {
  eyebrow: string
  title: ReactNode
  body?: ReactNode
  to: string
  value?: ReactNode // optional slot under the title (progress bar etc.)
  meta?: ReactNode // bottom small line
}) {
  return (
    <Link
      to={to}
      className="card-glow group flex flex-col justify-between p-5 transition-colors hover:border-accent"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        <p className="mt-1 text-xl font-bold transition-colors group-hover:text-accent">{title}</p>
        {value && <div className="mt-2">{value}</div>}
        {body && <p className="mt-1 text-sm text-gray-400">{body}</p>}
      </div>
      {meta && <p className="mt-3 text-xs text-gray-500">{meta}</p>}
    </Link>
  )
}
