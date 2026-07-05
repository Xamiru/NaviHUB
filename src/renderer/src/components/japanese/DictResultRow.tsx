import { flattenGlossary } from '@shared/dictContent'
import type { DictEntry } from '@shared/types'
import PitchAccent from './PitchAccent'

// One clickable search result in the mining flows (mine page + reader panel).
// Shows the headword, reading, first pitch contour, common/source badges and a
// one-line definition. Clicking fills the mining draft.
export default function DictResultRow({
  entry,
  selected,
  mined,
  onPick,
  size = 'md'
}: {
  entry: DictEntry
  selected: boolean
  mined?: boolean
  onPick: () => void
  size?: 'sm' | 'md'
}): JSX.Element {
  const meaning = entry.defs.length ? flattenGlossary(entry.defs[0].glossary, 140) : ''
  const wordSize = size === 'sm' ? 'text-base' : 'text-lg'
  return (
    <button
      onClick={onPick}
      className={`w-full rounded-lg border p-2.5 text-left transition-colors ${
        selected
          ? 'border-accent bg-accent/10'
          : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
      }`}
    >
      <span className={wordSize}>{entry.expression}</span>
      {entry.reading && <span className="ml-2 text-sm text-gray-400">{entry.reading}</span>}
      {entry.pitches.length > 0 && (
        <span className="ml-2 text-sm text-gray-300">
          <PitchAccent reading={entry.pitches[0].reading || entry.reading || entry.expression} position={entry.pitches[0].position} />
        </span>
      )}
      {mined && <span className="chip ml-2 bg-green-500/20 text-green-300">✓ mined</span>}
      {entry.isCommon && <span className="chip ml-1 bg-green-500/20 text-green-300">common</span>}
      {entry.source === 'jisho' && (
        <span className="chip ml-1 bg-base-700 text-gray-400">jisho</span>
      )}
      {meaning && <span className="mt-0.5 block text-sm text-gray-400">{meaning}</span>}
    </button>
  )
}
