// Voice roles do not count in the screen quizzes (2026-10-14): an actor credit
// on a title with the Animation genre is a voice role, and the user does not
// follow voice casting. Directors of animated titles still count, and the
// titles themselves stay in every quiz that is not about cast. Multiple-choice
// builders keep the full credit list for their factual guards, so a voiced
// title is never offered as a wrong answer for its actor.

export function isAnimatedTitle(genres: readonly string[]): boolean {
  return genres.some((genre) => genre.toLowerCase() === 'animation')
}

export function isVoiceRole(genres: readonly string[], role: string): boolean {
  return role === 'actor' && isAnimatedTitle(genres)
}

/** The credits that count for linking titles and asking about people. */
export function screenPeople<P extends { role: string }>(item: {
  genres: readonly string[]
  people: readonly P[]
}): P[] {
  if (!isAnimatedTitle(item.genres)) return [...item.people]
  return item.people.filter((person) => person.role !== 'actor')
}
