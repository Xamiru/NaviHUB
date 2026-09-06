import { useRef, useState } from 'react'
import { useLearningEvidence } from '../lib/useLearningEvidence'
import { Field, Fieldset } from './Field'

export default function LearningProject({ settingKey, task, criteria }: {
  settingKey: string
  task: string
  criteria: string[]
}) {
  const { record, save, isPending, isError } = useLearningEvidence(settingKey)
  const [checked, setChecked] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const lock = useRef(false)
  async function recordProject() {
    if (lock.current || checked.length !== criteria.length || note.trim().length < 40) return
    lock.current = true
    setBusy(true)
    try {
      await save((old) => ({ ...old, project: {
        at: new Date().toISOString(), note: note.trim(), criteria: checked
      } }))
      setChecked([])
      setNote('')
    } finally {
      lock.current = false
      setBusy(false)
    }
  }
  return <section className="card mt-6 p-5" aria-label="Apply and self-review">
    <h2 className="text-lg font-semibold">Apply and self-review</h2>
    <p className="mt-3 text-sm whitespace-pre-wrap">{task}</p>
    <p className="mt-2 text-sm text-gray-400">Complete the task yourself, then check the evidence. This is your self-assessment; NaviHUB does not execute or grade this project.</p>
    <Fieldset legend="Evidence checklist" className="mt-4 space-y-2">
      {criteria.map((criterion) => <Field key={criterion} label={criterion} className="flex items-center gap-3 text-sm">
        <input type="checkbox" disabled={busy} checked={checked.includes(criterion)} onChange={(e) => setChecked((old) => e.target.checked ? [...old, criterion] : old.filter((c) => c !== criterion))} />
      </Field>)}
    </Fieldset>
    <Field label="Your work and evidence" className="mt-4" description="Record the result, how you checked it, and what you corrected (at least 40 characters). Local notes only; no upload.">
      <textarea className="input min-h-28 w-full" maxLength={4000} disabled={busy} value={note} onChange={(e) => setNote(e.target.value)} />
    </Field>
    <button className="btn-ghost mt-3" disabled={isPending || isError || busy || checked.length !== criteria.length || note.trim().length < 40} onClick={() => void recordProject()}>Save self-assessed evidence</button>
    {record.project && <div role="status" className="mt-4 text-sm text-gray-400">
      <p>Self-assessed work saved {new Date(record.project.at).toLocaleString()}.</p>
      <p className="mt-2 whitespace-pre-wrap">{record.project.note}</p>
    </div>}
  </section>
}
