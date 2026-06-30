import type { NaviApi } from '@shared/api'

declare global {
  interface Window {
    api: NaviApi
  }
}

export {}
