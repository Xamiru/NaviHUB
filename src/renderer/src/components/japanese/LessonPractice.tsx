import { Link } from 'react-router-dom'
import type { JpLessonKind } from '@shared/types'
import { lessonPractice } from '@shared/japanese/lessonPractice'

// "Practice this": the existing drills for what the lesson teaches, under the
// lesson check. Renders nothing when no drill fits.
export default function LessonPractice({ seedKey, kind }: { seedKey: string | null; kind: JpLessonKind }) {
  const links = lessonPractice(seedKey, kind)
  if (!links.length) return null
  return (
    <nav aria-label="Practice this" className="card mt-6 p-5">
      <h2 className="font-semibold text-white">Practice this</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.route}>
            <Link to={link.route} className="btn-ghost">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
