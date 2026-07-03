import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { AudioPlayerProvider } from './lib/player'
import { toastError } from './lib/toast'
import './styles.css'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AudioPlayerProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AudioPlayerProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
