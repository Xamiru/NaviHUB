import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { mediaUrl } from '@shared/mediaUrl'
import { PlayIcon } from '../PlayerIcons'

// Speaks Japanese text with the offline voice (Open JTalk, src/main/tts/).
// Renders nothing until the voice pack is installed (Settings → Learning, or
// the Today setup list). Pass the reading the screen shows: the engine is held
// to it, so 今日 on a こんにち card is never spoken as きょう. The first play of
// a text synthesizes it (~0.2 s) and caches the clip. Plays through a
// page-local Audio element, never the global music player, and stops when the
// button leaves the screen.
export default function SpeakButton({
  text,
  reading,
  label,
  className = ''
}: {
  text: string | null | undefined
  reading?: string | null
  label?: string
  className?: string
}) {
  const voice = useQuery({ queryKey: qk.japanese.voiceInfo, queryFn: () => api.japanese.voiceInfo(), staleTime: 60_000 })
  const audio = useRef<HTMLAudioElement | null>(null)
  const [busy, setBusy] = useState(false)
  useEffect(() => () => audio.current?.pause(), [])
  if (!text || !voice.data?.installed) return null
  const name = `${label ? `${label}: ` : 'Listen to '}${text} (synthetic voice)`

  async function play(): Promise<void> {
    // Busy guards re-entry without `disabled`, which would drop keyboard focus.
    if (busy || !text) return
    setBusy(true)
    try {
      const url = mediaUrl(await api.japanese.speak(text, reading ?? null))
      if (!url) return
      audio.current?.pause()
      const el = new Audio(url)
      audio.current = el
      await el.play().catch(() => undefined)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      className={`btn-ghost inline-flex items-center gap-1.5 px-2 py-1 text-sm ${className}`}
      onClick={() => void play()}
      aria-busy={busy}
      aria-label={name}
      title={name}
    >
      <PlayIcon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}
