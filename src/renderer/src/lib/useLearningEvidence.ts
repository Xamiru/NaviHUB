import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { parseLearningRecord, type LearningRecord } from '@shared/learningEvidence'
import type { SettingsMap } from '@shared/types'

// A practice block and its project panel can save the same unit at once.
// Serialize read/modify/write per row so one cannot overwrite the other's evidence.
const pendingWrites = new Map<string, Promise<void>>()

export function useLearningEvidence(key: string) {
  const qc = useQueryClient()
  const query = useQuery({ queryKey: qk.settings.values, queryFn: () => api.settings.all() })
  const record = parseLearningRecord(query.data?.[key])

  async function save(update: (current: LearningRecord) => LearningRecord): Promise<void> {
    const previous = pendingWrites.get(key) ?? Promise.resolve()
    const write = previous.catch(() => {}).then(async () => {
      const settings = await api.settings.all()
      const next = update(parseLearningRecord(settings[key]))
      const value = JSON.stringify({ ...next, attempts: next.attempts.slice(-50) })
      await api.settings.set(key, value)
      qc.setQueryData<SettingsMap>(qk.settings.values, (old) => ({ ...old, [key]: value }))
      await qc.invalidateQueries({ queryKey: qk.settings.all })
    })
    pendingWrites.set(key, write)
    try { await write } finally {
      if (pendingWrites.get(key) === write) pendingWrites.delete(key)
    }
  }

  return { record, save, isPending: query.isPending, isError: query.isError }
}
