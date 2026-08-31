export function currentCourseWindow<T extends { id: number }>(
  courses: T[],
  currentId: number | null,
  limit = 5
): T[] {
  const size = Math.max(1, Math.floor(limit))
  if (courses.length <= size) return courses

  const currentIndex = currentId == null ? -1 : courses.findIndex((course) => course.id === currentId)
  if (currentIndex < 0) return courses.slice(0, size)

  const centeredStart = currentIndex - Math.floor(size / 2)
  const start = Math.min(Math.max(0, centeredStart), courses.length - size)
  return courses.slice(start, start + size)
}
