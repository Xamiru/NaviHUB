import type { ProgAttempt, ProgLessonProgress } from '../types'
import type { ProgCourseDef } from './types'
import { bestAttempts } from './attempts'

export function recommendLesson(course: ProgCourseDef, progress: ProgLessonProgress[], attempts: ProgAttempt[]) {
  const read = new Set(progress.map((row) => row.lessonKey))
  const checks = bestAttempts(attempts)
  const repair = course.lessons.find((lesson) => {
    const latest = checks.get(`${course.key}/${lesson.key}`)?.latest
    return latest && latest.total > 0 && latest.score < latest.total
  })
  if (repair) return { lesson: repair, reason: 'Your latest self-check missed a concept here. Repair it before adding more material.' }
  const unread = course.lessons.find((lesson) => !read.has(`${course.key}/${lesson.key}`))
  if (unread) return { lesson: unread, reason: 'This is the next unread lesson in your chosen course. You can open any lesson.' }
  const unchecked = course.lessons.find((lesson) => !checks.has(`${course.key}/${lesson.key}`))
  if (unchecked) return { lesson: unchecked, reason: 'You marked this lesson read but have not completed its self-check.' }
  return null
}

export function lessonPracticeTask(body: string): string {
  const section = body.match(/## Guided practice\s+([\s\S]*?)(?=\n## |$)/)?.[1]?.trim()
  return section || 'Rebuild one example from this lesson without copying it. Change an input or assumption, predict the result, then compare the actual outcome with your prediction.'
}

export const PROJECT_CRITERIA = [
  'I completed the stated task and recorded the actual result.',
  'I checked a normal case and an edge or failure case and recorded both outcomes.',
  'I explained why the result follows, including an assumption or limitation.',
  'I recorded any help I used and what I corrected after checking.'
]
