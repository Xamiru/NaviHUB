import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { AudioPlayerProvider } from './lib/player'
import MusicPlayLogger from './components/MusicPlayLogger'
import BootSequence from './components/BootSequence'
import PlayerWidgetPage from './pages/PlayerWidgetPage'
import { toastError } from './lib/toast'
import './styles.css'
// Wired-chrome fonts, bundled as self-origin assets (CSP has no remote
// font-src). Referenced by the --font-mono stack + .lain-crt in styles.css.
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource/ibm-plex-mono/700.css'
import '@fontsource/vt323'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 5_000 } },
  // Failed queries used to die silently in the console; surface them as toasts.
  queryCache: new QueryCache({ onError: toastError })
})

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
const isWidgetWindow = window.location.hash.startsWith('#/widget')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isWidgetWindow ? (
      <PlayerWidgetPage />
    ) : (
      <QueryClientProvider client={queryClient}>
        <AudioPlayerProvider>
          {/* Inside the provider (not App) so play counts survive the chromeless
              manga-reader route, which renders without the normal shell. */}
          <MusicPlayLogger />
          {/* Same placement rationale: the once-per-launch Copland OS boot
              splash (lain theme only) covers deep links into the readers too. */}
          <BootSequence />
          <HashRouter>
            <App />
          </HashRouter>
        </AudioPlayerProvider>
      </QueryClientProvider>
    )}
  </React.StrictMode>
)
