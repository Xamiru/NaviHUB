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
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent ? 'text-accent' : ''}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-500">{sub}</p>}
    </div>
  )
}
