import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import HubCard from '../components/HubCard'

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
function ErrorLog() {
  const { data } = useQuery({
    queryKey: qk.english.errorTally,
    queryFn: () => api.english.errorTally()
  })
  if (!data || data.corrections === 0) return null
  const top = data.byCategory.slice(0, 4)
  if (top.length === 0) return null
  return (
    <Section title="What you keep getting wrong" subtitle={`last ${data.submissions} submissions`}>
      <div className="card p-4">
        <div className="flex flex-wrap gap-2">
          {top.map((c) => (
            <span key={c.category} className="chip">
              {c.count} {CATEGORY_LABEL[c.category] ?? c.category}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Counted from the corrections on your graded writing. The mechanics drill draws these
          categories more often.
        </p>
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
        title="English"
        subtitle="Look words up, save them, then let the tests and reviews make them stick."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <StatTile label="Due for review" value={due} accent={due > 0} />
        <StatTile label="New cards" value={stats?.newCount ?? 0} />
        <StatTile label="Saved words" value={stats?.totalCount ?? 0} />
        <StatTile label="Reviewed today" value={stats?.reviewedToday ?? 0} />
      </div>

      <ErrorLog />

      <Section title="Study">
        <HubGrid>
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
