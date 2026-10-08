import { defineSource } from '../../schema'

export default defineSource({
  id: 'moriyama-1992-nikkan-heigo',
  type: 'book',
  title: '日韓併合',
  lang: 'ja',
  contributors: [
    { name: 'Moriyama Shigenori', nameNative: '森山茂徳', role: 'author' }
  ],
  publisher: '吉川弘文館',
  place: '東京',
  date: '1992-01',
  ids: { isbn: '4642065474' },
  url: 'https://ndlsearch.ndl.go.jp/books/R100000002-I000002157244',
  accessed: '2026-10-08'
})
