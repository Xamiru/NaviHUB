import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { PROG_COURSES } from '@shared/programming/courses'

const ERROR_LABEL: Record<string, string> = {
  articles: 'article slips',
  punctuation: 'punctuation',
  boundaries: 'sentence boundaries',
  confusables: 'confusables',
  register: 'register',
  spelling: 'spelling'
}

// Compact evidence continuity for every nested learning route. The active
// exercise remains primary; this band answers why the learner is here and
// where the evidence leads next without duplicating each page's own logic.
export default function LearningContextBand() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/english/') && pathname !== '/english/') return <EnglishBand />
  if (pathname.startsWith('/japanese/') && pathname !== '/japanese/') return <JapaneseBand />
  if (pathname.startsWith('/programming/') && pathname !== '/programming/') return <ProgrammingBand />
  return null
}

function Band({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-base-700 bg-base-900/40 px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
        {children}
      </div>
    </div>
  )
}

function EnglishBand() {
  const { data } = useQuery({
    queryKey: qk.english.errorTally,
    queryFn: () => api.english.errorTally()
  })
  const priority = data?.byCategory[0]
  return (
    <Band>
      <span className="font-medium text-gray-200">Mistake ledger</span>
      {priority ? (
        <>
          <span>
            Priority: {ERROR_LABEL[priority.category] ?? priority.category} · {priority.count}{' '}
            corrections
          </span>
          <span>{data.corrections} corrections across {data.submissions} submissions</span>
        </>
      ) : (
        <span>Complete writing feedback to establish a personal evidence trail.</span>
      )}
      <Link to="/english" className="ml-auto text-accent hover:text-accent-hover">
        Open ledger
      </Link>
    </Band>
  )
}

function JapaneseBand() {
  const { data } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats()
  })
  return (
    <Band>
      <span className="font-medium text-gray-200">Knowledge map</span>
      <span>{data?.dueCount ?? 0} reviews due</span>
      <span>{data?.newAvailableCount ?? 0} unseen cards available</span>
      <Link to="/japanese" className="ml-auto text-accent hover:text-accent-hover">
        Return to today
      </Link>
    </Band>
  )
}

function ProgrammingBand() {
  const { data = [] } = useQuery({
    queryKey: qk.programming.progress,
    queryFn: () => api.programming.progress()
  })
  const total = PROG_COURSES.reduce((count, course) => count + course.lessons.length, 0)
  return (
    <Band>
      <span className="font-medium text-gray-200">Skill graph</span>
      <span>{data.length} of {total} lesson nodes complete</span>
      <span>CLI, SQL and Regex evidence remain local to their tools.</span>
      <Link to="/programming" className="ml-auto text-accent hover:text-accent-hover">
        Open graph
      </Link>
    </Band>
  )
}
