import { useEffect, useLayoutEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useScrollRestoration } from './lib/navState'
import { api } from './lib/api'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import NowPlayingBar from './components/NowPlayingBar'
import CommandPalette from './components/CommandPalette'
import PlayerShortcuts from './components/PlayerShortcuts'
import Toaster from './components/Toaster'
import ConfirmHost from './components/ConfirmHost'
import LearningContextBand from './components/LearningContextBand'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import StatsPage from './pages/StatsPage'
import MediaListPage from './pages/MediaListPage'
import MediaDetailPage from './pages/MediaDetailPage'
import MediaFormPage from './pages/MediaFormPage'
import SeasonalAnimePage from './pages/SeasonalAnimePage'
import InstalledGamesPage from './pages/InstalledGamesPage'
import FranchisesPage from './pages/FranchisesPage'
import FranchisePage from './pages/FranchisePage'
import AchievementsPage from './pages/AchievementsPage'
import ThemeSongsPage from './pages/ThemeSongsPage'
import EntityListView from './components/EntityListView'
import SettingsPage from './pages/SettingsPage'
import PersonDetailPage from './pages/PersonDetailPage'
import StudioListPage from './pages/StudioListPage'
import StudioDetailPage from './pages/StudioDetailPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import QuizLandingPage from './pages/QuizLandingPage'
import SongQuizPage from './pages/SongQuizPage'
import GuessTrackPage from './pages/GuessTrackPage'
import LibraryGridPage from './pages/LibraryGridPage'
import MovieChainPage from './pages/MovieChainPage'
import CastQuizPage from './pages/CastQuizPage'
import VaQuizPage from './pages/VaQuizPage'
import SynopsisQuizPage from './pages/SynopsisQuizPage'
import MangaPanelQuizPage from './pages/MangaPanelQuizPage'
import ChallengeQuizPage from './pages/ChallengeQuizPage'
import PartyQuizPage from './pages/PartyQuizPage'
import TournamentPage from './pages/TournamentPage'
import ChecklistPage from './pages/ChecklistPage'
import ListsIndexPage from './pages/ListsIndexPage'
import TorrentsPage from './pages/TorrentsPage'
import BulkImportPage from './pages/BulkImportPage'
import TasksPage from './pages/TasksPage'
import LogsPage from './pages/LogsPage'
import ListFormPage from './pages/ListFormPage'
import ListDetailPage from './pages/ListDetailPage'
import TierListFormPage from './pages/TierListFormPage'
import TierListEditorPage from './pages/TierListEditorPage'
import TagsIndexPage from './pages/TagsIndexPage'
import TagDetailPage from './pages/TagDetailPage'
import JapaneseHomePage from './pages/JapaneseHomePage'
import JapaneseRoadmapPage from './pages/JapaneseRoadmapPage'
import JapaneseGuidePage from './pages/JapaneseGuidePage'
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
import JapanesePitchPage from './pages/JapanesePitchPage'
import JapaneseKanjiPartsPage from './pages/JapaneseKanjiPartsPage'
import JapaneseKanjiQuizPage from './pages/JapaneseKanjiQuizPage'
import JapaneseGrammarPage from './pages/JapaneseGrammarPage'
import JapaneseGrammarQuizPage from './pages/JapaneseGrammarQuizPage'
import JapaneseListenPage from './pages/JapaneseListenPage'
import JapaneseShiritoriPage from './pages/JapaneseShiritoriPage'
import JapaneseConfusablesPage from './pages/JapaneseConfusablesPage'
import JapaneseLoanwordsPage from './pages/JapaneseLoanwordsPage'
import JapaneseFeedPage from './pages/JapaneseFeedPage'
import JapaneseSentencesPage from './pages/JapaneseSentencesPage'
import JapaneseArcadePage from './pages/JapaneseArcadePage'
import JapaneseReadingPage from './pages/JapaneseReadingPage'
import JapaneseLeechDrillPage from './pages/JapaneseLeechDrillPage'
import EnglishDictionaryPage from './pages/EnglishDictionaryPage'
import EnglishHomePage from './pages/EnglishHomePage'
import EnglishReviewPage from './pages/EnglishReviewPage'
import EnglishDeckPage from './pages/EnglishDeckPage'
import EnglishUsePage from './pages/EnglishUsePage'
import EnglishPunctuatePage from './pages/EnglishPunctuatePage'
import EnglishSpotErrorPage from './pages/EnglishSpotErrorPage'
import EnglishMatchPage from './pages/EnglishMatchPage'
import EnglishVocabQuizPage from './pages/EnglishVocabQuizPage'
import EnglishSpellingPage from './pages/EnglishSpellingPage'
import EnglishReadingPage from './pages/EnglishReadingPage'
import EnglishMechanicsPage from './pages/EnglishMechanicsPage'
import EnglishWritingPage from './pages/EnglishWritingPage'
import ProgrammingHomePage from './pages/ProgrammingHomePage'
import ProgCoursePage from './pages/ProgCoursePage'
import ProgLessonPage from './pages/ProgLessonPage'
import CheatsheetsPage from './pages/CheatsheetsPage'
import CliPracticePage from './pages/CliPracticePage'
import ProgrammingQuizPage from './pages/ProgrammingQuizPage'
import SqlSandboxPage from './pages/SqlSandboxPage'
import RegexGolfPage from './pages/RegexGolfPage'
import MangaReaderPage from './pages/MangaReaderPage'
import BookReaderPage from './pages/BookReaderPage'
import VideoPlayerPage from './pages/VideoPlayerPage'
import OpenFileHandler from './components/OpenFileHandler'
import WatchLandingPage from './pages/WatchLandingPage'
import MusicLibraryPage from './pages/MusicLibraryPage'
import MusicArtistPage from './pages/MusicArtistPage'
import MusicAlbumPage from './pages/MusicAlbumPage'
import MusicPlaylistPage from './pages/MusicPlaylistPage'
import MusicLikedPage from './pages/MusicLikedPage'
import MusicStatsPage from './pages/MusicStatsPage'
import NowPlayingPage from './pages/NowPlayingPage'
import GachaHomePage from './pages/GachaHomePage'
import WrestlingHomePage from './pages/WrestlingHomePage'
import WrestlingPromotionPage from './pages/WrestlingPromotionPage'
import WrestlingEventPage from './pages/WrestlingEventPage'
import WrestlingWrestlerPage from './pages/WrestlingWrestlerPage'
import WrestlingRatedPage from './pages/WrestlingRatedPage'
import WrestlingYearPage from './pages/WrestlingYearPage'
import WrestlingMatchRedirect from './pages/WrestlingMatchRedirect'
import WrestlingCollectionPage from './pages/WrestlingCollectionPage'
import GachaGamePage from './pages/GachaGamePage'
import GachaUnitPage from './pages/GachaUnitPage'
import GachaCoachPage from './pages/GachaCoachPage'
import { ANIME, MANGA, VISUAL_NOVEL, GAME, BOOK, MOVIE, TV } from './lib/mediaConfig'
import { surfaceMoodForPath } from './lib/surfaceMood'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const surfaceMood = surfaceMoodForPath(location.pathname)
  useScrollRestoration(mainRef)

  // The manga/book readers and the video player are immersive: no
  // sidebar/topbar/now-playing chrome, full-bleed. Audio keeps playing — the
  // <audio> element lives in AudioPlayerProvider, not in the (unmounted)
  // NowPlayingBar. Note the trailing "/" on the /watch branches: the bare
  // /watch landing page is a picker and deliberately keeps the shell.
  const isReader =
    /^\/(manga|books)\/\d+\/(read|book)\/|^\/watch\/(file|wrestling|adhoc)\/|^\/read\/(manga|book)\//.test(
      location.pathname
    )

  // The lain theme's CRT overlay (styles.css) keys off this attribute so
  // scanlines never sit over the readers. Layout effect: no scanline frame
  // flashes when entering a reader. Idempotent → StrictMode-safe.
  useLayoutEffect(() => {
    if (isReader) document.documentElement.dataset.reader = 'true'
    else delete document.documentElement.dataset.reader
    document.documentElement.dataset.mood = surfaceMood
  }, [isReader, surfaceMood])

  // Ctrl+wheel = UI zoom (Electron has no built-in handler for it). Steps the
  // same persisted ui.scale the Settings pills write, via app:bumpUiScale.
  // Readers are excluded: the manga reader owns Ctrl+wheel for page zoom, and
  // an accidental UI re-scale mid-chapter is disorienting. deltaY accumulates
  // so high-resolution wheels/trackpads step once per ~notch, not per event.
  useEffect(() => {
    if (isReader) return
    let acc = 0
    const onWheel = (e: WheelEvent): void => {
      if (!e.ctrlKey || e.defaultPrevented) return
      e.preventDefault()
      acc += e.deltaY
      if (Math.abs(acc) < 50) return
      const direction = acc < 0 ? 1 : -1
      acc = 0
      void api.app.bumpUiScale(direction)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isReader])

  if (isReader) {
    return (
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/manga/:id/read/:chapterId" element={<MangaReaderPage />} />
          <Route path="/manga/:id/book/:chapterId" element={<BookReaderPage />} />
          {/* Books reuse the same readers; a books folder may hold CBZ volumes too. */}
          <Route path="/books/:id/read/:chapterId" element={<MangaReaderPage />} />
          <Route path="/books/:id/book/:chapterId" element={<BookReaderPage />} />
          <Route path="/watch/file/:fileId" element={<VideoPlayerPage />} />
          {/* Same player, different table — the wrestling collection's rows
              live in wrestling_video, so the route names the scope. */}
          <Route
            path="/watch/wrestling/:fileId"
            element={<VideoPlayerPage refKind="wrestling" />}
          />
          <Route path="/watch/adhoc/:token" element={<VideoPlayerPage />} />
          {/* "Open with NaviHUB" — a .cbz/.epub from outside the library. */}
          <Route path="/read/manga/:token" element={<MangaReaderPage />} />
          <Route path="/read/book/:token" element={<BookReaderPage />} />
        </Routes>
        {/* Mounted in BOTH branches: a file opened while you're already in a
            reader still has to land somewhere. */}
        <OpenFileHandler />
        <Toaster />
        <ConfirmHost />
      </ErrorBoundary>
    )
  }

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main
          ref={mainRef}
          className="archive-main flex-1 min-w-0 overflow-y-auto min-h-0"
          data-mood={surfaceMood}
        >
          <LearningContextBand />
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
            {/* Above /games/:id — the /anime/seasonal precedent. */}
            <Route path="/games/installed" element={<InstalledGamesPage />} />
            <Route path="/games/achievements" element={<AchievementsPage />} />
            <Route path="/games/franchises" element={<FranchisesPage />} />
            <Route path="/games/franchises/:id" element={<FranchisePage />} />
            <Route path="/games/:id" element={<MediaDetailPage cfg={GAME} />} />
            <Route path="/games/:id/edit" element={<MediaFormPage cfg={GAME} />} />

            {/* Books (Open Library) — pages progress; local EPUBs via the reader */}
            <Route path="/books" element={<MediaListPage cfg={BOOK} />} />
            <Route path="/books/new" element={<MediaFormPage cfg={BOOK} />} />
            <Route path="/books/:id" element={<MediaDetailPage cfg={BOOK} />} />
            <Route path="/books/:id/edit" element={<MediaFormPage cfg={BOOK} />} />

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
              path="/authors"
              element={
                <EntityListView
                  kind="person"
                  title="Authors"
                  basePath="/people"
                  personRole="writer"
                  // Scoped to books so movie/TV writer credits can't bleed in.
                  mediaType="book"
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

            {/* Quiz — quizzes over the LIBRARY only; study drills live in their
                own Learn section (Japanese / English / Programming) */}
            <Route path="/quiz" element={<QuizLandingPage />} />
            <Route path="/quiz/party" element={<PartyQuizPage />} />
            <Route path="/quiz/song" element={<SongQuizPage />} />
            <Route path="/quiz/guess-track" element={<GuessTrackPage />} />
            <Route path="/quiz/cast" element={<CastQuizPage />} />
            <Route path="/quiz/character" element={<Navigate to="/quiz/cast" replace />} />
            <Route path="/quiz/va" element={<VaQuizPage />} />
            <Route path="/quiz/synopsis" element={<SynopsisQuizPage />} />
            <Route path="/quiz/panels" element={<MangaPanelQuizPage />} />
            <Route path="/quiz/images" element={<ChallengeQuizPage kind="imageReveal" />} />
            <Route path="/quiz/silhouette" element={<ChallengeQuizPage kind="silhouette" />} />
            <Route path="/quiz/connections" element={<ChallengeQuizPage kind="connections" />} />
            <Route path="/quiz/library-grid" element={<LibraryGridPage />} />
            <Route path="/quiz/movie-chain" element={<MovieChainPage />} />
            <Route path="/quiz/chronology" element={<ChallengeQuizPage kind="chronology" />} />
            <Route path="/quiz/higher-lower" element={<ChallengeQuizPage kind="higherLower" />} />
            <Route path="/quiz/tournament" element={<TournamentPage />} />
            {/* moved into the Programming section — old link may be in history */}
            <Route path="/quiz/programming" element={<Navigate to="/programming/quiz" replace />} />

            {/* Lists — user-curated, type-scoped collections */}
            <Route path="/watch" element={<WatchLandingPage />} />
            <Route path="/torrents" element={<TorrentsPage />} />
            <Route path="/bulk" element={<BulkImportPage />} />
            {/* Two routes rather than a ?tab= param, so the native Tools menu
                and Ctrl+K can deep-link the logs, and so the log poll only
                exists while the Logs route is mounted. */}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/logs" element={<LogsPage />} />

            <Route path="/lists" element={<ListsIndexPage />} />
            <Route path="/lists/new" element={<ListFormPage />} />
            <Route path="/lists/:id" element={<ListDetailPage />} />
            <Route path="/lists/:id/edit" element={<ListFormPage />} />

            {/* Tier lists — the Lists section's tiermaker-style tab. Static
                'tier' segment outranks /lists/:id, so these win over it. */}
            <Route path="/lists/tier/new" element={<TierListFormPage />} />
            <Route path="/lists/tier/:id" element={<TierListEditorPage />} />
            <Route path="/lists/tier/:id/edit" element={<TierListFormPage />} />

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
            <Route path="/japanese/guide" element={<JapaneseGuidePage />} />
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
            <Route path="/japanese/pitch" element={<JapanesePitchPage />} />
            <Route path="/japanese/kanji" element={<JapaneseKanjiPartsPage />} />
            <Route path="/japanese/kanji/quiz" element={<JapaneseKanjiQuizPage />} />
            <Route path="/japanese/grammar" element={<JapaneseGrammarPage />} />
            <Route path="/japanese/grammar/quiz" element={<JapaneseGrammarQuizPage />} />
            <Route path="/japanese/listen" element={<JapaneseListenPage />} />
            <Route path="/japanese/shiritori" element={<JapaneseShiritoriPage />} />
            <Route path="/japanese/confusables" element={<JapaneseConfusablesPage />} />
            <Route path="/japanese/loanwords" element={<JapaneseLoanwordsPage />} />
            <Route path="/japanese/feed" element={<JapaneseFeedPage />} />
            <Route path="/japanese/sentences" element={<JapaneseSentencesPage />} />
            <Route path="/japanese/arcade" element={<JapaneseArcadePage />} />
            <Route path="/japanese/reading" element={<JapaneseReadingPage />} />
            <Route path="/japanese/leeches/drill" element={<JapaneseLeechDrillPage />} />
            <Route path="/japanese/test" element={<JapaneseTestPage />} />
            <Route path="/japanese/stats" element={<JapaneseStatsPage />} />

            {/* English — Learn section: hub, dictionary, SRS review, and the
                advanced tests (vocab/spelling/reading/mechanics/writing) */}
            <Route path="/english" element={<EnglishHomePage />} />
            <Route path="/english/dictionary" element={<EnglishDictionaryPage />} />
            <Route path="/english/review" element={<EnglishReviewPage />} />
            <Route path="/english/deck" element={<EnglishDeckPage />} />
            <Route path="/english/use" element={<EnglishUsePage />} />
            <Route path="/english/games/punctuate" element={<EnglishPunctuatePage />} />
            <Route path="/english/games/spot" element={<EnglishSpotErrorPage />} />
            <Route path="/english/games/match" element={<EnglishMatchPage />} />
            <Route path="/english/vocab" element={<EnglishVocabQuizPage />} />
            <Route path="/english/spelling" element={<EnglishSpellingPage />} />
            <Route path="/english/reading" element={<EnglishReadingPage />} />
            <Route path="/english/mechanics" element={<EnglishMechanicsPage />} />
            <Route path="/english/writing" element={<EnglishWritingPage />} />

            {/* Programming — Learn section; content is code (shared/programming),
                only lesson completion lives in the DB */}
            <Route path="/programming" element={<ProgrammingHomePage />} />
            <Route path="/programming/cheatsheets" element={<CheatsheetsPage />} />
            <Route path="/programming/practice" element={<CliPracticePage />} />
            <Route path="/programming/quiz" element={<ProgrammingQuizPage />} />
            <Route path="/programming/sql" element={<SqlSandboxPage />} />
            <Route path="/programming/regex-golf" element={<RegexGolfPage />} />
            <Route path="/programming/course/:courseKey" element={<ProgCoursePage />} />
            <Route path="/programming/course/:courseKey/:lessonKey" element={<ProgLessonPage />} />

            {/* Gacha — standalone tracker; games/kinds/currencies configured
                in shared/gacha.ts, one dashboard page per game */}
            <Route path="/gacha" element={<GachaHomePage />} />
            <Route path="/gacha/:game" element={<GachaGamePage />} />
            <Route path="/gacha/:game/unit/:id" element={<GachaUnitPage />} />
            <Route path="/gacha/:game/coach" element={<GachaCoachPage />} />

            {/* Wrestling — standalone section: a Wikipedia-sourced wiki plus a
                local collection. Promotions configured in shared/wrestling.ts.
                Sub-paths are namespaced (/p/, /event/, /wrestler/) so a static
                segment can never be mistaken for an :id. */}
            <Route path="/wrestling" element={<WrestlingHomePage />} />
            <Route path="/wrestling/rated" element={<WrestlingRatedPage />} />
            <Route path="/wrestling/collection" element={<WrestlingCollectionPage />} />
            <Route path="/wrestling/year/:year" element={<WrestlingYearPage />} />
            <Route path="/wrestling/match/:id" element={<WrestlingMatchRedirect />} />
            <Route path="/wrestling/p/:promo" element={<WrestlingPromotionPage />} />
            <Route path="/wrestling/event/:id" element={<WrestlingEventPage />} />
            <Route path="/wrestling/wrestler/:id" element={<WrestlingWrestlerPage />} />

            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </ErrorBoundary>
        </main>
        <NowPlayingBar />
        <Toaster />
        <ConfirmHost />
      </div>
      <CommandPalette />
      <PlayerShortcuts />
      <OpenFileHandler />
    </div>
  )
}
