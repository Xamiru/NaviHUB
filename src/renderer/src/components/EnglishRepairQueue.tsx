import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ENGLISH_MISTAKES_KEY, parseEnglishMistakes } from '@shared/english/mistakes'
import { EN_MECHANICS } from '@shared/english/mechanics'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import Section from './Section'

export default function EnglishRepairQueue() {
  const { data } = useQuery({ queryKey: qk.settings.values, queryFn: () => api.settings.all() })
  const misses = parseEnglishMistakes(data?.[ENGLISH_MISTAKES_KEY])
    .map((row) => ({ ...row, item: EN_MECHANICS.find((item) => item.key === row.key) }))
    .filter((row) => row.item)
  if (!misses.length) return null
  return <Section title="Rules to revisit" subtitle="Exact items missed in finished mechanics rounds. A correct first answer in a later round clears the item.">
    <ul className="card divide-y divide-base-700">
      {misses.slice(0, 6).map(({ item, misses: count }) => <li key={item!.key} className="p-4">
        <Link className="text-sm text-accent hover:underline" to={`/english/repair?item=${item!.key}`}>{item!.prompt}</Link>
        <p className="mt-1 text-xs text-gray-400">Missed in {count} round{count === 1 ? '' : 's'}</p>
      </li>)}
    </ul>
    <Link className="btn-ghost mt-3" to="/english/mechanics?weak=1">Retest these {misses.length} items</Link>
  </Section>
}
