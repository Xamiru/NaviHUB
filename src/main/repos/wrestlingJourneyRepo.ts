import { getSqlite } from '../db/connection'
import { assertOrder, choice, dateValue, textValue } from './hobbyValidation'
import { WRESTLING_JOURNEYS } from '@shared/wrestlingJourneys'
import type {
  WrestlingJourneyInput,
  WrestlingJourneySummary,
  WrestlingJourneyStepInput,
  WrestlingJourneyStep,
  WrestlingJourneyDetail,
  WrestlingJourneyViewing,
  WrestlingJourneyTarget
} from '@shared/types'

export function list(): WrestlingJourneySummary[] {
  return getSqlite()
    .prepare(
      `SELECT j.id,j.title,j.description,COUNT(s.id) AS steps,
    SUM(CASE WHEN EXISTS(SELECT 1 FROM wrestling_journey_viewing v WHERE v.step_id=s.id) THEN 1 ELSE 0 END) AS watched
    FROM wrestling_journey j LEFT JOIN wrestling_journey_step s ON s.journey_id=j.id GROUP BY j.id ORDER BY j.id DESC`
    )
    .all() as WrestlingJourneySummary[]
}
export function requireJourney(id: number): WrestlingJourneyInput {
  const row = getSqlite()
    .prepare('SELECT title,description FROM wrestling_journey WHERE id=?')
    .get(id)
  if (!row) throw new Error('Journey not found')
  return row as WrestlingJourneyInput
}
export function requireStep(journeyId: number, id: number): void {
  requireJourney(journeyId)
  if (
    !getSqlite()
      .prepare('SELECT id FROM wrestling_journey_step WHERE id=? AND journey_id=?')
      .get(id, journeyId)
  )
    throw new Error('Step does not belong to this journey')
}
export function detail(id: number): WrestlingJourneyDetail {
  requireJourney(id)
  const db = getSqlite()
  const summary = list().find((j) => j.id === id)!
  const entries = db
    .prepare(
      `SELECT id,kind,COALESCE(event_id,match_id) AS linkedId,title,step_date AS stepDate,notes,source_url AS sourceUrl,file_path AS filePath
    FROM wrestling_journey_step WHERE journey_id=? ORDER BY sort_order,id`
    )
    .all(id) as WrestlingJourneyStep[]
  for (const step of entries) {
    step.hasLocalFile = false // IO layer checks the actual linked path.
    step.viewings = db
      .prepare(
        'SELECT id,watched_on AS watchedOn,notes FROM wrestling_journey_viewing WHERE step_id=? ORDER BY watched_on DESC,id DESC'
      )
      .all(step.id) as WrestlingJourneyViewing[]
    step.videos =
      step.kind === 'segment' || step.linkedId === null
        ? []
        : step.kind === 'event'
          ? (db
              .prepare(
                'SELECT id,title FROM wrestling_video WHERE event_id=? ORDER BY sort_order,id'
              )
              .all(step.linkedId) as { id: number; title: string }[])
          : (db
              .prepare(
                `SELECT v.id,v.title FROM wrestling_video v JOIN wrestling_match m ON m.id=?
          WHERE v.id=m.video_id OR (m.event_id IS NOT NULL AND v.event_id=m.event_id) ORDER BY v.sort_order,v.id`
              )
              .all(step.linkedId) as { id: number; title: string }[])
  }
  return { ...summary, entries }
}
export function save(id: number | null, input: WrestlingJourneyInput): number {
  const title = textValue(input.title, 'Title', 300, true)
  const description = textValue(input.description, 'description')
  if (id !== null) {
    requireJourney(id)
    getSqlite()
      .prepare('UPDATE wrestling_journey SET title=?,description=? WHERE id=?')
      .run(title, description, id)
    return id
  }
  return Number(
    getSqlite()
      .prepare('INSERT INTO wrestling_journey(title,description) VALUES(?,?)')
      .run(title, description).lastInsertRowid
  )
}
export function remove(id: number): void {
  requireJourney(id)
  getSqlite().prepare('DELETE FROM wrestling_journey WHERE id=?').run(id)
}
export function saveStep(
  journeyId: number,
  id: number | null,
  input: WrestlingJourneyStepInput
): number {
  requireJourney(journeyId)
  if (id !== null) requireStep(journeyId, id)
  const kind = choice(input.kind, ['event', 'match', 'segment'], 'step kind')
  const title = textValue(input.title, 'Step title', 500, true)
  const notes = textValue(input.notes, 'notes')
  const sourceUrl = textValue(input.sourceUrl, 'source URL', 2000)
  if (sourceUrl && !/^https?:\/\//i.test(sourceUrl))
    throw new Error('Source must be an HTTP or HTTPS URL')
  const date = dateValue(input.stepDate)
  const linked = input.linkedId
  const db = getSqlite()
  if (kind === 'segment' && linked !== null)
    throw new Error('A segment cannot link a match or event')
  if (
    linked !== null &&
    !db
      .prepare(
        `SELECT id FROM ${kind === 'event' ? 'wrestling_event' : 'wrestling_match'} WHERE id=?`
      )
      .get(linked)
  )
    throw new Error('Linked record not found')
  const args = [
    kind,
    kind === 'event' ? linked : null,
    kind === 'match' ? linked : null,
    title,
    date,
    notes,
    sourceUrl
  ]
  if (id !== null) {
    db.prepare(
      'UPDATE wrestling_journey_step SET kind=?,event_id=?,match_id=?,title=?,step_date=?,notes=?,source_url=? WHERE id=? AND journey_id=?'
    ).run(...args, id, journeyId)
    return id
  }
  return Number(
    db
      .prepare(
        `INSERT INTO wrestling_journey_step(kind,event_id,match_id,title,step_date,notes,source_url,journey_id,sort_order)
    VALUES(?,?,?,?,?,?,?,?,(SELECT COALESCE(MAX(sort_order),-1)+1 FROM wrestling_journey_step WHERE journey_id=?))`
      )
      .run(...args, journeyId, journeyId).lastInsertRowid
  )
}
export function removeStep(journeyId: number, id: number): void {
  requireStep(journeyId, id)
  getSqlite().prepare('DELETE FROM wrestling_journey_step WHERE id=?').run(id)
}
export function reorder(journeyId: number, ids: number[]): void {
  requireJourney(journeyId)
  const db = getSqlite()
  assertOrder(
    ids,
    (
      db.prepare('SELECT id FROM wrestling_journey_step WHERE journey_id=?').all(journeyId) as {
        id: number
      }[]
    ).map((n) => n.id)
  )
  db.transaction(() => {
    ids.forEach((id, i) =>
      db.prepare('UPDATE wrestling_journey_step SET sort_order=? WHERE id=?').run(i, id)
    )
  })()
}
export function logViewing(
  journeyId: number,
  stepId: number,
  watchedOn: string,
  notes: string
): void {
  requireStep(journeyId, stepId)
  getSqlite()
    .prepare('INSERT INTO wrestling_journey_viewing(step_id,watched_on,notes) VALUES(?,?,?)')
    .run(stepId, dateValue(watchedOn, true), textValue(notes, 'viewing notes'))
}
export function removeViewing(journeyId: number, viewingId: number): void {
  requireJourney(journeyId)
  getSqlite()
    .prepare(
      'DELETE FROM wrestling_journey_viewing WHERE id=? AND step_id IN(SELECT id FROM wrestling_journey_step WHERE journey_id=?)'
    )
    .run(viewingId, journeyId)
}
export function instantiate(key: string): number {
  const template = WRESTLING_JOURNEYS.find((t) => t.key === key)
  if (!template) throw new Error('Journey template not found')
  return getSqlite().transaction(() => {
    const id = save(null, template)
    getSqlite().prepare('UPDATE wrestling_journey SET template_key=? WHERE id=?').run(key, id)
    template.entries.forEach((entry) => saveStep(id, null, entry))
    return id
  })()
}
export function targets(kind: 'event' | 'match', search: string): WrestlingJourneyTarget[] {
  choice(kind, ['event', 'match'], 'link kind')
  const q = `%${textValue(search, 'search', 300)}%`
  return kind === 'event'
    ? (getSqlite()
        .prepare(
          'SELECT id,name AS title,event_date AS date FROM wrestling_event WHERE name LIKE ? ORDER BY event_date DESC LIMIT 40'
        )
        .all(q) as WrestlingJourneyTarget[])
    : (getSqlite()
        .prepare(
          `SELECT m.id,m.title || ' / ' || COALESCE(e.name,m.show_label,'Loose match') AS title,COALESCE(e.event_date,m.match_date) AS date
      FROM wrestling_match m LEFT JOIN wrestling_event e ON e.id=m.event_id WHERE m.title LIKE ? OR e.name LIKE ? ORDER BY date DESC LIMIT 40`
        )
        .all(q, q) as WrestlingJourneyTarget[])
}
