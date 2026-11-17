import { useEffect, useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import Tabs, { TabPanel } from '../components/Tabs'
import { Link, useSearchParams } from 'react-router-dom'
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
import SessionLauncher from '../components/japanese/SessionLauncher'
import SessionSummary from '../components/japanese/SessionSummary'
import { shuffle } from '@shared/shuffle'
import NumbersDrillSetup from '../components/japanese/NumbersDrill'
import NamesDrillSetup from '../components/japanese/NamesDrill'
import KeigoDrillSetup from '../components/japanese/KeigoDrill'
import type { JpCard } from '@shared/types'
import { KANA_SCRIPT_GROUPS, KANA_UNITS, kanaUnitByKey, type KanaUnit } from '@shared/japanese/kanaLessons'
import StrokeOrderDiagram from '../components/japanese/StrokeOrderDiagram'

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
  roundLength,
  onExit,
  onRestart
}: {
  chars: string[]
  settings: Record<string, unknown>
  /** 0 = endless until Stop. */
  roundLength: number
  onExit: () => void
  onRestart: (chars: string[]) => void
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

  // A fixed round ends by itself, so a beginner never has to find Stop.
  useEffect(() => {
    if (roundLength > 0 && answered >= roundLength) setStopped(true)
  }, [answered, roundLength])

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
    const missedKana = [...missed]
    return (
      <SessionSummary
        title={answered === 0 ? 'Drill stopped' : 'Kana round complete'}
        score={answered > 0 ? { correct, total: answered } : null}
        facts={answered > 0 ? [{ label: 'Best streak', value: bestStreak }] : []}
        note={answered > 0 && correct === answered ? 'Flawless.' : undefined}
        missed={missedKana.map((kana) => ({ key: kana, jp: kana, meaning: acceptedRomaji(kana)[0] }))}
        onRetryMissed={missedKana.length > 0 ? () => onRestart(missedKana) : undefined}
        actions={
          <>
            <button type="button" className="btn-ghost" onClick={() => onRestart(chars)}>
              Another round
            </button>
            <button type="button" className="btn-ghost" onClick={onExit}>
              Change rows
            </button>
          </>
        }
      />
    )
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {correct} / {answered}
          {roundLength > 0 && <span className="ml-2 text-gray-400">· {Math.max(0, roundLength - answered)} left</span>}
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

      <p lang="ja" className="text-center text-8xl leading-none text-white">{current?.kana}</p>

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

type Tab = 'learn' | 'kana' | 'kanji' | 'conjugation' | 'numbers' | 'names' | 'keigo'
const TAB_KEYS: Tab[] = ['learn', 'kana', 'kanji', 'conjugation', 'numbers', 'names', 'keigo']

export default function JapaneseKanaPage() {
  // ?tab= seeds the persisted tab so hub cards can deep-link a specific drill.
  const [params] = useSearchParams()
  const seeded = params.get('tab') as Tab | null
  const [tab, setTab] = usePersistedState<Tab>(
    'jpDrillTab',
    seeded && TAB_KEYS.includes(seeded) ? seeded : 'kana'
  )
  // A lesson's "Drill this row" hands its rows to the kana drill, which starts
  // a round on them once and then clears the request.
  const [drillRows, setDrillRows] = useState<string[] | null>(null)

  function drill(rows: string[]): void {
    setDrillRows(rows)
    setTab('kana')
  }

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Typing drills"
      />

      <Tabs
        id="japanese-typing"
        label="Typing drill"
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'learn', label: 'Learn' },
          { key: 'kana', label: 'Kana' },
          { key: 'kanji', label: 'Kanji readings' },
          { key: 'conjugation', label: 'Conjugation' },
          { key: 'numbers', label: 'Numbers & counters' },
          { key: 'names', label: 'Names' },
          { key: 'keigo', label: 'Keigo' }
        ]}
      />

      <TabPanel tabsId="japanese-typing" value={tab}>
        {tab === 'learn' ? (
          <KanaLearn onDrill={drill} />
        ) : tab === 'kana' ? (
          <KanaDrillSetup startRows={drillRows} onStarted={() => setDrillRows(null)} />
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
      </TabPanel>
    </div>
  )
}

// Conjugation Dojo: pick target forms, get "word → form", type the conjugated
// result (kana or romaji). Words are curated; the engine is @shared/conjugate.
function DojoSetup() {
  // ?form=te,past seeds the forms, so a lesson's "Practice this" link opens
  // the drill on what it just taught (@shared/japanese/lessonPractice.ts).
  const [params] = useSearchParams()
  const linked = (params.get('form') ?? '')
    .split(',')
    .filter((f): f is ConjForm => (DOJO_FORMS as readonly string[]).includes(f))
  const [forms, setForms] = usePersistedState<ConjForm[]>(
    'jpDojoForms',
    linked.length ? linked : ['te', 'past', 'negative']
  )
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
        Type kana or romaji.
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

function rowChars(keys: string[]): string[] {
  const set = new Set(keys)
  return SECTIONS.flatMap((s) => s.rows)
    .filter((r) => set.has(r.key))
    .flatMap((r) => r.kana)
}

function KanaDrillSetup({
  startRows = null,
  onStarted
}: {
  /** Rows a lesson asked to drill: selected and started once on mount. */
  startRows?: string[] | null
  onStarted?: () => void
}) {
  const [selected, setSelected] = usePersistedState<string[]>('jpKanaRows', ['a', 'ka'])
  const [round, setRound] = usePersistedState<number>('jpKanaRound', 20)
  // Characters for the running round: the selected rows, or just the misses.
  const [running, setRunning] = useState<string[] | null>(() =>
    startRows && startRows.length > 0 ? rowChars(startRows) : null
  )
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    if (!startRows) return
    setSelected(startRows)
    onStarted?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedSet = new Set(selected)
  const chars = rowChars(selected)

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

  function run(list: string[]): void {
    setRunning(list)
    setRunId((n) => n + 1)
  }

  if (running) {
    return (
      <KanaDrill
        key={runId}
        chars={running}
        roundLength={round}
        settings={{ rows: selected, round }}
        onExit={() => setRunning(null)}
        onRestart={run}
      />
    )
  }

  const rowLabels = SECTIONS.flatMap((s) => s.rows)
    .filter((r) => selectedSet.has(r.key))
    .map((r) => r.label)

  return (
    <SessionLauncher
      summary={
        <div>
          <p className="text-sm text-gray-400">This round</p>
          <p lang="ja" className="mt-2 break-words text-4xl leading-snug text-white">
            {chars.length > 0 ? chars.slice(0, 25).join(' ') : 'Pick rows under Options'}
            {chars.length > 25 && <span className="text-xl text-gray-400"> and {chars.length - 25} more</span>}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Type the reading of each character. Learn a row until it is automatic, then add the next under Options.
          </p>
        </div>
      }
      defaults={`${rowLabels.length} row${rowLabels.length === 1 ? '' : 's'} · ${round === 0 ? 'endless' : `${round} answers`}`}
      startLabel={`Start (${chars.length} characters)`}
      onStart={() => run(chars)}
      disabled={chars.length === 0}
      options={
        <>
          <div>
            <div className="label mb-2">Round length</div>
            <div className="flex flex-wrap gap-2">
              {[20, 40, 0].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={round === n}
                  className={round === n ? 'pill pill-active' : 'pill'}
                  onClick={() => setRound(n)}
                >
                  {n === 0 ? 'Endless' : `${n} answers`}
                </button>
              ))}
            </div>
          </div>
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

        </>
      }
    >
      <QuizRecord kind="kana" />
    </SessionLauncher>
  )
}

// ---- kana lessons (@shared/japanese/kanaLessons.ts) ----

function KanaLearn({ onDrill }: { onDrill: (rows: string[]) => void }) {
  const [openKey, setOpenKey] = usePersistedState<string | null>('jpKanaLesson', null)
  const unit = kanaUnitByKey(openKey)
  if (unit) return <KanaUnitView unit={unit} onBack={() => setOpenKey(null)} onDrill={onDrill} />

  return (
    <div>
      <p className="mb-5 max-w-3xl text-sm text-gray-400">
        One unit per row: the shapes with a memory aid, the look-alikes to tell apart and real
        words to read. Read a unit, then drill its row until reading it is automatic.
      </p>
      {KANA_SCRIPT_GROUPS.map((group) => (
        <Section key={group.script} title={group.title} className="mb-6">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
            {KANA_UNITS.filter((u) => u.script === group.script).map((u) => (
              <li key={u.key}>
                <button
                  type="button"
                  className="card block h-full w-full p-3 text-left hover:text-accent"
                  onClick={() => setOpenKey(u.key)}
                >
                  <span lang="ja" className="block text-2xl text-white">
                    {u.label}
                  </span>
                  <span className="mt-1 block text-sm text-gray-300">{u.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  )
}

function KanaUnitView({
  unit,
  onBack,
  onDrill
}: {
  unit: KanaUnit
  onBack: () => void
  onDrill: (rows: string[]) => void
}) {
  return (
    <div>
      <button type="button" className="btn-ghost mb-4" onClick={onBack}>
        ← All units
      </button>
      <h2 className="text-xl font-semibold text-white">{unit.title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-gray-300">{unit.intro}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {unit.rows.length > 0 && (
          <button type="button" className="btn-primary" onClick={() => onDrill(unit.rows)}>
            {unit.rows.length === 1 ? 'Drill this row' : 'Drill these rows'}
          </button>
        )}
        {unit.script === 'katakana' && (
          <Link to="/japanese/loanwords" className="btn-ghost">
            Practice loanwords
          </Link>
        )}
      </div>

      <Section title="Characters" className="mt-6 mb-6">
        <ul aria-label="Characters" className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
          {unit.chars.map((ch) => (
            <li key={ch.kana} className="card flex items-start gap-3 p-3">
              <span lang="ja" className="w-16 shrink-0 text-center text-5xl leading-none text-white">
                {ch.kana}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-200">{ch.romaji}</p>
                {ch.hook && <p className="mt-1 text-xs text-gray-400">{ch.hook}</p>}
              </div>
              {[...ch.kana].length === 1 && ch.kana !== 'ー' && (
                <StrokeOrderDiagram char={ch.kana} size={64} />
              )}
            </li>
          ))}
        </ul>
      </Section>

      {unit.lookAlikes.length > 0 && (
        <Section title="Look-alikes" className="mb-6">
          <ul className="grid gap-2">
            {unit.lookAlikes.map((l) => (
              <li key={l.kana.join('/')} className="card flex items-start gap-4 p-3">
                <span lang="ja" className="shrink-0 text-2xl text-white">
                  {l.kana.join(' / ')}
                </span>
                <p className="text-sm text-gray-300">{l.tell}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Words to read" className="mb-6">
        <ul aria-label="Words to read" className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
          {unit.words.map((wd) => (
            <li key={wd.word} className="card p-3">
              <span lang="ja" className="block text-2xl text-white">
                {wd.word}
              </span>
              <span className="mt-1 block text-xs text-gray-400">
                {wd.romaji} · {wd.meaning}
              </span>
            </li>
          ))}
        </ul>
      </Section>
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
