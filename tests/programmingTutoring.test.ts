import { runInNewContext } from 'node:vm'
import { describe, expect, it } from 'vitest'
import { FULL_STACK_WEB_APPLIED } from '../src/shared/programming/fullStackWebApplied'
import { PROG_COURSES } from '../src/shared/programming/courses'

describe('programming worked instruction', () => {
  it('executes the actual JavaScript worked solution against fresh inputs without mutating them', () => {
    const body = FULL_STACK_WEB_APPLIED['javascript-language'].solution
    const source = body.match(/```(?:javascript|js)\n([\s\S]*?)```/)?.[1]
    expect(source, 'the implementation must be present in the lesson').toBeTruthy()
    const organize = runInNewContext(`${source}\norganizeMedia`, { console: { log() {} } }, { timeout: 1000 })
    const rows = Object.freeze([
      Object.freeze({ title: 'Later', year: null, status: 'Planned', tags: ['space'] }),
      Object.freeze({ title: 'Earlier', year: 2004, status: 'Planned', tags: ['space'] }),
      Object.freeze({ title: 'Elsewhere', year: 1990, status: 'Watching', tags: ['drama'] })
    ])
    const groups = organize(rows, 'space') as Map<string, { title: string }[]>
    expect(Array.from(groups.get('Planned')!, (row) => row.title)).toEqual(['Earlier', 'Later'])
    expect(groups.has('Watching')).toBe(false)
    expect(rows[0].title).toBe('Later')
    expect(organize(rows, 'not-present').size).toBe(0)
  })

  it('does not restore generic distractors or answer-padding qualifiers', () => {
    const prohibited = [
      'Rely on undocumented defaults and assume tool success proves the complete system property',
      'Grant maximum privilege and remove validation so unusual inputs cannot interrupt workflow',
      ', without verified evidence', ', while ignoring the stated scope', ', without testing the result'
    ]
    for (const course of PROG_COURSES) for (const lesson of course.lessons) for (const question of lesson.questions) {
      for (const option of question.options) for (const phrase of prohibited) {
        expect(option, `${course.key}/${lesson.key}`).not.toContain(phrase)
      }
    }
  })
})
