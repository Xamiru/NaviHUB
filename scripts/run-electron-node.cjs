#!/usr/bin/env node

const { spawnSync } = require('node:child_process')

const result = spawnSync(require('electron'), process.argv.slice(2), {
  env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
  stdio: 'inherit'
})

if (result.error) throw result.error
if (result.signal) {
  process.kill(process.pid, result.signal)
} else {
  process.exit(result.status ?? 1)
}
