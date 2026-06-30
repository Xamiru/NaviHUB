import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import type { SettingsMap } from '@shared/types'

export function useSettings() {
  return useQuery<SettingsMap>({
    queryKey: ['settings'],
    queryFn: () => api.settings.all(),
    staleTime: 60_000
  })
}

// Reads a media type's configurable status list (settings key + fallback come
// from its MediaConfig), e.g. useStatuses(ANIME) or useStatuses(MOVIE).
export function useStatuses(cfg: { statusesKey: string; defaultStatuses: string[] }): string[] {
  const { data } = useSettings()
  const raw = data?.[cfg.statusesKey]
  if (!raw) return cfg.defaultStatuses
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : cfg.defaultStatuses
  } catch {
    return cfg.defaultStatuses
  }
}

export function useScoreMax(): number {
  const { data } = useSettings()
  const n = Number(data?.['score.max'])
  return Number.isFinite(n) && n > 0 ? n : 10
}

// Resolves a stored relative image path to a navimg:// URL the renderer can show.
export function useImageUrl(relPath: string | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    if (!relPath) {
      setUrl(null)
      return
    }
    api.files.resolveUrl(relPath).then((u) => {
      if (alive) setUrl(u)
    })
    return () => {
      alive = false
    }
  }, [relPath])
  return url
}
