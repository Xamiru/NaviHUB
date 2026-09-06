import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import HubCard from '../components/HubCard'
import EnglishRepairQueue from '../components/EnglishRepairQueue'

// The English section's dashboard (the JapaneseHomePage pattern): deck stats,
// then one quiet card per tool. Tests target C1/C2 — this section is
// deliberately test-first, not course-first.
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
  if (!data || data.corrections === 0) return null
  const top = data.byCategory.slice(0, 4)
  if (top.length === 0) return null
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <StatTile label="Due for review" value={due} accent={due > 0} />
        <StatTile label="New cards" value={stats?.newCount ?? 0} />
        <StatTile label="Saved words" value={stats?.totalCount ?? 0} />
        <StatTile label="Reviewed today" value={stats?.reviewedToday ?? 0} />
      </div>

      <ErrorLog due={due} leeches={leeches} />
      <EnglishRepairQueue />

      <Section title="Study">
        <HubGrid>
          <HubCard to="/english/repair" title="Rule repair" body="Worked examples, targeted practice, writing transfer and delayed checks for recurring mistakes." />
          <HubCard
            to="/english/dictionary"
            title="Dictionary"
            body="Offline WordNet lookup; saving a word adds it to the deck."
          />
          <HubCard
            to="/english/review"
            title="Review"
            body="Spaced repetition over every saved word."
            badge={due > 0 ? `${due} due` : undefined}
          />
          <HubCard
            to="/english/deck"
            title="Deck"
            body="Every saved word with its frequency rank — prune the tail, spot the leeches."
            badge={leeches > 0 ? `${leeches} leeches` : undefined}
          />
          <HubCard
            to="/english/writing"
            title="Writing"
            body="Essay, email and rewrite tasks, graded with corrections."
          />
        </HubGrid>
      </Section>

      <Section title="Tests">
        <HubGrid>
          <HubCard
            to="/english/vocab"
            title="Vocabulary"
            body="Advanced words by frequency band — meanings and synonyms."
          />
          <HubCard
            to="/english/spelling"
            title="Spelling"
            body="Definition and IPA shown; you type the word."
          />
          <HubCard
            to="/english/reading"
            title="Reading"
            body="C1/C2 passages with inference and tone questions."
          />
          <HubCard
            to="/english/mechanics"
            title="Mechanics"
            body="Articles, punctuation, confusables, register — spot the error."
          />
          <HubCard
            to="/english/use"
            title="Use of English"
            body="Typed: open cloze, word formation, key-word transformations."
          />
        </HubGrid>
      </Section>

      <Section title="Games">
        <HubGrid>
          <HubCard
            to="/english/games/punctuate"
            title="Punctuate it"
            body="Put the commas, semicolons, dashes and apostrophes back where they belong."
          />
          <HubCard
            to="/english/games/spot"
            title="Spot the error"
            body="One wrong word in the sentence — or none. Click it."
          />
          <HubCard
            to="/english/games/match"
            title="Collocation match"
            body="Six pairs a set: verb + noun, adjective + noun, phrasal verbs, prepositions."
          />
        </HubGrid>
      </Section>
    </div>
  )
}

function HubGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">{children}</div>
  )
}
