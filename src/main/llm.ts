// Shared one-shot LLM plumbing, extracted from gachaCoach.ts: provider
// selection + client construction (the `coach.*` settings keys are THE
// app-wide LLM settings — no feature gets its own copies) and a
// non-streaming completeOnce() for features that need a single completion
// (gacha chat-import digest, English writing feedback). The coach's
// streaming agentic loops stay in gachaCoach.ts and import the client
// builders from here.

import { GoogleGenAI } from '@google/genai'
import Anthropic from '@anthropic-ai/sdk'
import { AnthropicVertex } from '@anthropic-ai/vertex-sdk'
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

export function makeGemini(): GoogleGenAI {
  const apiKey = getSetting('gemini.api_key')?.trim()
  if (!apiKey) throw new Error('Add your Gemini API key in Settings to use AI features.')
  return new GoogleGenAI({ apiKey })
}

export function makeAnthropic(provider: Provider): Anthropic | AnthropicVertex {
  if (provider === 'anthropic') {
    const apiKey = getSetting('anthropic.api_key')?.trim()
    if (!apiKey) throw new Error('Add your Anthropic API key in Settings to use AI features.')
    return new Anthropic({ apiKey })
  }
  const projectId = getSetting('vertex.project_id')?.trim()
  if (!projectId) throw new Error('Set your Google Cloud project id in Settings to use AI features.')
  const credsPath = getSetting('vertex.credentials_path')?.trim()
  if (credsPath) process.env.GOOGLE_APPLICATION_CREDENTIALS = credsPath
  const region = getSetting('vertex.region')?.trim() || 'global'
  return new AnthropicVertex({ projectId, region })
}

export function friendlyError(e: unknown): string {
  if (e instanceof Anthropic.AuthenticationError)
    return 'Authentication failed — check your API key / credentials in Settings.'
  if (e instanceof Anthropic.PermissionDeniedError)
    return 'Permission denied — is Claude enabled in your Vertex project (Model Garden)?'
  if (e instanceof Anthropic.RateLimitError) return 'Rate limited — wait a moment and try again.'
  if (e instanceof Anthropic.APIConnectionError)
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
    const res = await makeGemini().models.generateContent({
      model,
      contents: req.prompt,
      config: { systemInstruction: req.system, maxOutputTokens: maxTokens }
    })
    return (res.text ?? '').trim()
  }
  const res = await makeAnthropic(provider).messages.create({
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
