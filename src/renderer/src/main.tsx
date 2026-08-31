import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { toastError } from './lib/toast'
import { readStoredAppTheme, stampAppTheme } from './lib/theme'
import './styles.css'
// Wired-chrome fonts, bundled as self-origin assets (CSP has no remote
// font-src). Referenced by the --font-mono stack + .lain-crt in styles.css.
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource/ibm-plex-mono/700.css'
import '@fontsource/vt323'

// The database setting is mirrored to localStorage whenever it is read or
// changed. Stamp that mirror before React mounts so startup uses one palette
// from the first renderer paint; App reconciles it with the database below.
stampAppTheme(readStoredAppTheme())

// Mutations are plain `await api.…` calls in event handlers, not useMutation —
// any rejection nobody catches would vanish. This is the app-wide net for them;
// components that catch and render errors themselves (e.g. ImportDialog) never
// reach it, so nothing is reported twice.
window.addEventListener('unhandledrejection', (e) => {
  toastError(e.reason)
  e.preventDefault()
})

// The pop-out player widget window loads the same bundle at #/widget and gets
// ONLY its pill component: no router, no query client, no AudioPlayerProvider
// (a second <audio> + mediaSession would fight the main window's), and no
// BootSequence (a per-window sessionStorage gate would replay the splash
// inside the 320x64 pill). Branched here, before any provider mounts.
// The achievement overlay (#/achpop, AchPopupPage) is the same kind of
// satellite window and gets the same treatment.
const isWidgetWindow = window.location.hash.startsWith('#/widget')
const isAchPopupWindow = window.location.hash.startsWith('#/achpop')
const MainAppRoot = lazy(() => import('./MainAppRoot'))
const PlayerWidgetPage = lazy(() => import('./pages/PlayerWidgetPage'))
const AchPopupPage = lazy(() => import('./pages/AchPopupPage'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      {isWidgetWindow ? (
        <PlayerWidgetPage />
      ) : isAchPopupWindow ? (
        <AchPopupPage />
      ) : (
        <MainAppRoot />
      )}
    </Suspense>
  </React.StrictMode>
)
