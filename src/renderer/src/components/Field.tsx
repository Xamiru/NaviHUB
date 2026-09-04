import { cloneElement, useId, type ReactElement, type ReactNode } from 'react'

interface FieldControlProps {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

export function Field({
  label,
  children,
  description,
  error,
  id,
  hiddenLabel = false,
  className = ''
}: {
  label: string
  children: ReactElement<FieldControlProps>
  description?: ReactNode
  error?: ReactNode
  id?: string
  hiddenLabel?: boolean
  className?: string
}): JSX.Element {
  const generatedId = useId()
  const controlId = children.props.id ?? id ?? generatedId
  const descriptionId = description ? `${controlId}-description` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const describedBy = [children.props['aria-describedby'], descriptionId, errorId]
    .filter(Boolean)
    .join(' ') || undefined
  const control = cloneElement(children, {
    id: controlId,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : children.props['aria-invalid']
  })

  return (
    <div className={className}>
      <label className={hiddenLabel ? 'sr-only' : 'label'} htmlFor={controlId}>
        {label}
      </label>
      {control}
      {description && (
        <p id={descriptionId} className="mt-1 text-xs text-gray-400">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function Fieldset({
  legend,
  children,
  className = '',
  legendClassName = 'label mb-2'
}: {
  legend: string
  children: ReactNode
  className?: string
  legendClassName?: string
}): JSX.Element {
  return (
    <fieldset className={className}>
      <legend className={legendClassName}>{legend}</legend>
      {children}
    </fieldset>
  )
}
