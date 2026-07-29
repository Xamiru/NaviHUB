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
  back,
  actions,
  className = 'mb-5'
}: {
  title: ReactNode
  subtitle?: ReactNode
  back?: 'history' | { to: string; label: string }
  actions?: ReactNode
  className?: string
}) {
  return (
    <>
      {back === 'history' && <BackButton />}
      <div className={className}>
        {back && back !== 'history' && (
          <Link to={back.to} className="text-sm text-gray-500 hover:text-gray-300">
            ← {back.label}
          </Link>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className={`text-2xl font-bold ${back && back !== 'history' ? 'mt-1' : ''}`}>
            {title}
          </h1>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </>
  )
}
