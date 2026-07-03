import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import CardSourceBadge from '../components/CardSourceBadge'
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

  async function toggleLearned() {
    if (!lesson) return
    await api.japanese.setLessonLearned(lessonId, !lesson.learned)
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    toast(
      lesson.learned
        ? 'Lesson unmarked — its cards leave review and quiz'
        : 'Lesson learned! Its cards are now in review and quiz',
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

  if (isLoading) return <p className="p-6 text-gray-500">Loading…</p>
  if (!lesson) return <p className="p-6 text-gray-500">Lesson not found.</p>

  const isGrammar = lesson.kind === 'grammar'

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <Link
        to={`/japanese/courses/${lesson.courseId}`}
        className="text-sm text-gray-500 hover:text-white"
      >
        ← {lesson.courseTitle}
      </Link>

      <div className="mt-2 flex items-start justify-between gap-4 mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`chip ${KIND_CHIP[lesson.kind].cls}`}>
              {KIND_CHIP[lesson.kind].label}
            </span>
            {lesson.learned && <span className="chip bg-green-500/20 text-green-300">✓ Learned</span>}
          </div>
          <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link to={`/japanese/lessons/${lessonId}/edit`} className="btn-ghost">
            Edit
          </Link>
          <button className="btn-danger" onClick={removeLesson}>
            Delete
          </button>
        </div>
      </div>

      {isGrammar && lesson.body && (
        <div className="card mb-6 p-5">
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-200">
            {lesson.body}
          </p>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3">
        {isGrammar ? 'Example sentences' : lesson.kind === 'kanji' ? 'Kanji' : 'Vocabulary'}{' '}
        <span className="text-sm font-normal text-gray-500">({lesson.cards.length})</span>
      </h2>

      {lesson.cards.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-sm text-gray-500">No cards yet — add some in Edit.</p>
        </div>
      ) : isGrammar ? (
        <div className="space-y-2">
          {lesson.cards.map((c) => (
            <SentenceCard key={c.id} card={c} />
          ))}
        </div>
      ) : lesson.kind === 'kanji' ? (
        <KanjiTable cards={lesson.cards} />
      ) : (
        <VocabTable cards={lesson.cards} />
      )}

      <div className="mt-8">
        <button
          className={lesson.learned ? 'btn-ghost' : 'btn-primary'}
          onClick={toggleLearned}
        >
          {lesson.learned ? '↩ Unmark as learned' : '✓ Mark as learned'}
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

function VocabTable({ cards }: { cards: JpCard[] }) {
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
              <td className="px-4 py-2.5 text-base">{c.front}</td>
              <td className="px-4 py-2.5 text-gray-400">
                {c.reading && c.reading !== c.front ? c.reading : ''}
              </td>
              <td className="px-4 py-2.5 text-gray-200">
                {c.back}
                {c.notes && <span className="block text-xs text-gray-500">{c.notes}</span>}
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

function KanjiTable({ cards }: { cards: JpCard[] }) {
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
              <td className="px-4 py-2.5 text-3xl">{c.front}</td>
              <td className="px-4 py-2.5 text-gray-200">
                {c.back}
                {c.notes && <span className="block text-xs text-gray-500">{c.notes}</span>}
              </td>
              <td className="px-4 py-2.5 text-gray-400">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
