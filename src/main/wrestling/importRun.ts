// The wiki import runner. The bulkImport.ts singleton verbatim: a module-level
// status object polled through wrestling:importStatus (there is no push
// channel), fire-and-forget start, cancel via a flag, and a consecutive-failure
// bail with a resume hint.
//
// Deliberately NOT withActivity: the run needs a cancel button and a readable
// done state, and withActivity's shared slot clears on completion. It calls
// beginActivity/endActivity around its own loop instead, which is what arms
// progress.ts so each batch's poster downloads reach the Topbar pill.
//
// No before-quit hook is needed: every event is its own transaction, so
// quitting mid-run leaves a consistent DB and re-running resumes.

import { downloadImages } from '../files'
import { beginActivity, endActivity, updateActivity } from '../progress'
import * as tasks from '../tasks'
import type { TaskHandle } from '../tasks'
import { cooperativeGate, type PauseGate } from '../taskControls'
import { runWithActivitySignal } from '../activityContext'
import { sleep } from '../http'
import * as repo from '../repos/wrestlingRepo'
import * as wiki from './wikipedia'
import {
  classifyArticle,
  extractChampionship,
  extractLead,
  findEventInfobox,
  parseCardSlot,
  parseDuration,
  parseInfoboxDate,
  parseIntLoose,
  parseResultCell,
  parseResultsCard,
  parseHonours,
  parseWrestlerArticle,
  stripMarkup
} from './wikitext'
import { WRESTLING_PROMOTIONS, promotionCfg, type WrestlingPromotionCfg } from '@shared/wrestling'
import type { WrestlingImportStatus, WrestlingPromotionId } from '@shared/types'

const MAX_CONSECUTIVE_FAILURES = 10
const BATCH = wiki.TITLES_PER_REQUEST

let status: WrestlingImportStatus = {
  id: 0,
  state: 'idle',
  phase: 'enumerating',
  promotion: null,
  done: 0,
  total: 0,
  events: 0,
  matches: 0,
  wrestlers: 0,
  failed: 0,
  message: null
}
// Cooperative pause/cancel. Pause means "stop starting new articles" — the
// current fetch finishes first, so the registry shows 'pausing' until wait()
// actually blocks.
let gate: PauseGate | null = null

export function getStatus(): WrestlingImportStatus {
  return { ...status }
}

export function cancel(): void {
  if (status.state === 'running') gate?.controls.cancel?.()
}

// Turns one article's wikitext into the rows the repo wants. Pure apart from
// the poster path it is handed — everything it needs from the network already
// happened.
export function buildEvent(
  promotion: WrestlingPromotionId,
  title: string,
  wikitext: string,
  posterPath: string | null
): repo.SaveEvent | null {
  if (classifyArticle(wikitext) !== 'event') return null
  const box = findEventInfobox(wikitext)
  const params = box?.params ?? new Map<string, string>()

  const matches = parseResultsCard(wikitext).map((raw, i) => {
    const parsed = parseResultCell(raw.match)
    return {
      sortOrder: i,
      title: parsed.title,
      resultText: stripMarkup(raw.match) || null,
      stipulation: raw.stip ? stripMarkup(raw.stip) || null : null,
      championship: extractChampionship(raw.stip),
      durationSeconds: parseDuration(raw.time),
      outcome: parsed.outcome,
      method: parsed.method,
      cardSlot: parseCardSlot(raw.note),
      cardLabel: raw.card,
      participants: parsed.participants.map((p) => ({
        wikiTitle: p.link?.target ?? null,
        name: p.name,
        side: p.side,
        won: p.won,
        isChampion: p.isChampion,
        teamName: p.teamName
      }))
    }
  })

  return {
    promotion,
    // The infobox name is the display name ("WrestleMania X-Seven"); the
    // article title can carry a disambiguator ("Starrcade (1997)").
    name: stripMarkup(params.get('name') ?? '') || title,
    wikiTitle: title,
    // The infobox's `event` param is the SERIES ("[[WrestleMania]]",
    // "[[Starrcade]]"), which is what drives the series chronology on the event
    // page. Wikipedia's own lastevent2/nextevent2 links are deliberately NOT
    // used: they point at article titles that may not be imported, whereas
    // ordering by date within a series only ever names events we hold.
    series: stripMarkup(params.get('event') ?? '') || null,
    eventDate: parseInfoboxDate(params.get('date')),
    venue: stripMarkup(params.get('venue') ?? '') || null,
    city: stripMarkup(params.get('city') ?? '') || null,
    attendance: parseIntLoose(params.get('attendance')),
    buyrate: stripMarkup(params.get('buyrate') ?? '') || null,
    tagline: stripMarkup(params.get('tagline') ?? '') || null,
    posterPath,
    lead: extractLead(wikitext) || null,
    matches
  }
}

// The infobox's own |image= filename. Posters must be resolved this way rather
// than through prop=pageimages, which returns nothing at all for event
// articles because their posters are non-free.
export function eventImageName(wikitext: string): string | null {
  const raw = findEventInfobox(wikitext)?.params.get('image')
  if (!raw) return null
  const name = stripMarkup(raw).trim()
  return name && /\.(jpg|jpeg|png|gif|webp)$/i.test(name) ? name : null
}

export interface ImportDeps {
  enumerateEvents?: (cfg: WrestlingPromotionCfg) => Promise<string[]>
  fetchPages?: (titles: string[]) => Promise<wiki.FetchPagesResult>
  resolveFiles?: (fileNames: string[]) => Promise<Map<string, string>>
  resolveTitles?: (titles: string[]) => Promise<Map<string, string>>
  pageImages?: (titles: string[]) => Promise<Map<string, string>>
  downloadImages?: (urls: (string | null | undefined)[]) => Promise<Map<string, string | null>>
  delayMs?: number
}

export interface StartOptions {
  promotions?: WrestlingPromotionId[]
  // false skips the wrestler-detail pass (photos/bios). On by default: without
  // it every wrestler page renders an empty placeholder.
  withWrestlers?: boolean
  // false (default) skips events already in the DB, so a re-run resumes;
  // true re-fetches them to pick up article edits.
  refresh?: boolean
}

// Returns immediately; the renderer follows along via wrestling:importStatus.
export function start(opts: StartOptions = {}, deps: ImportDeps = {}): WrestlingImportStatus {
  if (status.state === 'running') throw new Error('A wiki import is already running.')

  // From the config, never a second hardcoded copy — adding a promotion there
  // is supposed to be the ONLY step.
  const ids = opts.promotions?.length
    ? opts.promotions
    : WRESTLING_PROMOTIONS.map((p) => p.id)
  const cfgs = ids.map(promotionCfg).filter((c): c is WrestlingPromotionCfg => !!c)
  if (!cfgs.length) throw new Error('No known promotions selected.')

  const id = status.id + 1
  // The gate replaces the old cancelRequested flag; a fresh one per run means
  // no reset is needed here.
  status = {
    id,
    state: 'running',
    phase: 'enumerating',
    promotion: null,
    done: 0,
    total: 0,
    events: 0,
    matches: 0,
    wrestlers: 0,
    failed: 0,
    message: null
  }

  const enumerate = deps.enumerateEvents ?? wiki.enumerateEvents
  const fetchPages = deps.fetchPages ?? wiki.fetchPages
  const resolveFiles = deps.resolveFiles ?? wiki.resolveFiles
  const resolveTitles = deps.resolveTitles ?? wiki.resolveTitles
  const download = deps.downloadImages ?? downloadImages
  const pageImages = deps.pageImages ?? wiki.pageImages
  const delay = deps.delayMs ?? 0

  // ONE task for the whole crawl — attachTo below keeps the nested per-article
  // activity from minting a row per event.
  // The gate reports 'paused' itself the moment it really blocks, which turns
  // the row from 'pausing' into 'paused'.
  let handle: TaskHandle
  const runGate = cooperativeGate(
    () => handle.progress({ state: 'paused' }),
    () => handle.progress({ state: 'running' })
  )
  gate = runGate
  const task = tasks.create({
    kind: 'wrestlingImport',
    label: 'Wrestling wiki import',
    route: '/wrestling',
    controls: runGate.controls,
    project: () =>
      status.id === id
        ? { detail: status.message ?? status.phase, done: status.done, total: status.total }
        : null
  })
  handle = task

  void runWithActivitySignal(runGate.signal, async () => {
    const slot = beginActivity('Wrestling wiki import', { attachTo: task })
    try {
      let consecutiveFailures = 0

      for (const cfg of cfgs) {
        // Guarded await — see bulkImport for why it is not unconditional.
        if (runGate.paused) await runGate.wait()
        if (status.id !== id) return
        if (runGate.cancelled) {
          status = { ...status, state: 'cancelled' }
          return
        }
        status = { ...status, promotion: cfg.id, phase: 'enumerating', message: cfg.short }

        let titles = await enumerate(cfg)
        if (!opts.refresh) titles = titles.filter((t) => !repo.eventExists(t))
        status = { ...status, phase: 'fetching', total: status.total + titles.length }

        // No series-hub expansion: the by-year categories already list the
        // individual events (All Out (2019) is a member, not just AEW All Out),
        // so following a hub's wikilinks only queued wrestlers, cities and
        // championships — hundreds of full-wikitext fetches for nothing, and a
        // progress total that meant nothing. A hub that turns up in the crawl
        // simply classifies as 'series' and is skipped.
        const queue = [...titles]

        while (queue.length > 0) {
          // Guarded await — see bulkImport for why it is not unconditional.
        if (runGate.paused) await runGate.wait()
          if (status.id !== id) return
          if (runGate.cancelled) {
            status = { ...status, state: 'cancelled' }
            return
          }

          const batch = queue.splice(0, BATCH)
          let result: wiki.FetchPagesResult
          try {
            result = await fetchPages(batch)
            consecutiveFailures = 0
          } catch {
            status = { ...status, failed: status.failed + batch.length, done: status.done + batch.length }
            consecutiveFailures++
            if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
              status = {
                ...status,
                state: 'error',
                message:
                  'Wikipedia stopped responding. Everything imported so far is kept — run the import again later to resume where it left off.'
              }
              return
            }
            continue
          }

          const events = result.pages.filter((p) => classifyArticle(p.wikitext) === 'event')

          // Redirects followed on the way in are recorded straight away, so the
          // resume filter recognizes a redirect-titled category member next run
          // instead of re-fetching it forever.
          try {
            repo.recordAliases(result.aliases)
          } catch {
            // Alias bookkeeping is an optimization, never a reason to fail.
          }

          // Posters: article -> infobox filename -> URL -> one downloadImages
          // batch per page batch (the two-phase-atomic contract, applied per
          // batch so a 2,000-article crawl stays interruptible).
          const fileOf = new Map<string, string>()
          for (const e of events) {
            const name = eventImageName(e.wikitext)
            if (name) fileOf.set(e.title, `File:${name}`)
          }
          let posters = new Map<string, string | null>()
          let urls = new Map<string, string>()
          try {
            urls = await resolveFiles([...fileOf.values()])
            posters = await download([...urls.values()])
          } catch {
            // A poster miss must never fail an event (openlibrary's
            // best-effort sub-fetch posture).
          }

          // Resolve the CARD's wrestler links before writing. This is what
          // actually dedups wrestlers: the crawl only ever fetches event
          // articles, so without this pass nothing would ever learn that
          // [[Steve Austin]] and [[Stone Cold Steve Austin]] are one person,
          // and every alias spelling would become its own row with its own
          // split career. Only genuinely unknown titles are asked about, and
          // the answers are memoized in wrestling_alias.
          const built = new Map<string, repo.SaveEvent>()
          for (const page of events) {
            // article -> "File:x.jpg" -> remote URL -> downloaded rel path
            const fileTitle = fileOf.get(page.title)
            const remote = fileTitle ? urls.get(fileTitle) : undefined
            const b = buildEvent(
              cfg.id,
              page.title,
              page.wikitext,
              (remote ? posters.get(remote) : null) ?? null
            )
            if (b) built.set(page.title, b)
          }
          const linked = new Set<string>()
          for (const b of built.values()) {
            for (const m of b.matches) {
              for (const p of m.participants) if (p.wikiTitle) linked.add(p.wikiTitle)
            }
          }
          try {
            const known = repo.knownAliases([...linked])
            const unknown = [...linked].filter((t) => !known.has(t))
            if (unknown.length) {
              const resolved = await resolveTitles(unknown)
              repo.recordAliases(resolved)
              for (const [from, to] of resolved) known.set(from, to)
            }
            for (const b of built.values()) {
              for (const m of b.matches) {
                for (const p of m.participants) {
                  if (p.wikiTitle) p.wikiTitle = known.get(p.wikiTitle) ?? p.wikiTitle
                }
              }
            }
          } catch {
            // A resolution failure costs dedup quality, never the import.
          }

          status = { ...status, phase: 'writing' }
          for (const page of result.pages) {
            if (status.id !== id) return
            try {
              const b = built.get(page.title)
              if (b) {
                repo.saveEvent(b)
                status = {
                  ...status,
                  events: status.events + 1,
                  matches: status.matches + b.matches.length
                }
              }
            } catch {
              status = { ...status, failed: status.failed + 1 }
            }
            status = { ...status, done: status.done + 1, message: page.title }
          }

          updateActivity({ phase: 'fetching', done: status.done, total: status.total })
          status = { ...status, phase: 'fetching' }
          if (delay > 0) await sleep(delay)
        }
      }

      // ---- second pass: wrestler details ----
      // The event crawl only ever creates wrestler STUBS (a name and a title),
      // so photos and bios need their own drain. pageImages is right here and
      // wrong for events: wrestler portraits are free Commons images, event
      // posters are not and come back empty.
      if (opts.withWrestlers !== false) {
        status = { ...status, phase: 'wrestlers', promotion: null, message: null }
        for (;;) {
          // Guarded await — see bulkImport for why it is not unconditional.
        if (runGate.paused) await runGate.wait()
          if (status.id !== id) return
          if (runGate.cancelled) {
            status = { ...status, state: 'cancelled' }
            return
          }
          const stubs = repo.stubWrestlers(BATCH)
          if (!stubs.length) break
          const titles = stubs.map((w) => w.wikiTitle)
          status = { ...status, total: status.total + titles.length }
          try {
            const [result, portraits] = await Promise.all([
              fetchPages(titles),
              pageImages(titles).catch(() => new Map<string, string>())
            ])
            const photos = await download([...portraits.values()]).catch(
              () => new Map<string, string | null>()
            )
            const detailRows = result.pages.map((page) => {
              const parsed = parseWrestlerArticle(page.wikitext)
              const remote = portraits.get(page.title)
              return {
                ...parsed,
                wikiTitle: page.title,
                photoPath: (remote ? photos.get(remote) : null) ?? null,
                honours: parseHonours(page.wikitext)
              }
            })
            repo.saveWrestlerDetails(detailRows)
            // Honours need the row to exist, so they land after the details.
            for (const row of detailRows) {
              const w = repo.wrestlerIdByTitle(row.wikiTitle)
              if (w != null) repo.saveHonours(w, row.honours)
            }
            status = { ...status, wrestlers: status.wrestlers + result.pages.length }
          } catch {
            status = { ...status, failed: status.failed + titles.length }
          }
          // Stamp every stub in the batch either way — a red-linked or
          // article-less wrestler must not be retried on every future run.
          repo.markWrestlersChecked(titles)
          status = { ...status, done: status.done + titles.length }
          if (delay > 0) await sleep(delay)
        }
      }

      // Sweep wrestler rows the refreshed cards no longer reference.
      try {
        repo.pruneOrphanWrestlers()
      } catch {
        // Housekeeping only.
      }

      if (status.id === id) status = { ...status, state: 'done', message: null }
    } catch (err) {
      if (status.id === id) {
        status = runGate.cancelled
          ? { ...status, state: 'cancelled', message: null }
          : { ...status, state: 'error', message: (err as Error).message }
      }
    } finally {
      // Never clear a NEWER run's slot — neither a newer wrestling run
      // (status.id) nor a dialog import that took it mid-run (the handle).
      if (status.id === id) endActivity(undefined, slot)
      task.settle(
        status.id !== id
          ? { state: 'cancelled', error: 'superseded by a newer run' }
          : status.state === 'error'
            ? { state: 'error', error: status.message }
            : status.state === 'cancelled'
              ? { state: 'cancelled' }
              : { state: 'done' }
      )
    }
  })

  return getStatus()
}
