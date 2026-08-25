// Small dashboard stat card (label over value), shared by the Japanese home
// and music stats pages.
export default function StatTile({
  label,
  value,
  sub,
  accent = false
}: {
  label: string
  value: number | string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className={`card border-t p-4 ${accent ? 'border-t-accent' : 'border-t-base-600'}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${accent ? 'text-accent' : ''}`}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-gray-500">{sub}</p>}
    </div>
  )
}

// Compact card-less variant for dense stat rows (a detail page can show ten of
// these in one line — full tiles would drown the header).
export function StatInline({
  label,
  value,
  accent = false
}: {
  label: string
  value: number | string
  accent?: boolean
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
      <p className={`mt-0.5 text-sm font-medium ${accent ? 'text-accent' : 'text-gray-200'}`}>
        {value}
      </p>
    </div>
  )
}
