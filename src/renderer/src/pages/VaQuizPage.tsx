import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useAllWatchedStatuses } from '../lib/hooks'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import LibMcRound, { type McQuestion } from '../components/libraryQuiz/LibMcRound'
import { Group, Pill } from '../components/PillGroup'
import type { QuizVaItem } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import { characterIdsForPerson } from '@shared/quizDistractors'

type Direction = 'both' | 'toVa' | 'toChar'

// Distractors for a VA question: same-show candidates first (cast-mates and
// their casts are the plausible wrong answer), never repeating an option
// identity. `forbidden` bans identities outright — the seed's own key, and
// for "which character do they voice?" every character the seed's VA plays,
// or a second right answer could sit among the options.
function vaDistractors(
  pool: QuizVaItem[],
  seed: QuizVaItem,
  idOf: (v: QuizVaItem) => number,
  forbidden: number[]
): QuizVaItem[] {
  const banned = new Set(forbidden)
  const ok = (v: QuizVaItem) => !banned.has(idOf(v))
  const sameShow = shuffle(pool.filter((p) => ok(p) && p.mediaId === seed.mediaId))
  const rest = shuffle(pool.filter((p) => ok(p) && p.mediaId !== seed.mediaId))
  const seen = new Set<number>()
  const out: QuizVaItem[] = []
  for (const c of [...sameShow, ...rest]) {
    if (seen.has(idOf(c))) continue
    seen.add(idOf(c))
    out.push(c)
    if (out.length === 3) break
  }
  return out
}

// Voice-actor quiz over the credit graph, both directions:
//   toVa   — "who voices this character?" (portrait + name shown)
//   toChar — "which character does this VA voice?" (person shown)
export default function VaQuizPage() {
  const watchedStatuses = useAllWatchedStatuses()

  const [direction, setDirection] = usePersistedState<Direction>('quizVaDir', 'both')
  const [listSource, setListSource] = usePersistedState<'watched' | 'all'>('quizVaList', 'watched')
  const [length, setLength] = usePersistedState<number>('quizVaLength', 10)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizVaTimer', true)

  const [round, setRound] = useState(0)
  const [questions, setQuestions] = useState<McQuestion[] | null>(null)
  const [settingsSnapshot, setSettingsSnapshot] = useState<Record<string, unknown>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.quiz.vaPool({
        statuses: listSource === 'all' ? null : watchedStatuses
      })
      if (pool.length < 4) {
        setError(
          `Need voice credits for at least 4 different characters with portraits — found ${pool.length}. Import cast for your anime first (re-importing refreshes credits), or widen the filters.`
        )
        return
      }
      const seeds = shuffle(pool).slice(0, length)
      const qs: McQuestion[] = []
      for (const seed of seeds) {
        // Mixed mode flips a coin per question; a direction is skipped when
        // the pool cannot supply four distinct identities for it.
        const dir =
          direction === 'both'
            ? Math.random() < 0.5
              ? 'toVa'
              : 'toChar'
            : direction
        if (dir === 'toVa') {
          const distractors = vaDistractors(pool, seed, (v) => v.personId, [seed.personId])
          if (distractors.length < 3) continue
          qs.push({
            key: `tova-${seed.characterId}`,
            correctKey: seed.personId,
            prompt: (
              <div className="text-center">
                <CoverImage
                  path={seed.characterImagePath}
                  alt={seed.characterName}
                  rounded="rounded-xl"
                  className="mx-auto h-72 w-auto"
                />
                <p className="mt-4 text-2xl font-semibold">{seed.characterName}</p>
                <p className="text-base text-gray-500">{seed.mediaTitle}</p>
                <p className="mt-2 text-gray-400">Who voices this character?</p>
              </div>
            ),
            options: shuffle([seed, ...distractors]).map((o) => ({
              key: o.personId,
              node: (
                <>
                  <CoverImage path={o.photoPath} alt={o.personName} rounded="rounded-full" className="h-14 w-14 shrink-0" />
                  <span className="line-clamp-2 text-base font-medium">{o.personName}</span>
                </>
              )
            }))
          })
        } else {
          const distractors = vaDistractors(
            pool,
            seed,
            (v) => v.characterId,
            characterIdsForPerson(pool, seed.personId)
          )
          if (distractors.length < 3) continue
          qs.push({
            key: `tochar-${seed.characterId}`,
            correctKey: seed.characterId,
            prompt: (
              <div className="text-center">
                <div className="flex items-center justify-center gap-4">
                  <CoverImage
                    path={seed.photoPath}
                    alt={seed.personName}
                    rounded="rounded-full"
                    className="h-20 w-20 shrink-0"
                  />
                  <p className="text-3xl font-bold">{seed.personName}</p>
                </div>
                <p className="mt-3 text-gray-400">Which character do they voice?</p>
              </div>
            ),
            options: shuffle([seed, ...distractors]).map((o) => ({
              key: o.characterId,
              node: (
                <>
                  <CoverImage path={o.characterImagePath} alt={o.characterName} className="h-24 w-16 shrink-0" />
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-base font-medium">{o.characterName}</span>
                    <span className="block truncate text-sm text-gray-500">{o.mediaTitle}</span>
                  </span>
                </>
              )
            }))
          })
        }
      }
      if (qs.length === 0) {
        setError(
          'The pool is too thin for this direction — try "Both" or the other direction.'
        )
        return
      }
      setSettingsSnapshot({ direction, listSource, length, timerEnabled })
      setQuestions(qs)
      setRound((r) => r + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load voice credits.')
    } finally {
      setLoading(false)
    }
  }

  function playAgain() {
    void startGame()
  }

  if (questions && round > 0) {
    return (
      <LibMcRound
        key={round}
        kind="va"
        questions={questions}
        settings={settingsSnapshot}
        timed={timerEnabled}
        onPlayAgain={playAgain}
        backTo={{ to: '/quiz', label: 'quizzes' }}
      />
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/quiz', label: 'Quiz' }}
        title="Voice Actor Quiz"
        subtitle="Match characters and their Japanese voice actors — straight from your credit graph."
        className="mb-6"
      />

      <div className="card p-6 space-y-6">
        <Group label="Direction">
          <Pill active={direction === 'both'} onClick={() => setDirection('both')} label="Both" />
          <Pill active={direction === 'toVa'} onClick={() => setDirection('toVa')} label="Who voices them" />
          <Pill active={direction === 'toChar'} onClick={() => setDirection('toChar')} label="Their roles" />
        </Group>

        <Group label="From">
          <Pill active={listSource === 'watched'} onClick={() => setListSource('watched')} label="Watched" />
          <Pill active={listSource === 'all'} onClick={() => setListSource('all')} label="All" />
        </Group>

        <Group label="Length">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
        </Group>

        <div className="space-y-2 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-base text-gray-300">
            <input
              type="checkbox"
              checked={timerEnabled}
              onChange={(e) => setTimerEnabled(e.target.checked)}
            />
            Countdown timer (20s per question)
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button className="btn-primary w-full py-3 text-base" disabled={loading} onClick={startGame}>
          {loading ? 'Loading credits…' : 'Start quiz'}
        </button>
      </div>

      <QuizRecord kind="va" />
    </div>
  )
}
