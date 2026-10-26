import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import type { EmulatorInfo } from '@shared/types'

// An emulator as a small chip: its program's own icon (read from the exe in
// main) and its name. A missing program file shows in the caution colour.
export default function EmulatorChip({ emulator, isDefault = false }: { emulator: EmulatorInfo; isDefault?: boolean }) {
  const { data: icon } = useQuery({
    queryKey: qk.games.emulatorIcon(emulator.id),
    queryFn: () => api.emulators.icon(emulator.id),
    staleTime: Infinity,
    enabled: emulator.exeExists
  })
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs ${
        emulator.exeExists ? 'border-line-strong bg-surface-raised/80 text-ink-secondary' : 'border-signal-caution/60 text-signal-caution'
      }`}
      title={emulator.exeExists ? (isDefault ? 'Default emulator' : undefined) : 'The program is not at its path any more'}
    >
      {icon ? (
        <img src={icon} alt="" className="h-4 w-4 shrink-0" />
      ) : (
        <span aria-hidden="true" className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-base-600 text-[9px] font-bold text-ink">
          {emulator.name.slice(0, 1).toUpperCase()}
        </span>
      )}
      {emulator.name}
      {!emulator.exeExists && <span className="sr-only"> (program missing)</span>}
    </span>
  )
}
