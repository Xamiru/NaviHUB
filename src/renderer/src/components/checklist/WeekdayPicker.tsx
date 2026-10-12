import { Fieldset } from '../Field'
import { ALL_DAYS_MASK, WEEKDAY_ORDER, normalizeDays } from '@shared/checklist'

// The days a daily item is due. null = every day; the last chosen day cannot be
// cleared, so the mask is never empty.
export default function WeekdayPicker({
  value,
  onChange
}: {
  value: number | null
  onChange: (mask: number | null) => void
}) {
  const mask = value ?? ALL_DAYS_MASK
  const count = WEEKDAY_ORDER.filter((d) => mask & (1 << d.bit)).length

  return (
    <Fieldset legend="Due on">
      <div className="flex flex-wrap gap-1.5">
        {WEEKDAY_ORDER.map((d) => {
          const on = (mask & (1 << d.bit)) !== 0
          return (
            <button
              key={d.bit}
              type="button"
              className={on ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
              aria-pressed={on}
              aria-label={d.long}
              disabled={on && count === 1}
              title={on && count === 1 ? 'An item needs at least one day' : d.long}
              onClick={() => onChange(normalizeDays(mask ^ (1 << d.bit)))}
            >
              {d.short}
            </button>
          )
        })}
        {value != null && (
          <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => onChange(null)}>
            Every day
          </button>
        )}
      </div>
    </Fieldset>
  )
}
