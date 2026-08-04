import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import Section from '../Section'

// One-time onboarding: the offline packs the section leans on, in install
// order, with live installed-state. Renders nothing once the core six are in —
// a set-up section that lingers after setup is done would just be noise.
// Installed predicates mirror DictionarySettings (SettingsPage): Yomitan packs
// by title prefix, the bespoke packs by their nullable info invokes.

const SETTINGS_LINK = '/settings?tab=japanese'

export default function SetupChecklist() {
  const dictsQ = useQuery({ queryKey: qk.dict.list, queryFn: () => api.dict.list() })
  const sentencesQ = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })
  const kradQ = useQuery({ queryKey: qk.dict.kradSet, queryFn: () => api.dict.kradSet() })
  const grammarQ = useQuery({
    queryKey: qk.dict.grammarBank,
    queryFn: () => api.dict.grammarBank()
  })

  // Wait for all four before judging — a "nothing installed" flash on every
  // visit would cry wolf.
  if (!dictsQ.isSuccess || !sentencesQ.isSuccess || !kradQ.isSuccess || !grammarQ.isSuccess)
    return null

  const dicts = dictsQ.data
  const hasDict = (prefix: string): boolean =>
    dicts.some((d) => d.title.toLowerCase().startsWith(prefix.toLowerCase()))

  const rows: { title: string; size: string | null; unlocks: string; installed: boolean }[] = [
    {
      title: 'JMdict (English)',
      size: '~60 MB',
      unlocks: 'Lookups, mining autofill and both deck generators — install this first.',
      installed: hasDict('JMdict')
    },
    {
      title: 'Frequency dictionary (JPDB or BCCWJ)',
      size: null,
      unlocks: 'Word rankings: the core deck, the sentence feed and most drill pools.',
      // Any Yomitan dict carrying frequency ranks counts, not just the two presets.
      installed: dicts.some((d) => d.freqCount > 0)
    },
    {
      title: 'KANJIDIC (English)',
      size: null,
      unlocks: 'Per-kanji readings, meanings and JLPT levels for the kanji breakdown.',
      installed: hasDict('KANJIDIC')
    },
    {
      title: 'Kanji components (KRADFILE)',
      size: '<1 MB',
      unlocks: 'Search-by-parts, build-a-kanji and the look-alike drills.',
      installed: kradQ.data != null
    },
    {
      title: 'Grammar library (N5-N1)',
      size: '~2 MB',
      unlocks: 'The searchable grammar reference and the cloze drill.',
      installed: grammarQ.data != null
    },
    {
      title: 'Example sentences (Tatoeba)',
      size: null,
      unlocks: 'The i+1 sentence feed, plus examples in the dictionary and on mined cards.',
      installed: sentencesQ.data != null
    }
  ]

  if (rows.every((r) => r.installed)) return null

  return (
    <Section
      title="Set up"
      subtitle={
        <Link to={SETTINGS_LINK} className="hover:text-accent">
          Settings → Dictionaries
        </Link>
      }
    >
      <div className="card divide-y divide-base-700">
        {rows.map((r) => {
          const inner = (
            <>
              <span
                className={`w-6 shrink-0 text-center ${r.installed ? 'text-green-400' : 'text-gray-600'}`}
                title={r.installed ? 'Installed' : 'Not installed'}
              >
                {r.installed ? '✓' : '○'}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-sm font-medium">
                  {r.title}
                  {r.size && <span className="ml-2 text-xs text-gray-500">{r.size}</span>}
                </span>
                <span className="mt-0.5 block text-xs text-gray-400">{r.unlocks}</span>
              </span>
            </>
          )
          return r.installed ? (
            <div key={r.title} className="flex items-center gap-2 p-3">
              {inner}
            </div>
          ) : (
            <Link
              key={r.title}
              to={SETTINGS_LINK}
              className="group flex items-center gap-2 p-3 hover:bg-base-800/60"
            >
              {inner}
              <span className="shrink-0 text-xs text-gray-500 group-hover:text-accent">
                Install ›
              </span>
            </Link>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Offline packs the practice pages need — a one-time download each, then everything works
        without a network. Five more optional packs (names, stroke order, pitch, audio) live in
        Settings.
      </p>
    </Section>
  )
}
