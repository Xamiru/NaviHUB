import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toastError } from './toast'

export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Renderer queries read the local main process over IPC. Browser
        // connectivity is irrelevant, and Windows can report "offline" while
        // waking even though the library is ready to answer.
        networkMode: 'always',
        // A restored Electron window may have been frozen for hours. Refresh
        // the mounted route when it becomes visible so a transient wake/IPC
        // failure cannot leave stale or missing data on screen indefinitely.
        refetchOnWindowFocus: true,
        staleTime: 5_000
      }
    },
    queryCache: new QueryCache({ onError: toastError })
  })
}
