import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

// Tests live in tests/ (outside both tsconfig projects) and run against the
// real repos with an in-memory SQLite — see tests/helpers.ts.
export default defineConfig({
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  // Inline empty PostCSS config so vitest never loads postcss.config.js — that
  // file is ESM, and the Electron-as-Node runtime the tests use (see the test
  // script in package.json) would try to require() it and fail.
  css: { postcss: {} },
  test: {
    include: ['tests/**/*.test.ts']
  }
})
