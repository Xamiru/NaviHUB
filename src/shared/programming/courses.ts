import type { ProgCourseDef, ProgLessonDef } from './types'
import { GO_COURSE } from './goCourse'
import { REGEX_COURSE } from './regexCourse'
import { GIT_COURSE } from './gitCourse'
import { SQL_COURSE } from './sqlCourse'
import { SHELL_COURSE } from './shellCourse'
import { DOCKER_COURSE } from './dockerCourse'
import { TS_COURSE } from './tsCourse'
import { PYTHON_COURSE } from './pythonCourse'
import { LINUX_COURSE } from './linuxCourse'
import { ALGO_COURSE } from './algoCourse'

// The course catalog. Adding a course = one file exporting a ProgCourseDef +
// an entry here; the DB (prog_progress) only ever sees the frozen keys.

export const PROG_COURSES: ProgCourseDef[] = [
  GO_COURSE,
  SHELL_COURSE,
  DOCKER_COURSE,
  REGEX_COURSE,
  GIT_COURSE,
  SQL_COURSE,
  TS_COURSE,
  PYTHON_COURSE,
  LINUX_COURSE,
  ALGO_COURSE
]

export function progCourse(key: string): ProgCourseDef | null {
  return PROG_COURSES.find((c) => c.key === key) ?? null
}

// The frozen progress key for one lesson, as stored in prog_progress.
export const progLessonKey = (courseKey: string, lessonKey: string): string =>
  `${courseKey}/${lessonKey}`

export function progLesson(
  fullKey: string
): { course: ProgCourseDef; lesson: ProgLessonDef; index: number } | null {
  const slash = fullKey.indexOf('/')
  if (slash < 0) return null
  const course = progCourse(fullKey.slice(0, slash))
  if (!course) return null
  const lessonKey = fullKey.slice(slash + 1)
  const index = course.lessons.findIndex((l) => l.key === lessonKey)
  if (index < 0) return null
  return { course, lesson: course.lessons[index], index }
}
