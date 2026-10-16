// Hash of the built-in Japanese course content (seedContentHash in
// japaneseSeedSync.ts). Startup runs the content sync only when this differs
// from the stamp in settings, so an unchanged seed costs one settings read.
// tests/japaneseSeedSync.test.ts fails with the new value whenever seed content
// changes; paste it here.
export const SEED_VERSION = '143154d425fab268714c63c5a28d3937473c265c'

// The settings row holding the version of the last completed sync.
export const SEED_VERSION_KEY = 'japanese.seeded.version'
