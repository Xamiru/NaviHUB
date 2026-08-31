import { useEffect, useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import Tabs from '../components/Tabs'
import { useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { HIRA_COMBOS, HIRA_ROWS, KATA_COMBOS, KATA_ROWS, SECTIONS, type KanaRow } from '@shared/kanaRows'
import { DOJO_FORMS, DOJO_WORDS, type DojoWord } from '@shared/dojoWords'
import { acceptedRomaji, readingMatches, splitReadings } from '@shared/romaji'
import { conjugate, FORM_LABELS, FORMS_FOR, type ConjForm, type WordClass } from '@shared/conjugate'
import QuizRecord from '../components/QuizRecord'
import TypedDrill, { type DrillItem } from '../components/japanese/TypedDrill'
import { shuffle } from '@shared/shuffle'
import NumbersDrillSetup from '../components/japanese/NumbersDrill'
import NamesDrillSetup from '../components/japanese/NamesDrill'
import KeigoDrillSetup from '../components/japanese/KeigoDrill'
import type { JpCard } from '@shared/types'

// Kana & kanji reading drill, modeled on the DJT kana practice tool: pick the
// sets you want, get flashed a character, type the romaji (or kana, for kanji
// readings). Wrong answers re-enter the queue until everything has been
// answered correctly; finished rounds land in quiz_session like the other
// quizzes.

// ---- kana drill (DJT semantics) ----

// The kana tab is a faithful port of the DJT kana tool's loop, which differs
// from the generic Drill above in every way that matters for typing romaji:
//   · the answer is checked on EVERY keystroke, so a correct reading advances
//     without pressing anything;
//   · the moment what you've typed can no longer become a correct answer, the
//     kana and its reading appear in red and STAY there while you backspace and
//     fix it in place — no separate "correct answer" screen to dismiss;
//   · Enter on an empty box means "I don't know" (shows the answer); Enter once
//     the answer is showing skips it and re-queues it 3 and 13 kana later;
//   · it never ends — you stop when you're done, and the round is logged then.
interface KanaItem {
  kana: string
  answers: string[] // accepted romaji; [0] is the one shown on a miss
}

function KanaDrill({
  chars,
  settings,
  onExit
}: {
  chars: string[]
  settings: Record<string, unknown>
  onExit: () => void
}) {
  const qc = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const items = useMemo<KanaItem[]>(
    () => chars.map((kana) => ({ kana, answers: acceptedRomaji(kana) })),
    [chars]
  )

  const [queue, setQueue] = useState<KanaItem[]>(() => shuffle(items))
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false) // this showing has been missed
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [stopped, setStopped] = useState(false)
  const loggedRef = useRef(false)

  const current = queue[0] ?? null

  // Stopping IS the end of the round here (there's no natural finish), so that
  // is where the quiz_session row goes — guarded like the other quiz pages.
  useEffect(() => {
    if (!stopped || loggedRef.current || answered === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({ kind: 'kana', score: correct, total: answered, bestStreak, settings })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('kana') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped])

  // Moves to the next kana. `requeue` re-inserts the one just shown a few and
  // then a dozen places ahead (DJT splices at 3 and 13) so a missed character
  // comes back soon and again later.
  function advance(requeue: boolean): void {
    setQueue((q) => {
      const shown = q[0]
      const out = q.slice(1)
      if (requeue && shown) {
        // Only when there's room ahead — on a short queue the reshuffle below
        // brings it back soon enough, and pushing would show it again instantly.
        if (out.length > 3) out.splice(3, 0, shown)
        if (out.length > 13) out.splice(13, 0, shown)
      }
      if (out.length > 0) return out
      // Endless: deal a fresh shuffle, rotating so the same kana never repeats
      // back-to-back across the seam.
      const next = shuffle(items)
      if (next.length > 1 && shown && next[0].kana === shown.kana) {
        return [...next.slice(1), next[0]]
      }
      return next
    })
    setInput('')
    setWrong(false)
    inputRef.current?.focus()
  }

  function miss(): void {
    if (wrong || !current) return
    setWrong(true)
    setStreak(0)
    setMissed((m) => new Set(m).add(current.kana))
  }

  function onType(value: string): void {
    setInput(value)
    if (!current) return
    const typed = value.toLowerCase().trim()
    if (!typed) return
    if (current.answers.includes(typed)) {
      setAnswered((n) => n + 1)
      // Only a clean first try counts toward the score and the streak.
      if (!wrong) {
        setCorrect((n) => n + 1)
        const s = streak + 1
        setStreak(s)
        setBestStreak((b) => Math.max(b, s))
      }
      advance(false)
      return
    }
    // Still a prefix of some accepted spelling ("s" → "shi")? Keep waiting.
    if (!current.answers.some((a) => a.startsWith(typed))) miss()
  }

  function onEnter(): void {
    if (!current) return
    if (!wrong) {
      // Enter with nothing typed = "show me". A partial-but-valid prefix does
      // nothing, exactly as in the original.
      if (!input.trim()) miss()
      return
    }
    setAnswered((n) => n + 1) // skipped: counted as answered, never as correct
    advance(true)
  }

  if (stopped) {
    const pct = answered ? Math.round((correct / answered) * 100) : 0
    return (
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {correct} / {answered}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {answered === 0
            ? 'Nothing answered.'
            : pct === 100
              ? 'Flawless.'
              : `${pct}% on the first try · best streak ${bestStreak}`}
        </p>
        {missed.size > 0 && (
          <p className="mt-3 text-lg text-gray-300">
            <span className="mr-2 text-xs uppercase tracking-widest text-gray-500">Missed</span>
            {[...missed].join('　')}
          </p>
        )}
        <div className="mt-5 flex justify-center gap-2">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {correct} / {answered}
        </span>
        <span>
          streak {streak}
          <button
            className="btn-ghost ml-3 px-2 py-0.5 text-xs"
            onClick={() => setStopped(true)}
          >
            Stop
          </button>
        </span>
      </div>

      <p className="text-center text-7xl leading-none">{current?.kana}</p>

      <div className="mx-auto mt-6 max-w-xs">
        <input
          aria-label="Kana reading answer"
          ref={inputRef}
          className="input w-full text-center text-lg"
          placeholder="type the reading…"
          value={input}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={(e) => {
            // Space can never be part of a romaji reading, so the original
            // treats it as a second Enter rather than letting it be typed.
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onEnter()
            }
          }}
        />
      </div>

      {/* Held until the kana is answered or skipped, so it's still on screen
          while you correct the typing. */}
      <p className="mt-4 text-center text-sm">
        {wrong && current ? (
          <span className="text-signal-anomaly">
            {current.kana} = {current.answers[0]}
            <span className="ml-2 text-xs text-gray-500">Enter to skip</span>
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </p>
    </div>
  )
}

// ---- page ----

type Tab = 'kana' | 'kanji' | 'conjugation' | 'numbers' | 'names' | 'keigo'
const TAB_KEYS: Tab[] = ['kana', 'kanji', 'conjugation', 'numbers', 'names', 'keigo']

export default function JapaneseKanaPage() {
  // ?tab= seeds the persisted tab so hub cards can deep-link a specific drill.
  const [params] = useSearchParams()
  const seeded = params.get('tab') as Tab | null
  const [tab, setTab] = usePersistedState<Tab>(
    'jpDrillTab',
    seeded && TAB_KEYS.includes(seeded) ? seeded : 'kana'
  )

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Typing Drills"
        subtitle="Pick your sets, get flashed a prompt, type the answer. Misses come back around until you clear them."
      />

      <Tabs
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'kana', label: 'Kana' },
          { key: 'kanji', label: 'Kanji readings' },
          { key: 'conjugation', label: 'Conjugation' },
          { key: 'numbers', label: 'Numbers & counters' },
          { key: 'names', label: 'Names' },
          { key: 'keigo', label: 'Keigo' }
        ]}
      />

      {tab === 'kana' ? (
        <KanaDrillSetup />
      ) : tab === 'kanji' ? (
        <KanjiDrillSetup />
      ) : tab === 'conjugation' ? (
        <DojoSetup />
      ) : tab === 'numbers' ? (
        <NumbersDrillSetup />
      ) : tab === 'names' ? (
        <NamesDrillSetup />
      ) : (
        <KeigoDrillSetup />
      )}
    </div>
  )
}

// Conjugation Dojo: pick target forms, get "word → form", type the conjugated
// result (kana or romaji). Words are curated; the engine is @shared/conjugate.
function DojoSetup() {
  const [forms, setForms] = usePersistedState<ConjForm[]>('jpDojoForms', ['te', 'past', 'negative'])
  const [length, setLength] = usePersistedState<number>('jpDojoLength', 20)
  const [running, setRunning] = useState(false)

  const formSet = new Set(forms)

  function toggleForm(f: ConjForm): void {
    setForms(formSet.has(f) ? forms.filter((x) => x !== f) : [...forms, f])
  }

  if (running && forms.length > 0) {
    // Every (word, applicable form) pair, shuffled, capped at the round length.
    const pairs = DOJO_WORDS.flatMap((w) =>
      forms.filter((f) => FORMS_FOR[w.cls].includes(f)).map((f) => ({ w, f }))
    )
    const picked = shuffle(pairs).slice(0, length || pairs.length)
    const items: DrillItem[] = picked.map(({ w, f }) => {
      const answer = conjugate(w.kana, w.cls, f)!
      return {
        prompt: w.kanji === w.kana ? w.kana : `${w.kanji}（${w.kana}）`,
        instruction: `${w.gloss} → ${FORM_LABELS[f]}`,
        sub: null,
        accept: (input) => readingMatches(input, [answer]),
        reveal: answer
      }
    })
    return (
      <TypedDrill
        items={items}
        kind="conjugation"
        settings={{ forms, length }}
        onExit={() => setRunning(false)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        Reading teaches you to RECOGNIZE forms — this trains you to PRODUCE them, which makes
        recognition instant. Type kana or romaji.
      </p>
      <Section
        title="Forms"
        className="mb-5"
        subtitle={
          <button
            className="text-xs text-gray-500 hover:text-gray-300"
            onClick={() => setForms(formSet.size === DOJO_FORMS.length ? [] : [...DOJO_FORMS])}
          >
            {formSet.size === DOJO_FORMS.length ? 'none' : 'all'}
          </button>
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {DOJO_FORMS.map((f) => (
            <button
              key={f}
              aria-pressed={formSet.has(f)}
              onClick={() => toggleForm(f)}
              className={formSet.has(f) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
            >
              {FORM_LABELS[f]}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Round length" className="mb-5">
        <div className="flex gap-1.5">
          {[10, 20, 40].map((n) => (
            <button
              key={n}
              aria-pressed={length === n}
              onClick={() => setLength(n)}
              className={length === n ? 'pill pill-active' : 'pill'}
            >
              {n}
            </button>
          ))}
        </div>
      </Section>

      <button className="btn-primary" disabled={forms.length === 0} onClick={() => setRunning(true)}>
        Start dojo
      </button>
      <p className="mt-2 text-xs text-gray-500">
        Includes the classic traps: 帰る・入る・走る are godan despite the る, 着る is ichidan,
        いい conjugates as よい.
      </p>

      <QuizRecord kind="conjugation" />
    </div>
  )
}

function KanaDrillSetup() {
  const [selected, setSelected] = usePersistedState<string[]>('jpKanaRows', ['a', 'ka'])
  const [running, setRunning] = useState(false)

  const selectedSet = new Set(selected)
  const chars = SECTIONS.flatMap((s) => s.rows)
    .filter((r) => selectedSet.has(r.key))
    .flatMap((r) => r.kana)

  function toggle(key: string): void {
    setSelected(
      selectedSet.has(key) ? selected.filter((k) => k !== key) : [...selected, key]
    )
  }

  function setSection(rows: KanaRow[], on: boolean): void {
    const keys = new Set(rows.map((r) => r.key))
    const rest = selected.filter((k) => !keys.has(k))
    setSelected(on ? [...rest, ...rows.map((r) => r.key)] : rest)
  }

  if (running) {
    return (
      <KanaDrill chars={chars} settings={{ rows: selected }} onExit={() => setRunning(false)} />
    )
  }

  return (
    <div>
      {SECTIONS.map((section) => {
        const allOn = section.rows.every((r) => selectedSet.has(r.key))
        return (
          <Section
            key={section.title}
            title={section.title}
            className="mb-5"
            subtitle={
              <button
                className="text-xs text-gray-500 hover:text-gray-300"
                onClick={() => setSection(section.rows, !allOn)}
              >
                {allOn ? 'none' : 'all'}
              </button>
            }
          >
            <div className="flex flex-wrap gap-1.5">
              {section.rows.map((row) => (
                <button
                  key={row.key}
                  aria-pressed={selectedSet.has(row.key)}
                  onClick={() => toggle(row.key)}
                  className={
                    selectedSet.has(row.key) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'
                  }
                >
                  {row.label}
                </button>
              ))}
            </div>
          </Section>
        )
      })}

      <button
        className="btn-primary"
        disabled={chars.length === 0}
        onClick={() => setRunning(true)}
      >
        Start drill ({chars.length} characters)
      </button>
      <p className="mt-2 text-xs text-gray-500">
        Grind one row until it&apos;s automatic, then add the next — same advice as the DJT tool.
      </p>

      <QuizRecord kind="kana" />
    </div>
  )
}

function KanjiDrillSetup() {
  const { data: courses = [] } = useQuery({
    queryKey: qk.japanese.courses,
    queryFn: () => api.japanese.listCourses()
  })
  const [courseId, setCourseId] = usePersistedState<number | null>('jpKanjiDrillCourse', null)
  const [cards, setCards] = useState<JpCard[] | null>(null)
  const [loading, setLoading] = useState(false)

  // Only courses that actually contain kanji-kind lessons are offered.
  const kanjiCourses = courses.filter(
    (c) => c.title.includes('Kanji') || c.title.includes('Radicals')
  )
  const effectiveCourseId = courseId ?? kanjiCourses[0]?.id ?? null
  const course = courses.find((c) => c.id === effectiveCourseId)

  async function start(): Promise<void> {
    if (effectiveCourseId == null) return
    setLoading(true)
    try {
      const detail = await api.japanese.getCourse(effectiveCourseId)
      if (!detail) return
      const kanjiLessons = detail.lessons.filter((l) => l.kind === 'kanji')
      const all: JpCard[] = []
      for (const lesson of kanjiLessons) {
        const full = await api.japanese.getLesson(lesson.id)
        if (full) all.push(...full.cards)
      }
      setCards(all)
    } finally {
      setLoading(false)
    }
  }

  if (cards && cards.length > 0) {
    const items: DrillItem[] = cards.map((c) => {
      const readings = [c.reading, c.onyomi, c.kunyomi].filter((r): r is string => !!r)
      return {
        prompt: c.front,
        sub: c.back,
        accept: (input) => readingMatches(input, readings),
        reveal: readings.flatMap((r) => splitReadings(r)).join('、')
      }
    })
    return (
      <TypedDrill
        items={items}
        kind="kanji"
        settings={{ course: course?.title ?? null }}
        onExit={() => setCards(null)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        Type ANY correct reading — on&apos;yomi, kun&apos;yomi, or a radical&apos;s name. Romaji
        and kana both work.
      </p>
      <div className="mb-4 flex items-center gap-2">
        <select
          aria-label="Kanji reading course"
          className="input max-w-sm"
          value={effectiveCourseId ?? ''}
          onChange={(e) => setCourseId(Number(e.target.value))}
        >
          {kanjiCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.cardCount} cards)
            </option>
          ))}
        </select>
        <button
          className="btn-primary shrink-0"
          disabled={loading || effectiveCourseId == null}
          onClick={() => void start()}
        >
          {loading ? 'Loading…' : 'Start drill'}
        </button>
      </div>
      {kanjiCourses.length === 0 && (
        <p className="text-sm text-gray-500">No kanji courses found.</p>
      )}
      {cards !== null && cards.length === 0 && (
        <p className="text-sm text-gray-500">That course has no kanji cards.</p>
      )}

      <QuizRecord kind="kanji" />
    </div>
  )
}
