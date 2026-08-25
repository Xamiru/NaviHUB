export interface OperationFlowStep {
  label: string
  state: 'complete' | 'active' | 'pending'
}

export default function OperationFlow({
  steps,
  label
}: {
  steps: OperationFlowStep[]
  label: string
}) {
  return (
    <ol
      className="mb-7 grid overflow-hidden border-y border-base-700 sm:grid-cols-3"
      aria-label={label}
    >
      {steps.map((step, index) => (
        <li
          key={step.label}
          aria-current={step.state === 'active' ? 'step' : undefined}
          className={`flex items-center gap-3 border-t px-4 py-3 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 ${
            step.state === 'active'
              ? 'border-base-700 bg-accent/10 text-white'
              : 'border-base-700 text-gray-400'
          }`}
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums ${
              step.state === 'pending'
                ? 'border-base-600 text-gray-500'
                : 'border-accent/40 text-accent'
            }`}
          >
            {step.state === 'complete' ? '✓' : index + 1}
          </span>
          <span className={step.state === 'active' ? 'font-medium' : 'text-sm'}>{step.label}</span>
        </li>
      ))}
    </ol>
  )
}
