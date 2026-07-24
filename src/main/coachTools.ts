// Pure coach logic: tool definitions + executor, the context-block builder, the
// model-param rules, and reply-block filtering. No SDK / network import here so
// the whole surface is unit-testable (tests mock db/connection only). The
// streaming runner that calls the LLM lives in gachaCoach.ts.

import * as gachaRepo from './repos/gachaRepo'
import * as coachRepo from './repos/coachRepo'
import { gachaGame } from '@shared/gacha'
import type { GachaChatAction, GachaGameId } from '@shared/types'

// ---- model params ----

// opus-4-8 / sonnet-5 take adaptive thinking; haiku-4-5 doesn't support it.
// NEVER temperature/top_p — they 400 on every current model.
export function buildModelParams(model: string): Record<string, unknown> {
  if (model.startsWith('claude-haiku')) return {}
  return { thinking: { type: 'adaptive' } }
}

// ---- FGO dupes vocabulary ----
// gacha_unit.dupes is 0-based copies-consumed. FGO servants speak "NP level"
// (1-5 → dupes 0-4); craft essences speak "limit break" (0-4, already 0-based).
export function npLevelToDupes(np: number): number {
  return Math.max(0, Math.min(4, Math.round(np) - 1))
}
export function dupesToNpLevel(dupes: number): number {
  return Math.max(1, Math.min(5, Math.round(dupes) + 1))
}

// ---- reply-block filtering ----
// The row we persist for replay keeps only thinking/text blocks from the final
// assistant message — a trailing unexecuted tool_use (max-iterations bail) would
// orphan and 400 the next turn. Empty result → a '(done)' text block so the row
// renders and a cache breakpoint can sit on text.
export function persistableAssistantBlocks(content: unknown[]): unknown[] {
  const kept = (content ?? []).filter((b) => {
    const t = (b as { type?: string })?.type
    return t === 'text' || t === 'thinking' || t === 'redacted_thinking'
  })
  if (!kept.some((b) => (b as { type?: string }).type === 'text')) {
    kept.push({ type: 'text', text: '(done)' })
  }
  return kept
}

// The display text of an assistant message = concatenation of its text blocks.
export function textOf(content: unknown[]): string {
  return (content ?? [])
    .filter((b) => (b as { type?: string })?.type === 'text')
    .map((b) => (b as { text?: string }).text ?? '')
    .join('')
    .trim()
}

// ---- context block ----
// All volatile ground truth for the current turn, capped so 100+ rosters stay
// affordable. Prepended to the CURRENT user turn only (never persisted, never
// in the cached system prefix).

const CAP_SERVANTS = 200
const CAP_CES = 40
const CAP_BANNERS = 15
const CAP_GOALS = 40
const CAP_NOTES = 25
const CAP_NEWS = 10

export interface CoachContextSnapshot {
  today: string // 'YYYY-MM-DD'
  weekday: string // 'Monday'…
  units: {
    id: number
    kind: string
    name: string
    rarity: number | null
    element: string | null
    dupes: number
    level: number | null
    favorite: boolean
  }[]
  currencies: { key: string; amount: number }[]
  banners: { name: string; kind: string | null; startAt: string | null; endAt: string | null }[]
  goals: {
    kind: string
    title: string
    status: string
    dueAt: string | null
    recur: string | null
  }[]
  notes: { content: string }[]
  docs: { title: string; summary: string | null; content: string }[]
  news: { title: string; fetchedAt: string | null }
}

export function buildContextBlock(s: CoachContextSnapshot, cfg = gachaGame('fgo')): string {
  const kindLabel = (key: string): string =>
    cfg?.unitKinds.find((k) => k.key === key)?.label ?? key
  const lines: string[] = []
  lines.push(`<context>`)
  lines.push(`Today: ${s.today} (${s.weekday}).`)

  const servants = s.units.filter((u) => u.kind === 'servant')
  const ces = s.units.filter((u) => u.kind !== 'servant')

  lines.push('', `## Roster — servants (${servants.length})`)
  for (const u of servants.slice(0, CAP_SERVANTS)) {
    const bits = [
      u.name,
      `id ${u.id}`,
      u.rarity ? `${u.rarity}*` : null,
      u.element,
      `NP${dupesToNpLevel(u.dupes)}`,
      u.level != null ? `lvl ${u.level}` : null,
      u.favorite ? 'fav' : null
    ].filter(Boolean)
    lines.push(`- ${bits.join(' | ')}`)
  }
  if (servants.length > CAP_SERVANTS)
    lines.push(`- +${servants.length - CAP_SERVANTS} more — use get_roster`)

  // CEs: favorites + 5★ only (the ones worth advising on), capped.
  const notableCes = ces.filter((c) => c.favorite || (c.rarity ?? 0) >= 5)
  lines.push('', `## Roster — craft essences (${ces.length} total, ${notableCes.length} notable)`)
  for (const c of notableCes.slice(0, CAP_CES)) {
    const bits = [c.name, `id ${c.id}`, c.rarity ? `${c.rarity}*` : null, `LB${c.dupes}`].filter(
      Boolean
    )
    lines.push(`- ${bits.join(' | ')}`)
  }
  if (ces.length > notableCes.length)
    lines.push(`- +${ces.length - notableCes.length} more craft essences — use get_roster`)

  lines.push('', '## Currencies')
  for (const c of s.currencies) lines.push(`- ${c.key}: ${c.amount}`)

  lines.push('', '## Banners')
  for (const b of s.banners.slice(0, CAP_BANNERS)) {
    lines.push(
      `- ${b.name}${b.kind ? ` (${b.kind})` : ''}: ${b.startAt ?? 'TBA'} → ${b.endAt ?? 'open'}`
    )
  }

  lines.push('', '## Goals & tasks')
  for (const g of s.goals.slice(0, CAP_GOALS)) {
    const overdue = g.dueAt && g.dueAt < s.today ? '[OVERDUE] ' : ''
    const today = g.dueAt === s.today ? '[DUE TODAY] ' : ''
    const due = g.dueAt ? ` (due ${g.dueAt}${g.recur ? `, ${g.recur}` : ''})` : ''
    lines.push(`- ${overdue}${today}${g.kind}: ${g.title}${due}`)
  }

  if (s.notes.length) {
    lines.push('', '## Coach memory (things you noted about this player)')
    for (const n of s.notes.slice(0, CAP_NOTES)) lines.push(`- ${n.content}`)
  }

  if (s.docs.length) {
    lines.push('', '## Imported chats (summaries)')
    for (const d of s.docs.slice(0, 3)) {
      const body = d.summary?.trim() || d.content.slice(0, 1500)
      lines.push(`### ${d.title}`, body)
    }
  }

  if (s.news.title) {
    lines.push('', `## ${kindLabel('servant')} news — cached headlines${s.news.fetchedAt ? ` (fetched ${s.news.fetchedAt.slice(0, 10)})` : ''}`)
  }

  lines.push('</context>')
  return lines.join('\n')
}

// Gathers the live snapshot from the repos (IO, but no network — safe to call
// on every send).
export function gatherSnapshot(game: GachaGameId, today: string, weekday: string): CoachContextSnapshot {
  // Owned-only: catalog games seed thousands of unowned rows that would swamp
  // the context caps and mislead the coach about the player's actual box.
  const units = gachaRepo.listUnits(game, { ownedOnly: true }).map((u) => ({
    id: u.id,
    kind: u.kind,
    name: u.name,
    rarity: u.rarity,
    element: u.element,
    dupes: u.dupes,
    level: u.level,
    favorite: u.favorite
  }))
  const news = gachaRepo.listNews(game, CAP_NEWS)
  return {
    today,
    weekday,
    units,
    currencies: gachaRepo.listCurrencies(game).map((c) => ({ key: c.key, amount: c.amount })),
    banners: gachaRepo
      .listBanners(game)
      .map((b) => ({ name: b.name, kind: b.kind, startAt: b.startAt, endAt: b.endAt })),
    goals: coachRepo.listGoals(game).map((g) => ({
      kind: g.kind,
      title: g.title,
      status: g.status,
      dueAt: g.dueAt,
      recur: g.recur
    })),
    notes: coachRepo.listNotes(game).map((n) => ({ content: n.content })),
    docs: coachRepo.listDocs(game).map((d) => ({ title: d.title, summary: d.summary, content: d.content })),
    news: { title: news.items[0]?.title ?? '', fetchedAt: news.fetchedAt }
  }
}

// ---- tools ----
// Each tool: an Anthropic tool definition + a synchronous `run(game, input)` that
// touches only local repos and returns a compact JSON string. Mutators also
// return an `action` chip for the UI. NO delete tools for roster/banners (the
// user removes those in the normal UI).

export interface CoachTool {
  name: string
  description: string
  input_schema: Record<string, unknown>
  run: (game: GachaGameId, input: Record<string, unknown>) => { result: string; action?: GachaChatAction }
}

const stars = (n: number | null | undefined): string => (n ? `${n}★` : '')

function findUnit(
  game: GachaGameId,
  input: Record<string, unknown>
): { id: number } | { error: string } {
  if (typeof input.id === 'number') return { id: input.id }
  const name = String(input.name ?? '').trim()
  if (!name) return { error: 'Provide an id or name.' }
  const owned = gachaRepo
    .listUnits(game, { search: name, ownedOnly: true })
    .filter((u) => u.name.toLowerCase() === name.toLowerCase())
  if (owned.length === 1) return { id: owned[0].id }
  if (owned.length > 1)
    return { error: `Ambiguous "${name}" — ids ${owned.map((m) => m.id).join(', ')}. Use id.` }
  // Zero owned: a catalog row with this name exists but isn't owned — steer the
  // model to add_unit (which flips ownership) instead of editing a catalog row.
  const anyMatch = gachaRepo
    .listUnits(game, { search: name })
    .some((u) => u.name.toLowerCase() === name.toLowerCase())
  if (anyMatch) return { error: `"${name}" is in the catalog but not owned — use add_unit to add it.` }
  return { error: `No unit named "${name}".` }
}

export const COACH_TOOLS: CoachTool[] = [
  {
    name: 'get_roster',
    description:
      "List the player's owned servants and craft essences with their ids, rarity, class, NP level and ascension level. Call this before adding or updating a unit.",
    input_schema: {
      type: 'object',
      properties: {
        kind: { type: 'string', enum: ['servant', 'craftEssence'], description: 'Filter to one kind.' },
        search: { type: 'string', description: 'Name substring filter.' }
      }
    },
    run: (game, input) => {
      // Owned-only: the coach reasons about the player's box, not the catalog.
      const filter: { kind?: string; search?: string; ownedOnly: boolean } = { ownedOnly: true }
      if (input.kind) filter.kind = String(input.kind)
      if (input.search) filter.search = String(input.search)
      const rows = gachaRepo.listUnits(game, filter).map((u) => ({
        id: u.id,
        kind: u.kind,
        name: u.name,
        rarity: u.rarity,
        class: u.element,
        npLevel: u.kind === 'servant' ? dupesToNpLevel(u.dupes) : undefined,
        limitBreak: u.kind !== 'servant' ? u.dupes : undefined,
        level: u.level,
        favorite: u.favorite
      }))
      return { result: JSON.stringify(rows) }
    }
  },
  {
    name: 'add_unit',
    description:
      'Add a servant or craft essence to the roster. If one with the same name already exists it is updated instead. For servants pass np_level (1-5); for craft essences pass limit_break (0-4).',
    input_schema: {
      type: 'object',
      properties: {
        kind: { type: 'string', enum: ['servant', 'craftEssence'] },
        name: { type: 'string' },
        rarity: { type: 'integer', minimum: 1, maximum: 5 },
        class: { type: 'string', description: 'Servant class (Saber, Caster, …). Servants only.' },
        np_level: { type: 'integer', minimum: 1, maximum: 5 },
        limit_break: { type: 'integer', minimum: 0, maximum: 4 },
        level: { type: 'integer' },
        notes: { type: 'string' }
      },
      required: ['kind', 'name']
    },
    run: (game, input) => {
      const kind = String(input.kind)
      const name = String(input.name).trim()
      const dupes =
        kind === 'servant'
          ? input.np_level != null
            ? npLevelToDupes(Number(input.np_level))
            : 0
          : input.limit_break != null
            ? Math.max(0, Math.min(4, Number(input.limit_break)))
            : 0
      const rarity = input.rarity != null ? Number(input.rarity) : null
      const element = kind === 'servant' && input.class ? String(input.class) : null
      const level = input.level != null ? Number(input.level) : null
      const notes = input.notes != null ? String(input.notes) : null

      // Existing row (owned OR an unowned catalog entry) → own it and fill
      // personal fields. NEVER overwrite a catalog row's canonical name/rarity/
      // class (Atlas is authoritative); for a manual row, set them only when
      // provided so a bare add can't null them out.
      const existing = gachaRepo
        .listUnits(game, { kind, search: name })
        .find((u) => u.name.toLowerCase() === name.toLowerCase())
      if (existing) {
        const patch: Record<string, unknown> = { owned: true, dupes }
        if (level != null) patch.level = level
        if (notes != null) patch.notes = notes
        if (!existing.externalSource) {
          if (rarity != null) patch.rarity = rarity
          if (element != null) patch.element = element
        }
        gachaRepo.updateUnit(existing.id, patch)
        const verb = existing.owned ? 'Updated' : 'Added'
        const label =
          `${verb} ${existing.name} — ${stars(existing.rarity ?? rarity)} ${existing.element ?? element ?? kindNoun(kind)}`.trim()
        return {
          result: JSON.stringify({ id: existing.id, owned: true }),
          action: { tool: 'add_unit', label }
        }
      }
      const id = gachaRepo.createUnit({ game, kind, name, rarity, element, dupes, level, notes })
      const label = `Added ${name} — ${stars(rarity)} ${element ?? kindNoun(kind)}`.trim()
      return { result: JSON.stringify({ id, created: true }), action: { tool: 'add_unit', label } }
    }
  },
  {
    name: 'update_unit',
    description:
      'Update a unit already in the roster, by id (preferred) or exact name. Same fields as add_unit.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        rarity: { type: 'integer', minimum: 1, maximum: 5 },
        class: { type: 'string' },
        np_level: { type: 'integer', minimum: 1, maximum: 5 },
        limit_break: { type: 'integer', minimum: 0, maximum: 4 },
        level: { type: 'integer' },
        favorite: { type: 'boolean' },
        notes: { type: 'string' }
      }
    },
    run: (game, input) => {
      const found = findUnit(game, input)
      if ('error' in found) return { result: JSON.stringify({ error: found.error }) }
      const patch: Record<string, unknown> = {}
      if (input.rarity != null) patch.rarity = Number(input.rarity)
      if (input.class != null) patch.element = String(input.class)
      if (input.np_level != null) patch.dupes = npLevelToDupes(Number(input.np_level))
      else if (input.limit_break != null) patch.dupes = Math.max(0, Math.min(4, Number(input.limit_break)))
      if (input.level != null) patch.level = Number(input.level)
      if (input.favorite != null) patch.favorite = Boolean(input.favorite)
      if (input.notes != null) patch.notes = String(input.notes)
      gachaRepo.updateUnit(found.id, patch)
      const unit = gachaRepo.getUnit(found.id)
      return {
        result: JSON.stringify({ id: found.id, updated: true }),
        action: { tool: 'update_unit', label: `Updated ${unit?.name ?? `#${found.id}`}` }
      }
    }
  },
  {
    name: 'get_currencies',
    description: 'Get the current premium-currency amounts (Saint Quartz, tickets, apples).',
    input_schema: { type: 'object', properties: {} },
    run: (game) => ({ result: JSON.stringify(gachaRepo.listCurrencies(game)) })
  },
  {
    name: 'set_currency',
    description: 'Set a currency amount. key is one of the game currency keys (quartz, tickets, apples).',
    input_schema: {
      type: 'object',
      properties: { key: { type: 'string' }, amount: { type: 'integer', minimum: 0 } },
      required: ['key', 'amount']
    },
    run: (game, input) => {
      const key = String(input.key)
      const amount = Math.max(0, Number(input.amount))
      gachaRepo.setCurrency(game, key, amount)
      const label = `Set ${currencyLabel(game, key)} → ${amount}`
      return { result: JSON.stringify({ ok: true }), action: { tool: 'set_currency', label } }
    }
  },
  {
    name: 'list_banners',
    description: 'List the saved banner schedule (upcoming and past).',
    input_schema: { type: 'object', properties: {} },
    run: (game) => ({
      result: JSON.stringify(
        gachaRepo.listBanners(game).map((b) => ({
          id: b.id,
          name: b.name,
          kind: b.kind,
          featured: b.featured,
          startAt: b.startAt,
          endAt: b.endAt
        }))
      )
    })
  },
  {
    name: 'add_banner',
    description: 'Add a banner to the schedule. Dates are YYYY-MM-DD.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        kind: { type: 'string' },
        featured: { type: 'string' },
        start_at: { type: 'string' },
        end_at: { type: 'string' },
        notes: { type: 'string' }
      },
      required: ['name']
    },
    run: (game, input) => {
      const id = gachaRepo.createBanner({
        game,
        name: String(input.name),
        kind: input.kind != null ? String(input.kind) : null,
        featured: input.featured != null ? String(input.featured) : null,
        startAt: input.start_at != null ? String(input.start_at) : null,
        endAt: input.end_at != null ? String(input.end_at) : null,
        notes: input.notes != null ? String(input.notes) : null
      })
      return {
        result: JSON.stringify({ id }),
        action: { tool: 'add_banner', label: `Added banner: ${input.name}` }
      }
    }
  },
  {
    name: 'update_banner',
    description: 'Update a saved banner by id.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        kind: { type: 'string' },
        featured: { type: 'string' },
        start_at: { type: 'string' },
        end_at: { type: 'string' },
        notes: { type: 'string' }
      },
      required: ['id']
    },
    run: (game, input) => {
      void game
      const patch: Record<string, unknown> = {}
      if (input.name != null) patch.name = String(input.name)
      if (input.kind != null) patch.kind = String(input.kind)
      if (input.featured != null) patch.featured = String(input.featured)
      if (input.start_at != null) patch.startAt = String(input.start_at)
      if (input.end_at != null) patch.endAt = String(input.end_at)
      if (input.notes != null) patch.notes = String(input.notes)
      gachaRepo.updateBanner(Number(input.id), patch)
      return {
        result: JSON.stringify({ ok: true }),
        action: { tool: 'update_banner', label: `Updated banner #${input.id}` }
      }
    }
  },
  {
    name: 'list_goals',
    description: 'List the active goals and recurring tasks.',
    input_schema: { type: 'object', properties: {} },
    run: (game) => ({
      result: JSON.stringify(
        coachRepo.listGoals(game).map((g) => ({
          id: g.id,
          kind: g.kind,
          title: g.title,
          dueAt: g.dueAt,
          recur: g.recur
        }))
      )
    })
  },
  {
    name: 'add_goal',
    description:
      'Add a goal or a recurring task. kind "task" + recur "daily"/"weekly" makes a reminder that reappears when completed. due_at is YYYY-MM-DD.',
    input_schema: {
      type: 'object',
      properties: {
        kind: { type: 'string', enum: ['goal', 'task'] },
        title: { type: 'string' },
        notes: { type: 'string' },
        due_at: { type: 'string' },
        recur: { type: 'string', enum: ['daily', 'weekly'] }
      },
      required: ['title']
    },
    run: (game, input) => {
      const kind = (input.kind === 'task' ? 'task' : 'goal') as 'goal' | 'task'
      const id = coachRepo.createGoal(game, {
        kind,
        title: String(input.title),
        notes: input.notes != null ? String(input.notes) : null,
        dueAt: input.due_at != null ? String(input.due_at) : null,
        recur: (input.recur as 'daily' | 'weekly') ?? null,
        createdBy: 'coach'
      })
      return {
        result: JSON.stringify({ id }),
        action: { tool: 'add_goal', label: `Added ${kind}: ${input.title}` }
      }
    }
  },
  {
    name: 'update_goal',
    description: 'Update a goal/task by id (title, notes, due_at, recur).',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        notes: { type: 'string' },
        due_at: { type: 'string' },
        recur: { type: 'string', enum: ['daily', 'weekly'] }
      },
      required: ['id']
    },
    run: (game, input) => {
      void game
      const patch: Record<string, unknown> = {}
      if (input.title != null) patch.title = String(input.title)
      if (input.notes != null) patch.notes = String(input.notes)
      if (input.due_at != null) patch.dueAt = String(input.due_at)
      if (input.recur != null) patch.recur = String(input.recur)
      coachRepo.updateGoal(Number(input.id), patch)
      return { result: JSON.stringify({ ok: true }), action: { tool: 'update_goal', label: `Updated goal #${input.id}` } }
    }
  },
  {
    name: 'complete_goal',
    description:
      'Mark a goal/task done. A recurring task rolls its due date forward instead of closing.',
    input_schema: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
    run: (game, input) => {
      void game
      coachRepo.completeGoal(Number(input.id), todayLocal())
      return { result: JSON.stringify({ ok: true }), action: { tool: 'complete_goal', label: `Completed #${input.id}` } }
    }
  },
  {
    name: 'drop_goal',
    description: 'Drop (abandon) a goal/task by id.',
    input_schema: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
    run: (game, input) => {
      void game
      coachRepo.dropGoal(Number(input.id))
      return { result: JSON.stringify({ ok: true }), action: { tool: 'drop_goal', label: `Dropped #${input.id}` } }
    }
  },
  {
    name: 'save_note',
    description:
      "Save a durable fact about this player to your memory (server NA/JP, spending rules, playstyle, favorite servants). Shown to you in every future turn.",
    input_schema: {
      type: 'object',
      properties: { content: { type: 'string' } },
      required: ['content']
    },
    run: (game, input) => {
      const id = coachRepo.createNote(game, String(input.content), 'coach')
      return {
        result: JSON.stringify({ id }),
        action: { tool: 'save_note', label: `Noted: ${String(input.content).slice(0, 40)}` }
      }
    }
  },
  {
    name: 'delete_note',
    description: 'Delete one of your memory notes by id (list ids appear in your context).',
    input_schema: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
    run: (game, input) => {
      void game
      coachRepo.removeNote(Number(input.id))
      return { result: JSON.stringify({ ok: true }), action: { tool: 'delete_note', label: `Deleted note #${input.id}` } }
    }
  },
  {
    name: 'get_news',
    description:
      "Read the cached subreddit headlines (never fetches — the player refreshes news with a button in the News tab).",
    input_schema: { type: 'object', properties: {} },
    run: (game) => {
      const page = gachaRepo.listNews(game, 15)
      return {
        result: JSON.stringify({
          fetchedAt: page.fetchedAt,
          items: page.items.map((n) => ({ title: n.title, url: n.url, author: n.author }))
        })
      }
    }
  }
]

const TOOLS_BY_NAME = new Map(COACH_TOOLS.map((t) => [t.name, t]))

// Execute one tool call. Never throws — a bad call returns an error string the
// model can read and recover from.
export function executeCoachTool(
  game: GachaGameId,
  name: string,
  input: Record<string, unknown>
): { result: string; isError?: boolean; action?: GachaChatAction } {
  const tool = TOOLS_BY_NAME.get(name)
  if (!tool) return { result: `Unknown tool: ${name}`, isError: true }
  try {
    return tool.run(game, input ?? {})
  } catch (e) {
    return { result: `Tool ${name} failed: ${(e as Error).message}`, isError: true }
  }
}

// The Anthropic `tools` array (schema only — run fns stay server-side).
export function toolDefinitions(): { name: string; description: string; input_schema: Record<string, unknown> }[] {
  return COACH_TOOLS.map((t) => ({ name: t.name, description: t.description, input_schema: t.input_schema }))
}

// Gemini function declarations — the same JSON Schemas via parametersJsonSchema.
export function geminiToolDeclarations(): {
  name: string
  description: string
  parametersJsonSchema: Record<string, unknown>
}[] {
  return COACH_TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    parametersJsonSchema: t.input_schema
  }))
}

// ---- small helpers ----

function kindNoun(kind: string): string {
  return kind === 'servant' ? 'Servant' : 'CE'
}
function currencyLabel(game: GachaGameId, key: string): string {
  return gachaGame(game)?.currencies.find((c) => c.key === key)?.label ?? key
}
function todayLocal(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}
