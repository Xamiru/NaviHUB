// Quiz setup defaults chosen in Settings → Readers & quizzes. Each quiz page's
// options are still per-visit state (usePersistedState); these only seed a
// fresh visit, so changing a toggle for one round never rewrites the default.

export interface QuizDefaults {
  // The countdown on Song, Synopsis, Manga panel, Voice actor and Cast quizzes.
  timer: boolean
  // Song quiz: start each clip at a random point instead of the beginning.
  songOffset: boolean
  // Song quiz: seconds before the clip pauses; 0 plays the whole song.
  songSnippet: number
  // Song quiz: move to the next song automatically after an answer.
  songAutoNext: boolean
}

export const SONG_SNIPPET_CHOICES = [0, 10, 15, 20] as const

export const QUIZ_DEFAULTS: QuizDefaults = {
  timer: true,
  songOffset: true,
  songSnippet: 0,
  songAutoNext: true
}

const KEY = 'quiz.defaults'

export function loadQuizDefaults(): QuizDefaults {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}') ?? {}
    const out = { ...QUIZ_DEFAULTS }
    if (typeof saved.timer === 'boolean') out.timer = saved.timer
    if (typeof saved.songOffset === 'boolean') out.songOffset = saved.songOffset
    if (typeof saved.songAutoNext === 'boolean') out.songAutoNext = saved.songAutoNext
    if ((SONG_SNIPPET_CHOICES as readonly number[]).includes(saved.songSnippet)) {
      out.songSnippet = saved.songSnippet
    }
    return out
  } catch {
    return QUIZ_DEFAULTS
  }
}

export function saveQuizDefaults(defaults: QuizDefaults): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(defaults))
  } catch {
    // A full or disabled localStorage must never break Settings.
  }
}
