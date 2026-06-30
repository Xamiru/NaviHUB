import { useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useScrollRestoration } from './lib/navState'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import NowPlayingBar from './components/NowPlayingBar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MediaListPage from './pages/MediaListPage'
import MediaDetailPage from './pages/MediaDetailPage'
import MediaFormPage from './pages/MediaFormPage'
import EntityListView from './components/EntityListView'
import SettingsPage from './pages/SettingsPage'
import PersonDetailPage from './pages/PersonDetailPage'
import StudioListPage from './pages/StudioListPage'
import StudioDetailPage from './pages/StudioDetailPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import { ANIME, MANGA, MOVIE, TV } from './lib/mediaConfig'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)
  useScrollRestoration(mainRef)
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto min-h-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Anime */}
            <Route path="/anime" element={<MediaListPage cfg={ANIME} />} />
            <Route path="/anime/new" element={<MediaFormPage cfg={ANIME} />} />
            <Route path="/anime/:id" element={<MediaDetailPage cfg={ANIME} />} />
            <Route path="/anime/:id/edit" element={<MediaFormPage cfg={ANIME} />} />

            {/* Manga */}
            <Route path="/manga" element={<MediaListPage cfg={MANGA} />} />
            <Route path="/manga/new" element={<MediaFormPage cfg={MANGA} />} />
            <Route path="/manga/:id" element={<MediaDetailPage cfg={MANGA} />} />
            <Route path="/manga/:id/edit" element={<MediaFormPage cfg={MANGA} />} />

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
                  mediaType="anime"
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
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/anime" replace />} />
          </Routes>
        </main>
        <NowPlayingBar />
      </div>
    </div>
  )
}
