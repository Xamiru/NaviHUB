import { defineConfig } from 'drizzle-kit'

// Migrations are generated into ./drizzle and bundled/copied for the app to run
// at startup. The runtime DB lives in Electron's userData dir (see src/main/db).
export default defineConfig({
  dialect: 'sqlite',
  schema: './src/main/db/schema.ts',
  out: './drizzle'
})
