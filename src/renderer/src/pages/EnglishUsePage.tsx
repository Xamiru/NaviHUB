import { useState, type ReactNode } from 'react'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import TypedDrill, { type DrillItem } from '../components/japanese/TypedDrill'
import { usePersistedState } from '../lib/navState'
import { EN_CLOZE } from '@shared/english/cloze'
import { EN_WORD_FORMATION } from '@shared/english/wordFormation'
import { EN_TRANSFORMATIONS } from '@shared/english/transformations'
import type { EnUseFormat } from '@shared/english/types'
import { matchesAnswer } from '@shared/english/answers'
import { shuffle } from '@shared/shuffle'
import type { QuizKind } from '@shared/types'

// Use of English (Cambridge C1 style), typed: open cloze (one function word),
// word formation (a derived form of the STEM), key-word transformations (3-6
// words containing the KEYWORD). Content is code (src/shared/english/); the
// loop is the shared TypedDrill (Enter to submit, misses re-enqueued, one
// quiz_session per round) with `node` prompts and the answers.ts matcher.

const KIND: Record<EnUseFormat, QuizKind> = {
  cloze: 'englishCloze',
  wordform: 'englishWordForm',
  transform: 'englishTransform'
}

const LABEL: Record<EnUseFormat, string> = {
  cloze: 'Open cloze',
  wordform: 'Word formation',
  transform: 'Transformations'
}

// Renders "text with ___" as a sentence with an underlined slot.
function Gapped({ text, className = '' }: { text: string; className?: string }): ReactNode {
  const [before, after] = text.split('___')
  return (
    <p className={`text-center text-xl leading-relaxed ${className}`}>
      {before}
      <span className="mx-1 inline-block min-w-[4ch] border-b-2 border-accent align-baseline">&nbsp;</span>
      {after ?? ''}
    </p>
  )
}

function buildItems(format: EnUseFormat, length: number): DrillItem[] {
  let items: DrillItem[]
  if (format === 'cloze') {
    items = EN_CLOZE.map((c) => ({
      prompt: c.key,
      label: c.answers[0],
      node: (
        <div>
          {c.context && <p className="mb-2 text-center text-sm text-gray-500">{c.context}</p>}
          <Gapped text={c.text} />
        </div>
      ),
      instruction: 'One word',
      sub: c.explain,
      accept: (i) => matchesAnswer(i, c.answers),
      reveal: c.answers.join(' / ')
    }))
  } else if (format === 'wordform') {
    items = EN_WORD_FORMATION.map((w) => ({
      prompt: w.key,
      label: `${w.stem} → ${w.answers[0]}`,
      node: (
        <div>
          <Gapped text={w.text} />
          <p className="mt-2 text-center">
            <span className="chip font-mono text-sm tracking-widest">{w.stem}</span>
          </p>
        </div>
      ),
      instruction: `Form a ${w.target} from the stem`,
      sub: w.explain,
      accept: (i) => matchesAnswer(i, w.answers),
      reveal: w.answers.join(' / ')
    }))
  } else {
    items = EN_TRANSFORMATIONS.map((t) => ({
      prompt: t.key,
      label: t.answers[0],
      node: (
        <div>
          <p className="text-center text-base text-gray-300">{t.original}</p>
          <p className="my-2 text-center">
            <span className="chip font-mono text-sm tracking-widest">{t.keyword}</span>
          </p>
          <Gapped text={t.gapped} />
        </div>
      ),
      instruction: 'Three to six words, keyword unchanged',
      sub: t.explain,
      accept: (i) => matchesAnswer(i, t.answers),
      reveal: t.answers.join(' / ')
    }))
  }
  const deck = shuffle(items)
  return length > 0 ? deck.slice(0, length) : deck
}

export default function EnglishUsePage() {
  const [format, setFormat] = usePersistedState<EnUseFormat>('enUseFormat', 'cloze')
  const [length, setLength] = usePersistedState<number>('enUseLength', 10)
  const [items, setItems] = useState<DrillItem[] | null>(null)

  const total = { cloze: EN_CLOZE.length, wordform: EN_WORD_FORMATION.length, transform: EN_TRANSFORMATIONS.length }[format]

  if (items) {
    return (
      <div className="p-6 max-w-[1320px] mx-auto">
        <TypedDrill
          title={LABEL[format]}
          items={items}
          kind={KIND[format]}
          settings={{ format, length }}
          placeholder="type your answer…"
          wide
          onExit={() => setItems(null)}
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/english', label: 'English' }}
        title="Use of English"
        subtitle="Cambridge-style typed tasks: the missing function word, the derived form, the rewrite with a keyword. Spelling and spacing are forgiven; the word is not."
      />

      <div className="card p-5 space-y-5">
        <Group label="Format">
          {(['cloze', 'wordform', 'transform'] as const).map((f) => (
            <Pill key={f} active={format === f} onClick={() => setFormat(f)} label={LABEL[f]} />
          ))}
        </Group>
        <Group label="Length">
          <Pill active={length === 10} onClick={() => setLength(10)} label="10 items" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20 items" />
          <Pill active={length === 0} onClick={() => setLength(0)} label={`Everything (${total})`} />
        </Group>
        <p className="text-xs text-gray-500">
          {format === 'cloze' && 'One function word per gap — prepositions, articles, linkers, relatives, auxiliaries.'}
          {format === 'wordform' && 'Turn the capitalised stem into the form the sentence needs — often with a prefix or suffix.'}
          {format === 'transform' && 'Rewrite the sentence so it means the same, using the keyword unchanged, in three to six words.'}
        </p>
        <button className="btn-primary w-full" disabled={total === 0} onClick={() => setItems(buildItems(format, length))}>
          Start ({length > 0 ? Math.min(length, total) : total} items)
        </button>
      </div>

      <QuizRecord kind={KIND[format]} />
    </div>
  )
}
