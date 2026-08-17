import { useState } from 'react'
import Section from '../Section'
import QuizRecord from '../QuizRecord'
import TypedDrill, { type DrillItem } from './TypedDrill'
import { usePersistedState } from '../../lib/navState'
import { readingMatches } from '@shared/romaji'
import {
  KEIGO_IRREGULAR,
  KEIGO_REGULAR_VERBS,
  REGISTER_LABELS,
  keigoAnswersIrregular,
  keigoAnswersRegular,
  type KeigoRegister
} from '@shared/keigo'
import { shuffle } from '@shared/shuffle'

// Keigo transform tab (kind 'keigo'): plain verb + target register → type the
// keigo form. The suppletive table (行く→いらっしゃる/参る) is the hard part;
// the regular お〜になる/お〜する patterns train the productive rule. Typed in
// kanji, kana or romaji — all accepted forms count. Content-as-code, zero
// pack gating.

type RegisterChoice = KeigoRegister | 'mixed'
type Content = 'irregular' | 'regular' | 'both'

const REGISTER_SHORT: Record<KeigoRegister, string> = {
  honorific: '尊敬語 (honorific)',
  humble: '謙譲語 (humble)',
  polite: '丁寧語 (polite)'
}

export default function KeigoDrillSetup() {
  const [register, setRegister] = usePersistedState<RegisterChoice>('jpKeigoRegister', 'mixed')
  const [content, setContent] = usePersistedState<Content>('jpKeigoContent', 'both')
  const [length, setLength] = usePersistedState<number>('jpKeigoLength', 20)
  const [items, setItems] = useState<DrillItem[] | null>(null)

  function start(): void {
    const registers: KeigoRegister[] =
      register === 'mixed' ? ['honorific', 'humble', 'polite'] : [register]
    const out: DrillItem[] = []

    if (content !== 'regular') {
      for (const entry of KEIGO_IRREGULAR) {
        for (const reg of registers) {
          const answers = keigoAnswersIrregular(entry, reg)
          if (!answers) continue
          out.push({
            prompt: entry.plain,
            instruction: `${entry.gloss} → ${REGISTER_SHORT[reg]}`,
            sub: answers.accepted.join('、'),
            accept: (input) =>
              answers.accepted.includes(input.trim()) || readingMatches(input, answers.kanaForms),
            reveal: answers.display
          })
        }
      }
    }
    if (content !== 'irregular') {
      for (const verb of KEIGO_REGULAR_VERBS) {
        for (const reg of registers) {
          const answers = keigoAnswersRegular(verb, reg)
          if (!answers) continue
          out.push({
            prompt: verb.kanji,
            instruction: `${verb.gloss} → ${REGISTER_SHORT[reg]}`,
            sub: answers.accepted.join('、'),
            accept: (input) =>
              answers.accepted.includes(input.trim()) || readingMatches(input, answers.kanaForms),
            reveal: answers.display
          })
        }
      }
    }
    // TypedDrill shuffles internally; cap the round here.
    setItems(shuffle(out).slice(0, length || out.length))
  }

  if (items && items.length > 0) {
    return (
      <TypedDrill
        items={items}
        kind="keigo"
        settings={{ register, content, length }}
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        Textbooks teach the keigo forms; choosing them in the moment is what needs reps. The
        suppletive verbs（行く→いらっしゃる・参る）are memorized; regular verbs train the
        お〜になる／お〜する patterns.
      </p>
      <Section title="Register" className="mb-5">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ['honorific', REGISTER_LABELS.honorific],
              ['humble', REGISTER_LABELS.humble],
              ['polite', REGISTER_LABELS.polite],
              ['mixed', 'Mixed']
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRegister(key)}
              className={register === key ? 'pill pill-active' : 'pill'}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Verbs" className="mb-5">
        <div className="flex gap-1.5">
          {(
            [
              ['irregular', 'Irregulars'],
              ['regular', 'Regular pattern'],
              ['both', 'Both']
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setContent(key)}
              className={content === key ? 'pill pill-active' : 'pill'}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Round length" className="mb-5">
        <div className="flex gap-1.5">
          {[10, 20, 40].map((n) => (
            <button
              key={n}
              onClick={() => setLength(n)}
              className={length === n ? 'pill pill-active' : 'pill'}
            >
              {n}
            </button>
          ))}
        </div>
      </Section>
      <button className="btn-primary" onClick={start}>
        Start drill
      </button>

      <QuizRecord kind="keigo" />
    </div>
  )
}
