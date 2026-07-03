import { join, dirname } from 'path'
import { createRequire } from 'module'
import kuromoji from 'kuromoji'
import type { JpToken } from '@shared/types'

// Morphological analysis for the manga reader's mining panel: splits an OCR'd
// text block into tappable words with their dictionary forms (食べた → 食べる).
// kuromoji is pure JS; its ~18MB dictionary ships inside the package (the app
// runs unpackaged from the repo — if it is ever packaged, point DIC_DIR at
// process.resourcesPath instead). The main-process bundle is CJS (require
// exists); vitest runs this file as ESM, hence the createRequire fallback.
const req = typeof require !== 'undefined' ? require : createRequire(import.meta.url)
const DIC_DIR = join(dirname(req.resolve('kuromoji/package.json')), 'dict')

type KuromojiTokenizer = kuromoji.Tokenizer<kuromoji.IpadicFeatures>

// Lazy singleton: the dictionary load takes ~1s, paid once on first use (the
// reader fires a warm-up call on mount). A failed build resets the promise so
// the next call retries instead of caching the failure forever.
let builderPromise: Promise<KuromojiTokenizer> | null = null

function getTokenizer(): Promise<KuromojiTokenizer> {
  if (!builderPromise) {
    builderPromise = new Promise((resolve, reject) => {
      kuromoji.builder({ dicPath: DIC_DIR }).build((err, tokenizer) => {
        if (err) {
          builderPromise = null
          reject(err)
        } else {
          resolve(tokenizer)
        }
      })
    })
  }
  return builderPromise
}

// kuromoji readings are katakana; cards and lookups want hiragana.
function toHiragana(s: string): string {
  return s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
}

const NON_WORD_POS = new Set(['助詞', '助動詞', '記号'])
const JP_CHAR = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/

// Returns [] for blank input or tokenizer failure — the renderer treats [] as
// "no tokenization available" and falls back to manual selection (Jisho itself
// deconjugates, so those lookups still work).
export async function tokenize(text: string): Promise<JpToken[]> {
  const trimmed = text.trim()
  if (!trimmed) return []
  let tokenizer: KuromojiTokenizer
  try {
    tokenizer = await getTokenizer()
  } catch {
    return []
  }
  return tokenizer.tokenize(trimmed).map((t) => ({
    surface: t.surface_form,
    base: t.basic_form && t.basic_form !== '*' ? t.basic_form : t.surface_form,
    reading: t.reading ? toHiragana(t.reading) : null,
    pos: t.pos,
    wordLike: !NON_WORD_POS.has(t.pos) && JP_CHAR.test(t.surface_form)
  }))
}
