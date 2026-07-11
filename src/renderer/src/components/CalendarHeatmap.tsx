import { useMemo } from 'react'

// GitHub-style year heatmap as pure CSS: one column per week, 7 cells down,
// accent intensity bucketed by quartile of the max day. Native title tooltips.
// `days` is sparse ('YYYY-MM-DD' → count); missing days render as zero.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_MS = 86_400_000

const pad = (n: number): string => String(n).padStart(2, '0')
const dayString = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

function bucketClass(count: number, max: number): string {
  if (count <= 0) return 'bg-base-800'
  const q = count / max
  if (q <= 0.25) return 'bg-accent/25'
  if (q <= 0.5) return 'bg-accent/50'
  if (q <= 0.75) return 'bg-accent/75'
  return 'bg-accent'
}

export default function CalendarHeatmap({
  days,
  weeks = 52,
  unit = 'reviews'
}: {
  days: { day: string; count: number }[]
  weeks?: number
  unit?: string
}) {
  const { grid, monthLabels, max } = useMemo(() => {
    const byDay = new Map(days.map((d) => [d.day, d.count]))
    const max = Math.max(...days.map((d) => d.count), 1)

    // End on today, start on the Sunday `weeks` back so columns align to weeks.
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = new Date(today.getTime() - (weeks * 7 - 1) * DAY_MS)
    start.setDate(start.getDate() - start.getDay()) // back to Sunday

    const grid: { day: string; count: number; future: boolean }[][] = []
    const monthLabels: { col: number; label: string }[] = []
    let lastMonth = -1
    for (let w = 0; ; w++) {
      const weekStart = new Date(start.getTime() + w * 7 * DAY_MS)
      if (weekStart > today) break
      const col: { day: string; count: number; future: boolean }[] = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(weekStart.getTime() + d * DAY_MS)
        const key = dayString(date)
        col.push({ day: key, count: byDay.get(key) ?? 0, future: date > today })
      }
      const m = weekStart.getMonth()
      if (m !== lastMonth) {
        monthLabels.push({ col: w, label: MONTHS[m] })
        lastMonth = m
      }
      grid.push(col)
    }
    return { grid, monthLabels, max }
  }, [days, weeks])

  return (
    <div className="overflow-x-auto pb-1">
      <div className="relative ml-0 flex gap-[3px]" style={{ paddingTop: 16 }}>
        {monthLabels.map((m) => (
          <span
            key={`${m.label}-${m.col}`}
            className="absolute top-0 text-[10px] text-gray-500"
            style={{ left: m.col * 13 }}
          >
            {m.label}
          </span>
        ))}
        {grid.map((col, w) => (
          <div key={w} className="grid grid-rows-7 gap-[3px]">
            {col.map((cell) =>
              cell.future ? (
                <span key={cell.day} className="h-2.5 w-2.5" />
              ) : (
                <span
                  key={cell.day}
                  className={`h-2.5 w-2.5 rounded-[2px] ${bucketClass(cell.count, max)}`}
                  title={`${cell.day} · ${cell.count} ${unit}`}
                />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
