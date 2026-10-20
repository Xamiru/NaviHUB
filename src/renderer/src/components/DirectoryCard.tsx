import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { PersonDirectoryWork } from '@shared/types'
import type { DirectoryCounts } from '../lib/directory'
import CoverImage from './CoverImage'

// One card of the Mangaka or Studios directory: the name (with a photo or
// logo when there is one), the counts, and up to three title covers. Titles
// the user has not read or watched yet are dimmed.
export default function DirectoryCard({
  to,
  name,
  nameNative,
  image,
  counts,
  worksLabel,
  readLabel,
  covers,
  coverBase
}: {
  to: string
  name: string
  nameNative: string | null
  image?: ReactNode
  counts: DirectoryCounts
  // "3 anime", "1 manga".
  worksLabel: string
  // The verb after the read count: "read", "watched".
  readLabel: string
  covers: PersonDirectoryWork[]
  coverBase: string
}): JSX.Element {
  return (
    <li className="card flex flex-col gap-3 p-3">
      <Link to={to} className="group flex min-w-0 items-center gap-3">
        {image}
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium group-hover:text-accent">{name}</span>
          {nameNative && (
            <span className="block truncate text-xs text-gray-500">{nameNative}</span>
          )}
          <span className="mt-0.5 block text-xs text-gray-400">
            {worksLabel}
            {counts.readWorks > 0 && ` / ${counts.readWorks} ${readLabel}`}
            {counts.meanScore != null && ` / ★ ${counts.meanScore.toFixed(1)}`}
          </span>
        </span>
      </Link>
      {covers.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {covers.map((c) => (
            <Link
              key={c.id}
              to={`${coverBase}/${c.id}`}
              title={c.title}
              aria-label={c.title}
              className={c.read ? '' : 'opacity-60 hover:opacity-100 focus-visible:opacity-100'}
            >
              <CoverImage path={c.coverPath} alt="" thumbWidth={160} className="aspect-[2/3] w-full" />
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}
