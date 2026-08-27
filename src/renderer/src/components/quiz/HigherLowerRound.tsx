import CoverImage from '../CoverImage'
import { higherLowerCopy } from '@shared/higherLowerQuiz'
import type { QuizHigherLowerQuestion } from '@shared/types'

interface Props {
  question: QuizHigherLowerQuestion
  answered: boolean
  selected: string | null
  disabled?: boolean
  onAnswer: (key: string) => void
}

export default function HigherLowerRound({
  question,
  answered,
  selected,
  disabled = false,
  onAnswer
}: Props) {
  const copy = higherLowerCopy(question.mediaType, question.metric)
  return (
    <div>
      <p className="mb-6 text-center text-xl font-semibold text-gray-100">{question.prompt}</p>
      <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <section className="flex min-w-0 flex-col rounded-lg border border-base-600 bg-base-800 p-4">
          <CoverImage
            path={question.reference.imagePath}
            alt={question.reference.label}
            thumbWidth={420}
            className="mx-auto aspect-[2/3] max-h-[46vh] w-full max-w-[19rem]"
          />
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-gray-100">{question.reference.label}</h2>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-400">
              {copy.valueLabel}
            </p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-accent">
              {copy.formatValue(question.referenceValue)}
            </p>
          </div>
        </section>

        <div className="flex items-center justify-center py-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
          compared with
        </div>

        <section className="flex min-w-0 flex-col rounded-lg border border-base-600 bg-base-800 p-4">
          <CoverImage
            path={question.challenger.imagePath}
            alt={question.challenger.label}
            thumbWidth={420}
            className="mx-auto aspect-[2/3] max-h-[46vh] w-full max-w-[19rem]"
          />
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-gray-100">{question.challenger.label}</h2>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-400">
              {copy.valueLabel}
            </p>
            <p
              className={`mt-1 text-3xl font-semibold tabular-nums ${
                answered ? 'text-accent' : 'text-gray-500'
              }`}
              aria-live="polite"
            >
              {answered ? copy.formatValue(question.challengerValue) : 'Hidden'}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.choices.map((option, index) => {
          const correct = answered && question.validKeys.includes(option.key)
          const wrong = answered && selected === option.key && !correct
          return (
            <button
              key={option.key}
              className={`min-h-14 rounded-md border px-5 py-4 text-left text-base font-semibold transition-colors ${
                correct
                  ? 'border-green-500 bg-green-500/10 text-green-100'
                  : wrong
                    ? 'border-red-500 bg-red-500/10 text-red-100'
                    : 'border-base-600 bg-base-800 text-gray-100 hover:border-accent'
              }`}
              disabled={disabled || answered}
              onClick={() => onAnswer(option.key)}
            >
              <span className="mr-3 text-sm font-normal text-gray-500">{index + 1}</span>
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
