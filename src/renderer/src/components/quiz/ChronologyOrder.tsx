import CoverImage from '../CoverImage'
import { moveChronologyItem } from '@shared/chronologyQuiz'

export interface ChronologyOrderChoice {
  key: string
  label: string
  imagePath?: string | null
}

interface ChronologyOrderProps {
  order: string[]
  choices: ChronologyOrderChoice[]
  disabled?: boolean
  onChange: (order: string[]) => void
}

export default function ChronologyOrder({
  order,
  choices,
  disabled = false,
  onChange
}: ChronologyOrderProps) {
  return (
    <div className="space-y-3">
      {order.map((key, index) => {
        const item = choices.find((choice) => choice.key === key)
        if (!item) return null
        const move = (target: number) => onChange(moveChronologyItem(order, index, target))
        return (
          <div
            key={key}
            className="grid min-w-0 grid-cols-[32px_48px_minmax(0,1fr)] items-center gap-3 rounded-md border border-base-700 bg-base-800 p-3 sm:grid-cols-[32px_56px_minmax(0,1fr)_auto]"
            role="group"
            aria-label={`${item.label}, position ${index + 1} of ${order.length}`}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(event) => {
              if (disabled) return
              if (event.key === 'ArrowUp' && index > 0) {
                event.preventDefault()
                move(index - 1)
              } else if (event.key === 'ArrowDown' && index < order.length - 1) {
                event.preventDefault()
                move(index + 1)
              }
            }}
          >
            <span className="text-center text-lg font-semibold tabular-nums text-accent">
              {index + 1}
            </span>
            <CoverImage
              path={item.imagePath}
              alt=""
              className="aspect-[2/3] h-[72px] w-12 sm:h-[84px] sm:w-14"
              thumbWidth={96}
            />
            <div className="min-w-0">
              <p className="font-medium text-gray-100">{item.label}</p>
              <p className="mt-1 text-xs text-gray-400">Use arrow keys or choose a position.</p>
            </div>
            <div
              className="col-span-3 flex items-center justify-end gap-1.5 sm:col-span-1"
              role="group"
              aria-label={`Move ${item.label} to position`}
            >
              <span className="mr-1 text-xs text-gray-400">Position</span>
              {order.map((_, target) => (
                <button
                  key={target}
                  type="button"
                  className={target === index ? 'pill pill-active min-w-9 justify-center' : 'pill min-w-9 justify-center'}
                  disabled={disabled}
                  aria-label={`Move ${item.label} to position ${target + 1}`}
                  aria-current={target === index ? 'true' : undefined}
                  onClick={() => move(target)}
                >
                  {target + 1}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
