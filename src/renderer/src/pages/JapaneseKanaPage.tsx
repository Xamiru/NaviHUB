import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { toKatakana } from '@shared/kana'
import { acceptedRomaji, readingMatches, splitReadings } from '@shared/romaji'
import { conjugate, FORM_LABELS, FORMS_FOR, type ConjForm, type WordClass } from '@shared/conjugate'
import QuizRecord from '../components/QuizRecord'
import type { JpCard, QuizKind } from '@shared/types'

// Kana & kanji reading drill, modeled on the DJT kana practice tool: pick the
// sets you want, get flashed a character, type the romaji (or kana, for kanji
// readings). Wrong answers re-enter the queue until everything has been
// answered correctly; finished rounds land in quiz_session like the other
// quizzes.

// ---- kana set data (rows, DJT-style) ----

interface KanaRow {
  key: string
  label: string
  kana: string[]
}

const HIRA_ROWS: KanaRow[] = [
  { key: 'a', label: 'あいうえお', kana: ['あ', 'い', 'う', 'え', 'お'] },
  { key: 'ka', label: 'かきくけこ', kana: ['か', 'き', 'く', 'け', 'こ'] },
  { key: 'sa', label: 'さしすせそ', kana: ['さ', 'し', 'す', 'せ', 'そ'] },
  { key: 'ta', label: 'たちつてと', kana: ['た', 'ち', 'つ', 'て', 'と'] },
  { key: 'na', label: 'なにぬねの', kana: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { key: 'ha', label: 'はひふへほ', kana: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { key: 'ma', label: 'まみむめも', kana: ['ま', 'み', 'む', 'め', 'も'] },
  { key: 'ya', label: 'やゆよ', kana: ['や', 'ゆ', 'よ'] },
  { key: 'ra', label: 'らりるれろ', kana: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { key: 'wa', label: 'わをん', kana: ['わ', 'を', 'ん'] },
  { key: 'ga', label: 'がぎぐげご', kana: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { key: 'za', label: 'ざじずぜぞ', kana: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { key: 'da', label: 'だぢづでど', kana: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { key: 'ba', label: 'ばびぶべぼ', kana: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { key: 'pa', label: 'ぱぴぷぺぽ', kana: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] }
]

const HIRA_COMBOS: KanaRow[] = [
  { key: 'kya', label: 'きゃ きゅ きょ', kana: ['きゃ', 'きゅ', 'きょ'] },
  { key: 'sha', label: 'しゃ しゅ しょ', kana: ['しゃ', 'しゅ', 'しょ'] },
  { key: 'cha', label: 'ちゃ ちゅ ちょ', kana: ['ちゃ', 'ちゅ', 'ちょ'] },
  { key: 'nya', label: 'にゃ にゅ にょ', kana: ['にゃ', 'にゅ', 'にょ'] },
  { key: 'hya', label: 'ひゃ ひゅ ひょ', kana: ['ひゃ', 'ひゅ', 'ひょ'] },
  { key: 'mya', label: 'みゃ みゅ みょ', kana: ['みゃ', 'みゅ', 'みょ'] },
  { key: 'rya', label: 'りゃ りゅ りょ', kana: ['りゃ', 'りゅ', 'りょ'] },
  { key: 'gya', label: 'ぎゃ ぎゅ ぎょ', kana: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
  { key: 'ja', label: 'じゃ じゅ じょ', kana: ['じゃ', 'じゅ', 'じょ'] },
  { key: 'bya', label: 'びゃ びゅ びょ', kana: ['びゃ', 'びゅ', 'びょ'] },
  { key: 'pya', label: 'ぴゃ ぴゅ ぴょ', kana: ['ぴゃ', 'ぴゅ', 'ぴょ'] }
]

const kataRow = (r: KanaRow): KanaRow => ({
  key: `k-${r.key}`,
  label: toKatakana(r.label),
  kana: r.kana.map(toKatakana)
})
const KATA_ROWS = HIRA_ROWS.map(kataRow)
const KATA_COMBOS = HIRA_COMBOS.map(kataRow)

const SECTIONS: { title: string; rows: KanaRow[] }[] = [
  { title: 'Hiragana', rows: HIRA_ROWS },
  { title: 'Hiragana combinations', rows: HIRA_COMBOS },
  { title: 'Katakana', rows: KATA_ROWS },
  { title: 'Katakana combinations', rows: KATA_COMBOS }
]

// ---- conjugation dojo data ----

interface DojoWord {
  kanji: string
  kana: string
  cls: WordClass
  gloss: string
}

// Curated everyday words spanning every godan ending + the irregulars. The
// dojo conjugates the KANA form via @shared/conjugate.
const DOJO_WORDS: DojoWord[] = [
  { kanji: '飲む', kana: 'のむ', cls: 'v5', gloss: 'to drink' },
  { kanji: '読む', kana: 'よむ', cls: 'v5', gloss: 'to read' },
  { kanji: '書く', kana: 'かく', cls: 'v5', gloss: 'to write' },
  { kanji: '聞く', kana: 'きく', cls: 'v5', gloss: 'to listen' },
  { kanji: '行く', kana: 'いく', cls: 'v5', gloss: 'to go' },
  { kanji: '泳ぐ', kana: 'およぐ', cls: 'v5', gloss: 'to swim' },
  { kanji: '急ぐ', kana: 'いそぐ', cls: 'v5', gloss: 'to hurry' },
  { kanji: '話す', kana: 'はなす', cls: 'v5', gloss: 'to speak' },
  { kanji: '出す', kana: 'だす', cls: 'v5', gloss: 'to take out' },
  { kanji: '待つ', kana: 'まつ', cls: 'v5', gloss: 'to wait' },
  { kanji: '持つ', kana: 'もつ', cls: 'v5', gloss: 'to hold' },
  { kanji: '勝つ', kana: 'かつ', cls: 'v5', gloss: 'to win' },
  { kanji: '死ぬ', kana: 'しぬ', cls: 'v5', gloss: 'to die' },
  { kanji: '遊ぶ', kana: 'あそぶ', cls: 'v5', gloss: 'to play' },
  { kanji: '呼ぶ', kana: 'よぶ', cls: 'v5', gloss: 'to call' },
  { kanji: '飛ぶ', kana: 'とぶ', cls: 'v5', gloss: 'to fly' },
  { kanji: '買う', kana: 'かう', cls: 'v5', gloss: 'to buy' },
  { kanji: '会う', kana: 'あう', cls: 'v5', gloss: 'to meet' },
  { kanji: '使う', kana: 'つかう', cls: 'v5', gloss: 'to use' },
  { kanji: '笑う', kana: 'わらう', cls: 'v5', gloss: 'to laugh' },
  { kanji: '帰る', kana: 'かえる', cls: 'v5', gloss: 'to go home (godan!)' },
  { kanji: '走る', kana: 'はしる', cls: 'v5', gloss: 'to run (godan!)' },
  { kanji: '入る', kana: 'はいる', cls: 'v5', gloss: 'to enter (godan!)' },
  { kanji: '知る', kana: 'しる', cls: 'v5', gloss: 'to know (godan!)' },
  { kanji: '作る', kana: 'つくる', cls: 'v5', gloss: 'to make' },
  { kanji: '取る', kana: 'とる', cls: 'v5', gloss: 'to take' },
  { kanji: '食べる', kana: 'たべる', cls: 'v1', gloss: 'to eat' },
  { kanji: '見る', kana: 'みる', cls: 'v1', gloss: 'to see' },
  { kanji: '起きる', kana: 'おきる', cls: 'v1', gloss: 'to wake up' },
  { kanji: '寝る', kana: 'ねる', cls: 'v1', gloss: 'to sleep' },
  { kanji: '出る', kana: 'でる', cls: 'v1', gloss: 'to exit' },
  { kanji: '着る', kana: 'きる', cls: 'v1', gloss: 'to wear (ichidan!)' },
  { kanji: '教える', kana: 'おしえる', cls: 'v1', gloss: 'to teach' },
  { kanji: '覚える', kana: 'おぼえる', cls: 'v1', gloss: 'to memorize' },
  { kanji: '忘れる', kana: 'わすれる', cls: 'v1', gloss: 'to forget' },
  { kanji: '信じる', kana: 'しんじる', cls: 'v1', gloss: 'to believe' },
  { kanji: 'する', kana: 'する', cls: 'vs', gloss: 'to do' },
  { kanji: '勉強する', kana: 'べんきょうする', cls: 'vs', gloss: 'to study' },
  { kanji: '練習する', kana: 'れんしゅうする', cls: 'vs', gloss: 'to practice' },
  { kanji: '説明する', kana: 'せつめいする', cls: 'vs', gloss: 'to explain' },
  { kanji: '来る', kana: 'くる', cls: 'vk', gloss: 'to come' },
  { kanji: '高い', kana: 'たかい', cls: 'adj-i', gloss: 'tall / expensive' },
  { kanji: '安い', kana: 'やすい', cls: 'adj-i', gloss: 'cheap' },
  { kanji: '強い', kana: 'つよい', cls: 'adj-i', gloss: 'strong' },
  { kanji: '早い', kana: 'はやい', cls: 'adj-i', gloss: 'early / fast' },
  { kanji: '楽しい', kana: 'たのしい', cls: 'adj-i', gloss: 'fun' },
  { kanji: '難しい', kana: 'むずかしい', cls: 'adj-i', gloss: 'difficult' },
  { kanji: 'いい', kana: 'いい', cls: 'adj-i', gloss: 'good (よ- stem!)' },
  { kanji: '悪い', kana: 'わるい', cls: 'adj-i', gloss: 'bad' }
]

const DOJO_FORMS: ConjForm[] = [
  'masu',
  'negative',
  'past',
  'te',
  'potential',
  'passive',
  'causative',
  'volitional',
  'ba',
  'imperative',
  'tai',
  'adverbial'
]

// ---- generic drill engine ----

interface DrillItem {
  prompt: string
  instruction?: string | null // small line above the prompt ("→ て-form")
  sub: string | null // small line under the prompt after answering (readings/meaning)
  accept: (input: string) => boolean
  reveal: string // shown on a wrong answer
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function Drill({
  items,
  kind,
  settings,
  onExit
}: {
  items: DrillItem[]
  kind: QuizKind
  settings: Record<string, unknown>
  onExit: () => void
}) {
  const qc = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const [queue, setQueue] = useState<DrillItem[]>(() => shuffle(items))
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false) // showing a wrong-answer reveal
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const loggedRef = useRef(false)

  const current = queue[index] ?? null
  const finished = index >= queue.length

  // One quiz_session row per finished round (guarded like the quiz pages).
  useEffect(() => {
    if (!finished || loggedRef.current || items.length === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind,
        score: firstTryCorrect,
        total: items.length,
        bestStreak,
        settings
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history(kind) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function submit(): void {
    if (!current) return
    if (wrong) {
      // Reveal acknowledged → move on (the item was already re-enqueued).
      setWrong(false)
      setInput('')
      setIndex((i) => i + 1)
      inputRef.current?.focus()
      return
    }
    const t = input.trim()
    if (!t) return
    if (current.accept(t)) {
      if (!missed.has(current.prompt)) setFirstTryCorrect((n) => n + 1)
      const s = streak + 1
      setStreak(s)
      setBestStreak((b) => Math.max(b, s))
      setInput('')
      setIndex((i) => i + 1)
    } else {
      setStreak(0)
      setMissed((m) => new Set(m).add(current.prompt))
      setQueue((q) => [...q, current]) // try again later
      setWrong(true)
    }
  }

  if (finished) {
    const pct = items.length ? Math.round((firstTryCorrect / items.length) * 100) : 0
    return (
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {firstTryCorrect} / {items.length}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {pct === 100 ? 'Flawless.' : `${pct}% on the first try · best streak ${bestStreak}`}
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
        <span>
          {index + 1} / {queue.length}
        </span>
        <span>
          streak {streak}
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={onExit}>
            Stop
          </button>
        </span>
      </div>

      {current!.instruction && (
        <p className="mb-2 text-center text-sm text-gray-400">{current!.instruction}</p>
      )}
      <p
        className={`text-center leading-none ${
          current!.prompt.length > 4 ? 'text-4xl leading-snug' : 'text-7xl'
        }`}
      >
        {current!.prompt}
      </p>

      {wrong ? (
        <div className="mt-6 text-center">
          <p className="text-sm text-red-400">
            Correct answer: <span className="text-lg text-gray-100">{current!.reveal}</span>
          </p>
          {current!.sub && <p className="mt-1 text-xs text-gray-500">{current!.sub}</p>}
          <button className="btn-primary mt-4" onClick={submit} autoFocus>
            Continue (Enter)
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-xs">
          <input
            ref={inputRef}
            className="input w-full text-center text-lg"
            placeholder="type the reading…"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
          />
        </div>
      )}
    </div>
  )
}

// ---- page ----

type Tab = 'kana' | 'kanji' | 'conjugation'

export default function JapaneseKanaPage() {
  const [tab, setTab] = usePersistedState<Tab>('jpDrillTab', 'kana')

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-5">
        <Link to="/japanese" className="text-sm text-gray-500 hover:text-white">
          ← Japanese
        </Link>
        <h1 className="mt-1 text-2xl font-bold">Kana, Kanji & Conjugation Drill</h1>
        <p className="text-sm text-gray-500">
          Pick your sets, get flashed a prompt, type the answer. Misses come back around until
          you clear them.
        </p>
      </div>

      <div className="mb-5 flex gap-2">
        <button
          className={tab === 'kana' ? 'btn-primary' : 'btn-ghost'}
          onClick={() => setTab('kana')}
        >
          かな Kana
        </button>
        <button
          className={tab === 'kanji' ? 'btn-primary' : 'btn-ghost'}
          onClick={() => setTab('kanji')}
        >
          漢字 Kanji readings
        </button>
        <button
          className={tab === 'conjugation' ? 'btn-primary' : 'btn-ghost'}
          onClick={() => setTab('conjugation')}
        >
          活用 Conjugation
        </button>
      </div>

      {tab === 'kana' ? <KanaDrillSetup /> : tab === 'kanji' ? <KanjiDrillSetup /> : <DojoSetup />}
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
      <Drill
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
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">Forms</h2>
        <button
          className="text-xs text-gray-500 hover:text-gray-300"
          onClick={() => setForms(formSet.size === DOJO_FORMS.length ? [] : [...DOJO_FORMS])}
        >
          {formSet.size === DOJO_FORMS.length ? 'none' : 'all'}
        </button>
      </div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {DOJO_FORMS.map((f) => (
          <button
            key={f}
            onClick={() => toggleForm(f)}
            className={`rounded-md border px-2.5 py-1.5 text-sm transition-colors ${
              formSet.has(f)
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-base-700 bg-base-800 text-gray-400 hover:border-base-600'
            }`}
          >
            {FORM_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="mb-5">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
          Round length
        </h2>
        <div className="flex gap-1.5">
          {[10, 20, 40].map((n) => (
            <button
              key={n}
              onClick={() => setLength(n)}
              className={`rounded-md border px-2.5 py-1.5 text-sm ${
                length === n
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-base-700 bg-base-800 text-gray-400 hover:border-base-600'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

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
    const items: DrillItem[] = chars.map((kana) => {
      const answers = acceptedRomaji(kana)
      return {
        prompt: kana,
        sub: null,
        accept: (input) => answers.includes(input.toLowerCase().trim()),
        reveal: answers[0] ?? ''
      }
    })
    return (
      <Drill
        items={items}
        kind="kana"
        settings={{ rows: selected }}
        onExit={() => setRunning(false)}
      />
    )
  }

  return (
    <div>
      {SECTIONS.map((section) => {
        const allOn = section.rows.every((r) => selectedSet.has(r.key))
        return (
          <div key={section.title} className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                {section.title}
              </h2>
              <button
                className="text-xs text-gray-500 hover:text-gray-300"
                onClick={() => setSection(section.rows, !allOn)}
              >
                {allOn ? 'none' : 'all'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {section.rows.map((row) => (
                <button
                  key={row.key}
                  onClick={() => toggle(row.key)}
                  className={`rounded-md border px-2.5 py-1.5 text-sm transition-colors ${
                    selectedSet.has(row.key)
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-base-700 bg-base-800 text-gray-400 hover:border-base-600'
                  }`}
                >
                  {row.label}
                </button>
              ))}
            </div>
          </div>
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
      <Drill
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
