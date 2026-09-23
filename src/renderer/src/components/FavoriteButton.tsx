import { HeartIcon } from './PlayerIcons'

export default function FavoriteButton({
  active,
  onClick,
  activeLabel = 'Remove from favorites',
  inactiveLabel = 'Add to favorites',
  variant = 'default',
  disabled = false,
  className = '',
  activeText = 'Liked',
  inactiveText = 'Like'
}: {
  active: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  activeLabel?: string
  inactiveLabel?: string
  variant?: 'default' | 'compact' | 'overlay' | 'pill'
  disabled?: boolean
  className?: string
  activeText?: string
  inactiveText?: string
}): React.JSX.Element {
  const label = active ? activeLabel : inactiveLabel
  const size =
    variant === 'pill'
      ? 'gap-2'
      : variant === 'compact' || variant === 'overlay'
        ? 'h-7 w-7'
        : 'h-8 w-8'
  const surface =
    variant === 'pill'
      ? active
        ? 'pill pill-active'
        : 'pill text-gray-400'
      : variant === 'overlay'
      ? active
        ? 'media-contrast bg-black/75 text-accent'
        : 'media-contrast bg-black/75 text-gray-300 hover:text-accent'
      : active
        ? 'bg-accent/15 text-accent'
        : 'text-gray-400 hover:bg-base-700 hover:text-white'
  const display =
    variant === 'overlay' && !active
      ? 'hidden group-hover:inline-flex group-focus-within:inline-flex'
      : 'inline-flex'

  return (
    <button
      type="button"
      className={`${display} shrink-0 items-center justify-center rounded-full transition-colors ${size} ${surface} disabled:opacity-50 ${className}`}
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
    >
      <HeartIcon className="h-4 w-4" filled={active} />
      {variant === 'pill' && <span>{active ? activeText : inactiveText}</span>}
    </button>
  )
}
