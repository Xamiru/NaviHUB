import { describe, expect, it } from 'vitest'
import { currentCourseWindow } from '../src/shared/japanese/courseWindow'

const COURSES = Array.from({ length: 10 }, (_, index) => ({ id: index + 1 }))

describe('Japanese Home current course window', () => {
  it('centres the current course when there are courses on both sides', () => {
    expect(currentCourseWindow(COURSES, 6).map((course) => course.id)).toEqual([4, 5, 6, 7, 8])
  })

  it('clamps the window at the beginning and end of the path', () => {
    expect(currentCourseWindow(COURSES, 1).map((course) => course.id)).toEqual([1, 2, 3, 4, 5])
    expect(currentCourseWindow(COURSES, 10).map((course) => course.id)).toEqual([6, 7, 8, 9, 10])
  })

  it('preserves short paths and falls back to the beginning for a missing current id', () => {
    expect(currentCourseWindow(COURSES.slice(0, 3), 2)).toEqual(COURSES.slice(0, 3))
    expect(currentCourseWindow(COURSES, 99, 3).map((course) => course.id)).toEqual([1, 2, 3])
  })
})
