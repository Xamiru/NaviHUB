import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
import CardSourceBadge from '../components/CardSourceBadge'
import CardAttachments from '../components/japanese/CardAttachments'
import LessonCheck from '../components/japanese/LessonCheck'
import StrokeOrderDiagram from '../components/japanese/StrokeOrderDiagram'
import { grammarCandidates } from '@shared/cloze'
import type { JpCard, JpLessonKind } from '@shared/types'

const KIND_CHIP: Record<JpLessonKind, { cls: string; label: string }> = {
  grammar: { cls: 'bg-purple-500/20 text-purple-300', label: '文法 Grammar' },
  vocab: { cls: 'bg-sky-500/20 text-sky-300', label: '語彙 Vocab' },
  kanji: { cls: 'bg-amber-500/20 text-amber-300', label: '漢字 Kanji' }
}

export default function JapaneseLessonPage() {
  const { id } = useParams()
  const lessonId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: lesson, isLoading } = useQuery({
    queryKey: qk.japanese.lesson(lessonId),
    queryFn: () => api.japanese.getLesson(lessonId)
  })

  // Practice mode hides readings/meanings in the tables (click to reveal).
  const [practice, setPractice] = usePersistedState('jpLessonPractice', false)

  async function toggleLearned() {
    if (!lesson) return
    await api.japanese.setLessonLearned(lessonId, !lesson.learned)
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    toast(
      lesson.learned
        ? 'Lesson unmarked — its cards leave review and quiz'
        : 'Lesson learned — its cards are now in review and quiz',
      'success'
    )
  }

  async function removeLesson() {
    if (!lesson) return
    if (!window.confirm(`Delete "${lesson.title}" and its ${lesson.cards.length} cards?`)) return
    const courseId = lesson.courseId
    await api.japanese.removeLesson(lessonId)
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    toast('Lesson deleted', 'success')
    navigate(`/japanese/courses/${courseId}`)
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!lesson) return <PageStatus>Lesson not found.</PageStatus>

  const isGrammar = lesson.kind === 'grammar'

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <PageHeader
        back={{ to: `/japanese/courses/${lesson.courseId}`, label: lesson.courseTitle }}
        title={lesson.title}
        eyebrow={
          <>
            <span className={`chip ${KIND_CHIP[lesson.kind].cls}`}>
              {KIND_CHIP[lesson.kind].label}
            </span>
            {lesson.learned && <span className="chip bg-green-500/20 text-green-300">✓ Learned</span>}
          </>
        }
        actions={
          <>
            <Link to={`/japanese/lessons/${lessonId}/edit`} className="btn-ghost">
              Edit
            </Link>
            <ActionMenu items={[{ label: 'Delete lesson…', onSelect: removeLesson, danger: true }]} />
          </>
        }
      />

      {isGrammar && lesson.body && (
        <div className="card mb-6 p-5">
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-200">
            {lesson.body}
          </p>
          <GrammarLibraryLink lessonTitle={lesson.title} />
        </div>
      )}

      <Section
        title={`${isGrammar ? 'Example sentences' : lesson.kind === 'kanji' ? 'Kanji' : 'Vocabulary'} · ${lesson.cards.length}`}
        subtitle={
          !isGrammar && lesson.cards.length > 0 ? (
            <button
              className={`btn-ghost text-sm ${practice ? 'text-accent' : ''}`}
              onClick={() => setPractice(!practice)}
              title="Hide readings and meanings — click a cell to reveal it"
            >
              {practice ? 'Practice mode: on' : 'Practice mode'}
            </button>
          ) : undefined
        }
        className="mb-0"
      >
        {lesson.cards.length === 0 ? (
          <EmptyState title="No cards yet" body="Add some in Edit." />
        ) : isGrammar ? (
          <div className="space-y-2">
            {lesson.cards.map((c) => (
              <SentenceCard key={c.id} card={c} />
            ))}
          </div>
        ) : lesson.kind === 'kanji' ? (
          <KanjiTable cards={lesson.cards} practice={practice} />
        ) : (
          <VocabTable cards={lesson.cards} practice={practice} />
        )}
      </Section>

      <LessonCheck
        lessonId={lessonId}
        kind={lesson.kind}
        learned={lesson.learned}
        cardCount={lesson.cards.length}
        onMarkLearned={toggleLearned}
      />

      <div className="mt-8">
        <button
          className={lesson.learned ? 'btn-ghost' : 'btn-primary'}
          onClick={toggleLearned}
        >
          {lesson.learned ? 'Unmark as learned' : 'Mark as learned'}
        </button>
        {!lesson.learned && (
          <p className="mt-2 text-xs text-gray-500">
            Marking a lesson as learned adds its cards to the review queue and quiz pool.
          </p>
        )}
      </div>
    </div>
  )
}

// A word that deep-links into the offline dictionary page.
function DictLink({ text, className }: { text: string; className?: string }) {
  return (
    <Link
      to={`/japanese/dictionary?q=${encodeURIComponent(text)}`}
      className={`hover:text-accent hover:underline ${className ?? ''}`}
      title="Look up in dictionary"
    >
      {text}
    </Link>
  )
}

// Practice mode: a value hidden behind a neutral block until clicked. Reveal
// state is local per cell and resets when practice mode is toggled (key prop).
function Reveal({ value }: { value: string }) {
  const [shown, setShown] = useState(false)
  if (!value) return null
  if (shown) return <>{value}</>
  return (
    <button
      className="rounded bg-base-700 px-2 text-transparent select-none hover:bg-base-600"
      onClick={() => setShown(true)}
      title="Reveal"
    >
      {value}
    </button>
  )
}

function SentenceCard({ card }: { card: JpCard }) {
  return (
    <div className="card p-4">
      <p className="text-lg">{card.front}</p>
      {card.reading && card.reading !== card.front && (
        <p className="mt-0.5 text-sm text-gray-500">{card.reading}</p>
      )}
      <p className="mt-1 text-sm text-gray-300">{card.back}</p>
      {card.notes && <p className="mt-1 text-xs text-gray-500">{card.notes}</p>}
    </div>
  )
}

function VocabTable({ cards, practice }: { cards: JpCard[]; practice: boolean }) {
  const hasSource = cards.some((c) => c.sourceTitle)
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-base-700 text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="px-4 py-2.5 font-medium">Word</th>
            <th className="px-4 py-2.5 font-medium">Reading</th>
            <th className="px-4 py-2.5 font-medium">Meaning</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            {hasSource && <th className="px-4 py-2.5 font-medium">Source</th>}
          </tr>
        </thead>
        <tbody>
          {cards.map((c) => (
            <tr key={c.id} className="border-b border-base-700/50 last:border-0">
              <td className="px-4 py-2.5 text-base">
                <DictLink text={c.front} />
              </td>
              <td className="px-4 py-2.5 text-gray-400">
                {c.reading && c.reading !== c.front ? (
                  practice ? (
                    <Reveal key={`r${c.id}`} value={c.reading} />
                  ) : (
                    c.reading
                  )
                ) : (
                  ''
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-200">
                {practice ? (
                  <Reveal key={`b${c.id}`} value={c.back} />
                ) : (
                  c.back
                )}
                {!practice && c.notes && (
                  <span className="block text-xs text-gray-500">{c.notes}</span>
                )}
              </td>
              <td className="px-4 py-2.5 text-xs text-gray-500">{c.pos ?? ''}</td>
              {hasSource && (
                <td className="px-4 py-2.5">
                  <CardSourceBadge card={c} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function KanjiTable({ cards, practice }: { cards: JpCard[]; practice: boolean }) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-base-700 text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="px-4 py-2.5 font-medium">Kanji</th>
            <th className="px-4 py-2.5 font-medium">Meaning</th>
            <th className="px-4 py-2.5 font-medium">Readings</th>
            <th className="px-4 py-2.5 font-medium">Example</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((c) => (
            <tr key={c.id} className="border-b border-base-700/50 last:border-0">
              <td className="px-4 py-2.5">
                <span className="text-3xl">
                  <DictLink text={c.front} />
                </span>
                {/* Renders nothing unless the KanjiVG pack is installed. */}
                {!practice && [...c.front].length === 1 && (
                  <span className="mt-1 block">
                    <StrokeOrderDiagram char={c.front} size={72} />
                  </span>
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-200">
                {practice ? <Reveal value={c.back} /> : c.back}
                {!practice && c.notes && (
                  <span className="block text-xs text-gray-500">{c.notes}</span>
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-400">
                {practice ? (
                  <Reveal value={[c.onyomi, c.kunyomi].filter(Boolean).join(' · ') || c.reading || ''} />
                ) : (
                  <>
                    {c.onyomi && (
                      <span className="block">
                        <span className="mr-1.5 text-xs text-gray-400">音</span>
                        {c.onyomi}
                      </span>
                    )}
                    {c.kunyomi && (
                      <span className="block">
                        <span className="mr-1.5 text-xs text-gray-400">訓</span>
                        {c.kunyomi}
                      </span>
                    )}
                    {!c.onyomi && !c.kunyomi && c.reading && c.reading !== c.front && (
                      <span className="block">{c.reading}</span>
                    )}
                  </>
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-300">
                {c.exampleJp && (
                  <>
                    {c.exampleJp}
                    {c.exampleReading && (
                      <span className="ml-1.5 text-xs text-gray-500">{c.exampleReading}</span>
                    )}
                    {c.exampleEn && (
                      <span className="block text-xs text-gray-500">{c.exampleEn}</span>
                    )}
                  </>
                )}
                <CardAttachments card={c} className="mt-2" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Quiet link into the offline grammar library, shown only when the pack is
// installed. The search term is the lesson title's kana grammar point
// (@shared/cloze's extraction), falling back to the raw title.
function GrammarLibraryLink({ lessonTitle }: { lessonTitle: string }) {
  const { data: bank } = useQuery({
    queryKey: qk.dict.grammarBank,
    queryFn: () => api.dict.grammarBank()
  })
  if (!bank) return null
  const target = grammarCandidates(lessonTitle)[0] ?? lessonTitle
  return (
    <p className="mt-3">
      <Link
        to={`/japanese/grammar?q=${encodeURIComponent(target)}`}
        className="text-xs text-gray-500 hover:text-accent"
      >
        Look up in grammar library
      </Link>
    </p>
  )
}
