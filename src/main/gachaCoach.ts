// The FGO coach's LLM runner: a streaming agentic loop with tool calls, turn
// state (polled by the renderer — no push IPC), vision, and chat-import digest.
// The provider is switchable in Settings (`coach.provider`): Google Gemini
// (default — free via AI Studio), or Anthropic Claude (direct key or Vertex).
// Pure logic (tools, context, model params, reply filtering) lives in
// coachTools.ts so tests skip the SDKs. Every LLM call here is user-triggered
// (coachSend / importDoc).

import { nativeImage } from 'electron'
import type { GoogleGenAI } from '@google/genai'
import type Anthropic from '@anthropic-ai/sdk'
import type { AnthropicVertex } from '@anthropic-ai/vertex-sdk'
import * as coachRepo from './repos/coachRepo'
import {
  completeOnce,
  coachModel,
  friendlyError,
  makeAnthropic,
  makeGemini,
  resolveProvider
} from './llm'
import { absoluteMediaPath } from './files'
import {
  buildContextBlock,
  buildModelParams,
  executeCoachTool,
  gatherSnapshot,
  geminiToolDeclarations,
  textOf,
  toolDefinitions
} from './coachTools'
import type { GachaChatAction, GachaCoachStatus, GachaGameId } from '@shared/types'

const MAX_TOKENS = 32_000
const MAX_ITERATIONS = 8
const MAX_IMAGE_EDGE = 1568
const MAX_IMAGE_BYTES = 4_500_000

const SYSTEM_PROMPT = `You are the player's personal Fate/Grand Order coach: a blunt, experienced veteran who wants this beginner to spend efficiently and pull smart. You have tools that let you act directly in their tracker app.

# Persona & doctrine
- Direct and opinionated. Tell them plainly what NOT to do, not just what to do.
- Saint Quartz frugality is the core lesson: hoard for planned banners, NEVER roll off-banner (the featured servant is what you want; general-pool rate-ups are traps), don't buy quartz, spend apples only for event farming that matters.
- FGO is JP-first: the JP server runs ~2 years ahead of NA, so upcoming NA banners are already known. Use that to plan. Ask ONCE which server they play (NA or JP) and save_note the answer; assume NA if they don't say.
- When they overreact ("should I roll now?"), slow them down: check what's on the CURRENT banner, what's coming, and whether they can afford it.

# Acting in the app (tools)
- Before adding or changing roster units, call get_roster so you don't duplicate or clobber.
- A screenshot of servants = call add_unit once per servant you can read (name, rarity, class, NP level 1-5). Extract EVERYTHING from an image the turn it arrives — images are not kept in history, so don't rely on seeing it again.
- NP level is 1-5 (a new copy is NP1). Craft essences use limit_break 0-4.
- Use goals for one-off targets ("save 300 SQ for Skadi") and recurring tasks (daily logins, weekly missions) with recur daily/weekly — those become the player's reminders.
- save_note anything durable you learn (server, spending limits, who they're building, roster gaps).
- get_news reads cached headlines only; you cannot fetch — tell them to press Fetch in the News tab.
- There are no delete tools for roster or banners; the player removes those in the UI.

# The <context> block
Each message carries an app-generated <context> block: today's date, their full roster, currencies, banners, goals/tasks, your saved notes, imported-chat summaries, and cached news. This is GROUND TRUTH — trust it over your memory. If a task is marked [OVERDUE] or [DUE TODAY], nag them about it early in your reply.

# Formatting
Short, skimmable markdown: headings, bold, bullet lists, inline code. No tables. No emoji. Lead with the answer, then the reasoning.`

// ---- vision ----

// Downscale a screenshot to a base64 JPEG. nativeImage decodes png/jpeg
// reliably; on anything it can't read, fall back to the raw bytes with the
// file's own media type.
function imageToInline(relPath: string): { mimeType: string; dataB64: string } | null {
  try {
    const abs = absoluteMediaPath(relPath)
    const img = nativeImage.createFromPath(abs)
    if (!img.isEmpty()) {
      const { width, height } = img.getSize()
      const longest = Math.max(width, height)
      const scaled =
        longest > MAX_IMAGE_EDGE
          ? img.resize({ width: Math.round((width / longest) * MAX_IMAGE_EDGE) })
          : img
      const jpeg = scaled.toJPEG(80)
      if (jpeg.length <= MAX_IMAGE_BYTES)
        return { mimeType: 'image/jpeg', dataB64: jpeg.toString('base64') }
    }
    const { readFileSync } = require('fs') as typeof import('fs')
    const buf = readFileSync(abs) as Buffer
    if (buf.length > MAX_IMAGE_BYTES) return null
    const ext = relPath.split('.').pop()?.toLowerCase()
    const mimeType =
      ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
    return { mimeType, dataB64: buf.toString('base64') }
  } catch {
    return null
  }
}

function localDateParts(): { today: string; weekday: string } {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    d.getDay()
  ]
  return { today: `${d.getFullYear()}-${mm}-${dd}`, weekday }
}

// ---- turn state (polled at gacha:coachStatus) ----

let status: GachaCoachStatus | null = null
let activeAbort: AbortController | null = null
let turnCounter = 0

export function getCoachStatus(): GachaCoachStatus | null {
  return status ? { ...status, actions: [...status.actions] } : null
}

export function coachCancel(): void {
  activeAbort?.abort()
  if (status) status.error = status.error ?? 'Stopped.'
}

// Best-effort abort on app quit (the request dies with the process anyway).
export function abortActiveCoachTurn(): void {
  try {
    activeAbort?.abort()
  } catch {
    // ignore
  }
}

// ---- send a turn ----

export function coachSend(
  game: GachaGameId,
  text: string,
  attachments: string[]
): { turnId: number; threadId: number } {
  if (status?.running) throw new Error('The coach is still replying — wait for it to finish.')
  const thread = coachRepo.activeThread(game)
  const existing = coachRepo.listMessages(thread.id)
  if (existing.length === 0 && text.trim()) {
    coachRepo.setThreadTitle(thread.id, text.trim().slice(0, 60))
  }

  // Persist the user row first (never lose the message). api_blocks stores text
  // + [screenshot attached] markers — images are NOT replayed in history.
  const userBlocks: unknown[] = []
  if (text.trim()) userBlocks.push({ type: 'text', text: text.trim() })
  for (const a of attachments) userBlocks.push({ type: 'text', text: `[screenshot attached: ${a}]` })
  if (userBlocks.length === 0) userBlocks.push({ type: 'text', text: '(screenshot)' })
  coachRepo.appendMessage({
    threadId: thread.id,
    role: 'user',
    text: text.trim(),
    apiBlocks: userBlocks,
    attachments
  })

  turnCounter += 1
  const turnId = turnCounter
  status = {
    turnId,
    threadId: thread.id,
    game,
    running: true,
    phase: 'thinking',
    partialText: '',
    actions: [],
    error: null,
    startedAt: new Date().toISOString()
  }

  void runTurn(game, thread.id, text, attachments, turnId)
  return { turnId, threadId: thread.id }
}

interface CoachTurn {
  systemText: string
  history: { role: 'user' | 'assistant'; text: string }[]
  contextText: string
  userText: string
  images: { mimeType: string; dataB64: string }[]
}

interface TurnResult {
  assistantText: string
  usageIn: number
  usageOut: number
  actions: GachaChatAction[]
}

async function runTurn(
  game: GachaGameId,
  threadId: number,
  text: string,
  attachments: string[],
  turnId: number
): Promise<void> {
  const st = (): GachaCoachStatus | null => (status && status.turnId === turnId ? status : null)
  try {
    const provider = resolveProvider()
    const model = coachModel(provider)

    // Plain-text history window (user-first). The last row is the user turn we
    // just persisted — drop it; we rebuild the current turn fresh with the live
    // context block + real images. Drop empty turns and any leading assistant.
    const raw = coachRepo.historyWindow(threadId, 30)
    raw.pop()
    let history = raw
      .map((m) => ({ role: m.role, text: textOf(m.content as unknown[]) }))
      .filter((m) => m.text.trim().length > 0)
    while (history.length && history[0].role !== 'user') history = history.slice(1)

    const { today, weekday } = localDateParts()
    const contextText = buildContextBlock(gatherSnapshot(game, today, weekday))
    const images = attachments
      .map(imageToInline)
      .filter((i): i is { mimeType: string; dataB64: string } => i !== null)

    const turn: CoachTurn = {
      systemText: SYSTEM_PROMPT,
      history,
      contextText,
      userText: text.trim(),
      images
    }

    const result =
      provider === 'gemini'
        ? await runGeminiTurn(makeGemini(), model, turn, game, st)
        : await runAnthropicTurn(makeAnthropic(provider), model, turn, game, st)

    if (!st()) return
    coachRepo.appendMessage({
      threadId,
      role: 'assistant',
      text: result.assistantText,
      apiBlocks: [{ type: 'text', text: result.assistantText || '(done)' }],
      actions: result.actions,
      usageIn: result.usageIn,
      usageOut: result.usageOut
    })
    const done = st()
    if (done) done.running = false
  } catch (e) {
    activeAbort = null
    const cur = st()
    if (cur) {
      cur.running = false
      cur.error = friendlyError(e)
    }
  }
}

// ---- Gemini adapter (default) ----

async function runGeminiTurn(
  client: GoogleGenAI,
  model: string,
  turn: CoachTurn,
  game: GachaGameId,
  st: () => GachaCoachStatus | null
): Promise<TurnResult> {
  const controller = new AbortController()
  activeAbort = controller
  const tools = [{ functionDeclarations: geminiToolDeclarations() }]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contents: any[] = turn.history.map((h) => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.text }]
  }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userParts: any[] = [{ text: turn.contextText }]
  if (turn.userText) userParts.push({ text: turn.userText })
  for (const img of turn.images) userParts.push({ inlineData: { mimeType: img.mimeType, data: img.dataB64 } })
  contents.push({ role: 'user', parts: userParts })

  const allText: string[] = []
  const actions: GachaChatAction[] = []
  let usageIn = 0
  let usageOut = 0

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    if (!st()) break
    st()!.phase = 'thinking'

    const stream = await client.models.generateContentStream({
      model,
      contents,
      config: {
        systemInstruction: turn.systemText,
        tools,
        abortSignal: controller.signal,
        maxOutputTokens: MAX_TOKENS
      }
    })

    let iterText = ''
    let reqIn = 0
    let reqOut = 0
    const calls: { id?: string; name: string; args: Record<string, unknown> }[] = []
    for await (const chunk of stream) {
      const cs = st()
      if (!cs) break
      const t = chunk.text
      if (t) {
        cs.phase = 'writing'
        iterText += t
        cs.partialText = (allText.length ? allText.join('\n\n') + '\n\n' : '') + iterText
      }
      const fcs = chunk.functionCalls
      if (fcs) {
        for (const fc of fcs) {
          if (fc.name) cs.phase = `tool:${fc.name}`
          if (fc.name) calls.push({ id: fc.id, name: fc.name, args: (fc.args as Record<string, unknown>) ?? {} })
        }
      }
      const u = chunk.usageMetadata
      if (u) {
        reqIn = u.promptTokenCount ?? reqIn
        reqOut = u.candidatesTokenCount ?? reqOut
      }
    }
    usageIn += reqIn
    usageOut += reqOut
    if (iterText) allText.push(iterText)

    if (calls.length === 0) break

    // Reconstruct the model turn (text + functionCall parts), then run each tool
    // and feed the results back as a user turn.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelParts: any[] = []
    if (iterText) modelParts.push({ text: iterText })
    for (const c of calls) modelParts.push({ functionCall: { id: c.id, name: c.name, args: c.args } })
    contents.push({ role: 'model', parts: modelParts })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const respParts: any[] = []
    for (const c of calls) {
      const cs = st()
      if (cs) cs.phase = `tool:${c.name}`
      const out = executeCoachTool(game, c.name, c.args)
      if (out.action) {
        actions.push(out.action)
        const cs2 = st()
        if (cs2) cs2.actions = [...actions]
      }
      respParts.push({
        functionResponse: { id: c.id, name: c.name, response: { result: out.result } }
      })
    }
    contents.push({ role: 'user', parts: respParts })
  }

  activeAbort = null
  return { assistantText: allText.join('\n\n'), usageIn, usageOut, actions }
}

// ---- Anthropic / Vertex adapter ----

async function runAnthropicTurn(
  client: Anthropic | AnthropicVertex,
  model: string,
  turn: CoachTurn,
  game: GachaGameId,
  st: () => GachaCoachStatus | null
): Promise<TurnResult> {
  const controller = new AbortController()
  activeAbort = controller
  const system = [{ type: 'text', text: turn.systemText, cache_control: { type: 'ephemeral' } }]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: { role: 'user' | 'assistant'; content: any[] }[] = turn.history.map((h) => ({
    role: h.role,
    content: [{ type: 'text', text: h.text }]
  }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentTurn: any[] = [{ type: 'text', text: turn.contextText }]
  if (turn.userText) currentTurn.push({ type: 'text', text: turn.userText })
  for (const img of turn.images)
    currentTurn.push({ type: 'image', source: { type: 'base64', media_type: img.mimeType, data: img.dataB64 } })
  messages.push({ role: 'user', content: currentTurn })

  const tools = toolDefinitions()
  const modelParams = buildModelParams(model)
  const allText: string[] = []
  const actions: GachaChatAction[] = []
  let usageIn = 0
  let usageOut = 0

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    if (!st()) break
    st()!.phase = 'thinking'

    const stream = client.messages.stream({
      model,
      max_tokens: MAX_TOKENS,
      system,
      tools,
      messages,
      ...modelParams
    } as never)

    let iterText = ''
    for await (const event of stream as AsyncIterable<Record<string, never>>) {
      const cs = st()
      if (!cs) break
      const ev = event as unknown as {
        type: string
        content_block?: { type: string; name?: string }
        delta?: { type: string; text?: string }
      }
      if (ev.type === 'content_block_start' && ev.content_block?.type === 'tool_use') {
        cs.phase = `tool:${ev.content_block.name}`
      } else if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
        cs.phase = 'writing'
        iterText += ev.delta.text ?? ''
        cs.partialText = (allText.length ? allText.join('\n\n') + '\n\n' : '') + iterText
      }
    }

    const msg = await stream.finalMessage()
    usageIn += msg.usage?.input_tokens ?? 0
    usageOut += msg.usage?.output_tokens ?? 0
    const content = msg.content as unknown as Record<string, unknown>[]
    const t = textOf(content)
    if (t) allText.push(t)

    if (msg.stop_reason !== 'tool_use') break

    messages.push({ role: 'assistant', content })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toolResults: any[] = []
    for (const block of content) {
      if (block.type !== 'tool_use') continue
      const cs = st()
      if (cs) cs.phase = `tool:${block.name}`
      const out = executeCoachTool(game, block.name as string, (block.input as Record<string, unknown>) ?? {})
      if (out.action) {
        actions.push(out.action)
        const cs2 = st()
        if (cs2) cs2.actions = [...actions]
      }
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: out.result,
        is_error: out.isError ?? false
      })
    }
    messages.push({ role: 'user', content: toolResults })
  }

  activeAbort = null
  return { assistantText: allText.join('\n\n'), usageIn, usageOut, actions }
}

// ---- import a prior chat (one non-streaming digest call) ----

export async function importDoc(game: GachaGameId, title: string, content: string): Promise<number> {
  const raw = content.slice(0, 200_000)
  const id = coachRepo.createDoc(game, title.trim() || 'Imported chat', raw)
  try {
    const summary = await completeOnce({
      system: 'You condense a chat log about Fate/Grand Order into durable facts for a coach.',
      prompt: `Extract the durable facts from this chat as a short bulleted list (server, roster, goals, spending rules, plans). Skip pleasantries.\n\n${raw}`
    })
    if (summary) coachRepo.setDocSummary(id, summary)
  } catch {
    // Digest is best-effort; the raw doc is kept and the context falls back to it.
  }
  return id
}
