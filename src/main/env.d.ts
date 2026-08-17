// electron-vite import suffixes (`?modulePath` for the SQL sandbox utility process).
/// <reference types="electron-vite/node" />

declare module '*.sql?raw' {
  const content: string
  export default content
}

// Pure-JS bz2 decoder (no upstream types). Used by dict/tatoebaAudio.ts for
// Tatoeba's .bz2 exports.
declare module 'seek-bzip' {
  export function decode(input: Buffer, expectedSize?: number): Buffer
}
