import type { MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePreviousEntry } from '../lib/navState'

// The quiet "← Parent" breadcrumb, with Back semantics: it returns to the page
// the user actually came from (a match, a search, another section), exactly
// like Alt+Left. `to` is only the fallback for a tab's first page, and `label`
// names it only when the previous page IS that parent; otherwise it reads
// "Back", so the text never promises a destination the click will not reach.
//
// A link to the page's own route (a quiz or setup page whose crumb resets its
// phase) stays a plain link: going back would leave the page instead.
export default function ParentBackLink({
  to,
  label,
  className
}: {
  to: string
  label: string
  className?: string
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const previous = usePreviousEntry()
  const target = to.split(/[?#]/)[0]
  const prev = previous()
  const selfLink = target === location.pathname
  const text = selfLink || !prev || prev.pathname === target ? label : 'Back'

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (selfLink || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (previous()) navigate(-1)
    else navigate(to, { replace: true })
  }

  return (
    <Link to={to} className={className} onClick={onClick}>
      ← {text}
    </Link>
  )
}
