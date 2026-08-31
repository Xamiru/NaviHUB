import { Link, useLocation } from 'react-router-dom'
import { useTutorSessionState } from '../lib/japaneseTutorSession'

export default function TutorSessionStrip(): JSX.Element | null {
  const location = useLocation()
  const session = useTutorSessionState(false)
  if (!session || location.pathname === '/japanese/tutor/session') return null

  return (
    <div className="border-b border-accent/30 bg-accent/5 px-4 py-2 sm:px-6">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <p className="min-w-0 truncate text-sm text-gray-300">
          Tutor session active. Return to let today’s evidence choose the next block.
        </p>
        <Link to="/japanese/tutor/session" className="shrink-0 text-sm font-medium text-accent hover:text-white">
          Return to session
        </Link>
      </div>
    </div>
  )
}
