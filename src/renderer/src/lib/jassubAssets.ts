// Bundled worker and WASM for the styled subtitle layer. Imported dynamically
// with the jassub module itself, so neither reaches the player chunk or launch.
import workerUrl from 'jassub/dist/worker/worker.js?worker&url'
import wasmUrl from 'jassub/dist/wasm/jassub-worker.wasm?url'
import modernWasmUrl from 'jassub/dist/wasm/jassub-worker-modern.wasm?url'

export { modernWasmUrl, wasmUrl, workerUrl }
