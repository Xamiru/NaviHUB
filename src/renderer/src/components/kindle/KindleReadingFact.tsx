import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { readTime } from '../../lib/kindle'
import { qk } from '../../lib/queryKeys'

const FACT = 'text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500'

// A manga's measured reading time on the Kindle (imported from KOReader's
// statistics), beside the detail page's other facts. Books show theirs in
// BookFacts. Nothing renders until a Kindle import has recorded reading.
export default function KindleReadingFact({ mediaId }: { mediaId: number }) {
  const { data } = useQuery({
    queryKey: qk.media.kindleReading(mediaId),
    queryFn: () => api.kindle.bookReading(mediaId)
  })
  if (!data || data.seconds <= 0) return null
  return (
    <div>
      <p className={FACT}>Kindle</p>
      <p className="mt-1 text-white">
        Read on Kindle: {readTime(data.seconds)} over {data.days} {data.days === 1 ? 'day' : 'days'}
      </p>
      {data.lastDay && <p className="text-xs text-gray-400">Last read {data.lastDay}</p>}
      <Link to="/books/kindle" className="mt-1 inline-block text-xs text-signal-link hover:underline">
        Kindle
      </Link>
    </div>
  )
}
