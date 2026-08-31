import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { statusesFrom, useSettings } from '../../lib/hooks'
import { MEDIA_CONFIGS } from '../../lib/mediaConfig'

// TheMoeWay's daily loop as three tiles: reviews, the next lesson, immersion.
// The immersion tile picks the most recently touched in-progress manga/novel;
// its query MUST stay byte-identical to HomePage's ({ mediaType: 'manga' }) —
// they share the qk.media.home cache entry.

const MANGA_CFG = MEDIA_CONFIGS.find((c) => c.key === 'manga')!

export default function RoadmapDailyLoop({
  due,
  fresh,
  nextLesson
}: {
  due: number
  fresh: number
  nextLesson: { id: number; title: string; courseTitle: string } | null
}) {
  const { data: settings } = useSettings()
  const { data: manga = [] } = useQuery({
    queryKey: qk.media.home('manga'),
    queryFn: () => api.media.list({ mediaType: 'manga' })
  })
  const inProgress = statusesFrom(settings, MANGA_CFG)[0]
  const reading = manga.find((m) => m.status === inProgress)

  const tiles = [
    {
      eyebrow: '01 REVIEW',
      to: '/japanese/review',
      title: due + fresh > 0 ? `Review ${due + fresh} cards` : 'Nothing due',
      sub: `${due} due · ${fresh} new ready`,
      hot: due + fresh > 0
    },
    {
      eyebrow: '02 LESSON',
      to: nextLesson ? `/japanese/lessons/${nextLesson.id}` : '/japanese/roadmap',
      title: nextLesson ? nextLesson.title : 'Path clear',
      sub: nextLesson ? nextLesson.courseTitle : 'review or read instead',
      hot: false
    },
    {
      eyebrow: '03 IMMERSE',
      // No manga in progress → the sentence feed, not a bare library page:
      // i+1 sentences ARE the immersion until a series is underway.
      to: reading ? `/manga/${reading.id}` : '/japanese/feed',
      title: reading ? `Continue ${reading.title}` : 'Sentence feed',
      sub: reading ? 'reading beats everything' : 'i+1 sentences from your known words',
      hot: false
    }
  ]

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.eyebrow}
            to={t.to}
            className={`card group p-3 ${t.hot ? 'border-accent/60' : ''}`}
          >
            <p
              className={`font-mono text-[11px] uppercase tracking-widest ${
                t.hot ? 'text-accent' : 'text-gray-500'
              }`}
            >
              {t.eyebrow}
            </p>
            <p className="mt-1 truncate text-sm font-medium group-hover:text-accent">{t.title}</p>
            <p className="mt-0.5 truncate text-xs text-gray-500">{t.sub}</p>
          </Link>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">
        The loop runs in parallel, not in order — a bit of each, every day.
      </p>
    </div>
  )
}
