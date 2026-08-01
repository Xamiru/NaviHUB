import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'

// TheMoeWay's long-term immersion targets, counted from the REAL library:
// finished anime series and finished novels (EPUB-backed manga items). Manga
// gets a plain count — TMW publishes no manga ladder, and a made-up one would
// be dishonest.

const ANIME_LADDER = [1, 10, 25, 50]
const NOVEL_LADDER = [1, 5]

function LadderRow({ label, value, ladder }: { label: string; value: number; ladder: number[] }) {
  const nextTarget = ladder.find((t) => value < t) ?? ladder[ladder.length - 1]
  const pct = Math.min(100, Math.round((value / nextTarget) * 100))
  return (
    <div className="card p-3">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs tabular-nums text-gray-400">
          {value} / {nextTarget}
        </p>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 flex gap-1">
        {ladder.map((t) => (
          <span
            key={t}
            className={`chip ${
              value >= t ? 'bg-green-500/20 text-green-300' : 'bg-base-700 text-gray-500'
            }`}
          >
            {value >= t ? '✓ ' : ''}
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function RoadmapMilestones() {
  const { data } = useQuery({
    queryKey: qk.media.jpMilestones,
    queryFn: () => api.media.jpMilestones()
  })
  if (!data) return null
  return (
    <div>
      <div className="space-y-2">
        <LadderRow label="Anime series finished" value={data.animeCompleted} ladder={ANIME_LADDER} />
        <LadderRow label="Novels finished" value={data.novelsCompleted} ladder={NOVEL_LADDER} />
        <div className="card flex items-baseline justify-between p-3">
          <p className="text-sm font-medium">Manga finished</p>
          <p className="text-sm tabular-nums text-gray-300">{data.mangaCompleted}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Targets from The Moe Way&apos;s routine: one novel ends the beginner stage, five is
        intermediate. Only library items marked completed count.
      </p>
    </div>
  )
}
