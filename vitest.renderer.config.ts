import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

// Renderer tests run in Node + jsdom. Keep them separate from vitest.config.ts:
// the main-process suite must continue to run through Electron-as-Node so its
// better-sqlite3 binary uses Electron's native-module ABI.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer/src'),
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  css: { postcss: {} },
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: { url: 'http://localhost/#/' }
    },
    include: ['tests/renderer/**/*.test.ts', 'tests/renderer/**/*.test.tsx'],
    setupFiles: ['tests/renderer/setup.ts'],
    globals: true,
    clearMocks: true,
    restoreMocks: true
  }
})
