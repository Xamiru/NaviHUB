import { useQueries, useQuery } from '@tanstack/react-query'
import type { QuizHistory, QuizKind } from '@shared/types'
import { buildTutorPlan, historyEvidence, type TutorBudget } from '@shared/japanese/tutor'
import { coursePhase } from '@shared/japanese/coursePhases'
import { nextDeckStep } from '@shared/japanese/pathTracks'
import { api } from './api'
import { qk } from './queryKeys'
import { statusesFrom, useSettings } from './hooks'
import { KANA_KNOWN_SETTING, loadJpDailyTarget } from './japanesePrefs'
import { readerPath } from './readerPath'
import { ANIME, MANGA, VISUAL_NOVEL } from './mediaConfig'

export const TUTOR_HISTORY_KINDS: QuizKind[] = [
  'jpPhonology',
  'listening',
  'jpImmersion',
  'jpReading',
  'jpOutput',
  'kana'
]

// `budget` is the session length picked on Today; the Tutor page and the
// session runner read the full sixty-minute loop unless told otherwise.
export function useJapaneseTutorModel(budget: TutorBudget = 60) {
  const statsQuery = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats(),
    staleTime: 0
  })
  const detailQuery = useQuery({
    queryKey: qk.japanese.statsDetail,
    queryFn: () => api.japanese.statsDetail(),
    staleTime: 0
  })
  const roadmapQuery = useQuery({
    queryKey: qk.japanese.roadmap,
    queryFn: () => api.japanese.roadmap()
  })
  const tutorDaysQuery = useQuery({
    queryKey: qk.japanese.tutorDays,
    queryFn: () => api.japanese.tutorDays(30),
    staleTime: 0
  })
  const tutorErrorsQuery = useQuery({
    queryKey: qk.japanese.tutorErrors,
    queryFn: () => api.japanese.tutorErrors(200),
    staleTime: 0
  })
  const stats = statsQuery.data
  const detail = detailQuery.data
  const roadmap = roadmapQuery.data
  const tutorDays = tutorDaysQuery.data
  const tutorErrors = tutorErrorsQuery.data
  const { data: settings } = useSettings()
  const { data: manga = [] } = useQuery({
    queryKey: qk.media.list({ mediaType: 'manga' }),
    queryFn: () => api.media.list({ mediaType: 'manga' })
  })
  const { data: anime = [] } = useQuery({
    queryKey: qk.media.list({ mediaType: 'anime' }),
    queryFn: () => api.media.list({ mediaType: 'anime' })
  })
  const { data: visualNovels = [] } = useQuery({
    queryKey: qk.media.list({ mediaType: 'visual_novel' }),
    queryFn: () => api.media.list({ mediaType: 'visual_novel' })
  })
  const historyQueries = useQueries({
    queries: TUTOR_HISTORY_KINDS.map((kind) => ({
      queryKey: qk.quiz.historyAll(kind),
      queryFn: () => api.quiz.history(kind, 200),
      staleTime: 0
    }))
  })

  const mangaStatus = statusesFrom(settings, MANGA)[0]
  const animeStatus = statusesFrom(settings, ANIME)[0]
  const visualNovelStatus = statusesFrom(settings, VISUAL_NOVEL)[0]
  const currentManga = manga.find((item) => item.status === mangaStatus) ?? manga[0] ?? null
  const currentAnime = anime.find((item) => item.status === animeStatus) ?? anime[0] ?? null
  const currentVisualNovel =
    visualNovels.find((item) => item.status === visualNovelStatus) ?? visualNovels[0] ?? null
  const mangaLibraryQuery = useQuery({
    queryKey: qk.manga.chapters(currentManga?.id ?? 0),
    queryFn: () => api.manga.chapters(currentManga!.id),
    enabled: !!currentManga,
    staleTime: 0
  })
  const videoLibraryQuery = useQuery({
    queryKey: qk.video.library(currentAnime?.id ?? 0),
    queryFn: () => api.video.files(currentAnime!.id),
    enabled: !!currentAnime
  })
  const mangaLibrary = mangaLibraryQuery.data
  const videoLibrary = videoLibraryQuery.data

  const ready =
    !!stats &&
    !!detail &&
    !!roadmap &&
    !!tutorDays &&
    !!tutorErrors &&
    historyQueries.every((query) => !!query.data) &&
    (!currentManga || !!mangaLibrary) &&
    (!currentAnime || !!videoLibrary)
  const core = [statsQuery, detailQuery, roadmapQuery, tutorDaysQuery, tutorErrorsQuery, ...historyQueries]
  // A failed local read must show a retry, never a plan built from missing data.
  const failed = core.some((query) => query.isError)
  const retry = (): void => {
    for (const query of core) if (query.isError) void query.refetch()
  }
  if (!ready) {
    return {
      ready: false as const,
      failed,
      retry,
      stats: null,
      detail: null,
      roadmap: null,
      plan: null,
      history: null,
      frontierStep: 1,
      currentManga,
      currentAnime,
      currentVisualNovel,
      mangaLibrary,
      videoLibrary,
      tutorDays: null,
      tutorErrors: null,
      nextChapter: null
    }
  }

  const frontier = roadmap.steps.find((course) => course.id === roadmap.frontierCourseId)
  const frontierStep = frontier?.difficulty ?? roadmap.steps.at(-1)?.difficulty ?? 1
  const frontierCourse = frontier ?? roadmap.steps.at(-1)
  const frontierPhase = (frontierCourse && coursePhase(frontierCourse)) ?? 'foundation'
  const nextChapter =
    mangaLibrary?.chapters.find((chapter) => !chapter.readAt) ?? mangaLibrary?.chapters[0] ?? null
  const readingRoute =
    currentManga && nextChapter
      ? readerPath('/manga', currentManga.id, nextChapter)
      : currentVisualNovel
        ? `/visual-novels/${currentVisualNovel.id}`
        : '/japanese/reading'
  const history = Object.fromEntries(
    TUTOR_HISTORY_KINDS.map((kind, index) => [kind, historyQueries[index].data as QuizHistory])
  ) as Record<(typeof TUTOR_HISTORY_KINDS)[number], QuizHistory>
  // Local calendar day number: alternates new material between the course path
  // and the deck tracks from one day to the next.
  const now = new Date()
  const dayIndex = Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000)
  const plan = buildTutorPlan({
    due: stats.dueCount,
    unseen: stats.newAvailableCount,
    introducedToday: stats.introducedToday,
    dailyTarget: loadJpDailyTarget(),
    frontierPhase,
    strictRetention30:
      detail.retention.strict30 == null ? null : Math.round(detail.retention.strict30 * 100),
    phonology: historyEvidence(history.jpPhonology),
    listening: historyEvidence(history.listening),
    immersion: historyEvidence(history.jpImmersion),
    reading: historyEvidence(history.jpReading),
    output: historyEvidence(history.jpOutput),
    chaptersRead: detail.journey.chaptersRead,
    hasReadingMedia: !!nextChapter || !!currentVisualNovel,
    hasListeningMedia: (videoLibrary?.files.length ?? 0) > 0,
    readingRoute,
    budgetMinutes: budget,
    kanaNeeded: kanaNeeded(settings, history.kana),
    totalReviews: detail.totalReviews,
    nextLesson: roadmap.nextLesson ? { id: roadmap.nextLesson.id, title: roadmap.nextLesson.title } : null,
    deckStep: nextDeckStep(roadmap.tracks, dayIndex),
    deckDay: dayIndex % 2 === 1
  })

  return {
    ready: true as const,
    failed: false,
    retry,
    kanaNeeded: kanaNeeded(settings, history.kana),
    stats,
    detail,
    roadmap,
    plan,
    history,
    tutorDays,
    tutorErrors,
    frontierStep,
    currentManga,
    currentAnime,
    currentVisualNovel,
    mangaLibrary,
    videoLibrary,
    nextChapter
  }
}

// Kana stays in the plan until the learner says they read it, or ten recent
// drills average 90% or better.
export function kanaNeeded(
  settings: Record<string, string> | undefined,
  kana: QuizHistory | undefined
): boolean {
  if (settings?.[KANA_KNOWN_SETTING] === '1') return false
  const practice = historyEvidence(kana)
  return !(practice.sessions >= 10 && (practice.accuracy ?? 0) >= 90)
}
