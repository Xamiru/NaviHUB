import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useSettings } from '../lib/hooks'
import { toast, toastError } from '../lib/toast'
import { gachaGame, type GachaGameCfg } from '@shared/gacha'
import type { GachaChatAction, GachaChatMessage } from '@shared/types'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import Markdown from '../components/Markdown'
import CoachRail from '../components/gacha/CoachRail'

const QUICK_PROMPTS = [
  'What should I do today?',
  'Review my roster',
  'Plan my Saint Quartz for upcoming banners',
  'What banners should I look forward to?'
]

// Model input pricing ($/1M tokens) for the per-message cost line. Output is
// ~5× input; a rough combined estimate is enough to keep the user cost-aware.
const PRICE_IN: Record<string, number> = {
  'claude-opus-4-8': 5,
  'claude-sonnet-5': 3,
  'claude-haiku-4-5': 1
}

// Fires the once-per-turn settle side effects (invalidate + error toast) exactly
// once even though the poll hook is only mounted here.
let lastSettled: string | null = null

export default function GachaCoachPage() {
  const { game } = useParams()
  const cfg = gachaGame(game)
  if (!cfg || !cfg.coach) return <PageStatus>No coach for this game.</PageStatus>
  return <Coach key={cfg.id} cfg={cfg} />
}

function Coach({ cfg }: { cfg: GachaGameCfg }) {
  const qc = useQueryClient()
  const { data: settings } = useSettings()
  const provider = settings?.['coach.provider'] ?? 'gemini'
  const configured =
    provider === 'anthropic'
      ? !!settings?.['anthropic.api_key']
      : provider === 'vertex'
        ? !!settings?.['vertex.project_id']
        : !!settings?.['gemini.api_key']

  const { data: thread } = useQuery({
    queryKey: qk.gacha.coachThread(cfg.id),
    queryFn: () => api.gacha.coachThread(cfg.id)
  })
  const threadId = thread?.id
  const { data: messages = [] } = useQuery({
    queryKey: threadId ? qk.gacha.coachMessages(threadId) : ['gacha', 'coachMessages', 'none'],
    queryFn: () => api.gacha.coachMessages(threadId!),
    enabled: !!threadId
  })

  const { data: status } = useQuery({
    queryKey: qk.gacha.coachStatus,
    queryFn: () => api.gacha.coachStatus(),
    refetchInterval: (q) => (q.state.data?.running ? 350 : false)
  })

  // Settle side effects, once per turn.
  useEffect(() => {
    if (!status || status.running) return
    const key = `${status.turnId}:${status.error ? 'err' : 'ok'}`
    if (lastSettled === key) return
    lastSettled = key
    if (status.error) toast(status.error, 'error')
    qc.invalidateQueries({ queryKey: qk.gacha.all })
  }, [status, qc])

  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const running = !!status?.running

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages.length, status?.partialText])

  async function send(promptText?: string): Promise<void> {
    const body = (promptText ?? text).trim()
    if ((!body && attachments.length === 0) || running || sending) return
    setSending(true)
    try {
      await api.gacha.coachSend(cfg.id, body, attachments)
      setText('')
      setAttachments([])
      if (threadId) qc.invalidateQueries({ queryKey: qk.gacha.coachMessages(threadId) })
      qc.invalidateQueries({ queryKey: qk.gacha.coachStatus })
    } catch (e) {
      toastError(e)
    } finally {
      setSending(false)
    }
  }

  async function attachFile(): Promise<void> {
    const rel = await api.files.pickImage()
    if (rel) setAttachments((a) => [...a, rel])
  }

  async function onPaste(e: React.ClipboardEvent): Promise<void> {
    const file = Array.from(e.clipboardData.files).find((f) => f.type.startsWith('image/'))
    if (!file) return
    e.preventDefault()
    const buf = new Uint8Array(await file.arrayBuffer())
    const ext = file.type.split('/')[1] || 'png'
    const rel = await api.gacha.saveAttachment(buf, ext)
    setAttachments((a) => [...a, rel])
  }

  async function newThread(): Promise<void> {
    await api.gacha.coachNewThread(cfg.id)
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
  }

  const price = PRICE_IN[settings?.['coach.model'] ?? 'claude-opus-4-8'] ?? 5

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        back={{ to: `/gacha/${cfg.id}`, label: cfg.name }}
        title={`${cfg.name} Coach`}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex min-h-[70vh] flex-col">
          {!configured && (
            <div className="card mb-4 border-amber-500/40 p-4 text-sm">
              <p className="mb-2 font-medium">The coach needs a model provider.</p>
              <p className="text-gray-400">
                Add your Google Cloud project (Vertex AI) or an Anthropic API key in{' '}
                <Link to="/settings" className="text-accent underline">
                  Settings → Coach (AI)
                </Link>
                .
              </p>
            </div>
          )}

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 && !running && (
              <div className="pt-6">
                <p className="mb-3 text-sm text-gray-500">
                  Your FGO coach: add servants (or paste a screenshot), set goals, ask what to
                  pull. Try:
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      className="chip hover:text-white"
                      disabled={!configured}
                      onClick={() => send(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} price={price} />
            ))}

            {running && (
              <div className="text-sm">
                <PhaseLabel phase={status!.phase} />
                {status!.actions.length > 0 && (
                  <div className="mb-1 flex flex-wrap gap-1.5">
                    {status!.actions.map((a, i) => (
                      <ActionChip key={i} action={a} />
                    ))}
                  </div>
                )}
                {status!.partialText ? (
                  <div className="card p-3">
                    <Markdown text={status!.partialText} />
                  </div>
                ) : (
                  <p className="text-gray-500">…</p>
                )}
              </div>
            )}
          </div>

          {/* composer */}
          <div className="mt-4">
            {attachments.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {attachments.map((a, i) => (
                  <div key={a} className="relative">
                    <CoverImage path={a} alt="attachment" className="h-16 w-16" />
                    <button
                      className="absolute -right-1 -top-1 rounded-full bg-black/70 px-1 text-xs text-white"
                      aria-label="Remove attachment"
                      onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                className="input min-h-[52px] flex-1 resize-none"
                placeholder={running ? 'Coach is replying…' : 'Ask the coach, or paste a screenshot…'}
                value={text}
                disabled={running}
                onChange={(e) => setText(e.target.value)}
                onPaste={onPaste}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              <button className="btn-ghost" title="Attach screenshot" disabled={running} onClick={attachFile}>
                Attach
              </button>
              {running ? (
                <button className="btn-danger" onClick={() => api.gacha.coachCancel()}>
                  Stop
                </button>
              ) : (
                <button
                  className="btn-primary"
                  disabled={!configured || sending || (!text.trim() && attachments.length === 0)}
                  onClick={() => send()}
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>

        <CoachRail game={cfg.id} onNewThread={newThread} />
      </div>
    </div>
  )
}

function PhaseLabel({ phase }: { phase: string }) {
  const label = phase.startsWith('tool:')
    ? `Using ${phase.slice(5).replace(/_/g, ' ')}…`
    : phase === 'writing'
      ? 'Writing…'
      : 'Thinking…'
  return <p className="mb-1 text-xs text-gray-500">{label}</p>
}

function ActionChip({ action }: { action: GachaChatAction }) {
  return <span className="chip bg-accent/15 text-accent">{action.label}</span>
}

function MessageBubble({ message, price }: { message: GachaChatMessage; price: number }) {
  const isUser = message.role === 'user'
  const cost =
    message.usageIn != null && message.usageOut != null
      ? ((message.usageIn + message.usageOut * 5) / 1_000_000) * price
      : null

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1.5">
        {message.attachments.length > 0 && (
          <div className="flex flex-wrap justify-end gap-2">
            {message.attachments.map((a) => (
              <CoverImage key={a} path={a} alt="attachment" className="h-20 w-20" />
            ))}
          </div>
        )}
        {message.text && (
          <div className="max-w-[80%] rounded-lg bg-accent/15 px-3 py-2 text-sm text-gray-100">
            {message.text}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="group">
      {message.actions.length > 0 && (
        <div className="mb-1.5 flex flex-wrap gap-1.5">
          {message.actions.map((a, i) => (
            <ActionChip key={i} action={a} />
          ))}
        </div>
      )}
      <div className="card p-3">
        <Markdown text={message.text} />
      </div>
      <div className="mt-1 flex items-center gap-3 text-[11px] text-gray-600">
        <button
          className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-400"
          onClick={() => navigator.clipboard.writeText(message.text)}
        >
          Copy
        </button>
        {cost != null && <span>~${cost.toFixed(3)}</span>}
      </div>
    </div>
  )
}
