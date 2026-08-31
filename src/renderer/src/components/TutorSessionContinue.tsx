import { Link, useNavigate } from 'react-router-dom'
import { useTutorSessionState } from '../lib/japaneseTutorSession'

export default function TutorSessionContinue({
  fallbackTo,
  fallbackLabel,
  fallbackBack = false,
  className = 'btn-ghost'
}: {
  fallbackTo: string
  fallbackLabel: string
  fallbackBack?: boolean
  className?: string
}): JSX.Element {
  const active = useTutorSessionState(false)
  const navigate = useNavigate()
  if (!active && fallbackBack) {
    return (
      <button type="button" className={className} onClick={() => navigate(-1)}>
        {fallbackLabel}
      </button>
    )
  }
  return (
    <Link
      to={active ? '/japanese/tutor/session' : fallbackTo}
      className={active ? className.replace('btn-ghost', 'btn-primary') : className}
    >
      {active ? 'Continue Tutor session' : fallbackLabel}
    </Link>
  )
}
