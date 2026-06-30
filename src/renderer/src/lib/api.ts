import type { NaviApi } from '@shared/api'

// window.api is injected by the preload bridge (typed via src/preload/index.d.ts).
export const api: NaviApi = window.api
