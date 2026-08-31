// Shared one-shot LLM plumbing, extracted from gachaCoach.ts: provider
// selection + client construction (the `coach.*` settings keys are THE
// app-wide LLM settings — no feature gets its own copies) and a
// non-streaming completeOnce() for features that need a single completion
// (gacha chat-import digest, English writing feedback). The coach's
// streaming agentic loops stay in gachaCoach.ts and import the client
// builders from here.

import type { GoogleGenAI } from '@google/genai'
import type Anthropic from '@anthropic-ai/sdk'
import type { AnthropicVertex } from '@anthropic-ai/vertex-sdk'
import { get as getSetting } from './repos/settingsRepo'
import { buildModelParams } from './coachTools'

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash'
const DEFAULT_CLAUDE_MODEL = 'claude-opus-4-8'

export type Provider = 'gemini' | 'anthropic' | 'vertex'

export function resolveProvider(): Provider {
  const p = (getSetting('coach.provider') || 'gemini').trim()
  return p === 'anthropic' || p === 'vertex' ? p : 'gemini'
}

export function coachModel(provider: Provider): string {
  const m = getSetting('coach.model')?.trim()
  if (m) return m
  return provider === 'gemini' ? DEFAULT_GEMINI_MODEL : DEFAULT_CLAUDE_MODEL
}

export async function makeGemini(): Promise<GoogleGenAI> {
  const apiKey = getSetting('gemini.api_key')?.trim()
  if (!apiKey) throw new Error('Add your Gemini API key in Settings to use AI features.')
  const { GoogleGenAI } = await import('@google/genai')
  return new GoogleGenAI({ apiKey })
}

export async function makeAnthropic(provider: Provider): Promise<Anthropic | AnthropicVertex> {
  if (provider === 'anthropic') {
    const apiKey = getSetting('anthropic.api_key')?.trim()
    if (!apiKey) throw new Error('Add your Anthropic API key in Settings to use AI features.')
    const { default: Anthropic } = await import('@anthropic-ai/sdk')
    return new Anthropic({ apiKey })
  }
  const projectId = getSetting('vertex.project_id')?.trim()
  if (!projectId) throw new Error('Set your Google Cloud project id in Settings to use AI features.')
  const credsPath = getSetting('vertex.credentials_path')?.trim()
  if (credsPath) process.env.GOOGLE_APPLICATION_CREDENTIALS = credsPath
  const region = getSetting('vertex.region')?.trim() || 'global'
  const { AnthropicVertex } = await import('@anthropic-ai/vertex-sdk')
  return new AnthropicVertex({ projectId, region })
}

export function friendlyError(e: unknown): string {
  const name = e instanceof Error ? e.name : ''
  if (name === 'AuthenticationError')
    return 'Authentication failed — check your API key / credentials in Settings.'
  if (name === 'PermissionDeniedError')
    return 'Permission denied — is Claude enabled in your Vertex project (Model Garden)?'
  if (name === 'RateLimitError') return 'Rate limited — wait a moment and try again.'
  if (name === 'APIConnectionError')
    return 'Could not reach the model — check your connection.'
  const msg = (e as Error)?.message ?? String(e)
  if (/api[_ ]?key|unauthenticated|permission|invalid.*key|401|403/i.test(msg))
    return 'Authentication failed — check your API key in Settings.'
  if (/quota|rate|429|resource_?exhausted/i.test(msg))
    return "Hit the model's free-tier rate limit — wait a minute and try again."
  return msg
}

export interface CompleteRequest {
  system: string
  prompt: string
  maxTokens?: number // default 1024
}

// One non-streaming completion against the configured provider. Throws raw
// SDK/config errors — callers wrap with friendlyError() where a toast shows.
export async function completeOnce(req: CompleteRequest): Promise<string> {
  const provider = resolveProvider()
  const model = coachModel(provider)
  const maxTokens = req.maxTokens ?? 1024
  if (provider === 'gemini') {
    // temperature 0: a one-shot completion is graded/parsed, not chatted with,
    // and re-grading the same essay twice should not move the rubric. Gemini
    // only — the Anthropic path sets thinking:{type:'adaptive'} via
    // buildModelParams, which requires temperature 1.
    const gemini = await makeGemini()
    const res = await gemini.models.generateContent({
      model,
      contents: req.prompt,
      config: { systemInstruction: req.system, maxOutputTokens: maxTokens, temperature: 0 }
    })
    return (res.text ?? '').trim()
  }
  const anthropic = await makeAnthropic(provider)
  const res = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    ...buildModelParams(model),
    system: req.system,
    messages: [{ role: 'user', content: req.prompt }]
  } as never)
  return (res.content as { type: string; text?: string }[])
    .filter((b) => b.type === 'text')
    .map((b) => b.text ?? '')
    .join('')
    .trim()
}
