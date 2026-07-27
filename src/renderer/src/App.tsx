import { useLayoutEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useScrollRestoration } from './lib/navState'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import NowPlayingBar from './components/NowPlayingBar'
import CommandPalette from './components/CommandPalette'
import Toaster from './components/Toaster'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import StatsPage from './pages/StatsPage'
import MediaListPage from './pages/MediaListPage'
import MediaDetailPage from './pages/MediaDetailPage'
import MediaFormPage from './pages/MediaFormPage'
import SeasonalAnimePage from './pages/SeasonalAnimePage'
import ThemeSongsPage from './pages/ThemeSongsPage'
import EntityListView from './components/EntityListView'
import SettingsPage from './pages/SettingsPage'
import PersonDetailPage from './pages/PersonDetailPage'
import StudioListPage from './pages/StudioListPage'
import StudioDetailPage from './pages/StudioDetailPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import QuizLandingPage from './pages/QuizLandingPage'
import SongQuizPage from './pages/SongQuizPage'
import TournamentPage from './pages/TournamentPage'
import ChecklistPage from './pages/ChecklistPage'
import ListsIndexPage from './pages/ListsIndexPage'
import TorrentsPage from './pages/TorrentsPage'
import ListFormPage from './pages/ListFormPage'
import ListDetailPage from './pages/ListDetailPage'
import TagsIndexPage from './pages/TagsIndexPage'
import TagDetailPage from './pages/TagDetailPage'
import JapaneseHomePage from './pages/JapaneseHomePage'
import JapaneseRoadmapPage from './pages/JapaneseRoadmapPage'
import JapaneseAnalyzePage from './pages/JapaneseAnalyzePage'
import JapaneseCoveragePage from './pages/JapaneseCoveragePage'
import JapaneseWritingPage from './pages/JapaneseWritingPage'
import JapaneseCoursePage from './pages/JapaneseCoursePage'
import JapaneseCourseFormPage from './pages/JapaneseCourseFormPage'
import JapaneseLessonPage from './pages/JapaneseLessonPage'
import JapaneseLessonFormPage from './pages/JapaneseLessonFormPage'
import JapaneseReviewPage from './pages/JapaneseReviewPage'
import JapaneseQuizPage from './pages/JapaneseQuizPage'
import JapaneseMinePage from './pages/JapaneseMinePage'
import JapaneseDictionaryPage from './pages/JapaneseDictionaryPage'
import JapaneseKanaPage from './pages/JapaneseKanaPage'
import JapaneseTestPage from './pages/JapaneseTestPage'
import JapaneseStatsPage from './pages/JapaneseStatsPage'
import MangaReaderPage from './pages/MangaReaderPage'
import BookReaderPage from './pages/BookReaderPage'
import MusicLibraryPage from './pages/MusicLibraryPage'
import MusicArtistPage from './pages/MusicArtistPage'
import MusicAlbumPage from './pages/MusicAlbumPage'
import MusicPlaylistPage from './pages/MusicPlaylistPage'
import MusicLikedPage from './pages/MusicLikedPage'
import MusicStatsPage from './pages/MusicStatsPage'
import NowPlayingPage from './pages/NowPlayingPage'
import GachaHomePage from './pages/GachaHomePage'
import GachaGamePage from './pages/GachaGamePage'
import GachaUnitPage from './pages/GachaUnitPage'
import GachaCoachPage from './pages/GachaCoachPage'
import { ANIME, MANGA, VISUAL_NOVEL, GAME, MOVIE, TV } from './lib/mediaConfig'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)
  const location = useLocation()
  useScrollRestoration(mainRef)

  // The manga/book readers are immersive: no sidebar/topbar/now-playing
  // chrome, full-bleed. Audio keeps playing — the <audio> element lives in
  // AudioPlayerProvider, not in the (unmounted) NowPlayingBar.
  const isReader = /^\/manga\/\d+\/(read|book)\//.test(location.pathname)

  // The lain theme's CRT overlay (styles.css) keys off this attribute so
  // scanlines never sit over the readers. Layout effect: no scanline frame
  // flashes when entering a reader. Idempotent → StrictMode-safe.
  useLayoutEffect(() => {
    if (isReader) document.documentElement.dataset.reader = 'true'
    else delete document.documentElement.dataset.reader
  }, [isReader])

  if (isReader) {
    return (
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/manga/:id/read/:chapterId" element={<MangaReaderPage />} />
          <Route path="/manga/:id/book/:chapterId" element={<BookReaderPage />} />
        </Routes>
        <Toaster />
      </ErrorBoundary>
    )
  }

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto min-h-0">
          <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />

            {/* Anime */}
            <Route path="/anime" element={<MediaListPage cfg={ANIME} />} />
            <Route path="/anime/new" element={<MediaFormPage cfg={ANIME} />} />
            <Route path="/anime/seasonal" element={<SeasonalAnimePage />} />
            <Route path="/anime/songs" element={<ThemeSongsPage />} />
            <Route path="/anime/:id" element={<MediaDetailPage cfg={ANIME} />} />
            <Route path="/anime/:id/edit" element={<MediaFormPage cfg={ANIME} />} />

            {/* Manga */}
            <Route path="/manga" element={<MediaListPage cfg={MANGA} />} />
            <Route path="/manga/new" element={<MediaFormPage cfg={MANGA} />} />
            <Route path="/manga/:id" element={<MediaDetailPage cfg={MANGA} />} />
            <Route path="/manga/:id/edit" element={<MediaFormPage cfg={MANGA} />} />

            {/* Visual Novels (VNDB) */}
            <Route path="/visual-novels" element={<MediaListPage cfg={VISUAL_NOVEL} />} />
            <Route path="/visual-novels/new" element={<MediaFormPage cfg={VISUAL_NOVEL} />} />
            <Route path="/visual-novels/:id" element={<MediaDetailPage cfg={VISUAL_NOVEL} />} />
            <Route path="/visual-novels/:id/edit" element={<MediaFormPage cfg={VISUAL_NOVEL} />} />

            {/* Games (RAWG) — cast is manual; VAs share the anime/VN seiyuu pool */}
            <Route path="/games" element={<MediaListPage cfg={GAME} />} />
            <Route path="/games/new" element={<MediaFormPage cfg={GAME} />} />
            <Route path="/games/:id" element={<MediaDetailPage cfg={GAME} />} />
            <Route path="/games/:id/edit" element={<MediaFormPage cfg={GAME} />} />

            {/* Movies + TV (shared section: same actors, separate lists) */}
            <Route path="/movies" element={<MediaListPage cfg={MOVIE} />} />
            <Route path="/movies/new" element={<MediaFormPage cfg={MOVIE} />} />
            <Route path="/movies/:id" element={<MediaDetailPage cfg={MOVIE} />} />
            <Route path="/movies/:id/edit" element={<MediaFormPage cfg={MOVIE} />} />
            <Route path="/tv" element={<MediaListPage cfg={TV} />} />
            <Route path="/tv/new" element={<MediaFormPage cfg={TV} />} />
            <Route path="/tv/:id" element={<MediaDetailPage cfg={TV} />} />
            <Route path="/tv/:id/edit" element={<MediaFormPage cfg={TV} />} />

            {/* People — shared detail at /people/:id; browse pages filter by
                role + media type so each list stays scoped to its section */}
            <Route
              path="/people"
              element={
                <EntityListView
                  kind="person"
                  title="Voice Actors"
                  basePath="/people"
                  personRole="voice_actor"
                  // Voice actors are one pool shared across anime, visual
                  // novels and games (same seiyuu), like actors span movies + TV.
                  mediaType={['anime', 'visual_novel', 'game']}
                />
              }
            />
            <Route
              path="/actors"
              element={
                <EntityListView
                  kind="person"
                  title="Actors"
                  basePath="/people"
                  personRole="actor"
                  mediaType={['movie', 'tv']}
                />
              }
            />
            <Route
              path="/directors"
              element={
                <EntityListView
                  kind="person"
                  title="Directors"
                  basePath="/people"
                  personRole="director"
                  mediaType="movie"
                />
              }
            />
            <Route
              path="/artists"
              element={
                <EntityListView
                  kind="person"
                  title="Artists"
                  basePath="/people"
                  personRole="artist"
                  mediaType="anime"
                />
              }
            />
            <Route
              path="/mangaka"
              element={
                <EntityListView
                  kind="person"
                  title="Mangaka"
                  basePath="/people"
                  personRole="mangaka"
                  mediaType="manga"
                />
              }
            />
            <Route path="/people/:id" element={<PersonDetailPage />} />

            {/* Companies (studios / production) — one shared table */}
            <Route path="/studios" element={<StudioListPage />} />
            <Route path="/studios/:id" element={<StudioDetailPage />} />

            <Route path="/characters/:id" element={<CharacterDetailPage />} />

            {/* Quiz — a hub of quizzes over the library (song quiz is the first) */}
            <Route path="/quiz" element={<QuizLandingPage />} />
            <Route path="/quiz/song" element={<SongQuizPage />} />
            <Route path="/quiz/tournament" element={<TournamentPage />} />

            {/* Lists — user-curated, type-scoped collections */}
            <Route path="/torrents" element={<TorrentsPage />} />

            <Route path="/lists" element={<ListsIndexPage />} />
            <Route path="/lists/new" element={<ListFormPage />} />
            <Route path="/lists/:id" element={<ListDetailPage />} />
            <Route path="/lists/:id/edit" element={<ListFormPage />} />

            {/* Tags — cross-type browse of the shared tag table */}
            <Route path="/tags" element={<TagsIndexPage />} />
            <Route path="/tags/:id" element={<TagDetailPage />} />

            {/* Music — standalone local-music library (own tables, reuses the player) */}
            <Route path="/music" element={<MusicLibraryPage />} />
            <Route path="/music/artists/:id" element={<MusicArtistPage />} />
            <Route path="/music/albums/:id" element={<MusicAlbumPage />} />
            <Route path="/music/playlists/:id" element={<MusicPlaylistPage />} />
            <Route path="/music/liked" element={<MusicLikedPage />} />
            <Route path="/music/stats" element={<MusicStatsPage />} />
            {/* Full-page view of the player (any audio, not just music) */}
            <Route path="/now-playing" element={<NowPlayingPage />} />
            {/* pre-stats sessions may still have /music/history in back-history */}
            <Route path="/music/history" element={<Navigate to="/music/stats" replace />} />

            {/* Japanese learning — standalone section (courses, SRS review, quiz) */}
            <Route path="/japanese" element={<JapaneseHomePage />} />
            <Route path="/japanese/roadmap" element={<JapaneseRoadmapPage />} />
            <Route path="/japanese/analyze" element={<JapaneseAnalyzePage />} />
            <Route path="/japanese/coverage" element={<JapaneseCoveragePage />} />
            <Route path="/japanese/write" element={<JapaneseWritingPage />} />
            <Route path="/japanese/courses/new" element={<JapaneseCourseFormPage />} />
            <Route path="/japanese/courses/:id" element={<JapaneseCoursePage />} />
            <Route path="/japanese/courses/:id/edit" element={<JapaneseCourseFormPage />} />
            <Route path="/japanese/lessons/new" element={<JapaneseLessonFormPage />} />
            <Route path="/japanese/lessons/:id" element={<JapaneseLessonPage />} />
            <Route path="/japanese/lessons/:id/edit" element={<JapaneseLessonFormPage />} />
            <Route path="/japanese/review" element={<JapaneseReviewPage />} />
            <Route path="/japanese/quiz" element={<JapaneseQuizPage />} />
            <Route path="/japanese/mine" element={<JapaneseMinePage />} />
            <Route path="/japanese/dictionary" element={<JapaneseDictionaryPage />} />
            <Route path="/japanese/kana" element={<JapaneseKanaPage />} />
            <Route path="/japanese/test" element={<JapaneseTestPage />} />
            <Route path="/japanese/stats" element={<JapaneseStatsPage />} />

            {/* Gacha — standalone tracker; games/kinds/currencies configured
                in shared/gacha.ts, one dashboard page per game */}
            <Route path="/gacha" element={<GachaHomePage />} />
            <Route path="/gacha/:game" element={<GachaGamePage />} />
            <Route path="/gacha/:game/unit/:id" element={<GachaUnitPage />} />
            <Route path="/gacha/:game/coach" element={<GachaCoachPage />} />

            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/anime" replace />} />
          </Routes>
          </ErrorBoundary>
        </main>
        <NowPlayingBar />
        <Toaster />
      </div>
      <CommandPalette />
    </div>
  )
}
