import { Link, useSearchParams } from 'react-router-dom'
import { ENGLISH_REPAIR_UNITS, suggestedRepair } from '@shared/english/remediation'
import { EN_MECHANICS } from '@shared/english/mechanics'
import { learningSettingKey } from '@shared/learningEvidence'
import PageHeader from '../components/PageHeader'
import LearningPractice from '../components/LearningPractice'
import LearningProject from '../components/LearningProject'
import { Field } from '../components/Field'

export default function EnglishRepairPage() {
  const [params, setParams] = useSearchParams()
  const item = EN_MECHANICS.find((entry) => entry.key === params.get('item'))
  const selected = ENGLISH_REPAIR_UNITS.find((unit) => unit.id === params.get('rule')) ??
    (item ? suggestedRepair(item) : ENGLISH_REPAIR_UNITS.find((unit) => unit.category === params.get('category'))) ??
    ENGLISH_REPAIR_UNITS[0]
  const key = learningSettingKey('english', selected.id)
  return <div className="mx-auto max-w-3xl p-6">
    <PageHeader back={{ to: '/english', label: 'English' }} title="Repair a writing rule"
      subtitle="Understand the rule, practise it, use it in writing, then check it again after a delay." />
    {item && <aside className="card mb-5 p-4" aria-label="Original missed item">
      <h2 className="font-semibold">Your original item</h2>
      <p className="mt-2 text-sm">{item.prompt}</p>
      <p className="mt-2 text-sm">Answer: {item.options[item.correct]}</p>
      <p className="mt-2 text-sm text-gray-400">{item.explain}</p>
      <p className="mt-2 text-sm text-gray-400">The rule below is a suggestion. Choose another if it does not explain your mistake.</p>
    </aside>}
    <Field label="Rule to practise">
      <select className="input" value={selected.id} onChange={(event) => {
        const next = new URLSearchParams(params)
        next.set('rule', event.target.value)
        setParams(next, { replace: true })
      }}>
        {ENGLISH_REPAIR_UNITS.map((unit) => <option key={unit.id} value={unit.id}>{unit.title}</option>)}
      </select>
    </Field>
    <LearningPractice key={selected.id} unit={selected} settingKey={key} />
    <LearningProject key={`${selected.id}-writing`} settingKey={key} task={selected.writingTask} criteria={selected.writingChecklist} />
    <div className="mt-5 flex flex-wrap gap-2">
      <Link className="btn-ghost" to={`/english/mechanics?category=${selected.category}`}>Try a fresh mechanics round</Link>
      <Link className="btn-ghost" to="/english/writing">Apply this in a full writing task</Link>
    </div>
  </div>
}
