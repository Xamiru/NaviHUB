import { SECTION_KINDS, type Section, type SectionKind } from './schema'

// An article reads in one order whatever order its file stores sections in:
// overview, background, causes, course, then aftermath, consequences and the rest,
// as SECTION_KINDS lists them. Sections of one kind keep their stored order.
const RANK = new Map((Object.keys(SECTION_KINDS) as SectionKind[]).map((k, i) => [k, i]))
const COURSE_RANK = RANK.get('course')!

export function orderSections(sections: Section[]): Section[] {
  return sections
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (RANK.get(a.s.kind) ?? 99) - (RANK.get(b.s.kind) ?? 99) || a.i - b.i)
    .map((x) => x.s)
}

/**
 * The sections that come before the dated "Course of events" and those after it:
 * an event reads background, then what happened, then what followed.
 */
export function splitAtCourse(sections: Section[]): { before: Section[]; after: Section[] } {
  const ordered = orderSections(sections)
  return {
    before: ordered.filter((s) => (RANK.get(s.kind) ?? 99) <= COURSE_RANK),
    after: ordered.filter((s) => (RANK.get(s.kind) ?? 99) > COURSE_RANK)
  }
}
