import { TUTOR_BUDGETS, TUTOR_SKILL_LABEL, type TutorBudget, type TutorTask } from '@shared/japanese/tutor'

// The 10 / 20 / 40 / 60 minute choice on Today and the session start screen.
export function BudgetPicker({
  value,
  onChange
}: {
  value: TutorBudget
  onChange: (budget: TutorBudget) => void
}) {
  return (
    <div role="group" aria-label="Session length" className="flex flex-wrap gap-2">
      {TUTOR_BUDGETS.map((budget) => (
        <button
          key={budget}
          type="button"
          aria-pressed={value === budget}
          className={value === budget ? 'pill pill-active' : 'pill'}
          onClick={() => onChange(budget)}
        >
          {budget} min
        </button>
      ))}
    </div>
  )
}

// What a session of the chosen length will contain, in order.
export function PlanBlocks({ tasks }: { tasks: TutorTask[] }) {
  return (
    <ol className="space-y-2" aria-label="Blocks in this session">
      {tasks.map((task, index) => (
        <li key={`${index}:${task.skill}`} className="flex items-baseline gap-3 text-sm">
          <span className="w-5 shrink-0 text-right text-xs tabular-nums text-gray-500">{index + 1}</span>
          <span className="min-w-0 flex-1 text-gray-200">{task.title}</span>
          <span className="shrink-0 text-xs tabular-nums text-gray-400">
            {TUTOR_SKILL_LABEL[task.skill]} · {task.minutes} min
          </span>
        </li>
      ))}
    </ol>
  )
}
