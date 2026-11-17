// Hash of the built-in Japanese course content (seedContentHash in
// japaneseSeedSync.ts). Startup runs the content sync only when this differs
// from the stamp in settings, so an unchanged seed costs one settings read.
// tests/japaneseSeedSync.test.ts fails with the new value whenever seed content
// changes; paste it here.
export const SEED_VERSION = 'f02d4d3c7fa7f0c8f72070c53c6b46f6f986d998'

// The settings row holding the version of the last completed sync.
export const SEED_VERSION_KEY = 'japanese.seeded.version'
