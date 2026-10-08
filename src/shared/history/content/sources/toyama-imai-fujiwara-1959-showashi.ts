import { defineSource } from '../../schema'

export default defineSource({
  id: 'toyama-imai-fujiwara-1959-showashi',
  type: 'book',
  title: '昭和史',
  lang: 'ja',
  contributors: [
    { name: 'Tōyama Shigeki', nameNative: '遠山茂樹', role: 'author' },
    { name: 'Imai Seiichi', nameNative: '今井清一', role: 'author' },
    { name: 'Fujiwara Akira', nameNative: '藤原彰', role: 'author' }
  ],
  publisher: '岩波書店',
  date: '1959',
  url: 'https://ndlsearch.ndl.go.jp/books/R100000001-I43111130047356',
  accessed: '2026-10-08',
  edition: '新版'
})
