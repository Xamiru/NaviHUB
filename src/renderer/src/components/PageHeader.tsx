import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'

// The standard page header: back affordance, title row, subtitle, actions.
// Encodes the app's back convention so pages stop hand-rolling it:
//   back="history"     → sticky BackButton (detail/form sub-pages — returns
//                        wherever the user actually came from)
//   back={{to, label}} → quiet fixed-parent breadcrumb (section sub-pages that
//                        always belong to one hub, e.g. everything → /japanese)
//   back omitted       → plain header (hubs, list pages)
export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  back,
  actions,
  className = 'mb-5'
}: {
  title: ReactNode
  subtitle?: ReactNode
  /** Small row above the title (chip rows on course/lesson pages). */
  eyebrow?: ReactNode
  back?: 'history' | { to: string; label: string }
  actions?: ReactNode
  className?: string
}) {
  return (
    <>
      {back === 'history' && <BackButton />}
      <div className={`${className} border-b border-line-subtle pb-4`}>
        {back && back !== 'history' && (
          <Link to={back.to} className="text-sm text-ink-muted hover:text-ink-secondary">
            ← {back.label}
          </Link>
        )}
        {eyebrow && (
          <div className={`flex flex-wrap items-center gap-1.5 ${back && back !== 'history' ? 'mt-1' : ''}`}>
            {eyebrow}
          </div>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1
            className={`text-3xl font-semibold tracking-tight text-ink ${
              (back && back !== 'history') || eyebrow ? 'mt-1' : ''
            }`}
          >
            {title}
          </h1>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {subtitle && <p className="mt-1.5 max-w-4xl text-sm leading-relaxed text-ink-muted">{subtitle}</p>}
      </div>
    </>
  )
}
