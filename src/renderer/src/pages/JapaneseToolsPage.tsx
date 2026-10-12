import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import { Field } from '../components/Field'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'
import ToolCard from '../components/japanese/ToolCard'
import { usePersistedState } from '../lib/navState'
import { useJapaneseTutorModel } from '../lib/useJapaneseTutorModel'
import { JP_TOOLS, JP_TOOL_GOALS, suggestedJpTools } from '../lib/japaneseTools'

// Every Japanese practice tool, grouped by what it helps with. Today shows a
// few suggestions; this is the whole catalogue, and nothing in it is locked.
export default function JapaneseToolsPage() {
  const [query, setQuery] = usePersistedState('jpTools.query', '')
  const [coreDeck, setCoreDeck] = useState(false)
  const model = useJapaneseTutorModel()
  const suggested = new Set(
    model.ready ? suggestedJpTools(model.plan.phase.id, model.kanaNeeded).map((tool) => tool.key) : []
  )
  const needle = query.trim().toLowerCase()
  const matches = JP_TOOLS.filter(
    (tool) => !needle || `${tool.title} ${tool.body}`.toLowerCase().includes(needle)
  )

  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-6">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Tools"
        subtitle="Every way to practise, grouped by what it helps with. Today’s session picks from these for you."
      />

      <Field label="Search tools" hiddenLabel className="mb-6 max-w-md">
        <input
          id="jp-tools-search"
          type="search"
          className="input"
          value={query}
          placeholder="Search tools"
          onChange={(event) => setQuery(event.target.value)}
        />
      </Field>

      {matches.length === 0 ? (
        <EmptyState
          title="No tool matches"
          body={`Nothing matches “${query.trim()}”.`}
          action={<button type="button" className="btn-ghost" onClick={() => setQuery('')}>Clear search</button>}
        />
      ) : (
        JP_TOOL_GOALS.map((goal) => {
          const tools = matches.filter((tool) => tool.goal === goal.key)
          if (tools.length === 0) return null
          return (
            <Section key={goal.key} title={goal.title} subtitle={goal.body}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.key}
                    tool={tool}
                    badge={suggested.has(tool.key) ? 'Suggested for you' : undefined}
                    onCore={() => setCoreDeck(true)}
                  />
                ))}
              </div>
            </Section>
          )
        })
      )}

      <p className="mt-4 text-sm text-gray-400">
        Want the long version of what each tool is for? Read the{' '}
        <Link to="/japanese/guide" className="text-signal-link hover:underline">Guide</Link>.
      </p>

      {coreDeck && <CoreDeckDialog onClose={() => setCoreDeck(false)} />}
    </div>
  )
}
