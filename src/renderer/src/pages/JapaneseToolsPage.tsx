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
import { JP_HUB_TOOL_KEYS, JP_HUBS } from '../lib/japaneseHubs'

// Every Japanese practice tool. Browsing leads with the six hubs (each a set
// of sibling pages joined by tabs) and then the tools that stand alone; a
// search lists every matching tool flat. Nothing in it is locked.
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
        subtitle="Six places to practise, then the tools that stand alone. Today’s session picks from these for you."
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

      {needle ? (
        matches.length === 0 ? (
          <EmptyState
            title="No tool matches"
            body={`Nothing matches “${query.trim()}”.`}
            action={<button type="button" className="btn-ghost" onClick={() => setQuery('')}>Clear search</button>}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((tool) => (
              <ToolCard
                key={tool.key}
                tool={tool}
                badge={suggested.has(tool.key) ? 'Suggested for you' : undefined}
                onCore={() => setCoreDeck(true)}
              />
            ))}
          </div>
        )
      ) : (
        <>
          <Section title="Practice" subtitle="Six places to practise; each opens with tabs for its tools.">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {JP_HUBS.map((hub) => (
                <div key={hub.key} className="card p-4">
                  <h3 className="font-semibold text-white">
                    <Link to={hub.tools[0].to} className="hover:underline">{hub.title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{hub.body}</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {hub.tools.map((t) => (
                      <li key={t.key} className="flex items-center gap-2">
                        <Link to={t.to} className="text-signal-link hover:underline">{t.label}</Link>
                        {suggested.has(t.key) && <span className="chip text-xs">Suggested for you</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
          {JP_TOOL_GOALS.map((goal) => {
            const tools = JP_TOOLS.filter((tool) => tool.goal === goal.key && !JP_HUB_TOOL_KEYS.has(tool.key))
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
          })}
        </>
      )}

      <p className="mt-4 text-sm text-gray-400">
        Want the long version of what each tool is for? Read the{' '}
        <Link to="/japanese/guide" className="text-signal-link hover:underline">Guide</Link>.
      </p>

      {coreDeck && <CoreDeckDialog onClose={() => setCoreDeck(false)} />}
    </div>
  )
}
