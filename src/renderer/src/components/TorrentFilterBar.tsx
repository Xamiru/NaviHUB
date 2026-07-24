import {
  EMPTY_TORRENT_FILTER,
  SIZE_UNITS,
  sizeToBytes,
  torrentFilterActiveCount,
  type SizeUnit
} from '@shared/torrents'
import type { TorrentFilter } from '@shared/types'

interface Props {
  filter: TorrentFilter
  onChange: (f: TorrentFilter) => void
  trackers: string[] // every tracker present in the current result set
  // Size inputs keep their raw text so a half-typed "1." doesn't reset.
  sizeText: { min: string; max: string; unit: SizeUnit }
  onSizeText: (s: { min: string; max: string; unit: SizeUnit }) => void
}

// Client-side narrowing of results that already arrived — qBittorrent's search
// filter row. Nothing here re-queries Jackett.
export default function TorrentFilterBar({
  filter,
  onChange,
  trackers,
  sizeText,
  onSizeText
}: Props): React.JSX.Element {
  const active = torrentFilterActiveCount(filter)

  function setSize(next: { min: string; max: string; unit: SizeUnit }): void {
    onSizeText(next)
    onChange({
      ...filter,
      minBytes: sizeToBytes(next.min, next.unit),
      maxBytes: sizeToBytes(next.max, next.unit)
    })
  }

  function toggleTracker(t: string): void {
    const has = filter.trackers.includes(t)
    onChange({
      ...filter,
      trackers: has ? filter.trackers.filter((x) => x !== t) : [...filter.trackers, t]
    })
  }

  return (
    <div className="mb-3 space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <input
          className="input w-48"
          placeholder="Filter titles…"
          value={filter.text}
          onChange={(e) => onChange({ ...filter, text: e.target.value })}
        />
        <input
          className="input w-40"
          placeholder="Exclude words…"
          value={filter.exclude}
          onChange={(e) => onChange({ ...filter, exclude: e.target.value })}
        />
        <label className="flex items-center gap-1.5 text-gray-400">
          Min seeds
          <input
            className="input w-16 tabular-nums"
            type="number"
            min={0}
            value={filter.minSeeders ?? ''}
            onChange={(e) =>
              onChange({
                ...filter,
                minSeeders: e.target.value.trim() === '' ? null : Math.max(0, Number(e.target.value))
              })
            }
          />
        </label>
        <label className="flex items-center gap-1.5 text-gray-400">
          Size
          <input
            className="input w-20 tabular-nums"
            placeholder="min"
            value={sizeText.min}
            onChange={(e) => setSize({ ...sizeText, min: e.target.value })}
          />
          <span>–</span>
          <input
            className="input w-20 tabular-nums"
            placeholder="max"
            value={sizeText.max}
            onChange={(e) => setSize({ ...sizeText, max: e.target.value })}
          />
          <select
            className="input w-auto"
            aria-label="Size unit"
            value={sizeText.unit}
            onChange={(e) => setSize({ ...sizeText, unit: e.target.value as SizeUnit })}
          >
            {Object.keys(SIZE_UNITS).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        {active > 0 && (
          <button
            className="btn-ghost px-2.5 py-1 text-xs"
            onClick={() => {
              onSizeText({ min: '', max: '', unit: sizeText.unit })
              onChange(EMPTY_TORRENT_FILTER)
            }}
          >
            Clear filters ({active})
          </button>
        )}
      </div>

      {trackers.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {trackers.map((t) => {
            const on = filter.trackers.includes(t)
            return (
              <button
                key={t}
                className={`chip text-xs ${on ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}`}
                onClick={() => toggleTracker(t)}
                title={on ? `Stop showing only ${t}` : `Show only ${t}`}
              >
                {t}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
