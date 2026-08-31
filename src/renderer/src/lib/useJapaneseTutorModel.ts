import { useQueries, useQuery } from '@tanstack/react-query'
import type { QuizHistory, QuizKind } from '@shared/types'
import { buildTutorPlan, historyEvidence } from '@shared/japanese/tutor'
import { api } from './api'
import { qk } from './queryKeys'
import { statusesFrom, useSettings } from './hooks'
import { loadJpDailyTarget } from './japanesePrefs'
import { readerPath } from './readerPath'
import { ANIME, MANGA, VISUAL_NOVEL } from './mediaConfig'

export const TUTOR_HISTORY_KINDS: QuizKind[] = [
  'jpPhonology',
  'listening',
  'jpImmersion',
  'jpReading',
  'jpOutput'
]

export function useJapaneseTutorModel() {
  const { data: stats } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats(),
    staleTime: 0
  })
  const { data: detail } = useQuery({
    queryKey: qk.japanese.statsDetail,
    queryFn: () => api.japanese.statsDetail(),
    staleTime: 0
  })
  const { data: roadmap } = useQuery({
    queryKey: qk.japanese.roadmap,
    queryFn: () => api.japanese.roadmap()
  })
  const { data: tutorDays } = useQuery({
    queryKey: qk.japanese.tutorDays,
    queryFn: () => api.japanese.tutorDays(30),
    staleTime: 0
  })
  const { data: tutorErrors } = useQuery({
    queryKey: qk.japanese.tutorErrors,
    queryFn: () => api.japanese.tutorErrors(200),
    staleTime: 0
  })
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
  if (!ready) {
    return {
      ready: false as const,
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
  const plan = buildTutorPlan({
    due: stats.dueCount,
    unseen: stats.newAvailableCount,
    introducedToday: stats.introducedToday,
    dailyTarget: loadJpDailyTarget(),
    frontierStep,
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
    readingRoute
  })

  return {
    ready: true as const,
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
