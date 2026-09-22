import { QueryClientProvider } from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom'
import App from './App'
import BootSequence from './components/BootSequence'
import MusicPlayLogger from './components/MusicPlayLogger'
import { AudioPlayerProvider } from './lib/player'
import { createAppQueryClient } from './lib/queryClient'

const queryClient = createAppQueryClient()

export default function MainAppRoot(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioPlayerProvider>
        {/* Inside the provider (not App) so play counts survive the chromeless
            manga-reader route, which renders without the normal shell. */}
        <MusicPlayLogger />
        {/* Same placement rationale: the once-per-launch themed boot splash
            covers deep links into the readers too. */}
        <BootSequence />
        <HashRouter>
          <App />
        </HashRouter>
      </AudioPlayerProvider>
    </QueryClientProvider>
  )
}
