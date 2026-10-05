import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import { StatInline } from '../components/StatTile'
import EnglishRepairQueue from '../components/EnglishRepairQueue'
import type { EnSrsStats } from '@shared/types'
import { quizSeed } from '@shared/quizCore'
import { localDayString } from '../lib/archiveDisplay'

// The English section's dashboard: the mistake ledger leads, a word from the
// deck and the review counts sit beside it, and the tools follow as compact
// rows. Tests target C1/C2 — this section is deliberately test-first, not
// course-first.
const CATEGORY_LABEL: Record<string, string> = {
  articles: 'article slips',
  punctuation: 'punctuation',
  boundaries: 'run-ons and comma splices',
  confusables: 'confusables',
  register: 'register',
  spelling: 'spelling'
}

// Your own graded writing, read back. en_writing has always stored a
// corrections array and nothing ever looked at it again — which made it the
// most valuable data in the section and the only write-only data in the app.
// The mechanics drill weights itself off the same tally.
function ErrorLog({ due, leeches }: { due: number; leeches: number }) {
  const { data } = useQuery({
    queryKey: qk.english.errorTally,
    queryFn: () => api.english.errorTally()
  })
  if (!data) return null
  const top = data.byCategory.slice(0, 4)
  // The ledger leads the page even before it has evidence, so it says how it
  // fills instead of the page opening on a wall of tools.
  if (data.corrections === 0 || top.length === 0) {
    return (
      <Section title="Mistake ledger" subtitle="No corrections on record yet">
        <div className="card p-6">
          <p className="max-w-[60ch] text-sm leading-relaxed text-gray-300">
            The ledger fills from your own work: corrections in graded writing tasks, and the exact items you miss in
            Mechanics rounds. Once a pattern recurs, it appears here with the repair unit that teaches it.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/english/mechanics" className="btn-ghost">Take a mechanics round</Link>
            <Link to="/english/repair" className="btn-ghost">Browse rule repair</Link>
          </div>
        </div>
      </Section>
    )
  }
  return (
    <Section title="Mistake ledger" subtitle={`Evidence from ${data.submissions} writing submissions`}>
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="card-glow flex flex-col p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            Current priority
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {CATEGORY_LABEL[top[0].category] ?? top[0].category}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            {top[0].count} corrections in your graded work. Start here, then return to the ledger to see whether the pattern recedes.
          </p>
          <Link to={`/english/repair?category=${top[0].category}`} className="btn-ghost mt-6 self-start">
            Learn and repair this pattern
          </Link>
        </div>
        <div className="card overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_100px_150px] border-b border-base-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            <span>Pattern</span>
            <span>Corrections</span>
            <span>Evidence</span>
          </div>
          {top.map((c) => (
            <div
              key={c.category}
              className="grid grid-cols-[minmax(0,1fr)_100px_150px] items-center border-b border-base-700 px-5 py-4 last:border-b-0"
            >
              <span className="text-sm text-gray-200">
                {CATEGORY_LABEL[c.category] ?? c.category}
              </span>
              <span className="text-sm tabular-nums text-accent">{c.count}</span>
              <span className="text-xs text-gray-500">Graded writing</span>
            </div>
          ))}
          <div className="grid gap-3 border-t border-base-700 p-4 sm:grid-cols-2">
            <Link to="/english/review" className="rounded-md border border-base-700 p-3 hover:border-accent">
              <p className="text-xs uppercase tracking-wider text-gray-500">Review pressure</p>
              <p className="mt-1 text-sm font-medium">{due} cards due</p>
            </Link>
            <Link to="/english/deck" className="rounded-md border border-base-700 p-3 hover:border-accent">
              <p className="text-xs uppercase tracking-wider text-gray-500">Weak words</p>
              <p className="mt-1 text-sm font-medium">{leeches} leeches</p>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default function EnglishHomePage() {
  const { data: stats } = useQuery({
    queryKey: qk.english.srsStats,
    queryFn: () => api.english.srsStats(),
    staleTime: 0
  })

  const { data: leechList = [] } = useQuery({
    queryKey: qk.english.leeches,
    queryFn: () => api.english.listLeeches()
  })

  const due = stats?.dueCount ?? 0
  const leeches = leechList.length

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Mistake ledger"
        subtitle="Use your own corrections and review pressure as the map for advanced English practice."
        actions={
          <Link to={due > 0 ? '/english/review' : '/english/writing'} className="btn-primary">
            {due > 0 ? `Review ${due} cards` : 'Start writing task'}
          </Link>
        }
      />

      <div className="mb-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <ErrorLog due={due} leeches={leeches} />
          <EnglishRepairQueue />
        </div>
        <aside className="space-y-6">
          <DeckWord />
          <ReviewCounts stats={stats} />
        </aside>
      </div>

      <Section title="Toolbox">
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
          {TOOL_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="label mb-1">{group.title}</p>
              {group.tools.map((tool) => (
                <Link key={tool.to} to={tool.to} className="group block border-b border-base-700/60 py-2.5">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium group-hover:text-accent">{tool.title}</span>
                    {tool.to === '/english/review' && due > 0 && <span className="text-xs text-accent">{due} due</span>}
                    {tool.to === '/english/deck' && leeches > 0 && (
                      <span className="text-xs text-signal-caution">{leeches} leeches</span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">{tool.body}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

const TOOL_GROUPS: { title: string; tools: { to: string; title: string; body: string }[] }[] = [
  {
    title: 'Study',
    tools: [
      { to: '/english/repair', title: 'Rule repair', body: 'Worked examples, practice, writing transfer and delayed checks.' },
      { to: '/english/dictionary', title: 'Dictionary', body: 'Offline WordNet lookup; saving a word adds it to the deck.' },
      { to: '/english/review', title: 'Review', body: 'Spaced repetition over every saved word.' },
      { to: '/english/deck', title: 'Deck', body: 'Saved words by frequency rank: prune the tail, spot the leeches.' },
      { to: '/english/writing', title: 'Writing', body: 'Essay, email and rewrite tasks, graded with corrections.' }
    ]
  },
  {
    title: 'Tests',
    tools: [
      { to: '/english/vocab', title: 'Vocabulary', body: 'Advanced words by frequency band: meanings and synonyms.' },
      { to: '/english/spelling', title: 'Spelling', body: 'Definition and IPA shown; you type the word.' },
      { to: '/english/reading', title: 'Reading', body: 'C1/C2 passages with inference and tone questions.' },
      { to: '/english/mechanics', title: 'Mechanics', body: 'Articles, punctuation, confusables, register: spot the error.' },
      { to: '/english/use', title: 'Use of English', body: 'Typed open cloze, word formation and key-word transformations.' }
    ]
  },
  {
    title: 'Games',
    tools: [
      { to: '/english/games/punctuate', title: 'Punctuate it', body: 'Put commas, semicolons, dashes and apostrophes back.' },
      { to: '/english/games/spot', title: 'Spot the error', body: 'One wrong word in the sentence, or none. Click it.' },
      { to: '/english/games/match', title: 'Collocation match', body: 'Six pairs a set: verb + noun, phrasal verbs, prepositions.' }
    ]
  }
]

// One saved word a day: the word whose id hashes lowest with today's local
// date, so saving or deleting other words never swaps it before midnight.
function DeckWord() {
  const { data: deck } = useQuery({ queryKey: qk.english.deck, queryFn: () => api.english.deck() })
  if (!deck) return null
  const today = localDayString(new Date())
  const word = deck.reduce<(typeof deck)[number] | null>(
    (best, w) => (best == null || quizSeed(`${today}:${w.id}`) < quizSeed(`${today}:${best.id}`) ? w : best),
    null
  )
  return (
    <section className="card p-5" aria-label="Word of the day">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">Word of the day · from your deck</p>
      {word ? (
        <>
          <p className="mt-2 text-2xl font-semibold text-white">{word.word}</p>
          <p className="text-xs text-gray-400">{[word.phonetic, word.pos].filter(Boolean).join(' · ')}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">{word.meaning}</p>
          {word.example && <p className="mt-2 text-sm italic text-gray-400">{word.example}</p>}
          <Link to="/english/deck" className="mt-3 inline-block text-xs text-gray-400 hover:text-white">Open deck ›</Link>
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-400">
          Save words from the <Link to="/english/dictionary" className="text-signal-link hover:underline">Dictionary</Link>{' '}
          and one comes back here each day.
        </p>
      )}
    </section>
  )
}

function ReviewCounts({ stats }: { stats: EnSrsStats | undefined }) {
  return (
    <div className="card grid grid-cols-2 gap-3 p-5">
      <StatInline label="Due for review" value={stats?.dueCount ?? 0} accent={(stats?.dueCount ?? 0) > 0} />
      <StatInline label="New cards" value={stats?.newCount ?? 0} />
      <StatInline label="Saved words" value={stats?.totalCount ?? 0} />
      <StatInline label="Reviewed today" value={stats?.reviewedToday ?? 0} />
    </div>
  )
}
