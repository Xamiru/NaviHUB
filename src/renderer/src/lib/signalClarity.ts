export const SIGNAL_CLARITY_SETTING = 'ui.signalClarity'

export const SIGNAL_CLARITY_OPTIONS = [
  {
    value: 'clean',
    label: 'Clean',
    description: 'Lain palette and geometry with atmosphere and pulse held still.'
  },
  {
    value: 'broadcast',
    label: 'Broadcast',
    description: 'Balanced topology, glow and short signal transitions.'
  },
  {
    value: 'deep',
    label: 'Deep Wired',
    description: 'Stronger field depth, chromatic split and terminal presence.'
  }
] as const

export type SignalClarity = (typeof SIGNAL_CLARITY_OPTIONS)[number]['value']

export function parseSignalClarity(value: string | undefined): SignalClarity {
  return SIGNAL_CLARITY_OPTIONS.some((option) => option.value === value)
    ? (value as SignalClarity)
    : 'broadcast'
}
