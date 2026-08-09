import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import Markdown from '../components/Markdown'
import { EN_PASSAGES } from '@shared/english/passages'
import { EN_WRITING_PROMPTS } from '@shared/english/writingPrompts'
import { Group, Pill } from '../components/PillGroup'
import type { EnWritingTaskKind } from '@shared/english/types'
import type { EnWritingEntry } from '@shared/types'

// Writing practice: pick a task, write, submit for LLM grading (the coach
// provider settings — one plain-await call, the button disables for the
// ~10-20s). Feedback = rubric scores + line corrections + a model rewrite;
// every submission lands in en_writing so progress is visible over time.

const KIND_LABEL: Record<EnWritingTaskKind, string> = {
  opinion: 'Opinion essay',
  summary: 'Summary',
  'formal-rewrite': 'Formal rewrite',
  email: 'Email',
  report: 'Report'
}

const wordCount = (text: string): number => text.split(/\s+/).filter(Boolean).length

function ScoreTiles({ entry }: { entry: EnWritingEntry }) {
  const s = entry.feedback.scores
  const tiles: [string, number | null][] = [
    ['Grammar', s.grammar],
    ['Vocabulary', s.vocabulary],
    ['Coherence', s.coherence],
    ['Register', s.register]
  ]
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {tiles.map(([label, v]) => (
        <div key={label} className="card p-3 text-center">
          <p className="text-2xl font-bold tabular-nums">
            {v ?? '—'}
            <span className="text-sm font-normal text-gray-500">/10</span>
          </p>
          <p className="mt-0.5 text-xs uppercase tracking-widest text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  )
}

function FeedbackView({ entry }: { entry: EnWritingEntry }) {
  const fb = entry.feedback
  return (
    <div className="space-y-4">
      <ScoreTiles entry={entry} />
      {fb.overall && (
        <div className="card p-4">
          <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">Verdict</p>
          <Markdown text={fb.overall} />
        </div>
      )}
      {fb.corrections.length > 0 && (
        <div className="card p-4">
          <p className="mb-3 text-xs uppercase tracking-widest text-gray-500">
            Corrections ({fb.corrections.length})
          </p>
          {/* Custom rows, not Markdown — its parser has no tables. */}
          <div className="space-y-3">
            {fb.corrections.map((c, i) => (
              <div key={i} className="border-l-2 border-base-700 pl-3 text-sm">
                <p className="text-red-300/90 line-through decoration-red-500/40">{c.before}</p>
                <p className="mt-0.5 text-green-300">{c.after}</p>
                {c.why && <p className="mt-0.5 text-xs text-gray-500">{c.why}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {fb.modelRewrite && (
        <div className="card p-4">
          <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
            How a C2 writer would put it
          </p>
          <Markdown text={fb.modelRewrite} />
        </div>
      )}
    </div>
  )
}

function HistoryRow({ entry, onRemove }: { entry: EnWritingEntry; onRemove: () => void }) {
  const [open, setOpen] = useState(false)
  const day = entry.createdAt.slice(0, 10)
  return (
    <div className="card p-0">
      <button
        className="flex w-full items-center justify-between gap-3 p-3 text-left text-sm"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="min-w-0">
          <span className="block truncate font-medium">{entry.promptTitle}</span>
          <span className="text-xs text-gray-500">
            {day} · {wordCount(entry.submission)} words
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {entry.score !== null && (
            <span className="chip bg-base-700 tabular-nums">{entry.score.toFixed(1)}/10</span>
          )}
          <span className="text-gray-500">{open ? '▾' : '▸'}</span>
        </span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-base-700 p-3">
          <div className="card bg-base-800/60 p-3">
            <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">You wrote</p>
            <p className="whitespace-pre-wrap text-sm text-gray-300">{entry.submission}</p>
          </div>
          <FeedbackView entry={entry} />
          <div className="flex justify-end">
            <button className="btn-ghost text-xs text-red-300" onClick={onRemove}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EnglishWritingPage() {
  const qc = useQueryClient()
  const [kind, setKind] = usePersistedState<EnWritingTaskKind>('enWritingKind', 'opinion')
  const [promptKey, setPromptKey] = usePersistedState<string | null>('enWritingPrompt', null)
  const [draft, setDraft] = usePersistedState<string>('enWritingDraft', '')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<EnWritingEntry | null>(null)

  const { data: writings } = useQuery({
    queryKey: qk.english.writings,
    queryFn: () => api.english.listWritings()
  })

  const prompts = EN_WRITING_PROMPTS.filter((p) => p.kind === kind)
  const selected = prompts.find((p) => p.key === promptKey) ?? prompts[0] ?? null
  const passage = selected?.passageKey
    ? (EN_PASSAGES.find((p) => p.key === selected.passageKey) ?? null)
    : null
  const words = wordCount(draft)

  async function submit(): Promise<void> {
    if (!selected || busy || !draft.trim()) return
    setBusy(true)
    try {
      const entry = await api.english.writingFeedback({ promptKey: selected.key, text: draft })
      setResult(entry)
      setDraft('')
      await qc.invalidateQueries({ queryKey: qk.english.writings })
    } finally {
      setBusy(false)
    }
  }

  async function remove(id: number): Promise<void> {
    await api.english.removeWriting(id)
    if (result?.id === id) setResult(null)
    await qc.invalidateQueries({ queryKey: qk.english.writings })
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/english', label: 'English' }}
        title="Writing"
        subtitle="Write against a task, get graded with corrections and a model rewrite."
      />

      <div className="card space-y-5 p-5">
        <Group label="Task type">
          {(Object.keys(KIND_LABEL) as EnWritingTaskKind[]).map((k) => (
            <Pill
              key={k}
              active={kind === k}
              onClick={() => {
                setKind(k)
                setPromptKey(null)
              }}
              label={KIND_LABEL[k]}
            />
          ))}
        </Group>

        <Group label="Task">
          {prompts.map((p) => (
            <Pill
              key={p.key}
              active={selected?.key === p.key}
              onClick={() => setPromptKey(p.key)}
              label={p.title}
            />
          ))}
        </Group>

        {selected && (
          <div className="border-l-2 border-accent/50 pl-3 text-sm text-gray-300">
            <p className="whitespace-pre-wrap">{selected.instructions}</p>
            {selected.minWords && (
              <p className="mt-1 text-xs text-gray-500">
                {selected.minWords}-{selected.maxWords} words
              </p>
            )}
          </div>
        )}

        {passage && (
          <div className="card max-h-[35vh] overflow-y-auto bg-base-800/60 p-4">
            <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
              {passage.title}
            </p>
            <Markdown text={passage.text} />
          </div>
        )}

        <div>
          <textarea
            className="input min-h-[220px] w-full resize-y leading-relaxed"
            placeholder="Write here…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={busy}
          />
          <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
            <span className="tabular-nums">
              {words} {words === 1 ? 'word' : 'words'}
              {selected?.minWords && words > 0 && words < selected.minWords && (
                <span className="ml-2 text-amber-400/80">aim for {selected.minWords}+</span>
              )}
            </span>
            {busy && <span>Getting feedback… this takes a moment</span>}
          </div>
        </div>

        <button
          className="btn-primary w-full"
          disabled={busy || !selected || !draft.trim()}
          onClick={() => void submit()}
        >
          {busy ? 'Grading…' : 'Submit for feedback'}
        </button>
      </div>

      {result && (
        <Section title="Feedback" className="mt-6">
          <FeedbackView entry={result} />
        </Section>
      )}

      {(writings?.length ?? 0) > 0 && (
        <Section
          title="History"
          subtitle="Every graded submission — watch the rubric climb."
          className="mt-6"
        >
          <div className="space-y-2">
            {writings?.map((w) => (
              <HistoryRow key={w.id} entry={w} onRemove={() => void remove(w.id)} />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
