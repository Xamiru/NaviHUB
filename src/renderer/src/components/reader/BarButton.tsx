// The reader HUD bar button (book + manga readers): quiet glyph/text button
// that lights accent when its feature is active. One copy — the pages used to
// each carry their own.
export default function BarButton({
  label,
  title,
  active = false,
  onClick
}: {
  label: string
  title: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`rounded px-2 py-1 ${active ? 'bg-accent/20 text-accent' : 'text-gray-500 hover:text-gray-300'}`}
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
