import CoverImage from './CoverImage'
import {
  currentMatch,
  nextPowerOfTwo,
  roundLabel,
  visibleContenderIndices,
  type Bracket,
  type BracketMatch
} from '@shared/bracket'
import type { TournamentEntry } from '@shared/types'

// Fixed cell geometry — the column math below depends on every cell being
// exactly this tall, so resist making cells content-sized.
const CELL_H = 66
const GAP = 14
const COL_W = 176

type SlotState = 'win' | 'loss' | 'live' | 'plain' | 'tbd'

// View-only single-elimination tree: one column per round plus a champion
// slot. Winners fill in live while the duel plays out; the current match is
// ringed. Cells are pixel-offset so every match centers on its two feeders —
// that is what makes the bracket shape read correctly at any size, including
// the byes a non-power-of-two pool creates.
export default function TournamentTree({
  bracket,
  contenders
}: {
  bracket: Bracket
  contenders: TournamentEntry[]
}) {
  const size = nextPowerOfTwo(bracket.entryCount)
  const cur = currentMatch(bracket)
  const visible = visibleContenderIndices(bracket)

  // Vertical position of each match, column by column: round 0 stacks evenly,
  // every later match sits at the midpoint of its two feeders.
  const pos: number[][] = []
  for (let r = 0; r < bracket.rounds; r++) {
    if (r === 0) {
      pos.push(Array.from({ length: size >> 1 }, (_, i) => i * (CELL_H + GAP)))
    } else {
      const prev = pos[r - 1]
      const row: number[] = []
      for (let i = 0; i < (size >> (r + 1)); i++) row.push((prev[2 * i] + prev[2 * i + 1]) / 2)
      pos.push(row)
    }
  }

  // Global match indices grouped per round, order preserved (array is
  // round-major, so byRound[r][k] has m.index === k).
  const byRound: { m: BracketMatch; gi: number }[][] = []
  bracket.matches.forEach((m, gi) => {
    ;(byRound[m.round] ??= []).push({ m, gi })
  })

  function slotState(m: BracketMatch, side: 'a' | 'b'): SlotState {
    const self = m[side]
    if (self == null) return 'tbd'
    if (m.winner == null) return cur?.match === m ? 'live' : 'plain'
    return m.winner === self ? 'win' : 'loss'
  }

  function Row({ entry, poolIndex, state }: { entry: TournamentEntry | null; poolIndex: number | null; state: SlotState }) {
    if (state === 'tbd' || !entry) {
      return (
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-7 w-7 shrink-0 rounded bg-base-700" />
          <span className="truncate text-xs text-gray-500">TBD</span>
        </div>
      )
    }
    if (poolIndex == null || !visible.has(poolIndex)) {
      return (
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-7 w-7 shrink-0 rounded border border-dashed border-base-600 bg-base-700/40" />
          <span className="truncate text-xs text-gray-400">Hidden contender</span>
        </div>
      )
    }
    return (
      <div className={`flex min-w-0 items-center gap-2 ${state === 'loss' ? 'opacity-40' : ''}`}>
        <CoverImage
          path={entry.imagePath}
          alt={entry.name}
          thumbWidth={64}
          rounded="rounded"
          className={`h-7 w-7 shrink-0 ${state === 'live' ? 'animate-pulse' : ''}`}
          fallback={entry.entryKind === 'music' ? 'music' : 'initial'}
        />
        <span
          className={`truncate text-xs ${
            state === 'win'
              ? 'font-medium text-accent'
              : state === 'live'
                ? 'text-white'
                : state === 'loss'
                  ? 'line-through'
                  : ''
          }`}
        >
          {entry.name}
        </span>
        {state === 'win' && <span className="ml-auto shrink-0 text-[10px] text-gray-600">win</span>}
      </div>
    )
  }

  const champIndex = bracket.matches[bracket.matches.length - 1].winner

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-6">
        {Array.from({ length: bracket.rounds }, (_, r) => (
          <div key={r} className="flex flex-col" style={{ width: COL_W }}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              {roundLabel(size >> r)}
            </p>
            {(byRound[r] ?? []).map(({ m }, k) => {
              const isBye = m.b === null && m.winner !== null
              const isCurrent = cur?.match.round === m.round && cur?.match.index === m.index
              const marginTop = k === 0 ? pos[r][k] : pos[r][k] - pos[r][k - 1] - CELL_H
              return (
                <div key={m.index} style={{ marginTop, height: CELL_H }}>
                  {/* A bye renders as an advancing entry over an empty slot so
                      every cell stays exactly CELL_H tall. */}
                  <div
                    className={`rounded-lg border p-2 ${
                      isCurrent ? 'border-accent bg-accent/10' : 'border-base-700 bg-base-800'
                    }`}
                  >
                    <Row entry={contenders[m.a!]} poolIndex={m.a} state={isBye ? 'win' : slotState(m, 'a')} />
                    <div className="mt-1.5">
                      {isBye ? (
                        <div className="flex min-w-0 items-center gap-2 opacity-30">
                          <span className="h-7 w-7 shrink-0 rounded border border-dashed border-base-600" />
                          <span className="truncate text-xs text-gray-500">bye</span>
                        </div>
                      ) : (
                        <Row entry={contenders[m.b ?? -1]} poolIndex={m.b} state={slotState(m, 'b')} />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        <div className="flex flex-col" style={{ width: 128 }}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Champion
          </p>
          <div style={{ marginTop: pos[pos.length - 1][0] }}>
            <div
              className={`rounded-lg border p-3 ${
                champIndex != null ? 'border-accent bg-accent/10' : 'border-dashed border-base-600'
              }`}
            >
              {champIndex != null ? (
                <div className="min-w-0 text-center">
                  <CoverImage
                    path={contenders[champIndex].imagePath}
                    alt={contenders[champIndex].name}
                    thumbWidth={96}
                    rounded="rounded"
                    className="mx-auto h-12 w-12"
                    fallback={contenders[champIndex].entryKind === 'music' ? 'music' : 'initial'}
                  />
                  <p className="mt-1.5 truncate text-xs font-semibold text-accent">
                    {contenders[champIndex].name}
                  </p>
                </div>
              ) : (
                <p className="py-4 text-center text-xs text-gray-500">TBD</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
