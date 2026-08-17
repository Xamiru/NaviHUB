import { useEffect, useRef, useState } from 'react'
import McDrill, { type McQuestion } from './McDrill'
import QuizRecord from '../QuizRecord'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { usePersistedState } from '../../lib/navState'
import { usePlayer } from '../../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import type { ParticleQuizItem } from '@shared/types'

// Particle fill: a bank sentence with one particle blanked, four options
// (never a conflict partner — は/が style ambiguity is excluded, not
// accepted), the English shown, and the sentence's audio when the pack has
// it. Options come pre-shuffled from main; McDrill renders them in order.

export default function ParticleDrill() {
  const [length, setLength] = usePersistedState<number>('jpParticleLength', 10)
  const [items, setItems] = useState<ParticleQuizItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const player = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => () => audioRef.current?.pause(), [])

  async function start(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const pool = await api.japanese.particlePool({ limit: Math.max(length, 20) })
      if (pool.length < 4) {
        setError('Not enough sentences came back — is the sentence bank installed?')
        return
      }
      setItems(pool)
    } finally {
      setLoading(false)
    }
  }

  function play(item: ParticleQuizItem): void {
    if (!item.audioPath) return
    if (player.isPlaying) player.toggle() // one-shot courtesy pause
    audioRef.current?.pause()
    const url = mediaUrl(item.audioPath)
    if (!url) return
    audioRef.current = new Audio(url)
    void audioRef.current.play().catch(() => {})
  }

  function buildQuestion(item: ParticleQuizItem): McQuestion<ParticleQuizItem> {
    return {
      item,
      options: item.options.map((o) => ({ key: o, label: <span className="text-xl">{o}</span>, correct: o === item.answer }))
    }
  }

  if (items) {
    return (
      <McDrill
        kind="particles"
        items={items}
        length={length}
        settings={{ length }}
        buildQuestion={buildQuestion}
        renderPrompt={(mc) => (
          <div className="card p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500">Which particle did the sentence use?</p>
            <p className="mt-3 text-2xl leading-relaxed">{mc.item.blanked}</p>
            <p className="mt-2 text-sm text-gray-500">{mc.item.en}</p>
          </div>
        )}
        renderReveal={(mc, correct) => (
          <>
            <p className={`text-xs font-semibold uppercase tracking-wide ${correct ? 'text-green-400' : 'text-red-400'}`}>
              {correct ? 'Correct' : 'Incorrect'}
            </p>
            <p className="mt-1 text-lg">
              {mc.item.jp}
              {mc.item.audioPath && (
                <button className="btn-ghost ml-2 px-2 py-0.5 text-xs" onClick={() => play(mc.item)}>
                  Play
                </button>
              )}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              The original uses <span className="text-gray-100">{mc.item.answer}</span>. Particles that would also
              be defensible here (は for が, へ for に, も) are never offered as distractors.
            </p>
          </>
        )}
        optionClassName="sm:grid-cols-4"
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-5">
        <Group label="Length">
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
          <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
        </Group>
        <p className="text-xs text-gray-500">
          One particle from は・が・を・に・で・へ・と・から・まで・も・の・より is blanked; the English is shown so
          the meaning fixes the answer. Sentence-final の/か and compound particles are never blanked.
        </p>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
          {loading ? 'Sampling sentences…' : 'Start'}
        </button>
      </div>
      <QuizRecord kind="particles" />
    </div>
  )
}
